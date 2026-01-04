'use client';

import Image from 'next/image';
import { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

interface BlogImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  priority?: boolean;
}

export function BlogImage({
  src,
  alt,
  width = 800,
  height = 600,
  caption,
  priority = false,
}: BlogImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <figure className="my-8">
      <Zoom>
        <div className="relative overflow-hidden rounded-lg bg-muted">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`w-full h-auto transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setIsLoading(false)}
            priority={priority}
            quality={90}
          />
          {isLoading && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
        </div>
      </Zoom>
      {caption && (
        <figcaption className="mt-2 text-sm text-center text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
