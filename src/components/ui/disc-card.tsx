"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useScreenSize } from "@/hooks/use-screen-size";
import { useSound } from "@/hooks/use-sound";

type DiscAnimationState = 'idle' | 'ejecting' | 'moving' | 'inserting' | 'inserted';

type DiscCardProps = {
  className?: string;
  onClick?: (event?: React.MouseEvent) => void;
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
  /** Animation state for disc insertion flow */
  animationState?: DiscAnimationState;
  /** Whether this disc is currently being animated */
  isAnimating?: boolean;
};

/**
 * DiscCard renders a CD partially inside a sleeve, using provided PNG assets.
 * Hover: disc slides left by 12px. Click: triggers onClick to start insert flow.
 */
export function DiscCard({ 
  className = "", 
  onClick, 
  discSrc = "/images/disc-pomelo.png", 
  backgroundColor = "rgba(255,255,255,0.3)", 
  backgroundImageSrc = "/images/disc-bg-new.png", 
  sleeveTitle = "Pomelo", 
  sleeveSubtitle = "Send money", 
  sleeveBottomCaption = "Mobile\nApplication",
  animationState = 'idle',
  isAnimating = false
}: DiscCardProps) {
  const [eject, setEject] = React.useState(false);
  const screenSize = useScreenSize();
  const playClickSound = useSound("/sounds/click.mp3", 0.5);

  // Visual constants tuned to Figma reference
  const sleeveWidthPercent = 50; // Optimized width per Figma spec
  const discPercent = 84; // disc diameter relative to card
  const ejectOffsetPx = -43; // reduced by half

  // Animation variants for different states
  const getDiscAnimation = () => {
    // If not animating, use hover state
    if (animationState === 'idle') {
      return {
        x: eject ? ejectOffsetPx : 0,
        y: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        transition: { duration: 0.3 }
      };
    }
    
    // If animating, use animation states
    switch (animationState) {
      case 'ejecting':
        return {
          x: -60,
          y: -20,
          rotate: 15,
          scale: 1.1,
          transition: { duration: 0.6 }
        };
      case 'moving':
        return {
          x: 0,
          y: -60,
          rotate: 30,
          scale: 0.6,
          transition: { duration: 0.8 }
        };
      case 'inserting':
        return {
          x: 0,
          y: -40,
          rotate: 0,
          scale: 0.3,
          opacity: 0.9,
          transition: { duration: 0.6 }
        };
      case 'inserted':
        return {
          x: 0,
          y: -40,
          rotate: 0,
          scale: 0.3,
          opacity: 0,
          transition: { duration: 0.3 }
        };
      default:
        return {
          x: eject ? ejectOffsetPx : 0,
          y: 0,
          rotate: 0,
          scale: 1,
          opacity: 1,
          transition: { duration: 0.3 }
        };
    }
  };
  return (
    <button
      onMouseEnter={() => setEject(true)}
      onMouseLeave={() => setEject(false)}
      onClick={(e) => {
        playClickSound();
        setEject((v) => !v);
        onClick?.(e);
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
        animate={isAnimating ? { opacity: 0 } : getDiscAnimation()}
      />

      {/* Disc */}
      <motion.img
        src={discSrc}
        alt="disc"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none"
        style={{ width: `${discPercent}%`, height: `${discPercent}%` }}
        animate={isAnimating ? { opacity: 0 } : getDiscAnimation()}
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
                            flexDirection: 'column-reverse'
                          }}
                        >
                        <span
                          style={{
                            writingMode: 'vertical-rl',
                            textOrientation: 'mixed',
                            fontFamily: 'Sequel Sans Book Display, Sequel Sans, Geist, sans-serif',
                            fontSize: screenSize.lessThan('md') ? 15 : 13,
                            lineHeight: '100%',
                            color: '#78848A',
                            whiteSpace: 'nowrap',
                            letterSpacing: '0.02em',
                          }}
                        >
                          {sleeveSubtitle}
                        </span>
                        <span
                          style={{
                            writingMode: 'vertical-rl',
                            textOrientation: 'mixed',
                            fontFamily: 'Sequel Sans Light Head, Sequel Sans, Geist, sans-serif',
                            fontSize: screenSize.lessThan('md') ? 16 : 14,
                            lineHeight: '80%',
                            color: '#28343B',
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                            letterSpacing: '0.01em',
                          }}
                        >
                          {sleeveTitle}
                        </span>
          </div>
          {sleeveBottomCaption && (
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
          )}
        </div>
      </div>
    </button>
  );
}

export default DiscCard;


