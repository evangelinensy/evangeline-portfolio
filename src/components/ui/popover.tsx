"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScreenSize } from "@/hooks/use-screen-size";

interface PopoverProps {
  title: string;
  description: string;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Popover({ title, description, href, external, children, className }: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const screenSize = useScreenSize();

  useEffect(() => {
    setIsMobile(screenSize.lessThan('md'));
  }, [screenSize]);

  const handleInteraction = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsOpen(false);
    }
  };

  const handleViewClick = () => {
    if (href) {
      if (external) {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = href;
      }
    }
    setIsOpen(false);
  };

  return (
    <div
      ref={popoverRef}
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleInteraction}
    >
      {children}
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`
              absolute z-50 p-4 bg-white rounded-lg shadow-xl border border-gray-200
              ${isMobile 
                ? 'bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64' 
                : 'bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-72'
              }
            `}
            style={{
              filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))'
            }}
          >
            {/* Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              
              {/* Mobile CTA Button */}
              {isMobile && href && (
                <button
                  onClick={handleViewClick}
                  className="w-full mt-3 px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 active:scale-95 transition-all touch-manipulation"
                >
                  View
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 