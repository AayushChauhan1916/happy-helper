import {
  Users,
  DoorOpen,
  CreditCard,
  BarChart3,
  Shield,
  Zap,
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Tenant Management',
    description:
      'Onboard tenants digitally with documents, agreements, and move-in tracking.',
    gradient: 'from-violet-500/10 to-purple-500/10',
  },
  {
    icon: DoorOpen,
    title: 'Smart Room Tracking',
    description:
      'Visual room & bed management. See availability at a glance across all properties.',
    gradient: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    icon: CreditCard,
    title: 'Automated Payments',
    description:
      'Auto-reminders, online collection, and instant digital receipts for tenants.',
    gradient: 'from-emerald-500/10 to-teal-500/10',
  },
  {
    icon: BarChart3,
    title: 'Revenue Analytics',
    description:
      'Track occupancy trends, revenue growth, and tenant insights with real-time dashboards.',
    gradient: 'from-amber-500/10 to-orange-500/10',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description:
      'Bank-grade encryption for tenant data. Role-based access keeps everything safe.',
    gradient: 'from-rose-500/10 to-pink-500/10',
  },
  {
    icon: Zap,
    title: 'Instant Notifications',
    description:
      'Automated alerts for rent dues, complaints, and property updates via SMS & email.',
    gradient: 'from-indigo-500/10 to-violet-500/10',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-28 bg-muted/30">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            FEATURES
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need,{' '}
            <span className="text-primary">nothing you don't</span>
          </h2>
          <p className="text-muted-foreground">
            Purpose-built tools for modern PG management — simple, powerful, and
            delightful to use.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-border/40 bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient}`}
              >
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
