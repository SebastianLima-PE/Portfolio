/** Idiomas del sitio. `es` vive en "/" y `en` en "/en". */
export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export type Project = {
  title: string;
  /** Va a la derecha de la fila: qué tipo de trabajo fue */
  category: string;
  year: string;
  description: string;
  /**
   * Los números que un reclutador recuerda. Van grandes al abrir la fila,
   * antes que la descripción: son lo que diferencia un proyecto de otro.
   */
  highlights: { value: string; label: string }[];
  tags: string[];
  /** Ruta dentro de /public — ej. "/projects/fintu.png" */
  image: string;
  /** object-position de CSS para el recorte; por defecto, la parte de arriba */
  imagePosition?: string;
  href?: string;
};

/**
 * Áreas de "Lo que sé hacer". `featured` marca la fortaleza: sale primero y
 * con más peso visual, sin que las demás desaparezcan.
 */
export type Skill = {
  title: string;
  body: string;
  tools: string[];
  featured?: boolean;
};

export type Job = {
  role: string;
  company: string;
  period: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export type Faq = { q: string; a: string };

/**
 * Todo lo que cambia de un idioma a otro. `es.ts` y `en.ts` cumplen este tipo,
 * así que si agregas un texto en uno y te olvidas del otro, el build falla en
 * vez de mostrar un hueco en producción.
 */
export type Content = {
  /** Valor de <html lang> y del Open Graph */
  htmlLang: string;
  ogLocale: string;
  /** Descripción para Google y la tarjeta de LinkedIn (100–170 caracteres) */
  metaDescription: string;

  site: {
    role: string;
    /** Destino del botón "Escríbeme" */
    contactUrl: string;
    /** PDF del CV. Vacío = el botón no se muestra */
    cv: string;
  };

  hero: {
    /** Las dos líneas de texto pequeño arriba a la izquierda */
    kicker: [string, string];
    tagline: string;
    badges: { label: string; icon?: string }[];
  };

  projects: Project[];
  skills: Skill[];

  about: {
    paragraphs: string[];
    /** Datos rápidos bajo la bio: se leen de un vistazo, sin buscar en el texto */
    facts: { label: string; value: string }[];
  };

  history: Job[];
  certifications: { name: string; issuer: string; date: string }[];
  testimonials: Testimonial[];
  faqs: Faq[];

  /** Textos de interfaz que antes vivían escritos dentro de los componentes */
  ui: {
    nav: { label: string; href: string }[];
    openMenu: string;
    closeMenu: string;
    /** Enlace al otro idioma */
    switchLanguage: { label: string; href: string; ariaLabel: string };
    avatarAlt: string;
    photoAlt: string;
    available: string;
    scrollDown: string;
    projectsHeading: string;
    projectsLead: string;
    viewProject: string;
    skillsHeading: string;
    skillsLead: string;
    strength: string;
    aboutHeading: string;
    historyHeading: string;
    certificationsHeading: string;
    testimonialsHeading: string;
    faqHeading: string;
    footerHeading: [string, string];
    footerButton: string;
    madeWith: string;
    downloadCv: string;
    ogAvailable: string;
  };
};
