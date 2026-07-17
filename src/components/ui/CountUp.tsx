import { useCountUp } from "../../hooks/useCountUp";
import { cn } from "../../lib/utils";

interface CountUpProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({
  target,
  suffix = "+",
  duration,
  className,
}: CountUpProps) {
  const { value, ref } = useCountUp(target, { duration });
  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={cn("tabular-nums", className)}
    >
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
