"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  BookmarkCheck,
  Building2,
  DollarSign,
  Search,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
}

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.1 },
  transition: {
    staggerChildren: 0.12,
    delayChildren: 0.1,
  },
}

const features = [
  {
    icon: <Search className="h-6 w-6 text-brand-light" />,
    badge: "Smart Search",
    title: "AI-Powered Discovery",
    description:
      "Find the exact roles suited to your skills with precision search, conversational filters, and instant semantic matching across thousands of live openings.",
    highlights: ["Semantic keyword matching", "Remote & timezone filtering", "Zero fluff results"],
  },
  {
    icon: <DollarSign className="h-6 w-6 text-emerald-400" />,
    badge: "Compensation",
    title: "Transparent Salary Insights",
    description:
      "Make career moves with complete clarity. Access verified compensation bands, equity benchmarks, and real market rates before you submit a single application.",
    highlights: ["Real-time market averages", "Role-based percentiles", "Verified recruiter data"],
  },
  {
    icon: <Building2 className="h-6 w-6 text-sky-400" />,
    badge: "Ecosystem",
    title: "Verified Top Companies",
    description:
      "Explore comprehensive company profiles, engineering culture briefs, tech stacks, and team sizes. Connect directly with hiring managers without the agency middleman.",
    highlights: ["Admin-verified employers", "Direct recruiter messaging", "Culture & stack breakdown"],
  },
  {
    icon: <BookmarkCheck className="h-6 w-6 text-amber-400" />,
    badge: "Tracking",
    title: "Saved Jobs & Pipeline Tracker",
    description:
      "Organize your dream roles with one-click bookmarks. Monitor every application status in real-time — from review and screening to final offer acceptance.",
    highlights: ["Real-time status updates", "Automated email alerts", "One-click application manager"],
  },
]

export function FeaturesSection() {
  return (
    <section className="relative w-full py-24 sm:py-32">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: "20%",
            width: "800px",
            height: "450px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(92, 83, 254, 0.15) 0%, rgba(220, 2, 206, 0.08) 50%, transparent 75%)",
            filter: "blur(90px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          {...fadeInUp}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#121216]/80 px-4 py-1.5 shadow-sm backdrop-blur-md">
            <Zap className="h-4 w-4 text-brand-light" />
            <span className="font-space-mono text-xs uppercase tracking-wider text-white/90">
              Built For Modern Job Hunting
            </span>
          </div>

          <h2 className="font-manrope mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Everything You Need To Land Your Next Big Career Breakthrough
          </h2>

          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
            Say goodbye to endless resume black holes. HireLoop equips job seekers and recruiters with high-signal tools designed for speed, clarity, and results.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-[#141419]/90 via-[#0e0e13]/90 to-[#07070a]/95 p-6 shadow-xl backdrop-blur-xl transition-colors hover:border-brand/40 sm:p-7"
            >
              <div>
                {/* Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] shadow-inner transition-transform group-hover:scale-105">
                    {feature.icon}
                  </div>
                  <span className="font-space-mono rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-white/60">
                    {feature.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="font-manrope mt-6 text-xl font-bold text-white transition-colors group-hover:text-brand-light">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  {feature.description}
                </p>
              </div>

              {/* Feature Highlights */}
              <div className="mt-6 border-t border-white/10 pt-4">
                <ul className="space-y-2">
                  {feature.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-xs text-white/70"
                    >
                      <Sparkles className="h-3 w-3 text-brand-light shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
