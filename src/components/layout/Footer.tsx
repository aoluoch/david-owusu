import type { SVGProps } from "react";
import { Link } from "react-router-dom";
import { useContent } from "../../lib/ContentContext";
import { Container } from "../ui/Container";

type IconComponent = (props: SVGProps<SVGSVGElement>) => React.JSX.Element;

const LinkedIn: IconComponent = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const X: IconComponent = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M18.244 2H21.5l-7.5 8.567L23 22h-6.789l-5.317-6.94L4.8 22H1.54l8.02-9.16L1 2h6.94l4.807 6.35L18.244 2zm-1.19 18h1.87L7.02 4H5.05l12.005 16z" />
  </svg>
);

const Instagram: IconComponent = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.81.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.81-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.81-.25-2.23-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.17-.42-.37-1.06-.42-2.23C2.16 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.81.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42C8.42 2.17 8.8 2.16 12 2.16zm0-2.16C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.39A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.32.8.75 1.48 1.39 2.13a5.9 5.9 0 0 0 2.13 1.39c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.39 5.9 5.9 0 0 0 1.39-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.39-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
  </svg>
);

const Facebook: IconComponent = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.408.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.464.099 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.592 1.323-1.324V1.325C24 .593 23.407 0 22.675 0z" />
  </svg>
);

const YouTube: IconComponent = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M23.498 6.186a3.02 3.02 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.02 3.02 0 0 0 .5 6.186C0 8.07 0 12 0 12s0 3.93.5 5.814a3.02 3.02 0 0 0 2.123 2.136c1.872.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.02 3.02 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const socialLinks: { icon: IconComponent; href: string; label: string }[] = [
  { icon: LinkedIn, href: "#", label: "LinkedIn" },
  { icon: X, href: "#", label: "X (Twitter)" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: YouTube, href: "#", label: "YouTube" },
];

export function Footer() {
  const { footer } = useContent();

  return (
    <footer className="bg-navy text-white pt-20 pb-10">
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div>
            <p className="font-heading text-2xl font-bold text-white mb-4">
              {footer.brand}
            </p>
            <p className="text-blue-200 text-sm leading-relaxed mb-6">
              {footer.tagline}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: SocialIcon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-blue-200 hover:text-navy hover:bg-gold hover:border-gold transition"
                >
                  <SocialIcon width={16} height={16} />
                </a>
              ))}
            </div>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <p className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-blue-200 text-sm hover:text-gold transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contact
            </p>
            <address className="not-italic text-blue-200 text-sm leading-relaxed space-y-1">
              <p>{footer.contact.email}</p>
              <p>{footer.contact.phone}</p>
              <p>{footer.contact.address}</p>
            </address>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-blue-300 text-sm">{footer.copyright}</p>
          <div className="flex items-center gap-6 text-sm text-blue-300">
            <a href="#" className="hover:text-gold transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gold transition">
              Terms
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
