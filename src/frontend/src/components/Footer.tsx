import { Heart } from "lucide-react";

const sectorLinks = [
  { label: "Electrical Contracting", href: "#sectors" },
  { label: "Railway Projects", href: "#sectors" },
  { label: "Civil Infrastructure", href: "#sectors" },
  { label: "Carify PDI", href: "#sectors" },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Our Sectors", href: "#sectors" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <footer className="bg-navy-deep border-t border-border">
      {/* Top gold line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img
              src="/assets/Vinx.jpg"
              alt="Vinx Power Solutions"
              className="h-12 w-auto object-contain mb-4"
            />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6">
              A multi-sector infrastructure and services company delivering
              excellence in electrical contracting, railway projects, civil
              infrastructure, and automotive pre-delivery inspections across
              India.
            </p>
            <p className="text-xs text-muted-foreground/70 italic">
              Powering Infrastructure. Delivering Excellence.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-700 text-sm text-foreground uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .querySelector(link.href)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sectors */}
          <div>
            <h4 className="font-display font-700 text-sm text-foreground uppercase tracking-widest mb-4">
              Our Sectors
            </h4>
            <ul className="space-y-2">
              {sectorLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .querySelector(link.href)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © {year} Vinx Power Solutions Pvt Ltd. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Built with{" "}
            <Heart className="w-3 h-3 text-gold fill-gold inline-block" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
