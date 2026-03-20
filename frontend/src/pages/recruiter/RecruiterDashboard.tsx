import { motion } from "framer-motion";
import { Briefcase, Users, Eye, TrendingUp } from "lucide-react";
import Chatbot from "@/components/Chatbot";

const stats = [
  { label: "Active Jobs", value: "8", icon: Briefcase, change: "+2 this month" },
  { label: "Total Applicants", value: "246", icon: Users, change: "+34 this week" },
  { label: "Job Views", value: "1.2K", icon: Eye, change: "+18% this month" },
  { label: "Hire Rate", value: "24%", icon: TrendingUp, change: "+5% improvement" },
];

const recentApplicants = [
  { name: "Alice Johnson", role: "Senior React Developer", status: "Shortlisted" },
  { name: "Bob Smith", role: "Product Designer", status: "New" },
  { name: "Carol Williams", role: "Data Scientist", status: "Interview" },
];

const RecruiterDashboard = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
    <h1 className="text-3xl font-bold font-display mb-1 text-foreground">Recruiter Dashboard</h1>
    <p className="text-muted-foreground mb-8">Manage your hiring pipeline efficiently.</p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glow-card p-5">
          <div className="flex items-center justify-between mb-3">
            <stat.icon className="w-5 h-5 text-accent" />
            <span className="text-xs text-secondary">{stat.change}</span>
          </div>
          <div className="text-2xl font-bold font-display text-foreground">{stat.value}</div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </motion.div>
      ))}
    </div>

    <div className="glow-card p-6">
      <h2 className="text-lg font-semibold font-display text-foreground mb-4">Recent Applicants</h2>
      <div className="space-y-3">
        {recentApplicants.map((a) => (
          <div key={a.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full gradient-bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                {a.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground">{a.name}</h3>
                <p className="text-xs text-muted-foreground">{a.role}</p>
              </div>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              a.status === "Shortlisted" ? "bg-secondary/20 text-secondary" :
              a.status === "Interview" ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"
            }`}>{a.status}</span>
          </div>
        ))}
      </div>
    </div>
    <Chatbot context="recruiter" />
  </motion.div>
);

export default RecruiterDashboard;
