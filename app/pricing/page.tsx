"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useSession } from "@/lib/auth-client"

interface PlanTier {
  name: string
  price: string
  cadence: string
  description: string
  popular?: boolean
  features: string[]
  ctaText: string
  ctaHref: string
}

const seekerPlans: PlanTier[] = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    description: "Essential toolkit for casual job seekers exploring new career horizons.",
    features: [
      "Browse & save up to 10 jobs",
      "Apply to up to 3 jobs per month",
      "Basic candidate profile",
      "Instant email job alerts",
      "Community support",
    ],
    ctaText: "Get Started Free",
    ctaHref: "/sign-up?role=seeker",
  },
  {
    name: "Pro",
    price: "$19",
    cadence: "per month",
    popular: true,
    description: "Engineered for active candidates eager to accelerate their job search.",
    features: [
      "Apply to up to 30 jobs per month",
      "Unlimited saved jobs & bookmarks",
      "Full application pipeline tracking",
      "Detailed salary & compensation insights",
      "Resume view analytics",
      "Priority standard support",
    ],
    ctaText: "Upgrade to Pro",
    ctaHref: "/sign-up?role=seeker&plan=pro",
  },
  {
    name: "Premium",
    price: "$39",
    cadence: "per month",
    description: "Maximum visibility and unlimited reach for top-tier professionals.",
    features: [
      "Unlimited monthly applications",
      "Candidate profile boost to top recruiters",
      "Early 48-hour access to newly posted jobs",
      "Direct recruiter message introductions",
      "1-on-1 resume & portfolio review credits",
      "Dedicated 24/7 priority support",
    ],
    ctaText: "Join Premium",
    ctaHref: "/sign-up?role=seeker&plan=premium",
  },
]

const recruiterPlans: PlanTier[] = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    description: "Perfect for early-stage startups and small teams starting their hiring journey.",
    features: [
      "Up to 3 active job postings",
      "Standard marketplace search visibility",
      "Basic candidate application review",
      "Company profile in directory",
      "Standard email support",
    ],
    ctaText: "Start Hiring Free",
    ctaHref: "/sign-up?role=recruiter",
  },
  {
    name: "Growth",
    price: "$49",
    cadence: "per month",
    popular: true,
    description: "For scaling engineering and product teams managing multiple concurrent pipelines.",
    features: [
      "Up to 10 active job postings",
      "Applicant tracking system (ATS)",
      "Applicant analytics & conversion reports",
      "Automated candidate email notifications",
      "Direct candidate resume downloads",
      "Fast email & chat support",
    ],
    ctaText: "Choose Growth",
    ctaHref: "/sign-up?role=recruiter&plan=growth",
  },
  {
    name: "Enterprise",
    price: "$149",
    cadence: "per month",
    description: "Unlimited power and collaboration for fast-paced recruiting departments.",
    features: [
      "Up to 50 active job postings",
      "Featured placement on home & browse feeds",
      "Advanced analytics & recruitment dashboards",
      "Multi-seat team collaboration & notes",
      "Custom company branding on job posts",
      "Dedicated account manager & SLA",
    ],
    ctaText: "Get Enterprise",
    ctaHref: "/sign-up?role=recruiter&plan=enterprise",
  },
]

const faqs = [
  {
    question: "Can I switch or cancel my plan at any time?",
    answer:
      "Yes, absolutely. You can upgrade, downgrade, or cancel your subscription at any moment from your billing dashboard. When upgrading, changes take effect immediately with prorated billing. When cancelling, your benefits remain active until the end of the current billing cycle.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We process all payments securely via Stripe. We support major credit and debit cards (Visa, Mastercard, American Express, Discover), as well as Apple Pay and Google Pay.",
  },
  {
    question: "Is there a money-back guarantee?",
    answer:
      "Yes, we offer an unconditional 14-day money-back guarantee for all paid Seeker and Recruiter plans. If you are not completely satisfied with HireLoop, contact our support team for a full refund.",
  },
  {
    question: "How do active job post limits work for recruiters?",
    answer:
      "Active job posts are positions currently live and accepting applications. When you fill or close a role, that slot opens back up immediately, allowing you to publish another opening without needing to upgrade.",
  },
  {
    question: "What happens when a job seeker exhausts their monthly application limit?",
    answer:
      "On the Free tier (3 applications/month), you can browse and bookmark unlimited jobs, and your application quota resets automatically on the first day of each calendar month. Upgrading to Pro (30/month) or Premium (unlimited) instantly lifts this ceiling.",
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

export default function PricingPage() {
  const { data: session } = useSession()
  const [billingTab, setBillingTab] = React.useState<"seeker" | "recruiter">("seeker")
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0)

  const activePlans = billingTab === "seeker" ? seekerPlans : recruiterPlans

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-[#010103] text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Hero Section */}
        <section className="relative border-b border-white/10 bg-gradient-to-b from-[#0a0a10] via-[#050508] to-[#010103] pt-16 pb-20">
          <div className="mx-auto max-w-[1320px] px-4 text-center sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold text-brand-light">
              <Sparkles className="h-3.5 w-3.5" />
              <span>TRANSPARENT, VALUE-DRIVEN PLANS</span>
            </div>

            <h1 className="font-manrope mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Simple, Predictable Pricing
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-base text-white/70">
              Whether you are hunting for your dream engineering role or building a powerhouse team, choose the plan tailored to your goals.
            </p>

            {/* Segmented Role Toggle */}
            <div className="mx-auto mt-10 inline-flex items-center rounded-2xl border border-white/15 bg-[#101015]/90 p-1.5 shadow-xl backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setBillingTab("seeker")}
                className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-semibold transition-all sm:text-sm ${
                  billingTab === "seeker"
                    ? "bg-brand text-white shadow-[0_0_20px_rgba(92,83,254,0.4)]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Briefcase className="h-4 w-4" />
                <span>For Job Seekers</span>
              </button>

              <button
                type="button"
                onClick={() => setBillingTab("recruiter")}
                className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-semibold transition-all sm:text-sm ${
                  billingTab === "recruiter"
                    ? "bg-brand text-white shadow-[0_0_20px_rgba(92,83,254,0.4)]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Building2 className="h-4 w-4" />
                <span>For Recruiters</span>
              </button>
            </div>
          </div>
        </section>

        {/* Pricing Cards Grid */}
        <div className="mx-auto max-w-[1320px] px-4 pt-14 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={billingTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-8 md:grid-cols-3"
            >
              {activePlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative flex flex-col justify-between rounded-3xl border p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 ${
                    plan.popular
                      ? "border-brand bg-gradient-to-b from-[#181824]/95 via-[#101018]/95 to-[#09090e]/98 shadow-[0_0_40px_rgba(92,83,254,0.25)] ring-1 ring-brand"
                      : "border-white/10 bg-gradient-to-b from-[#111116]/95 via-[#0c0c10]/95 to-[#070709]/98 hover:border-white/25"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
                        <Zap className="h-3 w-3 fill-current" /> Most Popular
                      </span>
                    </div>
                  )}

                  <div>
                    {/* Tier Name & Description */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-manrope text-xl font-bold text-white">
                        {plan.name}
                      </h3>
                      {plan.name === "Free" ? (
                        <span className="font-space-mono text-xs text-white/50">Starter</span>
                      ) : (
                        <span className="font-space-mono text-xs text-brand-light">Scalable</span>
                      )}
                    </div>

                    <p className="mt-2 text-xs leading-relaxed text-white/60">
                      {plan.description}
                    </p>

                    {/* Price Header */}
                    <div className="mt-6 flex items-baseline gap-1.5 border-y border-white/10 py-5">
                      <span className="font-space-mono text-4xl font-extrabold text-white sm:text-5xl">
                        {plan.price}
                      </span>
                      <span className="text-xs text-white/50 font-sans">
                        / {plan.cadence}
                      </span>
                    </div>

                    {/* Features List */}
                    <div className="mt-6 space-y-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-white/70 block">
                        Included Features:
                      </span>
                      <ul className="space-y-3">
                        {plan.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2.5 text-xs leading-relaxed text-white/80"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-light" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-8 border-t border-white/10 pt-6">
                    <Link
                      href={plan.ctaHref}
                      className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold transition-all ${
                        plan.popular
                          ? "bg-brand text-white shadow-[0_0_24px_rgba(92,83,254,0.4)] hover:bg-brand/90 hover:shadow-[0_0_32px_rgba(92,83,254,0.6)]"
                          : "border border-white/15 bg-white/[0.04] text-white hover:border-white/30 hover:bg-white/[0.08]"
                      }`}
                    >
                      <span>{plan.ctaText}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Money Back Guarantee Banner */}
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#0d0d12]/80 p-5 text-center text-xs text-white/70">
            <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
            <span>
              All paid subscriptions include a <strong className="text-white">14-day money-back guarantee</strong>. No questions asked.
            </span>
          </div>

          {/* FAQ Section */}
          <div className="mx-auto mt-24 max-w-3xl">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-light">
                <HelpCircle className="h-4 w-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="font-manrope mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Got Questions? We Have Answers.
              </h2>
            </div>

            <div className="mt-10 space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index

                return (
                  <div
                    key={faq.question}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e13]/90 backdrop-blur-md transition-colors hover:border-white/20"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-white sm:text-base"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-white/50 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-brand-light" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="border-t border-white/5 px-5 pb-5 pt-3 text-xs leading-relaxed text-white/70 sm:text-sm">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
