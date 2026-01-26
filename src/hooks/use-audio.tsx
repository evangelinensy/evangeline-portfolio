"use client";

import { useEffect, useRef, useState, createContext, useContext, ReactNode } from "react";

type AudioContextType = {
  isUnlocked: boolean;
  playSound: (src: string) => void;
};

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const audioCache = useRef<Map<string, HTMLAudioElement>>(new Map());

  useEffect(() => {
    const unlockAudio = () => {
      setIsUnlocked(true);
      // Remove listeners after first interaction
      document.removeEventListener("click", unlockAudio);
      document.removeEventListener("touchstart", unlockAudio);
      document.removeEventListener("keydown", unlockAudio);
    };

    document.addEventListener("click", unlockAudio);
    document.addEventListener("touchstart", unlockAudio);
    document.addEventListener("keydown", unlockAudio);

    return () => {
      document.removeEventListener("click", unlockAudio);
      document.removeEventListener("touchstart", unlockAudio);
      document.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  const playSound = (src: string) => {
    let audio = audioCache.current.get(src);
    if (!audio) {
      audio = new Audio(src);
      audio.volume = 0.5;
      audioCache.current.set(src, audio);
    }
    audio.currentTime = 0;
    audio.play().then(() => {
      // If play succeeded, mark as unlocked
      if (!isUnlocked) setIsUnlocked(true);
    }).catch(() => {});
  };

  return (
    <AudioContext.Provider value={{ isUnlocked, playSound }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
