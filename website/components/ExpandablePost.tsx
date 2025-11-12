'use client';

import { useState } from 'react';

interface ExpandablePostProps {
  title: string;
  date: string;
  excerpt: string;
  content: React.ReactNode;
}

export default function ExpandablePost({ title, date, excerpt, content }: ExpandablePostProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="mb-12 pb-12 border-b border-ft-border last:border-b-0">
      <div className="mb-3">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <time className="text-sm text-ft-text/70">{date}</time>
      </div>

      {!isExpanded ? (
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <button
            onClick={() => setIsExpanded(true)}
            className="text-ft-accent hover:underline font-medium"
          >
            Read more →
          </button>
        </div>
      ) : (
        <div>
          <div className="prose max-w-none mb-4">
            {content}
          </div>
          <button
            onClick={() => setIsExpanded(false)}
            className="text-ft-accent hover:underline font-medium"
          >
            ↑ Show less
          </button>
        </div>
      )}
    </article>
  );
}
