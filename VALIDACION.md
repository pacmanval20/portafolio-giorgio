# Validación de entrega

Fecha: 22 de septiembre de 2026 (Perú).

## Alcance

Nueva versión modular en Next.js, React y TypeScript, basada en el repositorio `pacmanval20/portafolio-giorgio`, commit `8c1b98d8284ded512f36a668e8e06b03c80d6bc2`. La foto y los datos profesionales provienen de ese repositorio y del brief del usuario. Se añadió el número y el mensaje de WhatsApp solicitados.

Esta entrega es local; no se ha reemplazado el sitio público ni se ha desplegado en Vercel.

## Comprobaciones realizadas

- Compilación optimizada y exportación estática correctas.
- TypeScript estricto sin errores. El comando de comprobación genera primero los tipos de rutas para funcionar también en una instalación nueva.
- Compilación y prueba con el prefijo `/portafolio-giorgio` de GitHub Pages: recursos, fotografía, URL canónica y bloqueo del atajo correctos.
- Menú móvil: abre, navega y se cierra correctamente.
- FAQ: acordeones nativos operativos y contenido coincidente con JSON-LD.
- Enlaces de WhatsApp: número `51940756413` y mensaje exacto del brief.
- Ctrl + S y Cmd + S muestran el aviso previsto.
- Un único H1, idioma español, imágenes con texto alternativo, foco visible, enlace para saltar al contenido y respeto a movimiento reducido.
- Prueba automática con axe para WCAG A/AA y WCAG 2.1 AA: sin infracciones detectadas en escritorio y móvil.
- Sin errores de JavaScript ni respuestas HTTP fallidas durante la revisión local.
- Sin desplazamiento horizontal a 320, 375, 390, 768, 1024 y 1440 px.
- Revisión visual de escritorio, móvil y tarjeta OpenGraph.
- `npm audit --omit=dev`: cero vulnerabilidades conocidas reportadas durante la revisión.

## Lighthouse

El informe HTML incluido contiene la medición móvil local de la versión entregada. No es una medición del sitio público. La puntuación de accesibilidad automática no equivale a una certificación WCAG; quedan fuera pruebas manuales exhaustivas con lectores de pantalla y dispositivos físicos.

## Límites importantes

- El bloqueo del atajo es disuasorio, no una protección anticopia. Los recursos del sitio público y el código del repositorio público se pueden descargar.
- No hay testimonios ni métricas ficticias. Nubo figura en desarrollo y el sistema de tienda, planificado.
- JSON-LD describe una persona y su portafolio; no se presenta un negocio local inexistente ni se garantiza recomendación por IA.
- HTTPS depende del despliegue y dominio del proveedor. No se realizó publicación ni validación de certificado en esta entrega.
