import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(root, 'site');
const output = path.join(root, 'dist');
const assets = ['index.html', 'site.css', 'palette.css', 'finish.css', 'script.js', 'effects.js', 'waves.svg'];
const imageTypes = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg']);

for (const name of assets) {
  if (!fs.existsSync(path.join(source, name))) throw new Error(`Falta el archivo ${name} en site/`);
}
if (path.dirname(output) !== root || path.basename(output) !== 'dist') throw new Error('Ruta de salida inesperada');
if (fs.existsSync(output)) fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
for (const name of assets) fs.copyFileSync(path.join(source, name), path.join(output, name));
const images = path.join(source, 'images');
if (fs.existsSync(images)) {
  const target = path.join(output, 'images');
  fs.mkdirSync(target, { recursive: true });
  for (const entry of fs.readdirSync(images, { withFileTypes: true })) {
    if (!entry.isFile() || !imageTypes.has(path.extname(entry.name).toLowerCase())) continue;
    fs.copyFileSync(path.join(images, entry.name), path.join(target, entry.name));
  }
}
fs.copyFileSync(path.join(root, 'hosting', '.htaccess'), path.join(output, '.htaccess'));
console.log('Versión para Hostinger preparada en dist/');
console.log('Sube solo el contenido de dist/ a public_html.');
