import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { APP_NAME } from "@/constants/app";

const CTABanner = () => {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 px-8 py-20 text-center">
          {/* Decorative */}
          <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-primary-foreground/5 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-primary-foreground/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary-foreground/3 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-lg">
            <h2 className="mb-4 text-3xl font-bold text-primary-foreground sm:text-4xl">
              Ready to modernize your PG?
            </h2>
            <p className="mb-8 text-base text-primary-foreground/70">
              Join 500+ property owners who simplified their operations with {APP_NAME}.
            </p>
            <Button
              size="lg"
              className="h-12 gap-2 rounded-xl bg-primary-foreground px-8 text-base text-primary hover:bg-primary-foreground/90 shadow-xl"
              asChild
            >
              <Link to="/login">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
