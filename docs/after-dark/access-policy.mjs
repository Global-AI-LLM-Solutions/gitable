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
export function decideMediaAccess(request, release = RELEASE) {
  const deny = reason => ({allow:false, reason});
  if (!request || !isoCountry(request.country)) return deny("country-unverified");
  if (!release || release.hostApproved !== true) return deny("host-not-approved");
  if (release.ageProviderApproved !== true) return deny("age-provider-not-approved");
  if (release.rightsWorkflowApproved !== true || release.moderationWorkflowApproved !== true) return deny("workflow-not-approved");
  if (release.worldLegalCoverageApproved !== true) return deny("jurisdiction-not-approved");
  if (!validEvidence(request.ageAssertion) || request.ageAssertion.over18 !== true || request.ageAssertion.country !== request.country) return deny("age-not-verified");
  if (!request.media || request.media.licensed !== true || request.media.allPerformersVerifiedAdultsAtProduction !== true || request.media.consentVerified !== true || request.media.humanModerated !== true || request.media.appearsUnderageOrAgeUncertain !== false || request.media.revoked !== false) return deny("media-not-cleared");
  if (request.jurisdictionReview?.country !== request.country || request.jurisdictionReview?.approved !== true || !validEvidence(request.jurisdictionReview)) return deny("jurisdiction-not-cleared");
  return {allow:true,reason:"cleared-by-explicit-release-proofs"};
}
export function decideMonetisation(request, release = RELEASE) {
  if (!release || release.monetisationApproved !== true) return {allow:false, reason:"commercial-release-not-approved"};
  const access = decideMediaAccess(request, release);
  if (!access.allow || request?.partner?.signedAgreement !== true || request.partner.revoked !== false || request.partner.explicitCommercialUseRights !== true || request.partner.privacyReviewApproved !== true) return {allow:false, reason:"commercial-evidence-incomplete"};
  return {allow:true,reason:"approved"};
}
