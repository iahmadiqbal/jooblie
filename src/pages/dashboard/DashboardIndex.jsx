import { motion } from "framer-motion";
import { Briefcase, FileText, Star, Eye } from "lucide-react";

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
  <div className="w-full">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {/* Header - Properly centered on mobile */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1 text-foreground text-center sm:text-left">Welcome back, Jooblie! 👋</h1>
        <p className="text-sm sm:text-base text-muted-foreground text-center sm:text-left">Here's your job search overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="backdrop-blur-xl bg-card/50 border border-border rounded-xl p-4 sm:p-5 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              <span className="text-xs text-cyan-400">{stat.change}</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="backdrop-blur-xl bg-card/50 border border-border rounded-xl p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-foreground mb-4">Recent Applications</h2>
        <div className="space-y-3">
          {recentApplications.map((app) => (
            <div key={app.title} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-muted/50 gap-2 sm:gap-0">
              <div className="min-w-0">
                <h3 className="text-sm font-medium text-foreground truncate">{app.title}</h3>
                <p className="text-xs text-muted-foreground">{app.company}</p>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-3 sm:text-right">
                <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                  app.status === "Interview" ? "bg-cyan-500/20 text-cyan-400" :
                  app.status === "Under Review" ? "bg-orange-500/20 text-orange-400" :
                  "bg-blue-500/20 text-blue-400"
                }`}>{app.status}</span>
                <p className="text-xs text-muted-foreground">{app.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </div>
);

export default DashboardIndex;
