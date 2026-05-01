"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrubFrames } from "@/lib/useScrubFrames";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hero pinneado con scroll-scrub sobre el video.
 *
 * Estrategia:
 *  1. Si hay /frames/manifest.json → renderiza canvas con la secuencia (Apple-style, 60fps)
 *  2. Si NO hay frames → fallback automático a <video> + currentTime scrub
 *  3. prefers-reduced-motion → poster estático con texto fijo
 *
 * Capas de texto en timeline:
 *  0–18%   FILTRAMOS HYPE.
 *  18–40%  VALIDAMOS TODO.
 *  40–62%  NODE IS NOT A STORE.
 *  62–82%  VERIFIED BY NODE ✓
 *  82–100% CTA + stats (final)
 */
export default function HeroScrub() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const layer1 = useRef<HTMLDivElement>(null);
  const layer2 = useRef<HTMLDivElement>(null);
  const layer3 = useRef<HTMLDivElement>(null);
  const layer4 = useRef<HTMLDivElement>(null);
  const layer5 = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const frameCounterRef = useRef<HTMLSpanElement>(null);

  const { state, images } = useScrubFrames();

  // Resize canvas at correct DPR
  useEffect(() => {
    if (state.mode !== "frames") return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.mode]);

  const currentFrameRef = useRef(0);

  function drawFrame(idx: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const total = state.total;
    if (!total) return;

    const safeIdx = Math.max(0, Math.min(total - 1, Math.round(idx)));
    const img = images.current[safeIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, cw, ch);

    // Cover fit
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;
    let dw = cw;
    let dh = ch;
    let dx = 0;
    let dy = 0;
    if (ir > cr) {
      dh = ch;
      dw = ch * ir;
      dx = (cw - dw) / 2;
    } else {
      dw = cw;
      dh = cw / ir;
      dy = (ch - dh) / 2;
    }
    ctx.drawImage(img, dx, dy, dw, dh);

    currentFrameRef.current = safeIdx;

    if (frameCounterRef.current) {
      frameCounterRef.current.textContent = `${String(safeIdx + 1).padStart(3, "0")} / ${String(total).padStart(3, "0")}`;
    }
  }

  // Setup ScrollTrigger timeline (only desktop modes — frames or video)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (state.mode === "loading") return;
    if (state.mode === "mobile" || state.mode === "reduced") return;
    if (!state.ready) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial visibility
      gsap.set([layer1.current, layer2.current, layer3.current, layer4.current, layer5.current], { opacity: 0 });
      gsap.set(layer1.current, { opacity: 1, y: 0 });

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=350%",
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate(self) {
          const p = self.progress;

          // Progress bar
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${p})`;
          }

          // Render del video según el modo
          if (state.mode === "frames" && state.total > 0) {
            const idx = p * (state.total - 1);
            drawFrame(idx);
          } else if (state.mode === "video" && videoRef.current) {
            const v = videoRef.current;
            if (!Number.isNaN(v.duration) && v.duration > 0) {
              v.currentTime = Math.min(v.duration - 0.01, p * v.duration);
            }
          }
        },
      });

      // Timeline de capas tipográficas
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=350%",
          scrub: 0.6,
        },
      });

      // 0–18: Layer 1 visible, sale al 18%
      tl.to(layer1.current, { opacity: 1, duration: 0.001 }, 0)
        .to(layer1.current, { opacity: 0, y: -40, duration: 0.18, ease: "power2.in" }, 0.18);

      // 18–40: Layer 2
      tl.fromTo(
        layer2.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" },
        0.2,
      ).to(layer2.current, { opacity: 0, y: -40, duration: 0.18, ease: "power2.in" }, 0.4);

      // 40–62: Layer 3
      tl.fromTo(
        layer3.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" },
        0.42,
      ).to(layer3.current, { opacity: 0, y: -40, duration: 0.18, ease: "power2.in" }, 0.62);

      // 62–82: Layer 4 (verified)
      tl.fromTo(
        layer4.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.16, ease: "power3.out" },
        0.64,
      ).to(layer4.current, { opacity: 0, duration: 0.12, ease: "power2.in" }, 0.82);

      // 82–100: Layer 5 CTA
      tl.fromTo(
        layer5.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.18, ease: "power3.out" },
        0.84,
      );

      return () => trigger.kill();
    }, sectionRef);

    // Refresh ScrollTrigger after layout settled
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      window.clearTimeout(id);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.mode, state.ready, state.total]);

  // Wait for video metadata before scrubbing
  useEffect(() => {
    if (state.mode !== "video") return;
    const v = videoRef.current;
    if (!v) return;
    const onMeta = () => {
      v.pause();
      v.currentTime = 0;
      ScrollTrigger.refresh();
    };
    v.addEventListener("loadedmetadata", onMeta);
    return () => v.removeEventListener("loadedmetadata", onMeta);
  }, [state.mode]);

  // Draw initial frame as soon as a few frames are loaded
  useEffect(() => {
    if (state.mode === "frames" && state.loaded > 0) {
      drawFrame(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.mode, state.loaded]);

  // ─── MOBILE / REDUCED LAYOUT ─────────────────────────────────────────
  if (state.mode === "mobile" || state.mode === "reduced") {
    return <HeroMobile reduced={state.mode === "reduced"} />;
  }

  // ─── DESKTOP SCRUB LAYOUT ────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-black"
      aria-label="Hero"
    >
      <div className="relative h-full w-full">
        {/* MEDIA LAYER */}
        <div className="absolute inset-0 z-0">
          {state.mode === "frames" || state.mode === "loading" ? (
            <canvas
              ref={canvasRef}
              className="h-full w-full"
              style={{ display: "block" }}
            />
          ) : null}

          {state.mode === "video" ? (
            <video
              ref={videoRef}
              src="/hero-video.mp4"
              className="h-full w-full object-cover"
              muted
              playsInline
              preload="auto"
            />
          ) : null}
        </div>

        {/* Overlays — gradiente, scanlines, grid */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.15) 30%, rgba(5,5,5,0.15) 70%, rgba(5,5,5,0.95) 100%), linear-gradient(to right, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0) 50%, rgba(5,5,5,0.4) 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 3px)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(198,255,61,1) 1px, transparent 1px), linear-gradient(90deg, rgba(198,255,61,1) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* HUD top — meta + frame counter */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-between px-6 pt-24 font-mono text-[10px] tracking-[0.2em] text-[color:var(--color-muted)] md:px-12">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--color-lime)]" />
            <span>NODE / SYSTEM ONLINE</span>
          </div>
          <div className="hidden items-center gap-6 md:flex">
            <span>−34.6° / −58.4°</span>
            <span ref={frameCounterRef}>000 / 000</span>
            <span>ARG · LATAM</span>
          </div>
        </div>

        {/* CONTENT LAYERS */}
        <div className="relative z-20 flex h-full w-full items-center justify-center px-6 md:px-12">
          {/* Layer 1 — FILTRAMOS HYPE */}
          <div
            ref={layer1}
            className="absolute inset-0 flex flex-col items-start justify-center px-6 md:px-12"
          >
            <div className="mb-6 font-mono text-[11px] tracking-[0.3em] text-[color:var(--color-lime)]">
              ▸ PLATAFORMA DE CULTURA URBANA — ARG / LATAM
            </div>
            <h1
              className="font-display text-[clamp(64px,14vw,200px)] leading-[0.86]"
              style={{ letterSpacing: "-0.02em" }}
            >
              FILTRAMOS
              <br />
              <span className="text-[color:var(--color-lime)]">HYPE.</span>
            </h1>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-[color:var(--color-muted)]">
              Verificación + Mercado. Un sistema donde la cultura urbana se ordena, se valida y sube de nivel.
            </p>
          </div>

          {/* Layer 2 — VALIDAMOS TODO */}
          <div
            ref={layer2}
            className="absolute inset-0 flex flex-col items-end justify-center px-6 text-right md:px-12"
          >
            <div className="mb-6 font-mono text-[11px] tracking-[0.3em] text-[color:var(--color-lime)]">
              ▸ NODE / 002
            </div>
            <h2
              className="font-display text-[clamp(64px,14vw,200px)] leading-[0.86]"
              style={{ letterSpacing: "-0.02em" }}
            >
              <span className="text-outline">VALIDAMOS</span>
              <br />
              TODO.
            </h2>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-[color:var(--color-muted)]">
              Cada producto pasa por un proceso físico y digital antes de tocar el market.
            </p>
          </div>

          {/* Layer 3 — NODE IS NOT A STORE */}
          <div
            ref={layer3}
            className="absolute inset-0 flex items-center justify-center px-6 text-center md:px-12"
          >
            <div>
              <div className="mb-6 font-mono text-[11px] tracking-[0.3em] text-[color:var(--color-muted)]">
                ▸ MANIFIESTO
              </div>
              <h2
                className="font-display text-[clamp(56px,12vw,180px)] leading-[0.92]"
                style={{ letterSpacing: "0.01em" }}
              >
                NODE IS<br />
                <span className="text-[color:var(--color-lime)]">NOT A STORE.</span>
              </h2>
              <div className="mx-auto mt-8 h-px w-24 bg-[color:var(--color-lime)]" />
              <p className="mt-6 font-mono text-[11px] tracking-[0.25em] text-[color:var(--color-muted)]">
                ES UN SISTEMA.
              </p>
            </div>
          </div>

          {/* Layer 4 — VERIFIED BY NODE */}
          <div
            ref={layer4}
            className="absolute inset-0 flex items-center justify-center px-6 md:px-12"
          >
            <div className="flex flex-col items-center">
              <svg
                width="140"
                height="140"
                viewBox="0 0 140 140"
                className="mb-6"
                aria-hidden
              >
                <circle
                  cx="70"
                  cy="70"
                  r="64"
                  fill="none"
                  stroke="var(--color-lime)"
                  strokeWidth="1"
                  strokeDasharray="402"
                  strokeDashoffset="0"
                />
                <circle
                  cx="70"
                  cy="70"
                  r="56"
                  fill="none"
                  stroke="var(--color-lime)"
                  strokeWidth="0.5"
                  strokeDasharray="3 6"
                  opacity="0.6"
                />
                <path
                  d="M 50 70 L 65 85 L 92 55"
                  fill="none"
                  stroke="var(--color-lime)"
                  strokeWidth="3"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
              </svg>
              <div className="font-display text-[clamp(36px,5vw,72px)] tracking-[0.04em]">
                VERIFIED BY <span className="text-[color:var(--color-lime)]">NODE</span>
              </div>
              <div className="mt-3 font-mono text-[11px] tracking-[0.3em] text-[color:var(--color-muted)]">
                AUTENTICIDAD · HISTORIAL · CONFIANZA
              </div>
            </div>
          </div>

          {/* Layer 5 — CTA + stats */}
          <div
            ref={layer5}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center md:px-12"
          >
            <div className="mb-4 font-mono text-[11px] tracking-[0.3em] text-[color:var(--color-lime)]">
              ▸ EARLY ACCESS / FOUNDERS LIMITED
            </div>
            <h2
              className="font-display text-[clamp(60px,11vw,160px)] leading-[0.9]"
              style={{ letterSpacing: "-0.01em" }}
            >
              SUBÍ DE
              <br />
              <span className="text-[color:var(--color-lime)]">NIVEL.</span>
            </h2>
            <div className="mt-10 flex items-center gap-3">
              <a
                href="#waitlist"
                data-magnetic
                className="inline-flex items-center gap-2 bg-[color:var(--color-lime)] px-7 py-4 font-mono text-[12px] font-bold tracking-[0.18em] text-[#000] transition-opacity hover:opacity-90"
              >
                QUIERO ENTRAR
                <span aria-hidden>→</span>
              </a>
              <a
                href="#solucion"
                data-magnetic
                className="inline-flex items-center gap-2 border border-[color:var(--color-border2)] px-7 py-4 font-mono text-[12px] tracking-[0.18em] text-[color:var(--color-muted)] transition-colors hover:border-[color:var(--color-lime)] hover:text-[color:var(--color-text)]"
              >
                VER CÓMO FUNCIONA
                <span aria-hidden>↓</span>
              </a>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-16">
              <Stat num="3" label="PILARES DEL SISTEMA" />
              <Stat num="7" label="PASOS DE VERIFICACIÓN" />
              <Stat num="4" label="TIERS DE MEMBRESÍA" />
              <Stat num="100%" label="VERIFIED BY NODE" />
            </div>
          </div>
        </div>

        {/* Scroll indicator (bottom) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-2 font-mono text-[9px] tracking-[0.3em] text-[color:var(--color-dim)] md:bottom-8">
          <span>SCROLL</span>
          <span
            className="block h-8 w-px bg-gradient-to-b from-[color:var(--color-dim)] to-transparent"
            style={{ animation: "scrollLine 2s ease infinite" }}
          />
        </div>

        {/* Bottom progress bar */}
        <div className="absolute inset-x-0 bottom-0 z-30 h-px bg-[color:var(--color-border)]">
          <div
            ref={progressBarRef}
            className="h-px origin-left scale-x-0 bg-[color:var(--color-lime)]"
            style={{ transformOrigin: "left center" }}
          />
        </div>

        {/* Loading state */}
        {state.mode === "frames" && !state.ready && state.total > 0 ? (
          <div className="absolute inset-x-0 bottom-6 z-30 mx-auto w-fit font-mono text-[10px] tracking-[0.25em] text-[color:var(--color-muted)]">
            CARGANDO {state.loaded}/{state.total}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="font-display text-[44px] leading-none text-[color:var(--color-lime)]">
        {num}
      </div>
      <div className="mt-2 font-mono text-[9px] tracking-[0.2em] text-[color:var(--color-dim)]">
        {label}
      </div>
    </div>
  );
}

/**
 * Hero simplificado para mobile / reduced-motion:
 * - Video en loop suave de fondo (sin scrub)
 * - Texto principal estático grande
 * - El usuario sigue scrolleando al ticker / problema
 */
function HeroMobile({ reduced }: { reduced: boolean }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-black"
    >
      <video
        src="/hero-video.mp4"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        muted
        playsInline
        autoPlay={!reduced}
        loop={!reduced}
        preload="auto"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.25) 35%, rgba(5,5,5,0.95) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(198,255,61,1) 1px, transparent 1px), linear-gradient(90deg, rgba(198,255,61,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-between px-6 pt-24 font-mono text-[10px] tracking-[0.2em] text-[color:var(--color-muted)]">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--color-lime)]" />
          NODE / SYSTEM
        </span>
        <span>−34.6° / −58.4°</span>
      </div>

      <div className="relative z-20 flex min-h-screen flex-col justify-center px-6 pt-32 pb-20">
        <div className="mb-5 font-mono text-[10px] tracking-[0.3em] text-[color:var(--color-lime)]">
          ▸ PLATAFORMA DE CULTURA URBANA
        </div>
        <h1 className="font-display text-[clamp(56px,16vw,120px)] leading-[0.86]">
          FILTRAMOS<br />
          <span className="text-[color:var(--color-lime)]">HYPE.</span><br />
          <span className="text-outline">VALIDAMOS</span><br />
          TODO.
        </h1>
        <p className="mt-6 max-w-md text-[14px] leading-relaxed text-[color:var(--color-muted)]">
          Verificación + Mercado. Un sistema donde la cultura urbana se ordena, se valida y sube de nivel.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 bg-[color:var(--color-lime)] px-6 py-3.5 font-mono text-[11px] font-bold tracking-[0.18em] text-[#000]"
          >
            QUIERO ENTRAR <span aria-hidden>→</span>
          </a>
          <a
            href="#solucion"
            className="inline-flex items-center gap-2 border border-[color:var(--color-border2)] px-6 py-3.5 font-mono text-[11px] tracking-[0.18em] text-[color:var(--color-muted)]"
          >
            CÓMO FUNCIONA <span aria-hidden>↓</span>
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 border-t border-[color:var(--color-border)] pt-6">
          <Stat num="3" label="PILARES" />
          <Stat num="7" label="VERIFICACIÓN" />
          <Stat num="4" label="TIERS" />
          <Stat num="100%" label="VERIFIED" />
        </div>
      </div>
    </section>
  );
}
