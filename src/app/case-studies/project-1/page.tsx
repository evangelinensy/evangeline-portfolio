import { CaseStudy } from "@/components/ui/case-study";

export default function Project1CaseStudy() {
  return (
    <div className="min-h-screen bg-background">
      <CaseStudy
        title="E-Commerce Platform Redesign"
        description="A comprehensive redesign of an e-commerce platform focused on improving user experience and increasing conversion rates."
        entries={[
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
        ]}
      />
    </div>
  );
} 