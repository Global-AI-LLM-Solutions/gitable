#!/usr/bin/env bash
# After Dark: preview first, verify HTTPS, then explicitly promote the exact revision.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
DOMAIN="afterdark.globalaiswarms.com"
SITE="$ROOT/docs/after-dark/index.html"
SURGE="surge@0.56.0"
TARGET="${TARGET:-preview}"
[[ "$TARGET" == preview || "$TARGET" == release ]] || { echo "Unrecognized release mode; refusing deployment."; exit 1; }
[[ -n "${SURGE_TOKEN:-}" ]] || { echo "Surge token unavailable; no publication attempted."; exit 1; }
node "$ROOT/docs/after-dark/validate-preview.mjs"
node --test "$ROOT/docs/after-dark/tests/"*.test.mjs
echo "Creating a revision preview without modifying production."
OUTPUT="$(npx --yes "$SURGE" "$SITE" "$DOMAIN" --preview --force https 2>&1)" || { echo "Surge preview failed. No cutover attempted."; exit 1; }
# Surge documents <revision>--afterdark--globalaiswarms--com.surge.sh for custom domains.
PREVIEW_HOST="$(printf '%s\n' "$OUTPUT" | grep -Eo '[0-9]{10,}--afterdark--globalaiswarms--com[.]surge[.]sh' | head -n 1 || true)"
if [[ -z "$PREVIEW_HOST" ]]; then
  echo "Surge did not provide a recognizable revision URL; refusing cutover."
  exit 1
fi
REVISION="${PREVIEW_HOST%%--*}"
echo "Review revision: https://$PREVIEW_HOST/"
node "$ROOT/docs/after-dark/verify-live.mjs" "https://$PREVIEW_HOST/"
if [[ "$TARGET" == preview ]]; then
  echo "Preview verified; production was not modified."
  exit 0
fi
echo "Explicit production release requested. Promoting verified revision $REVISION."
npx --yes "$SURGE" "$DOMAIN" cutover "$REVISION"
node "$ROOT/docs/after-dark/verify-live.mjs" "https://$DOMAIN/"
echo "Live content verified; revision $REVISION."
echo "To rollback securely: npx --yes $SURGE $DOMAIN rollback"
