# NODE LEVEL — Landing

Plataforma de cultura urbana argentina. Verificación + mercado + comunidad cerrada.
Esta es la **landing page** construida con Next.js 15, Tailwind v4, GSAP y Framer Motion.
El hero usa scroll-scrub estilo Apple AirPods Pro sobre `hero-video.mp4`.

> "NODE no compite por vender más. Compite por validar mejor."

---

## Stack

- **Next.js 15** (App Router, RSC) + **TypeScript**
- **Tailwind CSS v4** (config-less, vía `@theme` en `globals.css`)
- **GSAP 3** + `ScrollTrigger` — pinning, scrub, timelines
- **Lenis** — smooth scroll integrado con ScrollTrigger
- **Framer Motion** — micro-interacciones (cursor magnético, FAQ accordion, transiciones del waitlist)
- **next/font** — Bebas Neue, DM Sans, JetBrains Mono auto-cargadas

---

## Setup

```bash
# 1. Instalar deps
npm install

# 2. Dev
npm run dev
# → http://localhost:3000

# 3. Build prod
npm run build && npm start
```

---

## El hero scroll-scrub (la pieza central)

`components/HeroScrub.tsx` pinea el viewport y "scrubea" el video con el scroll del usuario, mientras 5 capas tipográficas entran y salen sincronizadas. Tiene **dos modos** de render:

| Modo | Cuándo se activa | Cómo funciona |
|---|---|---|
| **`frames`** (recomendado) | Cuando existe `public/frames/manifest.json` | Renderiza una secuencia de imágenes en `<canvas>` — frame-perfect, 60fps, smooth en todos los browsers (técnica que usa Apple) |
| **`video`** (fallback) | Cuando NO hay frames extraídos | Usa el `<video>` element nativo y actualiza `currentTime` en cada scroll tick. Funciona out-of-the-box, un poco menos suave en Safari mobile |
| **`mobile`** | Viewport < 900px o `pointer: coarse` | Sin pin/scrub: el video va en loop autoplay y los textos se apilan verticalmente |
| **`reduced`** | `prefers-reduced-motion: reduce` | Frame estático con texto fijo, cero animación |

### Para activar el modo `frames` (más smooth, recomendado para producción)

Necesitás `ffmpeg` (`brew install ffmpeg`).

```bash
npm run frames
```

Eso ejecuta `scripts/extract-frames.sh` que extrae ~120 frames de `public/hero-video.mp4` a `public/frames/frame_001.jpg`, `frame_002.jpg`, etc. y genera un `manifest.json`. La próxima vez que cargues la página, `useScrubFrames` detecta el manifest y entra en modo `frames` automáticamente.

Configuración por env vars:
```bash
FPS=30 WIDTH=1920 npm run frames
```

> **Mientras no corras este comando, el hero funciona con el fallback `video` sin que tengas que tocar nada de código.**

---

## Estructura

```
node-level/
├── app/
│   ├── api/waitlist/route.ts   # Endpoint mock del waitlist (Edge runtime)
│   ├── fonts.ts                # next/font: Bebas Neue, DM Sans, JetBrains Mono
│   ├── globals.css             # Tokens Tailwind v4 (@theme) + animaciones
│   ├── layout.tsx              # RootLayout + LenisProvider + Cursor
│   └── page.tsx                # Composición de secciones
├── components/
│   ├── HeroScrub.tsx           # ⭐ Hero pinneado con scroll-scrub
│   ├── LenisProvider.tsx       # Smooth scroll integrado con ScrollTrigger
│   ├── Cursor.tsx              # Cursor lima magnético (Framer Motion)
│   ├── Nav.tsx                 # Nav fija con cambio de estado al scrollear
│   ├── Ticker.tsx              # Ticker tipo bolsa con precios en AR$
│   ├── Problema.tsx            # Layout asimétrico, quote masiva
│   ├── Pilares.tsx             # 3 cards verticales con números 01/02/03
│   ├── Verificacion.tsx        # 7 pasos en scroll horizontal pinneado
│   ├── Manifiesto.tsx          # Full-bleed con imagen duotone
│   ├── Membresias.tsx          # 4 tiers, BLACK destacado
│   ├── Faq.tsx                 # Accordion (AnimatePresence)
│   ├── CtaFinal.tsx            # Waitlist con éxito + código
│   ├── Footer.tsx              # Editorial, coordenadas BA
│   ├── Reveal.tsx              # Wrapper de fade-up por IntersectionObserver
│   └── SectionMeta.tsx         # "NODE / 003   ▸ EL PROBLEMA"
├── lib/
│   └── useScrubFrames.ts       # Hook que carga frames y maneja los modos
├── public/
│   ├── hero-video.mp4          # Video original (2.6 MB)
│   ├── frames/                 # Se llena con `npm run frames`
│   ├── logo-node.png
│   ├── logo-titulo.png
│   └── manifiesto-bg.jpg       # Background del Manifiesto
├── scripts/
│   └── extract-frames.sh       # ffmpeg one-liner reproducible
└── package.json
```

---

## Tokens de diseño

Definidos en `app/globals.css` (Tailwind v4 `@theme`):

| Token | Valor | Uso |
|---|---|---|
| `--color-lime` | `#C6FF3D` | Acento principal (CTAs, accents, highlights) |
| `--color-black` | `#050505` | Fondo principal |
| `--color-surface` | `#0c0c0c` | Fondo de secciones intercaladas |
| `--color-surface2` | `#131313` | FAQ |
| `--color-border` | `#1c1c1c` | Bordes hairline |
| `--color-text` | `#f1f1ec` | Texto principal |
| `--color-muted` | `#9a9a92` | Body / descripciones |
| `--color-dim` | `#4a4a44` | Meta / captions |
| `--color-danger` | `#ff3b3b` | Errores, deltas negativos del ticker |

Tipografía:
- `font-display` → Bebas Neue (titulares, números masivos)
- `font-body` → DM Sans (body, copy)
- `font-mono` → JetBrains Mono (meta, captions, datos del ticker)

---

## Waitlist API

Endpoint mock en `app/api/waitlist/route.ts`. Acepta `POST` con `{ email, city }` y devuelve un código `NL-XXXXXX`.

Cuando definas el provider real (Resend / Mailchimp / Formspree), reemplazá el handler — el resto del frontend ya queda listo.

---

## Próximos pasos (V2 — fuera del scope de la landing)

- Marketplace real con catálogo + carrito
- Sistema Ask/Bid con precios en tiempo real
- Auth + perfiles de usuario
- Dashboard de drops y verificaciones
- App móvil (React Native)

---

## Deploy

```bash
# Vercel (recomendado, un click)
npx vercel

# o exportar estático (si no usás API routes)
npx next build && npx next export
```

---

## Comandos útiles

```bash
npm run dev      # dev server con HMR
npm run build    # build de producción
npm start        # arranca el build
npm run lint     # eslint
npm run frames   # extrae frames del hero-video.mp4 (requiere ffmpeg)
```

---

## Licencia

© NODE LEVEL — todos los derechos reservados. Buenos Aires, Argentina.
