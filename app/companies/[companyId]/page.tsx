"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  Bookmark,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  Globe,
  MapPin,
  Share2,
  Sparkles,
  Users,
} from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { mockCompanies, mockJobs } from "@/lib/mock-data"

export default function CompanyProfilePage() {
  const params = useParams()
  const companyId = params?.companyId as string

  const company = mockCompanies.find((c) => c.id === companyId) || mockCompanies[0]
  const companyJobs = mockJobs.filter((j) => j.companyId === company.id)

  return (
    <div className="min-h-screen bg-[#010103] text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Navigation Breadcrumb */}
        <div className="border-b border-white/10 bg-[#07070b]/60 backdrop-blur-md">
          <div className="mx-auto flex max-w-[1320px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link
              href="/companies"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/60 transition-colors hover:text-white sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to all companies</span>
            </Link>
          </div>
        </div>

        {/* Hero Company Banner */}
        <section className="relative border-b border-white/10 bg-gradient-to-b from-[#0d0d14] via-[#08080c] to-[#010103] py-12 sm:py-16">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              {/* Logo + Title */}
              <div className="flex items-start gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-[#141419] p-3.5 shadow-2xl">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={64}
                    height={64}
                    className="max-h-12 w-auto object-contain brightness-125"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="font-manrope text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                      {company.name}
                    </h1>
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  </div>

                  <p className="mt-2 text-sm text-brand-light font-medium">
                    {company.industry} • Founded {company.founded}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/70">
                    <span className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1">
                      <MapPin className="h-3.5 w-3.5 text-white/40" />
                      {company.location}
                    </span>
                    <span className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1">
                      <Users className="h-3.5 w-3.5 text-white/40" />
                      {company.employeeCount}
                    </span>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1 text-white hover:border-brand/40 hover:text-brand-light transition-colors"
                    >
                      <Globe className="h-3.5 w-3.5 text-white/40" />
                      <span>Official Website</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Stat Box */}
              <div className="flex items-center gap-6 rounded-2xl border border-white/10 bg-[#121217]/90 p-5 shadow-xl backdrop-blur-xl">
                <div>
                  <span className="block font-manrope text-3xl font-bold text-white">
                    {companyJobs.length}
                  </span>
                  <span className="text-xs text-white/60">Active Roles</span>
                </div>
                <span className="h-10 w-px bg-white/10" />
                <div>
                  <span className="block font-manrope text-3xl font-bold text-brand-light">
                    100%
                  </span>
                  <span className="text-xs text-white/60">Verified Employer</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Body Grid: Company About + Open Roles */}
        <div className="mx-auto max-w-[1320px] px-4 pt-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Left 2 Cols: About & Open Jobs */}
            <div className="lg:col-span-2 space-y-10">
              {/* About Section */}
              <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-6 sm:p-8 shadow-xl">
                <h2 className="font-manrope text-xl font-bold text-white">About {company.name}</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
                  {company.about}
                </p>

                {/* Tags / Culture */}
                <div className="mt-8">
                  <h3 className="font-manrope text-sm font-bold uppercase tracking-wider text-white/70">
                    Core Technologies & Domains
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {company.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-white/10 bg-[#16161f] px-3 py-1 text-xs font-medium text-white/85"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Open Job Listings */}
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h2 className="font-manrope text-xl font-bold text-white">
                    Current Openings at {company.name} ({companyJobs.length})
                  </h2>
                </div>

                {companyJobs.length === 0 ? (
                  <div className="mt-6 rounded-2xl border border-white/10 bg-[#0d0d12]/60 p-8 text-center text-sm text-white/60">
                    No active job postings right now. Check back soon!
                  </div>
                ) : (
                  <div className="mt-6 space-y-4">
                    {companyJobs.map((job) => (
                      <div
                        key={job.id}
                        className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-[#111116]/95 via-[#0c0c10]/95 to-[#070709]/98 p-5 sm:p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-brand/40"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div>
                            <Link
                              href={`/jobs/${job.id}`}
                              className="font-manrope text-lg font-bold text-white transition-colors group-hover:text-brand-light"
                            >
                              {job.title}
                            </Link>

                            <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs text-white/70">
                              <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-[#171720] px-2.5 py-0.5 text-[11px] font-medium text-white">
                                <Briefcase className="h-3 w-3 text-brand-light" />
                                {job.jobType}
                              </span>
                              <span className="inline-flex items-center gap-1 rounded-md border border-white/5 bg-white/[0.03] px-2.5 py-0.5 text-[11px] text-white/70">
                                <MapPin className="h-3 w-3 text-white/40" />
                                {job.location}
                              </span>
                              <span className="text-[11px] text-white/50">{job.postedAt}</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="font-space-mono text-base font-bold text-white">
                              {job.salary}
                            </span>
                          </div>
                        </div>

                        <p className="mt-3 text-xs leading-relaxed text-white/65 line-clamp-2">
                          {job.overview}
                        </p>

                        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                          <div className="flex flex-wrap gap-1.5">
                            {job.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/60"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <Link
                            href={`/jobs/${job.id}`}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-semibold text-white shadow-md transition-all hover:bg-brand/90"
                          >
                            <span>Apply</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right 1 Col: Quick Facts */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-6 shadow-xl">
                <h3 className="font-manrope text-base font-bold text-white">Company Overview</h3>

                <div className="mt-4 space-y-3.5 text-xs text-white/80">
                  <div className="flex items-center justify-between py-1 border-b border-white/5">
                    <span className="text-white/50">Industry</span>
                    <span className="font-medium text-white">{company.industry}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-white/5">
                    <span className="text-white/50">Employees</span>
                    <span className="font-medium text-white">{company.employeeCount}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-white/5">
                    <span className="text-white/50">Headquarters</span>
                    <span className="font-medium text-white">{company.location}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-white/5">
                    <span className="text-white/50">Founded</span>
                    <span className="font-medium text-white">{company.founded}</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-white/50">Website</span>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-light hover:underline font-medium"
                    >
                      Visit site ↗
                    </a>
                  </div>
                </div>
              </div>

              {/* Employer CTA */}
              <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#14141d] to-[#09090d] p-6 text-center">
                <Sparkles className="mx-auto h-8 w-8 text-brand-light" />
                <h4 className="font-manrope mt-3 text-sm font-bold text-white">Are you hiring at {company.name}?</h4>
                <p className="mt-1 text-xs text-white/60">
                  Post jobs, manage candidate pipelines, and source top talent with HireLoop Recruiter plans.
                </p>
                <Link
                  href="/sign-up?role=recruiter"
                  className="mt-4 inline-block w-full rounded-xl bg-brand py-2.5 text-xs font-semibold text-white shadow-md hover:bg-brand/90"
                >
                  Post a Job for {company.name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
