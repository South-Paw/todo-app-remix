import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

const getTodos = () => {
  return [
    { label: 'Finish Remix tutorial' },
    { label: 'Set up todo project' },
    { label: 'Install Prisma' },
    { label: 'Set up Tailwind' },
    { label: 'Build a todo app' },
  ];
};

async function seed() {
  await Promise.all(getTodos().map((data) => db.todo.create({ data })));
}

seed();
