"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Mail,
  Send,
  Users,
  AlertCircle,
  ExternalLink,
} from "lucide-react"

import { useDashboard, ApplicationStatus } from "@/lib/dashboard-context"
import { mockJobs } from "@/lib/mock-data"

const STATUS_OPTIONS: ApplicationStatus[] = [
  "Applied",
  "Under Review",
  "Shortlisted",
  "Offered",
  "Rejected",
]

const STATUS_BADGES: Record<ApplicationStatus, string> = {
  Applied: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Under Review": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Shortlisted: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  Offered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
}

export default function JobApplicantsPage() {
  const params = useParams()
  const jobId = params?.jobId as string

  const { applications, updateApplicantStatus, recruiterJobs } = useDashboard()
  const [emailAlertToast, setEmailAlertToast] = React.useState<string | null>(null)

  const job = recruiterJobs.find((j) => j.id === jobId) || mockJobs[0]
  const jobApplicants = applications.filter((a) => a.jobId === jobId)

  const handleStatusChange = (appId: string, applicantName: string, applicantEmail: string, newStatus: ApplicationStatus) => {
    updateApplicantStatus(appId, newStatus)
    setEmailAlertToast(`Email notification dispatched to ${applicantName} (${applicantEmail}): Status updated to "${newStatus}".`)
    setTimeout(() => setEmailAlertToast(null), 5000)
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb */}
      <div>
        <Link
          href="/dashboard/recruiter/jobs"
          className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white mb-2"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Manage Jobs</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <span className="font-space-mono text-xs uppercase tracking-wider text-brand-light">
              Candidate Pipeline
            </span>
            <h1 className="font-manrope text-2xl font-bold text-white mt-1">
              Applicants for: {job.title}
            </h1>
            <p className="text-xs text-white/50">
              {job.companyName} • {job.location} • {job.salary}
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0d0d12] px-3.5 py-2 text-xs">
            <Users className="h-4 w-4 text-brand-light" />
            <span className="font-bold text-white font-space-mono">{jobApplicants.length}</span>
            <span className="text-white/60">Candidates in review</span>
          </div>
        </div>
      </div>

      {/* Email Alert Banner */}
      {emailAlertToast && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-400">
          <Mail className="h-4 w-4 shrink-0" />
          <span>{emailAlertToast}</span>
        </div>
      )}

      {/* Applicants Table */}
      {jobApplicants.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.01] p-12 text-center">
          <Users className="h-10 w-10 text-white/40" />
          <h3 className="mt-4 font-manrope text-base font-bold text-white">No applications received yet</h3>
          <p className="mt-1 text-xs text-white/60">
            Once job seekers submit applications for this role, they will appear here with instant resume review.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d0d12]/95 shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/[0.02] text-[10px] font-bold uppercase tracking-wider text-white/50">
              <tr>
                <th className="py-4 px-5">Candidate Name</th>
                <th className="py-4 px-4">Contact Email</th>
                <th className="py-4 px-4">Applied</th>
                <th className="py-4 px-4">Resume</th>
                <th className="py-4 px-5 text-right">Status Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {jobApplicants.map((app) => (
                <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/20 text-xs font-bold text-white">
                        {app.seekerName[0]}
                      </div>
                      <div>
                        <span className="font-manrope font-bold text-white block text-sm">
                          {app.seekerName}
                        </span>
                        {app.coverLetter && (
                          <span className="text-[11px] text-white/45 italic line-clamp-1 max-w-[200px]">
                            &ldquo;{app.coverLetter}&rdquo;
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 font-mono text-white/70">
                    {app.seekerEmail}
                  </td>

                  <td className="py-4 px-4 text-white/60">
                    {app.appliedAt}
                  </td>

                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 text-brand-light font-medium hover:underline cursor-pointer">
                      <FileText className="h-3.5 w-3.5" />
                      <span>{app.resumeUrl}</span>
                    </span>
                  </td>

                  <td className="py-4 px-5 text-right">
                    <select
                      value={app.status}
                      onChange={(e) =>
                        handleStatusChange(
                          app.id,
                          app.seekerName,
                          app.seekerEmail,
                          e.target.value as ApplicationStatus
                        )
                      }
                      className="rounded-xl border border-white/10 bg-[#161620] px-3 py-1.5 text-xs font-semibold text-white focus:border-brand focus:outline-none"
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#121217]">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
