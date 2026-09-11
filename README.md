# Portafolio · Sebastián Pariachi

Portafolio personal de una sola página. Automatización de procesos, analítica de datos e IA, con base en desarrollo Full Stack web y móvil.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) · React 19 |
| Estilos | Tailwind CSS v4 |
| Animación | Framer Motion 13 |
| Tipografía | Inter (`next/font`) |

## Estructura

```
src/
  app/
    layout.tsx            metadatos y fuente
    page.tsx              composición de las secciones
    opengraph-image.tsx   tarjeta de previsualización, generada en el build
    icon.tsx              favicon, generado en el build
    globals.css           escala tipográfica, tokens y keyframes
  components/             una sección por archivo
  lib/data.ts             TODO el contenido del sitio
scripts/
  gen-tech-icons.mjs      extrae los logos de marca de simple-icons
```

## Editar el contenido

Todo el texto, los proyectos, el stack, los testimonios y los enlaces viven en **`src/lib/data.ts`**. No hace falta tocar ningún componente para actualizar el sitio.

Para añadir o cambiar un logo de tecnología, edita el array `WANTED` en `scripts/gen-tech-icons.mjs` y regenera:

```bash
node scripts/gen-tech-icons.mjs
```

Los paths de marca se extraen **en tiempo de build**, así que al bundle van solo los logos que se usan y no los ~3.300 del paquete.

## Decisiones que no se ven en el código

- **La sección de servicios se ancla al scroll** en pantallas de 1024px o más: la página se retiene mientras las cuatro tarjetas se relevan. Por debajo de ese ancho vuelve a ser un acordeón normal, porque retener el scroll cuatro pantallas en un teléfono se siente como si la página se hubiera trabado.
- **Las animaciones siguen una escala fija**: `cubic-bezier(0.23, 1, 0.32, 1)` para entradas y salidas, `cubic-bezier(0.77, 0, 0.175, 1)` para lo que se morfa en pantalla, y nada de UI por encima de 300ms. Los tokens están en `globals.css`.
- **Los bucles infinitos van en CSS y no en JS**: una animación CSS corre fuera del hilo principal y sigue fluida mientras la página compila o descarga fuentes.
- **`prefers-reduced-motion` elimina el movimiento pero conserva las transiciones** de opacidad y color, que siguen ayudando a entender los cambios de estado.

## Desarrollo

```bash
npm install
```

```bash
npm run dev
```

## Licencia

El código es de referencia libre. El contenido, las imágenes y la identidad visual no.
