# After Dark: Surge deployment (non-explicit concept ONLY)
Reviewed 7 November 2026. **Status: source prepared, NOT deployed.**

## Domain independence
- The original website `https://globalaiswarms.com` is ALREADY LIVE. Do not modify its hosting, DNS apex `@`, root A records, `www`, MX/TXT mail, KeyGNAT, nameservers, or DNSSEC.
- **After Dark** is a separate static site at `afterdark.globalaiswarms.com` and may be independently hosted on Surge.
- Never claim GoDaddy owning the domain means GoDaddy hosts the Surge project.

## Project
- Public source: `Global-AI-LLM-Solutions/gitable`
- Publish folder **`docs/after-dark`**; homepage **`docs/after-dark/index.html`**
- Neon high-contrast responsive visual concept, original CSS abstract placeholders, no explicit images, no advertiser tracking, no affiliate links, no visitor checkout. Verify this before every release.
- Don't publish `docs/after-dark/providers.json`, operational logs, project plans or API data if the production version grows; for a full production release, build an allowlisted `dist` with HTML/assets only and test its contents. Current concept is static and policy docs are already publicly committed to the source repo. For static preview you may copy *only* `index.html` to a dedicated empty release directory.

## First publish (requires an authenticated Surge account, currently unavailable in ChatGPT)
With a Node.js 18+ environment that has network access and your authorized Surge CLI account:
```sh
npm install --global surge
mkdir -p after-dark-release
cp docs/after-dark/index.html after-dark-release/index.html
surge ./after-dark-release afterdark.globalaiswarms.com
```
The first CLI login will request account email/password or valid token. Never paste credentials into ChatGPT or commit a Surge token. Do not sign up for paid plans automatically.
Wait for an actual Surge publish receipt, TLS status and domain registration before DNS edits. Do not assume `surge publish` from an arbitrary directory uploads the correct site.

## GoDaddy DNS record after successful publish
Type: **CNAME**\n
Name: **afterdark**\n
Value: **geo.surge.world**\n
TTL: **600 seconds**.

Do **NOT** put `afterdark.globalaiswarms.com` in the Value field: that points the hostname to itself and will not work. Only use the official Surge CNAME value after the domain has been claimed by your Surge project. Do not delegate the main domain nameservers to Surge.

## Verify
```sh
surge afterdark.globalaiswarms.com status
```
Check `https://afterdark.globalaiswarms.com` loads the intended neon concept over a valid certificate, no adult media and no outbound affiliate buttons; the GoDaddy DNS changes may need propagation. Confirm the actual service has status `live`. If it has not been published, do not save the DNS record merely to force the setup.

## Commercial and content safeguards
Surge free custom-domain hosting DOES NOT equal legal approval for adult-affiliate commercial imagery. Its terms: https://surge.sh/terms prohibit illegal material and some links; written permission for the final adult-referral activity is still pending. A static site can't itself perform trusted geo/age checks. Keep adult thumbnails and referral buttons disabled, and require account approval, licensed creatives, age/consent provenance, moderation and jurisdiction-specific compliance before enabling anything.

## Official provider references
- https://surge.sh/docs/getting-started
- https://surge.sh/docs/platform/custom-domains
- https://surge.sh/docs/guides/custom-domain
- https://surge.sh/terms

No Surge account is linked or provisioned in ChatGPT; the current sandbox has no external DNS resolution to install the CLI or upload to Surge. Do not claim this guide is a deployment receipt.
