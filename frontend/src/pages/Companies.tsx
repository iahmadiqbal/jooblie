import { useEffect, useMemo, useState } from "react";
import { Building2, Users, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { supabase } from "@/lib/supabase";

interface JobCompanyRow {
  company_name: string | null;
  location: string | null;
  status: string | null;
}

interface CompanyCard {
  name: string;
  location: string;
  openJobs: number;
}

const Companies = () => {
  const [rows, setRows] = useState<JobCompanyRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("jobs")
        .select("company_name, location, status")
        .eq("status", "active");

      if (error) {
        console.error("Fetch companies error:", error);
        setRows([]);
        setLoading(false);
        return;
      }

      setRows(data || []);
      setLoading(false);
    };

    fetchCompanies();
  }, []);

  const companies = useMemo(() => {
    const grouped = new Map<string, CompanyCard>();

    for (const row of rows) {
      const name = row.company_name?.trim() || "Unknown Company";
      const location = row.location?.trim() || "Not specified";

      if (grouped.has(name)) {
        const existing = grouped.get(name)!;
        existing.openJobs += 1;

        if (
          existing.location === "Not specified" &&
          location !== "Not specified"
        ) {
          existing.location = location;
        }
      } else {
        grouped.set(name, {
          name,
          location,
          openJobs: 1,
        });
      }
    }

    return Array.from(grouped.values()).sort((a, b) => b.openJobs - a.openJobs);
  }, [rows]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-10 sm:mb-12 md:mb-14">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-8">
              Top{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Companies
              </span>{" "}
              Hiring
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-4">
              Explore leading companies and discover amazing career opportunities.
            </p>
          </AnimatedSection>

          {loading ? (
            <AnimatedSection>
              <div className="backdrop-blur-xl bg-card/50 border border-border rounded-xl p-8 text-center">
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Loading companies...
                </h2>
                <p className="text-muted-foreground">Please wait a moment.</p>
              </div>
            </AnimatedSection>
          ) : companies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {companies.map((c, i) => (
                <AnimatedSection key={c.name} delay={i * 0.1}>
                  <div className="backdrop-blur-xl bg-card/50 border border-border rounded-xl p-5 sm:p-6 h-full flex flex-col hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                      </div>

                      <span className="text-xs font-medium text-cyan-400 bg-cyan-500/10 px-2 sm:px-2.5 py-1 rounded-full whitespace-nowrap">
                        {c.openJobs} open job{c.openJobs > 1 ? "s" : ""}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">
                      {c.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">
                      Hiring now on Jooblie.
                    </p>

                    <div className="flex flex-wrap gap-2 sm:gap-3 text-xs text-muted-foreground mt-auto pt-3 sm:pt-4 border-t border-border">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{c.location}</span>
                      </span>

                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 flex-shrink-0" />
                        Active Hiring
                      </span>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection>
              <div className="backdrop-blur-xl bg-card/50 border border-border rounded-xl p-8 text-center">
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  No companies available
                </h2>
                <p className="text-muted-foreground">
                  No active companies are hiring right now.
                </p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Companies;