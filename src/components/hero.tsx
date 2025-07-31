'use client';

import Image from "next/image"
import { useScreenSize } from "@/hooks/use-screen-size"
import { PixelTrail } from "@/components/ui/pixel-trail"
import { GooeyFilter } from "@/components/ui/gooey-filter"

export function Hero() {
  const screenSize = useScreenSize()

  // Responsive text sizes based on screen size
  const getTextSize = (baseSize: number) => {
    if (screenSize.lessThan('sm')) return baseSize * 0.6
    if (screenSize.lessThan('md')) return baseSize * 0.8
    if (screenSize.lessThan('lg')) return baseSize * 0.9
    return baseSize
  }

  // Responsive positioning based on screen size
  const getPosition = (basePosition: number) => {
    if (screenSize.lessThan('sm')) return basePosition * 0.5
    if (screenSize.lessThan('md')) return basePosition * 0.7
    if (screenSize.lessThan('lg')) return basePosition * 0.85
    return basePosition
  }

  // Responsive hero height
  const getHeroHeight = () => {
    if (screenSize.lessThan('sm')) return 'h-[400px]'
    if (screenSize.lessThan('md')) return 'h-[500px]'
    if (screenSize.lessThan('lg')) return 'h-[600px]'
    return 'h-[700px]'
  }

  // Responsive max width
  const getMaxWidth = () => {
    if (screenSize.lessThan('sm')) return 'max-w-full'
    if (screenSize.lessThan('md')) return 'max-w-[768px]'
    if (screenSize.lessThan('lg')) return 'max-w-[1024px]'
    return 'max-w-[1280px]'
  }

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
          top: `${getPosition(80)}px`,
          left: `${getPosition(80)}px`
        }}
      >
        <h1 
          className="font-medium leading-tight text-white"
          style={{ fontSize: `${getTextSize(45)}px` }}
        >
          Evangeline<br />Ng
        </h1>
      </div>

      {/* Text Elements - Bottom Left */}
      <div 
        className="absolute z-20 text-left"
        style={{
          bottom: `${getPosition(80)}px`,
          left: `${getPosition(80)}px`
        }}
      >
        <h2 
          className="font-medium leading-tight text-white"
          style={{ fontSize: `${getTextSize(45)}px` }}
        >
          Product<br />Designer
        </h2>
      </div>

      {/* Text Elements - Top Right */}
      <div 
        className="absolute z-20"
        style={{
          top: `${getPosition(80)}px`,
          right: `${getPosition(80)}px`
        }}
      >
        <span 
          className="font-bold text-white"
          style={{ fontSize: `${getTextSize(32)}px` }}
        >
          0 → 1
        </span>
      </div>

      {/* Text Elements - Bottom Right */}
      <div 
        className="absolute z-20"
        style={{
          bottom: `${getPosition(80)}px`,
          right: `${getPosition(80)}px`
        }}
      >
        <span 
          className="font-bold text-white"
          style={{ fontSize: `${getTextSize(48)}px` }}
        >
          Co-create
        </span>
      </div>
    </div>
  )
} 