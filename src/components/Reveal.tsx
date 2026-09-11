"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Curva de entrada. No se inventa ni se aproxima: es la misma que define
 * `--ease-out` en globals.css. Las curvas de CSS por defecto son demasiado
 * débiles, y `ease-in` está prohibido en UI porque arranca lento justo en el
 * instante en que el usuario está mirando.
 */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/** Para movimiento o morfado en pantalla, no para entradas. */
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;

/**
 * 450ms. Por encima del tope de 300ms que rige para la UI, y a propósito:
 * esto es una revelación de marketing al hacer scroll, no un dropdown que el
 * usuario abre veinte veces al día. Cualquier control interactivo se queda
 * por debajo de 300.
 */
export const REVEAL = { duration: 0.45, ease: EASE_OUT } as const;

/** El elemento debe entrar 100px en pantalla antes de dispararse. */
export const VIEWPORT = { once: true, margin: "-100px" } as const;

/**
 * Variantes del hijo. Exportadas para nodos que las combinan con otras props.
 *
 * Se anima la cadena `transform` completa y no el atajo `y`: los atajos de
 * Motion no son acelerados por hardware y sueltan fotogramas cuando la página
 * está ocupada cargando, que es justo cuando ocurren estas entradas.
 *
 * OJO: sin `transition` aquí dentro a propósito. Si una variante define su
 * propio `transition`, gana sobre la prop `transition` del componente y
 * cualquier `delay` que se pase por prop se ignora en silencio.
 */
export const ITEM: Variants = {
  hidden: { opacity: 0, transform: "translateY(24px)" },
  visible: { opacity: 1, transform: "translateY(0px)" },
};

/** Revelado individual: sube y aparece al entrar en pantalla. */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={ITEM}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{ ...REVEAL, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Contenedor en cascada. Los hijos NO llevan su propio `whileInView`: heredan
 * el estado del padre, y `staggerChildren` los separa en el tiempo. Si un hijo
 * declara su propio `initial`/`animate` rompe la herencia y el stagger se pierde.
 */
export function Stagger({
  children,
  className,
  stagger = 0.06,
  delayChildren = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        // 30–80ms entre hijos: por debajo no se percibe la cascada y por
        // encima el último tarda tanto que parece que la página va lenta.
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Hijo de <Stagger>. Solo declara variantes; el padre dispara. */
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={ITEM} transition={REVEAL}>
      {children}
    </motion.div>
  );
}
