"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

export default function WhiteboardingCaseStudy() {
  const draggableAssets = [
    // Sharpie - top left, diagonal
    {
      src: "/images/whiteboardingproject/sharpie.png",
      alt: "Sharpie",
      className: "absolute top-8 left-[-2%] rotate-[50deg]",
      width: 350,
      height: 350,
    },
    // Mic - below sharpie
    {
      src: "/images/whiteboardingproject/asset1mic.png",
      alt: "Microphone",
      className: "absolute top-44 left-[12%] rotate-[0deg]",
      width: 140,
      height: 140,
    },
    // Big sticky note with text - bottom left
    {
      src: "/images/whiteboardingproject/assetstickynote.png",
      alt: "Sticky Note",
      className: "absolute top-[45%] left-[-3%] rotate-[-2deg]",
      width: 380,
      height: 380,
    },
    // Plain yellow sticky note - top right corner
    {
      src: "/images/whiteboardingproject/stickynote3.png",
      alt: "Sticky Note 3",
      className: "absolute top-[-5%] right-[-3%] rotate-[5deg]",
      width: 280,
      height: 280,
    },
    // Eraser - right side, middle
    {
      src: "/images/whiteboardingproject/eraser.png",
      alt: "Eraser",
      className: "absolute top-[40%] right-[-5%] rotate-[35deg]",
      width: 280,
      height: 280,
    },
    // Highlighter - bottom area
    {
      src: "/images/whiteboardingproject/highlighter.png",
      alt: "Highlighter",
      className: "absolute bottom-[15%] right-[25%] rotate-[-30deg]",
      width: 200,
      height: 200,
    },
    // Star - bottom left area
    {
      src: "/images/whiteboardingproject/star.png",
      alt: "Star",
      className: "absolute bottom-[20%] left-[15%] rotate-[-10deg]",
      width: 100,
      height: 100,
    },
  ];

  const features = [
    {
      icon: (
        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 bg-white border-[3px] border-white shadow-[inset_0_0_0_3px_white,0_0_0_1px_rgba(0,0,0,0.05)]" style={{ boxShadow: 'none', background: 'white' }}>
            <div className="w-full h-full bg-white flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="4" width="16" height="16" fill="white" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>
      ),
      iconSimple: "square",
      title: "Real-time feedback.",
      description: "AI-powered coach gives you instant, actionable insights after each challenge.",
    },
    {
      icon: (
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-white" />
        </div>
      ),
      iconSimple: "circle",
      title: "Whimsical canvas.",
      description: "Draw, code, and ideate on a playful whiteboard like never before.",
    },
    {
      icon: (
        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
          <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-white" />
        </div>
      ),
      iconSimple: "triangle",
      title: "Share & replay.",
      description: "Save sessions, share links, and review your progress easily.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Portfolio
        </Link>
      </div>

      {/* Hero Section with Draggable Assets */}
      <DraggableCardContainer className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gray-50">
        {/* Center Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-800 mb-4 pointer-events-none">
            AI Whiteboard Interview
          </h1>
          <p className="text-lg md:text-xl text-neutral-500 max-w-md mx-auto mb-8 pointer-events-none">
            Practice whiteboarding with an AI coach that gives real-time feedback
          </p>
          <a
            href="https://whiteboarding-mock.pages.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
          >
            Try Now
          </a>
        </div>

        {/* Draggable Assets */}
        {draggableAssets.map((asset, index) => (
          <DraggableCardBody
            key={index}
            className={`${asset.className} bg-transparent shadow-none p-0 min-h-0 w-auto rounded-none`}
          >
            <Image
              src={asset.src}
              alt={asset.alt}
              width={asset.width}
              height={asset.height}
              className="pointer-events-none relative z-10 object-contain drop-shadow-lg"
              draggable={false}
            />
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>

      {/* Demo Video Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <video
            className="w-full rounded-2xl shadow-lg"
            controls
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/images/whiteboardingproject/demo-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col">
                {/* Icon Card */}
                <div className="w-full aspect-square bg-[#f5f5f5] rounded-3xl flex items-center justify-center mb-6">
                  {feature.iconSimple === "square" && (
                    <div className="w-20 h-20 bg-white rounded-lg shadow-sm" />
                  )}
                  {feature.iconSimple === "circle" && (
                    <div className="w-20 h-20 bg-transparent rounded-full border-[6px] border-white" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }} />
                  )}
                  {feature.iconSimple === "triangle" && (
                    <div
                      className="w-0 h-0"
                      style={{
                        borderLeft: '40px solid transparent',
                        borderRight: '40px solid transparent',
                        borderBottom: '70px solid white',
                        filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.05))'
                      }}
                    />
                  )}
                </div>
                {/* Text */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to practice?
          </h2>
          <p className="text-xl text-gray-400 mb-10 leading-relaxed">
            Start your mock interview in seconds—no signup required.
          </p>
          <a
            href="https://whiteboarding-mock.pages.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors"
          >
            Try Now
          </a>
        </div>
      </section>
    </div>
  );
}
