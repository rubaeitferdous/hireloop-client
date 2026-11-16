import Image from "next/image"
import Link from "next/link"
import { MenuIcon } from "lucide-react"

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

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

export function Navbar() {
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

          <Link
            href="/sign-in"
            className="hidden text-sm font-medium text-brand-light transition-colors hover:text-brand-light/80 md:block"
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
                <SheetClose
                  render={<Link href="/sign-in" />}
                  nativeButton={false}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-brand-light transition-colors hover:bg-muted/50"
                >
                  Sign In
                </SheetClose>
              </nav>
              <SheetFooter className="p-3">
                <SheetClose
                  render={
                    <Button className="h-11 w-full bg-brand text-[15px] text-white hover:bg-brand/90" />
                  }
                >
                  Get Started
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
