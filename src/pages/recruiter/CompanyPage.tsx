import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, Globe, MapPin, Users, Save } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

const CompanyPage = () => {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<{
    company_name: string;
    industry: string;
    location: string;
    website: string;
    company_size: string;
    about: string;
  } | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()
      .then(({ data, error }) => {
        if (!error && data) setProfile(data);
      });
  }, [user]);

  if (loading) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl font-bold font-display mb-1 text-foreground">Company Profile</h1>
      <p className="text-muted-foreground mb-8">Manage your company information to attract top candidates.</p>

      <div className="glass-card p-8 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center">
            <Building2 className="w-10 h-10 text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-foreground">{profile?.company_name || ""}</h2>
            <p className="text-sm text-muted-foreground">
              {[profile?.industry, profile?.location].filter(Boolean).join(" • ")}
            </p>
          </div>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Company Name</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={profile?.company_name || ""} readOnly className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Website</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={profile?.website || ""} readOnly className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Company Size</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select value={profile?.company_size || ""} readOnly className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option value="">—</option>
                  <option value="1-50">1-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="501-1000">501-1000</option>
                  <option value="1000+">1000+</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">About</label>
            <textarea value={profile?.about || ""} readOnly rows={4} className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
          </div>
          <button className="gradient-bg-accent text-accent-foreground px-6 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default CompanyPage;
