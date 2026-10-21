/**
 * Lo que NO cambia entre idiomas: tus enlaces e imágenes. Los textos viven en
 * `content/es.ts` y `content/en.ts`.
 *
 * Regla rápida para saber dónde editar:
 * - ¿Cambia un link o una imagen? → aquí, una sola vez.
 * - ¿Cambia una frase? → en los dos archivos de idioma.
 */

const EMAIL = "sebastianpariachi.l@gmail.com";

/**
 * El botón "Escríbeme" abre el cliente de correo con el destinatario y el
 * asunto ya puestos. Si algún día creas un Cal.com o Calendly, haz que esta
 * función devuelva su URL y todos los botones de los dos idiomas apuntan ahí.
 */
export const contactUrl = (asunto: string) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(asunto)}`;

export const site = {
  /** Nombre corto para el logo del navbar */
  name: "Sebastian",
  /** Iniciales del cuadrado negro del logo */
  initials: "SP",
  /** El nombre gigante del hero y del footer */
  firstName: "SEBASTIAN",
  lastName: "PARIACHI",
  available: true,

  email: EMAIL,
  github: "https://github.com/SebastianLima-PE",
  linkedin:
    "https://www.linkedin.com/in/sebastian-pariachi-limahuaya-4974b0377",

  /*
    Foto RECORTADA (PNG con fondo transparente): así se para delante del
    nombre gigante del hero. Si la cambias, deja la nueva con el mismo nombre
    y actualiza `photoSize` con sus medidas en píxeles.
  */
  photo: "/sebastian.png",
  photoSize: { width: 987, height: 1024 },
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
  Imagen y enlace de cada proyecto. El orden de la lista lo decide el archivo
  de idioma, no este objeto.

  TODO: cuando tengas un proyecto de datos (un dashboard de Power BI con su
  dataset y su pregunta de negocio), agrégalo aquí y ponlo PRIMERO en la
  lista de `es.ts` y `en.ts`. Es lo que más reforzaría tu fortaleza en datos.
*/
export const projectMeta = {
  fintu: {
    title: "FinTú Co.",
    image: "/projects/fintu.png",
    href: "https://fintu-co.pages.dev/",
  },
  ferovaClinic: {
    title: "Ferova Clinic",
    image: "/projects/ferova-clinic.png",
    href: "https://sanuvi-minsa.github.io/ferova-landing-page/",
  },
  ferovaFamily: {
    title: "Ferova Family",
    image: "/projects/ferova-family.png",
    href: "https://sanuvi-minsa.github.io/ferova-landing-page/",
  },
  candela: {
    title: "Candela IA",
    image: "/projects/candela.png",
    href: "https://candela-ia.vercel.app/",
  },
} satisfies Record<string, { title: string; image: string; href?: string }>;
