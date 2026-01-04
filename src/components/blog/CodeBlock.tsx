'use client';

import { useState } from 'react';

interface CodeBlockProps {
  children: string;
  className?: string;
  raw?: string;
}

export function CodeBlock({ children, className, raw }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const language = className?.replace('language-', '') || 'text';
  const codeContent = raw || children;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={handleCopy}
          className="px-3 py-1.5 text-xs font-medium bg-muted hover:bg-muted/80 text-muted-foreground rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Copy code"
        >
          {copied ? (
            <span className="flex items-center gap-1">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Copied!
            </span>
          ) : (
            <span className="flex items-center gap-1">
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
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy
            </span>
          )}
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg bg-muted/50 border border-border">
        <div className="px-4 py-3 border-b border-border">
          <span className="text-xs font-medium text-muted-foreground uppercase">
            {language}
          </span>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className={className}>{children}</code>
        </pre>
      </div>
    </div>
  );
}
