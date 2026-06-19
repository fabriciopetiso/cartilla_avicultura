# Cartilla — Alimentación agroecológica para la avicultura de la AFCI

Cartilla técnica para elaborar y manejar alimento agroecológico en la avicultura
familiar, campesina e indígena (AFCI). Sitio web de página única.

**Producido por:** CTO Traslasierra · AlterMundi · UTEP Rama Agraria.
**En línea:** https://materialavicola.altermundi.net/

## Qué es

Un sitio **estático** (HTML + CSS + JS, sin backend ni paso de build). El
contenido completo vive como HTML dentro de `index.html`; `support.js` es un
pequeño runtime ("dc-runtime") que hidrata la página con React para la
navegación lateral, el menú móvil y la barra de progreso.

El sitio es **autocontenido**: no depende de CDNs externos en tiempo de
ejecución (React, ReactDOM y las tipografías están alojados localmente).

## Estructura

```
index.html            Contenido + estilos + lógica de interacción
support.js            Runtime dc-runtime (hidratación React)
assets/
  img*.jpg            Imágenes del contenido
  cornish*.jpg        Imágenes de razas
  og-cover.jpg        Imagen para compartir en redes (Open Graph)
  logo-*.png          Logotipos
  favicon.png         Ícono del sitio
  fonts.css, fonts/   Tipografías locales (Bitter, Source Sans 3)
  vendor/             React + ReactDOM (UMD, verificados por SRI)
CNAME, .nojekyll      Configuración de GitHub Pages
robots.txt, sitemap.xml
DEPLOY.md             Runbook de publicación
originals/            (ignorado por git) másters de imagen en alta resolución
```

## Desarrollo local

Cualquier servidor estático sirve. Por ejemplo:

```bash
python3 -m http.server 8000
# abrir http://localhost:8000/
```

(No abrir `index.html` con `file://`: el runtime carga `support.js` y los assets
por HTTP.)

## Publicación

Se sirve con **GitHub Pages** sobre el dominio `materialavicola.altermundi.net`,
con TLS provisto automáticamente por GitHub. El paso a paso completo está en
[`DEPLOY.md`](DEPLOY.md).

## Imágenes

Las imágenes del repositorio están optimizadas para web. Los **másters en alta
resolución** se conservan localmente en `originals/` (ignorado por git) y también
quedan en el historial de git previo a la optimización. Para re-optimizar,
partir siempre de los originales para evitar pérdida generacional.

## Licencia

> **Pendiente de definir por los autores.** Para material educativo de este tipo
> suele usarse una licencia Creative Commons (p. ej. CC BY-SA 4.0 o
> CC BY-NC-SA 4.0). Definir y agregar un archivo `LICENSE` antes de difundir
> ampliamente.
