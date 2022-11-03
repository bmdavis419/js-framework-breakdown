import { PrismaClient } from "./generated/client";

const prisma = new PrismaClient();

const seed = async () => {
  await Promise.all(
    getTasks().map(async (task) => {
      await prisma.task.create({
        data: task,
      });
    })
  );
};

const getTasks = () => {
  return [
    {
      title: "Learn Prisma",
    },
    {
      title: "Learn Next.js",
    },
    {
      title: "Learn React",
    },
    {
      title: "Learn GraphQL",
    },
    {
      title: "Learn TypeScript",
    },
    {
      title: "Learn Tailwind CSS",
    },
  ];
};

seed();
