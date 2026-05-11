"use client";
import { useRef, useState } from "react";
import Reveal from "./Reveal";
import SectionMeta from "./SectionMeta";

const PAINS = [
  {
    code: "ERR / 01",
    title: "Falta de confianza",
    desc: "Réplicas y falsificaciones circulan sin control.",
  },
  {
    code: "ERR / 02",
    title: "Precios desordenados",
    desc: "Sin referencia de mercado, cada uno pone lo que quiere.",
  },
  {
    code: "ERR / 03",
    title: "Caos en plataformas",
    desc: "La reventa informal no tiene estructura ni protección.",
  },
];

const PILARES = [
  {
    n: "01",
    title: "VERIFICACIÓN",
    desc: "Cada producto pasa por un proceso físico y digital que valida autenticidad, estado real y trazabilidad.",
    items: [
      "Inspección física detallada",
      "Tag Verified by Node + QR",
      "ID único + historial consultable",
    ],
  },
  {
    n: "02",
    title: "DATA & MERCADO",
    desc: "Sistema tipo bolsa: referencias de precio, historial y lógica de oferta/demanda.",
    items: [
      "Precios de referencia en beta",
      "Historial por producto",
      "Ask / Bid en roadmap",
    ],
  },
  {
    n: "03",
    title: "COMUNIDAD",
    desc: "Acceso por membresía con prioridad en beta, drops verificados y beneficios medibles.",
    items: [
      "Acceso anticipado al beta",
      "Comunidad verificada",
      "Niveles con beneficios claros",
    ],
  },
];

export default function SolucionUnificada() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  function onCarouselScroll() {
    const el = carouselRef.current;
    if (!el) return;
    const cardW = el.scrollWidth / PILARES.length;
    setActiveIdx(Math.round(el.scrollLeft / cardW));
  }

  return (
    <section
      id="solucion"
      className="relative border-t border-border bg-black"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-36 md:px-12 md:py-56">

        {/* ── PROBLEMA (compacto) ─────────────────────────────────────────── */}
        <div className="mb-36 grid grid-cols-12 items-start gap-x-6 gap-y-10 border-b border-border pb-36">
          {/* Izquierda: headline del problema */}
          <div className="col-span-12 md:col-span-5">
            <Reveal>
              <SectionMeta index="003" tag="EL PROBLEMA / LA SOLUCIÓN" />
            </Reveal>
            <Reveal delay={80}>
              <h2
                className="font-display text-[clamp(52px,7vw,110px)] leading-[0.88]"
                style={{ letterSpacing: "-0.015em" }}
              >
                EL MERCADO<br />
                <span className="text-outline-dim">ESTÁ</span>{" "}
                <span className="text-danger">ROTO.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-sm text-[15px] leading-[1.7] text-muted">
                El usuario compra con incertidumbre. Sin datos, sin confianza, sin referencia.
                <span className="text-text"> NODE nace para resolver eso.</span>
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-8 inline-flex items-center gap-3 border border-danger/25 bg-danger/5 px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-danger" />
                <span className="font-mono text-[10px] tracking-[0.25em] text-muted">
                  STATUS: BROKEN MARKET
                </span>
              </div>
            </Reveal>
          </div>

          {/* Derecha: 3 pain points en chips */}
          <div className="col-span-12 md:col-span-7">
            <ul className="flex flex-col gap-3">
              {PAINS.map((p, i) => (
                <Reveal key={p.code} as="li" delay={120 + i * 80}>
                  <div className="group flex items-start gap-5 border border-border bg-surface p-5 transition-colors hover:border-danger/50">
                    <div className="flex flex-col items-start pt-0.5">
                      <span className="font-mono text-[9px] tracking-[0.25em] text-dim">
                        {p.code}
                      </span>
                      <span className="mt-1 text-[16px] leading-none text-danger">✗</span>
                    </div>
                    <div>
                      <div className="text-[15px] font-medium text-text">{p.title}</div>
                      <div className="mt-0.5 text-[13px] text-muted">{p.desc}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        {/* ── SOLUCIÓN — 3 pilares ────────────────────────────────────────── */}
        <div className="mb-20 grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <h2
                className="font-display text-[clamp(52px,7vw,110px)] leading-[0.88]"
                style={{ letterSpacing: "-0.015em" }}
              >
                NODE RESUELVE<br />
                <span className="text-lime">3 PROBLEMAS.</span>
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 mt-4 md:col-span-5 md:mt-0 md:flex md:items-end">
            <Reveal delay={100}>
              <p className="max-w-md text-[15px] leading-[1.7] text-muted">
                No es un marketplace más: primero ordena la confianza, después habilita el intercambio.
                <span className="text-text"> Tres pilares. Un beta privado.</span>
              </p>
            </Reveal>
          </div>
        </div>

        {/* Mobile: carousel horizontal con snap — Desktop: grid 3 columnas */}
        <div
          ref={carouselRef}
          onScroll={onCarouselScroll}
          className="no-scrollbar -mx-6 flex snap-x snap-mandatory overflow-x-auto gap-px md:mx-0 md:grid md:grid-cols-3 md:overflow-visible"
        >
          {PILARES.map((p, i) => (
            <Reveal
              key={p.n}
              delay={i * 100}
              className="group relative flex w-[82vw] flex-shrink-0 snap-start flex-col border-r border-border bg-black p-8 first:ml-6 last:mr-6 md:w-auto md:flex-shrink md:border-0 md:p-10 md:first:ml-0 md:last:mr-0"
            >
              {/* lima top stripe on hover */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-lime transition-transform duration-500 group-hover:scale-x-100"
              />

              <div className="flex items-center justify-between">
                <div
                  className="font-display text-[88px] leading-[0.9] text-border2 transition-colors duration-700 group-hover:text-lime/25"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {p.n}
                </div>
                <span className="font-mono text-[9px] tracking-[0.25em] text-dim">
                  [{p.n}/03]
                </span>
              </div>

              <h3 className="mt-4 font-display text-[30px] tracking-[0.04em] text-lime">
                {p.title}
              </h3>

              <p className="mt-3 text-[14px] leading-[1.65] text-muted">
                {p.desc}
              </p>

              <ul className="mt-7 flex flex-col gap-2 border-t border-dashed border-border2 pt-5">
                {p.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-center gap-3 font-mono text-[11px] tracking-[0.04em] text-muted"
                  >
                    <span className="text-lime">→</span>
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {/* Indicador de dots — solo mobile */}
        <div className="mt-6 flex items-center justify-center gap-2 md:hidden">
          {PILARES.map((p, i) => (
            <span
              key={p.n}
              className="h-[3px] transition-all duration-300"
              style={{
                width: activeIdx === i ? "24px" : "8px",
                background: activeIdx === i ? "var(--color-lime)" : "var(--color-border2)",
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
