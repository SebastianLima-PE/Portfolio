"use client";

import { useContent } from "@/lib/content";
import Reveal, { Stagger, StaggerItem } from "./Reveal";
import { TECH_ICONS } from "./tech-icons";

function Tools({ tools, dark = false }: { tools: string[]; dark?: boolean }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {tools.map((tool) => {
        const Icon = TECH_ICONS[tool]?.Icon;

        return (
          <li
            key={tool}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
              dark ? "bg-ink text-white" : "bg-white/10 text-white/85"
            }`}
          >
            {Icon && <Icon className="h-3.5 w-3.5" />}
            {tool}
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Bloque negro, el contrapunto del gris del resto de la página. La fortaleza
 * (datos) ocupa todo el ancho y va sobre blanco; las demás áreas siguen
 * presentes pero en segundo plano, porque el objetivo es conseguir prácticas
 * y no cerrarse a un solo tipo de puesto.
 */
export default function Skills() {
  const { skills, ui } = useContent();
  const featured = skills.filter((s) => s.featured);
  const rest = skills.filter((s) => !s.featured);

  return (
    <section
      id="skills"
      className="mx-3 mt-3 scroll-mt-24 rounded-[2rem] bg-ink px-5 py-20 text-white sm:mx-5 sm:mt-5 sm:px-10 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="heading-display">{ui.skillsHeading}</h2>
          <p className="max-w-xs text-white/60 sm:text-right">{ui.skillsLead}</p>
        </Reveal>

        {featured.map((skill) => (
          <Reveal key={skill.title}>
            <article className="grid gap-6 rounded-2xl bg-paper p-7 text-ink sm:p-10 md:grid-cols-5 md:gap-10">
              <div className="md:col-span-2">
                <span className="eyebrow flex items-center gap-2 text-accent">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  {ui.strength}
                </span>
                <h3 className="font-display mt-3 text-5xl uppercase sm:text-6xl">
                  {skill.title}
                </h3>
              </div>
              <div className="md:col-span-3">
                <p className="lead text-ink/80">{skill.body}</p>
                <Tools tools={skill.tools} dark />
              </div>
            </article>
          </Reveal>
        ))}

        <Stagger className="mt-3 grid gap-x-10 sm:grid-cols-2" delayChildren={0.1}>
          {rest.map((skill) => (
            <StaggerItem
              key={skill.title}
              className="border-b border-dashed border-white/20 py-8"
            >
              <h3 className="font-display text-3xl uppercase sm:text-4xl">
                {skill.title}
              </h3>
              <p className="mt-3 leading-relaxed text-white/65">{skill.body}</p>
              <Tools tools={skill.tools} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
