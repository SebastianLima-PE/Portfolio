"use client";

import { createContext, useContext } from "react";
import { content } from "./dictionaries";
import type { Content, Locale } from "./types";

const ContentContext = createContext<Content>(content.es);

/**
 * Casi todos los componentes son de cliente por Framer Motion, así que el
 * idioma no puede leerse con `next/root-params` (eso solo corre en el
 * servidor). El layout de cada idioma envuelve la página con este provider y
 * los componentes piden sus textos con `useContent()`.
 *
 * Se pasa el `locale` y no el objeto entero: un string cruza la frontera
 * servidor → cliente sin serializar todo el diccionario en el HTML.
 */
export function ContentProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <ContentContext.Provider value={content[locale]}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
