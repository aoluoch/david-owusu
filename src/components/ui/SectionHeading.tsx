import { cn } from "../../lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  heading,
  subheading,
  align = "center",
  invert = false,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mb-10 md:mb-16",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "font-semibold text-sm uppercase tracking-widest mb-3",
            invert ? "text-gold" : "text-gold",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold",
          invert ? "text-white" : "text-navy",
        )}
      >
        {heading}
      </h2>
      {subheading && (
        <p
          className={cn(
            "mt-5 max-w-3xl leading-relaxed text-lg",
            align === "center" && "mx-auto",
            invert ? "text-blue-100" : "text-gray-600",
          )}
        >
          {subheading}
        </p>
      )}
    </Reveal>
  );
}
