# Blog Module Guide

Welcome to your new blog! This guide covers everything you need to know to write and publish blog posts.

## Quick Start

### Creating a New Post

```bash
npm run new:post "Your Post Title"
```

This will:
- Create a new MDX file in `content/posts/`
- Auto-generate a slug from your title
- Set up frontmatter template with today's date
- Mark the post as draft by default

### Frontmatter Fields

Every post starts with YAML frontmatter:

```yaml
---
title: "Your Post Title"
description: "Brief description for SEO and previews"
date: "2026-01-04"
tags: ["design", "ux", "product"]
draft: true
canonical: "https://example.com/original" # optional
ogImage: "/images/og/custom.png" # optional
---
```

**Required:**
- `title`: Post title (used in meta tags and OG)
- `description`: SEO description (155 chars recommended)
- `date`: ISO format (YYYY-MM-DD)
- `tags`: Array of tags for categorization

**Optional:**
- `draft`: Set to `false` to publish (defaults to `true`)
- `canonical`: Canonical URL if republishing
- `ogImage`: Custom Open Graph image path

### Writing Content

Posts support full MDX, which means you can use:
- **Markdown**: headings, lists, links, images, code blocks
- **React Components**: Import and use custom components

#### Basic Markdown

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text** and *italic text*

- Bullet list
- Another item

1. Numbered list
2. Second item

[Link text](https://example.com)

> Blockquote for callouts

---

Horizontal rule
```

#### Code Blocks

\`\`\`tsx
export function WelcomeButton() {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
      Welcome!
    </button>
  );
}
\`\`\`

Syntax highlighting is automatic. Supported languages: tsx, jsx, js, ts, python, css, html, bash, etc.

#### Images

Simple image:

```markdown
![Alt text](/images/blog/my-image.png)
```

**Recommended:** Store blog images in `/public/writing/{slug}/` for organization.

Advanced image with zoom:

```mdx
import { BlogImage } from '@/components/blog/BlogImage';

<BlogImage
  src="/writing/my-post/screenshot.png"
  alt="Description of image"
  caption="Optional caption"
  width={1200}
  height={800}
/>
```

#### Image Gallery

For multiple images:

```mdx
import { ImageGallery } from '@/components/blog/ImageGallery';

<ImageGallery
  columns={3}
  images={[
    { src: "/writing/my-post/img1.png", alt: "First image", caption: "Optional" },
    { src: "/writing/my-post/img2.png", alt: "Second image" },
    { src: "/writing/my-post/img3.png", alt: "Third image" },
  ]}
/>
```

## Workflow

### Local Development

1. Create a new post:
   ```bash
   npm run new:post "Post Title"
   ```

2. Start dev server:
   ```bash
   npm run dev
   ```

3. Visit `http://localhost:3000/writing` to see your draft

4. Edit `content/posts/your-post-title.mdx`

### Publishing

1. Set `draft: false` in frontmatter
2. Review SEO fields (title, description, tags)
3. Commit and push to your repo:
   ```bash
   git add content/posts/your-post-title.mdx
   git commit -m "Publish: Your Post Title"
   git push
   ```

4. Netlify will automatically build and deploy

### Draft Previews

- **Local**: Drafts are always visible at `http://localhost:3000/writing`
- **Netlify Deploy Previews**: Drafts are visible on preview URLs
- **Production**: Drafts are hidden automatically

## URLs

- **Blog index**: `/writing`
- **Individual post**: `/writing/{slug}`
- **RSS feed**: `/writing/rss.xml`
- **Sitemap**: Automatically includes all published posts
- **Search index**: `/writing/search.json` (powers search)

## SEO Features

Every post automatically gets:

- **Meta tags**: title, description from frontmatter
- **Open Graph**: og:title, og:description, og:image, og:type
- **Twitter Cards**: summary_large_image format
- **Canonical URL**: auto-generated or custom
- **JSON-LD**: Article schema for rich results
- **Sitemap**: Auto-added to sitemap.xml
- **RSS**: Auto-added to RSS feed

## Search

Press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux) to open search.

Search indexes:
- Post titles
- Descriptions
- Tags

Results update in real-time as you type.

## Performance Tips

1. **Optimize images**: Use compressed PNGs/JPEGs or WebP
2. **Image dimensions**: Specify width/height to avoid layout shift
3. **Lazy loading**: Images lazy-load by default
4. **Code splitting**: Heavy components only load on blog pages

## File Structure

```
evangeline-portfolio/
├── content/
│   └── posts/
│       ├── welcome-to-my-blog.mdx
│       └── your-post-title.mdx
├── public/
│   └── writing/
│       └── your-post-title/
│           ├── image1.png
│           └── image2.png
├── src/
│   ├── app/
│   │   ├── writing/
│   │   │   ├── page.tsx          # Blog index
│   │   │   ├── [slug]/page.tsx   # Post template
│   │   │   ├── rss.xml/route.ts  # RSS feed
│   │   │   └── search.json/route.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   └── blog/
│   │       ├── BlogImage.tsx
│   │       ├── ImageGallery.tsx
│   │       ├── BlogSearch.tsx
│   │       └── CodeBlock.tsx
│   └── lib/
│       └── blog.ts               # Content utilities
└── scripts/
    └── new-post.js               # Post generator
```

## Troubleshooting

### Post not showing up

- Check `draft: false` in frontmatter
- Verify file extension is `.mdx` or `.md`
- Check filename has no spaces (use hyphens)

### Images not loading

- Ensure images are in `/public/`
- Use absolute paths starting with `/`
- Check image file extensions

### Build errors

Run type check:
```bash
npm run type-check
```

Check build locally:
```bash
npm run build
```

## Tips

1. **Keep slugs short**: URL-friendly, lowercase, hyphens only
2. **Write descriptions**: Important for SEO and social sharing
3. **Tag consistently**: Use lowercase, singular form
4. **Add alt text**: Improves accessibility and SEO
5. **Preview before publishing**: Check formatting, links, images
6. **Use code blocks sparingly**: Too many can hurt readability

## Advanced: Custom Components

You can create and import custom React components:

```mdx
import { MyCustomComponent } from '@/components/blog/MyCustomComponent';

<MyCustomComponent prop="value" />
```

## Support

For issues or feature requests, check:
- Project README.md
- Next.js MDX docs: https://nextjs.org/docs/app/building-your-application/configuring/mdx
- File an issue in the repo

---

Happy writing!
