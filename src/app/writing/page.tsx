import { getAllPosts } from '@/lib/blog';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BlogSearch } from '@/components/blog/BlogSearch';

export const metadata: Metadata = {
  title: 'Writing | Evangeline',
  description: 'Thoughts on UX design, product development, and creative processes.',
  openGraph: {
    title: 'Writing | Evangeline',
    description: 'Thoughts on UX design, product development, and creative processes.',
    type: 'website',
  },
};

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold">Writing</h1>
            <BlogSearch />
          </div>
          <p className="text-lg text-muted-foreground">
            Thoughts on UX design, product development, and creative processes.
          </p>
        </header>

        {/* Posts List */}
        {posts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-12">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group relative border-b border-border pb-12 last:border-0"
              >
                {post.frontmatter.draft && (
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded mb-3">
                    Draft
                  </span>
                )}

                <Link href={`/writing/${post.slug}`}>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {post.frontmatter.title}
                  </h2>
                </Link>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <time dateTime={post.frontmatter.date}>
                    {formatDistance(new Date(post.frontmatter.date), new Date(), {
                      addSuffix: true,
                    })}
                  </time>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {post.frontmatter.description}
                </p>

                {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.frontmatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <Link
                  href={`/writing/${post.slug}`}
                  className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-primary hover:underline"
                >
                  Read more
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
