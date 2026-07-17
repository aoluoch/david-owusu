import type { ReactNode } from "react";
import { useReveal } from "../../hooks/useReveal";
import { cn } from "../../lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  );
}
