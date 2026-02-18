// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { Briefcase, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
// import { useState } from "react";
// import Navbar from "@/components/Navbar";

// const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [role, setRole] = useState<"seeker" | "recruiter">("seeker");

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <div className="relative pt-28 pb-20 flex items-center justify-center min-h-screen">
//         <div className="floating-orb w-80 h-80 bg-secondary -top-10 -left-10 animate-pulse-glow" />
//         <div className="floating-orb w-64 h-64 bg-accent bottom-10 -right-10 animate-pulse-glow" />

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="glass-card p-8 md:p-10 w-full max-w-md mx-4 relative z-10"
//         >
//           <div className="text-center mb-8">
//             <div className="w-12 h-12 rounded-xl gradient-bg-primary flex items-center justify-center mx-auto mb-4">
//               <Briefcase className="w-6 h-6 text-primary-foreground" />
//             </div>
//             <h1 className="text-2xl font-bold font-display text-foreground">Create Account</h1>
//             <p className="text-muted-foreground text-sm mt-1">Join JobVerse and start your journey</p>
//           </div>

//           {/* Role toggle */}
//           <div className="flex gap-2 mb-6 p-1 rounded-lg bg-muted">
//             <button
//               onClick={() => setRole("seeker")}
//               className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
//                 role === "seeker" ? "gradient-bg-primary text-primary-foreground" : "text-muted-foreground"
//               }`}
//             >
//               Job Seeker
//             </button>
//             <button
//               onClick={() => setRole("recruiter")}
//               className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
//                 role === "recruiter" ? "gradient-bg-primary text-primary-foreground" : "text-muted-foreground"
//               }`}
//             >
//               Recruiter
//             </button>
//           </div>

//           <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
//             <div>
//               <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                 <input type="text" placeholder="John Doe" className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
//               </div>
//             </div>
//             <div>
//               <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                 <input type="email" placeholder="you@example.com" className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
//               </div>
//             </div>
//             <div>
//               <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                 <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
//                 <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
//                   {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                 </button>
//               </div>
//             </div>

//             <button className="w-full gradient-bg-primary text-primary-foreground py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">
//               Create Account
//             </button>
//           </form>

//           <p className="text-center text-sm text-muted-foreground mt-6">
//             Already have an account?{" "}
//             <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Register;



import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"seeker" | "recruiter">("seeker");

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      alert("Please fill all required fields");
      return;
    }

    if (role === "recruiter" && !companyName) {
      alert("Company name is required for recruiters");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: role === "seeker" ? "job_seeker" : "recruiter",
          full_name: fullName,
          company_name: role === "recruiter" ? companyName : null,
        },
      },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created successfully! Please login.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="relative pt-28 pb-20 flex items-center justify-center min-h-screen">
        <div className="floating-orb w-80 h-80 bg-secondary -top-10 -left-10 animate-pulse-glow" />
        <div className="floating-orb w-64 h-64 bg-accent bottom-10 -right-10 animate-pulse-glow" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-10 w-full max-w-md mx-4 relative z-10"
        >
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl gradient-bg-primary flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold font-display text-foreground">
              Create Account
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Join JobVerse and start your journey
            </p>
          </div>

          {/* Role toggle */}
          <div className="flex gap-2 mb-6 p-1 rounded-lg bg-muted">
            <button
              type="button"
              onClick={() => setRole("seeker")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                role === "seeker"
                  ? "gradient-bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Job Seeker
            </button>
            <button
              type="button"
              onClick={() => setRole("recruiter")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                role === "recruiter"
                  ? "gradient-bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Recruiter
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleRegister}>
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            {/* Company Name (Recruiter Only) */}
            {role === "recruiter" && (
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Your Company"
                  className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-bg-primary text-primary-foreground py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
