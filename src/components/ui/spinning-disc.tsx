"use client";

import * as React from "react";
import { motion } from "framer-motion";

type SpinningDiscProps = {
  discSrc: string;
  className?: string;
  size?: number;
};

export function SpinningDisc({ discSrc, className = "", size = 200 }: SpinningDiscProps) {
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <motion.img
        src={discSrc}
        alt="Spinning disc"
        className="w-full h-full object-contain"
        animate={{ rotate: 360 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}

export default SpinningDisc;



