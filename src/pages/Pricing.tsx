import { motion } from "framer-motion";
import { Check, Zap, Crown, Building2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    icon: Zap,
    gradient: false,
    features: ["5 job applications/month", "Basic profile", "Job alerts", "Resume upload"],
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For serious job seekers",
    icon: Crown,
    gradient: true,
    features: ["Unlimited applications", "AI resume builder", "Priority visibility", "Interview prep", "Salary insights", "24/7 support"],
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    description: "For recruiting teams",
    icon: Building2,
    gradient: false,
    features: ["Unlimited job posts", "AI candidate matching", "Team collaboration", "Analytics dashboard", "ATS integration", "Dedicated manager"],
  },
];

const Pricing = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="floating-orb w-80 h-80 bg-primary -top-20 left-1/4 animate-pulse-glow" />
      <div className="floating-orb w-64 h-64 bg-accent bottom-0 right-1/4 animate-pulse-glow" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Choose the plan that fits your needs. Upgrade or downgrade anytime.</p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <AnimatedSection key={plan.name} delay={i * 0.15}>
              <div className={`rounded-2xl p-8 h-full flex flex-col ${plan.gradient ? "gradient-border gradient-bg-primary/5 relative" : "glass-card"}`}>
                {plan.gradient && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full gradient-bg-accent text-primary-foreground text-xs font-bold">
                    POPULAR
                  </div>
                )}
                <plan.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold font-display text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold font-display text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-2.5 rounded-lg font-medium text-sm transition-opacity hover:opacity-90 ${plan.gradient ? "gradient-bg-primary text-primary-foreground" : "border border-border text-foreground hover:bg-muted"}`}>
                  Get Started
                </button>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Pricing;
