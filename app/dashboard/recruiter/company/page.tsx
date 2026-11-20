"use client"

import * as React from "react"
import Image from "next/image"
import { Building2, CheckCircle2, Globe, MapPin, Save, ShieldCheck, Users, AlertCircle } from "lucide-react"

import { useDashboard } from "@/lib/dashboard-context"

export default function RecruiterCompanyPage() {
  const { myCompany, registerOrUpdateCompany } = useDashboard()

  const [name, setName] = React.useState(myCompany?.name || "")
  const [industry, setIndustry] = React.useState(myCompany?.industry || "Developer Tools")
  const [website, setWebsite] = React.useState(myCompany?.website || "")
  const [location, setLocation] = React.useState(myCompany?.location || "")
  const [employeeCount, setEmployeeCount] = React.useState(myCompany?.employeeCount || "50 - 200")
  const [description, setDescription] = React.useState(myCompany?.description || "")
  const [logo, setLogo] = React.useState(myCompany?.logo || "/logos/google.png")
  const [savedSuccess, setSavedSuccess] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    registerOrUpdateCompany({
      name,
      industry,
      website,
      location,
      employeeCount,
      description,
      logo,
      status: "Pending", // newly updated company requires admin review
    })
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3500)
  }

  const industriesList = [
    "AI",
    "Developer Tools",
    "E-Commerce",
    "Fintech",
    "Media & Entertainment",
    "Autonomous Tech",
    "Productivity",
  ]

  const sizeRanges = ["1 - 10", "10 - 50", "50 - 200", "200 - 1,000", "1,000 - 10,000", "10,000+"]

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      <div className="border-b border-white/10 pb-5">
        <h1 className="font-manrope text-2xl font-bold text-white">Company Profile & Verification</h1>
        <p className="text-xs sm:text-sm text-white/60">
          Manage your organization profile. Changes require Platform Admin approval before appearing publicly.
        </p>
      </div>

      {/* Status Alert Banner */}
      {myCompany && (
        <div
          className={`rounded-2xl border p-4 text-xs flex items-center justify-between ${
            myCompany.status === "Approved"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
              : myCompany.status === "Pending"
              ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
              : "border-red-500/30 bg-red-500/10 text-red-400"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {myCompany.status === "Approved" ? (
              <CheckCircle2 className="h-5 w-5 shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0" />
            )}
            <div>
              <p className="font-semibold text-sm">
                Company Status: <span className="uppercase">{myCompany.status}</span>
              </p>
              <p className="text-[11px] opacity-80">
                {myCompany.status === "Approved"
                  ? "Your organization is verified and all jobs are publicly visible in the marketplace."
                  : myCompany.status === "Pending"
                  ? "Your registration is currently under review by HireLoop administrators."
                  : "Registration declined. Please verify company details and resubmit."}
              </p>
            </div>
          </div>
        </div>
      )}

      {savedSuccess && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-400 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Company profile saved! Status is now Pending Admin approval.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-6 shadow-xl space-y-4">
          <h3 className="font-manrope text-base font-bold text-white">General Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-white/70 block mb-1.5">Company Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Acme AI Corp"
                className="w-full rounded-xl border border-white/10 bg-[#14141c] px-3.5 py-2.5 text-xs text-white focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-white/70 block mb-1.5">Primary Industry</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#14141c] px-3.5 py-2.5 text-xs text-white focus:border-brand focus:outline-none"
              >
                {industriesList.map((ind) => (
                  <option key={ind} value={ind} className="bg-[#121217]">
                    {ind}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-white/70 block mb-1.5">Website URL</label>
              <input
                type="url"
                required
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://company.com"
                className="w-full rounded-xl border border-white/10 bg-[#14141c] px-3.5 py-2.5 text-xs text-white focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-white/70 block mb-1.5">Headquarters Location</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA"
                className="w-full rounded-xl border border-white/10 bg-[#14141c] px-3.5 py-2.5 text-xs text-white focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-white/70 block mb-1.5">Employee Count Range</label>
              <select
                value={employeeCount}
                onChange={(e) => setEmployeeCount(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#14141c] px-3.5 py-2.5 text-xs text-white focus:border-brand focus:outline-none"
              >
                {sizeRanges.map((size) => (
                  <option key={size} value={size} className="bg-[#121217]">
                    {size} employees
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-white/70 block mb-1.5">Logo URL or Asset Path</label>
              <input
                type="text"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                placeholder="/logos/google.png"
                className="w-full rounded-xl border border-white/10 bg-[#14141c] px-3.5 py-2.5 text-xs text-white focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-white/70 block mb-1.5">Short Description</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a high-impact summary of your mission and products..."
              className="w-full rounded-xl border border-white/10 bg-[#14141c] p-3 text-xs text-white focus:border-brand focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-7 py-3 text-xs font-semibold text-white shadow-lg hover:bg-brand/90"
          >
            <Save className="h-4 w-4" />
            <span>Submit for Verification</span>
          </button>
        </div>
      </form>
    </div>
  )
}
