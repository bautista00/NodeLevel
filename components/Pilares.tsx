import Reveal from "./Reveal";
import SectionMeta from "./SectionMeta";

const PILARES = [
  {
    n: "01",
    title: "VERIFICACIÓN",
    desc: "Cada producto pasa por un proceso físico y digital que valida autenticidad y estado real.",
    items: [
      "Inspección física detallada",
      "Comparación con base de datos",
      "Tag Verified by Node",
      "ID único + historial en nube",
    ],
  },
  {
    n: "02",
    title: "DATA & MERCADO",
    desc: "Sistema tipo bolsa con precios en tiempo real, historial completo y lógica de oferta/demanda.",
    items: [
      "Precios en tiempo real",
      "Historial por producto",
      "Sistema Ask / Bid",
      "Gráficos de tendencia",
    ],
  },
  {
    n: "03",
    title: "COMUNIDAD",
    desc: "Acceso cerrado por membresía con prioridad en drops, beneficios exclusivos y status real.",
    items: [
      "Acceso anticipado a drops",
      "Comunidad verificada",
      "Sistema de niveles",
      "Oportunidades exclusivas",
    ],
  },
];

export default function Pilares() {
  return (
    <section
      id="solucion"
      className="relative bg-[color:var(--color-surface)]"
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
                <span className="text-[color:var(--color-lime)]">3 PROBLEMAS.</span>
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-5 md:flex md:items-end">
            <Reveal delay={140}>
              <p className="max-w-md text-[15px] leading-[1.7] text-[color:var(--color-muted)]">
                No es un marketplace más. Es la infraestructura que le faltaba al mercado de cultura urbana en Argentina.
                <span className="text-[color:var(--color-text)]"> Tres pilares. Un solo sistema.</span>
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px bg-[color:var(--color-border)] md:grid-cols-3">
          {PILARES.map((p, i) => (
            <Reveal
              key={p.n}
              delay={i * 120}
              className="group relative flex flex-col bg-[color:var(--color-black)] p-8 md:p-10"
            >
              {/* lima top stripe on hover */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[color:var(--color-lime)] transition-transform duration-500 group-hover:scale-x-100"
              />
              {/* huge number */}
              <div
                className="font-display text-[120px] leading-[0.9] text-[color:var(--color-border2)] transition-colors duration-500 group-hover:text-[color:var(--color-lime)]/20"
                style={{ letterSpacing: "-0.02em" }}
              >
                {p.n}
              </div>

              <div className="mt-6 flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-[color:var(--color-dim)]">
                <span className="h-px w-6 bg-[color:var(--color-border2)]" />
                <span>NODE / PILAR {p.n}</span>
              </div>

              <h3 className="mt-3 font-display text-[36px] tracking-[0.04em] text-[color:var(--color-lime)]">
                {p.title}
              </h3>

              <p className="mt-4 text-[14px] leading-[1.65] text-[color:var(--color-muted)]">
                {p.desc}
              </p>

              <ul className="mt-8 flex flex-col gap-2.5 border-t border-dashed border-[color:var(--color-border2)] pt-6">
                {p.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-center gap-3 font-mono text-[11px] tracking-[0.04em] text-[color:var(--color-muted)]"
                  >
                    <span className="text-[color:var(--color-lime)]">→</span>
                    {it}
                  </li>
                ))}
              </ul>

              {/* cornermark */}
              <div className="absolute right-4 top-4 font-mono text-[9px] tracking-[0.25em] text-[color:var(--color-dim)]">
                {`[${p.n}/03]`}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
