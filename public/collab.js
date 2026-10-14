// Helpers shared by the three collaboration pages.

export const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const $ = id => document.getElementById(id);

export async function getJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url}: ${res.status}`);
  return res.json();
}

/** Vocabulary, researchers and areas, fetched once per page. */
export async function loadBase() {
  const [meta, rdoc] = await Promise.all([getJSON('/api/collaborate/meta'), getJSON('/collaborate/researchers.json')]);
  return { meta, rdoc, areaLabel: meta.areas };
}

export const chips = (keys, labels, cls = '', href) => (keys && keys.length)
  ? `<ul class="chips">${keys.map(k => {
      const label = esc(labels[k] || k);
      return href ? `<li><a class="chip ${cls}" href="${esc(href(k))}">${label}</a></li>` : `<li class="chip ${cls}">${label}</li>`;
    }).join('')}</ul>`
  : '';

/** The organisation line on a project. A listed one links to its row in the deep dive. */
export function orgLine(org) {
  if (!org || org.kind === 'none') return '<span class="miss">Not tied to an organisation</span>';
  if (org.kind === 'listed') {
    return `<a href="/sector/ni-children?q=${encodeURIComponent(org.name)}#orgs">${esc(org.name)}</a>`
      + `<span class="flag" title="This organisation is in the Northern Ireland children's-sector deep dive, with the documents that put it there">in the deep dive</span>`
      + (org.council ? ` · ${esc(org.council)}` : '');
  }
  return `${esc(org.name)}<span class="flag warn" title="Not in the deep dive. These details are as the poster gave them and have not been checked against a source.">not in the deep dive yet</span>`
    + (org.town ? ` · ${esc(org.town)}` : '') + (org.council ? ` · ${esc(org.council)}` : '');
}

export const fmtDate = s => (s ? new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '');
