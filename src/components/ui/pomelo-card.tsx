"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface PomeloCardProps {
  className?: string;
  onClick?: () => void;
}

export function PomeloCard({ className = "", onClick }: PomeloCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`overflow-clip relative rounded-[34px] size-full bg-white ${className}`}
      style={{ cursor: 'none' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Green Card (Back) - Top left, smallest visible */}
      <motion.div 
        className="absolute flex inset-[20%_-50%_30%_-5%] items-center justify-center"
        animate={isHovered ? {
          y: -10,
          rotate: 8,
          scale: 1.02
        } : {
          y: 0,
          rotate: 20.262,
          scale: 1
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="flex-none h-[140px] w-[220px]">
          <img 
            src="/images/Pomelo-Card-Vector-GREEN.png" 
            alt="Pomelo Green Card"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Pink Card (Middle) - Center, medium visible */}
      <motion.div 
        className="absolute flex inset-[30%_-40%_10%_-10%] items-center justify-center"
        animate={isHovered ? {
          y: -15,
          rotate: 3,
          scale: 1.05
        } : {
          y: 0,
          rotate: 10.84,
          scale: 1
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="flex-none h-[140px] w-[220px]">
          <img 
            src="/images/Pomelo-Card-Vector-PINK.png.png" 
            alt="Pomelo Pink Card"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* White Card (Front) - Bottom right, largest visible */}
      <motion.div 
        className="absolute flex inset-[40%_-30%_-10%_-15%] items-center justify-center"
        animate={isHovered ? {
          y: -20,
          rotate: 0,
          scale: 1.08
        } : {
          y: 0,
          rotate: 0,
          scale: 1
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="flex-none h-[140px] w-[220px]">
          <img 
            src="/images/Pomelo-Card-Vector-WHITE.png" 
            alt="Pomelo White Card"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}
