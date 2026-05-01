import Reveal from "./Reveal";
import SectionMeta from "./SectionMeta";

type Tier = {
  name: string;
  desc: string;
  features: { label: string; included: boolean }[];
  featured?: boolean;
  founders?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "FREE",
    desc: "Acceso básico al marketplace y precios en tiempo real.",
    features: [
      { label: "Acceso al market", included: true },
      { label: "Ver precios históricos", included: true },
      { label: "Compra verificada", included: true },
      { label: "Prioridad en drops", included: false },
      { label: "Acceso anticipado", included: false },
    ],
  },
  {
    name: "GOLD",
    desc: "Prioridad en drops y mejores condiciones de compra/venta.",
    features: [
      { label: "Todo lo de Free", included: true },
      { label: "Prioridad en drops", included: true },
      { label: "Mejores precios", included: true },
      { label: "Fee reducido", included: true },
      { label: "Acceso anticipado", included: false },
    ],
  },
  {
    name: "BLACK",
    desc: "Acceso anticipado y productos exclusivos antes que nadie.",
    featured: true,
    features: [
      { label: "Todo lo de Gold", included: true },
      { label: "Acceso anticipado", included: true },
      { label: "Productos exclusivos", included: true },
      { label: "Soporte prioritario", included: true },
      { label: "Raffles privadas", included: true },
    ],
  },
  {
    name: "FOUNDERS",
    desc: "Status permanente. Beneficios exclusivos para los primeros 100.",
    founders: true,
    features: [
      { label: "Todo lo de Black", included: true },
      { label: "Beneficios permanentes", included: true },
      { label: "Status en el ecosistema", included: true },
      { label: "Badge exclusivo", included: true },
      { label: "Voz en decisiones", included: true },
    ],
  },
];

export default function Membresias() {
  return (
    <section
      id="membresias"
      className="relative bg-[color:var(--color-surface)]"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-28 md:px-12 md:py-40">
        <div className="mb-16 grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <SectionMeta index="008" tag="MEMBRESÍAS" />
            </Reveal>
            <Reveal delay={80}>
              <h2
                className="font-display text-[clamp(56px,8vw,128px)] leading-[0.88]"
                style={{ letterSpacing: "-0.015em" }}
              >
                EARLY ACCESS.<br />
                <span className="text-[color:var(--color-lime)]">LIMITED ENTRY.</span>
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 mt-6 md:col-span-5 md:mt-0 md:flex md:items-end">
            <Reveal delay={140}>
              <p className="max-w-md text-[15px] leading-[1.7] text-[color:var(--color-muted)]">
                Cuatro niveles. Status real, no tokens vacíos.
                <span className="text-[color:var(--color-text)]"> Founders limitados a 100 spots.</span>
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {TIERS.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 100}
              className={`group relative flex flex-col border bg-[color:var(--color-black)] p-7 transition-all duration-500 hover:-translate-y-1 ${
                t.featured
                  ? "border-[color:var(--color-lime)] shadow-[0_0_60px_-15px_rgba(198,255,61,0.35)] xl:scale-[1.02]"
                  : t.founders
                    ? "border-[color:var(--color-border2)] hover:border-[color:var(--color-lime)]"
                    : "border-[color:var(--color-border)] hover:border-[color:var(--color-border2)]"
              }`}
            >
              {t.featured ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[color:var(--color-lime)] px-3 py-1 font-mono text-[9px] font-bold tracking-[0.25em] text-[#000]">
                  MÁS POPULAR
                </span>
              ) : null}
              {t.founders ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 border border-[color:var(--color-lime)] bg-[color:var(--color-black)] px-3 py-1 font-mono text-[9px] font-medium tracking-[0.25em] text-[color:var(--color-lime)]">
                  100 SPOTS
                </span>
              ) : null}

              {/* tier name */}
              <div className="flex items-baseline justify-between">
                <h3
                  className={`font-display text-[36px] tracking-[0.06em] ${
                    t.featured
                      ? "text-[color:var(--color-lime)]"
                      : t.founders
                        ? "text-[color:var(--color-lime)]"
                        : "text-[color:var(--color-text)]"
                  }`}
                >
                  {t.name}
                </h3>
                <span className="font-mono text-[10px] tracking-[0.2em] text-[color:var(--color-dim)]">
                  T/{String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="mt-3 text-[13px] leading-[1.55] text-[color:var(--color-muted)]">
                {t.desc}
              </p>

              <ul className="mt-7 flex flex-col gap-3 border-t border-dashed border-[color:var(--color-border2)] pt-6">
                {t.features.map((f) => (
                  <li
                    key={f.label}
                    className={`flex items-center gap-3 text-[13px] ${
                      f.included
                        ? "text-[color:var(--color-text)]"
                        : "text-[color:var(--color-dim)] line-through decoration-[color:var(--color-border2)]"
                    }`}
                  >
                    <span
                      className={`flex h-4 w-4 items-center justify-center text-[10px] ${
                        f.included
                          ? "text-[color:var(--color-lime)]"
                          : "text-[color:var(--color-border2)]"
                      }`}
                    >
                      {f.included ? "✓" : "—"}
                    </span>
                    {f.label}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <a
                  href="#waitlist"
                  data-magnetic
                  className={`inline-flex w-full items-center justify-center gap-2 px-5 py-3 font-mono text-[10px] font-medium tracking-[0.2em] transition-colors ${
                    t.featured
                      ? "bg-[color:var(--color-lime)] font-bold text-[#000] hover:opacity-90"
                      : "border border-[color:var(--color-border2)] text-[color:var(--color-muted)] hover:border-[color:var(--color-lime)] hover:text-[color:var(--color-lime)]"
                  }`}
                >
                  ANOTARME <span aria-hidden>→</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
