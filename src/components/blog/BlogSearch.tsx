'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { formatDistance } from 'date-fns';

interface SearchResult {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
}

export function BlogSearch() {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch('/writing/search.json')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);

  const filteredPosts = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerms = query.toLowerCase().split(' ');

    return posts.filter((post) => {
      const searchableText = [
        post.title,
        post.description,
        ...(post.tags || []),
      ]
        .join(' ')
        .toLowerCase();

      return searchTerms.every((term) => searchableText.includes(term));
    });
  }, [query, posts]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:border-primary transition-colors"
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span className="hidden sm:inline">Search posts...</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono bg-muted rounded">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20 px-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-card border border-border rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 p-4 border-b border-border">
              <svg
                className="w-5 h-5 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts by title, description, or tags..."
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                autoFocus
              />
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                ESC
              </button>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {query.trim() === '' ? (
                <div className="p-8 text-center text-muted-foreground">
                  Start typing to search posts...
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No posts found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {filteredPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/writing/${post.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="block p-4 hover:bg-muted/50 transition-colors"
                    >
                      <h3 className="font-semibold text-foreground mb-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {post.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <time>
                          {formatDistance(new Date(post.date), new Date(), {
                            addSuffix: true,
                          })}
                        </time>
                        {post.tags && post.tags.length > 0 && (
                          <>
                            <span>•</span>
                            <div className="flex gap-2">
                              {post.tags.slice(0, 3).map((tag) => (
                                <span key={tag}>#{tag}</span>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
