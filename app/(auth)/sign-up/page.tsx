"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react"

import logoImage from "@/app/images/logo.png"
import { authClient } from "@/lib/auth-client"

type UserRole = "seeker" | "recruiter" | "admin"

export default function SignUpPage() {
  const router = useRouter()
  const [role, setRole] = React.useState<UserRole>("seeker")
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [agreeToTerms, setAgreeToTerms] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null)

  // Better Auth Sign Up with MongoDB
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(null)
    setSuccessMessage(null)

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please verify and try again.")
      return
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.")
      return
    }

    if (!agreeToTerms) {
      setErrorMessage("Please accept the Terms of Service and Privacy Policy to proceed.")
      return
    }

    setIsLoading(true)

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        role,
        callbackURL: "/",
      })

      if (error) {
        setErrorMessage(
          error.message || "Failed to create account. Please check your credentials and try again."
        )
        setIsLoading(false)
        return
      }

      setSuccessMessage("Account created successfully! Redirecting...")
      setTimeout(() => {
        router.push("/")
      }, 1500)
    } catch (err: unknown) {
      console.error("[HireLoop Auth] Sign Up error:", err)
      setErrorMessage(
        err instanceof Error ? err.message : "An unexpected error occurred during sign up."
      )
    } finally {
      setIsLoading(false)
    }
  }

  // Google OAuth handler
  const handleGoogleSignUp = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      })
    } catch (err) {
      console.error("[HireLoop Auth] Google Sign Up error:", err)
      alert("Google OAuth is not configured yet. Please register with email.")
    }
  }

  const getRoleButtonLabel = () => {
    switch (role) {
      case "recruiter":
        return "Recruiter"
      case "admin":
        return "Admin"
      default:
        return "Job Seeker"
    }
  }

  const getNameLabel = () => {
    switch (role) {
      case "recruiter":
        return "Company / Recruiter name"
      case "admin":
        return "Admin full name"
      default:
        return "Full name"
    }
  }

  const getNamePlaceholder = () => {
    switch (role) {
      case "recruiter":
        return "Acme Corp / TechFlow"
      case "admin":
        return "System Administrator"
      default:
        return "Alex Morgan"
    }
  }

  const getEmailLabel = () => {
    switch (role) {
      case "recruiter":
        return "Work email address"
      case "admin":
        return "Admin email address"
      default:
        return "Email address"
    }
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
      <div className="mx-auto mb-8 flex w-full max-w-[500px] items-center justify-between">
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

      {/* Sign Up Card */}
      <div className="mx-auto w-full max-w-[500px] rounded-2xl border border-white/10 bg-gradient-to-b from-[#111115]/95 via-[#0b0b0e]/95 to-[#050507]/98 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:p-8">
        {/* Toggle 1: Page Mode Toggle (Sign In / Sign Up) */}
        <div className="mb-6 flex rounded-xl border border-white/10 bg-[#101014] p-1">
          <Link
            href="/sign-in"
            className="flex-1 rounded-lg py-2 text-center text-xs font-medium text-white/50 transition-all hover:text-white sm:text-sm"
          >
            Sign In
          </Link>
          <button
            type="button"
            className="flex-1 rounded-lg bg-white/10 py-2 text-center text-xs font-semibold text-white shadow-sm transition-all sm:text-sm"
          >
            Create Account
          </button>
        </div>

        {/* Header Text */}
        <div className="mb-6">
          <h1 className="font-manrope text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Create your account
          </h1>
          <p className="font-manrope mt-1.5 text-xs text-white/60 sm:text-sm">
            Join HireLoop to discover dream jobs, hire top industry talent, or manage the platform.
          </p>
        </div>

        {/* Toggle 2: Role Selection Toggle (Seeker vs Recruiter vs Admin) */}
        <div className="mb-6">
          <label className="font-manrope mb-2 block text-xs font-medium text-white/70">
            I want to join HireLoop as:
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setRole("seeker")}
              aria-pressed={role === "seeker"}
              className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-2.5 text-xs font-medium transition-all sm:p-3 sm:text-sm ${
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
              onClick={() => setRole("recruiter")}
              aria-pressed={role === "recruiter"}
              className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-2.5 text-xs font-medium transition-all sm:p-3 sm:text-sm ${
                role === "recruiter"
                  ? "border-brand bg-brand/15 text-white shadow-[0_0_16px_rgba(92,83,254,0.3)] ring-1 ring-brand"
                  : "border-white/10 bg-[#121216] text-white/60 hover:border-white/20 hover:text-white"
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>Recruiter</span>
            </button>

            <button
              type="button"
              onClick={() => setRole("admin")}
              aria-pressed={role === "admin"}
              className={`flex flex-col items-center justify-center gap-1.5 rounded-xl border p-2.5 text-xs font-medium transition-all sm:p-3 sm:text-sm ${
                role === "admin"
                  ? "border-brand bg-brand/15 text-white shadow-[0_0_16px_rgba(92,83,254,0.3)] ring-1 ring-brand"
                  : "border-white/10 bg-[#121216] text-white/60 hover:border-white/20 hover:text-white"
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Social Sign Up (Google OAuth) */}
        <button
          type="button"
          onClick={handleGoogleSignUp}
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
          <span>Sign up with Google</span>
        </button>

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <span className="w-full border-t border-white/10" />
          <span className="font-manrope absolute bg-[#0d0d10] px-3 text-[11px] uppercase tracking-wider text-white/40">
            or register with email
          </span>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="font-manrope mb-1.5 block text-xs font-medium text-white/80"
            >
              {getNameLabel()}
            </label>
            <div className="relative">
              {role === "seeker" && (
                <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              )}
              {role === "recruiter" && (
                <Building2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              )}
              {role === "admin" && (
                <ShieldCheck className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              )}
              <input
                id="name"
                type="text"
                required
                disabled={isLoading}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={getNamePlaceholder()}
                className="w-full rounded-xl border border-white/10 bg-[#101014] py-2.5 pr-4 pl-10 text-xs text-white placeholder:text-white/30 transition-all focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none disabled:opacity-50 sm:text-sm"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="font-manrope mb-1.5 block text-xs font-medium text-white/80"
            >
              {getEmailLabel()}
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                id="email"
                type="email"
                required
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-white/10 bg-[#101014] py-2.5 pr-4 pl-10 text-xs text-white placeholder:text-white/30 transition-all focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none disabled:opacity-50 sm:text-sm"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="font-manrope mb-1.5 block text-xs font-medium text-white/80"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                disabled={isLoading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full rounded-xl border border-white/10 bg-[#101014] py-2.5 pr-10 pl-10 text-xs text-white placeholder:text-white/30 transition-all focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none disabled:opacity-50 sm:text-sm"
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

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="font-manrope mb-1.5 block text-xs font-medium text-white/80"
            >
              Confirm password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                minLength={8}
                disabled={isLoading}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full rounded-xl border border-white/10 bg-[#101014] py-2.5 pr-10 pl-10 text-xs text-white placeholder:text-white/30 transition-all focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none disabled:opacity-50 sm:text-sm"
              />
              {/* Toggle 4: Confirm Password Visibility Toggle */}
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Toggle 5: Terms & Privacy Agreement Toggle */}
          <div className="pt-1">
            <label className="flex cursor-pointer items-start gap-2.5">
              <input
                type="checkbox"
                required
                disabled={isLoading}
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-white/20 bg-[#101014] text-brand accent-brand focus:ring-0 focus:ring-offset-0 disabled:opacity-50"
              />
              <span className="font-manrope text-xs leading-relaxed text-white/70 select-none">
                I agree to the{" "}
                <Link href="/terms" className="text-brand-light hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-brand-light hover:underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
              {errorMessage}
            </div>
          )}

          {/* Success Message Banner */}
          {successMessage && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-300">
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>{successMessage}</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="font-manrope mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand font-semibold text-white shadow-[0_0_24px_rgba(92,83,254,0.35)] transition-all hover:bg-brand/90 hover:shadow-[0_0_32px_rgba(92,83,254,0.5)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create {getRoleButtonLabel()} Account</span>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="font-manrope mt-6 text-center text-xs text-white/50">
          Already have a HireLoop account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-brand-light hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
