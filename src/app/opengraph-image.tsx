import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/data";

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
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.role}`;

const ACCENT = "#e11d48";
const INK = "#0a0a0a";

const fontFile = (peso: 400 | 800) =>
  join(
    process.cwd(),
    "node_modules/@fontsource/inter/files",
    `inter-latin-${peso}-normal.woff`,
  );

export default async function Image() {
  // Satori no resuelve rutas del servidor: la imagen entra como data URI.
  const [avatar, interRegular, interBold] = await Promise.all([
    readFile(join(process.cwd(), "public/avatar.png")),
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
          backgroundColor: INK,
          fontFamily: "Inter",
          // El mismo resplandor rojo del hero, para que la tarjeta y la
          // página se reconozcan como la misma marca.
          backgroundImage: `radial-gradient(circle at 78% 45%, ${ACCENT}33 0%, ${INK}00 55%)`,
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
                backgroundColor: "#4ade80",
                marginRight: 12,
              }}
            />
            <div
              style={{
                fontSize: 22,
                color: "#a1a1aa",
                letterSpacing: 2,
              }}
            >
              DISPONIBLE PARA TRABAJAR
            </div>
          </div>

          <div
            style={{
              fontSize: 86,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1,
              letterSpacing: -3,
            }}
          >
            Sebastián
          </div>
          <div
            style={{
              fontSize: 86,
              fontWeight: 800,
              color: "#ffffff",
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
              color: "#d4d4d8",
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
          <img src={avatarSrc} width={430} height={430} alt="" />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "Inter", data: interBold, weight: 800, style: "normal" },
      ],
    },
  );
}
