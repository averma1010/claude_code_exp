'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <nav className="border-b border-ft-border bg-ft-pink">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            <Link href="/blog">Your Name</Link>
          </h1>

          <div className="flex gap-8">
            <Link
              href="/blog"
              className={`text-lg no-underline hover:text-ft-accent transition-colors ${
                isActive('/blog') ? 'text-ft-accent font-semibold' : 'text-ft-text'
              }`}
            >
              Blog
            </Link>
            <Link
              href="/gallery"
              className={`text-lg no-underline hover:text-ft-accent transition-colors ${
                isActive('/gallery') ? 'text-ft-accent font-semibold' : 'text-ft-text'
              }`}
            >
              Gallery
            </Link>
            <Link
              href="/currently"
              className={`text-lg no-underline hover:text-ft-accent transition-colors ${
                isActive('/currently') ? 'text-ft-accent font-semibold' : 'text-ft-text'
              }`}
            >
              Currently
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
