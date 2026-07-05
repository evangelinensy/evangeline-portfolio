"use client";

import * as React from "react";
import { motion } from "framer-motion";

type PlaceholderVideoProps = {
  discSrc: string;
  className?: string;
  duration?: number; // in seconds
  onEnd?: () => void;
};

export function PlaceholderVideo({ 
  discSrc, 
  className = "", 
  duration = 3,
  onEnd
}: PlaceholderVideoProps) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const newProgress = Math.min(elapsed / duration, 1);
      setProgress(newProgress);
      
      if (newProgress >= 1) {
        clearInterval(interval);
        onEnd?.();
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [duration, onEnd]);

  return (
    <div className={`relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center ${className}`}>
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url("/images/grain-texture.webp")',
          backgroundRepeat: 'repeat',
          backgroundSize: '32px 32px'
        }}
      />
      
      {/* Spinning disc */}
      <motion.div
        className="relative z-10"
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ width: '60%', height: '60%' }}
      >
        <img
          src={discSrc}
          alt="Spinning disc"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </motion.div>
      
      {/* Progress indicator */}
      <div className="absolute bottom-4 left-4 right-4 h-1 bg-gray-600 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      
      {/* Loading text */}
      <div className="absolute top-4 left-4 right-4 text-center">
        <p className="text-white text-sm font-mono opacity-70">
          Loading content...
        </p>
      </div>
    </div>
  );
}

export default PlaceholderVideo;
