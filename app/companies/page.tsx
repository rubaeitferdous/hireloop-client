"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronRight,
  Globe,
  MapPin,
  Search,
  Sparkles,
  Users,
} from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { mockCompanies, Company } from "@/lib/mock-data"

const industries = [
  "All",
  "AI",
  "Developer Tools",
  "E-Commerce",
  "Media & Entertainment",
  "Fintech",
  "Autonomous Tech",
  "Productivity",
]

export default function CompaniesDirectoryPage() {
  const [selectedIndustry, setSelectedIndustry] = React.useState("All")
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredCompanies = React.useMemo(() => {
    return mockCompanies.filter((company) => {
      // Industry filter
      if (selectedIndustry !== "All" && company.industry !== selectedIndustry) {
        return false
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchName = company.name.toLowerCase().includes(q)
        const matchDesc = company.description.toLowerCase().includes(q)
        const matchLoc = company.location.toLowerCase().includes(q)
        const matchTag = company.tags.some((t) => t.toLowerCase().includes(q))
        if (!matchName && !matchDesc && !matchLoc && !matchTag) return false
      }

      return true
    })
  }, [selectedIndustry, searchQuery])

  return (
    <div className="min-h-screen bg-[#010103] text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Hero Section */}
        <section className="relative border-b border-white/10 bg-gradient-to-b from-[#09090f] to-[#010103] pt-14 pb-16">
          <div className="mx-auto max-w-[1320px] px-4 text-center sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold text-brand-light">
              <Building2 className="h-3.5 w-3.5" />
              <span>VERIFIED EMPLOYER NETWORK</span>
            </div>

            <h1 className="font-manrope mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Explore Top Tech Companies
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-base text-white/70">
              Browse world-class organizations, discover their engineering cultures and tech stacks, and find your ideal workplace.
            </p>

            {/* Search Input Bar */}
            <div className="mx-auto mt-8 max-w-xl">
              <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-[#121217]/90 px-4 py-3 shadow-xl backdrop-blur-xl">
                <Search className="h-5 w-5 text-white/40 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by company name, location, or tech..."
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-xs text-white/40 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Industry Filter Tabs */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {industries.map((ind) => (
                <button
                  key={ind}
                  type="button"
                  onClick={() => setSelectedIndustry(ind)}
                  className={`rounded-xl px-4 py-2 text-xs font-medium transition-all sm:text-sm ${
                    selectedIndustry === ind
                      ? "bg-brand text-white shadow-[0_0_16px_rgba(92,83,254,0.4)]"
                      : "border border-white/10 bg-[#101015] text-white/70 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Company Card Grid */}
        <div className="mx-auto max-w-[1320px] px-4 pt-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-sm text-white/70">
              Showing <span className="font-semibold text-white">{filteredCompanies.length}</span> verified organizations
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCompanies.map((company) => (
              <div
                key={company.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-[#111116]/95 via-[#0c0c10]/95 to-[#070709]/98 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-brand/40 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(92,83,254,0.12)]"
              >
                <div>
                  {/* Top Bar: Logo, Name & Verified Badge */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#16161c] p-2.5 shadow-inner transition-transform group-hover:scale-105">
                        <Image
                          src={company.logo}
                          alt={company.name}
                          width={44}
                          height={44}
                          className="max-h-8 w-auto object-contain brightness-125"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-manrope text-base font-bold text-white group-hover:text-brand-light transition-colors">
                            {company.name}
                          </h3>
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        </div>
                        <span className="font-space-mono text-xs text-white/50">
                          {company.industry}
                        </span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-0.5 text-[11px] font-semibold text-brand-light">
                      <Briefcase className="h-3 w-3" />
                      {company.openJobsCount} jobs
                    </span>
                  </div>

                  {/* Company Description */}
                  <p className="mt-4 text-xs leading-relaxed text-white/65 line-clamp-3">
                    {company.description}
                  </p>

                  {/* Meta Specs */}
                  <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs text-white/70">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-white/40 shrink-0" />
                      <span className="truncate">{company.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-white/40 shrink-0" />
                      <span>{company.employeeCount}</span>
                    </div>
                  </div>

                  {/* Tag Chips */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {company.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-6 border-t border-white/10 pt-4">
                  <Link
                    href={`/companies/${company.id}`}
                    className="flex w-full items-center justify-between rounded-xl bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-brand hover:shadow-md"
                  >
                    <span>View Company Profile</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
