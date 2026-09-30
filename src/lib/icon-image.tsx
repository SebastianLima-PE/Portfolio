import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Favicon. Next lo genera en el build, igual que la imagen de Open Graph.
 * Lo llaman los `icon.tsx` de cada idioma.
 *
 * La marca en el navbar es el nombre seguido de un punto rojo. Un punto suelto
 * a 16px no identifica a nadie, así que el icono invierte la relación: el rojo
 * pasa a ser el fondo —que es lo único que se distingue a ese tamaño— y la
 * inicial va en blanco encima. Se reconoce en una pestaña entre veinte.
 */
export const ICON_SIZE = { width: 64, height: 64 };

export async function renderIcon() {
  const inter = await readFile(
    join(
      process.cwd(),
      "node_modules/@fontsource/inter/files/inter-latin-800-normal.woff",
    ),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#e11d48",
          color: "#ffffff",
          fontFamily: "Inter",
          fontSize: 44,
          fontWeight: 800,
          // El peso 800 de Inter necesita apretarse para centrarse ópticamente
          letterSpacing: -2,
          borderRadius: 14,
        }}
      >
        S
      </div>
    ),
    {
      ...ICON_SIZE,
      fonts: [{ name: "Inter", data: inter, weight: 800, style: "normal" }],
    },
  );
}
