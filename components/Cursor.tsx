"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";


export default function Cursor() {
  const [supported, setSupported] = useState(false);
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xs = useSpring(x, { stiffness: 600, damping: 50, mass: 0.5 });
  const ys = useSpring(y, { stiffness: 600, damping: 50, mass: 0.5 });
  const xRing = useSpring(x, { stiffness: 200, damping: 26, mass: 0.6 });
  const yRing = useSpring(y, { stiffness: 200, damping: 26, mass: 0.6 });

  const mountedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduce) {
      setSupported(false);
      document.body.style.cursor = "auto";
      return;
    }

    setSupported(true);
    mountedRef.current = true;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive =
        target.closest("a, button, [data-magnetic], input, textarea, [role='button']");
      setHover(!!interactive);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setHover(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  if (!supported) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          x: xs,
          y: ys,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: pressed ? 0.6 : hover ? 1.6 : 1,
            opacity: 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="h-[6px] w-[6px] rounded-full bg-lime"
          style={{
            boxShadow: "0 0 12px rgba(198,255,61,0.6)",
          }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{
          x: xRing,
          y: yRing,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: hover ? 1.8 : 1,
            borderColor: hover
              ? "rgba(198,255,61,0.9)"
              : "rgba(198,255,61,0.35)",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="rounded-full border"
          style={{
            width: 32,
            height: 32,
            mixBlendMode: "difference",
          }}
        />
      </motion.div>
    </>
  );
}
