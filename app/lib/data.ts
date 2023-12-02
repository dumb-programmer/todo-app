import getUser from "./getUser";
import prisma from "./prisma";

const LIMIT = 5;

export async function getProjects(page: number = 1) {
  const { email } = await getUser();
  const projects = await prisma.project.findMany({
    where: { userId: email },
    skip: (page - 1) * LIMIT,
    take: LIMIT + 1,
  });

  return { rows: projects.slice(0, 4), hasMore: projects.length === 6 };
}

export async function getProject(id: string) {
  return await prisma.project.findUnique({ where: { id } });
}

export async function getTodos(projectId: string, page: number = 1) {
  const todoItems = await prisma.todo.findMany({
    where: { projectId },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * LIMIT,
    take: LIMIT + 1,
  });
  return { rows: todoItems.slice(0, 4), hasMore: todoItems.length === 6 };
}

export async function getTodayTodos() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todoItems = await prisma.todo.findMany({
    where: { due: { equals: today.toISOString() } },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return { rows: todoItems.slice(0, 4), hasMore: todoItems.length === 6 };
}

export async function getUpcomingTodos() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todoItems = await prisma.todo.findMany({
    where: { due: { gt: today.toISOString() } },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return { rows: todoItems.slice(0, 4), hasMore: todoItems.length === 6 };
}

export async function getOverdueTodos() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const todoItems = await prisma.todo.findMany({
    where: { due: { lt: today.toISOString() } },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return { rows: todoItems.slice(0, 4), hasMore: todoItems.length === 6 };
}

export async function getActivities() {
  const { email } = await getUser();
  return await prisma.activity.findMany({
    where: { userId: email },
    orderBy: { timeStamp: "desc" },
  });
}
