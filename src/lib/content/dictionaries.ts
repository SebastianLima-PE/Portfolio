import { en } from "./en";
import { es } from "./es";
import type { Content, Locale } from "./types";

/**
 * Sin "use client" a propósito: el layout, los metadatos y la imagen de
 * previsualización corren en el servidor y leen de aquí directamente.
 */
export const content: Record<Locale, Content> = { es, en };
