/**
 * Clawd, el personaje de Claude Code, en pixel art y en vista de tres
 * cuartos, como en su animación original: el costado izquierdo va en un tono
 * más oscuro, el brazo sale por la derecha y la laptop se abre a su lado.
 *
 * Escala: 10 unidades del viewBox = 1 pixel del dibujo de referencia de 25 px.
 * El suelo está en y = 70, el borde inferior del viewBox, así sus pies se
 * apoyan exactamente en la línea sobre la que se coloque.
 *
 * La animación vive en globals.css (clases `clawd-*`). Con "reducir
 * movimiento" se queda quieto y sin laptop.
 */
const BODY = "#D97757";
const SHADE = "#C0634A";
const LAPTOP = "#9B9B97";

export default function Clawd({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 -4 150 74"
      shapeRendering="crispEdges"
      aria-hidden
      className={className}
    >
      <defs>
        {/* La laptop solo existe a la derecha del cuerpo: al guardarla se
            desliza hacia la izquierda y desaparece "detrás" de él */}
        <clipPath id="clawd-side">
          <rect x="90" y="-4" width="60" height="74" />
        </clipPath>
      </defs>

      {/* Laptop, vista de lado: base plana y tapa en escalera */}
      <g clipPath="url(#clawd-side)">
        <g className="clawd-laptop" fill={LAPTOP}>
          <rect x="96" y="65" width="34" height="5" />
          <g className="clawd-lid">
            <rect x="126" y="59" width="5" height="7" />
            <rect x="130" y="53" width="5" height="7" />
            <rect x="134" y="47" width="5" height="7" />
            <rect x="138" y="41" width="5" height="7" />
          </g>
        </g>
      </g>

      {/* Patas: columna y piecito hacia la izquierda */}
      <g fill={BODY}>
        <rect x="15" y="60" width="5" height="10" />
        <rect x="10" y="65" width="5" height="5" />
        <rect x="35" y="60" width="5" height="10" />
        <rect x="30" y="65" width="5" height="5" />
        <rect x="60" y="60" width="5" height="10" />
        <rect x="55" y="65" width="5" height="5" />
        <rect x="80" y="60" width="5" height="10" />
        <rect x="75" y="65" width="5" height="5" />
      </g>

      {/* Cuerpo con el costado en sombra */}
      <rect x="10" y="0" width="80" height="60" fill={BODY} />
      <rect x="10" y="0" width="18" height="60" fill={SHADE} />

      <g className="clawd-eyes" fill="#0b0b0c">
        <rect x="40" y="14" width="10" height="10" />
        <rect x="80" y="14" width="10" height="10" />
      </g>

      {/* Brazo derecho y la mano que teclea */}
      <rect x="90" y="25" width="14" height="25" fill={BODY} />
      <rect className="clawd-hand" x="90" y="50" width="20" height="14" fill={SHADE} />
    </svg>
  );
}
