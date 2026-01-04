import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { readingTime } from 'reading-time-estimator';

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  draft?: boolean;
  canonical?: string;
  ogImage?: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
}

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export function getAllPosts(): Post[] {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => /\.mdx?$/.test(fileName))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const reading = readingTime(content);

      return {
        slug,
        frontmatter: data as PostFrontmatter,
        content,
        readingTime: reading.text,
      };
    })
    // Filter drafts in production
    .filter((post) => {
      if (process.env.NODE_ENV === 'production' && process.env.CONTEXT !== 'deploy-preview') {
        return !post.frontmatter.draft;
      }
      return true;
    })
    // Sort by date descending
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      return dateB - dateA;
    });

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      // Try .md extension
      const mdPath = path.join(postsDirectory, `${slug}.md`);
      if (!fs.existsSync(mdPath)) {
        return null;
      }
      const fileContents = fs.readFileSync(mdPath, 'utf8');
      const { data, content } = matter(fileContents);
      const reading = readingTime(content);

      return {
        slug,
        frontmatter: data as PostFrontmatter,
        content,
        readingTime: reading.text,
      };
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const reading = readingTime(content);

    return {
      slug,
      frontmatter: data as PostFrontmatter,
      content,
      readingTime: reading.text,
    };
  } catch {
    return null;
  }
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();

  posts.forEach((post) => {
    post.frontmatter.tags?.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}

export function getPostsByTag(tag: string): Post[] {
  const posts = getAllPosts();
  return posts.filter((post) =>
    post.frontmatter.tags?.includes(tag)
  );
}
