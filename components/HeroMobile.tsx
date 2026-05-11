"use client";
import HeroStat from "./HeroStat";

export default function HeroMobile({ reduced }: { reduced: boolean }) {
  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden bg-black">
      <video
        src="/hero-video.mp4"
        className="absolute inset-0 h-full w-full object-cover opacity-35"
        muted
        playsInline
        autoPlay={!reduced}
        loop={!reduced}
        preload="auto"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(5,5,5,0.6) 0%, rgba(5,5,5,0.2) 35%, rgba(5,5,5,0.95) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(198,255,61,1) 1px, transparent 1px), linear-gradient(90deg, rgba(198,255,61,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-between px-6 pt-24 font-mono text-[10px] tracking-[0.2em] text-muted">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
          NODE / SYSTEM
        </span>
        <span>−34.6° / −58.4°</span>
      </div>

      <div className="relative z-20 flex min-h-screen flex-col justify-center px-6 pb-20 pt-32">
        <div className="mb-5 font-mono text-[10px] tracking-[0.3em] text-lime">
          ▸ PLATAFORMA DE CULTURA URBANA
        </div>
        <h1 className="font-display text-[clamp(56px,16vw,120px)] leading-[0.86]">
          FILTRAMOS<br />
          <span className="text-lime">HYPE.</span><br />
          <span className="text-outline">VALIDAMOS</span><br />
          TODO.
        </h1>
        <p className="mt-6 max-w-md text-[14px] leading-relaxed text-muted">
          Verificación + Mercado. Un sistema donde la cultura urbana se ordena, se valida y sube de nivel.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#waitlist"
            className="inline-flex cursor-pointer items-center gap-2 bg-lime px-6 py-3.5 font-mono text-[11px] font-bold tracking-[0.18em] text-[#000]"
          >
            ENTRAR AL BETA <span aria-hidden>→</span>
          </a>
          <a
            href="#solucion"
            className="inline-flex cursor-pointer items-center gap-2 border border-border2 px-6 py-3.5 font-mono text-[11px] tracking-[0.18em] text-muted"
          >
            CÓMO FUNCIONA <span aria-hidden>↓</span>
          </a>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-6">
          <HeroStat num="3" label="PILARES" />
          <HeroStat num="7" label="VERIFICACIÓN" />
          <HeroStat num="4" label="TIERS" />
          <HeroStat num="100%" label="VERIFIED" />
        </div>
      </div>
    </section>
  );
}
