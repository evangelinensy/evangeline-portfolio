"use client";
 
import Image from 'next/image'
import { Plus } from 'lucide-react'

import React from "react";
import Zoom from "react-medium-image-zoom"; 
import "react-medium-image-zoom/dist/styles.css";

export const Component = () => {  
  return (
    <div className="flex justify-center">
       <div className="relative max-w-xs aspect-square md:max-w-sm md:aspect-square bg-[#ECF1F3] rounded-lg shadow-sm">
                        <Plus
                            strokeWidth={0.5}
                            className="text-[#fff200] absolute -left-4 -top-4 h-8 w-8"
                        />
                        <Plus
                            strokeWidth={0.5}
                            className="text-[#fff200] absolute -bottom-4 -left-4 h-8 w-8"
                        />
                        <Plus
                            strokeWidth={0.5}
                            className="text-[#fff200] absolute -right-4 -top-4 h-8 w-8"
                        />
                        <Plus
                            strokeWidth={0.5}
                            className="text-[#fff200] absolute -bottom-4 -right-4 h-8 w-8"
                        />
                        <ImageZoom>
                            <div className="relative w-full h-full aspect-square">
                                <Image
                                    src="/images/profilepic.png"
                                    alt="Evangeline Profile"
                                    fill
                                    className="rounded-lg object-cover"
                                    style={{ objectPosition: 'center top' }}
                                    sizes="(max-width: 640px) 100vw, 250px"
                                    priority
                                />
                            </div>
                        </ImageZoom>
                    </div>
    </div>
  );
};


type ImageZoomProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof Zoom>;

const ImageZoom = (props: ImageZoomProps) => {
  const { children, ...rest } = props;

  return (
    <Zoom zoomMargin={10} {...rest}>
      {children}
    </Zoom>
  );
};

export {ImageZoom}; 