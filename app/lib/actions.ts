"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect, usePathname } from "next/navigation";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import getUser from "./getUser";
import prisma from "./prisma";
import { ActivityType, Priority, Prisma, Project } from "@prisma/client";

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

export async function createProject(prevState: any, formData: FormData) {
  const project = Object.fromEntries(formData);
  const parsed = projectSchema.safeParse(project);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }
  const { email } = await getUser();
  await prisma.project.create({
    data: { name: parsed.data.name, userId: email },
  });
  await prisma.activity.create({
    data: {
      type: ActivityType.CREATE,
      description: `Created project "${parsed.data.name}"`,
      userId: email,
    },
  });
  revalidatePath("/");
  return { success: true };
}

const todoSchema = z.object({
  title: z.string().min(3, "Title must have atleast 3 characters"),
  description: z.string(),
  due: z.string().transform((data) => {
    const date = new Date(data);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }
    return date;
  }),
  priority: z.nativeEnum(Priority),
});

export async function createTodo(
  projectId: string,
  prevState: any,
  formData: FormData
) {
  const todo = Object.fromEntries(formData);
  const parsed = todoSchema.safeParse(todo);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }
  const { email } = await getUser();
  const todoDB = await prisma.todo.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      due: parsed.data.due,
      priority: parsed.data.priority,
      projectId,
      userId: email,
    },
    include: {
      project: true,
    },
  });
  await prisma.activity.create({
    data: {
      type: ActivityType.CREATE,
      description: `Created Todo: ${todoDB.title}`,
      projectName: todoDB.project.name,
      userId: todoDB.userId,
    },
  });
  revalidatePath(`/projects/${projectId}`);
  return { success: true };
}

export async function deleteProject(projectId: string, formData: FormData) {
  await prisma.todo.deleteMany({ where: { projectId } });
  const project = await prisma.project.delete({ where: { id: projectId } });
  const { email } = await getUser();
  await prisma.activity.create({
    data: {
      type: ActivityType.DELETE,
      description: `Deleted project: ${project.name}`,
      userId: email,
    },
  });
  revalidatePath(`/`);
  redirect("/");
}

export async function editProject(
  project: Omit<Project, "userId">,
  prevState: any,
  formData: FormData
) {
  const newProject = Object.fromEntries(formData);
  const parsed = projectSchema.safeParse(newProject);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }
  await prisma.project.update({
    where: { id: project.id },
    data: { name: parsed.data.name },
  });
  const { email } = await getUser();
  await prisma.activity.create({
    data: {
      type: ActivityType.EDIT,
      description: `Renamed project: ${project.name} to ${parsed.data.name}`,
      userId: email,
    },
  });
  revalidatePath("/");
  return { success: true };
}

export async function deleteTodo(
  todoId: string,
  pathname: string,
  formData: FormData
) {
  const todo = await prisma.todo.delete({
    where: { id: todoId },
    include: { project: true },
  });
  const { email } = await getUser();
  await prisma.activity.create({
    data: {
      type: ActivityType.DELETE,
      description: `Deleted todo: ${todo.title}`,
      projectName: todo.project.name,
      userId: email,
    },
  });
  revalidatePath(pathname);
}

export async function editTodo(
  todoId: string,
  path: string,
  prevState: any,
  formData: FormData
) {
  const todo = Object.fromEntries(formData);
  const parsed = todoSchema.safeParse(todo);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }
  const newTodo = await prisma.todo.update({
    where: {
      id: todoId,
    },
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      due: parsed.data.due,
      priority: parsed.data.priority,
    },
    include: {
      project: true,
    },
  });
  const { email } = await getUser();
  await prisma.activity.create({
    data: {
      type: ActivityType.EDIT,
      description: `Edited todo: ${todo.title}`,
      projectName: newTodo.project.name,
      userId: email,
    },
  });
  revalidatePath(path);
  return { success: true };
}
