"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";
import SectionMeta from "./SectionMeta";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    n: "01",
    code: "INGRESO",
    desc: "Venta directa, consignación o drop de terceros. El producto entra al sistema NODE.",
  },
  {
    n: "02",
    code: "INSPECCIÓN",
    desc: "Análisis físico: materiales, costuras, etiquetas, caja, packaging, desgaste real.",
  },
  {
    n: "03",
    code: "VALIDACIÓN",
    desc: "Comparación contra pares originales y base de datos. Resultado: auténtico o rechazado.",
  },
  {
    n: "04",
    code: "ESTADO",
    desc: "Clasificación: nuevo o usado con condición detallada. Esto impacta el precio.",
  },
  {
    n: "05",
    code: "REGISTRO",
    desc: "ID único + historial guardado en el sistema NODE. Identidad digital del producto.",
  },
  {
    n: "06",
    code: "TAG NODE",
    desc: "Tag físico, código QR o identificación digital. Verified by Node.",
  },
  {
    n: "07",
    code: "PUBLICADO",
    desc: "Listo en el market con precio validado, historial completo y transparencia total.",
    final: true,
  },
];

export default function Verificacion() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sectionRef.current || !trackRef.current) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const compact = window.matchMedia("(max-width: 900px)").matches;
    if (compact) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const overflow = () => track.scrollWidth - window.innerWidth + 96;

      const tween = gsap.to(track, {
        x: () => -overflow(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${overflow()}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate(self) {
            if (lineRef.current) {
              lineRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, sectionRef);

    const id = window.setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      window.clearTimeout(id);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="verificacion"
      className="relative flex min-h-screen flex-col overflow-hidden bg-[color:var(--color-black)]"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 pt-28 md:px-12 md:pt-32">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <SectionMeta index="007" tag="PROCESO DE VERIFICACIÓN" />
            </Reveal>
            <Reveal delay={80}>
              <h2
                className="font-display text-[clamp(56px,8vw,128px)] leading-[0.88]"
                style={{ letterSpacing: "-0.015em" }}
              >
                7 PASOS.<br />
                <span className="text-[color:var(--color-lime)]">CERO DUDAS.</span>
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 mt-6 md:col-span-5 md:mt-0 md:flex md:items-end">
            <Reveal delay={140}>
              <p className="max-w-md text-[15px] leading-[1.7] text-[color:var(--color-muted)]">
                Cada producto que toca el market pasa por este pipeline.
                <span className="text-[color:var(--color-text)]"> Físico, digital y en cloud.</span>
              </p>
            </Reveal>
          </div>
        </div>

        {/* Progress bar lima */}
        <div className="mt-12 hidden h-px w-full bg-[color:var(--color-border)] md:block">
          <div
            ref={lineRef}
            className="h-px origin-left scale-x-0 bg-[color:var(--color-lime)] transition-transform"
          />
        </div>
      </div>

      {/* Scroll horizontal track (desktop) — en mobile colapsa a stack */}
      <div className="relative flex-1 pt-12 pb-28 md:flex md:items-center md:py-12">
        <div
          ref={trackRef}
          className="no-scrollbar flex flex-col gap-6 overflow-x-auto px-6 md:flex-row md:gap-0 md:overflow-visible md:px-12"
        >
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className={`relative flex w-full flex-shrink-0 flex-col justify-between border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-7 md:w-[420px] ${
                s.final
                  ? "md:border-[color:var(--color-lime)]"
                  : ""
              }`}
              style={{ minHeight: "320px", marginRight: i < STEPS.length - 1 ? undefined : 0 }}
            >
              {/* connector line on the right (desktop only) */}
              {i < STEPS.length - 1 ? (
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-[-32px] top-[58px] hidden h-px w-[32px] bg-[color:var(--color-border2)] md:block"
                />
              ) : null}

              <div>
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center border font-display text-[20px] ${
                      s.final
                        ? "border-[color:var(--color-lime)] text-[color:var(--color-lime)]"
                        : "border-[color:var(--color-border2)] text-[color:var(--color-muted)]"
                    }`}
                  >
                    {s.final ? "✓" : s.n}
                  </div>
                  <span className="font-mono text-[9px] tracking-[0.25em] text-[color:var(--color-dim)]">
                    [{s.n}/07]
                  </span>
                </div>

                <div
                  className={`mt-8 font-display text-[32px] tracking-[0.04em] ${
                    s.final
                      ? "text-[color:var(--color-lime)]"
                      : "text-[color:var(--color-text)]"
                  }`}
                >
                  {s.code}
                </div>

                <p className="mt-3 max-w-xs text-[13px] leading-[1.6] text-[color:var(--color-muted)]">
                  {s.desc}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-[color:var(--color-dim)]">
                <span
                  className={`h-1.5 w-1.5 ${
                    s.final
                      ? "rounded-full bg-[color:var(--color-lime)]"
                      : "bg-[color:var(--color-border2)]"
                  }`}
                />
                {s.final ? "READY FOR MARKET" : "STEP COMPLETE"}
              </div>
            </div>
          ))}

          {/* Verified badge final card */}
          <div className="flex w-full flex-shrink-0 flex-col items-center justify-center border border-[color:var(--color-lime)] bg-gradient-to-b from-[color:var(--color-lime)]/10 to-transparent p-10 md:w-[420px]">
            <svg width="80" height="80" viewBox="0 0 80 80" aria-hidden>
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="var(--color-lime)"
                strokeWidth="1"
              />
              <path
                d="M 26 40 L 36 50 L 56 30"
                fill="none"
                stroke="var(--color-lime)"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
            <div className="mt-6 text-center">
              <div className="font-display text-[28px] tracking-[0.06em]">
                VERIFIED BY <span className="text-[color:var(--color-lime)]">NODE</span>
              </div>
              <div className="mt-2 font-mono text-[10px] tracking-[0.25em] text-[color:var(--color-muted)]">
                AUTENTICIDAD · HISTORIAL · CONFIANZA
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
