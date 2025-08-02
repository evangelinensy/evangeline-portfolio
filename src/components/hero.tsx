'use client';

import Image from "next/image"
import { useScreenSize } from "@/hooks/use-screen-size"
import { PixelTrail } from "@/components/ui/pixel-trail"
import { GooeyFilter } from "@/components/ui/gooey-filter"

export function Hero() {
  const screenSize = useScreenSize()

  // Responsive hero height
  const getHeroHeight = () => {
    if (screenSize.lessThan('sm')) return 'h-[400px]'
    if (screenSize.lessThan('md')) return 'h-[450px]'
    if (screenSize.lessThan('lg')) return 'h-[500px]'
    return 'h-[500px]'
  }

  // Responsive max width
  const getMaxWidth = () => {
    if (screenSize.lessThan('sm')) return 'max-w-full'
    if (screenSize.lessThan('md')) return 'max-w-[768px]'
    if (screenSize.lessThan('lg')) return 'max-w-[1024px]'
    return 'max-w-[1280px]'
  }

  // Mobile-specific positioning and sizing
  const isMobile = screenSize.lessThan('md')
  const isDesktop = screenSize.greaterThanOrEqual('lg')

  return (
    <div className={`relative w-full ${getHeroHeight()} flex items-center justify-center bg-white text-center text-pretty overflow-hidden`}>
      {/* Hero Image Container - Responsive sizing */}
      <div className={`relative w-full ${getMaxWidth()} ${getHeroHeight()} mx-auto`}>
        <Image
          src="/images/canvasmin.png"
          alt="Design workspace with creative elements"
          fill
          className="object-cover object-center rounded-3xl"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1280px"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 rounded-3xl"></div>
      </div>

      <GooeyFilter id="gooey-filter-pixel-trail" strength={5} />
      <div
        className="absolute inset-0 z-0"
        style={{ filter: "url(#gooey-filter-pixel-trail)" }}
      >
        <PixelTrail
          pixelSize={screenSize.lessThan(`md`) ? 16 : screenSize.lessThan('lg') ? 24 : 32}
          fadeDuration={0}
          delay={500}
          pixelClassName="bg-black"
        />
      </div>

      {/* Text Elements - Top Left */}
      <div
        className="absolute z-20 text-left"
        style={{
          top: isMobile ? '40px' : '60px',
          left: isMobile ? '40px' : '140px',
        }}
      >
        <span
          className="block font-black text-white leading-none"
          style={{ 
            fontSize: isMobile ? '32px' : isDesktop ? '50px' : '64px'
          }}
        >
          Evangeline Ng
        </span>
      </div>

      {/* Text Elements - Bottom Left */}
      <div
        className="absolute z-20 text-left"
        style={{
          bottom: isMobile ? '40px' : '60px',
          left: isMobile ? '40px' : '140px',
        }}
      >
        <span
          className="block font-black text-white leading-none"
          style={{ 
            fontSize: isMobile ? '28px' : isDesktop ? '50px' : '56px'
          }}
        >
          Product Designer
        </span>
      </div>

      {/* Text Elements - Top Right - Hidden on mobile */}
      <div
        className="absolute z-20 text-right hidden md:block"
        style={{
          top: isMobile ? '40px' : '60px',
          right: isMobile ? '40px' : '140px',
        }}
      >
        <span
          className="block font-black text-white leading-none"
          style={{ 
            fontSize: isMobile ? '32px' : isDesktop ? '50px' : '56px'
          }}
        >
          0 → 1
        </span>
      </div>
    </div>
  )
} 