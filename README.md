# Portafolio de Giorgio: edición local y publicación en Hostinger

Este proyecto es una página HTML, CSS y JavaScript. Puedes editarlo sin instalar Bootstrap, React ni otras bibliotecas. La versión local se abre en tu computadora; publicar en Hostinger es un paso separado.

## Editar en Visual Studio Code

1. Abre Visual Studio Code y elige **Archivo → Abrir carpeta**. Selecciona la carpeta `portafolio-giorgio-editable`, no solo `index.html`.
2. En el panel izquierdo, abre `site/index.html` para cambiar tu presentación, conocimientos, proyectos y contactos. Guarda con **Ctrl+S**.
3. Para cambiar colores y fondos, edita `site/palette.css`. Para cambiar el diseño de las secciones y la luz del mouse, edita `site/finish.css`. `site/site.css` contiene la estructura general.
4. Si añades una foto, guárdala en `site/images/` y enlázala desde `site/index.html` con una ruta como `images/foto.jpg`. No pongas datos privados que no quieras publicar.

Si no tienes Visual Studio Code, se descarga desde https://code.visualstudio.com/download. También puedes usar otro editor de texto; Visual Studio Code permite trabajar con toda la carpeta y ver los archivos juntos.

## Ver la página mientras editas

Haz doble clic en `Abrir-local.cmd`. Deja abierta la ventana que aparece. En Brave, entra a:

**http://127.0.0.1:4173**

Cuando guardes un cambio, actualiza Brave con **Ctrl+R**. Para detener la vista local, vuelve a la ventana y pulsa **Ctrl+C**. El servidor local escucha solo en tu computadora (`127.0.0.1`) y no recibe cambios ni archivos desde internet.

También puedes abrir la terminal integrada de Visual Studio Code y ejecutar `npm run dev` desde esta carpeta. Necesitas Node.js instalado para la vista local y para preparar el paquete de Hostinger. El proyecto no instala dependencias externas.

## Preparar los archivos para Hostinger

En la terminal de Visual Studio Code, ejecuta `npm run build`. Se crea la carpeta `dist/`. **Solo los archivos dentro de `dist/`** van a `public_html` de tu sitio en Hostinger. No subas `site/`, los scripts de desarrollo, `README.md` ni archivos con contraseñas.

`dist/.htaccess` contiene reglas básicas para limitar de dónde se cargan scripts y estilos y para evitar que el navegador interprete archivos con un tipo incorrecto. El proyecto no tiene formulario, inicio de sesión ni base de datos: por ahora no necesita guardar claves ni datos en el servidor. Configura el dominio y comprueba que HTTPS esté activo en el panel SSL de Hostinger antes de compartir la URL.

Antes de publicar, reemplaza los textos **«enlace pendiente»**, añade tu foto si deseas y revisa que las descripciones de Nubo y la tienda reflejen lo que realmente has construido.

La estructura principal es:

```text
portafolio-giorgio-editable/
├─ site/                 archivos que editas
│  ├─ index.html         contenido de la página
│  ├─ palette.css        colores del tema espacial
│  ├─ finish.css         diseño de las secciones y efectos
│  └─ images/            tus fotos e imágenes
├─ Abrir-local.cmd       inicia la vista local
├─ dist/                 resultado de npm run build para Hostinger
└─ hosting/.htaccess     reglas del servidor para el resultado
```
