"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Bookmark,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  DollarSign,
  FileText,
  Globe,
  Loader2,
  Lock,
  MapPin,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  X,
} from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { mockJobs, mockCompanies, Job } from "@/lib/mock-data"
import { useSession } from "@/lib/auth-client"
import { useDashboard } from "@/lib/dashboard-context"

export default function JobDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params?.jobId as string

  const { data: session } = useSession()
  const { seekerPlan, submitApplication, openPaymentModal, applications } = useDashboard()
  const [isSaved, setIsSaved] = React.useState(false)
  const [isApplyModalOpen, setIsApplyModalOpen] = React.useState(false)
  const [coverLetter, setCoverLetter] = React.useState("")
  const [selectedResume, setSelectedResume] = React.useState("My_Engineering_Resume_2026.pdf")
  const [isSubmittingApplication, setIsSubmittingApplication] = React.useState(false)
  const [applicationSubmitted, setApplicationSubmitted] = React.useState(false)
  const [copiedLink, setCopiedLink] = React.useState(false)

  // Find job data
  const job = mockJobs.find((j) => j.id === jobId) || mockJobs[0]
  const company = mockCompanies.find((c) => c.id === job.companyId) || mockCompanies[0]

  // Check if already applied
  const isAlreadyApplied = applications.some((app) => app.jobId === job.id) || applicationSubmitted

  // Similar jobs (same category or company, excluding current)
  const similarJobs = mockJobs
    .filter((j) => j.id !== job.id && (j.category === job.category || j.companyId === job.companyId))
    .slice(0, 3)

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    }
  }

  const handleApplyClick = () => {
    if (!session?.user) {
      router.push(`/sign-in?redirect=/jobs/${job.id}`)
      return
    }

    // 10-job quota limit check on Free tier
    if (seekerPlan.applicationsLimit !== Infinity && seekerPlan.applicationsUsed >= seekerPlan.applicationsLimit) {
      openPaymentModal(
        "Pro",
        `You have used all ${seekerPlan.applicationsLimit} applications included in the Free tier. Upgrade to Pro ($19/mo) or Premium ($39/mo) to submit more applications!`
      )
      return
    }

    setIsApplyModalOpen(true)
  }

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingApplication(true)

    const success = await submitApplication(job.id, coverLetter, selectedResume)
    setIsSubmittingApplication(false)

    if (success) {
      setApplicationSubmitted(true)
    } else {
      setIsApplyModalOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#010103] text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Top Breadcrumb & Actions Bar */}
        <div className="border-b border-white/10 bg-[#07070b]/60 backdrop-blur-md">
          <div className="mx-auto flex max-w-[1320px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/60 transition-colors hover:text-white sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to all jobs</span>
            </Link>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/70 transition-colors hover:border-white/20 hover:text-white"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>{copiedLink ? "Link Copied!" : "Share"}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsSaved(!isSaved)}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs transition-colors ${
                  isSaved
                    ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
                    : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/20 hover:text-white"
                }`}
              >
                <Bookmark className={`h-3.5 w-3.5 ${isSaved ? "fill-current" : ""}`} />
                <span>{isSaved ? "Saved" : "Save Job"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Job Banner */}
        <section className="relative border-b border-white/10 bg-gradient-to-b from-[#0d0d14] via-[#09090d] to-[#010103] py-10 sm:py-14">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              {/* Job Title & Company Header */}
              <div className="flex items-start gap-5">
                <Link
                  href={`/companies/${company.id}`}
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#141419] p-3 shadow-lg transition-transform hover:scale-105 sm:h-20 sm:w-20"
                >
                  <Image
                    src={job.companyLogo}
                    alt={job.companyName}
                    width={56}
                    height={56}
                    className="max-h-12 w-auto object-contain brightness-125"
                  />
                </Link>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/companies/${company.id}`}
                      className="text-sm font-semibold text-brand-light hover:underline"
                    >
                      {job.companyName}
                    </Link>
                    <span className="text-white/30">•</span>
                    <span className="text-xs text-white/50">{job.location}</span>
                    <span className="text-white/30">•</span>
                    <span className="text-xs text-white/50">Posted {job.postedAt}</span>
                  </div>

                  <h1 className="font-manrope mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                    {job.title}
                  </h1>

                  {/* Pills */}
                  <div className="mt-4 flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#161620] px-3 py-1 text-xs font-medium text-white">
                      <Briefcase className="h-3.5 w-3.5 text-brand-light" />
                      {job.jobType}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/[0.04] px-3 py-1 text-xs text-white/80">
                      <MapPin className="h-3.5 w-3.5 text-white/40" />
                      {job.isRemote ? "Remote Eligible" : "On-site"}
                    </span>
                    <span className="rounded-lg border border-white/5 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
                      {job.category}
                    </span>
                    <span className="rounded-lg border border-white/5 bg-white/[0.04] px-3 py-1 text-xs text-white/70">
                      {job.experienceLevel} Level
                    </span>
                  </div>
                </div>
              </div>

              {/* Salary & Primary Apply Button */}
              <div className="flex flex-col items-start gap-4 rounded-2xl border border-white/10 bg-[#101015]/90 p-6 shadow-xl backdrop-blur-xl lg:items-end">
                <div>
                  <span className="block text-xs uppercase tracking-wider text-white/50">
                    Compensation Band
                  </span>
                  <span className="font-space-mono text-2xl font-bold text-white sm:text-3xl">
                    {job.salary}
                  </span>
                  <span className="block text-xs text-white/40">Includes equity + bonus potential</span>
                </div>

                <button
                  type="button"
                  onClick={isAlreadyApplied ? undefined : handleApplyClick}
                  disabled={isAlreadyApplied}
                  className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-8 text-sm font-semibold transition-all sm:w-auto ${
                    isAlreadyApplied
                      ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 cursor-default"
                      : "bg-brand text-white shadow-[0_0_24px_rgba(92,83,254,0.4)] hover:bg-brand/90 hover:shadow-[0_0_32px_rgba(92,83,254,0.6)] active:scale-[0.98]"
                  }`}
                >
                  {isAlreadyApplied ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Application Submitted</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <span>Apply For This Role</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Details Body */}
        <div className="mx-auto max-w-[1320px] px-4 pt-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Left 2 Cols: Description, Responsibilities, Requirements */}
            <div className="lg:col-span-2 space-y-10">
              {/* Role Overview */}
              <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-6 sm:p-8 shadow-xl">
                <h2 className="font-manrope text-xl font-bold text-white">About The Position</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
                  {job.overview}
                </p>

                {/* Key Responsibilities */}
                <div className="mt-8">
                  <h3 className="font-manrope text-lg font-bold text-white">Key Responsibilities</h3>
                  <ul className="mt-4 space-y-3">
                    {job.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-white/75">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-light" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements & Qualifications */}
                <div className="mt-8 border-t border-white/10 pt-8">
                  <h3 className="font-manrope text-lg font-bold text-white">Role Requirements</h3>
                  <ul className="mt-4 space-y-3">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-white/75">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Perks & Benefits */}
                <div className="mt-8 border-t border-white/10 pt-8">
                  <h3 className="font-manrope text-lg font-bold text-white">Benefits & Perks</h3>
                  <ul className="mt-4 space-y-3">
                    {job.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-white/75">
                        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Apply Box */}
              <div className="rounded-2xl border border-brand/30 bg-gradient-to-r from-brand/10 via-[#101016] to-brand/10 p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-manrope text-xl font-bold text-white">Interested in joining {job.companyName}?</h3>
                  <p className="mt-1 text-xs text-white/60">
                    Application deadline: {job.deadline}. Free tier includes up to 10 applications.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={isAlreadyApplied ? undefined : handleApplyClick}
                  disabled={isAlreadyApplied}
                  className={`rounded-xl px-7 py-3 text-sm font-semibold transition-all ${
                    isAlreadyApplied
                      ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 cursor-default"
                      : "bg-brand text-white shadow-lg hover:bg-brand/90 hover:shadow-[0_0_24px_rgba(92,83,254,0.5)]"
                  }`}
                >
                  {isAlreadyApplied ? "Application Submitted" : "Apply Now"}
                </button>
              </div>
            </div>

            {/* Right 1 Col: Company Info Card & Metadata */}
            <div className="space-y-6">
              {/* Company Card */}
              <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#16161c] p-2.5">
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={44}
                      height={44}
                      className="max-h-8 w-auto object-contain brightness-125"
                    />
                  </div>
                  <div>
                    <h3 className="font-manrope text-base font-bold text-white">{company.name}</h3>
                    <span className="text-xs text-brand-light">{company.industry}</span>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-white/70">
                  {company.description}
                </p>

                {/* Company Specs List */}
                <div className="mt-6 space-y-3 border-t border-white/10 pt-4 text-xs text-white/80">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-white/50">
                      <Building2 className="h-4 w-4" /> Team Size
                    </span>
                    <span className="font-medium text-white">{company.employeeCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-white/50">
                      <MapPin className="h-4 w-4" /> Headquarters
                    </span>
                    <span className="font-medium text-white">{company.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-white/50">
                      <Calendar className="h-4 w-4" /> Founded
                    </span>
                    <span className="font-medium text-white">{company.founded}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-white/50">
                      <Globe className="h-4 w-4" /> Website
                    </span>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-light hover:underline"
                    >
                      Visit site
                    </a>
                  </div>
                </div>

                <Link
                  href={`/companies/${company.id}`}
                  className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.04] py-2.5 text-xs font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/[0.08]"
                >
                  <span>View Company Profile & Jobs ({company.openJobsCount})</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Application Details Summary */}
              <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-6 shadow-xl text-xs space-y-3">
                <h4 className="font-manrope text-sm font-bold text-white">Application Summary</h4>
                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-white/50">Role ID</span>
                  <span className="font-mono text-white/80">{job.id}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-white/50">Deadline</span>
                  <span className="text-white/80">{job.deadline}</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-white/50">Verification</span>
                  <span className="flex items-center gap-1 text-emerald-400 font-medium">
                    <ShieldCheck className="h-3.5 w-3.5" /> Verified Recruiter
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Jobs Section */}
          <div className="mt-20 border-t border-white/10 pt-12">
            <h2 className="font-manrope text-2xl font-bold text-white">Similar Positions You May Like</h2>
            <p className="mt-1 text-sm text-white/60">Explore related roles in {job.category}</p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similarJobs.map((simJob) => (
                <Link
                  key={simJob.id}
                  href={`/jobs/${simJob.id}`}
                  className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d0d12]/90 p-5 shadow-lg transition-all hover:border-brand/40 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#16161c] p-2">
                        <Image
                          src={simJob.companyLogo}
                          alt={simJob.companyName}
                          width={32}
                          height={32}
                          className="max-h-6 w-auto object-contain brightness-125"
                        />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-brand-light">{simJob.companyName}</span>
                        <div className="flex items-center gap-1 text-[11px] text-white/50">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate max-w-[130px]">{simJob.location}</span>
                        </div>
                      </div>
                    </div>

                    <h4 className="mt-4 font-manrope text-base font-bold text-white group-hover:text-brand-light transition-colors">
                      {simJob.title}
                    </h4>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="font-space-mono text-xs font-bold text-white">{simJob.salary}</span>
                    <span className="text-xs text-brand-light group-hover:translate-x-1 transition-transform inline-flex items-center">
                      Apply <ChevronRight className="h-3 w-3 ml-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Application Submission Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/20 bg-[#121217] p-6 sm:p-8 shadow-2xl">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => {
                setIsApplyModalOpen(false)
                setApplicationSubmitted(false)
              }}
              className="absolute top-5 right-5 rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {applicationSubmitted ? (
              <div className="flex flex-col items-center py-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <h3 className="font-manrope mt-5 text-2xl font-bold text-white">Application Submitted!</h3>
                <p className="mt-2 text-sm text-white/70">
                  Your application for <span className="font-semibold text-white">{job.title}</span> at <span className="text-white font-semibold">{job.companyName}</span> has been securely transmitted.
                </p>
                <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs text-white/60">
                  You can track status updates in your <span className="text-brand-light font-medium">Seeker Dashboard</span>.
                </div>
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="mt-8 rounded-xl bg-brand px-6 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-brand/90"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplicationSubmit}>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#16161c] p-2">
                    <Image
                      src={job.companyLogo}
                      alt={job.companyName}
                      width={36}
                      height={36}
                      className="max-h-7 w-auto object-contain brightness-125"
                    />
                  </div>
                  <div>
                    <h3 className="font-manrope text-lg font-bold text-white">Apply for {job.title}</h3>
                    <p className="text-xs text-white/60">{job.companyName} • {job.location}</p>
                  </div>
                </div>

                {/* Candidate Info Pill */}
                <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs flex items-center justify-between">
                  <div>
                    <span className="text-white/50 block">Applying as:</span>
                    <span className="font-semibold text-white">{session?.user?.name || "Candidate"}</span>
                  </div>
                  <span className="font-mono text-white/50 text-[11px]">{session?.user?.email}</span>
                </div>

                {/* Resume Selection */}
                <div className="mt-5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-white/70 block mb-2">
                    Select Resume
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-brand/40 bg-brand/10 p-3 text-xs text-white">
                    <FileText className="h-5 w-5 text-brand-light shrink-0" />
                    <span className="font-medium truncate flex-1">{selectedResume}</span>
                    <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      Ready
                    </span>
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="mt-5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-white/70 block mb-2">
                    Cover Letter or Brief Note (Optional)
                  </label>
                  <textarea
                    rows={4}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Introduce yourself, your tech strengths, and why you are excited for this role at Meta..."
                    className="w-full rounded-xl border border-white/10 bg-[#0d0d12] p-3 text-xs text-white placeholder:text-white/40 focus:border-brand focus:outline-none"
                  />
                </div>

                {/* Plan quota warning */}
                <div className="mt-4 flex items-center gap-2 text-[11px] text-white/50">
                  <Sparkles className="h-3.5 w-3.5 text-brand-light" />
                  <span>Free plan includes up to 3 applications/mo. Upgrade to Pro for 30 applications.</span>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex items-center justify-end gap-3 border-t border-white/10 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(false)}
                    className="rounded-xl border border-white/10 px-4 py-2.5 text-xs font-semibold text-white/70 hover:text-white"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmittingApplication}
                    className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-brand/90 disabled:opacity-50"
                  >
                    {isSubmittingApplication ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Transmitting Application...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Confirm & Submit</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
