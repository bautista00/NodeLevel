"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrubFrames } from "@/lib/useScrubFrames";
import HeroVideo from "./HeroVideo";
import HeroMobile from "./HeroMobile";
import HeroStat from "./HeroStat";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hero pinneado con scroll-scrub sobre el video.
 *
 * Estrategia:
 *  1. Si hay /frames/manifest.json → renderiza canvas con la secuencia (Apple-style, 60fps)
 *  2. Si NO hay frames → HeroVideo: split layout (texto izq + showcase der) con <video> en loop
 *  3. prefers-reduced-motion o mobile → poster estático con texto fijo
 */
export default function HeroScrub() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layer1 = useRef<HTMLDivElement>(null);
  const layer2 = useRef<HTMLDivElement>(null);
  const layer3 = useRef<HTMLDivElement>(null);
  const layer4 = useRef<HTMLDivElement>(null);
  const layer5 = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const frameCounterRef = useRef<HTMLSpanElement>(null);
  const currentFrameRef = useRef(0);

  const { state, images } = useScrubFrames();

  function drawFrame(idx: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx || !state.total) return;

    const safeIdx = Math.max(0, Math.min(state.total - 1, Math.round(idx)));
    const img = images.current[safeIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, cw, ch);

    const ir = img.naturalWidth / img.naturalHeight;
    const cr = cw / ch;
    let dw = cw, dh = ch, dx = 0, dy = 0;
    if (ir > cr) { dh = ch; dw = ch * ir; dx = (cw - dw) / 2; }
    else { dw = cw; dh = cw / ir; dy = (ch - dh) / 2; }
    ctx.drawImage(img, dx, dy, dw, dh);

    currentFrameRef.current = safeIdx;
    if (frameCounterRef.current) {
      frameCounterRef.current.textContent = `${String(safeIdx + 1).padStart(3, "0")} / ${String(state.total).padStart(3, "0")}`;
    }
  }

  // Resize canvas at correct DPR
  useEffect(() => {
    if (state.mode !== "frames") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      drawFrame(currentFrameRef.current);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.mode]);

  // Draw first frame as soon as images start loading
  useEffect(() => {
    if (state.mode === "frames" && state.loaded > 0) drawFrame(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.mode, state.loaded]);

  // ScrollTrigger timeline
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (state.mode === "loading" || state.mode === "mobile" || state.mode === "reduced" || state.mode === "video") return;
    if (!state.ready || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set([layer2.current, layer3.current, layer4.current, layer5.current], { opacity: 0, visibility: "hidden" });
      gsap.set(layer1.current, { opacity: 1, y: 0, visibility: "visible" });

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
          if (progressBarRef.current) progressBarRef.current.style.transform = `scaleX(${self.progress})`;
          if (state.mode === "frames" && state.total > 0) drawFrame(self.progress * (state.total - 1));
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "+=350%", scrub: 0.6 },
      });

      tl.to(layer1.current, { opacity: 1, duration: 0.001 }, 0)
        .to(layer1.current, { opacity: 0, y: -40, duration: 0.18, ease: "power2.in" }, 0.18)
        .set(layer1.current, { visibility: "hidden" }, 0.36);

      tl.set(layer2.current, { visibility: "visible" }, 0.18)
        .fromTo(layer2.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" }, 0.2)
        .to(layer2.current, { opacity: 0, y: -40, duration: 0.18, ease: "power2.in" }, 0.4)
        .set(layer2.current, { visibility: "hidden" }, 0.58);

      tl.set(layer3.current, { visibility: "visible" }, 0.4)
        .fromTo(layer3.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" }, 0.42)
        .to(layer3.current, { opacity: 0, y: -40, duration: 0.18, ease: "power2.in" }, 0.62)
        .set(layer3.current, { visibility: "hidden" }, 0.8);

      tl.set(layer4.current, { visibility: "visible" }, 0.62)
        .fromTo(layer4.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.16, ease: "power3.out" }, 0.64)
        .to(layer4.current, { opacity: 0, duration: 0.12, ease: "power2.in" }, 0.82)
        .set(layer4.current, { visibility: "hidden" }, 0.94);

      tl.set(layer5.current, { visibility: "visible" }, 0.82)
        .fromTo(layer5.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.18, ease: "power3.out" }, 0.84);

      return () => trigger.kill();
    }, sectionRef);

    const id = window.setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => { window.clearTimeout(id); ctx.revert(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.mode, state.ready, state.total]);

  if (state.mode === "mobile" || state.mode === "reduced") return <HeroMobile reduced={state.mode === "reduced"} />;
  if (state.mode === "video") return <HeroVideo />;

  return (
    <section ref={sectionRef} id="hero" className="relative h-screen w-full overflow-hidden bg-black" aria-label="Hero">
      <div className="relative h-full w-full">
        <div className="absolute inset-0 z-0">
          <canvas ref={canvasRef} className="h-full w-full" style={{ display: "block" }} />
        </div>

        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.15) 30%, rgba(5,5,5,0.15) 70%, rgba(5,5,5,0.95) 100%), linear-gradient(to right, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0) 50%, rgba(5,5,5,0.4) 100%)" }} />
          <div className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 3px)" }} />
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(198,255,61,1) 1px, transparent 1px), linear-gradient(90deg, rgba(198,255,61,1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-between px-6 pt-24 font-mono text-[10px] tracking-[0.2em] text-muted md:px-12">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
            <span>NODE / SYSTEM ONLINE</span>
          </div>
          <div className="hidden items-center gap-6 md:flex">
            <span>−34.6° / −58.4°</span>
            <span ref={frameCounterRef}>000 / 000</span>
            <span>ARG · LATAM</span>
          </div>
        </div>

        <div className="relative z-20 flex h-full w-full items-center justify-center px-6 md:px-12">
          <div ref={layer1} className="absolute inset-0 flex flex-col items-start justify-center px-6 md:px-12">
            <div className="mb-6 font-mono text-[11px] tracking-[0.3em] text-lime">▸ PLATAFORMA DE CULTURA URBANA — ARG / LATAM</div>
            <h1 className="font-display text-[clamp(64px,14vw,200px)] leading-[0.86]" style={{ letterSpacing: "-0.02em" }}>
              FILTRAMOS<br /><span className="text-lime">HYPE.</span>
            </h1>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-muted">Verificación + Mercado. Un sistema donde la cultura urbana se ordena, se valida y sube de nivel.</p>
          </div>

          <div ref={layer2} className="absolute inset-0 flex flex-col items-end justify-center px-6 text-right md:px-12">
            <div className="mb-6 font-mono text-[11px] tracking-[0.3em] text-lime">▸ NODE / 002</div>
            <h2 className="font-display text-[clamp(64px,14vw,200px)] leading-[0.86]" style={{ letterSpacing: "-0.02em" }}>
              <span className="text-outline">VALIDAMOS</span><br />TODO.
            </h2>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-muted">Cada producto pasa por un proceso físico y digital antes de tocar el market.</p>
          </div>

          <div ref={layer3} className="absolute inset-0 flex items-center justify-center px-6 text-center md:px-12">
            <div>
              <div className="mb-6 font-mono text-[11px] tracking-[0.3em] text-muted">▸ MANIFIESTO</div>
              <h2 className="font-display text-[clamp(56px,12vw,180px)] leading-[0.92]" style={{ letterSpacing: "0.01em" }}>
                NODE IS<br /><span className="text-lime">NOT A STORE.</span>
              </h2>
              <div className="mx-auto mt-8 h-px w-24 bg-lime" />
              <p className="mt-6 font-mono text-[11px] tracking-[0.25em] text-muted">ES UN SISTEMA.</p>
            </div>
          </div>

          <div ref={layer4} className="absolute inset-0 flex items-center justify-center px-6 md:px-12">
            <div className="flex flex-col items-center">
              <svg width="140" height="140" viewBox="0 0 140 140" className="mb-6" aria-hidden>
                <circle cx="70" cy="70" r="64" fill="none" stroke="var(--color-lime)" strokeWidth="1" strokeDasharray="402" strokeDashoffset="0" />
                <circle cx="70" cy="70" r="56" fill="none" stroke="var(--color-lime)" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.6" />
                <path d="M 50 70 L 65 85 L 92 55" fill="none" stroke="var(--color-lime)" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" />
              </svg>
              <div className="font-display text-[clamp(36px,5vw,72px)] tracking-[0.04em]">VERIFIED BY <span className="text-lime">NODE</span></div>
              <div className="mt-3 font-mono text-[11px] tracking-[0.3em] text-muted">AUTENTICIDAD · HISTORIAL · CONFIANZA</div>
            </div>
          </div>

          <div ref={layer5} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center md:px-12">
            <div className="mb-4 font-mono text-[11px] tracking-[0.3em] text-lime">▸ EARLY ACCESS / FOUNDERS LIMITED</div>
            <h2 className="font-display text-[clamp(60px,11vw,160px)] leading-[0.9]" style={{ letterSpacing: "-0.01em" }}>
              SUBÍ DE<br /><span className="text-lime">NIVEL.</span>
            </h2>
            <div className="mt-10 flex items-center gap-3">
              <a href="#waitlist" data-magnetic className="inline-flex cursor-pointer items-center gap-2 bg-lime px-7 py-4 font-mono text-[12px] font-bold tracking-[0.18em] text-[#000] transition-opacity hover:opacity-90">
                ENTRAR AL BETA <span aria-hidden>→</span>
              </a>
              <a href="#solucion" data-magnetic className="inline-flex cursor-pointer items-center gap-2 border border-border2 px-7 py-4 font-mono text-[12px] tracking-[0.18em] text-muted transition-colors hover:border-lime hover:text-text">
                VER CÓMO FUNCIONA <span aria-hidden>↓</span>
              </a>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-16">
              <HeroStat num="3" label="PILARES DEL SISTEMA" />
              <HeroStat num="7" label="PASOS DE VERIFICACIÓN" />
              <HeroStat num="4" label="TIERS DE MEMBRESÍA" />
              <HeroStat num="100%" label="VERIFIED BY NODE" />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-2 font-mono text-[9px] tracking-[0.3em] text-dim md:bottom-8">
          <span>SCROLL</span>
          <span className="block h-8 w-px bg-gradient-to-b from-dim to-transparent" style={{ animation: "scrollLine 2s ease infinite" }} />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-30 h-px bg-border">
          <div ref={progressBarRef} className="h-px origin-left scale-x-0 bg-lime" style={{ transformOrigin: "left center" }} />
        </div>

        {state.mode === "frames" && !state.ready && state.total > 0 && (
          <div className="absolute inset-x-0 bottom-6 z-30 mx-auto w-fit font-mono text-[10px] tracking-[0.25em] text-muted">
            CARGANDO {state.loaded}/{state.total}
          </div>
        )}
      </div>
    </section>
  );
}
