import { Link } from 'react-router-dom';
import {
  Building2,
  Home,
  MessageSquare,
  Receipt,
  Shield,
  Sparkles,
  Users,
  type LucideIcon,
} from 'lucide-react';

import { UserRole } from '@/types/common/roles';
import { APP_NAME } from '@/constants/app';

type AuthSidePanelProps = {
  role: UserRole;
  mode: 'login' | 'signup';
};

type Feature = {
  icon: LucideIcon;
  text: string;
};

const tenantFeatures: Feature[] = [
  { icon: Home, text: 'Rent, stay, and updates in one place' },
  { icon: Receipt, text: 'Receipts and payment history, instantly' },
  { icon: MessageSquare, text: 'Maintenance requests, made simple' },
];

const ownerFeatures: Feature[] = [
  { icon: Users, text: 'Tenants and occupancy, in one view' },
  { icon: Shield, text: 'Onboarding and verification, organized' },
  { icon: MessageSquare, text: 'Communication, without the clutter' },
];

const AuthSidePanel = ({ role, mode }: AuthSidePanelProps) => {
  const isTenant = role === UserRole.TENANT;
  const features = isTenant ? tenantFeatures : ownerFeatures;

  const title =
    mode === 'login'
      ? 'Simple tools.\nClear flow.'
      : 'Start clean.\nMove faster.';

  const subtitle =
    mode === 'login'
      ? 'Everything important, in one calm workspace.'
      : isTenant
        ? 'Create your account to manage rent, stays, and updates.'
        : 'Create your account to manage properties with clarity.';

  const badgeLabel =
    mode === 'login'
      ? 'Unified portal'
      : isTenant
        ? 'Tenant signup'
        : 'Owner signup';

  return (
    <aside className="relative hidden min-h-screen overflow-hidden lg:flex">
      <div className="absolute inset-0 bg-primary" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute left-[-12%] top-[12%] h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-[-8%] right-[-10%] h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 flex w-full flex-col justify-between p-10 text-primary-foreground xl:p-12">
        <Link to="/" className="inline-flex w-fit items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/20">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">{APP_NAME}</span>
        </Link>

        <div className="max-w-[440px] space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em]">
            <Sparkles className="h-3.5 w-3.5" />
            {badgeLabel}
          </div>

          <div className="space-y-2.5">
            <h2 className="whitespace-pre-line text-4xl font-bold leading-tight xl:text-[3.25rem]">
              {title}
            </h2>
            <p className="max-w-sm text-[15px] leading-6 text-primary-foreground/75">
              {subtitle}
            </p>
          </div>

          <div className="grid gap-3">
            {features.map((feature) => (
              <div
                key={feature.text}
                className="flex items-start gap-3 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/10 p-4"
              >
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/15">
                  <feature.icon className="h-4.5 w-4.5" />
                </div>
                <span className="text-sm leading-6 text-primary-foreground/85">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-primary-foreground/55">(c) 2026 {APP_NAME}</p>
      </div>
    </aside>
  );
};

export default AuthSidePanel;
