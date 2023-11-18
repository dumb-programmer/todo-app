import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { z } from "zod";

const prisma = new PrismaClient();

const paramsSchema = z.object({ email: z.string().email() });

export async function GET(request: NextRequest) {
  const parsed = paramsSchema.safeParse({
    email: request.nextUrl.searchParams.get("email"),
  });
  if (parsed.success) {
    const { email } = parsed.data;
    const user = await prisma.user.findUnique({ where: { email } });
    return Response.json({ available: user === null });
  }
  return Response.json({ message: "You must provide the email search param" });
}
