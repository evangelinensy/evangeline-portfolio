import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const { frontmatter } = post;
  const ogImage = frontmatter.ogImage || `/og/writing/${slug}.png`;

  return {
    title: `${frontmatter.title} | Evangeline`,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: 'article',
      publishedTime: frontmatter.date,
      authors: ['Evangeline'],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: frontmatter.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: [ogImage],
    },
    alternates: {
      canonical: frontmatter.canonical || `https://evangeline.design/writing/${slug}`,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content, readingTime } = post;

  // Get prev/next posts
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    author: {
      '@type': 'Person',
      name: 'Evangeline',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Evangeline',
      logo: {
        '@type': 'ImageObject',
        url: 'https://evangeline.design/logo.png',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen py-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            {frontmatter.draft && (
              <span className="inline-block px-3 py-1 text-sm font-medium bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded mb-4">
                Draft Preview
              </span>
            )}

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {frontmatter.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-6">
              {frontmatter.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-8 border-b border-border">
              <time dateTime={frontmatter.date}>
                {format(new Date(frontmatter.date), 'MMMM d, yyyy')}
              </time>
              <span>•</span>
              <span>{readingTime}</span>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <MDXRemote
              source={content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [
                      rehypePrettyCode,
                      {
                        theme: 'github-dark',
                        keepBackground: false,
                      },
                    ],
                    [
                      rehypeAutolinkHeadings,
                      {
                        behavior: 'wrap',
                      },
                    ],
                  ],
                },
              }}
            />
          </div>

          {/* Tags */}
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="mt-12 pt-8 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-6">
            {prevPost ? (
              <Link
                href={`/writing/${prevPost.slug}`}
                className="group p-6 rounded-lg border border-border hover:border-primary transition-colors"
              >
                <span className="text-sm text-muted-foreground mb-2 block">Previous</span>
                <span className="font-semibold group-hover:text-primary transition-colors">
                  {prevPost.frontmatter.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextPost && (
              <Link
                href={`/writing/${nextPost.slug}`}
                className="group p-6 rounded-lg border border-border hover:border-primary transition-colors text-right md:col-start-2"
              >
                <span className="text-sm text-muted-foreground mb-2 block">Next</span>
                <span className="font-semibold group-hover:text-primary transition-colors">
                  {nextPost.frontmatter.title}
                </span>
              </Link>
            )}
          </nav>

          {/* Back to writing */}
          <div className="mt-8 text-center">
            <Link
              href="/writing"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to all posts
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
