"use client";

import { useContent } from "@/lib/content";
import Reveal, { Stagger, StaggerItem } from "./Reveal";

export default function About() {
  const { about, history, certifications, ui } = useContent();

  return (
    <section
      id="about"
      className="mx-3 mt-3 scroll-mt-24 rounded-[2rem] bg-white px-5 py-20 sm:mx-5 sm:mt-5 sm:px-10 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="heading-display mb-14">{ui.aboutHeading}</h2>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="space-y-6">
            {about.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-xl leading-relaxed font-medium sm:text-2xl"
                    : "lead text-ink/75"
                }
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.12}>
            <h3 className="eyebrow text-muted">{ui.historyHeading}</h3>
            <ol className="mt-4">
              {history.map((job, i) => (
                <li
                  key={`${job.company}-${i}`}
                  className="grid gap-1 border-b border-dashed border-ink/20 py-5 sm:grid-cols-[1fr_auto] sm:gap-6"
                >
                  <div>
                    <p className="font-semibold">{job.role}</p>
                    <p className="mt-0.5 text-sm text-muted">{job.company}</p>
                  </div>
                  <p className="text-sm text-muted tabular-nums sm:text-right">
                    {job.period}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        {/*
          Las certificaciones respaldan la fortaleza en datos con algo
          verificable: casi todas son de SQL, Python, Power BI y ML.
        */}
        <div className="mt-20">
          <Reveal>
            <h3 className="eyebrow text-muted">{ui.certificationsHeading}</h3>
          </Reveal>
          <Stagger className="mt-4 grid sm:grid-cols-2 sm:gap-x-10" stagger={0.04}>
            {certifications.map((c) => (
              <StaggerItem
                key={c.name}
                className="flex items-baseline justify-between gap-4 border-b border-dashed border-ink/20 py-4"
              >
                <div>
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-sm text-muted">{c.issuer}</p>
                </div>
                <p className="shrink-0 text-sm text-muted tabular-nums">{c.date}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
