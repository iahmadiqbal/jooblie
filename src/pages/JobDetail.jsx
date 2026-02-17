import { motion } from "framer-motion";
import { MapPin, DollarSign, Clock, Briefcase, Building2, ArrowLeft, Share2, Heart } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const jobData = {
  "1": { 
    title: "Senior React Developer", 
    company: "TechCorp", 
    location: "Remote", 
    type: "Full-time", 
    salary: "$120K - $160K", 
    posted: "2 days ago", 
    tags: ["React", "TypeScript", "Node.js"], 
    description: "We're looking for a Senior React Developer to join our growing engineering team. You'll build cutting-edge web applications using React, TypeScript, and modern tools.", 
    requirements: ["5+ years React experience", "Strong TypeScript skills", "Experience with state management (Redux, Zustand)", "Node.js backend experience", "Excellent communication skills"], 
    benefits: ["Remote-first culture", "Health & dental insurance", "401(k) matching", "Unlimited PTO", "Learning budget"] 
  },
};

const defaultJob = { 
  title: "Senior React Developer", 
  company: "TechCorp", 
  location: "Remote", 
  type: "Full-time", 
  salary: "$120K - $160K", 
  posted: "2 days ago", 
  tags: ["React", "TypeScript", "Node.js"], 
  description: "We're looking for a talented developer to join our team and help build amazing products.", 
  requirements: ["3+ years experience", "Strong problem-solving skills", "Team collaboration", "Good communication"], 
  benefits: ["Remote work", "Health insurance", "Competitive salary", "Growth opportunities"] 
};

const JobDetail = () => {
  const { id } = useParams();
  const job = jobData[id] || defaultJob;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-24 sm:pt-28 pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <AnimatedSection>
            <Link to="/jobs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 sm:mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Jobs
            </Link>

            <div className="backdrop-blur-xl bg-card/50 border border-border rounded-xl p-5 sm:p-6 md:p-8 shadow-2xl">
              {/* Header */}
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">{job.title}</h1>
                    <p className="text-sm sm:text-base text-muted-foreground mb-2">{job.company}</p>
                    <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3 flex-shrink-0" />{job.location}</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-3 h-3 flex-shrink-0" />{job.salary}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 flex-shrink-0" />{job.posted}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-3 h-3 flex-shrink-0" />{job.type}</span>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-blue-500/30 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-blue-500/30 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                {job.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">{tag}</span>
                ))}
              </div>

              {/* Content */}
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3">Description</h2>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{job.description}</p>
                </div>
                
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3">Requirements</h2>
                  <ul className="space-y-2">
                    {job.requirements.map((r) => (
                      <li key={r} className="text-sm sm:text-base text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 sm:mt-2 flex-shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3">Benefits</h2>
                  <ul className="space-y-2">
                    {job.benefits.map((b) => (
                      <li key={b} className="text-sm sm:text-base text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 sm:mt-2 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 sm:mt-8 pt-6 border-t border-border flex flex-col sm:flex-row gap-3">
                <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity flex-1 sm:flex-none">
                  Apply Now
                </button>
                <button className="border border-border text-foreground px-8 py-3 rounded-lg font-medium text-sm hover:bg-muted transition-colors">
                  Save Job
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default JobDetail;
