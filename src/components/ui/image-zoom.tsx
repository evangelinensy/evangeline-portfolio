"use client";
 
import Image from 'next/image'
import { Plus } from 'lucide-react'

import React from "react";
import Zoom from "react-medium-image-zoom"; 
import "react-medium-image-zoom/dist/styles.css";

export const Component = () => {  
  return (
    <div >
       <div className="border-brand/10 relative mx-auto my-6 flex flex-col items-start border p-4 w-full max-w-[250px] aspect-square md:max-w-sm md:aspect-square">
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
                                    alt="Evangeline Ng Profile"
                                    fill
                                    className="rounded-lg object-cover w-full h-full"
                                    style={{ objectPosition: 'center top' }}
                                    sizes="(max-width: 640px) 100vw, 250px"
                                    priority
                                />
                            </div>
                            <div className="relative -mt-14 bg-gradient-to-b from-black/0 to-black text-white md:-mt-24">
                                <h1 className="z-20 items-center text-center text-[40px] font-black tracking-tighter md:text-[70px]">Evangeline Ng</h1>{' '}
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