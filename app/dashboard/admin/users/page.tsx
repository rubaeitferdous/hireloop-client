"use client"

import * as React from "react"
import { Search, UserCheck, UserX, Shield, Briefcase, User, CheckCircle2 } from "lucide-react"

import { useDashboard } from "@/lib/dashboard-context"

export default function AdminUsersPage() {
  const { users, toggleUserRole, toggleUserStatus } = useDashboard()
  const [searchEmail, setSearchEmail] = React.useState("")
  const [roleFilter, setRoleFilter] = React.useState<string>("All")
  const [actionAlert, setActionAlert] = React.useState<string | null>(null)

  const filteredUsers = users.filter((u) => {
    if (searchEmail.trim() && !u.email.toLowerCase().includes(searchEmail.toLowerCase())) {
      return false
    }
    if (roleFilter !== "All" && u.role !== roleFilter) {
      return false
    }
    return true
  })

  const handleRoleToggle = (userId: string, name: string, currentRole: string) => {
    const targetRole = currentRole === "seeker" ? "Recruiter" : "Job Seeker"
    if (confirm(`Are you sure you want to change ${name}'s role to ${targetRole}?`)) {
      toggleUserRole(userId)
      setActionAlert(`Role updated for ${name} to ${targetRole}.`)
      setTimeout(() => setActionAlert(null), 4000)
    }
  }

  const handleStatusToggle = (userId: string, name: string, currentStatus: string) => {
    const nextStatus = currentStatus === "Active" ? "Suspended" : "Active"
    toggleUserStatus(userId)
    setActionAlert(`Account for ${name} is now ${nextStatus}.`)
    setTimeout(() => setActionAlert(null), 4000)
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <h1 className="font-manrope text-2xl font-bold text-white">Platform User Governance ({users.length})</h1>
          <p className="text-xs sm:text-sm text-white/60">
            Control roles, elevate seekers to recruiters, and suspend or activate accounts.
          </p>
        </div>
      </div>

      {actionAlert && (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{actionAlert}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex w-full sm:w-80 items-center gap-2.5 rounded-xl border border-white/10 bg-[#0d0d12] px-3.5 py-2 text-xs">
          <Search className="h-4 w-4 text-white/40" />
          <input
            type="text"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            placeholder="Search by user email..."
            className="w-full bg-transparent text-white placeholder:text-white/40 focus:outline-none"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="w-full sm:w-auto rounded-xl border border-white/10 bg-[#0d0d12] px-3.5 py-2 text-xs text-white focus:outline-none"
        >
          <option value="All">All Roles</option>
          <option value="seeker">Job Seekers</option>
          <option value="recruiter">Recruiters</option>
          <option value="admin">Administrators</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d0d12]/95 shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-white/10 bg-white/[0.02] text-[10px] font-bold uppercase tracking-wider text-white/50">
            <tr>
              <th className="py-4 px-5">User</th>
              <th className="py-4 px-4">Assigned Role</th>
              <th className="py-4 px-4">Member Since</th>
              <th className="py-4 px-4">Account Status</th>
              <th className="py-4 px-5 text-right">Administrative Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-white/80">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-xs font-bold text-white">
                      {user.name[0]}
                    </div>
                    <div>
                      <span className="font-manrope font-bold text-white block text-sm">{user.name}</span>
                      <span className="font-mono text-[11px] text-white/50">{user.email}</span>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      user.role === "admin"
                        ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                        : user.role === "recruiter"
                        ? "bg-brand/10 text-brand-light border border-brand/20"
                        : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="py-4 px-4 text-white/60">
                  {user.joinedAt}
                </td>

                <td className="py-4 px-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      user.status === "Active"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="py-4 px-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {user.role !== "admin" && (
                      <button
                        type="button"
                        onClick={() => handleRoleToggle(user.id, user.name, user.role)}
                        className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-semibold text-white/80 hover:bg-white/[0.08] hover:text-white transition-colors"
                      >
                        {user.role === "seeker" ? "Make Recruiter" : "Make Seeker"}
                      </button>
                    )}

                    {user.role !== "admin" && (
                      <button
                        type="button"
                        onClick={() => handleStatusToggle(user.id, user.name, user.status)}
                        className={`rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                          user.status === "Active"
                            ? "border-rose-500/20 text-rose-400 hover:bg-rose-500/10"
                            : "border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10"
                        }`}
                      >
                        {user.status === "Active" ? "Suspend" : "Activate"}
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
