import { motion } from "framer-motion";
import { Search, MapPin, Briefcase, Clock, DollarSign, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

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
    <section className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <AnimatedSection className="mb-10">
          <h1 className="text-4xl font-bold font-display mb-4">
            Browse <span className="gradient-text">Jobs</span>
          </h1>
          {/* Search & Filter */}
          <div className="glass-card p-2 flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2 flex-1 px-4 py-2 rounded-lg bg-muted/50">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input placeholder="Search jobs..." className="bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground w-full text-sm" />
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <input placeholder="Location" className="bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground w-full text-sm" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground text-sm transition-colors">
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>
        </AnimatedSection>

        <div className="space-y-4">
          {jobs.map((job, i) => (
            <AnimatedSection key={job.id} delay={i * 0.08}>
              <Link to={`/jobs/${job.id}`} className="block">
                <div className="glow-card p-6 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold font-display text-foreground">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {job.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap md:flex-col gap-2 md:gap-1 text-sm text-muted-foreground md:text-right">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                    <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{job.salary}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.posted}</span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Jobs;
