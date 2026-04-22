"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { TestMorphChat } from "@/components/testmorph";
import { SubstackLinkCard } from "@/components/ui/substack-link-card";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { GooglyEyes } from "@/components/ui/googly-eyes";
import { Agentation } from "agentation";

export default function WebAgentCaseStudy() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedText, setSelectedText] = useState<string>("");

  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    if (text && text.length > 0) {
      setSelectedText(text);
    }
  }, []);

  const clearSelectedText = useCallback(() => {
    setSelectedText("");
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-2 bg-gray-100">
        <ScrollProgress className="h-2" />
      </div>

      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition-all duration-150 shadow-sm hover:-translate-x-0.5 active:scale-95"
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded-full mb-4">
              AI / Browser Extension
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 flex items-center gap-4">
              Web Agent
              <GooglyEyes size={44} gap={8} blink />
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              A lightweight web agent for instant verdicts.
            </p>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                My Role
              </h3>
              <p className="text-gray-900">Builder</p>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Timeline
              </h3>
              <p className="text-gray-900">Hackathon Win<br />↓<br />Live Project</p>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Tools
              </h3>
              <p className="text-gray-900">Figma, Cursor, Claude Code, Chrome extension APIs</p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Description
            </h3>
            <p className="text-gray-900">A concept for a browser-native agent that gives you a verdict in five seconds without pulling you away from the page.</p>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Demo Container */}
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden group">
            {/* "Try it out" button - appears on hover in top area */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-full opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center gap-2 hover:bg-slate-800 active:scale-95 z-10"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Try it out
            </button>

            {/* CNN Article Preview */}
            <div className="relative h-[420px]">
              {/* Fake CNN Header */}
              <div className="bg-[#cc0000] text-white px-6 py-2">
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold tracking-tight">CNN</span>
                  <nav className="hidden md:flex items-center gap-3 text-xs">
                    <span className="opacity-80">World</span>
                    <span className="opacity-80">U.S.</span>
                    <span className="font-semibold border-b border-white pb-0.5">Health</span>
                    <span className="opacity-80">Politics</span>
                  </nav>
                </div>
              </div>

              {/* Article Preview Content */}
              <div className="px-6 py-6 max-w-3xl mx-auto pb-24">
                {/* Breadcrumb */}
                <div className="text-xs text-gray-500 mb-3 flex items-center gap-2">
                  <span>Health</span>
                  <span>›</span>
                  <span>Disease and Conditions</span>
                </div>

                {/* Headline */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3">
                  Pediatric flu deaths this season reach highest level in years, CDC reports
                </h1>

                {/* Byline */}
                <div className="flex items-center gap-3 text-xs text-gray-600 mb-4 pb-4 border-b border-gray-200">
                  <span>By <span className="font-medium text-gray-900">Jen Christensen, CNN</span></span>
                  <span className="text-gray-400">|</span>
                  <span>Updated 2:34 PM EST, Thu January 16, 2026</span>
                </div>

                {/* Article Preview */}
                <div className="prose prose-sm max-w-none text-gray-800">
                  <p className="text-base leading-relaxed mb-4">
                    The number of flu-related deaths among children this season has surpassed last year&apos;s total, health officials announced Thursday, as the country grapples with a particularly severe influenza season.
                  </p>
                  <p className="text-sm text-gray-700">
                    According to the Centers for Disease Control and Prevention, <strong>32 children have died from flu-related complications</strong> since the season began in October...
                  </p>
                </div>
              </div>

              {/* Fade overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />

              {/* Chat Demo - overlaid at bottom */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-xl px-4">
                <TestMorphChat placeholder="Fact-check this article..." loaderVariant="eyes" systemPrompt="You are a web agent fact-checking a CNN health article about pediatric flu deaths this season. Respond in an objective, professional tone — no hedging, no casual language, no opinion. State what the article claims, what the evidence supports, and flag any unsupported or outdated claims. Key claims: 32 children have died from flu-related complications since October, vaccination rates are at ~40% vs pre-pandemic ~60%, and H1N1 strains are dominant this season. Answer in 1-2 sentences. When asked for a verdict, state it plainly with the basis for the assessment." />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Problem Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Problem</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We see 100,000 words daily and believe what we read by default because doubting is hard work.
            </p>

            <div className="bg-white border border-gray-200 rounded-xl px-8 py-4 my-8">
              <p className="text-gray-900 text-base leading-relaxed">
                Verifying claims is a &quot;mental tax&quot; that forces you to break flow and open separate tabs.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Web Agent gives you a trust verdict in 5 seconds, right on the page you&apos;re reading.
            </p>
          </div>
        </div>
      </section>

      {/* The Bottom Bar Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">The Component</h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              The core surface is a thin bar anchored to the bottom of the viewport.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              You stay on the page. The agent lives in your peripheral vision.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              You type a short intent like &quot;fact check this article.&quot; The bar thinks for a beat, then responds with a single sentence:
            </p>

            <div className="bg-slate-900 text-white rounded-xl p-6 my-8 font-mono text-sm">
              <p>&quot;Most of the concrete claims in this CNN piece align with CDC and WHO data. Some stats are outdated.&quot;</p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              The agent keeps the surrounding context, but narrows the verdict to that specific claim.
            </p>

            <p className="text-xl font-medium text-gray-900 my-8">
              No sidebars. No modals. No new tabs.<br />
              Just a verdict layered over the page you&apos;re already reading.
            </p>
          </div>
        </div>
      </section>

      {/* Hackathon Learning Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">From the Hackathon</h3>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              This pattern came from watching people use the first version of the agent at a hackathon.
            </p>

            <div className="my-6 not-prose">
              <SubstackLinkCard
                title="Web Agent that won in a Hackathon"
                articleTitle="How I Built A Research Agent in 5 Hours"
                href="https://evangelineng.substack.com/p/how-i-built-a-research-agent-in-5"
              />
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              The prototype returned verdicts like &quot;FACTS,&quot; plus citations on tap. In practice, almost no one opened details unless it contradicted what they already believed.
            </p>
            <p className="text-gray-700 leading-relaxed">
              That behavior pushed the design toward an even smaller surface: a persistent, low‑profile bar instead of a full extension popup.
            </p>
          </div>
        </div>
      </section>

      {/* Staying in Flow Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Staying in flow</h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              The bar is deliberately pinned to the bottom.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              You never lose your place in the article. The content doesn&apos;t shift. The bar can appear, update, and disappear without stealing focus.
            </p>
          </div>
        </div>
      </section>

      {/* Beyond Fact-Checking Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Beyond fact‑checking</h2>
          <p className="text-gray-600 mb-12">
            Although the first use case is news and social content, the same form factor works on very different surfaces.
          </p>

          {/* Travel Example */}
          <div className="mb-12 mt-[100px]">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Travel
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              You&apos;re comparing flights. One option looks cheap, but something feels off.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Ask the agent: &quot;Why is the $847 flight so cheap?&quot;
            </p>

            {/* Travel Demo with Fake Flight UI */}
            <div className="relative bg-slate-100 rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              {/* Window chrome header */}
              <div className="bg-[#3B5BDB] px-4 py-3 flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-white/25" />
                  <div className="w-3 h-3 rounded-full bg-white/25" />
                  <div className="w-3 h-3 rounded-full bg-white/25" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white/15 rounded px-3 py-0.5 text-white/70 text-xs font-mono tracking-wide">
                    flights.google.com
                  </div>
                </div>
              </div>
              {/* Fake Flight Search Results */}
              <div className="p-6 pb-4 h-[300px] overflow-y-auto space-y-3">
                {/* Search Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">SFO → NRT</p>
                    <p className="text-xs text-gray-500">Round trip · 1 passenger · Economy</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="px-2 py-1 bg-white rounded border border-gray-200">Price</span>
                    <span className="px-2 py-1 bg-white rounded border border-gray-200">Duration</span>
                  </div>
                </div>

                {/* Flight 1 - Cheapest */}
                <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">Cheapest</span>
                      <span className="text-gray-400 text-xs">2 bookings required</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">$847</p>
                      <p className="text-xs text-gray-500">round trip</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">SFO</p>
                      <p className="text-xs text-gray-500">6:00 AM</p>
                    </div>
                    <div className="flex-1 mx-4 flex flex-col items-center">
                      <p className="text-xs text-gray-400 mb-1">1 stop · 18h 45m</p>
                      <div className="w-full h-px bg-gray-300 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 text-sm">NRT</p>
                      <p className="text-xs text-gray-500">+1 day</p>
                    </div>
                  </div>
                </div>

                {/* Flight 2 - Best */}
                <div className="bg-white rounded-xl border-2 border-blue-200 p-3 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded">Best</span>
                      <span className="text-gray-400 text-xs">Direct flight</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">$1,247</p>
                      <p className="text-xs text-gray-500">round trip</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">SFO</p>
                      <p className="text-xs text-gray-500">11:30 AM</p>
                    </div>
                    <div className="flex-1 mx-4 flex flex-col items-center">
                      <p className="text-xs text-gray-400 mb-1">Nonstop · 11h 15m</p>
                      <div className="w-full h-px bg-blue-300"></div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 text-sm">NRT</p>
                      <p className="text-xs text-gray-500">+1 day</p>
                    </div>
                  </div>
                </div>

                {/* Flight 3 */}
                <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs">1 stop · LAX</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">$923</p>
                      <p className="text-xs text-gray-500">round trip</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">SFO</p>
                      <p className="text-xs text-gray-500">2:45 PM</p>
                    </div>
                    <div className="flex-1 mx-4 flex flex-col items-center">
                      <p className="text-xs text-gray-400 mb-1">1 stop · 14h 30m</p>
                      <div className="w-full h-px bg-gray-300 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 text-sm">NRT</p>
                      <p className="text-xs text-gray-500">+1 day</p>
                    </div>
                  </div>
                </div>

                {/* Flight 4 */}
                <div className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm opacity-60">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs">2 stops</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">$789</p>
                      <p className="text-xs text-gray-500">round trip</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">SFO</p>
                      <p className="text-xs text-gray-500">8:15 PM</p>
                    </div>
                    <div className="flex-1 mx-4 flex flex-col items-center">
                      <p className="text-xs text-gray-400 mb-1">2 stops · 24h 10m</p>
                      <div className="w-full h-px bg-gray-300 relative">
                        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
                        <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 text-sm">NRT</p>
                      <p className="text-xs text-gray-500">+2 days</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Demo - overlaid at bottom */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-xl px-4">
                <TestMorphChat placeholder="Ask about these flights..." loaderVariant="eyes" systemPrompt="You are a web agent helping analyze flight search results for SFO to NRT (San Francisco to Tokyo). Flights shown: $847 cheapest but requires 2 separate bookings, 1 stop, 18h45m. $1,247 best option, direct nonstop, 11h15m. $923 mid-range, 1 stop via LAX, 14h30m. $789 cheapest overall but 2 stops, 24h10m. Answer questions about these flights in 1-2 sentences — explain trade-offs, flag anything suspicious, help the user decide." />
              </div>
            </div>
          </div>

          {/* Personal Finance Example */}
          <div style={{ marginTop: "120px" }}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Personal Finance
            </h3>
            <div className="text-gray-700 leading-relaxed mb-6 space-y-2">
              <p>This is your bank statement (or a list of your transactions).</p>
              <p>Ask the agent: &quot;How much am I spending on subscriptions monthly?&quot;</p>
              <p>Get your answer: The agent scans the page and gives you the total immediately.</p>
            </div>

            {/* Finance Demo with Fake Bank UI */}
            <div className="relative rounded-2xl shadow-lg overflow-hidden border border-gray-200" style={{ backgroundColor: '#062655' }}>
              {/* Fake Bank Transaction List - scrollable container */}
              <div className="p-6 pb-4 h-[300px] overflow-y-auto">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  {/* Header */}
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between" style={{ backgroundColor: '#EAEDF2' }}>
                    <p className="font-medium text-gray-900 uppercase">Recent Transactions</p>
                    <p className="text-sm text-gray-500">This month</p>
                  </div>

                  {/* Transactions */}
                  <div className="divide-y divide-gray-50">
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Whole Foods Market</p>
                        <p className="text-xs text-gray-400">Groceries · Jan 18</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">-$87.34</p>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Spotify</p>
                        <p className="text-xs text-gray-400">Subscription · Jan 15</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">-$9.99</p>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Shell Gas Station</p>
                        <p className="text-xs text-gray-400">Auto & Transport · Jan 14</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">-$52.18</p>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Netflix</p>
                        <p className="text-xs text-gray-400">Subscription · Jan 12</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">-$15.99</p>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Uber Eats</p>
                        <p className="text-xs text-gray-400">Food & Drink · Jan 11</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">-$28.45</p>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Figma</p>
                        <p className="text-xs text-gray-400">Subscription · Jan 10</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">-$12.00</p>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Amazon</p>
                        <p className="text-xs text-gray-400">Shopping · Jan 9</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">-$34.99</p>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Disney+</p>
                        <p className="text-xs text-gray-400">Subscription · Jan 8</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">-$7.99</p>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Starbucks</p>
                        <p className="text-xs text-gray-400">Food & Drink · Jan 7</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">-$6.75</p>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Adobe CC</p>
                        <p className="text-xs text-gray-400">Subscription · Jan 5</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">-$54.99</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Demo - overlaid at bottom center */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-xl px-4">
                <TestMorphChat placeholder="Ask about your spending..." loaderVariant="eyes" systemPrompt="You are a web agent with access to this month's bank statement. Respond in an objective, professional tone — no casual language, no judgment about the user's spending habits, no emojis. Report facts and totals from the data only. Use ONLY this data to answer; do not say you cannot access bank data. Transactions: Whole Foods $87.34 (groceries), Spotify $9.99 (subscription), Shell Gas $52.18 (transport), Netflix $15.99 (subscription), Uber Eats $28.45 (food), Figma $12.00 (subscription), Amazon $34.99 (shopping), Disney+ $7.99 (subscription), Starbucks $6.75 (food), Adobe CC $54.99 (subscription). Subscriptions total: $100.96/month. Total spending: $311.67. Answer in 1-2 sentences with precise figures." />
              </div>
            </div>
          </div>

          <p className="text-lg text-gray-700 mt-8 font-medium">
            The pattern stays constant: a small surface, a fast verdict, optional depth.
          </p>
        </div>
      </section>

      {/* Outro Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Outro</h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Web Agent is a small concept for a web that answers back in the moment, not a minute later in another tab.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              If agents are going to sit inside our browsers, they don&apos;t always need to be full copilots with their own workspaces. Sometimes they just need to tell you, quickly and honestly, whether what you&apos;re looking at is solid, shaky, or unknown, and then disappear.
            </p>

            <p className="text-gray-700 leading-relaxed">
              If this resonated with you, I&apos;d love to hear what you&apos;d ask a five‑second agent on top of your own products.
            </p>
          </div>
        </div>
      </section>

      {/* Modal with CNN-like article */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto" onMouseUp={handleTextSelection}>
              {/* Fake CNN Header */}
              <div className="bg-[#cc0000] text-white px-6 py-3">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold tracking-tight">CNN</span>
                  <nav className="hidden md:flex items-center gap-4 text-sm">
                    <span className="opacity-80">World</span>
                    <span className="opacity-80">U.S.</span>
                    <span className="font-semibold border-b-2 border-white pb-1">Health</span>
                    <span className="opacity-80">Politics</span>
                    <span className="opacity-80">Business</span>
                  </nav>
                </div>
              </div>

              {/* Article Content */}
              <article className="px-6 py-8 max-w-3xl mx-auto">
                {/* Breadcrumb */}
                <div className="text-xs text-gray-500 mb-4 flex items-center gap-2">
                  <span>Health</span>
                  <span>›</span>
                  <span>Disease and Conditions</span>
                </div>

                {/* Headline */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                  Pediatric flu deaths this season reach highest level in years, CDC reports
                </h1>

                {/* Byline */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
                  <span>By <span className="font-medium text-gray-900">Jen Christensen, CNN</span></span>
                  <span className="text-gray-400">|</span>
                  <span>Updated 2:34 PM EST, Thu January 16, 2026</span>
                </div>

                {/* Featured Image */}
                <div className="mb-8">
                  <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <svg className="w-16 h-16 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">Getty Images</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">A child receives a flu vaccine at a pharmacy in Washington, DC.</p>
                </div>

                {/* Article Body */}
                <div className="prose prose-lg max-w-none text-gray-800">
                  <p className="text-xl leading-relaxed mb-6">
                    The number of flu-related deaths among children this season has surpassed last year&apos;s total, health officials announced Thursday, as the country grapples with a particularly severe influenza season.
                  </p>

                  <p className="mb-6">
                    According to the Centers for Disease Control and Prevention, <strong>32 children have died from flu-related complications</strong> since the season began in October. This marks the highest number of pediatric flu deaths at this point in the season since 2019-2020.
                  </p>

                  <p className="mb-6">
                    &quot;We are seeing a particularly aggressive flu season this year,&quot; said Dr. Demetre Daskalakis, director of the CDC&apos;s National Center for Immunization and Respiratory Diseases. &quot;These deaths are a tragic reminder that flu can be serious, even deadly, especially for our youngest and most vulnerable.&quot;
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Vaccination rates remain low</h2>

                  <p className="mb-6">
                    Health officials emphasized that many of these deaths could have been prevented with vaccination. Preliminary data suggests that only about 40% of children have received their flu shot this season, compared to pre-pandemic levels of nearly 60%.
                  </p>

                  <p className="mb-6">
                    The CDC recommends annual flu vaccination for everyone 6 months and older, with rare exceptions. The vaccine is especially important for children under 5, who are at higher risk for serious flu complications.
                  </p>

                  <blockquote className="border-l-4 border-[#cc0000] pl-4 my-8 text-xl italic text-gray-700">
                    &quot;It&apos;s not too late to get vaccinated. Flu season typically peaks in February, and the vaccine takes about two weeks to provide full protection.&quot;
                  </blockquote>

                  <p className="mb-6">
                    The current flu season began earlier than usual and has been dominated by H1N1 strains, which tend to cause more severe illness in children and young adults. Emergency department visits for flu-like illness are at their highest levels since the 2017-2018 season.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What parents should know</h2>

                  <p className="mb-6">
                    Parents should watch for warning signs that require immediate medical attention, including:
                  </p>

                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Fast or troubled breathing</li>
                    <li>Bluish lips or face</li>
                    <li>Ribs pulling in with each breath</li>
                    <li>Severe muscle pain</li>
                    <li>Dehydration (no urination for 8 hours, dry mouth, no tears when crying)</li>
                    <li>Not alert or interacting when awake</li>
                  </ul>

                  <p className="mb-6">
                    If a child is at high risk for flu complications, antiviral medications like Tamiflu can help reduce the severity and duration of illness if started within 48 hours of symptom onset.
                  </p>
                </div>

                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Flu</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">CDC</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Children&apos;s Health</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">Vaccines</span>
                  </div>
                </div>
              </article>
            </div>

            {/* Sticky Chat Input at Bottom */}
            <div className="border-t border-gray-200 bg-white p-4">
              <div className="max-w-xl mx-auto">
                <TestMorphChat
                  placeholder="Ask about this article..."
                  selectedText={selectedText}
                  onClearSelectedText={clearSelectedText}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Agentation - dev tool for UI annotations */}
      {process.env.NODE_ENV === "development" && <Agentation />}
    </div>
  );
}
