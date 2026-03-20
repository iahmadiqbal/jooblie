import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, DollarSign, Save } from "lucide-react";
import { toast } from "sonner";

interface JobFormData {
  title: string;
  location: string;
  salary: string;
  type: string;
  experience: string;
  description: string;
  skills: string;
}

interface JobFormErrors {
  title?: string;
  location?: string;
  salary?: string;
  description?: string;
}

const LOCAL_STORAGE_KEY = "createJobDraft";

const CreateJob = () => {
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    location: "",
    salary: "",
    type: "Full-time",
    experience: "Junior",
    description: "",
    skills: "",
  });

  const [errors, setErrors] = useState<JobFormErrors>({});

  // Load draft on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form
  const validate = () => {
    const newErrors: JobFormErrors = {};
    if (!formData.title) newErrors.title = "Job title is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.salary) newErrors.salary = "Salary is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Publish
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    const loading = toast.loading("Publishing job...");
    setTimeout(() => {
      toast.dismiss(loading);
      toast.success("Job Published Successfully 🚀");
      setFormData({
        title: "",
        location: "",
        salary: "",
        type: "Full-time",
        experience: "Junior",
        description: "",
        skills: "",
      });
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }, 1000);
  };

  // Handle Save Draft
  const handleSaveDraft = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
    toast.success("Draft Saved ✅");
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl font-bold font-display mb-1 text-foreground text-center">
        Post a New Job
      </h1>
      <p className="text-muted-foreground mb-8 text-center">
        Create a compelling job listing to attract top talent.
      </p>

      <div className="glass-card p-8 max-w-3xl mx-auto">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Job Title */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Job Title
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Senior React Developer"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Location + Salary */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Remote, City, etc."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Salary Range
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="$100K - $150K"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              {errors.salary && (
                <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
              )}
            </div>
          </div>

          {/* Job Type + Experience */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Job Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Experience Level
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option>Junior</option>
                <option>Mid-level</option>
                <option>Senior</option>
                <option>Lead</option>
              </select>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Job Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              placeholder="Describe the role, responsibilities, and what you're looking for..."
              className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Required Skills */}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">
              Required Skills
            </label>
            <input
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, TypeScript, Node.js (comma-separated)"
              className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="gradient-bg-accent text-accent-foreground px-8 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Publish Job
            </button>

            <button
              type="button"
              onClick={handleSaveDraft}
              className="border border-border text-foreground px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-muted transition-colors"
            >
              Save Draft
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateJob;
