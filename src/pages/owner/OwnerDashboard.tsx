import {
  BedDouble,
  Building2,
  CreditCard,
  ReceiptText,
  TrendingUp,
  Users,
} from 'lucide-react';

const stats = [
  { label: 'Properties', value: '4', delta: '+1 this month', icon: Building2 },
  { label: 'Occupied Beds', value: '126', delta: '84% occupancy', icon: BedDouble },
  { label: 'Monthly Collection', value: '₹6.8L', delta: '+12.4%', icon: CreditCard },
  { label: 'Pending Dues', value: '₹42K', delta: '9 tenants', icon: ReceiptText },
];

const recentPayments = [
  { tenant: 'Rohan Mehta', property: 'Sunrise Residency', amount: '₹8,500', status: 'Paid' },
  { tenant: 'Aman Khan', property: 'City Nest PG', amount: '₹7,200', status: 'Paid' },
  { tenant: 'Kiran Nair', property: 'Lake View Stay', amount: '₹9,000', status: 'Pending' },
];

export default function OwnerDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Owner Dashboard</p>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Business Overview
          </h1>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm">
          <TrendingUp className="h-4 w-4" />
          Download Report
        </button>
      </div>

      <div className="grid gap-5 border-y border-border/70 py-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-start justify-between">
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <item.icon className="h-4 w-4 text-primary/80" />
            </div>
            <p className="text-2xl font-semibold text-foreground">{item.value}</p>
            <p className="text-xs text-emerald-600">{item.delta}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Revenue Trend</h2>
            <span className="text-xs text-muted-foreground">Last 6 months</span>
          </div>
          <div className="flex h-44 items-end gap-3 border-b border-border/70 pb-4">
            {[44, 58, 52, 67, 71, 78].map((height, idx) => (
              <div key={idx} className="flex-1 rounded-md bg-primary/85" style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Occupancy Split</h2>
          <div className="mt-4 space-y-3">
            <div>
              <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                <span>Occupied</span>
                <span>84%</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-2 w-[84%] rounded-full bg-primary" />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                <span>Available</span>
                <span>16%</span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div className="h-2 w-[16%] rounded-full bg-amber-400" />
              </div>
            </div>
            <div className="border-t border-border/70 pt-3">
              <p className="text-xs text-muted-foreground">Total Tenants</p>
              <p className="mt-1 flex items-center gap-2 text-sm font-medium text-foreground">
                <Users className="h-4 w-4 text-primary" />
                142 active tenants
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border/70 pt-6">
        <h2 className="mb-4 text-sm font-semibold text-foreground">Recent Payments</h2>
        <div className="space-y-0">
          {recentPayments.map((payment) => (
            <div key={payment.tenant} className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">{payment.tenant}</p>
                <p className="text-xs text-muted-foreground">{payment.property}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-foreground">{payment.amount}</p>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
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
        </div>
      </div>
    </div>
  );
}
