import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useContent } from "../../lib/ContentContext";
import { cn } from "../../lib/utils";
import { SmartButtonLink } from "../ui/Button";

export function Navbar() {
  const { brand, nav, ctaButtons } = useContent();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "glass border-b border-gray-100 shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span
            className={cn(
              "font-heading text-xl font-bold transition-colors",
              scrolled ? "text-navy" : "text-white",
            )}
          >
            {brand.name}
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium transition-colors",
                  scrolled
                    ? isActive
                      ? "text-royal"
                      : "text-slate-700 hover:text-royal"
                    : isActive
                      ? "text-gold"
                      : "text-white/90 hover:text-gold",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <SmartButtonLink to={ctaButtons.primary.to} variant="gold" size="md">
            {ctaButtons.primary.label}
          </SmartButtonLink>
          <SmartButtonLink
            to={ctaButtons.secondary.to}
            variant={scrolled ? "outlineDark" : "outline"}
            size="md"
          >
            {ctaButtons.secondary.label}
          </SmartButtonLink>
        </div>

        <button
          className={cn(
            "lg:hidden p-2 rounded-lg transition",
            scrolled
              ? "text-navy hover:bg-black/5"
              : "text-white hover:bg-white/10",
          )}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden transition-[max-height] duration-300 glass border-t border-gray-100",
          open ? "max-h-[500px]" : "max-h-0",
        )}
      >
        <div className="px-6 py-6 space-y-3 flex flex-col">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "block text-base font-medium py-1 transition-colors",
                  isActive
                    ? "text-royal"
                    : "text-slate-700 hover:text-royal",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="pt-3 flex flex-col gap-3">
            <SmartButtonLink to={ctaButtons.primary.to} variant="primary" size="md">
              {ctaButtons.primary.label}
            </SmartButtonLink>
            <SmartButtonLink
              to={ctaButtons.secondary.to}
              variant="outlineDark"
              size="md"
            >
              {ctaButtons.secondary.label}
            </SmartButtonLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
