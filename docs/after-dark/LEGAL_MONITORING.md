# After Dark - daily legal monitoring & release policy
Last reviewed: 2026-11-14. **This is an operating research plan, not legal certification.**

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
UK Ofcom enforcement update: Ofcom updated its pornography age-assurance enforcement programme on 10 November 2026. It records that, on 9 November 2026, Ofcom issued Sun Social Media Inc. a provisional notice of contravention concerning playvids.com, peekvids.com, pornflip.com and pornoeggs.com. Ofcom's provisional view is that the provider failed to use highly effective age assurance under section 12 of the Online Safety Act 2023 and failed to respond to a statutory information request. This is not yet a final determination, and it does not by itself decide whether After Dark's proposed non-explicit thumbnail directory is a regulated pornography service. Nevertheless, those four services must remain unavailable as partner/referral sources, and all UK or unresolved-location restricted thumbnails and links must remain denied by the server-side gate unless qualified legal review confirms classification, highly effective age assurance, privacy compliance, provider due diligence and auditable records. The current project has no active partner links, real-person thumbnails or age-assurance flow, so there is nothing live to remove and the existing fail-closed gate already satisfies the immediate engineering action. Source: https://www.ofcom.org.uk/online-safety/protecting-children/enforcement-programme-to-protect-children-from-encountering-pornographic-content-through-the-use-of-age-assurance
England and Wales — prohibited depictions: Ministry of Justice guidance published 16 October 2026 confirms that, from 6 November 2026, possession or publication of realistic pornographic images explicitly depicting strangulation or suffocation, specified penetrative sexual activity between people who appear or pretend to have certain familial relationships, or sexual activity where someone appears or pretends to be under 16 is criminal. Current After Dark code contains no real-person creative, restricted media or active affiliate link, so there is nothing live to remove. `access-policy.mjs` must continue to deny every unreviewed creative and each specified category before any future thumbnail or referral is admitted, regardless of licence or partner approval; legal signoff is still required for territorial classification and any statutory defence. Source: https://www.gov.uk/guidance/crime-and-policing-act-2026-offences-relating-to-pornography
United States — Utah: on 30 October 2026, the Utah Department of Commerce announced statewide enforcement from 2 November 2026 of the core age-verification requirement for commercial adult websites under Utah Code 78B-3-1002(1)(a). A preliminary injunction paused a separate location-verification/VPN provision, not the core age gate. Current After Dark code contains no restricted media or active offering, so there is no live Utah content to disable. Before any future restricted creative or affiliate link can be exposed, Utah and unknown locations must remain denied by a server-side gate until qualified legal review classifies this directory and verifies an approved age-assurance method, data minimisation, location handling, records and rollback. Source: https://commerce.utah.gov/2026/10/30/utah-to-begin-enforcing-age-verification-for-adult-websites/
Canada — Bill S-209: Parliament of Canada LEGISinfo records second reading and referral to House committee on 28 October 2026, with the bill now under committee consideration. It is a proposal rather than enacted law, so it does not itself activate a new production control. Canada remains disabled; before any future Canadian release, re-check the final enacted text, commencement, prescribed age-assurance methods and privacy/destruction requirements. Source: https://www.parl.ca/LegisInfo/en/bills?keywords=S-209
Canada — Bill C-34 (proposed Safe Social Media Act): Parliament's current LEGISinfo register records second reading and referral to House committee on 29 October 2026. Government material proposes an 18+ threshold for access to pornographic content on covered services, supported by highly effective, privacy-protective age verification or estimation, with limits on collection, use, retention and disclosure. The proposal principally addresses regulated social media, chatbot and other prescribed online services; whether a static thumbnail affiliate directory would be covered is unresolved. C-34 is not enacted and has no operative commencement date, so it does not activate a new production control. Canada remains disabled; before any future release, verify final scope, enactment, regulations, commencement, privacy/deletion rules and whether the directory is prescribed. Sources: https://www.parl.ca/LegisInfo/en/bill/45-1/C-34 and https://www.canada.ca/en/canadian-heritage/services/safe-social-media-act/fact-sheet.html
None of these sources creates authority to claim worldwide compliance.
