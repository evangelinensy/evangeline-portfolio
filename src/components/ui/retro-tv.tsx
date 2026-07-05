"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import PlaceholderVideo from "./placeholder-video";

type TVState = 'idle' | 'ejecting' | 'moving' | 'inserting' | 'playing' | 'static';

type RetroTVProps = {
  className?: string;
  width?: number;
  onScreenClick?: () => void;
  children?: React.ReactNode;
  // Animation state props
  tvState?: TVState;
  currentDisc?: string; // disc image src
  videoSrc?: string; // video src for playback
  onVideoEnd?: () => void;
};

export function RetroTV({ 
  className = "", 
  width = 600, 
  onScreenClick, 
  children,
  tvState = 'idle',
  currentDisc,
  videoSrc,
  onVideoEnd
}: RetroTVProps) {
  const [showStatic, setShowStatic] = React.useState(false);
  const [showPlay, setShowPlay] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Handle video playback
  React.useEffect(() => {
    if (tvState === 'playing' && videoRef.current && videoSrc) {
      // Set volume to 40%
      videoRef.current.volume = 0.4;
      // Show static for 0.5 seconds before playing video
      setShowStatic(true);
      const staticTimer = setTimeout(() => {
        setShowStatic(false);
        videoRef.current?.play();
      }, 500);

      return () => clearTimeout(staticTimer);
    } else if (tvState === 'static' && videoRef.current) {
      // Pause video when state changes to static
      videoRef.current.pause();
    }
  }, [tvState, videoSrc]);

  // Handle video end
  const handleVideoEnd = () => {
    setShowStatic(true);
    setTimeout(() => {
      setShowStatic(false);
      onVideoEnd?.();
    }, 1000);
  };

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

        {/* TV Slot - visible when disc is being inserted or playing */}
        <AnimatePresence>
          {(tvState === 'inserting' || tvState === 'playing') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bg-black rounded-sm shadow-lg"
              style={{ 
                left: "50%", 
                bottom: "22%", // Higher up to match Figma
                transform: "translateX(-50%)", 
                width: 80, // Narrower slot
                height: 15 // Thinner slot
              }}
            />
          )}
        </AnimatePresence>

        {/* Clickable screen overlay */}
        <motion.button
          type="button"
          onClick={onScreenClick}
          onMouseEnter={() => setShowPlay(true)}
          onMouseLeave={() => setShowPlay(false)}
          className="group absolute left-1/2 top-[6%] -translate-x-1/2 focus:outline-none overflow-hidden cursor-pointer z-20 rounded-[4px]"
          style={{ width: width * 0.8109 + 3, height: width * 0.63342 - 2, marginTop: 4 }}
        >
          {/* Screen base image */}
          <img src="/images/Screen.png" alt="TV Screen" className="w-full h-full object-cover" />
          
          {/* Hover play/pause button */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className={`${showPlay ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity duration-200`}>
              {tvState === 'playing' ? (
                <div className="w-16 h-16 rounded-full bg-black/20 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" style={{ opacity: 0.5 }}>
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-black/20 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" style={{ opacity: 0.5 }}>
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Video content */}
          <AnimatePresence>
            {tvState === 'playing' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 w-full h-full"
              >
                {videoSrc ? (
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    onEnded={handleVideoEnd}
                    muted={false}
                    style={{ opacity: 0.6 }}
                    controls={false}
                    playsInline
                  >
                    <source src={videoSrc} type="video/mp4" />
                  </video>
                ) : (
                  <PlaceholderVideo
                    discSrc={currentDisc || "/images/disc-pomelo.png"}
                    className="rounded"
                    duration={3}
                    onEnd={handleVideoEnd}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Static overlay */}
          <AnimatePresence>
            {showStatic && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-400 via-gray-600 to-gray-800"
                style={{
                  backgroundImage: 'url("/images/grain-texture.webp")',
                  backgroundRepeat: 'repeat',
                  backgroundSize: '64px 64px',
                  mixBlendMode: 'overlay'
                }}
              />
            )}
          </AnimatePresence>

          {children}
        </motion.button>

        {/* Optional top half for layering above screen if needed */}
        <img
          src="/images/TVtophalf.png"
          alt="TV Top"
          className="absolute inset-0 w-full h-auto pointer-events-none select-none z-0"
          draggable={false}
        />
      </div>
    </div>
  );
}

export default RetroTV;






