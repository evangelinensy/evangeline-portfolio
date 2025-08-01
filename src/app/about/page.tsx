import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PixelImage } from "@/components/ui/pixel-image";
import SplitText from "@/components/ui/split-text";
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-16 text-center">
          </div>

          {/* Pixel Image Component */}
          <div className="mb-16 flex justify-center">
            <PixelImage
              src="/images/profilepic.png"
              grid="6x4"
              grayscaleAnimation={true}
            />
          </div>

          {/* Main Content */}
          <div className="flex flex-col items-center">
            {/* Centered Content with 500px max width */}
            <div className="max-w-[500px] text-left">
              <div>
                <SplitText
                  text="Hello, I'm Evangeline Ng"
                  className="mb-4 text-2xl font-bold md:text-3xl"
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="left"
                />
                <p className="mb-6 text-base text-muted-foreground md:text-lg text-left">
                  I&apos;m a Singaporean-born product designer, based in San Francisco. Currently, a Staff UX Designer at{' '}
                  <a 
                    href="https://www.paloaltonetworks.com/network-security/strata-cloud-manager" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 underline"
                  >
                    Palo Alto Networks
                  </a>.<br /><br />
                  Over the years, I&apos;ve been delivering impact to early-stage startups by leading the product and improving the businesses through design.<br /><br />
                  Previously at{' '}
                  <a 
                    href="https://www.megaphone.xyz/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 underline"
                  >
                    Megaphone
                  </a>{' '}
                  I helped brands reward their community and go onchain at Megaphone as their Founding Product Designer.<br /><br />
                  At{' '}
                  <a 
                    href="https://pomelo.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 underline"
                  >
                    Pomelo
                  </a>{' '}
                  I worked on helping immigrants like myself to remit money fee-free, on credit, as their Second Product Designer.<br /><br />
                  I helped clinicians work efficiently at a Medtech Startup called{' '}
                  <a 
                    href="https://www.see-mode.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 underline"
                  >
                    See-mode
                  </a>. I was their first design hire and built the design foundations of their ultrasound web application.<br /><br />
                  I occasionally write and illustrate. Outside of work, going for my daily jogs and painting keeps me grounded.
                </p>
              </div>

              {/* Temporarily hidden - Experience section */}
              {/* <div>
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
              </div> */}

              {/* Temporarily hidden - Action buttons */}
              {/* <div className="flex flex-col gap-4 sm:flex-row">
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
              </div> */}
            </div>
          </div>

          {/* 3D Carousel Component with spacing */}
          <div className="mt-32 mb-16">
            <ThreeDPhotoCarousel />
          </div>
        </div>
      </div>
    </div>
  );
} 