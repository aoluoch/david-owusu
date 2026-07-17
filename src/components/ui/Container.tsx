import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizes: Record<NonNullable<ContainerProps["size"]>, string> = {
  sm: "max-w-4xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
};

export function Container({
  children,
  size = "lg",
  className,
  ...rest
}: ContainerProps) {
  return (
    <div className={cn(sizes[size], "mx-auto px-6", className)} {...rest}>
      {children}
    </div>
  );
}
