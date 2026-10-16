# DESIGN.md — Dept Puerto Varas

Guía de diseño del proyecto **cabanaspv**. Documenta el sistema de diseño **actual del codebase** (tokens, patrones, anatomía de componentes y motion) con las mejores prácticas para mantenerlo consistente. Todo lo aquí descrito refleja exactamente el código existente en `src/`, `tailwind.config.ts` y `globals.css`.

---

## 1. Stack de UI

| Capa | Tecnología | Notas |
|------|-----------|-------|
| Framework | Next.js 15 (App Router) | `src/app/`, React 18 |
| Estilos | Tailwind CSS v3 | Config en `tailwind.config.ts` (no usar `@apply` masivo) |
| Tipografía | **Quicksand** (Google Fonts) | `next/font/google`, subset `latin`, inyectada en `<body>` (`src/app/layout.tsx`) |
| Animación | Framer Motion 10 | `Transition`, `TransitionPage`, `Navbar` |
| Carruseles | Swiper 12 | Slider de servicios (`Services/Slider`) |
| Mapas | Leaflet + react-leaflet 4 | Cargado con `dynamic(..., { ssr: false })` |
| Iconos | react-icons | Sets usados: `lia` (línea), `fi`, `ci`, `bs`, `fa`, `ri`, `tfi` |
| Imágenes | `next/image` | Siempre con `width/height` o `fill` + `sizes` |

**Regla:** `lang="es"` en `<html>`, metadata base: `title: "Dept - Puerto Varas"`, `description: "Arriendo en puerto varas | Cabañas"`.

---

## 2. Design Tokens

Definidos en `tailwind.config.ts` (extender, no duplicar):

```ts
theme: {
  extend: {
    colors: {
      secondary: "#727C73",          // Verde-gris único de marca
    },
    backgroundImage: {
      banner: "url('/assets/PuertoVaras.webp')",
    },
    boxShadow: {
      light: "0px 4px 30px rgba(0, 0, 0, 0.08)",
    },
  },
}
```

### 2.1 Paleta efectiva en uso

| Token / Clase | Valor | Uso exacto en el codebase |
|---|---|---|
| `secondary` | `#727C73` | Eyebrows (`h4`), títulos de sección, botones primarios, badges de estrella, fondo de `JoinCommunity` y cortina `TransitionPage`, borde de avatar de contacto, scrollbar de Swiper (`globals.css`) |
| `hover:bg-black` | `#000` | Estado hover de todo botón primario `bg-secondary` |
| Negro / blancos | `black`, `white`, `black/90`, `black/50` | Footer (`bg-black/90`), overlay del banner (`bg-black/50`), nav flotante (`bg-gray-400/40 backdrop-blur`) |
| WhatsApp | `green-500` → `hover:bg-green-600`, `text-green-600` → `hover:text-green-800` | CTA de Header y éxito de formulario (`text-green-600`) |
| Neutros tarjetas | `slate-50`, `slate-300/30`, `slate-300` | Chips de características (bed/bath/m²): `bg-slate-300/30` en listado, `bg-slate-300` en detalle, `bg-slate-50` en badge de estrella del card |
| Rating | `yellow-500` | Estrellas `★`/`☆` en reseñas |
| Grises texto | `gray-400…900` | Labels e inputs del `Form`, texto de `ResenasComponents` |

### 2.2 Sombras

- **`shadow-light`** → tarjetas de propiedad, paneles (`Form`, descripción, reseñas, imagen 404, `Search*`).
- **Hover elevación:** `hover:shadow-xl` junto a `transition-all duration-300` en las cards.

---

## 3. Tipografía

| Elemento | Clases exactas |
|---|---|
| Logo (Header) | `font-medium text-[1.2rem] md:text-[1.4rem]` |
| Eyebrow de sección (`h4`) | `text-secondary` (+ `text-center` en Localización) |
| Título de sección (`h2/h3`) | `text-3xl font-semibold` (JoinCommunity usa `text-4xl font-semibold text-white`) |
| Título de propiedad (detalle) | `text-3xl mb-4 text-secondary` |
| Hero banner | `text-sm sm:text-3xl md:text-5xl font-semibold` (h2), `text-xs mt-2 sm:text-xl md:text-xl md:mt-8` (p) |
| Párrafo cuerpo | default (`1rem`), espaciado `mb-10 mt-7` |
| Precio | `font-semibold` + `formatPrice()` (CLP `es-CL`) |
| Texto en chips/badges | base + `font-semibold` en números |

**Escala responsiva mobile-first:** `text-xs → text-sm → base → xl → 3xl → 4xl → 5xl`, con breakpoints `sm / md / lg / xl`.

---

## 4. Layout & Grid

### 4.1 Contenedores (patrón exacto)

```text
Página home:
  container mx-auto          → Header (my-5)
  container relative mx-auto → Banner
  max-w-6xl mx-auto          → Services + Location + About (envoltorio en page.tsx)
  full-bleed                 → Properties (con padding propio), JoinCommunity, Footer

Detalle propiedad:
  max-w-5xl mx-auto → grid md:grid-cols-[70%, 1fr] grid-cols-1
```

### 4.2 Ritmo de espaciado por sección

| Sección | Padding exacto |
|---|---|
| Properties (grid) | `px-4 my-8 md:py-32 md:px-40` |
| Services | `px-4 py-8 md:py-46 md:px-36 md:gap-28` |
| Location | `px-4 py-8 md:py-44 md:px-36` |
| About | `px-4 py-8 md:py-44 md:px-36` |
| JoinCommunity | `px-4 py-8 md:py-44 md:px-36` + `bg-secondary` |
| Footer | `px-4 py-8 md:py-40 lg:px-36` + `bg-black/90` |

### 4.3 Grids

- **Listado de propiedades:** `grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4` (4 en desktop, paginado incremental de 8 → +4 con "Ver más").
- **Secciones 2 columnas (Services/About/JoinCommunity):** `md:grid-cols-2` con contenido `max-w-xl`.
- **Footer:** `grid gap-8 grid-cols-2 md:grid-cols-[1fr,1fr,1fr,400px]` — última columna alineada `md:text-right md:justify-end`.
- **Propiedad detalle:** `grid md:grid-cols-[70%,1fr]` — formulario sticky a la derecha.

---

## 5. Componentes — anatomía exacta

### 5.1 Convención de estructura (respetar)

```text
src/components/<Nombre>/
  <Nombre>.tsx        # named export: export function <Nombre>()
  <Nombre>.types.ts   # props tipadas (TransitionProps, NavbarProps, PropertyProps, HeaderData)
  <Nombre>.data.ts    # datos/contenido estático (Header, Footer, Properties, Slider, MarkerHouse)
  index.ts            # re-export → barrel src/components/index.ts
```

- **Named exports** (no default) en componentes; páginas App Router sí usan `default export`.
- Datos fuera del JSX: navegación (`Header.data.ts`), propiedades (`Properties.data.ts`), footer, slider.
- Alias `@/*` → `src/*`.

### 5.2 Header + Navbar

- Fila: `flex items-center justify-between px-5 md:px-0` dentro de `container mx-auto my-5`.
- Menú mobile: icono `CiMenuFries` (`block text-2xl md:hidden cursor-pointer`) que alterna `openMobileMenu`; el menú desplegable es `absolute z-[1] left-0 top-20 bg-white w-full px-4 py-4`.
- **Navbar flotante (scroll):** aparece cuando `window.scrollY >= window.innerHeight - 600`. Clases: `md:fixed z-[9999] right-0 left-0 px-6 py-3 text-white bg-gray-400/40 top-10 rounded-3xl backdrop-blur w-fit`. Links: `hover:text-secondary hover:border-b-[1px] hover:border-secondary`.
- CTA WhatsApp Header: `bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg flex items-center gap-2`, texto oculto en mobile (`hidden md:block`).

### 5.3 Banner (Hero)

- Altura `min-h-[80vh]` (mobile agrega `pt-10`), fondo `bg-banner bg-no-repeat bg-cover bg-center`.
- Overlay: `absolute inset-0 bg-black/50 z-0`; contenido en `relative z-10 text-center text-white` con `max-w-4xl sm:max-w-1xl md:max-w-3xl`.

### 5.4 Card de propiedad (`Properties`)

```text
Link → shadow-light hover:shadow-xl rounded-2xl transition-all duration-300 cursor-pointer
  ├─ badge estrella: absolute top-2 right-2, px-2 py-1 rounded-lg bg-slate-50 text-secondary
  ├─ Image: w-full h-[200px] object-cover rounded-t-2xl
  ├─ título: text-secondary
  ├─ precio: font-semibold + formatPrice
  └─ chips: px-2 py-1 rounded-lg bg-slate-300/30 (bed / bath / m²), gap-4 mt-2 xl:flex
```

### 5.5 Detalle de propiedad (`Property`)

- Título + precio en un `flex justify-between` dentro del `h1`.
- Badge estrella: `bg-secondary text-white px-2 py-1 rounded-lg`.
- Chips: `bg-slate-300 px-2 py-1 rounded-lg` (variante sólida, distinta al listado).
- Descripción: `rounded-lg shadow-light` con header `p-3` y cuerpo `border-t p-3 whitespace-pre-line`.
- Galería: `ImageSlider` propio (`fill` + `sizes`, botones `bg-white/70 rounded-full shadow-md`, dots `bg-secondary` activo / `bg-white/50`).

### 5.6 Reseñas (`ResenasComponents`)

- Card `rounded-lg shadow-light mt-6 border border-gray-200`, divider `divide-y divide-gray-200`.
- Avatar `w-12 h-12 rounded-full object-cover border`; estrellas texto `text-yellow-500` (`★`/`☆` repeat 5).

### 5.7 Formulario de contacto (`Form`)

- Card `rounded-lg shadow-light p-3 md:px-3 md:py-4`.
- Header con avatar: `border-2 rounded-full border-secondary object-cover` + nombre en `text-secondary font-semibold`.
- Inputs (patrón exacto, conservar):
  ```
  w-full rounded-md border-0 py-1.5 text-secondary shadow-sm
  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
  focus:ring-0 focus:ring-inset text-sm px-2
  ```
- Labels: `text-sm text-secondary`.
- Submit: `bg-secondary px-4 py-2 text-white rounded-lg text-sm`, estado `disabled={loading}` con texto "Enviando...".
- Feedback: éxito `text-green-600 text-sm` con ✅; errores vía `alert()` (ver §8).

### 5.8 Secciones informativas

- **Services:** checklist con emojis (`🛏️ 🛌 🍽️ 🍳 🚿`) en `<ul>` + Swiper (`slidesPerView={2}`, `freeMode`, scrollbar `draggable`, `h-[240px] md:h-[290px]`).
- **About:** dos columnas, imagen `next/image` `priority`.
- **JoinCommunity:** fondo `bg-secondary` full-bleed, título blanco `text-4xl font-semibold`, CTA negro `bg-black rounded-lg px-7 py-5 hover:bg-black/80` con icono `FaWhatsapp`.
- **Location:** `h4 id="location"` (ancla del nav), `MapContainer` `h-[300px] md:h-[700px]`, `zoom={15}`, `scrollWheelZoom={false}`, tile **CartoDB Voyager labels_under**, coordenadas `-41.317289, -72.991106`, attribution Leaflet oculta vía `globals.css`.
- **Footer:** 4 columnas de links + bloque marca (`Dept`, dirección "Villa los presidentes / Puerto Varas, Chile") + iconos sociales `text-3xl cursor-pointer` (`LiaInstagram`, `LiaLinkedinIn`, `LiaPinterestP`, `LiaYoutube`).
- **Error404:** centrado `min-h-screen`, `text-5xl font-semibold`, imagen `rounded-lg shadow-light`, botón `bg-secondary text-white rounded-lg`.

---

## 6. Sistema de botones

| Variante | Clases canónicas | Uso |
|---|---|---|
| Primario | `bg-secondary text-white rounded-lg hover:bg-black transition-all duration-150/200` | "Ver más", "Enviar mensaje", "Volver a la home", Login (comentado) |
| Primario ancho | `px-6 py-5 rounded-xl` | "Ver más" (listado) |
| WhatsApp header | `bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg flex items-center gap-2` | Header |
| WhatsApp oscuro | `bg-black text-white rounded-lg px-7 py-5 hover:bg-black/80` | JoinCommunity |
| Búsqueda | `bg-secondary text-white rounded-lg px-14 sm:px-6 py-2 flex items-center justify-center` | `SearchButton` |

**Regla de oro:** nunca mezclar colores de acento; todo primario usa `secondary → hover:black`, todo contacto directo usa la familia WhatsApp verde/negro.

---

## 7. Motion (Framer Motion)

### 7.1 Cortina de página — `TransitionPage`

Dos paneles fijos que barren la pantalla al montar (efecto cortina):

```text
Panel 1: fixed inset, right-full, w-screen h-screen, z-30, bg-secondary
         delay 0.2, duration 0.6, ease "easeInOut"
Panel 2: idem z-20, bg-secondary/70 opacity-50, delay 0.4
Variants: initial { x: "100%", width: "100%" }
          animate { x: "0%",   width: "0%"   }
          exit    { x: ["0%","100%"], width: ["0%","100%"] }
```

Se renderiza al inicio de **cada página** (`Home` y detalle de propiedad).

### 7.2 Reveal al hacer scroll — `Transition` (wrapper)

- `useInView(ref, { once: false })` + `useAnimation()` → dispara `visible` cuando entra en viewport.
- Variants `fadeIn()` (`TransitionFramer.ts`):
  - `hidden`: `y: 100, opacity: 0`, tween `0.8s`, `delay 0.8`, ease `[0.25,0.25,0.25,0.75]`
  - `visible`: `y: 0, opacity: 1`, tween `0.7s`, `delay 0.7`, mismo ease
- Acepta `className` para heredar el layout de la sección (Properties, About, Services, Location, JoinCommunity, FloatedSearch).

### 7.3 Navbar flotante

Spring: `{ type: "spring", stiffness: 100, damping: 20 }`, `y: -20 → 0`, `opacity: 0 → 1` con `AnimatePresence`.

### 7.4 Micro-transiciones CSS

- Cards: `transition-all duration-300` (con `hover:shadow-xl`).
- Botones: `transition-all duration-150` / `duration-200` / `duration-100`.
- `html { scroll-behavior: smooth }` para anclas `#about #services #location`.

**Práctica:** usar `transform + opacity` (como ya se hace); respetar `prefers-reduced-motion` si se añade soporte futuro (no implementado aún).

---

## 8. Prácticas obligatorias al extender el diseño

1. **Tokens primero:** cualquier color nuevo pasa por `theme.extend` (`secondary`, `shadow-light`, `bg-banner`). No hardcodear `#727C73` fuera de `tailwind.config.ts` ni de `globals.css`.
2. **Mobile-first:** toda sección define base mobile y refuerza en `md:` (patrón `px-4 py-8 md:py-44 md:px-36`).
3. **Named export + carpeta propia + `index.ts`** para cada componente; agregar al barrel `src/components/index.ts`.
4. **Datos en `*.data.ts`**, props en `*.types.ts` — no incrustar arrays largos en el JSX.
5. **Imágenes:** siempre `next/image` con dimensiones; rutas `/assets/...` (banner, `properties/`, `houses/`); `priority` solo en above-the-fold; hero con `sizes`.
6. **Iconos:** mantener sets actuales (`lia` para amenidades/rating, `fa` para WhatsApp, `fi` para carrusel) — no introducir otra librería de iconos.
7. **CTAs de contacto:** usar siempre el link `wa.me/56999479312` con el mensaje pre-cargado y `target="_blank" rel="noopener noreferrer"`.
8. **Precios:** nunca formatear a mano → `formatPrice()` (`es-CL`, CLP).
9. **Mapa:** cargar Leaflet solo con `dynamic(..., { ssr: false })` (ya sea `Location` completo o sus subcomponentes).
10. **Anclas y navegación:** los `id` de sección (`about`, `location`, servicios, propiedades) deben mantenerse sincronizados con `Header.data.ts`.
11. **Feedback de formularios:** hoy `alert()` + mensaje inline verde. Al mejorar, reemplazar `alert()` por un toast/estado inline manteniendo los textos en español.
12. **Idioma:** UI 100% en español (Chile), `lang="es"`.
13. **Bordes:** cards `rounded-2xl`, paneles `rounded-lg`, inputs `rounded-md`, nav flotante `rounded-3xl` — respetar la escala por tipo de elemento.
14. **Hover consistente:** elementos interactivos siempre llevan transición; botones secundarios `hover:bg-black`.

### Deuda de diseño conocida (no romper al refactorizar)

- `FloatedSearch` + `SearchLocation/Property/PriceRange/Button` existen pero están **desactivados** en `Banner` (comentado) — mantener su estilo `shadow-light rounded-md backdrop-blur` si se reactivan.
- Login comentado en `Header`/`Navbar` (futuro: `bg-secondary hover:bg-black rounded-lg`).
- Datos de propiedades y reseñas son estáticos (`Properties.data.ts`); la migración a CMS/API debe preservar la forma de los tipos (`galleryImages`, `reseñas`, chips bed/bath/m²).
- Slug real de detalle: `/properties/[id]` numérico (`(property)/[page]`); 404 renderiza `Error404`.
- Accesibilidad pendiente: inputs sin `id`/`htmlFor` reales, botones de carrusel sin `aria-label`, focus rings ausentes fuera de inputs.

---

## 9. Referencia rápida de snippets

```tsx
// Sección con reveal scroll + layout canónico
<Transition className="px-4 py-8 md:py-44 md:px-36">
  <h4 className="text-secondary">Eyebrow</h4>
  <h2 className="my-4 text-3xl font-semibold">Título</h2>
</Transition>

// Botón primario
<button className="px-6 py-5 text-white bg-secondary rounded-xl
                   hover:bg-black transition-all duration-150 cursor-pointer">
  Ver más
</button>

// Tarjeta
<Link className="shadow-light hover:shadow-xl rounded-2xl
                 transition-all duration-300 cursor-pointer">

// Chip de amenidad
<div className="flex items-center justify-center px-2 py-1 rounded-lg bg-slate-300/30">
```

---

*Documento generado desde el estado actual del codebase (`dev` @ `2a20c3d`). Mantenerlo actualizado junto con `tailwind.config.ts` ante cada cambio de tokens.*
