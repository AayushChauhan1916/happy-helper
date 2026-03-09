import { UserPlus, Building, Rocket } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    number: '1',
    title: 'Create Your Account',
    description: 'Sign up in 30 seconds. No credit card, no setup fees.',
  },
  {
    icon: Building,
    number: '2',
    title: 'Add Your Properties',
    description: 'Set up PGs, configure rooms, beds, pricing, and amenities.',
  },
  {
    icon: Rocket,
    number: '3',
    title: 'Start Managing',
    description: 'Onboard tenants, collect rent, and watch your business grow.',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            HOW IT WORKS
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Up and running in <span className="text-primary">3 minutes</span>
          </h2>
        </div>

        <div className="relative grid gap-12 md:grid-cols-3 md:gap-8">
          {/* Connector line */}
          <div className="absolute top-16 left-[20%] right-[20%] hidden h-px border-t-2 border-dashed border-border md:block" />

          {steps.map((step) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 mb-6">
                <div className="flex h-32 w-32 items-center justify-center rounded-3xl border border-border/40 bg-card shadow-sm">
                  <step.icon className="h-10 w-10 text-primary" />
                </div>
                <span className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30">
                  {step.number}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
