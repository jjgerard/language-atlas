// The vocabulary that decides whether a dated sentence is a policy event, and
// which map it belongs on.
//
// These regexes were written twice over, in hist-from-prose.js (does this line
// name an instrument?) and in histbuild.js (which of the four maps does this
// row concern?). A third reader now needs both — hist-from-parts.js mines the
// EVIDENCE blocks, which histbuild has never read because it starts at DRAFT
// BULLETS — and a third copy is how the accumulated scar tissue starts to
// diverge. Every case recorded in the comments below was paid for by a bad row
// that reached the store, so the copies stay in step by being one copy.
//
// Nothing here is new. hist-from-prose and histbuild were changed only to
// require it, and both were re-run against the live stores to confirm their
// output is unchanged to the byte.

// ---------------------------------------------------------------------------
// Is this line a dated instrument, or just a sentence with a year in it?
// ---------------------------------------------------------------------------

// An instrument, or a dated act of state. Deliberately wide across languages,
// because the entries quote their sources' own words.
const INSTRUMENT = new RegExp([
  "\\bact\\b", "\\blaw\\b", "\\bdecree\\b", "\\border\\b", "\\bordinance\\b", "\\bcircular\\b",
  "\\bregulation", "\\bstatute", "\\bcode\\b", "\\bconstitution", "\\bamendment", "\\bamend",
  "\\bpolicy\\b", "\\bstrategy\\b", "\\bplan\\b", "\\bframework\\b", "\\bcurriculum\\b",
  "\\bratifi", "\\bin force\\b", "\\bcommenc", "\\benact", "\\badopted\\b", "\\bpassed\\b",
  "\\bintroduced\\b", "\\bestablish", "\\brepeal", "\\bsigned\\b", "\\bissued\\b",
  "\\bloi\\b", "\\bley\\b", "\\blov\\b", "\\bgesetz", "\\bbekendtg", "\\binatsisartut",
  "\\blandsverordening", "\\bdeliberation", "\\bd\u00e9lib\u00e9ration", "\\barr\u00eat\u00e9",
  "\\bs\\.\\s?\\d", "\\bart\\.?\\s?\\d", "\\bsection\\s\\d", "\\bchapter\\s\\d",
  "\\bpublic law\\b", "\\bp\\.?l\\.?\\s?\\d", "\\bno\\.\\s?\\d",
].join("|"), "i");

// Instrument nouns the list above lacks. Added after a sweep found real acts
// declined for want of vocabulary: Lei 14.945/2024 (Brazil), Decreto 280
// (Chile), the 1949 Resolution carried by eighteen Indian states.
const EXTRA = new RegExp([
  "\\blei\\b", "\\blegge\\b", "\\bwet\\b", "\\bdecreto\\b", "\\bdekret\\b", "\\bustawa\\b", "\\bzakon\\b", "\\bkanun\\b", "\\bqanun\\b", "\\bproclamation\\b",
  "\\bresolution\\b", "\\bbill\\b", "\\bcharter\\b", "\\bconvention\\b", "\\bprotocol\\b", "\\bdirective\\b", "\\breform\\b", "\\bnotification\\b", "\\bgazette\\b",
  "\\bd\u00e9cret", "\\bc\u00f3digo", "\\bregulamento", "\\breglamento", "\\bverordnung"
].join("|"), "i");

// "programme" is far too common in survey prose to admit on its own -- most
// hits are a programme being DESCRIBED, or described as absent. It counts only
// when a verb of creation sits beside it.
const MADE = "(\\bcreated\\b|\\blaunched\\b|\\bestablished\\b|\\bintroduced\\b|\\badopted\\b|\\bbegan\\b|\\bran from\\b|\\bset up\\b)";
const PROG = "(\\bprogramme\\b|\\bprogram\\b)";
const PROGRAMME = new RegExp(PROG + ".{0,40}" + MADE + "|" + MADE + ".{0,40}" + PROG, "i");

// A line can name an instrument and still be a verdict on it rather than a
// record of it: "the Ministry took a lukewarm approach to its own 1996
// directive" dates nothing that happened in 1996.
const EVALUATIVE = new RegExp(["\\blukewarm\\b", "\\breluctant\\b", "\\bcriticis\\b", "\\bcriticiz\\b", "\\bpraised\\b", "\\bpatchy\\b", "\\buneven\\b", "\\bhalf-hearted\\b", "\\bweakly\\b", "\\bpoorly\\b", "\\bslow to\\b"].join("|"), "i");

// The EXTRA vocabulary is wider, so lines admitted BY IT ONLY face stricter
// rejection: a negative anywhere in the line rather than only at its start, and
// a longer list of measurement words. The INSTRUMENT path is left exactly as it
// was, because its output has already been read and accepted.
const NEG_ANY = new RegExp(["\\bno\\b", "\\bnot\\b", "\\bnone\\b", "\\bnever\\b", "\\bneither\\b", "\\bnothing\\b", "\\bwithout\\b"].join("|"), "i");
const MEASURED = new RegExp(["\\bschools\\b", "\\bpupils\\b", "\\bstudents\\b", "\\bper cent\\b", "\\breached\\b", "\\bprofile\\b", "\\ballocat\\b"].join("|"), "i");

// A year that belongs to a measurement rather than to an instrument.
const FIGURE = /\b(census|survey|cohort|enrolment|enrollment|reported|counted|figures?|data|statistics|as of|by the|intake|cohort)\b/i;

// A line that OPENS on a negative is a finding about what does NOT exist.
// "No newcomer designation exists in Ley 115 de 1994" names a real act, but as
// a timeline row it reads as an event that happened, which is the opposite of
// what the entry says. That absence belongs in the field, not the chronology.
const NEGATIVE = /^(no|not|neither|nothing|none|never|without)\b/i;

// The same finding with a word in front of it. NEGATIVE anchors on the first
// word, which is enough for a bullet, because a researcher writing a bullet
// puts the finding first. It is NOT enough for a sentence lifted out of a
// quote, where the negative routinely sits one clause in: "While there is no
// official definition of special education needs in the 2008 Education Act",
// "There is no definition of inclusive education in the Education Act of 2008".
// Both name a real dated act, and both say the act is SILENT on the question.
// As timeline rows they assert the opposite of what the source says, which is
// the worst thing a row can do -- it is not merely unsupported, it is backwards.
// Found in the first sample of the parts pass: four of twenty-five proposed dld
// rows were absence findings about Caribbean education acts.
const NEGATIVE_HIDDEN = new RegExp(
  "^(while|although|though|whereas|but|however|despite|notwithstanding)\\b[^,;]{0,80}\\b(no|not|none|never|neither|nothing|without)\\b" +
  "|^(there|it|this|that)\\s+(is|are|was|were|has|have|had)\\s+(no|not|neither|nothing|never)\\b" +
  "|\\b(contains?|includes?|makes?|provides?|offers?|names?|mentions?|defines?)\\s+no\\b",
  "i");

// "by 2008" and "as of 2014" describe a state reached, not a dated act, and
// "Vision 2030" names a target. Both would put a year on the timeline that
// nothing actually happened on.
const STATE_NOT_EVENT = /\b(by|as of|until|before|towards?|toward)\s+(1[6-9]\d{2}|20[0-4]\d)\b/i;

// A few lines name a year while saying outright that they are NOT describing
// policy: a practitioner survey, an auditor reading a delisted document. Those
// are evidence about the record, not events in it.
const NOT_POLICY = new RegExp(["perceptions?", "not policy", "never mentions", "delisted", "term count"].join("|"), "i");

// Global, so `lastIndex` advances on any caller that uses .test() or .exec().
// Sharing one instance across three modules makes that state a cross-module
// bug. Callers should use yearsIn(); matchAll() is also safe, because it works
// on an internal clone and leaves this object's lastIndex alone.
const YEAR = /\b(1[6-9]\d{2}|20[0-4]\d)\b/g;
const THIS_YEAR = 2026;

/** The distinct four-digit years named in a piece of text, in order. */
function yearsIn(text) {
  return [...new Set([...String(text).matchAll(YEAR)].map(m => Number(m[1])))];
}

// ---------------------------------------------------------------------------
// Which map does a dated row belong on?
// ---------------------------------------------------------------------------
//
// Route by SUBJECT, read off the row's own words:
//
//   disability, therapy, special education       -> dld
//   arrival, refugees, the language of schooling -> eal
//   foreign and second-language teaching         -> fl
//   minority, regional, national, indigenous     -> indigenous
//   the school system generally                  -> every LANGUAGE map the
//     unit is documented on (see GENERAL_MAPS)
//   anything matching nothing is DROPPED and counted, never guessed at
//
// A row matching more than one subject goes to each: a bilingual education act
// is honestly part of both the majority-language and the regional-language
// story.
//
// Word boundaries here are load-bearing, not decoration. Without \b, "SEN"
// matches "present" and "sense", "cree" matches "decree", and "innu" matches
// "innumerable" — each of which would file a foreign-language row on the
// disorder map with a straight face. An earlier run did exactly that, because
// a heredoc ate the backslashes on the way to disk.
//
// One alternative earned its own note. `second[- ]language` sat on the eal
// pattern and, in Canada, put six FSL funding and curriculum rows on the
// newcomer map: "second-language instruction" there means French, not support
// for a child who arrived without the school's language. It now needs a learner
// word to count as eal, and the instruction sense goes to fl.
const SUBJECT = {
  dld: /disabilit|disabled|special education|special needs|\bSEN\b|inclusive education|speech|therap|logoped|orthophon|fonoaudiolog|impairment|handicap|autis|dyslex|language disorder|rehabilitat|accessib|\bdeaf\b|\bblind\b|sign language|\bCRPD\b|persons with disabilit|Salamanca|resource room|remedial|learning difficult|psycholog|audiolog|inclusi[oó]n|inclusive school|mainstream|developmental disorder|diagnostic|early intervention|educaci[oó]n inclusiva|discapacidad|educaci[oó]n especial/i,
  eal: /refugee|asylum|migrant|immigrant|newcomer|newly arrived|displaced|\bEAL\b|\bESL\b|English learner|English as an additional|second[- ]language (learner|pupil|student|support)|langue seconde d.accueil|reception class|welcome class|accueil|francisation|castellaniz|host language|language support|integration of (pupils|students|children)|home language survey|Equal Educational Opportunities|language minority student|limited English/i,
  fl: /foreign[- ]language|langue étrang|lengua extranjera|world language|English as a foreign|\bCEFR\b|\bCLIL\b|\bDELF\b|Common European Framework|language teaching|teaching of English|English teaching|three[- .]language formula|two[- .]language formula|compulsory (English|French|Spanish|German)|modern language|immersion|core [Ff]rench|intensive [Ff]rench|extended [Ff]rench|language credit|conversational (Spanish|French|English)|(Spanish|French|German|Mandarin) programme|\bFSL\b|French as a second|second[- ]language (instruction|education|programme|program|mandate|credit|teaching)|Second-Language Instruction|langue seconde|French[- ]language (education|programme|program|school)|French first language|fransaskois|franco[- ]canadienne|Charter of the French Language|French Language Services|conseil scolaire/i,
  indigenous: /minorit|indigenous|ind[ií]gena|regional language|national language|mother[- ]tongue|lengua originaria|autochton|tribal|aborigin|first nation|\binuit\b|\binnu\b|m[ée]tis|\bmaori\b|\bsami\b|mi.kmaq|\bcree\b|intercultural|bilingual|charter for regional|vernacular|creole|patois|heritage language|medium of instruction|official medium|official language|eighth schedule|scheduled tribe|linguistic minorit|\bCLM\b|Commissioner for Linguistic|(Urdu|Punjabi|Sindhi|Maithili|Bhojpuri|Sanskrit|Telugu|Tamil|Bengali|Marathi|Gujarati)\s+Academy|language of instruction|inuktut|inuktitut|\bdene\b|treaty education|\bILPA\b|indigenous language|native language/i,
};

// A general instrument: dated, about schooling, but not about any one of the
// four questions in particular.
//
// These fan out to the three LANGUAGE maps only, never to dld. Three of the
// four maps ask a language question and a general education act plausibly bears
// on all three; the disorder map asks a clinical and provision question that a
// generic act rarely speaks to. When one does, SUBJECT.dld catches it directly.
// Without this split, Papua New Guinea's constitutional clause on literacy in
// tok ples was filed on the disorder map, and \bconstitution had matched the
// "Unconstitutional" in Madagascar's 2009 coup.
const GENERAL = /education act|education law|school act|schools act|\bconstitution|basic law|language policy|language.in.education|ley general de educaci|loi.*(éducation|enseignement)|education ordinance|education code|ministry of education|education strategic plan|sector plan|curriculum framework|compulsory education|national curriculum|education policy|education reform/i;

const GENERAL_MAPS = ["fl", "eal", "indigenous"];

/** The maps a dated row concerns: named subjects, ["*"] for a general
 *  instrument, or [] when nothing matched and the row must be dropped. */
function subjectsOf(desc) {
  const hits = Object.keys(SUBJECT).filter(k => SUBJECT[k].test(desc));
  if (hits.length) return hits;
  if (GENERAL.test(desc)) return ["*"];
  return [];
}

/**
 * Does this line record a dated instrument?
 *
 * Returns null when it qualifies, or the name of the rule that declined it, so
 * a caller can count its refusals by reason rather than reporting one opaque
 * total. The order of the tests is the order hist-from-prose applies them and
 * must not be shuffled: the EXTRA path's stricter rejection has to run before
 * the shared FIGURE test, or a line admitted only by EXTRA escapes it.
 */
function declineReason(line) {
  const viaExtra = !INSTRUMENT.test(line);
  if (viaExtra && !(EXTRA.test(line) || PROGRAMME.test(line))) return "noInstrument";
  if (viaExtra && (NEG_ANY.test(line) || MEASURED.test(line) || EVALUATIVE.test(line))) return "figure";
  if (FIGURE.test(line)) return "figure";
  if (NEGATIVE.test(line.trim())) return "negative";
  if (NEGATIVE_HIDDEN.test(line.trim())) return "negativeHidden";
  if (STATE_NOT_EVENT.test(line)) return "state";
  if (NOT_POLICY.test(line)) return "negative";
  return null;
}

module.exports = {
  INSTRUMENT, EXTRA, PROGRAMME, EVALUATIVE, NEG_ANY, MEASURED,
  FIGURE, NEGATIVE, NEGATIVE_HIDDEN, STATE_NOT_EVENT, NOT_POLICY, YEAR, THIS_YEAR,
  SUBJECT, GENERAL, GENERAL_MAPS, subjectsOf, declineReason, yearsIn,
};
