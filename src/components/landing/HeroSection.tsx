import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const stats = [
  { value: '10K+', label: 'Properties' },
  { value: '50K+', label: 'Happy Tenants' },
  { value: '99.9%', label: 'Uptime' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(hsl(var(--border)) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.3,
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 md:py-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Zap className="w-3.5 h-3.5" />
              Smart Property Management
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
              Manage Properties
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Effortlessly
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              The all-in-one platform for property owners, tenants, and admins.
              Streamline rent collection, maintenance, and communication — all
              in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <Button size="lg" className="text-base px-8 gap-2" asChild>
                <Link to="/signup">
                  Start Free Trial <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8"
                asChild
              >
                <a href="#how-it-works">See How It Works</a>
              </Button>
            </div>

            <div className="flex gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Mock dashboard preview card */}
              <div className="rounded-2xl border border-border bg-card shadow-2xl shadow-primary/5 p-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <div className="w-3 h-3 rounded-full bg-primary" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Shield, label: 'Verified', value: '156' },
                    { icon: Users, label: 'Tenants', value: '2,340' },
                    { icon: Zap, label: 'Active', value: '98%' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl bg-muted/50 p-4 text-center"
                    >
                      <item.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                      <div className="text-lg font-bold">{item.value}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {[85, 62, 94].map((w, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10" />
                      <div className="flex-1 h-2 rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{ width: `${w}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: 'easeInOut',
                }}
                className="absolute -bottom-4 -left-4 rounded-xl border border-border bg-card shadow-lg p-3 flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-semibold">Rent Collected</div>
                  <div className="text-sm font-bold text-primary">
                    ₹4,50,000
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
