"use client";

import { useState } from "react";
import { useScreenSize } from "@/hooks/use-screen-size";
import { PixelTrail } from "@/components/ui/pixel-trail";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Popover } from "@/components/ui/popover";
import { FlipReveal, FlipRevealItem } from "@/components/ui/flip-reveal";
import { portfolioItems, categories } from "@/data/portfolio";

export function Hero() {
  const screenSize = useScreenSize();
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Utility functions for responsive sizing
  const getHeroHeight = () => {
    return screenSize.lessThan('md') ? 'h-[800px]' : 'h-[900px]'; // Increased height to prevent cutoff
  };

  const getMaxWidth = () => {
    return screenSize.lessThan('md') ? 'max-w-sm' : 'max-w-4xl';
  };

  const getGridCols = () => {
    return screenSize.lessThan('sm') ? 'grid-cols-2' : 'grid-cols-4'; // Changed from grid-cols-3 to grid-cols-4
  };

  const getImageSize = () => {
    return screenSize.lessThan('sm') ? 'size-20' : screenSize.lessThan('md') ? 'size-24' : 'size-32'; // Made images bigger
  };

  // FlipReveal handles filtering automatically based on selectedCategory

  // Force deployment update

  return (
    <div className={`relative w-full ${getHeroHeight()} flex items-center justify-center bg-white text-center text-pretty overflow-hidden`}>
      {/* Hero Image Container - Responsive sizing */}
      <div className={`relative w-full ${getMaxWidth()} ${getHeroHeight()} mx-auto bg-white`}>
        {/* Pixel Trail Effect */}
        <div className="absolute inset-0 z-15">
          <PixelTrail
            pixelSize={screenSize.lessThan('md') ? 8 : 12}
            className="w-full h-full"
          />
        </div>

        {/* Interactive Portfolio Grid */}
        <div className="absolute inset-0 z-20 flex flex-col items-center px-4" style={{ paddingTop: screenSize.lessThan('md') ? '60px' : '80px' }}> {/* Reduced padding */}
          {/* Fixed Toggle Group for Categories - Positioned at top */}
          <div className="w-full flex justify-center mb-4 sm:mb-6 md:mb-8"> {/* Reduced margin-bottom */}
            <ToggleGroup
              type="single"
              className="bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 p-1 sm:p-2 shadow-lg w-full max-w-xs sm:max-w-md"
              value={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value)}
            >
              {categories.map((category) => (
                <ToggleGroupItem
                  key={category.value}
                  value={category.value}
                  className="px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 text-sm sm:text-base font-medium text-gray-700 hover:text-gray-900 active:scale-95 data-[state=on]:bg-black data-[state=on]:text-white rounded-full transition-all flex-1 touch-manipulation"
                >
                  {category.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Portfolio Grid - Below tabs with stable positioning */}
          <div className="flex-1 flex items-center justify-center">
            <FlipReveal
              className={`grid ${getGridCols()} gap-4 sm:gap-5 md:gap-6 max-w-xs sm:max-w-md md:max-w-2xl mx-auto`} // Reduced gap
              keys={[selectedCategory]}
              showClass="flex"
              hideClass="hidden"
              duration={0.3} // Faster, smoother animations
              ease="power2.out" // Smoother easing
              stagger={0.05} // Minimal stagger for performance
              style={{
                gridTemplateRows: 'repeat(auto-fit, minmax(0, 1fr))',
                gridAutoRows: '1fr'
              }}
            >
              {portfolioItems.map((item) => (
                <FlipRevealItem 
                  key={item.id} 
                  flipKey={item.category} 
                  className="flex items-center justify-center w-full h-full"
                  // Performance optimizations
                  style={{
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Popover
                      title={item.popoverTitle || item.title}
                      description={item.popoverDescription || item.description}
                      href={item.href}
                      external={item.external}
                    >
                      {/* Clickable image wrapper */}
                      <div 
                        className="cursor-pointer w-full h-full flex items-center justify-center"
                        onClick={() => {
                          if (item.href) {
                            if (item.external) {
                              window.open(item.href, '_blank', 'noopener,noreferrer');
                            } else {
                              window.location.href = item.href;
                            }
                          }
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className={`${getImageSize()} rounded-md object-cover hover:scale-105 active:scale-95 transition-transform duration-300 touch-manipulation`}
                          style={{
                            willChange: 'transform',
                            backfaceVisibility: 'hidden',
                            aspectRatio: '1 / 1' // Force square aspect ratio
                          }}
                        />
                      </div>
                    </Popover>
                  </div>
                </FlipRevealItem>
              ))}
            </FlipReveal>
          </div>
        </div>
      </div>
    </div>
  );
} 