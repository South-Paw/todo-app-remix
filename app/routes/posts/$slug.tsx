import { LoaderFunction, useLoaderData } from 'remix';
import { getPost } from '~/post';
import invariant from 'tiny-invariant';

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, 'expected params.slug');

  return getPost(params.slug);
};

export default function PostSlug() {
  const post = useLoaderData();

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
}
