import { content } from "@/lib/content/dictionaries";
import { site } from "@/lib/data";
import { OG_SIZE, renderOgImage } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = `${site.name} — ${content.en.site.role}`;

export default function Image() {
  return renderOgImage("en");
}
