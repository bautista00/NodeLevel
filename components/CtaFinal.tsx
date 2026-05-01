"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";

type Status = "idle" | "loading" | "success" | "error";

export default function CtaFinal() {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, city }),
      });
      const data = await res.json();
      if (!data.ok) {
        setStatus("error");
        setError(data.error || "Algo salió mal");
        return;
      }
      setCode(data.code);
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Error de red");
    }
  }

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden bg-[color:var(--color-black)]"
    >
      {/* lima glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 80%, rgba(198,255,61,0.08) 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-[1100px] px-6 py-32 text-center md:px-12 md:py-44">
        <Reveal>
          <div className="inline-flex items-center gap-3 border border-[color:var(--color-border2)] bg-[color:var(--color-surface)] px-4 py-2 font-mono text-[10px] tracking-[0.3em] text-[color:var(--color-lime)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--color-lime)]" />
            FOUNDERS · 100 SPOTS LIMITADOS
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2
            className="mt-10 font-display leading-[0.9] text-[clamp(64px,11vw,180px)]"
            style={{ letterSpacing: "-0.015em" }}
          >
            <span className="text-outline">JOIN</span><br />
            THE <span className="text-[color:var(--color-lime)]">MOVEMENT.</span>
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-8 max-w-xl text-[15px] leading-[1.7] text-[color:var(--color-muted)]">
            Estamos construyendo el sistema de verificación líder en Argentina.
            <span className="text-[color:var(--color-text)]"> Anotate y sé de los primeros en entrar.</span>
          </p>
        </Reveal>

        <div className="mx-auto mt-12 max-w-xl">
          <AnimatePresence mode="wait">
            {status !== "success" ? (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-3"
              >
                <div className="flex flex-col gap-2 md:flex-row">
                  <input
                    type="email"
                    required
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 border border-[color:var(--color-border2)] bg-[color:var(--color-surface)] px-4 py-4 font-mono text-[13px] text-[color:var(--color-text)] outline-none placeholder:text-[color:var(--color-dim)] focus:border-[color:var(--color-lime)]"
                    disabled={status === "loading"}
                  />
                  <input
                    type="text"
                    placeholder="ciudad"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border border-[color:var(--color-border2)] bg-[color:var(--color-surface)] px-4 py-4 font-mono text-[13px] text-[color:var(--color-text)] outline-none placeholder:text-[color:var(--color-dim)] focus:border-[color:var(--color-lime)] md:w-40"
                    disabled={status === "loading"}
                  />
                  <button
                    type="submit"
                    data-magnetic
                    disabled={status === "loading"}
                    className="bg-[color:var(--color-lime)] px-6 py-4 font-mono text-[12px] font-bold tracking-[0.18em] text-[#000] transition-opacity hover:opacity-90 disabled:opacity-50"
                  >
                    {status === "loading" ? "ENVIANDO..." : "QUIERO ENTRAR →"}
                  </button>
                </div>

                {error ? (
                  <div className="font-mono text-[10px] tracking-[0.15em] text-[color:var(--color-danger)]">
                    [ERROR] {error}
                  </div>
                ) : null}

                <ul className="mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[10px] tracking-[0.15em] text-[color:var(--color-dim)]">
                  <li className="flex items-center gap-2">
                    <span className="text-[color:var(--color-lime)]">✓</span>
                    Sin spam
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[color:var(--color-lime)]">✓</span>
                    Acceso prioritario al beta
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[color:var(--color-lime)]">✓</span>
                    Founders limitado a 100 spots
                  </li>
                </ul>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="border border-[color:var(--color-lime)] bg-[color:var(--color-surface)] p-8 text-center"
              >
                <div className="font-mono text-[11px] tracking-[0.3em] text-[color:var(--color-lime)]">
                  ▸ ESTÁS EN LA LISTA
                </div>
                <div className="mt-5 inline-block border border-dashed border-[color:var(--color-lime)] px-6 py-3 font-display text-[44px] tracking-[0.4em] text-[color:var(--color-lime)]">
                  {code}
                </div>
                <p className="mt-5 font-mono text-[11px] leading-[1.8] tracking-[0.1em] text-[color:var(--color-muted)]">
                  Guardá este código. Te avisamos cuando abramos el acceso.<br />
                  Bienvenido al sistema NODE.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
