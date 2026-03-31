import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Users, Eye, TrendingUp } from "lucide-react";
import Chatbot from "@/components/Chatbot";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

interface ApplicantRow {
  id: string;
  applicant_id: string;
  created_at: string;
  jobs: {
    id: string;
    title: string;
  } | null;
}

interface ApplicantProfile {
  id: string;
  full_name: string | null;
  job_title: string | null;
  location: string | null;
  about: string | null;
  skills: string | null;
  email?: string | null;
  resume_path?: string | null;
  resume_file_name?: string | null;
  resume_uploaded_at?: string | null;
}

interface RecentApplicant {
  id: string;
  applicantId: string;
  name: string;
  role: string;
  status: string;
  jobTitle: string;
  location: string;
  bio: string;
  skills: string;
  resumePath: string | null;
  resumeFileName: string | null;
  appliedAt: string;
}

const RecruiterDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [activeJobsCount, setActiveJobsCount] = useState(0);
  const [totalApplicantsCount, setTotalApplicantsCount] = useState(0);
  const [jobViewsCount, setJobViewsCount] = useState(0);
  const [hireRate, setHireRate] = useState("0%");
 const [recentApplicants, setRecentApplicants] = useState<RecentApplicant[]>([]);
const [selectedApplicant, setSelectedApplicant] = useState<RecentApplicant | null>(null);
const [downloadingResume, setDownloadingResume] = useState(false);
  useEffect(() => {
    const fetchRecruiterDashboard = async () => {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        toast.error("Please login first");
        setLoading(false);
        return;
      }

      const [jobsCountRes, recruiterJobsRes] = await Promise.all([
        supabase
          .from("jobs")
          .select("id", { count: "exact", head: true })
          .eq("recruiter_id", user.id)
          .eq("status", "active"),

        supabase
          .from("jobs")
          .select("id")
          .eq("recruiter_id", user.id),
      ]);

      if (jobsCountRes.error) {
        console.error("Active jobs count error:", jobsCountRes.error);
        toast.error("Failed to load active jobs");
      }

      if (recruiterJobsRes.error) {
        console.error("Recruiter jobs error:", recruiterJobsRes.error);
        toast.error("Failed to load recruiter jobs");
        setLoading(false);
        return;
      }

      const recruiterJobIds = (recruiterJobsRes.data || []).map((job) => job.id);

      setActiveJobsCount(jobsCountRes.count || 0);

      if (recruiterJobIds.length === 0) {
        setTotalApplicantsCount(0);
        setRecentApplicants([]);
        setJobViewsCount(0);
        setHireRate("0%");
        setLoading(false);
        return;
      }

      const { data: applicationsData, error: applicationsError } = await supabase
        .from("applications")
        .select(`
          id,
          applicant_id,
          created_at,
          jobs (
            id,
            title
          )
        `)
        .in("job_id", recruiterJobIds)
        .order("created_at", { ascending: false });

      if (applicationsError) {
        console.error("Applications fetch error:", applicationsError);
        toast.error("Failed to load applicants");
        setLoading(false);
        return;
      }

      const typedApplications: ApplicantRow[] = (applicationsData || []).map((item: any) => ({
        id: item.id,
        applicant_id: item.applicant_id,
        created_at: item.created_at,
        jobs: Array.isArray(item.jobs) ? item.jobs[0] : item.jobs,
      }));

      setTotalApplicantsCount(typedApplications.length);

      const uniqueApplicantIds = Array.from(
        new Set(typedApplications.map((item) => item.applicant_id))
      );

      let applicantProfiles: ApplicantProfile[] = [];

      if (uniqueApplicantIds.length > 0) {
       const { data: profilesData, error: profilesError } = await supabase
  .from("profiles")
  .select(
    "id, full_name, job_title, location, about, skills, resume_path, resume_file_name, resume_uploaded_at"
  )
  .in("id", uniqueApplicantIds);

        if (profilesError) {
          console.error("Applicant profiles error:", profilesError);
        } else {
          applicantProfiles = profilesData || [];
        }
      }

    

   const profileMap = new Map(
  applicantProfiles.map((profile) => [profile.id, profile])
);

const recent: RecentApplicant[] = typedApplications.slice(0, 5).map((app) => {
  const profile = profileMap.get(app.applicant_id);

  return {
    id: app.id,
    applicantId: app.applicant_id,
    name: profile?.full_name || "Unknown Applicant",
    role: app.jobs?.title || "Unknown Job",
    status: "Applied",
    jobTitle: profile?.job_title || "Not specified",
    location: profile?.location || "Not specified",
    bio: profile?.about || "No bio added",
    skills: profile?.skills || "",
    resumePath: profile?.resume_path || null,
    resumeFileName: profile?.resume_file_name || null,
    appliedAt: app.created_at,
  };
});

      setRecentApplicants(recent);

      // current schema has no job views tracking or hiring status tracking
      setJobViewsCount(0);
      setHireRate("0%");

      setLoading(false);
    };

    fetchRecruiterDashboard();
  }, []);

  const stats = useMemo(
    () => [
      {
        label: "Active Jobs",
        value: loading ? "..." : String(activeJobsCount),
        icon: Briefcase,
        change: "Currently active",
      },
      {
        label: "Total Applicants",
        value: loading ? "..." : String(totalApplicantsCount),
        icon: Users,
        change: "Across all jobs",
      },
      {
        label: "Job Views",
        value: loading ? "..." : String(jobViewsCount),
        icon: Eye,
        change: "Tracking not added",
      },
      {
        label: "Hire Rate",
        value: loading ? "..." : hireRate,
        icon: TrendingUp,
        change: "Hiring status not added",
      },
    ],
    [loading, activeJobsCount, totalApplicantsCount, jobViewsCount, hireRate]
  );

  const handleResumeDownload = async (resumePath: string | null) => {
  if (!resumePath) return;

  setDownloadingResume(true);

  try {
    const { data, error } = await supabase.storage
      .from("resumes")
      .createSignedUrl(resumePath, 60);

    if (error) {
      console.error("Resume download error:", error);
      toast.error("Failed to generate resume link");
      return;
    }

    if (data?.signedUrl) {
      window.open(data.signedUrl, "_blank");
    }
  } catch (error) {
    console.error("Resume download error:", error);
    toast.error("Unable to download resume");
  } finally {
    setDownloadingResume(false);
  }
};

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl font-bold font-display mb-1 text-foreground text-center">
        Recruiter Dashboard
      </h1>
      <p className="text-muted-foreground mb-8 text-center">
        Manage your hiring pipeline efficiently.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glow-card p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="w-5 h-5 text-accent" />
              <span className="text-xs text-secondary">{stat.change}</span>
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
          Recent Applicants
        </h2>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : recentApplicants.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No applicants yet for your jobs.
          </p>
        ) : (
          <div className="space-y-3">
            {recentApplicants.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full gradient-bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                    {a.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground">{a.name}</h3>
                    <p className="text-xs text-muted-foreground">{a.role}</p>
                  </div>
                </div>

              <div className="flex items-center gap-2">
  <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
    {a.status}
  </span>

  <button
    onClick={() => setSelectedApplicant(a)}
    className="px-3 py-1.5 text-xs rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
  >
    View Details
  </button>
</div>
              </div>
            ))}
          </div>
        )}
      </div>
{selectedApplicant && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
    <div className="glass-card w-full max-w-2xl p-6 rounded-2xl max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-foreground">
          Applicant Details
        </h2>
        <button
          onClick={() => setSelectedApplicant(null)}
          className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>
      </div>

      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full gradient-bg-primary flex items-center justify-center text-primary-foreground text-lg font-bold">
            {selectedApplicant.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground">
              {selectedApplicant.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              Applied for: {selectedApplicant.role}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-muted/40 p-4">
            <h4 className="font-semibold text-foreground mb-1">Job Title</h4>
            <p className="text-sm text-muted-foreground">
              {selectedApplicant.jobTitle}
            </p>
          </div>

          <div className="rounded-xl bg-muted/40 p-4">
            <h4 className="font-semibold text-foreground mb-1">Location</h4>
            <p className="text-sm text-muted-foreground">
              {selectedApplicant.location}
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-muted/40 p-4">
          <h4 className="font-semibold text-foreground mb-2">Bio</h4>
          <p className="text-sm text-muted-foreground whitespace-pre-line">
            {selectedApplicant.bio}
          </p>
        </div>

        <div className="rounded-xl bg-muted/40 p-4">
          <h4 className="font-semibold text-foreground mb-2">Skills</h4>
          {selectedApplicant.skills ? (
            <div className="flex flex-wrap gap-2">
              {selectedApplicant.skills
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

        <div className="rounded-xl bg-muted/40 p-4">
          <h4 className="font-semibold text-foreground mb-2">Application Info</h4>
          <p className="text-sm text-muted-foreground">
            Status: {selectedApplicant.status}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Applied At: {new Date(selectedApplicant.appliedAt).toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl bg-muted/40 p-4">
          <h4 className="font-semibold text-foreground mb-2">Resume</h4>

          {selectedApplicant.resumePath ? (
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-foreground">
                  {selectedApplicant.resumeFileName || "Resume"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Resume uploaded
                </p>
              </div>

              <button
                onClick={() => handleResumeDownload(selectedApplicant.resumePath)}
                disabled={downloadingResume}
                className="px-4 py-2 rounded-lg gradient-bg-primary text-primary-foreground text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {downloadingResume ? "Opening..." : "View Resume"}
              </button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No resume uploaded</p>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={() => setSelectedApplicant(null)}
            className="border border-border text-foreground px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-muted transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}
      <Chatbot context="recruiter" />
    </motion.div>
  );
};

export default RecruiterDashboard;