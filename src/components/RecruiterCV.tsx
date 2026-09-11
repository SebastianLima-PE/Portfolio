"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download } from "lucide-react";
import { useState } from "react";
import { site } from "@/lib/data";
import { EASE_IN_OUT } from "./Reveal";

/**
 * La pregunta segmenta al visitante en vez de obligarlo a elegir entre dos
 * botones: quien es reclutador se identifica solo y encuentra lo suyo, y a
 * quien no lo es no le ocupa espacio. Por eso el CV vive detrás de un gesto
 * y no compitiendo con el CTA principal en el hero.
 *
 * Si `site.cv` está vacío no se renderiza nada, así que nunca hay una
 * pregunta que al abrirse no lleve a ningún sitio.
 */
export default function RecruiterCV({
  variant = "inline",
  className = "",
}: {
  variant?: "inline" | "menu";
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  if (!site.cv) return null;

  const enMenu = variant === "menu";

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={
          enMenu
            ? "w-full rounded-full px-8 py-2 text-center text-sm font-medium text-zinc-400 transition-colors duration-150 ease-out hover:bg-white/5 hover:text-white"
            : "rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-[color,border-color] duration-150 ease-out hover:border-white/25 hover:text-white"
        }
      >
        ¿Eres reclutador?
      </button>

      {/*
        Altura animada: es un desplegable, el único caso donde la skill de
        animación tolera animar `height` porque no hay equivalente en
        transform. 220ms y ease-in-out, que es lo que corresponde a algo que
        se morfa en pantalla en vez de entrar o salir.
      */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: EASE_IN_OUT }}
            className="overflow-hidden"
          >
            <a
              href={site.cv}
              download
              className={
                enMenu
                  ? "mt-1 flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-2 text-sm font-bold text-white transition-[transform,background-color] duration-150 ease-out hover:scale-105 hover:bg-accent-strong active:scale-95"
                  : "mt-3 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-white shadow-[0_0_20px_-4px_var(--color-accent)] transition-[transform,background-color,box-shadow] duration-150 ease-out hover:scale-105 hover:bg-accent-strong hover:shadow-[0_0_34px_-2px_var(--color-accent)] active:scale-95"
              }
            >
              Descargar CV
              <Download className="h-4 w-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
