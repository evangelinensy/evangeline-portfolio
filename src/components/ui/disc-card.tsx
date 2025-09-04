"use client";

import * as React from "react";
import { motion } from "framer-motion";

type DiscCardProps = {
  className?: string;
  onClick?: () => void;
};

/**
 * DiscCard renders a CD partially inside a sleeve, using provided PNG assets.
 * Hover: disc slides left by 12px. Click: triggers onClick to start insert flow.
 */
export function DiscCard({ className = "", onClick }: DiscCardProps) {
  const [eject, setEject] = React.useState(false);
  return (
    <button
      onMouseEnter={() => setEject(true)}
      onMouseLeave={() => setEject(false)}
      onClick={(e) => {
        setEject((v) => !v);
        onClick?.();
      }}
      className={`relative w-full aspect-square rounded-[32px] shadow-[0_18px_60px_rgba(41,52,118,0.15)] overflow-visible ${className}`}
    >
      {/* Base */}
      <img src="/images/base.png" alt="base" className="absolute inset-0 w-full h-full object-cover rounded-[32px]" />

      {/* Noise overlay */}
      <img src="/images/noise.png" alt="noise" className="absolute inset-0 w-full h-full object-cover rounded-[32px] mix-blend-color-burn opacity-90 pointer-events-none" />

      {/* Disc */}
      <motion.img
        src="/images/disc.png"
        alt="disc"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] object-contain pointer-events-none"
        animate={{ x: eject ? -78 : -30 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Sleeve cover on the right (right-aligned) */}
      <img src="/images/Disc-cover.png" alt="cover" className="absolute right-0 top-0 h-full object-contain pointer-events-none" />
    </button>
  );
}

export default DiscCard;


