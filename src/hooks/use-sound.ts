"use client";

import { useCallback, useRef } from "react";

/**
 * Hook for playing sound effects
 * @param soundPath - Path to the sound file relative to /public (e.g., '/sounds/click.mp3')
 * @param volume - Volume level between 0 and 1 (default: 1)
 */
export function useSound(soundPath: string, volume: number = 1) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback(() => {
    try {
      // Create audio element if it doesn't exist
      if (!audioRef.current) {
        audioRef.current = new Audio(soundPath);
        audioRef.current.volume = volume;
      }

      // Reset to start and play
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        // Silently catch errors (e.g., if user hasn't interacted with page yet)
        console.debug("Sound playback failed:", error);
      });
    } catch (error) {
      console.debug("Error playing sound:", error);
    }
  }, [soundPath, volume]);

  return play;
}
