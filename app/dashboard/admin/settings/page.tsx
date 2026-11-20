"use client"

import * as React from "react"
import { CheckCircle2, Loader2, Save, ShieldCheck } from "lucide-react"

import { useSession } from "@/lib/auth-client"

export default function AdminSettingsPage() {
  const { data: session } = useSession()

  const [name, setName] = React.useState(session?.user?.name || "HireLoop Platform Admin")
  const [email, setEmail] = React.useState(session?.user?.email || "admin@hireloop.io")
  const [platformTitle, setPlatformTitle] = React.useState("HireLoop Global Operator")
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
        <h1 className="font-manrope text-2xl font-bold text-white">Administrator Profile & Security</h1>
        <p className="text-xs sm:text-sm text-white/60">
          Manage system operator credentials, notifications, and security settings.
        </p>
      </div>

      {saveSuccess && (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Admin configuration successfully updated!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-6 shadow-xl space-y-4">
          <h3 className="font-manrope text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-purple-400" />
            <span>Admin Credentials</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-white/70 block mb-1.5">Administrator Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#14141c] px-3.5 py-2.5 text-xs text-white focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-white/70 block mb-1.5">Admin Email Address</label>
              <input
                type="email"
                disabled
                value={email}
                className="w-full rounded-xl border border-white/5 bg-[#14141c]/50 px-3.5 py-2.5 text-xs text-white/50 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-white/70 block mb-1.5">Platform Designation</label>
            <input
              type="text"
              value={platformTitle}
              onChange={(e) => setPlatformTitle(e.target.value)}
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
            <span>Save Admin Settings</span>
          </button>
        </div>
      </form>
    </div>
  )
}
