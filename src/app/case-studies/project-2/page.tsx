import { CaseStudy } from "@/components/ui/case-study";

export default function Project2CaseStudy() {
  return (
    <div className="min-h-screen bg-background">
      <CaseStudy
        title="Mobile Banking App Design"
        description="A complete redesign of a mobile banking application focused on improving security, usability, and accessibility."
        entries={[
          {
            phase: "Research & Discovery",
            date: "March 2024",
            title: "Security & User Experience Research",
            description:
              "Conducted extensive research on banking security requirements and user behavior patterns in financial applications.",
            items: [
              "Security audit of existing banking apps",
              "User interviews with 20 banking customers",
              "Accessibility compliance research",
              "Regulatory requirements analysis",
              "Competitive analysis of leading banking apps",
            ],
            image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            button: {
              url: "#research",
              text: "View Research",
            },
          },
          {
            phase: "Design & Prototyping",
            date: "April 2024",
            title: "Security-First Design System",
            description:
              "Developed a comprehensive design system that prioritizes security while maintaining excellent user experience.",
            items: [
              "Security-focused component library",
              "Biometric authentication flows",
              "Fraud detection UI patterns",
              "Accessible design patterns",
              "High-fidelity prototypes for testing",
            ],
          },
          {
            phase: "Testing & Iteration",
            date: "May 2024",
            title: "Security & Usability Testing",
            description:
              "Conducted rigorous testing with focus on security, accessibility, and user experience.",
            items: [
              "Security testing with penetration testers",
              "Accessibility testing with screen readers",
              "Usability testing with diverse user groups",
              "Performance testing under load",
              "Compliance testing for financial regulations",
            ],
            image: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          },
          {
            phase: "Implementation & Launch",
            date: "June 2024",
            title: "Secure Launch & Monitoring",
            description:
              "Successfully launched the secure banking app with continuous monitoring and improvements.",
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