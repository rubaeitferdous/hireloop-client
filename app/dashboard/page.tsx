"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useDashboard } from "@/lib/dashboard-context"

export default function DashboardRootPage() {
  const router = useRouter()
  const { activeRole } = useDashboard()

  React.useEffect(() => {
    if (activeRole === "admin") {
      router.replace("/dashboard/admin")
    } else if (activeRole === "recruiter") {
      router.replace("/dashboard/recruiter")
    } else {
      router.replace("/dashboard/seeker")
    }
  }, [activeRole, router])

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex items-center gap-2.5 text-xs text-white/50">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand border-t-transparent" />
        <span>Redirecting to your dashboard...</span>
      </div>
    </div>
  )
}
