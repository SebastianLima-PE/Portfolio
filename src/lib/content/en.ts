/**
 * Textos en inglés. Se sirven en "/en".
 *
 * No es una traducción palabra por palabra: está escrito para un reclutador
 * de fuera del Perú, así que explica lo que allá no se da por sabido (qué es
 * la UPC, qué es el MINSA, qué significa "décimo superior").
 */
import { contactUrl, cv, projectMeta } from "../data";
import type { Content } from "./types";

export const en: Content = {
  htmlLang: "en",
  ogLocale: "en_US",
  metaDescription:
    "Sebastian Pariachi, software engineering student in Lima, Peru, looking " +
    "for an internship. End-to-end web and mobile development with a " +
    "strength in data: SQL, Power BI and automation.",

  site: {
    role: "Software Engineering · Data & Development",
    contactUrl: contactUrl("Internship"),
    cv: cv.en,
  },

  hero: {
    kicker: ["Software Engineering · UPC", "Looking for an internship"],
    tagline:
      "7th-semester student, top 10% of my class. I build software end to end —web, mobile and APIs— and my strength is data: SQL, Power BI and automation that turn information into decisions.",
    badges: [
      { label: "SQL & Power BI", icon: "Power BI" },
      { label: "Python", icon: "Python" },
      { label: "React & Node.js", icon: "React" },
      { label: "Kotlin & Flutter", icon: "Kotlin" },
    ],
  },

  projects: [
    {
      ...projectMeta.ferovaClinic,
      category: "Data · Public health",
      year: "2026",
      description:
        "Dashboard for Peru's Ministry of Health (MINSA) facilities that follows childhood anemia treatment: per-patient risk scoring, a predictive dropout score and a district-level view. One of the two apps in the Ferova system, both connected to a TypeScript backend with a REST API documented in Swagger.",
      highlights: [
        { value: "19/20", label: "project grade" },
        { value: "80%", label: "target reach of mothers" },
        { value: "5", label: "tracking modules" },
      ],
      tags: ["Flutter", "TypeScript", "REST API", "Swagger", "Prediction"],
    },
    {
      ...projectMeta.fintu,
      category: "Full Stack · Personal project",
      year: "2026",
      description:
        "SaaS platform that brings credit card management for the Peruvian market into one place. Spending summaries come from SQL aggregation queries, auth runs on JWT, and every push to main deploys itself through GitHub Actions.",
      highlights: [
        { value: "93%", label: "less time to production" },
        { value: "CI/CD", label: "GitHub Actions + Cloudflare Pages" },
      ],
      tags: ["React", "Node.js", "Express", "MySQL", "JWT"],
    },
    {
      ...projectMeta.ferovaFamily,
      category: "Mobile · Native Android",
      year: "2026",
      description:
        "The family-facing app of the Ferova system: daily tracking of doses, nutrition and treatment adherence, teleconsultations and geolocation of the nearest facility. Built as a team with Scrum, branches and code reviews.",
      highlights: [
        { value: "2", label: "apps sharing one backend" },
        { value: "Kotlin", label: "native Android" },
      ],
      tags: ["Kotlin", "Android", "REST API"],
    },
    {
      ...projectMeta.candela,
      category: "AI · Client project",
      year: "2026",
      description:
        "Mobile app built for a client and live in production. It uses the OpenAI API to analyze images and generate text with tone control.",
      highlights: [
        { value: "Live", label: "in production for a client" },
        { value: "Vision + text", label: "with the OpenAI API" },
      ],
      tags: ["OpenAI API", "Vision", "Generative AI"],
    },
  ],

  skills: [
    {
      title: "Data & BI",
      body: "From raw data to a decision. SQL aggregation queries, data modeling, Power BI dashboards with Power Query and DAX, and advanced Excel. I start from the business question and pick the chart after.",
      tools: ["SQL", "Power BI", "DAX", "Power Query", "Excel", "Python"],
      featured: true,
    },
    {
      title: "Web development",
      body: "React interfaces wired to my own REST APIs in Node.js and Express, with JWT authentication and relational databases.",
      tools: ["React", "TypeScript", "Node.js", "Express", "MySQL"],
    },
    {
      title: "Mobile development",
      body: "Native Android apps in Kotlin and cross-platform apps in Flutter, consuming the same backend as the web version.",
      tools: ["Kotlin", "Flutter", "REST API"],
    },
    {
      title: "Automation & AI",
      body: "Flows that replace repetitive manual work, and AI models integrated into a real app, not just a notebook.",
      tools: ["Power Automate", "Power Apps", "Python", "OpenAI API"],
    },
    {
      title: "How I work",
      body: "Git with branches and code reviews, continuous deployment, containers and Scrum. The things that let a team pick up what I leave behind.",
      tools: ["Git", "GitHub Actions", "Docker", "Scrum", "DDD"],
    },
  ],

  about: {
    paragraphs: [
      "I'm Sebastian Pariachi, a 7th-semester Software Engineering student at UPC (Universidad Peruana de Ciencias Aplicadas) in Lima, ranked in the top 10% of my class. I like building the whole solution, from the data model to the interface, and my favorite moment is when the data answers a question nobody could answer before.",
      "I'm looking for an internship on a team where I can contribute from the first month and keep learning. Data is my strength, but I'm comfortable in web, mobile or automation work: what matters is the problem to solve.",
    ],
    facts: [
      { label: "University", value: "UPC, Lima" },
      { label: "Semester", value: "7th semester" },
      { label: "Ranking", value: "Top 10% of class" },
      { label: "Graduation", value: "July 2028 (expected)" },
      { label: "Location", value: "Lima, Peru (GMT-5)" },
      { label: "Languages", value: "Spanish (native) · English (intermediate)" },
    ],
  },

  history: [
    {
      role: "Full Stack Developer",
      company: "FinTú Co. (personal project) and Candela IA (client)",
      period: "2026 — Present",
    },
    {
      role: "Full Stack Mobile Developer",
      company: "UPC — Ferova project, system for Peru's Ministry of Health",
      period: "Mar — Jul 2026",
    },
    {
      role: "Operations Assistant",
      company: "Saga Falabella — inventory of 500+ SKUs during peak season",
      period: "Mar — Apr 2025",
    },
    {
      role: "B.S. Software Engineering",
      company: "UPC — 7th semester, top 10% of class",
      period: "2023 — 2028",
    },
  ],

  certifications: [
    { name: "Data Analytics for Machine Learning", issuer: "IBM SkillsBuild", date: "Sep 2026" },
    { name: "SQL (Advanced)", issuer: "HackerRank", date: "Aug 2026" },
    { name: "Fundamentals of ML and AI", issuer: "AWS Training", date: "Jul 2026" },
    { name: "Python for Everybody", issuer: "University of Michigan · Coursera", date: "Jun 2026" },
    { name: "Prompt Design in Vertex AI", issuer: "Google Cloud", date: "May 2026" },
    { name: "Google IT Support", issuer: "Google · Coursera", date: "Apr 2026" },
    { name: "Power BI Intensive (32 h)", issuer: "IDAT · Intercorp", date: "Mar 2026" },
  ],

  /**
   * Traducción de los testimonios aprobados en español. Dicen lo mismo, pero
   * las personas aprobaron la redacción en español: si alguno pregunta,
   * muéstrale también esta versión.
   */
  testimonials: [
    {
      quote:
        "He contributed consistently to the project's progress and stood out for his perseverance. A reliable person, the kind you can delegate to with peace of mind.",
      author: "Ferova Team",
      role: "Project team, UPC",
    },
    {
      quote:
        "The work was flawless from start to finish, and every delivery arrived on the agreed date.",
      author: "Adrián T.",
      role: "Client, Candela IA",
    },
  ],

  faqs: [
    {
      q: "What kind of internship are you looking for?",
      a: "A software development, data or automation internship. Data is my strength, but I'm not limited to BI: I'm interested in any team where I can contribute and learn, whether backend, frontend, mobile or analytics.",
    },
    {
      q: "What's your availability?",
      a: "I'm in my 7th semester of Software Engineering and plan my hours around classes. I'm based in Lima, Peru (GMT-5), and can work on-site, hybrid or remote.",
    },
    {
      q: "Have you worked on a team?",
      a: "Yes. Ferova was a university team working with Scrum, branches and code reviews, and Candela IA was a real client engagement with delivery dates. FinTú I built on my own, end to end.",
    },
    {
      q: "What would you bring from day one?",
      a: "I've already taken projects to production, so I know the full cycle: Git, APIs, databases and deployment. I can take on real tasks in the first weeks, and I ask when I don't know something instead of guessing.",
    },
  ],

  ui: {
    nav: [
      { label: "Work", href: "#work" },
      { label: "Skills", href: "#skills" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLanguage: {
      label: "ES",
      href: "/",
      ariaLabel: "Ver el portafolio en español",
    },
    avatarAlt: "3D avatar of Sebastian",
    photoAlt: "Photo of Sebastian Pariachi",
    available: "Open to internships",
    scrollDown: "Scroll",
    projectsHeading: "Projects",
    projectsLead: "Open a project to see what I built and what it achieved.",
    viewProject: "View project",
    skillsHeading: "What I do",
    skillsLead: "End-to-end development, with data as my strength.",
    strength: "My strength",
    aboutHeading: "About",
    historyHeading: "Experience",
    certificationsHeading: "Certifications",
    testimonialsHeading: "Hear from the people I worked with",
    faqHeading: "Frequently asked questions",
    footerHeading: ["Got a spot", "on your team?"],
    footerButton: "Send me a message",
    madeWith: "Built with Next.js.",
    downloadCv: "Download CV",
    ogAvailable: "OPEN TO INTERNSHIPS",
  },
};
