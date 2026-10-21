/**
 * Texto con **resaltados**: lo que va entre dobles asteriscos sale en tinta y
 * con algo de peso; el resto hereda el gris del párrafo. Así un bloque largo
 * se puede leer en diagonal, solo por las partes que importan.
 */
export default function Highlight({ text }: { text: string }) {
  return text.split("**").map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-medium text-ink">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}
