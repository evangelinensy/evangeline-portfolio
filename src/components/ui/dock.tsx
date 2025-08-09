"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_MAGNIFICATION = 80;
const DEFAULT_DISTANCE = 150;

interface DockContextValue {
  mouseX: MotionValue<number>;
  dockItems: DockItemRef[];
  registerItem: (item: DockItemRef) => void;
  unregisterItem: (item: DockItemRef) => void;
}

const DockContext = React.createContext<DockContextValue | null>(null);

interface DockItemRef {
  id: string;
  element: HTMLElement;
  width: number;
  height: number;
  x: number;
}

export function Dock({
  children,
  className,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  magnification?: number;
  distance?: number;
}) {
  const mouseX = useMotionValue(0);
  const [dockItems, setDockItems] = React.useState<DockItemRef[]>([]);

  const registerItem = React.useCallback((item: DockItemRef) => {
    setDockItems((prev) => [...prev, item]);
  }, []);

  const unregisterItem = React.useCallback((itemId: string) => {
    setDockItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const handleMouseMove = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      mouseX.set(event.clientX - centerX);
    },
    [mouseX]
  );

  const handleMouseLeave = React.useCallback(() => {
    mouseX.set(0);
  }, [mouseX]);

  return (
    <DockContext.Provider
      value={{
        mouseX,
        dockItems,
        registerItem,
        unregisterItem,
      }}
    >
      <div
        className={cn(
          "flex items-end justify-center gap-1 rounded-full bg-gray-100/80 backdrop-blur-sm border border-gray-200/50 p-2",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </div>
    </DockContext.Provider>
  );
}

export function DockItem({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(DockContext);
  const itemRef = React.useRef<HTMLDivElement>(null);
  const itemId = React.useId();

  React.useEffect(() => {
    if (!context || !itemRef.current) return;

    const element = itemRef.current;
    const rect = element.getBoundingClientRect();
    const item: DockItemRef = {
      id: itemId,
      element,
      width: rect.width,
      height: rect.height,
      x: rect.left + rect.width / 2,
    };

    context.registerItem(item);

    return () => {
      context.unregisterItem(itemId);
    };
  }, [context, itemId]);

  if (!context) {
    throw new Error("DockItem must be used within a Dock");
  }

  const { mouseX, dockItems } = context;
  const item = dockItems.find((item) => item.id === itemId);

  const distance = useTransform(
    mouseX,
    (value) => {
      if (!item) return 0;
      const itemCenterX = item.x;
      const mouseDistanceFromItem = Math.abs(value - (itemCenterX - item.x));
      return Math.max(0, 1 - mouseDistanceFromItem / 150);
    },
    [item]
  );

  const scale = useTransform(distance, [0, 1], [1, 1.8]);
  const springScale = useSpring(scale, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={itemRef}
      className={cn(
        "relative flex aspect-square items-center justify-center rounded-full bg-gray-200/80 backdrop-blur-sm border border-gray-300/50 transition-colors hover:bg-gray-300/80",
        className
      )}
      style={{ scale: springScale }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function DockIcon({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex h-6 w-6 items-center justify-center", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function DockLabel({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "absolute -top-12 left-1/2 -translate-x-1/2 rounded-md bg-gray-900/90 px-2 py-1 text-xs text-white backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
} 