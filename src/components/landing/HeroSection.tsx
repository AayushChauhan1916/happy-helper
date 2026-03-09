import { ArrowRight, CheckCircle2, Building, Users, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-20 pb-28">
      {/* Ambient gradient orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-primary/6 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[300px] w-[400px] rounded-full bg-accent/60 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          {/* Pill badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-accent px-4 py-1.5">
            <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-medium text-accent-foreground">Trusted by 500+ PG owners across India</span>
          </div>

          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Manage Your PG Like a{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Modern Business
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            From tenant onboarding to rent collection — one elegant platform 
            that handles everything so you can focus on growing.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" className="h-12 gap-2 rounded-xl px-8 text-base shadow-lg shadow-primary/20" asChild>
              <Link to="/login">
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 gap-2 rounded-xl px-8 text-base">
              Watch Demo
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {["Free 14-day trial", "No credit card needed", "Cancel anytime"].map((text) => (
              <span key={text} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-success" />
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* Dashboard preview mockup */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
          <div className="rounded-2xl border border-border/60 bg-card shadow-2xl shadow-primary/5 overflow-hidden">
            {/* Mock toolbar */}
            <div className="flex items-center gap-2 border-b border-border/40 px-4 py-3 bg-muted/30">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-warning/60" />
                <div className="h-3 w-3 rounded-full bg-success/60" />
              </div>
              <div className="flex-1 mx-16">
                <div className="mx-auto h-5 w-48 rounded-md bg-muted/60" />
              </div>
            </div>
            {/* Mock content */}
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { icon: Building, label: "Properties", value: "12" },
                  { icon: Users, label: "Tenants", value: "148" },
                  { icon: CreditCard, label: "Revenue", value: "₹4.2L" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3 rounded-xl border border-border/40 bg-muted/20 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="text-lg font-bold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {[85, 65, 45].map((w) => (
                  <div key={w} className="h-3 rounded-full bg-muted/40" style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
