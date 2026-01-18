#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE_DIR="$ROOT_DIR/shared"

BACK_TARGET="$ROOT_DIR/back/src/shared"
FRONT_TARGET="$ROOT_DIR/front/src/shared"

rm -rf "$BACK_TARGET" "$FRONT_TARGET"
mkdir -p "$BACK_TARGET" "$FRONT_TARGET"

cp -R "$SOURCE_DIR"/. "$BACK_TARGET"
cp -R "$SOURCE_DIR"/. "$FRONT_TARGET"

while IFS= read -r -d '' file; do
  sed -E -i 's/(from "[.][^"]*\/[^".]+)"/\1.js"/g' "$file"
done < <(find "$BACK_TARGET" -type f -name "*.ts" -print0)

echo "Shared schemas synced to back/src/shared and front/src/shared"
