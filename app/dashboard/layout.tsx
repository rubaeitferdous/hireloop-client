"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import logo from "@/app/images/logo.png"
import { useSession } from "@/lib/auth-client"
import { DashboardProvider } from "@/lib/dashboard-context"
import { DashboardSidebar } from "@/components/DashboardSidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session, isPending } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  // Client-side authentication check
  React.useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace(`/sign-in?callbackUrl=${encodeURIComponent(pathname || "/dashboard")}`)
    }
  }, [isPending, session, router, pathname])

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020205]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand border-t-transparent" />
          <span className="text-xs font-mono text-white/50 tracking-wider">Verifying session...</span>
        </div>
      </div>
    )
  }

  return (
    <DashboardProvider>
      <div className="flex min-h-screen bg-[#020205] text-foreground">
        {/* Desktop Sidebar (Fixed Left) */}
        <aside className="hidden w-64 shrink-0 lg:block border-r border-white/10">
          <div className="sticky top-0 h-screen overflow-y-auto">
            <DashboardSidebar />
          </div>
        </aside>

        {/* Mobile Header & Overlay Drawer */}
        <div className="flex flex-1 flex-col min-w-0">
          <header className="flex h-16 items-center justify-between border-b border-white/10 bg-[#07070b]/90 px-4 backdrop-blur-md lg:hidden">
            <Link href="/">
              <Image src={logo} alt="HireLoop" className="h-7 w-auto" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-xl border border-white/15 bg-white/[0.04] p-2 text-white/80 hover:text-white"
            >
              <Menu className="h-5 w-5" />
            </button>
          </header>

          {/* Mobile Sheet Menu */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 flex lg:hidden">
              <div
                className="fixed inset-0 bg-black/75 backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(false)}
              />
              <div className="relative flex w-72 flex-col bg-[#08080c] shadow-2xl">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute top-4 right-4 z-10 rounded-lg p-1.5 text-white/60 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="h-full overflow-y-auto">
                  <DashboardSidebar onNavigate={() => setMobileMenuOpen(false)} />
                </div>
              </div>
            </div>
          )}

          {/* Main Dynamic Role Page Content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
    </DashboardProvider>
  )
}
