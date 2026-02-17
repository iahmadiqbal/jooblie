import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock } from "lucide-react";

const applications = [
  { id: 1, title: "Senior React Developer", company: "TechCorp", location: "Remote", status: "Interview Scheduled", date: "Feb 15, 2026", salary: "$120K-$160K" },
  { id: 2, title: "Product Designer", company: "DesignHub", location: "New York", status: "Under Review", date: "Feb 14, 2026", salary: "$100K-$140K" },
  { id: 3, title: "Data Scientist", company: "DataFlow", location: "Austin, TX", status: "Applied", date: "Feb 12, 2026", salary: "$130K-$170K" },
  { id: 4, title: "DevOps Engineer", company: "CloudNine", location: "Remote", status: "Rejected", date: "Feb 10, 2026", salary: "$110K-$150K" },
  { id: 5, title: "Full Stack Developer", company: "FinanceAI", location: "Chicago", status: "Offer Received", date: "Feb 8, 2026", salary: "$125K-$165K" },
];

const statusColors = {
  "Interview Scheduled": "bg-cyan-500/20 text-cyan-400",
  "Under Review": "bg-orange-500/20 text-orange-400",
  "Applied": "bg-blue-500/20 text-blue-400",
  "Rejected": "bg-red-500/20 text-red-400",
  "Offer Received": "bg-green-500/20 text-green-400",
};

const Applications = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
    <div className="mb-6 sm:mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-1 text-foreground text-center sm:text-left">My Applications</h1>
      <p className="text-sm sm:text-base text-muted-foreground text-center sm:text-left">Track all your job applications in one place.</p>
    </div>

    <div className="space-y-3">
      {applications.map((app, i) => (
        <motion.div
          key={app.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
          className="backdrop-blur-xl bg-card/50 border border-border rounded-xl p-4 sm:p-5 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">{app.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{app.company}</p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground items-center">
              <span className="flex items-center gap-1 whitespace-nowrap"><MapPin className="w-3 h-3 flex-shrink-0" />{app.location}</span>
              <span className="flex items-center gap-1 whitespace-nowrap"><Clock className="w-3 h-3 flex-shrink-0" />{app.date}</span>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-center ${statusColors[app.status] || "bg-muted text-muted-foreground"}`}>
              {app.status}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

export default Applications;
