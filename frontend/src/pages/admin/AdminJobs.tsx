import { useEffect, useMemo, useState } from "react";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Eye,
  X,
  Search,
  CalendarDays,
  FileText,
  Building2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface Job {
  id: string;
  title: string;
  company_name: string | null;
  location: string | null;
  salary_min: string | null;
  salary_max: string | null;
  salary_currency: string | null;
  status: string | null;
  created_at: string | null;
  description?: string | null;
  experience?: string | null;
  requirements?: string | null;
  job_type?: string | null;
  skills?: string[] | null;
  expires_at?: string | null;
}

const AdminJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("jobs")
        .select(
          "id, title, company_name, location, salary_min, salary_max, salary_currency, status, created_at, description, experience, requirements, job_type, skills, expires_at"
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        toast.error("Failed to load jobs");
      } else {
        setJobs(data || []);
      }

      setLoading(false);
    };

    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return jobs;

    return jobs.filter((job) => {
      return (
        job.title?.toLowerCase().includes(query) ||
        job.company_name?.toLowerCase().includes(query)
      );
    });
  }, [jobs, searchTerm]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatSalary = (job: Job) => {
    const currency = job.salary_currency || "$";
    const min = job.salary_min || "0";
    const max = job.salary_max || "0";
    return `${currency}${min} - ${currency}${max}`;
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl font-bold font-display mb-1 text-foreground">
        Jobs
      </h1>
      <p className="text-muted-foreground mb-6">
        All jobs posted on the platform.
      </p>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by company name or job title"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : filteredJobs.length === 0 ? (
        <p className="text-muted-foreground">
          {searchTerm ? "No jobs match your search." : "No jobs found."}
        </p>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="glow-card p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-accent" />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {job.company_name || "Unknown Company"}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {job.location || "No location"}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {formatSalary(job)}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs">
                      {job.status || "unknown"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedJob(job)}
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

      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="glass-card w-full max-w-3xl p-6 rounded-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-foreground">
                Job Details
              </h2>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
                  <Briefcase className="w-7 h-7 text-accent" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {selectedJob.title}
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                    <Building2 className="w-4 h-4" />
                    {selectedJob.company_name || "Unknown Company"}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl bg-muted/40 p-4">
                  <h4 className="font-semibold text-foreground mb-2">
                    Location
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedJob.location || "No location"}
                  </p>
                </div>

                <div className="rounded-xl bg-muted/40 p-4">
                  <h4 className="font-semibold text-foreground mb-2">
                    Salary
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {formatSalary(selectedJob)}
                  </p>
                </div>

                <div className="rounded-xl bg-muted/40 p-4">
                  <h4 className="font-semibold text-foreground mb-2">
                    Job Type
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedJob.job_type || "Not specified"}
                  </p>
                </div>

                <div className="rounded-xl bg-muted/40 p-4">
                  <h4 className="font-semibold text-foreground mb-2">
                    Experience
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedJob.experience || "Not specified"}
                  </p>
                </div>

                <div className="rounded-xl bg-muted/40 p-4">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    Posted
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(selectedJob.created_at)}
                  </p>
                </div>

                <div className="rounded-xl bg-muted/40 p-4">
                  <h4 className="font-semibold text-foreground mb-2">
                    Status
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedJob.status || "unknown"}
                  </p>
                </div>

                <div className="rounded-xl bg-muted/40 p-4 md:col-span-2">
                  <h4 className="font-semibold text-foreground mb-2">
                    Expiry Date
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedJob.expires_at
                      ? formatDate(selectedJob.expires_at)
                      : "Not specified"}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-muted/40 p-4">
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Description
                </h4>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {selectedJob.description || "No description added."}
                </p>
              </div>

              <div className="rounded-xl bg-muted/40 p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  Requirements
                </h4>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {selectedJob.requirements || "No requirements added."}
                </p>
              </div>

              <div className="rounded-xl bg-muted/40 p-4">
                <h4 className="font-semibold text-foreground mb-3">Skills</h4>
                {selectedJob.skills && selectedJob.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill) => (
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

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedJob(null)}
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

export default AdminJobs;