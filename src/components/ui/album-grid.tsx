"use client";

import * as React from "react";
import { motion } from "framer-motion";
import DiscCard from "@/components/ui/disc-card";

export type DiscItem = {
  id: string;
  title: string;
  onClick?: () => void;
};

type AlbumGridProps = {
  items: DiscItem[];
  className?: string;
};

export function AlbumGrid({ items, className = "" }: AlbumGridProps) {
  return (
    <div className={`rounded-[60px] bg-[rgba(255,255,255,0.3)] backdrop-blur-[66px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-10 sm:p-14 md:p-20 lg:p-24 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 max-w-8xl mx-auto place-items-center scale-105 md:scale-[1.2] lg:scale-[1.2] origin-center justify-items-center">
        {items.map((item) => (
          <DiscCard key={item.id} onClick={item.onClick} className="w-full sm:w-4/5" />
        ))}
      </div>
    </div>
  );
}

export default AlbumGrid;


