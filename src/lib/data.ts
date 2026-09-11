/**
 * Este es el único archivo que necesitas editar para cambiar el contenido del
 * portafolio. Los componentes leen de aquí.
 */

const EMAIL = "sebastianpariachi.l@gmail.com";

/**
 * Destino de los cuatro CTA de la página. Hoy abre el cliente de correo con
 * el destinatario y el asunto ya puestos: es lo concreto que se puede hacer
 * sin una herramienta de agenda.
 *
 * Si algún día creas un Cal.com o Calendly, reemplaza esta constante por su
 * URL y los cuatro botones apuntan ahí sin tocar ningún componente.
 */
const BOOKING_URL = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Agendar una llamada",
)}`;

export const site = {
  /** Nombre corto para el logo del navbar */
  name: "Sebastián",
  /** Sale gigante y translúcido al fondo del footer */
  fullName: "SEBASTIÁN",
  role: "Automatización, Analítica de Datos e IA",
  available: true,

  email: EMAIL,
  github: "https://github.com/SebastianLima-PE",
  linkedin:
    "https://www.linkedin.com/in/sebastian-pariachi-limahuaya-4974b0377",
  bookingUrl: BOOKING_URL,

  /**
   * CV en PDF. Deja el archivo en /public y pon aquí su ruta; el botón
   * "Descargar CV" aparece solo en el hero. Mientras esté vacío no se
   * renderiza, así que nunca hay un enlace roto.
   *
   * Para actualizarlo: reemplaza el archivo con EL MISMO NOMBRE y despliega.
   * Mantener el nombre es lo que hace que la URL no cambie, así que cualquier
   * enlace que hayas compartido antes sigue sirviendo y apunta a la versión
   * nueva. Si un navegador se queda con la vieja en caché, súbele el número:
   * "/cv-sebastian-pariachi.pdf?v=2".
   */
  cv: "/CV_Sebastian_Pariachi.pdf",
};

export const hero = {
  /** Se parte en dos líneas; el avatar interrumpe la segunda */
  lineOne: "BUILD",
  lineTwo: "SOFTWARE",
  tagline:
    "Automatizo lo repetitivo y convierto datos en decisiones. Y construyo el software completo que lo sostiene, del modelo de datos a la interfaz.",
  /**
   * Especialidades del hero. `icon` es una clave de TECH_ICONS; sin ella la
   * etiqueta sale solo con texto. Son agrupaciones a propósito: el detalle
   * tecnología por tecnología vive en la sección de servicios.
   */
  badges: [
    { label: "Power BI & Automate", icon: "Power BI" },
    { label: "Python & IA", icon: "Python" },
    { label: "React & Node.js", icon: "React" },
    { label: "Full Stack", icon: undefined },
  ] as { label: string; icon?: string }[],
  /** CTA rojo bajo la propuesta de valor */
  cta: "Agendar una llamada",
};

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

/*
  Reparto del bento: 2+1 arriba, 1+2 abajo. Las capturas apaisadas van a las
  tarjetas anchas y las verticales a las angostas. Si cambias las imágenes,
  reparte de nuevo tocando solo `className`.

  Mientras `image` esté vacío se dibuja la textura CSS de `visual`. En cuanto
  pongas una ruta, la imagen la reemplaza sin tocar nada más.
*/
export const projects: Project[] = [
  {
    title: "FinTú Co.",
    description:
      "SaaS con API REST, autenticación JWT y suscripciones con PayPal. Desplegado con CI/CD.",
    tags: ["Node.js", "Express", "React", "MySQL", "PayPal"],
    image: "/projects/fintu.png",
    visual: "mesh",
    href: "https://fintu-co.pages.dev/",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Ferova Family",
    description:
      "App Android nativa para el seguimiento diario del tratamiento de anemia infantil.",
    tags: ["Kotlin", "Android"],
    image: "/projects/ferova-family.png",
    visual: "rings",
    href: "https://sanuvi-minsa.github.io/ferova-landing-page/",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Ferova Clinic",
    description:
      "Panel para el MINSA con semáforo de riesgo, predicción de abandono y dashboard distrital.",
    tags: ["Flutter", "Predicción", "Dashboard"],
    image: "/projects/ferova-clinic.png",
    visual: "diagonal",
    href: "https://sanuvi-minsa.github.io/ferova-landing-page/",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Candela IA",
    description:
      "Para cliente, en producción. API de OpenAI en móvil: visión y generación de texto con control de tono.",
    tags: ["OpenAI API", "Visión", "IA generativa"],
    image: "/projects/candela.png",
    visual: "dots",
    href: "https://candela-ia.vercel.app/",
    className: "md:col-span-2 md:row-span-1",
  },
];

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

export const services: Service[] = [
  {
    title: "Automatización de Procesos",
    icon: "automation",
    body: "Todo proceso que alguien repite a mano cada semana es tiempo que se puede recuperar. Identifico el cuello de botella, lo automatizo y dejo el flujo documentado para que el equipo lo mantenga sin depender de mí.",
    skills: ["Power Automate", "Python", "Excel", "APIs REST"],
    tools: ["Power Automate", "Python"],
  },
  {
    title: "Analítica de Datos & BI",
    icon: "data",
    body: "Del dato crudo al tablero que alguien realmente usa para decidir. Limpieza, modelado y visualización con foco en la pregunta de negocio, no en el gráfico bonito.",
    skills: ["Power BI", "SQL", "Pandas", "Modelado de datos"],
    tools: ["Power BI", "MySQL", "Pandas"],
  },
  {
    title: "Integración de IA",
    icon: "ai",
    body: "Modelos puestos a trabajar dentro de un producto, no en un notebook: inferencia integrada a la app, control de costos por request y una salida en la que se pueda confiar.",
    skills: ["Python", "IA generativa", "APIs de LLM", "scikit-learn"],
    tools: ["Python", "scikit-learn", "Pandas"],
  },
  {
    title: "Desarrollo Full Stack",
    icon: "fullstack",
    body: "La base sobre la que se apoya todo lo anterior: APIs bien diseñadas, autenticación, bases de datos que aguantan, e interfaces web y móviles conectadas a ellas.",
    skills: ["React", "Next.js", "Node.js", "MySQL", "Kotlin", "Flutter"],
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
];

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

export const about = {
  /** Titular de la sección. La segunda línea sale en rojo. */
  headline: {
    line1: "Automatizo lo repetitivo",
    line2: "y hago hablar a los datos.",
  },
  // TODO: pon tu foto real en /public/sebastian.png y cambia esta ruta.
  // La tarjeta es vertical (3:4), así que funciona mejor una foto de medio
  // cuerpo recortada que un primer plano cuadrado.
  photo: "/avatar.png",
  paragraphs: [
    "Soy Sebastián Pariachi, estudiante de 7.° ciclo de Ingeniería de Software en la UPC, en el décimo superior de mi promoción. Me muevo entre la automatización, la analítica de datos y la IA, con una base sólida de desarrollo Full Stack que me permite construir la solución entera y no solo una parte.",
    "He puesto en producción un SaaS financiero con pasarela de pagos y CI/CD, y un sistema de dos apps móviles conectadas para el tratamiento de la anemia infantil, pensado para instalaciones del MINSA. Trabajo con DDD, arquitectura por capas y SCRUM.",
  ],
};

export type Job = {
  role: string;
  company: string;
  period: string;
};

export const history: Job[] = [
  {
    role: "Desarrollador Full Stack — Freelance",
    company: "FinTú Co. y proyectos propios",
    period: "2026 — Presente",
  },
  {
    role: "Desarrollo de proyectos en la universidad",
    company: "UPC — Ferova, sistema móvil para el MINSA",
    period: "2026",
  },
  {
    role: "Ingeniería de Software",
    company: "UPC — 7.° ciclo, décimo superior",
    period: "2023 — 2028",
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

/**
 * Testimonios reales, redactados a partir de lo que cada persona comentó.
 *
 * Confirmados por ambos en septiembre de 2026: están parafraseados, no son
 * transcripciones literales, y las dos personas dieron el visto bueno a esta
 * redacción y al uso de su nombre. Si los reescribes, vuelve a preguntar.
 *
 * No hay un tercero a propósito. FinTú fue un proyecto personal y no hay nadie
 * que pueda dar fe; inventar una cita para llenar el hueco es exactamente el
 * riesgo que estos dos testimonios reales evitan. Dos verificables valen más
 * que tres donde uno es falso.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "El trabajo fue impecable de principio a fin, y cada entrega llegó en la fecha acordada.",
    author: "Adrián T.",
    role: "Cliente de Candela IA",
  },
  {
    // El cumplimiento de plazos ya lo cubre el testimonio de Adrián. Repetirlo
    // aquí hacía que los dos sonaran a la misma plantilla; este se queda con
    // lo que solo puede decir alguien que trabajó contigo en equipo.
    quote:
      "Aportó de forma constante al avance del proyecto y destacó por su perseverancia. Una persona confiable, de las que uno delega con tranquilidad.",
    author: "Equipo Ferova",
    role: "Equipo del proyecto, UPC",
  },
];

/*
  Las preguntas sirven a dos lectores a la vez: quien evalua un perfil para un
  equipo y quien evalua a alguien para encargarle un proyecto. La primera
  responde en voz alta la duda que ambos tienen al llegar, en vez de dejar que
  la adivinen por el tono de la pagina.
*/
export const faqs = [
  {
    q: "¿Trabajas por proyecto o dentro de un equipo?",
    a: "Las dos cosas. FinTú lo construí de punta a punta por mi cuenta y Candela IA fue un encargo de un cliente. Ferova, en cambio, fue un equipo de universidad trabajando con SCRUM, ramas y revisiones de código. Me acomodo al flujo que ya exista en vez de imponer el mío.",
  },
  {
    q: "¿Cuál es tu disponibilidad?",
    a: "Estudio el 7.° ciclo de Ingeniería de Software, así que organizo el trabajo alrededor de las clases. Para sumarme a un equipo, medio tiempo; para un encargo puntual, depende del alcance y lo acordamos antes de empezar, no sobre la marcha.",
  },
  {
    q: "¿Cómo trabajas un proyecto desde cero?",
    a: "Primero entiendo el problema y a quién le duele. Después defino el alcance mínimo que ya aporta valor, lo construyo y lo pongo en producción rápido. A partir de ahí itero con feedback real en vez de suposiciones.",
  },
  {
    q: "¿Qué dejas al terminar?",
    a: "Código documentado y el deploy configurado para que cualquiera pueda continuarlo sin depender de mí. En FinTú, por ejemplo, cada push a main dispara el despliegue solo. Si hace falta mantenimiento posterior, se acuerda aparte.",
  },
];
