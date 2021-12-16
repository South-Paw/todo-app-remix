import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

const getTodos = () => {
  return [
    { label: 'Make a coffee', completedAt: new Date() },
    { label: 'Finish Remix tutorial' },
    { label: 'Set up Remix project' },
    { label: 'Install Prisma' },
    { label: 'Set up Chakra UI' },
    { label: 'Build a todo app' },
  ];
};

async function seed() {
  await Promise.all(getTodos().map((data) => db.todo.create({ data })));
}

seed();
