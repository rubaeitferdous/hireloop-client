"use client"

import * as React from "react"
import Link from "next/link"
import { CheckCircle2, CreditCard, Sparkles, Zap, ArrowRight, ShieldCheck, Loader2 } from "lucide-react"

import { useDashboard } from "@/lib/dashboard-context"

export default function RecruiterBillingPage() {
  const { recruiterPlan, upgradeRecruiterPlan, payments, recruiterJobs, myCompany } = useDashboard()
  const [upgradingPlan, setUpgradingPlan] = React.useState<string | null>(null)
  const [successToast, setSuccessToast] = React.useState<string | null>(null)

  const activeCount = recruiterJobs.filter((j) => myCompany && j.companyId === myCompany.id && j.status !== "Closed").length

  const handleUpgrade = async (planName: "Free" | "Growth" | "Enterprise") => {
    setUpgradingPlan(planName)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    upgradeRecruiterPlan(planName)
    setUpgradingPlan(null)
    setSuccessToast(`Successfully upgraded to Recruiter ${planName} Plan! Your active job post limit is updated.`)
    setTimeout(() => setSuccessToast(null), 4000)
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-white/10 pb-5">
        <h1 className="font-manrope text-2xl font-bold text-white">Recruiter Subscription & Job Post Limits</h1>
        <p className="text-xs sm:text-sm text-white/60">
          Scale your hiring pipelines by adjusting your company active job post quota.
        </p>
      </div>

      {successToast && (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-400">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Current Plan Overview */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#121218]/95 to-[#09090d]/98 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="font-space-mono text-xs uppercase tracking-wider text-brand-light">
              Current Company Plan
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <h2 className="font-manrope text-3xl font-extrabold text-white sm:text-4xl">
                {recruiterPlan.name} Plan
              </h2>
              <span className="font-space-mono text-sm text-white/50">
                ${recruiterPlan.price}/month
              </span>
            </div>
            <p className="mt-2 text-xs text-white/60">
              Active job posts can be closed or reopened at any time to reclaim capacity.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end rounded-2xl border border-white/10 bg-[#16161f] p-4 text-right">
            <span className="text-xs text-white/50">Active Job Postings Allocated</span>
            <span className="font-space-mono text-2xl font-bold text-white mt-1">
              {activeCount} / {recruiterPlan.activeJobsLimit} active
            </span>
            <div className="mt-2 w-48 h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-brand rounded-full transition-all duration-500"
                style={{ width: `${Math.min((activeCount / recruiterPlan.activeJobsLimit) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recruiter Plans Grid */}
      <div>
        <h3 className="font-manrope text-lg font-bold text-white mb-4">Recruitment Tiers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Tier */}
          <div className={`rounded-2xl border p-6 flex flex-col justify-between ${recruiterPlan.name === "Free" ? "border-brand bg-brand/10 ring-1 ring-brand" : "border-white/10 bg-[#0d0d12]"}`}>
            <div>
              <div className="flex items-center justify-between">
                <h4 className="font-manrope font-bold text-white">Free Starter</h4>
                {recruiterPlan.name === "Free" && <span className="text-[10px] bg-brand text-white px-2 py-0.5 rounded-full font-bold">Active</span>}
              </div>
              <p className="mt-1 text-xs text-white/60">Ideal for a company&apos;s initial hiring kick-off.</p>
              <div className="mt-4 font-space-mono text-2xl font-bold text-white">$0 <span className="text-xs text-white/40">forever</span></div>
              <ul className="mt-4 space-y-2 text-xs text-white/70">
                <li>• Up to 3 active job postings</li>
                <li>• Basic applicant management</li>
                <li>• Standard listing visibility</li>
              </ul>
            </div>
            {recruiterPlan.name !== "Free" && (
              <button
                type="button"
                onClick={() => handleUpgrade("Free")}
                disabled={upgradingPlan !== null}
                className="mt-6 w-full rounded-xl border border-white/15 py-2 text-xs font-semibold text-white/80 hover:bg-white/[0.04]"
              >
                Downgrade to Free
              </button>
            )}
          </div>

          {/* Growth Tier */}
          <div className={`rounded-2xl border p-6 flex flex-col justify-between ${recruiterPlan.name === "Growth" ? "border-brand bg-brand/10 ring-1 ring-brand" : "border-white/10 bg-[#0d0d12]"}`}>
            <div>
              <div className="flex items-center justify-between">
                <h4 className="font-manrope font-bold text-white">Growth Plan</h4>
                {recruiterPlan.name === "Growth" && <span className="text-[10px] bg-brand text-white px-2 py-0.5 rounded-full font-bold">Active</span>}
              </div>
              <p className="mt-1 text-xs text-white/60">For scaling startups and high-velocity squads.</p>
              <div className="mt-4 font-space-mono text-2xl font-bold text-white">$49 <span className="text-xs text-white/40">/month</span></div>
              <ul className="mt-4 space-y-2 text-xs text-white/70">
                <li>• Up to 10 active job postings</li>
                <li>• Full applicant tracking system</li>
                <li>• Candidate conversion analytics</li>
                <li>• Email candidate notifications</li>
              </ul>
            </div>
            {recruiterPlan.name !== "Growth" && (
              <button
                type="button"
                onClick={() => handleUpgrade("Growth")}
                disabled={upgradingPlan !== null}
                className="mt-6 w-full rounded-xl bg-brand py-2 text-xs font-semibold text-white shadow-md hover:bg-brand/90 disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                {upgradingPlan === "Growth" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                <span>Switch to Growth ($49/mo)</span>
              </button>
            )}
          </div>

          {/* Enterprise Tier */}
          <div className={`rounded-2xl border p-6 flex flex-col justify-between ${recruiterPlan.name === "Enterprise" ? "border-brand bg-brand/10 ring-1 ring-brand" : "border-white/10 bg-[#0d0d12]"}`}>
            <div>
              <div className="flex items-center justify-between">
                <h4 className="font-manrope font-bold text-white">Enterprise Plan</h4>
                {recruiterPlan.name === "Enterprise" && <span className="text-[10px] bg-brand text-white px-2 py-0.5 rounded-full font-bold">Active</span>}
              </div>
              <p className="mt-1 text-xs text-white/60">Full recruitment suite for scaling organizations.</p>
              <div className="mt-4 font-space-mono text-2xl font-bold text-white">$149 <span className="text-xs text-white/40">/month</span></div>
              <ul className="mt-4 space-y-2 text-xs text-white/70">
                <li>• Up to 50 active job postings</li>
                <li>• Featured placement on top feeds</li>
                <li>• Advanced analytics dashboard</li>
                <li>• Multi-seat team collaboration</li>
                <li>• Custom branding & priority support</li>
              </ul>
            </div>
            {recruiterPlan.name !== "Enterprise" && (
              <button
                type="button"
                onClick={() => handleUpgrade("Enterprise")}
                disabled={upgradingPlan !== null}
                className="mt-6 w-full rounded-xl bg-brand py-2 text-xs font-semibold text-white shadow-md hover:bg-brand/90 disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                {upgradingPlan === "Enterprise" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                <span>Upgrade to Enterprise ($149/mo)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Recruiter Payment History */}
      <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-6 shadow-xl">
        <h3 className="font-manrope text-base font-bold text-white mb-4">Billing & Receipt Log</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 text-white/50 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Plan</th>
                <th className="py-3 px-3">Amount</th>
                <th className="py-3 px-3">Transaction ID</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {payments.map((p) => (
                <tr key={p.id}>
                  <td className="py-3.5 px-3 text-white/60">{p.date}</td>
                  <td className="py-3.5 px-3 font-semibold text-white">{p.plan}</td>
                  <td className="py-3.5 px-3 font-mono">${p.amount}.00</td>
                  <td className="py-3.5 px-3 font-mono text-white/50 text-[11px]">{p.id}</td>
                  <td className="py-3.5 px-3 text-right">
                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
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
