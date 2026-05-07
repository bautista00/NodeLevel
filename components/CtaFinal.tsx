"use client";

import Reveal from "./Reveal";
import WaitlistForm from "./WaitlistForm";

export default function CtaFinal() {
  return (
    <section
      id="waitlist"
      className="relative overflow-hidden border-t border-border bg-black"
    >
      <span id="waitlist-free" className="absolute top-0" aria-hidden />
      <span id="waitlist-gold" className="absolute top-0" aria-hidden />
      <span id="waitlist-black" className="absolute top-0" aria-hidden />
      <span id="waitlist-founders" className="absolute top-0" aria-hidden />
      {/* lima glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 80%, rgba(198,255,61,0.08) 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-[1100px] px-6 py-40 text-center md:px-12 md:py-56">
        <Reveal>
          <div className="inline-flex items-center gap-3 border border-border2 bg-surface px-4 py-2 font-mono text-[10px] tracking-[0.3em] text-lime">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
            FOUNDERS · 100 SPOTS LIMITADOS
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2
            className="mt-10 font-display leading-[0.9] text-[clamp(64px,11vw,180px)]"
            style={{ letterSpacing: "-0.015em" }}
          >
            <span className="text-outline">JOIN</span><br />
            THE <span className="text-lime">MOVEMENT.</span>
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-8 max-w-xl text-[15px] leading-[1.7] text-muted">
            Estamos abriendo una beta privada para compradores y vendedores de cultura urbana verificada en Argentina.
            <span className="text-text"> Anotate y recibí prioridad de acceso cuando abramos el market.</span>
          </p>
        </Reveal>

        <div className="mx-auto mt-12 max-w-xl">
          <WaitlistForm source="cta-final" defaultTier="FOUNDERS" />
        </div>
      </div>
    </section>
  );
}
