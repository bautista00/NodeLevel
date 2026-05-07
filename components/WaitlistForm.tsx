"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Status = "idle" | "loading" | "success" | "error";
type Variant = "hero" | "full";

type WaitlistFormProps = {
  source: string;
  defaultTier?: string;
  variant?: Variant;
};

export default function WaitlistForm({
  source,
  defaultTier = "FOUNDERS",
  variant = "full",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [tier, setTier] = useState(defaultTier);
  const [status, setStatus] = useState<Status>("idle");
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const syncTierFromHash = () => {
      const match = window.location.hash.match(/^#waitlist-(free|gold|black|founders)$/i);
      if (match) setTier(match[1].toUpperCase());
    };

    syncTierFromHash();
    window.addEventListener("hashchange", syncTierFromHash);
    return () => window.removeEventListener("hashchange", syncTierFromHash);
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, city, tier, source }),
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

  const compact = variant === "hero";

  return (
    <AnimatePresence mode="wait">
      {status !== "success" ? (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: compact ? 8 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex flex-col gap-3"
        >
          <div className={`flex flex-col gap-2 ${compact ? "md:max-w-[680px] md:flex-row" : "md:flex-row"}`}>
            <input
              type="email"
              required
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-w-0 flex-1 border border-border2 bg-surface px-4 py-4 font-mono text-[13px] text-text outline-none placeholder:text-dim focus:border-lime"
              disabled={status === "loading"}
            />
            <input
              type="text"
              placeholder="ciudad"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={`${compact ? "md:w-36" : "md:w-40"} w-full border border-border2 bg-surface px-4 py-4 font-mono text-[13px] text-text outline-none placeholder:text-dim focus:border-lime`}
              disabled={status === "loading"}
            />
            <button
              type="submit"
              data-magnetic
              disabled={status === "loading"}
              className="bg-lime px-6 py-4 font-mono text-[12px] font-bold tracking-[0.18em] text-[#000] transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {status === "loading" ? "ENVIANDO..." : compact ? "ENTRAR AL BETA →" : "QUIERO ENTRAR →"}
            </button>
          </div>

          {error ? (
            <div className="font-mono text-[10px] tracking-[0.15em] text-danger">
              [ERROR] {error}
            </div>
          ) : null}

          <ul className={`mt-2 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] tracking-[0.15em] text-dim ${compact ? "" : "justify-center"}`}>
            <li className="flex items-center gap-2">
              <span className="text-lime">✓</span>
              Sin spam
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lime">✓</span>
              Acceso prioritario al beta
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lime">✓</span>
              100 Founders limitados
            </li>
          </ul>

          <p className={`font-mono text-[10px] leading-relaxed tracking-[0.12em] text-dim ${compact ? "max-w-xl" : "text-center"}`}>
            Usamos tu email solo para avisarte la apertura del beta, prioridad Founders y próximos drops verificados.
          </p>
        </motion.form>
      ) : (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className={`${compact ? "max-w-xl p-5 text-left" : "p-8 text-center"} border border-lime bg-surface`}
        >
          <div className="font-mono text-[11px] tracking-[0.3em] text-lime">
            ▸ ESTÁS EN LA LISTA
          </div>
          <div className={`${compact ? "text-[34px]" : "text-[44px]"} mt-5 inline-block border border-dashed border-lime px-6 py-3 font-display tracking-[0.4em] text-lime`}>
            {code}
          </div>
          <p className="mt-5 font-mono text-[11px] leading-[1.8] tracking-[0.1em] text-muted">
            Guardá este código. Te avisamos por email cuando abramos el acceso al beta privado de NODE.
            <br />
            Tu intención quedó registrada como {tier}.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
