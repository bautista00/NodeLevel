"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import SectionMeta from "./SectionMeta";

type QA = { q: string; a: string };

const FAQS: QA[] = [
  {
    q: "¿Cómo sé que el producto es auténtico?",
    a: "Cada producto pasa por nuestro proceso de 7 pasos antes de publicarse. Recibe un ID único, criterios de validación y un tag Verified by Node para consultar autenticidad, estado real e historial.",
  },
  {
    q: "¿Qué está disponible durante la beta?",
    a: "La beta abre acceso por etapas a waitlist, referencias de precio, comunidad y primeros drops verificados. El marketplace completo, Ask/Bid y datos en tiempo real se activan progresivamente.",
  },
  {
    q: "¿Puedo vender en NODE?",
    a: "Sí. Podés dejar tu intención como seller en la waitlist. En la beta, el equipo de NODE prioriza productos que puedan verificarse físicamente antes de entrar al market.",
  },
  {
    q: "¿Cómo funciona el sistema de precios?",
    a: "Durante la beta mostramos precios de referencia y tendencia. El sistema Ask/Bid se activa en la siguiente etapa para formar precio por oferta y demanda real, con historial visible.",
  },
  {
    q: "¿Dónde entregan los productos?",
    a: "Operamos en Argentina con envíos a todo el país. La expansión a Latinoamérica está en la hoja de ruta para 2026–2027.",
  },
  {
    q: "¿Qué pasa si el producto es rechazado?",
    a: "Si un producto no pasa la verificación, se devuelve al vendedor. El comprador nunca recibe un producto no verificado y obtiene reembolso automático.",
  },
  {
    q: "¿Qué son los drops exclusivos?",
    a: "Son lanzamientos de productos en cantidad limitada con acceso según tu membresía. Los tiers Gold, Black y Founders tienen prioridad o acceso anticipado.",
  },
  {
    q: "¿Cómo subo de nivel en la comunidad?",
    a: "Tu nivel aumenta con actividad: compras, ventas verificadas, tiempo de membresía y participación. Cada nivel desbloquea nuevos beneficios.",
  },
  {
    q: "¿Cómo me contacto con NODE?",
    a: "Podés escribir a hola@nodelevel.com. Los miembros Black y Founders tendrán soporte prioritario directo cuando se abra el acceso privado.",
  },
  {
    q: "¿Qué hacen con mi email?",
    a: "Lo usamos solo para avisarte sobre apertura del beta, prioridad Founders y próximos drops verificados. No vendemos tu información ni enviamos spam.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative border-t border-border bg-surface2"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-28 md:px-12 md:py-40">
        <div className="mb-16 grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <SectionMeta index="009" tag="PREGUNTAS FRECUENTES" />
            </Reveal>
            <Reveal delay={80}>
              <h2
                className="font-display text-[clamp(56px,8vw,128px)] leading-[0.88]"
                style={{ letterSpacing: "-0.015em" }}
              >
                LO QUE TODOS<br />
                <span className="text-outline-lime">PREGUNTAN.</span>
              </h2>
            </Reveal>
          </div>
          <div className="col-span-12 mt-6 md:col-span-5 md:mt-0 md:flex md:items-end">
            <Reveal delay={140}>
              <p className="max-w-md text-[15px] leading-[1.7] text-muted">
                ¿Algo que no está acá?
                <a
                  href="mailto:hola@nodelevel.com"
                  data-magnetic
                  className="ml-1 text-lime underline-offset-4 hover:underline"
                >
                  hola@nodelevel.com
                </a>
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="border-t border-border">
          {FAQS.map((qa, i) => {
            const isOpen = open === i;
            return (
              <li
                key={qa.q}
                className="border-b border-border"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  data-magnetic
                  className="flex w-full cursor-pointer items-start justify-between gap-6 px-1 py-6 text-left transition-colors duration-200 hover:text-lime"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-6">
                    <span className="mt-1 font-mono text-[10px] tracking-[0.25em] text-dim">
                      Q.{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[16px] font-medium text-text md:text-[18px]">
                      {qa.q}
                    </span>
                  </div>
                  <span
                    aria-hidden
                    className={`shrink-0 font-mono text-[16px] text-lime transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.35, ease: [0.22, 0.61, 0.36, 1] },
                        opacity: { duration: 0.25 },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-6 px-1 pb-7 md:grid-cols-12">
                        <div className="md:col-span-2" />
                        <p className="text-[14px] leading-[1.7] text-muted md:col-span-9">
                          {qa.a}
                        </p>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
