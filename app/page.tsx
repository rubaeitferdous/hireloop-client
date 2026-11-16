import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"

export default function Page() {
  return (
    <div className="relative min-h-svh bg-[#010103] text-foreground">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  )
}
