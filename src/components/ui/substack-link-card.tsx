"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SubstackLinkCardProps {
  title: string;
  articleTitle: string;
  href: string;
  className?: string;
}

/**
 * A single pill button linking to a Substack article
 */
export const SubstackLinkCard = ({
  title,
  articleTitle,
  href,
  className,
}: SubstackLinkCardProps) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={itemVariants}
      className={cn(
        "w-full max-w-md rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm",
        className
      )}
    >
      {/* Card Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View article"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/50 text-muted-foreground transition-colors hover:bg-muted"
        >
          <ArrowUpRight className="h-5 w-5" />
        </a>
      </div>

      {/* Pill Button */}
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        variants={itemVariants}
        className="group flex items-center gap-3 rounded-full border border-border bg-transparent p-3 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-accent hover:shadow-md"
      >
        {/* Substack Logo */}
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-orange-50">
          <svg
            className="h-5 w-5 text-orange-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
          </svg>
        </div>
        {/* Article Title */}
        <p className="font-medium text-gray-900 group-hover:text-gray-700">
          {articleTitle}
        </p>
      </motion.a>
    </motion.section>
  );
};

export default SubstackLinkCard;
