import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

const paramsSchema = z.object({
  page: z.number(),
});

function waitFor(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export async function GET(request: NextRequest) {
  const parsed = paramsSchema.safeParse({
    page: parseInt(request.nextUrl.searchParams.get("page") || ""),
  });
  if (parsed.success) {
    const { page } = parsed.data;
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const todoItems = await prisma.todo.findMany({
      where: { due: { lt: today.toISOString() } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * 5,
      take: 6,
    });

    return Response.json({
      rows: todoItems.slice(0, 4),
      hasMore: todoItems.length === 6,
    });
  }
  return Response.json({ message: parsed.error.flatten().fieldErrors });
}
