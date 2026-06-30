"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { StakeholderStack } from "@/components/ui/stakeholder-stack";

const EASE = "cubic-bezier(0.33, 1, 0.68, 1)";

function FadeUp({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const reduce = useReducedMotion();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : `translateY(${reduce ? 0 : 20}px)`,
        transition: `opacity 0.75s ${EASE} ${delay}s, transform 0.75s ${EASE} ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function StaggerList({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

function HeroFadeIn({ children, delay = 0, as: Tag = "div", className, style, ...rest }: {
  children: React.ReactNode; delay?: number; as?: React.ElementType; className?: string; style?: React.CSSProperties; [key: string]: unknown;
}) {
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => { const t = setTimeout(() => setMounted(true), delay * 1000); return () => clearTimeout(t); }, [delay]);
  return (
    <Tag
      className={className}
      style={{
        ...style,
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0px)" : `translateY(${reduce ? 0 : 20}px)`,
        transition: `opacity 0.75s ${EASE}, transform 0.75s ${EASE}`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function StaggerItem({ children, index = 0, className }: { children: React.ReactNode; index?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const reduce = useReducedMotion();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : `translateY(${reduce ? 0 : 16}px)`,
        transition: `opacity 0.65s ${EASE} ${index * 0.1}s, transform 0.65s ${EASE} ${index * 0.1}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Figma tokens: GT America / Gradient bg
   Colors: #FFB600 yellow · #4FFF34 green · #346AFF blue
   Section pill dot: #C8C9FF lavender
   H2: 44px/500 · Card Q: 30px/500 · Body: 30px/300
───────────────────────────────────────────── */

const GTA = "'GT America', system-ui, -apple-system, sans-serif";
const GTA_MONO = "'GT America Mono', 'GT America', monospace";
const SECTION_LABELS = ["Challenge", "Process", "Explorations", "Interaction", "Decisions", "Final Design", "Learnings"];

const PAGE_BG = "linear-gradient(180deg, #E0E8FE 0%, #EAE1E8 15%, #F1E7DE 76%, #ECD7FF 100%)";
const CARD_BG = "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.65) 100%)";

// Attention line — large, calm one-liner used as an attention-calling caption/headline above body copy.
const ATTENTION_LINE: React.CSSProperties = {
  fontFamily: GTA,
  fontSize: 31,
  fontWeight: 400,
  lineHeight: 1.65,
  letterSpacing: 0,
  color: "#1a1a3a",
};

// Section/step title — gray, prominent title used to head a step or section.
const SECTION_TITLE: React.CSSProperties = {
  fontFamily: GTA,
  fontSize: 32,
  fontWeight: 600,
  lineHeight: 1.5,
  letterSpacing: "1.1px",
  color: "#757575",
};

// Numbering — bold, dark, matches the card-title treatment. Used for "01"-style labels.
const NUMBER_STYLE: React.CSSProperties = {
  fontFamily: GTA,
  fontSize: 20,
  fontWeight: 600,
  color: "#111",
};

// Shows a still frame by default; plays the GIF (from frame 0) on hover, freezes back on exit.
// The still stays as a permanent base layer and the GIF is overlaid on top, so there's no
// blank flash while the GIF (re)loads — the still shows through underneath the whole time.
function HoverGif({ still, gif, size, style }: { still: string; gif: string; size: number; style?: React.CSSProperties }) {
  const [playing, setPlaying] = useState(false);
  const [playKey, setPlayKey] = useState(0);
  // Preload the GIF so the first hover never flashes (use the DOM img, not next/image's Image).
  useEffect(() => {
    const pre = document.createElement("img");
    pre.src = gif;
  }, [gif]);
  return (
    <span
      onMouseEnter={() => { setPlayKey((k) => k + 1); setPlaying(true); }}
      onMouseLeave={() => setPlaying(false)}
      style={{ position: "relative", display: "inline-block", width: size, lineHeight: 0, ...style }}
    >
      <img src={still} alt="" aria-hidden="true" style={{ width: size, height: "auto", display: "block" }} />
      {playing && (
        <img
          src={`${gif}?p=${playKey}`}
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: size, height: "auto", display: "block" }}
        />
      )}
    </span>
  );
}

function SectionPill({ color = "#C8C9FF", children }: { color?: string; children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center rounded-full mb-11"
      data-section-pill={typeof children === "string" ? children : undefined}
      data-section-dot={color}
      style={{
        height: 26,
        padding: "0 9px 0 8px",
        gap: 5,
        background: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.8)",
        boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0, background: color, display: "inline-block" }} />
      <span style={{ fontFamily: GTA, fontSize: 12, fontWeight: 400, color: "rgba(40,40,60,0.82)" }}>
        {children}
      </span>
    </div>
  );
}

function MonoTag({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: color }} />
      <span style={{ fontFamily: GTA_MONO, fontSize: 13, fontWeight: 300, color: "#111", letterSpacing: "0.12em", textTransform: "uppercase" }}>
        {children}
      </span>
    </div>
  );
}

function QuestionCard({ dot, tag, question, body }: { dot: string; tag: string; question: string; body: string }) {
  return (
    <div className="rounded-2xl p-7 mb-4" style={{ background: CARD_BG, border: "1px solid rgba(255,255,255,0.7)", backdropFilter: "blur(8px)" }}>
      <MonoTag color={dot}>{tag}</MonoTag>
      <p style={{ fontFamily: GTA, fontSize: 22, fontWeight: 500, color: "#111", lineHeight: 1.3, marginBottom: 10 }}>{question}</p>
      <p style={{ fontFamily: GTA, fontSize: 17, fontWeight: 300, color: "#444", lineHeight: 1.6 }}>{body}</p>
    </div>
  );
}

function ChallengeCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-7" style={{ background: CARD_BG, border: "1px solid rgba(255,255,255,0.7)", backdropFilter: "blur(8px)" }}>
      <p style={{ fontFamily: GTA, fontSize: 19, fontWeight: 500, color: "#111", lineHeight: 1.3, marginBottom: 12 }}>{title}</p>
      <p style={{ fontFamily: GTA, fontSize: 16, fontWeight: 300, color: "#444", lineHeight: 1.65 }}>{children}</p>
    </div>
  );
}

/* Gallery, uniform card width, horizontal scroll */
function Gallery({ items }: { items: { src: string; label: string; sub: string }[] }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [imgH, setImgH] = useState<number | null>(null);
  const [cardH, setCardH] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Measure the *active* card so the edge gradient matches the card in view and
  // the arrow sits centered on its image. Cards can differ in height (e.g. a wide
  // video next to taller images), so a fixed/row height would overshoot.
  useEffect(() => {
    const measure = () => {
      const card = ref.current?.children[active] as HTMLElement | undefined;
      if (!card) return;
      setCardH(card.offsetHeight);
      const imgBox = card.querySelector(":scope > div") as HTMLElement | null;
      setImgH(imgBox?.offsetHeight ?? null);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, [active]);

  const handleScroll = () => {
    if (!ref.current) return;
    const scrollLeft = ref.current.scrollLeft;
    const children = Array.from(ref.current.children) as HTMLElement[];
    let minDist = Infinity;
    let idx = 0;
    children.forEach((child, i) => {
      const d = Math.abs(child.offsetLeft - scrollLeft);
      if (d < minDist) { minDist = d; idx = i; }
    });
    setActive(idx);
  };

  const scrollTo = (index: number) => {
    if (!ref.current) return;
    const children = Array.from(ref.current.children) as HTMLElement[];
    ref.current.scrollTo({ left: children[index]?.offsetLeft ?? 0, behavior: "smooth" });
    setActive(index);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Cards + edge overlays — wrapped so the gradient/arrow span only the card row, not the dots below */}
      <div className="relative">
      {/* Right-edge gradient hint — height tracks the active card so it never overshoots */}
      <div
        className="absolute right-0 top-0 w-24 z-10 pointer-events-none rounded-r-xl"
        style={{ height: cardH ?? "100%", background: "linear-gradient(to right, transparent, #ECE7E9)" }}
      />

      {/* Next arrow — pinned to the carousel's right edge (over the gradient), centered on the image band */}
      {items.length > 1 && active < items.length - 1 && (
        <button
          onClick={() => scrollTo(Math.min(active + 1, items.length - 1))}
          aria-label="Next"
          style={{
            position: "absolute",
            right: 14,
            top: imgH ? imgH / 2 : "42%",
            transform: `translateY(-50%) scale(${hovered ? 1 : 0.82})`,
            width: 42, height: 42,
            borderRadius: "50%",
            background: "rgba(16,16,16,0.70)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.18s ease, transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)",
            cursor: "pointer",
            zIndex: 20,
            pointerEvents: hovered ? "auto" : "none",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M3.5 7.5h8M8.5 4.5l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Items */}
      <div
        ref={ref}
        onScroll={handleScroll}
        className="flex items-start gap-4 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {items.map(({ src, label, sub }, i) => (
          <div
            key={label}
            className="flex-shrink-0 relative"
            style={{
              width: "calc(66.667% - 8px)",
              scrollSnapAlign: "start",
            }}
          >
            {/* Image container */}
            <div
              className="mb-4 relative"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.8)",
                borderRadius: "0.75rem",
              }}
            >
              {/\.(mp4|mov|webm)$/i.test(src) ? (
                <video
                  src={src} autoPlay loop muted playsInline
                  className="w-full"
                  style={{ borderRadius: "0.75rem", display: "block" }}
                />
              ) : (
                <Image
                  src={src} alt={label} width={600} height={500}
                  className="w-full object-cover object-top"
                  style={{ borderRadius: "0.75rem", display: "block" }}
                />
              )}
            </div>
            <p style={{ fontFamily: GTA, fontSize: 13, fontWeight: 500, color: "#111", marginBottom: 6 }}>{label}</p>
            <p style={{ fontFamily: GTA, fontSize: 12, fontWeight: 300, color: "#555", lineHeight: 1.5 }}>{sub}</p>
          </div>
        ))}
      </div>
      </div>

      {/* Dot pagination */}
      <div className="flex gap-1.5 mt-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className="rounded-full transition-all"
            style={{ width: i === active ? 16 : 6, height: 6, background: i === active ? "#111" : "#C0B8B0" }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Learnings: What Changed My Mind ─── */
function LearningsSection() {
  const rows: {
    label: string;
    assumption: string;
    reality: string;
    detail?: string;
    bullets?: { label: string; text: string }[];
    image?: string;
  }[] = [
    {
      label: "Capability Discovery",
      assumption: "Users understand what the AI can do.",
      reality: "They only ask for what they already know is possible.",
      bullets: [
        { label: "Challenge", text: "Clients only asked for basic clips because cross-study synthesis was invisible." },
        { label: "Interaction", text: "Designed one-click capability cards that are mapped to client workflows, lowering the cognitive friction of a cold start." },
        { label: "Trust UX", text: "Worked with engineering that matches prompts and queries to relevant org assets, verifying data scope before giving clients the answers." },
      ],
    },
    {
      label: "Execution vs Discovery",
      assumption: "One surface can hold everything.",
      reality: "Separate Asset Discovery from Agent Execution",
      bullets: [
        { label: "The Flaw", text: "Mixing ongoing project management and active agent prompting in one surface created confusing, redundant entry points." },
        { label: "The Fix", text: "Home acts as a baseline workspace to jump back into existing studies and cohorts. Chat is the dedicated playground for running the agent, using preset cards inside the composer to reveal its execution capabilities." },
      ],
    },
    {
      label: "Trust",
      assumption: "Better answers earn trust.",
      reality: "Trust Requires Traceability",
      detail: "Buyers stake their credibility on these insights when presenting to leadership. By adding per-message source attribution and upfront scope confirmation, we ensured the AI is judged on verifiable evidence, not just eloquent answers.",
      image: "/images/pogob2b/learning-trust-sources.png",
    },
  ];

  return (
    <section data-label="Learnings" className="px-6 py-[96px] max-w-[1240px] mx-auto">
      <SectionPill color="#C8C9FF">Learnings</SectionPill>
      <p style={{ fontFamily: GTA_MONO, fontSize: 12, fontWeight: 400, color: "#777", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 24 }}>
        Three assumptions this project challenged.
      </p>
      <h2 style={{ fontFamily: GTA, fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 500, color: "#111", lineHeight: 1.2, marginBottom: 42 }}>
        Learnings
      </h2>

      {/* Column headers */}
      <div className="hidden md:grid" style={{ gridTemplateColumns: "180px minmax(0,300px) 44px 1fr", gap: "0 48px", paddingBottom: 16, borderBottom: "1px solid rgba(0,0,0,0.08)", marginBottom: 0 }}>
        <span />
        <span style={{ fontFamily: GTA_MONO, fontSize: 14, fontWeight: 400, color: "#292929", lineHeight: 1.5, letterSpacing: "1.7px", textTransform: "uppercase" }}>Assumption</span>
        <span />
        <span style={{ fontFamily: GTA_MONO, fontSize: 14, fontWeight: 400, color: "#292929", lineHeight: 1.5, letterSpacing: "1.7px", textTransform: "uppercase" }}>Learnings</span>
      </div>

      {/* Rows */}
      {rows.map((row) => {
        return (
          <div
            key={row.label}
            style={{
              borderBottom: "1px solid rgba(0,0,0,0.07)",
              padding: "48px 0",
            }}
          >
            {/* label | assumption (one line) | arrow | learnings */}
            <div className="grid grid-cols-1 md:grid-cols-[180px_minmax(0,300px)_44px_1fr]" style={{ gap: "16px 48px", alignItems: "start" }}>

              {/* Label */}
              <p style={{ fontFamily: GTA_MONO, fontSize: 13, fontWeight: 400, color: "#444", letterSpacing: "0.1em", textTransform: "uppercase", paddingTop: 6 }}>
                {row.label}
              </p>

              {/* Assumption — one line, muted */}
              <p style={{ fontFamily: GTA, fontSize: 16, fontWeight: 400, fontStyle: row.assumption === "Users understand what the AI can do." ? "normal" : "italic", color: row.assumption === "Users understand what the AI can do." ? "#5a5a5a" : "#9a9a9a", lineHeight: 1.4, paddingTop: 4 }}>
                {row.assumption}
              </p>

              {/* Arrow */}
              <div className="hidden md:flex justify-center" style={{ paddingTop: 10, opacity: 0.4, color: "#555" }}>
                <svg width="16" height="12" viewBox="0 0 14 10" fill="none">
                  <path d="M0 5H12M12 5L8 1M12 5L8 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Learnings — punchy reality line + fuller explanation */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 600 }}>
                <p style={{ fontFamily: GTA, fontSize: "clamp(18px,1.7vw,22px)", fontWeight: 400, color: "#111", lineHeight: 1.4 }}>
                  {row.reality}
                </p>
                {row.bullets ? (
                  <ul style={{ display: "flex", flexDirection: "column", gap: 10, margin: 0, padding: 0, listStyle: "none" }}>
                    {row.bullets.map((b) => (
                      <li key={b.label} style={{ fontFamily: GTA, fontSize: 16, fontWeight: 400, color: "#4a4a4a", lineHeight: 1.4, display: "flex", gap: 8 }}>
                        <span aria-hidden style={{ color: "#bbb", flexShrink: 0 }}>•</span>
                        <span><strong style={{ fontWeight: 600, color: "#212121" }}>{b.label}:</strong> {b.text}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontFamily: GTA, fontSize: 16, fontWeight: 400, color: "#4a4a4a", lineHeight: 1.4, letterSpacing: 0 }}>
                    {row.detail}
                  </p>
                )}
                {row.image && (
                  <div className="rounded-2xl overflow-hidden mt-3" style={{ border: "1px solid rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.5)", boxShadow: "0 2px 20px rgba(0,0,0,0.06)", maxWidth: 760 }}>
                    <Image src={row.image} alt={row.reality} width={1280} height={752} className="w-full object-cover object-top" />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

/* ─── Desktop magnetic scroll pill ─── */
function WebScrollPill() {
  // wrapRef: handles 2D translate (position). pillRef: handles scale pulse (visual).
  // Keeping them separate prevents transform conflicts between position and scale animations.
  const wrapRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [dot, setDot] = useState("#C8C9FF");
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const isHoveredRef = useRef(false);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const stateRef = useRef<"free" | "snapped">("free");
  const snappedElRef = useRef<HTMLElement | null>(null);
  const isAttractingRef = useRef(false);
  const hasSnappedRef = useRef(false); // pill stays hidden until first snap
  const rafRef = useRef<number>(0);
  const homeRef = useRef({ x: 40, y: 0 });

  const scrollToSection = (sectionLabel: string) => {
    const el = document.querySelector<HTMLElement>(`[data-section-pill="${sectionLabel}"]`);
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top - 80;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    clearTimeout(hoverTimerRef.current);
    isHoveredRef.current = false;
    setIsHovered(false);
  };

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const PILL_H = 26;
    const SNAP_R = 20;
    const ATTRACT_R = 90;
    const UNMERGE_R = 160; // how far section pill must drift from home center before unmerging

    const updateHome = () => {
      homeRef.current.y = window.innerHeight * 0.45 - PILL_H / 2;
    };
    updateHome();

    wrap.style.left = `${homeRef.current.x}px`;
    wrap.style.top = `${homeRef.current.y}px`;
    wrap.style.transform = "translate(0,0)";

    const first = document.querySelector<HTMLElement>("[data-section-pill]");
    if (first) {
      setLabel(first.getAttribute("data-section-pill") ?? "");
      setDot(first.getAttribute("data-section-dot") ?? "#C8C9FF");
    }

    const setXY = (dx: number, dy: number, tr: string) => {
      wrap.style.transition = `${tr}, opacity 0.3s ease`;
      wrap.style.transform = `translate(${dx}px,${dy}px)`;
    };

    // Scale pulse on inner pill (doesn't conflict with wrap's translate)
    const pulse = (scales: number[], dur = 220) => {
      pillRef.current?.animate(
        scales.map((s, i) => ({ transform: `scale(${s})`, offset: i / (scales.length - 1) })),
        { duration: dur, easing: "ease-out", fill: "none" }
      );
    };

    // Emil: blur bridges visual gaps; brightness adds tension as pills approach.
    const setPillFilter = (blur: number, brightness: number, dur = "0s") => {
      const p = pillRef.current;
      if (!p) return;
      p.style.transition = `filter ${dur} ease, opacity ${dur} ease`;
      const parts: string[] = [];
      if (blur) parts.push(`blur(${blur}px)`);
      if (brightness !== 1) parts.push(`brightness(${brightness})`);
      p.style.filter = parts.join(" ") || "";
    };

    const setPillOpacity = (o: number) => {
      const p = pillRef.current;
      if (!p) return;
      p.style.opacity = `${o}`;
    };

    const onResize = () => {
      updateHome();
      if (stateRef.current === "free" && !isAttractingRef.current) {
        wrap.style.top = `${homeRef.current.y}px`;
        wrap.style.transition = "none";
        wrap.style.transform = "translate(0,0)";
      }
    };
    window.addEventListener("resize", onResize, { passive: true });

    const tick = () => {
      const { x: hx, y: hy } = homeRef.current;
      const homeCenter = hy + PILL_H / 2;

      // Stay hidden until first snap
      if (!hasSnappedRef.current) wrap.style.opacity = "0";

      const pills = Array.from(document.querySelectorAll<HTMLElement>("[data-section-pill]"));

      if (stateRef.current === "snapped" && snappedElRef.current) {
        const rect = snappedElRef.current.getBoundingClientRect();
        setXY(rect.left - hx, rect.top - hy, "none");

        const center = rect.top + rect.height / 2;
        if (center < homeCenter - UNMERGE_R || center > homeCenter + UNMERGE_R) {
          stateRef.current = "free";
          snappedElRef.current = null;
          isAttractingRef.current = false;
          // Clear any morph/filter from the snapped state, keep pill fully visible
          if (pillRef.current) {
            pillRef.current.style.transition = "filter 0.15s ease, transform 0.15s ease";
            pillRef.current.style.transform = "";
            pillRef.current.style.filter = "";
            pillRef.current.style.opacity = "1";
          }
          // Linger briefly at static pill position so the detach is legible, then glide home
          // Pill stays fully visible the whole way, the travel IS the unmerge, no fade needed
          setTimeout(() => {
            setXY(0, 0, "transform 0.68s cubic-bezier(0.23, 1, 0.32, 1)");
          }, 70);
        }
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      let closest: HTMLElement | null = null;
      let closestDist = Infinity;
      for (const p of pills) {
        const r = p.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - homeCenter);
        if (d < closestDist) { closestDist = d; closest = p; }
      }
      if (!closest) { rafRef.current = requestAnimationFrame(tick); return; }

      const rect = closest.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const dist = Math.abs(center - homeCenter);
      const pl = closest.getAttribute("data-section-pill") ?? "";
      const pd = closest.getAttribute("data-section-dot") ?? "#C8C9FF";

      if (dist < SNAP_R) {
        const isFirst = !hasSnappedRef.current;
        stateRef.current = "snapped";
        snappedElRef.current = closest;
        isAttractingRef.current = false;
        hasSnappedRef.current = true;
        setLabel(pl);
        setDot(pd);

        if (isFirst) {
          // First ever snap: materialize directly on the static pill, no travel from left edge
          wrap.style.transition = "none";
          wrap.style.transform = `translate(${rect.left - hx}px,${rect.top - hy}px)`;
          // Soft fade-in, pill just appears already merged
          setTimeout(() => {
            wrap.style.transition = "opacity 0.35s ease";
            wrap.style.opacity = "1";
          }, 0);
        } else {
          // Subsequent snaps: snap fast + release morph
          if (pillRef.current) {
            pillRef.current.style.transition = "none";
            pillRef.current.style.transform = "";
          }
          setXY(rect.left - hx, rect.top - hy, "transform 0.15s cubic-bezier(0.23, 1, 0.32, 1)");
          setPillFilter(2, 1, "0s");
          setPillOpacity(0.7);
          pulse([1, 1.08, 0.95, 1], 180);
          setTimeout(() => { setPillFilter(0, 1, "0.14s"); setPillOpacity(1); }, 120);
        }
      } else if (dist < ATTRACT_R) {
        const t = Math.pow(1 - dist / ATTRACT_R, 2.5);
        setXY((rect.left - hx) * t, (rect.top - hy) * t, "none");
        isAttractingRef.current = true;
        if (dist < ATTRACT_R * 0.45) { setLabel(pl); setDot(pd); }

        if (hasSnappedRef.current) {
          // Morph: pill stretches toward target, liquid drop pulled by a magnet
          const morphT = Math.pow(1 - dist / ATTRACT_R, 2);
          const sX = (1 + morphT * 0.14).toFixed(3);
          const sY = (1 - morphT * 0.09).toFixed(3);
          if (pillRef.current) {
            pillRef.current.style.transform = `scaleX(${sX}) scaleY(${sY})`;
          }
          setPillFilter(morphT * 0.8, 1 + morphT * 0.1, "0.06s");
        }
      } else if (isAttractingRef.current) {
        isAttractingRef.current = false;
        setXY(0, 0, "transform 0.22s cubic-bezier(0.23, 1, 0.32, 1)");
        // Smoothly release morph back to resting state
        if (pillRef.current) {
          pillRef.current.style.transition = "transform 0.22s cubic-bezier(0.23, 1, 0.32, 1), filter 0.2s ease, opacity 0.2s ease";
          pillRef.current.style.transform = "";
          pillRef.current.style.filter = "";
          pillRef.current.style.opacity = "1";
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const currentIdx = Math.max(0, SECTION_LABELS.indexOf(label));
  // Align nav so current section item sits exactly on the floating pill center
  const navOffset = -(currentIdx * 31);

  return (
    <>
      {/* Floating tracking pill, purely visual, never intercepts pointer events */}
      <div
        ref={wrapRef}
        className="hidden md:block fixed z-40 select-none pointer-events-none"
        style={{
          left: 40,
          top: "45%",
          transform: "translateY(-50%)",
          opacity: 0,
          willChange: "transform, opacity",
          transition: "opacity 0.3s ease",
        }}
      >
        <div
          ref={pillRef}
          style={{
            height: 26, padding: "0 9px 0 8px",
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.8)",
            borderRadius: 999,
            display: "flex", alignItems: "center", gap: 5,
            boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
            whiteSpace: "nowrap",
            opacity: isHovered ? 0 : 1,
            transition: "opacity 0.1s ease",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0, background: dot, transition: "background 0.4s ease" }} />
          <span style={{ fontFamily: GTA, fontSize: 12, fontWeight: 400, color: "rgba(40,40,60,0.82)", minWidth: 44 }}>
            {label}
          </span>
        </div>
      </div>

      {/* Nav directory, fixed at home position, separate from the tracking pill so it never overlaps static content pills */}
      <div
        className="hidden md:flex fixed z-50 flex-col select-none"
        style={{
          left: 40,
          top: "45%",
          transform: `translateY(calc(-50% + ${isHovered ? navOffset : 0}px))`,
          gap: 5,
          opacity: isHovered ? 1 : 0,
          pointerEvents: isHovered ? "auto" : "none",
          transition: "opacity 0.15s ease, transform 0.18s cubic-bezier(0.23,1,0.32,1)",
        }}
        onMouseEnter={() => {
          clearTimeout(hoverTimerRef.current);
          isHoveredRef.current = true;
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          hoverTimerRef.current = setTimeout(() => {
            isHoveredRef.current = false;
            setIsHovered(false);
          }, 120);
        }}
      >
        {SECTION_LABELS.map((s) => {
          const active = s === label;
          const itemHovered = hoveredSection === s && !active;
          const highlighted = active || itemHovered;
          return (
            <button
              key={s}
              onClick={() => scrollToSection(s)}
              onMouseEnter={() => setHoveredSection(s)}
              onMouseLeave={() => setHoveredSection(null)}
              style={{
                display: "flex", alignItems: "center", gap: active ? 5 : 0,
                height: 26, padding: active ? "0 9px 0 8px" : "0 9px",
                background: highlighted ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.35)",
                backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.8)",
                borderRadius: 999,
                cursor: "pointer",
                opacity: highlighted ? 1 : 0.5,
                transition: "opacity 0.12s ease, background 0.12s ease, box-shadow 0.12s ease",
                whiteSpace: "nowrap",
                outline: "none",
                boxShadow: highlighted ? "0 1px 8px rgba(0,0,0,0.08)" : "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              {active && (
                <span style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0, background: dot }} />
              )}
              <span style={{ fontFamily: GTA, fontSize: 12, fontWeight: 400, color: "rgba(40,40,60,0.82)" }}>
                {s}
              </span>
            </button>
          );
        })}
      </div>

      {/* Invisible hover trigger at home position, lets user open the nav without touching the tracking pill or static pills */}
      {!isHovered && (
        <div
          className="hidden md:block fixed z-50"
          style={{
            left: 40,
            top: "45%",
            transform: "translateY(-50%)",
            width: 80,
            height: 26,
            cursor: "default",
          }}
          onMouseEnter={() => {
            clearTimeout(hoverTimerRef.current);
            isHoveredRef.current = true;
            setIsHovered(true);
          }}
        />
      )}
    </>
  );
}

/* ─── Mobile section-aware scroll indicator ─── */
function ScrollSectionIndicator() {
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Ordered list of labeled sections as they appear in the DOM
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-label]"));

    // Compute the active section straight from scroll position: the section whose
    // box straddles the vertical center of the viewport. (An earlier
    // IntersectionObserver registered at mount never updated the label on this
    // media-heavy page; a direct scroll read is deterministic and reliable.)
    const computeLabel = () => {
      const mid = window.innerHeight / 2;
      let current = "";
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) {
          current = s.getAttribute("data-label") ?? "";
          break;
        }
      }
      // Between sections (divider gaps): fall back to the last section above center
      if (!current) {
        for (const s of sections) {
          if (s.getBoundingClientRect().top <= mid) current = s.getAttribute("data-label") ?? "";
          else break;
        }
      }
      if (current) setLabel((prev) => (prev === current ? prev : current));
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafRef.current = requestAnimationFrame(() => { computeLabel(); ticking = false; });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    computeLabel();

    // Gate: only show pill once user has scrolled 300px past the hero video
    const pastGate = () => {
      const gate = document.getElementById("pill-gate");
      if (!gate) return true;
      return gate.getBoundingClientRect().top < window.innerHeight - 300;
    };

    // Show on active touch scroll; hide as soon as finger lifts
    const show = () => {
      computeLabel();
      if (!pastGate()) { setVisible(false); return; }
      setVisible(true);
      clearTimeout(timerRef.current);
    };

    const hide = () => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setVisible(false), 200);
    };

    window.addEventListener("touchmove", show, { passive: true });
    window.addEventListener("touchend", hide, { passive: true });
    window.addEventListener("touchcancel", hide, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchmove", show);
      window.removeEventListener("touchend", hide);
      window.removeEventListener("touchcancel", hide);
      clearTimeout(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="md:hidden fixed z-50 pointer-events-none select-none"
      style={{
        left: "max(12px, env(safe-area-inset-left, 12px))",
        top: "50%",
        transform: "translateY(-50%)",
        opacity: visible && label ? 1 : 0,
        transition: visible ? "opacity 0.15s ease" : "opacity 0.3s ease",
      }}
    >
      <div
        style={{
          height: 26,
          maxWidth: 150,
          padding: "0 9px 0 8px",
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.8)",
          borderRadius: 999,
          display: "flex",
          alignItems: "center",
          gap: 5,
          boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        <span style={{
          width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
          background: "rgba(150,140,200,0.7)",
        }} />
        <span style={{
          fontFamily: GTA,
          fontSize: 12,
          fontWeight: 400,
          color: "rgba(40,40,60,0.82)",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {label}
        </span>
      </div>
    </div>
  );
}

/* Divider */
function Divider() {
  return (
    <div style={{ textAlign: "center", padding: "14px 0", fontFamily: "'GT America Mono', monospace", fontSize: 13, color: "rgba(0,0,0,0.18)", letterSpacing: "0.25em" }}>
      ...
    </div>
  );
}

/* Section label */
function StepLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-5">
      <span style={{ ...NUMBER_STYLE }}>{n}</span>
      <span style={{ ...SECTION_TITLE }}>{title}</span>
    </div>
  );
}

export default function PogoB2BCaseStudy() {
  return (
    <div className="min-h-screen" style={{ background: PAGE_BG }}>
      <WebScrollPill />
      <ScrollSectionIndicator />
      {/* Back */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs hover:opacity-60 transition-opacity"
          style={{ fontFamily: GTA, color: "#666" }}>
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ flexShrink: 0 }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Portfolio
        </Link>
      </div>

      {/* ═══ HERO ═══ */}
      <section data-label="Intro" className="px-6 pt-24 pb-12 max-w-[1240px] mx-auto">
        {/* Hero video */}
        <HeroFadeIn delay={0} className="rounded-2xl overflow-hidden mb-12" style={{ background: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.8)" }}>
          <video
            src="/videos/pogob2b/hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full block"
          />
        </HeroFadeIn>
        {/* Pill gate, positioned at bottom of video; pills reveal once this scrolls 300px up from viewport bottom */}
        <div id="pill-gate" style={{ height: 0 }} />

        {/* Wordmark + Title, side by side */}
        <div className="flex flex-wrap items-center" style={{ columnGap: 32, rowGap: 12, marginBottom: 16 }}>
          <HeroFadeIn delay={0.4} as="div" style={{ paddingTop: 18 }}>
            <Image src="/images/pogob2b/pogo-logo.png" alt="Pogo" width={140} height={69} priority style={{ width: 140, height: "auto", display: "block" }} />
          </HeroFadeIn>
          <HeroFadeIn delay={0.48} as="h1" style={{ fontFamily: GTA, fontSize: "clamp(48px,7vw,78px)", fontWeight: 400, color: "#111", lineHeight: 1.08, letterSpacing: "-0.02em", margin: 0 }}>
            AI Research Agent
          </HeroFadeIn>
        </div>
        <HeroFadeIn delay={0.6} as="p" style={{ fontFamily: GTA, fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 300, color: "#333", lineHeight: 1.45, maxWidth: 860, marginBottom: 24, textWrap: "balance" } as React.CSSProperties}>
          CPG Brands get customer insights through AI-moderated interviews and quant surveys with verified purchases.
        </HeroFadeIn>
        <HeroFadeIn delay={0.72} as="a" href="https://www.joinpogo.com/products/ai-research-agent" target="_blank" rel="noopener noreferrer"
          className="group inline-flex items-center gap-2"
          style={{
            fontFamily: GTA, fontSize: 13, fontWeight: 400, color: "rgba(40,40,60,0.82)",
            height: 34, padding: "0 13px 0 12px",
            background: "rgba(255,255,255,0.78)",
            backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.9)",
            borderRadius: 8,
            boxShadow: "0 1px 8px rgba(0,0,0,0.08)",
            transition: "background 0.15s ease, box-shadow 0.15s ease, transform 0.12s ease",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
            const el = e.currentTarget;
            el.style.background = "rgba(255,255,255,0.95)";
            el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.12)";
            el.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
            const el = e.currentTarget;
            el.style.background = "rgba(255,255,255,0.78)";
            el.style.boxShadow = "0 1px 8px rgba(0,0,0,0.08)";
            el.style.transform = "";
          }}
        >
          Go to website
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0, opacity: 0.55 }}>
            <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </HeroFadeIn>
      </section>

      {/* ═══ META ═══ */}
      <section data-label="Product" className="px-6 pb-16 max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StaggerItem index={0}>
            <p style={{ fontFamily: GTA, fontSize: 18, fontWeight: 400, color: "#111", marginBottom: 6 }}>My Role & Team</p>
            <p style={{ fontFamily: GTA, fontSize: 15, fontWeight: 400, color: "#444", lineHeight: 1.65 }}>
              Lead designer on Research Agent (Contract Role)
            </p>
            <p style={{ fontFamily: GTA, fontSize: 15, fontWeight: 400, color: "#444", lineHeight: 1.65 }}>
              Team: Engineer,{" "}
              <a
                href="https://austlee.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "underline",
                  textDecorationStyle: "dotted",
                  textDecorationColor: "rgba(80,80,80,0.5)",
                  textUnderlineOffset: 3,
                  color: "inherit",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                Design Lead
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0, opacity: 0.6 }}>
                  <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              , Founder
            </p>
          </StaggerItem>
          {[
            { label: "Responsibilities", value: "Identifying opportunities & use cases\nEnd-to-end user experience design" },
            { label: "Timeline", value: "Feb – April 2026" },
          ].map(({ label, value }, i) => (
            <StaggerItem key={label} index={i + 1}>
              <p style={{ fontFamily: GTA, fontSize: 18, fontWeight: 400, color: "#111", marginBottom: 6 }}>{label}</p>
              <p style={{ fontFamily: GTA, fontSize: 15, fontWeight: 400, color: "#444", lineHeight: 1.65, whiteSpace: "pre-line" }}>{value}</p>
            </StaggerItem>
          ))}
        </div>
      </section>

      {/* ═══ PRODUCT SHOTS ═══ */}
      <section className="px-6 pb-[60px] max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              src: "/images/pogob2b/screen1.png",
              title: "Run your research",
              body: "All your AI interviews and surveys are fed automatically into the Research Agent. Transcripts, analyzed themes, survey data, and video clips are instantly query-able.",
            },
            {
              src: "/images/pogob2b/screen2.png",
              title: "Ask questions simply",
              body: "The agent gives you the answer immediately.",
              examples: [
                '"Give me 5 videos about price sensitivity."',
                '"Why are lapsed buyers dropping out?"',
              ],
            },
            {
              src: "/images/pogob2b/screen3.png",
              title: "Refine and export",
              body: "Say 'summarize for the leadership team' or 'add more quotes', then export to memo, slide outline, or highlight reel.",
            },
          ].map(({ src, title, body, examples }) => (
            <div key={src} className="flex flex-col">
              {/* Card — glass frame (white @5%) with corner accents, screenshot inset */}
              <div
                className="mb-5 relative"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.45)",
                  borderRadius: 16,
                  padding: "42px 28px",
                }}
              >
                {[
                  { top: 14, left: 14 },
                  { top: 14, right: 14 },
                  { bottom: 14, left: 14 },
                  { bottom: 14, right: 14 },
                ].map((pos, idx) => (
                  <span
                    key={idx}
                    style={{ position: "absolute", width: 5, height: 5, borderRadius: 999, background: "rgba(140,140,175,0.45)", ...pos }}
                  />
                ))}
                <Image src={src} alt={title} width={500} height={440} className="w-full object-cover object-top" style={{ borderRadius: 10, display: "block" }} />
              </div>
              {/* Text below card */}
              <p style={{ ...ATTENTION_LINE, marginBottom: 12 }}>{title}</p>
              {examples && (
                <div style={{ marginBottom: 14, display: "flex", flexDirection: "column", gap: 6 }}>
                  {examples.map(ex => (
                    <div key={ex} style={{ padding: "9px 14px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.09)", background: "rgba(255,255,255,0.65)" }}>
                      <p style={{ fontFamily: GTA, fontSize: 14, fontWeight: 300, color: "#444" }}>{ex}</p>
                    </div>
                  ))}
                </div>
              )}
              <p style={{ fontFamily: GTA, fontSize: 15, fontWeight: 400, color: "#555", lineHeight: 1.65 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ THE PRODUCT ═══ */}
      <section data-label="Product context" className="px-6 py-[96px] max-w-[1240px] mx-auto">
        <FadeUp><SectionPill color="#C8C9FF">Product</SectionPill></FadeUp>
        <FadeUp delay={0.05}>
          <h2 style={{ fontFamily: GTA, fontSize: "clamp(28px,4vw,44px)", fontWeight: 500, color: "#111", lineHeight: 1.2, marginBottom: 36 }}>
            The Product
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <FadeUp delay={0.08}>
            <p style={{ fontFamily: GTA, fontSize: 17, fontWeight: 300, color: "#444", lineHeight: 1.7, marginBottom: 20 }}>
              Pogo is a B2B consumer insights platform. Enterprise CPG teams use it to run AI-moderated interviews and quant surveys with purchase-verified shoppers.
            </p>
            <p style={{ fontFamily: GTA, fontSize: 17, fontWeight: 300, color: "#444", lineHeight: 1.7 }}>
              The moat is behavioral credibility, Pogo&apos;s respondents are verified through credit card transactions, receipts, and location data. No panel. No self-reported behavior. Real shoppers who actually bought the product.
            </p>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p style={{ fontFamily: GTA, fontSize: 17, fontWeight: 300, color: "#444", lineHeight: 1.7, marginBottom: 20 }}>
              You could watch someone hold up a product and say &ldquo;I&apos;d still buy it even if you raised the price by three dollars.&rdquo; No LLM can generate that.
            </p>
          </FadeUp>
        </div>

        {/* Video */}
        <FadeUp delay={0.15}>
          <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.8)" }}>
            <video
              src="/videos/pogob2b/citations-reels-prototype.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full block"
            />
          </div>
          <p style={{ fontFamily: GTA, fontSize: 13, fontWeight: 300, color: "#555", marginTop: 28, lineHeight: 1.5 }}>
            Citation reels - the output that no chart could replicate. Real respondents, on camera, sourced from verified purchase behavior.
          </p>
        </FadeUp>

        {/* Transition callout */}
        <FadeUp delay={0.18}>
          <p style={{ fontFamily: GTA, fontSize: 20, fontWeight: 400, color: "#1a1a3a", lineHeight: 1.65, marginTop: 40 }}>
            The challenge was that most clients didn&apos;t know what they could do with it.
          </p>
        </FadeUp>
      </section>

      {/* ═══ THE CHALLENGE / HMW ═══ */}
      <section data-label="Challenge" className="px-6 py-[96px] max-w-[1240px] mx-auto">
        <FadeUp><SectionPill color="#C8C9FF">Challenge</SectionPill></FadeUp>
        <FadeUp delay={0.05}>
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontFamily: GTA, fontSize: 18, fontWeight: 300, color: "#444", lineHeight: 1.7 }}>
              Pogo&apos;s AI could analyze studies, generate highlight reels, and surface cohort intelligence, but it was all locked inside individual pages. A VP at a major CPG brand wanting to ask &ldquo;what have we learned about pricing?&rdquo; had no single place to go. <span style={{ fontWeight: 400, color: "#111" }}>My job: design the interface that changed that.</span>
            </p>
          </div>
        </FadeUp>
        <FadeUp delay={0.05}>
          <h2 style={{ fontFamily: GTA, fontSize: "clamp(28px,4vw,44px)", fontWeight: 500, color: "#111", lineHeight: 1.2, marginBottom: 42 }}>
            How might we let people use data they don&apos;t know exists, without knowing how to ask for it?
          </h2>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Invisible inventory", body: "Users anchored to studies they'd started, unaware they could query org-wide experiments, market insights, and competitor benchmarks already in Pogo." },
            { title: "AI trust gap", body: "Buyers wanted speed, but their findings were going to VPs. They needed to know where an answer came from before they'd stake their credibility on it." },
            { title: "Data fragmentation", body: "Insights lived across Studies, Cohorts Intelligence, Reports, Market Insights. No single query surface existed." },
          ].map(({ title, body }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.28, ease: [0.87, 0, 0.13, 1] as [number, number, number, number], delay: i * 0.15 }}
            >
              <ChallengeCard title={title}>{body}</ChallengeCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ WHAT I WAS SOLVING ═══ */}
      <section data-label="Challenge" className="px-6 py-[96px] max-w-[1240px] mx-auto">
        <FadeUp delay={0.05}>
          <h2 style={{ fontFamily: GTA, fontSize: "clamp(28px,4vw,44px)", fontWeight: 500, color: "#111", lineHeight: 1.2, marginBottom: 36 }}>
            Before touching a single component, I needed to know what users actually came to do.
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p style={{ fontFamily: GTA, fontSize: 17, fontWeight: 300, color: "#555", marginBottom: 8, lineHeight: 1.6 }}>
            I pulled PostHog usage data and Otter transcripts from client sessions. The #1 use case wasn&apos;t open-ended exploration.
          </p>
          <p style={{ fontFamily: GTA, fontSize: 17, fontWeight: 400, color: "#111", marginBottom: 30, lineHeight: 1.6 }}>
            It was video and highlight reel creation.
          </p>
        </FadeUp>
        {/* Use case cards, bento layout */}
        <div className="mb-10">
          {/* Card 01, hero, full width */}
          <div className="relative mb-6">
            <FadeUp>
              <div className="rounded-2xl px-8 py-7 relative overflow-hidden" style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
                <p style={{ fontFamily: GTA, fontSize: "clamp(18px,2.2vw,22px)", fontWeight: 600, color: "#111", marginBottom: 10, lineHeight: 1.2 }}>Video &amp; highlight reel creation</p>
                <p style={{ fontFamily: GTA, fontSize: 15, fontWeight: 300, color: "#555", lineHeight: 1.65, maxWidth: 620 }}>
                  The #1 use case, and deeply iterative. Clients don&apos;t run a report once. They refine the same reel a dozen times: different cohort, different angle, different quote.
                </p>
              </div>
            </FadeUp>
            {/* Peeking GIF, bottom-right corner — still frame, plays on hover (outside FadeUp so it never fades out) */}
            <HoverGif still="/images/pogob2b/card-peek-still.png" gif="/images/pogob2b/card-peek.gif" size={128} style={{ position: "absolute", bottom: -24, right: -32, zIndex: 20 }} />
          </div>

          {/* Cards 02–05, 2×2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { n: "02", label: "Quote & respondent hunting", body: 'Finding the exact consumer voice to support a claim. "Show me users who said X." Fast, targeted, not exploratory.' },
              { n: "03", label: "Strategic recommendations", body: '"Based on this research, what should we focus on immediately?" Clients asked this constantly. The answer needed to feel grounded, not generic.' },
              { n: "04", label: "Quick quant lookups", body: "Treating chat like a search engine for specific numbers, without having to navigate the full report. Speed mattered more than depth." },
              { n: "05", label: "Presentation & export prep", body: '"Can you export this to PowerPoint?" The output wasn\'t for the analyst. It was for the deck that went to their VP.' },
            ].map(({ n, label, body }, i) => (
              <FadeUp key={n} delay={0.04 * (i + 1)}>
                <div className="rounded-2xl px-8 py-7 h-full relative overflow-hidden" style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
                  <p style={{ fontFamily: GTA, fontSize: 20, fontWeight: 500, color: "#111", marginBottom: 8, lineHeight: 1.3 }}>{label}</p>
                  <p style={{ fontFamily: GTA, fontSize: 14, fontWeight: 300, color: "#555", lineHeight: 1.65 }}>{body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
        <FadeUp>
          <p style={{ fontFamily: GTA, fontSize: 15, fontWeight: 400, color: "#1a1a3a", lineHeight: 1.7 }}>
            Nobody in the data had asked for cross-study synthesis, cohort benchmarking, or complex segmentation, not because they didn&apos;t want it. Because they didn&apos;t know they could ask. The design problem wasn&apos;t a chat interface problem. It was a <strong>capability disclosure problem.</strong>
          </p>
        </FadeUp>
      </section>

      <Divider />

      {/* ═══ MY PROCESS ═══ */}
      <section data-label="Process" className="px-6 py-[96px] max-w-[1240px] mx-auto">
        <FadeUp><SectionPill color="#C8C9FF">Process</SectionPill></FadeUp>

        {/* 01 */}
        <FadeUp className="mb-24">
          <StepLabel n="01" title="Synthesize competing stakeholder POVs" />
          <p style={{ fontFamily: GTA, fontSize: 16, fontWeight: 300, color: "#555", maxWidth: 600, marginBottom: 48, lineHeight: 1.65 }}>
            Speaking to teammates helped me surface three camps and hypothesis.
          </p>
          <div className="mb-6">
            <StakeholderStack />
          </div>
          <div className="mb-10 py-1">
            <p style={{ fontFamily: GTA, fontSize: 16, fontWeight: 300, color: "#333", lineHeight: 1.7 }}>
              These were <strong style={{ fontWeight: 500 }}>different modes</strong>, and they didn&apos;t belong on the same screen. The PM: <em>&ldquo;Two entry points for the same feature creates confusion about the default place to go.&rdquo;</em> We landed on structural separation: <em>Home</em> = your work with AI overlaid. <em>Chat</em> = where the agent runs.
            </p>
          </div>
          {/* Differing hypothesis — Chat vs Home, two hypotheses each */}
          <div style={{ marginTop: 20 }}>
            <p style={{ fontFamily: GTA, fontSize: 26, fontWeight: 400, color: "#555", lineHeight: 1.25, marginBottom: 12 }}>
              Differing Hypothesis: <strong style={{ fontWeight: 600, color: "#111" }}>Presets VS Open Composer</strong>
            </p>
            <p style={{ fontFamily: GTA, fontSize: 15, fontWeight: 300, color: "#555", lineHeight: 1.6, marginBottom: 48 }}>
              Should users be able to query with the AI agent in the &lsquo;Home&rsquo; page, or in a dedicated &lsquo;Chat&rsquo; page?
            </p>

            {[
              {
                label: "Chat",
                cols: [
                  { src: "/images/pogob2b/hypo-chat-1.png", cap: "Hypothesis 1: Preset workflow cards produce better outputs than starting from an open-ended prompt." },
                  { src: "/images/pogob2b/hypo-chat-2.png", cap: "Hypothesis 2: Users self-directing produces better insights than us pre-curating top use cases." },
                ],
              },
              {
                label: "Home",
                cols: [
                  { src: "/images/pogob2b/hypo-home-1.png", cap: "Hypothesis 1: Surfacing existing work with AI actions attached beats an open-ended prompt." },
                  { src: "/images/pogob2b/hypo-home-2.png", cap: "Hypothesis 2: Users self-directing produces better insights than pre-curated use cases." },
                ],
              },
            ].map((row) => (
              <div key={row.label} style={{ marginBottom: 48 }}>
                <p style={{ fontFamily: GTA, fontSize: 18, fontWeight: 600, color: "#111", marginBottom: 14 }}>{row.label}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {row.cols.map((c) => (
                    <figure key={c.src} style={{ margin: 0 }}>
                      <div className="rounded-2xl overflow-hidden border border-white/60" style={{ background: "rgba(255,255,255,0.5)" }}>
                        <Image src={c.src} alt={c.cap} width={1280} height={752} className="w-full object-cover" />
                      </div>
                      <figcaption style={{ fontFamily: GTA, fontSize: 13, fontWeight: 300, color: "#555", lineHeight: 1.6, marginTop: 12 }}>
                        {c.cap}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ))}
            <p style={{ fontFamily: GTA, fontSize: 16, fontWeight: 400, color: "#1a1a3a", lineHeight: 1.7, maxWidth: 720, marginTop: 24, textWrap: "balance" } as React.CSSProperties}>
              Mapping out the different camps visually helped the team understand what we&apos;re really deciding between.
            </p>
          </div>
        </FadeUp>
      </section>

      <Divider />

      {/* ═══ VISUAL EXPLORATIONS ═══ */}
      <section data-label="Explorations" className="px-6 py-[96px] max-w-[1240px] mx-auto">
        <FadeUp><SectionPill color="#C8C9FF">Explorations</SectionPill></FadeUp>
        <FadeUp delay={0.05}>
          <h2 style={{ fontFamily: GTA, fontSize: "clamp(28px,4vw,44px)", fontWeight: 500, color: "#111", lineHeight: 1.2, marginTop: 16, marginBottom: 40 }}>
            What does this product need to be?
          </h2>
        </FadeUp>
        <p style={{ fontFamily: GTA, fontSize: 17, fontWeight: 300, color: "#555", marginBottom: 76, lineHeight: 1.6 }}>
          Search page or workspace? Each direction encoded a different hypothesis about how CPG buyers think and what they come to do.
        </p>

        {/* Before */}
        <div className="mb-32">
          <p style={{ fontFamily: GTA_MONO, fontSize: 20, fontWeight: 400, color: "#555", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 20, marginBottom: 34 }}>The starting point</p>
          <div className="rounded-2xl overflow-hidden mb-3" style={{ border: "1px solid rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.5)" }}>
            <Image src="/images/pogob2b/home-before-redesign.png" alt="Pogo home before redesign" width={1200} height={700} className="w-full object-cover object-top" />
          </div>
          <p style={{ fontFamily: GTA, fontSize: 14, fontWeight: 300, color: "#555", lineHeight: 1.6 }}>
            The existing home: a table of Studies and Cohorts. No AI entry point, no signal about what was new or what to do next.
          </p>
        </div>

        {/* Early wireframes */}
        <div className="mb-32">
          <p style={{ fontFamily: GTA_MONO, fontSize: 20, fontWeight: 400, color: "#555", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 20, marginBottom: 34 }}>Early wireframes</p>
          <p style={{ fontFamily: GTA, fontSize: 15, fontWeight: 300, color: "#555", marginBottom: 48, lineHeight: 1.6 }}>
            Before Figma, I mapped what the agent needed to do. The question: search page or workspace? The answer was both, requiring two surfaces.
          </p>
          <Gallery items={[
            { src: "/images/pogob2b/early-wireframe-global-chat.png", label: "Global chat research agent", sub: "First wireframe: capability tiles + query bar." },
            { src: "/images/pogob2b/early-chat-concept1-pg2.png", label: "Chat - blank composer", sub: "Intentionally minimal to test unprompted behavior." },
            { src: "/images/pogob2b/early-chat-concept2.png", label: "Chat - conversation-aware", sub: '"Welcome back" + proactive signals from new responses.' },
          ]} />
        </div>

        {/* Chat conceptual explorations */}
        <div className="mb-32">
          <p style={{ fontFamily: GTA_MONO, fontSize: 20, fontWeight: 400, color: "#555", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 20, marginBottom: 34 }}>Chat - Concept directions</p>
          <p style={{ fontFamily: GTA, fontSize: 15, fontWeight: 300, color: "#555", marginBottom: 48, lineHeight: 1.6 }}>
            Before deep UX work, I ran four directions to get early team alignment, not to pick a winner, but to surface assumptions.
          </p>
          <Gallery items={[
            { src: "/images/pogob2b/chat-concept1-pg1.png", label: "Concept 1 - Blank composer", sub: 'Clean. Reveals the blank-page problem.' },
            { src: "/images/pogob2b/chat-concept1-optb.png", label: "Concept 1B - Category chips", sub: "Cohort Intelligence, Study Findings, Purchase Metrics." },
            { src: "/images/pogob2b/chat-concept2-insights.png", label: "Concept 2.1 - Jump back in", sub: "In-progress work: Midwest Cohort, Quarter Review." },
            { src: "/images/pogob2b/chat-concept4-visual1.png", label: "Concept 4 - Visual-forward", sub: '"Your buyers are talking." Customer faces as background.' },
            { src: "/images/pogob2b/chat-concept4-visual3.png", label: "Concept 4 - Full bleed", sub: "Strongest PM reaction; hardest to ship within system." },
          ]} />
        </div>

        {/* Two dead ends */}
        <div className="mb-32">
          <h2 style={{ fontFamily: GTA, fontSize: "clamp(22px,3vw,34px)", fontWeight: 500, color: "#111", lineHeight: 1.2, marginBottom: 24 }}>
            Two dead ends that clarified everything
          </h2>
          <p style={{ fontFamily: GTA, fontSize: 15, fontWeight: 300, color: "#555", marginBottom: 32, lineHeight: 1.65, maxWidth: 620 }}>
            Before landing on the Home / Chat split, we explored two patterns for letting users specify what they wanted to do. Both failed, but for reasons that made the real solution obvious.
          </p>

          {/* Project-card style grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {/* Left: slash commands */}
            <div className="rounded-2xl overflow-hidden flex flex-col" style={{ background: "rgba(255,255,255,0.82)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 2px 24px rgba(0,0,0,0.07)" }}>
              {/* Preview area */}
              <div className="p-4" style={{ background: "rgba(225,222,240,0.45)" }}>
                <div className="rounded-xl overflow-hidden">
                  <video src="/videos/pogob2b/slash-commands.mp4" autoPlay loop muted playsInline className="w-full block" />
                </div>
              </div>
              {/* Content */}
              <div className="px-6 py-5 flex flex-col flex-1">
                <p style={{ fontFamily: GTA, fontSize: 17, fontWeight: 600, color: "#111", marginBottom: 8, lineHeight: 1.25 }}>/ slash commands</p>
                <p style={{ fontFamily: GTA, fontSize: 14, fontWeight: 300, color: "#555", lineHeight: 1.7 }}>
                  Notion, Linear, Slack taught power users to love slash commands. CPG buyers are not power users. They don&apos;t know the syntax exists. They&apos;ve never typed &ldquo;/&rdquo; to do anything outside a dev tool.
                </p>
              </div>
            </div>

            {/* Right: plus for everything */}
            <div className="rounded-2xl overflow-hidden flex flex-col" style={{ background: "rgba(255,255,255,0.82)", border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 2px 24px rgba(0,0,0,0.07)" }}>
              {/* Preview area */}
              <div className="p-4" style={{ background: "rgba(225,222,240,0.45)" }}>
                <div className="rounded-xl overflow-hidden">
                  <video src="/videos/pogob2b/plus-everything.mp4" autoPlay loop muted playsInline className="w-full block" />
                </div>
              </div>
              {/* Content */}
              <div className="px-6 py-5 flex flex-col flex-1">
                <p style={{ fontFamily: GTA, fontSize: 17, fontWeight: 600, color: "#111", marginBottom: 8, lineHeight: 1.25 }}>&ldquo;+&rdquo; for everything</p>
                <p style={{ fontFamily: GTA, fontSize: 14, fontWeight: 300, color: "#555", lineHeight: 1.7 }}>
                  One icon carrying four completely different jobs. Attach document, build cohort, generate report, create survey, hidden behind a single &ldquo;+&rdquo;. We were asking users to guess that their most common actions lived there.
                </p>
              </div>
            </div>
          </div>

          {/* Outcome callout */}
          <div className="py-5">
            <p style={{ fontFamily: GTA_MONO, fontSize: 10, fontWeight: 300, color: "#346AFF", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>
              What this told us
            </p>
            <p style={{ fontFamily: GTA, fontSize: 15, fontWeight: 400, color: "#1a1a3a", lineHeight: 1.7 }}>
              Chat couldn&apos;t be the place where users <em>discover</em> features. It had to be the place where users <em>execute</em> tasks they already understood. Features that needed discovery needed a different home, which became the driving argument for separating Chat and Home into categorically different surfaces.
            </p>
          </div>
        </div>

        {/* Capability disclosure */}
        <div className="mb-32">
          <p style={{ fontFamily: GTA_MONO, fontSize: 20, fontWeight: 400, color: "#555", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 20, marginBottom: 34 }}>Design principle: capability disclosure</p>
          <div className="mb-8 py-1">
            <p style={{ fontFamily: GTA, fontSize: 17, fontWeight: 300, color: "#333", fontStyle: "italic", lineHeight: 1.6, maxWidth: 560 }}>
              &ldquo;If users don&apos;t know they can ask &lsquo;Find me strong signals from my buyers,&rsquo; they&apos;ll type something vague, and blame the AI when it doesn&apos;t help.&rdquo;
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <div>
              <p style={{ fontFamily: GTA_MONO, fontSize: 20, fontWeight: 400, color: "#555", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 20, marginBottom: 22 }}>Suggested prompts</p>
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.5)" }}>
                <Image src="/images/pogob2b/chat-suggested-prompts.png" alt="Suggested prompts" width={700} height={500} className="w-full object-cover object-top" />
              </div>
              <p style={{ fontFamily: GTA, fontSize: 13, fontWeight: 300, color: "#555", marginTop: 28, lineHeight: 1.5 }}>Real data language teaches capability without documentation.</p>
            </div>
            <div>
              <p style={{ fontFamily: GTA_MONO, fontSize: 20, fontWeight: 400, color: "#555", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 20, marginBottom: 22 }}>Recent studies as prompts</p>
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.5)" }}>
                <Image src="/images/pogob2b/home-variant-hp5-2.png" alt="Category-scoped input" width={700} height={500} className="w-full object-cover object-top" />
              </div>
              <p style={{ fontFamily: GTA, fontSize: 13, fontWeight: 300, color: "#555", marginTop: 28, lineHeight: 1.5 }}>Category pills narrow scope before typing. Teaches the data model through interaction.</p>
            </div>
          </div>

          <div className="mb-24">
            <p style={{ fontFamily: GTA_MONO, fontSize: 20, fontWeight: 400, color: "#555", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 20, marginBottom: 22 }}>Scoped entry - context before query</p>
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.5)" }}>
              <video src="/videos/pogob2b/scoped-entry-context.mp4" autoPlay loop muted playsInline className="w-full block" />
            </div>
            <p style={{ fontFamily: GTA, fontSize: 13, fontWeight: 300, color: "#555", marginTop: 28, lineHeight: 1.5 }}>Showing context behind the action to help manage expectations from users.</p>
          </div>

          {/* Structured input 3-step */}
          <p style={{ fontFamily: GTA_MONO, fontSize: 20, fontWeight: 400, color: "#555", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 20, marginBottom: 26, lineHeight: 1.3 }}>Progressive Context Collection reduces cognitive overload during entry point</p>
          <p style={{ fontFamily: GTA, fontSize: 15, fontWeight: 300, color: "#555", marginBottom: 48, lineHeight: 1.6 }}>
            Clicking a preset shouldn&apos;t fire the agent blindly. A lightweight intercept asks for scope first.
          </p>
          <Gallery items={[
            { src: "/images/pogob2b/structured-input-chat2.png", label: "Problem - agent running blind", sub: "Before: preset fires immediately. No scope. Hard to verify." },
            { src: "/images/pogob2b/structured-input-3.png", label: "Step 1 - Study picker", sub: '"Which studies?" appears before agent runs. 1 of 2 steps.' },
            { src: "/images/pogob2b/structured-input-4.png", label: "Step 2 - Selection confirmed", sub: "2 studies selected. Next activates. Agent has auditable scope." },
          ]} />
        </div>

        {/* Quick actions */}
        <div className="mb-32">
          <p style={{ fontFamily: GTA_MONO, fontSize: 20, fontWeight: 400, color: "#555", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 20, marginBottom: 34 }}>Quick actions - feature explorations</p>
          <p style={{ fontFamily: GTA, fontSize: 15, fontWeight: 300, color: "#555", marginBottom: 48, lineHeight: 1.6 }}>
            6 approaches to card density, layout, and how much context to surface upfront.
          </p>
          <Gallery items={[
            { src: "/images/pogob2b/chat-interaction.mov", label: "Interaction prototype - Option B1.2", sub: "Clicking preset cards populates the composer, structured starting point without locking users into a fixed flow." },
            { src: "/images/pogob2b/qa-option-a.png", label: "Option A", sub: "Four equal-weight tiles. No hierarchy." },
            { src: "/images/pogob2b/qa-option-b.png", label: "Option B", sub: "Hero card + smaller actions. Priority is signaled." },
            { src: "/images/pogob2b/qa-option-c.png", label: "Option C", sub: "Question framing maps to buyer mental model." },
            { src: "/videos/pogob2b/suggested-actions-expanded.mp4", label: "Option C1", sub: "Suggested Actions expanded as prompts" },
            { src: "/images/pogob2b/qa-option-c1-sources.png", label: "C1 + sources", sub: "Agent context visible on load, before user asks." },
            { src: "/images/pogob2b/qa-option-a1.png", label: "Option A1", sub: "Tighter grid with icon anchors." },
          ]} />
        </div>

        {/* Chat UX patterns */}
        <div className="mb-32">
          <p style={{ fontFamily: GTA_MONO, fontSize: 20, fontWeight: 400, color: "#555", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 20, marginBottom: 34 }}>Chat UX - new chat &amp; history access</p>
          <p style={{ fontFamily: GTA, fontSize: 15, fontWeight: 300, color: "#555", marginBottom: 48, lineHeight: 1.6 }}>
            Where does a new chat begin, and how do users return to a previous one?
          </p>
          <div className="mb-12">
            <p style={{ fontFamily: GTA, fontSize: 14, fontWeight: 500, color: "#111", marginBottom: 6 }}>Starting a new chat</p>
            <Gallery items={[
              { src: "/images/pogob2b/newchat-a1.png", label: "A1 - Centered", sub: "High visibility, takes canvas space." },
              { src: "/images/pogob2b/newchat-a2.png", label: "A2 - Hamburger", sub: "Low footprint, lower discoverability." },
              { src: "/images/pogob2b/newchat-a3.png", label: "A3 - Write icon", sub: "Familiar (Slack). Needs label for first-timers." },
              { src: "/images/pogob2b/newchat-a4.png", label: "A4 - Nav bar", sub: "Most persistent. Matches where the eye starts." },
            ]} />
          </div>
          <div>
            <p style={{ fontFamily: GTA, fontSize: 14, fontWeight: 500, color: "#111", marginBottom: 6 }}>Accessing history</p>
            <Gallery items={[
              { src: "/images/pogob2b/history-a1.png", label: "A1 - History icon", sub: "Clock icon. Low footprint." },
              { src: "/images/pogob2b/history-a1-hover.png", label: "A1 - Hover", sub: "Tooltip confirms action, reduces ambiguity." },
              { src: "/images/pogob2b/history-a1-modal.png", label: "A1 - Drawer", sub: "Full-height drawer. Non-blocking." },
              { src: "/images/pogob2b/history-a2-popover.png", label: "A2 - Popover", sub: "Compact dropdown with recent sessions." },
            ]} />
          </div>
        </div>

        {/* Home variants */}
        <div className="mb-32">
          <p style={{ fontFamily: GTA_MONO, fontSize: 20, fontWeight: 400, color: "#555", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 20, marginBottom: 34 }}>Home page - layout proposals</p>
          <p style={{ fontFamily: GTA, fontSize: 15, fontWeight: 300, color: "#555", marginBottom: 48, lineHeight: 1.6 }}>
            After aligning the decision to separate the use case to jump back into a cohort or study clients have built, I explored layouts for the home page.
          </p>
          <Gallery items={[
            { src: "/images/pogob2b/home-variant-hover.png", label: "Option A - Action-first", sub: "AI actions at top. Recent work below." },
            { src: "/images/pogob2b/home-variant-31.png", label: "Option - Activity feed", sub: "Updates since last visit. Pogo as living workspace." },
            { src: "/images/pogob2b/home-variant-march.png", label: "Option C - Conversation-first", sub: "Leads with recent chats. Pogo as assistant." },
            { src: "/images/pogob2b/home-variant-mar20.png", label: "Option D - Asset overview", sub: "Studies, Cohorts, Chats, Reels in four zones." },
            { src: "/images/pogob2b/home-variant-b3.png", label: "Option B3 - Refined grid", sub: "Final iteration: tighter density, per-section actions." },
          ]} />
        </div>

        {/* Sources decision */}
        <div className="mb-32">
          <h3 style={{ fontFamily: GTA, fontSize: "clamp(22px,3vw,34px)", fontWeight: 500, color: "#111", lineHeight: 1.2, marginBottom: 32 }}>
            Trust and sources
          </h3>
          <p style={{ fontFamily: GTA_MONO, fontSize: 20, fontWeight: 400, color: "#555", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 20, marginBottom: 34 }}>Sources attribution - design decision</p>
          <p style={{ fontFamily: GTA, fontSize: 15, fontWeight: 300, color: "#555", marginBottom: 16, lineHeight: 1.6 }}>
            Enterprise buyers present AI output to VPs. Two architectures tested: thread-level vs. per-message sources.
          </p>
          <p style={{ fontFamily: GTA, fontSize: 15, fontWeight: 300, color: "#555", marginBottom: 24, lineHeight: 1.6 }}>
            Enterprise buyers don&apos;t keep insights. They present them. A CPG VP pasting an AI summary into a board deck needs to know which study backed that claim, not which studies were open in the thread.
          </p>
          <div className="grid grid-cols-1 gap-12 mb-8">
            <div>
              <p style={{ fontFamily: GTA_MONO, fontSize: 20, color: "#555", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 20, marginBottom: 22 }}>2A - Thread-level</p>
              <Gallery items={[
                { src: "/images/pogob2b/sources-2a.png", label: "Default", sub: "Source count in header only." },
                { src: "/images/pogob2b/sources-2a-click.png", label: "On click", sub: "Drawer opens with all sources." },
                { src: "/images/pogob2b/sources-2a-drawer.png", label: "Drawer", sub: "Full list visible." },
              ]} />
            </div>
            <div>
              <p style={{ fontFamily: GTA_MONO, fontSize: 20, color: "#555", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 20, marginBottom: 22 }}>2B - Per-message sources ✓</p>
              <Gallery items={[
                { src: "/images/pogob2b/sources-2b.png", label: "Default", sub: "Sources button per response." },
                { src: "/images/pogob2b/sources-2b-1.png", label: "Sources shown", sub: '"Sources 3" at bottom of each response.' },
                { src: "/images/pogob2b/sources-2b-drawer.png", label: "Drawer", sub: "Color-coded by type." },
              ]} />
              <ul className="space-y-1.5 mt-4">
                {["+  Each claim traceable to its source", "+  Sources travel with the answer, citable", "+  Matches Perplexity's proven enterprise trust pattern"].map(t => (
                  <li key={t} style={{ fontFamily: GTA, fontSize: 13, fontWeight: 300, color: t.startsWith("+") ? "#444" : "#AAA" }}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-2xl p-6" style={{ background: CARD_BG, border: "1px solid rgba(255,255,255,0.7)" }}>
            <p style={{ fontFamily: GTA_MONO, fontSize: 11, fontWeight: 300, color: "#346AFF", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>Decision → Option 2B (per-message)</p>
            <p style={{ fontFamily: GTA, fontSize: 15, fontWeight: 300, color: "#333", lineHeight: 1.65 }}>
              A CPG VP pasting an AI summary into a deck needs to know which studies that claim came from. Thread-level attribution breaks that chain. Per-message sources keep evidence attached to the claim. Visual weight is a fair trade for auditability.
            </p>
          </div>

          {/* An Auditable Workspace */}
          <div className="mt-40">
            <p style={{ fontFamily: GTA_MONO, fontSize: 20, fontWeight: 400, color: "#555", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 20, marginBottom: 40 }}>An Auditable Workspace</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
              <FadeUp>
                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.5)" }}>
                  <video src="/videos/pogob2b/auditable-workspace.mp4" autoPlay loop muted playsInline className="w-full block" />
                </div>
                <p style={{ fontFamily: GTA, fontSize: 13, fontWeight: 300, color: "#555", marginTop: 14, lineHeight: 1.6 }}>
                  Log of active tasks alongside study workspace. It displays individual Studies and Cohorts cited, technical sub-goals, and actual customer avatars all at once for maximum visibility.
                </p>
              </FadeUp>
              <FadeUp delay={0.05}>
                <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.5)" }}>
                  <Image src="/images/pogob2b/auditable-workspace-2.png" alt="Auditable workspace — active sources mapped in context" width={1920} height={1155} className="w-full block" />
                </div>
                <p style={{ fontFamily: GTA, fontSize: 13, fontWeight: 300, color: "#555", marginTop: 14, lineHeight: 1.6 }}>
                  Active cohorts and studies in horizontal pill buttons. (Note: the background canvas is blurred here just to highlight this sidebar variant for the case study.)
                </p>
              </FadeUp>
            </div>
            <FadeUp>
              <div className="border-l-2 pl-5 mt-16 py-1" style={{ borderColor: "#346AFF" }}>
                <p style={{ fontFamily: GTA, fontSize: 17, fontWeight: 300, color: "#333", lineHeight: 1.7, maxWidth: 680 }}>
                  <strong style={{ fontWeight: 500, color: "#111" }}>The core insight:</strong> Enterprise CPG buyers present insights directly to leadership. If they cannot trace an answer back to its exact behavioral data source, they will not stake their credibility on it.
                </p>
              </div>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-16">
              {[
                { label: "Upfront capability disclosure", body: "Instead of running blind, the interface maps out precisely which core assets, pricing studies, consumer cohorts, are currently active in the computational context." },
                { label: "Source governance", body: "It transitions the tool from an ungrounded chat into a deterministic workspace, giving users the absolute clarity needed to verify evidence before exporting insights to executive decks." },
              ].map(({ label, body }) => (
                <FadeUp key={label}>
                  <div className="rounded-2xl px-7 py-6 h-full" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
                    <p style={{ fontFamily: GTA, fontSize: 17, fontWeight: 500, color: "#111", marginBottom: 10, lineHeight: 1.3 }}>{label}</p>
                    <p style={{ fontFamily: GTA, fontSize: 15, fontWeight: 300, color: "#555", lineHeight: 1.7 }}>{body}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>

        {/* Final designs */}
        <div className="mb-32">
          <div>
            <p style={{ fontFamily: GTA_MONO, fontSize: 20, fontWeight: 400, color: "#555", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 20, marginBottom: 22 }}>End-to-end - home → chat → insights</p>
            <div className="rounded-2xl overflow-hidden" style={{ background: "#000" }}>
              <video src="/images/pogob2b/home-chat-demo.mov" autoPlay loop muted playsInline className="w-full" />
            </div>
            <p style={{ fontFamily: GTA, fontSize: 13, fontWeight: 300, color: "#555", marginTop: 28, lineHeight: 1.5 }}>Full flow: Home → Chat → AI Research Agent conversation with sources and artifact generation.</p>
          </div>
        </div>
      </section>

      <Divider />

      {/* ═══ INTERACTION DESIGN ═══ */}
      <section data-label="Interaction" className="px-6 py-[96px] max-w-[1240px] mx-auto">
        <FadeUp><SectionPill color="#C8C9FF">Interaction</SectionPill></FadeUp>

        {/* Progressive capability disclosure */}
        <div className="mt-28">
          <h2 style={{ fontFamily: GTA, fontSize: "clamp(28px,4vw,44px)", fontWeight: 500, color: "#111", lineHeight: 1.2, marginTop: 20, marginBottom: 28 }}>Progressive Capability Disclosure</h2>
          {/* Composer in motion */}
          <FadeUp>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.5)" }}>
              <video src="/videos/pogob2b/composer-progressive-disclosure.mp4" autoPlay loop muted playsInline className="w-full block" />
            </div>
            <p style={{ fontFamily: GTA, fontSize: 13, fontWeight: 300, color: "#555", marginTop: 28, lineHeight: 1.5 }}>
              The composer in motion: prompts rotate to model good questions, capability chips open scaffolded templates pre-filled with real studies, and the moment you start typing, the scaffolding clears out of the way.
            </p>
          </FadeUp>
          <FadeUp className="mt-16">
            <p style={{ fontFamily: GTA, fontSize: 17, fontWeight: 300, color: "#555", lineHeight: 1.7, maxWidth: 720, marginBottom: 52 }}>
              A blank composer assumes you already know the questions worth asking. The usage data said most buyers didn&apos;t. So the composer had to <strong style={{ fontWeight: 400, color: "#111" }}>teach intent while accepting it</strong>, revealing capability one layer at a time as the user leaned in, never as a menu to read first.
            </p>
          </FadeUp>

          {/* Closing principle */}
          <FadeUp>
            <div className="border-l-2 pl-5 mt-16 py-1" style={{ borderColor: "#346AFF" }}>
              <p style={{ fontFamily: GTA, fontSize: 17, fontWeight: 300, color: "#333", lineHeight: 1.7, maxWidth: 640 }}>
                Each layer only appears when the user reaches for it. A first-time buyer is taught what to ask; a returning one types straight past it. The same surface serves discovery and execution, which is what let chat replace navigation as the way in.
              </p>
            </div>
          </FadeUp>
        </div>

        {/* The interface nods back — acknowledgment cues */}
        <div className="mt-28">
          <h2 style={{ fontFamily: GTA, fontSize: "clamp(28px,4vw,44px)", fontWeight: 500, color: "#111", lineHeight: 1.2, marginTop: 20, marginBottom: 34 }}>The interface nods back</h2>
          <FadeUp>
            <p style={{ ...ATTENTION_LINE, fontSize: "clamp(20px,2.4vw,27px)", maxWidth: 820, marginBottom: 52 }}>
              When you talk to a person, you don&apos;t narrate what you&apos;re thinking. They blink, they nod, and you know you&apos;ve been understood. I wanted the composer to do the same, to acknowledge intent the instant it forms.
            </p>
          </FadeUp>
          <FadeUp delay={0.05}>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.5)" }}>
              <video src="/videos/pogob2b/composer-acknowledges-intent.mp4" autoPlay loop muted playsInline className="w-full block" />
            </div>
            <p style={{ fontFamily: GTA, fontSize: 13, fontWeight: 300, color: "#555", marginTop: 28, lineHeight: 1.5 }}>
              Send fills the moment there&apos;s a keystroke, chips settle as state changes, and typing <span style={{ fontFamily: GTA_MONO, fontSize: 12 }}>@</span> surfaces the exact sources you can reach for. Small, constant acknowledgments that the app is reading along.
            </p>
          </FadeUp>
          <FadeUp className="mt-20">
            <h3 style={{ fontFamily: GTA, fontSize: "clamp(20px,2.4vw,26px)", fontWeight: 500, color: "#111", lineHeight: 1.3, marginBottom: 28, maxWidth: 760 }}>
              Interaction design cues that show the app is listening
            </h3>
            <div className="flex flex-col" style={{ gap: 22, maxWidth: 720 }}>
              <p style={{ fontFamily: GTA, fontSize: 17, fontWeight: 300, color: "#444", lineHeight: 1.7 }}>
                Type a verb tied to an AI workflow&mdash;&ldquo;compare,&rdquo; &ldquo;summarize&rdquo;&mdash;and it shimmers. Small, but it tells you the app caught it.
              </p>
              <p style={{ fontFamily: GTA, fontSize: 17, fontWeight: 300, color: "#444", lineHeight: 1.7 }}>
                Type <span style={{ fontFamily: GTA_MONO }}>@</span> and your sources show up as chips, right where you&apos;re typing. You don&apos;t go find them&hellip; they just settle into place.
              </p>
              <p style={{ fontFamily: GTA, fontSize: 17, fontWeight: 300, color: "#444", lineHeight: 1.7 }}>
                Start typing anything, and the suggested prompts drop away. That&apos;s the app switching modes, from &ldquo;here&apos;s what you might ask&rdquo; to &ldquo;I see what you&apos;re already asking.&rdquo; The shift is the point: it stops recommending and starts recognizing.
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.08}>
            <blockquote style={{ fontFamily: GTA, fontSize: "clamp(22px,2.6vw,30px)", fontWeight: 400, color: "#1a1a3a", lineHeight: 1.45, margin: 0, marginTop: 56, maxWidth: 640 }}>
              &ldquo;It tells me something is going on.&rdquo;
            </blockquote>
          </FadeUp>
        </div>
      </section>

      <Divider />

      {/* ═══ KEY DECISIONS ═══ */}
      <section data-label="Decisions" className="px-6 py-[96px] max-w-[1240px] mx-auto">
        <SectionPill color="#C8C9FF">Decisions</SectionPill>
        <h2 style={{ fontFamily: GTA, fontSize: "clamp(28px,4vw,44px)", fontWeight: 500, color: "#111", lineHeight: 1.2, marginBottom: 42 }}>
          Key Decisions
        </h2>
        <div className="flex flex-col" style={{ gap: 80 }}>
          {[
            {
              n: "01",
              title: "Cold start vs. capability cards",
              body: "A blank composer assumes discovery intent. The data showed execution intent. Presets aren't constraints, they're a tutorial. The open composer above still handled any freeform query.",
              dual: [
                { src: "/images/pogob2b/cold-start-blank.png", caption: "Cold start — a blank composer assumes the user knows what to ask." },
                { src: "/images/pogob2b/chat-variant-quickactions.png", caption: "Capability cards teach what's possible; the open composer above takes any freeform question." },
              ],
            },
            {
              n: "02",
              title: "Home vs. Chat separation",
              body: 'The team debated putting a composer on Home. The PM killed it: "Two entry points for the same feature creates confusion about the default place to go." We kept them categorically different: Home surfaces existing work with AI actions attached, Chat is where the agent runs.',
              dual: [
                { src: "/images/pogob2b/home-with-composer.png", caption: "Home with a composer" },
                { src: "/images/pogob2b/chat-with-composer.png", caption: "Chat with a composer" },
              ],
            },
            {
              n: "03",
              title: "Structured input before working state",
              body: "Clients were nervous about AI acting on their behalf without knowing what it was reading. Scope set before the agent runs isn't friction, it's a trust mechanism. You can't unread a result that used the wrong data.",
              src: "/images/pogob2b/structured-input-4.png",
              caption: "The agent asks which studies to pull from before it runs. Scope is auditable, every time.",
            },
            {
              n: "04",
              title: "Preset copy specificity",
              body: `Cards said "Summarize Top Insights" was too vague. PM's feedback: "Either these are navigation buttons or workflow buttons. If they're workflow buttons, they have to be specific." We rewrote every card as a job to be done: verb + outcome + what you get.`,
              dual: [
                { src: "/videos/pogob2b/preset-oneclick.mp4", caption: "One click loads the preset into the composer as editable text." },
                { src: "/images/pogob2b/preset-copy-specific.png", caption: "Every card rewritten as a job to be done, with category labels for fast scanning." },
              ],
            },
          ].map(({ n, title, body, src, caption, dual }, i) => {
            const eyebrow = (
              <p style={{ ...ATTENTION_LINE, marginBottom: 22 }}>
                Decision {n}
              </p>
            );
            const heading = (
              <p style={{ fontFamily: GTA, fontSize: "clamp(20px,2.4vw,26px)", fontWeight: 600, color: "#111", marginBottom: 14, lineHeight: 1.25 }}>
                {title}
              </p>
            );
            const para = (
              <p style={{ fontFamily: GTA, fontSize: 16, fontWeight: 300, color: "#555", lineHeight: 1.75 }}>
                {body}
              </p>
            );

            // Dual-image decision: text on top, two images side by side
            if (dual) {
              return (
                <FadeUp key={title}>
                  <div>
                    {eyebrow}
                    {heading}
                    {para}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      {dual.map((d) => (
                        <div key={d.src}>
                          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.5)", boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}>
                            {/\.(mp4|mov|webm)$/i.test(d.src) ? (
                              <video src={d.src} autoPlay loop muted playsInline className="w-full block" />
                            ) : (
                              <Image src={d.src} alt={d.caption} width={1000} height={640} className="w-full object-cover object-top" />
                            )}
                          </div>
                          <p style={{ fontFamily: GTA, fontSize: 13, fontWeight: 300, color: "#555", marginTop: 14, lineHeight: 1.5 }}>
                            {d.caption}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              );
            }

            const imageRight = i % 2 === 0;
            return (
              <FadeUp key={title}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  {/* Text */}
                  <div className={imageRight ? "md:order-1" : "md:order-2"}>
                    {eyebrow}
                    {heading}
                    {para}
                  </div>
                  {/* Image */}
                  <div className={imageRight ? "md:order-2" : "md:order-1"}>
                    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.5)", boxShadow: "0 2px 20px rgba(0,0,0,0.06)" }}>
                      <Image src={src} alt={title} width={1000} height={640} className="w-full object-cover object-top" />
                    </div>
                    <p style={{ fontFamily: GTA, fontSize: 13, fontWeight: 300, color: "#888", marginTop: 14, lineHeight: 1.5 }}>
                      {caption}
                    </p>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </section>

      <Divider />

      {/* ═══ WHAT I SHIPPED ═══ */}
      <section data-label="Final prod" className="px-6 py-[96px] max-w-[1240px] mx-auto">
        <SectionPill color="#C8C9FF">Final Design</SectionPill>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {[
            { label: "Home", src: "/images/pogob2b/final-home.png", caption: "Studies, Cohorts, Highlight Reels, Chats, surfaced at a glance." },
            { label: "Chat", src: "/images/pogob2b/final-chat.png", caption: '"What do your customers think?", presets map to real buyer tasks.' },
          ].map(({ label, src, caption }) => (
            <div key={label}>
              <p style={{ fontFamily: GTA_MONO, fontSize: 20, color: "#555", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 20, marginBottom: 22 }}>{label}</p>
              <div className="rounded-2xl overflow-hidden mb-4" style={{ border: "1px solid rgba(255,255,255,0.8)" }}>
                <Image src={src} alt={label} width={700} height={700} className="w-full object-cover object-top" />
              </div>
              <p style={{ fontFamily: GTA, fontSize: 13, fontWeight: 300, color: "#555", lineHeight: 1.5 }}>{caption}</p>
            </div>
          ))}
        </div>
        <FadeUp delay={0.05}>
          <h2 style={{ fontFamily: GTA, fontSize: "clamp(28px,4vw,44px)", fontWeight: 500, color: "#111", lineHeight: 1.2, marginTop: 24, marginBottom: 36 }}>
            You shouldn&apos;t have to know the answer to find it.
          </h2>
        </FadeUp>
        <FadeUp delay={0.08}>
          <p style={{ fontFamily: GTA, fontSize: 18, fontWeight: 300, color: "#444", lineHeight: 1.7, maxWidth: 760, marginBottom: 16 }}>
            <span style={{ fontWeight: 400, color: "#111" }}>How it was done previously:</span> Want an insight? Open Studies, pick the right one, open the report, dig through the cohort, find the chart&hellip; Five steps and you only knew which five because you guessed where the answer lived.
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p style={{ fontFamily: GTA, fontSize: 18, fontWeight: 300, color: "#444", lineHeight: 1.7, maxWidth: 760, marginBottom: 36 }}>
            The research agent UX flips it. <span style={{ fontWeight: 400, color: "#111" }}>Ask first. Get your answer.</span> Then go to where it came from, if you want to verify or dive deeper.
          </p>
        </FadeUp>
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.8)", background: "#000" }}>
          <video src="/videos/pogob2b/final-design-demo.mp4" autoPlay loop muted playsInline className="w-full block" />
        </div>
      </section>

      <Divider />

      <LearningsSection />

      {/* Footer fade — eases the page's purple gently into the footer color */}
      <div style={{ height: 420, background: "linear-gradient(180deg, rgba(242,242,242,0) 0%, rgba(242,242,242,0.55) 55%, #F2F2F2 100%)" }} />
    </div>
  );
}
