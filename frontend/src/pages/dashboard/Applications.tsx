import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

interface Application {
  id: string;
  created_at: string;
  job: {
    id: string;
    title: string;
    company_name: string;
    location: string;
    salary_min: string;
    salary_max: string;
  };
}

const statusColors: Record<string, string> = {
  applied: "bg-primary/20 text-primary",
  review: "bg-accent/20 text-accent",
  interview: "bg-secondary/20 text-secondary",
  rejected: "bg-destructive/20 text-destructive",
};

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
const [selectedJob, setSelectedJob] = useState<any>(null);
const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const fetchApplications = async () => {
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

      const { data, error } = await supabase
        .from("applications")
        .select(`
          id,
          created_at,
          jobs (
            id,
            title,
            company_name,
            location,
            salary_min,
            salary_max,
            description
          )
        `)
        .eq("applicant_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        toast.error("Failed to load applications");
        setLoading(false);
        return;
      }

      const formatted = data.map((item: any) => ({
        id: item.id,
        created_at: item.created_at,
        job: item.jobs,
      }));

      setApplications(formatted);
      setLoading(false);
    };

    fetchApplications();
  }, []);


  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl font-bold font-display mb-1 text-foreground text-center">
        My Applications
      </h1>
      <p className="text-muted-foreground mb-8 text-center">
        Track all your job applications in one place.
      </p>

      {loading ? (
        <p className="text-center text-muted-foreground">Loading...</p>
      ) : applications.length === 0 ? (
        <p className="text-center text-muted-foreground">
          You haven't applied to any jobs yet.
        </p>
      ) : (
        <div className="space-y-3">
          {applications.map((app, i) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glow-card p-5 flex flex-col md:flex-row md:items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-foreground">
                  {app.job?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {app.job?.company_name}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {app.job?.location}
                </span>

                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(app.created_at).toLocaleDateString()}
                </span>
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary">
                Applied
              </span>
              <button
  onClick={() => {
    setSelectedJob(app.job);
    setModalOpen(true);
  }}
  className="text-xs px-4 py-2 rounded-lg border border-border hover:bg-muted transition"
>
  View Details
</button>
            </motion.div>
          ))}
        </div>
      )}
{modalOpen && selectedJob && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-background rounded-xl p-6 w-full max-w-2xl shadow-xl max-h-[85vh] overflow-y-auto"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold">
            {selectedJob.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {selectedJob.company_name}
          </p>
        </div>

        <button
          onClick={() => setModalOpen(false)}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>
      </div>

      {/* Job Info */}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {selectedJob.location || "Not specified"}
        </span>

        <span className="flex items-center gap-1">
          <Briefcase className="w-4 h-4" />
          {selectedJob.salary_min && selectedJob.salary_max
            ? `${selectedJob.salary_min} - ${selectedJob.salary_max}`
            : "Salary not specified"}
        </span>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Description</h3>
        <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
          {selectedJob.description || "No description available"}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() =>
            (window.location.href = `/jobs/${selectedJob.id}`)
          }
          className="px-4 py-2 border rounded-lg hover:bg-muted"
        >
          Open Full Page
        </button>

        <button
          onClick={() => setModalOpen(false)}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </motion.div>
  </div>
)}
    </motion.div>
  );
};

export default Applications;