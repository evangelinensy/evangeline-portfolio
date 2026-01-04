import { getAllPosts } from '@/lib/blog';
import { NextResponse } from 'next/server';

export async function GET() {
  const posts = getAllPosts();

  const searchIndex = posts.map((post) => ({
    slug: post.slug,
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    tags: post.frontmatter.tags || [],
    date: post.frontmatter.date,
  }));

  return NextResponse.json(searchIndex);
}
