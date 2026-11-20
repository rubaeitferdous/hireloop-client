"use client"

import * as React from "react"
import Image from "next/image"
import {
  Check,
  CheckCircle2,
  CreditCard,
  Lock,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react"

import { useDashboard } from "@/lib/dashboard-context"
import { useSession } from "@/lib/auth-client"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (plan: "Pro" | "Premium") => void
  initialPlan?: "Pro" | "Premium"
  reason?: string
}

export function PaymentModal({
  isOpen,
  onClose,
  onSuccess,
  initialPlan = "Pro",
  reason = "You have reached your 10-job free application limit. Upgrade to continue applying!",
}: PaymentModalProps) {
  const { upgradeSeekerPlan } = useDashboard()
  const { data: session } = useSession()

  const [selectedPlan, setSelectedPlan] = React.useState<"Pro" | "Premium">(initialPlan)
  const [cardName, setCardName] = React.useState("")
  const [cardNumber, setCardNumber] = React.useState("")
  const [expiry, setExpiry] = React.useState("")
  const [cvc, setCvc] = React.useState("")
  const [zipCode, setZipCode] = React.useState("")

  const [isProcessing, setIsProcessing] = React.useState(false)
  const [paymentSuccess, setPaymentSuccess] = React.useState(false)
  const [transactionId, setTransactionId] = React.useState("")

  // Set cardholder name from user session once loaded
  React.useEffect(() => {
    if (session?.user?.name && !cardName) {
      setCardName(session.user.name)
    }
  }, [session, cardName])

  // Sync initial plan
  React.useEffect(() => {
    setSelectedPlan(initialPlan)
  }, [initialPlan])

  if (!isOpen) return null

  // Format Card Number (XXXX XXXX XXXX XXXX)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16)
    const formatted = raw.match(/.{1,4}/g)?.join(" ") || raw
    setCardNumber(formatted)
  }

  // Format Expiry (MM/YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4)
    if (raw.length >= 3) {
      setExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`)
    } else {
      setExpiry(raw)
    }
  }

  // Format CVC (3-4 digits)
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))
  }

  const planPrice = selectedPlan === "Pro" ? 19 : 39

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1400))

    const txId = `tx_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6).toUpperCase()}`
    setTransactionId(txId)

    // Execute state and server upgrade
    upgradeSeekerPlan(selectedPlan)

    setIsProcessing(false)
    setPaymentSuccess(true)

    if (onSuccess) {
      onSuccess(selectedPlan)
    }
  }

  const handleCloseAndReset = () => {
    setPaymentSuccess(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={handleCloseAndReset}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl rounded-3xl border border-white/15 bg-[#09090f] shadow-2xl p-6 sm:p-8 text-white z-10 my-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleCloseAndReset}
          className="absolute top-5 right-5 rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {!paymentSuccess ? (
          <div>
            {/* Header */}
            <div className="mb-6 pr-8">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[11px] font-semibold text-brand-light mb-2">
                <Sparkles className="h-3 w-3" />
                <span>Limit Reached • 10/10 Free Applications Used</span>
              </div>
              <h2 className="font-manrope text-2xl sm:text-3xl font-extrabold text-white">
                Upgrade to Keep Applying
              </h2>
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                {reason}
              </p>
            </div>

            {/* Plan Selector Tabs */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {/* Pro Plan */}
              <button
                type="button"
                onClick={() => setSelectedPlan("Pro")}
                className={`relative flex flex-col p-4 rounded-2xl border text-left transition-all ${
                  selectedPlan === "Pro"
                    ? "border-brand bg-brand/15 ring-2 ring-brand/40 shadow-[0_0_20px_rgba(92,83,254,0.25)]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-sm text-white">Pro Plan</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-brand/30 text-brand-light font-semibold">
                    Popular
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-manrope text-2xl font-black text-white">$19</span>
                  <span className="text-xs text-white/50">/month</span>
                </div>
                <span className="text-[11px] text-white/60 mt-1">
                  30 applications/mo + Tracking
                </span>
              </button>

              {/* Premium Plan */}
              <button
                type="button"
                onClick={() => setSelectedPlan("Premium")}
                className={`relative flex flex-col p-4 rounded-2xl border text-left transition-all ${
                  selectedPlan === "Premium"
                    ? "border-brand bg-brand/15 ring-2 ring-brand/40 shadow-[0_0_20px_rgba(92,83,254,0.25)]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-sm text-white">Premium</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold">
                    Unlimited
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-manrope text-2xl font-black text-white">$39</span>
                  <span className="text-xs text-white/50">/month</span>
                </div>
                <span className="text-[11px] text-white/60 mt-1">
                  Unlimited jobs + Profile Boost
                </span>
              </button>
            </div>

            {/* Credit Card Visual (Matching Figma Design Tokens & Chip) */}
            <div className="relative mb-6 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-tr from-[#161224] via-[#1f1938] to-[#0c0914] p-5 shadow-2xl">
              {/* Background Glow Texture */}
              <div
                className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none bg-cover bg-center"
                style={{ backgroundImage: `url('/images/card-bg.png')` }}
              />

              <div className="relative z-10 flex flex-col justify-between h-40">
                <div className="flex items-start justify-between">
                  {/* Gold EMV Chip from Figma */}
                  <div className="relative h-9 w-12 rounded-md overflow-hidden shadow-md border border-amber-300/30">
                    <Image
                      src="/images/chip.png"
                      alt="EMV Chip"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Contactless Wave & HireLoop Badge */}
                  <div className="flex items-center gap-2">
                    <span className="font-space-mono text-[10px] tracking-widest uppercase text-white/60">
                      HIRELOOP PAY
                    </span>
                    <Zap className="h-4 w-4 text-brand-light" />
                  </div>
                </div>

                {/* Card Number Display */}
                <div>
                  <span className="font-mono text-lg sm:text-xl tracking-widest font-bold text-white drop-shadow">
                    {cardNumber || "•••• •••• •••• 4242"}
                  </span>
                </div>

                {/* Cardholder & Expiry Row */}
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

            {/* Payment Form */}
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

              {/* Order Breakdown */}
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs space-y-1.5 mt-2">
                <div className="flex justify-between text-white/60">
                  <span>{selectedPlan} Plan (Monthly)</span>
                  <span className="font-mono text-white">${planPrice}.00</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>10-Job Limit Lifted</span>
                  <span className="text-emerald-400 font-medium">Included</span>
                </div>
                <div className="border-t border-white/10 pt-1.5 flex justify-between font-bold text-sm text-white">
                  <span>Total Due Today</span>
                  <span className="font-mono text-brand-light">${planPrice}.00</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full rounded-xl bg-brand py-3 text-sm font-bold text-white shadow-[0_0_25px_rgba(92,83,254,0.4)] transition-all hover:bg-brand/90 hover:shadow-[0_0_35px_rgba(92,83,254,0.6)] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Processing Secure Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    <span>Pay ${planPrice}.00 & Upgrade Account</span>
                  </>
                )}
              </button>

              {/* Trust Badges */}
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
        ) : (
          /* Payment Success View (Matching Figma Screen 4) */
          <div className="py-8 text-center space-y-5">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 ring-8 ring-emerald-500/10">
              <CheckCircle2 className="h-9 w-9" />
            </div>

            <div>
              <span className="font-space-mono text-xs uppercase tracking-wider text-emerald-400">
                Payment Confirmed
              </span>
              <h3 className="font-manrope text-2xl sm:text-3xl font-extrabold text-white mt-1">
                You&apos;re Upgraded to {selectedPlan}!
              </h3>
              <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto mt-2">
                Your 10-job application cap has been lifted. You can now apply to unlimited jobs across the entire HireLoop network.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="max-w-md mx-auto rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-left text-xs space-y-2 font-mono">
              <div className="flex justify-between text-white/60">
                <span>Receipt Number:</span>
                <span className="text-white">{transactionId}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Amount Paid:</span>
                <span className="text-emerald-400 font-bold">${planPrice}.00 USD</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Payment Method:</span>
                <span className="text-white">Card ending in 4242</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Next Billing Date:</span>
                <span className="text-white">Dec 20, 2026</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCloseAndReset}
              className="w-full max-w-md mx-auto rounded-xl bg-brand py-3 text-sm font-bold text-white shadow-[0_0_25px_rgba(92,83,254,0.4)] transition-all hover:bg-brand/90"
            >
              Start Applying Now
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
