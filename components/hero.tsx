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

const statsData = [
  {
    number: "50K",
    label: "Active Jobs",
    icon: (
      <svg
        className="h-6 w-6 text-white/90"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M16 20H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <circle cx="17.5" cy="16.5" r="3.5" />
        <path d="M20 19l2.5 2.5" />
      </svg>
    ),
  },
  {
    number: "12K",
    label: "Companies",
    icon: (
      <svg
        className="h-6 w-6 text-white/90"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="10" width="5" height="11" rx="1" />
        <rect x="9.5" y="4" width="5" height="17" rx="1" />
        <rect x="16" y="13" width="5" height="8" rx="1" />
      </svg>
    ),
  },
  {
    number: "2M",
    label: "Job Seekers",
    icon: (
      <svg
        className="h-6 w-6 text-white/90"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9.5" />
        <circle cx="12" cy="9.5" r="2.5" />
        <path d="M7.5 16.5c0-2.2 2-3.5 4.5-3.5s4.5 1.3 4.5 3.5" />
        <path d="M16 16l3 3" />
      </svg>
    ),
  },
  {
    number: "97%",
    label: "Satisfication Rate",
    icon: (
      <svg
        className="h-6 w-6 text-white/90"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
]

export function Hero() {
  const [jobQuery, setJobQuery] = React.useState("")
  const [locationQuery, setLocationQuery] = React.useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const handleTrendingClick = (position: string) => {
    setJobQuery(position)
  }

  return (
    <section className="relative pt-12 pb-24 sm:pt-20 sm:pb-32 lg:pt-24 lg:pb-36">
      {/* ─── Background Layers (matching Figma Group 1) ─── */}
      {/* 
        The globe.png is 1440×1882 with:
        - Transparent top ~50px with faint purple/magenta aura baked in at very top rows
        - Mostly transparent from ~50px to ~750px (star field area in Figma, but transparent in the exported PNG)
        - Globe sphere starts emerging around y=750, becomes fully opaque by y=1100
        - Bright blue-purple horizon rim around y=1000-1050
        - Dark sphere body from y=1050 to bottom
        
        The background container is absolutely positioned and stretches the full height
        of the section. The image is placed so its bright horizon rim aligns with 
        the "Assisting over 15,000..." text area.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Layer 1: Top atmospheric magenta/purple aura (Figma "Exclude" at 50% opacity) */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: "-200px",
            width: "1200px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(220, 2, 206, 0.35) 0%, rgba(92, 83, 254, 0.18) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Layer 2: Globe image centered, positioned so the sphere horizon aligns with content */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            /*
              Globe image is 1440×1882. On a 1440px-wide viewport the image is ~1882px tall.
              The bright horizon rim is at roughly y=1000 in the image (53% from top).
              
              The hero upper content (badge→trending) occupies roughly 0→520px of the section.
              The "Assisting..." heading is at roughly 520+256=776px from top of section.
              
              We want image-y=1000 to align with section-y≈750.
              So image top = 750 - 1000 = -250px from top of section.
              
              We use top: -250px to push the image up so the sphere appears at the right spot.
            */
            top: "-250px",
            width: "1440px",
            height: "1882px",
          }}
        >
          <Image
            src={globeImage}
            alt=""
            priority
            quality={100}
            fill
            sizes="1440px"
            className="object-contain"
          />
        </div>

        {/* Layer 3: Purple glow behind globe horizon (Figma gradient ellipses) */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: "380px",
            width: "900px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(92, 83, 254, 0.5) 0%, rgba(92, 83, 254, 0.15) 45%, transparent 75%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* ─── Content ─── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-col items-center px-4 sm:px-6 lg:px-8">
        {/* Top Announcement Badge */}
        <div className="flex items-center gap-3 sm:gap-4">
          <span
            aria-hidden="true"
            className="hidden h-px w-10 bg-gradient-to-r from-transparent to-white/30 sm:block sm:w-16"
          />
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-[#121216]/80 px-4 py-2 shadow-[0_0_24px_rgba(154,54,168,0.25)] backdrop-blur-md sm:px-6 sm:py-2.5">
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
          <div className="flex flex-col gap-3 rounded-2xl border border-white/20 bg-[#101010]/90 p-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:flex-row sm:items-center sm:gap-0 sm:py-2 sm:pr-2.5 sm:pl-5">
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

        {/* 
          Lower Section: Assisting Heading + 4 Stat Cards
          Spacing tuned so the "Assisting..." text sits on the bright horizon rim of the globe.
        */}
        <div className="mt-44 flex w-full flex-col items-center sm:mt-56 lg:mt-64">
          {/* Heading across the Globe */}
          <h2 className="font-manrope max-w-[620px] text-center text-2xl font-medium tracking-tight text-white/90 sm:text-3xl lg:text-[40px] lg:leading-[1.25]">
            Assisting over 15,000 job seekers find their dream positions.
          </h2>

          {/* 4 Stat Cards */}
          <div className="mt-12 grid w-full grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {statsData.map((stat) => (
              <div
                key={stat.label}
                className="group relative flex min-h-[220px] flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-[#111115]/95 via-[#0b0b0e]/95 to-[#050507]/98 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)] lg:h-[254px] lg:p-7"
              >
                {/* Top Icon */}
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-white/90">
                  {stat.icon}
                </div>

                {/* Bottom Numbers & Label */}
                <div className="mt-8 flex flex-col">
                  <span className="font-manrope text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[56px] lg:leading-none">
                    {stat.number}
                  </span>
                  <span className="font-manrope mt-2.5 text-sm font-normal text-white/70 sm:text-base lg:text-[18px]">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
