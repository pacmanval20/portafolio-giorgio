# Cómo funciona tu portafolio y cómo crear el tuyo

## 1. La idea general

Este portafolio es un **sitio estático**: el navegador recibe archivos HTML, CSS, JavaScript e imágenes. No usa una base de datos ni un backend Java. Java es una tecnología que puedes mostrar en tus proyectos, pero esta página, como interfaz, se construye con tecnologías web.

El recorrido de los archivos es:

```text
Visual Studio Code → editas site/
       ↓
Abrir-local.cmd → npm run dev → dev-server.mjs
       ↓
Brave abre http://127.0.0.1:4173 y carga HTML + CSS + JavaScript
       ↓
npm run build → build-hostinger.mjs copia solo lo publicable a dist/
       ↓
Los archivos de dist/ van a public_html en Hostinger
```

Cuando cambias algo en `site/`, la vista local lo lee de nuevo al actualizar Brave. `dist/` solo cambia cuando ejecutas `npm run build`.

## 2. Qué es cada archivo

| Archivo | Función |
|---|---|
| `site/index.html` | Contenido y orden de la página: títulos, textos, enlaces, secciones y tarjetas. |
| `site/site.css` | Reglas básicas: tamaños, fuentes, columnas, botones, menú móvil y animaciones generales. |
| `site/palette.css` | Colores del tema espacial: fondo, estrellas, luces y colores de los componentes. |
| `site/finish.css` | Diseño adicional de Conocimientos, Proyectos y Contacto; también define la luz del mouse. |
| `site/script.js` | Abre y cierra el menú de celular. Contiene un punto de extensión para entradas al desplazarse. |
| `site/effects.js` | Barra de progreso, luz del mouse y brillo en tarjetas. |
| `site/waves.svg` | Dibujo vectorial de las ondas del fondo. |
| `site/images/` | Lugar para tu foto o capturas de proyectos. |
| `dev-server.mjs` | Servidor local que entrega los archivos a Brave. No va a Hostinger. |
| `build-hostinger.mjs` | Prepara `dist/` copiando solo los archivos que se publican. |
| `hosting/.htaccess` | Reglas del servidor de Hostinger para los archivos publicados. |
| `package.json` | Nombres de las dos tareas: `npm run dev` y `npm run build`. |

## 3. HTML: el contenido y su estructura

Al principio de `index.html` están `<!doctype html>` y `<html lang="es">`. El primero indica al navegador que use HTML moderno; el segundo marca el idioma para lectores de pantalla y otras herramientas.

Dentro de `<head>` están los datos que no aparecen como contenido principal: `charset="utf-8"` permite caracteres como ñ y tildes; `viewport` hace que la página use el ancho real del celular; `description` resume la página para buscadores; `title` se muestra en la pestaña; `icon` es el pequeño símbolo de la pestaña.

Estas líneas cargan los estilos en orden:

```html
<link rel="stylesheet" href="site.css">
<link rel="stylesheet" href="palette.css">
<link rel="stylesheet" href="finish.css">
```

Si dos archivos definen el mismo selector con igual prioridad, normalmente prevalece el último. Por eso `site.css` crea la base, `palette.css` cambia el tema y `finish.css` termina el diseño. Los dos `<script ... defer>` cargan JavaScript después de analizar el HTML, cuando ya existen los elementos que el código busca.

Dentro de `<body>`: `header` contiene la navegación, `main` el contenido y `footer` el cierre. El enlace «Saltar al contenido» sirve para personas que navegan con teclado. La barra `.scroll-progress` se actualiza al bajar.

Cada sección tiene un `id`, por ejemplo `id="proyectos"`. Un enlace con `href="#proyectos"` lleva a esa sección. Una `class`, como `project-tile`, sirve para aplicar CSS o seleccionar un elemento desde JavaScript; varias tarjetas pueden compartirla. Un `id` identifica una sección concreta.

La primera sección, `.hero`, presenta tu nombre, rol, resumen, botones, redes y lugar de la foto. Conocimientos agrupa cuatro elementos `<article>`; un `article` representa una pieza de contenido independiente. Proyectos usa dos artículos: `current` distingue Nubo y `next` distingue la tienda. Contacto muestra lugares para enlaces futuros. `aria-label`, `aria-expanded` y `aria-hidden` ayudan a que la navegación y los adornos sean entendibles para tecnologías de apoyo.

Para modificar **lo que dice la página**, empieza en `site/index.html`. Por ejemplo, cambia el texto dentro de `<h1>`, `<p>` y `<h3>`. Para crear una tercera tarjeta de proyecto, copia la estructura de un `<article class="project-tile ...">`, cambia su nombre y descripción, y prueba cómo se ve en Brave.

## 4. CSS: cómo se dibuja la página

Una regla CSS tiene un selector y propiedades:

```css
.knowledge-card {
  background: #172743;
  border-radius: 15px;
  padding: 25px;
}
```

`.knowledge-card` selecciona los elementos que tienen esa clase. `background` da el fondo, `border-radius` redondea esquinas y `padding` crea espacio por dentro. En `:root` aparecen variables como `--bg` y `--text`; `var(--bg)` reutiliza su valor en otras reglas.

`.shell` limita el ancho del contenido y lo centra. El fondo de las secciones puede ocupar toda la pantalla, pero el texto queda dentro de ese ancho. `display: grid` crea las columnas de Conocimientos y Proyectos. `display: flex` organiza elementos pequeños como los botones o las filas del menú.

En `site.css` se definen la estructura común, el encabezado, la portada y los componentes. `palette.css` convierte los tonos básicos en el tema de espacio profundo. `finish.css` crea fondos de ancho completo, tarjetas con más profundidad, la alternancia visual entre Nubo y la tienda y el contacto final.

Las reglas `:before` y `:after` dibujan adornos sin añadir más texto al HTML: estrellas, líneas, números grandes y halos. Las animaciones `@keyframes` cambian propiedades con el tiempo; las ondas provienen de `waves.svg`. Para que estos dibujos no tapen el texto se usan `position`, `z-index`, `isolation` y transparencias.

Las reglas `@media(max-width:...)` cambian el diseño según el ancho: cuatro tarjetas pasan a dos y luego a una, el menú normal se convierte en un botón, y los proyectos se apilan. `@media(prefers-reduced-motion:reduce)` reduce animaciones cuando el visitante así lo pide. Puedes inspeccionar la versión celular en Brave con **F12 → modo dispositivo**.

Si haces tu propia versión, cambia primero `palette.css`: fondo, color principal, botones y bordes. Después ajusta `finish.css`. Modifica una cosa, guarda y actualiza Brave para ver su efecto antes de cambiar otra.

## 5. JavaScript: qué es interactivo

`script.js` empieza con `document.querySelector`, que busca elementos del HTML. Por ejemplo, encuentra `.menu-toggle` y `.nav`. Cuando haces clic, `classList.toggle('open')` agrega o quita la clase `open`; CSS muestra el menú cuando esa clase existe. `setAttribute('aria-expanded', ...)` avisa si el menú está abierto. Al pulsar un enlace del menú, el código lo cierra.

En el mismo archivo hay un `IntersectionObserver` que añade `visible` al entrar un elemento en pantalla. Actualmente las clases `.reveal` se muestran desde el principio para evitar pantallas vacías; ese observador queda como punto de extensión y puedes omitirlo al crear una versión sencilla.

`effects.js` calcula cuánto bajó el visitante:

```js
const max = document.documentElement.scrollHeight - window.innerHeight;
const avance = window.scrollY / max;
```

`scrollHeight` es la altura total, `innerHeight` la parte visible y `scrollY` el desplazamiento actual. El resultado de 0 a 1 se pasa a `scaleX(...)` para alargar la barra. `requestAnimationFrame` coordina cambios visuales con los cuadros del navegador; el evento `scroll` usa `{ passive: true }` para no frenar el desplazamiento.

La luz del mouse escucha `pointermove`. Calcula dónde está el cursor dentro de la sección y escribe las variables CSS `--mouse-x`, `--mouse-y` y `--glow-opacity`. CSS usa esas variables en un `radial-gradient`. `pointerleave` pone la opacidad en cero. Las tarjetas hacen lo mismo con `--card-x`, `--card-y` y `--card-light`. `matchMedia` evita esos efectos en pantallas táctiles o cuando el usuario pide menos movimiento.

Cuando construyas tu propia página, empieza con un JavaScript pequeño: abrir/cerrar menú. Añade efectos solo después de que HTML y CSS funcionen bien en computadora y celular.

## 6. Vista local, publicación y reglas básicas

`package.json` dice que `npm run dev` ejecuta `dev-server.mjs`. Este servidor escucha en `127.0.0.1:4173`: solo tu computadora puede acceder a esa dirección. Lee archivos de `site/`, les da el tipo correcto (`text/html`, `text/css`, etc.), acepta lecturas `GET` y `HEAD` y no entrega archivos ocultos ni rutas fuera de `site/`.

`npm run build` ejecuta `build-hostinger.mjs`. Revisa que existan los archivos, recrea `dist/`, copia HTML/CSS/JS/SVG y las imágenes permitidas de `site/images/`, y añade `.htaccess`. **No compila Java ni convierte la web en una aplicación con backend**: simplemente prepara el paquete estático.

Las reglas de `.htaccess` limitan las fuentes de scripts, estilos e imágenes mediante Content Security Policy y añaden algunas cabeceras del navegador. Son una capa de protección, no una garantía absoluta. La página actual no guarda datos ni pide contraseñas. Nunca escribas claves privadas en HTML o JavaScript porque cualquier visitante puede descargar esos archivos. HTTPS se activa en el panel de Hostinger cuando el dominio esté configurado.

## 7. Una práctica para hacer la página tuya

1. Haz una copia de esta carpeta antes de experimentar.
2. En `site/index.html`, cambia el nombre, el resumen y el orden de secciones. Añade una sección «Experiencia» usando `<section id="experiencia">` y agrega un enlace en el menú.
3. En `site/palette.css`, elige cuatro colores: fondo, panel, texto y acento. Prueba si el texto se lee bien.
4. En `site/finish.css`, crea una tarjeta visual para un proyecto real tuyo. Escribe qué problema resuelve, qué hiciste tú y cómo se ejecuta; no necesitas inventar métricas.
5. Comprueba la página en Brave en pantalla ancha y celular. Luego ejecuta `npm run build` y revisa qué quedó en `dist/`.

Antes de compartirla con reclutadores, reemplaza la foto y el número pendiente de WhatsApp por información real. Para crear el enlace usa el formato `https://wa.me/519XXXXXXXX`, con el código de país y el número, sin el signo `+`, espacios ni guiones. Recuerda que el número y el correo quedarán públicamente visibles; conviene usar datos profesionales separados de tus cuentas personales.
