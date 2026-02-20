import { motion } from "framer-motion";
import { Upload, File, Download, Trash2, Sparkles } from "lucide-react";
import { useRef, useState } from "react";

const Resume = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload PDF, DOC, or DOCX file only');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setSelectedFile(file);
    setUploading(true);

    // Simulate upload (replace with actual upload logic)
    setTimeout(() => {
      setUploading(false);
      alert(`File "${file.name}" uploaded successfully!`);
    }, 1500);
  };

  return (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
    <h1 className="text-3xl font-bold font-display mb-1 text-foreground mt-12 sm:mt-0">My Resume</h1>
    <p className="text-muted-foreground mb-8">Upload and manage your resume to apply for jobs faster.</p>

    <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
      {/* Upload */}
      <div className="glow-card p-8 flex flex-col items-center justify-center text-center min-h-[280px]">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Upload className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold font-display text-foreground mb-2">Upload Resume</h3>
        <p className="text-sm text-muted-foreground mb-4">PDF, DOC, or DOCX (max 5MB)</p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
        />
        <button 
          onClick={handleFileClick}
          disabled={uploading}
          className="gradient-bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Choose File'}
        </button>
        {selectedFile && (
          <p className="text-xs text-muted-foreground mt-3">Selected: {selectedFile.name}</p>
        )}
      </div>

      {/* Current Resume */}
      <div className="glow-card p-8">
        <h3 className="text-lg font-semibold font-display text-foreground mb-4">Current Resume</h3>
        <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 mb-4">
          <File className="w-8 h-8 text-primary" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">John_Doe_Resume.pdf</p>
            <p className="text-xs text-muted-foreground">Uploaded Feb 10, 2026 • 245 KB</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"><Download className="w-4 h-4" /></button>
            <button className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="p-4 rounded-lg border border-secondary/30 bg-secondary/5">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">AI Analysis</span>
          </div>
          <p className="text-xs text-muted-foreground">Your resume scores <strong className="text-foreground">85/100</strong>. Consider adding more quantifiable achievements.</p>
        </div>
      </div>
    </div>
  </motion.div>
);
};

export default Resume;
