"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { site } from "@/lib/data";
import { useContent } from "@/lib/content";
import { useScrolled } from "@/lib/use-scrolled";
import CvButton from "./CvButton";
import { EASE_OUT } from "./Reveal";

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink font-display text-base tracking-wide text-white">
        {site.initials}
      </span>
      <span className="hidden text-sm tracking-wide whitespace-nowrap sm:block">
        <span className="text-muted">SEBASTIAN </span>
        <span className="font-bold">PARIACHI</span>
      </span>
    </a>
  );
}

/**
 * Enlace simple y no un selector: con dos idiomas, un desplegable es un clic
 * de más. Cambiar de idioma recarga la página entera porque cada idioma tiene
 * su propio layout raíz (para que <html lang> sea el correcto).
 */
function LanguageSwitch() {
  const { ui } = useContent();
  const { label, href, ariaLabel } = ui.switchLanguage;

  return (
    <a
      href={href}
      hrefLang={href === "/" ? "es" : "en"}
      aria-label={ariaLabel}
      className="flex h-9 items-center rounded-full px-3 text-xs font-bold tracking-wider text-muted transition-colors duration-150 ease-out hover:text-ink"
    >
      {label}
    </a>
  );
}

export default function Navbar() {
  const { ui } = useContent();
  const scrolled = useScrolled(24);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <nav
        className={`relative mx-auto flex max-w-7xl items-center justify-between rounded-2xl bg-white/95 py-2.5 pr-2.5 pl-3 backdrop-blur-md transition-shadow duration-300 sm:pl-4 ${
          scrolled ? "shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)]" : ""
        }`}
      >
        <Logo />

        {/* Enlaces separados por barras, como un índice */}
        <ul className="hidden items-center gap-2 text-xs font-semibold tracking-wider uppercase lg:flex">
          {ui.nav.map((link, i) => (
            <li key={link.href} className="flex items-center gap-2">
              {i > 0 && <span className="text-ink/30">/</span>}
              <a
                href={link.href}
                className="px-2 py-1 text-ink/70 transition-colors duration-150 hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <LanguageSwitch />
          <CvButton variant="outline" lugar="navbar" className="hidden sm:inline-flex" />

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? ui.closeMenu : ui.openMenu}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, transform: "translateY(-8px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              exit={{ opacity: 0, transform: "translateY(-8px)" }}
              transition={{ duration: 0.18, ease: EASE_OUT }}
              className="absolute inset-x-0 top-full mt-2 flex flex-col gap-1 rounded-2xl bg-white p-3 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.3)] lg:hidden"
            >
              {ui.nav.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold tracking-wider uppercase transition-colors hover:bg-ink/5"
                >
                  {link.label}
                </a>
              ))}
              <CvButton lugar="menu" className="mt-2 sm:hidden" />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
