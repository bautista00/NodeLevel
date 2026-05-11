"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWaitlistForm } from "@/lib/useWaitlistForm";

const STORAGE_KEY = "nl_popup_dismissed";
const DELAY_MS = 7_000;

export default function WaitlistPopup() {
  const [visible, setVisible] = useState(false);
  const { email, setEmail, status, code, error, onSubmit } = useWaitlistForm("popup");

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => setVisible(true), DELAY_MS);

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
        clearTimeout(timer);
      }
    };

    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  // Guardar en localStorage cuando el submit fue exitoso
  useEffect(() => {
    if (status === "success") localStorage.setItem(STORAGE_KEY, "submitted");
  }, [status]);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "dismissed");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
            onClick={dismiss}
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 bottom-8 z-[100] mx-auto max-w-lg border border-border2 bg-surface md:inset-x-auto md:left-1/2 md:-translate-x-1/2"
          >
            <div className="h-[2px] w-full bg-lime" />

            <div className="p-8">
              <button
                onClick={dismiss}
                aria-label="Cerrar"
                className="absolute right-4 top-4 font-mono text-[18px] leading-none text-dim transition-colors hover:text-text"
              >
                ×
              </button>

              {status !== "success" ? (
                <>
                  <div className="font-mono text-[10px] tracking-[0.3em] text-lime">
                    ▸ ACCESO FOUNDERS — PRECIO DE LANZAMIENTO
                  </div>
                  <h2 className="mt-3 font-display text-[38px] leading-none tracking-wider text-text md:text-[48px]">
                    15% OFF
                  </h2>
                  <p className="mt-2 font-mono text-[12px] leading-relaxed tracking-[0.08em] text-muted">
                    Solo para los primeros <span className="text-lime">100 Founders</span>.
                    Ingresá tu email y bloqueá el precio antes del lanzamiento.
                  </p>

                  <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3">
                    <div className="flex gap-2">
                      <input
                        type="email"
                        required
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === "loading"}
                        className="min-w-0 flex-1 border border-border2 bg-surface2 px-4 py-3 font-mono text-[13px] text-text outline-none placeholder:text-dim focus:border-lime"
                      />
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="bg-lime px-5 py-3 font-mono text-[11px] font-bold tracking-[0.18em] transition-opacity hover:opacity-90 disabled:opacity-50"
                        style={{ color: "#000" }}
                      >
                        {status === "loading" ? "..." : "QUIERO EL 15% →"}
                      </button>
                    </div>

                    {error && (
                      <p className="font-mono text-[10px] tracking-[0.15em] text-danger">[ERROR] {error}</p>
                    )}

                    <ul className="flex gap-4 font-mono text-[10px] tracking-[0.12em] text-dim">
                      <li className="flex items-center gap-1.5"><span className="text-lime">✓</span> Sin spam</li>
                      <li className="flex items-center gap-1.5"><span className="text-lime">✓</span> Sin tarjeta requerida</li>
                      <li className="flex items-center gap-1.5"><span className="text-lime">✓</span> 100 lugares</li>
                    </ul>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-2 text-center"
                >
                  <div className="font-mono text-[10px] tracking-[0.3em] text-lime">▸ ESTÁS EN LA LISTA</div>
                  <div className="mt-4 inline-block border border-dashed border-lime px-6 py-3 font-display text-[40px] tracking-[0.4em] text-lime">
                    {code}
                  </div>
                  <p className="mt-4 font-mono text-[11px] leading-[1.8] tracking-[0.1em] text-muted">
                    Te avisamos por email cuando abramos el acceso.<br />
                    Tu 15% OFF está reservado como Founder.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
