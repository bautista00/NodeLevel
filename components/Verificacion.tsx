import Reveal from "./Reveal";
import SectionMeta from "./SectionMeta";

const STEPS = [
  { code: "INGRESO",     desc: "El producto entra al sistema NODE." },
  { code: "INSPECCIÓN",  desc: "Análisis físico: materiales, costuras, caja, desgaste real." },
  { code: "VALIDACIÓN",  desc: "Comparación contra pares originales. Auténtico o rechazado." },
  { code: "REGISTRO",    desc: "ID único + historial digital del producto en NODE." },
  { code: "PUBLICADO",   desc: "En el market con precio validado e historial completo.", final: true },
];

export default function Verificacion() {
  return (
    <section
      id="verificacion"
      className="relative border-t border-border bg-black"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-28 md:px-12 md:py-40">
        <div className="grid grid-cols-12 gap-x-6 gap-y-16">

          {/* Izquierda — statement */}
          <div className="col-span-12 md:col-span-5">
            <Reveal>
              <SectionMeta index="005" tag="PROCESO DE VERIFICACIÓN" />
            </Reveal>
            <Reveal delay={80}>
              <h2
                className="font-display text-[clamp(56px,7vw,112px)] leading-[0.88]"
                style={{ letterSpacing: "-0.015em" }}
              >
                VERIFICADO<br />
                <span className="text-lime">POR NODE.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-sm text-[15px] leading-[1.7] text-muted">
                Cada producto que entra al market pasa por un pipeline físico y digital.
                <span className="text-text"> Sin excepciones. Sin atajos.</span>
              </p>
            </Reveal>

            {/* Verified badge */}
            <Reveal delay={260}>
              <div className="mt-12 inline-flex items-center gap-5 border border-lime/30 bg-lime/5 px-6 py-5">
                <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden>
                  <circle cx="22" cy="22" r="20" fill="none" stroke="var(--color-lime)" strokeWidth="1" />
                  <path d="M 13 22 L 19 28 L 32 16" fill="none" stroke="var(--color-lime)" strokeWidth="1.5" strokeLinecap="square" />
                </svg>
                <div>
                  <div className="font-display text-[16px] tracking-[0.06em]">
                    VERIFIED BY <span className="text-lime">NODE</span>
                  </div>
                  <div className="mt-1 font-mono text-[9px] tracking-[0.2em] text-muted">
                    AUTENTICIDAD · HISTORIAL · CONFIANZA
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Derecha — pipeline vertical */}
          <div className="col-span-12 md:col-span-7">
            <div className="relative flex flex-col">
              {/* vertical line */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-[21px] top-6 bottom-6 w-px bg-border"
              />

              {STEPS.map((s, i) => (
                <Reveal key={s.code} delay={80 + i * 80}>
                  <div className="relative flex gap-6 pb-8 last:pb-0">
                    {/* node circle */}
                    <div
                      className={`relative z-10 mt-1 flex h-[44px] w-[44px] shrink-0 items-center justify-center border font-display text-[14px] ${
                        s.final
                          ? "border-lime bg-lime/10 text-lime"
                          : "border-border2 bg-black text-muted"
                      }`}
                    >
                      {s.final ? "✓" : String(i + 1).padStart(2, "0")}
                    </div>

                    {/* content */}
                    <div className="flex-1 border-b border-border pb-8 last:border-0">
                      <div
                        className={`font-display text-[22px] tracking-[0.04em] ${
                          s.final ? "text-lime" : "text-text"
                        }`}
                      >
                        {s.code}
                      </div>
                      <p className="mt-1 text-[13px] leading-[1.6] text-muted">
                        {s.desc}
                      </p>
                      {s.final && (
                        <div className="mt-3 inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-lime">
                          <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                          READY FOR MARKET
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
