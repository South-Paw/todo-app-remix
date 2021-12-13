export interface Post {
  slug: string;
  title: string;
}

export function getPosts(): Post[] {
  return [
    {
      slug: 'my-first-post',
      title: 'My First Post',
    },
    {
      slug: '90s-mixtape',
      title: 'A Mixtape I Made Just For You',
    },
  ];
}
