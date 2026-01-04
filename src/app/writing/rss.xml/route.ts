import RSS from 'rss';
import { getAllPosts } from '@/lib/blog';

export const dynamic = 'force-static';

export async function GET() {
  const posts = getAllPosts();

  const feed = new RSS({
    title: 'Evangeline - Writing',
    description: 'Thoughts on UX design, product development, and creative processes.',
    site_url: 'https://evangeline.design',
    feed_url: 'https://evangeline.design/writing/rss.xml',
    language: 'en',
    pubDate: new Date().toUTCString(),
    ttl: 60,
  });

  posts.forEach((post) => {
    feed.item({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: `https://evangeline.design/writing/${post.slug}`,
      date: post.frontmatter.date,
      categories: post.frontmatter.tags || [],
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
