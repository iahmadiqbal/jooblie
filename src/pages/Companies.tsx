import { motion } from "framer-motion";
import { Building2, Users, MapPin, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const companies = [
  { name: "TechCorp", industry: "Technology", employees: "5,000+", location: "San Francisco, CA", openJobs: 24, description: "Leading AI and cloud solutions provider." },
  { name: "DesignHub", industry: "Design", employees: "500+", location: "New York, NY", openJobs: 12, description: "Award-winning design and branding agency." },
  { name: "DataFlow", industry: "Data Analytics", employees: "2,000+", location: "Austin, TX", openJobs: 18, description: "Big data analytics and visualization platform." },
  { name: "CloudNine", industry: "Cloud Services", employees: "10,000+", location: "Seattle, WA", openJobs: 35, description: "Enterprise cloud infrastructure solutions." },
  { name: "GreenTech", industry: "Sustainability", employees: "800+", location: "Denver, CO", openJobs: 8, description: "Sustainable energy technology innovator." },
  { name: "FinanceAI", industry: "FinTech", employees: "3,000+", location: "Chicago, IL", openJobs: 20, description: "AI-powered financial services platform." },
];

const Companies = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Top <span className="gradient-text">Companies</span> Hiring
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Explore leading companies and discover amazing career opportunities.</p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((c, i) => (
            <AnimatedSection key={c.name} delay={i * 0.1}>
              <div className="glow-card p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">{c.openJobs} open jobs</span>
                </div>
                <h3 className="text-lg font-bold font-display text-foreground mb-1">{c.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{c.description}</p>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-auto pt-4 border-t border-border">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{c.location}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{c.employees}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Companies;
