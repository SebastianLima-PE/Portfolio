"use client";

import { Download } from "lucide-react";
import { track } from "@vercel/analytics";
import { useContent } from "@/lib/content";

/**
 * El CV ya no se esconde detrás de "¿Eres reclutador?": el sitio entero le
 * habla a un reclutador, así que el CV es el botón principal.
 *
 * Si `site.cv` está vacío no se renderiza nada, así que nunca hay un botón
 * que no lleve a ningún sitio.
 */
export default function CvButton({
  variant = "solid",
  lugar,
  className = "",
}: {
  variant?: "solid" | "outline";
  /** Para Analytics: desde dónde se descargó */
  lugar: string;
  className?: string;
}) {
  const { site, ui, htmlLang } = useContent();

  if (!site.cv) return null;

  const estilo =
    variant === "solid"
      ? "bg-ink text-white hover:bg-accent"
      : "border border-ink/80 text-ink hover:bg-ink hover:text-white";

  return (
    <a
      href={site.cv}
      download
      /*
        La descarga de un PDF no es una visita de página, así que Analytics no
        la ve sola: hay que avisarle, con el idioma y el lugar del botón.
      */
      onClick={() => track("Descarga CV", { idioma: htmlLang, lugar })}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-[color,background-color,transform] duration-150 ease-out active:scale-95 ${estilo} ${className}`}
    >
      {ui.downloadCv}
      <Download className="h-4 w-4" />
    </a>
  );
}
