"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import {
  Bookmark,
  Briefcase,
  ChevronRight,
  Clock,
  DollarSign,
  Filter,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { mockJobs, Job } from "@/lib/mock-data"

const categories = ["All", "AI", "Engineering", "Design", "Product", "Marketing"]
const jobTypes = ["All", "Full-time", "Part-time", "Remote", "Contract", "Internship"]
const salaryRanges = [
  { label: "All Salaries", min: 0 },
  { label: "$100,000+", min: 100000 },
  { label: "$150,000+", min: 150000 },
  { label: "$180,000+", min: 180000 },
  { label: "$200,000+", min: 200000 },
]

function BrowseJobsContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const initialLocation = searchParams.get("location") || ""
  const initialType = searchParams.get("type") || "All"

  const [keyword, setKeyword] = React.useState(initialQuery)
  const [location, setLocation] = React.useState(initialLocation)
  const [selectedCategory, setSelectedCategory] = React.useState("All")
  const [selectedType, setSelectedType] = React.useState(initialType === "remote" ? "Remote" : "All")
  const [selectedSalaryMin, setSelectedSalaryMin] = React.useState(0)
  const [remoteOnly, setRemoteOnly] = React.useState(initialType === "remote")
  const [savedJobs, setSavedJobs] = React.useState<Record<string, boolean>>({})
  const [isMobileFilterOpen, setIsMobileFilterOpen] = React.useState(false)

  // Sync when query params change
  React.useEffect(() => {
    if (initialQuery) setKeyword(initialQuery)
    if (initialLocation) setLocation(initialLocation)
    if (initialType === "remote") {
      setSelectedType("Remote")
      setRemoteOnly(true)
    }
  }, [initialQuery, initialLocation, initialType])

  const toggleSave = (jobId: string) => {
    setSavedJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }))
  }

  const resetFilters = () => {
    setKeyword("")
    setLocation("")
    setSelectedCategory("All")
    setSelectedType("All")
    setSelectedSalaryMin(0)
    setRemoteOnly(false)
  }

  // Filter logic
  const filteredJobs = React.useMemo(() => {
    return mockJobs.filter((job) => {
      // Keyword match
      if (keyword.trim()) {
        const q = keyword.toLowerCase()
        const matchesTitle = job.title.toLowerCase().includes(q)
        const matchesCompany = job.companyName.toLowerCase().includes(q)
        const matchesTags = job.tags.some((tag) => tag.toLowerCase().includes(q))
        if (!matchesTitle && !matchesCompany && !matchesTags) return false
      }

      // Location match
      if (location.trim()) {
        const loc = location.toLowerCase()
        const matchesLoc = job.location.toLowerCase().includes(loc)
        if (!matchesLoc) return false
      }

      // Category match
      if (selectedCategory !== "All" && job.category !== selectedCategory) {
        return false
      }

      // Job Type match
      if (selectedType !== "All") {
        if (selectedType === "Remote") {
          if (!job.isRemote && !job.location.toLowerCase().includes("remote")) return false
        } else if (job.jobType !== selectedType) {
          return false
        }
      }

      // Remote only toggle
      if (remoteOnly && !job.isRemote) {
        return false
      }

      // Salary minimum
      if (selectedSalaryMin > 0 && job.salaryMax < selectedSalaryMin) {
        return false
      }

      return true
    })
  }, [keyword, location, selectedCategory, selectedType, selectedSalaryMin, remoteOnly])

  return (
    <div className="min-h-screen bg-[#010103] text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Top Header / Search Banner */}
        <section className="relative border-b border-white/10 bg-gradient-to-b from-[#09090f] to-[#010103] pt-12 pb-16">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold text-brand-light">
                <Sparkles className="h-3.5 w-3.5" />
                <span>EXPLORE OPPORTUNITIES</span>
              </div>
              <h1 className="font-manrope mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Browse Curated Positions
              </h1>
              <p className="mt-3 text-base text-white/70">
                Discover {mockJobs.length}+ verified tech roles from leading engineering teams and high-growth organizations.
              </p>
            </div>

            {/* Combined Search Inputs */}
            <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/15 bg-[#101015]/95 p-3 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center sm:gap-0 sm:py-2.5 sm:pr-3 sm:pl-5">
              <div className="flex flex-1 items-center gap-3 px-2 py-1.5 sm:px-0">
                <Search className="h-5 w-5 shrink-0 text-white/50" />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Job title, skill, tech stack, or company..."
                  className="w-full bg-transparent font-sans text-sm text-white placeholder:text-white/40 focus:outline-none sm:text-base"
                />
              </div>

              <span aria-hidden="true" className="hidden h-7 w-px bg-white/20 sm:mx-4 sm:block" />

              <div className="flex flex-1 items-center gap-3 border-t border-white/10 px-2 pt-2.5 pb-1.5 sm:border-t-0 sm:px-0 sm:pt-0 sm:pb-0">
                <MapPin className="h-5 w-5 shrink-0 text-white/50" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location, city, or Remote..."
                  className="w-full bg-transparent font-sans text-sm text-white placeholder:text-white/40 focus:outline-none sm:text-base"
                />
              </div>

              {/* Mobile Filter Toggle & Clear */}
              <div className="flex items-center gap-2 sm:hidden pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 py-2.5 text-xs font-semibold text-white"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </button>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="rounded-xl border border-white/10 p-2.5 text-white/60 hover:text-white"
                  title="Reset"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Layout: Filter Sidebar + Job Results */}
        <div className="mx-auto max-w-[1320px] px-4 pt-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Desktop Filter Sidebar */}
            <aside className="hidden lg:block lg:col-span-1 space-y-8">
              <div className="sticky top-6 rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-6 shadow-xl backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2 font-manrope text-base font-bold text-white">
                    <SlidersHorizontal className="h-4 w-4 text-brand-light" />
                    <span>Filter Roles</span>
                  </div>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="flex items-center gap-1 text-xs text-white/50 transition-colors hover:text-brand-light"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Reset</span>
                  </button>
                </div>

                {/* Category Filters */}
                <div className="mt-6">
                  <label className="font-space-mono text-xs font-bold uppercase tracking-wider text-white/70">
                    Category
                  </label>
                  <div className="mt-3 space-y-1.5">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                          selectedCategory === cat
                            ? "bg-brand text-white shadow-sm"
                            : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                        }`}
                      >
                        <span>{cat}</span>
                        {cat === "All" ? (
                          <span className="text-[11px] opacity-75">{mockJobs.length}</span>
                        ) : (
                          <span className="text-[11px] opacity-75">
                            {mockJobs.filter((j) => j.category === cat).length}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Job Type Filters */}
                <div className="mt-6 border-t border-white/10 pt-6">
                  <label className="font-space-mono text-xs font-bold uppercase tracking-wider text-white/70">
                    Employment Type
                  </label>
                  <div className="mt-3 space-y-1.5">
                    {jobTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedType(type)}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                          selectedType === type
                            ? "bg-brand text-white shadow-sm"
                            : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                        }`}
                      >
                        <span>{type}</span>
                        {type === "All" ? (
                          <span className="text-[11px] opacity-75">{mockJobs.length}</span>
                        ) : type === "Remote" ? (
                          <span className="text-[11px] opacity-75">
                            {mockJobs.filter((j) => j.isRemote).length}
                          </span>
                        ) : (
                          <span className="text-[11px] opacity-75">
                            {mockJobs.filter((j) => j.jobType === type).length}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Salary Minimum Filter */}
                <div className="mt-6 border-t border-white/10 pt-6">
                  <label className="font-space-mono text-xs font-bold uppercase tracking-wider text-white/70">
                    Minimum Salary
                  </label>
                  <div className="mt-3 space-y-1.5">
                    {salaryRanges.map((sal) => (
                      <button
                        key={sal.label}
                        type="button"
                        onClick={() => setSelectedSalaryMin(sal.min)}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                          selectedSalaryMin === sal.min
                            ? "bg-brand text-white shadow-sm"
                            : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                        }`}
                      >
                        <span>{sal.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Remote Only Toggle */}
                <div className="mt-6 border-t border-white/10 pt-6">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-medium text-white/80">Remote Opportunities Only</span>
                    <input
                      type="checkbox"
                      checked={remoteOnly}
                      onChange={(e) => setRemoteOnly(e.target.checked)}
                      className="h-4 w-4 rounded border-white/20 bg-[#16161c] text-brand focus:ring-brand"
                    />
                  </label>
                </div>
              </div>
            </aside>

            {/* Mobile Filter Modal Drawer */}
            {isMobileFilterOpen && (
              <div className="fixed inset-0 z-50 flex items-end bg-black/70 backdrop-blur-sm lg:hidden">
                <div className="w-full max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-white/20 bg-[#121217] p-6 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="font-manrope text-lg font-bold text-white">Filter Roles</h3>
                    <button
                      type="button"
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="rounded-lg p-1.5 text-white/60 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Categories */}
                  <div className="mt-6">
                    <h4 className="text-xs font-bold uppercase text-white/70">Category</h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setSelectedCategory(cat)}
                          className={`rounded-xl px-3 py-1.5 text-xs font-medium ${
                            selectedCategory === cat
                              ? "bg-brand text-white"
                              : "border border-white/10 bg-[#17171f] text-white/70"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        resetFilters()
                        setIsMobileFilterOpen(false)
                      }}
                      className="flex-1 rounded-xl border border-white/10 py-3 text-xs font-semibold text-white/80"
                    >
                      Reset All
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="flex-1 rounded-xl bg-brand py-3 text-xs font-semibold text-white shadow-md"
                    >
                      Show Results ({filteredJobs.length})
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Job Listings Column */}
            <div className="lg:col-span-3">
              {/* Results Topbar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <p className="text-sm text-white/70">
                  Showing <span className="font-semibold text-white">{filteredJobs.length}</span> positions available
                </p>

                {/* Active filters pill badge if any */}
                {(keyword || location || selectedCategory !== "All" || selectedType !== "All" || selectedSalaryMin > 0 || remoteOnly) && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="inline-flex items-center gap-1.5 text-xs text-brand-light hover:underline"
                  >
                    <span>Clear all filters</span>
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Jobs List */}
              {filteredJobs.length === 0 ? (
                <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.01] p-12 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                    <Briefcase className="h-6 w-6 text-white/40" />
                  </div>
                  <h3 className="mt-4 font-manrope text-lg font-bold text-white">No positions matched your search</h3>
                  <p className="mt-2 max-w-sm text-sm text-white/60">
                    Try adjusting your filters, clearing keywords, or browsing all active opportunities.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-6 rounded-xl bg-brand px-5 py-2.5 text-xs font-semibold text-white shadow-md transition-all hover:bg-brand/90"
                  >
                    Reset Search Filters
                  </button>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {filteredJobs.map((job) => {
                    const isSaved = !!savedJobs[job.id]

                    return (
                      <div
                        key={job.id}
                        className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-[#111116]/95 via-[#0c0c10]/95 to-[#070709]/98 p-5 sm:p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-brand/40 hover:shadow-[0_12px_32px_rgba(92,83,254,0.12)]"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          {/* Company Avatar & Role Title */}
                          <div className="flex items-start gap-4">
                            <Link
                              href={`/companies/${job.companyId}`}
                              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#16161c] p-2.5 shadow-inner transition-transform group-hover:scale-105"
                            >
                              <Image
                                src={job.companyLogo}
                                alt={job.companyName}
                                width={44}
                                height={44}
                                className="max-h-8 w-auto object-contain brightness-125"
                              />
                            </Link>

                            <div>
                              <div className="flex items-center gap-2">
                                <Link
                                  href={`/companies/${job.companyId}`}
                                  className="text-xs font-semibold text-brand-light hover:underline"
                                >
                                  {job.companyName}
                                </Link>
                                <span className="text-white/30">•</span>
                                <span className="text-[11px] text-white/50">{job.postedAt}</span>
                              </div>

                              <Link
                                href={`/jobs/${job.id}`}
                                className="mt-1 block font-manrope text-lg font-bold text-white transition-colors group-hover:text-brand-light sm:text-xl"
                              >
                                {job.title}
                              </Link>

                              {/* Badges */}
                              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/70">
                                <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-[#171720] px-2.5 py-1 text-[11px] font-medium text-white/90">
                                  <Briefcase className="h-3 w-3 text-brand-light" />
                                  {job.jobType}
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-md border border-white/5 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/70">
                                  <MapPin className="h-3 w-3 text-white/40" />
                                  {job.location}
                                </span>
                                <span className="rounded-md border border-white/5 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/60">
                                  {job.category}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Save Button */}
                          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3">
                            <button
                              type="button"
                              onClick={() => toggleSave(job.id)}
                              aria-label={isSaved ? "Remove from saved" : "Save job"}
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                                isSaved
                                  ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
                                  : "border-white/10 bg-white/[0.03] text-white/40 hover:border-white/20 hover:text-white"
                              }`}
                            >
                              <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                            </button>

                            <div className="text-right">
                              <span className="font-space-mono text-base font-bold text-white">
                                {job.salary}
                              </span>
                              <span className="block text-[11px] text-white/40">annual compensation</span>
                            </div>
                          </div>
                        </div>

                        {/* Description Preview & Tags */}
                        <p className="mt-4 text-xs leading-relaxed text-white/65 line-clamp-2 sm:text-sm">
                          {job.overview}
                        </p>

                        {/* Bottom Row */}
                        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                          <div className="flex flex-wrap items-center gap-1.5">
                            {job.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[11px] font-normal text-white/60"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <Link
                            href={`/jobs/${job.id}`}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-semibold text-white shadow-md transition-all hover:bg-brand/90 hover:shadow-[0_0_20px_rgba(92,83,254,0.4)]"
                          >
                            <span>View Details & Apply</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function BrowseJobsPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#010103] text-white">
          <div className="flex items-center gap-3">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand border-t-transparent" />
            <span className="text-sm font-medium text-white/70">Loading opportunities...</span>
          </div>
        </div>
      }
    >
      <BrowseJobsContent />
    </React.Suspense>
  )
}
