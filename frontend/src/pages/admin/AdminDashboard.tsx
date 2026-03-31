import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Briefcase,
  FileText,
  Eye,
  X,
  MapPin,
  Globe,
  CalendarDays,
  User as UserIcon,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

interface RecentUser {
  id: string;
  full_name: string | null;
  role: string | null;
  created_at: string | null;
  company_name: string | null;
  location?: string | null;
  website?: string | null;
  company_size?: string | null;
  industry?: string | null;
  job_title?: string | null;
  skills?: string | null;
  about?: string | null;
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return "Unknown";
  return new Date(dateString).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [jobSeekersCount, setJobSeekersCount] = useState(0);
  const [companiesCount, setCompaniesCount] = useState(0);
  const [jobsCount, setJobsCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<RecentUser | null>(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);

      const [
        seekersRes,
        recruitersRes,
        jobsRes,
        applicationsRes,
        recentUsersRes,
      ] = await Promise.all([
        supabase
          .from("profiles")
          .select("id", { count: "exact", head: true })
          .eq("role", "job_seeker"),

        supabase
          .from("profiles")
          .select("id", { count: "exact", head: true })
          .eq("role", "recruiter"),

        supabase
          .from("jobs")
          .select("id", { count: "exact", head: true }),

        supabase
          .from("applications")
          .select("id", { count: "exact", head: true }),

        supabase
          .from("profiles")
          .select(
            "id, full_name, role, created_at, company_name, location, website, company_size, industry, job_title, skills, about"
          )
          .order("created_at", { ascending: false })
          .limit(6),
      ]);

      if (seekersRes.error) console.error(seekersRes.error);
      if (recruitersRes.error) console.error(recruitersRes.error);
      if (jobsRes.error) console.error(jobsRes.error);
      if (applicationsRes.error) console.error(applicationsRes.error);
      if (recentUsersRes.error) console.error(recentUsersRes.error);

      if (
        seekersRes.error ||
        recruitersRes.error ||
        jobsRes.error ||
        applicationsRes.error ||
        recentUsersRes.error
      ) {
        toast.error("Failed to load admin dashboard");
      }

      setJobSeekersCount(seekersRes.count || 0);
      setCompaniesCount(recruitersRes.count || 0);
      setJobsCount(jobsRes.count || 0);
      setApplicationsCount(applicationsRes.count || 0);
      setRecentUsers(recentUsersRes.data || []);
      setLoading(false);
    };

    fetchAdminData();
  }, []);

  const stats = useMemo(
    () => [
      {
        label: "Companies",
        value: loading ? "..." : String(companiesCount),
        icon: Building2,
      },
      {
        label: "Job Seekers",
        value: loading ? "..." : String(jobSeekersCount),
        icon: Users,
      },
      {
        label: "Jobs",
        value: loading ? "..." : String(jobsCount),
        icon: Briefcase,
      },
      {
        label: "Applications",
        value: loading ? "..." : String(applicationsCount),
        icon: FileText,
      },
    ],
    [loading, companiesCount, jobSeekersCount, jobsCount, applicationsCount]
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl font-bold font-display mb-1 text-foreground text-center">
        Admin Dashboard
      </h1>
      <p className="text-muted-foreground mb-8 text-center">
        Monitor companies, job seekers, jobs, and applications.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glow-card p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="w-5 h-5 text-accent" />
            </div>
            <div className="text-2xl font-bold font-display text-foreground">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="glow-card p-6">
        <h2 className="text-lg font-semibold font-display text-foreground mb-4">
          Recent Users
        </h2>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : recentUsers.length === 0 ? (
          <p className="text-sm text-muted-foreground">No users found.</p>
        ) : (
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              >
                <div>
                  <h3 className="text-sm font-medium text-foreground">
                    {user.full_name || "Unnamed User"}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {user.role === "recruiter"
                      ? user.company_name || "Recruiter"
                      : user.role === "job_seeker"
                      ? user.job_title || "Job Seeker"
                      : user.role}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                      {user.role || "unknown"}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(user.created_at)}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedUser(user)}
                    className="px-3 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors inline-flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="glass-card w-full max-w-2xl p-6 rounded-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-foreground">
                User Details
              </h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
                  {selectedUser.role === "recruiter" ? (
                    <Building2 className="w-7 h-7 text-accent" />
                  ) : (
                    <UserIcon className="w-7 h-7 text-primary" />
                  )}
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {selectedUser.full_name || "Unnamed User"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedUser.role || "unknown"}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl bg-muted/40 p-4">
                  <h4 className="font-semibold text-foreground mb-2">
                    Role
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedUser.role || "unknown"}
                  </p>
                </div>

                <div className="rounded-xl bg-muted/40 p-4">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    Joined
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(selectedUser.created_at)}
                  </p>
                </div>

                <div className="rounded-xl bg-muted/40 p-4">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedUser.location || "No location"}
                  </p>
                </div>

                {selectedUser.role === "recruiter" ? (
                  <div className="rounded-xl bg-muted/40 p-4">
                    <h4 className="font-semibold text-foreground mb-2">
                      Company Name
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedUser.company_name || "No company name"}
                    </p>
                  </div>
                ) : (
                  <div className="rounded-xl bg-muted/40 p-4">
                    <h4 className="font-semibold text-foreground mb-2">
                      Job Title
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedUser.job_title || "No job title"}
                    </p>
                  </div>
                )}

                {selectedUser.role === "recruiter" && (
                  <>
                    <div className="rounded-xl bg-muted/40 p-4">
                      <h4 className="font-semibold text-foreground mb-2">
                        Industry
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedUser.industry || "No industry"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-muted/40 p-4">
                      <h4 className="font-semibold text-foreground mb-2">
                        Company Size
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedUser.company_size || "No company size"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-muted/40 p-4 md:col-span-2">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Website
                      </h4>
                      {selectedUser.website ? (
                        <a
                          href={selectedUser.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-primary hover:underline break-all"
                        >
                          {selectedUser.website}
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground">No website</p>
                      )}
                    </div>
                  </>
                )}

                {selectedUser.role === "job_seeker" && (
                  <div className="rounded-xl bg-muted/40 p-4 md:col-span-2">
                    <h4 className="font-semibold text-foreground mb-3">Skills</h4>
                    {selectedUser.skills ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedUser.skills
                          .split(",")
                          .map((skill) => skill.trim())
                          .filter(Boolean)
                          .map((skill) => (
                            <span
                              key={skill}
                              className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary"
                            >
                              {skill}
                            </span>
                          ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No skills added</p>
                    )}
                  </div>
                )}
              </div>

              <div className="rounded-xl bg-muted/40 p-4">
                <h4 className="font-semibold text-foreground mb-2">About</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {selectedUser.about || "No details added."}
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="border border-border text-foreground px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-muted transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AdminDashboard;