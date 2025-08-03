import { Hero } from "@/components/hero"
import { PhotoGallery } from "@/components/ui/gallery"

export default function Home() {
  return (
    <div className="min-h-screen pt-[50px] px-[50px] bg-white">
      <Hero />
      <PhotoGallery />
    </div>
  );
}
