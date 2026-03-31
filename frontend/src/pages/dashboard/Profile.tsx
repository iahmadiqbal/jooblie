import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  MapPin,
  Briefcase,
  Save,
  Upload,
  File,
  Download,
  Trash2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

interface ResumeData {
  resume_path: string | null;
  resume_file_name: string | null;
  resume_file_size: number | null;
  resume_uploaded_at: string | null;
}

const Profile = () => {
  const { user, loading } = useAuth();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [role, setRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");

  const [saving, setSaving] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const [selectedResumeFile, setSelectedResumeFile] = useState<File | null>(null);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [deletingResume, setDeletingResume] = useState(false);

  const [resumeData, setResumeData] = useState<ResumeData>({
    resume_path: null,
    resume_file_name: null,
    resume_file_size: null,
    resume_uploaded_at: null,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const { data: authData } = await supabase.auth.getUser();
        if (!authData.user) return;

        setEmail(authData.user.email || "");

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", authData.user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          return;
        }

        if (data) {
          setFullName(data.full_name || "");
          setLocation(data.location || "");
          setBio(data.about || "");
          setJobTitle(data.job_title || "");
          setSkills(data.skills || "");
          setRole(data.role || "");
          setCompanyName(data.company_name || "");
          setAvatarUrl(data.avatar_url || null);

          setResumeData({
            resume_path: data.resume_path || null,
            resume_file_name: data.resume_file_name || null,
            resume_file_size: data.resume_file_size || null,
            resume_uploaded_at: data.resume_uploaded_at || null,
          });
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setAvatarFile(e.target.files[0]);
  };

  const handleResumeClick = () => {
    fileInputRef.current?.click();
  };

  const handleResumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(file.type)) {
      alert("Please upload PDF, DOC, or DOCX file only");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    setSelectedResumeFile(file);
    setUploadingResume(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError || !authData.user) {
        alert("User not authenticated");
        return;
      }

      const fileExtension = file.name.split(".").pop();
      const filePath = `${authData.user.id}.${fileExtension}`;

      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        console.error("Resume upload error:", uploadError);
        alert(`Failed to upload resume: ${uploadError.message}`);
        return;
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          resume_path: filePath,
          resume_uploaded_at: new Date().toISOString(),
          resume_file_name: file.name,
          resume_file_size: file.size,
        })
        .eq("id", authData.user.id);

      if (updateError) {
        console.error("Resume metadata update error:", updateError);
        alert(`Failed to update resume metadata: ${updateError.message}`);
        return;
      }

      setResumeData({
        resume_path: filePath,
        resume_uploaded_at: new Date().toISOString(),
        resume_file_name: file.name,
        resume_file_size: file.size,
      });

      alert(`File "${file.name}" uploaded successfully!`);
      setSelectedResumeFile(null);
    } catch (error: any) {
      console.error("Unexpected resume upload error:", error);
      alert(error?.message || "Failed to upload resume");
    } finally {
      setUploadingResume(false);
    }
  };

  const handleResumeDownload = async () => {
    if (!resumeData.resume_path) return;

    try {
      const { data, error } = await supabase.storage
        .from("resumes")
        .createSignedUrl(resumeData.resume_path, 60);

      if (error) {
        console.error("Download error:", error);
        alert("Failed to generate download link");
        return;
      }

      if (data?.signedUrl) {
        window.open(data.signedUrl, "_blank");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during download");
    }
  };

  const handleResumeDelete = async () => {
    if (!resumeData.resume_path) return;
    if (!confirm("Are you sure you want to delete your resume?")) return;

    setDeletingResume(true);

    try {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) {
        alert("User not authenticated");
        return;
      }

      const { error: deleteError } = await supabase.storage
        .from("resumes")
        .remove([resumeData.resume_path]);

      if (deleteError) {
        console.error("Delete error:", deleteError);
        alert("Failed to delete resume file");
        return;
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          resume_path: null,
          resume_file_name: null,
          resume_file_size: null,
          resume_uploaded_at: null,
        })
        .eq("id", authData.user.id);

      if (updateError) {
        console.error("Update error:", updateError);
        alert("Failed to update resume metadata");
        return;
      }

      setResumeData({
        resume_path: null,
        resume_file_name: null,
        resume_file_size: null,
        resume_uploaded_at: null,
      });

      alert("Resume deleted successfully");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during deletion");
    } finally {
      setDeletingResume(false);
    }
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    setSaving(true);

    try {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) {
        console.error("No authenticated user");
        return;
      }

      let uploadedAvatarUrl = avatarUrl;

      if (avatarFile) {
        const fileExt = avatarFile.name.split(".").pop();
        const fileName = `${user.id}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("profile_avatars")
          .upload(fileName, avatarFile, {
            upsert: true,
          });

        if (uploadError) {
          console.error(uploadError);
        } else {
          const { data } = supabase.storage
            .from("profile_avatars")
            .getPublicUrl(fileName);

          uploadedAvatarUrl = data.publicUrl;
          setAvatarUrl(uploadedAvatarUrl);
        }
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          location: location,
          about: bio,
          job_title: jobTitle,
          skills: skills,
          avatar_url: uploadedAvatarUrl,
        })
        .eq("id", authData.user.id);

      if (error) {
        console.error("Error updating profile:", error);
        alert("Failed to save profile");
      } else {
        alert("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong while saving profile");
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "";
    return `${Math.round(bytes / 1024)} KB`;
  };

  const skillsArray = skills
    ? skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const isProfileComplete =
    location.trim() !== "" &&
    jobTitle.trim() !== "" &&
    bio.trim() !== "" &&
    skillsArray.length > 0 &&
    !!resumeData.resume_path;

  const missingFields = [
    !location.trim() && "Location",
    !jobTitle.trim() && "Job Title",
    !bio.trim() && "Bio",
    skillsArray.length === 0 && "Skills",
    !resumeData.resume_path && "Resume",
  ].filter(Boolean);

  if (loading || fetchLoading) return null;

  const displayTitle =
    role === "recruiter"
      ? companyName
      : role === "job_seeker"
      ? "Job Seeker"
      : role;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl font-bold font-display mb-1 text-foreground text-center">
        My Profile
      </h1>
      <p className="text-muted-foreground mb-8 text-center">
        Manage your personal information and resume.
      </p>

      <div className="glass-card p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex flex-col items-center">
            <label className="w-20 h-20 rounded-full overflow-hidden border cursor-pointer group relative">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full gradient-bg-primary flex items-center justify-center">
                  <User className="w-10 h-10 text-primary-foreground" />
                </div>
              )}

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs transition">
                Change
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>

            <p className="text-xs text-muted-foreground mt-2">Click to upload</p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-display text-foreground">
              {fullName || "Your Name"}
            </h2>
            <p className="text-sm text-muted-foreground">{displayTitle}</p>
          </div>
        </div>

        {/* Profile completion alert */}
        <div
          className={`mb-8 rounded-xl border p-4 ${
            isProfileComplete
              ? "border-green-500/30 bg-green-500/10"
              : "border-yellow-500/30 bg-yellow-500/10"
          }`}
        >
          <div className="flex items-start gap-3">
            {isProfileComplete ? (
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
            )}
            <div>
              <h3 className="font-semibold text-foreground">
                {isProfileComplete
                  ? "Profile Complete"
                  : "Complete your profile before applying"}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {isProfileComplete
                  ? "You can now apply for jobs."
                  : `Missing: ${missingFields.join(", ")}`}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Profile Form */}
          <form className="space-y-5" onSubmit={handleSaveChanges}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    value={email}
                    readOnly
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Job Title *
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Bio *
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Skills *
              </label>
              <input
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Enter skills separated by commas"
                className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 mb-2"
              />
              <div className="flex flex-wrap gap-2">
                {skillsArray.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="gradient-bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>

          {/* Right Side - Resume */}
          <div className="space-y-5">
            <div className="rounded-xl border border-border bg-muted/20 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Resume
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload your resume to apply for jobs faster.
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
                className="hidden"
              />

              <button
                onClick={handleResumeClick}
                disabled={uploadingResume}
                className="gradient-bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 inline-flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                {uploadingResume ? "Uploading..." : "Upload Resume"}
              </button>

              {selectedResumeFile && (
                <p className="text-xs text-muted-foreground mt-3 break-all">
                  Selected: {selectedResumeFile.name}
                </p>
              )}
            </div>

            <div className="rounded-xl border border-border bg-muted/20 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Current Resume
              </h3>

              {resumeData.resume_path ? (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  <File className="w-8 h-8 text-primary flex-shrink-0 mt-1" />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground break-words">
                      {resumeData.resume_file_name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Uploaded {formatDate(resumeData.resume_uploaded_at)} •{" "}
                      {formatFileSize(resumeData.resume_file_size)}
                    </p>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={handleResumeDownload}
                      className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    <button
                      onClick={handleResumeDelete}
                      disabled={deletingResume}
                      className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center rounded-lg bg-muted/30">
                  <File className="w-12 h-12 text-muted-foreground/50 mb-3" />
                  <p className="text-sm text-muted-foreground">
                    No resume uploaded yet
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload your resume to complete your profile
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;