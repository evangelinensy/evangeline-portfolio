"use client";

import * as React from "react";
import { motion } from "framer-motion";

type DiscCardProps = {
  className?: string;
  onClick?: () => void;
  /** Optional override for the disc image (defaults to /images/disc-pomelo.png) */
  discSrc?: string;
  /** Optional override for the background/base color (defaults to white/30%) */
  backgroundColor?: string;
  /** Optional override for the plastic tray background image */
  backgroundImageSrc?: string;
  /** Text shown on the sleeve (top title) */
  sleeveTitle?: string;
  /** Text shown under the title */
  sleeveSubtitle?: string;
  /** Bottom-left caption on the sleeve */
  sleeveBottomCaption?: string;
};

/**
 * DiscCard renders a CD partially inside a sleeve, using provided PNG assets.
 * Hover: disc slides left by 12px. Click: triggers onClick to start insert flow.
 */
export function DiscCard({ className = "", onClick, discSrc = "/images/disc-pomelo.png", backgroundColor = "rgba(255,255,255,0.3)", backgroundImageSrc = "/images/disc-bg-new.png", sleeveTitle = "Pomelo", sleeveSubtitle = "Send money", sleeveBottomCaption = "Mobile\nApplication" }: DiscCardProps) {
  const [eject, setEject] = React.useState(false);
  // Visual constants tuned to Figma reference
  const sleeveWidthPercent = 36; // right sleeve width relative to card
  const discPercent = 84; // disc diameter relative to card
  const ejectOffsetPx = -43; // reduced by half
  return (
    <button
      onMouseEnter={() => setEject(true)}
      onMouseLeave={() => setEject(false)}
      onClick={(e) => {
        setEject((v) => !v);
        onClick?.();
      }}
      className={`relative w-full aspect-square rounded-[20px] shadow-[0_18px_60px_rgba(41,52,118,0.15)] overflow-visible ${className}`}
    >
      {/* Base: plastic tray background image at 40% */}
      <img src={backgroundImageSrc} alt="disc tray" className="absolute inset-0 w-full h-full object-cover rounded-[20px] opacity-40" />

      {/* Noise overlay */}
      <img src="/images/noise.png" alt="noise" className="absolute inset-0 w-full h-full object-cover rounded-[32px] mix-blend-color-burn opacity-90 pointer-events-none" />

      {/* Disc backdrop to ensure white base (avoids dark/black showing through PNG transparency) */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white pointer-events-none"
        style={{ width: `${discPercent}%`, height: `${discPercent}%` }}
        animate={{ x: eject ? ejectOffsetPx : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Disc */}
      <motion.img
        src={discSrc}
        alt="disc"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none"
        style={{ width: `${discPercent}%`, height: `${discPercent}%` }}
        animate={{ x: eject ? ejectOffsetPx : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Sleeve cover recreated with live UI (no image) */}
      <div className="absolute right-0 top-0 h-full pointer-events-none flex flex-col justify-between pl-2 pr-2 py-3 bg-white rounded-r-[20px] overflow-hidden"
           style={{ width: `${sleeveWidthPercent}%` }}>
        <div
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 6,
            paddingTop: 4,
            paddingBottom: 4,
          }}
        >
          <span
            style={{
              fontFamily: 'Sequel Sans Medium Disp',
              fontSize: 20,
              lineHeight: 1.15,
              color: '#8FA7B4',
            }}
          >
            {sleeveTitle}
          </span>
          <span
            style={{
              fontFamily: 'Sequel Sans Book Body',
              fontSize: 13,
              color: '#8FA7B4',
            }}
          >
            {sleeveSubtitle}
          </span>
        </div>
        <span
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            fontFamily: 'Sequel Sans Book Body',
            fontSize: 13,
            color: '#8FA7B4',
          }}
        >
          {sleeveBottomCaption}
        </span>
      </div>
    </button>
  );
}

export default DiscCard;


