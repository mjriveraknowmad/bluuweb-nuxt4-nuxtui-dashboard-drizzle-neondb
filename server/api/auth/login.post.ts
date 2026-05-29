import { loginZodSchema } from "#shared/zod/login.schema";
import { eq } from "drizzle-orm";
import { db } from "~~/server/database";
import { usersTable } from "~~/server/database/schema";

export default eventHandler(async (event) => {
  const { email, password } = await readValidatedBody(
    event,
    loginZodSchema.parse
  );

  // buscar el usuario en la base de datos
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (!user) {
    // sabemos que el usuario no existe, pero no queremos revelar esa información, así que damos un mensaje genérico de error
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid --email or password",
    });
  }

  // verificar la contraseña
  const isPasswordValid = await verifyPassword(user.password, password);

  if (!isPasswordValid) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid email or --password",
    });
  }

  // crear la sesión del usuario. 
  // Esto genera una cookie de sesión cifrada segura que se enviará al cliente
  // Con esto podemos crear rutas protegidas que solo los usuarios autenticados pueden acceder, verificando la sesión en cada solicitud (const session = await requireUserSession(event))
  await setUserSession(event, {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });

  return {
    message: "Login successful",
  };
});
