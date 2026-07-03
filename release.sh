#!/usr/bin/env bash
#
# release.sh — promueve el trabajo de `main` a `production`.
# GitHub Pages publica el branch `production`, así que la web solo
# se actualiza cuando ejecutas este script.
#
# Uso:  ./release.sh
#
set -euo pipefail

DEV_BRANCH="main"
PROD_BRANCH="production"

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
echo "✅ Producción actualizada. GitHub Pages se reconstruirá en ~1 min."
