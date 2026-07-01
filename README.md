# Handoff: Cumbayá Village — Homepage

## Overview
A full redesign of the **Cumbayá Village** marketing homepage — a senior-living residence ("Residencia del Adulto Mayor") in Cumbayá, Quito, Ecuador. The page presents the brand, its four service tiers, its four physical locations (sedes), the integral-care program, social proof, a social-media feed, and conversion CTAs (WhatsApp / phone). Audience: close family members (spouses, adult children) researching care for a loved one. Tone: warm, reassuring, professional. All copy is in **Spanish (es-EC)**.

## About the Design Files
The file in this bundle (`index.html`) is a **design reference created in HTML** — a working prototype that shows the intended look, layout, motion, and behavior. It is **not** production code to ship directly. The build is a single self-contained HTML file using React 18 + Babel-in-browser (all components inlined as `<script type="text/babel">` blocks) purely so it runs as a standalone prototype.

**The task is to recreate this design in the target codebase's environment** (e.g. Next.js/React, Astro, Vue, plain HTML+CSS, a CMS theme, etc.) using that project's established patterns, component library, and build tooling. If no codebase exists yet, choose an appropriate modern stack (a static site generator like Astro or Next.js is a good fit for a marketing page) and implement there. Do not ship browser-Babel in production.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, layout, and interactions are all specified and should be reproduced faithfully. The only placeholders are **photography** (see Assets) — every image is a drag-and-drop slot the client will fill with real photos.

---

## Design Tokens

### Color
| Token | Value | Use |
|---|---|---|
| `--ink` | `#15263f` | Primary brand navy — headings, dark bands, primary buttons |
| `--ink-700` | `#1d3354` | Navy hover/deep |
| `--ink-600` | `#2b466e` | Navy accents |
| `--paper` | `#f6f2ea` | Warm cream page background (default surface) |
| `--paper-2` | `#efe9df` | Slightly deeper band background |
| `--card` | `#fffdf8` | Warm-white card surface |
| `--line` | `#e3dccf` | Hairline borders on paper |
| `--accent` | `#5c7b67` | Eucalyptus/sage accent (default) — links, accent buttons, kickers |
| `--accent-600` | `#4d6a58` | Accent hover |
| `--accent-300` | `#8aa593` | Accent light (on dark bands) |
| `--accent-tint` | `#e7ede7` | Accent wash (icon chips) |
| `--clay` | `#b07a52` | Warm secondary (star ratings) |
| `--text` | `#20303f` | Body text |
| `--text-soft` | `#5a6573` | Secondary text |
| `--text-faint` | `#8b94a0` | Tertiary/labels |
| `--on-dark` | `#f4f1ea` | Text on navy |
| `--on-dark-soft` | `rgba(244,241,234,.74)` | Secondary text on navy |
| Footer bg | `#0f1c30` | Deep navy footer |

**Alternate accents** (offered as a live "Tweak" in the prototype — pick ONE for production unless theming is desired): sage `#5c7b67` (default), eucalyptus-blue `#3d7a80`, terracotta `#b0714e`, warm-gold `#9c7d3e`. Each has matching `-600`, `-300`, and tint values (see the `ACCENTS` map in the source).

**Alternate surfaces** (also a Tweak): crema (default, `#f6f2ea`), gris (`#f3f4f6`), blanco (`#ffffff`). Ship **crema** unless told otherwise.

### Typography
- **Serif (headings):** `"Newsreader"`, weights 300/400/500/600 + italics. Google Fonts. Used for all `h1–h4`, display type, stats, quotes. Letter-spacing `-0.01em` to `-0.02em`, `text-wrap: balance`.
- **Sans (body/UI):** `"Mulish"`, weights 400/500/600/700/800. Google Fonts. Body 18px / line-height 1.6. Kickers, buttons, nav, labels.
- Google Fonts import:
  `https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,300;1,6..72,400;1,6..72,500&family=Mulish:wght@400;500;600;700;800&display=swap`

**Type scale (clamp, responsive):**
- `.display` — `clamp(40px, 6.4vw, 88px)`, weight 380, line-height 1.02
- `.h-xl` — `clamp(34px, 4.6vw, 60px)`
- `.h-lg` — `clamp(28px, 3.4vw, 44px)`
- `.h-md` — `clamp(22px, 2.2vw, 30px)`
- `.lead` — `clamp(18px, 1.5vw, 21px)`, color `--text-soft`, max-width 60ch
- `.kicker` — 12.5px, weight 700, `letter-spacing: .18em`, uppercase, accent color, with a 26px leading rule (`::before`)

### Spacing / Geometry
- Section vertical padding: `clamp(72px, 9vw, 140px)` (`.section`); tight variant `clamp(54px, 6vw, 96px)`
- Page max-width: `1240px`; gutter: `clamp(20px, 5vw, 72px)`
- Nav height: `76px` (fixed)
- Radii: sm 6 / base 12 / lg 20 / xl 28 / pill 999px
- Shadows: `--shadow-sm` `0 1px 2px rgba(21,38,63,.06), 0 2px 6px rgba(21,38,63,.05)`; `--shadow` `0 6px 18px rgba(21,38,63,.08)…`; `--shadow-lg` `0 24px 60px rgba(21,38,63,.16)…`
- Easing: `--ease cubic-bezier(.22,.61,.36,1)`, `--ease-out cubic-bezier(.16,1,.3,1)`

### Motion
- Scroll-reveal: elements start `opacity:0; translateY(22px)`, animate to visible over `.9s var(--ease-out)` with stagger delays. **Must degrade to visible** if animation can't run (gate the hidden state behind a JS-added `html.reveal-ready` class, and force the end-state after a timeout). Respect `prefers-reduced-motion`.
- Parallax: hero/section images translate ±12–18% of scroll progress.
- Counters: stat numbers count up from 0 when scrolled into view.
- Hover: cards lift `translateY(-4px to -6px)` with shadow upgrade; buttons lift `-2px`.

---

## Page Structure (top → bottom)

1. **Nav** (fixed) — logo lockup (hex seed-burst mark + "Cumbayá *Village*" wordmark + "RESIDENCIA DEL ADULTO MAYOR" sub-label); 4 service links; phone link `+593 99 000 0000`; accent WhatsApp button. Transparent over hero, gains a blurred cream background + hairline after 24px scroll. Collapses to a hamburger + slide-down menu < 1080px.
2. **Hero** — three directions exist in the prototype (a Tweak switch). **Ship the "editorial" hero (default).** See Hero section below. The other two (cinematic full-bleed, structured navy-split) are alternates — implement only if requested.
3. **Stats bar** (navy band) — 4 animated counters: `10+` años de experiencia · `4` sedes en Cumbayá · `200+` familias acompañadas · `24/7` asistencia continua. Each with a line icon in a tinted chip.
4. **Intro / philosophy** ("Una vida plena. Todo en un solo lugar.") — image + parallax + floating quote card on left, copy + amenity pills on right.
5. **Services** (paper-2 band) — 4 cards (see Services data).
6. **Instalaciones** ("Cuatro sedes, un mismo cuidado") — **tabbed selector**: 4 tabs (Morita / Cumbayá / Pampite / Pillagua); active tab swaps the main image, tagline, description, a 3-up facts grid, amenity chips, and a 3-image mini-gallery. (Note: an earlier scroll-pinned version was explicitly rejected — keep it click-tabbed.)
7. **Features** ("Todo lo que tu familiar necesita") — 6 cards in a 3-col grid (icon in navy chip that turns accent on hover).
8. **Care grid** (paper-2 band) — "Programa de cuidado integral", 9 small cards (icon chip + title + subtitle).
9. **Testimonials** ("Historias que nos recuerdan por qué lo hacemos") — 3 quote cards (serif quote mark, italic-ish serif quote, avatar + name + relation).
10. **Social** ("La vida en Cumbayá Village, día a día") — 3 brand network pills (TikTok / Instagram / Facebook) + a **3D phone coverflow carousel** of social posts (auto-advancing, pause-on-hover, arrows, swipe, dots). See Social section.
11. **CTA band** (navy, radial accent glow) — "Conversemos sobre el bienestar de tu familia." + WhatsApp / call buttons.
12. **Footer** (deep navy `#0f1c30`) — brand blurb + social icons; Servicios column; Sedes column; Contacto column with WhatsApp CTA; bottom legal row.
13. **Floating WhatsApp pill** (fixed bottom-right) — accent pill "¿Conversamos?".

---

## Key Sections — detail

### Hero (editorial — SHIP THIS)
- Two-column grid `1.05fr .95fr`, gap `clamp(32px,5vw,80px)`, vertically centered. A giant faint italic serif word "Hogar" sits behind at `28vw`, opacity ~0.026.
- **Left:** eyebrow row (kicker "Residencia del Adulto Mayor" + a "Cumbayá · Quito" pin label) → `h1.display`: "Cuidar a quien te cuidó, con la **calidez** que merece." (the word *calidez* is italic in `--accent-600`) → lead paragraph → CTA row (accent WhatsApp button "Hablemos por WhatsApp" + ghost "Llámanos ahora") → trust line (5 clay stars + "**+200 familias** confían su bienestar a nuestro equipo").
- **Right:** tall image frame (aspect ≈ 4/4.6, radius 22, `--shadow-lg`) with parallax; a floating card bottom-left ("24/7" + "Acompañamiento de auxiliares certificados", with a shield icon in an accent-tint chip).
- Collapses to single column < 920px.

### Instalaciones (tabbed)
- Tab row: 4 buttons, each "0X" (serif, faint) + sede name (weight 800). Active tab = navy fill, white name, accent-300 number. Hover lifts 2px.
- Stage grid `1.15fr .85fr`, gap 34px, re-keyed per sede so it fades-up on change (`@keyframes fadeUp`).
  - **Left (main):** image (aspect 16/12, radius 20, shadow-lg) + a pin badge "Sede {name}" bottom-left.
  - **Right (panel):** uppercase tagline (accent) → sede name (`.h-lg`) → description → **facts** (3-col grid, bordered top+bottom: label + serif value) → **amenity chips** (small pills with check icons) → **mini gallery** (3 square slots).
- Footer row: "Las 4 sedes en Cumbayá y sus alrededores, Quito." + arrow link "Agenda una visita guiada".
- < 920px: tabs become 2-col, stage becomes single column.

**Sede data:**
| Sede | Tagline | Description | Facts | Amenities | Gallery labels |
|---|---|---|---|---|---|
| **Morita** | Nuestra sede insignia | Arquitectura contemporánea rodeada de amplios jardines y luz natural. Espacios diseñados para la calma, la seguridad y la vida en comunidad. | Entorno: Jardines amplios · Ambiente: Luminoso y abierto · Habitaciones: Privadas y compartidas | Jardines terapéuticos, Áreas comunes, Comedor central, Sala de terapias, Zonas de descanso | Fachada principal, Jardín, Sala común |
| **Cumbayá** | En el corazón del valle | Cercana, cálida y luminosa. Una casa pensada para sentirse en familia, con áreas verdes y espacios acogedores para cada momento del día. | Entorno: Vegetación y flores · Ambiente: Acogedor, hogareño · Acceso: Central en Cumbayá | Jardín florido, Sala de estar, Comedor, Terapias, Área de visitas | Ingreso, Jardín interior, Estancia |
| **Pampite** | Calidez y tranquilidad | Arquitectura cálida en un entorno sereno. Amplios espacios verdes y ambientes pensados para el descanso y la recreación al aire libre. | Entorno: Áreas verdes amplias · Ambiente: Tranquilo y sereno · Exteriores: Terrazas y jardín | Terraza exterior, Jardín amplio, Comedor, Sala de actividades, Capilla | Fachada, Jardín, Terraza |
| **Pillagua** | Naturaleza y aire puro | Rodeada de naturaleza y árboles, con aire puro y amplios espacios verdes. El lugar ideal para una vida activa en contacto con el entorno. | Entorno: Bosque y naturaleza · Ambiente: Aire puro, amplio · Exteriores: Senderos y jardín | Senderos, Áreas verdes, Comedor, Zona de terapias, Huerto | Fachada, Entorno natural, Áreas verdes |

### Services (4 cards)
| Service | Badge | Description | Bullet points |
|---|---|---|---|
| **Residencia Permanente** | Estadía permanente | Un hogar para vivir cada día con atención integral las 24 horas: cuidado médico, alimentación, terapias y vida social. | Habitación propia y privada · Plan de atención individualizado · Acompañamiento 24/7 |
| **Club de Día** | Durante el día | Compañía, estimulación y cuidado profesional durante el día. Su ser querido regresa a casa por la noche. | Actividades y terapias · Alimentación incluida · Transporte opcional |
| **Servicio Express** | Por horas o días | Cuidado geriátrico flexible cuando más lo necesita: por horas, días o durante una recuperación puntual. | Atención por horas · Cuidador certificado · Sin compromisos a largo plazo |
| **Hotel de Paso** | Estadías cortas | Confort de hotel con la asistencia de una residencia, ideal para descansos familiares o estancias temporales. | Habitación equipada · Todos los servicios incluidos · Reserva por noches |

Each card: top image (aspect 4/3.2) with a pill badge over it; body with name (`.h-md`), description, check-bullet list, and "Más información →" link to WhatsApp. 4-col grid → 2-col < 1080px → 1-col < 560px. Hover lifts 6px + accent border.

### Features (6 cards)
Habitaciones · Alimentación 5 tiempos · Asistencia 24/7 · Vida activa y recreación · Bienestar que se nota · Familia siempre conectada. (Full copy in source `FEATURES` array.) Icon in a 56px navy rounded chip that turns accent on hover.

### Care grid (9 items)
Auxiliar de enfermería 24/7 · Control médico · Nutrición personalizada · Fisioterapia · Terapia ocupacional · Musicoterapia · Arteterapia · Peluquería mensual · Salud bucal y auditiva. Each: 46px accent-tint icon chip + serif title + soft subtitle.

### Testimonials (3)
- Amelia Barrios — Hija de residente
- Karen Sánchez — Nieta de residente
- Rodrigo Vélez — Hijo de residente
(Full quotes in source `QUOTES` array.) Card: big serif `”` mark, serif quote, divider, circular avatar slot + name (weight 800) + relation.

### Social carousel
- **Networks:** TikTok (`@cumbayavillage`, ring `#111`), Instagram (`@cumbayavillage`, ring `#D6306F`), Facebook ("Cumbayá Village", ring `#1877F2`). Brand-correct multi-color SVG badges (TikTok cyan/red offset glyph, Instagram radial-gradient rounded square, Facebook blue circle). Pills gently bob; hovering a pill jumps the carousel to that network's first post; the pill for the centered post's network shows an active ring.
- **Coverflow:** 7 phone "cards" (236px wide, 9/19.3 aspect, navy bezel with notch, 38px radius). Center card scale 1.06; neighbors scale 0.9 rotateY ∓15°; second-out scale 0.74, dimmed; beyond that opacity 0. Transition `transform .75s var(--ease-out)`. Each phone screen = an image slot + a circular network badge bottom-left + a caption (e.g. "Reel · paseo a la laguna"). A soft accent glow pulses behind the stage.
- **Controls:** auto-advance every 3.6s (pauses on hover, disabled under reduced-motion), prev/next round arrow buttons, touch swipe (40px threshold), and dots (active dot stretches to a pill in the network's brand color). Replace placeholder links with real profile URLs.
- < 720px: stage scales to 0.82; < 460px the pill text labels hide.

### CTA band & Footer
- CTA: navy band, centered, radial sage glow rising from bottom; kicker "Estamos para acompañarte" → display "Conversemos sobre el bienestar de tu familia." (*bienestar de tu familia* italic accent-300) → lead → WhatsApp + call buttons.
- Footer: 4-col grid (`1.6fr 1fr 1fr 1.2fr`) → brand+social, Servicios, Nuestras sedes, Contacto (+ "Agenda una visita" WhatsApp button); bottom row "© {year} Cumbayá Village · Residencia del Adulto Mayor" + "Hecho con cuidado, como todo lo que hacemos."

---

## Interactions & Behavior
- **Nav:** scroll > 24px toggles `.nav--scrolled` (blurred bg + shadow). Mobile hamburger toggles a max-height slide-down menu; links close it on click.
- **Reveal-on-scroll:** IntersectionObserver adds `.in`. Includes a critical fallback: if frames never tick (background tab / throttled), content is forced visible after a timeout — never leave anything stuck at opacity 0.
- **Counters:** count from 0 to target on first intersection; snap to final under reduced-motion.
- **Parallax:** rAF-throttled translateY on scroll for hero & intro images.
- **Instalaciones tabs:** click sets active index; stage re-keyed to replay a fade-up.
- **Social carousel:** state = active index; setInterval auto-advance with pause-on-hover; arrows/dots/swipe set index; hovering a network pill sets index to that network's first post.
- **CTAs:** WhatsApp links → `https://wa.me/<number>` (target _blank); phone → `tel:+<number>`. Replace placeholders.

## State Management
Mostly local/ephemeral UI state (per-component `useState`): nav scrolled boolean, mobile-menu open boolean, Instalaciones active-tab index, carousel active-index + paused boolean. The prototype's "Tweaks" (hero variant, accent, surface, motion toggle) are **prototype-only** — they exist to compare directions and need not ship. No data fetching; the page is static marketing content.

## Assets
- **Photography: ALL images are placeholders.** In the prototype they're `<image-slot>` drop-zones the client fills. In production, replace each with a real `<img>`/`next/image` and the client's photos. Every slot has a descriptive `placeholder`/label (e.g. "Morita — fachada o jardín", "Reel · paseo a la laguna") indicating the intended subject — use those as the photo brief. Slots/labels exist for: hero, intro, the 4 sede main images + 4×3 sede galleries, the 4 service cards, 3 testimonial avatars, and 7 social-post phones.
- **Icons:** custom inline SVG line set (24×24, stroke 1.6) — bed, meal, shield, spark, heart, link, phone, whatsapp, clock, pin, leaf, stethoscope, activity, music, palette, scissors, smile, arrow, star, check, sun, home, briefcase. Reproduce or swap for the codebase's icon library (e.g. Lucide — the set is Lucide-like).
- **Logo:** the hexagon "seed-burst" mark + wordmark is inline SVG in the prototype (component `Logo`). Replace with the official brand asset if one exists; otherwise the SVG is reusable.
- **Brand social glyphs:** TikTok / Instagram / Facebook are hand-built brand-colored SVGs; you may swap for official brand icon assets.
- **Fonts:** Newsreader + Mulish via Google Fonts (self-host for production if preferred).

## Contact details to replace (currently placeholders)
- Phone / WhatsApp: `+593 99 000 0000` → real number (used in nav, CTAs, footer, floating pill, `wa.me` links).
- Social URLs: `tiktok.com/@cumbayavillage`, `instagram.com/cumbayavillage`, `facebook.com/cumbayavillage` → real profiles.
- Address: "Cumbayá, Quito · Ecuador".

## Files
- `index.html` — the complete, self-contained design reference (styles in a single `<style>` block; all React components inlined as `<script type="text/babel">` blocks: tweaks panel, shared components/icons/Logo/Reveal/Counter, the 3 heroes, nav, content sections, Instalaciones, social carousel, and the App root). Read it top-to-bottom: CSS first, then components in dependency order. The `image-slot.js` web component is also inlined.
