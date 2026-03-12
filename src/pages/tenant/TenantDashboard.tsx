import { CalendarClock, CreditCard, Home, ReceiptText, Wrench } from 'lucide-react';

export default function TenantDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-muted-foreground">Tenant Dashboard</p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Welcome Back
        </h1>
      </div>

      <div className="grid gap-5 border-y border-border/70 py-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Current Rent</p>
          <p className="text-2xl font-semibold text-foreground">Rs 8,500</p>
          <p className="text-xs text-muted-foreground">Due on 5th every month</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Outstanding</p>
          <p className="text-2xl font-semibold text-foreground">Rs 0</p>
          <p className="text-xs text-emerald-600">All payments clear</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Room</p>
          <p className="text-2xl font-semibold text-foreground">B-203</p>
          <p className="text-xs text-muted-foreground">Sunrise Residency</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Complaints</p>
          <p className="text-2xl font-semibold text-foreground">1 Open</p>
          <p className="text-xs text-amber-600">Estimated resolution: today</p>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Quick Actions</h2>
          <div className="grid gap-0 border-y border-border/70 sm:grid-cols-2">
            {[
              { icon: CreditCard, title: 'Pay Rent', text: 'Pay monthly rent securely' },
              { icon: ReceiptText, title: 'Download Receipt', text: 'Access payment invoices' },
              { icon: Wrench, title: 'Raise Complaint', text: 'Report maintenance issues' },
              { icon: Home, title: 'Room Details', text: 'Check stay and amenities' },
            ].map((action) => (
              <button
                key={action.title}
                className="border-b border-border/60 p-3 text-left transition-colors hover:bg-muted/30 sm:border-r sm:[&:nth-child(2n)]:border-r-0"
              >
                <action.icon className="h-4 w-4 text-primary" />
                <p className="mt-2 text-sm font-medium text-foreground">{action.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{action.text}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-semibold text-foreground">Upcoming</h2>
          <div className="space-y-3 border-y border-border/70 py-3">
            <div className="p-1">
              <p className="text-xs text-muted-foreground">Next Rent Due</p>
              <p className="mt-1 flex items-center gap-2 text-sm font-medium text-foreground">
                <CalendarClock className="h-4 w-4 text-primary" />
                5 days left
              </p>
            </div>
            <div className="border-t border-border/60 p-1 pt-3">
              <p className="text-xs text-muted-foreground">Maintenance Visit</p>
              <p className="mt-1 text-sm font-medium text-foreground">Today, 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
