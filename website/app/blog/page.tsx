import { getAllPosts } from '@/lib/posts';
import ExpandablePost from '@/components/ExpandablePost';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-12">Blog</h1>

      {posts.length === 0 ? (
        <p className="text-lg text-ft-text/70">No posts yet. Check back soon!</p>
      ) : (
        <div>
          {posts.map((post) => (
            <ExpandablePost
              key={post.slug}
              title={post.title}
              date={post.date}
              excerpt={post.excerpt}
              content={
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content}
                </ReactMarkdown>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
