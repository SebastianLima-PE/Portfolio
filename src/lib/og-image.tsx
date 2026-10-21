import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { content } from "@/lib/content/dictionaries";
import type { Locale } from "@/lib/content/types";
import { site as siteData } from "@/lib/data";

/**
 * Imagen de previsualización para LinkedIn, WhatsApp, Slack y compañía.
 * Next la genera una sola vez durante el build a partir de este JSX.
 *
 * Es una versión en miniatura del hero: la barra blanca, el texto pequeño
 * arriba a la izquierda, el apellido gigante en Anton y el avatar delante.
 * Quien hace clic desde LinkedIn llega a la misma imagen que vio en la tarjeta.
 *
 * Ojo: esto NO se renderiza en un navegador sino con Satori, que soporta un
 * subconjunto de CSS. Todo div con más de un hijo necesita `display: flex`
 * explícito, no hay variables CSS y no existe `gap` en todos los contextos.
 * Si algo no aparece, casi siempre es una de esas tres.
 *
 * Las fuentes hay que pasárselas a mano, en .woff y no .woff2 (Satori no lee
 * woff2, que es lo que baja next/font). Por eso Inter y Anton vienen de
 * @fontsource.
 *
 * Vive fuera de `app/` porque cada idioma tiene su propio
 * `opengraph-image.tsx`, y los dos llaman a esta función con su locale.
 */
export const OG_SIZE = { width: 1200, height: 630 };

const INK = "#0b0b0c";
const PAPER = "#e3e4e7";
const MUTED = "#5b5d63";
const NEON = "#22c55e";
const LINE = "rgba(11,11,12,0.14)";

const AVATAR = 440;

const font = (familia: string, archivo: string) =>
  readFile(join(process.cwd(), "node_modules/@fontsource", familia, "files", archivo));

/** Círculo fino de fondo, como los del hero */
function Orbit({ size, left, top }: { size: number; left: number; top: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: size,
        height: size,
        borderRadius: size,
        border: `1.5px solid ${LINE}`,
      }}
    />
  );
}

export async function renderOgImage(locale: Locale) {
  const { hero, ui } = content[locale];

  // Satori no resuelve rutas del servidor: la imagen entra como data URI.
  const [avatar, interRegular, interBold, anton] = await Promise.all([
    readFile(join(process.cwd(), "public", siteData.avatar)),
    font("inter", "inter-latin-400-normal.woff"),
    font("inter", "inter-latin-800-normal.woff"),
    font("anton", "anton-latin-400-normal.woff"),
  ]);
  const avatarSrc = `data:image/png;base64,${avatar.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: PAPER,
          fontFamily: "Inter",
          color: INK,
          overflow: "hidden",
        }}
      >
        <Orbit size={620} left={-170} top={-330} />
        <Orbit size={460} left={940} top={400} />

        {/* Barra blanca: logo, nombre y disponibilidad */}
        <div
          style={{
            position: "absolute",
            left: 36,
            right: 36,
            top: 28,
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            borderRadius: 20,
            backgroundColor: "#ffffff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                backgroundColor: INK,
                color: "#ffffff",
                fontFamily: "Anton",
                fontSize: 22,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 16,
              }}
            >
              {siteData.initials}
            </div>
            <div style={{ display: "flex", fontSize: 22, letterSpacing: 1 }}>
              <span style={{ color: MUTED }}>{siteData.firstName}&nbsp;</span>
              <span style={{ fontWeight: 800 }}>{siteData.lastName}</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", fontSize: 18 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: NEON,
                marginRight: 10,
              }}
            />
            <span style={{ color: MUTED, letterSpacing: 2 }}>{ui.ogAvailable}</span>
          </div>
        </div>

        {/* Texto pequeño arriba a la izquierda, el mismo del hero */}
        <div
          style={{
            position: "absolute",
            left: 60,
            top: 128,
            display: "flex",
            flexDirection: "column",
            fontSize: 28,
            lineHeight: 1.3,
          }}
        >
          <span>{hero.kicker[0]}</span>
          <span style={{ color: MUTED }}>{hero.kicker[1]}</span>
        </div>

        {/* El apellido gigante, detrás del avatar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 205,
            display: "flex",
            justifyContent: "center",
            fontFamily: "Anton",
            fontSize: 300,
            lineHeight: 1,
          }}
        >
          {siteData.lastName}
        </div>

        {/* Avatar delante, apoyado en el borde inferior */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarSrc}
          width={AVATAR}
          height={Math.round((AVATAR * siteData.avatarSize.height) / siteData.avatarSize.width)}
          alt=""
          style={{
            position: "absolute",
            left: (OG_SIZE.width - AVATAR) / 2,
            bottom: 0,
          }}
        />
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "Inter", data: interBold, weight: 800, style: "normal" },
        { name: "Anton", data: anton, weight: 400, style: "normal" },
      ],
    },
  );
}
