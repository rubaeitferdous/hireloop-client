"use client"

import * as React from "react"
import Link from "next/link"
import {
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  DollarSign,
  FileText,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from "recharts"

import { useDashboard } from "@/lib/dashboard-context"
import { mockJobs } from "@/lib/mock-data"

export default function AdminHomePage() {
  const { users, companies, recruiterJobs, payments } = useDashboard()

  const totalUsers = users.length
  const totalRecruiters = users.filter((u) => u.role === "recruiter").length
  const totalCompanies = companies.length
  const totalJobs = recruiterJobs.length
  const totalRevenue = payments.reduce((acc, p) => acc + p.amount, 0)

  // Recharts 1: Job posts per category
  const categoryCounts = recruiterJobs.reduce((acc, j) => {
    acc[j.category] = (acc[j.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const categoryChartData = Object.keys(categoryCounts).map((cat) => ({
    category: cat,
    jobs: categoryCounts[cat],
  }))

  // Recharts 2: 30-day user growth trend
  const userGrowthData = [
    { day: "May 1", users: 120 },
    { day: "May 5", users: 240 },
    { day: "May 10", users: 480 },
    { day: "May 15", users: 790 },
    { day: "May 20", users: 1140 },
  ]

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-0.5 text-[11px] font-semibold text-purple-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>PLATFORM OPERATOR CONSOLE</span>
          </div>
          <h1 className="font-manrope mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            HireLoop Administration
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-white/60">
            Platform governance, user verification, company moderations, and platform metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/admin/companies"
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white hover:bg-white/[0.08]"
          >
            Review Companies
          </Link>
          <Link
            href="/dashboard/admin/users"
            className="rounded-xl bg-brand px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-brand/90"
          >
            Manage Users
          </Link>
        </div>
      </div>

      {/* 5 Stats Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 sm:gap-4">
        <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-4 shadow-lg">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-brand-light">
            <Users className="h-4 w-4" />
          </div>
          <div className="mt-3">
            <span className="font-manrope text-2xl sm:text-3xl font-bold text-white">{totalUsers}</span>
            <span className="mt-1 block text-xs text-white/50">Total Users</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-4 shadow-lg">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-purple-400">
            <Briefcase className="h-4 w-4" />
          </div>
          <div className="mt-3">
            <span className="font-manrope text-2xl sm:text-3xl font-bold text-white">{totalRecruiters}</span>
            <span className="mt-1 block text-xs text-white/50">Recruiters</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-4 shadow-lg">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-blue-400">
            <Building2 className="h-4 w-4" />
          </div>
          <div className="mt-3">
            <span className="font-manrope text-2xl sm:text-3xl font-bold text-white">{totalCompanies}</span>
            <span className="mt-1 block text-xs text-white/50">Companies</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-4 shadow-lg">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-emerald-400">
            <FileText className="h-4 w-4" />
          </div>
          <div className="mt-3">
            <span className="font-manrope text-2xl sm:text-3xl font-bold text-white">{totalJobs}</span>
            <span className="mt-1 block text-xs text-white/50">Total Jobs</span>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-4 shadow-lg">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] text-amber-400">
            <DollarSign className="h-4 w-4" />
          </div>
          <div className="mt-3">
            <span className="font-manrope text-2xl sm:text-3xl font-bold text-white">${totalRevenue}</span>
            <span className="mt-1 block text-xs text-white/50">Platform Revenue</span>
          </div>
        </div>
      </div>

      {/* Recharts Grid: Category Distribution + User Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Bar Chart of Jobs per Category */}
        <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="font-manrope text-base font-bold text-white">Job Posts by Category</h3>
              <p className="text-xs text-white/50">Volume breakdown across domain clusters</p>
            </div>
            <Link href="/dashboard/admin/jobs" className="text-xs text-brand-light hover:underline flex items-center gap-1">
              <span>View all</span>
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="mt-6 h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="category" stroke="rgba(255,255,255,0.4)" fontSize={11} />
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
                <Bar dataKey="jobs" fill="#5c53fe" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Line Chart of New User Registrations */}
        <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="font-manrope text-base font-bold text-white">New Registrations Trend</h3>
              <p className="text-xs text-white/50">User acquisition trajectory (last 30 days)</p>
            </div>
            <Link href="/dashboard/admin/users" className="text-xs text-brand-light hover:underline flex items-center gap-1">
              <span>Users</span>
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="mt-6 h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.4)" fontSize={11} />
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
                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Payments Stream */}
      <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="font-manrope text-base font-bold text-white">Recent Subscription Transactions</h3>
          <Link href="/dashboard/admin/payments" className="text-xs text-brand-light hover:underline flex items-center gap-1">
            <span>All payments</span>
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="mt-4 space-y-3">
          {payments.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 text-xs hover:border-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <DollarSign className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">{p.userEmail}</p>
                  <p className="text-[11px] text-white/50">{p.plan} • {p.date}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="font-space-mono text-sm font-bold text-white">${p.amount}.00</span>
                <span className="block text-[10px] text-emerald-400 font-semibold">{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
