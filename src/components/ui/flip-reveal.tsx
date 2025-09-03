"use client";

import { ComponentProps, useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Flip from "gsap/Flip";

gsap.registerPlugin(Flip);

type FlipRevealItemProps = {
    flipKey: string;
} & ComponentProps<"div">;

export const FlipRevealItem = ({ flipKey, ...props }: FlipRevealItemProps) => {
    return <div data-flip={flipKey} {...props} />;
};

type FlipRevealProps = {
    keys: string[];
    showClass?: string;
    hideClass?: string;
    duration?: number;
    ease?: string;
    stagger?: number;
} & ComponentProps<"div">;

export const FlipReveal = ({ 
    keys, 
    hideClass = "", 
    showClass = "", 
    duration = 0.3,
    ease = "power2.out",
    stagger = 0.05,
    ...props 
}: FlipRevealProps) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const isShow = (key: string | null) => !!key && (keys.includes("all") || keys.includes(key));

    useGSAP(
        () => {
            if (!wrapperRef.current) return;

            const items = gsap.utils.toArray<HTMLDivElement>("[data-flip]");
            const state = Flip.getState(items, { 
                props: "transform", // Only animate transform for better performance
                simple: true // Use simple mode for better performance
            });

            items.forEach((item) => {
                const key = item.getAttribute("data-flip");
                if (isShow(key)) {
                    item.classList.add(showClass);
                    item.classList.remove(hideClass);
                } else {
                    item.classList.remove(showClass);
                    item.classList.add(hideClass);
                }
            });

            Flip.from(state, {
                duration: duration,
                scale: false, // Disable scale for better performance
                ease: ease,
                stagger: stagger,
                absolute: false, // Disable absolute positioning for better performance
                onEnter: (elements) =>
                    gsap.fromTo(
                        elements,
                        { opacity: 0 },
                        {
                            opacity: 1,
                            duration: duration * 0.8, // Faster enter animation
                            ease: "power2.out"
                        },
                    ),
                onLeave: (elements) => gsap.to(elements, { 
                    opacity: 0, 
                    duration: duration * 0.6, // Faster leave animation
                    ease: "power2.in"
                }),
            });
        },

        { scope: wrapperRef, dependencies: [keys] },
    );

    return <div {...props} ref={wrapperRef} />;
}; 