import { useEffect, useMemo, useState } from "react";
import {
  User,
  MapPin,
  Briefcase,
  Eye,
  X,
  Search,
  CalendarDays,
  FileText,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface JobSeeker {
  id: string;
  full_name: string | null;
  location: string | null;
  job_title: string | null;
  skills: string | null;
  created_at: string | null;
  about?: string | null;
  resume_path?: string | null;
  resume_file_name?: string | null;
  resume_uploaded_at?: string | null;
}

const AdminJobSeekers = () => {
  const [jobSeekers, setJobSeekers] = useState<JobSeeker[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeeker, setSelectedSeeker] = useState<JobSeeker | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openingResume, setOpeningResume] = useState(false);

  useEffect(() => {
    const fetchSeekers = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select(
          "id, full_name, location, job_title, skills, created_at, about, resume_path, resume_file_name, resume_uploaded_at",
        )
        .eq("role", "job_seeker")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        toast.error("Failed to load job seekers");
      } else {
        setJobSeekers(data || []);
      }

      setLoading(false);
    };

    fetchSeekers();
  }, []);

  const filteredSeekers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return jobSeekers;

    return jobSeekers.filter((seeker) => {
      return (
        seeker.full_name?.toLowerCase().includes(query) ||
        seeker.location?.toLowerCase().includes(query) ||
        seeker.job_title?.toLowerCase().includes(query) ||
        seeker.skills?.toLowerCase().includes(query)
      );
    });
  }, [jobSeekers, searchTerm]);

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
        Job Seekers
      </h1>
      <p className="text-muted-foreground mb-6">
        All job seekers on the platform.
      </p>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, location, title, or skills"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : filteredSeekers.length === 0 ? (
        <p className="text-muted-foreground">
          {searchTerm ? "No job seekers match your search." : "No job seekers found."}
        </p>
      ) : (
        <div className="space-y-4">
          {filteredSeekers.map((seeker) => (
            <div key={seeker.id} className="glow-card p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    {seeker.full_name || "Unnamed User"}
                  </h3>

                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {seeker.location || "No location"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3" />
                      {seeker.job_title || "No title"}
                    </span>
                  </div>

                  {seeker.skills && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Skills: {seeker.skills}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => setSelectedSeeker(seeker)}
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

      {selectedSeeker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="glass-card w-full max-w-2xl p-6 rounded-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-foreground">
                Job Seeker Details
              </h2>
              <button
                onClick={() => setSelectedSeeker(null)}
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
                    {selectedSeeker.full_name || "Unnamed User"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedSeeker.job_title || "No title"}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl bg-muted/40 p-4">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedSeeker.location || "No location"}
                  </p>
                </div>

                <div className="rounded-xl bg-muted/40 p-4">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    Joined
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(selectedSeeker.created_at)}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-muted/40 p-4">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Bio
                </h4>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {selectedSeeker.about || "No bio added."}
                </p>
              </div>

              <div className="rounded-xl bg-muted/40 p-4">
                <h4 className="font-semibold text-foreground mb-3">Skills</h4>
                {selectedSeeker.skills ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedSeeker.skills
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
                {selectedSeeker.resume_path ? (
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-foreground">
                        {selectedSeeker.resume_file_name || "Resume"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Uploaded{" "}
                        {selectedSeeker.resume_uploaded_at
                          ? formatDate(selectedSeeker.resume_uploaded_at)
                          : "recently"}
                      </p>
                    </div>

                    <button
                      onClick={() => handleResumeView(selectedSeeker.resume_path || null)}
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
                  onClick={() => setSelectedSeeker(null)}
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

export default AdminJobSeekers;