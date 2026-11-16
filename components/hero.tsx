"use client"

import * as React from "react"
import Image from "next/image"
import { Flame, MapPin, Search } from "lucide-react"

import globeImage from "@/app/images/globe.png"

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

export function Hero() {
  const [jobQuery, setJobQuery] = React.useState("")
  const [locationQuery, setLocationQuery] = React.useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Perform search action or navigation
  }

  const handleTrendingClick = (position: string) => {
    setJobQuery(position)
  }

  return (
    <section className="relative overflow-hidden pt-12 pb-24 sm:pt-20 sm:pb-32 lg:pt-28 lg:pb-44">
      {/* Atmospheric Globe Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-20 -z-10 flex justify-center overflow-hidden lg:-top-32"
      >
        <div className="relative h-[850px] w-full max-w-[1440px] shrink-0 sm:h-[1050px] lg:h-[1200px]">
          <Image
            src={globeImage}
            alt=""
            priority
            quality={95}
            className="h-full w-full object-cover object-top opacity-90 mix-blend-screen select-none"
          />
          {/* Subtle radial overlay gradient for smooth integration */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-[1320px] flex-col items-center px-4 sm:px-6 lg:px-8">
        {/* Top Announcement Badge */}
        <div className="flex items-center gap-3 sm:gap-4">
          <span
            aria-hidden="true"
            className="hidden h-px w-10 bg-gradient-to-r from-transparent to-white/30 sm:block sm:w-16"
          />
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-card/60 px-4 py-2 shadow-[0_0_24px_rgba(154,54,168,0.25)] backdrop-blur-md sm:px-6 sm:py-2.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 text-white shadow-sm">
              <Flame className="h-3.5 w-3.5 fill-current" />
            </span>
            <span className="font-space-mono text-xs tracking-tight text-white/95 sm:text-sm md:text-base">
              50,000+ new jobs this month
            </span>
          </div>
          <span
            aria-hidden="true"
            className="hidden h-px w-10 bg-gradient-to-l from-transparent to-white/30 sm:block sm:w-16"
          />
        </div>

        {/* Title & Description */}
        <div className="mt-8 flex flex-col items-center text-center sm:mt-10">
          <h1 className="font-manrope text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-[56px] lg:leading-[1.14]">
            Find Your Dream Job Today
          </h1>
          <p className="font-manrope mt-5 max-w-[784px] text-base leading-relaxed text-white/70 sm:text-lg lg:text-xl">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role &mdash;
            faster.
          </p>
        </div>

        {/* Dual Search Input Bar */}
        <form
          onSubmit={handleSearch}
          className="mt-10 w-full max-w-[784px] sm:mt-12"
          role="search"
          aria-label="Job search"
        >
          <div className="flex flex-col gap-3 rounded-2xl border border-white/20 bg-[#101010]/85 p-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:flex-row sm:items-center sm:gap-0 sm:py-2 sm:pr-2.5 sm:pl-5">
            {/* Field 1: Job title / skill */}
            <div className="flex flex-1 items-center gap-3 px-2 py-1.5 sm:px-0 sm:py-0">
              <Search className="h-5 w-5 shrink-0 text-white/50" />
              <input
                type="text"
                value={jobQuery}
                onChange={(e) => setJobQuery(e.target.value)}
                placeholder="Job title, skill or company"
                aria-label="Job title, skill or company"
                className="w-full bg-transparent font-sans text-sm text-white placeholder:text-white/40 focus:outline-none sm:text-base"
              />
            </div>

            {/* Divider */}
            <span
              aria-hidden="true"
              className="hidden h-7 w-px bg-white/20 sm:mx-3 sm:block"
            />

            {/* Field 2: Location */}
            <div className="flex flex-1 items-center gap-3 border-t border-white/10 px-2 pt-2.5 pb-1.5 sm:border-t-0 sm:px-0 sm:pt-0 sm:pb-0">
              <MapPin className="h-5 w-5 shrink-0 text-white/50" />
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                placeholder="Location or Remote"
                aria-label="Location or Remote"
                className="w-full bg-transparent font-sans text-sm text-white placeholder:text-white/40 focus:outline-none sm:text-base"
              />
            </div>

            {/* Search Submit Button */}
            <button
              type="submit"
              aria-label="Search jobs"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand font-medium text-white shadow-[0_0_20px_rgba(92,83,254,0.35)] transition-all hover:bg-brand/90 hover:shadow-[0_0_28px_rgba(92,83,254,0.5)] active:scale-[0.98] sm:h-12 sm:w-12 sm:shrink-0 sm:p-0"
            >
              <Search className="h-5 w-5" />
              <span className="sm:hidden text-sm font-semibold">Search Jobs</span>
            </button>
          </div>
        </form>

        {/* Trending Positions */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:mt-8 sm:gap-3">
          <span className="font-manrope text-xs font-medium text-white/70 sm:text-sm">
            Trending Position
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {trendingPositions.map((position) => (
              <button
                key={position}
                type="button"
                onClick={() => handleTrendingClick(position)}
                className="font-manrope rounded-lg border border-white/10 bg-[#1a1a1b]/90 px-3 py-1.5 text-xs text-white/90 shadow-sm transition-colors hover:border-white/25 hover:bg-[#232326] active:scale-95 sm:rounded-full sm:text-sm"
              >
                {position}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
