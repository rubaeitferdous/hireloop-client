"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink, FileText, Search, Briefcase } from "lucide-react"

import { useDashboard, ApplicationStatus } from "@/lib/dashboard-context"

const STATUS_BADGES: Record<ApplicationStatus, { bg: string; text: string; border: string }> = {
  Applied: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
  "Under Review": { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/30" },
  Shortlisted: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30" },
  Rejected: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/30" },
  Offered: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
}

export default function SeekerApplicationsPage() {
  const { applications } = useDashboard()
  const [filterStatus, setFilterStatus] = React.useState<string>("All")

  const filteredApps = filterStatus === "All"
    ? applications
    : applications.filter((app) => app.status === filterStatus)

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="font-manrope text-2xl font-bold text-white">My Submitted Applications ({applications.length})</h1>
          <p className="text-xs sm:text-sm text-white/60">
            Real-time pipeline tracking for every role you have submitted to.
          </p>
        </div>

        {/* Filter dropdown */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-xl border border-white/10 bg-[#0d0d12] px-3.5 py-2 text-xs text-white focus:outline-none"
        >
          <option value="All">All Statuses ({applications.length})</option>
          <option value="Applied">Applied</option>
          <option value="Under Review">Under Review</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Offered">Offered</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {filteredApps.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.01] p-12 text-center">
          <FileText className="h-10 w-10 text-white/40" />
          <h3 className="mt-4 font-manrope text-base font-bold text-white">No applications match filter</h3>
          <p className="mt-1 text-xs text-white/60">Clear filter or browse open roles to submit new applications.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d0d12]/95 shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/[0.02] text-[11px] font-bold uppercase tracking-wider text-white/50">
              <tr>
                <th className="py-4 px-5">Role & Company</th>
                <th className="py-4 px-4">Applied</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Resume</th>
                <th className="py-4 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredApps.map((app) => {
                const badge = STATUS_BADGES[app.status] || STATUS_BADGES.Applied

                return (
                  <tr key={app.id} className="transition-colors hover:bg-white/[0.02]">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#16161c] p-1.5">
                          <Image
                            src={app.companyLogo}
                            alt={app.companyName}
                            width={30}
                            height={30}
                            className="max-h-6 w-auto object-contain brightness-125"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/jobs/${app.jobId}`}
                            className="font-manrope font-bold text-white hover:text-brand-light transition-colors text-sm"
                          >
                            {app.jobTitle}
                          </Link>
                          <span className="block text-brand-light font-medium">{app.companyName}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-white/70">
                      {app.appliedAt}
                    </td>

                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wide ${badge.bg} ${badge.text} ${badge.border}`}>
                        {app.status}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-white/60 truncate max-w-[150px]">
                      {app.resumeUrl}
                    </td>

                    <td className="py-4 px-5 text-right">
                      <Link
                        href={`/jobs/${app.jobId}`}
                        className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/80 hover:bg-white/[0.08] hover:text-white transition-colors"
                      >
                        <span>View Role</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
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
