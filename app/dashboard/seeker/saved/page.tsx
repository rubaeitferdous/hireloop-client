"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Bookmark, Briefcase, MapPin, Trash2, ArrowRight, Sparkles } from "lucide-react"

import { useDashboard } from "@/lib/dashboard-context"
import { mockJobs } from "@/lib/mock-data"

export default function SeekerSavedJobsPage() {
  const { savedJobIds, toggleSaveJob } = useDashboard()

  const savedJobs = mockJobs.filter((job) => savedJobIds.includes(job.id))

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="font-manrope text-2xl font-bold text-white">Saved Positions ({savedJobs.length})</h1>
          <p className="text-xs sm:text-sm text-white/60">
            Review and apply to roles you have bookmarked for later.
          </p>
        </div>

        <Link
          href="/dashboard/seeker/jobs"
          className="inline-flex items-center gap-1.5 text-xs text-brand-light hover:underline"
        >
          <span>Find more jobs</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {savedJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.01] p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
            <Bookmark className="h-6 w-6 text-white/40" />
          </div>
          <h3 className="mt-4 font-manrope text-base font-bold text-white">No saved jobs yet</h3>
          <p className="mt-1 text-xs text-white/60">
            Bookmark opportunities while browsing to keep track of them here.
          </p>
          <Link
            href="/dashboard/seeker/jobs"
            className="mt-5 rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-brand/90"
          >
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {savedJobs.map((job) => (
            <div
              key={job.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-5 shadow-md transition-all hover:border-brand/40"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#16161c] p-2">
                  <Image
                    src={job.companyLogo}
                    alt={job.companyName}
                    width={36}
                    height={36}
                    className="max-h-7 w-auto object-contain brightness-125"
                  />
                </div>
                <div>
                  <Link
                    href={`/jobs/${job.id}`}
                    className="font-manrope text-base font-bold text-white hover:text-brand-light transition-colors"
                  >
                    {job.title}
                  </Link>
                  <p className="text-xs text-brand-light font-medium">{job.companyName}</p>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-white/50">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </span>
                    <span>•</span>
                    <span className="font-space-mono text-white/80 font-bold">{job.salary}</span>
                    <span>•</span>
                    <span>Saved recently</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => toggleSaveJob(job.id)}
                  title="Remove from bookmarks"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <Link
                  href={`/jobs/${job.id}`}
                  className="rounded-xl bg-brand px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-brand/90 transition-all"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
