# After Dark: legal zero-cost deployment alternative
Decision recorded 7 November 2026

## Multiple ENQSI review lanes (design evaluation, not autonomous agent execution)
- **Rights lane:** Labels such as 'downloaded from XVideos' on other websites do not create syndication, embedding, or commercial reuse rights. Require a licence from the actual rights owner.
- **Safety lane:** Block all media until provenance, consent, confirmed adult performer age at filming, and conservative appearance/age-ambiguity checks are satisfied. No automated approval based only on an image classifier.
- **Jurisdiction lane:** Australian eSafety Age-Restricted Material Codes apply to pornography websites. 'I am 18' button is insufficient. Do not assume a referring adult platform's gate automatically satisfies independent obligations.
- **Hosting lane:** GitHub Pages is unsuitable for a business-first adult site. Cloudflare Pages/Workers has a documented free usage tier, but provider terms, account eligibility and adult-site permissions need to be verified before production; no new account or payment authorized.
- **Commercial lane:** A direct licensed affiliate/referral model may avoid media ingestion and bandwidth costs, but must still honor link/advertising rules, age assurance and local law. No verified agreement means no outbound affiliate links.
- **Privacy lane:** No visitor IP tracking, no third-party scripts; hosting itself processes connection information. No sensitive age documents stored in the browser.

## Recommended alternative
Build a **non-explicit public information and discovery landing page** at zero cost, with only original text and abstract visual design. For any adult-content destination, require supplier-signed commercial rights plus a jurisdiction-by-jurisdiction compliance determination and suitable age-assurance solution *before* enabling any link or media. Use GitHub as source control. Host commercial production on a provider expressly permitting the business model; test a free tier first without activating paid overages. If all criteria cannot be met at zero ongoing cost, keep the content pathway closed.

## Evidence
- https://www.esafety.gov.au/industry/codes/faq-access-to-online-porn-and-other-adult-content
- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- https://developers.cloudflare.com/pages/platform/limits/
- https://developers.cloudflare.com/pages/functions/pricing/

## No-go conditions
No scraped videos, no unauthorized videos labelled 'downloaded from', no adult preview thumbnails, no embed iframe, no automatic opening of outbound sites, no paid provider, and no false claim of global age-verification compliance.

Next required execution: confirm an allowed commercial host and signed content/affiliate contract, then verify legal age assurance and moderation.