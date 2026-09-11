"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Image from "next/image";
import type { MouseEvent } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { projects, type Project, type ProjectVisual } from "@/lib/data";
import Reveal, { Stagger, StaggerItem } from "./Reveal";

/**
 * Texturas de respaldo mientras no haya mockups reales. Son patrones abstractos
 * a propósito: una maqueta inventada daría a entender que el producto se ve así.
 * Todo es CSS, así que no pesan nada y escalan a cualquier tamaño de tarjeta.
 */
const VISUALS: Record<ProjectVisual, { glow: string; pattern: string }> = {
  mesh: {
    glow: "bg-[radial-gradient(ellipse_at_top_right,rgba(225,29,72,0.22),transparent_62%)]",
    pattern:
      "bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px]",
  },
  rings: {
    glow: "bg-[radial-gradient(circle_at_50%_38%,rgba(225,29,72,0.26),transparent_58%)]",
    pattern:
      "bg-[repeating-radial-gradient(circle_at_50%_38%,transparent_0px,transparent_25px,rgba(255,255,255,0.055)_25px,rgba(255,255,255,0.055)_26px)]",
  },
  diagonal: {
    glow: "bg-[radial-gradient(ellipse_at_bottom_left,rgba(225,29,72,0.22),transparent_60%)]",
    pattern:
      "bg-[repeating-linear-gradient(115deg,transparent_0px,transparent_16px,rgba(255,255,255,0.05)_16px,rgba(255,255,255,0.05)_32px)]",
  },
  dots: {
    glow: "bg-[radial-gradient(ellipse_at_top_left,rgba(225,29,72,0.2),transparent_58%)]",
    pattern:
      "bg-[radial-gradient(rgba(255,255,255,0.09)_1.5px,transparent_1.5px)] bg-[size:26px_26px]",
  },
};

function Visual({ variant }: { variant: ProjectVisual }) {
  const { glow, pattern } = VISUALS[variant];

  return (
    <div aria-hidden className={`absolute inset-0 ${glow}`}>
      <div
        className={`absolute inset-0 transition-transform duration-200 ease-out group-hover:scale-105 ${pattern}`}
      />
    </div>
  );
}

function Card({ project }: { project: Project }) {
  const Wrapper = project.href ? "a" : "div";

  // Efecto linterna: el degradado radial sigue al cursor dentro de la tarjeta.
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const spotlight = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, rgba(225,29,72,0.22), transparent 72%)`;

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <Wrapper
      {...(project.href
        ? { href: project.href, target: "_blank", rel: "noreferrer" }
        : {})}
      onMouseMove={handleMouseMove}
      className="group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-[2rem] border border-white/5 bg-zinc-900/40 backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-200 ease-out hover:scale-[1.02] hover:border-white/20 hover:shadow-[0_0_50px_-12px_rgba(225,29,72,0.35)]"
    >
      {/* 80% del área: la imagen del proyecto (o su textura de respaldo) */}
      {project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 66vw"
          className="object-cover object-top transition-transform duration-200 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <Visual variant={project.visual} />
      )}

      {/* Linterna: solo visible mientras el cursor está encima */}
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/*
        Dos capas de contraste. Las capturas de producto suelen tener fondos
        claros, y sobre crema el texto blanco desaparece: el velo general baja
        la luminancia de toda la imagen y el degradado hunde la franja donde
        vive el texto. Con imágenes oscuras apenas se nota.
      */}
      <div aria-hidden className="absolute inset-0 bg-black/30" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black via-black/85 to-transparent"
      />

      {/* 20% del área: el texto */}
      <div className="relative z-10 flex items-end justify-between gap-4 p-7">
        <div>
          <h3 className="heading-card text-white">{project.title}</h3>
          <p className="mt-2 line-clamp-2 max-w-md text-sm leading-relaxed text-zinc-300">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {project.href && (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors duration-200 ease-out group-hover:bg-accent">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        )}
      </div>
    </Wrapper>
  );
}

export default function Projects() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-24 sm:py-32">
      <Reveal>
        <h2 className="heading-section mb-12 flex items-center gap-3">
          <Sparkles className="h-7 w-7 text-accent" />
          Latest Projects
        </h2>
      </Reveal>

      <Stagger className="grid auto-rows-[320px] grid-cols-1 gap-5 md:grid-cols-3">
        {projects.map((project) => (
          <StaggerItem key={project.title} className={project.className}>
            <Card project={project} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
