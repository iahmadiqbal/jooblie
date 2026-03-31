import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  Eye,
  Edit,
  Trash2,
  Plus,
  MapPin,
  X,
  Building2,
  CalendarDays,
  FileText,
  BadgeDollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";

interface Job {
  id: string;
  recruiter_id: string;
  title: string;
  company_name: string | null;
  location: string | null;
  description: string | null;
  experience: string | null;
  requirements: string | null;
  job_type: string | null;
  skills: string[] | null;
  salary_min: string | null;
  salary_max: string | null;
  salary_currency: string | null;
  expires_at: string | null;
  status: string | null;
  created_at: string | null;
}

interface EditFormData {
  id: string;
  title: string;
  company_name: string;
  location: string;
  description: string;
  experience: string;
  requirements: string;
  job_type: string;
  skills: string;
  salary_min: string;
  salary_max: string;
  salary_currency: string;
  expires_at: string;
  status: string;
}

const formatPostedDate = (dateString: string | null) => {
  if (!dateString) return "Unknown";
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const RecruiterJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const [editData, setEditData] = useState<EditFormData | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const fetchMyJobs = async () => {
    setLoading(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      toast.error("You must be logged in");
      setLoading(false);
      return;
    }

    
   
const { data, error } = await supabase
  .from("jobs")
  .select(
    "id, recruiter_id, title, company_name, location, description, experience, requirements, job_type, skills, salary_min, salary_max, salary_currency, expires_at, status, created_at",
  )
  .eq("recruiter_id", user.id)
  .order("created_at", { ascending: false });
    if (error) {
      console.error("Fetch jobs error:", error);
      toast.error("Failed to load jobs");
      setLoading(false);
      return;
    }

    setJobs(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const handleDelete = async (jobId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this job?");
    if (!confirmed) return;

    setDeletingId(jobId);

    const { error } = await supabase.from("jobs").delete().eq("id", jobId);

    if (error) {
      console.error("Delete job error:", error);
      toast.error(error.message || "Failed to delete job");
      setDeletingId(null);
      return;
    }

    setJobs((prev) => prev.filter((job) => job.id !== jobId));
    toast.success("Job deleted successfully");
    setDeletingId(null);

    if (selectedJob?.id === jobId) {
      setSelectedJob(null);
    }
  };

  const openEdit = (job: Job) => {
  setEditData({
    id: job.id,
    title: job.title || "",
    company_name: job.company_name || "",
    location: job.location || "",
    description: job.description || "",
    experience: job.experience || "",
    requirements: job.requirements || "",
    job_type: job.job_type || "",
    skills: job.skills?.join(", ") || "",
    salary_min: job.salary_min || "",
    salary_max: job.salary_max || "",
    salary_currency: job.salary_currency || "",
    expires_at: job.expires_at
      ? new Date(job.expires_at).toISOString().split("T")[0]
      : "",
    status: job.status || "active",
  });
};

  const openViewModal = (job: Job) => {
    setSelectedJob(job);
  };

const handleUpdate = async () => {
  if (!editData) return;

  if (!editData.title.trim()) {
    toast.error("Job title is required");
    return;
  }

  if (!editData.company_name.trim()) {
    toast.error("Company name is required");
    return;
  }

  if (!editData.location.trim()) {
    toast.error("Location is required");
    return;
  }

  if (!editData.description.trim()) {
    toast.error("Description is required");
    return;
  }

  const skillsArray = editData.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  setUpdating(true);

  const payload = {
    title: editData.title.trim(),
    company_name: editData.company_name.trim(),
    location: editData.location.trim(),
    description: editData.description.trim(),
    experience: editData.experience.trim() || null,
    requirements: editData.requirements.trim() || null,
    job_type: editData.job_type.trim() || null,
    skills: skillsArray.length > 0 ? skillsArray : null,
    salary_min: editData.salary_min.trim() || null,
    salary_max: editData.salary_max.trim() || null,
    salary_currency: editData.salary_currency.trim() || null,
    expires_at: editData.expires_at
      ? new Date(`${editData.expires_at}T00:00:00`).toISOString()
      : null,
    status: editData.status,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("jobs")
    .update(payload)
    .eq("id", editData.id);

  if (error) {
    console.error("Update job error:", error);
    toast.error(error.message || "Failed to update job");
    setUpdating(false);
    return;
  }

  setJobs((prev) =>
    prev.map((job) =>
      job.id === editData.id
        ? {
            ...job,
            ...payload,
          }
        : job,
    ),
  );

  if (selectedJob?.id === editData.id) {
    setSelectedJob((prev) =>
      prev
        ? {
            ...prev,
            ...payload,
          }
        : prev,
    );
  }

  toast.success("Job updated successfully");
  setEditData(null);
  setUpdating(false);
};

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex flex-col items-center mb-8 gap-4 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold font-display mb-1 text-foreground">
            My Job Posts
          </h1>
          <p className="text-muted-foreground">Manage your active job listings.</p>
        </div>

        <Link
          to="/recruiter/create-job"
          className="gradient-bg-accent text-accent-foreground px-5 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2 w-full md:w-auto"
        >
          <Plus className="w-4 h-4" /> New Job
        </Link>
      </div>

      {loading ? (
        <div className="glow-card p-6 text-center text-muted-foreground">
          Loading jobs...
        </div>
      ) : jobs.length === 0 ? (
        <div className="glow-card p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">No jobs yet</h2>
          <p className="text-muted-foreground mb-4">
            You have not posted any jobs yet.
          </p>
          <Link
            to="/recruiter/create-job"
            className="gradient-bg-accent text-accent-foreground px-5 py-2.5 rounded-lg font-medium text-sm inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create Your First Job
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glow-card p-5 flex flex-col md:flex-row md:items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-5 h-5 text-accent" />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{job.title}</h3>
                <p className="text-xs text-muted-foreground">
                  Posted {formatPostedDate(job.created_at)}
                </p>

                {job.location && (
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {job.location}
                  </p>
                )}

                {job.company_name && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {job.company_name}
                  </p>
                )}
              </div>

              <div className="flex gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  0
                </span>
                <button
                  onClick={() => openViewModal(job)}
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                  title="View Job Details"
                >
                  <Eye className="w-3 h-3" />
                  View
                </button>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  (job.status || "").toLowerCase() === "active"
                    ? "bg-secondary/20 text-secondary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {job.status || "draft"}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => openViewModal(job)}
                  className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>

                <button
                  onClick={() => openEdit(job)}
                  className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  title="Edit Job"
                >
                  <Edit className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDelete(job.id)}
                  disabled={deletingId === job.id}
                  className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-60"
                  title="Delete Job"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

  {selectedJob && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
    <div className="glass-card w-full max-w-3xl p-6 rounded-2xl max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-foreground">Job Details</h2>
        <button
          onClick={() => setSelectedJob(null)}
          className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-foreground">
            {selectedJob.title}
          </h3>

          <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
            {selectedJob.company_name && (
              <span>{selectedJob.company_name}</span>
            )}
            {selectedJob.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {selectedJob.location}
              </span>
            )}
            {selectedJob.job_type && <span>{selectedJob.job_type}</span>}
            {selectedJob.experience && <span>{selectedJob.experience}</span>}
          </div>
        </div>

        <div>
          <span
            className={`text-xs px-3 py-1 rounded-full ${
              (selectedJob.status || "").toLowerCase() === "active"
                ? "bg-secondary/20 text-secondary"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {selectedJob.status || "draft"}
          </span>
        </div>

        {(selectedJob.salary_min ||
          selectedJob.salary_max ||
          selectedJob.salary_currency) && (
          <div className="rounded-xl bg-muted/40 p-4">
            <h4 className="font-semibold text-foreground mb-2">Salary</h4>
            <p className="text-sm text-muted-foreground">
              {selectedJob.salary_currency || ""}
              {selectedJob.salary_min || "0"} - {selectedJob.salary_currency || ""}
              {selectedJob.salary_max || "0"}
            </p>
          </div>
        )}

        {selectedJob.description && (
          <div className="rounded-xl bg-muted/40 p-4">
            <h4 className="font-semibold text-foreground mb-2">Description</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {selectedJob.description}
            </p>
          </div>
        )}

        {selectedJob.requirements && (
          <div className="rounded-xl bg-muted/40 p-4">
            <h4 className="font-semibold text-foreground mb-2">Requirements</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {selectedJob.requirements}
            </p>
          </div>
        )}

        {selectedJob.skills && selectedJob.skills.length > 0 && (
          <div className="rounded-xl bg-muted/40 p-4">
            <h4 className="font-semibold text-foreground mb-3">Skills</h4>
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
          </div>
        )}

        {selectedJob.expires_at && (
          <div className="rounded-xl bg-muted/40 p-4">
            <h4 className="font-semibold text-foreground mb-2">Expires At</h4>
            <p className="text-sm text-muted-foreground">
              {new Date(selectedJob.expires_at).toLocaleDateString()}
            </p>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => {
              setSelectedJob(null);
              openEdit(selectedJob);
            }}
            className="gradient-bg-accent text-accent-foreground px-6 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Edit Job
          </button>

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

      {editData && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
    <div className="glass-card w-full max-w-3xl p-6 rounded-2xl max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-foreground">Edit Job</h2>
        <button
          onClick={() => setEditData(null)}
          className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Job Title
            </label>
            <input
              value={editData.title}
              onChange={(e) =>
                setEditData((prev) =>
                  prev ? { ...prev, title: e.target.value } : prev,
                )
              }
              className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Company Name
            </label>
            <input
              value={editData.company_name}
              onChange={(e) =>
                setEditData((prev) =>
                  prev ? { ...prev, company_name: e.target.value } : prev,
                )
              }
              className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Location
            </label>
            <input
              value={editData.location}
              onChange={(e) =>
                setEditData((prev) =>
                  prev ? { ...prev, location: e.target.value } : prev,
                )
              }
              className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Job Type
            </label>
            <input
              value={editData.job_type}
              onChange={(e) =>
                setEditData((prev) =>
                  prev ? { ...prev, job_type: e.target.value } : prev,
                )
              }
              placeholder="Full-time / Part-time / Remote"
              className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Experience
            </label>
            <input
              value={editData.experience}
              onChange={(e) =>
                setEditData((prev) =>
                  prev ? { ...prev, experience: e.target.value } : prev,
                )
              }
              placeholder="2+ years"
              className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Expiry Date
            </label>
            <input
              type="date"
              value={editData.expires_at}
              onChange={(e) =>
                setEditData((prev) =>
                  prev ? { ...prev, expires_at: e.target.value } : prev,
                )
              }
              className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Description
          </label>
          <textarea
            rows={4}
            value={editData.description}
            onChange={(e) =>
              setEditData((prev) =>
                prev ? { ...prev, description: e.target.value } : prev,
              )
            }
            className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Requirements
          </label>
          <textarea
            rows={4}
            value={editData.requirements}
            onChange={(e) =>
              setEditData((prev) =>
                prev ? { ...prev, requirements: e.target.value } : prev,
              )
            }
            className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Skills
          </label>
          <input
            value={editData.skills}
            onChange={(e) =>
              setEditData((prev) =>
                prev ? { ...prev, skills: e.target.value } : prev,
              )
            }
            placeholder="React, TypeScript, Supabase"
            className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Salary Min
            </label>
            <input
              value={editData.salary_min}
              onChange={(e) =>
                setEditData((prev) =>
                  prev ? { ...prev, salary_min: e.target.value } : prev,
                )
              }
              className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Salary Max
            </label>
            <input
              value={editData.salary_max}
              onChange={(e) =>
                setEditData((prev) =>
                  prev ? { ...prev, salary_max: e.target.value } : prev,
                )
              }
              className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Currency
            </label>
            <input
              value={editData.salary_currency}
              onChange={(e) =>
                setEditData((prev) =>
                  prev ? { ...prev, salary_currency: e.target.value } : prev,
                )
              }
              placeholder="USD"
              className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">
            Status
          </label>
          <select
            value={editData.status}
            onChange={(e) =>
              setEditData((prev) =>
                prev ? { ...prev, status: e.target.value } : prev,
              )
            }
            className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleUpdate}
            disabled={updating}
            className="gradient-bg-accent text-accent-foreground px-6 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-70"
          >
            {updating ? "Updating..." : "Update Job"}
          </button>

          <button
            onClick={() => setEditData(null)}
            className="border border-border text-foreground px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-muted transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </motion.div>
  );
};

export default RecruiterJobs;