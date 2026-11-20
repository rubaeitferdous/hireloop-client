"use client"

import * as React from "react"
import Link from "next/link"
import {
  Briefcase,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  PlusCircle,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Users,
} from "lucide-react"

import { useDashboard } from "@/lib/dashboard-context"

export default function RecruiterManageJobsPage() {
  const { myCompany, recruiterJobs, deleteJob, toggleJobClose, recruiterPlan, applications } = useDashboard()

  const companyJobs = recruiterJobs.filter((j) => myCompany && j.companyId === myCompany.id)
  const activeCount = companyJobs.filter((j) => j.status !== "Closed").length
  const isLimitReached = activeCount >= recruiterPlan.activeJobsLimit

  const handleDelete = (jobId: string, title: string) => {
    if (confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      deleteJob(jobId)
    }
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="font-manrope text-2xl font-bold text-white">Manage Job Postings ({companyJobs.length})</h1>
          <p className="text-xs sm:text-sm text-white/60">
            Publish, close, edit, and review applicants across all your active hiring requisitions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/recruiter/jobs/new"
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-white shadow-md transition-all ${
              isLimitReached
                ? "bg-white/10 cursor-not-allowed opacity-50"
                : "bg-brand hover:bg-brand/90 hover:shadow-[0_0_20px_rgba(92,83,254,0.4)]"
            }`}
          >
            <PlusCircle className="h-4 w-4" />
            <span>Post New Job</span>
          </Link>
        </div>
      </div>

      {/* Plan Quota Meter Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-4 text-xs">
        <div>
          <span className="text-white/60">
            Active Job Capacity ({recruiterPlan.name} Plan):
          </span>
          <span className="font-bold text-white ml-1.5 font-space-mono">
            {activeCount} / {recruiterPlan.activeJobsLimit} active
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-36 h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-brand rounded-full transition-all"
              style={{ width: `${Math.min((activeCount / recruiterPlan.activeJobsLimit) * 100, 100)}%` }}
            />
          </div>
          <Link href="/dashboard/recruiter/billing" className="text-brand-light font-semibold hover:underline">
            Upgrade Plan
          </Link>
        </div>
      </div>

      {/* Table */}
      {companyJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.01] p-12 text-center">
          <Briefcase className="h-10 w-10 text-white/40" />
          <h3 className="mt-4 font-manrope text-base font-bold text-white">No job postings created yet</h3>
          <p className="mt-1 text-xs text-white/60">Create your first role to start collecting top candidates.</p>
          <Link
            href="/dashboard/recruiter/jobs/new"
            className="mt-5 rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-brand/90"
          >
            Post a Job
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d0d12]/95 shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/[0.02] text-[10px] font-bold uppercase tracking-wider text-white/50">
              <tr>
                <th className="py-4 px-5">Job Title</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Applicants</th>
                <th className="py-4 px-4">Posted</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {companyJobs.map((job) => {
                const isClosed = job.status === "Closed"
                const appCount = applications.filter((a) => a.jobId === job.id).length

                return (
                  <tr key={job.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-5">
                      <Link
                        href={`/jobs/${job.id}`}
                        className="font-manrope font-bold text-white hover:text-brand-light transition-colors text-sm"
                      >
                        {job.title}
                      </Link>
                      <span className="block text-[11px] text-white/50 font-mono">{job.salary} • {job.location}</span>
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                          !isClosed
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-white/10 text-white/50 border border-white/10"
                        }`}
                      >
                        {!isClosed ? "Active" : "Closed"}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <Link
                        href={`/dashboard/recruiter/jobs/${job.id}/applicants`}
                        className="inline-flex items-center gap-1.5 font-semibold text-brand-light hover:underline"
                      >
                        <Users className="h-3.5 w-3.5" />
                        <span>{appCount} applicants</span>
                      </Link>
                    </td>

                    <td className="py-4 px-4 text-white/60">
                      {job.postedAt}
                    </td>

                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/recruiter/jobs/${job.id}/applicants`}
                          title="View Applicants"
                          className="rounded-lg border border-white/10 p-2 text-white/70 hover:bg-white/5 hover:text-white"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => toggleJobClose(job.id)}
                          title={isClosed ? "Reopen Job" : "Close Job"}
                          className="rounded-lg border border-white/10 p-2 text-white/70 hover:bg-white/5 hover:text-white"
                        >
                          {isClosed ? <ToggleRight className="h-3.5 w-3.5 text-emerald-400" /> : <ToggleLeft className="h-3.5 w-3.5" />}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(job.id, job.title)}
                          title="Delete Job"
                          className="rounded-lg border border-white/10 p-2 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
