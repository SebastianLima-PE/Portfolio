"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { useState } from "react";
import { faqs, site, testimonials, type Testimonial } from "@/lib/data";
import Reveal, { Stagger, StaggerItem } from "./Reveal";

function Testimonials() {
  // Si no hay testimonios reales, la sección simplemente no se renderiza.
  if (testimonials.length === 0) return null;

  /*
    El marquee necesita que cada grupo sea más ancho que la pantalla, o se ve
    el hueco entre repeticiones. Con 3 testimonios eso no se cumple, así que
    repetimos la lista hasta juntar al menos 4 tarjetas por grupo.
  */
  const repeticiones = Math.max(2, Math.ceil(4 / testimonials.length));
  const grupo = Array.from({ length: repeticiones }, () => testimonials).flat();

  const Tarjeta = ({ t }: { t: Testimonial }) => (
    <figure className="flex w-[min(88vw,26rem)] shrink-0 flex-col rounded-[2rem] border border-white/5 bg-zinc-900/40 p-8 backdrop-blur-sm">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, s) => (
          <Star key={s} className="h-4 w-4 fill-accent text-accent" />
        ))}
      </div>
      <blockquote className="mt-5 flex-1 leading-relaxed text-zinc-300">
        {t.quote}
      </blockquote>
      <figcaption className="mt-6 border-t border-white/5 pt-5">
        <p className="font-semibold text-white">{t.author}</p>
        <p className="text-sm text-zinc-500">{t.role}</p>
      </figcaption>
    </figure>
  );

  return (
    <div className="mb-24">
      <Reveal>
        <h2 className="heading-section mb-10">
          Hear from the people I worked with
        </h2>
      </Reveal>

      {/* group/marquee: pausa la cinta al pasar el cursor por encima */}
      <div className="marquee-viewport group/marquee relative -mx-4 overflow-hidden px-4">
        <div className="marquee-track flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused]">
          <div className="flex shrink-0 gap-5 pr-5">
            {grupo.map((t, i) => (
              <Tarjeta key={`a-${i}`} t={t} />
            ))}
          </div>
          {/* Copia exacta: es lo que hace que el salto sea invisible */}
          <div className="flex shrink-0 gap-5 pr-5" aria-hidden>
            {grupo.map((t, i) => (
              <Tarjeta key={`b-${i}`} t={t} />
            ))}
          </div>
        </div>

        {/* Desvanecido en los bordes para que las tarjetas no se corten en seco */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent"
        />
      </div>
    </div>
  );
}

function Faqs() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Stagger className="flex flex-col gap-3" delayChildren={0.1}>
      {faqs.map((faq, i) => {
        const isOpen = open === i;

        return (
          <StaggerItem
            key={faq.q}
            className="overflow-hidden rounded-[1.75rem] border border-white/5 bg-zinc-900/40 backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 p-6 text-left"
            >
              <span className="font-semibold text-white">{faq.q}</span>
              {/*
                Dos barras en vez de intercambiar iconos: la vertical rota 90 y
                se funde con la horizontal, asi el + se convierte en - sin corte.
              */}
              <span
                className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                  isOpen ? "bg-accent text-white" : "bg-white/5 text-zinc-400"
                }`}
              >
                <span className="absolute h-0.5 w-3 rounded-full bg-current" />
                <span
                  className={`absolute h-3 w-0.5 rounded-full bg-current transition-transform duration-300 ease-out ${
                    isOpen ? "rotate-90" : "rotate-0"
                  }`}
                />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.77, 0, 0.175, 1] }}
                >
                  <p className="px-6 pb-6 text-[15px] leading-relaxed text-zinc-400">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

export default function SocialProof() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:py-32">
      <Testimonials />

      <div className="grid gap-5 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <h2 className="heading-section mb-8">Preguntas frecuentes</h2>
          <Faqs />
        </Reveal>

        {/* CTA destacado */}
        <Reveal delay={0.12} className="lg:col-span-2">
          <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] border border-accent/30 bg-gradient-to-br from-accent/20 via-zinc-900/40 to-zinc-900/40 p-8 backdrop-blur-sm">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-accent/25 blur-3xl"
            />

            <div className="relative">
              <h3 className="heading-card text-white">¿Todavía con dudas?</h3>
              <p className="mt-3 leading-relaxed text-zinc-300">
                Agenda una llamada gratuita de 15 minutos. Revisamos tu idea y
                te digo con franqueza si puedo ayudarte y cómo.
              </p>
            </div>

            <a
              href={site.bookingUrl}
              className="group relative mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-white transition-[transform,background-color,box-shadow] duration-150 ease-out hover:scale-105 hover:bg-accent-strong hover:shadow-[0_0_36px_-4px_var(--color-accent)] active:scale-95"
            >
              Book a free discovery call
              <ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
