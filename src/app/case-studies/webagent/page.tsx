"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { TestMorphChat } from "@/components/testmorph";

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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded-full mb-4">
              AI / Browser Extension
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Web Agent
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
              <p className="text-gray-900">Product Designer, solo</p>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Timeline
              </h3>
              <p className="text-gray-900">2025 — Hackathon prototype → exploratory concept</p>
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
          <div className="relative bg-white rounded-2xl shadow-xl p-8 min-h-[400px] flex items-end justify-center group">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-100/50 to-transparent rounded-2xl pointer-events-none" />
            {/* "Try it out" button - appears on hover in top area */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 hover:bg-slate-800 z-10"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Try it out
            </button>
            <div className="relative w-full max-w-xl">
              <TestMorphChat />
            </div>
          </div>
        </div>
      </section>

      {/* Context Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Context</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              You&apos;re reading, not researching.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              You see a line: <em>&quot;32 children have died.&quot;</em>
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              To verify it, today you usually have to: copy → new tab → paste into an AI chat → read paragraphs → tab back → find your place again.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              AI UX today assumes you&apos;re happy to open a separate workspace and read a wall of text. They&apos;re built for deep research, not for the tiny but critical trust decisions you make dozens of times a day.
            </p>

            <div className="bg-slate-50 border-l-4 border-slate-500 p-6 my-8 rounded-r-lg">
              <p className="text-slate-800 text-lg font-medium">
                This project asks a smaller question: What would an agent look like if it were designed only for those five‑second decisions?
              </p>
            </div>

            <p className="text-gray-500 text-sm italic">
              The following are small parts of what this agent could look like.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              We scroll feeds, and absorb claims. If we want to sanity‑check something, the burden is on us to break flow: open tools, run searches, read long explanations.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              AI has made it easier to ask questions, but the interface hasn&apos;t changed much: it&apos;s still a big text box in another tab.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              The experience is broken for fast judgment calls. You either trust by default, or you pay a heavy tax in time and attention to verify.
            </p>

            <div className="bg-white border border-gray-200 rounded-xl p-8 my-8">
              <p className="text-gray-900 text-lg leading-relaxed">
                <strong>Web Agent</strong> is a concept for an inline web agent that sits on top of any page and answers a narrow question:
              </p>
              <p className="text-2xl font-medium text-gray-900 mt-4">
                &quot;Can I trust what I&apos;m looking at right now?&quot;
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed">
              It doesn&apos;t replace research tools. It gives you a quick verdict first, then gets out of the way.
            </p>
          </div>
        </div>
      </section>

      {/* The Bottom Bar Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">The Bottom Bar</h2>

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
              <p>&quot;Most of the concrete claims in this CNN piece align with CDC and WHO data. One stat is outdated; I&apos;ll flag it if you keep reading.&quot;</p>
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
            <p className="text-gray-700 leading-relaxed mb-4">
              This pattern came from watching people use the first version of the agent at a hackathon.{" "}
              <a
                href="https://evangelineng.substack.com/p/how-i-built-a-research-agent-in-5"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 underline hover:text-gray-600"
              >
                Read about how I built a research agent in 5 hours →
              </a>
            </p>
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
            <p className="text-gray-700 leading-relaxed mb-6">
              Loading is handled like a breath, not a wait. A minimal shimmer appears, then the verdict snaps in as soon as the agent has enough signal to commit.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              If it can&apos;t commit, it says so.
            </p>

            <div className="bg-slate-100 border-l-4 border-slate-400 p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 font-medium">
                An honest &quot;I don&apos;t know&quot; is treated as a successful outcome.
              </p>
            </div>
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
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">✈️</span> Travel
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              You&apos;re comparing flights. One option looks cheap, but something feels off.
            </p>

            {/* Travel Demo with Fake Flight UI */}
            <div className="relative bg-slate-100 rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              {/* Fake Flight Search Result */}
              <div className="p-6 pb-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  {/* Flight Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded">Cheapest</span>
                      <span className="text-gray-400 text-xs">2 bookings required</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">$847</p>
                      <p className="text-xs text-gray-500">round trip</p>
                    </div>
                  </div>

                  {/* Flight Details */}
                  <div className="flex items-center gap-4">
                    {/* Outbound */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">SFO</p>
                          <p className="text-xs text-gray-500">6:00 AM</p>
                        </div>
                        <div className="flex-1 mx-4 flex flex-col items-center">
                          <p className="text-xs text-gray-400 mb-1">1 stop · 18h 45m</p>
                          <div className="w-full h-px bg-gray-300 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">ICN</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">NRT</p>
                          <p className="text-xs text-gray-500">+1 day</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <span className="w-4 h-4 bg-blue-100 rounded text-blue-700 flex items-center justify-center text-[10px] font-bold">UA</span>
                          United
                        </span>
                        <span>→</span>
                        <span className="flex items-center gap-1">
                          <span className="w-4 h-4 bg-sky-100 rounded text-sky-700 flex items-center justify-center text-[10px] font-bold">KE</span>
                          Korean Air
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Demo */}
              <div className="relative bg-white/50 backdrop-blur p-6 pt-4 min-h-[200px] flex items-end justify-center">
                <div className="relative w-full max-w-xl">
                  <TestMorphChat />
                </div>
              </div>
            </div>
          </div>

          {/* Personal Finance Example */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">💳</span> Personal finance
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              You&apos;re reviewing your bank statement and notice five subscriptions you forgot about. Instead of opening a spreadsheet or calculator, you ask the agent: &quot;How much am I spending on subscriptions monthly?&quot; It scans the page and returns a total in seconds, right where you&apos;re looking.
            </p>

            {/* Finance Demo with Fake Bank UI */}
            <div className="relative bg-slate-100 rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              {/* Fake Bank Transaction List */}
              <div className="p-6 pb-4">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  {/* Header */}
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <p className="font-medium text-gray-900">Recent Transactions</p>
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

              {/* Chat Demo */}
              <div className="relative bg-white/50 backdrop-blur p-6 pt-4 min-h-[200px] flex items-end justify-center">
                <div className="relative w-full max-w-xl">
                  <TestMorphChat />
                </div>
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
    </div>
  );
}
