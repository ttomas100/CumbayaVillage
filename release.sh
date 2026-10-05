#!/usr/bin/env bash
#
# release.sh — promueve el trabajo de `development` a `main`.
# GitHub Pages publica el branch `main` (vía GitHub Actions, ver
# .github/workflows/pages.yml), así que la web se actualiza cuando
# ejecutas este script (o con cualquier push directo a `main`).
#
# Uso:  ./release.sh
#
set -euo pipefail

DEV_BRANCH="development"
PROD_BRANCH="main"

# 1. Asegurar árbol limpio
if [[ -n "$(git status --porcelain)" ]]; then
  echo "✋ Tienes cambios sin commitear. Haz commit o stash antes de publicar."
  exit 1
fi

echo "→ Actualizando $DEV_BRANCH…"
git checkout "$DEV_BRANCH"
git pull --ff-only origin "$DEV_BRANCH"

echo "→ Fusionando $DEV_BRANCH en $PROD_BRANCH…"
git checkout "$PROD_BRANCH"
git pull --ff-only origin "$PROD_BRANCH"
git merge --ff-only "$DEV_BRANCH"

echo "→ Publicando a producción (push $PROD_BRANCH)…"
git push origin "$PROD_BRANCH"

git checkout "$DEV_BRANCH"
echo "✅ Producción actualizada. GitHub Actions compilará y publicará la web en ~1-2 min."
