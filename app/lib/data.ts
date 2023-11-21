import getUser from "./getUser";
import { prisma } from "./prisma";

export default async function getProjects() {
  const { email } = await getUser();
  return await prisma.project.findMany({
    select: { id: true, name: true },
    where: { userId: email },
  });
}
