"use client";

import { useScreenSize } from "@/hooks/use-screen-size";
import { PixelTrail } from "@/components/ui/pixel-trail";
import { TextPressure } from "@/components/ui/interactive-text-pressure";
import { useTheme } from "next-themes";

function getTextColor(theme: string | undefined) {
  return theme === "dark" ? "#ffffff" : "#111111"
}

function getStrokeColor(theme: string | undefined) {
  return theme === "dark" ? "#ff0000" : "#0066ff"
}

export function Hero() {
  const screenSize = useScreenSize();
  const { theme } = useTheme();

  // Utility functions for responsive sizing
  const getTextSize = (mobile: string, desktop: string) => {
    return screenSize.lessThan('md') ? mobile : desktop;
  };

  const getPosition = (mobile: string, desktop: string) => {
    return screenSize.lessThan('md') ? mobile : desktop;
  };

  const getHeroHeight = () => {
    return screenSize.lessThan('md') ? 'h-[400px]' : 'h-[500px]';
  };

  const getMaxWidth = () => {
    return screenSize.lessThan('md') ? 'max-w-md' : 'max-w-4xl';
  };

  return (
    <div className={`relative w-full ${getHeroHeight()} flex items-center justify-center bg-white text-center text-pretty overflow-hidden`}>
      {/* Hero Image Container - Responsive sizing */}
      <div className={`relative w-full ${getMaxWidth()} ${getHeroHeight()} mx-auto bg-white`}>
        {/* Background Image */}
        <div className="absolute inset-0 z-10">
          <img
            src="/images/hero-bg.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        </div>

        {/* Pixel Trail Effect */}
        <div className="absolute inset-0 z-15">
          <PixelTrail
            pixelSize={screenSize.lessThan('md') ? 8 : 12}
            className="w-full h-full"
          />
        </div>

        {/* Interactive Text Pressure Component */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <TextPressure
            text="PRODUCT DESIGNER"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor={getTextColor(theme)}
            strokeColor={getStrokeColor(theme)}
            minFontSize={36}
            className="cursor-default"
          />
        </div>
      </div>
    </div>
  );
} 