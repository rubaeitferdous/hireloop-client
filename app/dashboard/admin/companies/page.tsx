"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Building2, CheckCircle2, XCircle, Search, ExternalLink, ShieldCheck } from "lucide-react"

import { useDashboard, CompanyApprovalStatus } from "@/lib/dashboard-context"

const STATUS_BADGES: Record<CompanyApprovalStatus, string> = {
  Approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Rejected: "bg-red-500/10 text-red-400 border-red-500/20",
}

export default function AdminCompaniesPage() {
  const { companies, approveCompany, rejectCompany } = useDashboard()
  const [filterStatus, setFilterStatus] = React.useState<string>("All")
  const [search, setSearch] = React.useState("")
  const [feedback, setFeedback] = React.useState<string | null>(null)

  const filteredCompanies = companies.filter((c) => {
    if (search.trim() && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.recruiterEmail.toLowerCase().includes(search.toLowerCase())) {
      return false
    }
    if (filterStatus !== "All" && c.approvalStatus !== filterStatus) {
      return false
    }
    return true
  })

  const handleApprove = (companyId: string, companyName: string) => {
    approveCompany(companyId)
    setFeedback(`"${companyName}" has been APPROVED and is now publicly visible.`)
    setTimeout(() => setFeedback(null), 4000)
  }

  const handleReject = (companyId: string, companyName: string) => {
    rejectCompany(companyId)
    setFeedback(`"${companyName}" registration has been REJECTED.`)
    setTimeout(() => setFeedback(null), 4000)
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="font-manrope text-2xl font-bold text-white">Company Registration Approvals ({companies.length})</h1>
          <p className="text-xs sm:text-sm text-white/60">
            Verify legitimate business identities and authorize recruiter job publication privileges.
          </p>
        </div>
      </div>

      {feedback && (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex w-full sm:w-80 items-center gap-2.5 rounded-xl border border-white/10 bg-[#0d0d12] px-3.5 py-2 text-xs">
          <Search className="h-4 w-4 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company or recruiter email..."
            className="w-full bg-transparent text-white placeholder:text-white/40 focus:outline-none"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full sm:w-auto rounded-xl border border-white/10 bg-[#0d0d12] px-3.5 py-2 text-xs text-white focus:outline-none"
        >
          <option value="All">All Verification Statuses</option>
          <option value="Pending">Pending Review</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d0d12]/95 shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-white/10 bg-white/[0.02] text-[10px] font-bold uppercase tracking-wider text-white/50">
            <tr>
              <th className="py-4 px-5">Company</th>
              <th className="py-4 px-4">Recruiter Lead</th>
              <th className="py-4 px-4">Industry</th>
              <th className="py-4 px-4">Verification Status</th>
              <th className="py-4 px-5 text-right">Review Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-white/80">
            {filteredCompanies.map((comp) => (
              <tr key={comp.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#16161c] p-1.5">
                      <Image
                        src={comp.logo}
                        alt={comp.name}
                        width={30}
                        height={30}
                        className="max-h-6 w-auto object-contain brightness-125"
                      />
                    </div>
                    <div>
                      <span className="font-manrope font-bold text-white block text-sm">{comp.name}</span>
                      <span className="text-[11px] text-white/40">{comp.location} • {comp.employeeCount}</span>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-4 font-mono text-white/60">
                  {comp.recruiterEmail}
                </td>

                <td className="py-4 px-4 text-white/70">
                  {comp.industry}
                </td>

                <td className="py-4 px-4">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${STATUS_BADGES[comp.approvalStatus]}`}>
                    {comp.approvalStatus}
                  </span>
                </td>

                <td className="py-4 px-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {comp.approvalStatus !== "Approved" && (
                      <button
                        type="button"
                        onClick={() => handleApprove(comp.id, comp.name)}
                        className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                      >
                        Approve
                      </button>
                    )}

                    {comp.approvalStatus !== "Rejected" && (
                      <button
                        type="button"
                        onClick={() => handleReject(comp.id, comp.name)}
                        className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-400 hover:bg-rose-500/20 transition-colors"
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
