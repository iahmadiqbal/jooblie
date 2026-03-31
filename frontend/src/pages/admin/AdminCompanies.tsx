import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  MapPin,
  Globe,
  Eye,
  X,
  CalendarDays,
  User,
  Search,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface Company {
  id: string;
  full_name: string | null;
  company_name: string | null;
  industry: string | null;
  location: string | null;
  website: string | null;
  company_size: string | null;
  created_at: string | null;
  about?: string | null;
}

const AdminCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select(
          "id, full_name, company_name, industry, location, website, company_size, created_at, about"
        )
        .eq("role", "recruiter")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        toast.error("Failed to load companies");
      } else {
        setCompanies(data || []);
      }

      setLoading(false);
    };

    fetchCompanies();
  }, []);

  const filteredCompanies = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return companies;

    return companies.filter((company) => {
      return (
        company.company_name?.toLowerCase().includes(query) ||
        company.full_name?.toLowerCase().includes(query) ||
        company.industry?.toLowerCase().includes(query) ||
        company.location?.toLowerCase().includes(query)
      );
    });
  }, [companies, searchTerm]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl font-bold font-display mb-1 text-foreground">
        Companies
      </h1>
      <p className="text-muted-foreground mb-6">
        All recruiter companies on the platform.
      </p>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by company, owner, industry, or location"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : filteredCompanies.length === 0 ? (
        <p className="text-muted-foreground">
          {searchTerm ? "No companies match your search." : "No companies found."}
        </p>
      ) : (
        <div className="space-y-4">
          {filteredCompanies.map((company) => (
            <div key={company.id} className="glow-card p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-accent" />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    {company.company_name || "Unnamed Company"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Owner: {company.full_name || "Unknown"}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                    <span>{company.industry || "No industry"}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {company.location || "No location"}
                    </span>
                    <span>{company.company_size || "No size"}</span>
                    {company.website && (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        <Globe className="w-3 h-3" />
                        Website
                      </a>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCompany(company)}
                  className="px-3 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors inline-flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCompany && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="glass-card w-full max-w-2xl p-6 rounded-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-semibold text-foreground">
                Company Details
              </h2>
              <button
                onClick={() => setSelectedCompany(null)}
                className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-accent" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {selectedCompany.company_name || "Unnamed Company"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedCompany.industry || "No industry"}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl bg-muted/40 p-4">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Owner
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedCompany.full_name || "Unknown"}
                  </p>
                </div>

                <div className="rounded-xl bg-muted/40 p-4">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    Joined
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(selectedCompany.created_at)}
                  </p>
                </div>

                <div className="rounded-xl bg-muted/40 p-4">
                  <h4 className="font-semibold text-foreground mb-2">
                    Location
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedCompany.location || "No location"}
                  </p>
                </div>

                <div className="rounded-xl bg-muted/40 p-4">
                  <h4 className="font-semibold text-foreground mb-2">
                    Company Size
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedCompany.company_size || "No size"}
                  </p>
                </div>

                <div className="rounded-xl bg-muted/40 p-4 md:col-span-2">
                  <h4 className="font-semibold text-foreground mb-2">
                    Website
                  </h4>
                  {selectedCompany.website ? (
                    <a
                      href={selectedCompany.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-primary hover:underline break-all"
                    >
                      {selectedCompany.website}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">No website</p>
                  )}
                </div>
              </div>

              <div className="rounded-xl bg-muted/40 p-4">
                <h4 className="font-semibold text-foreground mb-2">About</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {selectedCompany.about || "No company description added."}
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedCompany(null)}
                  className="border border-border text-foreground px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-muted transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AdminCompanies;