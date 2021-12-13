import { Link, LoaderFunction, useLoaderData } from 'remix';
import { getPosts, PostSummary } from '~/post';

export const loader: LoaderFunction = () => {
  return getPosts();
};

export default function Posts() {
  const posts = useLoaderData<PostSummary[]>();

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(({ slug, title }) => (
          <li key={slug}>
            <Link to={slug}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
