import Reveal from "./Reveal";
import SectionMeta from "./SectionMeta";

const PILARES = [
  {
    n: "01",
    title: "VERIFICACIÓN",
    desc: "Cada producto pasa por un proceso físico y digital que valida autenticidad, estado real y trazabilidad.",
    items: [
      "Inspección física detallada",
      "Criterios visibles de autenticidad",
      "Tag Verified by Node + QR",
      "ID único + historial consultable",
    ],
  },
  {
    n: "02",
    title: "DATA & MERCADO",
    desc: "Sistema tipo bolsa en activación beta: referencias de precio, historial y lógica de oferta/demanda.",
    items: [
      "Precios de referencia en beta",
      "Historial por producto",
      "Ask / Bid en roadmap privado",
      "Tendencias de mercado por categoría",
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
      "Oportunidades para compradores y sellers",
    ],
  },
];

export default function Pilares() {
  return (
    <section
      id="solucion"
      className="relative border-t border-border bg-surface"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-28 md:px-12 md:py-40">
        <div className="mb-16 grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <SectionMeta index="005" tag="LA SOLUCIÓN" />
            </Reveal>
            <Reveal delay={80}>
              <h2
                className="font-display text-[clamp(56px,8vw,128px)] leading-[0.88]"
                style={{ letterSpacing: "-0.015em" }}
              >
                NODE RESUELVE<br />
                <span className="text-lime">3 PROBLEMAS.</span>
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-5 md:flex md:items-end">
            <Reveal delay={140}>
              <p className="max-w-md text-[15px] leading-[1.7] text-muted">
                No es un marketplace más: primero ordena la confianza, después habilita el intercambio.
                <span className="text-text"> Tres pilares. Un beta privado.</span>
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-3">
          {PILARES.map((p, i) => (
            <Reveal
              key={p.n}
              delay={i * 120}
              className="group relative flex flex-col bg-black p-8 md:p-10"
            >
              {/* lima top stripe on hover */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-lime transition-transform duration-500 group-hover:scale-x-100"
              />
              {/* huge number */}
              <div
                className="font-display text-[120px] leading-[0.9] text-border2 transition-colors duration-700 group-hover:text-lime/25"
                style={{ letterSpacing: "-0.02em" }}
              >
                {p.n}
              </div>

              <div className="mt-6 flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-dim">
                <span className="h-px w-6 bg-border2" />
                <span>NODE / PILAR {p.n}</span>
              </div>

              <h3 className="mt-3 font-display text-[36px] tracking-[0.04em] text-lime">
                {p.title}
              </h3>

              <p className="mt-4 text-[14px] leading-[1.65] text-muted">
                {p.desc}
              </p>

              <ul className="mt-8 flex flex-col gap-2.5 border-t border-dashed border-border2 pt-6">
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

              {/* cornermark */}
              <div className="absolute right-4 top-4 font-mono text-[9px] tracking-[0.25em] text-dim">
                {`[${p.n}/03]`}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
