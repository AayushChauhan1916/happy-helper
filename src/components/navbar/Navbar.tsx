import { Building2, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMeQuery } from "@/redux/features/auth/auth.api";
import { hasAccessToken } from "@/lib/auth";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isLoggedIn = hasAccessToken();
  const { data } = useMeQuery(undefined, { skip: !isLoggedIn });
  const showDashboard = Boolean(data?.data?.role);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-sm" 
        : "bg-transparent"
    }`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 transition-transform duration-200 group-hover:scale-105">
            <Building2 className="h-4.5 w-4.5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight">StayEase</span>
        </Link>

        <div className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative rounded-lg px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground group"
            >
              {link.label}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-0 rounded-full bg-primary transition-all duration-200 group-hover:w-4" />
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2.5 md:flex">
          {showDashboard ? (
            <Button size="sm" className="gap-1.5 rounded-xl shadow-lg shadow-primary/20 px-5" asChild>
              <Link to="/dashboard">
                Dashboard <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="rounded-lg text-muted-foreground hover:text-foreground" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button size="sm" className="gap-1.5 rounded-xl shadow-lg shadow-primary/20 px-5" asChild>
                <Link to="/signup">
                  Get Started <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </>
          )}
        </div>

        <button
          className="md:hidden text-foreground p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/40 bg-background/95 backdrop-blur-xl px-6 py-5 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-xl px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-2 pt-4 mt-3 border-t border-border/40">
              {showDashboard ? (
                <Button size="sm" className="flex-1 rounded-xl shadow-lg shadow-primary/20" asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button variant="outline" size="sm" className="flex-1 rounded-xl" asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button size="sm" className="flex-1 rounded-xl shadow-lg shadow-primary/20" asChild>
                    <Link to="/signup">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
