"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Briefcase, Building2, CheckCircle2, DollarSign, PlusCircle, Sparkles } from "lucide-react"

import { useDashboard } from "@/lib/dashboard-context"

export default function PostNewJobPage() {
  const router = useRouter()
  const { myCompany, addJob, recruiterPlan, recruiterJobs } = useDashboard()

  const [title, setTitle] = React.useState("")
  const [category, setCategory] = React.useState("Engineering")
  const [jobType, setJobType] = React.useState<"Full-time" | "Part-time" | "Remote" | "Contract" | "Internship">("Full-time")
  const [salaryMin, setSalaryMin] = React.useState("150000")
  const [salaryMax, setSalaryMax] = React.useState("200000")
  const [location, setLocation] = React.useState("San Francisco, CA")
  const [isRemote, setIsRemote] = React.useState(true)
  const [deadline, setDeadline] = React.useState("Dec 31, 2026")
  const [overview, setOverview] = React.useState("")
  const [responsibilitiesText, setResponsibilitiesText] = React.useState("")
  const [requirementsText, setRequirementsText] = React.useState("")
  const [benefitsText, setBenefitsText] = React.useState("")
  const [tagsInput, setTagsInput] = React.useState("TypeScript, React, Next.js")

  const activeCount = recruiterJobs.filter((j) => myCompany && j.companyId === myCompany.id && j.status !== "Closed").length
  const isLimitReached = activeCount >= recruiterPlan.activeJobsLimit

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const responsibilities = responsibilitiesText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean)

    const requirements = requirementsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean)

    const benefits = benefitsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean)

    const tags = tagsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)

    const success = addJob({
      title,
      category,
      jobType,
      location: isRemote ? `${location} (Remote)` : location,
      isRemote,
      salaryMin: Number(salaryMin) || 0,
      salaryMax: Number(salaryMax) || 0,
      currency: "USD",
      salary: `$${Number(salaryMin).toLocaleString()} - $${Number(salaryMax).toLocaleString()}`,
      experienceLevel: "Senior",
      deadline,
      overview,
      responsibilities: responsibilities.length > 0 ? responsibilities : ["Collaborate on architectural design and execution."],
      requirements: requirements.length > 0 ? requirements : ["3+ years relevant engineering experience."],
      benefits: benefits.length > 0 ? benefits : ["Comprehensive medical, dental, and equity grants."],
      tags: tags.length > 0 ? tags : ["Tech"],
    })

    if (success) {
      router.push("/dashboard/recruiter/jobs")
    }
  }

  if (!myCompany) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#0d0d12] p-12 text-center text-xs">
        <Building2 className="mx-auto h-12 w-12 text-white/30" />
        <h3 className="mt-4 font-manrope text-base font-bold text-white">No company registered</h3>
        <p className="mt-1 text-white/60">You must register and verify a company before posting job openings.</p>
        <Link href="/dashboard/recruiter/company" className="mt-5 inline-block rounded-xl bg-brand px-5 py-2 font-semibold text-white">
          Register Company
        </Link>
      </div>
    )
  }

  if (myCompany.status !== "Approved") {
    return (
      <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-8 text-center text-xs text-yellow-300">
        <Building2 className="mx-auto h-12 w-12 text-yellow-400" />
        <h3 className="mt-4 font-manrope text-lg font-bold text-white">Company Verification Pending</h3>
        <p className="mt-2 text-white/70">
          Your company <strong className="text-white">{myCompany.name}</strong> is awaiting verification by Platform Admin. You will be able to post jobs immediately once approved.
        </p>
        <Link href="/dashboard/recruiter/company" className="mt-5 inline-block rounded-xl bg-brand px-5 py-2 font-semibold text-white">
          View Company Status
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div>
          <Link href="/dashboard/recruiter/jobs" className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white mb-2">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to jobs list</span>
          </Link>
          <h1 className="font-manrope text-2xl font-bold text-white">Create a New Job Listing</h1>
          <p className="text-xs sm:text-sm text-white/60">
            Publishing as <strong className="text-white">{myCompany.name}</strong> ({activeCount}/{recruiterPlan.activeJobsLimit} active slots used)
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Job Info */}
        <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-6 shadow-xl space-y-4">
          <h3 className="font-manrope text-base font-bold text-white flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-brand-light" />
            <span>Job Identification & Meta</span>
          </h3>

          <div>
            <label className="text-xs font-semibold text-white/70 block mb-1.5">Job Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Senior Machine Learning Engineer"
              className="w-full rounded-xl border border-white/10 bg-[#14141c] px-3.5 py-2.5 text-xs text-white focus:border-brand focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-white/70 block mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#14141c] px-3.5 py-2.5 text-xs text-white focus:border-brand focus:outline-none"
              >
                {["Engineering", "AI", "Design", "Product", "Marketing", "DevOps"].map((cat) => (
                  <option key={cat} value={cat} className="bg-[#121217]">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-white/70 block mb-1.5">Employment Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value as any)}
                className="w-full rounded-xl border border-white/10 bg-[#14141c] px-3.5 py-2.5 text-xs text-white focus:border-brand focus:outline-none"
              >
                {["Full-time", "Part-time", "Remote", "Contract", "Internship"].map((t) => (
                  <option key={t} value={t} className="bg-[#121217]">
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Salary Min / Max */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-white/70 block mb-1.5">Min Salary ($ USD)</label>
              <input
                type="number"
                required
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
                placeholder="140000"
                className="w-full rounded-xl border border-white/10 bg-[#14141c] px-3.5 py-2.5 text-xs text-white focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-white/70 block mb-1.5">Max Salary ($ USD)</label>
              <input
                type="number"
                required
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
                placeholder="190000"
                className="w-full rounded-xl border border-white/10 bg-[#14141c] px-3.5 py-2.5 text-xs text-white focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-white/70 block mb-1.5">Application Deadline</label>
              <input
                type="text"
                required
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="Jan 31, 2027"
                className="w-full rounded-xl border border-white/10 bg-[#14141c] px-3.5 py-2.5 text-xs text-white focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-semibold text-white/70 block mb-1.5">Location</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="San Francisco, CA"
                className="w-full rounded-xl border border-white/10 bg-[#14141c] px-3.5 py-2.5 text-xs text-white focus:border-brand focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="isRemote"
                checked={isRemote}
                onChange={(e) => setIsRemote(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-[#14141c] text-brand focus:ring-brand"
              />
              <label htmlFor="isRemote" className="text-xs font-medium text-white/80 cursor-pointer">
                Remote eligible position
              </label>
            </div>
          </div>
        </div>

        {/* Section 2: Descriptions */}
        <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-6 shadow-xl space-y-4">
          <h3 className="font-manrope text-base font-bold text-white">Job Description & Details</h3>

          <div>
            <label className="text-xs font-semibold text-white/70 block mb-1.5">Role Overview</label>
            <textarea
              rows={3}
              required
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              placeholder="High level overview of what this role tackles..."
              className="w-full rounded-xl border border-white/10 bg-[#14141c] p-3 text-xs text-white focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-white/70 block mb-1.5">Key Responsibilities (One per line)</label>
            <textarea
              rows={4}
              value={responsibilitiesText}
              onChange={(e) => setResponsibilitiesText(e.target.value)}
              placeholder="Architect distributed systems&#10;Lead sprint planning and code reviews&#10;Mentor engineers..."
              className="w-full rounded-xl border border-white/10 bg-[#14141c] p-3 text-xs text-white focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-white/70 block mb-1.5">Requirements & Qualifications (One per line)</label>
            <textarea
              rows={4}
              value={requirementsText}
              onChange={(e) => setRequirementsText(e.target.value)}
              placeholder="5+ years in TypeScript / Node.js&#10;Experience deploying on Kubernetes&#10;BS or equivalent in Computer Science..."
              className="w-full rounded-xl border border-white/10 bg-[#14141c] p-3 text-xs text-white focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-white/70 block mb-1.5">Skills & Tech Stack Tags (comma-separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="React, Next.js, Docker, GCP"
              className="w-full rounded-xl border border-white/10 bg-[#14141c] px-3.5 py-2.5 text-xs text-white focus:border-brand focus:outline-none"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 pt-2">
          <Link
            href="/dashboard/recruiter/jobs"
            className="rounded-xl border border-white/15 px-5 py-2.5 text-xs font-semibold text-white/70 hover:text-white"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isLimitReached}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-7 py-2.5 text-xs font-semibold text-white shadow-lg hover:bg-brand/90 disabled:opacity-50"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Publish Job Listing</span>
          </button>
        </div>
      </form>
    </div>
  )
}
