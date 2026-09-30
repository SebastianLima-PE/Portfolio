/**
 * Textos en inglés. Se sirven en "/en".
 *
 * No es una traducción palabra por palabra: está escrito para un reclutador
 * de fuera del Perú, así que explica lo que allá no se da por sabido (qué es
 * la UPC, qué es el MINSA, qué significa "décimo superior").
 */
import { bookingUrl, cv, projectMeta, serviceMeta } from "../data";
import type { Content } from "./types";

export const en: Content = {
  htmlLang: "en",
  ogLocale: "en_US",
  metaDescription:
    "Sebastián Pariachi, software engineering student in Lima, Peru. I " +
    "automate repetitive work, turn data into decisions, and build the full " +
    "software behind it, from data model to UI.",

  site: {
    role: "Automation, Data Analytics & AI",
    bookingUrl: bookingUrl("Book a call"),
    cv: cv.en,
  },

  hero: {
    lineOne: "BUILD",
    lineTwo: "SOFTWARE",
    tagline:
      "I automate repetitive work and turn data into decisions. And I build the full software behind it, from the data model to the interface.",
    badges: [
      { label: "Power BI & Automate", icon: "Power BI" },
      { label: "Python & AI", icon: "Python" },
      { label: "React & Node.js", icon: "React" },
      { label: "Full Stack" },
    ],
    cta: "Book a call",
  },

  projects: [
    {
      ...projectMeta.fintu,
      description:
        "SaaS with a REST API, JWT authentication and PayPal subscriptions. Shipped with CI/CD.",
      tags: ["Node.js", "Express", "React", "MySQL", "PayPal"],
    },
    {
      ...projectMeta.ferovaFamily,
      description:
        "Native Android app for families to track a child's daily anemia treatment.",
      tags: ["Kotlin", "Android"],
    },
    {
      ...projectMeta.ferovaClinic,
      description:
        "Dashboard for Peru's Ministry of Health with risk scoring, dropout prediction and district-level views.",
      tags: ["Flutter", "Prediction", "Dashboard"],
    },
    {
      ...projectMeta.candela,
      description:
        "Client project, live in production. OpenAI API on mobile: vision and text generation with tone control.",
      tags: ["OpenAI API", "Vision", "Generative AI"],
    },
  ],

  services: [
    {
      ...serviceMeta.automation,
      title: "Process Automation",
      body: "Every task someone repeats by hand each week is time you can get back. I find the bottleneck, automate it, and document the flow so your team can maintain it without depending on me.",
      skills: ["Power Automate", "Python", "Excel", "REST APIs"],
    },
    {
      ...serviceMeta.data,
      title: "Data Analytics & BI",
      body: "From raw data to a dashboard people actually use to make decisions. Cleaning, modeling and visualization focused on the business question, not on a pretty chart.",
      skills: ["Power BI", "SQL", "Pandas", "Data modeling"],
    },
    {
      ...serviceMeta.ai,
      title: "AI Integration",
      body: "Models put to work inside a product, not left in a notebook: inference built into the app, per-request cost control, and output you can actually trust.",
      skills: ["Python", "Generative AI", "LLM APIs", "scikit-learn"],
    },
    {
      ...serviceMeta.fullstack,
      title: "Full Stack Development",
      body: "The foundation everything else runs on: well-designed APIs, authentication, databases that hold up, and web and mobile interfaces connected to them.",
      skills: ["React", "Next.js", "Node.js", "MySQL", "Kotlin", "Flutter"],
    },
  ],

  about: {
    headline: {
      line1: "I automate the repetitive",
      line2: "and make data speak.",
    },
    paragraphs: [
      "I'm Sebastián Pariachi, a 7th-semester Software Engineering student at UPC (Universidad Peruana de Ciencias Aplicadas) in Lima, ranked in the top 10% of my class. I work across automation, data analytics and AI, backed by a solid full stack foundation that lets me build the whole solution, not just one piece of it.",
      "I've shipped a fintech SaaS to production with a payment gateway and CI/CD, and a system of two connected mobile apps for treating childhood anemia, designed for Peru's Ministry of Health (MINSA) facilities. I work with DDD, layered architecture and Scrum.",
    ],
  },

  history: [
    {
      role: "Full Stack Developer — Freelance",
      company: "FinTú Co. and personal projects",
      period: "2026 — Present",
    },
    {
      role: "University project development",
      company: "UPC — Ferova, mobile system for Peru's Ministry of Health",
      period: "2026",
    },
    {
      role: "B.S. Software Engineering",
      company: "UPC — 7th semester, top 10% of class",
      period: "2023 — 2028",
    },
  ],

  /**
   * Traducción de los testimonios aprobados en español. Dicen lo mismo, pero
   * las personas aprobaron la redacción en español: si alguno pregunta,
   * muéstrale también esta versión.
   */
  testimonials: [
    {
      quote:
        "The work was flawless from start to finish, and every delivery arrived on the agreed date.",
      author: "Adrián T.",
      role: "Client, Candela IA",
    },
    {
      quote:
        "He contributed consistently to the project's progress and stood out for his perseverance. A reliable person, the kind you can delegate to with peace of mind.",
      author: "Ferova Team",
      role: "Project team, UPC",
    },
  ],

  faqs: [
    {
      q: "Do you work on projects or as part of a team?",
      a: "Both. I built FinTú end to end on my own, and Candela IA was a client engagement. Ferova, on the other hand, was a university team working with Scrum, branches and code reviews. I adapt to the workflow that's already in place instead of imposing mine.",
    },
    {
      q: "What's your availability?",
      a: "I'm in my 7th semester of Software Engineering, so I plan work around my classes. For joining a team, part-time; for a one-off project, it depends on the scope, and we agree on it before starting, not along the way. I'm based in Lima (GMT-5) and work remotely.",
    },
    {
      q: "How do you approach a project from scratch?",
      a: "First I understand the problem and who it hurts. Then I define the smallest scope that already delivers value, build it, and get it into production fast. From there I iterate with real feedback instead of assumptions.",
    },
    {
      q: "What do you leave behind when you're done?",
      a: "Documented code and a configured deployment so anyone can pick it up without depending on me. In FinTú, for example, every push to main triggers the deploy on its own. Ongoing maintenance, if needed, is agreed separately.",
    },
  ],

  ui: {
    nav: [
      { label: "Work", href: "#work" },
      { label: "Services", href: "#services" },
      { label: "Contact", href: "#contact" },
    ],
    bookCall: "Book a call",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLanguage: {
      label: "ES",
      href: "/",
      ariaLabel: "Ver el portafolio en español",
    },
    avatarAlt: "3D avatar of Sebastián",
    available: "Available for work",
    projectsHeading: "Latest Projects",
    servicesHeading: { line1: "What I help you", line2: "Shape..." },
    servicesLead:
      "I don't just write code: I stay with the problem from definition to deployment. These are the four areas where I can move the needle on your project.",
    historyHeading: "Experience",
    testimonialsHeading: "Hear from the people I worked with",
    faqHeading: "Frequently asked questions",
    ctaTitle: "Still have questions?",
    ctaBody:
      "Book a free 15-minute call. We'll go over your idea and I'll tell you honestly whether I can help, and how.",
    ctaButton: "Book a free discovery call",
    footerHeading: {
      before: "Let's build",
      highlight: "incredible",
      after: "work together",
    },
    madeWith: "Built with Next.js.",
    recruiterQuestion: "Are you a recruiter?",
    downloadCv: "Download CV",
    ogAvailable: "AVAILABLE FOR WORK",
  },
};
