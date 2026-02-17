import { motion } from "framer-motion";
import { User, Mail, MapPin, Briefcase, Save } from "lucide-react";

const Profile = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
    <div className="mb-6 sm:mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-1 text-foreground text-center sm:text-left">My Profile</h1>
      <p className="text-sm sm:text-base text-muted-foreground text-center sm:text-left">Manage your personal information and preferences.</p>
    </div>

    <div className="backdrop-blur-xl bg-card/50 border border-border rounded-xl p-5 sm:p-6 md:p-8 max-w-2xl">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6 sm:mb-8">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
          <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">John Doe</h2>
          <p className="text-sm text-muted-foreground">Senior Developer</p>
        </div>
      </div>

      <form className="space-y-4 sm:space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input defaultValue="John Doe" className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input defaultValue="john@example.com" className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input defaultValue="San Francisco, CA" className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Job Title</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input defaultValue="Senior Developer" className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500" />
            </div>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Bio</label>
          <textarea defaultValue="Passionate full-stack developer with 5+ years of experience building scalable web applications." rows={3} className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 resize-none" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Skills</label>
          <div className="flex flex-wrap gap-2">
            {["React", "TypeScript", "Node.js", "Python", "AWS", "Docker"].map((skill) => (
              <span key={skill} className="text-xs px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400">{skill}</span>
            ))}
          </div>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </form>
    </div>
  </motion.div>
);

export default Profile;
