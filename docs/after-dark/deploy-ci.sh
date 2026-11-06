#!/usr/bin/env bash
# Safe, explicit After Dark release. Mode defaults to PREVIEW.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
DOMAIN="afterdark.globalaiswarms.com"
SITE="$ROOT/docs/after-dark/index.html"
SURGE="surge@0.56.0"
TARGET="${TARGET:-preview}"
[ "$TARGET" = preview ] || [ "$TARGET" = release ] || { echo "Unknown target, denied."; exit 1; }
[ -n "${SURGE_TOKEN:-}" ] || { echo "Missing secure Surge authorization. No release attempted."; exit 1; }
node "$ROOT/docs/after-dark/validate-preview.mjs"
node --test "$ROOT/docs/after-dark/tests/"*.test.mjs
if [ "$TARGET" = preview ]; then
  echo "Preview-only upload. Production remains unchanged."
  npx --yes "$SURGE" "$SITE" "$DOMAIN" --preview --force https
  echo "Preview uploaded. Inspect the revision URL in the preceding output."
  exit 0
fi
echo "Explicit release selected. Publishing approved static concept."
npx --yes "$SURGE" "$SITE" "$DOMAIN" --force https
echo "Checking HTTPS response content and certificate."
node "$ROOT/docs/after-dark/verify-live.mjs" "https://$DOMAIN/"
echo "Release verified. Rollback: npx --yes $SURGE $DOMAIN rollback"
