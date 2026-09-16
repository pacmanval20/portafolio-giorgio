# Publicar el portafolio en GitHub Pages

## Primera publicación

1. Inicia sesión en GitHub con tu cuenta.
2. Pulsa **New repository**.
3. Escribe `portafolio-giorgio` como nombre.
4. Selecciona **Public** y crea el repositorio sin añadir README, `.gitignore` ni licencia.
5. En la página del repositorio, usa **uploading an existing file**.
6. Sube el contenido completo de la carpeta `portafolio-giorgio-editable`, incluida la carpeta `.github`. Los archivos deben quedar en la raíz del repositorio, no dentro de otra carpeta adicional.
7. Escribe `Primera versión del portafolio` y pulsa **Commit changes**.
8. Abre **Settings → Pages**.
9. En **Source**, selecciona **GitHub Actions**.
10. Abre la pestaña **Actions**. La tarea llamada **Publicar portafolio en GitHub Pages** construirá y publicará la web.

La dirección será aproximadamente:

`https://pacmanval20.github.io/portafolio-giorgio/`

## Actualizaciones

Edita y prueba localmente los archivos de `site/`. Después sube los archivos modificados al mismo repositorio y confirma el cambio. La automatización reconstruirá `dist/` y actualizará GitHub Pages.

No subas contraseñas, claves privadas, archivos `.env`, copias de documentos personales ni información que no quieras hacer pública. Aunque el repositorio se hiciera privado, la página publicada puede seguir siendo pública según el plan y la configuración de GitHub.
