import { getProjects } from "@/app/lib/data";
import getUser from "@/app/lib/getUser";
import { NextRequest } from "next/server";
import { z } from "zod";

const paramsSchema = z.object({
  page: z.number(),
});

function waitFor(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export async function GET(request: NextRequest) {
  const user = await getUser();
  if (user) {
    const parsed = paramsSchema.safeParse({
      page: parseInt(request.nextUrl.searchParams.get("page") || ""),
    });
    if (parsed.success) {
      const { page } = parsed.data;
      const projects = await getProjects(user.email, page);

      return Response.json(projects);
    }
    return Response.json({ message: parsed.error.flatten().fieldErrors });
  }

  return Response.json("Forbidden", { status: 403 });
}
