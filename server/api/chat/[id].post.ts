import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  stepCountIs,
  streamText,
  UIMessage,
} from "ai";
import { and, eq } from "drizzle-orm";
import z from "zod";
import { db } from "~~/server/database";
import {
  chatsTable,
  InsertMessage,
  messagesTable,
} from "~~/server/database/schema";

const bodySchema = z.object({
  model: z.string().trim().min(1),
  messages: z.array(z.custom<UIMessage>()),
});

const paramsSchema = z.object({
  id: z.string(),
});

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  const { messages, model } = await readValidatedBody(event, bodySchema.parse);
  const { id } = await getValidatedRouterParams(event, paramsSchema.parse);

  const [chat] = await db
    .select()
    .from(chatsTable)
    .where(and(eq(chatsTable.id, id), eq(chatsTable.userId, user.id)));

  if (!chat) {
    throw createError({
      statusCode: 404,
      statusMessage: "Chat not found",
    });
  }

  const lastMessage = messages[messages.length - 1];
  if (lastMessage.role === "user" && messages.length > 1) {
    const userMessage: InsertMessage = {
      chatId: chat.id,
      role: "user",
      parts: lastMessage.parts,
    };
    await db.insert(messagesTable).values(userMessage);
  }

  // Fuentes para el bloque de createUIMessageStream :
  // https://vercel.com/blog/ai-sdk-5
  // https://ai-sdk.dev/v5/docs/ai-sdk-ui/chatbot-message-persistence#option-2-setting-ids-with-createuimessagestream
  const stream = createUIMessageStream({
    execute({ writer }) {
      // Otras Fuentes del streamText :
      // https://github.com/nuxt-ui-templates/chat/blob/main/server/api/chats/%5Bid%5D.post.ts
      // https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text
      const result = streamText({
        model,
        maxOutputTokens: 10000,
        system: "You are a helpful assistant.",
        messages: convertToModelMessages(messages),
        stopWhen: stepCountIs(5), // máximo 5 veces razonando antes de responder, para evitar respuestas muy largas o infinitas
      });


      writer.merge(
        result.toUIMessageStream({
          sendReasoning: true,
        })
      );
    },
    onFinish: async ({ messages }) => {
      // Cada vez que se termina la consulta a la IA, se guardan los mensajes generados en la base de datos.
      await db.insert(messagesTable).values(
        messages.map((msg) => ({
          chatId: chat.id,
          role: msg.role,
          parts: msg.parts,
        }))
      );
    },
  });

  return createUIMessageStreamResponse({
    stream,
  });
});
