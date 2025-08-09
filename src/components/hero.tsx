"use client";

import { useState } from "react";
import { useScreenSize } from "@/hooks/use-screen-size";
import { PixelTrail } from "@/components/ui/pixel-trail";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { portfolioItems, categories } from "@/data/portfolio";

export function Hero() {
  const screenSize = useScreenSize();
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Utility functions for responsive sizing
  const getHeroHeight = () => {
    return screenSize.lessThan('md') ? 'h-[500px]' : 'h-[600px]';
  };

  const getMaxWidth = () => {
    return screenSize.lessThan('md') ? 'max-w-sm' : 'max-w-4xl';
  };

  const getGridCols = () => {
    return screenSize.lessThan('sm') ? 'grid-cols-2' : 'grid-cols-3';
  };

  const getImageSize = () => {
    return screenSize.lessThan('sm') ? 'size-16' : screenSize.lessThan('md') ? 'size-20' : 'size-24';
  };



  // Filter items based on selected category
  const filteredItems = selectedCategory === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

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
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 px-4" style={{ paddingTop: screenSize.lessThan('md') ? '60px' : '80px' }}>
          {/* Toggle Group for Categories */}
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

          {/* Portfolio Grid */}
          <div className={`grid ${getGridCols()} gap-3 sm:gap-4 md:gap-6 max-w-xs sm:max-w-md md:max-w-2xl mx-auto`}>
            {filteredItems.map((item) => (
              <div key={item.id} className="flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className={`${getImageSize()} rounded-md object-cover hover:scale-105 active:scale-95 transition-transform duration-300 touch-manipulation`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 