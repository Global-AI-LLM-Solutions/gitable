# After Dark - Surge-only release runbook

**Status:** Prepared, NOT confirmed live. Last reviewed 7 November 2026.
**Production:** `https://afterdark.globalaiswarms.com`
**Scope:** Only the non-explicit pre-launch concept, `docs/after-dark/index.html`.

## Protected boundaries

The owner has confirmed GoDaddy CNAME `afterdark` -> `geo.surge.world` (TTL 600). Do not change DNS, mail, apex, `www`, KeyGNAT or other existing properties. No new charges or payment details. Never use Render, Cloudflare, Netlify, Vercel, GitHub Pages or paid GoDaddy Airo. Surge's ability to host a static concept does not certify or authorize eventual adult-affiliate use.

## First-time secure authorization

The Surge CLI requires the owner's authenticated session, using its official `surge login --browser` sign-in. The owner must personally approve the account authorization in a secure browser. The account must be on a free, no-card, no-charge entitlement; stop if any payment or conflicting terms appear. After an authorized sign-in, mint a **domain-scoped** token with `surge tokens add --domain afterdark.globalaiswarms.com -m "After Dark CI"` and store it **privately** as a GitHub Actions secret `SURGE_TOKEN`. Never copy credentials into the repository, ChatGPT, issues, logs or screenshots.

No ChatGPT GitHub connector currently creates GitHub Actions secrets or authenticates to Surge. The Cloud Browser is available through ChatGPT Work mode, but its execution must be initiated separately, with secure account approval.

## One-action manual workflow

After the secret exists, open GitHub Actions -> `After Dark - validated Surge preview and manual release` -> `Run workflow` on the `main` branch. **Default: `preview`**, which never changes production. For an intentionally approved production release, select `release`.

The GitHub workflow:
1. Runs `validate-preview.mjs` and Node regression tests.
2. Refuses to continue if `SURGE_TOKEN` is absent.
3. Uses Surge CLI pinned to `0.56.0` to upload ONLY `index.html` as a preview.
4. Extracts the immutable preview revision and verifies its HTTPS URL, TLS and disabled-affiliate markers.
5. In `release` mode only, calls `surge afterdark.globalaiswarms.com cutover <verified revision>` and independently checks the production HTTPS page.

**Production is unverified until step 5 is observed to pass.** A GitHub commit, DNS CNAME or successful preview is not equivalent to a live site.

## Rollback

Surge supports immutable revisions: `surge afterdark.globalaiswarms.com revs` to inspect, and `surge afterdark.globalaiswarms.com rollback` to restore the previous live revision. Require authorization before rollback and check the real host afterward. A first publication has no prior revision to roll back to.

## Safety and operational limits

- No explicit images or other adult media, affiliate destinations, third-party trackers, visitor data collection or payments.
- Static validation is necessary but not proof of legal compliance or complete browser testing. All commercial release flags remain false.
- The current main page uses a single self-contained HTML file. Do not upload the entire `docs/after-dark` folder: it contains internal implementation and policy documents.
- Surge custom domains, HTTPS and previews are documented as available on its free plan, subject to account limits. GitHub-hosted Actions have separate account limits; do not trigger billable consumption.
- Headers such as CSP frame-ancestors cannot be assumed supported on Surge's free static service. The HTML provides a constrained **meta CSP**, not an equivalent HTTP response header.

Provider docs: https://surge.sh/docs/cli/previews , https://surge.sh/docs/cli/reference , https://surge.sh/docs/cli/account
