"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { site } from "@/lib/data";
import { useContent } from "@/lib/content";
import { useScrolled } from "@/lib/use-scrolled";
import { EASE_OUT } from "./Reveal";
import RecruiterCV from "./RecruiterCV";

function Logo() {
  return (
    <a
      href="#top"
      className="text-lg font-bold tracking-tighter whitespace-nowrap text-white sm:text-xl"
    >
      {site.name}
      <span className="text-accent">.</span>
    </a>
  );
}

function BookButton({ className = "" }: { className?: string }) {
  const { site: siteText, ui } = useContent();

  return (
    <a
      href={siteText.bookingUrl}
      className={`rounded-full bg-accent px-4 py-2 text-sm font-bold text-white shadow-[0_0_15px_-3px_var(--color-accent)] transition-[transform,background-color,box-shadow] duration-150 ease-out hover:scale-105 hover:bg-accent-strong hover:shadow-[0_0_30px_-2px_var(--color-accent)] active:scale-95 sm:px-5 ${className}`}
    >
      {ui.bookCall}
    </a>
  );
}

/**
 * Componente aparte a propósito: al volver arriba se desmonta y su estado de
 * menú abierto muere con él. Si el estado viviera en el padre, el menú
 * reaparecería abierto al volver a bajar.
 */
/**
 * Enlace simple y no un selector: con dos idiomas, un desplegable es un clic
 * de más. Cambiar de idioma recarga la página entera porque cada idioma tiene
 * su propio layout raíz (para que <html lang> sea el correcto), y está bien:
 * es algo que se hace una vez por visita.
 */
function LanguageSwitch() {
  const { ui } = useContent();
  const { label, href, ariaLabel } = ui.switchLanguage;

  return (
    <a
      href={href}
      hrefLang={href === "/" ? "es" : "en"}
      aria-label={ariaLabel}
      className="flex h-9 items-center rounded-full border border-white/10 bg-white/5 px-3 text-xs font-bold tracking-wider text-zinc-400 backdrop-blur-md transition-[color,border-color] duration-150 ease-out hover:border-white/25 hover:text-white"
    >
      {label}
    </a>
  );
}

function CompactNav() {
  const { ui } = useContent();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, transform: "translateY(-12px) scale(0.94)" }}
      animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
      exit={{ opacity: 0, transform: "translateY(-12px) scale(0.94)" }}
      transition={{ duration: 0.22, ease: EASE_OUT }}
      className="absolute inset-x-0 mx-auto w-fit"
    >
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-ink/70 p-1 backdrop-blur-xl">
        {/* Misma idea que la tarjeta de "Sobre mí": foto sobre fondo rojo */}
        <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-accent">
          <Image
            src={site.photo}
            alt=""
            fill
            sizes="32px"
            className="object-cover object-top"
          />
        </span>

        <Logo />

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? ui.closeMenu : ui.openMenu}
          className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-zinc-300 transition-colors hover:bg-accent hover:text-white"
        >
          {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, transform: "translateY(-8px) scale(0.96)" }}
            animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
            exit={{ opacity: 0, transform: "translateY(-8px) scale(0.96)" }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
            className="absolute inset-x-0 mx-auto mt-2 flex w-fit flex-col gap-1 rounded-3xl border border-white/10 bg-ink/90 p-2 backdrop-blur-xl"
          >
            {/*
              Un solo elemento a proposito. La navegacion y el CTA ya viven en
              la barra completa de arriba; repetirlos aqui solo anadia ruido a
              un menu que existe para una cosa concreta.
            */}
            <RecruiterCV variant="menu" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default function Navbar() {
  const scrolled = useScrolled();
  const { ui } = useContent();

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:pt-6">
      {/*
        Sin mode="wait": las dos barras se solapan y hacen cross-fade. Con
        "wait" el header se quedaba 250ms vacío en cada cruce del umbral, y se
        veía como un parpadeo. Por eso ambas van en posición absoluta.
      */}
      <div className="relative mx-auto h-11 max-w-6xl">
        <AnimatePresence initial={false}>
          {scrolled ? (
            <CompactNav key="compact" />
          ) : (
            <motion.nav
              key="full"
              initial={{ opacity: 0, transform: "translateY(-12px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              exit={{ opacity: 0, transform: "translateY(-12px)" }}
              transition={{ duration: 0.22, ease: EASE_OUT }}
              className="absolute inset-x-0 flex items-center justify-between"
            >
              <Logo />

              <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 backdrop-blur-md md:flex">
                {ui.nav.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <LanguageSwitch />
                <BookButton />
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
