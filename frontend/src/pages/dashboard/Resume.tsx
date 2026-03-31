import { motion } from "framer-motion";
import { Sparkles, FileText } from "lucide-react";

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 sm:px-0"
    >
      <h1 className="text-2xl sm:text-3xl font-bold font-display mb-1 text-foreground mt-12 sm:mt-0 text-center">
        AI Resume Builder
      </h1>

      <p className="text-sm sm:text-base text-muted-foreground mb-8 text-center">
        Create a professional resume powered by AI.
      </p>

      <div className="max-w-3xl mx-auto">
        <div className="glow-card p-8 sm:p-10 text-center relative overflow-hidden">
          
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50" />

          {/* Icon */}
          <div className="relative z-10 flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
          </div>

          {/* Title */}
          <h2 className="relative z-10 text-xl sm:text-2xl font-semibold text-foreground mb-3">
            AI Resume Generator
          </h2>

          {/* Description */}
          <p className="relative z-10 text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Automatically generate, optimize, and analyze your resume using AI.
            Tailor it for every job in seconds.
          </p>

          {/* Features Preview */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-xs sm:text-sm">
            <div className="p-3 rounded-lg bg-muted/50">
              Smart Resume Writing
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              ATS Optimization
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              AI Score & Feedback
            </div>
          </div>

          {/* Coming Soon Badge */}
          <div className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
            <FileText className="w-4 h-4" />
            Coming Soon
          </div>

          {/* Optional CTA */}
          <p className="relative z-10 text-xs text-muted-foreground mt-4">
            We’re working on something amazing 🚀 Stay tuned!
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Resume;