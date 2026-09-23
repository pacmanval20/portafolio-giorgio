# Portafolio de Giorgio — edición esmeralda

Sitio personal en Next.js 16, React y TypeScript. Incluye fotografía del repositorio original, Inter alojada localmente, diseño responsive, proyectos con su estado real, FAQ, contacto y WhatsApp al +51 940 756 413.

## Abrir en tu computadora

Instala Node.js 24 y abre una terminal en esta carpeta:

```sh
npm ci
npm run dev
```

Abre http://localhost:3000. Para revisar la versión de producción:

```sh
npm run typecheck
npm run build
npm run preview
```

La vista de producción estará en http://localhost:4173. No abras `out/index.html` con doble clic: necesita un servidor HTTP para resolver los recursos.

## Publicar en Vercel

1. Sube el contenido de esta carpeta a un repositorio e impórtalo en Vercel.
2. El proyecto utiliza Next.js y `vercel.json` ya configura el build y la carpeta `out`.
3. No definas `NEXT_PUBLIC_BASE_PATH` para Vercel.
4. Si utilizas dominio propio, define `SITE_URL` con la URL pública final, incluyendo `https://` y sin barra final, y vuelve a desplegar. Si no, se utiliza `VERCEL_PROJECT_PRODUCTION_URL` cuando esté disponible. Revisa el dominio canónico y la tarjeta social después de publicar.
5. Vercel gestiona HTTPS al publicar en su plataforma. Este paquete no crea una cuenta ni emite un certificado por sí mismo.

## Actualizar tu GitHub Pages actual

El sitio actual está en https://pacmanval20.github.io/portafolio-giorgio/.

1. Conserva una copia o commit de la versión anterior del repositorio.
2. Coloca los archivos de esta carpeta en la raíz de `pacmanval20/portafolio-giorgio`, incluyendo archivos ocultos y `package-lock.json`. No subas `node_modules`, `.next` ni `out`.
3. Sustituye el workflow antiguo que copiaba `site/` a `dist/` por `.github/workflows/main.yml`. Debe quedar un solo workflow que publique Pages, para evitar que la versión anterior sobrescriba la nueva. `site/`, `dist/` y los scripts antiguos ya no se usan.
4. En Settings → Pages, el origen debe ser GitHub Actions.
5. Guarda los cambios en `main`. El workflow instala dependencias, comprueba TypeScript y construye la versión con `/portafolio-giorgio` como ruta base.
6. Espera que Actions termine y verifica la web publicada, WhatsApp, fotografía y enlaces. La publicación no se ha ejecutado desde este paquete.

## Dónde editar

- `src/lib/profile.ts`: nombre, correo, número, mensaje exacto de WhatsApp, redes y preguntas frecuentes.
- `src/components/`: Navbar, HeroSection, ServicesGrid, Projects, AboutUs, FaqAccordion, ContactWhatsapp, Footer y SaveShortcutGuard.
- `src/app/globals.css`: paleta HSL, estilos, tamaños y adaptación móvil.
- `src/app/layout.tsx`: metadata, OpenGraph y Twitter Cards.
- `src/app/page.tsx`: composición de la página y Schema.org JSON-LD.
- `public/`: retrato WebP, icono y tarjeta de redes sociales de 1200 × 630 px.

## Sobre Ctrl + S y las copias

`SaveShortcutGuard.tsx` intercepta Ctrl + S y Cmd + S mientras la página tiene el foco, y muestra un aviso. Es una medida disuasoria: no impide guardar desde el menú del navegador, descargar recursos, tomar capturas, desactivar JavaScript o copiar una web pública. No bloquea selección, copiar texto ni navegación por teclado.

Los mapas de código fuente de producción están desactivados, pero el HTML, CSS, JavaScript y las imágenes entregadas al navegador siguen siendo públicos. El repositorio público también permite acceder al código. Nunca coloques credenciales o secretos en el frontend. HTTPS protege la conexión, no evita que un visitante copie el contenido.

## Contenido y buscadores

No se inventaron años de experiencia, métricas, clientes, testimonios, certificaciones ni proyectos terminados. El sistema de tienda figura como planificado y Nubo como proyecto en desarrollo.

Se usan `Person`, `ProfilePage` y `FAQPage`, coherentes con un portafolio personal. No se incluyeron `LocalBusiness`, `Organization` ni `Service` porque no hay un negocio local ni servicios comerciales confirmados en el perfil. Estos datos y las etiquetas SEO ayudan a describir el sitio; no garantizan posicionamiento, citas de IA ni resultados enriquecidos.

## Verificación

Consulta `VALIDACION.md` y `AUDITORIA-LIGHTHOUSE.html`. Las mediciones son locales; los resultados públicos dependen del hosting, la red y el dispositivo. Las comprobaciones automáticas no sustituyen una auditoría manual completa de WCAG.
