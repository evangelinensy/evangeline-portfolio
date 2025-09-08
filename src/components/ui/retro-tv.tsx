"use client";

import * as React from "react";
import { motion } from "framer-motion";

type RetroTVProps = {
  className?: string;
  width?: number;
  onScreenClick?: () => void;
  children?: React.ReactNode; // optional overlay content inside screen later
};

export function RetroTV({ className = "", width = 600, onScreenClick, children }: RetroTVProps) {
  return (
    <div className={className} style={{ width }}>
      <div className="relative mx-auto" style={{ width, aspectRatio: 1 }}>
        {/* Base TV image */}
        <img
          src="/images/TV.png"
          alt="Retro TV"
          className="w-full h-auto select-none pointer-events-none"
          draggable={false}
        />

        {/* CD input overlay target (invisible anchor for animations) */}
        <div
          id="cd-slot-target"
          className="absolute"
          style={{ left: "50%", bottom: "15%", transform: "translateX(-50%)", width: 120, height: 24 }}
        />

        {/* Clickable screen overlay */}
        <motion.button
          type="button"
          onClick={onScreenClick}
          className="absolute left-1/2 top-[16%] -translate-x-1/2 focus:outline-none"
          style={{ width: width * 0.66, height: width * 0.5 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Screen base image so we can show an on state later */}
          <img src="/images/Screen.png" alt="TV Screen" className="w-full h-full object-cover rounded" />
          {children}
        </motion.button>

        {/* Optional top half for layering above screen if needed */}
        <img
          src="/images/TVtophalf.png"
          alt="TV Top"
          className="absolute inset-0 w-full h-auto pointer-events-none select-none"
          draggable={false}
        />
      </div>
    </div>
  );
}

export default RetroTV;



