/**
 * After Dark / ENQSI-inspired release decision.
 * This module DOES NOT perform age verification. It is a fail-closed decision
 * point for a future authenticated server that can supply independently
 * verified evidence. Never ship content based on browser-controlled claims.
 */
export const RELEASE = Object.freeze({
  hostApproved: false,
  ageProviderApproved: false,
  rightsWorkflowApproved: false,
  moderationWorkflowApproved: false,
  worldLegalCoverageApproved: false,
  monetisationApproved: false,
});
const isoCountry = value => typeof value === "string" && /^[A-Z]{2}$/.test(value);
const validEvidence = (e) => !!e && typeof e === "object" &&
  e.serverVerified === true &&
  e.expiresAt instanceof Date &&
  Number.isFinite(e.expiresAt.getTime()) &&
  e.expiresAt.getTime() > Date.now();
const validUkHeaaReview = (e) => validEvidence(e) &&
  e.country === "GB" &&
  e.approved === true &&
  e.vendorDueDiligenceVerified === true &&
  e.performanceMetricsVerified === true &&
  e.challengeAgeAndLivenessReviewCompleted === true &&
  e.repeatChecksReviewCompleted === true &&
  e.antiCircumventionReviewCompleted === true &&
  e.appealsProcessVerified === true &&
  e.privacyAndDeletionNoticeVerified === true &&
  e.csamRiskAssessmentVerified === true &&
  e.knownCsamHashMatchingControlVerified === true &&
  e.uploaderBanAndEnforcementControlVerified === true &&
  e.automatedDetectionApplicabilityReviewed === true &&
  e.recommendationSafetyControlVerified === true &&
  e.early2027CommencementRechecked === true;
const validAuCodeReview = (e) => validEvidence(e) &&
  e.country === "AU" &&
  e.approved === true &&
  e.serviceClassificationReviewed === true &&
  e.headTermsRiskProfileDocumented === true &&
  e.class1cAndClass2RiskAssessmentCompleted === true &&
  e.regulatorInformationResponseProcessVerified === true;
export function decideMediaAccess(request, release = RELEASE) {
  const deny = reason => ({allow:false, reason});
  if (!request || !isoCountry(request.country)) return deny("country-unverified");
  if (!release || release.hostApproved !== true) return deny("host-not-approved");
  if (release.ageProviderApproved !== true) return deny("age-provider-not-approved");
  if (release.rightsWorkflowApproved !== true || release.moderationWorkflowApproved !== true) return deny("workflow-not-approved");
  if (release.worldLegalCoverageApproved !== true) return deny("jurisdiction-not-approved");
  if (!validEvidence(request.ageAssertion) || request.ageAssertion.over18 !== true || request.ageAssertion.country !== request.country) return deny("age-not-verified");
  // eSafety's published direction dated 6 November 2026 enforced existing
  // risk-profile and risk-assessment duties for a relevant electronic service.
  // Any future AU release must carry current server evidence of classification,
  // documented risk reasoning, completed assessment and regulator response.
  if (request.country === "AU" && !validAuCodeReview(request.auCodeReview)) return deny("au-code-review-incomplete");
  // Ofcom's HEAA guidance update of 16 November 2026 emphasises ongoing
  // effectiveness, provider due diligence, anti-circumvention, appeal and
  // privacy controls. Ofcom's 16 November illegal-content rules also extend
  // known-CSAM detection duties to more services, including pornography sites,
  // subject to parliamentary commencement expected from early 2027. A future
  // GB release must carry current server evidence for every control and scope
  // decision; no browser-supplied assertion can satisfy this gate.
  if (request.country === "GB" && !validUkHeaaReview(request.ukHeaaReview)) return deny("uk-heaa-review-incomplete");
  if (!request.media || request.media.licensed !== true || request.media.allPerformersVerifiedAdultsAtProduction !== true || request.media.consentVerified !== true || request.media.humanModerated !== true || request.media.appearsUnderageOrAgeUncertain !== false || request.media.revoked !== false) return deny("media-not-cleared");
  // England and Wales criminalised possession/publication of specified realistic
  // pornographic depictions from 6 November 2026. Until a verified classifier
  // and qualified legal review exist, these categories are denied everywhere.
  if (request.media.prohibitedCategoryReviewVerified !== true ||
      request.media.depictsStrangulationOrSuffocation !== false ||
      request.media.depictsProhibitedFamilialSexualActivity !== false ||
      request.media.depictsSexualActivityWithOrRoleplayingUnder16 !== false) {
    return deny("media-prohibited-or-unreviewed-category");
  }
  if (request.jurisdictionReview?.country !== request.country || request.jurisdictionReview?.approved !== true || !validEvidence(request.jurisdictionReview)) return deny("jurisdiction-not-cleared");
  return {allow:true,reason:"cleared-by-explicit-release-proofs"};
}
export function decideMonetisation(request, release = RELEASE) {
  if (!release || release.monetisationApproved !== true) return {allow:false, reason:"commercial-release-not-approved"};
  const access = decideMediaAccess(request, release);
  if (!access.allow || request?.partner?.signedAgreement !== true || request.partner.revoked !== false || request.partner.explicitCommercialUseRights !== true || request.partner.privacyReviewApproved !== true) return {allow:false, reason:"commercial-evidence-incomplete"};
  return {allow:true,reason:"approved"};
}
