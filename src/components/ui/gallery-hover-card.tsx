import * as React from 'react';
import * as HoverCard from '@radix-ui/react-hover-card';

interface GalleryHoverCardProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function GalleryHoverCard({ children, title, description }: GalleryHoverCardProps) {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        {children}
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="origin-[var(--transform-origin)] rounded-lg bg-white dark:bg-neutral-800 px-6 py-4 text-gray-900 dark:text-gray-100 shadow-lg shadow-gray-200 outline outline-1 outline-gray-200 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300 z-50"
          sideOffset={8}
        >
          <div className="text-base font-medium">
            {title}
          </div>
          <div className="text-base text-gray-600 dark:text-gray-400">
            {description}
          </div>
          <HoverCard.Arrow className="fill-white dark:fill-neutral-800" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
} 