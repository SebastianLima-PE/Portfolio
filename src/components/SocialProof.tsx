"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useContent } from "@/lib/content";
import Reveal, { EASE_IN_OUT, Stagger, StaggerItem } from "./Reveal";

/**
 * Con dos testimonios no hace falta un carrusel: van fijos, uno al lado del
 * otro, y se leen de un vistazo. Si no hay ninguno, la parte no se dibuja.
 */
function Testimonials() {
  const { testimonials, ui } = useContent();

  if (testimonials.length === 0) return null;

  return (
    <div className="mb-24">
      <Reveal>
        <h2 className="eyebrow mb-8 text-muted">{ui.testimonialsHeading}</h2>
      </Reveal>

      <Stagger className="grid gap-3 md:grid-cols-2">
        {testimonials.map((t) => (
          <StaggerItem key={t.author}>
            <figure className="flex h-full flex-col rounded-2xl bg-white p-8 sm:p-10">
              <span aria-hidden className="font-display text-6xl leading-none text-accent">
                “
              </span>
              <blockquote className="mt-2 flex-1 text-lg leading-relaxed font-medium">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 border-t border-dashed border-ink/20 pt-5">
                <p className="font-semibold">{t.author}</p>
                <p className="text-sm text-muted">{t.role}</p>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

function Faqs() {
  const { faqs, ui } = useContent();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="grid gap-10 lg:grid-cols-5">
      <Reveal className="lg:col-span-2">
        <h2 className="heading-display text-[clamp(3rem,7vw,5.5rem)]">
          {ui.faqHeading}
        </h2>
      </Reveal>

      <Stagger className="lg:col-span-3" delayChildren={0.1}>
        {faqs.map((faq, i) => {
          const isOpen = open === i;

          return (
            <StaggerItem
              key={faq.q}
              className="border-t border-dashed border-ink/25 last:border-b"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-6 text-left"
              >
                <span className="text-lg font-semibold">{faq.q}</span>
                {/*
                  Dos barras en vez de intercambiar iconos: la vertical rota 90
                  y se funde con la horizontal, así el + se convierte en - sin corte.
                */}
                <span
                  className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                    isOpen ? "bg-ink text-white" : "bg-white"
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
                    transition={{ duration: 0.25, ease: EASE_IN_OUT }}
                  >
                    <p className="max-w-2xl pb-6 leading-relaxed text-ink/75">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
      <Testimonials />
      <Faqs />
    </section>
  );
}
