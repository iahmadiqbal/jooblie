import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ExternalLink } from "lucide-react";

const applications = [
  { id: 1, title: "Senior React Developer", company: "TechCorp", location: "Remote", status: "Interview Scheduled", date: "Feb 15, 2026", salary: "$120K-$160K" },
  { id: 2, title: "Product Designer", company: "DesignHub", location: "New York", status: "Under Review", date: "Feb 14, 2026", salary: "$100K-$140K" },
  { id: 3, title: "Data Scientist", company: "DataFlow", location: "Austin, TX", status: "Applied", date: "Feb 12, 2026", salary: "$130K-$170K" },
  { id: 4, title: "DevOps Engineer", company: "CloudNine", location: "Remote", status: "Rejected", date: "Feb 10, 2026", salary: "$110K-$150K" },
  { id: 5, title: "Full Stack Developer", company: "FinanceAI", location: "Chicago", status: "Offer Received", date: "Feb 8, 2026", salary: "$125K-$165K" },
];

const statusColors: Record<string, string> = {
  "Interview Scheduled": "bg-secondary/20 text-secondary",
  "Under Review": "bg-accent/20 text-accent",
  "Applied": "bg-primary/20 text-primary",
  "Rejected": "bg-destructive/20 text-destructive",
  "Offer Received": "bg-secondary/20 text-secondary",
};

const Applications = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
    <h1 className="text-3xl font-bold font-display mb-1 text-foreground">My Applications</h1>
    <p className="text-muted-foreground mb-8">Track all your job applications in one place.</p>

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
            <h3 className="font-semibold text-foreground">{app.title}</h3>
            <p className="text-sm text-muted-foreground">{app.company}</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{app.location}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{app.date}</span>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full whitespace-nowrap ${statusColors[app.status] || "bg-muted text-muted-foreground"}`}>
            {app.status}
          </span>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default Applications;
