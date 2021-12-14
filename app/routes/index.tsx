import type { Todo } from '@prisma/client';
import { LoaderFunction, RouteComponent, useLoaderData } from 'remix';
import { db } from '~/utils/db.server';

interface LoaderData {
  todos: Array<Todo>;
}

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  return {
    todos: await db.todo.findMany(),
  };
};

const Index: RouteComponent = () => {
  const { todos } = useLoaderData<LoaderData>();

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <pre>{JSON.stringify(todo, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
};

export default Index;
