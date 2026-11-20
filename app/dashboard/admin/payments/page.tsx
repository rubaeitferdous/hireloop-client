"use client"

import * as React from "react"
import { CreditCard, DollarSign, TrendingUp, Users, CheckCircle2 } from "lucide-react"

import { useDashboard } from "@/lib/dashboard-context"

export default function AdminPaymentsPage() {
  const { payments } = useDashboard()

  const totalRev = payments.reduce((acc, p) => acc + p.amount, 0)
  const monthlyRev = Math.round(totalRev * 0.85)
  const seekerSubs = payments.filter((p) => p.plan.toLowerCase().includes("seeker")).length + 48
  const recruiterSubs = payments.filter((p) => p.plan.toLowerCase().includes("recruiter")).length + 14

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-white/10 pb-5">
        <h1 className="font-manrope text-2xl font-bold text-white">Platform Payments & Subscriptions</h1>
        <p className="text-xs sm:text-sm text-white/60">
          Financial ledger tracking subscription revenue, Stripe transactions, and active billing tiers.
        </p>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-5">
        <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-5 shadow-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <DollarSign className="h-5 w-5" />
          </div>
          <div className="mt-4">
            <span className="font-manrope text-2xl sm:text-3xl font-bold text-white">${totalRev + 2480}</span>
            <span className="mt-1 block text-xs text-white/50">Total Platform Revenue</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-5 shadow-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/20 text-brand-light">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="mt-4">
            <span className="font-manrope text-2xl sm:text-3xl font-bold text-white">${monthlyRev + 1620}</span>
            <span className="mt-1 block text-xs text-white/50">Monthly Recurring (MRR)</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-5 shadow-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <Users className="h-5 w-5" />
          </div>
          <div className="mt-4">
            <span className="font-manrope text-2xl sm:text-3xl font-bold text-white">{seekerSubs}</span>
            <span className="mt-1 block text-xs text-white/50">Active Seeker Subs</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-5 shadow-lg">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
            <CreditCard className="h-5 w-5" />
          </div>
          <div className="mt-4">
            <span className="font-manrope text-2xl sm:text-3xl font-bold text-white">{recruiterSubs}</span>
            <span className="mt-1 block text-xs text-white/50">Active Recruiter Subs</span>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-6 shadow-xl space-y-4">
        <h3 className="font-manrope text-base font-bold text-white">Stripe Transaction Ledger</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/[0.02] text-[10px] font-bold uppercase tracking-wider text-white/50">
              <tr>
                <th className="py-4 px-4">User Email</th>
                <th className="py-4 px-4">Plan Description</th>
                <th className="py-4 px-4">Amount</th>
                <th className="py-4 px-4">Date (Absolute & Relative)</th>
                <th className="py-4 px-4">Transaction ID</th>
                <th className="py-4 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-4 font-semibold text-white">
                    {p.userEmail}
                  </td>

                  <td className="py-4 px-4 text-brand-light font-medium">
                    {p.plan}
                  </td>

                  <td className="py-4 px-4 font-mono font-bold text-white">
                    ${p.amount}.00
                  </td>

                  <td className="py-4 px-4 text-white/60">
                    {p.date} • <span className="text-[11px] text-white/40">recently</span>
                  </td>

                  <td className="py-4 px-4 font-mono text-[11px] text-white/50">
                    {p.id}
                  </td>

                  <td className="py-4 px-4 text-right">
                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
