import { useEffect, useRef, useState } from "react";

/**
 * Toggle a boolean when the observed element enters the viewport.
 * Handy for fade-in / slide-up animations on scroll.
 */
export function useReveal<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.15 },
): { ref: React.RefObject<T | null>; visible: boolean } {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return { ref, visible };
}
