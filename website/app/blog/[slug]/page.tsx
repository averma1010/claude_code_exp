import { getAllPosts, getPostBySlug, getPostSlugs } from '@/lib/posts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const allPosts = getAllPosts();

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 shrink-0 border-r border-ft-border px-6 py-8 sticky top-0 h-screen overflow-y-auto">
        <Link href="/" className="block text-xl font-bold mb-8 hover:opacity-70 transition-opacity">
          Shanzhai
        </Link>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-ft-text/50 mb-4">Articles</h2>
        <nav className="flex flex-col gap-3">
          {allPosts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className={`group flex flex-col gap-0.5 ${p.slug === slug ? 'text-ft-text' : 'text-ft-text/50 hover:text-ft-text'}`}
            >
              <span className={`text-sm font-medium leading-snug ${p.slug === slug ? 'underline underline-offset-2' : ''}`}>
                {p.title}
              </span>
              <span className="text-xs">{p.date}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 px-12 py-8">
        <article className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
            <time className="text-sm text-ft-text/70">{post.date}</time>
          </header>
          <div className="prose max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex, rehypeRaw]}
            >
              {post.content}
            </ReactMarkdown>
          </div>
          <div className="mt-10">
            <Link href="/blog" className="text-ft-accent hover:underline text-sm">
              ← All articles
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
