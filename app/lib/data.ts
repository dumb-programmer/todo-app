import getUser from "./getUser";
import prisma from "./prisma";

export async function getProjects() {
  const { email } = await getUser();
  return await prisma.project.findMany({
    select: { id: true, name: true },
    where: { userId: email },
  });
}

export async function getProject(id: string) {
  return await prisma.project.findUnique({ where: { id } });
}

export async function getTodos(id: string) {
  return await prisma.todo.findMany({ where: { projectId: id } });
}

export async function getTodayTodos() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return await prisma.todo.findMany({
    where: { due: { equals: today.toISOString() } },
  });
}
