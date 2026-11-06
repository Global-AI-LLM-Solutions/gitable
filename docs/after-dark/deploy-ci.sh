#!/usr/bin/env bash
# After Dark - token only. Preview, verify, explicit cutover, verify again.
set -euo pipefail
ROOT="$(cd "$(dirname "\${BASH_SOURCE[0]}")/../.." && pwd)"
DOMAIN="afterdark.globalaiswarms.com"
SITE="$ROOT/docs/after-dark/index.html"
SURGE_VERSION="surge@0.56.0"
TARGET="\${TARGET:-preview}"
[[ "$TARGET" == preview || "$TARGET" == release ]] || { echo "BLOCKED: invalid target"; exit 1; }
[[ -n "\${SURGE_TOKEN:-}" ]] || { echo "BLOCKED: Surge token missing. Nothing uploaded."; exit 1; }
node "$ROOT/docs/after-dark/validate-preview.mjs"
node --test "$ROOT/docs/after-dark/tests/"*.test.mjs
echo "Uploading verified preview. Production unchanged."
log="$(mktemp)"
trap 'rm -f "$log"' EXIT
npx --yes "$SURGE_VERSION" "$SITE" "$DOMAIN" --preview --force https | tee "$log"
host="$(grep -Eo '[0-9]{10,}--afterdark--globalaiswarms--com\.surge\.sh' "$log" | tail -n 1 || true)"
[[ -n "$host" ]] || { echo "BLOCKED: preview revision URL missing; production unchanged."; exit 1; }
rev="\${host%%--*}"
preview="https://$host/"
echo "Preview: $preview"
ok=0
for attempt in 1 2 3 4 5; do
  if node "$ROOT/docs/after-dark/verify-live.mjs" "$preview"; then ok=1; break; fi
  sleep 4
done
[[ "$ok" -eq 1 ]] || { echo "BLOCKED: preview verification failed; production unchanged."; exit 1; }
if [[ "$TARGET" == preview ]]; then
  echo "PASS: verified preview only. Explicit RELEASE dispatch required to go live."
  exit 0
fi
echo "Explicit release: cutting over verified revision $rev."
npx --yes "$SURGE_VERSION" "$DOMAIN" cutover "$rev"
ok=0
for attempt in 1 2 3 4 5; do
  if node "$ROOT/docs/after-dark/verify-live.mjs" "https://$DOMAIN/"; then ok=1; break; fi
  sleep 4
done
[[ "$ok" -eq 1 ]] || { echo "FAIL: HTTPS production check failed. Inspect and rollback if needed."; exit 1; }
echo "PASS: verified production at https://$DOMAIN/"
