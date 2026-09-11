"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { hero, site } from "@/lib/data";
import { EASE_OUT, REVEAL, VIEWPORT } from "./Reveal";
import { TECH_ICONS } from "./tech-icons";

/**
 * Sin `transition` dentro de la variante: si la variante lo define, gana sobre
 * la prop `transition` y los delays escalonados se ignoran en silencio.
 */
const fadeUp = {
  hidden: { opacity: 0, transform: "translateY(32px)" },
  visible: { opacity: 1, transform: "translateY(0px)" },
};

export default function Hero() {
  // El ref va en la primera pantalla, no en la sección entera: el parallax
  // debe agotarse cuando el título sale de vista, no cuando termina el bloque
  // de la propuesta de valor.
  const ref = useRef<HTMLDivElement>(null);
  // Quien pide menos movimiento no recibe parallax: es desplazamiento puro y
  // no comunica nada que el texto no diga ya.
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -110]);
  const avatarY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -210]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Cadena transform completa en vez de los atajos x/y: los atajos de Motion
  // no van acelerados por hardware y sueltan fotogramas bajo carga.
  const textTransform = useMotionTemplate`translateY(${textY}px)`;
  const avatarTransform = useMotionTemplate`translateY(${avatarY}px)`;
  const glowTransform = useMotionTemplate`translateY(${glowY}px)`;

  return (
    <section id="top" className="relative">
      {/* ---------- Pantalla 1: solo el título y el avatar ---------- */}
      <div
        ref={ref}
        className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 pt-24 pb-12"
      >
        <motion.div
          aria-hidden
          style={{ transform: glowTransform }}
          className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[140px]"
        />

        <motion.div
          style={{ transform: textTransform, opacity: fadeOut }}
          className="relative flex w-full max-w-[1500px] flex-col items-center"
        >
          <h1 className="flex w-full flex-col items-center font-black tracking-tighter uppercase">
            {/* Línea 1: entra primero */}
            <motion.span
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ ...REVEAL, delay: 0.05 }}
              className="block text-[min(26vw,52vh,30rem)] leading-[0.82] text-white"
            >
              {hero.lineOne}
            </motion.span>

            {/* Línea 2: entra un instante después, interrumpida por el avatar */}
            <span className="relative flex w-full items-center justify-center">
              <motion.span
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={{ ...REVEAL, delay: 0.2 }}
                className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-[min(13.4vw,26.7vh,15.4rem)] leading-[0.85] text-transparent"
              >
                {hero.lineTwo}
              </motion.span>

              {/*
                Capa externa: parallax (`y` por scroll).
                Capa interna: entrada con resorte + flotación infinita.
                Separadas porque ambas animan `y` y se pisarían en un solo nodo.
              */}
              <motion.div
                style={{ transform: avatarTransform }}
                className="pointer-events-none absolute top-1/2 left-1/2 z-20 w-[min(34vw,26rem)] -translate-x-1/2 -translate-y-[52%]"
              >
                {/* Flotacion: animacion CSS, corre fuera del hilo principal */}
                <div className="animate-float">
                  <motion.div
                    initial={{ opacity: 0, transform: "scale(0.92)" }}
                    animate={{ opacity: 1, transform: "scale(1)" }}
                    transition={{
                      // Resorte porque el avatar debe sentirse vivo al entrar.
                      // Nunca desde scale(0): nada aparece de la nada.
                      transform: {
                        type: "spring",
                        duration: 0.5,
                        bounce: 0.25,
                        delay: 0.35,
                      },
                      opacity: { duration: 0.3, ease: EASE_OUT, delay: 0.35 },
                    }}
                  >
                    {/*
                    El PNG ya viene recortado, así que drop-shadow sigue el
                    contorno real de la silueta (no una caja) y despega al
                    avatar de las letras blancas sin ningún halo circular.
                  */}
                    <Image
                      src="/avatar.png"
                      alt="Avatar 3D de Sebastián"
                      width={640}
                      height={640}
                      priority
                      className="h-auto w-full drop-shadow-[0_18px_40px_rgba(0,0,0,0.75)]"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </span>
          </h1>
        </motion.div>

        {/*
          Señal de scroll: en un hero a pantalla completa nada indica que hay
          más abajo. Va `fixed` y no `absolute` a propósito: anclado a la
          sección se sale de pantalla en cuanto el hero supera el viewport.
          Y va a la esquina, no centrado: en el centro está el avatar.
          Se desvanece con el propio progreso del scroll, así que desaparece
          en cuanto cumple su función.
        */}
        <motion.div
          aria-hidden
          style={{ opacity: fadeOut }}
          className="pointer-events-none fixed bottom-7 left-6 z-30 flex items-center gap-3 sm:left-10"
        >
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/15 p-1">
            <span className="animate-scroll-dot h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        </motion.div>
      </div>

      {/* ---------- Pantalla 2: la propuesta de valor ---------- */}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-28 md:flex-row md:items-end md:justify-between">
        {/*
          Estos bloques ya nacen bajo el pliegue, así que se revelan con
          `whileInView` y no al cargar la página: si usaran `animate`, su
          animación se habría consumido antes de que nadie los viera.
        */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          transition={REVEAL}
          className="flex max-w-lg flex-col items-start gap-5"
        >
          {site.available && (
            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-zinc-300 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
              </span>
              Disponible para trabajar
            </span>
          )}

          <p className="text-left text-lg leading-relaxed font-medium text-zinc-400 md:text-xl">
            {hero.tagline}
          </p>

          {/*
            Un solo CTA. El CV no compite aqui: vive detras de la pregunta
            "¿Eres reclutador?" en el menu y en la seccion "Sobre mi", donde
            quien lo busca se identifica solo.
          */}
          <a
            href={site.bookingUrl}
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-white shadow-[0_0_20px_-4px_var(--color-accent)] transition-[transform,background-color,box-shadow] duration-150 ease-out hover:scale-105 hover:bg-accent-strong hover:shadow-[0_0_34px_-2px_var(--color-accent)] active:scale-95"
          >
            {hero.cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-1" />
          </a>
        </motion.div>

        {/*
          Bloque compacto y etiquetado en lugar de una fila larga de píldoras
          sueltas: con max-w-sm las etiquetas envuelven en dos líneas y el
          grupo se lee como una unidad anclada, no como texto flotando.
        */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          transition={{ ...REVEAL, delay: 0.12 }}
          className="flex max-w-sm flex-col gap-3 md:items-end"
        >
          <div className="flex flex-wrap gap-2 md:justify-end">
            {hero.badges.map((badge) => {
              const entry = badge.icon ? TECH_ICONS[badge.icon] : undefined;
              const Icon = entry?.Icon;

              return (
                <span
                  key={badge.label}
                  style={{ "--brand": entry?.brand } as CSSProperties}
                  className="group flex cursor-default items-center gap-2 rounded-full border border-white/10 bg-zinc-900/60 px-4 py-2 text-sm text-zinc-300 backdrop-blur-sm transition-[transform,color,border-color] duration-150 ease-out hover:scale-105 hover:border-white/25 hover:text-white"
                >
                  {Icon && (
                    <Icon className="h-3.5 w-3.5 text-zinc-500 transition-colors group-hover:text-[var(--brand)]" />
                  )}
                  {badge.label}
                </span>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
