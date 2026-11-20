"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Bookmark,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Filter,
  MapPin,
  Search,
  Send,
  Sparkles,
  X,
} from "lucide-react"

import { useDashboard } from "@/lib/dashboard-context"
import { mockJobs, Job } from "@/lib/mock-data"

export default function SeekerJobsPage() {
  const { savedJobIds, toggleSaveJob, submitApplication, seekerPlan, seekerProfile, openPaymentModal } = useDashboard()

  const [query, setQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("All")
  const [selectedType, setSelectedType] = React.useState("All")
  const [applyModalJob, setApplyModalJob] = React.useState<Job | null>(null)
  const [coverLetter, setCoverLetter] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitSuccess, setSubmitSuccess] = React.useState(false)

  const categories = ["All", "AI", "Engineering", "Design", "Product", "Marketing"]
  const types = ["All", "Full-time", "Remote", "Part-time", "Contract"]

  const filteredJobs = mockJobs.filter((job) => {
    if (query.trim()) {
      const q = query.toLowerCase()
      const match = job.title.toLowerCase().includes(q) || job.companyName.toLowerCase().includes(q) || job.tags.some((t) => t.toLowerCase().includes(q))
      if (!match) return false
    }
    if (selectedCategory !== "All" && job.category !== selectedCategory) return false
    if (selectedType !== "All") {
      if (selectedType === "Remote") {
        if (!job.isRemote && !job.location.toLowerCase().includes("remote")) return false
      } else if (job.jobType !== selectedType) {
        return false
      }
    }
    return true
  })

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!applyModalJob) return
    setIsSubmitting(true)
    const success = await submitApplication(applyModalJob.id, coverLetter)
    setIsSubmitting(false)
    if (success) {
      setSubmitSuccess(true)
    }
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="font-manrope text-2xl font-bold text-white">Browse & Apply to Open Roles</h1>
          <p className="text-xs sm:text-sm text-white/60">
            Apply directly from your dashboard with one click using your saved profile and resume.
          </p>
        </div>

        <span className="font-space-mono text-xs text-white/70 bg-[#121217] border border-white/10 rounded-xl px-3 py-1.5 self-start sm:self-auto">
          Quota: <strong>{seekerPlan.applicationsUsed}</strong> / {seekerPlan.applicationsLimit === Infinity ? "Unlimited" : seekerPlan.applicationsLimit} used
        </span>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="flex-1 w-full flex items-center gap-3 rounded-xl border border-white/10 bg-[#0d0d12] px-4 py-2.5">
          <Search className="h-4 w-4 text-white/40 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search roles, companies, or tech..."
            className="w-full bg-transparent text-xs text-white placeholder:text-white/40 focus:outline-none sm:text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-xl border border-white/10 bg-[#0d0d12] px-3 py-2 text-xs text-white focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="bg-[#121217]">
                Category: {c}
              </option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="rounded-xl border border-white/10 bg-[#0d0d12] px-3 py-2 text-xs text-white focus:outline-none"
          >
            {types.map((t) => (
              <option key={t} value={t} className="bg-[#121217]">
                Type: {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="space-y-4">
        {filteredJobs.map((job) => {
          const isSaved = savedJobIds.includes(job.id)

          return (
            <div
              key={job.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-5 shadow-md transition-all hover:border-brand/40 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#14141a] p-2">
                    <Image
                      src={job.companyLogo}
                      alt={job.companyName}
                      width={36}
                      height={36}
                      className="max-h-7 w-auto object-contain brightness-125"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-brand-light">{job.companyName}</span>
                    <h3 className="font-manrope text-base font-bold text-white group-hover:text-brand-light transition-colors">
                      {job.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-white/60">
                      <span className="flex items-center gap-1 rounded bg-white/[0.04] px-2 py-0.5 text-[11px]">
                        <Briefcase className="h-3 w-3 text-brand-light" />
                        {job.jobType}
                      </span>
                      <span className="flex items-center gap-1 rounded bg-white/[0.04] px-2 py-0.5 text-[11px]">
                        <MapPin className="h-3 w-3 text-white/40" />
                        {job.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center sm:flex-col sm:items-end justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => toggleSaveJob(job.id)}
                    className={`rounded-xl border p-2 text-xs transition-colors ${
                      isSaved
                        ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
                        : "border-white/10 text-white/40 hover:text-white"
                    }`}
                  >
                    <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                  </button>
                  <span className="font-space-mono text-sm font-bold text-white">{job.salary}</span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {job.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/60">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/jobs/${job.id}`}
                    className="text-xs text-white/60 hover:text-white hover:underline"
                  >
                    Details
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      if (seekerPlan.applicationsLimit !== Infinity && seekerPlan.applicationsUsed >= seekerPlan.applicationsLimit) {
                        openPaymentModal(
                          "Pro",
                          `You have reached your limit of ${seekerPlan.applicationsLimit} applications on the Free tier. Upgrade to continue applying!`
                        )
                        return
                      }
                      setApplyModalJob(job)
                      setSubmitSuccess(false)
                    }}
                    className="rounded-xl bg-brand px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-brand/90 transition-all"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal */}
      {applyModalJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl border border-white/20 bg-[#121217] p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setApplyModalJob(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {submitSuccess ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
                <h3 className="font-manrope mt-4 text-xl font-bold text-white">Application Submitted!</h3>
                <p className="mt-2 text-xs text-white/70">
                  Your application for {applyModalJob.title} at {applyModalJob.companyName} has been sent.
                </p>
                <button
                  type="button"
                  onClick={() => setApplyModalJob(null)}
                  className="mt-6 rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-white"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <h3 className="font-manrope text-lg font-bold text-white">
                  Apply to {applyModalJob.title}
                </h3>
                <p className="text-xs text-white/60">{applyModalJob.companyName} • {applyModalJob.location}</p>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs">
                  <span className="text-white/50 block">Resume on file:</span>
                  <span className="font-medium text-white">{seekerProfile.resumeName}</span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1.5">
                    Cover Letter / Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Briefly highlight your qualifications..."
                    className="w-full rounded-xl border border-white/10 bg-[#0d0d12] p-2.5 text-xs text-white focus:border-brand focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-white/10 pt-4">
                  <button
                    type="button"
                    onClick={() => setApplyModalJob(null)}
                    className="rounded-xl border border-white/10 px-3 py-2 text-xs text-white/70"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-brand/90 disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Send Application"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
