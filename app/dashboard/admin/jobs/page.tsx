"use client"

import * as React from "react"
import Link from "next/link"
import { Briefcase, ExternalLink, Search, Trash2, CheckCircle2 } from "lucide-react"

import { useDashboard } from "@/lib/dashboard-context"

export default function AdminJobsModerationPage() {
  const { recruiterJobs, deletePlatformJob } = useDashboard()
  const [search, setSearch] = React.useState("")
  const [categoryFilter, setCategoryFilter] = React.useState("All")
  const [feedback, setFeedback] = React.useState<string | null>(null)

  const categories = ["All", "AI", "Engineering", "Design", "Product", "Marketing"]

  const filteredJobs = recruiterJobs.filter((job) => {
    if (search.trim()) {
      const q = search.toLowerCase()
      const match = job.title.toLowerCase().includes(q) || job.companyName.toLowerCase().includes(q)
      if (!match) return false
    }
    if (categoryFilter !== "All" && job.category !== categoryFilter) return false
    return true
  })

  const handleDelete = (jobId: string, title: string) => {
    if (confirm(`ADMIN ACTION: Permanently remove job post "${title}" from the platform?`)) {
      deletePlatformJob(jobId)
      setFeedback(`Job "${title}" has been removed by platform moderation.`)
      setTimeout(() => setFeedback(null), 4000)
    }
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="font-manrope text-2xl font-bold text-white">Platform Job Moderation ({recruiterJobs.length})</h1>
          <p className="text-xs sm:text-sm text-white/60">
            Monitor and moderate all active and closed job posts across the entire platform.
          </p>
        </div>
      </div>

      {feedback && (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex w-full sm:w-80 items-center gap-2.5 rounded-xl border border-white/10 bg-[#0d0d12] px-3.5 py-2 text-xs">
          <Search className="h-4 w-4 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search job title or company..."
            className="w-full bg-transparent text-white placeholder:text-white/40 focus:outline-none"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full sm:w-auto rounded-xl border border-white/10 bg-[#0d0d12] px-3.5 py-2 text-xs text-white focus:outline-none"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              Category: {c}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d0d12]/95 shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-white/10 bg-white/[0.02] text-[10px] font-bold uppercase tracking-wider text-white/50">
            <tr>
              <th className="py-4 px-5">Job Title</th>
              <th className="py-4 px-4">Company</th>
              <th className="py-4 px-4">Category</th>
              <th className="py-4 px-4">Employment Type</th>
              <th className="py-4 px-4">Posted Date</th>
              <th className="py-4 px-5 text-right">Moderation Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-white/80">
            {filteredJobs.map((job) => (
              <tr key={job.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-5">
                  <span className="font-manrope font-bold text-white block text-sm">{job.title}</span>
                  <span className="font-mono text-[11px] text-white/50">{job.salary} • {job.location}</span>
                </td>

                <td className="py-4 px-4 font-semibold text-brand-light">
                  {job.companyName}
                </td>

                <td className="py-4 px-4 text-white/70">
                  {job.category}
                </td>

                <td className="py-4 px-4">
                  <span className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px]">
                    {job.jobType}
                  </span>
                </td>

                <td className="py-4 px-4 text-white/60">
                  {job.postedAt}
                </td>

                <td className="py-4 px-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/jobs/${job.id}`}
                      title="View public details"
                      className="rounded-lg border border-white/10 p-2 text-white/60 hover:bg-white/5 hover:text-white"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(job.id, job.title)}
                      title="Remove job"
                      className="rounded-lg border border-rose-500/20 p-2 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/40"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
