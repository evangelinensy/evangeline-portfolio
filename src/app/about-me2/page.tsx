"use client";

import { ScrollTriggered } from "@/components/ui/stack-card";
import SplitText from "@/components/ui/split-text";
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel";
import { Testimonial } from "@/components/ui/testimonial-card";
import {
  MouseTrackerProvider as CursorProvider,
  Pointer as Cursor,
  PointerFollower as CursorFollow
} from "@/components/ui/cursor";
import { MousePointer2 } from "lucide-react";

export default function AboutMe2Page() {
  return (
    <CursorProvider>
      <div className="min-h-screen bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="mb-16 text-center">
              <div style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 400 }}>
                <SplitText
                  text="Hello, I'm Evangeline Ng"
                  className="mb-4 text-2xl md:text-3xl"
                  delay={30}
                  duration={0.3}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0}
                  rootMargin="0px"
                  textAlign="center"
                />
              </div>
              <p
                className="text-base text-muted-foreground mt-4"
                style={{ fontFamily: 'Sequel Sans Book Body, Sequel Sans, sans-serif' }}
              >
                Staff Product Designer tinkering with<br />design engineering in SF Bay Area.
              </p>
            </div>

            {/* ScrollTriggered Stack Cards Component */}
            <ScrollTriggered />

            {/* 3D Carousel Component with spacing */}
            <div className="mt-32 mb-16">
              <div style={{ textAlign: "center", marginBottom: "5px" }}>
                <h2 style={{ fontSize: "24px", fontWeight: 400, fontFamily: "Bricolage Grotesque, sans-serif", color: "#333", margin: 0 }}>My Illustrations</h2>
              </div>
              <ThreeDPhotoCarousel />
            </div>

            {/* Testimonials Section */}
            <div className="mt-48 mb-16">
              <div style={{ textAlign: "center", marginBottom: "5px" }}>
                <h2 style={{ fontSize: "24px", fontWeight: 400, fontFamily: "Bricolage Grotesque, sans-serif", color: "#333", margin: 0 }}>What it&apos;s like working with me</h2>
              </div>
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

      {/* Custom Cursor */}
      <Cursor>
        <MousePointer2 className="fill-white stroke-gray-400" size={24} />
      </Cursor>
      <CursorFollow align="bottom-right" gap={40}>
        <div className="bg-white text-gray-800 border border-gray-200 text-xs px-3 py-1 rounded-md shadow-md">
          Wanderer
        </div>
      </CursorFollow>
    </CursorProvider>
  );
}
