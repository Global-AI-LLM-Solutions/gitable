# After Dark - iPhone-friendly publishing

**Current status:** GitHub source and deployment workflow prepared; production not verified live.

You should **not** have to type terminal commands into an iPhone. The preferred path is to use ChatGPT Work's secure cloud browser to handle the one-time Surge account sign-in and setup of the GitHub secret. The owner must approve any account authorization in the official sign-in screen. No credentials may be pasted into ChatGPT or a GitHub issue.

After authorization, future updates use GitHub's **Actions** tab and a manual workflow with two selections: `preview` (default, never changes production) or `release` (explicit promotion after preview validation). Details are in `SURGE_DEPLOY.md`.

**Prepared source:** `docs/after-dark/index.html`.
**Production:** https://afterdark.globalaiswarms.com
**DNS:** The owner already confirmed CNAME `afterdark` -> `geo.surge.world`, TTL 600. Do not change it.

The existing `.vscode/tasks.json` and `publish-phone.sh` remain fallback tools, but a prior iPhone Codespaces task selection produced no visible output. Do not keep repeating those taps. The fallback script uses an official Surge browser login and publishes **preview only**.

Do not create chargeable Codespaces, paid workflows, provider subscriptions or new payment methods. Do not publish restricted images, affiliate links, or unrestricted age controls.
