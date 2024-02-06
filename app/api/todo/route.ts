import { getTodos } from "@/app/lib/data";
import { NextRequest } from "next/server";
import { z } from "zod";

const paramsSchema = z.object({
  projectId: z.string().uuid({ message: "projectId must be a uuid" }),
  page: z.number(),
});

function waitFor(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export async function GET(request: NextRequest) {
  const parsed = paramsSchema.safeParse({
    projectId: request.nextUrl.searchParams.get("projectId"),
    page: parseInt(request.nextUrl.searchParams.get("page") || ""),
  });
  if (parsed.success) {
    const { projectId, page } = parsed.data;
    const todos = await getTodos(projectId, page);
    return Response.json(todos);
  }
  return Response.json({ message: parsed.error.flatten().fieldErrors });
}
