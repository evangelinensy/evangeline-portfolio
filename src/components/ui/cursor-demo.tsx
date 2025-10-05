import {
  MouseTrackerProvider as CursorProvider,
  Pointer as Cursor,
  PointerFollower as CursorFollow,
} from "@/components/ui/cursor";

import Link from "next/link";
import { MousePointer2 } from "lucide-react";
import { Star } from "lucide-react";

const CursorDemo = () => {
  return (
    <div className="max-w-sm rounded-2xl bg-secondary/50 border border-primary/10 shadow-md overflow-hidden relative group">
      <div className="p-6 flex flex-col gap-8">
        <p className="text-4xl font-bold tracking-tight">
          Ready to build something amazing?
        </p>
        <p className="text-primary/70 text-lg max-w-2xl">
          Join thousands of developers who are already using HextaUI to create
          stunning websites with less effort. Start building today!
        </p>
        <div className="flex items-center flex-wrap justify-center gap-4">
          <Link
            href="/docs/get-started"
            className="cursor-none px-6 bg-primary text-primary-foreground py-3 rounded-full border text-sm font-medium flex items-center justify-center gap-2 text-center max-md:grow shadow-inner shadow-black/10 "
          >
            Get Started
          </Link>
          <Link
            href="https://github.com/sponsors/preetsuthar17"
            target="_blank"
            className="cursor-none px-6 bg-linear-to-b hover:bg-primary/10 transition-all py-3 rounded-full border text-sm font-medium flex items-center justify-center gap-2 text-center max-md:grow shadow-inner shadow-black/10  hover:fill-yellow-300"
          >
            <Star size={15} fill="yellow" /> Sponsor HextaUI
          </Link>
        </div>
      </div>

      <CursorProvider>
        <Cursor>
          <MousePointer2 className="fill-blue-500 stroke-white/10" size={30} />
        </Cursor>
        <CursorFollow align="bottom-right">
          <div className="bg-blue-500 text-white border border-white/10 text-xs px-3 py-1 rounded-md shadow-md">
            HextaStudio
          </div>
        </CursorFollow>
      </CursorProvider>
    </div>
  );
};

export { CursorDemo };









