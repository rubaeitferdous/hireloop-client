"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Bookmark, Briefcase, ChevronRight, Clock, MapPin, Sparkles } from "lucide-react"

interface JobListing {
  id: string
  title: string
  company: string
  logo: string
  category: string
  type: string
  location: string
  salary: string
  postedAt: string
  isFeatured?: boolean
  tags: string[]
}

const mockFeaturedJobs: JobListing[] = [
  {
    id: "job-1",
    title: "Senior AI & Machine Learning Engineer",
    company: "Meta",
    logo: "/logos/meta.png",
    category: "AI",
    type: "Full-time",
    location: "Menlo Park, CA (Remote)",
    salary: "$185,000 - $240,000",
    postedAt: "2 days ago",
    isFeatured: true,
    tags: ["PyTorch", "LLM Fine-Tuning", "Distributed Systems"],
  },
  {
    id: "job-2",
    title: "Lead Product & Systems Designer",
    company: "Airbnb",
    logo: "/logos/airbnb.png",
    category: "Design",
    type: "Full-time",
    location: "San Francisco, CA (Remote)",
    salary: "$165,000 - $210,000",
    postedAt: "1 day ago",
    isFeatured: true,
    tags: ["Figma", "Design Systems", "Prototyping"],
  },
  {
    id: "job-3",
    title: "Staff Cloud Infrastructure Architect",
    company: "Google",
    logo: "/logos/google.png",
    category: "Engineering",
    type: "Full-time",
    location: "Mountain View, CA (Hybrid)",
    salary: "$200,000 - $265,000",
    postedAt: "3 days ago",
    tags: ["Kubernetes", "GCP", "Terraform"],
  },
  {
    id: "job-4",
    title: "Principal Full Stack Developer",
    company: "Spotify",
    logo: "/logos/spotify.png",
    category: "Engineering",
    type: "Full-time",
    location: "New York, NY (Hybrid)",
    salary: "$150,000 - $195,000",
    postedAt: "Just now",
    isFeatured: true,
    tags: ["React 19", "TypeScript", "Node.js"],
  },
  {
    id: "job-5",
    title: "Senior Product Manager, Growth",
    company: "Netflix",
    logo: "/logos/netflix.png",
    category: "Product",
    type: "Full-time",
    location: "Los Gatos, CA (Remote)",
    salary: "$190,000 - $250,000",
    postedAt: "4 days ago",
    tags: ["A/B Testing", "User Retention", "Data Analytics"],
  },
  {
    id: "job-6",
    title: "Senior UI/UX & Motion Designer",
    company: "Apple",
    logo: "/logos/apple.png",
    category: "Design",
    type: "Full-time",
    location: "Cupertino, CA (On-site)",
    salary: "$160,000 - $205,000",
    postedAt: "5 days ago",
    tags: ["Human Interface", "Motion", "SwiftUI"],
  },
]

const categories = ["All", "Engineering", "Design", "Product", "AI"]

export function FeaturedJobs() {
  const [selectedCategory, setSelectedCategory] = React.useState("All")
  const [savedJobs, setSavedJobs] = React.useState<Record<string, boolean>>({})

  const toggleSave = (jobId: string) => {
    setSavedJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }))
  }

  const filteredJobs = selectedCategory === "All"
    ? mockFeaturedJobs
    : mockFeaturedJobs.filter((job) => job.category === selectedCategory)

  return (
    <section className="relative w-full py-20 sm:py-28">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-brand-light">
              <Sparkles className="h-3.5 w-3.5" />
              <span>HAND-PICKED OPPORTUNITIES</span>
            </div>
            <h2 className="font-manrope mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Featured Job Openings
            </h2>
            <p className="mt-3 max-w-xl text-base text-white/70">
              Discover verified high-impact roles from industry leaders and high-growth ventures hiring right now.
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-4 py-2 text-xs font-medium transition-all sm:text-sm ${
                  selectedCategory === cat
                    ? "bg-brand text-white shadow-[0_0_16px_rgba(92,83,254,0.4)]"
                    : "border border-white/10 bg-[#121217] text-white/70 hover:border-white/20 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => {
            const isSaved = !!savedJobs[job.id]

            return (
              <div
                key={job.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-[#121217]/95 via-[#0c0c10]/95 to-[#08080a]/98 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_16px_36px_rgba(92,83,254,0.15)]"
              >
                <div>
                  {/* Top Bar: Company Logo, Name & Bookmark */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#17171d] p-2 shadow-inner">
                        <Image
                          src={job.logo}
                          alt={job.company}
                          width={40}
                          height={40}
                          className="max-h-7 w-auto object-contain brightness-125"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white/95">
                          {job.company}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-white/50">
                          <MapPin className="h-3.5 w-3.5 text-white/40" />
                          <span className="truncate max-w-[150px]">{job.location}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSave(job.id)}
                      aria-label={isSaved ? "Remove from saved jobs" : "Save job"}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                        isSaved
                          ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
                          : "border-white/10 bg-white/[0.03] text-white/40 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  {/* Job Title */}
                  <Link
                    href={`/jobs/${job.id}`}
                    className="mt-5 block font-manrope text-lg font-bold leading-snug text-white transition-colors group-hover:text-brand-light"
                  >
                    {job.title}
                  </Link>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-[#1a1a22] px-2.5 py-1 text-[11px] font-medium text-white/80">
                      <Briefcase className="h-3 w-3 text-brand-light" />
                      {job.type}
                    </span>
                    {job.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/5 bg-white/[0.03] px-2.5 py-1 text-[11px] font-normal text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Bar: Salary, Posted time & Action */}
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <span className="font-space-mono text-sm font-bold text-white">
                      {job.salary}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-white/45">
                      <Clock className="h-3 w-3" />
                      <span>{job.postedAt}</span>
                    </div>
                  </div>

                  <Link
                    href={`/jobs/${job.id}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:bg-brand hover:shadow-[0_0_16px_rgba(92,83,254,0.4)]"
                  >
                    <span>Apply</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA to browse all */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/jobs"
            className="group inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-[#121217] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:border-brand/50 hover:bg-[#1a1a24] hover:shadow-[0_0_24px_rgba(92,83,254,0.25)]"
          >
            <span>Explore All 50,000+ Jobs</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-brand-light" />
          </Link>
        </div>
      </div>
    </section>
  )
}
