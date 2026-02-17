import { motion } from "framer-motion";
import { Briefcase, Users, Eye, Edit, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const jobs = [
  { id: 1, title: "Senior React Developer", applicants: 42, views: 230, status: "Active", posted: "Feb 10" },
  { id: 2, title: "Product Designer", applicants: 28, views: 180, status: "Active", posted: "Feb 8" },
  { id: 3, title: "Data Scientist", applicants: 35, views: 195, status: "Paused", posted: "Feb 5" },
  { id: 4, title: "DevOps Engineer", applicants: 19, views: 120, status: "Active", posted: "Feb 1" },
];

const RecruiterJobs = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold font-display mb-1 text-foreground">My Job Posts</h1>
        <p className="text-muted-foreground">Manage your active job listings.</p>
      </div>
      <Link to="/recruiter/create-job" className="gradient-bg-accent text-accent-foreground px-5 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2">
        <Plus className="w-4 h-4" /> New Job
      </Link>
    </div>

    <div className="space-y-3">
      {jobs.map((job, i) => (
        <motion.div key={job.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="glow-card p-5 flex flex-col md:flex-row md:items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
            <Briefcase className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{job.title}</h3>
            <p className="text-xs text-muted-foreground">Posted {job.posted}</p>
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{job.applicants}</span>
            <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{job.views}</span>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full ${job.status === "Active" ? "bg-secondary/20 text-secondary" : "bg-muted text-muted-foreground"}`}>{job.status}</span>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"><Edit className="w-4 h-4" /></button>
            <button className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default RecruiterJobs;
