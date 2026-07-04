"use client";

import * as React from "react";
import { motion } from "framer-motion";
import DiscCard from "@/components/ui/disc-card";

export type DiscItem = {
  id: string;
  title: string;
  onClick?: () => void;
  discSrc?: string;
  sleeveTitle?: string;
  sleeveSubtitle?: string;
  sleeveBottomCaption?: string;
};

type AlbumGridProps = {
  items: DiscItem[];
  className?: string;
  animatingDiscId?: string | null;
  tvState?: string;
  title?: string;
  onDiscHover?: (discId: string | null) => void;
};

export function AlbumGrid({ items, className = "", animatingDiscId, tvState, title, onDiscHover }: AlbumGridProps) {
  const getDiscAnimationState = (itemId: string) => {
    if (animatingDiscId === itemId) {
      switch (tvState) {
        case 'ejecting': return 'ejecting';
        case 'moving': return 'moving';
        case 'inserting': return 'inserting';
        case 'playing': return 'inserted';
        default: return 'idle';
      }
    }
    return 'idle';
  };

  return (
    <div className={`rounded-[60px] bg-white/30 backdrop-blur-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-6 sm:p-8 md:p-12 lg:p-16 ${className}`}>
      {title && (
        <p className="text-sm text-center mb-6 sm:mb-8" style={{ fontFamily: 'Sequel Sans Medium Disp', color: '#838383' }}>
          {title}
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-6xl mx-auto place-items-center">
        {items.map((item) => (
          <DiscCard
            key={item.id}
            onClick={item.onClick}
            className="w-full max-w-48"
            discSrc={item.discSrc}
            sleeveTitle={item.sleeveTitle}
            sleeveSubtitle={item.sleeveSubtitle}
            sleeveBottomCaption={item.sleeveBottomCaption}
            animationState={getDiscAnimationState(item.id)}
            isAnimating={animatingDiscId === item.id}
            onMouseEnter={() => onDiscHover?.(item.id)}
            onMouseLeave={() => onDiscHover?.(null)}
          />
        ))}
      </div>
    </div>
  );
}

export default AlbumGrid;


