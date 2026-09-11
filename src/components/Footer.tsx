"use client";

import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { site } from "@/lib/data";
import Reveal from "./Reveal";

const socials = [
  { label: "GitHub", href: site.github, Icon: GithubIcon },
  { label: "LinkedIn", href: site.linkedin, Icon: LinkedinIcon },
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative mt-16 overflow-hidden border-t border-white/5 pt-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Texto colosal */}
        <Reveal>
          <h2 className="text-center text-[min(11vw,7.5rem)] leading-[0.9] font-black tracking-tighter">
            Lets build{" "}
            <span className="bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent">
              incredible
            </span>{" "}
            work together<span className="text-accent">.</span>
          </h2>
        </Reveal>

        {/* Bloque de enlaces */}
        <Reveal delay={0.15}>
          <div className="mt-16 flex flex-col items-center justify-between gap-8 border-t border-white/5 pt-10 sm:flex-row">
            <div className="flex flex-wrap justify-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-zinc-300 backdrop-blur-md transition-[color,border-color] duration-150 ease-out hover:border-accent/40 hover:text-white"
                >
                  <Icon className="h-4 w-4 transition-colors group-hover:text-accent" />
                  {label}
                </a>
              ))}
            </div>

            <p className="text-sm text-zinc-600">
              © {new Date().getFullYear()} {site.name}. Hecho con Next.js.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Nombre gigante desvaneciéndose al fondo */}
      <div
        aria-hidden
        className="pointer-events-none mt-10 w-full overflow-hidden select-none"
      >
        <p className="translate-y-[18%] text-center text-[15vw] leading-none font-black tracking-tighter text-white/5">
          {site.fullName}
        </p>
      </div>
    </footer>
  );
}
