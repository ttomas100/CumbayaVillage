// Build del sitio para GitHub Pages → _site/
//
// El HTML fuente usa React (build de desarrollo) + Babel en el navegador, lo
// que obliga a cada visitante a descargar ~1 MB de JS y transpilar el código
// en cada visita. Este build:
//   1. Pre-compila cada <script type="text/babel"> con la MISMA versión y
//      opciones que usa @babel/standalone en el navegador (código idéntico).
//   2. Quita el <script> de Babel.
//   3. Cambia React development → production.min (con su hash SRI).
//   4. Copia el resto de archivos publicables tal cual.
//
// El HTML fuente no cambia: se sigue editando igual y sigue funcionando en
// local con Babel en el navegador. Uso: npm run build

import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const Babel = createRequire(import.meta.url)("@babel/standalone");

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "_site");
const PAGES = ["index.html", "admin.html"];

// Archivos de desarrollo que no se publican (los dotfiles tampoco, igual que
// hacía Jekyll).
const PRIVATE = new Set(["package.json", "package-lock.json", "release.sh", "README.md"]);
const PRIVATE_DIRS = ["scripts/", "node_modules/", "_site/"];

// Builds de producción de React, con hash SRI verificado (unpkg + jsdelivr).
const REACT_PROD = {
  "react@18.3.1": {
    src: "https://unpkg.com/react@18.3.1/umd/react.production.min.js",
    integrity: "sha384-DGyLxAyjq0f9SPpVevD6IgztCFlnMF6oW/XQGmfe+IsZ8TqEiDrcHkMLKI6fiB/Z",
  },
  "react-dom@18.3.1": {
    src: "https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js",
    integrity: "sha384-gTGxhz21lVGYNMcdJOyq01Edg0jhn/c22nsx0kyqP0TxaV5WVdsSH1fSDUf5YJj1",
  },
};

// Mismas opciones que buildBabelOptions() de @babel/standalone para un
// <script type="text/babel"> sin data-presets/data-plugins/data-targets,
// salvo el source map inline (solo pesa; no cambia el código).
function babelOptions(filename) {
  return {
    filename,
    presets: ["react", "env"],
    plugins: ["transform-class-properties", "transform-object-rest-spread", "transform-flow-strip-types"],
    targets: { browsers: undefined },
    sourceMaps: false,
  };
}

function fail(msg) {
  console.error(`✗ build: ${msg}`);
  process.exit(1);
}

function compilePage(name, html) {
  // React development → production.min
  html = html.replace(
    /<script src="https:\/\/unpkg\.com\/(react|react-dom)@([\d.]+)\/umd\/\1\.development\.js"[^>]*><\/script>/g,
    (tag, pkg, version) => {
      const prod = REACT_PROD[`${pkg}@${version}`];
      if (!prod) fail(`${name}: sin build de producción para ${pkg}@${version}; añádelo a REACT_PROD`);
      return `<script src="${prod.src}" integrity="${prod.integrity}" crossorigin="anonymous"></script>`;
    },
  );

  // Fuera Babel
  html = html.replace(/[ \t]*<script src="https:\/\/unpkg\.com\/@babel\/standalone@[^"]*"[^>]*><\/script>\n?/g, "");

  // Pre-compilar cada bloque text/babel (en orden; ejecutan como scripts
  // clásicos, igual que cuando Babel los inyecta en el navegador).
  let inline = 0;
  let count = 0;
  html = html.replace(/<script type="text\/babel"([^>]*)>([\s\S]*?)<\/script>/g, (tag, attrs, source) => {
    const module = (attrs.match(/data-module="([^"]*)"/) || [])[1];
    let filename = module;
    if (!filename) {
      inline++;
      filename = inline > 1 ? `Inline Babel script (${inline})` : "Inline Babel script";
    }
    let code;
    try {
      code = Babel.transform(source, babelOptions(filename)).code;
    } catch (e) {
      fail(`${name} › ${filename}: ${e.message}`);
    }
    count++;
    // Que el código nunca pueda cerrar el <script> antes de tiempo.
    code = code.replace(/<\/(script)/gi, "<\\/$1").replace(/<!--/g, "<\\!--");
    return `<script${attrs}>\n${code}\n  </script>`;
  });

  for (const leftover of ["text/babel", "babel.min.js", ".development.js"]) {
    if (html.includes(leftover)) fail(`${name}: queda "${leftover}" en el HTML compilado`);
  }
  return { html, count };
}

// Archivos a publicar: los trackeados + los nuevos aún sin commitear (no los
// ignorados). En CI equivale a los archivos del commit.
const files = execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard"], { cwd: ROOT })
  .toString()
  .split("\0")
  .filter(Boolean)
  .filter((f) => !f.split("/").some((part) => part.startsWith(".")))
  .filter((f) => !PRIVATE.has(f) && !PRIVATE_DIRS.some((d) => f.startsWith(d)));

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

let copied = 0;
for (const f of files) {
  if (PAGES.includes(f)) continue;
  try {
    mkdirSync(dirname(join(OUT, f)), { recursive: true });
    cpSync(join(ROOT, f), join(OUT, f));
    copied++;
  } catch (e) {
    if (e.code !== "ENOENT") throw e; // borrado en el working tree, aún sin commitear
  }
}

for (const page of PAGES) {
  const before = readFileSync(join(ROOT, page), "utf8");
  const { html, count } = compilePage(page, before);
  writeFileSync(join(OUT, page), html);
  console.log(`✓ ${page}: ${count} bloques compilados, ${Math.round(before.length / 1024)} KB → ${Math.round(html.length / 1024)} KB`);
}
console.log(`✓ ${copied} archivos copiados → _site/`);
