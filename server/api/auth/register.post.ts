import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~~/server/database";
import type { InsertUser } from "~~/server/database/schema";
import { usersTable } from "~~/server/database/schema";

const bodySchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(6),
  name: z.string().min(2).max(100).trim(),
});

export default eventHandler(async (event) => {
  const { email, password, name } = await readValidatedBody(
    event,
    bodySchema.parse,
  );

  // TODO: buscar si el usuario ya existe en la base de datos

  // TODO:  hash de la contraseña

  // TODO:  insertar el nuevo usuario en la base de datos

  return {
    message: "User registered successfully",
  };
});
