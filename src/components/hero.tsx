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
    return screenSize.lessThan('md') ? 'h-[400px]' : 'h-[500px]';
  };

  const getMaxWidth = () => {
    return screenSize.lessThan('md') ? 'max-w-md' : 'max-w-4xl';
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
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-8" style={{ paddingTop: '80px' }}>
          {/* Toggle Group for Categories */}
          <ToggleGroup
            type="single"
            className="bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 p-2 shadow-lg"
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
          >
            {categories.map((category) => (
              <ToggleGroupItem 
                key={category.value} 
                value={category.value} 
                className="px-6 py-3 text-base font-medium text-gray-700 hover:text-gray-900 data-[state=on]:bg-black data-[state=on]:text-white rounded-full transition-all"
              >
                {category.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {filteredItems.map((item) => (
              <div key={item.id} className="flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="size-24 rounded-md sm:size-28 xl:size-36 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 