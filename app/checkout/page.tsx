"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Lock,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useDashboard } from "@/lib/dashboard-context"
import { useSession } from "@/lib/auth-client"

function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const { upgradeSeekerPlan, seekerPlan } = useDashboard()

  const planParam = searchParams.get("plan")?.toLowerCase()
  const returnTo = searchParams.get("returnTo") || "/dashboard/seeker/jobs"

  const [selectedPlan, setSelectedPlan] = React.useState<"Pro" | "Premium">(
    planParam === "premium" ? "Premium" : "Pro"
  )

  const [cardName, setCardName] = React.useState("")
  const [cardNumber, setCardNumber] = React.useState("")
  const [expiry, setExpiry] = React.useState("")
  const [cvc, setCvc] = React.useState("")
  const [zipCode, setZipCode] = React.useState("")

  const [isProcessing, setIsProcessing] = React.useState(false)
  const [paymentSuccess, setPaymentSuccess] = React.useState(false)
  const [transactionId, setTransactionId] = React.useState("")

  React.useEffect(() => {
    if (session?.user?.name && !cardName) {
      setCardName(session.user.name)
    }
  }, [session, cardName])

  // Format Card Number
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16)
    const formatted = raw.match(/.{1,4}/g)?.join(" ") || raw
    setCardNumber(formatted)
  }

  // Format Expiry
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4)
    if (raw.length >= 3) {
      setExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`)
    } else {
      setExpiry(raw)
    }
  }

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
  }

  const planPrice = selectedPlan === "Pro" ? 19 : 39

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    await new Promise((resolve) => setTimeout(resolve, 1400))

    const txId = `tx_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6).toUpperCase()}`
    setTransactionId(txId)

    upgradeSeekerPlan(selectedPlan)

    setIsProcessing(false)
    setPaymentSuccess(true)
  }

  return (
    <div className="min-h-screen bg-[#010103] text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 py-10 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
          </div>

          {!paymentSuccess ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Form & Card (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[11px] font-semibold text-brand-light mb-2">
                    <Sparkles className="h-3 w-3" />
                    <span>Application Quota Upgrade</span>
                  </div>
                  <h1 className="font-manrope text-2xl sm:text-3xl font-extrabold text-white">
                    Unlock Unlimited Applications
                  </h1>
                  <p className="text-xs sm:text-sm text-white/60 mt-1">
                    Free accounts include 10 applications. Upgrade your plan to apply to as many opportunities as you want.
                  </p>
                </div>

                {/* Plan Selection Radios */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedPlan("Pro")}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedPlan === "Pro"
                        ? "border-brand bg-brand/15 ring-2 ring-brand/40 shadow-[0_0_20px_rgba(92,83,254,0.25)]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <span className="block text-xs font-bold text-white">Pro Plan</span>
                    <span className="font-manrope text-2xl font-black text-white mt-1 block">
                      $19<span className="text-xs font-normal text-white/50">/mo</span>
                    </span>
                    <span className="text-[11px] text-white/60 block mt-1">
                      30 applications/mo
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPlan("Premium")}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedPlan === "Premium"
                        ? "border-brand bg-brand/15 ring-2 ring-brand/40 shadow-[0_0_20px_rgba(92,83,254,0.25)]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <span className="block text-xs font-bold text-white">Premium</span>
                    <span className="font-manrope text-2xl font-black text-white mt-1 block">
                      $39<span className="text-xs font-normal text-white/50">/mo</span>
                    </span>
                    <span className="text-[11px] text-white/60 block mt-1">
                      Unlimited applications
                    </span>
                  </button>
                </div>

                {/* Visual Credit Card */}
                <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-tr from-[#161224] via-[#1f1938] to-[#0c0914] p-5 shadow-2xl">
                  <div
                    className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none bg-cover bg-center"
                    style={{ backgroundImage: `url('/images/card-bg.png')` }}
                  />

                  <div className="relative z-10 flex flex-col justify-between h-44">
                    <div className="flex items-start justify-between">
                      <div className="relative h-9 w-12 rounded-md overflow-hidden shadow-md border border-amber-300/30">
                        <Image
                          src="/images/chip.png"
                          alt="EMV Chip"
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-space-mono text-[10px] tracking-widest uppercase text-white/60">
                          HIRELOOP PAY
                        </span>
                        <Zap className="h-4 w-4 text-brand-light" />
                      </div>
                    </div>

                    <div>
                      <span className="font-mono text-xl sm:text-2xl tracking-widest font-bold text-white drop-shadow">
                        {cardNumber || "•••• •••• •••• 4242"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="block text-[9px] uppercase tracking-wider text-white/50 font-mono">
                          CARDHOLDER
                        </span>
                        <span className="font-semibold uppercase tracking-wide text-white">
                          {cardName || "CANDIDATE NAME"}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="block text-[9px] uppercase tracking-wider text-white/50 font-mono">
                          EXPIRES
                        </span>
                        <span className="font-mono font-semibold text-white">
                          {expiry || "12/28"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Input Form */}
                <form onSubmit={handlePay} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Rivera"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="4242 4242 4242 4242"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 pl-10 text-sm font-mono text-white placeholder-white/30 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      />
                      <CreditCard className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-white/70 mb-1.5">
                        Expires
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={handleExpiryChange}
                        maxLength={5}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-center text-sm font-mono text-white placeholder-white/30 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-white/70 mb-1.5">
                        CVC
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="123"
                        value={cvc}
                        onChange={handleCvcChange}
                        maxLength={4}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-center text-sm font-mono text-white placeholder-white/30 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-white/70 mb-1.5">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="94103"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-center text-sm font-mono text-white placeholder-white/30 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full rounded-xl bg-brand py-3.5 text-sm font-bold text-white shadow-[0_0_25px_rgba(92,83,254,0.4)] transition-all hover:bg-brand/90 hover:shadow-[0_0_35px_rgba(92,83,254,0.6)] disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
                  >
                    {isProcessing ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Processing Card Payment...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4" />
                        <span>Pay ${planPrice}.00 & Unlock Applications</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[11px] text-white/40 pt-1">
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                      <span>256-bit SSL Encrypted</span>
                    </div>
                    <span>•</span>
                    <span>Powered by Stripe</span>
                    <span>•</span>
                    <span>Cancel Anytime</span>
                  </div>
                </form>
              </div>

              {/* Right Column: Order Summary (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="rounded-3xl border border-white/10 bg-[#09090f] p-6 shadow-xl space-y-5">
                  <h3 className="font-manrope text-base font-bold text-white">Order Summary</h3>

                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-bold text-sm text-white">{selectedPlan} Subscription</span>
                        <span className="block text-xs text-white/50">Renews monthly</span>
                      </div>
                      <span className="font-mono font-bold text-white">${planPrice}.00</span>
                    </div>

                    <div className="border-t border-white/5 pt-3 space-y-2 text-xs text-white/70">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        <span>10-application cap removed</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        <span>Application tracking pipeline</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        <span>Priority candidate badge</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs border-t border-white/10 pt-4">
                    <div className="flex justify-between text-white/60">
                      <span>Subtotal</span>
                      <span className="font-mono text-white">${planPrice}.00</span>
                    </div>
                    <div className="flex justify-between text-white/60">
                      <span>Estimated Tax</span>
                      <span className="font-mono text-white">$0.00</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-white border-t border-white/10 pt-2">
                      <span>Total Due Today</span>
                      <span className="font-mono text-brand-light">${planPrice}.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Payment Success Screen (Figma Screen 4) */
            <div className="mx-auto max-w-xl rounded-3xl border border-white/15 bg-[#09090f] p-8 sm:p-12 text-center shadow-2xl space-y-6">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 ring-8 ring-emerald-500/10">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <div>
                <span className="font-space-mono text-xs uppercase tracking-wider text-emerald-400">
                  Payment Confirmed
                </span>
                <h2 className="font-manrope text-3xl font-extrabold text-white mt-1">
                  You&apos;re Upgraded to {selectedPlan}!
                </h2>
                <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto mt-2">
                  Your 10-job application cap has been lifted. You can now apply to unlimited jobs across the entire HireLoop network.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-left text-xs space-y-2.5 font-mono">
                <div className="flex justify-between text-white/60">
                  <span>Transaction ID:</span>
                  <span className="text-white">{transactionId}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Amount Charged:</span>
                  <span className="text-emerald-400 font-bold">${planPrice}.00 USD</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Payment Method:</span>
                  <span className="text-white">Card ending in 4242</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Next Renewal:</span>
                  <span className="text-white">Dec 20, 2026</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href={returnTo}
                  className="flex-1 rounded-xl bg-brand py-3.5 text-sm font-bold text-white shadow-[0_0_25px_rgba(92,83,254,0.4)] transition-all hover:bg-brand/90 text-center"
                >
                  Continue Job Application
                </Link>
                <Link
                  href="/dashboard/seeker"
                  className="flex-1 rounded-xl border border-white/15 bg-white/[0.04] py-3.5 text-sm font-semibold text-white/80 hover:text-white transition-colors text-center"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#010103] flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
        </div>
      }
    >
      <CheckoutContent />
    </React.Suspense>
  )
}
