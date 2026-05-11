import Image from "next/image";
import SectionLink from "./SectionLink";

const COLS = [
  {
    title: "PLATAFORMA",
    links: [
      { label: "Marketplace beta", href: "#waitlist" },
      { label: "Drops exclusivos", href: "#membresias" },
      { label: "Verificación", href: "#verificacion" },
      { label: "Membresías", href: "#membresias" },
      { label: "Vender en NODE", href: "#waitlist-founders" },
    ],
  },
  {
    title: "AYUDA",
    links: [
      { label: "Preguntas frecuentes", href: "#faq" },
      { label: "Cómo funciona", href: "#solucion" },
      { label: "Proceso de envío", href: "#verificacion" },
      { label: "Contacto", href: "mailto:hola@nodelevel.com" },
      { label: "Reportar problema", href: "mailto:hola@nodelevel.com" },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { label: "Términos beta", href: "#faq" },
      { label: "Privacidad", href: "#waitlist" },
      { label: "Política de autenticidad", href: "#verificacion" },
      { label: "Política de envíos", href: "#faq" },
      { label: "Reembolsos", href: "#faq" },
    ],
  },
];

const SOCIALS = [
  { code: "IG", label: "Instagram próximamente" },
  { code: "TT", label: "TikTok próximamente" },
  { code: "X", label: "Twitter / X próximamente" },
  { code: "YT", label: "YouTube próximamente" },
  { code: "DC", label: "Discord próximamente" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-surface">
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
            <div className="mt-4 font-mono text-[10px] tracking-[0.25em] text-muted">
              FILTRAMOS HYPE · VALIDAMOS TODO
            </div>

            <div className="mt-8 flex gap-2">
              {SOCIALS.map((s) => (
                <span
                  key={s.code}
                  aria-label={s.label}
                  title={s.label}
                  className="flex h-10 w-10 cursor-not-allowed items-center justify-center border border-border2 font-mono text-[10px] tracking-[0.15em] text-dim"
                >
                  {s.code}
                </span>
              ))}
            </div>

            <div className="mt-10 inline-flex items-center gap-3 border border-border px-3 py-2 font-mono text-[10px] tracking-[0.2em] text-dim">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
              SYSTEM ONLINE · BUENOS AIRES
            </div>
          </div>

          {/* Cols */}
          {COLS.map((c) => (
            <div key={c.title} className="col-span-6 md:col-span-2">
              <div className="mb-5 font-mono text-[9px] tracking-[0.3em] text-lime">
                {c.title}
              </div>
              <ul className="flex flex-col gap-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <SectionLink
                      href={l.href}
                      data-magnetic
                      className="text-[13px] text-muted transition-colors hover:text-text"
                    >
                      {l.label}
                    </SectionLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Coords / contact */}
          <div className="col-span-12 md:col-span-1">
            <div className="mb-5 font-mono text-[9px] tracking-[0.3em] text-lime">
              ORIGEN
            </div>
            <div className="font-mono text-[11px] leading-[1.9] text-muted">
              −34.6° S<br />
              −58.4° W<br />
              ARG / LATAM
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 md:flex-row md:items-center">
          <span className="font-mono text-[10px] tracking-[0.15em] text-dim">
            © {year} NODE LEVEL — TODOS LOS DERECHOS RESERVADOS
          </span>
          <span className="font-mono text-[10px] tracking-[0.15em] text-dim">
            v0.1.0 · BUILD {year}.05.01 · BUENOS AIRES
          </span>
        </div>
      </div>

      {/* HUGE typographic background */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden border-t border-border"
      >
        <div
          className="font-display text-surface2 leading-[0.85]"
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
