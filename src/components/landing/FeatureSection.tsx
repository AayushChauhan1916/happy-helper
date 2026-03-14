import { motion } from 'framer-motion';
import {
  Building,
  CreditCard,
  Bell,
  ShieldCheck,
  BarChart3,
  Users,
} from 'lucide-react';

const features = [
  {
    icon: Building,
    title: 'Property Management',
    description:
      'Add, manage and track multiple properties with detailed analytics and occupancy monitoring.',
  },
  {
    icon: CreditCard,
    title: 'Rent Collection',
    description:
      'Automated rent tracking with online payment support, receipts, and overdue reminders.',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description:
      'Real-time alerts for payments, maintenance requests, lease renewals, and important updates.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified Listings',
    description:
      'Admin-verified property listings ensure trust and authenticity for all tenants.',
  },
  {
    icon: BarChart3,
    title: 'Revenue Analytics',
    description:
      'Detailed financial reports, revenue trends, and expense tracking at your fingertips.',
  },
  {
    icon: Users,
    title: 'Role-Based Access',
    description:
      'Dedicated dashboards for Admins, Owners, and Tenants with tailored functionality.',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Everything You Need to Manage Properties
          </h2>
          <p className="text-muted-foreground text-lg">
            A comprehensive suite of tools designed for modern property
            management.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group relative rounded-2xl border border-border bg-card p-6 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
