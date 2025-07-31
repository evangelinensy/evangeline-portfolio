"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words";
  from?: { opacity: number; y: number };
  to?: { opacity: number; y: number };
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "center" | "right";
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "easeOut",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  const splitText = splitType === "chars" ? text.split("") : text.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay / 1000,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: from,
    visible: {
      ...to,
      transition: {
        duration,
        ease: "easeOut",
      },
    },
  };

  const handleAnimationComplete = () => {
    if (onLetterAnimationComplete) {
      onLetterAnimationComplete();
    }
  };

  return (
    <motion.div
      className={`${className} text-${textAlign}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once: true,
        amount: threshold,
        margin: rootMargin 
      }}
      onAnimationComplete={handleAnimationComplete}
    >
      {splitText.map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default SplitText; 