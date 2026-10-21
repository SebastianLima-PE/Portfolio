/**
 * Clawd, el personaje de Claude Code, en pixel art y con las tres poses de su
 * animación original:
 *   - de frente, con los dos brazos y cuatro patas;
 *   - girado a la izquierda, levantando el brazo y guiñando un ojo;
 *   - girado a la derecha, con el costado en sombra, sacando la laptop.
 * La animación (globals.css, clases `clawd-*`) muestra una pose a la vez,
 * como los cuadros de un sprite.
 *
 * Escala: 10 unidades del viewBox = 1 pixel del dibujo original. El cuerpo
 * ocupa siempre x 20–100 para que al girar no "salte" de lugar, y el suelo
 * está en y = 80, el borde inferior del viewBox: sus pies se apoyan
 * exactamente en la línea sobre la que se coloque.
 *
 * Con "reducir movimiento" se queda de frente y quieto.
 */
const BODY = "#D97757";
const SHADE = "#C0634A";
const EYE = "#0b0b0c";
const LAPTOP = "#9B9B97";

export default function Clawd({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 -2 160 82"
      shapeRendering="crispEdges"
      aria-hidden
      className={className}
    >
      <defs>
        {/* La laptop solo existe a la derecha del cuerpo: al guardarla se
            desliza hacia la izquierda y desaparece "detrás" de él */}
        <clipPath id="clawd-side">
          <rect x="100" y="-2" width="60" height="82" />
        </clipPath>
      </defs>

      {/* ---------- De frente ---------- */}
      <g className="clawd-front">
        <g fill={BODY}>
          <rect x="20" y="0" width="80" height="60" />
          <rect x="0" y="20" width="20" height="20" />
          <rect x="100" y="20" width="20" height="20" />
          <rect x="20" y="60" width="10" height="20" />
          <rect x="40" y="60" width="10" height="20" />
          <rect x="70" y="60" width="10" height="20" />
          <rect x="90" y="60" width="10" height="20" />
        </g>
        <g className="clawd-blink" fill={EYE}>
          <rect x="30" y="10" width="10" height="10" />
          <rect x="80" y="10" width="10" height="10" />
        </g>
      </g>

      {/* ---------- Girado a la izquierda, guiñando ---------- */}
      <g className="clawd-left">
        <g fill={BODY}>
          <rect x="20" y="5" width="80" height="60" />
          <rect x="0" y="15" width="20" height="20" />
          <rect x="100" y="40" width="14" height="15" />
          <rect x="100" y="55" width="8" height="4" />
          <rect x="30" y="65" width="10" height="15" />
          <rect x="45" y="65" width="10" height="15" />
          <rect x="70" y="65" width="10" height="15" />
          <rect x="85" y="65" width="10" height="15" />
        </g>
        <g fill={EYE}>
          {/* Ojo guiñado: una rayita en vez del cuadrado */}
          <rect x="30" y="30" width="15" height="5" />
          <rect x="80" y="25" width="10" height="10" />
        </g>
      </g>

      {/* ---------- Girado a la derecha, con la laptop ---------- */}
      <g className="clawd-right">
        <g clipPath="url(#clawd-side)">
          <g className="clawd-laptop" fill={LAPTOP}>
            <rect x="106" y="75" width="34" height="5" />
            <g className="clawd-lid">
              <rect x="136" y="69" width="5" height="7" />
              <rect x="140" y="63" width="5" height="7" />
              <rect x="144" y="57" width="5" height="7" />
              <rect x="148" y="51" width="5" height="7" />
            </g>
          </g>
        </g>

        {/* Patas: columna y piecito hacia la izquierda */}
        <g fill={BODY}>
          <rect x="25" y="65" width="5" height="15" />
          <rect x="20" y="75" width="5" height="5" />
          <rect x="45" y="65" width="5" height="15" />
          <rect x="40" y="75" width="5" height="5" />
          <rect x="70" y="65" width="5" height="15" />
          <rect x="65" y="75" width="5" height="5" />
          <rect x="90" y="65" width="5" height="15" />
          <rect x="85" y="75" width="5" height="5" />
        </g>

        {/* Cuerpo con el costado en sombra */}
        <rect x="20" y="5" width="80" height="60" fill={BODY} />
        <rect x="20" y="5" width="18" height="60" fill={SHADE} />

        <g className="clawd-look" fill={EYE}>
          <rect x="50" y="19" width="10" height="10" />
          <rect x="90" y="19" width="10" height="10" />
        </g>

        {/* Brazo derecho y la mano que teclea */}
        <rect x="100" y="30" width="14" height="30" fill={BODY} />
        <rect className="clawd-hand" x="100" y="60" width="20" height="14" fill={SHADE} />
      </g>
    </svg>
  );
}
