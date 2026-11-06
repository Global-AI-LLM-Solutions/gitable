#!/usr/bin/env bash
# After Dark: phone-friendly publishing using GitHub Codespaces.
# No payment, adult content, affiliate links or DNS changes.
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
SITE="$ROOT/docs/after-dark/index.html"
DOMAIN="afterdark.globalaiswarms.com"

command -v node >/dev/null 2>&1 || { echo "Node.js is required in the cloud terminal."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "npm is required in the cloud terminal."; exit 1; }
test -f "$SITE" || { echo "Approved After Dark site not found."; exit 1; }

node "$ROOT/docs/after-dark/validate-preview.mjs"

echo "Publishing non-explicit After Dark concept."
echo "Official Surge browser sign-in may display a URL and confirmation code."
echo "Never share login details, API tokens or recovery codes in ChatGPT."
if [ -z "$(printenv SURGE_TOKEN 2>/dev/null || true)" ] && ! npx --yes surge@latest whoami >/dev/null 2>&1; then
  npx --yes surge@latest login --browser
fi
npx --yes surge@latest "$SITE" "$DOMAIN" --force https
echo "Checking provider publishing state:"
npx --yes surge@latest "$DOMAIN" status || true
echo "After Surge confirms success, test https://$DOMAIN in your phone browser."
echo "Stop your cloud Codespace to avoid ongoing compute charges."
