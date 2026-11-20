"use client"

import * as React from "react"
import { useSession } from "@/lib/auth-client"
import { mockJobs, mockCompanies, Job, Company } from "@/lib/mock-data"
import { api } from "@/lib/api"

export type ApplicationStatus = "Applied" | "Under Review" | "Shortlisted" | "Rejected" | "Offered"
export type CompanyApprovalStatus = "Pending" | "Approved" | "Rejected"

export interface ApplicationRecord {
  id: string
  jobId: string
  jobTitle: string
  companyId: string
  companyName: string
  companyLogo: string
  seekerName: string
  seekerEmail: string
  resumeUrl: string
  coverLetter?: string
  appliedAt: string
  status: ApplicationStatus
}

export interface PaymentTransaction {
  id: string
  userEmail: string
  plan: string
  amount: number
  currency: string
  date: string
  status: "Completed" | "Pending" | "Refunded"
}

export interface PlatformUser {
  id: string
  name: string
  email: string
  role: "seeker" | "recruiter" | "admin"
  joinedAt: string
  status: "Active" | "Suspended"
}

interface DashboardContextType {
  // Current user & active role
  activeRole: "seeker" | "recruiter" | "admin"
  setActiveRole: (role: "seeker" | "recruiter" | "admin") => void

  // Seeker State & Actions
  applications: ApplicationRecord[]
  savedJobIds: string[]
  toggleSaveJob: (jobId: string) => void
  submitApplication: (jobId: string, coverLetter?: string, resumeName?: string) => Promise<boolean>
  seekerPlan: {
    name: "Free" | "Pro" | "Premium"
    price: number
    applicationsUsed: number
    applicationsLimit: number
  }
  upgradeSeekerPlan: (plan: "Free" | "Pro" | "Premium") => void
  seekerProfile: {
    headline: string
    bio: string
    skills: string[]
    resumeName: string
    location: string
  }
  updateSeekerProfile: (profile: Partial<DashboardContextType["seekerProfile"]>) => void

  // Recruiter State & Actions
  myCompany: {
    id: string
    name: string
    logo: string
    industry: string
    website: string
    location: string
    employeeCount: string
    description: string
    status: CompanyApprovalStatus
  } | null
  registerOrUpdateCompany: (companyData: Partial<NonNullable<DashboardContextType["myCompany"]>>) => void
  recruiterJobs: Job[]
  addJob: (newJob: Omit<Job, "id" | "postedAt" | "companyId" | "companyName" | "companyLogo">) => boolean
  deleteJob: (jobId: string) => void
  toggleJobClose: (jobId: string) => void
  updateApplicantStatus: (applicationId: string, newStatus: ApplicationStatus) => void
  recruiterPlan: {
    name: "Free" | "Growth" | "Enterprise"
    price: number
    activeJobsLimit: number
  }
  upgradeRecruiterPlan: (plan: "Free" | "Growth" | "Enterprise") => void

  // Admin State & Actions
  users: PlatformUser[]
  toggleUserRole: (userId: string) => void
  toggleUserStatus: (userId: string) => void
  companies: Array<Company & { approvalStatus: CompanyApprovalStatus; recruiterEmail: string }>
  approveCompany: (companyId: string) => void
  rejectCompany: (companyId: string) => void
  deletePlatformJob: (jobId: string) => void
  payments: PaymentTransaction[]
}

const DashboardContext = React.createContext<DashboardContextType | undefined>(undefined)

const initialApplications: ApplicationRecord[] = [
  {
    id: "app-1",
    jobId: "meta-senior-ai-engineer",
    jobTitle: "Senior AI & Machine Learning Engineer",
    companyId: "meta",
    companyName: "Meta",
    companyLogo: "/logos/meta.png",
    seekerName: "Alex Rivera",
    seekerEmail: "alex.rivera@example.com",
    resumeUrl: "/resumes/alex-rivera-resume.pdf",
    coverLetter: "Excited to bring 6 years of deep learning and PyTorch cluster scaling experience to Meta GenAI.",
    appliedAt: "2 days ago",
    status: "Under Review",
  },
  {
    id: "app-2",
    jobId: "airbnb-lead-product-designer",
    jobTitle: "Lead Product & Systems Designer",
    companyId: "airbnb",
    companyName: "Airbnb",
    companyLogo: "/logos/airbnb.png",
    seekerName: "Alex Rivera",
    seekerEmail: "alex.rivera@example.com",
    resumeUrl: "/resumes/alex-rivera-resume.pdf",
    appliedAt: "5 days ago",
    status: "Shortlisted",
  },
  {
    id: "app-3",
    jobId: "google-staff-cloud-architect",
    jobTitle: "Staff Cloud Infrastructure Architect",
    companyId: "google",
    companyName: "Google",
    companyLogo: "/logos/google.png",
    seekerName: "Alex Rivera",
    seekerEmail: "alex.rivera@example.com",
    resumeUrl: "/resumes/alex-rivera-resume.pdf",
    appliedAt: "2 weeks ago",
    status: "Applied",
  },
  {
    id: "app-4",
    jobId: "spotify-principal-fullstack",
    jobTitle: "Principal Full Stack Developer",
    companyId: "spotify",
    companyName: "Spotify",
    companyLogo: "/logos/spotify.png",
    seekerName: "Samantha Reed",
    seekerEmail: "samantha.reed@example.com",
    resumeUrl: "/resumes/samantha-resume.pdf",
    appliedAt: "1 day ago",
    status: "Applied",
  },
]

const initialUsers: PlatformUser[] = [
  {
    id: "u-1",
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    role: "seeker",
    joinedAt: "Jan 12, 2026",
    status: "Active",
  },
  {
    id: "u-2",
    name: "Elena Rostova",
    email: "recruiter@meta.com",
    role: "recruiter",
    joinedAt: "Feb 04, 2026",
    status: "Active",
  },
  {
    id: "u-3",
    name: "David Chen",
    email: "talent@airbnb.com",
    role: "recruiter",
    joinedAt: "Mar 18, 2026",
    status: "Active",
  },
  {
    id: "u-4",
    name: "Marcus Sterling",
    email: "marcus.dev@outlook.com",
    role: "seeker",
    joinedAt: "Apr 02, 2026",
    status: "Active",
  },
  {
    id: "u-5",
    name: "HireLoop Admin",
    email: "admin@hireloop.io",
    role: "admin",
    joinedAt: "Jan 01, 2026",
    status: "Active",
  },
]

const initialPayments: PaymentTransaction[] = [
  {
    id: "tx_1M67d9882a",
    userEmail: "alex.rivera@example.com",
    plan: "Pro (Seeker)",
    amount: 19,
    currency: "USD",
    date: "May 10, 2026",
    status: "Completed",
  },
  {
    id: "tx_1M992fa1bc",
    userEmail: "recruiter@meta.com",
    plan: "Enterprise (Recruiter)",
    amount: 149,
    currency: "USD",
    date: "May 12, 2026",
    status: "Completed",
  },
  {
    id: "tx_1M335cc84e",
    userEmail: "talent@airbnb.com",
    plan: "Growth (Recruiter)",
    amount: 49,
    currency: "USD",
    date: "May 15, 2026",
    status: "Completed",
  },
]

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()

  // Detect initial role
  const userRole = (session?.user as Record<string, unknown> | undefined)?.role as
    | "seeker"
    | "recruiter"
    | "admin"
    | undefined

  const [activeRole, setActiveRole] = React.useState<"seeker" | "recruiter" | "admin">(
    userRole === "recruiter" ? "recruiter" : userRole === "admin" ? "admin" : "seeker"
  )

  // Keep in sync if session role updates
  React.useEffect(() => {
    if (userRole && (userRole === "seeker" || userRole === "recruiter" || userRole === "admin")) {
      setActiveRole(userRole)
    }
  }, [userRole])

  // Seeker State
  const [applications, setApplications] = React.useState<ApplicationRecord[]>(initialApplications)
  const [savedJobIds, setSavedJobIds] = React.useState<string[]>([
    "meta-senior-ai-engineer",
    "spotify-principal-fullstack",
  ])
  const [seekerPlan, setSeekerPlan] = React.useState({
    name: "Pro" as "Free" | "Pro" | "Premium",
    price: 19,
    applicationsUsed: 3,
    applicationsLimit: 30,
  })
  const [seekerProfile, setSeekerProfile] = React.useState({
    headline: "Senior Distributed Systems & AI Engineer",
    bio: "Passionate about high-throughput inference runtimes, distributed consensus, and empowering developer ecosystems.",
    skills: ["TypeScript", "React 19", "PyTorch", "Go", "Kubernetes", "Next.js"],
    resumeName: "Alex_Rivera_Resume_2026.pdf",
    location: "San Francisco, CA (Remote)",
  })

  // Recruiter State
  const [myCompany, setMyCompany] = React.useState<DashboardContextType["myCompany"]>({
    id: "meta",
    name: "Meta",
    logo: "/logos/meta.png",
    industry: "AI",
    website: "https://about.meta.com",
    location: "Menlo Park, CA",
    employeeCount: "10,000+",
    description: "Building technologies that help people connect, find communities, and grow businesses.",
    status: "Approved",
  })
  const [recruiterJobs, setRecruiterJobs] = React.useState<Job[]>(mockJobs)
  const [recruiterPlan, setRecruiterPlan] = React.useState({
    name: "Growth" as "Free" | "Growth" | "Enterprise",
    price: 49,
    activeJobsLimit: 10,
  })

  // Admin State
  const [users, setUsers] = React.useState<PlatformUser[]>(initialUsers)
  const [companies, setCompanies] = React.useState(
    mockCompanies.map((c, i) => ({
      ...c,
      approvalStatus: (i === 0 || i === 1 ? "Approved" : i === 2 ? "Pending" : "Approved") as CompanyApprovalStatus,
      recruiterEmail: `recruiter@${c.id}.com`,
    }))
  )
  const [payments, setPayments] = React.useState<PaymentTransaction[]>(initialPayments)

  // Hydrate from live backend on mount if available
  React.useEffect(() => {
    let isMounted = true

    async function loadBackendData() {
      try {
        const [jobsRes, compsRes, appsRes, usersRes, paysRes] = await Promise.allSettled([
          api.getJobs(),
          api.getCompanies({ all: true }),
          api.getApplications(),
          api.getUsers(),
          api.getPayments(),
        ])

        if (!isMounted) return

        if (jobsRes.status === "fulfilled" && jobsRes.value.jobs?.length) {
          setRecruiterJobs(jobsRes.value.jobs)
        }
        if (compsRes.status === "fulfilled" && compsRes.value.companies?.length) {
          setCompanies(compsRes.value.companies.map((c: any) => ({
            ...c,
            approvalStatus: c.approvalStatus || "Approved",
            recruiterEmail: c.recruiterEmail || `recruiter@${c.id}.com`,
          })))
        }
        if (appsRes.status === "fulfilled" && appsRes.value.applications?.length) {
          setApplications(appsRes.value.applications)
        }
        if (usersRes.status === "fulfilled" && usersRes.value.users?.length) {
          setUsers(usersRes.value.users)
        }
        if (paysRes.status === "fulfilled" && paysRes.value.payments?.length) {
          setPayments(paysRes.value.payments)
        }
      } catch (err) {
        console.warn("Backend offline or unreachable, using local dashboard cache:", err)
      }
    }

    loadBackendData()
    return () => {
      isMounted = false
    }
  }, [])

  // Actions
  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    )
    const email = session?.user?.email || "alex.rivera@example.com"
    api.toggleSavedJob(email, jobId).catch((err) => console.warn("Could not sync saved job:", err))
  }

  const submitApplication = async (
    jobId: string,
    coverLetter?: string,
    resumeName?: string
  ): Promise<boolean> => {
    const targetJob = mockJobs.find((j) => j.id === jobId)
    if (!targetJob) return false

    // Plan quota validation
    if (seekerPlan.applicationsLimit !== Infinity && seekerPlan.applicationsUsed >= seekerPlan.applicationsLimit) {
      alert(`You have reached your monthly limit of ${seekerPlan.applicationsLimit} applications. Please upgrade to apply!`)
      return false
    }

    const newApp: ApplicationRecord = {
      id: `app-${Date.now()}`,
      jobId: targetJob.id,
      jobTitle: targetJob.title,
      companyId: targetJob.companyId,
      companyName: targetJob.companyName,
      companyLogo: targetJob.companyLogo,
      seekerName: session?.user?.name || "Alex Rivera",
      seekerEmail: session?.user?.email || "alex.rivera@example.com",
      resumeUrl: resumeName || seekerProfile.resumeName,
      coverLetter,
      appliedAt: "Just now",
      status: "Applied",
    }

    setApplications((prev) => [newApp, ...prev])
    setSeekerPlan((prev) => ({
      ...prev,
      applicationsUsed: prev.applicationsUsed + 1,
    }))

    // Sync to backend API
    api.submitApplication({
      jobId: targetJob.id,
      seekerEmail: newApp.seekerEmail,
      seekerName: newApp.seekerName,
      coverLetter,
      resumeUrl: newApp.resumeUrl,
    }).catch((err) => console.warn("Backend submit application error:", err))

    return true
  }

  const upgradeSeekerPlan = (plan: "Free" | "Pro" | "Premium") => {
    const priceMap = { Free: 0, Pro: 19, Premium: 39 }
    const limitMap = { Free: 3, Pro: 30, Premium: Infinity }

    setSeekerPlan({
      name: plan,
      price: priceMap[plan],
      applicationsUsed: 0,
      applicationsLimit: limitMap[plan],
    })

    const email = session?.user?.email || "alex.rivera@example.com"

    if (priceMap[plan] > 0) {
      const newTx: PaymentTransaction = {
        id: `tx_${Date.now()}`,
        userEmail: email,
        plan: `${plan} (Seeker)`,
        amount: priceMap[plan],
        currency: "USD",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        status: "Completed",
      }
      setPayments((prev) => [newTx, ...prev])
    }

    api.upgradeSubscription({
      userEmail: email,
      plan,
      role: "seeker",
      amount: priceMap[plan],
    }).catch((err) => console.warn("Backend upgrade plan error:", err))
  }

  const updateSeekerProfile = (updates: Partial<typeof seekerProfile>) => {
    setSeekerProfile((prev) => ({ ...prev, ...updates }))
  }

  const registerOrUpdateCompany = (data: Partial<NonNullable<typeof myCompany>>) => {
    setMyCompany((prev) => {
      if (!prev) {
        return {
          id: `comp-${Date.now()}`,
          name: data.name || "My Company",
          logo: data.logo || "/logos/google.png",
          industry: data.industry || "Developer Tools",
          website: data.website || "https://example.com",
          location: data.location || "San Francisco, CA",
          employeeCount: data.employeeCount || "10 - 50",
          description: data.description || "",
          status: "Pending",
        }
      }
      return {
        ...prev,
        ...data,
        status: data.status !== undefined ? data.status : "Pending",
      }
    })
  }

  const addJob = (jobInput: Omit<Job, "id" | "postedAt" | "companyId" | "companyName" | "companyLogo">): boolean => {
    if (!myCompany) {
      alert("Please register and verify your company before posting jobs.")
      return false
    }

    if (myCompany.status !== "Approved") {
      alert("Your company registration is pending Admin verification. You cannot post jobs yet.")
      return false
    }

    const activeCount = recruiterJobs.filter((j) => j.companyId === myCompany.id && j.status !== "Closed").length
    if (activeCount >= recruiterPlan.activeJobsLimit) {
      alert(`You have reached your limit of ${recruiterPlan.activeJobsLimit} active jobs. Upgrade to post more!`)
      return false
    }

    const newJob: Job = {
      ...jobInput,
      id: `job-${Date.now()}`,
      postedAt: "Just now",
      companyId: myCompany.id,
      companyName: myCompany.name,
      companyLogo: myCompany.logo,
      status: "Active",
    }

    setRecruiterJobs((prev) => [newJob, ...prev])
    api.createJob({
      ...newJob,
      recruiterEmail: session?.user?.email || "recruiter@meta.com",
    }).catch((err) => console.warn("Backend create job error:", err))

    return true
  }

  const deleteJob = (jobId: string) => {
    setRecruiterJobs((prev) => prev.filter((j) => j.id !== jobId))
    api.deleteJob(jobId).catch((err) => console.warn("Backend delete job error:", err))
  }

  const toggleJobClose = (jobId: string) => {
    const target = recruiterJobs.find((j) => j.id === jobId)
    const nextStatus = target?.status === "Closed" ? "Active" : "Closed"

    setRecruiterJobs((prev) =>
      prev.map((j) =>
        j.id === jobId
          ? { ...j, status: nextStatus }
          : j
      )
    )
    api.updateJob(jobId, { status: nextStatus }).catch((err) => console.warn("Backend toggle job status error:", err))
  }

  const updateApplicantStatus = (applicationId: string, newStatus: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === applicationId ? { ...app, status: newStatus } : app))
    )
    api.updateApplicationStatus(applicationId, newStatus).catch((err) => console.warn("Backend update applicant status error:", err))
  }

  const upgradeRecruiterPlan = (plan: "Free" | "Growth" | "Enterprise") => {
    const priceMap = { Free: 0, Growth: 49, Enterprise: 149 }
    const limitMap = { Free: 3, Growth: 10, Enterprise: 50 }

    setRecruiterPlan({
      name: plan,
      price: priceMap[plan],
      activeJobsLimit: limitMap[plan],
    })

    const email = session?.user?.email || "recruiter@meta.com"

    if (priceMap[plan] > 0) {
      const newTx: PaymentTransaction = {
        id: `tx_${Date.now()}`,
        userEmail: email,
        plan: `${plan} (Recruiter)`,
        amount: priceMap[plan],
        currency: "USD",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        status: "Completed",
      }
      setPayments((prev) => [newTx, ...prev])
    }

    api.upgradeSubscription({
      userEmail: email,
      plan,
      role: "recruiter",
      amount: priceMap[plan],
    }).catch((err) => console.warn("Backend recruiter upgrade error:", err))
  }

  // Admin Actions
  const toggleUserRole = (userId: string) => {
    const user = users.find((u) => u.id === userId)
    if (!user) return
    const nextRole = user.role === "seeker" ? "recruiter" : "seeker"

    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: nextRole } : u))
    )
    api.updateUserRole(userId, nextRole).catch((err) => console.warn("Backend toggle role error:", err))
  }

  const toggleUserStatus = (userId: string) => {
    const user = users.find((u) => u.id === userId)
    if (!user) return
    const nextStatus = user.status === "Active" ? "Suspended" : "Active"

    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: nextStatus } : u))
    )
    api.updateUserStatus(userId, nextStatus).catch((err) => console.warn("Backend toggle status error:", err))
  }

  const approveCompany = (companyId: string) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === companyId ? { ...c, approvalStatus: "Approved" } : c))
    )
    if (myCompany?.id === companyId) {
      setMyCompany((prev) => (prev ? { ...prev, status: "Approved" } : null))
    }
    api.setCompanyStatus(companyId, "Approved").catch((err) => console.warn("Backend approve company error:", err))
  }

  const rejectCompany = (companyId: string) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === companyId ? { ...c, approvalStatus: "Rejected" } : c))
    )
    if (myCompany?.id === companyId) {
      setMyCompany((prev) => (prev ? { ...prev, status: "Rejected" } : null))
    }
    api.setCompanyStatus(companyId, "Rejected").catch((err) => console.warn("Backend reject company error:", err))
  }

  const deletePlatformJob = (jobId: string) => {
    setRecruiterJobs((prev) => prev.filter((j) => j.id !== jobId))
    api.deleteJob(jobId).catch((err) => console.warn("Backend delete platform job error:", err))
  }

  return (
    <DashboardContext.Provider
      value={{
        activeRole,
        setActiveRole,
        applications,
        savedJobIds,
        toggleSaveJob,
        submitApplication,
        seekerPlan,
        upgradeSeekerPlan,
        seekerProfile,
        updateSeekerProfile,
        myCompany,
        registerOrUpdateCompany,
        recruiterJobs,
        addJob,
        deleteJob,
        toggleJobClose,
        updateApplicantStatus,
        recruiterPlan,
        upgradeRecruiterPlan,
        users,
        toggleUserRole,
        toggleUserStatus,
        companies,
        approveCompany,
        rejectCompany,
        deletePlatformJob,
        payments,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = React.useContext(DashboardContext)
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}
