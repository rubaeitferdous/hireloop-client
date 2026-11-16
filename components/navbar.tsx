"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, MenuIcon } from "lucide-react"

import logo from "@/app/images/logo.png"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { signOut, useSession } from "@/lib/auth-client"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

export function Navbar() {
  const router = useRouter()
  const { data: session, isPending } = useSession()

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
    router.refresh()
  }

  // Helper to extract initials
  const getInitials = (name?: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
  }

  const userRole = (session?.user as Record<string, unknown> | undefined)?.role

  return (
    <header className="px-4 pt-4 sm:px-10 sm:pt-6">
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between rounded-2xl bg-card pr-3 pl-5 sm:pr-4 sm:pl-6">
        <Link href="/" aria-label="Hireloop home" className="shrink-0">
          <Image src={logo} alt="Hireloop" priority className="h-8 w-auto" />
        </Link>

        <div className="flex items-center gap-4 sm:gap-5 md:gap-10">
          <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/90 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <span
            aria-hidden
            className="hidden h-5 w-px bg-foreground/15 md:mx-4 md:block"
          />

          {/* Session State Navigation */}
          {!isPending && session?.user ? (
            <div className="hidden items-center gap-3 md:flex">
              {/* Profile Avatar Pill matching Figma */}
              <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#141419] py-1 pr-3 pl-1.5 shadow-sm">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand/30 text-xs font-bold text-white ring-1 ring-brand/50">
                  {getInitials(session.user.name)}
                </div>
                <div className="flex flex-col">
                  <span className="max-w-[120px] truncate text-xs font-semibold text-white">
                    {session.user.name}
                  </span>
                  {userRole ? (
                    <span className="text-[10px] font-medium uppercase tracking-wider text-brand-light">
                      {String(userRole)}
                    </span>
                  ) : null}
                </div>
              </div>

              {/* Sign Out Button */}
              <button
                type="button"
                onClick={handleSignOut}
                aria-label="Sign out"
                title="Sign out"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/60 transition-colors hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-400"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-4 md:flex">
              <Link
                href="/sign-in"
                className="text-sm font-medium text-brand-light transition-colors hover:text-brand-light/80"
              >
                Sign In
              </Link>

              <Button
                render={<Link href="/sign-up" />}
                nativeButton={false}
                className="h-10 bg-brand px-5 text-[15px] text-white hover:bg-brand/90 sm:px-6"
              >
                Get Started
              </Button>
            </div>
          )}

          {/* Mobile Sheet Menu */}
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  className="md:hidden"
                />
              }
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right" className="gap-0 bg-popover">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-3">
                {/* Mobile Session Header */}
                {!isPending && session?.user && (
                  <div className="mb-3 flex items-center gap-3 rounded-xl border border-white/10 bg-[#121216] p-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/30 text-sm font-bold text-white ring-1 ring-brand/50">
                      {getInitials(session.user.name)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white">
                        {session.user.name}
                      </span>
                      <span className="text-xs text-white/50">
                        {session.user.email}
                      </span>
                    </div>
                  </div>
                )}

                {navLinks.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={<Link href={link.href} />}
                    nativeButton={false}
                    className="rounded-lg px-3 py-2.5 text-base text-foreground/90 transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                  </SheetClose>
                ))}
                <span aria-hidden className="my-2 h-px bg-border" />
                {!isPending && session?.user ? (
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-base font-medium text-rose-400 transition-colors hover:bg-rose-500/10"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                ) : (
                  <SheetClose
                    render={<Link href="/sign-in" />}
                    nativeButton={false}
                    className="rounded-lg px-3 py-2.5 text-base font-medium text-brand-light transition-colors hover:bg-muted/50"
                  >
                    Sign In
                  </SheetClose>
                )}
              </nav>
              {!session?.user && (
                <SheetFooter className="p-3">
                  <SheetClose
                    render={
                      <Button
                        render={<Link href="/sign-up" />}
                        nativeButton={false}
                        className="h-11 w-full bg-brand text-[15px] text-white hover:bg-brand/90"
                      />
                    }
                  >
                    Get Started
                  </SheetClose>
                </SheetFooter>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
