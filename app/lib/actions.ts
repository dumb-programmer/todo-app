"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import getUser from "./getUser";
import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";

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

export async function login(
  prevState: State | undefined | void,
  formData: FormData
) {
  const parsed = UserSchema.safeParse(Object.fromEntries(formData));
  if (parsed.success) {
    const { email, password } = parsed.data;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return { errors: { email: ["No such user exists"] } };
    }
    if (bcrypt.compareSync(password, user.password)) {
      const alg = "HS256";
      const secret = new TextEncoder().encode(process.env.SECRET);
      const token = await new SignJWT({ email: user.email })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(secret);
      cookies().set("token", token);
      redirect("/");
    }
    return { errors: { password: ["Incorrect password"] } };
  } else {
    return { errors: parsed.error.flatten().fieldErrors };
  }
}

const projectSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must contain atleast 3 characters" }),
});

export default async function createProject(
  prevState: any,
  formData: FormData
) {
  const project = Object.fromEntries(formData);
  const parsed = projectSchema.safeParse(project);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }
  const { email } = await getUser();
  await prisma.project.create({
    data: { name: parsed.data.name, userId: email },
  });
  revalidatePath("/");
}
