import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

type Variant = "primary" | "gold" | "outline" | "outlineDark";
type Size = "md" | "lg";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

interface LinkButtonProps extends CommonProps {
  to: string;
}

interface AnchorButtonProps extends CommonProps {
  href: string;
  target?: string;
  rel?: string;
}

interface ActionButtonProps extends CommonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-royal text-white hover:bg-navy shadow-lg shadow-royal/20 hover:shadow-navy/30",
  gold: "bg-gold text-navy hover:brightness-110 shadow-lg shadow-gold/25",
  outline:
    "border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur",
  outlineDark:
    "border-2 border-gold text-gold hover:bg-gold hover:text-white",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-4 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2";

function classes(variant: Variant, size: Size, className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export function ButtonLink({
  to,
  variant = "primary",
  size = "lg",
  className,
  children,
}: LinkButtonProps) {
  return (
    <Link to={to} className={classes(variant, size, className)}>
      {children}
    </Link>
  );
}

export function ButtonAnchor({
  href,
  variant = "primary",
  size = "lg",
  className,
  children,
  ...rest
}: AnchorButtonProps) {
  return (
    <a href={href} className={classes(variant, size, className)} {...rest}>
      {children}
    </a>
  );
}

export function Button({
  variant = "primary",
  size = "lg",
  className,
  children,
  ...rest
}: ActionButtonProps) {
  return (
    <button className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
