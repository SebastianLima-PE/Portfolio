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
 * Ojo: esto NO se renderiza en un navegador sino con Satori, que soporta un
 * subconjunto de CSS. Todo div con más de un hijo necesita `display: flex`
 * explícito, no hay variables CSS y no existe `gap` en todos los contextos.
 * Si algo no aparece, casi siempre es una de esas tres.
 *
 * Las fuentes hay que pasárselas a mano: sin ellas Satori usa su Geist Regular
 * y el `fontWeight` se ignora, así que el nombre salía en peso normal cuando
 * toda la identidad del sitio es ultra-bold. Se cargan desde @fontsource en
 * formato .woff porque Satori no lee .woff2, que es lo que baja next/font.
 *
 * Vive fuera de `app/` porque cada idioma tiene su propio
 * `opengraph-image.tsx`, y los dos llaman a esta función con su locale.
 */
export const OG_SIZE = { width: 1200, height: 630 };

const ACCENT = "#e11d48";
const INK = "#0b0b0c";
const PAPER = "#e3e4e7";

const fontFile = (peso: 400 | 800) =>
  join(
    process.cwd(),
    "node_modules/@fontsource/inter/files",
    `inter-latin-${peso}-normal.woff`,
  );

export async function renderOgImage(locale: Locale) {
  const { site, ui } = content[locale];

  // Satori no resuelve rutas del servidor: la imagen entra como data URI.
  const [avatar, interRegular, interBold] = await Promise.all([
    readFile(join(process.cwd(), "public", siteData.avatar)),
    readFile(fontFile(400)),
    readFile(fontFile(800)),
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
        }}
      >
        {/* Columna de texto */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "62%",
            paddingLeft: 72,
            paddingRight: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 28,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: "#22c55e",
                marginRight: 12,
              }}
            />
            <div
              style={{
                fontSize: 22,
                color: "#5b5d63",
                letterSpacing: 2,
              }}
            >
              {ui.ogAvailable}
            </div>
          </div>

          <div
            style={{
              fontSize: 86,
              fontWeight: 800,
              color: INK,
              lineHeight: 1,
              letterSpacing: -3,
            }}
          >
            Sebastian
          </div>
          <div
            style={{
              fontSize: 86,
              fontWeight: 800,
              color: INK,
              lineHeight: 1,
              letterSpacing: -3,
              marginBottom: 28,
            }}
          >
            Pariachi
          </div>

          <div
            style={{
              width: 96,
              height: 6,
              borderRadius: 3,
              backgroundColor: ACCENT,
              marginBottom: 28,
            }}
          />

          <div
            style={{
              fontSize: 34,
              color: "#3f3f46",
              lineHeight: 1.3,
            }}
          >
            {site.role}
          </div>
        </div>

        {/* Avatar */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            width: "38%",
            height: "100%",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarSrc}
            width={Math.round((430 * siteData.avatarSize.width) / siteData.avatarSize.height)}
            height={430}
            alt=""
          />
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "Inter", data: interBold, weight: 800, style: "normal" },
      ],
    },
  );
}
