"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { BarChart3, BrainCircuit, Code2, Plus, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { services, stack, type Service, type ServiceIcon } from "@/lib/data";
import Reveal, { EASE_IN_OUT, ITEM, REVEAL, Stagger } from "./Reveal";
import { TECH_ICONS } from "./tech-icons";

const ICONS: Record<ServiceIcon, LucideIcon> = {
  automation: Workflow,
  data: BarChart3,
  ai: BrainCircuit,
  fullstack: Code2,
};

const QUERY = "(min-width: 1024px)";

/**
 * El anclado por scroll solo se activa en pantallas grandes. En un teléfono,
 * retener la página cuatro pantallas se siente como si se hubiera trabado.
 * El snapshot del servidor devuelve false: el HTML inicial sale sin anclar y
 * con todas las tarjetas en el flujo normal, que es lo correcto para SEO.
 */
function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

/* --------------------------- columna izquierda --------------------------- */

function LeftColumn({ activeTools }: { activeTools: string[] }) {
  return (
    <div>
      <Reveal>
        <h2 className="heading-statement">
          What I help you to
          <br />
          <span className="text-accent">Shape...</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="lead mt-6 max-w-md text-zinc-400">
          No solo escribo código: acompaño el problema desde la definición hasta
          el deploy. Estas son las cuatro áreas donde puedo mover la aguja de tu
          proyecto.
        </p>
      </Reveal>

      <Stagger className="mt-12 flex flex-wrap gap-3" stagger={0.06}>
        {stack.map((tool) => {
          const entry = TECH_ICONS[tool.name];
          const Icon = entry?.Icon;
          const encendido = activeTools.includes(tool.name);

          return (
            <motion.div
              key={tool.name}
              variants={ITEM}
              transition={REVEAL}
              title={tool.name}
              aria-label={tool.name}
              // El logo va en gris y toma el color de marca solo al hover:
              // ocho logos a todo color de golpe compiten con el acento rojo.
              style={{ "--brand": entry?.brand } as CSSProperties}
              /*
                Los logos dejan de ser decoracion: se encienden en su color de
                marca cuando el area activa los usa. Responden a la pregunta
                que el visitante trae —con que hace exactamente cada cosa—
                sin anadir ni un movimiento nuevo a la pagina.
              */
              className={`flex h-14 w-14 cursor-default items-center justify-center rounded-2xl border bg-zinc-900/50 backdrop-blur-sm transition-[transform,color,border-color,opacity] duration-300 ease-out hover:scale-105 hover:border-white/20 hover:text-[var(--brand)] ${
                encendido
                  ? "border-white/20 text-[var(--brand)] opacity-100"
                  : "border-white/5 text-zinc-500 opacity-45"
              }`}
            >
              {Icon ? (
                <Icon className="h-6 w-6" />
              ) : (
                <span className="text-[11px] font-semibold">{tool.short}</span>
              )}
            </motion.div>
          );
        })}
      </Stagger>
    </div>
  );
}

/* ------------------------------- tarjeta -------------------------------- */

/**
 * La cabecera de la tarjeta es un boton solo cuando de verdad se puede pulsar.
 * En la pila anclada del escritorio no hay nada que pulsar, asi que sale un
 * div y ningun lector de pantalla anuncia un control inexistente.
 */
function Fila({
  onToggle,
  open,
  children,
}: {
  onToggle?: () => void;
  open: boolean;
  children: React.ReactNode;
}) {
  if (!onToggle) {
    return <div className="flex w-full items-center gap-4 p-6">{children}</div>;
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="flex w-full items-center gap-4 p-6 text-left"
    >
      {children}
    </button>
  );
}

function CardBody({
  service,
  open,
  onToggle,
  redOpacity,
}: {
  service: Service;
  open: boolean;
  onToggle?: () => void;
  /**
   * Cuanto rojo lleva la tarjeta, de 0 a 1. La pila anclada lo deriva del
   * scroll; el acordeon de movil no lo pasa y cae en la transicion CSS.
   */
  redOpacity?: MotionValue<number>;
}) {
  const Icon = ICONS[service.icon];

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border bg-zinc-900/30 transition-colors duration-300 ease-out ${
        open ? "border-transparent" : "border-white/5"
      }`}
    >
      {/*
        El rojo es una capa aparte y no el fondo de la tarjeta. Asi puede
        desvanecerse sola mientras la tarjeta se va: el rojo significa "area
        activa", y la que se retira deja de serlo. Antes las cuatro eran rojas
        siempre, y en cada cruce habia dos manchas rojas disputandose la
        atencion en vez de una retrocediendo.
        Se anima opacidad y no background-color: no toca layout ni repinta.
      */}
      {redOpacity ? (
        <motion.div
          aria-hidden
          style={{ opacity: redOpacity }}
          className="absolute inset-0 bg-accent"
        />
      ) : (
        <div
          aria-hidden
          className={`absolute inset-0 bg-accent transition-opacity duration-300 ease-out ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      <div className="relative">
        {/*
        En la pila anclada las tarjetas no se abren con clic: las mueve el
        scroll. Por eso ahi no se renderiza un boton, sino un div, y el "+"
        desaparece. Un control deshabilitado que parece interactivo es peor
        que no tener control.
      */}
        <Fila onToggle={onToggle} open={open}>
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ease-out ${
              open ? "bg-white/20 text-white" : "bg-white/5 text-accent"
            }`}
          >
            <Icon className="h-5 w-5" />
          </span>

          <span className="heading-card flex-1 text-white">
            {service.title}
          </span>

          {onToggle && (
            <motion.span
              animate={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ease-out ${
                open ? "bg-white text-accent" : "bg-white/5 text-zinc-400"
              }`}
            >
              <Plus className="h-4 w-4" />
            </motion.span>
          )}
        </Fila>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE_IN_OUT }}
            >
              <div className="px-6 pb-6 pl-20">
                <p className="text-sm leading-relaxed text-white/90">
                  {service.body}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/30 px-4 py-1.5 text-xs font-medium text-white transition-[background-color,border-color] duration-150 ease-out hover:border-white hover:bg-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ----------------------- pila anclada (escritorio) ----------------------- */

/**
 * Cada tarjeta ocupa una franja del recorrido y describe una V por el lado
 * derecho: baja girada y desenfocada desde arriba, se endereza y enfoca al
 * llegar al centro, y se retira hacia abajo por donde vino. Todo se deriva
 * del progreso del scroll, así que al subir se recorre exactamente al revés.
 *
 * Las tres formas del rango existen para no dejar huecos en los extremos: la
 * primera tarjeta arranca ya visible y la última nunca se va. Además los
 * rangos de entrada de useTransform deben ser estrictamente crecientes, así
 * que los extremos no pueden repetir el 0 ni el 1.
 */
function StackCard({
  service,
  index,
  total,
  progress,
}: {
  service: Service;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  // Cruce corto a propósito: con 0.5 las dos tarjetas se solapaban media
  // franja entera y se veían dos bloques rojos a la vez.
  const cross = 0.3 / total;

  const isFirst = index === 0;
  const isLast = index === total - 1;

  // Un único rango compartido por todas las propiedades: si cada una usara el
  // suyo, se desincronizarían y el giro no coincidiría con el desvanecido.
  const range = isFirst
    ? [0, end - cross, end]
    : isLast
      ? [start - cross, start, 1]
      : [start - cross, start, end - cross, end];

  const pick = <T,>(entra: T, activa: T, sale: T): T[] =>
    isFirst
      ? [activa, activa, sale]
      : isLast
        ? [entra, activa, activa]
        : [entra, activa, activa, sale];

  /*
    La opacidad NO usa el rango compartido, y es la unica que se sale.

    Con el rango comun, la ventana de salida de una tarjeta coincidia exacta
    con la de entrada de la siguiente: en el punto medio ambas estaban al 50%
    y el texto de la de atras se transparentaba a traves del de delante. Dos
    parrafos superpuestos a media opacidad siempre se leen sucios.

    Ahora la saliente se apaga en la PRIMERA mitad de la ventana y la entrante
    aparece en la SEGUNDA, con apenas un 10% de solape para que el relevo no
    se sienta como un corte. El desplazamiento y el giro si conservan la
    ventana ancha: la tarjeta sigue viajando aunque no se vea, y por eso el
    movimiento se percibe continuo y no a saltos.
  */
  const opacityRange = isFirst
    ? [0, end - cross, end - cross * 0.5]
    : isLast
      ? [start - cross * 0.6, start, 1]
      : [start - cross * 0.6, start, end - cross, end - cross * 0.5];

  const opacity = useTransform(progress, opacityRange, pick(0, 1, 0));

  /*
    La salida refleja la entrada. La tarjeta baja desde arriba a la derecha,
    se detiene en el centro, y se retira hacia abajo por ese mismo lado: el
    recorrido de ida, espejado. Antes salía cruzando hacia la izquierda y se
    quedaba de fondo detrás de la siguiente, que era justo lo que ensuciaba.

    Sale un poco más lejos de lo que entró (190 frente a 170) para despejar
    del todo el espacio antes de que llegue la siguiente.
  */
  const x = useTransform(progress, range, pick(170, 0, 190));
  const y = useTransform(progress, range, pick(-95, 0, 120));

  // El giro también se espeja: se retira con la misma inclinación con la que
  // llegó, como si desandara el camino en vez de seguir de largo.
  const rotateY = useTransform(progress, range, pick(-20, 0, -20));

  // La que sale se encoge más de lo que creció la que entra, para que ceda el
  // protagonismo en vez de disputarlo.
  const scale = useTransform(progress, range, pick(0.9, 1, 0.84));

  // El desenfoque es lo que separa esto de un simple deslizamiento: la tarjeta
  // que no está en foco literalmente no lo está.
  const blur = useTransform(progress, range, pick(8, 0, 12));
  const filter = useMotionTemplate`blur(${blur}px)`;

  /*
    Una sola cadena `transform` en vez de las props x/y/rotateY/scale. Los
    atajos de Motion no van acelerados por hardware y sueltan fotogramas
    justo cuando la pagina esta ocupada, que es cuando ocurre este scroll.
  */
  const transform = useMotionTemplate`translate3d(${x}px, ${y}px, 0) rotateY(${rotateY}deg) scale(${scale})`;

  // Llega ya roja y lo pierde al salir: solo hay una tarjeta roja a la vez.
  // El rojo sigue la misma ventana que la opacidad: apagarlo con el rango
  // ancho lo dejaba gris mucho antes de que la tarjeta terminara de irse.
  const redOpacity = useTransform(progress, opacityRange, pick(1, 1, 0));

  return (
    <motion.div
      style={{ opacity, transform, filter }}
      className="absolute inset-x-0 top-0 origin-center"
    >
      <CardBody service={service} open redOpacity={redOpacity} />
    </motion.div>
  );
}

/** Un tramo del riel: se llena mientras su tarjeta es la activa. */
function RailSegment({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // useTransform recorta fuera del rango, así que el tramo queda vacío antes
  // de su turno y lleno después, sin necesidad de condicionales.
  const fill = useTransform(
    progress,
    [index / total, (index + 1) / total],
    ["0%", "100%"],
  );

  return (
    <div className="relative h-14 w-full overflow-hidden rounded-full bg-white/10">
      <motion.div
        style={{ height: fill }}
        className="absolute inset-x-0 top-0 rounded-full bg-accent"
      />
    </div>
  );
}

function PinnedStack({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="flex items-center gap-6 lg:translate-x-10">
      {/*
        Riel segmentado en vez de una barra continua: dice a la vez cuánto
        falta y cuántas tarjetas hay. En una sección que retiene el scroll,
        no saber cuánto queda genera ansiedad.
      */}
      <div aria-hidden className="flex w-0.5 shrink-0 flex-col gap-2">
        {services.map((service, i) => (
          <RailSegment
            key={service.title}
            index={i}
            total={services.length}
            progress={progress}
          />
        ))}
      </div>

      {/*
        `perspective` va en el contenedor, no en las tarjetas: es lo que
        convierte el rotateY en un giro con profundidad real en vez de un
        aplastamiento horizontal.
      */}
      <div
        className="relative min-h-[19rem] flex-1"
        style={{ perspective: "1400px" }}
      >
        {services.map((service, i) => (
          <StackCard
            key={service.title}
            service={service}
            index={i}
            total={services.length}
            progress={progress}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------------- acordeón de clic (móvil) ------------------------ */

function ClickAccordion({ onOpen }: { onOpen: (i: number) => void }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <Stagger className="flex flex-col gap-3" delayChildren={0.1}>
      {services.map((service, i) => (
        <motion.div
          key={service.title}
          layout
          variants={ITEM}
          transition={REVEAL}
        >
          <CardBody
            service={service}
            open={expandedIndex === i}
            onToggle={() => {
              const siguiente = expandedIndex === i ? null : i;
              setExpandedIndex(siguiente);
              if (siguiente !== null) onOpen(siguiente);
            }}
          />
        </motion.div>
      ))}
    </Stagger>
  );
}

/* ------------------------------- sección -------------------------------- */

export default function Services() {
  const pinned = useIsDesktop();
  const ref = useRef<HTMLElement>(null);

  /*
    Que area esta activa. En escritorio la decide el scroll; en movil, la
    tarjeta que el usuario abrio. Vive aqui arriba porque la columna
    izquierda necesita el mismo dato para encender sus logos.
  */
  const [activa, setActiva] = useState(0);

  // offset "start start" → "end end": el progreso va de 0 a 1 exactamente
  // durante el tramo en que la sección permanece anclada.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!pinned) return;
    const i = Math.min(services.length - 1, Math.floor(p * services.length));
    setActiva(i);
  });

  const activeTools = services[activa]?.tools ?? [];

  return (
    <section
      ref={ref}
      id="services"
      className={pinned ? "relative h-[400vh]" : "relative"}
    >
      <div className={pinned ? "sticky top-0 flex h-svh items-center" : ""}>
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 py-24 lg:grid-cols-2">
          <LeftColumn activeTools={activeTools} />
          {pinned ? (
            <PinnedStack progress={scrollYProgress} />
          ) : (
            <ClickAccordion onOpen={setActiva} />
          )}
        </div>
      </div>
    </section>
  );
}
