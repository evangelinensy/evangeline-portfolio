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
  const sleeveWidthPercent = 50; // Optimized width per Figma spec
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
                  className={`relative w-full aspect-square rounded-[8px] overflow-visible ${className}`}
                  style={{ boxShadow: '0 4px 24px 0 rgba(0, 0, 0, 0.20)' }}
    >
      {/* Base: plastic tray background image at 40% */}
      <img src={backgroundImageSrc} alt="disc tray" className="absolute inset-0 w-full h-full object-cover rounded-[8px] opacity-40" />

      {/* Noise overlay */}
      <img src="/images/noise.png" alt="noise" className="absolute inset-0 w-full h-full object-cover rounded-[8px] mix-blend-color-burn opacity-90 pointer-events-none" />

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
                  <div className="absolute pointer-events-none bg-white overflow-hidden"
                        style={{ 
                          width: '48px',
                          right: '6px',
                          top: '6px',
                          height: 'calc(100% - 12px)',
                          boxSizing: 'border-box',
                          borderRadius: '0 8px 8px 0',
                          boxShadow: '-4px 0 8px 0 rgba(0, 0, 0, 0.15), -14.4px 0 20px 0 rgba(196, 196, 196, 0.50) inset',
                          filter: 'drop-shadow(0 2.519px 6.299px rgba(129, 129, 129, 0.20))'
                        }}>
        <div
          style={{
            display: 'flex',
            width: '48px',
            height: '100%',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '134px',
            flexShrink: 0,
            padding: '12px 6px',
            boxSizing: 'border-box'
          }}
        >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '16px',
                          alignSelf: 'stretch',
                          flexDirection: 'column'
                        }}
                      >
                        <span
                          style={{
                            writingMode: 'vertical-rl',
                            textOrientation: 'mixed',
                            fontFamily: 'Sequel Sans Light Head, Sequel Sans, Geist, sans-serif',
                            fontSize: 14,
                            lineHeight: '80%',
                            color: '#7F8E95',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                            letterSpacing: '0.01em',
                          }}
                        >
                          {sleeveTitle}
                        </span>
                        <span
                          style={{
                            writingMode: 'vertical-rl',
                            textOrientation: 'mixed',
                            fontFamily: 'Sequel Sans Book Display, Sequel Sans, Geist, sans-serif',
                            fontSize: 9,
                            lineHeight: '100%',
                            color: '#7F8E95',
                            whiteSpace: 'nowrap',
                            letterSpacing: '0.02em',
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
              fontSize: 10,
              color: '#9CA3AF',
              whiteSpace: 'nowrap',
              letterSpacing: '0.02em',
            }}
          >
            {sleeveBottomCaption}
          </span>
        </div>
      </div>
    </button>
  );
}

export default DiscCard;


