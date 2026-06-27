"use client";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import React, { useState, useId, useRef } from "react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import { ChevronLeft, ArrowRight } from "lucide-react";

const GTA = "'GT America', system-ui, -apple-system, sans-serif";
const GTA_MONO = "'GT America Mono', 'GT America', monospace";

type Card = {
  id: string;
  role: string;
  quote: string;
  rotation?: number;
  x?: number;
  y?: number;
  zIndex?: number;
};

const CARDS: Card[] = [
  { id: "pms", role: "PMs", quote: "Get users back to the study they started.", rotation: -15, x: -90, y: 10, zIndex: 10 },
  { id: "engineers", role: "Engineers", quote: "Presets limit users. Let them ask freely.", rotation: -3, x: -10, y: -15, zIndex: 20 },
  { id: "founders", role: "Founders", quote: "CPG clients want their assets front and center.", rotation: 12, x: 75, y: 5, zIndex: 30 },
];

const transition = {
  type: "spring",
  stiffness: 160,
  damping: 18,
  mass: 1,
} as const;

function CardFace({ card }: { card: Card }) {
  return (
    <div className="w-full h-full flex flex-col justify-between p-5 md:p-6">
      <span
        style={{
          fontFamily: GTA_MONO,
          fontSize: 13,
          fontWeight: 400,
          color: "#9A9AC8",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        {card.role}
      </span>
      <p
        style={{
          fontFamily: GTA,
          fontSize: 17,
          fontWeight: 400,
          color: "#1a1a3a",
          lineHeight: 1.4,
        }}
      >
        &ldquo;{card.quote}&rdquo;
      </p>
    </div>
  );
}

export function StakeholderStack() {
  const [isExpanded, setIsExpanded] = useState(false);
  const layoutGroupId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, () => {
    if (isExpanded) setIsExpanded(false);
  });

  return (
    <section className="relative w-full flex flex-col items-center justify-start">
      <LayoutGroup id={layoutGroupId}>
        <div className="w-full flex flex-col items-center">
          {/* Back button (expanded only) */}
          <div className="w-full h-10 flex items-center justify-start mb-2">
            <AnimatePresence>
              {isExpanded && (
                <motion.button
                  key="back-button"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={() => setIsExpanded(false)}
                  className="flex items-center gap-1.5 group"
                  style={{ fontFamily: GTA, fontSize: 13, color: "#666" }}
                >
                  <span className="p-1.5 rounded-full bg-black/[0.04] group-hover:bg-black/[0.08] transition-colors">
                    <ChevronLeft size={16} />
                  </span>
                  Go back
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            ref={containerRef}
            layout
            className={cn(
              "relative w-full",
              isExpanded
                ? "grid grid-cols-1 sm:grid-cols-3 gap-3"
                : "flex flex-col items-center justify-start"
            )}
            transition={transition}
          >
            <div
              className={cn(
                "relative",
                isExpanded ? "contents" : "h-[300px] w-full flex items-center justify-center"
              )}
            >
              {CARDS.map((card, index) => (
                <motion.div
                  key={`card-${card.id}`}
                  layoutId={`card-container-${card.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: !isExpanded ? card.rotation || 0 : 0,
                    x: !isExpanded ? card.x || 0 : 0,
                    y: !isExpanded ? card.y || 0 : 0,
                    zIndex: !isExpanded ? card.zIndex || index : 10,
                  }}
                  transition={transition}
                  whileHover={
                    !isExpanded
                      ? {
                          scale: 1.05,
                          y: (card.y || 0) - 15,
                          rotate: (card.rotation || 0) * 0.8,
                          zIndex: 50,
                          transition: { type: "spring", stiffness: 400, damping: 25 },
                        }
                      : { scale: 1.02 }
                  }
                  className={cn(
                    "cursor-pointer overflow-hidden",
                    isExpanded
                      ? "relative min-h-[170px]"
                      : "absolute w-52 h-52 md:w-60 md:h-60"
                  )}
                  style={{
                    background: "#ffffff",
                    borderRadius: 20,
                    border: "1px solid rgba(0,0,0,0.05)",
                    boxShadow: isExpanded
                      ? "0 2px 16px rgba(0,0,0,0.05)"
                      : "0 20px 50px rgba(0,0,0,0.15)",
                  }}
                  onClick={() => !isExpanded && setIsExpanded(true)}
                >
                  <motion.div
                    layoutId={`card-inner-${card.id}`}
                    layout="position"
                    className="w-full h-full"
                    transition={transition}
                  >
                    <CardFace card={card} />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* CTA (collapsed only) */}
            <AnimatePresence>
              {!isExpanded && (
                <motion.div
                  key="cta"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center mt-6"
                >
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="group inline-flex items-center gap-2 rounded-full transition-colors"
                    style={{
                      fontFamily: GTA,
                      fontSize: 13,
                      color: "#333",
                      padding: "8px 16px",
                      background: "rgba(255,255,255,0.7)",
                      border: "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    Compare all three
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </LayoutGroup>
    </section>
  );
}

export default StakeholderStack;
