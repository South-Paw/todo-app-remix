import { ActionFunction, redirect } from 'remix';
import { db } from '../../utils/db.server';

const action: ActionFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const showAll = url.searchParams.get('showAll');

  const formData = await request.formData();
  const isComplete = formData.get('isComplete') === 'true';

  await db.todo.update({
    data: { completedAt: isComplete ? new Date() : null },
    where: { id: params.id },
  });

  return redirect(`/?showAll=${showAll}`);
};

export { action };
