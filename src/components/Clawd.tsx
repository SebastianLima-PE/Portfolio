/**
 * Clawd, el personaje de Claude Code, en pixel art. Cada "pixel" mide 10
 * unidades del viewBox, igual que la cuadrícula del dibujo original: cuerpo
 * de 8x6, brazos de 2x2, ojos de 1x1 y cuatro patas de 1x2.
 *
 * La animación vive en globals.css (clases `clawd-*`): saca la laptop desde
 * detrás del cuerpo, la abre, teclea un rato, la cierra y la vuelve a
 * esconder. Con "reducir movimiento" se queda quieto y sin laptop.
 */
export default function Clawd({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="-10 10 140 90"
      shapeRendering="crispEdges"
      aria-hidden
      className={className}
    >
      <defs>
        {/* La laptop solo se ve por encima del borde inferior del cuerpo:
            al bajar desaparece "detrás" de él en vez de asomar entre las patas */}
        <clipPath id="clawd-pocket">
          <rect x="-10" y="10" width="140" height="70" />
        </clipPath>
      </defs>

      <g fill="#D97757">
        {/* Patas */}
        <rect x="20" y="80" width="10" height="20" />
        <rect x="40" y="80" width="10" height="20" />
        <rect x="70" y="80" width="10" height="20" />
        <rect x="90" y="80" width="10" height="20" />
        {/* Cuerpo */}
        <rect x="20" y="20" width="80" height="60" />
      </g>

      <g className="clawd-eyes" fill="#0b0b0c">
        <rect x="30" y="30" width="10" height="10" />
        <rect x="80" y="30" width="10" height="10" />
      </g>

      <g clipPath="url(#clawd-pocket)">
        <g className="clawd-laptop">
          {/* Tapa vista por detrás, con el logo al centro */}
          <g className="clawd-lid">
            <rect x="28" y="42" width="64" height="22" fill="#3b3b39" />
            <rect x="56" y="49" width="8" height="8" fill="#8c8c86" />
          </g>
          {/* Teclado */}
          <rect x="18" y="64" width="84" height="8" fill="#232322" />
        </g>
      </g>

      {/* Los brazos van al final para quedar encima del teclado al teclear */}
      <g fill="#D97757">
        <rect className="clawd-arm-l" x="0" y="40" width="20" height="20" />
        <rect className="clawd-arm-r" x="100" y="40" width="20" height="20" />
      </g>
    </svg>
  );
}
