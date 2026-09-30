import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "../app/globals.css";
import { ContentProvider } from "@/lib/content";
import { content } from "@/lib/content/dictionaries";
import type { Locale } from "@/lib/content/types";
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

const PATHS: Record<Locale, string> = { es: "/", en: "/en" };

export function buildMetadata(locale: Locale): Metadata {
  const { metaDescription, ogLocale, site: siteText } = content[locale];
  const title = `${site.name} — ${siteText.role}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: metaDescription,
    // Genera <meta name="author">, que es lo que LinkedIn buscaba y no encontro
    authors: [{ name: "Sebastián Pariachi Limahuaya", url: site.linkedin }],
    creator: "Sebastián Pariachi Limahuaya",
    /*
      hreflang: le dice a Google que "/" y "/en" son la misma página en dos
      idiomas. Sin esto las trata como contenido duplicado y puede mostrar la
      versión equivocada a quien busca en inglés.
    */
    alternates: {
      canonical: PATHS[locale],
      languages: { es: PATHS.es, en: PATHS.en, "x-default": PATHS.es },
    },
    openGraph: {
      title,
      description: metaDescription,
      type: "website",
      locale: ogLocale,
      alternateLocale: locale === "es" ? content.en.ogLocale : content.es.ogLocale,
      url: PATHS[locale],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

/**
 * Lo que comparten los dos layouts raíz. Cada idioma necesita el suyo porque
 * `<html lang>` vive en el layout raíz, y un lector de pantalla que lee inglés
 * con reglas de español se entiende muy mal.
 */
export default function RootShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <html lang={content[locale].htmlLang} className={inter.variable}>
      <body className="bg-ink font-sans text-white antialiased">
        <ContentProvider locale={locale}>{children}</ContentProvider>
        {/*
          Visitas, países, dispositivos y de dónde llega la gente (LinkedIn,
          GitHub, Google...). No usa cookies, así que no hace falta banner de
          consentimiento. En desarrollo no registra nada.
        */}
        <Analytics />
      </body>
    </html>
  );
}
