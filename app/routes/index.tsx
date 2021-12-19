import { Button, Stack } from '@chakra-ui/react';
import { DataFunctionArgs } from '@remix-run/server-runtime';
import { Form, Link, RouteComponent, useLoaderData } from 'remix';
import { Page } from '../components/Page';
import { Todo } from '../components/Todo';
import { db } from '../utils/db.server';

interface LoaderData {
  showAll: boolean;
  todos: Array<{
    id: string;
    label: string;
    createdAt: string;
    updatedAt: string;
    completedAt?: string;
  }>;
}

const loader = async ({ request }: DataFunctionArgs): Promise<LoaderData> => {
  const url = new URL(request.url);
  const showAll = url.searchParams.get('showAll') === 'true';

  const todos = await db.todo.findMany({
    where: showAll ? {} : { completedAt: { equals: null } },
    orderBy: { createdAt: 'asc' },
  });

  return {
    showAll,
    todos: todos.map(({ id, label, createdAt, updatedAt, completedAt }) => ({
      id,
      label,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
      completedAt: completedAt ? completedAt.toISOString() : undefined,
    })),
  };
};

const Index: RouteComponent = () => {
  const { showAll, todos } = useLoaderData<LoaderData>();

  return (
    <Page
      title="All Todos"
      action={
        <Button as={Link} to={`/?showAll=${!showAll}`}>
          {showAll ? 'Hide completed' : 'Show completed'}
        </Button>
      }
    >
      <Stack spacing={4}>
        {todos.map((todo) => (
          <Form key={todo.id} method="post" action={`/todos/${todo.id}?showAll=${showAll}`}>
            <Todo label={todo.label} createdAt={todo.createdAt} completedAt={todo.completedAt ?? undefined} />
          </Form>
        ))}
      </Stack>
    </Page>
  );
};

export default Index;
export { loader };
