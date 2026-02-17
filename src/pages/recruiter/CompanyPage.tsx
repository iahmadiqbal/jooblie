import { motion } from "framer-motion";
import { Building2, Globe, MapPin, Users, Save } from "lucide-react";

const CompanyPage = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
    <h1 className="text-3xl font-bold font-display mb-1 text-foreground">Company Profile</h1>
    <p className="text-muted-foreground mb-8">Manage your company information to attract top candidates.</p>

    <div className="glass-card p-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center">
          <Building2 className="w-10 h-10 text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-bold font-display text-foreground">TechCorp Inc.</h2>
          <p className="text-sm text-muted-foreground">Technology • San Francisco, CA</p>
        </div>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Company Name</label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input defaultValue="TechCorp Inc." className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Website</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input defaultValue="https://techcorp.com" className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Company Size</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option>1-50</option>
                <option>51-200</option>
                <option>201-500</option>
                <option>501-1000</option>
                <option selected>1000+</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">About</label>
          <textarea defaultValue="TechCorp is a leading technology company specializing in AI and cloud solutions." rows={4} className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
        </div>
        <button className="gradient-bg-accent text-accent-foreground px-6 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </form>
    </div>
  </motion.div>
);

export default CompanyPage;
