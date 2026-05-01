import Image from "next/image";
import Reveal from "./Reveal";

export default function Manifiesto() {
  return (
    <section
      id="manifiesto"
      className="relative isolate overflow-hidden border-y border-[color:var(--color-border)] bg-[color:var(--color-black)]"
    >
      {/* Imagen tratada (duotone-ish) al fondo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/manifiesto-bg.jpg"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover"
          style={{
            filter: "grayscale(100%) contrast(1.25) brightness(0.55)",
          }}
        />
        {/* duotone overlay verde lima → negro */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(198,255,61,0.08) 0%, rgba(5,5,5,0.85) 60%, rgba(5,5,5,0.95) 100%)",
            mixBlendMode: "multiply",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-overlay"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(198,255,61,0.18) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.6) 2px, rgba(0,0,0,0.6) 3px)",
          }}
        />
      </div>

      <div className="mx-auto max-w-[1280px] px-6 py-32 md:px-12 md:py-48">
        <Reveal>
          <div className="mb-12 flex items-center gap-4 font-mono text-[10px] tracking-[0.3em] text-[color:var(--color-lime)]">
            <span className="h-px w-10 bg-[color:var(--color-lime)]" />
            ▸ MANIFIESTO
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h2
            className="font-display leading-[0.92] text-[clamp(64px,11vw,200px)]"
            style={{ letterSpacing: "-0.015em" }}
          >
            <span className="block text-[color:var(--color-dim)]">NODE NO COMPITE</span>
            <span className="block text-[color:var(--color-dim)]">POR VENDER MÁS.</span>
            <span className="block text-[color:var(--color-text)]">COMPITE POR</span>
            <span className="block text-[color:var(--color-lime)]">VALIDAR MEJOR.</span>
          </h2>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-14 flex flex-col items-start gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.3em] text-[color:var(--color-muted)]">
              <span className="h-px w-12 bg-[color:var(--color-border2)]" />
              MIENTRAS OTROS VENDEN HYPE
            </div>
            <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.3em] text-[color:var(--color-lime)]">
              NODE LO FILTRA
              <span className="h-px w-12 bg-[color:var(--color-lime)]" />
            </div>
          </div>
        </Reveal>

        {/* Esquinas decorativas */}
        <div aria-hidden className="pointer-events-none absolute left-6 top-6 h-8 w-8 border-l border-t border-[color:var(--color-lime)]/40 md:left-12 md:top-12" />
        <div aria-hidden className="pointer-events-none absolute right-6 top-6 h-8 w-8 border-r border-t border-[color:var(--color-lime)]/40 md:right-12 md:top-12" />
        <div aria-hidden className="pointer-events-none absolute left-6 bottom-6 h-8 w-8 border-b border-l border-[color:var(--color-lime)]/40 md:left-12 md:bottom-12" />
        <div aria-hidden className="pointer-events-none absolute right-6 bottom-6 h-8 w-8 border-b border-r border-[color:var(--color-lime)]/40 md:right-12 md:bottom-12" />
      </div>
    </section>
  );
}
