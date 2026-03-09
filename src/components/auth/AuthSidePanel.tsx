import { Link } from 'react-router-dom';
import {
  BarChart3,
  Building2,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  Home,
  MessageSquare,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react';

import { UserRole } from '@/types/common/roles';

type AuthSidePanelProps = {
  role: UserRole;
  mode: 'login' | 'signup';
};

type Feature = {
  icon: LucideIcon;
  text: string;
};

const tenantFeatures: Feature[] = [
  { icon: CreditCard, text: 'Pay rent online in seconds' },
  { icon: Home, text: 'View room and stay details' },
  { icon: MessageSquare, text: 'Raise and track complaints' },
  { icon: FileText, text: 'Digital payment receipts' },
];

const ownerFeatures: Feature[] = [
  { icon: BarChart3, text: 'Revenue analytics dashboard' },
  { icon: Users, text: 'Tenant management tools' },
  { icon: Shield, text: 'Verified tenant onboarding' },
  { icon: Clock, text: 'Automated rent reminders' },
];

const AuthSidePanel = ({ role, mode }: AuthSidePanelProps) => {
  const isTenant = role === UserRole.TENANT;
  const features = isTenant ? tenantFeatures : ownerFeatures;

  const title = isTenant
    ? mode === 'login'
      ? 'Your PG life,\nsimplified.'
      : 'Find your\nperfect stay.'
    : mode === 'login'
      ? 'Your properties,\none dashboard.'
      : 'Grow your\nPG business.';

  const subtitle = isTenant
    ? mode === 'login'
      ? 'Pay rent, track payments, and resolve complaints from one clean workspace.'
      : 'Join thousands of tenants who run their entire stay journey in one place.'
    : mode === 'login'
      ? 'Manage tenants, collect rent, and monitor occupancy with operational clarity.'
      : 'Register properties, onboard tenants faster, and scale with automation.';

  return (
    <aside className="relative hidden h-screen overflow-hidden lg:flex lg:w-[55%] lg:min-w-[420px] lg:shrink-0 xl:w-[50%]">
      <div
        className={`absolute inset-0 transition-all duration-700 ${
          isTenant
            ? 'bg-[radial-gradient(120%_120%_at_10%_10%,#60a5fa_0%,#2563eb_35%,#1e293b_100%)]'
            : 'bg-[radial-gradient(120%_120%_at_10%_10%,#34d399_0%,#0d9488_35%,#1f2937_100%)]'
        }`}
      />

      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage:
            'radial-gradient(circle at 50% 40%, rgba(0,0,0,1) 20%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0) 100%)',
        }}
      />

      <div className="absolute -left-24 top-[8%] h-[360px] w-[360px] rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -right-28 bottom-[5%] h-[420px] w-[420px] rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="relative z-10 flex w-full flex-col justify-between px-8 py-8 text-white xl:px-12 xl:py-10">
        <Link to="/" className="inline-flex w-fit items-center gap-3 rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-md">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 ring-1 ring-white/30">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">StayEase</span>
        </Link>

        <div className="max-w-[520px]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            {isTenant ? 'Tenant portal' : 'Owner portal'}
          </div>

          <h2 className="mb-4 whitespace-pre-line text-[clamp(2rem,2.4vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-white">
            {title}
          </h2>
          <p className="mb-7 max-w-[500px] text-sm leading-relaxed text-white/80 xl:text-[15px]">
            {subtitle}
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.text}
                className="group flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-md transition-all duration-200 hover:bg-white/15"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20">
                  <feature.icon className="h-4.5 w-4.5 text-white" />
                </div>
                <span className="text-[13px] leading-snug text-white/90">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 xl:grid-cols-2">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">Platform growth</p>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-2xl font-bold">+28%</span>
              <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-emerald-400/20 px-2 py-0.5 text-xs font-semibold text-emerald-100">
                <TrendingUp className="h-3.5 w-3.5" /> Monthly
              </span>
            </div>
            <p className="mt-1 text-xs text-white/70">Active users and collections continue to rise.</p>
          </div>

          <div className="rounded-2xl border border-white/20 bg-slate-950/25 p-4 backdrop-blur-md">
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/70">System trust</p>
            <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-white">
              <CheckCircle2 className="h-4.5 w-4.5 text-emerald-300" />
              99.9% platform uptime
            </div>
            <p className="mt-1 text-xs text-white/70">2,500+ users across 500+ properties</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AuthSidePanel;
