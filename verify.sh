#!/usr/bin/env bash
set -euo pipefail

EXPECTED_SHA="2a84714eadf4b69eae5185b02f668007f688b7aa"
SOURCE_DIR="casey-source"

printf 'CASEY_PRIVATE_SUBMODULE_PROBE expected_sha=%s vercel_ref=%s\n' \
  "$EXPECTED_SHA" "${VERCEL_GIT_COMMIT_REF:-unknown}"

if [[ ! -f "$SOURCE_DIR/package.json" ]]; then
  echo "Submodule was not populated automatically; attempting authenticated submodule update."
  git submodule sync --recursive
  git submodule update --init --recursive
fi

if [[ ! -f "$SOURCE_DIR/package.json" ]]; then
  echo "Casey source was not available after submodule update." >&2
  exit 1
fi

ACTUAL_SHA="$(git -C "$SOURCE_DIR" rev-parse HEAD)"
if [[ "$ACTUAL_SHA" != "$EXPECTED_SHA" ]]; then
  echo "Exact source mismatch: expected $EXPECTED_SHA, got $ACTUAL_SHA" >&2
  exit 1
fi

mkdir -p out
cat > out/index.html <<HTML
<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Casey private source probe</title></head>
<body><main><h1>Private Casey source acquired</h1><p>Exact commit: <code>$ACTUAL_SHA</code></p><p>This preview confirms source acquisition only; it is not a release verdict.</p></main></body></html>
HTML

printf 'CASEY_PRIVATE_SUBMODULE_PROBE_RESULT status=passed actual_sha=%s\n' "$ACTUAL_SHA"
