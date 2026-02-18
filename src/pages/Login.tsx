// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { Briefcase, Mail, Lock, Eye, EyeOff } from "lucide-react";
// import { useState } from "react";
// import Navbar from "@/components/Navbar";

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <div className="relative pt-28 pb-20 flex items-center justify-center min-h-screen">
//         <div className="floating-orb w-80 h-80 bg-primary -top-10 -right-10 animate-pulse-glow" />
//         <div className="floating-orb w-64 h-64 bg-secondary bottom-10 -left-10 animate-pulse-glow" />

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
//             <h1 className="text-2xl font-bold font-display text-foreground">Welcome Back</h1>
//             <p className="text-muted-foreground text-sm mt-1">Sign in to your JobVerse account</p>
//           </div>

//           <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
//             <div>
//               <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                 <input
//                   type="email"
//                   placeholder="you@example.com"
//                   className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                 >
//                   {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center justify-between text-sm">
//               <label className="flex items-center gap-2 text-muted-foreground">
//                 <input type="checkbox" className="rounded border-border" />
//                 Remember me
//               </label>
//               <a href="#" className="text-primary hover:underline">Forgot password?</a>
//             </div>

//             <button className="w-full gradient-bg-primary text-primary-foreground py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">
//               Sign In
//             </button>
//           </form>

//           <p className="text-center text-sm text-muted-foreground mt-6">
//             Don't have an account?{" "}
//             <Link to="/register" className="text-primary hover:underline font-medium">Sign up</Link>
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Login;




import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      alert(error.message);
      return;
    }

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    setLoading(false);

    if (profile?.role === "recruiter") {
      navigate("/recruiter/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="relative pt-28 pb-20 flex items-center justify-center min-h-screen">
        <div className="floating-orb w-80 h-80 bg-primary -top-10 -right-10 animate-pulse-glow" />
        <div className="floating-orb w-64 h-64 bg-secondary bottom-10 -left-10 animate-pulse-glow" />

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
            <h1 className="text-2xl font-bold font-display text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground text-sm mt-1">Sign in to your JobVerse account</p>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="rounded border-border" />
                Remember me
              </label>
              <a href="#" className="text-primary hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-bg-primary text-primary-foreground py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
