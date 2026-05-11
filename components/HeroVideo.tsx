"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroStat from "./HeroStat";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const layer1 = useRef<HTMLDivElement>(null);
  const layer2 = useRef<HTMLDivElement>(null);
  const layer3 = useRef<HTMLDivElement>(null);
  const layer4 = useRef<HTMLDivElement>(null);
  const layer5 = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

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
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${self.progress})`;
          }
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
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative h-screen w-full overflow-hidden bg-[#050505]" aria-label="Hero">
      {/* VIDEO PANEL */}
      <div className="absolute inset-0 z-0 md:inset-y-0 md:left-auto md:right-0 md:w-[52%]">
        <div className="absolute inset-0 bg-[#050505]" />
        <video
          src="/hero-video.mp4"
          className="absolute inset-0 h-full w-full object-contain"
          style={{ padding: "clamp(12px, 4%, 52px)" }}
          muted playsInline autoPlay loop preload="auto"
        />
        <div className="pointer-events-none absolute inset-0 md:hidden" style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.75) 0%, rgba(5,5,5,0.2) 30%, rgba(5,5,5,0.2) 65%, rgba(5,5,5,0.97) 100%)" }} />
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-2/5 md:block" style={{ background: "linear-gradient(to right, rgba(5,5,5,1) 0%, rgba(5,5,5,0.6) 60%, rgba(5,5,5,0) 100%)" }} />
        <div aria-hidden className="pointer-events-none absolute hidden md:block" style={{ inset: "8%" }}>
          <span className="absolute -left-px -top-px h-8 w-8 border-l border-t border-lime/40" />
          <span className="absolute -right-px -top-px h-8 w-8 border-r border-t border-lime/40" />
          <span className="absolute -bottom-px -left-px h-8 w-8 border-b border-l border-lime/40" />
          <span className="absolute -bottom-px -right-px h-8 w-8 border-b border-r border-lime/40" />
          <span className="absolute inset-0 border border-lime/[0.07]" />
        </div>
        <span aria-hidden className="pointer-events-none absolute hidden font-mono text-[8px] tracking-[0.25em] text-lime/35 md:block" style={{ top: "calc(8% - 18px)", left: "calc(8% + 6px)" }}>PRODUCT / SHOWCASE</span>
        <span aria-hidden className="pointer-events-none absolute hidden font-mono text-[8px] tracking-[0.25em] text-lime/35 md:block" style={{ bottom: "calc(8% - 18px)", right: "calc(8% + 6px)" }}>VERIFIED ✓</span>
      </div>

      {/* SCANLINES */}
      <div className="pointer-events-none absolute inset-0 z-[8] opacity-[0.13]" style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 3px)" }} />

      {/* GRID */}
      <div className="pointer-events-none absolute inset-0 z-[8] hidden opacity-[0.04] md:block" style={{ backgroundImage: "linear-gradient(rgba(198,255,61,1) 1px, transparent 1px), linear-gradient(90deg, rgba(198,255,61,1) 1px, transparent 1px)", backgroundSize: "80px 80px", maskImage: "linear-gradient(to right, black 0%, black 42%, transparent 60%)", WebkitMaskImage: "linear-gradient(to right, black 0%, black 42%, transparent 60%)" }} />

      {/* GRADIENTS */}
      <div className="pointer-events-none absolute inset-0 z-[9] hidden md:block" style={{ background: "linear-gradient(to right, rgba(5,5,5,1) 0%, rgba(5,5,5,0.98) 38%, rgba(5,5,5,0.75) 48%, rgba(5,5,5,0) 60%)" }} />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[9] h-44" style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.85) 0%, transparent 100%)" }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[9] h-28" style={{ background: "linear-gradient(to top, rgba(5,5,5,1) 0%, transparent 100%)" }} />

      {/* HUD TOP */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-between px-6 pt-24 font-mono text-[10px] tracking-[0.2em] text-muted md:px-12">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
          <span>NODE / SYSTEM ONLINE</span>
        </div>
        <div className="hidden items-center gap-6 md:flex">
          <span>−34.6° / −58.4°</span>
          <span>ARG · LATAM</span>
        </div>
      </div>

      {/* CONTENT LAYERS */}
      <div className="relative z-20 h-full">
        <div ref={layer1} className="absolute inset-0 flex flex-col items-start justify-center px-6 md:px-12">
          <div className="w-full md:max-w-[54%]">
            <div className="mb-6 font-mono text-[11px] tracking-[0.3em] text-lime">▸ PLATAFORMA DE CULTURA URBANA — ARG / LATAM</div>
            <h1 className="font-display text-[clamp(64px,11vw,170px)] leading-[0.86]" style={{ letterSpacing: "-0.02em" }}>
              FILTRAMOS<br /><span className="text-lime">HYPE.</span>
            </h1>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-muted">Verificación + Mercado. Un sistema donde la cultura urbana se ordena, se valida y sube de nivel.</p>
          </div>
        </div>

        <div ref={layer2} className="absolute inset-0 flex flex-col items-start justify-center px-6 md:px-12">
          <div className="w-full md:max-w-[54%]">
            <div className="mb-6 font-mono text-[11px] tracking-[0.3em] text-lime">▸ NODE / 002</div>
            <h2 className="font-display text-[clamp(64px,11vw,170px)] leading-[0.86]" style={{ letterSpacing: "-0.02em" }}>
              <span className="text-outline">VALIDAMOS</span><br />TODO.
            </h2>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-muted">Cada producto pasa por un proceso físico y digital antes de tocar el market.</p>
          </div>
        </div>

        <div ref={layer3} className="absolute inset-0 flex items-center justify-start px-6 md:px-12">
          <div className="w-full md:max-w-[54%]">
            <div className="mb-6 font-mono text-[11px] tracking-[0.3em] text-muted">▸ MANIFIESTO</div>
            <h2 className="font-display text-[clamp(52px,9vw,148px)] leading-[0.92]" style={{ letterSpacing: "0.01em" }}>
              NODE IS<br /><span className="text-lime">NOT A STORE.</span>
            </h2>
            <div className="mt-8 h-px w-24 bg-lime" />
            <p className="mt-6 font-mono text-[11px] tracking-[0.25em] text-muted">ES UN SISTEMA.</p>
          </div>
        </div>

        <div ref={layer4} className="absolute inset-0 flex items-center justify-start px-6 md:px-12">
          <div className="w-full md:max-w-[54%]">
            <svg width="120" height="120" viewBox="0 0 140 140" className="mb-6" aria-hidden>
              <circle cx="70" cy="70" r="64" fill="none" stroke="var(--color-lime)" strokeWidth="1" strokeDasharray="402" strokeDashoffset="0" />
              <circle cx="70" cy="70" r="56" fill="none" stroke="var(--color-lime)" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.6" />
              <path d="M 50 70 L 65 85 L 92 55" fill="none" stroke="var(--color-lime)" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" />
            </svg>
            <div className="font-display text-[clamp(34px,4.5vw,68px)] tracking-[0.04em]">VERIFIED BY <span className="text-lime">NODE</span></div>
            <div className="mt-3 font-mono text-[11px] tracking-[0.3em] text-muted">AUTENTICIDAD · HISTORIAL · CONFIANZA</div>
          </div>
        </div>

        <div ref={layer5} className="absolute inset-0 flex flex-col items-start justify-center px-6 md:px-12">
          <div className="w-full md:max-w-[54%]">
            <div className="mb-4 font-mono text-[11px] tracking-[0.3em] text-lime">▸ EARLY ACCESS / FOUNDERS LIMITED</div>
            <h2 className="font-display text-[clamp(56px,9vw,140px)] leading-[0.9]" style={{ letterSpacing: "-0.01em" }}>
              SUBÍ DE<br /><span className="text-lime">NIVEL.</span>
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#waitlist" data-magnetic className="inline-flex cursor-pointer items-center gap-2 bg-lime px-7 py-4 font-mono text-[12px] font-bold tracking-[0.18em] text-[#000] transition-opacity hover:opacity-90">
                ENTRAR AL BETA <span aria-hidden>→</span>
              </a>
              <a href="#solucion" data-magnetic className="inline-flex cursor-pointer items-center gap-2 border border-border2 px-7 py-4 font-mono text-[12px] tracking-[0.18em] text-muted transition-colors hover:border-lime hover:text-text">
                VER CÓMO FUNCIONA <span aria-hidden>↓</span>
              </a>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-6 md:gap-10">
              <HeroStat num="3" label="PILARES DEL SISTEMA" />
              <HeroStat num="7" label="PASOS DE VERIFICACIÓN" />
              <HeroStat num="4" label="TIERS DE MEMBRESÍA" />
              <HeroStat num="100%" label="VERIFIED BY NODE" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-2 font-mono text-[9px] tracking-[0.3em] text-dim md:bottom-8">
        <span>SCROLL</span>
        <span className="block h-8 w-px bg-gradient-to-b from-dim to-transparent" style={{ animation: "scrollLine 2s ease infinite" }} />
      </div>

      {/* Progress bar */}
      <div className="absolute inset-x-0 bottom-0 z-30 h-px bg-border">
        <div ref={progressBarRef} className="h-px origin-left scale-x-0 bg-lime" style={{ transformOrigin: "left center" }} />
      </div>
    </section>
  );
}
