/**
 * Genera src/components/tech-icons.tsx con los paths de marca de simple-icons.
 *
 * Se extraen en tiempo de build en vez de importar el paquete en runtime: así
 * el bundle solo lleva estos logos y no los ~3.300 del paquete completo.
 *
 *   node scripts/gen-tech-icons.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import * as si from "simple-icons";

/**
 * `override` existe para marcas cuyo color oficial no funciona sobre fondo
 * oscuro. El negro de Next.js sería invisible sobre #0a0a0a.
 */
const WANTED = [
  { slug: "react", title: "React" },
  { slug: "nextdotjs", title: "Next.js", override: "#FFFFFF" },
  { slug: "typescript", title: "TypeScript" },
  { slug: "python", title: "Python" },
  { slug: "nodedotjs", title: "Node.js" },
  { slug: "express", title: "Express", override: "#FFFFFF" },
  { slug: "mysql", title: "MySQL" },
  { slug: "kotlin", title: "Kotlin" },
  { slug: "flutter", title: "Flutter" },
  { slug: "pandas", title: "Pandas", override: "#A78BFA" },
  { slug: "scikitlearn", title: "scikit-learn" },
  { slug: "docker", title: "Docker" },
];

/**
 * Marcas que simple-icons no puede distribuir —Microsoft pidió retirar las
 * suyas— y que caen en un icono genérico de lucide. El color es el de la marca
 * real, para que el hover siga siendo reconocible.
 */
const LUCIDE_FALLBACKS = [
  { title: "Power BI", icon: "BarChart3", color: "#F2C811" },
  { title: "Power Automate", icon: "Workflow", color: "#0066FF" },
];

const key = (slug) => "si" + slug.charAt(0).toUpperCase() + slug.slice(1);
// La primera letra debe ir en mayuscula: un componente en minuscula lo trata
// React como etiqueta HTML y no renderiza nada.
const componentName = (title) => {
  const limpio = title.replace(/[^A-Za-z]/g, "");
  return limpio.charAt(0).toUpperCase() + limpio.slice(1) + "Icon";
};

let out = `import type { ComponentType, SVGProps } from "react";
import { ${LUCIDE_FALLBACKS.map((f) => f.icon).join(", ")} } from "lucide-react";

/**
 * ARCHIVO GENERADO — no editar a mano.
 * Regenerar con: node scripts/gen-tech-icons.mjs
 *
 * Paths de marca extraidos de simple-icons en tiempo de build, no importados
 * en runtime: el bundle carga solo estos logos y no los ~3.300 del paquete.
 *
 * Power BI no esta en simple-icons (Microsoft pidio retirar sus marcas), asi
 * que cae en un icono generico de graficas de lucide.
 */

type IconProps = SVGProps<SVGSVGElement>;

function brand(path: string) {
  return function Icon(props: IconProps) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
        <path d={path} />
      </svg>
    );
  };
}

`;

const entries = [];

for (const { slug, title, override } of WANTED) {
  const icon = si[key(slug)];
  if (!icon) throw new Error(`simple-icons no tiene "${slug}"`);

  const name = componentName(title);
  out += `export const ${name} = brand(\n  ${JSON.stringify(icon.path)},\n);\n\n`;
  entries.push({ title, name, color: override ?? `#${icon.hex}` });
}

out += `export const TECH_ICONS: Record<
  string,
  { Icon: ComponentType<IconProps>; brand: string }
> = {
`;
for (const { title, name, color } of entries) {
  out += `  ${JSON.stringify(title)}: { Icon: ${name}, brand: ${JSON.stringify(color)} },\n`;
}
for (const { title, icon, color } of LUCIDE_FALLBACKS) {
  out += `  ${JSON.stringify(title)}: { Icon: ${icon}, brand: ${JSON.stringify(color)} },\n`;
}
out += `};\n`;

mkdirSync("src/components", { recursive: true });
writeFileSync("src/components/tech-icons.tsx", out);

console.log(`generado src/components/tech-icons.tsx (${(out.length / 1024).toFixed(1)} KB)`);
for (const e of entries) console.log(`  ${e.title.padEnd(12)} ${e.color}`);
