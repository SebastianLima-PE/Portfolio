"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import Image from "next/image";
import { useState, type MouseEvent } from "react";
import { useContent } from "@/lib/content";
import type { Project } from "@/lib/content/types";
import Reveal, { EASE_IN_OUT, EASE_OUT } from "./Reveal";

/**
 * Vista previa que sigue al cursor mientras pasas por encima de una fila.
 * Solo existe con mouse: en un teléfono no hay "pasar por encima", así que
 * ahí la imagen aparece al abrir la fila y esta capa ni se dibuja.
 */
function FloatingPreview({
  project,
  x,
  y,
}: {
  project: Project | null;
  x: ReturnType<typeof useSpring>;
  y: ReturnType<typeof useSpring>;
}) {
  const transform = useMotionTemplate`translate(${x}px, ${y}px)`;

  return (
    <motion.div
      aria-hidden
      style={{ transform }}
      className="pointer-events-none absolute top-0 left-0 z-20 hidden [@media(pointer:fine)]:block"
    >
      {/*
        El centrado va en su propia capa: Motion escribe `transform` en línea
        al animar la escala y pisaría cualquier clase translate del mismo nodo.
      */}
      <AnimatePresence>
        {project && (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="absolute top-0 left-0 -mt-28 -ml-42 overflow-hidden rounded-xl bg-ink p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]"
          >
            <div className="relative h-52 w-80 overflow-hidden rounded-lg">
              <Image
                src={project.image}
                alt=""
                fill
                sizes="320px"
                className="object-cover object-top"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Detail({ project }: { project: Project }) {
  const { ui } = useContent();

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE_IN_OUT }}
      className="overflow-hidden"
    >
      <div className="grid gap-8 pt-2 pb-10 md:grid-cols-5">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-paper md:col-span-3">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover object-top"
          />
        </div>

        <div className="flex flex-col md:col-span-2">
          {/* Los números primero: son lo que un reclutador recuerda */}
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
            {project.highlights.map((h) => (
              <div key={h.label}>
                <dt className="font-display text-4xl leading-none sm:text-5xl">
                  {h.value}
                </dt>
                <dd className="mt-1.5 text-sm text-muted">{h.label}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 leading-relaxed text-ink/80">{project.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-paper px-3 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="group mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent"
            >
              {ui.viewProject}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { projects, ui } = useContent();
  // El primero arranca abierto: quien no interactúa igual ve un proyecto completo.
  const [open, setOpen] = useState<number | null>(0);
  const [hovered, setHovered] = useState<number | null>(null);

  // El resorte hace que la vista previa persiga al cursor en vez de pegarse.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 300, damping: 30, mass: 0.5 });
  const y = useSpring(mouseY, { stiffness: 300, damping: 30, mass: 0.5 });

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // La flotante no se muestra sobre la fila que ya está abierta: ahí la
  // imagen ya está a la vista y sería un duplicado tapando el texto.
  const preview =
    hovered !== null && hovered !== open ? projects[hovered] : null;

  return (
    <section
      id="work"
      className="mx-3 scroll-mt-24 rounded-[2rem] bg-white px-5 py-20 sm:mx-5 sm:px-10 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="heading-display">{ui.projectsHeading}</h2>
          <p className="max-w-xs text-muted sm:text-right">{ui.projectsLead}</p>
        </Reveal>

        <div
          className="relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHovered(null)}
        >
          <FloatingPreview project={preview} x={x} y={y} />

          <ol>
            {projects.map((project, i) => {
              const isOpen = open === i;

              return (
                <li
                  key={project.title}
                  className="border-t border-dashed border-ink/25 last:border-b"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    onMouseEnter={() => setHovered(i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-4 py-6 text-left sm:py-8"
                  >
                    <span className="w-8 shrink-0 text-sm text-muted tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={`font-display flex-1 text-[clamp(2.25rem,7vw,5.5rem)] leading-[0.95] uppercase transition-[color,transform] duration-300 ease-out group-hover:translate-x-2 ${
                        isOpen ? "text-ink" : "text-ink/85"
                      }`}
                    >
                      {project.title}
                    </span>

                    <span className="hidden text-right text-sm md:block">
                      {project.category}
                      <span className="block text-muted">{project.year}</span>
                    </span>

                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/20 transition-[transform,background-color,color] duration-300 ease-out ${
                        isOpen ? "rotate-45 bg-ink text-white" : "group-hover:bg-ink/5"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>

                  {/* En el teléfono la categoría va bajo el título */}
                  <p className="-mt-3 mb-5 pl-12 text-sm text-muted md:hidden">
                    {project.category} · {project.year}
                  </p>

                  <AnimatePresence initial={false}>
                    {isOpen && <Detail project={project} />}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
