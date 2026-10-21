"use client";

import { Mail } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { site } from "@/lib/data";
import { useContent } from "@/lib/content";
import CvButton from "./CvButton";
import Highlight from "./Highlight";
import { GithubIcon, LinkedinIcon } from "./icons";
import Reveal from "./Reveal";

const socials = [
  { label: "LinkedIn", href: site.linkedin, Icon: LinkedinIcon },
  { label: "GitHub", href: site.github, Icon: GithubIcon },
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
];

/** Encabezado de cada bloque de la columna derecha: etiqueta + línea */
function BlockTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="eyebrow mb-2 flex items-center gap-4 text-muted">
      {children}
      <span aria-hidden className="h-px flex-1 bg-ink/15" />
    </h3>
  );
}

/**
 * Dos columnas con un orden fijo: a la izquierda quién es (foto, nombre,
 * enlaces) y a la derecha, de arriba abajo, la bio, los datos rápidos, la
 * trayectoria y las certificaciones. Cada bloque usa la misma estructura de
 * filas, así la sección se lee como una ficha y no como texto suelto.
 */
export default function About() {
  const { about, history, certifications, site: siteText, ui } = useContent();

  return (
    <section
      id="about"
      className="mx-3 mt-3 scroll-mt-24 rounded-[2rem] bg-white px-5 py-20 sm:mx-5 sm:mt-5 sm:px-10 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="heading-display mb-14">{ui.aboutHeading}</h2>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* ---------- Izquierda: la tarjeta de presentación ---------- */}
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              {/*
                La foto está recortada, así que se apoya en la base de un
                fondo gris liso: queda como retrato de estudio.
              */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper">
                <Image
                  src={site.photo}
                  alt={ui.photoAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain object-bottom"
                />
              </div>

              <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-display text-3xl uppercase">
                    {site.firstName} {site.lastName}
                  </p>
                  <p className="mt-1 text-sm text-muted">{siteText.role}</p>
                </div>

                <ul className="flex gap-2">
                  {socials.map(({ label, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        aria-label={label}
                        target={href.startsWith("mailto:") ? undefined : "_blank"}
                        rel="noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 transition-colors duration-150 hover:bg-ink hover:text-white"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <CvButton lugar="about" className="mt-6 w-full py-3 text-base" />
            </div>
          </Reveal>

          {/* ---------- Derecha: la ficha ---------- */}
          <div className="flex flex-col gap-14 lg:col-span-7">
            {/*
              Los dos párrafos al mismo tamaño y en gris, con lo importante
              en tinta: se lee en diagonal y ya no hay un bloque pesado
              encima de otro liviano.
            */}
            <Reveal className="space-y-6">
              {about.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-lg leading-relaxed text-muted sm:text-xl sm:leading-relaxed"
                >
                  <Highlight text={paragraph} />
                </p>
              ))}
            </Reveal>

            {/* Datos rápidos: lo que un reclutador busca primero */}
            <Reveal>
              <dl className="grid grid-cols-2 gap-x-6 sm:grid-cols-3">
                {about.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="border-t border-dashed border-ink/20 py-4"
                  >
                    <dt className="eyebrow text-muted">{fact.label}</dt>
                    <dd className="mt-1.5 font-semibold">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal>
              <BlockTitle>{ui.historyHeading}</BlockTitle>
              <ol>
                {history.map((job, i) => (
                  <li
                    key={`${job.company}-${i}`}
                    className="grid gap-1 border-b border-dashed border-ink/20 py-5 last:border-b-0 sm:grid-cols-[9rem_1fr] sm:gap-6"
                  >
                    <p className="text-sm text-muted tabular-nums sm:pt-0.5">
                      {job.period}
                    </p>
                    <div>
                      <p className="font-semibold">{job.role}</p>
                      <p className="mt-0.5 text-sm text-muted">{job.company}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            {/*
              Las certificaciones respaldan la fortaleza en datos con algo
              verificable: casi todas son de SQL, Python, Power BI y ML.
            */}
            <Reveal>
              <BlockTitle>{ui.certificationsHeading}</BlockTitle>
              <ul>
                {certifications.map((c) => (
                  <li
                    key={c.name}
                    className="grid gap-1 border-b border-dashed border-ink/20 py-4 last:border-b-0 sm:grid-cols-[9rem_1fr] sm:gap-6"
                  >
                    <p className="text-sm text-muted tabular-nums sm:pt-0.5">
                      {c.date}
                    </p>
                    <div>
                      <p className="font-semibold">{c.name}</p>
                      <p className="text-sm text-muted">{c.issuer}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
