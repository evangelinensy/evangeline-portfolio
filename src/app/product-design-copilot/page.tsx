"use client";

import React from "react";

export default function Page() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12" style={{ backgroundColor: '#000000' }}>
      <div className="w-full max-w-[1200px]">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1
            className="text-[40px] md:text-[56px] font-semibold tracking-tight"
            style={{ fontFamily: 'Bricolage Grotesque, system-ui, sans-serif', color: '#FFFFFF' }}
          >
            Product Design Copilot
          </h1>
          <div className="mt-3 text-[18px]" style={{ color: '#A0A0A0' }}>
            <p>A LLM-powered plugin that understands the design task, recommends UX improvements, and insert components directly in your Figma frame.</p>
          </div>
        </header>

        {/* Video Container */}
        <div className="w-full rounded-2xl overflow-hidden shadow-2xl bg-black mb-12">
          <video
            className="w-full h-auto"
            controls
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/videos/product design copilot project compressed-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Body Text */}
        <div className="w-full max-w-[900px] mx-auto">
          <div className="text-[14px] md:text-[16px] leading-relaxed" style={{ color: '#D0D0D0' }}>
            <h2 className="text-[24px] font-semibold mb-4" style={{ color: '#FFFFFF' }}>
              Solution
            </h2>
            <p className="mb-6">
              Product Design Copilot (Figma plugin): generates user flows, five UX improvements, pattern suggestions, and lightweight WCAG notes, then inserts authentic Material 3 or custom library components
            </p>

            <h2 className="text-[24px] font-semibold mt-8 mb-4" style={{ color: '#FFFFFF' }}>
              Inspiration
            </h2>
            <p className="mb-6">
              As a Product Designer, I wanted a copilot that understands the context of the problem I&apos;m solving, explains &quot;why&quot; and builds the UI instantly in Figma.
            </p>

            <h2 className="text-[24px] font-semibold mt-8 mb-4" style={{ color: '#FFFFFF' }}>
              What I built
            </h2>
            <p className="mb-6">
              A LLM Figma Plugin that analyzes the selected frame and context, persona, flows, and generates UX improvements, pattern suggestions with rationale, WCAG notes, and can insert real components from a bound library.
            </p>

            <h2 className="text-[24px] font-semibold mt-8 mb-4" style={{ color: '#FFFFFF' }}>
              How it works
            </h2>
            <ul className="mb-6 space-y-3 list-none pl-0">
              <li className="flex items-start">
                <span className="mr-3 mt-1.5" style={{ color: '#A0A0A0' }}>•</span>
                <span>Plugin UI collects task, persona, constraints; reads the frame.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1.5" style={{ color: '#A0A0A0' }}>•</span>
                <span>Backend prompts LLM (Gemini); validates JSON.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1.5" style={{ color: '#A0A0A0' }}>•</span>
                <span>Pattern mapping ties suggestions to Material Web components and previews. (Future: All OSS Design Systems. You can also provide your own Design System.)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1.5" style={{ color: '#A0A0A0' }}>•</span>
                <span>Plugin inserts UI components and scaffolds with auto‑layout.</span>
              </li>
            </ul>

            <h2 className="text-[24px] font-semibold mt-8 mb-4" style={{ color: '#FFFFFF' }}>
              Impact
            </h2>
            <p className="mb-6">
              Informed design decisions, clear &quot;whys&quot;, inspiration at the tip of your fingers, and built‑in accessibility checks. Design copilot as a smart plugin.
            </p>

            {/* GitHub CTA */}
            <div className="mt-12 flex flex-col items-center gap-4">
              <p className="text-[18px]" style={{ color: '#A0A0A0' }}>
                Open source on Github
              </p>
              <a
                href="https://github.com/evangelinensy/figma-task-aware-copilot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 text-[16px] font-medium rounded-full transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                }}
              >
                Github Repo
              </a>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
