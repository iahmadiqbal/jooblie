import { motion } from "framer-motion";
import { Briefcase, FileText, Star, TrendingUp, Eye } from "lucide-react";

const stats = [
  { label: "Applications", value: "24", icon: FileText, change: "+3 this week" },
  { label: "Interviews", value: "5", icon: Briefcase, change: "+1 today" },
  { label: "Saved Jobs", value: "18", icon: Star, change: "2 new matches" },
  { label: "Profile Views", value: "142", icon: Eye, change: "+28% this month" },
];

const recentApplications = [
  { title: "Senior React Developer", company: "TechCorp", status: "Interview", date: "Feb 15" },
  { title: "Product Designer", company: "DesignHub", status: "Under Review", date: "Feb 14" },
  { title: "Data Scientist", company: "DataFlow", status: "Applied", date: "Feb 12" },
];

const DashboardIndex = () => (
  <div>
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl font-bold font-display mb-1 text-foreground">Welcome back, John! 👋</h1>
      <p className="text-muted-foreground mb-8">Here's your job search overview.</p>

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
              <stat.icon className="w-5 h-5 text-primary" />
              <span className="text-xs text-secondary">{stat.change}</span>
            </div>
            <div className="text-2xl font-bold font-display text-foreground">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="glow-card p-6">
        <h2 className="text-lg font-semibold font-display text-foreground mb-4">Recent Applications</h2>
        <div className="space-y-3">
          {recentApplications.map((app) => (
            <div key={app.title} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <h3 className="text-sm font-medium text-foreground">{app.title}</h3>
                <p className="text-xs text-muted-foreground">{app.company}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  app.status === "Interview" ? "bg-secondary/20 text-secondary" :
                  app.status === "Under Review" ? "bg-accent/20 text-accent" :
                  "bg-primary/20 text-primary"
                }`}>{app.status}</span>
                <p className="text-xs text-muted-foreground mt-1">{app.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </div>
);

export default DashboardIndex;
