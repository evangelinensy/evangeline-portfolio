"use client";

import React, { useState } from "react";

function HowIBuiltItSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-3 w-full text-left mb-4 hover:opacity-80 transition-opacity"
      >
        <h2 className="text-[24px] font-semibold" style={{ color: '#FFFFFF' }}>
          How I built it
        </h2>
        <svg
          className="transition-transform duration-200"
          style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isExpanded && (
        <div className="text-[14px] md:text-[16px] leading-relaxed" style={{ color: '#D0D0D0' }}>
          <p className="mb-4">
            <strong>Plugin:</strong> Cursor generated TypeScript stubs for code.ts and ui.ts, plus a clean manifest with restricted network access. I iterated the UI copy and controls (Detail, Response style, Tone) directly in Cursor&apos;s IDE.
          </p>
          <ul className="mb-4 space-y-3 list-none pl-0">
            <li className="flex items-start">
              <span className="mr-3 mt-1.5" style={{ color: '#A0A0A0' }}>•</span>
              <div>
                <strong>Backend:</strong> In Claude Code, I wrote the system prompt and safety envelopes, then a simple Express endpoint that returns 2–3 variants as JSON. Keys stay server‑side; the plugin calls fetch.
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-3 mt-1.5" style={{ color: '#A0A0A0' }}>•</span>
              <div>
                <strong>Extensibility:</strong> Model‑agnostic by design. Current build uses Gemini; swapping to OpenAI or Claude is a one‑file client change in the backend with API keys.
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

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
            Conversational AI Copy Generator
          </h1>
          <div className="mt-3 text-[18px]" style={{ color: '#A0A0A0' }}>
            <p>Generate production output in your high fidelity prototype in Figma</p>
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
            <source src="/videos/AI copy generator Figma Plugin compressed-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Body Text */}
        <div className="w-full max-w-[900px] mx-auto">
          <div className="text-[14px] md:text-[16px] leading-relaxed" style={{ color: '#D0D0D0' }}>
            <h2 className="text-[24px] font-semibold mb-4" style={{ color: '#FFFFFF' }}>
              Problem
            </h2>
            <p className="mb-6">
              Mock text breaks in real UI.
            </p>

            <h2 className="text-[24px] font-semibold mb-4" style={{ color: '#FFFFFF' }}>
              Solution
            </h2>
            <p className="mb-6">
              Generate production-style assistant copy inside Figma.
            </p>

            <p className="mb-6">
              Designers prototype conversations with neat flowcharts and placeholder text, then discover tone issues, missing edge cases, and weak guardrails when the real model shows up.
            </p>

            <p className="mb-6">
              I built Conversational AI Copy Generator, a Figma plugin that puts production-style, context-aware assistant copy directly on your canvas. Describe the scenario, pick tone, optionally choose a response style, and generate. It reads your selection&apos;s frame, components, and nearby text, and includes built-in safety patterns—guardrails, privacy notes, bias disclosure—so ethics are part of the design.
            </p>

            <HowIBuiltItSection />

            <h2 className="text-[24px] font-semibold mt-8 mb-4" style={{ color: '#FFFFFF' }}>
              How it helps
            </h2>
            <ul className="mb-6 space-y-3 list-none pl-0">
              <li className="flex items-start">
                <span className="mr-3 mt-1.5" style={{ color: '#A0A0A0' }}>•</span>
                <span>Align design, product, and engineering on the same conversational artifact.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1.5" style={{ color: '#A0A0A0' }}>•</span>
                <span>Move beyond if/else by shaping prompts, verbosity, and guardrails in UI.</span>
              </li>
            </ul>

            <p className="mb-6">
              This keeps designers, PMs, and engineers aligned on the same conversational artifact, catches tone and edge cases early, and turns &quot;nice comps&quot; into trustworthy assistant behavior you can ship.
            </p>

            <p className="mb-6">
              <strong>Access:</strong> free tier via shared backend; add a Gemini API key for unlimited. Supports other LLMs via API keys.
            </p>

            {/* Figma Community CTA */}
            <div className="mt-12 flex flex-col items-center gap-4">
              <p className="text-[18px]" style={{ color: '#A0A0A0' }}>
                Try it on Figma Community
              </p>
              <a
                href="https://www.figma.com/community/plugin/1563464248968571532"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 text-[16px] font-medium rounded-full transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                }}
              >
                Try Figma Plugin!
              </a>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
