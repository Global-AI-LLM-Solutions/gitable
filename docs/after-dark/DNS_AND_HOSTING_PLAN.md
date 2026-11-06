# After Dark - authoritative hosting and DNS decision

**Effective 7 November 2026:** The intended non-explicit concept host is **Surge**. This supersedes earlier Render, Cloudflare and GoDaddy Airo proposals. No deployment has yet been independently verified at the branded HTTPS URL.

- GitHub source repository: `Global-AI-LLM-Solutions/gitable`.
- Approved single-file homepage: `docs/after-dark/index.html`.
- Target domain: `afterdark.globalaiswarms.com`.
- Founder-confirmed GoDaddy DNS: CNAME `afterdark` -> `geo.surge.world`, TTL 600.
- **Never edit** the root domain, `www`, MX/TXT, nameservers, DNSSEC, KeyGNAT or unrelated records.
- **Excluded:** Cloudflare, Render (402/payment requirement), Netlify, Vercel, GitHub Pages, IONOS, Lovable, Shopify and paid GoDaddy Airo.
- The free Surge static plan is suitable for testing a non-explicit concept technically, subject to free-account activation and actual publisher permission. It is **not** evidence that adult-affiliate operations have been approved.
- Account authorization and a private `SURGE_TOKEN` stored only in GitHub Actions secrets are necessary for automated publication.
- Release design: default preview -> independent HTTPS/content validation -> explicit production cutover -> HTTPS/content verification.
- The old `render.yaml` deployment blueprint is removed from the active release branch.
- No adult content, people-based creative, affiliate URLs, third-party embeds, trackers, visitor payments or verified-age claims are enabled.

Detailed procedures: `SURGE_DEPLOY.md`. No purchase, DNS adjustment or public production deployment is authorized merely by preparing source code.
