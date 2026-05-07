
import { useEffect, useRef } from "react";

interface Props {
  as?: keyof React.JSX.IntrinsicElements;
  children: React.ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
}

/**
 * Wrapper que aplica fade-up cuando el elemento entra en viewport.
 * Más simple que GSAP ScrollTrigger para reveals comunes.
 */
export default function Reveal({
  as = "div",
  children,
  delay = 0,
  className = "",
  threshold = 0.15,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      node.classList.add("is-visible");
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add("is-visible");
            obs.unobserve(node);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold]);

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
