"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  
  // Animation state management
  const [tvState, setTvState] = useState<'idle' | 'ejecting' | 'moving' | 'inserting' | 'playing' | 'static'>('idle');
  const [currentDisc, setCurrentDisc] = useState<string | null>(null);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [animatingDiscId, setAnimatingDiscId] = useState<string | null>(null);
  const [discStartPosition, setDiscStartPosition] = useState<{x: number, y: number} | null>(null);
  const timeoutsRef = useRef<number[]>([]);

  const clearAnimationTimers = () => {
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];
  };

  const resetDiscState = () => {
    clearAnimationTimers();
    setTvState('idle');
    setAnimatingDiscId(null);
    setCurrentDisc(null);
    setCurrentVideo(null);
    setDiscStartPosition(null);
  };

  // Animation handler
  const handleDiscClick = (
    discId: string,
    discSrc: string,
    event?: React.MouseEvent,
    url?: string,
    external?: boolean
  ) => {
    if (tvState !== 'idle' && tvState !== 'static') {
      return; // Prevent clicks during animation
    }
    
    // Get the position of the clicked disc card
    if (event) {
      const rect = event.currentTarget.getBoundingClientRect();
      const heroRect = document.querySelector('.hero-section')?.getBoundingClientRect();
      if (heroRect) {
        const x = rect.left + rect.width / 2 - heroRect.left;
        const y = rect.top + rect.height / 2 - heroRect.top;
        // Calculate offset to TV center so all discs end at same position
        const centerX = heroRect.width / 2;
        const tvY = heroRect.height * 0.2; // TV is at 20% from top
        const xOffset = centerX - x;
        const yOffset = tvY - y;
        setDiscStartPosition({ x: xOffset, y: yOffset });
      }
    }
    
    setAnimatingDiscId(discId);
    setCurrentDisc(discSrc);
    
    // Start animation sequence
    setTvState('ejecting');
    
    // No video URL - will use placeholder component
    setCurrentVideo(null);
    
    // Animation timeline - synchronized with 2.5s disc animation
    timeoutsRef.current.push(window.setTimeout(() => setTvState('moving'), 300));

    // Open URL in new tab shortly after animation starts
    if (url) {
      timeoutsRef.current.push(window.setTimeout(() => {
        if (external) {
          window.open(url, '_blank', 'noopener,noreferrer');
        } else {
          window.open(url, '_blank');
        }
      }, 900));
    }
  };

  // Handle video end
  const handleVideoEnd = () => {
    setTvState('static');
    timeoutsRef.current.push(window.setTimeout(() => {
      resetDiscState();
    }, 1000));
  };

  // When user returns to the tab/window, ensure disc resets to original position
  useEffect(() => {
    const handleReturn = () => {
      resetDiscState();
    };
    window.addEventListener('focus', handleReturn);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) handleReturn();
    });
    return () => {
      window.removeEventListener('focus', handleReturn);
      document.removeEventListener('visibilitychange', () => {
        if (!document.hidden) handleReturn();
      });
    };
  }, []);

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

  // Items for the album grid with animation support
  // Map first 6 discs to existing portfolio links (work category)
  const workItems = portfolioItems.filter((p) => p.category === 'work').slice(0, 6);
  // Desired sleeve labels by position (matches provided screenshot)
  const sleeveTitles = [
    'Pomelo',
    'Spotify GenAI Covers',
    'Timer',
    'About Me',
    'AI Vibecode Tools',
    'Cromatic',
    'Parcel Locker',
    'Timer',
    'Cromatic',
  ];
  const sleeveSubtitles = [
    'Send money',
    '',
    'Web + Extension',
    'Design',
    'Guide',
    'TechBio',
    'Mobile App',
    'Web + Extension',
    'Website',
  ];

  let albumItems: Array<{
    id: string;
    title: string;
    onClick: (event?: React.MouseEvent) => void;
    discSrc: string;
    sleeveTitle: string;
    sleeveSubtitle: string;
    sleeveBottomCaption?: string;
    href: string | undefined;
    external: boolean | undefined;
  }> = workItems.map((item, i) => {
    const discId = `disc-${i + 1}`;
    const discSrc = i === 0 ? '/images/the disc-pomelo-new.png'
      : i === 1 ? '/images/spotify-disc2.png'
      : i === 2 ? '/images/timer-disc.png'
      : i === 3 ? '/images/disc-aboutme.png'
      : i === 4 ? '/images/stateofvibecode/stateofvibedisc.png'
      : '/images/disc-cromatic-new.png'; // Cromatic TechBio

    // Override URL for each disc
    const overrideHref = i === 1
      ? '/spotifyplaylist'
      : i === 2
      ? 'https://countdowntodate.netlify.app/'
      : i === 3
      ? 'https://www.figma.com/proto/gVzjYcVdLj3WnCyCGxvkaz/Evangeline-%7C-Case-Study?page-id=0%3A1&node-id=3-10121&viewport=-259%2C102%2C0.07&t=5MxKE8EKM36byCqp-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=3%3A10121'
      : i === 4
      ? 'https://evangelineng.substack.com/p/state-of-ai-vibe-coding-designing'
      : i === 5
      ? 'https://www.figma.com/proto/wDch1TapZLSfORyZcWQRQL/Intro?page-id=0%3A1&node-id=200-19297&p=f&viewport=1262%2C-431%2C0.3&t=pptRayJlvKyHmxfC-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=200%3A19297&show-proto-sidebar=1'
      : item.href;
    const overrideExternal = (i === 2 || i === 3 || i === 4 || i === 5) ? true : item.external;

    return {
      id: discId,
      title: sleeveTitles[i],
      onClick: (event?: React.MouseEvent) => handleDiscClick(discId, discSrc, event, overrideHref, overrideExternal),
      discSrc: discSrc,
      sleeveTitle: sleeveTitles[i],
      sleeveSubtitle: sleeveSubtitles[i],
      sleeveBottomCaption: undefined,
      href: overrideHref,
      external: overrideExternal,
    };
  });

  // Append Sanrio (Disc 7)
  albumItems = albumItems.concat({
    id: 'disc-7',
    title: 'Sanrio',
    onClick: (event?: React.MouseEvent) => handleDiscClick('disc-7', '/images/disc-sanrio.png', event, 'https://www.figma.com/proto/gVzjYcVdLj3WnCyCGxvkaz/Evangeline-%7C-Case-Study?page-id=0%3A1&node-id=7-13425&viewport=-259%2C102%2C0.07&t=5MxKE8EKM36byCqp-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=7%3A13425&show-proto-sidebar=1', true),
    discSrc: '/images/disc-sanrio.png',
    sleeveTitle: 'Sanrio',
    sleeveSubtitle: 'Web3 Campaigns',
    sleeveBottomCaption: undefined,
    href: 'https://www.figma.com/proto/gVzjYcVdLj3WnCyCGxvkaz/Evangeline-%7C-Case-Study?page-id=0%3A1&node-id=7-13425&viewport=-259%2C102%2C0.07&t=5MxKE8EKM36byCqp-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=7%3A13425&show-proto-sidebar=1',
    external: true,
  });

  // Append Pomelo.com Website (Disc 8)
  albumItems = albumItems.concat({
    id: 'disc-8',
    title: 'Pomelo.com',
    onClick: (event?: React.MouseEvent) => handleDiscClick('disc-8', '/images/pomelo-2-disc-new2.png', event, 'https://www.figma.com/proto/LUa94SB2a2AHmccU6P00S7/Pomelo-Website?page-id=0%3A1&node-id=1-1482&viewport=268%2C84%2C0.21&t=uweExkfTSg5hsLIU-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=1%3A1482', true),
    discSrc: '/images/pomelo-2-disc-new2.png',
    sleeveTitle: 'Pomelo.com',
    sleeveSubtitle: 'Website',
    sleeveBottomCaption: undefined,
    href: 'https://www.figma.com/proto/LUa94SB2a2AHmccU6P00S7/Pomelo-Website?page-id=0%3A1&node-id=1-1482&viewport=268%2C84%2C0.21&t=uweExkfTSg5hsLIU-1&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=1%3A1482',
    external: true,
  });

  // Append Cromatic Website (Disc 9)
  albumItems = albumItems.concat({
    id: 'disc-9',
    title: 'Cromatic',
    onClick: (event?: React.MouseEvent) => handleDiscClick('disc-9', '/images/disc-cromatic2.png', event, 'https://evangeline.design/case-studies/cromatic-branding-website/', true),
    discSrc: '/images/disc-cromatic2.png',
    sleeveTitle: 'Cromatic',
    sleeveSubtitle: 'Website',
    sleeveBottomCaption: undefined,
    href: 'https://evangeline.design/case-studies/cromatic-branding-website/',
    external: true,
  });

  return (
    <CursorProvider>
      <div className={`hero-section relative w-full min-h-screen flex items-start justify-center text-center text-pretty overflow-visible rounded-[24px]`}>
      
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
                      <RetroTV 
                        width={300} 
                        className="mt-10" 
                        tvState={tvState}
                        currentDisc={currentDisc || undefined}
                        videoSrc={currentVideo || '/evangelineng-design-hackathon.mov'}
                        onVideoEnd={handleVideoEnd}
                        onScreenClick={() => {
                          if (tvState === 'playing') {
                            setTvState('static');
                          } else {
                            setTvState('playing');
                          }
                        }}
                      />
          <p className="text-sm" style={{ fontFamily: 'Sequel Sans Medium Disp', color: '#838383' }}>Select a work</p>
          <AlbumGrid
            className="w-full max-w-7xl mx-auto"
            items={albumItems}
            animatingDiscId={animatingDiscId}
            tvState={tvState}
          />
          
          {/* Flying disc that travels across screen */}
          <AnimatePresence>
            {animatingDiscId && currentDisc && (
              <motion.div
                className="absolute z-50 pointer-events-none"
                initial={{ 
                  x: 0, 
                  y: 0, 
                  scale: 1,
                  rotate: 0,
                  rotateX: 0,
                  rotateY: 0,
                  skewX: 0,
                  skewY: 0,
                  opacity: 1
                }}
                animate={{
                  x: [0, 0, 0], // Stay centered horizontally
                  y: [300, 100, 0], // Move up to screen center
                  scale: [1, 1.05, 1], // Slight emphasis
                  rotate: [0, 5, 0],
                  rotateX: [0, 5, 0],
                  rotateY: [0, 0, 0],
                  skewX: [0, 0, 0],
                  skewY: [0, 0, 0],
                  opacity: [1, 1, 1]
                }}
                transition={{
                  duration: 1.0,
                  times: [0, 0.6, 1],
                  ease: "easeOut"
                }}
                style={{
                  width: screenSize.lessThan('md') ? '134px' : '161px', // Match disc card size
                  height: screenSize.lessThan('md') ? '134px' : '161px', // Match disc card size
                  left: '50%',
                  top: '50%', // Animate to screen center
                  transform: 'translate(-50%, -50%)',
                  transformStyle: 'preserve-3d', // Enable 3D transforms
                  perspective: '800px', // Closer perspective for more dramatic effect
                  zIndex: 50 // Ensure it's above other elements
                }}
              >
                <img
                  src={currentDisc}
                  alt="Flying disc"
                  className="w-full h-full object-contain"
                  style={{
                    transform: 'translateZ(0)', // Force hardware acceleration
                    backfaceVisibility: 'hidden', // Clean 3D rendering
                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3)) drop-shadow(0 5px 10px rgba(0,0,0,0.2))', // Enhanced shadow
                    imageRendering: 'crisp-edges' // Sharp rendering for better 3D effect
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
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