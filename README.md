# Proyecto: Aplicación Web para Promoción y Arriendo de Propiedades

Este proyecto es una aplicación web desarrollada con **Next.js** (versión 13.5.6), **React** (versión 18), y **Tailwind CSS** para el diseño de estilos. Está orientado a la promoción y arriendo de propiedades, en la región de Puerto Varas, Chile.

## Características principales

### Framework y Librerías
- **Next.js**: Utilizado para el desarrollo de la aplicación, con soporte para rutas dinámicas y renderizado del lado del cliente y servidor.
- **Tailwind CSS**: Configurado para estilos personalizados, con extensiones como colores (`secondary`), imágenes de fondo (`banner`), y sombras (`light`).
- **Framer Motion**: Para animaciones fluidas en transiciones de páginas y componentes.
- **Leaflet**: Para mapas interactivos, con integración de marcadores personalizados para propiedades.
- **Swiper**: Para carruseles de imágenes.

### Estructura del Proyecto
- **Directorio `src`**: Contiene los componentes principales, utilidades, y páginas de la aplicación.
- **Componentes**: Modularizados en carpetas como `Header`, `Footer`, `Properties`, `Location`, etc., para facilitar la reutilización.
- **Estilos Globales**: Definidos en `globals.css` con Tailwind CSS.
- **Configuración de Tailwind**: En `tailwind.config.ts`, con rutas para escanear contenido y personalizaciones de tema.

### Funcionalidades
- **Listado de Propiedades**: Muestra propiedades con detalles como precio, ubicación, habitaciones, y descripción.
- **Mapa Interactivo**: Permite visualizar propiedades en un mapa con marcadores personalizados.
- **Búsqueda Filtrada**: Incluye componentes como `SearchLocation`, `SearchPriceRange`, y `SearchProperty` para filtrar propiedades.
- **Animaciones**: Transiciones suaves entre páginas y elementos interactivos.
- **Formulario de Contacto**: Para enviar mensajes o realizar llamadas directamente desde la aplicación.

### Configuración y Scripts
- **Scripts en `package.json`**:
  - `yarn dev`: Inicia el servidor de desarrollo.
  - `yarn build`: Genera la aplicación para producción.
  - `yarn start`: Inicia el servidor de producción.
  - `yarn lint`: Ejecuta ESLint para verificar el código.
- **Configuración de TypeScript**: Definida en `tsconfig.json`, con soporte para alias (`@/*`) apuntando a `src/*`.

### Estilo Visual
- **Colores**: Predomina el color `secondary` (#727C73) para botones, textos, y elementos destacados.
- **Diseño Responsivo**: Adaptado para dispositivos móviles y pantallas grandes.
- **Imágenes**: Utiliza imágenes locales para propiedades y elementos visuales.

### Datos Simulados
- Los datos de propiedades y marcadores están definidos en archivos como `Properties.data.ts` y `MarkerHouse.data.ts`.

## Cómo ejecutar el proyecto
1. **Instalar dependencias**:
~~~bash
npm i
~~~

2. **Iniciar el servidor de desarrollo:**
Construir para producción:
~~~
npm run dev
~~~

3. **Contruir para produccion**
~~~
npm run build
~~~