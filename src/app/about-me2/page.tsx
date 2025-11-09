"use client";

import { ScrollTriggered } from "@/components/ui/stack-card";
import SplitText from "@/components/ui/split-text";
import {
  MouseTrackerProvider as CursorProvider,
  Pointer as Cursor,
  PointerFollower as CursorFollow
} from "@/components/ui/cursor";
import { MousePointer2 } from "lucide-react";

export default function AboutMe2Page() {
  return (
    <CursorProvider>
      <div className="min-h-screen bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="mb-16 text-center">
              <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 400 }}>
                <SplitText
                  text="Hello, I'm Evangeline Ng"
                  className="mb-4 text-2xl md:text-3xl"
                  delay={30}
                  duration={0.3}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0}
                  rootMargin="0px"
                  textAlign="center"
                />
              </div>
              <p
                className="text-base text-muted-foreground mt-4"
                style={{ fontFamily: 'Sequel Sans Book Body, Sequel Sans, sans-serif' }}
              >
                Staff Product Designer tinkering with<br />design engineering in SF Bay Area.
              </p>
            </div>

            {/* ScrollTriggered Stack Cards Component */}
            <ScrollTriggered />
          </div>
        </div>
      </div>

      {/* Custom Cursor */}
      <Cursor>
        <MousePointer2 className="fill-white stroke-gray-400" size={24} />
      </Cursor>
      <CursorFollow align="bottom-right" gap={40}>
        <div className="bg-white text-gray-800 border border-gray-200 text-xs px-3 py-1 rounded-md shadow-md">
          Wanderer
        </div>
      </CursorFollow>
    </CursorProvider>
  );
}
