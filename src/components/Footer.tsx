"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { site } from "@/lib/data";
import { useContent } from "@/lib/content";
import Clawd from "./Clawd";
import CvButton from "./CvButton";
import Reveal from "./Reveal";

const socials = [
  { label: "LinkedIn", href: site.linkedin, Icon: LinkedinIcon },
  { label: "GitHub", href: site.github, Icon: GithubIcon },
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
];

export default function Footer() {
  const { site: siteText, ui } = useContent();

  return (
    <footer
      id="contact"
      className="mx-3 mb-3 scroll-mt-24 overflow-hidden rounded-[2rem] bg-paper-soft px-5 pt-20 pb-6 sm:mx-5 sm:mb-5 sm:px-10 sm:pt-28"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4 sm:gap-6">
            <ArrowUpRight
              aria-hidden
              strokeWidth={2.5}
              className="h-14 w-14 shrink-0 sm:h-24 sm:w-24"
            />
            <h2 className="text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.02] font-semibold tracking-tight uppercase">
              {ui.footerHeading[0]}
              <br />
              {ui.footerHeading[1]}
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={siteText.contactUrl}
              className="inline-flex items-center gap-2 rounded-full border border-ink/80 px-6 py-3 font-semibold transition-colors duration-150 hover:bg-ink hover:text-white"
            >
              {ui.footerButton}
            </a>
            <CvButton lugar="footer" className="px-6 py-3 text-base" />
          </div>
        </Reveal>

        {/* Clawd camina sobre la línea: el viewBox termina justo en sus patas */}
        <div className="mt-16 flex justify-end pr-2 sm:pr-8">
          <Clawd className="w-32 sm:w-44" />
        </div>
        <div className="h-px w-full bg-ink/20" />

        {/*
          El nombre completo cierra la página igual que la abrió. Mide ~7.5em
          de ancho en Anton, y el contenedor nunca baja del 81% del viewport:
          10.8vw lo deja lleno sin cortarse. Desde 2xl el contenedor ya no
          crece, así que el tamaño pasa a fijo.
        */}
        <p
          aria-hidden
          className="font-display mt-10 text-center text-[10.8vw] leading-[0.9] whitespace-nowrap uppercase select-none 2xl:text-[10.6rem]"
        >
          {site.firstName} {site.lastName}
        </p>

        <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 text-xs tracking-wider uppercase sm:flex-row">
          <p className="text-muted">
            © {new Date().getFullYear()} Sebastian Pariachi. {ui.madeWith}
          </p>
          <ul className="flex gap-6">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="flex items-center gap-1.5 font-semibold transition-colors hover:text-accent"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
