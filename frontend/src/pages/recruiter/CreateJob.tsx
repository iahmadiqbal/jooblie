import { motion } from "framer-motion";
import { Briefcase, MapPin, DollarSign, Clock, FileText, Save } from "lucide-react";

const CreateJob = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
    <h1 className="text-3xl font-bold font-display mb-1 text-foreground">Post a New Job</h1>
    <p className="text-muted-foreground mb-8">Create a compelling job listing to attract top talent.</p>

    <div className="glass-card p-8 max-w-3xl">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Job Title</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input placeholder="e.g. Senior React Developer" className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input placeholder="Remote, City, etc." className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Salary Range</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input placeholder="$100K - $150K" className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Job Type</label>
            <select className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Experience Level</label>
            <select className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option>Junior</option>
              <option>Mid-level</option>
              <option>Senior</option>
              <option>Lead</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Job Description</label>
          <textarea placeholder="Describe the role, responsibilities, and what you're looking for..." rows={6} className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Required Skills</label>
          <input placeholder="React, TypeScript, Node.js (comma-separated)" className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>

        <div className="flex gap-3 pt-2">
          <button className="gradient-bg-accent text-accent-foreground px-8 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2">
            <Save className="w-4 h-4" /> Publish Job
          </button>
          <button type="button" className="border border-border text-foreground px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-muted transition-colors">
            Save Draft
          </button>
        </div>
      </form>
    </div>
  </motion.div>
);

export default CreateJob;
