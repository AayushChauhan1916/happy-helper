import { motion } from 'framer-motion';
import { UserPlus, Building2, CheckCircle2, BarChart3 } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'Create Account',
    description:
      'Sign up as an Owner, Tenant, or Admin with quick OTP verification.',
  },
  {
    icon: Building2,
    title: 'Add Properties',
    description:
      'Owners list their properties with detailed info and submit for admin verification.',
  },
  {
    icon: CheckCircle2,
    title: 'Get Verified',
    description:
      'Admins review and verify listings to ensure quality and trust on the platform.',
  },
  {
    icon: BarChart3,
    title: 'Manage & Grow',
    description:
      'Track rent, handle maintenance, view analytics, and grow your portfolio.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            How It Works
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Get Started in 4 Simple Steps
          </h2>
          <p className="text-muted-foreground text-lg">
            From signup to full management — it takes just minutes to get going.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-border" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="text-center relative"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 relative z-10">
                <step.icon className="w-7 h-7 text-primary" />
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-[220px] mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
