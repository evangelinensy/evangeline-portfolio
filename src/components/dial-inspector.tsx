"use client";

/**
 * DialInspector — click-to-inspect mode for DialKit.
 *
 * Toggle inspect mode (button bottom-left, or press "i"), hover to highlight,
 * click any element on the page. DialKit then shows a control set matched to
 * that element's kind (text → typography, image/video → radius/opacity/fit,
 * container → padding/gap/background). Edits apply live to that exact element
 * via inline styles.
 *
 * Internal tool only — renders nothing in production builds.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDialKitController, type DialConfig } from "dialkit";

const IS_DEV =
  typeof process !== "undefined" && process.env.NODE_ENV !== "production";

type Kind = "text" | "image" | "container";

const TEXT_TAGS = new Set([
  "H1", "H2", "H3", "H4", "H5", "H6", "P", "SPAN", "A", "BUTTON", "LI",
  "STRONG", "EM", "LABEL", "BLOCKQUOTE", "TD", "TH", "FIGCAPTION", "SMALL",
]);
const IMAGE_TAGS = new Set(["IMG", "VIDEO", "SVG", "PICTURE", "CANVAS"]);

function getKind(el: HTMLElement): Kind {
  if (IMAGE_TAGS.has(el.tagName)) return "image";
  if (TEXT_TAGS.has(el.tagName)) return "text";
  if (el.children.length === 0 && (el.textContent ?? "").trim()) return "text";
  return "container";
}

function px(v: string): number {
  const n = parseFloat(v);
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : 0;
}

/** Parse a CSS color into hex + whether it's effectively transparent. */
function parseColor(input: string): { hex: string; transparent: boolean } {
  const m = input.match(/rgba?\(([^)]+)\)/);
  if (!m) return { hex: "#ffffff", transparent: true };
  const parts = m[1].split(",").map((s) => parseFloat(s.trim()));
  const [r, g, b, a = 1] = parts;
  const hex =
    "#" +
    [r, g, b]
      .map((c) => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, "0"))
      .join("");
  return { hex, transparent: a === 0 };
}

function elLabel(el: HTMLElement): string {
  const tag = el.tagName.toLowerCase();
  const id = el.id ? `#${el.id}` : "";
  const cls =
    typeof el.className === "string" && el.className.trim()
      ? "." + el.className.trim().split(/\s+/)[0]
      : "";
  return `${tag}${id}${cls}`.slice(0, 28);
}

/**
 * Mounted fresh per selection (via React key) so the DialKit panel is seeded
 * from this element's real computed styles every time.
 */
function ElementControls({ el, kind }: { el: HTMLElement; kind: Kind }) {
  // Snapshot computed styles once, on mount.
  const initial = useMemo(() => {
    const cs = getComputedStyle(el);
    const color = parseColor(cs.color);
    const bg = parseColor(cs.backgroundColor);
    return { cs, color, bg };
  }, [el]);

  const { config, name } = useMemo<{ name: string; config: DialConfig }>(() => {
    const { cs, color, bg } = initial;
    if (kind === "text") {
      const fs = px(cs.fontSize) || 16;
      const lh =
        cs.lineHeight === "normal" ? 1.4 : Math.round((px(cs.lineHeight) / fs) * 100) / 100;
      const config: DialConfig = {
          fontSize: [fs, 8, 160, 1],
          lineHeight: [lh, 0.8, 3, 0.01],
          letterSpacing: [cs.letterSpacing === "normal" ? 0 : px(cs.letterSpacing), -5, 20, 0.1],
          fontWeight: {
            type: "select" as const,
            options: ["300", "400", "500", "600", "700", "800", "900"],
            default: String(parseInt(cs.fontWeight, 10) || 400),
          },
          color: { type: "color" as const, default: color.hex },
          opacity: [parseFloat(cs.opacity) || 1, 0, 1, 0.01],
      };
      return { name: `Text · ${elLabel(el)}`, config };
    }
    if (kind === "image") {
      const config: DialConfig = {
          borderRadius: [px(cs.borderTopLeftRadius), 0, 120, 1],
          opacity: [parseFloat(cs.opacity) || 1, 0, 1, 0.01],
          objectFit: {
            type: "select" as const,
            options: ["fill", "contain", "cover", "none", "scale-down"],
            default: cs.objectFit || "fill",
          },
          grayscale: [0, 0, 1, 0.01],
      };
      return { name: `Image · ${elLabel(el)}`, config };
    }
    const config: DialConfig = {
        paddingX: [px(cs.paddingLeft), 0, 200, 1],
        paddingY: [px(cs.paddingTop), 0, 200, 1],
        gap: [cs.gap === "normal" ? 0 : px(cs.gap), 0, 160, 1],
        borderRadius: [px(cs.borderTopLeftRadius), 0, 120, 1],
        opacity: [parseFloat(cs.opacity) || 1, 0, 1, 0.01],
    };
    // Only expose a background control when the element actually has a solid
    // colour. A transparent / gradient background reports as transparent, which
    // would otherwise show up as a misleading #000000 in the copied config.
    if (!bg.transparent) {
        config.background = { type: "color" as const, default: bg.hex };
    }
    return { name: `Layout · ${elLabel(el)}`, config };
  }, [el, kind, initial]);

  const ctrl = useDialKitController(name, config);
  const values = ctrl.values;

  // ── Undo / redo history (⌘Z / ⌘⇧Z) ───────────────────────────────
  // Each settled adjustment (slider drag, color pick) becomes one step.
  const setValuesRef = useRef(ctrl.setValues);
  setValuesRef.current = ctrl.setValues;
  const undoStack = useRef<string[]>([]); // JSON snapshots, oldest→newest
  const redoStack = useRef<string[]>([]);
  const applyingRef = useRef(false); // true while we restore a snapshot
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Seed history with the element's starting values (once).
  const seededRef = useRef(false);
  if (!seededRef.current) {
    undoStack.current = [JSON.stringify(values)];
    seededRef.current = true;
  }

  // Record a new step once an adjustment settles (debounced).
  useEffect(() => {
    if (applyingRef.current) {
      applyingRef.current = false;
      return;
    }
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      const snap = JSON.stringify(values);
      if (undoStack.current[undoStack.current.length - 1] !== snap) {
        undoStack.current.push(snap);
        redoStack.current = []; // a fresh edit invalidates redo
      }
    }, 250);
    return () => {
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
  }, [values]);

  // Keyboard: ⌘Z undo, ⌘⇧Z / ⌘Y redo.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return; // let inputs handle their own undo
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;
      const key = e.key.toLowerCase();
      const isUndo = key === "z" && !e.shiftKey;
      const isRedo = (key === "z" && e.shiftKey) || key === "y";
      if (isUndo) {
        if (undoStack.current.length <= 1) return; // nothing before the seed
        e.preventDefault();
        if (settleTimer.current) clearTimeout(settleTimer.current);
        const current = undoStack.current.pop()!;
        redoStack.current.push(current);
        const prev = undoStack.current[undoStack.current.length - 1];
        applyingRef.current = true;
        setValuesRef.current(JSON.parse(prev));
      } else if (isRedo) {
        if (redoStack.current.length === 0) return;
        e.preventDefault();
        if (settleTimer.current) clearTimeout(settleTimer.current);
        const next = redoStack.current.pop()!;
        undoStack.current.push(next);
        applyingRef.current = true;
        setValuesRef.current(JSON.parse(next));
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, []);

  // Apply live to the selected element.
  useEffect(() => {
    const v = values as Record<string, number | string>;
    const s = el.style;
    if (kind === "text") {
      s.fontSize = `${v.fontSize}px`;
      s.lineHeight = String(v.lineHeight);
      s.letterSpacing = `${v.letterSpacing}px`;
      s.fontWeight = String(v.fontWeight);
      s.color = String(v.color);
      s.opacity = String(v.opacity);
    } else if (kind === "image") {
      s.borderRadius = `${v.borderRadius}px`;
      s.opacity = String(v.opacity);
      s.objectFit = String(v.objectFit);
      s.filter = `grayscale(${v.grayscale})`;
    } else {
      s.paddingLeft = s.paddingRight = `${v.paddingX}px`;
      s.paddingTop = s.paddingBottom = `${v.paddingY}px`;
      s.gap = `${v.gap}px`;
      s.borderRadius = `${v.borderRadius}px`;
      s.opacity = String(v.opacity);
      // Only apply background if the element had one, or the user changed it —
      // avoids painting transparent containers a solid colour.
      if (!initial.bg.transparent || v.background !== initial.bg.hex) {
        s.background = String(v.background);
      }
    }
  }, [values, el, kind, initial]);

  return null;
}

export function DialInspector() {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState<HTMLElement | null>(null);
  const [selKey, setSelKey] = useState(0);
  const [hoverRect, setHoverRect] = useState<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);

  const isOwnUi = useCallback((node: EventTarget | null) => {
    const elNode = node as HTMLElement | null;
    return !!elNode?.closest?.(".dialkit-root, #dial-inspect-ui");
  }, []);

  // Hover highlight while inspecting.
  useEffect(() => {
    if (!active) {
      setHoverRect(null);
      return;
    }
    const onMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const t = e.target as HTMLElement | null;
        if (!t || isOwnUi(t)) {
          setHoverRect(null);
          return;
        }
        setHoverRect(t.getBoundingClientRect());
      });
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(false);
    };
    window.addEventListener("mousemove", onMove, true);
    window.addEventListener("keydown", onKey, true);
    document.body.style.cursor = "crosshair";
    return () => {
      window.removeEventListener("mousemove", onMove, true);
      window.removeEventListener("keydown", onKey, true);
      document.body.style.cursor = "";
    };
  }, [active, isOwnUi]);

  // Capture clicks to select (without triggering page navigation).
  useEffect(() => {
    if (!active) return;
    const onClick = (e: MouseEvent) => {
      if (isOwnUi(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
      const t = e.target as HTMLElement | null;
      if (!t) return;
      setSelected(t);
      setSelKey((k) => k + 1);
      setActive(false);
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [active, isOwnUi]);

  // Toggle inspect mode with "i".
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "i" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        setActive((a) => !a);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!IS_DEV) return null;

  return (
    <>
      {selected && <ElementControls key={selKey} el={selected} kind={getKind(selected)} />}

      {/* Hover highlight */}
      {active && hoverRect && (
        <div
          style={{
            position: "fixed",
            left: hoverRect.left,
            top: hoverRect.top,
            width: hoverRect.width,
            height: hoverRect.height,
            border: "1.5px solid #7c5cff",
            background: "rgba(124,92,255,0.08)",
            borderRadius: 4,
            pointerEvents: "none",
            zIndex: 2147483646,
            transition: "all 0.06s ease",
          }}
        />
      )}

      {/* Inspect toggle + status */}
      <div
        id="dial-inspect-ui"
        style={{
          position: "fixed",
          bottom: 16,
          left: 16,
          zIndex: 2147483647,
          display: "flex",
          gap: 8,
          alignItems: "center",
          fontFamily: "ui-monospace, monospace",
          fontSize: 12,
        }}
      >
        <button
          onClick={() => setActive((a) => !a)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            height: 30,
            padding: "0 12px",
            borderRadius: 8,
            border: "1px solid rgba(0,0,0,0.12)",
            background: active ? "#7c5cff" : "rgba(255,255,255,0.92)",
            color: active ? "#fff" : "#333",
            backdropFilter: "blur(12px)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
            cursor: "pointer",
            transition: "background 0.15s ease, color 0.15s ease",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: 999,
              background: active ? "#fff" : "#7c5cff",
            }}
          />
          {active ? "Click an element… (esc)" : "Inspect (i)"}
        </button>
        {selected && (
          <button
            onClick={() => setSelected(null)}
            style={{
              height: 30,
              padding: "0 10px",
              borderRadius: 8,
              border: "1px solid rgba(0,0,0,0.12)",
              background: "rgba(255,255,255,0.92)",
              color: "#666",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        )}
        {selected && (
          <span style={{ color: "#999", paddingLeft: 2, whiteSpace: "nowrap" }}>
            ⌘Z undo · ⌘⇧Z redo
          </span>
        )}
      </div>
    </>
  );
}
