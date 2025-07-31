import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Component as ImageZoomComponent } from "@/components/ui/image-zoom";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-16 text-center">
          </div>

          {/* Image Zoom Component */}
          <div className="mb-16 flex justify-center">
            <ImageZoomComponent />
          </div>

          {/* Main Content */}
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            {/* Left Column - Content */}
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                  Hello, I&apos;m Evangeline Ng
                </h2>
                <p className="mb-6 text-base text-muted-foreground md:text-lg">
                  I’m a Singaporean-born product designer, based in San Francisco.<br /><br />
                  Over the years, I’ve been delivering impact to early-stage startups by leading the product and improving the businesses through design.<br /><br />
                  Previously at DeForm I helped brands reward their community and go onchain at DeForm as their Founding Product Designer.<br /><br />
                  At Pomelo, I worked on helping immigrants like myself to remit money fee-free, on credit, as their Second Product Designer.<br /><br />
                  I helped clinicians work efficiently at a Medtech Startup called See-mode. I was their first design hire and built the design foundations of their ultrasound web application.<br /><br />
                  I occasionally write and illustrate. Outside of work, going for my daily jogs and painting keeps me grounded.
                </p>
              </div>

              {/* Skills */}
              <div>
                <h3 className="mb-4 text-xl font-semibold">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">User Research</Badge>
                  <Badge variant="secondary">UI/UX Design</Badge>
                  <Badge variant="secondary">Prototyping</Badge>
                  <Badge variant="secondary">Design Systems</Badge>
                  <Badge variant="secondary">Figma</Badge>
                  <Badge variant="secondary">Sketch</Badge>
                  <Badge variant="secondary">Adobe Creative Suite</Badge>
                  <Badge variant="secondary">User Testing</Badge>
                </div>
              </div>

              {/* Experience */}
              <div>
                <h3 className="mb-4 text-xl font-semibold">Experience</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">Senior Product Designer</h4>
                    <p className="text-sm text-muted-foreground">2022 - Present</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Leading design initiatives for digital products, focusing on user experience and interface design.
                    </p>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold">UX Designer</h4>
                    <p className="text-sm text-muted-foreground">2020 - 2022</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Designed user experiences for web and mobile applications, conducting user research and usability testing.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild>
                  <Link href="/case-studies">
                    View My Work
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="mailto:hello@eggsvans.com">
                    Get in Touch
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Column - Additional Info */}
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h3 className="mb-4 text-xl font-semibold">Design Philosophy</h3>
                <p className="text-base text-muted-foreground md:text-lg">
                  I believe that great design is invisible. It should feel intuitive, solve real problems, and create meaningful connections between users and products.
                </p>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-semibold">What I Do</h3>
                <ul className="space-y-2 text-base text-muted-foreground md:text-lg">
                  <li>• User research and usability testing</li>
                  <li>• Wireframing and prototyping</li>
                  <li>• UI/UX design and visual design</li>
                  <li>• Design system creation</li>
                  <li>• User journey mapping</li>
                  <li>• Stakeholder collaboration</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-semibold">Tools I Use</h3>
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <h4 className="font-semibold text-foreground">Design</h4>
                    <p>Figma, Sketch, Adobe Creative Suite</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Prototyping</h4>
                    <p>Framer, Principle, InVision</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Research</h4>
                    <p>UserTesting, Hotjar, Google Analytics</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Collaboration</h4>
                    <p>Notion, Slack, Miro</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 