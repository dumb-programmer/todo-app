import { Priority } from "@prisma/client";
import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const ProjectSchema = z.object({
  name: z.string().min(1).max(50),
});

export const TodoSchema = z.object({
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