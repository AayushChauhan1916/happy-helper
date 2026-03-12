import { AlertTriangle, Building2, ShieldCheck, UserCheck, Users } from 'lucide-react';

const kpis = [
  { label: 'Total Users', value: '2,584', icon: Users },
  { label: 'Active Owners', value: '612', icon: UserCheck },
  { label: 'Listed Properties', value: '918', icon: Building2 },
  { label: 'Compliance Score', value: '97.2%', icon: ShieldCheck },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-muted-foreground">Super Admin</p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Platform Control Center
        </h1>
      </div>

      <div className="grid gap-5 border-y border-border/70 py-6 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-start justify-between">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <item.icon className="h-4 w-4 text-primary/80" />
            </div>
            <p className="text-2xl font-semibold text-foreground">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Verification Queue</h2>
          <div className="space-y-0 border-y border-border/70">
            {[
              '12 owner profiles pending KYC review',
              '7 property documents awaiting approval',
              '3 flagged accounts require action',
            ].map((row) => (
              <div key={row} className="border-b border-border/60 py-3 text-sm text-foreground last:border-b-0">
                {row}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold text-foreground">System Alerts</h2>
          <div className="space-y-3">
            <div className="border-l-2 border-amber-300 bg-amber-50/50 p-3 text-amber-800">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
                <AlertTriangle className="h-4 w-4" />
                Monitoring
              </p>
              <p className="mt-1 text-sm">API latency is slightly elevated in Mumbai region.</p>
            </div>
            <div className="border-l-2 border-emerald-300 bg-emerald-50/50 p-3 text-emerald-800">
              <p className="text-xs font-semibold uppercase tracking-wide">Status</p>
              <p className="mt-1 text-sm">All critical services are operational.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
