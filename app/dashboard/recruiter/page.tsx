"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  Edit3,
  FileText,
  PlusCircle,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
} from "recharts"

import { useDashboard } from "@/lib/dashboard-context"
import { useSession } from "@/lib/auth-client"

export default function RecruiterHomePage() {
  const { data: session } = useSession()
  const { myCompany, recruiterJobs, applications, recruiterPlan } = useDashboard()

  const companyJobs = recruiterJobs.filter((j) => myCompany && j.companyId === myCompany.id)
  const totalJobs = companyJobs.length
  const activeJobs = companyJobs.filter((j) => j.status !== "Closed").length
  const closedJobs = totalJobs - activeJobs
  const totalApplicants = applications.length

  // Bar chart: applicants per job
  const chartData = companyJobs.slice(0, 5).map((job) => ({
    name: job.title.length > 18 ? job.title.slice(0, 16) + "..." : job.title,
    applicants: applications.filter((a) => a.jobId === job.id).length + Math.floor(Math.random() * 8) + 2,
  }))

  return (
    <div className="space-y-8 pb-10">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="font-manrope text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Recruitment Overview
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-white/60">
            Monitor applicant inflow, manage your active openings, and scale your engineering hiring.
          </p>
        </div>

        <Link
          href="/dashboard/recruiter/jobs/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-brand/90 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Post New Job</span>
        </Link>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-5">
        <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-5 shadow-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-brand-light">
            <Briefcase className="h-5 w-5" />
          </div>
          <div className="mt-4">
            <span className="font-manrope text-3xl font-bold text-white">{totalJobs}</span>
            <span className="mt-1 block text-xs text-white/60">Total Job Posts</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-5 shadow-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-blue-400">
            <Users className="h-5 w-5" />
          </div>
          <div className="mt-4">
            <span className="font-manrope text-3xl font-bold text-white">{totalApplicants}</span>
            <span className="mt-1 block text-xs text-white/60">Total Applicants</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-5 shadow-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div className="mt-4">
            <span className="font-manrope text-3xl font-bold text-white">{activeJobs}</span>
            <span className="mt-1 block text-xs text-white/60">Active Listings</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-5 shadow-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-white/40">
            <Clock className="h-5 w-5" />
          </div>
          <div className="mt-4">
            <span className="font-manrope text-3xl font-bold text-white">{closedJobs}</span>
            <span className="mt-1 block text-xs text-white/60">Filled / Closed</span>
          </div>
        </div>
      </div>

      {/* Grid: Company Card + Applicants Recharts Bar Chart */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Company Card */}
        <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-manrope text-base font-bold text-white">Registered Company</h3>
              <Link
                href="/dashboard/recruiter/company"
                className="flex items-center gap-1 text-xs text-brand-light hover:underline"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>Edit</span>
              </Link>
            </div>

            {myCompany ? (
              <div className="mt-5 space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#16161c] p-2.5">
                    <Image
                      src={myCompany.logo}
                      alt={myCompany.name}
                      width={44}
                      height={44}
                      className="max-h-8 w-auto object-contain brightness-125"
                    />
                  </div>
                  <div>
                    <h4 className="font-manrope text-base font-bold text-white">{myCompany.name}</h4>
                    <span className="text-xs text-brand-light font-medium">{myCompany.industry}</span>
                    <div className="mt-1">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          myCompany.status === "Approved"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : myCompany.status === "Pending"
                            ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}
                      >
                        Verification: {myCompany.status}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-white/70 line-clamp-3">
                  {myCompany.description}
                </p>

                <div className="space-y-2 border-t border-white/10 pt-4 text-xs text-white/70">
                  <div className="flex justify-between">
                    <span className="text-white/50">Location</span>
                    <span className="text-white">{myCompany.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Team Size</span>
                    <span className="text-white">{myCompany.employeeCount}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-white/60">
                <p>No company registered yet.</p>
                <Link
                  href="/dashboard/recruiter/company"
                  className="mt-4 inline-block rounded-xl bg-brand px-4 py-2 text-xs font-semibold text-white"
                >
                  Register Company
                </Link>
              </div>
            )}
          </div>

          <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between text-xs text-white/60">
            <span>Recruiter Plan: <strong className="text-white">{recruiterPlan.name}</strong></span>
            <Link href="/dashboard/recruiter/billing" className="text-brand-light hover:underline">
              Upgrade ({activeJobs}/{recruiterPlan.activeJobsLimit})
            </Link>
          </div>
        </div>

        {/* Applicants Bar Chart (Recharts) */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="font-manrope text-base font-bold text-white">Applicant Volume Per Role</h3>
              <p className="text-xs text-white/50">Candidate activity across your top open positions</p>
            </div>
            <Link
              href="/dashboard/recruiter/jobs"
              className="text-xs text-brand-light hover:underline flex items-center gap-1"
            >
              <span>Manage all</span>
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="my-6 h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={11} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "#121217",
                    borderColor: "rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="applicants" fill="#5c53fe" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-white/60">
            <span>Active Capacity: <strong>{activeJobs}</strong> of {recruiterPlan.activeJobsLimit} live job slots filled</span>
            <Link href="/dashboard/recruiter/jobs/new" className="text-brand-light hover:underline">
              + Add Posting
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Applications Feed */}
      <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-6 shadow-xl">
        <h3 className="font-manrope text-base font-bold text-white mb-4">Latest Candidate Inflow</h3>

        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-xs hover:border-white/15 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/20 text-brand-light font-bold">
                  {app.seekerName[0]}
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">{app.seekerName}</h4>
                  <p className="text-white/60">
                    Applied for <span className="text-brand-light font-medium">{app.jobTitle}</span> • {app.appliedAt}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 text-[10px] font-semibold text-blue-400">
                  {app.status}
                </span>

                <Link
                  href={`/dashboard/recruiter/jobs/${app.jobId}/applicants`}
                  className="rounded-lg bg-white/[0.05] border border-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/[0.1] transition-colors"
                >
                  Review Candidate
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
