"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react"

import ctaBg from "@/app/images/cta-bg.png"

export function CtaSection() {
  return (
    <section className="relative w-full py-20 sm:py-28">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#111116] via-[#09090d] to-[#040406] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.7)] sm:p-14 lg:p-16">
          {/* Wireframe Mesh Background (cta-bg.png) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
          >
            <Image
              src={ctaBg}
              alt=""
              fill
              className="object-cover object-bottom"
            />
          </div>

          {/* Purple Glow Center */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "600px",
              height: "300px",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(92, 83, 254, 0.4) 0%, rgba(220, 2, 206, 0.15) 50%, transparent 75%)",
              filter: "blur(70px)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#16161c]/80 px-4 py-1.5 shadow-md backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-brand-light" />
              <span className="font-space-mono text-xs uppercase tracking-wider text-white">
                Start In Under 2 Minutes
              </span>
            </div>

            <h2 className="font-manrope mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.15]">
              Ready To Land Your Dream Job Or Hire World-Class Talent?
            </h2>

            <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
              Join more than 2,000,000 candidates and 12,000 verified employers. Whether you are seeking your next high-impact position or hiring top engineering minds, HireLoop makes it seamless.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
              <Link
                href="/jobs"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-7 text-sm font-semibold text-white shadow-[0_0_24px_rgba(92,83,254,0.45)] transition-all hover:bg-brand/90 hover:shadow-[0_0_32px_rgba(92,83,254,0.6)] active:scale-[0.98] sm:w-auto"
              >
                <span>Browse All Jobs</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/sign-up?role=recruiter"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-7 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-white/35 hover:bg-white/[0.1] active:scale-[0.98] sm:w-auto"
              >
                <span>Post a Job Free</span>
              </Link>
            </div>

            {/* Trust points */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/60">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Free tier included</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-light" />
                <span>Verified recruiters only</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Instant notifications</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
