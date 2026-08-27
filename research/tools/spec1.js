const { write, stats } = require("./gen");
const CLM = "http://web.archive.org/web/20250707083449/https://www.minorityaffairs.gov.in/WriteReadData/RTF1984/9607554317.pdf";

// The 19 India units whose government filed no reply to the CLM's 52nd-Report
// questionnaire. Chapter numbers verified against the report's own paragraph
// "<n>.3 It is a matter of concern that no reply has been received...".
const NOREPLY = "It is a matter of concern that no reply has been received from the State Government to the Questionnaire for this Report of the Commissioner for Linguistic Minorities in India.";
const NOREPLY_UT = "It is a matter of concern that no reply has been received from the UT Administration to the Questionnaire for this Report of the Commissioner for Linguistic Minorities in India.";
const UNASCERTAINED = "The status of implementation of the Constitutional and other Safeguards for the linguistic minorities could not be ascertained in the absence of complete and comprehensive response from the State Government.";
const UNASCERTAINED_UT = UNASCERTAINED.replace(/State Government/g, "UT Administration");
const DEFN = "linguistic minorities at the State level mean any group or groups of people whose mother tongues are different from the principal language of the State";

const term = (extra) => ({
  field: "localTerm",
  quote: DEFN,
  source: CLM,
});

// mediumOfInstruction / taughtAsSubject bullets shared by the non-repliers.
const moiBullets = (who) => ([
  `Nothing reported: ${who} filed no reply to the CLM questionnaire for 2014-15`,
  "CLM could not ascertain implementation of the safeguards for that year",
  "Census language shares are what exists; they are not a record of provision",
]);
const subBullets = (who) => ([
  `Nothing reported: ${who} filed no reply to the CLM questionnaire for 2014-15`,
  "No minority-language subject table appears in the state chapter",
  "Three Language Formula of 1961 is the national frame, not a state return",
]);

const localTermBullets = [
  "System's own word is 'linguistic minorities', after the Commissioner (CLM)",
  "Defined by mother tongue differing from the principal language of the State",
  "At district and taluka level, from the principal language of that unit",
  "The language need not be one of the 22 in the Eighth Schedule",
];

function noReply(slug, unit, langs, who, langNote) {
  const isUT = /UT/.test(who);
  return {
    slug, unit, status: "partial", langs, langNotes: langNote,
    evidence: [
      term(),
      { field: "mediumOfInstruction", quote: isUT ? NOREPLY_UT : NOREPLY, source: CLM },
      { field: "taughtAsSubject", quote: isUT ? UNASCERTAINED_UT : UNASCERTAINED, source: CLM },
    ],
    bullets: {
      localTerm: localTermBullets,
      mediumOfInstruction: moiBullets(who),
      taughtAsSubject: subBullets(who),
    },
  };
}

[
  noReply("IN-AP", "IN|Andhra Pradesh", ["Telugu", "Urdu", "Hindi", "Tamil"], "the state",
    ["CLM 52nd Report ch.32 covers Andhra Pradesh and Telangana jointly; neither replied"]),
  noReply("IN-AS", "IN|Assam", ["Assamese", "Bengali", "Hindi", "Bodo"], "the state"),
  noReply("IN-BR", "IN|Bihar", ["Hindi", "Maithili", "Urdu", "Bengali"], "the state"),
  noReply("IN-GA", "IN|Goa", ["Konkani", "Marathi", "Hindi", "Kannada", "Urdu"], "the state"),
  noReply("IN-HP", "IN|Himachal Pradesh", ["Hindi", "Panjabi", "Nepali", "Kinnauri"], "the state",
    ["WALS spells Punjabi 'Panjabi' (wals pan, iso pan); the name 'Punjabi' has no WALS record"]),
  noReply("IN-JK", "IN|Jammu and Kashmir", ["Kashmiri", "Dogri", "Urdu", "Hindi", "English", "Gojri", "Pahari", "Panjabi", "Ladakhi"], "the state",
    ["Pahari: no WALS record by name or by ISO phr — row kept with an empty wals field",
     "Gojri resolves to wals goj / iso gju"]),
  noReply("IN-JH", "IN|Jharkhand", ["Hindi", "Santali", "Bengali", "Urdu", "Kurukh", "Mundari", "Ho", "Oriya"], "the state",
    ["CLM writes Santhali, Kurukh/Oraon and Odiya; WALS names them Santali, Kurukh and Oriya"]),
  noReply("IN-MP", "IN|Madhya Pradesh", ["Hindi", "Bhili", "Marathi", "Gondi", "Sanskrit"], "the state",
    ["Sanskrit: no WALS record by name and none carrying ISO san — empty wals field, checked twice"]),
  noReply("IN-MH", "IN|Maharashtra", ["Marathi", "Hindi", "Urdu", "Gujarati", "Sindhi"], "the state"),
  noReply("IN-ML", "IN|Meghalaya", ["Khasi", "Garo", "Bengali", "Nepali", "Hindi", "Assamese", "Rabha", "Koch"], "the state",
    ["Rabha (iso rah) and Koch (iso kdq): no WALS record by name or ISO — empty wals fields"]),
  noReply("IN-NL", "IN|Nagaland", ["Ao", "Konyak", "Lotha", "Angami", "English"], "the state",
    ["Konyak (iso nbe): no WALS record; WALS code nbe is Ngombe, an unrelated Bantu language",
     "WALS does carry Naga (Tangkhul), Naga (Mao) and Naga (Zeme), none of them named in the census table used here"]),
  noReply("IN-OD", "IN|Odisha", ["Oriya", "Hindi", "Kui (in India)", "Telugu", "Santali", "Urdu", "Bengali"], "the state",
    ["Kui resolves only via ISO kxu, to the WALS record named 'Kui (in India)'"]),
  noReply("IN-PY", "IN|Puducherry", ["Tamil", "Telugu", "Malayalam", "French", "Bengali", "Hindi", "Kannada"], "the UT",
    ["CLM 52nd Report ch.35: the UT filed no questionnaire return; the chapter rests on a February 2016 visit"]),
  noReply("IN-PB", "IN|Punjab", ["Panjabi", "Hindi", "Urdu", "Bengali", "Nepali"], "the state"),
  noReply("IN-RJ", "IN|Rajasthan", ["Hindi", "Bhili", "Panjabi", "Urdu", "English"], "the state"),
  noReply("IN-SK", "IN|Sikkim", ["Nepali", "Sikkimese", "Hindi", "Lepcha", "Limbu", "Sherpa", "Bantawa"], "the state",
    ["CLM writes Bhutia; WALS carries it as 'Sikkimese' (wals skk, iso sip)",
     "Tamang is named in the census but has NO ROW: WALS carries only 'Tamang (Eastern)' (wals tam, iso taj) and the census names no variety",
     "Rai is a group name in the census; Bantawa (iso bap) has no WALS record"]),
  noReply("IN-UK", "IN|Uttarakhand", ["Hindi", "Urdu", "Panjabi", "Bengali"], "the state"),
  noReply("IN-WB", "IN|West Bengal", ["Bengali", "Nepali"], "the state"),
  noReply("IN-DNHDD", "IN|Dadra and Nagar Haveli and Daman and Diu", ["Hindi", "Gujarati", "Bhili", "Marathi"], "the UT",
    ["CLM 52nd Report ch.25 (DNH) and ch.26 (Daman and Diu): neither administration replied",
     "CLM writes Bhilli/Bhilodi; WALS carries it as 'Bhili' (wals bhi, iso bhb)"]),
].forEach(write);
console.log(JSON.stringify(stats(), null, 1));
