"use client"

import * as React from "react"
import { CheckCircle2, FileText, Loader2, Save, UploadCloud, User, X } from "lucide-react"

import { useDashboard } from "@/lib/dashboard-context"
import { useSession } from "@/lib/auth-client"

export default function SeekerSettingsPage() {
  const { data: session } = useSession()
  const { seekerProfile, updateSeekerProfile } = useDashboard()

  const [name, setName] = React.useState(session?.user?.name || "Alex Rivera")
  const [email, setEmail] = React.useState(session?.user?.email || "alex.rivera@example.com")
  const [headline, setHeadline] = React.useState(seekerProfile.headline)
  const [bio, setBio] = React.useState(seekerProfile.bio)
  const [location, setLocation] = React.useState(seekerProfile.location)
  const [skillInput, setSkillInput] = React.useState("")
  const [skills, setSkills] = React.useState<string[]>(seekerProfile.skills)
  const [resumeName, setResumeName] = React.useState(seekerProfile.resumeName)
  const [isSaving, setIsSaving] = React.useState(false)
  const [saveSuccess, setSaveSuccess] = React.useState(false)

  const handleAddSkill = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault()
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()])
      }
      setSkillInput("")
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    await new Promise((r) => setTimeout(r, 600))
    updateSeekerProfile({
      headline,
      bio,
      location,
      skills,
      resumeName,
    })
    setIsSaving(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      <div className="border-b border-white/10 pb-5">
        <h1 className="font-manrope text-2xl font-bold text-white">Seeker Profile & Settings</h1>
        <p className="text-xs sm:text-sm text-white/60">
          Maintain your personal branding, skills tags, and default resume for 1-click applications.
        </p>
      </div>

      {saveSuccess && (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Profile and settings updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal Details */}
        <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-6 shadow-xl space-y-4">
          <h3 className="font-manrope text-base font-bold text-white">Account Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-white/70 block mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#14141c] px-3.5 py-2.5 text-xs text-white focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-white/70 block mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full rounded-xl border border-white/5 bg-[#14141c]/50 px-3.5 py-2.5 text-xs text-white/50 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-white/70 block mb-1.5">Professional Headline</label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. Senior Machine Learning Engineer"
              className="w-full rounded-xl border border-white/10 bg-[#14141c] px-3.5 py-2.5 text-xs text-white focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-white/70 block mb-1.5">Short Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell hiring teams about your focus and experience..."
              className="w-full rounded-xl border border-white/10 bg-[#14141c] p-3 text-xs text-white focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-white/70 block mb-1.5">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. San Francisco, CA (Remote)"
              className="w-full rounded-xl border border-white/10 bg-[#14141c] px-3.5 py-2.5 text-xs text-white focus:border-brand focus:outline-none"
            />
          </div>
        </div>

        {/* Skills Tag Management */}
        <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-6 shadow-xl space-y-4">
          <h3 className="font-manrope text-base font-bold text-white">Skills & Technologies</h3>
          <p className="text-xs text-white/60">Type a skill and press Enter to add it to your profile tags.</p>

          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleAddSkill}
            placeholder="Type skill (e.g. Docker, Rust, Next.js) and press Enter..."
            className="w-full rounded-xl border border-white/10 bg-[#14141c] px-3.5 py-2.5 text-xs text-white focus:border-brand focus:outline-none"
          />

          <div className="flex flex-wrap gap-2 pt-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 rounded-lg border border-brand/30 bg-brand/10 px-3 py-1 text-xs text-white"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-white/50 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Resume PDF Settings */}
        <div className="rounded-2xl border border-white/10 bg-[#0d0d12]/95 p-6 shadow-xl space-y-4">
          <h3 className="font-manrope text-base font-bold text-white">Default Resume (PDF)</h3>
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#14141c] p-4 text-xs">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-brand-light" />
              <div>
                <span className="font-semibold text-white block">{resumeName}</span>
                <span className="text-[11px] text-white/50">PDF Document • Uploaded & Verified</span>
              </div>
            </div>

            <label className="cursor-pointer rounded-xl bg-white/[0.05] border border-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/[0.1] transition-colors">
              Upload New
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) setResumeName(file.name)
                }}
              />
            </label>
          </div>
        </div>

        {/* Save CTA */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-7 py-3 text-xs font-semibold text-white shadow-lg hover:bg-brand/90 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save All Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
