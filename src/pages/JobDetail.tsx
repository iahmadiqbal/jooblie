import { motion } from "framer-motion";
import {
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  Building2,
  Users,
  ArrowLeft,
  Share2,
  Heart,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const jobData: Record<string, any> = {
  "1": {
    title: "Senior React Developer",
    company: "TechCorp",
    location: "Remote",
    type: "Full-time",
    salary: "$120K - $160K",
    posted: "2 days ago",
    tags: ["React", "TypeScript", "Node.js"],
    description:
      "We're looking for a Senior React Developer to join our growing engineering team. You'll build cutting-edge web applications using React, TypeScript, and modern tools.",
    requirements: [
      "5+ years React experience",
      "Strong TypeScript skills",
      "Experience with state management (Redux, Zustand)",
      "Node.js backend experience",
      "Excellent communication skills",
    ],
    benefits: [
      "Remote-first culture",
      "Health & dental insurance",
      "401(k) matching",
      "Unlimited PTO",
      "Learning budget",
    ],
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
  description:
    "We're looking for a talented developer to join our team and help build amazing products.",
  requirements: [
    "3+ years experience",
    "Strong problem-solving skills",
    "Team collaboration",
    "Good communication",
  ],
  benefits: [
    "Remote work",
    "Health insurance",
    "Competitive salary",
    "Growth opportunities",
  ],
};

const JobDetail = () => {
  const { id } = useParams();
  const job = jobData[id || ""] || defaultJob;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <AnimatedSection>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Jobs
            </Link>

            <div className="glass-card p-8">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold font-display text-foreground">
                      {job.title}
                    </h1>
                    <p className="text-muted-foreground">{job.company}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {job.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {job.posted}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {job.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-lg font-semibold font-display text-foreground mb-3">
                    Description
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {job.description}
                  </p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold font-display text-foreground mb-3">
                    Requirements
                  </h2>
                  <ul className="space-y-2">
                    {job.requirements.map((r: string) => (
                      <li
                        key={r}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-lg font-semibold font-display text-foreground mb-3">
                    Benefits
                  </h2>
                  <ul className="space-y-2">
                    {job.benefits.map((b: string) => (
                      <li
                        key={b}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row gap-3">
                <button className="gradient-bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity flex-1 sm:flex-none">
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
