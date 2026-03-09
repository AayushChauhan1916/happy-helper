import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "PG Owner • Bangalore",
    initials: "RK",
    quote: "StayEase transformed how I manage my 3 PG properties. Rent collection is now automated and I never miss a due date.",
    color: "bg-violet-100 text-violet-700",
  },
  {
    name: "Priya Sharma",
    role: "PG Owner • Mumbai",
    initials: "PS",
    quote: "The analytics dashboard gives me instant visibility into occupancy rates. I've increased my revenue by 20% since switching.",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Amit Patel",
    role: "Property Manager • Pune",
    initials: "AP",
    quote: "Managing 150+ tenants used to be a nightmare. StayEase made it incredibly simple with their intuitive interface.",
    color: "bg-amber-100 text-amber-700",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-28 bg-muted/30">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            TESTIMONIALS
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by PG owners <span className="text-primary">everywhere</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative rounded-2xl border border-border/40 bg-card p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-muted/60" />
              <div className="mb-4 flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className={`text-xs font-bold ${t.color}`}>
                    {t.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
