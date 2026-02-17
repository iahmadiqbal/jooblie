import { motion } from "framer-motion";
import { Building2, Users, MapPin } from "lucide-react";
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
    <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-10 sm:mb-12 md:mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-8">
            Top <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Companies</span> Hiring
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-4">Explore leading companies and discover amazing career opportunities.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {companies.map((c, i) => (
            <AnimatedSection key={c.name} delay={i * 0.1}>
              <div className="backdrop-blur-xl bg-card/50 border border-border rounded-xl p-5 sm:p-6 h-full flex flex-col hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                  </div>
                  <span className="text-xs font-medium text-cyan-400 bg-cyan-500/10 px-2 sm:px-2.5 py-1 rounded-full whitespace-nowrap">{c.openJobs} open jobs</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">{c.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">{c.description}</p>
                <div className="flex flex-wrap gap-2 sm:gap-3 text-xs text-muted-foreground mt-auto pt-3 sm:pt-4 border-t border-border">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3 flex-shrink-0" /><span className="truncate">{c.location}</span></span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3 flex-shrink-0" />{c.employees}</span>
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
