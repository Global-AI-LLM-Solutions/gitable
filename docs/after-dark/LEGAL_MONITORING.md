# After Dark - daily legal monitoring & release policy
Last reviewed: 2026-11-08. **This is an operating research plan, not legal certification.**

## Routine
A recurring After Dark legal watch has been added to the EXISTING Founder Project Status scheduled task to avoid creating an 11th scheduled task. It reviews legal updates daily with an official-source, source-date and jurisdiction-specific evidence requirement. The unrelated Founder Project Status review stays weekly on Mondays. Scheduling is near 09:00 Australia/Sydney. A daily run is not instantaneous, and network coverage is best effort; the automation cannot guarantee detecting every legal change in every country.

## Specialist review perspectives
1. Jurisdiction-specific legal research and applicability to a **thumbnail affiliate/referral directory** (different from video publisher or hosting service).
2. Age-verification efficacy, data minimisation and trusted server-derived visitor location and verification proof.
3. Advertiser-issued thumbnails: copyright, actual performer age at recording, consent and apparent-age screening.
4. Privacy, affiliate disclosures, advertising, complaint escalation and user data processing.
5. Host and partner terms, payment dispute exclusions, official releases and account status.
6. Technical implementation, test evidence, policy rollout, rollback, and fail-closed deny controls.

These are research streams, not legally licensed attorneys or 24/7 autonomous workers.

## Primary-source shortlist to start each check
- **Australia** — eSafety age-restricted material codes: https://www.esafety.gov.au/industry/codes/faq-access-to-online-porn-and-other-adult-content
- **Australia** — legislation: https://www.legislation.gov.au/ and OAIC: https://www.oaic.gov.au/
- **UK** — Ofcom HEAA guidance: https://www.ofcom.org.uk/online-safety/protecting-children/age-assurance
- **UK** — legislation: https://www.legislation.gov.uk/
- **EU/EEA** — European Commission Digital Services Act: https://digital-strategy.ec.europa.eu/en/policies/digital-services-act-package
- **EU/EEA** — EUR-Lex: https://eur-lex.europa.eu/
- **United States** — statutes: https://www.congress.gov/ and https://www.govinfo.gov/; 50-state and local review not automatically established by one federal source.
- **Canada** — Justice laws: https://laws-lois.justice.gc.ca/eng/ and privacy regulator https://www.priv.gc.ca/
- **New Zealand** — official laws https://www.legislation.govt.nz/ and classification: https://www.classificationoffice.govt.nz/
- Additional national/state primary regulators and statutes where current access, relevance and a responsible verified source exist.

Record for each development: authoritative URL, publication date, legal effective date, affected content/traffic type, jurisdiction, exception, technical impact, source uncertainty, and action needed. Cross-check law against regulatory guidance and primary statute. Don't confuse date the page was fetched with a law's effective date.

## Emergency decision workflow
1. If a rule plausibly forbids a card, location or age-assurance method, mark **blocked**. With current project defaults, no adult affiliate content is displayed or accessible.
2. Prepare minimal source-control changes that tighten explicit allowlist rules; test exact source and log commit and verification. Do NOT silently infer world legality.
3. When operations go live in future, disabling content must be an authenticated fail-closed *server-side* deployment with verification and fallback. A browser-side country selector or Javascript hide is not sufficient legal enforcement.
4. Any relaxation enabling new categories, country, promotional creative, personal data transfer, age provider, advertising links or spending requires explicit contractual evidence and responsible legal review before release. Automated research alone must NEVER flip release gates to true.
5. Report actual action status. No observed change = no claim of exhaustive coverage. Inform the Founder of impactful changes.
6. Do not send external email, modify registrar/DNS, accept agreements, or purchase anything without authorization.

## Starting policy
No countries, images of real people, affiliate links, tracking pixels, age-verification flows, video or payment connections are enabled. This static site may be published as a non-explicit demonstration when its host allows the concept and no paid services are involved. GitHub Pages and providers with payment disputes remain excluded.

## Known jurisdiction observations
Australia's designated internet services code took effect 9 March 2026; 'I am 18' self-declaration is inadequate on pornography services. The exact applicability of an affiliate directory with no actual pornography must be separately classified.
UK Ofcom's guidance last updated 29 October 2026 addresses highly effective age assurance for covered services that publish/display pornography; any non-explicit directory must be independently classified before assuming it is within or outside a particular duty.
United States — Utah: on 30 October 2026, the Utah Department of Commerce announced statewide enforcement from 2 November 2026 of the core age-verification requirement for commercial adult websites under Utah Code 78B-3-1002(1)(a). A preliminary injunction paused a separate location-verification/VPN provision, not the core age gate. Current After Dark code contains no restricted media or active offering, so there is no live Utah content to disable. Before any future restricted creative or affiliate link can be exposed, Utah and unknown locations must remain denied by a server-side gate until qualified legal review classifies this directory and verifies an approved age-assurance method, data minimisation, location handling, records and rollback. Source: https://commerce.utah.gov/2026/10/30/utah-to-begin-enforcing-age-verification-for-adult-websites/
Neither source creates authority to claim worldwide compliance.
