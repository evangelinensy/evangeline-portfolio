#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get post title from command line args
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Error: Please provide a post title');
  console.log('Usage: npm run new:post "Your Post Title"');
  process.exit(1);
}

const title = args.join(' ');

// Generate slug from title
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

// Get current date in ISO format
const date = new Date().toISOString().split('T')[0];

// Create frontmatter template
const template = `---
title: "${title}"
description: "Add a brief description of your post here"
date: "${date}"
tags: []
draft: true
---

# ${title}

Start writing your post here...

## Section heading

Your content goes here.

### Subsection

More content...

## Code example

\`\`\`tsx
export function Example() {
  return <div>Hello World</div>;
}
\`\`\`

## Lists

- Item one
- Item two
- Item three

## Conclusion

Wrap up your thoughts here.
`;

// Define file path
const postsDir = path.join(process.cwd(), 'content', 'posts');
const filePath = path.join(postsDir, `${slug}.mdx`);

// Check if file already exists
if (fs.existsSync(filePath)) {
  console.error(`Error: Post "${slug}.mdx" already exists`);
  process.exit(1);
}

// Ensure posts directory exists
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

// Write the file
fs.writeFileSync(filePath, template, 'utf8');

console.log('\x1b[32m✓\x1b[0m Post created successfully!');
console.log('\x1b[36m→\x1b[0m File:', filePath);
console.log('\x1b[36m→\x1b[0m Slug:', slug);
console.log('\x1b[33m!\x1b[0m Remember to update the description and tags before publishing');
console.log('\x1b[33m!\x1b[0m Set draft: false when ready to publish');
