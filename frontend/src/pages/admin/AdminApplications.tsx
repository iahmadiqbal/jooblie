import { useEffect, useMemo, useState } from "react";
import {
  FileText,
  Eye,
  X,
  Search,
  CalendarDays,
  User,
  Briefcase,
  Building2,
  MapPin,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface ApplicationRow {
  id: string;
  applicant_id: string;
  created_at: string;
  jobs: {
    title: string;
    company_name: string | null;
  } | null;
}

interface ApplicantProfile {
  id: string;
  full_name: string | null;
  location?: string | null;
  job_title?: string | null;
  about?: string | null;
  skills?: string | null;
  resume_path?: string | null;
  resume_file_name?: string | null;
  resume_uploaded_at?: string | null;
}

interface AdminApplicationItem {
  id: string;
  applicantId: string;
  applicantName: string;
  jobTitle: string;
  companyName: string;
  createdAt: string;
  createdAtRaw: string;
  location: string;
  jobSeekerTitle: string;
  bio: string;
  skills: string;
  resumePath: string | null;
  resumeFileName: string | null;
  resumeUploadedAt: string | null;
}

const AdminApplications = () => {
  const [applications, setApplications] = useState<AdminApplicationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] =
    useState<AdminApplicationItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openingResume, setOpeningResume] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("applications")
        .select(`
          id,
          applicant_id,
          created_at,
          jobs (
            title,
            company_name
          )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        toast.error("Failed to load applications");
        setLoading(false);
        return;
      }

      const typedData: ApplicationRow[] = (data || []).map((item: any) => ({
        id: item.id,
        applicant_id: item.applicant_id,
        created_at: item.created_at,
        jobs: Array.isArray(item.jobs) ? item.jobs[0] : item.jobs,
      }));

      const applicantIds = Array.from(new Set(typedData.map((a) => a.applicant_id)));

      let profiles: ApplicantProfile[] = [];
      if (applicantIds.length > 0) {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select(
            "id, full_name, location, job_title, about, skills, resume_path, resume_file_name, resume_uploaded_at"
          )
          .in("id", applicantIds);

        if (profileError) {
          console.error(profileError);
          toast.error("Failed to load applicant profiles");
        } else {
          profiles = profileData || [];
        }
      }

      const profileMap = new Map(profiles.map((p) => [p.id, p]));

      setApplications(
        typedData.map((app) => {
          const profile = profileMap.get(app.applicant_id);

          return {
            id: app.id,
            applicantId: app.applicant_id,
            applicantName: profile?.full_name || "Unknown Applicant",
            jobTitle: app.jobs?.title || "Unknown Job",
            companyName: app.jobs?.company_name || "Unknown Company",
            createdAt: new Date(app.created_at).toLocaleDateString(),
            createdAtRaw: app.created_at,
            location: profile?.location || "No location",
            jobSeekerTitle: profile?.job_title || "No title",
            bio: profile?.about || "No bio added.",
            skills: profile?.skills || "",
            resumePath: profile?.resume_path || null,
            resumeFileName: profile?.resume_file_name || null,
            resumeUploadedAt: profile?.resume_uploaded_at || null,
          };
        })
      );

      setLoading(false);
    };

    fetchApplications();
  }, []);

  const filteredApplications = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return applications;

    return applications.filter((app) => {
      return (
        app.applicantName.toLowerCase().includes(query) ||
        app.jobTitle.toLowerCase().includes(query) ||
        app.companyName.toLowerCase().includes(query)
      );
    });
  }, [applications, searchTerm]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleResumeView = async (resumePath: string | null) => {
    if (!resumePath) return;

    setOpeningResume(true);

    try {
      const { data, error } = await supabase.storage
        .from("resumes")
        .createSignedUrl(resumePath, 60);

      if (error) {
        console.error(error);
        toast.error("Failed to open resume");
        return;
      }

      if (data?.signedUrl) {
        window.open(data.signedUrl, "_blank");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to open resume");
    } finally {
      setOpeningResume(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl font-bold font-display mb-1 text-foreground">
        Applications
      </h1>
      <p className="text-muted-foreground mb-6">All submitted applications.</p>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by applicant, job title, or company"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : filteredApplications.length === 0 ? (
        <p className="text-muted-foreground">
          {searchTerm ? "No applications match your search." : "No applications found."}
        </p>
      ) : (
        <div className="space-y-4">
          {filteredApplications.map((app) => (
            <div key={app.id} className="glow-card p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{app.applicantName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {app.jobTitle} at {app.companyName}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Applied on {app.createdAt}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedApplication(app)}
                  className="px-3 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors inline-flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="glass-card w-full max-w-3xl p-6 rounded-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-foreground">
                Application Details
              </h2>
              <button
                onClick={() => setSelectedApplication(null)}
                className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {selectedApplication.applicantName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedApplication.jobSeekerTitle}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl bg-muted/40 p-4">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Applied Job
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedApplication.jobTitle}
                  </p>
                </div>

                <div className="rounded-xl bg-muted/40 p-4">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Company
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedApplication.companyName}
                  </p>
                </div>

                <div className="rounded-xl bg-muted/40 p-4">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedApplication.location}
                  </p>
                </div>

                <div className="rounded-xl bg-muted/40 p-4">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    Applied On
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(selectedApplication.createdAtRaw)}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-muted/40 p-4">
                <h4 className="font-semibold text-foreground mb-2">Bio</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {selectedApplication.bio}
                </p>
              </div>

              <div className="rounded-xl bg-muted/40 p-4">
                <h4 className="font-semibold text-foreground mb-3">Skills</h4>
                {selectedApplication.skills ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedApplication.skills
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
                <h4 className="font-semibold text-foreground mb-2">Resume</h4>
                {selectedApplication.resumePath ? (
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-foreground">
                        {selectedApplication.resumeFileName || "Resume"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Uploaded{" "}
                        {selectedApplication.resumeUploadedAt
                          ? formatDate(selectedApplication.resumeUploadedAt)
                          : "recently"}
                      </p>
                    </div>

                    <button
                      onClick={() => handleResumeView(selectedApplication.resumePath)}
                      disabled={openingResume}
                      className="px-4 py-2 rounded-lg gradient-bg-primary text-primary-foreground text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
                    >
                      {openingResume ? "Opening..." : "View Resume"}
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No resume uploaded</p>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedApplication(null)}
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

export default AdminApplications;