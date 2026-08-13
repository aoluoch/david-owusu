import { cn } from "../../lib/utils";

type LoaderVariant = "fullscreen" | "page" | "inline";
type LoaderTone = "light" | "dark";

interface PageLoaderProps {
  variant?: LoaderVariant;
  tone?: LoaderTone;
  label?: string;
  className?: string;
  exiting?: boolean;
}

function LoaderMark({ size }: { size: "lg" | "sm" }) {
  const large = size === "lg";
  return (
    <div
      className={cn("page-loader-mark", large ? "h-28 w-28" : "h-14 w-14")}
      aria-hidden
    >
      <span className="page-loader-ring page-loader-ring-outer" />
      <span className="page-loader-ring page-loader-ring-inner" />
      <span
        className={cn(
          "page-loader-monogram font-heading font-bold tracking-[0.12em] text-gold",
          large ? "text-2xl" : "text-sm",
        )}
      >
        DO
      </span>
    </div>
  );
}

export function PageLoader({
  variant = "page",
  tone,
  label = "Loading",
  className,
  exiting = false,
}: PageLoaderProps) {
  const fullscreen = variant === "fullscreen";
  const inline = variant === "inline";
  const dark = tone === "dark" || fullscreen;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(
        "page-loader flex flex-col items-center justify-center",
        fullscreen && "fixed inset-0 z-[100] hero-gradient",
        variant === "page" && "min-h-[50vh] py-24",
        inline && "py-14",
        exiting && "page-loader-exit",
        className,
      )}
    >
      <LoaderMark size={inline ? "sm" : "lg"} />

      {!inline && (
        <>
          <p
            className={cn(
              "mt-8 font-heading text-2xl font-semibold tracking-wide",
              dark ? "text-white" : "text-navy",
            )}
          >
            David Owusu
          </p>
          <span
            className={cn("mt-3 h-px w-16", dark ? "bg-gold/80" : "bg-gold")}
          />
        </>
      )}

      <p
        className={cn(
          "mt-4 text-xs font-medium uppercase tracking-[0.28em]",
          dark ? "text-white/70" : "text-slate-500",
        )}
      >
        {label}
      </p>

      <span
        className={cn(
          "page-loader-bar mt-6 overflow-hidden rounded-full",
          inline ? "h-0.5 w-24" : "h-0.5 w-40",
          dark ? "bg-white/15" : "bg-navy/10",
        )}
      >
        <span className="page-loader-bar-fill block h-full w-1/2 rounded-full bg-gold" />
      </span>
    </div>
  );
}
