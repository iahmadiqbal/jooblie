import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, MapPin, Briefcase, Globe, Save } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

const Profile = () => {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<{
    full_name: string;
    role: string;
    company_name: string | null;
  } | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("full_name, role, company_name")
      .eq("id", user.id)
      .single()
      .then(({ data, error }) => {
        if (!error && data) setProfile(data);
      });
  }, [user]);

  if (loading) return null;

  const displayTitle =
    profile?.role === "recruiter"
      ? (profile?.company_name ?? "")
      : profile?.role === "seeker"
      ? "Job Seeker"
      : (profile?.role ?? "");

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl font-bold font-display mb-1 text-foreground">My Profile</h1>
      <p className="text-muted-foreground mb-8">Manage your personal information and preferences.</p>

      <div className="glass-card p-8 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-full gradient-bg-primary flex items-center justify-center">
            <User className="w-10 h-10 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-foreground">{profile?.full_name || ""}</h2>
            <p className="text-sm text-muted-foreground">{displayTitle}</p>
          </div>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={profile?.full_name || ""} readOnly className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={user?.email || ""} readOnly className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value="" readOnly className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Job Title</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value="" readOnly className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Bio</label>
            <textarea value="" readOnly rows={3} className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Skills</label>
            <div className="flex flex-wrap gap-2">
              {([] as string[]).map((skill) => (
                <span key={skill} className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary">{skill}</span>
              ))}
            </div>
          </div>
          <button className="gradient-bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Profile;
