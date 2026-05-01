import Reveal from "./Reveal";
import SectionMeta from "./SectionMeta";

const PAINS = [
  {
    code: "ERR / 01",
    title: "Falta de confianza",
    desc: "Réplicas y falsificaciones circulan sin control en el mercado informal.",
  },
  {
    code: "ERR / 02",
    title: "Precios desordenados",
    desc: "Sin referencia clara de mercado, cada uno pone el precio que quiere.",
  },
  {
    code: "ERR / 03",
    title: "Caos en plataformas",
    desc: "La reventa informal no tiene estructura, datos ni protección para el comprador.",
  },
];

export default function Problema() {
  return (
    <section
      id="problema"
      className="relative bg-[color:var(--color-black)]"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-12 gap-x-6 gap-y-12 px-6 py-28 md:px-12 md:py-40">
        {/* IZQUIERDA — quote masiva */}
        <div className="col-span-12 md:col-span-7">
          <Reveal>
            <SectionMeta index="003" tag="EL MERCADO" />
          </Reveal>
          <Reveal delay={80}>
            <h2
              className="font-display text-[clamp(56px,8.5vw,140px)] leading-[0.88]"
              style={{ letterSpacing: "-0.015em" }}
            >
              EL MERCADO<br />
              <span className="text-outline-dim">ESTÁ</span>{" "}
              <span className="text-[color:var(--color-lime)]">ROTO.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-10 max-w-md text-[15px] leading-[1.7] text-[color:var(--color-muted)]">
              El usuario compra con incertidumbre. Sin datos, sin confianza, sin referencia.
              <span className="text-[color:var(--color-text)]"> NODE nace para resolver eso.</span>
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-10 inline-flex items-center gap-3 border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-[color:var(--color-danger)]" />
              <span className="font-mono text-[10px] tracking-[0.25em] text-[color:var(--color-muted)]">
                STATUS: BROKEN MARKET
              </span>
            </div>
          </Reveal>
        </div>

        {/* DERECHA — chips desfasadas */}
        <div className="col-span-12 md:col-span-5">
          <ul className="flex flex-col gap-4">
            {PAINS.map((p, i) => (
              <Reveal
                key={p.code}
                as="li"
                delay={140 + i * 100}
                className={i === 1 ? "md:translate-x-6" : i === 2 ? "md:translate-x-12" : ""}
              >
                <div className="group relative flex items-start gap-5 border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5 transition-colors hover:border-[color:var(--color-danger)]">
                  <div className="flex flex-col items-start">
                    <span className="font-mono text-[9px] tracking-[0.25em] text-[color:var(--color-dim)]">
                      {p.code}
                    </span>
                    <span className="mt-1 text-[18px] leading-none text-[color:var(--color-danger)]">
                      ✗
                    </span>
                  </div>
                  <div>
                    <div className="text-[15px] font-medium text-[color:var(--color-text)]">
                      {p.title}
                    </div>
                    <div className="mt-1 text-[13px] leading-[1.55] text-[color:var(--color-muted)]">
                      {p.desc}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={520}>
            <p className="mt-10 max-w-sm font-mono text-[11px] uppercase leading-[1.7] tracking-[0.15em] text-[color:var(--color-dim)]">
              <span className="text-[color:var(--color-text)]">Resultado:</span>{" "}
              el usuario compra con incertidumbre. Sin datos. Sin confianza.
            </p>
          </Reveal>
        </div>
      </div>

      {/* línea lima sutil cerrando la sección */}
      <div className="mx-auto h-px max-w-[1280px] bg-gradient-to-r from-transparent via-[color:var(--color-border)] to-transparent" />
    </section>
  );
}
