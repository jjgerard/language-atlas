// Hand attribution of all 185 policyHistory rows on the 46 dld systems that
// carry BOTH a threshold_basis and a dischargeCriteria coding.
//
// Every row was read. The tier-1/2/3 machine proposals were used only as a
// prompt: on this slice tier 3 was wrong more often than right (it filed
// Cyprus's "moves reassessment to every two years" under workforce and
// "Constitution of 1995 amended" under funding), so none of it was accepted
// unread.
//
// Lists are in the entry's own row order. `system-wide` means checked and no
// field is the right answer; `not determined` means the row does not say.
module.exports = {
"AL|Albania": [["legalEntitlement","workforce"],["serviceModel"]],
"AR|Argentina": [["serviceModel"],["legalEntitlement"],["terminology","legalEntitlement"]],
"AT|Austria": [["serviceModel"],["identificationCriteria"]],
"BG|Bulgaria": [["workforce","serviceModel"],["serviceModel"],["serviceModel"]],
"CL|Chile": [["legalEntitlement"],["identificationCriteria","funding"],["serviceModel"],["system-wide"],["system-wide"]],
"CO|Colombia": [["legalEntitlement"],["legalEntitlement"],["legalEntitlement","serviceModel","dischargeCriteria"]],
"CU|Cuba": [["outcomesEvidence"],["system-wide"],["serviceModel"],["serviceModel"],["dischargeCriteria"],["system-wide"],["system-wide"],["system-wide"],["system-wide"],["legalEntitlement"],["outcomesEvidence"]],
"CY|Cyprus": [["legalEntitlement","identificationCriteria"],["dischargeCriteria","funding"],["identificationCriteria"],["workforce"],["dischargeCriteria"]],
"CZ|Czechia": [["legalEntitlement"],["serviceModel"],["referralPathway","serviceModel"],["legalEntitlement","serviceModel"],["serviceModel","dischargeCriteria"]],
// Dominica has an identificationCriteria coding with no threshold_basis, so a
// first cut that filtered on that column missed it; hist-attr-build.js filters
// on the coding EXISTING, which is the right test and caught it.
"DM|Dominica": [["legalEntitlement"],["system-wide"],["terminology","identificationCriteria"],["system-wide"],["not determined"],["referralPathway","identificationCriteria"],["system-wide"],["system-wide"]],
// Also missed by the threshold_basis filter. Row 11 is a real discharge hit:
// Ordenanza 04-2018 "requires periodic evaluation for transition".
"DO|Dominican Republic": [["serviceModel","terminology"],["serviceModel"],["system-wide"],["funding"],["terminology","identificationCriteria"],["system-wide"],["system-wide"],["serviceModel","workforce"],["system-wide"],["legalEntitlement"],["terminology","dischargeCriteria"],["system-wide"],["system-wide"],["serviceModel"]],
"DK|Denmark": [["identificationCriteria","serviceModel"],["referralPathway","serviceModel"],["legalEntitlement"]],
"EE|Estonia": [["legalEntitlement","workforce"],["serviceModel"],["legalEntitlement","funding"],["referralPathway","identificationCriteria"]],
"ES|Spain": [["serviceModel"],["workforce"],["terminology","legalEntitlement"],["identificationCriteria"],["legalEntitlement"],["terminology"]],
"FI|Finland": [["legalEntitlement"],["serviceModel"],["serviceModel"]],
"FM|Micronesia": [["legalEntitlement"],["serviceModel","legalEntitlement"],["system-wide"],["system-wide"],["system-wide"],["system-wide"],["system-wide"],["system-wide"],["terminology","identificationCriteria"],["system-wide"]],
"FR|France": [["serviceModel"],["serviceModel"],["assessments","identificationCriteria"]],
"GE|Georgia": [["legalEntitlement"],["legalEntitlement","multilingualProvision"],["not determined"],["serviceModel"],["system-wide"],["system-wide"],["not determined"]],
"GG|Guernsey": [["serviceModel","system-wide"]],
"GL|Greenland": [["not determined"],["legalEntitlement","serviceModel"],["referralPathway","identificationCriteria","dischargeCriteria"],["identificationCriteria"],["legalEntitlement"]],
"GR|Greece": [["legalEntitlement","terminology"],["identificationCriteria","serviceModel"],["identificationCriteria","serviceModel"]],
"HR|Croatia": [["legalEntitlement"],["terminology","serviceModel"]],
"HU|Hungary": [["terminology","identificationCriteria"],["serviceModel","identificationCriteria"]],
"IE|Ireland": [["legalEntitlement"],["identificationCriteria","serviceModel"],["identificationCriteria"],["terminology","identificationCriteria"]],
"IS|Iceland": [["legalEntitlement"],["serviceModel","identificationCriteria"]],
"IT|Italy": [["serviceModel","workforce"],["terminology"],["legalEntitlement"]],
"KR|South Korea": [["legalEntitlement"],["legalEntitlement"]],
"LC|Saint Lucia": [["legalEntitlement"],["terminology","identificationCriteria"],["identificationCriteria"],["not determined"],["system-wide"],["not determined"],["assessments","serviceModel"],["serviceModel"]],
"LT|Lithuania": [["serviceModel"],["serviceModel","terminology"],["serviceModel"],["terminology","identificationCriteria"],["identificationCriteria"]],
"LV|Latvia": [["legalEntitlement"],["serviceModel"],["identificationCriteria","referralPathway"]],
"NL|Netherlands": [["multilingualProvision","identificationCriteria"],["identificationCriteria"],["assessments","serviceModel"]],
"NO|Norway": [["legalEntitlement","identificationCriteria"],["legalEntitlement"]],
"NZ|New Zealand": [["not determined"],["system-wide"],["system-wide"],["system-wide"],["system-wide"],["legalEntitlement"]],
"PL|Poland": [["legalEntitlement","serviceModel"],["serviceModel"],["serviceModel"],["identificationCriteria","referralPathway"]],
"PT|Portugal": [["serviceModel"],["legalEntitlement","serviceModel"],["not determined"]],
"RO|Romania": [["legalEntitlement","serviceModel","workforce"],["serviceModel"]],
"RS|Serbia": [["legalEntitlement"],["legalEntitlement"],["identificationCriteria","dischargeCriteria"]],
"RU|Russia": [["serviceModel"]],
"SE|Sweden": [["legalEntitlement","identificationCriteria"]],
"SI|Slovenia": [["terminology"],["referralPathway","identificationCriteria"],["terminology"]],
"SK|Slovakia": [["terminology","legalEntitlement"],["serviceModel"],["serviceModel","referralPathway"],["legalEntitlement","serviceModel"]],
"TR|Türkiye": [["legalEntitlement"],["system-wide"],["serviceModel"]],
"TW|Taiwan": [["legalEntitlement"],["not determined"],["not determined"],["not determined"],["identificationCriteria"],["identificationCriteria"]],
"UA|Ukraine": [["serviceModel"],["identificationCriteria","serviceModel"],["serviceModel","identificationCriteria","dischargeCriteria"],["referralPathway","serviceModel"],["serviceModel"],["serviceModel"]],
"US|United States": [["terminology"],["system-wide"],["legalEntitlement"],["serviceModel"],["serviceModel"],["system-wide"],["terminology"],["terminology"],["terminology"],["legalEntitlement"],["system-wide"],["terminology"]],
"VC|Saint Vincent and the Grenadines": [["legalEntitlement"],["terminology","identificationCriteria"],["identificationCriteria","outcomesEvidence"],["system-wide"],["workforce","outcomesEvidence"],["serviceModel"]],
"VN|Vietnam": [["terminology"]],
"ZW|Zimbabwe": [["legalEntitlement"],["serviceModel","dischargeCriteria"],["legalEntitlement"],["system-wide"]],
};
