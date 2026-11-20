"use client"

import * as React from "react"
import Link from "next/link"
import { CheckCircle2, CreditCard, Sparkles, Zap, ArrowRight, ShieldCheck, Loader2 } from "lucide-react"

import { useDashboard } from "@/lib/dashboard-context"

export default function SeekerBillingPage() {
  const { seekerPlan, upgradeSeekerPlan, payments } = useDashboard()
  const [upgradingPlan, setUpgradingPlan] = React.useState<string | null>(null)
  const [successToast, setSuccessToast] = React.useState<string | null>(null)

  const handleUpgrade = async (planName: "Free" | "Pro" | "Premium") => {
    setUpgradingPlan(planName)
    // Simulate Stripe checkout redirect / webhook execution
    await new Promise((resolve) => setTimeout(resolve, 1000))
    upgradeSeekerPlan(planName)
    setUpgradingPlan(null)
    setSuccessToast(`Successfully upgraded to ${planName} Plan! Your application quota is refreshed.`)
    setTimeout(() => setSuccessToast(null), 4000)
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-white/10 pb-5">
        <h1 className="font-manrope text-2xl font-bold text-white">Seeker Subscription & Billing</h1>
        <p className="text-xs sm:text-sm text-white/60">
          Manage your monthly application allocation, upgrade tiers, and view past billing receipts.
        </p>
      </div>

      {/* Success Notification */}
      {successToast && (
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-400">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Current Plan Card */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#121218]/95 to-[#09090d]/98 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="font-space-mono text-xs uppercase tracking-wider text-brand-light">
              Current Active Tier
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <h2 className="font-manrope text-3xl font-extrabold text-white sm:text-4xl">
                {seekerPlan.name} Plan
              </h2>
              <span className="font-space-mono text-sm text-white/50">
                ${seekerPlan.price}/month
              </span>
            </div>
            <p className="mt-2 text-xs text-white/60">
              Applications quota resets automatically on the 1st of each calendar month.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end rounded-2xl border border-white/10 bg-[#16161f] p-4 text-right">
            <span className="text-xs text-white/50">Monthly Applications Used</span>
            <span className="font-space-mono text-2xl font-bold text-white mt-1">
              {seekerPlan.applicationsUsed} / {seekerPlan.applicationsLimit === Infinity ? "∞" : seekerPlan.applicationsLimit}
            </span>
            <div className="mt-2 w-48 h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-brand rounded-full transition-all duration-500"
                style={{
                  width: `${
                    seekerPlan.applicationsLimit === Infinity
                      ? 100
                      : Math.min((seekerPlan.applicationsUsed / seekerPlan.applicationsLimit) * 100, 100)
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Options Grid */}
      <div>
        <h3 className="font-manrope text-lg font-bold text-white mb-4">Available Seeker Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free Tier */}
          <div className={`rounded-2xl border p-6 flex flex-col justify-between ${seekerPlan.name === "Free" ? "border-brand bg-brand/10 ring-1 ring-brand" : "border-white/10 bg-[#0d0d12]"}`}>
            <div>
              <div className="flex items-center justify-between">
                <h4 className="font-manrope font-bold text-white">Free Plan</h4>
                {seekerPlan.name === "Free" && <span className="text-[10px] bg-brand text-white px-2 py-0.5 rounded-full font-bold">Active</span>}
              </div>
              <p className="mt-1 text-xs text-white/60">Essential browsing & limited monthly applications.</p>
              <div className="mt-4 font-space-mono text-2xl font-bold text-white">$0 <span className="text-xs text-white/40">forever</span></div>
              <ul className="mt-4 space-y-2 text-xs text-white/70">
                <li>• 3 applications per month</li>
                <li>• Up to 10 saved jobs</li>
                <li>• Standard email notifications</li>
              </ul>
            </div>
            {seekerPlan.name !== "Free" && (
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

          {/* Pro Tier */}
          <div className={`rounded-2xl border p-6 flex flex-col justify-between ${seekerPlan.name === "Pro" ? "border-brand bg-brand/10 ring-1 ring-brand" : "border-white/10 bg-[#0d0d12]"}`}>
            <div>
              <div className="flex items-center justify-between">
                <h4 className="font-manrope font-bold text-white">Pro Plan</h4>
                {seekerPlan.name === "Pro" && <span className="text-[10px] bg-brand text-white px-2 py-0.5 rounded-full font-bold">Active</span>}
              </div>
              <p className="mt-1 text-xs text-white/60">Apply aggressively and unlock salary insights.</p>
              <div className="mt-4 font-space-mono text-2xl font-bold text-white">$19 <span className="text-xs text-white/40">/month</span></div>
              <ul className="mt-4 space-y-2 text-xs text-white/70">
                <li>• 30 applications per month</li>
                <li>• Unlimited saved jobs</li>
                <li>• Transparent salary insights</li>
                <li>• Full application tracking</li>
              </ul>
            </div>
            {seekerPlan.name !== "Pro" && (
              <button
                type="button"
                onClick={() => handleUpgrade("Pro")}
                disabled={upgradingPlan !== null}
                className="mt-6 w-full rounded-xl bg-brand py-2 text-xs font-semibold text-white shadow-md hover:bg-brand/90 disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                {upgradingPlan === "Pro" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                <span>Switch to Pro ($19/mo)</span>
              </button>
            )}
          </div>

          {/* Premium Tier */}
          <div className={`rounded-2xl border p-6 flex flex-col justify-between ${seekerPlan.name === "Premium" ? "border-brand bg-brand/10 ring-1 ring-brand" : "border-white/10 bg-[#0d0d12]"}`}>
            <div>
              <div className="flex items-center justify-between">
                <h4 className="font-manrope font-bold text-white">Premium Plan</h4>
                {seekerPlan.name === "Premium" && <span className="text-[10px] bg-brand text-white px-2 py-0.5 rounded-full font-bold">Active</span>}
              </div>
              <p className="mt-1 text-xs text-white/60">Unlimited applications and priority boost.</p>
              <div className="mt-4 font-space-mono text-2xl font-bold text-white">$39 <span className="text-xs text-white/40">/month</span></div>
              <ul className="mt-4 space-y-2 text-xs text-white/70">
                <li>• Unlimited applications</li>
                <li>• Candidate profile boost to recruiters</li>
                <li>• 48-hour early access to new jobs</li>
                <li>• Priority 24/7 support</li>
              </ul>
            </div>
            {seekerPlan.name !== "Premium" && (
              <button
                type="button"
                onClick={() => handleUpgrade("Premium")}
                disabled={upgradingPlan !== null}
                className="mt-6 w-full rounded-xl bg-brand py-2 text-xs font-semibold text-white shadow-md hover:bg-brand/90 disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                {upgradingPlan === "Premium" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                <span>Upgrade to Premium ($39/mo)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Payment History Table */}
      <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-6 shadow-xl">
        <h3 className="font-manrope text-base font-bold text-white mb-4">Payment & Invoicing History</h3>
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
