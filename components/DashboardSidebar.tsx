"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  Bookmark,
  Briefcase,
  Building2,
  CreditCard,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
  Compass,
  DollarSign,
  Tag,
} from "lucide-react"

import logo from "@/app/images/logo.png"
import { useDashboard } from "@/lib/dashboard-context"
import { useSession, signOut } from "@/lib/auth-client"

export function DashboardSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const { activeRole, setActiveRole } = useDashboard()
  const [isSigningOut, setIsSigningOut] = React.useState(false)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      await signOut()
      router.push("/")
      router.refresh()
    } finally {
      setIsSigningOut(false)
    }
  }

  // Get user initials
  const userName = session?.user?.name || (activeRole === "admin" ? "Platform Admin" : activeRole === "recruiter" ? "Elena Rostova" : "Alex Rivera")
  const userEmail = session?.user?.email || (activeRole === "admin" ? "admin@hireloop.io" : activeRole === "recruiter" ? "recruiter@meta.com" : "alex.rivera@example.com")
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  // Navigation Links by Role
  const seekerLinks = [
    { label: "Dashboard Overview", href: "/dashboard/seeker", icon: LayoutDashboard },
    { label: "Browse & Apply", href: "/dashboard/seeker/jobs", icon: Compass },
    { label: "Saved Jobs", href: "/dashboard/seeker/saved", icon: Bookmark },
    { label: "My Applications", href: "/dashboard/seeker/applications", icon: FileText },
    { label: "Subscription & Billing", href: "/dashboard/seeker/billing", icon: CreditCard },
    { label: "Seeker Settings", href: "/dashboard/seeker/settings", icon: Settings },
  ]

  const recruiterLinks = [
    { label: "Recruiter Overview", href: "/dashboard/recruiter", icon: LayoutDashboard },
    { label: "My Company", href: "/dashboard/recruiter/company", icon: Building2 },
    { label: "Manage Jobs", href: "/dashboard/recruiter/jobs", icon: Briefcase },
    { label: "Post a New Job", href: "/dashboard/recruiter/jobs/new", icon: PlusCircle },
    { label: "Subscription & Billing", href: "/dashboard/recruiter/billing", icon: CreditCard },
    { label: "Recruiter Settings", href: "/dashboard/recruiter/settings", icon: Settings },
  ]

  const adminLinks = [
    { label: "Admin Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
    { label: "Manage Companies", href: "/dashboard/admin/companies", icon: Building2 },
    { label: "Manage Jobs", href: "/dashboard/admin/jobs", icon: Briefcase },
    { label: "Platform Payments", href: "/dashboard/admin/payments", icon: DollarSign },
    { label: "Admin Settings", href: "/dashboard/admin/settings", icon: Settings },
  ]

  const publicLinks = [
    { label: "Explore Jobs", href: "/jobs", icon: Compass },
    { label: "Company Directory", href: "/companies", icon: Building2 },
    { label: "Pricing & Plans", href: "/pricing", icon: Tag },
    { label: "Return to Home", href: "/", icon: Home },
  ]

  const activeLinks = activeRole === "admin" ? adminLinks : activeRole === "recruiter" ? recruiterLinks : seekerLinks

  const handleRoleSwitch = (newRole: "seeker" | "recruiter" | "admin") => {
    setActiveRole(newRole)
    if (newRole === "seeker") router.push("/dashboard/seeker")
    if (newRole === "recruiter") router.push("/dashboard/recruiter")
    if (newRole === "admin") router.push("/dashboard/admin")
    if (onNavigate) onNavigate()
  }

  return (
    <div className="flex h-full w-full flex-col justify-between border-r border-white/10 bg-[#08080c] p-4 sm:p-5 text-white/80">
      <div>
        {/* Brand Logo */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <Link href="/" className="inline-block" onClick={onNavigate}>
            <Image src={logo} alt="HireLoop" className="h-7 w-auto" />
          </Link>
          <span className="font-space-mono text-[10px] uppercase tracking-wider text-brand-light bg-brand/10 border border-brand/20 px-2 py-0.5 rounded-full">
            Portal
          </span>
        </div>

        {/* User Profile Card */}
        <div className="mt-5 rounded-2xl border border-white/10 bg-[#101017] p-3.5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/25 text-sm font-bold text-white ring-1 ring-brand/40">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="truncate text-sm font-semibold text-white">{userName}</h4>
              <p className="truncate text-[11px] text-white/50">{userEmail}</p>
            </div>
          </div>

          {/* Role Pill Switcher */}
          <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">Active Role</span>
            <div className="flex items-center gap-1">
              {(["seeker", "recruiter", "admin"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRoleSwitch(r)}
                  className={`rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider transition-all ${
                    activeRole === r
                      ? "bg-brand text-white shadow-sm"
                      : "bg-white/[0.04] text-white/50 hover:text-white"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Role Navigation Links */}
        <div className="mt-6">
          <span className="font-space-mono text-[10px] font-bold uppercase tracking-wider text-white/40 px-2">
            {activeRole} Console
          </span>

          <nav className="mt-2 space-y-1">
            {activeLinks.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                    isActive
                      ? "bg-brand text-white shadow-[0_0_16px_rgba(92,83,254,0.35)]"
                      : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-white/50"}`} />
                  <span className="truncate">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Public Links */}
        <div className="mt-8 border-t border-white/10 pt-4">
          <span className="font-space-mono text-[10px] font-bold uppercase tracking-wider text-white/40 px-2">
            Platform Links
          </span>
          <nav className="mt-2 space-y-1">
            {publicLinks.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className="flex items-center gap-3 rounded-xl px-3 py-1.5 text-xs text-white/60 transition-colors hover:bg-white/[0.03] hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5 text-white/40 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Logout Action */}
      <div className="mt-6 border-t border-white/10 pt-4">
        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-400 transition-colors hover:bg-rose-500/10 disabled:opacity-50"
        >
          <LogOut className="h-4 w-4" />
          <span>{isSigningOut ? "Signing Out..." : "Sign Out"}</span>
        </button>
      </div>
    </div>
  )
}
