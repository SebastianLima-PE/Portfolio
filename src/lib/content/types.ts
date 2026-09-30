/** Idiomas del sitio. `es` vive en "/" y `en` en "/en". */
export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];

/** Textura de respaldo mientras no haya mockup real */
export type ProjectVisual = "mesh" | "rings" | "diagonal" | "dots";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  /** Ruta dentro de /public — ej. "/projects/fintu.png". Si existe, gana sobre `visual` */
  image?: string;
  /** Patrón CSS que se dibuja cuando todavía no hay `image` */
  visual: ProjectVisual;
  href?: string;
  /** Clases de grid: define la asimetría del bento */
  className: string;
};

/** Clave del icono; el componente la traduce a un icono de lucide */
export type ServiceIcon = "automation" | "data" | "ai" | "fullstack";

export type Service = {
  title: string;
  icon: ServiceIcon;
  body: string;
  skills: string[];
  /**
   * Nombres exactos de `stack` que esta area enciende en la columna
   * izquierda. Es una lista explicita y no una coincidencia por texto: asi
   * decides tu que se ilumina, y anadir una herramienta no rompe nada.
   */
  tools: string[];
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
    /** Destino de los CTA "Agendar una llamada" */
    bookingUrl: string;
    /** PDF del CV. Vacío = el botón no se muestra */
    cv: string;
  };

  hero: {
    lineOne: string;
    lineTwo: string;
    tagline: string;
    badges: { label: string; icon?: string }[];
    cta: string;
  };

  projects: Project[];
  services: Service[];

  about: {
    headline: { line1: string; line2: string };
    paragraphs: string[];
  };

  history: Job[];
  testimonials: Testimonial[];
  faqs: Faq[];

  /** Textos de interfaz que antes vivían escritos dentro de los componentes */
  ui: {
    nav: { label: string; href: string }[];
    bookCall: string;
    openMenu: string;
    closeMenu: string;
    /** Enlace al otro idioma */
    switchLanguage: { label: string; href: string; ariaLabel: string };
    avatarAlt: string;
    available: string;
    projectsHeading: string;
    servicesHeading: { line1: string; line2: string };
    servicesLead: string;
    historyHeading: string;
    testimonialsHeading: string;
    faqHeading: string;
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
    footerHeading: { before: string; highlight: string; after: string };
    madeWith: string;
    recruiterQuestion: string;
    downloadCv: string;
    ogAvailable: string;
  };
};
