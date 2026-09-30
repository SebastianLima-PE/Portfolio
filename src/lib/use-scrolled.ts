import { useSyncExternalStore } from "react";

/**
 * Suscripción nativa al scroll. Antes esto usaba `useScroll` de Framer, pero
 * ese valor se actualiza dentro del bucle de requestAnimationFrame: para leer
 * una posición no hace falta el motor de animación, y así funciona también
 * donde el rAF esté limitado. `useSyncExternalStore` evita el useEffect.
 */
export function useScrolled(threshold = 50) {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("scroll", onChange, { passive: true });
      return () => window.removeEventListener("scroll", onChange);
    },
    () => window.scrollY > threshold,
    () => false, // en el servidor siempre arrancamos arriba
  );
}
