"use client"

import * as React from "react"
import Link from "next/link"
import { Building2, CheckCircle2, ChevronRight, Loader2, Save, User } from "lucide-react"

import { useDashboard } from "@/lib/dashboard-context"
import { useSession } from "@/lib/auth-client"

export default function RecruiterSettingsPage() {
  const { data: session } = useSession()
  const { myCompany } = useDashboard()

  const [name, setName] = React.useState(session?.user?.name || "Elena Rostova")
  const [email, setEmail] = React.useState(session?.user?.email || "recruiter@meta.com")
  const [title, setTitle] = React.useState("Lead Technical Recruiter")
  const [isSaving, setIsSaving] = React.useState(false)
  const [saveSuccess, setSaveSuccess] = React.useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 600))
    setIsSaving(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="space-y-8 pb-12 max-w-3xl">
      <div className="border-b border-white/10 pb-5">
        <h1 className="font-manrope text-2xl font-bold text-white">Recruiter Personal Settings</h1>
        <p className="text-xs sm:text-sm text-white/60">
          Update your hiring persona and manage your linked company affiliations.
        </p>
      </div>

      {saveSuccess && (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Profile changes updated successfully!</span>
        </div>
      )}

      {/* Linked Company Quick Tile */}
      <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-5 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/20 text-brand-light">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs text-white/50 block">Linked Employer</span>
            <span className="font-bold text-white text-sm">{myCompany?.name || "No Company Linked"}</span>
          </div>
        </div>

        <Link
          href="/dashboard/recruiter/company"
          className="inline-flex items-center gap-1 text-xs text-brand-light font-semibold hover:underline"
        >
          <span>Manage Company</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-6 shadow-xl space-y-4">
          <h3 className="font-manrope text-base font-bold text-white">Contact & Profile</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-white/70 block mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#14141c] px-3.5 py-2.5 text-xs text-white focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-white/70 block mb-1.5">Work Email Address</label>
              <input
                type="email"
                disabled
                value={email}
                className="w-full rounded-xl border border-white/5 bg-[#14141c]/50 px-3.5 py-2.5 text-xs text-white/50 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-white/70 block mb-1.5">Recruiter Role / Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Lead Talent Partner"
              className="w-full rounded-xl border border-white/10 bg-[#14141c] px-3.5 py-2.5 text-xs text-white focus:border-brand focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-7 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-brand/90 disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  )
}
