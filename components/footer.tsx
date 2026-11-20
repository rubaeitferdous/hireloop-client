"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

import logo from "@/app/images/logo.png"

const footerSections = [
  {
    title: "For Job Seekers",
    links: [
      { label: "Browse All Jobs", href: "/jobs" },
      { label: "Remote Jobs", href: "/jobs?type=remote" },
      { label: "Explore Companies", href: "/company" },
      { label: "Seeker Pricing Plans", href: "/pricing" },
      { label: "Application Tracker", href: "/sign-in" },
    ],
  },
  {
    title: "For Employers",
    links: [
      { label: "Post a Job", href: "/sign-up?role=recruiter" },
      { label: "Recruiter Pricing", href: "/pricing" },
      { label: "Enterprise Recruitment", href: "/pricing" },
      { label: "Candidate Search", href: "/jobs" },
      { label: "Employer Sign In", href: "/sign-in" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About HireLoop", href: "/" },
      { label: "Careers", href: "/jobs" },
      { label: "Help Center", href: "/" },
      { label: "Privacy Policy", href: "/" },
      { label: "Terms of Service", href: "/" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#020204] pt-16 pb-12 text-white/70">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image src={logo} alt="Hireloop" className="h-8 w-auto" />
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              HireLoop is the modern job hunting and hiring portal connecting world-class talent with leading technology companies and ambitious startups worldwide.
            </p>

            {/* System Status Pill */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/80">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Navigation Links Columns */}
          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col">
              <h4 className="font-manrope text-sm font-semibold tracking-wider uppercase text-white">
                {section.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} HireLoop Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs text-white/50">
            <Link href="/" className="transition-colors hover:text-white">
              Security
            </Link>
            <Link href="/" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/" className="transition-colors hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
