# After Dark — phone-only publishing, with no Mac or PC

Status: **prepared, not published**. Domain `afterdark.globalaiswarms.com` already points from GoDaddy to Surge's published CNAME destination `geo.surge.world` (user confirmed). This record is correct but does not publish content.

## First publication — from an iPhone

1. Open [Start GitHub Codespaces](https://codespaces.new/Global-AI-LLM-Solutions/gitable) in Safari or Chrome on your iPhone. This creates a cloud Linux terminal, not a local terminal.
2. Confirm the Codespace is covered by your **personal free included usage** and does **not** offer an unexpected paid organization compute plan. If there is a potential charge, stop. GitHub personal free use does not automatically mean an organization-owned Codespace is free.
3. In the browser Codespace, open **Terminal → New Terminal**.
4. Paste exactly:
   `bash docs/after-dark/publish-phone.sh`
5. Follow Surge's **official** browser login URL and its one-time four-letter code. Surge supports sign-in with GitHub, Google, or email. Keep passwords and API tokens out of ChatGPT; verify the four-letter code matches.
6. The script checks that the HTML includes disabled advertiser buttons, no real-person images and no external links, then publishes the **single HTML file** to `afterdark.globalaiswarms.com` using official Surge's free hosting and managed HTTPS.
7. Confirm the command reports a published domain and status `live`, then open [After Dark](https://afterdark.globalaiswarms.com) in the phone browser.
8. Stop/delete the Codespace when done to avoid compute/storage usage.

The script is already available at:
https://github.com/Global-AI-LLM-Solutions/gitable/blob/main/docs/after-dark/publish-phone.sh

## Future updates via one GitHub button

The repository also contains a manual **GitHub Actions** workflow:
`.github/workflows/after-dark-surge.yml`

This workflow is intentionally NOT triggered on commit, and will refuse to publish until `SURGE_TOKEN` is present in GitHub Actions secrets. After authenticating in your Codespace, mint a *domain-scoped* token using `npx --yes surge@latest tokens add --domain afterdark.globalaiswarms.com -m "After Dark Github"` and copy it **directly into GitHub Settings → Secrets and variables → Actions → Repository secrets**. Do not provide credentials to ChatGPT, and do not store them in the repository.

Then the GitHub **Actions** tab can launch *After Dark - manual Surge publish (non-explicit only)* from any device, including iPhone. The workflow checks safe content and publishes only the static `index.html`, with no changed DNS.

## Why direct ChatGPT-to-Surge deployment is not complete

Surge does not currently expose an installed ChatGPT plugin/connector that can establish an authenticated publishing session. GitHub connectors cannot fetch the Surge token or create Github Actions secrets for you. A live browser session in your personal iPhone is also not visible to this assistant. The one-time Surge login and secure token setup cannot be automated by sending credentials in an ordinary message.

## Safety and finances

- The domain's existing GoDaddy CNAME is correct and should stay unchanged. Never change the GAS root records or nameservers.
- Do not use Cloudflare, Vercel, GitHub Pages, Netlify, Render, paid GoDaddy Airo or Stripe.
- This website remains a **non-explicit concept**: CSS-only demonstration thumbnails, no actual adult content, no affiliate link activation, no tracking or visitor checkout.
- A free static host cannot itself enforce trusted legal age verification or geo-restrictions. Live adult-affiliate publishing requires hosting agreement confirmation, provider-supplied image rights, signed affiliate terms, licensed adult-performer provenance, lawful country-specific age assurance, and moderation.
- Surge's free plan and GitHub's Codespaces free inclusion may have limits and separate eligibility. Do not opt into billing.

Official sources:
- https://surge.sh/docs/cli/publishing
- https://surge.sh/docs/cli/account
- https://docs.github.com/en/codespaces/troubleshooting/troubleshooting-included-usage
- https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/setting-up-your-repository/facilitating-quick-creation-and-resumption-of-codespaces
