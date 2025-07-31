"use client";

import { Ref, forwardRef, useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { motion, useMotionValue, type Variants } from "framer-motion";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import GalleryPopover from "@/components/ui/gallery-popover";

export const PhotoGallery = ({
  animationDelay = 0.5,
}: {
  animationDelay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // First make the container visible with a fade-in
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay * 1000);

    // Then start the photo animations after a short delay
    const animationTimer = setTimeout(
      () => {
        setIsLoaded(true);
      },
      (animationDelay + 0.4) * 1000
    ); // Add 0.4s for the opacity transition

    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(animationTimer);
    };
  }, [animationDelay]);

  // Animation variants for the container
  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1, // Reduced from 0.3 to 0.1 since we already have the fade-in delay
      },
    },
  };

  // Animation variants for each photo
  const photoVariants: Variants = {
    hidden: () => ({
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      // Keep the same z-index throughout animation
    }),
    visible: (custom: { x: string; y: string; order: number }) => ({
      x: custom.x,
      y: custom.y,
      rotate: 0, // No rotation
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 12,
        mass: 1,
        delay: custom.order * 0.15, // Explicit delay based on order
      },
    }),
  };

  // Photo positions - overlapping layout with increased spacing
  const photos = [
    {
      id: 1,
      order: 0,
      x: { desktop: "-180px", mobile: "-90px" },
      y: { desktop: "22px", mobile: "15px" },
      zIndex: 50, // Highest z-index (on top)
      direction: "left" as Direction,
      src: "/images/pomelo card.png",
      href: "https://www.figma.com/proto/5J0BiJ9DUAak9ADjciKolR/Ng-Evangeline-%7C-Case-Study?page-id=0%3A1&node-id=628-63951&starting-point-node-id=601%3A73257&scaling=scale-down-width&content-scaling=fixed&t=O1FOkD94Iru5awBL-1",
      title: "Pomelo Case Study",
      external: true,
      popoverTitle: "Pomelo Onboarding",
      popoverDescription: "Onboarded 1.5x more users and x3 user activation by providing transparency and clarity.",
    },
    {
      id: 2,
      order: 1,
      x: { desktop: "-90px", mobile: "-45px" },
      y: { desktop: "48px", mobile: "30px" },
      zIndex: 40,
      direction: "left" as Direction,
      src: "https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      href: "/case-studies/project-2",
      title: "Mobile Banking App Design",
      popoverTitle: "Mobile Banking App",
      popoverDescription: "Redesigned mobile banking experience with improved user flows and accessibility.",
    },
    {
      id: 3,
      order: 2,
      x: { desktop: "0px", mobile: "0px" },
      y: { desktop: "12px", mobile: "8px" },
      zIndex: 30,
      direction: "right" as Direction,
      src: "/images/chefclaude.png",
      href: "/case-studies/project-3",
      title: "Learn LLM with a game",
      popoverTitle: "Learn LLM with a game",
      popoverDescription: "Interactive learning experience for Prompt Engineering and AI evaluation.",
    },
    {
      id: 4,
      order: 3,
      x: { desktop: "90px", mobile: "45px" },
      y: { desktop: "33px", mobile: "22px" },
      zIndex: 20,
      direction: "right" as Direction,
      src: "/images/lockerimg.png",
      href: "https://evangeline.typedream.app/__preview__?path=/locker-mobile-app&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVSUQiOiI2NzEzZjhiZS1iNmU3LTRiMDMtYTI5My0wYzA5ZjdkM2FiZmEiLCJlbWFpbCI6ImVnZ3N2YW5zQGdtYWlsLmNvbSIsImlkZW50aWZpZXIiOiJlZ2dzdmFuc0BnbWFpbC5jb20iLCJ0eXBlIjoiYWNjb3VudF9hY2Nlc3NfdG9rZW4iLCJleHAiOjE3NTY1Mjc2MzZ9.90Hyoiw4_4oTg2oGGr-a4MqaqNUuN3gJ2BXXj8n0GCY&theme=light",
      title: "Locker Mobile App",
      external: true,
      popoverTitle: "Locker Mobile App",
      popoverDescription: "Mobile app for parcel returns with intuitive user experience.",
    },
    {
      id: 5,
      order: 4,
      x: { desktop: "180px", mobile: "90px" },
      y: { desktop: "66px", mobile: "38px" },
      zIndex: 10, // Lowest z-index (at bottom)
      direction: "left" as Direction,
      src: "/images/pomelo card.png", // TODO: Replace with love-letter.gif when available
      href: "https://loveletter.lovable.app/",
      title: "Love Letter App",
      external: true,
      popoverTitle: "Love Letter App",
      popoverDescription: "Interactive app for creating and sharing digital love letters.",
    },
  ];

  return (
    <div className="mt-20 md:mt-40 relative">
      <h3 className="z-20 mx-auto max-w-2xl justify-center py-3 text-center text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium text-slate-600 dark:text-slate-400">
        My Work
      </h3>
      <div className="relative mb-8 h-[300px] md:h-[525px] w-full items-center justify-center flex">
        <motion.div
          className="relative mx-auto flex w-full max-w-7xl justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="relative flex w-full justify-center"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <div className="relative h-[180px] w-[180px] md:h-[330px] md:w-[330px]">
              {/* Render photos in reverse order so that higher z-index photos are rendered later in the DOM */}
              {[...photos].reverse().map((photo) => (
                <motion.div
                  key={photo.id}
                  className="absolute left-0 top-0"
                  style={{ zIndex: photo.zIndex }} // Apply z-index directly in style
                  variants={photoVariants}
                  custom={{
                    x: photo.x.desktop, // Use desktop position for now, will be responsive
                    y: photo.y.desktop,
                    order: photo.order,
                  }}
                >
                  <GalleryPopover 
                    title={photo.popoverTitle || photo.title}
                    description={photo.popoverDescription || ""}
                  >
                    {photo.external ? (
                      <a href={photo.href} target="_blank" rel="noopener noreferrer">
                        <Photo
                          width={180}
                          height={180}
                          src={photo.src}
                          alt={`${photo.title} case study`}
                          direction={photo.direction}
                          title={photo.title}
                        />
                      </a>
                    ) : (
                      <Link href={photo.href}>
                        <Photo
                          width={180}
                          height={180}
                          src={photo.src}
                          alt={`${photo.title} case study`}
                          direction={photo.direction}
                          title={photo.title}
                        />
                      </Link>
                    )}
                  </GalleryPopover>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="flex w-full justify-center">
        <Button asChild>
          <Link href="/case-studies">
            View All Stories
          </Link>
        </Button>
      </div>
    </div>
  );
};

function getRandomNumberInRange(min: number, max: number): number {
  if (min >= max) {
    throw new Error("Min value should be less than max value");
  }
  return Math.random() * (max - min) + min;
}

const MotionImage = motion(
  forwardRef(function MotionImage(
    props: ImageProps,
    ref: Ref<HTMLImageElement>
  ) {
    return <Image ref={ref} {...props} alt={props.alt || ""} />;
  })
);

type Direction = "left" | "right";

export const Photo = ({
  src,
  alt,
  className,
  direction,
  width,
  height,
  title,
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  direction?: Direction;
  width: number;
  height: number;
  title?: string;
}) => {
  const [rotation, setRotation] = useState<number>(0);
  const x = useMotionValue(200);
  const y = useMotionValue(200);

  useEffect(() => {
    const randomRotation =
      getRandomNumberInRange(1, 4) * (direction === "left" ? -1 : 1);
    setRotation(randomRotation);
  }, [direction]);

  function handleMouse(event: {
    currentTarget: { getBoundingClientRect: () => DOMRect };
    clientX: number;
    clientY: number;
  }) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  const resetMouse = () => {
    x.set(200);
    y.set(200);
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.2, zIndex: 9999 }}
      whileHover={{
        scale: 1.1,
        rotateZ: 2 * (direction === "left" ? -1 : 1),
        zIndex: 9999,
      }}
      whileDrag={{
        scale: 1.1,
        zIndex: 9999,
      }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        perspective: 400,
        transform: `rotate(0deg) rotateX(0deg) rotateY(0deg)`,
        zIndex: 1,
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        touchAction: "none",
      }}
      className={cn(
        className,
        "relative mx-auto shrink-0 cursor-pointer md:w-[330px] md:h-[330px]"
      )}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      draggable={false}
      tabIndex={0}
    >
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-sm group">
        <MotionImage
          className={cn("rounded-2xl md:rounded-3xl object-cover transition-transform group-hover:scale-105")}
          fill
          src={src}
          alt={alt}
          {...props}
          draggable={false}
        />
        {title && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl md:rounded-3xl flex items-center justify-center">
            <p className="text-white text-xs md:text-sm font-medium text-center px-2 md:px-4">
              {title}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}; 