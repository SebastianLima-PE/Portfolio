/**
 * Textos en español. Se sirven en "/".
 *
 * Si cambias una frase aquí, cámbiala también en `en.ts`. Los enlaces y las
 * imágenes viven en `lib/data.ts` y valen para los dos.
 *
 * A quién le habla: a un reclutador o líder técnico que busca practicante.
 * Por eso no hay "agenda una llamada" ni "te ayudo con tu proyecto": el sitio
 * cuenta qué sabes hacer, lo demuestra con proyectos y deja el CV a un clic.
 */
import { contactUrl, cv, projectMeta } from "../data";
import type { Content } from "./types";

export const es: Content = {
  htmlLang: "es",
  ogLocale: "es_PE",
  /*
    LinkedIn descarta las descripciones de menos de 100 caracteres y muestra
    la tarjeta sin texto, y recorta pasados los ~170. Esta queda en medio.
  */
  metaDescription:
    "Sebastian Pariachi, estudiante de Ingeniería de Software en la UPC " +
    "buscando prácticas. Desarrollo web y móvil de punta a punta, con " +
    "fortaleza en datos: SQL, Power BI y automatización.",

  site: {
    role: "Ingeniería de Software · Datos y Desarrollo",
    contactUrl: contactUrl("Prácticas pre-profesionales"),
    cv: cv.es,
  },

  hero: {
    kicker: ["Ingeniería de Software · UPC", "Busco prácticas pre-profesionales"],
    tagline:
      "Estudiante de 7.° ciclo, en el décimo superior de mi carrera. Construyo software de punta a punta —web, móvil y APIs— y mi fuerte son los datos: SQL, Power BI y automatización para que la información se convierta en decisiones.",
    /** `icon` es una clave de TECH_ICONS; sin ella la etiqueta va solo con texto */
    badges: [
      { label: "SQL & Power BI", icon: "Power BI" },
      { label: "Python", icon: "Python" },
      { label: "React & Node.js", icon: "React" },
      { label: "Kotlin & Flutter", icon: "Kotlin" },
    ],
  },

  /*
    Ferova Clinic va primero porque es el proyecto más cercano a datos
    (dashboard, semáforo de riesgo, score predictivo). Cuando tengas un
    proyecto de BI propio, ese pasa a ser el primero.
  */
  projects: [
    {
      ...projectMeta.ferovaClinic,
      category: "Datos · Salud pública",
      year: "2026",
      description:
        "Panel para establecimientos del MINSA que acompaña el tratamiento de la anemia infantil: semáforo de riesgo por paciente, score predictivo de abandono y dashboard distrital. Es una de las dos apps del sistema Ferova, conectadas a un backend en TypeScript con API REST documentada en Swagger.",
      highlights: [
        { value: "19/20", label: "nota del proyecto" },
        { value: "80%", label: "meta de alcance de madres" },
        { value: "5", label: "módulos de seguimiento" },
      ],
      tags: ["Flutter", "TypeScript", "API REST", "Swagger", "Predicción"],
    },
    {
      ...projectMeta.fintu,
      category: "Full Stack · Proyecto personal",
      year: "2026",
      description:
        "Plataforma SaaS que centraliza la gestión de tarjetas de crédito del mercado peruano en un solo lugar. Los resúmenes de gasto salen de consultas SQL de agregación, la autenticación es con JWT y cada push a main se despliega solo con GitHub Actions.",
      highlights: [
        { value: "93%", label: "menos tiempo de paso a producción" },
        { value: "CI/CD", label: "GitHub Actions + Cloudflare Pages" },
      ],
      tags: ["React", "Node.js", "Express", "MySQL", "JWT"],
    },
    {
      ...projectMeta.ferovaFamily,
      category: "Móvil · Android nativo",
      year: "2026",
      description:
        "La app para las familias del sistema Ferova: registro diario de dosis, nutrición, adherencia al tratamiento, teleconsultas y geolocalización del establecimiento más cercano. Trabajo en equipo con SCRUM, ramas y revisiones de código.",
      highlights: [
        { value: "2", label: "apps conectadas al mismo backend" },
        { value: "Kotlin", label: "Android nativo" },
      ],
      tags: ["Kotlin", "Android", "API REST"],
    },
    {
      ...projectMeta.candela,
      category: "IA · Encargo de cliente",
      year: "2026",
      description:
        "App móvil hecha para un cliente y en producción. Usa la API de OpenAI para analizar imágenes y generar texto con control de tono.",
      highlights: [
        { value: "En vivo", label: "en producción para un cliente" },
        { value: "Visión + texto", label: "con la API de OpenAI" },
      ],
      tags: ["OpenAI API", "Visión", "IA generativa"],
    },
  ],

  skills: [
    {
      title: "Datos y BI",
      body: "Del dato crudo a la decisión. Consultas SQL de agregación, modelado de datos, tableros en Power BI con Power Query y DAX, y Excel avanzado. Empiezo por la pregunta de negocio y después elijo el gráfico.",
      tools: ["SQL", "Power BI", "DAX", "Power Query", "Excel", "Python"],
      featured: true,
    },
    {
      title: "Desarrollo web",
      body: "Interfaces en React conectadas a APIs REST propias en Node.js y Express, con autenticación JWT y bases de datos relacionales.",
      tools: ["React", "TypeScript", "Node.js", "Express", "MySQL"],
    },
    {
      title: "Desarrollo móvil",
      body: "Apps Android nativas en Kotlin y multiplataforma en Flutter, consumiendo el mismo backend que la versión web.",
      tools: ["Kotlin", "Flutter", "API REST"],
    },
    {
      title: "Automatización e IA",
      body: "Flujos que reemplazan trabajo manual repetido y modelos de IA integrados dentro de una app real, no solo en un notebook.",
      tools: ["Power Automate", "Power Apps", "Python", "OpenAI API"],
    },
    {
      title: "Forma de trabajo",
      body: "Git con ramas y revisiones de código, despliegue continuo, contenedores y SCRUM. Lo que hace que un equipo pueda continuar lo que dejo.",
      tools: ["Git", "GitHub Actions", "Docker", "SCRUM", "DDD"],
    },
  ],

  about: {
    paragraphs: [
      "Soy Sebastian Pariachi, estudiante de 7.° ciclo de Ingeniería de Software en la UPC y parte del décimo superior de mi carrera. Me gusta construir la solución completa, desde el modelo de datos hasta la interfaz, y lo que más disfruto es el momento en que los datos responden una pregunta que antes nadie podía contestar.",
      "Busco mis prácticas pre-profesionales en un equipo donde pueda aportar desde el primer mes y seguir aprendiendo. Mi fuerte son los datos, pero me siento cómodo en desarrollo web, móvil o automatización: lo que importa es el problema que hay que resolver.",
    ],
  },

  history: [
    {
      role: "Desarrollador Full Stack",
      company: "FinTú Co. (proyecto personal) y Candela IA (cliente)",
      period: "2026 — Presente",
    },
    {
      role: "Desarrollador Móvil Full Stack",
      company: "UPC — Proyecto Ferova, sistema para el MINSA",
      period: "Mar — Jul 2026",
    },
    {
      role: "Auxiliar Operativo",
      company: "Saga Falabella — inventario de más de 500 SKUs en campaña",
      period: "Mar — Abr 2025",
    },
    {
      role: "Ingeniería de Software",
      company: "UPC — 7.° ciclo, décimo superior",
      period: "2023 — 2028",
    },
  ],

  certifications: [
    { name: "Data Analytics for Machine Learning", issuer: "IBM SkillsBuild", date: "Sep 2026" },
    { name: "SQL (Advanced)", issuer: "HackerRank", date: "Ago 2026" },
    { name: "Fundamentals of ML and AI", issuer: "AWS Training", date: "Jul 2026" },
    { name: "Python for Everybody", issuer: "University of Michigan · Coursera", date: "Jun 2026" },
    { name: "Prompt Design in Vertex AI", issuer: "Google Cloud", date: "May 2026" },
    { name: "Google IT Support", issuer: "Google · Coursera", date: "Abr 2026" },
    { name: "Power BI Intensivo (32 h)", issuer: "IDAT · Intercorp", date: "Mar 2026" },
  ],

  /**
   * Testimonios reales, redactados a partir de lo que cada persona comentó.
   *
   * Confirmados por ambos en septiembre de 2026: están parafraseados, no son
   * transcripciones literales, y las dos personas dieron el visto bueno a esta
   * redacción y al uso de su nombre. Si los reescribes, vuelve a preguntar.
   */
  testimonials: [
    {
      quote:
        "Aportó de forma constante al avance del proyecto y destacó por su perseverancia. Una persona confiable, de las que uno delega con tranquilidad.",
      author: "Equipo Ferova",
      role: "Equipo del proyecto, UPC",
    },
    {
      quote:
        "El trabajo fue impecable de principio a fin, y cada entrega llegó en la fecha acordada.",
      author: "Adrián T.",
      role: "Cliente de Candela IA",
    },
  ],

  /*
    Las dudas que trae un reclutador al revisar a un practicante, respondidas
    antes de que tenga que escribir para preguntarlas.
  */
  faqs: [
    {
      q: "¿Qué tipo de prácticas buscas?",
      a: "Prácticas pre-profesionales en desarrollo de software, datos o automatización. Mi fuerte son los datos, pero no me limito a BI: me interesa cualquier equipo donde pueda aportar y aprender, sea backend, frontend, móvil o analítica.",
    },
    {
      q: "¿Cuál es tu disponibilidad?",
      a: "Estoy en 7.° ciclo de Ingeniería de Software y organizo mis horarios alrededor de las clases. Vivo en Lima, así que puedo trabajar presencial, híbrido o remoto.",
    },
    {
      q: "¿Has trabajado en equipo?",
      a: "Sí. Ferova fue un equipo de la universidad trabajando con SCRUM, ramas y revisiones de código, y Candela IA fue un encargo con un cliente real y fechas de entrega. FinTú lo construí solo, de punta a punta.",
    },
    {
      q: "¿Qué aportarías desde el inicio?",
      a: "Ya he llevado proyectos a producción, así que conozco el ciclo completo: Git, APIs, bases de datos y despliegue. Puedo tomar tareas reales desde las primeras semanas y hacer preguntas cuando algo no lo sé, en vez de adivinar.",
    },
  ],

  ui: {
    nav: [
      { label: "Proyectos", href: "#work" },
      { label: "Habilidades", href: "#skills" },
      { label: "Sobre mí", href: "#about" },
      { label: "Contacto", href: "#contact" },
    ],
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    switchLanguage: {
      label: "EN",
      href: "/en",
      ariaLabel: "Ver el portafolio en inglés",
    },
    photoAlt: "Sebastian Pariachi",
    available: "Disponible para prácticas",
    scrollDown: "Baja",
    projectsHeading: "Proyectos",
    projectsLead: "Toca un proyecto para ver qué hice y qué logró.",
    viewProject: "Ver proyecto",
    skillsHeading: "Lo que sé hacer",
    skillsLead:
      "Desarrollo de punta a punta, con los datos como mi fortaleza.",
    strength: "Mi fortaleza",
    aboutHeading: "Sobre mí",
    historyHeading: "Trayectoria",
    certificationsHeading: "Certificaciones",
    testimonialsHeading: "Lo que dicen quienes trabajaron conmigo",
    faqHeading: "Preguntas frecuentes",
    footerHeading: ["¿Hay un lugar", "en tu equipo?"],
    footerButton: "Escríbeme",
    madeWith: "Hecho con Next.js.",
    downloadCv: "Descargar CV",
    ogAvailable: "DISPONIBLE PARA PRÁCTICAS",
  },
};
