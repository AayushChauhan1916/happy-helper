import {
  ArrowUpRight,
  CalendarClock,
  CreditCard,
  Home,
  ReceiptText,
  Wrench,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const stats = [
  { label: 'Current Rent', value: 'Rs 8,500', detail: 'Due on 5th every month', icon: CreditCard },
  { label: 'Outstanding', value: 'Rs 0', detail: 'All payments clear', icon: ReceiptText },
  { label: 'Room', value: 'B-203', detail: 'Sunrise Residency', icon: Home },
  { label: 'Complaints', value: '1 Open', detail: 'Estimated resolution: today', icon: Wrench },
];

const quickActions = [
  { icon: CreditCard, title: 'Pay Rent', text: 'Pay monthly rent securely' },
  { icon: ReceiptText, title: 'Download Receipt', text: 'Access payment invoices' },
  { icon: Wrench, title: 'Raise Complaint', text: 'Report maintenance issues' },
  { icon: Home, title: 'Room Details', text: 'Check stay and amenities' },
];

const upcoming = [
  {
    label: 'Next Rent Due',
    value: '5 days left',
    note: 'Due on March 18',
    icon: CalendarClock,
  },
  {
    label: 'Maintenance Visit',
    value: 'Today, 6:00 PM',
    note: 'Water filter inspection',
    icon: Wrench,
  },
];

export default function TenantDashboard() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[28px] border border-border/70 bg-gradient-to-br from-emerald-900 via-teal-800 to-slate-900 text-white shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4 px-6 py-6 lg:px-8 lg:py-7">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              Tenant Dashboard
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight lg:text-3xl">
                Welcome Back
              </h1>
              <p className="max-w-xl text-sm leading-6 text-white/70">
                Stay on top of rent, service requests, and your room details from a
                simple personal dashboard.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.22em] text-white/55">
                Account Status
              </p>
              <div className="mt-2 flex items-center gap-2">
                <ReceiptText className="h-4 w-4 text-emerald-300" />
                <span className="text-lg font-semibold">All Clear</span>
              </div>
            </div>
            <Button className="h-11 rounded-xl bg-white px-5 text-slate-900 hover:bg-white/90">
              <CreditCard className="h-4 w-4" />
              Pay Rent
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <Card
            key={item.label}
            className="gap-0 overflow-hidden border-border/70 bg-white py-0 shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
          >
            <CardContent className="p-5">
              <div className="mb-5 flex items-start justify-between gap-3">
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-3xl font-semibold tracking-tight text-foreground">
                  {item.value}
                </p>
                <p
                  className={`text-xs ${
                    item.label === 'Outstanding'
                      ? 'text-emerald-600'
                      : item.label === 'Complaints'
                        ? 'text-amber-600'
                        : 'text-muted-foreground'
                  }`}
                >
                  {item.detail}
                </p>
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
                  Actions
                </p>
                <CardTitle className="mt-2 text-lg">Quick Actions</CardTitle>
              </div>
              <Button variant="outline" size="sm" className="rounded-lg">
                View Lease
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3 px-6 py-6 sm:grid-cols-2">
            {quickActions.map((action) => (
              <button
                key={action.title}
                className="rounded-2xl border border-border/70 bg-muted/20 p-4 text-left transition-colors hover:bg-muted/35"
              >
                <div className="rounded-2xl bg-primary/10 p-3 text-primary w-fit">
                  <action.icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm font-semibold text-foreground">{action.title}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{action.text}</p>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-white py-0 shadow-sm">
          <CardHeader className="border-b border-border/60 px-6 py-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Schedule
              </p>
              <CardTitle className="mt-2 text-lg">Upcoming</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 px-6 py-6">
            {upcoming.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border/70 bg-muted/20 px-4 py-4"
              >
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  <item.icon className="h-4 w-4 text-primary" />
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-foreground">{item.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
