import Reveal from "./Reveal";

export default function Manifiesto() {
  return (
    <section
      id="manifiesto"
      className="relative border-t border-border bg-surface2"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-12 md:py-20">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-12">

            {/* Label */}
            <div className="flex shrink-0 items-center gap-4 font-mono text-[10px] tracking-[0.3em] text-lime">
              <span className="h-px w-8 bg-lime" />
              ▸ MANIFIESTO
            </div>

            {/* Statement */}
            <h2
              className="font-display text-[clamp(22px,3vw,44px)] leading-[1.05] md:text-center"
              style={{ letterSpacing: "-0.01em" }}
            >
              NODE NO COMPITE POR VENDER MÁS.{" "}
              <span className="text-lime">COMPITE POR VALIDAR MEJOR.</span>
            </h2>

            {/* Tagline */}
            <div className="shrink-0 text-right font-mono text-[11px] uppercase tracking-[0.18em]">
              <div className="text-muted">Mientras otros venden hype</div>
              <div className="mt-1 text-lime">NODE lo filtra →</div>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
