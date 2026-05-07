"use client";

/**
 * HeroExpand — Hero premium para Node Level
 *
 * Combina:
 * 1. LiquidMetal shader (@paper-design/shaders-react) — fondo cromado/metálico
 * 2. ScrollExpand: zapatilla empieza pequeña y crece con el scroll
 * 3. Branding Node Level: Bebas Neue, lime green, techy/HUD
 *
 * Flujo:
 *  scrollProgress 0.0 → Zapatilla pequeña centrada, metal visible, texto partido
 *  scrollProgress 0.5 → Video expandiéndose, "FILTRAMOS" ← → "HYPE." separándose
 *  scrollProgress 1.0 → Full screen, dark overlay, scroll normal habilitado
 */

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

// Dynamic import — avoids SSR with WebGL canvas
const LiquidMetal = dynamic(
  () => import("@paper-design/shaders-react").then((m) => ({ default: m.LiquidMetal })),
  { ssr: false },
);

type LenisInstance = { stop: () => void; start: () => void };
const getLenis = () =>
  (window as unknown as Record<string, LenisInstance>).__lenisInstance;

export default function HeroExpand() {
  // ── React state (solo para re-render visual) ────────────────────────────
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  // ── Refs: usados dentro de event listeners (sin deps re-render) ──────────
  const progressRef = useRef(0);
  const expandedRef = useRef(false);
  const touchStartRef = useRef(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // ── Mobile detection ────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── IntersectionObserver para apagar LiquidMetal fuera del viewport ─────
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setHeroVisible(e.isIntersecting),
      { threshold: 0 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // ── Scroll handlers — único useEffect, refs para evitar re-attachment ───
  useEffect(() => {
    // Pausar Lenis al montar (el hero toma control del scroll)
    getLenis()?.stop();

    // Helper interno — no necesita recrearse
    const expand = (delta: number) => {
      const newP = Math.min(Math.max(progressRef.current + delta, 0), 1);
      progressRef.current = newP;
      setScrollProgress(newP);

      if (newP >= 1 && !expandedRef.current) {
        expandedRef.current = true;
        setMediaFullyExpanded(true);
        getLenis()?.start();
        setTimeout(() => setShowCta(true), 420);
      } else if (newP < 0.75) {
        setShowCta(false);
      }
    };

    const collapse = () => {
      expandedRef.current = false;
      setMediaFullyExpanded(false);
      setShowCta(false);
      getLenis()?.stop();
    };

    // Wheel
    const onWheel = (e: WheelEvent) => {
      if (expandedRef.current) {
        if (e.deltaY < 0 && window.scrollY <= 5) {
          e.preventDefault();
          collapse();
        }
        return;
      }
      e.preventDefault();
      expand(e.deltaY * 0.001);
    };

    // Touch
    const onTouchStart = (e: TouchEvent) => {
      touchStartRef.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const start = touchStartRef.current;
      if (!start) return;
      const delta = start - e.touches[0].clientY;

      if (expandedRef.current) {
        if (delta < -30 && window.scrollY <= 5) {
          e.preventDefault();
          collapse();
        }
        return;
      }
      e.preventDefault();
      expand(delta * (delta < 0 ? 0.009 : 0.006));
      touchStartRef.current = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      touchStartRef.current = 0;
    };

    // Prevenir que el browser scrollee mientras expandimos
    let scrollLock = false;
    const onScroll = () => {
      if (!expandedRef.current && !scrollLock) {
        scrollLock = true;
        window.scrollTo(0, 0);
        requestAnimationFrame(() => {
          scrollLock = false;
        });
      }
    };

    window.addEventListener("wheel", onWheel as EventListener, { passive: false });
    window.addEventListener("touchstart", onTouchStart as EventListener, { passive: false });
    window.addEventListener("touchmove", onTouchMove as EventListener, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("wheel", onWheel as EventListener);
      window.removeEventListener("touchstart", onTouchStart as EventListener);
      window.removeEventListener("touchmove", onTouchMove as EventListener);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("scroll", onScroll);
      getLenis()?.start(); // restaurar al desmontar
    };
  }, []); // deps [] — los refs manejan los valores sin re-montar listeners

  // ── Dimensiones del video — portrait 9:16 ───────────────────────────────
  const baseW = isMobile ? 240 : 340;
  const baseH = isMobile ? 426 : 604;  // 9:16 ratio
  const maxW  = isMobile ? 480 : 1100; // expand to ~full viewport width
  const maxH  = isMobile ? 274 : 296;  // expand height to reach ~900px viewport

  const mediaW = baseW + scrollProgress * maxW;
  const mediaH = baseH + scrollProgress * maxH;
  const textPush = scrollProgress * (isMobile ? 52 : 42); // vw

  // Opacidades
  const metalOpacity = Math.max(0, (1 - scrollProgress * 1.7) * 0.72);
  const darkBg = 0.3 + scrollProgress * 0.66;
  const videoRadius = (1 - scrollProgress) * 14;

  // Memoized so LiquidMetal (memo'd internally) never sees new object references on re-render
  const metalStyle = useMemo<React.CSSProperties>(
    () => ({ width: "100%", height: "100%", display: "block" }),
    [],
  );
  // Dark steel chrome — almost fully blurred glow, never dominates
  const metalParams = useMemo(
    () => ({
      colorBack: "#060608" as const,   // near-black base
      colorTint: "#484850" as const,   // very muted steel
      speed: 0.35,
      frame: 0,
      scale: 1.2,
      softness: 0.88,                  // nearly fully soft = atmospheric glow only
      repetition: 0.75,               // single large shape fills screen gently
      shiftRed: 0.01,                  // almost no RGB fringe
      shiftBlue: 0.01,
      distortion: 0.04,
      contour: 0.1,
      shape: "none" as const,
      angle: 80,
      worldWidth: 0,
      worldHeight: 0,
    }),
    [],
  );

  return (
    <div ref={sectionRef} className="overflow-x-hidden" id="hero">
      <section aria-label="Hero — Node Level" className="relative flex min-h-[100dvh] flex-col">
        <div className="relative flex min-h-[100dvh] w-full flex-col">

          {/* ── LiquidMetal WebGL background — memoized props prevent re-render loop ── */}
          {heroVisible && metalOpacity > 0.01 && (
            <div
              className="pointer-events-none absolute inset-0 z-0"
              style={{ opacity: metalOpacity }}
            >
              <LiquidMetal {...metalParams} style={metalStyle} />
            </div>
          )}

          {/* Dark overlay — crece con el scroll */}
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{ background: `rgba(5,5,5,${darkBg})` }}
          />

          {/* Scanlines */}
          <div
            className="pointer-events-none absolute inset-0 z-[2] opacity-[0.11]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.6) 2px, rgba(0,0,0,0.6) 3px)",
            }}
          />

          {/* Grid lima — aparece al expandir */}
          <div
            className="pointer-events-none absolute inset-0 z-[2] hidden md:block"
            style={{
              opacity: scrollProgress * 0.05,
              backgroundImage:
                "linear-gradient(rgba(198,255,61,1) 1px, transparent 1px), linear-gradient(90deg, rgba(198,255,61,1) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          {/* ── HUD top — pushed below nav on mobile (nav ~56px tall) ─── */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex justify-between px-6 pt-16 font-mono text-[10px] tracking-[0.2em] md:px-12 md:pt-8">
            <div className="hidden items-center gap-3 text-white/70 md:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
              <span>NODE / SYSTEM ONLINE</span>
            </div>
            <div className="hidden items-center gap-6 text-white/45 md:flex">
              <span>−34.6° / −58.4°</span>
              <span>ARG · LATAM</span>
            </div>
          </div>

          {/* ── Contenedor centrado h-screen ─────────────────────────────── */}
          <div className="relative z-10 flex h-[100dvh] w-full flex-col items-center justify-center">

            {/* ── VIDEO expandible ─────────────────────────────────────────── */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: `${mediaW}px`,
                height: `${mediaH}px`,
                maxWidth: "98vw",
                maxHeight: "94vh",
              }}
            >
              {/* Corner brackets tech */}
              <div
                className="pointer-events-none absolute inset-0 z-10"
                style={{ opacity: Math.max(0, 1 - scrollProgress * 2.8) }}
              >
                <span className="absolute -left-px -top-px h-7 w-7 border-l border-t border-lime/55" />
                <span className="absolute -right-px -top-px h-7 w-7 border-r border-t border-lime/55" />
                <span className="absolute -bottom-px -left-px h-7 w-7 border-b border-l border-lime/55" />
                <span className="absolute -bottom-px -right-px h-7 w-7 border-b border-r border-lime/55" />
                <div className="absolute inset-0 border border-lime/12" style={{ borderRadius: `${videoRadius}px` }} />
              </div>

              {/* HUD micro-labels */}
              <span
                aria-hidden
                className="pointer-events-none absolute z-10 font-mono text-[8px] tracking-[0.22em] text-lime/38"
                style={{ top: "-20px", left: "2px", opacity: Math.max(0, 1 - scrollProgress * 3.5) }}
              >
                PRODUCT / SHOWCASE
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute z-10 font-mono text-[8px] tracking-[0.22em] text-lime/38"
                style={{ bottom: "-20px", right: "2px", opacity: Math.max(0, 1 - scrollProgress * 3.5) }}
              >
                VERIFIED ✓
              </span>

              {/* El video */}
              <video
                src="/hero-video.mp4"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ borderRadius: `${videoRadius}px` }}
                muted
                playsInline
                autoPlay
                loop
                preload="auto"
              />

              {/* Overlay oscuro sobre el video — se disipa al expandir */}
              <div
                className="absolute inset-0 bg-black/20"
                style={{
                  borderRadius: `${videoRadius}px`,
                  opacity: Math.max(0, 0.2 - scrollProgress * 0.22),
                }}
              />

              {/* Watermark cover — tapa el logo "Veo" en la esquina inferior derecha */}
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 right-0 bg-black"
                style={{ width: "72px", height: "28px", borderRadius: `0 0 ${videoRadius}px 0` }}
              />
            </div>

            {/* ── TEXTO se parte hacia los costados ──────────────────────── */}
            <div
              className="relative z-20 flex w-full select-none items-center justify-center gap-5 px-6"
              style={{ mixBlendMode: "difference" }}
            >
              <div
                className="font-display leading-none text-white"
                style={{
                  fontSize: "clamp(40px, 8vw, 136px)",
                  letterSpacing: "-0.02em",
                  transform: `translateX(-${textPush}vw)`,
                  whiteSpace: "nowrap",
                }}
              >
                FILTRAMOS
              </div>
              <div
                className="font-display leading-none"
                style={{
                  fontSize: "clamp(40px, 8vw, 136px)",
                  letterSpacing: "-0.02em",
                  color: "var(--color-lime)",
                  transform: `translateX(${textPush}vw)`,
                  whiteSpace: "nowrap",
                }}
              >
                HYPE.
              </div>
            </div>

            {/* Subtítulo */}
            <div
              className="relative z-20 mt-5 font-mono text-[10px] tracking-[0.3em] text-lime/65"
              style={{ opacity: Math.max(0, 1 - scrollProgress * 3.5) }}
            >
              ▸ PLATAFORMA DE CULTURA URBANA — ARG / LATAM
            </div>

            {/* ── Scroll indicator ──────────────────────────────────────── */}
            <div
              className="absolute bottom-8 z-20 flex flex-col items-center gap-2 font-mono text-[9px] tracking-[0.3em] text-white/38"
              style={{ opacity: Math.max(0, 1 - scrollProgress * 6) }}
            >
              <span>▸ SCROLL TO EXPAND</span>
              <span
                className="block h-8 w-px bg-gradient-to-b from-white/25 to-transparent"
                style={{ animation: "scrollLine 2s ease infinite" }}
              />
            </div>

            {/* ── Progress bar ───────────────────────────────────────────── */}
            <div className="absolute inset-x-0 bottom-0 z-30 h-px bg-border">
              <div
                className="h-px origin-left bg-lime"
                style={{ transform: `scaleX(${scrollProgress})`, transformOrigin: "left center" }}
              />
            </div>
          </div>

          {/* ── CTA section (visible cuando está completamente expandido) ── */}
          <AnimatePresence>
            {showCta && (
              <motion.div
                key="hero-cta"
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
                className="relative z-30 w-full border-t border-border"
              >
                <div className="flex flex-col items-center px-6 py-20 text-center md:px-12 md:py-28">
                  <div className="w-full max-w-[960px]">

                    <div className="inline-flex items-center gap-3 border border-border2 bg-surface/80 px-4 py-2 font-mono text-[10px] tracking-[0.3em] text-lime backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
                      EARLY ACCESS · 100 FOUNDERS SPOTS
                    </div>

                    <p className="mx-auto mt-10 max-w-lg text-[17px] leading-[1.7] text-muted">
                      Plataforma de cultura urbana verificada para Argentina y Latinoamérica.
                      <span className="text-text"> Anotate y recibí prioridad de acceso cuando abramos el market.</span>
                    </p>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                      <a
                        href="#waitlist"
                        className="inline-flex cursor-pointer items-center gap-2 bg-lime px-7 py-4 font-mono text-[12px] font-bold tracking-[0.18em] transition-opacity hover:opacity-90"
                        style={{ color: "#000" }}
                      >
                        ENTRAR AL BETA <span aria-hidden>→</span>
                      </a>
                      <a
                        href="#solucion"
                        className="inline-flex cursor-pointer items-center gap-2 border border-border2 px-7 py-4 font-mono text-[12px] tracking-[0.18em] text-muted transition-colors hover:border-lime hover:text-text"
                      >
                        VER CÓMO FUNCIONA <span aria-hidden>↓</span>
                      </a>
                    </div>

                    <div className="mt-14 grid grid-cols-2 gap-6 border-t border-border pt-8 md:grid-cols-4 md:gap-10">
                      {[
                        { num: "3", label: "PILARES" },
                        { num: "5", label: "PASOS" },
                        { num: "4", label: "TIERS" },
                        { num: "100%", label: "VERIFIED" },
                      ].map((s) => (
                        <div key={s.label} className="flex flex-col items-center">
                          <div className="font-display text-[44px] leading-none text-lime">{s.num}</div>
                          <div className="mt-2 font-mono text-[9px] tracking-[0.2em] text-dim">{s.label}</div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
