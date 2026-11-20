import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { BrandMarquee } from "@/components/brand-marquee"
import { FeaturedJobs } from "@/components/featured-jobs"
import { FeaturesSection } from "@/components/features-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div className="relative min-h-svh bg-[#010103] text-foreground selection:bg-brand selection:text-white">
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <BrandMarquee />
        <FeaturedJobs />
        <FeaturesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
