"use client";

import React from "react";

export default function Page() {
  return (
    <main className="w-full flex justify-center px-4 sm:px-6 lg:px-8 py-12">
      <article className="w-full max-w-[720px]">
        {/* Lead */}
        <header className="mb-10">
          <p className="text-xs tracking-wide uppercase text-gray-500">Article</p>
          <h1
            className="mt-2 text-[34px] md:text-[40px] font-semibold tracking-tight"
            style={{ fontFamily: 'Sequel Sans Head, Bricolage Grotesque, system-ui, sans-serif', color: '#222' }}
          >
            State of AI Vibe Coding / Designing Tools 2025
          </h1>
          <p className="mt-3 text-[18px] text-gray-600" style={{ color: '#5b5b5b' }}>
            Vibe Ranked: State of AI Vibe Designing and Coding Tools 2025 — Tell AI Chat: “I&apos;m not a developer I don&apos;t know how to navigate to a folder, just run the command in the terminal for me.”
            Tools are developing fast. This is my personal experience from September 2025, and I am open to switching the ranking, especially if I&apos;m using the tools wrongly. Do check back again in 2 months, I&apos;ll likely update it after people come after me.
          </p>
          
        </header>

        {/* Hero image */}
        <figure className="mb-10">
          <img
            src="/images/stateofvibecode/stateofvibeheaderimage.png"
            alt="State of Vibe Coding / Designing Tools — Header"
            className="w-full rounded-lg shadow-sm"
          />
          <figcaption className="mt-2 text-sm text-gray-500">Cover — State of AI Vibe Coding / Designing Tools 2025</figcaption>
        </figure>

        {/* Intro */}
        <section className="space-y-4 text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
          <p>
            Tell AI Chat: “I&apos;m not a developer I don&apos;t know how to navigate to a folder, just run the
            command in the terminal for me.”
          </p>
          <p>
            Disclaimer: Tools are developing fast. This is my personal experience from September 2025, and I am
            open to switching the ranking, especially if I&apos;m using the tools wrongly. Do check back again in 2
            months, I&apos;ll likely update it after people come after me.
          </p>
          <p>Before we get to the tools…</p>
          <p className="font-medium">Q: Why are you even writing this, are you paid?</p>
          <p>No.</p>
          <p>
            I&apos;m a designer who can&apos;t code and I&apos;m so glad people are pouring $ and their lives into building
            tools that non-coders can ship, finally.
          </p>
          <p className="font-medium">Here&apos;s what I stand for:</p>
          <ul className="list-disc pl-6">
            <li>
              Creative people have a valuable place in tech and collaboration can happen on another level across
              organizations.
            </li>
            <li>There is a place for both functional and frivolous products in this chaotic noisy world.</li>
          </ul>
          <blockquote className="border-l-4 pl-4 italic text-gray-600">
            We must have the stubbornness to accept our gladness in the ruthless furnace of this world. We must
            admit there will be music despite everything. — From: A brief for defense
          </blockquote>
        </section>

        {/* Cheatsheet */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#222' }}>Cheatsheet</h2>
          <ul className="list-disc pl-6 space-y-1 text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            <li>
              <b>Vibecode</b> = You tell AI what you want, and AI writes the code for you. So you don&apos;t have to know how to code at all.
            </li>
            <li>
              <b>Figma</b> = Popular design tool among designers.
            </li>
            <li>
              <b>Terminal</b> = The most stripped down / rawest window where you type commands to talk to your computer.
            </li>
            <li>
              <b>IDE</b> = A somewhat friendlier interface for you to write instructions for your computer.
            </li>
            <li>
              <b>AI-powered IDE</b> = AI allows you to command your computer with english.
            </li>
            <li>
              <b>GitHub</b> = The nerdy website where all the apps/codebase that developers built are uploaded, the open source ones are the ones we can clone and use.
            </li>
            <li>
              <b>Open source</b> = &apos;free and available for all to use&apos;
            </li>
            <li>
              <b>MCP</b> = a developer term we won&apos;t need to know in a few months&apos; time, but for now its an integration that allows AI to use tools.
            </li>
            <li>
              <b>Tool</b> = Popular examples of tools are &apos;Figma MCP&apos;: Your IDE can read your Figma designs.
            </li>
            <li>
              <b>Design System</b> = A library of components e.g buttons, forms, dropdowns.
            </li>
          </ul>
        </section>

        {/* Who is this for */}
        <section className="mt-12 space-y-4 text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
          <h2 className="text-2xl font-semibold" style={{ color: '#222' }}>Who is this for?</h2>
          <p>Vibe Designing + Coding for Designers.</p>
          <p>
            Many people stand to benefit from AI designing and coding tools, the focus of this guide is for
            designers like myself, written from my experience.
          </p>
          <h3 className="mt-6 font-semibold">Common Problems</h3>
          <ul className="list-disc pl-6">
            <li>There are just waaay too many tools in the space, and we all have limited energy and lifespan left.</li>
            <li>Every vibe coded app looks the same and it&apos;s ugly. That&apos;s enough reason. 👎</li>
          </ul>
          <h3 className="mt-6 font-semibold">The Goal</h3>
          <ul className="list-disc pl-6">
            <li>Execute on the core idea.</li>
            <li>Bring your own taste without defaulting to generic UI kits.</li>
          </ul>
        </section>

        {/* Vibe Ranked heading and Top Use Cases */}
        <section className="mt-10 text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
          <h2 className="text-2xl font-semibold" style={{ color: '#222' }}>Vibe Ranked: State of AI Vibe Designing and Coding Tools 2025</h2>
          <h3 className="mt-4 font-semibold text-[21px]" style={{ color: '#222' }}>Top Use Cases</h3>
          <ul className="list-disc pl-6">
            <li>Figma Designs → Code</li>
            <li>Write what I want to build in English → Marketing Website</li>
            <li>Build an app from scratch</li>
          </ul>
          <h3 className="mt-6 font-semibold text-[21px]">Ranking Translated</h3>
          <p>Ranking clarification — Yes, there is only S‑tier, A‑tier, B‑tier, and then fail. This is written by an Asian. I&apos;m joking — this is just to make the rankings condensed.</p>
        </section>

        {/* Category 1 */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold" style={{ color: '#222' }}>1) Frontend / Asset “Libraries”</h2>
          <p className="mt-2 text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            When you&apos;re vibe coding you don&apos;t have to build everything from scratch. Clone a design system and
            instruct your IDE to use those components.
          </p>
          <figure className="my-6">
            <img src={'/images/stateofvibecode/Frontend Asset "Libraries".png'} alt="Frontend libraries" className="w-full rounded-md" />
            <figcaption className="mt-2 text-sm text-gray-500">Frontend / Asset Libraries</figcaption>
          </figure>
          <h3 className="font-medium mt-6 text-[21px]">S-Tier: Free & Open Source Design Systems</h3>
          <p className="text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            The most well-known example: Material Design is Google&apos;s Design System.
          </p>
          <p className="text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            <code className="px-1 py-0.5 bg-gray-100 rounded">@material/web</code> is a library of web components that helps build beautiful and accessible web applications. It uses Material 3, the latest version of Google&apos;s open‑source design system.
          </p>
          <figure className="my-6">
            <img src="/images/stateofvibecode/materialui.gif" alt="Material UI Example" className="w-full rounded-md" />
            <figcaption className="mt-2 text-sm text-gray-500">Material UI — example components</figcaption>
          </figure>
          <h4 className="mt-6 font-medium text-[21px]">Notable ones include:</h4>
          <ul className="list-disc pl-6 text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            <li>Shopify</li>
            <li>Uber Base Web</li>
            <li>Pinterest Gestalt</li>
            <li>Salesforce Lightning</li>
            <li>Atlassian Design System</li>
            <li>Mozilla Protocol</li>
            <li>Skyscanner Backpack</li>
          </ul>
          <p className="text-[19px] leading-7 mt-2" style={{ color: '#3a3a3a' }}>
            You can select the relevant Design System based on the industry you&apos;re building in. E.g Ecommerce → use Shopify&apos;s.
          </p>
          <p className="text-[19px] leading-7 mt-2" style={{ color: '#3a3a3a' }}>
            List of publicly viewable source code by Alex Pate:{' '}
            <a className="underline hover:text-blue-600" href="https://github.com/alexpate/awesome-design-systems" target="_blank" rel="noopener noreferrer">https://github.com/alexpate/awesome-design-systems</a>
          </p>
          <figure className="my-6">
            <img src="/images/stateofvibecode/publiclyviewable sourcecode.png" alt="Awesome design systems list" className="w-full rounded-md" />
            <figcaption className="mt-2 text-sm text-gray-500">Publicly viewable source code list — Alex Pate</figcaption>
          </figure>
          <h4 className="mt-6 font-medium">How do I use it?</h4>
          <p className="text-[19px] leading-7">Clone the design system repo on GitHub</p>
          <figure className="my-6">
            <img src="/images/stateofvibecode/clone github repo.png" alt="Clone design system repo" className="w-full rounded-md" />
            <figcaption className="mt-2 text-sm text-gray-500">How to clone a GitHub repo — copy and paste the command</figcaption>
          </figure>
          <figure className="my-6">
            <img src="/images/stateofvibecode/dontwritecode.png" alt="Prompt your IDE instead of writing code" className="w-full rounded-md" />
            <figcaption className="mt-2 text-sm text-gray-500">Prompt your AI IDE to set it up — no manual npm lines</figcaption>
          </figure>
          <ol className="list-decimal pl-6 space-y-1 text-[19px]">
            <li>How to Clone Github Repo: Copy and paste it in your IDE&apos;s AI chat. It should run the command for you in your terminal.</li>
            <li>Ask your AI IDE e.g Cursor to set it up for you</li>
            <li>Tell AI IDE to build using the design system&apos;s patterns and components e.g “use the primary button they have”</li>
          </ol>
          <p className="text-[19px] leading-7 mt-2" style={{ color: '#3a3a3a' }}>
            This gives you enterprise‑grade, accessible UI components with the speed of AI code generation.
          </p>
          <h4 className="mt-6 font-medium">How do I use it?</h4>
          <ol className="list-decimal pl-6 space-y-1 text-[19px]">
            <li>Clone the design system repo on GitHub</li>
            <li>Ask your AI IDE (e.g. Cursor) to set it up for you</li>
            <li>Tell the IDE to build using the design system&apos;s patterns and components — e.g. “use the primary button they have”</li>
          </ol>
          <h3 className="font-medium mt-6 text-[21px]"><a className="underline hover:text-blue-600" href="https://21st.dev" target="_blank" rel="noopener noreferrer">S-Tier: 21st.dev</a></h3>
          <p className="text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            21st.dev in relation to open source DS should be A-tier… BUT! It deserves a special mention. It is a front end component library that has really highly-animated modern looking components that works great for landing pages and marketing websites. The feature that really made it S-Tier for me is the Copy Prompt -&gt; paste it to your IDE -&gt; tell it how you want it customized.
          </p>
          <p className="text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            Quick, fast, free but fancy looking.
          </p>
          <figure className="my-4">
            <img src="/images/stateofvibecode/spotifyplaylistmaker.mov-ezgif.com-video-to-gif-converter.gif" alt="Spotify playlist maker built with 21st.dev components" className="w-full rounded-md" />
          </figure>
          <h3 className="font-medium mt-6 text-[21px]"><a className="underline hover:text-blue-600" href="https://heroicons.com" target="_blank" rel="noopener noreferrer">S-Tier: Heroicons</a></h3>
          <figure className="my-4">
            <img src="/images/stateofvibecode/heroicons.png" alt="Heroicons" className="w-full rounded-md" />
            <figcaption className="mt-2 text-sm text-gray-500">Heroicons — MIT Licensed Icons</figcaption>
          </figure>
          <p className="text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            Also see the{' '}<a className="underline hover:text-blue-600" href="https://github.com/tailwindlabs/heroicons" target="_blank" rel="noopener noreferrer">Heroicons GitHub repository</a>.
          </p>
        </section>

        {/* Category 2 */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold" style={{ color: '#222' }}>2) Prototyping / Design / Frontend</h2>
          <p className="mt-2 text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            These are tools that often allow you to prompt or design and then ship it to a marketing website with a public URL. The biggest limitation of the tools here is that they require a third-party solution to build and host the backend.
          </p>
          <figure className="my-4">
            <img src="/images/stateofvibecode/secondcategory.png" alt="Prototyping / Design / Frontend tools overview" className="w-full rounded-md" />
            <figcaption className="mt-2 text-sm text-gray-500">Prototyping / Design / Frontend Tools</figcaption>
          </figure>
          <p className="text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            TLDR: If I were to sum this category up in 1 line: I used to spend a lot of time trying all the tools out, but I realized, if it requires a third-party solution to build the backend I&apos;m out.
          </p>
          <p className="text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            Now, the long-winded version of the ranking:
          </p>
          <h3 className="font-medium mt-6 text-[21px]"><a className="underline hover:text-blue-600" href="https://v0.dev" target="_blank" rel="noopener noreferrer">S‑tier: v0.dev</a></h3>
          <figure className="my-4">
            <img src="/images/stateofvibecode/slackprototype.gif" alt="v0 demo" className="w-full rounded-md" />
            <figcaption className="mt-2 text-sm text-gray-500">v0.dev prototype</figcaption>
          </figure>
          <p className="text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            It could successfully prototype very complex descriptions in english + it also handled really badly written english (as you can see my grammar sucks).
          </p>
          <p className="text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            It only provides the front end, like all tools in this category.
          </p>
          <h3 className="font-medium mt-6 text-[21px]"><a className="underline hover:text-blue-600" href="https://lovable.dev" target="_blank" rel="noopener noreferrer">A‑tier: Lovable</a></h3>
          <p className="text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            During Valentines&apos; (Feb 25) I used text + images to make a Love Letter Maker App to send letters to friends. Each love letter had a unique URL.
          </p>
          <p className="text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            Cons: Not as flexible as v0 imo, but it gets the website out.
          </p>
          <figure className="my-4">
            <img src="/images/stateofvibecode/loveletter.gif" alt="Lovable Love Letter" className="w-full rounded-md" />
            <figcaption className="mt-2 text-sm text-gray-500">Send a love letter — built on Lovable</figcaption>
          </figure>
          <h3 className="font-medium mt-6 text-[21px]"><a className="underline hover:text-blue-600" href="https://claude.ai" target="_blank" rel="noopener noreferrer">A to B-tier: Claude Artifacts</a></h3>
          <p className="text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            Claude Artifacts runs in <a className="underline hover:text-blue-600" href="https://claude.ai" target="_blank" rel="noopener noreferrer">Claude.ai/chat</a>. To use Claude Artifact, open Claude and tell it:
          </p>
          <ul className="list-disc pl-6 text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            <li>“Build me a website that…”</li>
            <li>“Build me a data visualization with this CSV”</li>
          </ul>
          <p className="text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            Connect Integrations such as Google Sheets, many more.
          </p>
          <figure className="my-4">
            <img src="/images/stateofvibecode/claudeartifact.gif" alt="Claude Artifact" className="w-full rounded-md" />
            <figcaption className="mt-2 text-sm text-gray-500">Claude Artifacts — Chat Nodes</figcaption>
          </figure>
          <figure className="my-4">
            <img src="/images/stateofvibecode/claudeartifactdata.gif" alt="Claude Artifact Data Viz" className="w-full rounded-md" />
            <figcaption className="mt-2 text-sm text-gray-500">Claude Artifact for Data Visualization</figcaption>
          </figure>
          <p className="text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            You can prototype &apos;complex&apos; things like draggable chat nodes. It is a tier below Lovable for me because I can&apos;t connect it to a backend service as of today.
          </p>
          <p className="text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            Special highlight: You can upload CSV or integrate it with Google Sheets and visualize data with different displays and share it to a public URL.
          </p>
        </section>

        {/* Category 3 */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold" style={{ color: '#222' }}>3) Fullstack Tools</h2>
          <p className="mt-2 text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            You can use the tools here in this category to build the front end and back end which includes the codebase, storage, environment, AI model. (Sounds like a lot, but your AI IDE can handle all this for you) You can always use supporting cheerleaders tools like the component libraries and MCPs.
          </p>
          <h3 className="font-medium mt-4 text-[21px]">Fullstack Tools Ranking (I can change my mind) — TLDR: Just use Cursor…</h3>
          <p className="text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            S‑Tier: Cursor. My recommendation is to use Cursor over the Frontend prototyping tools + backend service. With Cursor, you can build out the whole app.
          </p>
          <figure className="my-4">
            <img src="/images/stateofvibecode/fullstacktools.png" alt="Fullstack Tools" className="w-full rounded-md" />
            <figcaption className="mt-2 text-sm text-gray-500">Fullstack Tools</figcaption>
          </figure>
          <p className="text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            <a className="underline hover:text-blue-600" href="https://www.youtube.com/watch?v=ocMOZpuAMw4" target="_blank" rel="noopener noreferrer">Cursor Tutorial for Beginners (AI Code Editor)</a>
          </p>
          <p className="text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            (I personally don’t think this is for ‘beginners’… it&apos;s intimidating at first. Treat the right panel AI chat as ChatGPT. Ignore the rest, for now.)
          </p>
          <p className="text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            Ask the AI chat questions, screenshot the UI of your IDE and ask the AI Chat “please explain this to me”. It is okay to be sassy with it, it&apos;s not human, optimize for fun in the process. If our positive and fun inner voice can be louder than our fearful voice, we can push through!
          </p>
          <p className="text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            I&apos;ll write another guide on how I use Cursor to build, please follow me and stay tuned! I&apos;m also @eggsvans on all other social media platforms.
          </p>
          <p className="text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            High Level‑up Opportunity Discovered: You can also use Claude Code in Cursor or your favorite IDE.
          </p>
          <p className="text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            Windsurf, Bolt.new, Firebase Studio — I have tried them but they just didn’t stick for me.
          </p>
          <p className="text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
            Base44 — To be honest I haven’t used it but I have been tormented by it at least 30 times a day from YouTube Ads so I included it for fun, sorry Base44.
          </p>
        </section>

        {/* Inventory tips */}
        <section className="mt-12 space-y-4 text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
          <h2 className="text-2xl font-semibold" style={{ color: '#222' }}>What else do I need in my inventory?</h2>
          <h3 className="font-medium">Fonts</h3>
          <p>
            Use{' '}<a className="underline hover:text-blue-600" href="https://fonts.google.com" target="_blank" rel="noopener noreferrer">Google Fonts</a>{' '}or upload .otf/.ttf files. Your AI IDE can add the Google Fonts API for you.
          </p>
          <h3 className="font-medium">Images/Photos/Illustrations</h3>
          <p>Upload assets or use the{' '}<a className="underline hover:text-blue-600" href="https://unsplash.com/join" target="_blank" rel="noopener noreferrer">Unsplash API</a>{' '}for free, high‑quality images.</p>
          <figure className="my-6">
            <img src="/images/stateofvibecode/clone github repo.png" alt="Clone GitHub" className="w-full rounded-md" />
            <figcaption className="mt-2 text-sm text-gray-500">Clone the GitHub repository</figcaption>
          </figure>
          <p>
            Explore open‑source on{' '}<a className="underline hover:text-blue-600" href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a> and this curated list of design systems by Alex Pate:{' '}
            <a className="underline hover:text-blue-600" href="https://github.com/alexpate/awesome-design-systems" target="_blank" rel="noopener noreferrer">awesome‑design‑systems</a>.
          </p>
        </section>

        {/* Reference links for design systems */}
        <section className="mt-12 text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
          <h2 className="text-2xl font-semibold" style={{ color: '#222' }}>Design System References</h2>
          <ul className="list-disc pl-6">
            <li><a className="underline hover:text-blue-600" href="https://m3.material.io" target="_blank" rel="noopener noreferrer">Material Design</a> — <a className="underline hover:text-blue-600" href="https://github.com/material-components/material-web" target="_blank" rel="noopener noreferrer">@material/web</a></li>
            <li><a className="underline hover:text-blue-600" href="https://polaris.shopify.com" target="_blank" rel="noopener noreferrer">Shopify Polaris</a></li>
          </ul>
        </section>

        {/* Reward tips */}
        <section className="mt-12 space-y-4 text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
          <h2 className="text-2xl font-semibold" style={{ color: '#222' }}>You&apos;re still here? Reward — More Tips For Vibe Coding</h2>
          <p>
            You don&apos;t have to memorize commands—ask AI and let it run them. Creatives can build.
          </p>
          <p>“I&apos;m not a developer I don&apos;t know how to navigate to a folder, just run the command in the terminal for me.”</p>
          
          <h3 className="font-medium mt-6">Being resourceful pays off — Use GitHub</h3>
          <p>
            The thing you want to build probably already exist in some incomplete form on GitHub. It is the nerdy website where all the apps/codebase that developers built are uploaded, the open source ones are the ones we can clone and use for free.
          </p>
          <p>
            We just need to figure out what the codebase does by scrolling down and clicking on the README file.
          </p>
          <p>
            You can copy the README file and paste to ask AI if this repository is helpful for what you want to build.
          </p>
          <p>
            If it&apos;s useful for your project and you can find an open source version, you just have to clone it build on top of it.
          </p>
        </section>

        {/* Outro */}
        <section className="mt-12 space-y-4 text-[19px] leading-7" style={{ color: '#3a3a3a' }}>
          <h2 className="text-2xl font-semibold" style={{ color: '#222' }}>♡ My message to you ♡</h2>
          <p>
            So many of us don&apos;t have that developer friend to pester. That&apos;s okay—ask your favorite AI tool. It
            will be frustrating at times. Lean into your creativity; ship things, the sillier the better. Lastly,
            optimize for fun.
          </p>
          <div className="mt-6 border-t pt-6 text-sm text-gray-600">
            <p>instagram ➭ @eggsvans</p>
            <p>x ➭ @eggsvans</p>
            <p>portfolio ➭ evangeline.design</p>
            <p>linkedin ➭ www.linkedin.com/in/evangeline-ng</p>
          </div>
        </section>
      </article>
      <style jsx>{`
        article :global(p) {
          margin-top: 14px;
          margin-bottom: 14px;
          line-height: 1.9;
        }
        article :global(ul), article :global(ol) {
          margin-top: 18px;
          margin-bottom: 18px;
          line-height: 1.9;
        }
        article :global(figure) {
          margin-top: 28px;
          margin-bottom: 28px;
        }
        article :global(blockquote) {
          margin-top: 20px;
          margin-bottom: 20px;
          line-height: 1.9;
        }
        article :global(h1),
        article :global(h2),
        article :global(h3),
        article :global(h4) {
          color: #000000;
          margin-top: 28px;
          margin-bottom: 12px;
        }
      `}</style>
    </main>
  );
}


