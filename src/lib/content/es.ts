/**
 * Textos en español. Se sirven en "/".
 *
 * Si cambias una frase aquí, cámbiala también en `en.ts`. Los enlaces, las
 * imágenes y el reparto del bento viven en `lib/data.ts` y valen para los dos.
 */
import { bookingUrl, cv, projectMeta, serviceMeta } from "../data";
import type { Content } from "./types";

export const es: Content = {
  htmlLang: "es",
  ogLocale: "es_PE",
  /*
    LinkedIn descarta las descripciones de menos de 100 caracteres y muestra
    la tarjeta sin texto. Esta ronda los 170, que es la franja util:
    suficiente para pasar el filtro y por debajo del punto donde LinkedIn
    recorta.
  */
  metaDescription:
    "Sebastián Pariachi, estudiante de Ingeniería de Software en Lima. " +
    "Automatizo lo repetitivo, convierto datos en decisiones y construyo el " +
    "software completo que lo sostiene, del modelo de datos a la interfaz.",

  site: {
    role: "Automatización, Analítica de Datos e IA",
    bookingUrl: bookingUrl("Agendar una llamada"),
    cv: cv.es,
  },

  hero: {
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
      { label: "Full Stack" },
    ],
    cta: "Agendar una llamada",
  },

  projects: [
    {
      ...projectMeta.fintu,
      description:
        "SaaS con API REST, autenticación JWT y suscripciones con PayPal. Desplegado con CI/CD.",
      tags: ["Node.js", "Express", "React", "MySQL", "PayPal"],
    },
    {
      ...projectMeta.ferovaFamily,
      description:
        "App Android nativa para el seguimiento diario del tratamiento de anemia infantil.",
      tags: ["Kotlin", "Android"],
    },
    {
      ...projectMeta.ferovaClinic,
      description:
        "Panel para el MINSA con semáforo de riesgo, predicción de abandono y dashboard distrital.",
      tags: ["Flutter", "Predicción", "Dashboard"],
    },
    {
      ...projectMeta.candela,
      description:
        "Para cliente, en producción. API de OpenAI en móvil: visión y generación de texto con control de tono.",
      tags: ["OpenAI API", "Visión", "IA generativa"],
    },
  ],

  services: [
    {
      ...serviceMeta.automation,
      title: "Automatización de Procesos",
      body: "Todo proceso que alguien repite a mano cada semana es tiempo que se puede recuperar. Identifico el cuello de botella, lo automatizo y dejo el flujo documentado para que el equipo lo mantenga sin depender de mí.",
      skills: ["Power Automate", "Python", "Excel", "APIs REST"],
    },
    {
      ...serviceMeta.data,
      title: "Analítica de Datos & BI",
      body: "Del dato crudo al tablero que alguien realmente usa para decidir. Limpieza, modelado y visualización con foco en la pregunta de negocio, no en el gráfico bonito.",
      skills: ["Power BI", "SQL", "Pandas", "Modelado de datos"],
    },
    {
      ...serviceMeta.ai,
      title: "Integración de IA",
      body: "Modelos puestos a trabajar dentro de un producto, no en un notebook: inferencia integrada a la app, control de costos por request y una salida en la que se pueda confiar.",
      skills: ["Python", "IA generativa", "APIs de LLM", "scikit-learn"],
    },
    {
      ...serviceMeta.fullstack,
      title: "Desarrollo Full Stack",
      body: "La base sobre la que se apoya todo lo anterior: APIs bien diseñadas, autenticación, bases de datos que aguantan, e interfaces web y móviles conectadas a ellas.",
      skills: ["React", "Next.js", "Node.js", "MySQL", "Kotlin", "Flutter"],
    },
  ],

  about: {
    /** Titular de la sección. La segunda línea sale en rojo. */
    headline: {
      line1: "Automatizo lo repetitivo",
      line2: "y hago hablar a los datos.",
    },
    paragraphs: [
      "Soy Sebastián Pariachi, estudiante de 7.° ciclo de Ingeniería de Software en la UPC, en el décimo superior de mi promoción. Me muevo entre la automatización, la analítica de datos y la IA, con una base sólida de desarrollo Full Stack que me permite construir la solución entera y no solo una parte.",
      "He puesto en producción un SaaS financiero con pasarela de pagos y CI/CD, y un sistema de dos apps móviles conectadas para el tratamiento de la anemia infantil, pensado para instalaciones del MINSA. Trabajo con DDD, arquitectura por capas y SCRUM.",
    ],
  },

  history: [
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
  ],

  /**
   * Testimonios reales, redactados a partir de lo que cada persona comentó.
   *
   * Confirmados por ambos en septiembre de 2026: están parafraseados, no son
   * transcripciones literales, y las dos personas dieron el visto bueno a esta
   * redacción y al uso de su nombre. Si los reescribes, vuelve a preguntar.
   *
   * No hay un tercero a propósito. FinTú fue un proyecto personal y no hay
   * nadie que pueda dar fe; inventar una cita para llenar el hueco es
   * exactamente el riesgo que estos dos testimonios reales evitan. Dos
   * verificables valen más que tres donde uno es falso.
   */
  testimonials: [
    {
      quote:
        "El trabajo fue impecable de principio a fin, y cada entrega llegó en la fecha acordada.",
      author: "Adrián T.",
      role: "Cliente de Candela IA",
    },
    {
      // El cumplimiento de plazos ya lo cubre el testimonio de Adrián.
      // Repetirlo aquí hacía que los dos sonaran a la misma plantilla; este se
      // queda con lo que solo puede decir alguien que trabajó contigo en equipo.
      quote:
        "Aportó de forma constante al avance del proyecto y destacó por su perseverancia. Una persona confiable, de las que uno delega con tranquilidad.",
      author: "Equipo Ferova",
      role: "Equipo del proyecto, UPC",
    },
  ],

  /*
    Las preguntas sirven a dos lectores a la vez: quien evalua un perfil para
    un equipo y quien evalua a alguien para encargarle un proyecto. La primera
    responde en voz alta la duda que ambos tienen al llegar, en vez de dejar
    que la adivinen por el tono de la pagina.
  */
  faqs: [
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
  ],

  /*
    Los titulares en inglés ("Latest Projects", "Book a call"...) vienen del
    diseño de referencia y se quedan a propósito en la versión en español.
    Si algún día los quieres en español, basta con cambiarlos aquí.
  */
  ui: {
    nav: [
      { label: "Work", href: "#work" },
      { label: "Services", href: "#services" },
      { label: "Contact", href: "#contact" },
    ],
    bookCall: "Book a call",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    switchLanguage: {
      label: "EN",
      href: "/en",
      ariaLabel: "Ver el portafolio en inglés",
    },
    avatarAlt: "Avatar 3D de Sebastián",
    available: "Disponible para trabajar",
    projectsHeading: "Latest Projects",
    servicesHeading: { line1: "What I help you to", line2: "Shape..." },
    servicesLead:
      "No solo escribo código: acompaño el problema desde la definición hasta el deploy. Estas son las cuatro áreas donde puedo mover la aguja de tu proyecto.",
    historyHeading: "Trayectoria",
    testimonialsHeading: "Hear from the people I worked with",
    faqHeading: "Preguntas frecuentes",
    ctaTitle: "¿Todavía con dudas?",
    ctaBody:
      "Agenda una llamada gratuita de 15 minutos. Revisamos tu idea y te digo con franqueza si puedo ayudarte y cómo.",
    ctaButton: "Book a free discovery call",
    footerHeading: {
      before: "Let's build",
      highlight: "incredible",
      after: "work together",
    },
    madeWith: "Hecho con Next.js.",
    recruiterQuestion: "¿Eres reclutador?",
    downloadCv: "Descargar CV",
    ogAvailable: "DISPONIBLE PARA TRABAJAR",
  },
};
