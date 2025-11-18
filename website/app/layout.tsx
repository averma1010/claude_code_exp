import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Personal Website",
  description: "My personal website - blog, gallery, and currently",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Navigation />
        <main className="max-w-4xl mx-auto px-6 py-8">
          {children}
        </main>
        <footer className="border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-6 py-6 text-center text-sm text-gray-600">
            Built with{' '}
            <a
              href="https://www.anthropic.com/claude/code"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Claude Code
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
