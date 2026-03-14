import {
  AlertTriangle,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
  Users,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const kpis = [
  { label: 'Total Users', value: '2,584', delta: '+8.6%', icon: Users },
  { label: 'Active Owners', value: '612', delta: '+24 this week', icon: UserCheck },
  { label: 'Listed Properties', value: '918', delta: '+31 new listings', icon: Building2 },
  { label: 'Compliance Score', value: '97.2%', delta: 'Excellent', icon: ShieldCheck },
];

const verificationQueue = [
  {
    title: '12 owner profiles pending KYC review',
    meta: 'Identity verification',
    action: 'Review queue',
  },
  {
    title: '7 property documents awaiting approval',
    meta: 'Listing moderation',
    action: 'Open documents',
  },
  {
    title: '3 flagged accounts require action',
    meta: 'Trust and safety',
    action: 'Investigate',
  },
];

const alerts = [
  {
    title: 'Monitoring',
    text: 'API latency is slightly elevated in Mumbai region.',
    tone: 'border-amber-300 bg-amber-50/70 text-amber-900',
    icon: AlertTriangle,
  },
  {
    title: 'Status',
    text: 'All critical services are operational.',
    tone: 'border-emerald-300 bg-emerald-50/70 text-emerald-900',
    icon: CheckCircle2,
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[28px] border border-border/70 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4 px-6 py-6 lg:px-8 lg:py-7">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              Super Admin
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight lg:text-3xl">
                Platform Control Center
              </h1>
              <p className="max-w-xl text-sm leading-6 text-white/70">
                Watch platform growth, approvals, and operational health from one
                central workspace.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.22em] text-white/55">
                Live Health
              </p>
              <div className="mt-2 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                <span className="text-lg font-semibold">97.2%</span>
              </div>
            </div>
            <Button className="h-11 rounded-xl bg-white px-5 text-slate-900 hover:bg-white/90">
              <ShieldCheck className="h-4 w-4" />
              Review Reports
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => (
          <Card
            key={item.label}
            className="gap-0 overflow-hidden border-border/70 bg-white py-0 shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
          >
            <CardContent className="p-5">
              <div className="mb-5 flex items-start justify-between gap-3">
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700">
                  {item.delta}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <div className="flex items-end justify-between gap-3">
                  <p className="text-3xl font-semibold tracking-tight text-foreground">
                    {item.value}
                  </p>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <Card className="border-border/70 bg-white py-0 shadow-sm">
          <CardHeader className="border-b border-border/60 px-6 py-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  Moderation
                </p>
                <CardTitle className="mt-2 text-lg">Verification Queue</CardTitle>
              </div>
              <Button variant="outline" size="sm" className="rounded-lg">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 px-6 py-6">
            {verificationQueue.map((item) => (
              <div
                key={item.title}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/70 bg-muted/20 px-4 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.meta}</p>
                  </div>
                </div>
                <Button size="sm" className="rounded-lg">
                  {item.action}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-white py-0 shadow-sm">
          <CardHeader className="border-b border-border/60 px-6 py-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Monitoring
              </p>
              <CardTitle className="mt-2 text-lg">System Alerts</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 px-6 py-6">
            {alerts.map((alert) => (
              <div
                key={alert.title}
                className={`rounded-2xl border px-4 py-4 ${alert.tone}`}
              >
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]">
                  <alert.icon className="h-4 w-4" />
                  {alert.title}
                </p>
                <p className="mt-2 text-sm leading-6">{alert.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
