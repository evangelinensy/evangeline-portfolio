"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useScreenSize } from "@/hooks/use-screen-size";
import { PixelTrail } from "@/components/ui/pixel-trail";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Popover } from "@/components/ui/popover";
import { FlipReveal, FlipRevealItem } from "@/components/ui/flip-reveal";
import { portfolioItems, categories } from "@/data/portfolio";
import { 
  MouseTrackerProvider as CursorProvider, 
  Pointer as Cursor, 
  PointerFollower as CursorFollow 
} from "@/components/ui/cursor";
import { MousePointer2 } from "lucide-react";
import { PomeloCard } from "@/components/ui/pomelo-card";
import RetroTV from "@/components/ui/retro-tv";
import AlbumGrid from "@/components/ui/album-grid";

export function Hero() {
  const screenSize = useScreenSize();
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Utility functions for responsive sizing
  const getHeroHeight = () => {
    // Remove fixed heights to allow page to grow and scroll on smaller screens
    return "";
  };

  const getMaxWidth = () => {
    return screenSize.lessThan('md') ? 'max-w-7xl' : 'max-w-4xl';
  };

  const getGridCols = () => {
    return screenSize.lessThan('sm') ? 'grid-cols-2' : 'grid-cols-4';
  };

  const getImageSize = () => {
    return screenSize.lessThan('sm') ? 'size-20' : screenSize.lessThan('md') ? 'size-24' : 'size-32';
  };

  // Items for the album grid; first item opens a Figma link in a new tab
  const albumItems = new Array(9).fill(0).map((_, i) => ({
    id: `disc-${i + 1}`,
    title: `Disc ${i + 1}`,
    onClick: i === 0 ? () => window.open(
      'https://www.figma.com/proto/5J0BiJ9DUAak9ADjciKolR/Ng-Evangeline-%7C-Case-Study?page-id=0%3A1&node-id=628-63951&starting-point-node-id=601%3A73257&scaling=scale-down-width&content-scaling=fixed&t=O1FOkD94Iru5awBL-1',
      '_blank',
      'noopener,noreferrer'
    ) : i === 1 ? () => window.open(
      'https://www.figma.com/proto/LUa94SB2a2AHmccU6P00S7/Pomelo-Website?page-id=0%3A1&node-id=1-1482&viewport=268%2C84%2C0.21&t=uweExkfTSg5hsLIU-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=1%3A1482',
      '_blank',
      'noopener,noreferrer'
    ) : i === 2 ? () => window.open('/case-studies/cromatic-techbio', '_self') : i === 3 ? () => window.open(
      'https://www.figma.com/proto/gVzjYcVdLj3WnCyCGxvkaz/Evangeline-%7C-Case-Study?page-id=0%3A1&node-id=3-10121&viewport=-259%2C102%2C0.07&t=5MxKE8EKM36byCqp-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=3%3A10121',
      '_blank',
      'noopener,noreferrer'
    ) : i === 4 ? () => window.open(
      'https://www.llmcook.com',
      '_blank',
      'noopener,noreferrer'
    ) : i === 5 ? () => window.open(
      'https://www.figma.com/proto/gVzjYcVdLj3WnCyCGxvkaz/Evangeline-%7C-Case-Study?page-id=0%3A1&node-id=7-13425&viewport=-259%2C102%2C0.07&t=5MxKE8EKM36byCqp-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=7%3A13425&show-proto-sidebar=1',
      '_blank',
      'noopener,noreferrer'
    ) : i === 6 ? () => window.open(
      'https://evangeline.webflow.io/work/locker-app',
      '_blank',
      'noopener,noreferrer'
    ) : i === 7 ? () => window.open(
      'https://loveletter.lovable.app/',
      '_blank',
      'noopener,noreferrer'
    ) : i === 8 ? () => window.open('/case-studies/cromatic-branding-website', '_self') : undefined,
    discSrc: i === 0 ? '/images/the disc-pomelo-new.png'
      : i === 1 ? '/images/pomelo-2-disc-new2.png'
      : i === 2 ? '/images/disc-cromatic-new.png'
      : i === 3 ? '/images/disc-aboutme.png'
      : i === 4 ? '/images/disc-llmcook-new.png'
      : i === 5 ? '/images/disc-sanrio.png'
      : i === 6 ? '/images/disc-locker.png'
      : i === 7 ? '/images/disc-loveletter.png'
      : i === 8 ? '/images/disc-cromatic2.png'
      : '/images/the disc-pomelo-new.png',
    sleeveTitle: i === 0 ? 'Pomelo' : i === 1 ? 'Pomelo.com' : i === 2 ? 'Cromatic' : i === 3 ? 'About Me' : i === 4 ? 'LLMCook' : i === 5 ? 'Sanrio' : i === 6 ? 'Parcel Locker' : i === 7 ? 'Love Letter' : i === 8 ? 'Cromatic' : 'Project',
    sleeveSubtitle: i === 0 ? 'Send money' : i === 1 ? 'Website' : i === 2 ? 'TechBio' : i === 3 ? 'Design' : i === 4 ? 'Game' : i === 5 ? 'Web3 Campaigns' : i === 6 ? 'Mobile App' : i === 7 ? 'Web App' : i === 8 ? 'Website' : 'Coming Soon',
    sleeveBottomCaption: undefined,
  }));

  return (
    <CursorProvider>
      <div className={`relative w-full min-h-screen flex items-start justify-center text-center text-pretty overflow-visible rounded-[24px]`}>
      
      {/* Website Background Image */}
      <div className="absolute inset-0 z-0 rounded-[24px]"
           style={{ 
             backgroundImage: 'url("/images/Website-background.png")',
             backgroundRepeat: 'no-repeat',
             backgroundPosition: 'center',
             backgroundSize: screenSize.lessThan('md') ? 'cover' : '100% 100%'
           }}>
      </div>
      
      {/* Grain Texture Overlay */}
      <div className="absolute inset-0 z-10 mix-blend-soft-light opacity-25 rounded-[24px]"
           style={{ 
             backgroundImage: 'url("/images/grain-texture.png")',
             backgroundRepeat: 'repeat',
             backgroundSize: screenSize.lessThan('md') ? '256px 256px' : '512px 512px'
           }}>
      </div>

      {/* Main Content Container */}
      <div className={`relative w-full ${getMaxWidth()} mx-auto z-20`}>
        
        {/* Hero Title - Two-line layout with constrained animation */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10 w-screen max-w-[100vw] overflow-hidden">
          <div className="relative w-full flex flex-col items-center justify-center gap-6">
            {/* "Hello" */}
            <motion.div
              className="w-full flex items-center justify-center"
              initial={{ x: 0, opacity: 0.48 }}
              animate={{ x: ["-6vw", "6vw", "-6vw"] , opacity: [0.48, 0.43, 0.48] }}
              transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
              style={{
                fontFamily: 'Bricolage Grotesque',
                fontSize: '246.4px',
                fontWeight: 600,
                lineHeight: '80%',
                color: '#D9D9D9',
                textAlign: 'center',
                fontVariationSettings: "'opsz' 14, 'wdth' 100"
              }}
            >
              Hello
            </motion.div>

            {/* "I'm Evan" */}
            <motion.div
              className="w-full flex items-center justify-center"
              initial={{ x: 0, opacity: 0.48 }}
              animate={{ x: ["6vw", "-6vw", "6vw"] , opacity: [0.48, 0.43, 0.48] }}
              transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
              style={{
                fontFamily: 'Bricolage Grotesque',
                fontSize: '246.4px',
                fontWeight: 600,
                lineHeight: '80%',
                color: '#D9D9D9',
                textAlign: 'center',
                fontVariationSettings: "'opsz' 14, 'wdth' 100"
              }}
            >
              I&apos;m Evan
            </motion.div>
          </div>
        </div>

        {/* Four Rotated White Squares with Images and Links - hidden for now */}
        <div className="hidden absolute inset-0 items-center justify-center z-30">
          <div className="grid grid-cols-4 gap-8 max-w-4xl mx-auto">
            {/* Square 1 - Pomelo Mobile App */}
            <div className="flex flex-col items-center justify-center">
              <a 
                href="https://www.figma.com/proto/5J0BiJ9DUAak9ADjciKolR/Ng-Evangeline-%7C-Case-Study?page-id=0%3A1&node-id=628-63951&starting-point-node-id=601%3A73257&scaling=scale-down-width&content-scaling=fixed&t=O1FOkD94Iru5awBL-1"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-none"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 transform hover:scale-105 transition-transform duration-300"
                     style={{ 
                       transform: 'rotate(350.294deg)'
                     }}>
                  <PomeloCard />
                </div>
              </a>
              <p className="mt-8 text-sm font-medium text-center"
                 style={{ 
                   fontFamily: 'Sequel Sans Medium Disp',
                   color: '#838383',
                   opacity: 0.8
                 }}>
                Pomelo: Send Money
              </p>
            </div>
            
            {/* Square 2 - Chef Claude AI */}
            <div className="flex flex-col items-center justify-center">
              <a 
                href="/case-studies/project-2"
                className="cursor-none"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 bg-white rounded-3xl shadow-2xl transform rotate-12 hover:scale-105 transition-transform duration-300"
                     style={{ 
                       boxShadow: '0px 8px 20px 14px rgba(129,129,129,0.2)',
                       transform: 'rotate(16.753deg)'
                     }}>
                </div>
              </a>
              <p className="mt-8 text-sm font-medium text-center"
                 style={{ 
                   fontFamily: 'Sequel Sans Medium Disp',
                   color: '#838383',
                   opacity: 0.8
                 }}>
                Chef Claude AI
              </p>
            </div>
            
            {/* Square 3 - Love Letter App */}
            <div className="flex flex-col items-center justify-center">
              <a 
                href="/case-studies/project-1"
                className="cursor-none"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 bg-white rounded-3xl shadow-2xl transform rotate-12 hover:scale-105 transition-transform duration-300"
                     style={{ 
                       boxShadow: '0px 8px 20px 14px rgba(129,129,129,0.2)',
                       transform: 'rotate(356.992deg)'
                     }}>
                </div>
              </a>
              <p className="mt-8 text-sm font-medium text-center"
                 style={{ 
                   fontFamily: 'Sequel Sans Medium Disp',
                   color: '#838383',
                   opacity: 0.8
                 }}>
                Love Letter App
              </p>
            </div>
            
            {/* Square 4 - Enterprise Dashboard */}
            <div className="flex flex-col items-center justify-center">
              <a 
                href="/case-studies/project-1"
                className="cursor-none"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 bg-white rounded-3xl shadow-2xl transform rotate-12 hover:scale-105 transition-transform duration-300"
                     style={{ 
                       boxShadow: '0px 8px 20px 14px rgba(129,129,129,0.2)',
                       transform: 'rotate(336.316deg)'
                     }}>
                </div>
              </a>
              <p className="mt-8 text-sm font-medium text-center"
                 style={{ 
                   fontFamily: 'Sequel Sans Medium Disp',
                   color: '#838383',
                   opacity: 0.8
                 }}>
                Enterprise Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* New TV + Album section */}
        <div className={`relative z-30 ${screenSize.lessThan('md') ? 'mt-20' : 'mt-32'} flex flex-col items-center gap-8 pb-20`}>
          <RetroTV width={300} className="mt-10" />
          <p className="text-sm" style={{ fontFamily: 'Sequel Sans Medium Disp', color: '#838383' }}>Select a work</p>
          <AlbumGrid
            className="w-full max-w-7xl"
            items={albumItems}
          />
        </div>

        {/* Portfolio Grid - Hidden for now as per request */}
        <div className="hidden">
        <div className="absolute inset-0 z-15">
          <PixelTrail
            pixelSize={screenSize.lessThan('md') ? 8 : 12}
            className="w-full h-full"
          />
        </div>

          <div className="absolute inset-0 z-20 flex flex-col items-center px-4" style={{ paddingTop: screenSize.lessThan('md') ? '60px' : '80px' }}>
            <div className="w-full flex justify-center mb-4 sm:mb-6 md:mb-8">
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

          <div className="flex-1 flex items-center justify-center">
            <FlipReveal
                className={`grid ${getGridCols()} gap-4 sm:gap-5 md:gap-6 max-w-xs sm:max-w-md md:max-w-2xl mx-auto`}
              keys={[selectedCategory]}
              showClass="flex"
              hideClass="hidden"
                duration={0.3}
                ease="power2.out"
                stagger={0.05}
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
                              aspectRatio: '1 / 1'
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
      
      {/* Custom Cursor */}
      <Cursor>
        <MousePointer2 className="fill-white stroke-gray-400" size={24} />
      </Cursor>
      <CursorFollow align="bottom-right" gap={40}>
        <div className="bg-white text-gray-800 border border-gray-200 text-xs px-3 py-1 rounded-md shadow-md">
          Wanderer
        </div>
      </CursorFollow>
    </div>
    </CursorProvider>
  );
} 