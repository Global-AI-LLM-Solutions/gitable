# After Dark architecture remediation — 7 November 2026

## Current release state
**Not publicly verified live.** The intended URL is https://afterdark.globalaiswarms.com. The owner confirmed GoDaddy DNS `afterdark -> geo.surge.world`, TTL 600; **do not edit DNS**. A DNS record does not establish a successful Surge publication. An authorized Surge account / a `SURGE_TOKEN` in GitHub Actions is not verified, so no production deployment is claimed.

## Source-of-truth architecture
- Canonical HTML: `docs/after-dark/index.html`.
- Client dependencies: none; CSS, HTML and a small local JavaScript filter/favourites demo.
- Safe release gate: `node docs/after-dark/validate-preview.mjs`.
- Source regression tests: `node --test docs/after-dark/tests/*.test.mjs`.
- GitHub workflow: `.github/workflows/after-dark-surge.yml` (manual `workflow_dispatch`, `preview` default, `release` explicit).
- Deployment mechanism: `docs/after-dark/deploy-ci.sh`; pinned `surge@0.56.0` as verified against npm on review date.
- HTTPS verification: `docs/after-dark/verify-live.mjs` allows only the exact Surge preview-revision host pattern or exact requested production host.

The deployment script publishes **only index.html**. It creates a preview revision first, parses the specific returned revision identifier, validates that preview over HTTPS, then **only on an explicit `release` invocation** runs `surge <domain> cutover <revision>` and checks production HTTPS. This is intentionally fail-closed if the CLI output changes or verification fails.

## Remaining independent dependencies
1. Confirm the Surge account is authorized through the real secure sign-in flow. Obtain a domain-scoped publish token, put it in GitHub Actions repository secrets under `SURGE_TOKEN`, not in source or GitHub issues. GitHub MCP does not expose action secret creation.
2. Verify GitHub Actions usage is within the user's no-fee entitlements before running a cloud job.
3. Run the manual preview and inspect actual rendered mobile behavior and network requests.
4. Require explicit owner release instruction and run the manual `release` choice; inspect the returned production URL and TLS response. Confirm fallback to previous revision.
5. Verify Surge's written policy for planned future commercial adult-affiliate operations before activating anything outside the pre-launch, non-explicit concept.

## Guardrails
No media of real people, age-verification pretence, affiliate redirects, remote images, embeds, trackers, checkout, billing, or new subscriptions. Never change root-domain DNS, mail, KeyGNAT, GoDaddy account billing, nameservers or DNSSEC. Never infer nationwide/worldwide legal approval from a static HTML design.

`partner-preview.html` is a separate historical mockup and is **not deployed**. Historical Render / Cloudflare / GoDaddy Airo plans are not active or authorized; `render.yaml` is retained only as old reference and must not be used. GitHub is source storage, not web hosting.

## Validation limits
The code-level source checks and tests were reviewed, but this chat's container could not reach GitHub to run a local checkout (DNS resolution unavailable), and no authenticated Actions execution has been completed. **Do not label runtime/browser tests as passing** until an actual CI run and public HTTPS test provide evidence.

## Rollback
The source review is on a non-production branch; rollback is to decline/close the draft PR. For future Surge production revisions, the authenticated deployment operator can use `surge afterdark.globalaiswarms.com revs` and `surge afterdark.globalaiswarms.com rollback`. Test rollback before claiming it is production-proven.

Official Surge references: https://surge.sh/docs/cli/reference ; https://surge.sh/docs/cli/previews .
