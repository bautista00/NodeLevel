import Image from "next/image";

const COLS = [
  {
    title: "PLATAFORMA",
    links: [
      "Marketplace",
      "Drops exclusivos",
      "Verificación",
      "Membresías",
      "Vender en NODE",
    ],
  },
  {
    title: "AYUDA",
    links: [
      "Preguntas frecuentes",
      "Cómo funciona",
      "Proceso de envío",
      "Contacto",
      "Reportar problema",
    ],
  },
  {
    title: "LEGAL",
    links: [
      "Términos de uso",
      "Privacidad",
      "Política de autenticidad",
      "Política de envíos",
      "Reembolsos",
    ],
  },
];

const SOCIALS = [
  { code: "IG", label: "Instagram", href: "#" },
  { code: "TT", label: "TikTok", href: "#" },
  { code: "X", label: "Twitter / X", href: "#" },
  { code: "YT", label: "YouTube", href: "#" },
  { code: "DC", label: "Discord", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
      <div className="mx-auto max-w-[1280px] px-6 pb-10 pt-20 md:px-12 md:pb-14 md:pt-24">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          {/* Brand */}
          <div className="col-span-12 md:col-span-5">
            <Image
              src="/logo-titulo.png"
              alt="NODE LEVEL"
              width={400}
              height={120}
              className="h-20 w-auto object-contain"
              style={{ filter: "brightness(1.1)" }}
            />
            <div className="mt-4 font-mono text-[10px] tracking-[0.25em] text-[color:var(--color-muted)]">
              FILTRAMOS HYPE · VALIDAMOS TODO
            </div>

            <div className="mt-8 flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.code}
                  href={s.href}
                  data-magnetic
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center border border-[color:var(--color-border2)] font-mono text-[10px] tracking-[0.15em] text-[color:var(--color-muted)] transition-colors hover:border-[color:var(--color-lime)] hover:text-[color:var(--color-lime)]"
                >
                  {s.code}
                </a>
              ))}
            </div>

            <div className="mt-10 inline-flex items-center gap-3 border border-[color:var(--color-border)] px-3 py-2 font-mono text-[10px] tracking-[0.2em] text-[color:var(--color-dim)]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--color-lime)]" />
              SYSTEM ONLINE · BUENOS AIRES
            </div>
          </div>

          {/* Cols */}
          {COLS.map((c) => (
            <div key={c.title} className="col-span-6 md:col-span-2">
              <div className="mb-5 font-mono text-[9px] tracking-[0.3em] text-[color:var(--color-lime)]">
                {c.title}
              </div>
              <ul className="flex flex-col gap-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      data-magnetic
                      className="text-[13px] text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-text)]"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Coords / contact */}
          <div className="col-span-12 md:col-span-1">
            <div className="mb-5 font-mono text-[9px] tracking-[0.3em] text-[color:var(--color-lime)]">
              ORIGEN
            </div>
            <div className="font-mono text-[11px] leading-[1.9] text-[color:var(--color-muted)]">
              −34.6° S<br />
              −58.4° W<br />
              ARG / LATAM
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[color:var(--color-border)] pt-6 md:flex-row md:items-center">
          <span className="font-mono text-[10px] tracking-[0.15em] text-[color:var(--color-dim)]">
            © {year} NODE LEVEL — TODOS LOS DERECHOS RESERVADOS
          </span>
          <span className="font-mono text-[10px] tracking-[0.15em] text-[color:var(--color-dim)]">
            v0.1.0 · BUILD {year}.05.01 · BUENOS AIRES
          </span>
        </div>
      </div>

      {/* HUGE typographic background */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden border-t border-[color:var(--color-border)]"
      >
        <div
          className="font-display text-[color:var(--color-surface2)] leading-[0.85]"
          style={{
            fontSize: "clamp(120px, 22vw, 360px)",
            letterSpacing: "-0.04em",
            textAlign: "center",
            paddingTop: "16px",
            paddingBottom: "0",
          }}
        >
          NODE LEVEL
        </div>
      </div>
    </footer>
  );
}
