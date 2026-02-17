import { motion } from "framer-motion";
import { Search, MapPin, Briefcase, Clock, DollarSign, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import Chatbot from "@/components/Chatbot";

const jobs = [
  { id: "1", title: "Senior React Developer", company: "TechCorp", location: "Remote", type: "Full-time", salary: "$120K - $160K", posted: "2 days ago", tags: ["React", "TypeScript", "Node.js"] },
  { id: "2", title: "Product Designer", company: "DesignHub", location: "New York, NY", type: "Full-time", salary: "$100K - $140K", posted: "1 day ago", tags: ["Figma", "UI/UX", "Prototyping"] },
  { id: "3", title: "Data Scientist", company: "DataFlow", location: "Austin, TX", type: "Full-time", salary: "$130K - $170K", posted: "3 days ago", tags: ["Python", "ML", "SQL"] },
  { id: "4", title: "DevOps Engineer", company: "CloudNine", location: "Remote", type: "Full-time", salary: "$110K - $150K", posted: "5 hours ago", tags: ["AWS", "Docker", "Kubernetes"] },
  { id: "5", title: "Marketing Manager", company: "GreenTech", location: "Denver, CO", type: "Full-time", salary: "$90K - $120K", posted: "1 week ago", tags: ["SEO", "Content", "Analytics"] },
  { id: "6", title: "Backend Engineer", company: "FinanceAI", location: "Chicago, IL", type: "Full-time", salary: "$125K - $165K", posted: "4 days ago", tags: ["Go", "PostgreSQL", "gRPC"] },
];

const Jobs = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
      <div className="container mx-auto px-4">
        <AnimatedSection className="mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10">
            Browse <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Jobs</span>
          </h1>
          
          {/* Search & Filter - Fully Responsive */}
          <div className="backdrop-blur-xl bg-card/50 border border-border rounded-xl p-2 flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex items-center gap-2 flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-muted/50">
                <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <input placeholder="Search jobs..." className="bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground w-full text-sm" />
              </div>
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-muted/50 sm:w-auto">
                <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <input placeholder="Location" className="bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground w-full text-sm" />
              </div>
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground text-sm transition-colors w-full sm:w-auto">
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>
        </AnimatedSection>

        <div className="space-y-3 sm:space-y-4">
          {jobs.map((job, i) => (
            <AnimatedSection key={job.id} delay={i * 0.08}>
              <Link to={`/jobs/${job.id}`} className="block">
                <div className="backdrop-blur-xl bg-card/50 border border-border rounded-xl p-4 sm:p-5 md:p-6 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Icon */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1 truncate">{job.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{job.company}</p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {job.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400">{tag}</span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Meta Info */}
                    <div className="flex flex-row sm:flex-col gap-2 sm:gap-1 text-xs sm:text-sm text-muted-foreground sm:text-right flex-wrap sm:flex-nowrap">
                      <span className="flex items-center gap-1 whitespace-nowrap"><MapPin className="w-3 h-3 flex-shrink-0" />{job.location}</span>
                      <span className="flex items-center gap-1 whitespace-nowrap"><DollarSign className="w-3 h-3 flex-shrink-0" />{job.salary}</span>
                      <span className="flex items-center gap-1 whitespace-nowrap"><Clock className="w-3 h-3 flex-shrink-0" />{job.posted}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
    <Footer />
    <Chatbot context="jobs" />
  </div>
);

export default Jobs;
