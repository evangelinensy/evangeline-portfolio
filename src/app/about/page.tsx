import { PixelImage } from "@/components/ui/pixel-image";
import SplitText from "@/components/ui/split-text";
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel";
import { Testimonial } from "@/components/ui/testimonial-card";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-16 text-center">
          </div>

          {/* Pixel Image Component */}
          <div className="mb-16 flex justify-center">
            <div className="rounded-[2.5rem] overflow-hidden">
              <PixelImage
                src="/images/profilepic.png"
                grid="6x4"
                grayscaleAnimation={true}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col items-center">
            {/* Centered Content with 500px max width */}
            <div className="max-w-[500px] text-left">
              <div>
                <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 400 }}>
                  <SplitText
                    text="Hello, I'm Evangeline Ng"
                    className="mb-4 text-2xl md:text-3xl"
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
                </div>
                <p className="mb-6 text-sm text-muted-foreground md:text-base text-left" style={{ fontFamily: 'Sequel Sans Book Body, Sequel Sans, sans-serif' }}>
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

          {/* Testimonials Section */}
          <div className="mt-48 mb-16">
            <h2 className="mb-8 text-xl md:text-2xl font-normal text-center">What it&apos;s like working with me</h2>
            <div className="flex flex-col gap-6">
              <Testimonial
                name="Kelly Huang"
                role="Product Design"
                company="Netflix"
                image="/images/testimonials/kellyhuangprofile.jpeg"
                testimonial="Evangeline is a talented designer with skills the reach beyond just design as she is always looking for ways to push the boundaries of how we can make our product better. She is respectful and able to communicate her ideas and contribute to the cross-functional teams. Evangeline never limits her job responsibilities in product design, and always looking for a way to help our company.

I have worked with Evangeline since her internship with us. By the end of internship, we had to hire her as full time just because she is amazing."
                className="w-full"
              />
              <Testimonial
                name="Angelica Pando"
                role="Engineering Manager"
                company="Turo"
                image="/images/testimonials/angelicapandoprofile.jpeg"
                testimonial="I had the pleasure of collaborating with Evangeline at Pomelo on the customer notifications project, where she served as the product designer. Evangeline's meticulous management of project requirements and delivery of exceptional designs were key to the project's success - she carefully tracked and organized items pending and in progress in a project with many variables. She always went the extra mile beyond her core responsibilities, owning a project that involved both frontend and backend engineering, design, copy, and customer support. Working with her was enjoyable, and her contributions were key to the success of the projects where we worked together at Pomelo. I would definitely love to work with her again!"
                className="w-full"
              />
              <Testimonial
                name="Stefan Suarez"
                role="Head of Growth"
                company="Kin"
                image="/images/testimonials/stefanprofile.jpeg"
                testimonial="Evangeline is one of the best product designers I've worked with. Super customer-centric, seeks to truly understand the POV of the customer. She's also very professional: detail-oriented, structured thinker, crisp communicator -- all valuable for a role that is as cross functional as hers. Lastly, I simply love her aesthetic. She just has great taste! Keeps a close eye on trends, has her own original take on things, doesn't just copy. Balances aesthetic with function. Evangeline is the kind of person I'd hire again and again if I could. Talented, hardworking, has great character and attitude. Just a gem."
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 