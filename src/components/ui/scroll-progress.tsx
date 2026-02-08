"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  containerRef?: React.RefObject<HTMLElement>;
  className?: string;
}

export function ScrollProgress({ containerRef, className }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={cn(
        "h-1 origin-left bg-gradient-to-r from-[#79A8FF] via-[#B2DDDA] to-[#F2B7C8]",
        className
      )}
      style={{ scaleX }}
    />
  );
}

export default ScrollProgress;
