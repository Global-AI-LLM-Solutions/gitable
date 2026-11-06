# After Dark — final thumbnail affiliate advertising implementation policy
Last updated: 7 November 2026. **Status: pre-launch prototype, no active affiliate links.**

## Business model
After Dark displays curated **advertiser-approved thumbnail advertisements**. Clicking an approved thumbnail takes the visitor to the advertiser's website. The advertiser—not After Dark—hosts and streams the underlying content. Commissions are paid according to an accepted affiliate agreement. After Dark does not host or embed videos, scrape previews, proxy video files or create an adult-media feed.

## Thumbnail eligibility and age safety
- Permit only the exact creative supplied through an approved affiliate program or separately granted commercial licence. Record the rights holder, licence scope, territories, permitted display/hosting/hotlinking mode, permitted alterations, campaign and licence expiration.
- If the creative depicts any person, require credible documented verification that every performer was 18 or older when depicted and consented to the commercial use. Never use appearance analysis alone to prove adulthood.
- Independently reject any image depicting a minor or reasonably appearing to depict a minor, including ambiguous age, regardless of purported documentation. Reject uncertain, non-consensual, exploitative, prohibited or unreviewed imagery.
- Use abstract, non-explicit placeholders until all rights and reviews are verified. No scraped or third-party placeholder thumbnails.
- Review image and URL in advance, plus changed destinations, redirects and revoked/expired assets. Human approval is mandatory before publication. Automatic moderation may assist but cannot conclusively verify age, consent or legal rights.

## Age assurance and geography
- Classify the actual materials and outgoing advertising activity under applicable national, state and local rules.
- Any restricted thumbnail or outgoing adult-content referral requires server-side location assessment and lawful age assurance where applicable, **before** access; deny if location or evidence is unavailable.
- Age verification must be cryptographically verified on the server using a correctly onboarded vendor. Browser locale, self-attestation, user agent, and localStorage are insufficient proof.
- No country is currently enabled. An approved legal coverage register and tested vendor must be in place before restricted content is published. Providing a link to another site does not automatically transfer After Dark's own legal responsibilities.

## Hosting and data
- Never deploy After Dark's commercial adult-oriented site to GitHub Pages. GitHub is only the source repository.
- Do not use Vercel, IONOS, Lovable or Shopify. No new paid services or overages, even for a free-tier host.
- Verify written permission for adult-industry affiliate thumbnail advertising on the precise free hosting plan before public commercial deployment.
- No third-party pixels, automatic asset requests or unreviewed affiliate URLs in the public prototype. Hosting providers must process connection metadata; do not promise that IP addresses never reach the host.

## Affiliate disclosure and website copy
Homepage header: **After Dark™ — Find Your Next Destination**.
Subheading: **Browse curated promotional thumbnails from approved adult entertainment partners. Videos remain on partner websites.**
Displayed notice: **Advertising disclosure: After Dark may earn a commission when you visit an advertiser through an affiliate thumbnail or make a qualifying purchase.**
Access notice: **Age- and location-restricted promotions are unavailable until lawful access can be verified.**
Blocked card: **Partner not activated — awaiting verified rights, age safety and destination approval.**

## Commercial activation gates
1. Confirm the host permits commercial adult-industry affiliate ads and has zero required fees.
2. Execute an affiliate agreement; obtain authorised creatives, commercial use rights, and affiliate tracking URLs.
3. Register the website with an appropriate age-assurance service, ensure correct country-specific enforcement and independently verified server assertions.
4. Complete content/creative provenance review (every depicted person's actual age and consent), appearance-ambiguity rejection, and URL/destination moderation with human signoff.
5. Implement takedown requests, access and redirect logging minimisation, privacy notice, and expiry/revocation rechecks.
6. Test country-unknown, VPN uncertainty, failed verification, missing partner credentials, altered URLs, expired rights and rejected creatives. All must stay blocked.
7. Deploy only once independent evidence establishes a compliant, fee-free release. There is no guarantee that a wholly zero-cost setup can satisfy worldwide age-assurance law.

## Current implementation
`index.html` has four responsive abstract thumbnail demo cards with disabled buttons and an affiliate disclosure. `content-policy.json` and `providers.json` prohibit publishing unapproved content, redirects and monetisation. `access-policy.mjs` contains separate server-side-release decision scaffolding; it is not a live or secure user-facing verification service. No provider has been connected or activated.
