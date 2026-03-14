import {
  ArrowUpRight,
  BedDouble,
  Building2,
  CreditCard,
  ReceiptText,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const stats = [
  { label: 'Properties', value: '4', delta: '+1 this month', icon: Building2 },
  { label: 'Occupied Beds', value: '126', delta: '84% occupancy', icon: BedDouble },
  { label: 'Monthly Collection', value: 'Rs 6.8L', delta: '+12.4%', icon: CreditCard },
  { label: 'Pending Dues', value: 'Rs 42K', delta: '9 tenants', icon: ReceiptText },
];

const revenueTrend = [
  { month: 'Jan', value: 44 },
  { month: 'Feb', value: 58 },
  { month: 'Mar', value: 52 },
  { month: 'Apr', value: 67 },
  { month: 'May', value: 71 },
  { month: 'Jun', value: 78 },
];

const occupancySplit = [
  { label: 'Occupied', value: 84, tone: 'bg-primary' },
  { label: 'Available', value: 16, tone: 'bg-amber-400' },
];

const recentPayments = [
  { tenant: 'Rohan Mehta', property: 'Sunrise Residency', amount: 'Rs 8,500', status: 'Paid' },
  { tenant: 'Aman Khan', property: 'City Nest PG', amount: 'Rs 7,200', status: 'Paid' },
  { tenant: 'Kiran Nair', property: 'Lake View Stay', amount: 'Rs 9,000', status: 'Pending' },
];

export default function OwnerDashboard() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[28px] border border-border/70 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4 px-6 py-6 lg:px-8 lg:py-7">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Owner Dashboard
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight lg:text-3xl">
                Business Overview
              </h1>
              <p className="max-w-xl text-sm leading-6 text-white/70">
                Track portfolio performance, occupancy health, and rent collection
                from one clean control center.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.22em] text-white/55">
                Portfolio Growth
              </p>
              <div className="mt-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-300" />
                <span className="text-lg font-semibold">+12.4%</span>
              </div>
            </div>
            <Button className="h-11 rounded-xl bg-white px-5 text-slate-900 hover:bg-white/90">
              <TrendingUp className="h-4 w-4" />
              Download Report
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
                <div className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
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
                  Analytics
                </p>
                <CardTitle className="mt-2 text-lg">Revenue Trend</CardTitle>
              </div>
              <div className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                Last 6 months
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6 py-6">
            <div className="grid h-64 grid-cols-6 items-end gap-3">
              {revenueTrend.map((point) => (
                <div key={point.month} className="flex h-full flex-col justify-end gap-3">
                  <div className="relative flex-1 rounded-2xl bg-muted/70 p-2">
                    <div
                      className="absolute inset-x-2 bottom-2 rounded-xl bg-gradient-to-t from-primary via-primary to-primary/65"
                      style={{ height: `${point.value}%` }}
                    />
                  </div>
                  <div className="space-y-1 text-center">
                    <p className="text-xs font-medium text-foreground">{point.month}</p>
                    <p className="text-[11px] text-muted-foreground">{point.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-white py-0 shadow-sm">
          <CardHeader className="border-b border-border/60 px-6 py-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Capacity
              </p>
              <CardTitle className="mt-2 text-lg">Occupancy Split</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 px-6 py-6">
            <div className="rounded-3xl bg-slate-950 p-5 text-white">
              <p className="text-xs uppercase tracking-[0.22em] text-white/55">
                Live Occupancy
              </p>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="text-3xl font-semibold">84%</p>
                  <p className="mt-1 text-sm text-white/65">126 occupied beds</p>
                </div>
                <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                  Stable
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {occupancySplit.map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{item.label}</span>
                    <span className="text-muted-foreground">{item.value}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-muted">
                    <div
                      className={`h-2.5 rounded-full ${item.tone}`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-border/70 bg-muted/30 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Total Tenants
              </p>
              <div className="mt-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <Users className="h-4 w-4 text-primary" />
                142 active tenants
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card className="border-border/70 bg-white py-0 shadow-sm">
        <CardHeader className="border-b border-border/60 px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Collections
              </p>
              <CardTitle className="mt-2 text-lg">Recent Payments</CardTitle>
            </div>
            <Button variant="outline" size="sm" className="rounded-lg">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 px-6 py-6">
          {recentPayments.map((payment) => (
            <div
              key={payment.tenant}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/70 bg-muted/20 px-4 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{payment.tenant}</p>
                  <p className="text-xs text-muted-foreground">{payment.property}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{payment.amount}</p>
                  <p className="text-xs text-muted-foreground">Latest rent payment</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    payment.status === 'Paid'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {payment.status}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
