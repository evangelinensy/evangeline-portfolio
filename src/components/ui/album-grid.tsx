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
    <div className={`rounded-[60px] bg-[rgba(255,255,255,0.3)] backdrop-blur-[66px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-6 sm:p-8 md:p-12 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-5xl mx-auto place-items-center">
        {items.map((item) => (
          <DiscCard key={item.id} onClick={item.onClick} className="w-full sm:w-4/5" />
        ))}
      </div>
    </div>
  );
}

export default AlbumGrid;


