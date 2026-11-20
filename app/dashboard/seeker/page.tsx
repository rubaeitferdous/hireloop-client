"use client"

import * as React from "react"
import Link from "next/link"
import {
  Bookmark,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Edit3,
  FileText,
  MapPin,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

import { useDashboard, ApplicationStatus } from "@/lib/dashboard-context"
import { useSession } from "@/lib/auth-client"

const STATUS_COLORS: Record<ApplicationStatus, string> = {
  Applied: "#3b82f6",
  "Under Review": "#eab308",
  Shortlisted: "#a855f7",
  Rejected: "#ef4444",
  Offered: "#10b981",
}

export default function SeekerHomePage() {
  const { data: session } = useSession()
  const { applications, savedJobIds, seekerPlan, seekerProfile } = useDashboard()

  const userName = session?.user?.name || "Alex Rivera"
  const userEmail = session?.user?.email || "alex.rivera@example.com"

  // Count metrics
  const savedCount = savedJobIds.length
  const submittedCount = applications.length
  const shortlistedCount = applications.filter((a) => a.status === "Shortlisted").length
  const offeredCount = applications.filter((a) => a.status === "Offered").length

  // Pie chart data: status distribution
  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1
    return acc
  }, {} as Record<ApplicationStatus, number>)

  const pieData = Object.keys(STATUS_COLORS).map((status) => ({
    name: status,
    value: statusCounts[status as ApplicationStatus] || 0,
    color: STATUS_COLORS[status as ApplicationStatus],
  }))

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="font-manrope text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Welcome back, {userName.split(" ")[0]} 👋
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-white/60">
            Track your live applications, bookmark opportunities, and manage your career pipeline.
          </p>
        </div>

        <Link
          href="/dashboard/seeker/jobs"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-brand/90 transition-all sm:w-auto"
        >
          <Briefcase className="h-4 w-4" />
          <span>Browse Open Roles</span>
        </Link>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-5">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#111116] to-[#08080a] p-5 shadow-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-brand-light">
            <Bookmark className="h-5 w-5" />
          </div>
          <div className="mt-4">
            <span className="font-manrope text-3xl font-bold text-white">{savedCount}</span>
            <span className="mt-1 block text-xs text-white/60">Saved Jobs</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#111116] to-[#08080a] p-5 shadow-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-blue-400">
            <FileText className="h-5 w-5" />
          </div>
          <div className="mt-4">
            <span className="font-manrope text-3xl font-bold text-white">{submittedCount}</span>
            <span className="mt-1 block text-xs text-white/60">Applications Sent</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#111116] to-[#08080a] p-5 shadow-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-purple-400">
            <Calendar className="h-5 w-5" />
          </div>
          <div className="mt-4">
            <span className="font-manrope text-3xl font-bold text-white">{shortlistedCount}</span>
            <span className="mt-1 block text-xs text-white/60">Shortlisted / Review</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#111116] to-[#08080a] p-5 shadow-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-emerald-400">
            <Trophy className="h-5 w-5" />
          </div>
          <div className="mt-4">
            <span className="font-manrope text-3xl font-bold text-white">{offeredCount}</span>
            <span className="mt-1 block text-xs text-white/60">Offers Received</span>
          </div>
        </div>
      </div>

      {/* Grid: Profile Summary Card + Application Status Distribution Chart */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-manrope text-base font-bold text-white">Seeker Profile</h3>
              <Link
                href="/dashboard/seeker/settings"
                className="flex items-center gap-1 text-xs text-brand-light hover:underline"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>Edit</span>
              </Link>
            </div>

            <div className="mt-5 flex items-center gap-3.5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/30 text-lg font-bold text-white ring-1 ring-brand/50">
                {userName[0]}
              </div>
              <div>
                <h4 className="font-manrope text-base font-bold text-white">{userName}</h4>
                <p className="text-xs text-white/50">{userEmail}</p>
                <span className="mt-1 inline-block rounded-md bg-white/[0.04] px-2 py-0.5 text-[10px] text-brand-light">
                  Plan: {seekerPlan.name}
                </span>
              </div>
            </div>

            <div className="mt-5 text-xs text-white/70">
              <p className="font-semibold text-white">{seekerProfile.headline}</p>
              <p className="mt-1.5 leading-relaxed text-white/60 line-clamp-3">{seekerProfile.bio}</p>
            </div>

            {/* Skills Chips */}
            <div className="mt-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 block mb-2">
                Top Skills
              </span>
              <div className="flex flex-wrap gap-1.5">
                {seekerProfile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-white/10 bg-[#14141c] px-2 py-0.5 text-[10px] text-white/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between text-xs text-white/60">
            <span>Resume: {seekerProfile.resumeName}</span>
            <Link href="/dashboard/seeker/settings" className="text-brand-light hover:underline">
              Update PDF
            </Link>
          </div>
        </div>

        {/* Application Status Distribution (Recharts) */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="font-manrope text-base font-bold text-white">Application Pipeline Status</h3>
              <p className="text-xs text-white/50">Distribution across active opportunities</p>
            </div>
            <Link
              href="/dashboard/seeker/applications"
              className="text-xs text-brand-light hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Recharts Pie Chart & Legend */}
          <div className="my-6 grid grid-cols-1 md:grid-cols-2 items-center gap-6">
            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "#121217",
                      borderColor: "rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className="space-y-2.5">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-white/80">{item.name}</span>
                  </div>
                  <span className="font-mono font-semibold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Usage Meter */}
          <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-white/60">
            <span>
              Monthly Applications: <strong className="text-white">{seekerPlan.applicationsUsed}</strong> / {seekerPlan.applicationsLimit === Infinity ? "Unlimited" : seekerPlan.applicationsLimit}
            </span>
            <Link href="/dashboard/seeker/billing" className="text-brand-light hover:underline">
              Upgrade Plan
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity List */}
      <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-6 shadow-xl">
        <h3 className="font-manrope text-base font-bold text-white mb-4">Recent Activity & Updates</h3>

        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 text-xs transition-colors hover:border-white/15"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04]">
                  <FileText className="h-4 w-4 text-brand-light" />
                </div>
                <div>
                  <p className="font-semibold text-white">
                    Application updated for <span className="text-brand-light">{app.jobTitle}</span> at {app.companyName}
                  </p>
                  <p className="text-[11px] text-white/40">Submitted {app.appliedAt}</p>
                </div>
              </div>

              <span
                className="rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide"
                style={{
                  backgroundColor: `${STATUS_COLORS[app.status]}20`,
                  color: STATUS_COLORS[app.status],
                  border: `1px solid ${STATUS_COLORS[app.status]}40`,
                }}
              >
                {app.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
