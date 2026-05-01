"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const LINKS = [
  { href: "#solucion", label: "Cómo funciona" },
  { href: "#verificacion", label: "Verificación" },
  { href: "#membresias", label: "Membresías" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-6 py-4 transition-all duration-300 md:px-12 ${
        scrolled
          ? "border-b border-[color:var(--color-border)] bg-black/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <a href="#hero" className="flex items-center gap-3" data-magnetic>
        <Image
          src="/logo-node.png"
          alt="Node Level"
          width={40}
          height={40}
          priority
          className="h-9 w-9 object-contain"
        />
        <span className="font-display text-[18px] tracking-[0.3em] text-[color:var(--color-lime)]">
          NODELEVEL
        </span>
      </a>

      <ul className="hidden items-center gap-9 md:flex">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              data-magnetic
              className="font-mono text-[11px] tracking-[0.2em] text-[color:var(--color-muted)] transition-colors hover:text-[color:var(--color-lime)]"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="hidden items-center gap-4 md:flex">
        <span className="hidden font-mono text-[10px] tracking-[0.2em] text-[color:var(--color-dim)] lg:inline">
          [v0.1.0 — BETA]
        </span>
        <a
          href="#waitlist"
          data-magnetic
          className="inline-flex items-center gap-2 bg-[color:var(--color-lime)] px-5 py-2.5 font-mono text-[11px] font-bold tracking-[0.18em] text-[#000] transition-opacity hover:opacity-90"
        >
          UNIRSE A LA LISTA <span aria-hidden>→</span>
        </a>
      </div>

      {/* mobile burger */}
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] border border-[color:var(--color-border2)] md:hidden"
      >
        <span
          className={`block h-px w-4 bg-[color:var(--color-text)] transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
        />
        <span
          className={`block h-px w-4 bg-[color:var(--color-text)] transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
        />
      </button>

      {/* mobile menu */}
      <div
        className={`absolute inset-x-0 top-full origin-top border-b border-[color:var(--color-border)] bg-black/95 backdrop-blur-md md:hidden ${
          open ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col gap-4 px-6 py-6">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block font-mono text-[12px] tracking-[0.2em] text-[color:var(--color-muted)]"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#waitlist"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 bg-[color:var(--color-lime)] px-5 py-3 font-mono text-[11px] font-bold tracking-[0.18em] text-[#000]"
            >
              UNIRSE A LA LISTA →
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

