"use client";

import Image from "next/image";
import { Mail } from "lucide-react";
import { about, history, site } from "@/lib/data";
import Reveal from "./Reveal";
import { GithubIcon, LinkedinIcon } from "./icons";

const socials = [
  { label: "GitHub", href: site.github, Icon: GithubIcon },
  { label: "LinkedIn", href: site.linkedin, Icon: LinkedinIcon },
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-24 sm:py-32">
      <Reveal>
        <h2 className="heading-statement mb-12">
          {about.headline.line1}
          <br />
          <span className="text-accent">{about.headline.line2}</span>
        </h2>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-5">
        {/* Tarjeta vertical con fondo rojo: la foto es la protagonista */}
        <Reveal className="lg:col-span-2">
          <div className="flex h-full flex-col">
            <div className="relative aspect-3/4 w-full overflow-hidden rounded-[2rem] bg-accent">
              <Image
                src={about.photo}
                alt={site.name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top"
              />
              {/* Oscurece la base para que el nombre no compita con la foto */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent"
              />
            </div>

            <div className="mt-6 flex items-end justify-between gap-4">
              <div>
                <h3 className="heading-card text-white">{site.name}</h3>
                <p className="mt-1 text-sm text-zinc-400">{site.role}</p>
              </div>

              <div className="flex gap-2">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:border-accent/50 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Biografía + historial en una sola tarjeta */}
        <Reveal delay={0.12} className="lg:col-span-3">
          <div className="flex h-full flex-col rounded-[2rem] border border-white/5 bg-zinc-900/40 p-8 backdrop-blur-sm sm:p-10">
            <div className="space-y-5">
              {about.paragraphs.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-zinc-400">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Separador: marca dónde termina la bio y empieza la trayectoria */}
            <div className="my-8 h-px w-full bg-white/5" />

            <h3 className="text-sm font-semibold text-zinc-500">Trayectoria</h3>

            <ol className="mt-7 space-y-7">
              {history.map((job, i) => (
                <li key={`${job.company}-${i}`} className="relative pl-7">
                  {/* Punto de la línea de tiempo */}
                  <span className="absolute top-1.5 left-0 h-2.5 w-2.5 rounded-full bg-accent" />
                  {/* La línea no se dibuja bajo el último punto */}
                  {i !== history.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute top-5 left-[4.5px] h-[calc(100%+0.75rem)] w-px bg-white/10"
                    />
                  )}

                  <p className="font-semibold text-white">{job.role}</p>
                  <p className="mt-0.5 text-sm text-zinc-400">{job.company}</p>
                  <p className="mt-1 text-xs tracking-wide text-zinc-600">
                    {job.period}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
