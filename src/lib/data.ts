/**
 * Lo que NO cambia entre idiomas: tus enlaces, imágenes y el reparto del
 * bento. Los textos viven en `content/es.ts` y `content/en.ts`.
 *
 * Regla rápida para saber dónde editar:
 * - ¿Cambia un link, una imagen o el orden del grid? → aquí, una sola vez.
 * - ¿Cambia una frase? → en los dos archivos de idioma.
 */
import type { ProjectVisual, ServiceIcon } from "./content/types";

const EMAIL = "sebastianpariachi.l@gmail.com";

/**
 * Los CTA abren el cliente de correo con el destinatario y el asunto ya
 * puestos. Si algún día creas un Cal.com o Calendly, haz que esta función
 * devuelva su URL y todos los botones de los dos idiomas apuntan ahí.
 */
export const bookingUrl = (asunto: string) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(asunto)}`;

export const site = {
  /** Nombre corto para el logo del navbar */
  name: "Sebastián",
  /** Sale gigante y translúcido al fondo del footer */
  fullName: "SEBASTIÁN",
  available: true,

  email: EMAIL,
  github: "https://github.com/SebastianLima-PE",
  linkedin:
    "https://www.linkedin.com/in/sebastian-pariachi-limahuaya-4974b0377",

  // TODO: pon tu foto real en /public/sebastian.png y cambia esta ruta.
  // La tarjeta de "Sobre mí" es vertical (3:4), así que funciona mejor una
  // foto de medio cuerpo recortada que un primer plano cuadrado.
  photo: "/avatar.png",
};

/*
  CV en PDF, uno por idioma. Deja el archivo en /public y pon aquí su ruta; si
  una ruta queda vacía, el botón "Descargar CV" no se muestra en ese idioma.

  Para actualizarlo: reemplaza el archivo con EL MISMO NOMBRE y despliega.
  Mantener el nombre es lo que hace que la URL no cambie, así que cualquier
  enlace que hayas compartido antes sigue sirviendo. Si un navegador se queda
  con la vieja en caché, súbele el número: "/CV_Sebastian_Pariachi.pdf?v=2".
*/
export const cv = {
  es: "/CV_Sebastian_Pariachi.pdf",
  // TODO: sube tu CV en inglés como /public/CV_Sebastian_Pariachi_EN.pdf y
  // cambia esta ruta. Mientras tanto, la versión en inglés entrega el de
  // español: mejor un CV en otro idioma que un botón que no lleva a nada.
  en: "/CV_Sebastian_Pariachi.pdf",
};

/*
  Reparto del bento: 2+1 arriba, 1+2 abajo. Las capturas apaisadas van a las
  tarjetas anchas y las verticales a las angostas. Si cambias las imágenes,
  reparte de nuevo tocando solo `className`.

  Mientras `image` esté vacío se dibuja la textura CSS de `visual`. En cuanto
  pongas una ruta, la imagen la reemplaza sin tocar nada más.
*/
export const projectMeta = {
  fintu: {
    title: "FinTú Co.",
    image: "/projects/fintu.png",
    visual: "mesh",
    href: "https://fintu-co.pages.dev/",
    className: "md:col-span-2 md:row-span-1",
  },
  ferovaFamily: {
    title: "Ferova Family",
    image: "/projects/ferova-family.png",
    visual: "rings",
    href: "https://sanuvi-minsa.github.io/ferova-landing-page/",
    className: "md:col-span-1 md:row-span-1",
  },
  ferovaClinic: {
    title: "Ferova Clinic",
    image: "/projects/ferova-clinic.png",
    visual: "diagonal",
    href: "https://sanuvi-minsa.github.io/ferova-landing-page/",
    className: "md:col-span-1 md:row-span-1",
  },
  candela: {
    title: "Candela IA",
    image: "/projects/candela.png",
    visual: "dots",
    href: "https://candela-ia.vercel.app/",
    className: "md:col-span-2 md:row-span-1",
  },
} satisfies Record<
  string,
  {
    title: string;
    image?: string;
    visual: ProjectVisual;
    href?: string;
    className: string;
  }
>;

/** Icono y herramientas que enciende cada área de servicio */
export const serviceMeta = {
  automation: {
    icon: "automation",
    tools: ["Power Automate", "Python"],
  },
  data: {
    icon: "data",
    tools: ["Power BI", "MySQL", "Pandas"],
  },
  ai: {
    icon: "ai",
    tools: ["Python", "scikit-learn", "Pandas"],
  },
  fullstack: {
    icon: "fullstack",
    tools: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Kotlin",
      "Flutter",
      "Docker",
    ],
  },
} satisfies Record<string, { icon: ServiceIcon; tools: string[] }>;

/**
 * Herramientas. `short` es el respaldo si no hay logo de marca disponible;
 * `name` va en el tooltip y en el aria-label.
 */
export const stack = [
  { name: "Python", short: "Py" },
  { name: "Power BI", short: "BI" },
  { name: "Power Automate", short: "PA" },
  { name: "MySQL", short: "SQL" },
  { name: "Pandas", short: "pd" },
  { name: "scikit-learn", short: "skl" },
  { name: "React", short: "React" },
  { name: "Next.js", short: "Next" },
  { name: "TypeScript", short: "TS" },
  { name: "Node.js", short: "Node" },
  { name: "Kotlin", short: "Kt" },
  { name: "Flutter", short: "Fl" },
  { name: "Docker", short: "Docker" },
];
