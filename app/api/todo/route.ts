import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

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
    const todo = await prisma.todo.findMany({
      where: { projectId },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * 5,
      take: 6,
    });
    await waitFor(1000);
    return Response.json({
      rows: todo.slice(0, 4),
      hasMore: todo.length === 6,
    });
  }
  return Response.json({ message: parsed.error.flatten().fieldErrors });
}
