"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react"

import logoImage from "@/app/images/logo.png"

type UserRole = "seeker" | "employer"

export default function SignInPage() {
  const [role, setRole] = React.useState<UserRole>("seeker")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [rememberMe, setRememberMe] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [submittedData, setSubmittedData] = React.useState<{
    role: UserRole
    email: string
    passwordLength: number
    rememberMe: boolean
  } | null>(null)

  // Event handler that collects form data
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = {
      role,
      email,
      password,
      rememberMe,
    }

    console.log("[HireLoop Auth] Sign In Form Submitted:", formData)

    setSubmittedData({
      role,
      email,
      passwordLength: password.length,
      rememberMe,
    })
  }

  // Google OAuth handler
  const handleGoogleSignIn = () => {
    console.log("[HireLoop Auth] Google Sign In triggered for role:", role)
    alert(`Google Sign-In initiated for ${role === "seeker" ? "Job Seeker" : "Employer"} account (Backend integration pending)`)
  }

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#010103] px-4 py-12 sm:px-6 lg:px-8">
      {/* Atmospheric Background Glow (matching Figma aesthetic) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-32 -z-10 flex justify-center"
      >
        <div
          className="h-[500px] w-full max-w-[1000px] rounded-[50%] opacity-35 blur-[100px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(220, 2, 206, 0.45) 0%, rgba(92, 83, 254, 0.3) 40%, transparent 70%)",
          }}
        />
      </div>

      {/* Top Navigation Bar with Logo */}
      <div className="mx-auto mb-8 flex w-full max-w-[480px] items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2 text-xs font-medium text-white/60 transition-colors hover:text-white sm:text-sm"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Home</span>
        </Link>
        <Link href="/" className="inline-flex items-center">
          <Image
            src={logoImage}
            alt="HireLoop"
            height={28}
            className="h-6 w-auto sm:h-7"
            priority
          />
        </Link>
      </div>

      {/* Sign In Card */}
      <div className="mx-auto w-full max-w-[480px] rounded-2xl border border-white/10 bg-gradient-to-b from-[#111115]/95 via-[#0b0b0e]/95 to-[#050507]/98 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:p-8">
        {/* Toggle 1: Page Mode Toggle (Sign In / Sign Up) */}
        <div className="mb-6 flex rounded-xl border border-white/10 bg-[#101014] p-1">
          <button
            type="button"
            className="flex-1 rounded-lg bg-white/10 py-2 text-center text-xs font-semibold text-white shadow-sm transition-all sm:text-sm"
          >
            Sign In
          </button>
          <Link
            href="/sign-up"
            className="flex-1 rounded-lg py-2 text-center text-xs font-medium text-white/50 transition-all hover:text-white sm:text-sm"
          >
            Create Account
          </Link>
        </div>

        {/* Header Text */}
        <div className="mb-6">
          <h1 className="font-manrope text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Welcome back
          </h1>
          <p className="font-manrope mt-1.5 text-xs text-white/60 sm:text-sm">
            Enter your details below to access your HireLoop dashboard.
          </p>
        </div>

        {/* Toggle 2: Role Selection Toggle (Job Seeker vs Employer) */}
        <div className="mb-6">
          <label className="font-manrope mb-2 block text-xs font-medium text-white/70">
            Select Account Role
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setRole("seeker")}
              aria-pressed={role === "seeker"}
              className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-medium transition-all sm:text-sm ${
                role === "seeker"
                  ? "border-brand bg-brand/15 text-white shadow-[0_0_16px_rgba(92,83,254,0.3)] ring-1 ring-brand"
                  : "border-white/10 bg-[#121216] text-white/60 hover:border-white/20 hover:text-white"
              }`}
            >
              <Briefcase className="h-4 w-4" />
              <span>Job Seeker</span>
            </button>

            <button
              type="button"
              onClick={() => setRole("employer")}
              aria-pressed={role === "employer"}
              className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-xs font-medium transition-all sm:text-sm ${
                role === "employer"
                  ? "border-brand bg-brand/15 text-white shadow-[0_0_16px_rgba(92,83,254,0.3)] ring-1 ring-brand"
                  : "border-white/10 bg-[#121216] text-white/60 hover:border-white/20 hover:text-white"
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>Employer</span>
            </button>
          </div>
        </div>

        {/* Social Sign In (Google OAuth) */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-[#141418] px-4 text-xs font-medium text-white transition-all hover:border-white/30 hover:bg-[#1a1a20] active:scale-[0.99] sm:text-sm"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <span className="w-full border-t border-white/10" />
          <span className="font-manrope absolute bg-[#0d0d10] px-3 text-[11px] uppercase tracking-wider text-white/40">
            or continue with email
          </span>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="font-manrope mb-1.5 block text-xs font-medium text-white/80"
            >
              Email address
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full rounded-xl border border-white/10 bg-[#101014] py-2.5 pr-4 pl-10 text-xs text-white placeholder:text-white/30 transition-all focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none sm:text-sm"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="password"
                className="font-manrope text-xs font-medium text-white/80"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => alert("Password reset functionality will be enabled soon.")}
                className="text-xs text-brand-light hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-[#101014] py-2.5 pr-10 pl-10 text-xs text-white placeholder:text-white/30 transition-all focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none sm:text-sm"
              />
              {/* Toggle 3: Password Visibility Toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Toggle 4: Remember Me Checkbox Toggle */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-[#101014] text-brand accent-brand focus:ring-0 focus:ring-offset-0"
              />
              <span className="font-manrope text-xs text-white/70 select-none">
                Remember me on this device
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="font-manrope mt-2 inline-flex h-11 w-full items-center justify-center rounded-xl bg-brand font-semibold text-white shadow-[0_0_24px_rgba(92,83,254,0.35)] transition-all hover:bg-brand/90 hover:shadow-[0_0_32px_rgba(92,83,254,0.5)] active:scale-[0.99]"
          >
            Sign In as {role === "seeker" ? "Job Seeker" : "Employer"}
          </button>
        </form>

        {/* Submission Feedback Banner */}
        {submittedData && (
          <div className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-300">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>Form Data Collected (Ready for Auth Backend)</span>
            </div>
            <p className="mt-1 text-emerald-300/80">
              Role: <strong className="text-white">{submittedData.role}</strong> | Email:{" "}
              <strong className="text-white">{submittedData.email}</strong> | Remember:{" "}
              <strong className="text-white">{submittedData.rememberMe ? "Yes" : "No"}</strong>
            </p>
          </div>
        )}

        {/* Footer Link */}
        <p className="font-manrope mt-6 text-center text-xs text-white/50">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-brand-light hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
