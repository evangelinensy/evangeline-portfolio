"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { TestMorphChat } from "@/components/testmorph";
import { SubstackLinkCard } from "@/components/ui/substack-link-card";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Agentation } from "agentation";

export default function WebAgentCaseStudy2() {
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

      {/* Hero Section — Problem-First Opening */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 text-xs font-medium text-slate-700 bg-slate-100 rounded-full mb-4">
              AI / Browser Extension
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              You read a claim online.<br />
              You moved on.<br />
              You didn&apos;t check.
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
              Neither did anyone else. Verifying information on the web takes too long, so most people skip it entirely. I designed a browser agent that delivers a verdict in five seconds without pulling you away from the page.
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
              <p className="text-gray-900">Hackathon prototype &rarr; exploratory concept</p>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Tools
              </h3>
              <p className="text-gray-900">Figma, Cursor, Claude Code, Chrome Extension APIs</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Stakes — Tension & Stakes */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The cost of not checking</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We scroll through feeds and absorb claims. Headlines blend into opinions. Stats appear without sources. If something feels off, the burden is entirely on us: open a new tab, run a search, parse long explanations, triangulate across three articles.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              That process takes minutes. Reading the claim took seconds. So most people do the math and keep scrolling.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 my-8">
              <p className="text-gray-900 text-lg leading-relaxed font-medium">
                AI has made it easier to ask questions, but the interface hasn&apos;t changed: it&apos;s still a text box in another tab. The friction isn&apos;t intelligence. It&apos;s context-switching.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed">
              What if verification cost the same as reading? What if the agent came to you, instead of making you go to it?
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Try it: the inline verdict</h2>
          <p className="text-gray-600 mb-8">
            Hover to launch the demo. Type a question like &quot;fact check this&quot; into the bar at the bottom.
          </p>

          {/* Demo Container */}
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden group">
            {/* "Try it out" button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 hover:bg-slate-800 z-10"
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
                <div className="text-xs text-gray-500 mb-3 flex items-center gap-2">
                  <span>Health</span>
                  <span>&rsaquo;</span>
                  <span>Disease and Conditions</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3">
                  Pediatric flu deaths this season reach highest level in years, CDC reports
                </h1>
                <div className="flex items-center gap-3 text-xs text-gray-600 mb-4 pb-4 border-b border-gray-200">
                  <span>By <span className="font-medium text-gray-900">Jen Christensen, CNN</span></span>
                  <span className="text-gray-400">|</span>
                  <span>Updated 2:34 PM EST, Thu January 16, 2026</span>
                </div>
                <div className="prose prose-sm max-w-none text-gray-800">
                  <p className="text-base leading-relaxed mb-4">
                    The number of flu-related deaths among children this season has surpassed last year&apos;s total, health officials announced Thursday, as the country grapples with a particularly severe influenza season.
                  </p>
                  <p className="text-sm text-gray-700">
                    According to the Centers for Disease Control and Prevention, <strong>32 children have died from flu-related complications</strong> since the season began in October...
                  </p>
                </div>
              </div>

              {/* Fade overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />

              {/* Chat Demo */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-xl px-4">
                <TestMorphChat />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decision Point 1: Why a bottom bar? */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why a bar, not a popup</h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              The first design question was where the agent should live. I had three options:
            </p>

            <div className="grid md:grid-cols-3 gap-4 my-8 not-prose">
              {/* Option A */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase">Option A</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Sidebar panel</h4>
                <p className="text-sm text-gray-600 mb-3">Persistent side panel like browser DevTools.</p>
                <div className="text-xs text-gray-500 space-y-1">
                  <p className="text-green-700">+ Room for detail</p>
                  <p className="text-red-700">&minus; Eats horizontal space</p>
                  <p className="text-red-700">&minus; Feels like a tool, not assistance</p>
                </div>
              </div>

              {/* Option B */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase">Option B</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Extension popup</h4>
                <p className="text-sm text-gray-600 mb-3">Classic popup from the toolbar icon.</p>
                <div className="text-xs text-gray-500 space-y-1">
                  <p className="text-green-700">+ Familiar pattern</p>
                  <p className="text-red-700">&minus; Disconnected from the page</p>
                  <p className="text-red-700">&minus; Requires a click to open</p>
                </div>
              </div>

              {/* Option C — Chosen */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-blue-600 uppercase">Chosen</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Bottom bar overlay</h4>
                <p className="text-sm text-gray-600 mb-3">Thin bar pinned to viewport bottom.</p>
                <div className="text-xs text-gray-500 space-y-1">
                  <p className="text-green-700">+ Zero layout shift</p>
                  <p className="text-green-700">+ Always visible, never blocking</p>
                  <p className="text-green-700">+ Minimal cognitive load</p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              The bottom bar won because it respects the page. You never lose your place in the article. The content doesn&apos;t shift. The bar can appear, update, and disappear without stealing focus.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              You type a short intent like &quot;fact check this article.&quot; The bar thinks for a beat, then responds with a single sentence:
            </p>

            <div className="bg-slate-900 text-white rounded-xl p-6 my-8 font-mono text-sm">
              <p>&quot;Most of the concrete claims in this CNN piece align with CDC and WHO data. One stat is outdated; I&apos;ll flag it if you keep reading.&quot;</p>
            </div>

            <p className="text-xl font-medium text-gray-900 my-8">
              No sidebars. No modals. No new tabs.<br />
              Just a verdict layered over the page you&apos;re already reading.
            </p>
          </div>
        </div>
      </section>

      {/* The Struggle — What failed at the hackathon */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What I built first was wrong</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              This concept started at a hackathon. I built a Chrome extension that returned a full fact-check report: verdict, citations, confidence scores, source comparison tables.
            </p>

            <SubstackLinkCard
              title="Web Agent that won in a Hackathon"
              articleTitle="How I Built A Research Agent in 5 Hours"
              href="https://evangelineng.substack.com/p/how-i-built-a-research-agent-in-5"
              className="my-6 not-prose"
            />

            <p className="text-gray-700 leading-relaxed mb-6">
              It won the hackathon. People were impressed by the depth.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              But watching users afterward told a different story. Almost no one expanded the details. They glanced at the top-line verdict&mdash;&quot;FACTS&quot; or &quot;MIXED&quot;&mdash;and went back to reading. The citations, the source tables, the confidence scores? Invisible.
            </p>

            <div className="bg-white border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
              <p className="text-gray-800 font-medium mb-2">
                The insight that changed the direction:
              </p>
              <p className="text-gray-700">
                People didn&apos;t want a research tool. They wanted a gut check. The value wasn&apos;t in the depth of the report&mdash;it was in the speed of the signal.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed">
              That observation pushed the redesign toward an even smaller surface: strip away everything except the verdict. Let them ask for more if they want it, but assume they won&apos;t.
            </p>
          </div>
        </div>
      </section>

      {/* Decision Point 2: Designing for honesty */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Designing for &quot;I don&apos;t know&quot;</h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              A fact-checking agent that always gives a confident answer is dangerous. The harder design problem was what happens when the agent can&apos;t commit.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Loading is handled like a breath, not a wait. A minimal shimmer appears, then the verdict snaps in as soon as the agent has enough signal. If it can&apos;t reach certainty, it says so plainly.
            </p>

            <div className="bg-slate-100 border-l-4 border-slate-400 p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 font-medium">
                An honest &quot;I don&apos;t know&quot; is treated as a successful outcome, not a failure state. The agent earns trust by knowing its limits.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed">
              This was a deliberate decision. Most AI products optimize for always having an answer. I optimized for the user always being able to trust the answer they get.
            </p>
          </div>
        </div>
      </section>

      {/* Beyond Fact-Checking — Transformation Arc */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Same pattern, different surfaces</h2>
          <p className="text-gray-600 mb-12">
            The inline verdict pattern isn&apos;t limited to news articles. I explored how the same form factor works on completely different pages.
          </p>

          {/* Travel Example */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">&#9992;&#65039;</span> Travel: &quot;Is this deal actually good?&quot;
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              You&apos;re comparing flights. One option looks cheap, but the &quot;2 bookings required&quot; tag feels off. Instead of opening three tabs to research airline alliances, ask the bar.
            </p>

            {/* Travel Demo */}
            <div className="relative bg-slate-100 rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="p-6 pb-24 space-y-3">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">SFO &rarr; NRT</p>
                    <p className="text-xs text-gray-500">Round trip &middot; 1 passenger &middot; Economy</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="px-2 py-1 bg-white rounded border border-gray-200">Price</span>
                    <span className="px-2 py-1 bg-white rounded border border-gray-200">Duration</span>
                  </div>
                </div>

                {/* Flight 1 */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
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
                      <p className="text-xs text-gray-400 mb-1">1 stop &middot; 18h 45m</p>
                      <div className="w-full h-px bg-gray-300 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 text-sm">NRT</p>
                      <p className="text-xs text-gray-500">+1 day</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                    <span className="w-4 h-4 bg-blue-100 rounded text-blue-700 flex items-center justify-center text-[10px] font-bold">UA</span>
                    <span>United &rarr; Korean Air</span>
                  </div>
                </div>

                {/* Flight 2 */}
                <div className="bg-white rounded-xl border-2 border-blue-200 p-4 shadow-sm">
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
                      <p className="text-xs text-gray-400 mb-1">Nonstop &middot; 11h 15m</p>
                      <div className="w-full h-px bg-blue-300"></div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 text-sm">NRT</p>
                      <p className="text-xs text-gray-500">+1 day</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                    <span className="w-4 h-4 bg-red-100 rounded text-red-700 flex items-center justify-center text-[10px] font-bold">JL</span>
                    <span>Japan Airlines</span>
                  </div>
                </div>

                {/* Flight 3 */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs">1 stop &middot; LAX</span>
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
                      <p className="text-xs text-gray-400 mb-1">1 stop &middot; 14h 30m</p>
                      <div className="w-full h-px bg-gray-300 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 text-sm">NRT</p>
                      <p className="text-xs text-gray-500">+1 day</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                    <span className="w-4 h-4 bg-sky-100 rounded text-sky-700 flex items-center justify-center text-[10px] font-bold">AA</span>
                    <span>American Airlines</span>
                  </div>
                </div>

                {/* Flight 4 */}
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm opacity-60">
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
                      <p className="text-xs text-gray-400 mb-1">2 stops &middot; 24h 10m</p>
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
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                    <span className="w-4 h-4 bg-orange-100 rounded text-orange-700 flex items-center justify-center text-[10px] font-bold">CX</span>
                    <span>Cathay Pacific</span>
                  </div>
                </div>
              </div>

              {/* Chat Demo */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-xl px-4">
                <TestMorphChat />
              </div>
            </div>
          </div>

          {/* Personal Finance Example */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">&#128179;</span> Finance: &quot;Where is my money going?&quot;
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              You&apos;re looking at your bank statement. You have a vague sense that subscriptions are adding up. Instead of exporting a CSV and sorting in a spreadsheet, ask the bar: &quot;How much am I spending on subscriptions monthly?&quot;
            </p>

            {/* Finance Demo */}
            <div className="relative rounded-2xl shadow-lg overflow-hidden border border-gray-200" style={{ backgroundColor: '#062655' }}>
              <div className="p-6 pb-4 h-[300px] overflow-y-auto">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between" style={{ backgroundColor: '#EAEDF2' }}>
                    <p className="font-medium text-gray-900 uppercase">Recent Transactions</p>
                    <p className="text-sm text-gray-500">This month</p>
                  </div>
                  <div className="divide-y divide-gray-50">
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Whole Foods Market</p>
                        <p className="text-xs text-gray-400">Groceries &middot; Jan 18</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">-$87.34</p>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Spotify</p>
                        <p className="text-xs text-gray-400">Subscription &middot; Jan 15</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">-$9.99</p>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Shell Gas Station</p>
                        <p className="text-xs text-gray-400">Auto &amp; Transport &middot; Jan 14</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">-$52.18</p>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Netflix</p>
                        <p className="text-xs text-gray-400">Subscription &middot; Jan 12</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">-$15.99</p>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Uber Eats</p>
                        <p className="text-xs text-gray-400">Food &amp; Drink &middot; Jan 11</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">-$28.45</p>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Figma</p>
                        <p className="text-xs text-gray-400">Subscription &middot; Jan 10</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">-$12.00</p>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Amazon</p>
                        <p className="text-xs text-gray-400">Shopping &middot; Jan 9</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">-$34.99</p>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Disney+</p>
                        <p className="text-xs text-gray-400">Subscription &middot; Jan 8</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">-$7.99</p>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Starbucks</p>
                        <p className="text-xs text-gray-400">Food &amp; Drink &middot; Jan 7</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">-$6.75</p>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Adobe CC</p>
                        <p className="text-xs text-gray-400">Subscription &middot; Jan 5</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">-$54.99</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-xl px-4">
                <TestMorphChat />
              </div>
            </div>
          </div>

          <p className="text-lg text-gray-700 mt-8 font-medium">
            The pattern stays constant: a small surface, a fast verdict, optional depth.
          </p>
        </div>
      </section>

      {/* Reflection — Moral & Takeaway */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What I took away</h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              My instinct as a designer was to build the most thorough tool I could. Full reports. Citations. Confidence intervals. The hackathon version was impressive because it did a lot.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              But the version that actually changed behavior did almost nothing. One sentence. One bar. Five seconds.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              The lesson: <strong>the value of an AI feature isn&apos;t in what it can do. It&apos;s in what the user actually uses.</strong> And what they use is whatever fits into the flow they&apos;re already in.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 my-8">
              <p className="text-gray-900 text-lg leading-relaxed">
                If agents are going to sit inside our browsers, they don&apos;t always need to be full copilots with their own workspaces. Sometimes they just need to tell you, quickly and honestly, whether what you&apos;re looking at is solid, shaky, or unknown&mdash;and then disappear.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed">
              If this resonated with you, I&apos;d love to hear what you&apos;d ask a five-second agent on top of your own products.
            </p>
          </div>
        </div>
      </section>

      {/* Modal with CNN-like article */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex-1 overflow-y-auto" onMouseUp={handleTextSelection}>
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

              <article className="px-6 py-8 max-w-3xl mx-auto">
                <div className="text-xs text-gray-500 mb-4 flex items-center gap-2">
                  <span>Health</span>
                  <span>&rsaquo;</span>
                  <span>Disease and Conditions</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                  Pediatric flu deaths this season reach highest level in years, CDC reports
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
                  <span>By <span className="font-medium text-gray-900">Jen Christensen, CNN</span></span>
                  <span className="text-gray-400">|</span>
                  <span>Updated 2:34 PM EST, Thu January 16, 2026</span>
                </div>
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

      {/* Agentation - dev tool */}
      {process.env.NODE_ENV === "development" && <Agentation />}
    </div>
  );
}
