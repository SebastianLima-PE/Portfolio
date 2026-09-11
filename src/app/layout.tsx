import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/*
  Sin metadataBase, Next enlaza la imagen de previsualización con ruta
  relativa y LinkedIn no la encuentra. En Vercel VERCEL_URL viene sola; en
  cualquier otro hosting define NEXT_PUBLIC_SITE_URL con tu dominio.
*/
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  // Dominio estable de produccion. VERCEL_URL, en cambio, cambia en cada
  // despliegue, y la imagen de previsualizacion quedaria atada a una URL
  // distinta cada vez que subes algo.
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${site.name} — ${site.role}`,
  description:
    "Portafolio de Sebastián Pariachi. Automatización de procesos, analítica de datos e IA, con base en desarrollo Full Stack web y móvil.",
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description:
      "Automatización de procesos, analítica de datos e IA, con base en desarrollo Full Stack.",
    type: "website",
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="bg-ink font-sans text-white antialiased">
        {children}
      </body>
    </html>
  );
}
