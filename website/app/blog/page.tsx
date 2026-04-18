import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-12">Blog</h1>

      {posts.length === 0 ? (
        <p className="text-lg text-ft-text/70">No posts yet. Check back soon!</p>
      ) : (
        <div className="flex flex-col divide-y divide-ft-border">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex items-baseline justify-between py-4 group hover:text-ft-accent transition-colors"
            >
              <span className="text-lg font-medium group-hover:underline">{post.title}</span>
              <time className="text-sm text-ft-text/50 shrink-0 ml-8">{post.date}</time>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
