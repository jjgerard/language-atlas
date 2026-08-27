// The question box on /explore, in two steps.
//
//   choose(question, registry)  -> which variables answer it
//   read(question, table)       -> what the finished table says
//
// The split is the whole design, and it is what makes a language model safe to
// put on this site at all.
//
// The atlas's central claim is that every figure traces to a source. A model
// asked to answer a question FROM the entries could produce a number that is
// not in them, phrased exactly like the ones that are, and one fabricated
// figure on a page built on provenance costs more than the feature is worth.
//
// So the model never touches the data and never does arithmetic:
//
//   Step 1 sees the question and the LIST OF VARIABLE NAMES. Nothing else — no
//   entries, no counts. It returns a selection, and that selection is checked
//   against the registry before use; an id that is not in the registry is
//   rejected rather than repaired.
//
//   The browser then computes the table with the same code the dropdowns drive.
//
//   Step 2 sees the question and the FINISHED TABLE — row labels, column
//   labels, integers. It writes prose about figures that were already computed.
//   It cannot invent a count because it is not producing counts, and a reader
//   can check every number it mentions against the table sitting above it.
//
// Without a key the module reports itself unavailable and /explore falls back
// to its deterministic parser, which is why that parser stays.
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5';
const API = 'https://api.anthropic.com/v1/messages';
const KEY = () => process.env.ANTHROPIC_API_KEY || '';

const available = () => Boolean(KEY());

async function call(system, user, maxTokens) {
  const res = await fetch(API, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': KEY(),
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: user }],
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`anthropic ${res.status}: ${detail.slice(0, 300)}`);
  }
  const body = await res.json();
  return (body.content || []).filter(b => b.type === 'text').map(b => b.text).join('').trim();
}

const CHOOSE_SYSTEM = `You choose which two variables of a cross-tabulation answer a question about the Language Atlas, a catalogue of language-education policy covering 336 places on four maps.

You will be given the question and the complete list of variables. Reply with ONLY a JSON object, no prose and no code fence:

{"x": "<variable id for the rows>", "y": "<variable id for the columns, or null>", "scope": "<scope id>", "why": "<one short sentence, max 20 words, saying what the table will show>"}

Rules:
- Every id MUST come from the lists given. Never invent one. If nothing fits, return {"x": null, "y": null, "scope": "all", "why": "<why the atlas cannot answer this>"}.
- Use y: null when the question asks for a single distribution rather than a relation.
- Prefer the most specific variable that fits. A question about one named map's field should use that field's variable, not a general one.
- "scope" narrows which entries are counted. Use "all" unless the question names a region, a single map, or asks only about whole countries.
- PREFER THE SUBSTANTIVE VARIABLES, and among those prefer PROVISION. This atlas is about what school systems do: how many of a country's languages the system engages with, how that compares to how many exist, when the policy governing it last changed, how that differs by region and between the four questions. Reach for those first.
- The variables describing the languages themselves — word order, family, tone, affixation — are real and worth using, but they answer what the languages ARE rather than what schools DO with them. Use them when the reader asks about the languages; do not default to them.
- The variables grouped under "How complete the record is" and "Whether one field is filled" describe the CATALOGUE, not the world, and a table of those answers a question nobody asked. Choose them only when the reader has plainly asked about the state of the record itself.
- Variables about the languages count one row per named language; the rest count entries. Do not pair one of each — they count different populations. If the question needs both, pick the language one and leave y null.
- The atlas does not record what a policy SAYS, only structured facts about it. "Which countries teach in a minority language" cannot be answered from these variables — return x: null and say so, rather than substituting "is the field filled", which means something else entirely.
- "why" describes the table. It must not contain any figure, because you have not seen any.`;

const READ_SYSTEM = `You describe a cross-tabulation from the Language Atlas, a catalogue of language-education policy. You are given the reader's question and the finished table. Every number has already been computed; your job is to say what it shows.

Write 2 to 4 sentences of plain prose. No heading, no bullets, no markdown.

Rules:
- Use ONLY numbers that appear in the table. Never estimate, never total figures that are not there, never bring in outside knowledge about any country.
- Lead with the answer to the question, then the most striking contrast in the table.
- Percentages are fine where the table gives you both parts, and say what they are of.
- Say what the table shows about LANGUAGES AND POLICY. Do not comment on how complete the atlas is, how well sourced it is, or how much is still to do, unless the table is explicitly about that — a reader asking about word order is not asking for a progress report.
- These are counts of what the atlas has recorded, not a census of the world. A place counted as not documented means nobody has written it up here yet — it does not mean the country lacks the policy. Never say a country does not do something; say the atlas does not record it. This distinction matters more than any other.
- Where the table counts languages, it counts languages a school system NAMES — not all the languages spoken in a country, which is a much larger number. Say "the languages these systems name" rather than implying a full inventory.
- If the table is too thin or too lopsided to support a reading, say that instead of manufacturing one.
- Do not flatter the question or the reader, and do not offer follow-ups.`;

/** Step 1: pick the variables. The caller validates the ids. */
async function choose(question, registry, scopes) {
  const vars = registry.map(v => `${v.id}  [${v.group}]  ${v.label}`).join('\n');
  const scopeList = scopes.map(s => `${s.id}  ${s.label}`).join('\n');
  const text = await call(CHOOSE_SYSTEM,
    `QUESTION: ${question}\n\nVARIABLES:\n${vars}\n\nSCOPES:\n${scopeList}`, 400);
  const json = text.replace(/^```(?:json)?\s*|\s*```$/g, '').trim();
  let out;
  try { out = JSON.parse(json); } catch (e) { throw new Error('model did not return JSON: ' + text.slice(0, 160)); }
  return out;
}

/** Step 2: read the computed table. Receives no entries, only the table. */
async function read(question, table) {
  return call(READ_SYSTEM, `QUESTION: ${question}\n\nTABLE:\n${table}`, 500);
}

module.exports = { choose, read, available, MODEL };
