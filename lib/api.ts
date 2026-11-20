/**
 * HireLoop API Client
 * Provides typed methods for interacting with the Express 5 backend server.
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (typeof window !== "undefined" && window.location.hostname !== "localhost"
    ? ""
    : "http://localhost:5000");

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMsg = `API request failed with status ${response.status}`;
    try {
      const errJson = await response.json();
      if (errJson.error) errorMsg = errJson.error;
    } catch {
      // ignore
    }
    throw new Error(errorMsg);
  }

  return response.json() as Promise<T>;
}

// ----------------------------------------------------
// Jobs API
// ----------------------------------------------------
export interface JobQueryFilters {
  q?: string;
  category?: string;
  jobType?: string;
  isRemote?: boolean;
  salaryMin?: number;
  salaryMax?: number;
  experienceLevel?: string;
  companyId?: string;
  recruiterEmail?: string;
  status?: string;
  featured?: boolean;
  sort?: string;
  page?: number;
  limit?: number;
}

export const api = {
  // Jobs
  async getJobs(filters: JobQueryFilters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "" && val !== "All") {
        params.append(key, String(val));
      }
    });
    const qs = params.toString();
    return request<{ success: boolean; total: number; jobs: any[] }>(`/jobs${qs ? `?${qs}` : ""}`);
  },

  async getJob(id: string) {
    return request<{ success: boolean; job: any }>(`/jobs/${encodeURIComponent(id)}`);
  },

  async createJob(jobData: any) {
    return request<{ success: boolean; job: any }>("/jobs", {
      method: "POST",
      body: JSON.stringify(jobData),
    });
  },

  async updateJob(id: string, updates: any) {
    return request<{ success: boolean; job: any }>(`/jobs/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
  },

  async deleteJob(id: string) {
    return request<{ success: boolean; message: string }>(`/jobs/${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  },

  // Companies
  async getCompanies(filters: { q?: string; industry?: string; approvalStatus?: string; all?: boolean } = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== "" && val !== "All") {
        params.append(key, String(val));
      }
    });
    const qs = params.toString();
    return request<{ success: boolean; total: number; companies: any[] }>(`/companies${qs ? `?${qs}` : ""}`);
  },

  async getCompany(id: string) {
    return request<{ success: boolean; company: any; jobs: any[] }>(`/companies/${encodeURIComponent(id)}`);
  },

  async registerCompany(companyData: any) {
    return request<{ success: boolean; company: any }>("/companies", {
      method: "POST",
      body: JSON.stringify(companyData),
    });
  },

  async updateCompany(id: string, updates: any) {
    return request<{ success: boolean; company: any }>(`/companies/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
  },

  async setCompanyStatus(id: string, status: "Approved" | "Rejected" | "Pending") {
    return request<{ success: boolean; company: any }>(`/companies/${encodeURIComponent(id)}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },

  // Applications
  async getApplications(filters: { seekerEmail?: string; jobId?: string; companyId?: string } = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val) params.append(key, String(val));
    });
    const qs = params.toString();
    return request<{ success: boolean; count: number; applications: any[] }>(`/applications${qs ? `?${qs}` : ""}`);
  },

  async submitApplication(data: {
    jobId: string;
    seekerEmail: string;
    seekerName?: string;
    seekerId?: string;
    resumeUrl?: string;
    coverLetter?: string;
  }) {
    return request<{ success: boolean; application: any; message: string }>("/applications", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateApplicationStatus(id: string, status: string, recruiterNotes?: string) {
    return request<{ success: boolean; application: any }>(`/applications/${encodeURIComponent(id)}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status, recruiterNotes }),
    });
  },

  // Saved Jobs
  async getSavedJobs(userEmail: string) {
    return request<{ success: boolean; savedJobIds: string[]; jobs: any[] }>(
      `/saved-jobs?userEmail=${encodeURIComponent(userEmail)}`
    );
  },

  async toggleSavedJob(userEmail: string, jobId: string) {
    return request<{ success: boolean; isSaved: boolean; action: string }>("/saved-jobs", {
      method: "POST",
      body: JSON.stringify({ userEmail, jobId }),
    });
  },

  // Users & Admin Moderation
  async getUsers(filters: { q?: string; role?: string; status?: string } = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val && val !== "All") params.append(key, String(val));
    });
    const qs = params.toString();
    return request<{ success: boolean; count: number; users: any[] }>(`/users${qs ? `?${qs}` : ""}`);
  },

  async updateUserRole(id: string, role: "seeker" | "recruiter" | "admin") {
    return request<{ success: boolean; user: any }>(`/users/${encodeURIComponent(id)}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    });
  },

  async updateUserStatus(id: string, status: "Active" | "Suspended") {
    return request<{ success: boolean; user: any }>(`/users/${encodeURIComponent(id)}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },

  // Billing & Subscriptions
  async getSubscription(userEmail: string, role?: string) {
    const qs = role ? `?role=${role}` : "";
    return request<{ success: boolean; plan: any }>(`/subscriptions/${encodeURIComponent(userEmail)}${qs}`);
  },

  async upgradeSubscription(data: { userEmail: string; plan: string; role: string; amount?: number }) {
    return request<{ success: boolean; subscription: any; transaction: any }>("/subscriptions/upgrade", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getPayments(userEmail?: string) {
    const qs = userEmail ? `?userEmail=${encodeURIComponent(userEmail)}` : "";
    return request<{ success: boolean; count: number; payments: any[] }>(`/payments${qs}`);
  },

  // Admin Stats
  async getAdminStats() {
    return request<{
      success: boolean;
      stats: any;
      categoryDistribution: any[];
      recentPayments: any[];
      recentUsers: any[];
    }>("/admin/stats");
  },
};
