"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { site } from "@/lib/data";
import { useContent } from "@/lib/content";
import CvButton from "./CvButton";
import Highlight from "./Highlight";
import { LinkedinIcon } from "./icons";
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

/** Círculos finos de fondo: le quitan rigidez a la cuadrícula sin distraer */
function Orbits() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full text-ink/15"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1440 900"
      fill="none"
    >
      <circle cx="250" cy="120" r="330" stroke="currentColor" />
      <circle cx="1300" cy="760" r="260" stroke="currentColor" />
      <circle cx="545" cy="355" r="5" fill="var(--color-paper)" stroke="currentColor" />
    </svg>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { hero, site: siteText, ui } = useContent();
  // Quien pide menos movimiento no recibe el desplazamiento de las letras.
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /*
    El apellido se desliza hacia la izquierda al bajar, por detrás de la
    foto. Va en vw para que el recorrido se vea igual en un teléfono y en un
    monitor.
  */
  const nameX = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -30]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);

  // Cadena transform completa en vez de los atajos x/y: los atajos de Motion
  // no van acelerados por hardware y sueltan fotogramas bajo carga.
  const nameTransform = useMotionTemplate`translateX(${nameX}vw)`;
  const photoTransform = useMotionTemplate`translateY(${photoY}px)`;

  return (
    <section id="top" className="relative">
      {/* ---------- Pantalla 1: el nombre y la foto ---------- */}
      <div
        ref={ref}
        className="relative flex min-h-svh flex-col overflow-hidden bg-paper"
      >
        <Orbits />

        {/* Texto pequeño arriba a la izquierda */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ ...REVEAL, delay: 0.1 }}
          className="relative z-30 mx-auto mt-28 w-full max-w-7xl px-5 text-base leading-snug font-medium sm:mt-32 sm:px-8 sm:text-lg"
        >
          {hero.kicker[0]}
          <br />
          <span className="text-muted">{hero.kicker[1]}</span>
        </motion.p>

        {/*
          El nombre. Es el h1 de la página: lo primero que tiene que quedar en
          la cabeza de quien revisa veinte portafolios en una tarde.
        */}
        {/*
          Solo el apellido va gigante: con dos líneas la foto tapaba el centro
          de ambas y no se leía ninguna. El nombre completo sigue en el h1
          para lectores de pantalla y Google, y visible en el navbar y el footer.
        */}
        <h1 className="font-display pointer-events-none relative z-10 my-auto pb-[6svh] text-center text-[min(24vw,44svh)] leading-[0.86] whitespace-nowrap uppercase select-none">
          <span className="sr-only">{site.firstName} </span>
          <motion.span style={{ transform: nameTransform }} className="block">
            <motion.span
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ ...REVEAL, delay: 0.05 }}
              className="block"
            >
              {site.lastName}
            </motion.span>
          </motion.span>
        </h1>

        {/*
          El avatar se para delante del nombre, anclado al borde inferior. Por
          eso tiene que ser un PNG recortado (sin fondo).
        */}
        <motion.div
          style={{ transform: photoTransform }}
          className="pointer-events-none absolute bottom-0 left-1/2 z-20 w-[min(88vw,74svh,40rem)] -translate-x-1/2"
        >
          <motion.div
            initial={{ opacity: 0, transform: "translateY(40px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.3 }}
          >
            <Image
              src={site.avatar}
              alt={ui.avatarAlt}
              width={site.avatarSize.width}
              height={site.avatarSize.height}
              priority
              sizes="(max-width: 768px) 88vw, 40rem"
              className="h-auto w-full"
            />
          </motion.div>
        </motion.div>

        {/* Señal de que hay más abajo */}
        <a
          href="#intro"
          className="absolute right-5 bottom-6 z-30 flex flex-col items-center gap-1 text-sm font-medium sm:right-10 sm:bottom-10"
        >
          {ui.scrollDown}
          <ArrowDown className="animate-scroll-arrow h-5 w-5" />
        </a>
      </div>

      {/* ---------- Pantalla 2: quién es y qué busca ---------- */}
      {/*
        Mismo lenguaje que el resto de la página: una declaración en la
        condensada, un párrafo corto con lo importante resaltado y, a la
        derecha, el stack como filas punteadas en vez de píldoras sueltas.
        Los bloques nacen bajo el pliegue, así que se revelan con
        `whileInView`: con `animate` se consumirían antes de que nadie los viera.
      */}
      <div
        id="intro"
        className="mx-auto grid w-full max-w-7xl gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-12 lg:gap-16"
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          transition={REVEAL}
          className="lg:col-span-7"
        >
          {site.available && (
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
              </span>
              {ui.available}
            </span>
          )}

          <h2 className="font-display mt-8 text-[clamp(2.5rem,5.6vw,4.75rem)] leading-[0.95] uppercase">
            {hero.statement[0]}
            <br />
            <span className="text-muted">{hero.statement[1]}</span>
          </h2>

          <p className="lead mt-8 max-w-xl text-muted">
            <Highlight text={hero.tagline} />
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <CvButton lugar="hero" className="px-6 py-3 text-base" />
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/80 px-6 py-3 font-semibold transition-colors duration-150 hover:bg-ink hover:text-white"
            >
              <LinkedinIcon className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href={siteText.contactUrl}
              aria-label="Email"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/80 transition-colors duration-150 hover:bg-ink hover:text-white"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          transition={{ ...REVEAL, delay: 0.12 }}
          className="lg:col-span-4 lg:col-start-9 lg:self-end"
        >
          <h3 className="eyebrow mb-2 flex items-center gap-4 text-muted">
            {ui.stackHeading}
            <span aria-hidden className="h-px flex-1 bg-ink/15" />
          </h3>
          <ul>
            {hero.badges.map((badge) => {
              const Icon = badge.icon ? TECH_ICONS[badge.icon]?.Icon : undefined;

              return (
                <li
                  key={badge.label}
                  className="flex items-center gap-4 border-b border-dashed border-ink/20 py-4 last:border-b-0"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
                    {Icon && <Icon className="h-4 w-4" />}
                  </span>
                  <span>
                    <span className="block font-semibold">{badge.label}</span>
                    <span className="block text-sm text-muted">{badge.detail}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
