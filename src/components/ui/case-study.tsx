import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type CaseStudyEntry = {
  phase: string;
  date: string;
  title: string;
  description: string;
  items?: string[];
  image?: string;
  button?: {
    url: string;
    text: string;
  };
};

export interface CaseStudyProps {
  title?: string;
  description?: string;
  entries?: CaseStudyEntry[];
  className?: string;
}

export const defaultCaseStudyEntries: CaseStudyEntry[] = [
  {
    phase: "Research & Discovery",
    date: "January 2024",
    title: "User Research & Problem Definition",
    description:
      "Conducted comprehensive user research to understand the core problems and pain points that users face in their daily workflow.",
    items: [
      "User interviews with 15 target users",
      "Competitive analysis of existing solutions",
      "User journey mapping and persona development",
      "Problem statement refinement",
      "Stakeholder alignment and requirements gathering",
    ],
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    button: {
      url: "#research",
      text: "View Research",
    },
  },
  {
    phase: "Design & Prototyping",
    date: "February 2024",
    title: "Design System & Wireframes",
    description:
      "Developed a comprehensive design system and created wireframes to establish the foundation for the user interface.",
    items: [
      "Design system creation with component library",
      "Low-fidelity wireframes for all key flows",
      "User flow diagrams and information architecture",
      "Interactive prototypes for user testing",
      "Design token system for consistency",
    ],
  },
  {
    phase: "Testing & Iteration",
    date: "March 2024",
    title: "User Testing & Design Refinement",
    description:
      "Conducted multiple rounds of user testing to validate design decisions and iterate based on user feedback.",
    items: [
      "Usability testing with 8 participants",
      "A/B testing for key interaction patterns",
      "Accessibility audit and improvements",
      "Performance optimization and technical feasibility",
      "Final design refinements based on feedback",
    ],
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    phase: "Implementation & Launch",
    date: "April 2024",
    title: "Final Implementation & Launch",
    description:
      "Collaborated with development team to implement the final design and launched the product to users.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    button: {
      url: "#final",
      text: "View Final Design",
    },
  },
];

export const CaseStudy = ({
  title = "Case Study",
  description = "A detailed look at the design process and outcomes.",
  entries = defaultCaseStudyEntries,
}: CaseStudyProps) => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mb-6 text-base text-muted-foreground md:text-lg">
            {description}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-3xl space-y-16 md:mt-24 md:space-y-24">
          {entries.map((entry, index) => (
            <div
              key={index}
              className="relative flex flex-col gap-4 md:flex-row md:gap-16"
            >
              <div className="top-8 flex h-min w-64 shrink-0 items-center gap-4 md:sticky">
                <Badge variant="secondary" className="text-xs">
                  {entry.phase}
                </Badge>
                <span className="text-xs font-medium text-muted-foreground">
                  {entry.date}
                </span>
              </div>
              <div className="flex flex-col">
                <h2 className="mb-3 text-lg leading-tight font-bold text-foreground/90 md:text-2xl">
                  {entry.title}
                </h2>
                <p className="text-sm text-muted-foreground md:text-base">
                  {entry.description}
                </p>
                {entry.items && entry.items.length > 0 && (
                  <ul className="mt-4 ml-4 space-y-1.5 text-sm text-muted-foreground md:text-base">
                    {entry.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="list-disc">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {entry.image && (
                  <div className="mt-8 relative w-full h-64">
                    <Image
                      src={entry.image}
                      alt={`${entry.phase} visual`}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}
                {entry.button && (
                  <Button variant="link" className="mt-4 self-end" asChild>
                    <a href={entry.button.url} target="_blank">
                      {entry.button.text} <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 