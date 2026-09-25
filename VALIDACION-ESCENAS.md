# Validación del rediseño por escenas

- Impeccable: se leyeron y aplicaron las instrucciones locales de diseño, movimiento y craft floor. El motor automático no pudo ejecutar context debido a restricciones de escritura de su caché; no se atribuye una auditoría automática.
- Compilación de producción Next.js y comprobación TypeScript: aprobadas tras los ajustes finales.
- Navegador: revisión de escritorio y móvil a 390 px, sin desbordamiento horizontal. Foto cargada, terminal separada de la portada y escena móvil sin sticky.
- Navegación: enlaces a secciones, menú móvil, FAQ con Enter y foco de teclado revisados. Contactos reales conservados en WhatsApp/correo y redes.
- Movimiento: escenas de Python/web/IA cambian con scroll nativo. Meteoros sustituyen a la lluvia; canvas con pointer-events:none. No se intercepta la rueda.
- Escritura: observación de la caja pre en lugar del texto vacío, reinicio al entrar, repetición tras cuatro segundos y cursor de escritura. Verificada progresión visible de caracteres en navegador.
- Texto: palabras escalonadas y nombre con distorsión digital breve; versión legible por defecto. Separación entre palabras corregida tras revisión visual.
- Pausa: fx-off, texto Python completo, observadores y animaciones de palabras detenidos. Probado en navegador.
- Movimiento reducido: revisado en código y CSS; no se emuló una preferencia del sistema en navegador.
- Consola: sin errores en la revisión del despliegue de escenas. Revisión estática independiente de limpieza de eventos y últimas animaciones sin hallazgos materiales.
- Publicación: los seis archivos remotos se compararon con las fuentes locales y coinciden. El despliegue final se verifica en la web pública antes de entregar.
- Confirmación pública final: GitHub Actions 36054030780 completado con éxito. En la URL pública se verificaron nombre nuevo, 26 palabras animadas, meteoros, terminal fuera de portada, escritura activa (10 caracteres observados frente al ejemplo completo de 220), altura 320 sin desbordamiento y consola sin errores.

## Corrección solicitada: montaje ligado al scroll
- Nombre: distorsión continua mientras está visible, sin fase larga limpia; tamaño idéntico de Giorgio, Taboada y Ylave. Verificado 96px en escritorio y 62.4px en móvil. Eliminado recorte heredado del h1.
- Fondo: campo distribuido por todo el viewport, 85–150 partículas de 30–72px en escritorio y 42 de 22–46px en móvil; trayectorias diagonales/radiales con estela y desaparición.
- Movimiento: 28 elementos de composición y palabras controlados por progreso del scroll; no temporizadores de entrada. Verificada reversión: escena de proyectos 0.6468 a scroll2856, 0 a2256 y 0.6468 al regresar2856.
- Coordenadas: medición de layout no transformado y ResizeObserver para cambios de altura. Terminal conserva escritura independiente visible.
- Móvil: sin desbordamiento a390px; overrides específicos de terminal, Nubo y trayectoria corregidos. Matrices verificadas sin desplazamiento lateral.
- Pausa: remueve los28 elementos animados, deja código completo de220 caracteres y elimina distorsión. Movimiento reducido preservado por código/CSS, sin emulación del sistema.
- Compilación y TypeScript aprobados. Consola sin errores. Revisión estática independiente completada; hallazgo móvil corregido.
