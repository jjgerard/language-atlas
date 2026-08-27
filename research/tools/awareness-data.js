// Thordardottir & Topbas (2020), J Communication Disorders 89:106057.
// Table 1 gives the term used with the public in each country's own language;
// the Fig. 3 text groups countries into three awareness bands.
module.exports.TERMS = {
  Austria: ["Sprachstörung", "language impairment", "German"],
  Bulgaria: ["Езиково нарушение", "language impairment", "Bulgarian"],
  Croatia: ["Jezične teškoće u djetinjstvu", "language impairment in childhood", "Croatian"],
  Cyprus: ["Ειδική Γλωσσική Διαταραχή", "specific language impairment", "Greek"],
  Estonia: ["Arenguline keelepuue", "developmental language disorder", "Estonian"],
  Hungary: ["Gyermekkori nyelvi zavar", "childhood language impairment", "Hungarian"],
  Iceland: ["málhömlun / málþroskaröskun barna", "language impairment / disorder of language development in children", "Icelandic"],
  Israel: ["לקות שפה", "language disorder", "Hebrew"],
  Latvia: ["valodas traucējumi bērniem", "childhood language impairment", "Latvian"],
  Lithuania: ["Kalbos sutrikimas (kalbos neišsivystymas)", "language impairment", "Lithuanian"],
  Malta: ["specific language impairment", "the survey ran in English, with no separate translation", "English"],
  Netherlands: ["Taalontwikkelingsstoornis (TOS)", "developmental language disorder", "Dutch"],
  Poland: ["Specyficzne zaburzenie językowe", "specific language impairment", "Polish"],
  Romania: ["Retard de limbaj", "language delay or language retardation", "Romanian"],
  Spain: ["Trastorno del lenguaje infantil", "childhood language impairment", "Spanish"],
  Sweden: ["Språkstörning", "language impairment", "Swedish"],
  "Türkiye": ["Çocukluk çağı dil bozukluğu", "childhood language disorder", "Turkish"],
};

module.exports.BANDS = {
  low: ["Malta", "Latvia", "Estonia", "Cyprus"],
  middle: ["Hungary", "Türkiye", "Poland", "Romania"],
  high: ["Austria", "Bulgaria", "Croatia", "Iceland", "Israel", "Lithuania", "Netherlands", "Spain", "Sweden"],
};

module.exports.BAND_TEXT = {
  low: "the lowest of three bands (under 35% of respondents had heard of the concept)",
  middle: "the middle band (40-55% had heard of it)",
  high: "the highest band (65% or more had heard of it)",
};
