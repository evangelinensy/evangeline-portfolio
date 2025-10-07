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
            Spotify GenAI Playlist Covers
          </h1>
          <p className="mt-3 text-[18px]" style={{ color: '#A0A0A0' }}>
            Designed on Figma, coded with Claude Code, built on top of Dreamlayer and ComfyUI.
          </p>
        </header>

        {/* Video Container */}
        <div className="w-full rounded-2xl overflow-hidden shadow-2xl bg-black">
          <video
            className="w-full h-auto"
            controls
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/videos/Spotifyplaylistdemo.mov" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

      </div>
    </main>
  );
}
