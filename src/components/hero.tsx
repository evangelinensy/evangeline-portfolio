"use client";

import { useState } from "react";
import { useScreenSize } from "@/hooks/use-screen-size";
import { PixelTrail } from "@/components/ui/pixel-trail";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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

  const categories = [
    { value: "all", label: "All" },
    { value: "shirt", label: "Shirt" },
    { value: "goggles", label: "Goggles" },
    { value: "shoes", label: "Shoes" },
  ];

  const portfolioItems = [
    {
      id: 1,
      category: "shirt",
      image: "https://images.unsplash.com/photo-1696086152504-4843b2106ab4?q=80&w=300",
    },
    {
      id: 2,
      category: "goggles",
      image: "https://images.unsplash.com/photo-1648688135643-2716ec8f4b24?q=80&w=300",
    },
    {
      id: 3,
      category: "shoes",
      image: "https://images.unsplash.com/photo-1631984564919-1f6b2313a71c?q=80&w=300",
    },
    {
      id: 4,
      category: "goggles",
      image: "https://images.unsplash.com/photo-1632168844625-b22d7b1053c0?q=80&w=300",
    },
    {
      id: 5,
      category: "shirt",
      image: "https://images.unsplash.com/photo-1583656346517-4716a62e27b7?q=80&w=300",
    },
    {
      id: 6,
      category: "shoes",
      image: "https://images.unsplash.com/photo-1596480370804-cff0eed14888?q=80&w=300",
    },
    {
      id: 7,
      category: "shirt",
      image: "https://images.unsplash.com/photo-1740711152088-88a009e877bb?q=80&w=300",
    },
    {
      id: 8,
      category: "shoes",
      image: "https://images.unsplash.com/photo-1696086152508-1711cc7bcc9d?q=80&w=300",
    },
    {
      id: 9,
      category: "goggles",
      image: "https://images.unsplash.com/photo-1684790369514-f292d2dffc11?q=80&w=300",
    },
  ];

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
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-8" style={{ paddingTop: '40px' }}>
          {/* Toggle Group for Categories */}
          <ToggleGroup
            type="single"
            className="bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 p-1 shadow-lg"
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
          >
            {categories.map((category) => (
              <ToggleGroupItem 
                key={category.value} 
                value={category.value} 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 data-[state=on]:bg-blue-500 data-[state=on]:text-white rounded-full transition-all"
              >
                {category.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
            {filteredItems.map((item) => (
              <div key={item.id} className="flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="size-20 rounded-md sm:size-24 xl:size-32 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 