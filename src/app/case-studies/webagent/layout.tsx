import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Agent - Instant Verdicts | Evangeline Ng",
  description:
    "A lightweight web agent for instant verdicts. A concept for a browser-native agent that gives you a verdict in five seconds without pulling you away from the page.",
};

export default function TestMorphLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Hide the dock navigation on this page */}
      <style>{`
        nav[class*="dock"],
        .navigation-dock,
        footer {
          display: none !important;
        }
      `}</style>
      {children}
    </>
  );
}
