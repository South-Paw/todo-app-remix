import { json } from 'remix';
import { db } from '../../utils/db.server';

export async function loader() {
  const todos = await db.todo.findMany();

  return json({
    items: todos.map(({ id, label, createdAt, updatedAt, completedAt }) => ({
      id,
      label,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
      completedAt: completedAt ? completedAt.toISOString() : undefined,
    })),
  });
}
