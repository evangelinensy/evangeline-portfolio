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
    { value: "evangeline", label: "Evangeline Ng" },
    { value: "work", label: "Work" },
    { value: "projects", label: "Projects" },
    { value: "journal", label: "Journal" },
  ];

  const portfolioItems = [
    {
      id: 1,
      category: "evangeline",
      title: "UX Designer",
      description: "Product Designer & UX Researcher",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300",
    },
    {
      id: 2,
      category: "work",
      title: "Case Studies",
      description: "Detailed design process",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=300",
    },
    {
      id: 3,
      category: "projects",
      title: "Portfolio",
      description: "Selected works",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=300",
    },
    {
      id: 4,
      category: "journal",
      title: "Design Blog",
      description: "Thoughts & insights",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=300",
    },
    {
      id: 5,
      category: "work",
      title: "Research",
      description: "User research & insights",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=300",
    },
    {
      id: 6,
      category: "projects",
      title: "Prototypes",
      description: "Interactive designs",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=300",
    },
    {
      id: 7,
      category: "journal",
      title: "Process",
      description: "Design methodology",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=300",
    },
    {
      id: 8,
      category: "evangeline",
      title: "About",
      description: "Get to know me",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=300",
    },
    {
      id: 9,
      category: "work",
      title: "Strategy",
      description: "Design strategy",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=300",
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
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {filteredItems.map((item) => (
              <div key={item.id} className="flex flex-col items-center p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-lg object-cover mb-2"
                />
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-600 text-center">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 