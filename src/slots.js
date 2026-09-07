// The questions inside a field, and which one a bullet answers.
//
//     const { slotsOf, slotCount } = require('./slots');
//     slotsOf(domain, 'newcomerCriteria')
//       -> ['who counts as a newcomer or second-language pupil',
//           'on what evidence',
//           'at what point it is decided',
//           'who decides']
//
// Every text field's hint already lists its questions, separated by "·", in the
// order a drafter must answer them. All 39 of them carry exactly four. That
// list is not guidance sitting beside the schema -- it IS the schema, and slot
// one of newcomerCriteria is the variable "how does this system define a
// newcomer", asked in the same words of all 353 units.
//
// What the hint cannot do is say which slot a given BULLET answers, because the
// convention is "in this order, omitting any you cannot answer". Omission
// breaks the mapping: across 7,062 filled fields only 38% carry as many bullets
// as slots, so in the other 62% the third bullet is not the third question and
// position tells you nothing. Recovering that later means re-reading the prose.
// Recording it at drafting time costs one integer per bullet, from someone who
// composed the bullet slot by slot in the first place.
//
// Hence entry.slots -- { fieldKey: [1, 3, 4] } -- one number per bullet, in
// bullet order. Stored beside the prose the way notEstablished is, never inside
// it: a marker in the text would reach the panel, the search index and every
// quote check.
const SEP = '·';

/** The slot questions for a field, in order. Empty if the field has no hint. */
function slotsOf(domain, fieldKey) {
  const f = (domain && domain.fields || []).find(x => x[0] === fieldKey);
  if (!f || f[2] !== 'text') return [];
  const hint = String(f[3] || '');
  if (!hint.includes(SEP)) return [];
  // The hint opens with an instruction before the first question -- "In this
  // order, omitting any you cannot answer: who counts as ..." -- so the lead-in
  // is dropped from slot one rather than becoming part of the question.
  const parts = hint.split(SEP).map(s => s.trim()).filter(Boolean);
  const colon = parts[0].lastIndexOf(':');
  if (colon >= 0) parts[0] = parts[0].slice(colon + 1).trim();
  return parts.map(s => s.replace(/\.$/, '').trim());
}

/** How many questions a field asks. 0 when it asks none in a parseable form. */
const slotCount = (domain, fieldKey) => slotsOf(domain, fieldKey).length;

/**
 * Is this a usable slot list for a field with `bulletCount` bullets?
 *
 * One number per bullet, each within range, and non-decreasing -- the order is
 * the whole convention. Non-decreasing rather than strictly increasing because
 * a field may spend two bullets on one question, which is allowed and common;
 * what it may not do is answer question four before question two.
 */
function validSlots(list, bulletCount, count) {
  if (!Array.isArray(list) || !count) return false;
  if (list.length !== bulletCount) return false;
  let prev = 0;
  for (const raw of list) {
    const n = Number(raw);
    if (!Number.isInteger(n) || n < 1 || n > count) return false;
    if (n < prev) return false;
    prev = n;
  }
  return true;
}

/**
 * Put bullets into slot order, when they arrived out of it.
 *
 * A slot list that goes backwards -- [1, 3, 2] -- used to be REFUSED: the gate
 * dropped the field and store.js dropped the tagging silently. But the slot
 * numbers are not merely a claim about the order, they ARE the order: a bullet
 * tagged 2 belongs between the ones tagged 1 and 3, and where to put it is
 * fully determined by the data. Refusing threw away a correct answer for
 * presenting it in the wrong sequence, and it is what stopped a drafter
 * appending a slot-3 finding to a field already answering 1, 2 and 4.
 *
 * The sort is STABLE, so two bullets sharing a slot keep the order the drafter
 * chose between them.
 *
 * It refuses in one case, and the case is real. A bullet whose sense depends on
 * the one before it -- "Under it a speech class needed a diagnosis", "And to
 * providing free public special education" -- stops meaning anything when its
 * antecedent moves. One re-slotting pass hit exactly that and had to reword the
 * bullet by hand. So if any bullet that WOULD move opens with a pronoun or a
 * conjunction, the reordering is refused and the caller decides.
 *
 * Returns { bullets, slots, moved } or null when it will not reorder.
 */
// The referring word is not always the first one: "Under IT a speech class
// needed a diagnosis" leans on the previous bullet from second position. So the
// test reads the opening few words rather than only the first.
const LEANS = /\b(it|its|they|them|their|this|that|these|those|such|he|she|his|her|the same)\b/i;
const OPENS_WITH_CONJUNCTION = /^(and|or|but|also|plus|both|either|neither|so are|so is)\b/i;
const leansOnPrevious = b => {
  const t = String(b).trim();
  if (OPENS_WITH_CONJUNCTION.test(t)) return true;
  return LEANS.test(t.split(/\s+/).slice(0, 4).join(" "));
};

function orderBySlot(bullets, slots) {
  if (!Array.isArray(bullets) || !Array.isArray(slots)) return null;
  if (bullets.length !== slots.length || !bullets.length) return null;
  const idx = bullets.map((b, i) => i);
  // Stable: Array.prototype.sort is stable in Node, and the index tie-break
  // makes it so regardless.
  idx.sort((a, b) => (Number(slots[a]) - Number(slots[b])) || (a - b));
  const moved = idx.some((from, to) => from !== to);
  if (!moved) return { bullets, slots, moved: false };
  for (let to = 0; to < idx.length; to++) {
    const from = idx[to];
    if (from !== to && leansOnPrevious(bullets[from])) return null;
  }
  return { bullets: idx.map(i => bullets[i]), slots: idx.map(i => Number(slots[i])), moved: true };
}

module.exports = { slotsOf, slotCount, validSlots, orderBySlot };
