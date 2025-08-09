import { Hero } from "@/components/hero"
import { PhotoGallery } from "@/components/ui/gallery"

export default function Home() {
  return (
    <div className="min-h-screen pt-[20px] sm:pt-[30px] md:pt-[50px] px-[20px] sm:px-[30px] md:px-[50px] bg-white">
      <Hero />
      <PhotoGallery />
    </div>
  );
}
