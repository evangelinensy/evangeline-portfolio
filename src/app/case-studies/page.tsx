import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    id: "project-1",
    title: "E-Commerce Platform Redesign",
    description: "A comprehensive redesign of an e-commerce platform focused on improving user experience and increasing conversion rates.",
    phase: "Completed",
    date: "April 2024",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    href: "/case-studies/project-1",
  },
  {
    id: "project-2",
    title: "Mobile Banking App Design",
    description: "A complete redesign of a mobile banking application focused on improving security, usability, and accessibility.",
    phase: "Completed",
    date: "June 2024",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    href: "/case-studies/project-2",
  },
  {
    id: "project-3",
    title: "Healthcare Dashboard",
    description: "A comprehensive healthcare dashboard designed to improve patient care and streamline medical workflows.",
    phase: "In Progress",
    date: "August 2024",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    href: "/case-studies/project-3",
  },
  {
    id: "project-4",
    title: "Educational Platform",
    description: "An innovative educational platform designed to enhance learning experiences and improve student engagement.",
    phase: "Planning",
    date: "October 2024",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    href: "/case-studies/project-4",
  },
  {
    id: "project-5",
    title: "Travel Booking App",
    description: "A modern travel booking application focused on simplifying the travel planning process and improving user experience.",
    phase: "Completed",
    date: "December 2024",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    href: "/case-studies/project-5",
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
            Case Studies
          </h1>
          <p className="mb-12 text-lg text-muted-foreground md:text-xl">
            A collection of my design work and the processes behind them.
          </p>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <Link key={study.id} href={study.href} className="group">
                <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
                  <div className="aspect-video overflow-hidden relative">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge 
                        variant={study.phase === "Completed" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {study.phase}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {study.date}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold group-hover:text-primary transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {study.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button asChild>
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 