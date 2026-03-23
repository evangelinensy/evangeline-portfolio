"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./googly-eyes.module.css";

interface GooglyEyesProps {
  scanning?: boolean;
  size?: number;
  gap?: number;
  className?: string;
  blink?: boolean;
}

function Eye({
  size,
  scanning,
  blink: doBlink,
}: {
  size: number;
  scanning: boolean;
  blink: boolean;
}) {
  const eyeRef = useRef<HTMLDivElement>(null);
  const [pupilTransform, setPupilTransform] = useState({ x: 0, y: 0 });

  const pupilSize = size * 0.38;
  const maxOffset = (size / 2) - (pupilSize / 2) - 2;

  useEffect(() => {
    if (scanning) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;
      const rect = eyeRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const angle = Math.atan2(dy, dx);
      const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxOffset);
      setPupilTransform({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [scanning, maxOffset]);

  const scanOffset = maxOffset * 0.7;

  return (
    <div
      ref={eyeRef}
      className={`${styles.eye} ${doBlink ? styles.blink : ""}`}
      style={{ width: size, height: size }}
    >
      <div
        className={`${styles.pupil} ${scanning ? styles.scanning : ""}`}
        style={{
          width: pupilSize,
          height: pupilSize,
          transform: scanning
            ? undefined
            : `translate(${pupilTransform.x}px, ${pupilTransform.y}px)`,
          // CSS vars for the scan keyframe offsets
          ["--scan-left" as string]: `${-scanOffset}px`,
          ["--scan-right" as string]: `${scanOffset}px`,
          ["--scan-up" as string]: `${-scanOffset}px`,
          ["--scan-down" as string]: `${scanOffset}px`,
        }}
      />
    </div>
  );
}

export function GooglyEyes({
  scanning = false,
  size = 36,
  gap = 6,
  className = "",
  blink = true,
}: GooglyEyesProps) {
  return (
    <div
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap }}
    >
      <Eye size={size} scanning={scanning} blink={blink} />
      <Eye size={size} scanning={scanning} blink={blink} />
    </div>
  );
}
