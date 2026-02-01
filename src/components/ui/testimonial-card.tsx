"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export interface TestimonialProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  role: string
  company?: string
  testimonial: string
  image?: string
}

const Testimonial = React.forwardRef<HTMLDivElement, TestimonialProps>(
  ({ name, role, company, testimonial, image, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-2xl border border-primary/10 bg-white/4 backdrop-blur-md p-6 transition-all hover:shadow-lg dark:hover:shadow-primary/5 md:p-8 min-h-[200px]",
          className
        )}
        {...props}
      >
        <div className="flex flex-col gap-4 justify-between min-h-full">
          <p className="text-pretty text-sm text-muted-foreground leading-relaxed">
            {testimonial}
          </p>
          <div className="flex items-center gap-4 justify-start shrink-0">
            <div className="flex items-center gap-4">
              {image && (
                <Avatar>
                  <AvatarImage src={image} alt={name} height={48} width={48} />
                  <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
              )}
              <div className="flex flex-col">
                <h3 className="font-medium text-foreground">{name}</h3>
                <p className="text-sm text-muted-foreground">
                  {role}
                  {company && ` @ ${company}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

Testimonial.displayName = "Testimonial"

export { Testimonial }

