#!/usr/bin/env bash
# iPhone Codespaces fallback; PREVIEW by default, never accepts unreviewed adult media.
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
node "$ROOT/docs/after-dark/validate-preview.mjs"
node --test "$ROOT/docs/after-dark/tests/"*.test.mjs
if [ -z "${SURGE_TOKEN:-}" ] && ! npx --yes surge@0.56.0 whoami >/dev/null 2>&1; then
  echo "Secure Surge browser sign-in required. Never share passwords or tokens in ChatGPT or GitHub issues."
  npx --yes surge@0.56.0 login --browser
fi
# Authentication is held by Surge CLI only. Delegates to shared release script.
if [ -z "${SURGE_TOKEN:-}" ]; then
  # The shared CI script expects a token; mobile uses its existing Surge CLI account session.
  echo "Publishing a preview using the authenticated Surge CLI session."
  npx --yes surge@0.56.0 "$ROOT/docs/after-dark/index.html" afterdark.globalaiswarms.com --preview --force https
else
  TARGET=preview bash "$ROOT/docs/after-dark/deploy-ci.sh"
fi
echo "The preview URL is shown above; production has NOT been changed."
