import getUser from "@/app/lib/getUser";
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
    const { email } = await getUser();
    const projects = await prisma.project.findMany({
      where: { userId: email },
      skip: (page - 1) * 5,
      take: 6,
    });

    await waitFor(1000);

    return Response.json({
      rows: projects.slice(0, 4),
      hasMore: projects.length === 6,
    });
  }
  return Response.json({ message: parsed.error.flatten().fieldErrors });
}
