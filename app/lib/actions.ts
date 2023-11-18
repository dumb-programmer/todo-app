"use server";

import { Prisma, PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type State = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
};

export async function signup(
  prevState: State | undefined | void,
  formData: FormData
) {
  const parsed = UserSchema.safeParse(Object.fromEntries(formData));
  if (parsed.success) {
    const { email, password } = parsed.data;
    try {
      const salt = bcrypt.genSaltSync();
      const hashedPass = bcrypt.hashSync(password, salt);
      await prisma.user.create({ data: { email, password: hashedPass } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return {
            errors: { email: ["User with this email already exists"] },
          };
        }
        return { message: "An unknown error has occurred" };
      }
    }
  } else {
    return { errors: parsed.error.flatten().fieldErrors };
  }
  return revalidatePath("/");
}