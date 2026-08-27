// The site nav, shared by every page.
//
// Domains come from /api/atlas rather than being hard-coded per page, so
// adding one to src/domains.js is still the only edit needed.

const esc = s => String(s == null ? '' : s)
  .replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function pillsHTML(domains, currentId) {
  return domains.map(d => d.live
    ? `<a class="pill" href="/${esc(d.id)}"${d.id === currentId ? ' aria-current="true"' : ''} title="${esc(d.blurb)}">${esc(d.label)}</a>`
    : `<span class="pill soon" title="${esc(d.blurb)}">${esc(d.label)}</span>`
  ).join('');
}

/**
 * @param {string|null} currentId  the domain this page is showing, if any
 * @param {Array}       [domains]  pass them in if the page already has them,
 *                                 to avoid a second request for the same data
 */
export async function mountNav(currentId, domains) {
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');

  if (burger && menu) {
    const setOpen = open => {
      menu.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
    };
    burger.addEventListener('click', e => {
      e.stopPropagation();
      setOpen(!menu.classList.contains('open'));
    });
    // A menu that stays open after you have chosen is just in the way.
    menu.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('click', e => {
      if (!menu.contains(e.target) && e.target !== burger) setOpen(false);
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  }

  let list = domains;
  if (!list) {
    try {
      list = (await fetch('/api/atlas').then(r => r.ok ? r.json() : null) || {}).domains;
    } catch { /* leave the nav minimal rather than failing the page */ }
  }
  if (!list || !list.length) return;

  // Both the bar and the menu carry only what you can actually open. The menu
  // used to list the planned domains too, on the reasoning that it had room —
  // but room is not a reason. A "soon" pill in a menu is a dead tap, and the
  // planned maps are already named on the home page, which is where someone
  // deciding whether to come back will look.
  const live = list.filter(d => d.live);
  const bar = document.getElementById('pills');
  if (bar) bar.innerHTML = pillsHTML(live, currentId);
  const menu2 = document.getElementById('menupills');
  if (menu2) menu2.innerHTML = pillsHTML(live, currentId);

  fitBar();
  addEventListener('resize', fitBar);
  // Web fonts land after first paint and change how wide the pills are, so a
  // measurement taken before they load can be wrong in either direction.
  if (document.fonts) document.fonts.ready.then(fitBar);
}

/**
 * Collapse the bar into the menu exactly when its contents stop fitting.
 * A fixed breakpoint would need re-tuning every time a domain is added — and
 * the labels are deliberately spelled out, so they are long.
 */
function fitBar() {
  const bar = document.querySelector('.sitebar:not(.nomenu)');
  if (!bar) return;
  // Three stages, each tried before the next, because going straight to the
  // burger threw away the pills and the page links together over an overflow
  // that was mostly search box and padding.
  //
  //   tight    narrower search, tighter padding — nothing disappears
  //   nolinks  burger appears and takes Patterns/Sources/About; pills stay
  //   compact  the pills go too
  //
  // The order is what a reader loses least by losing. The pills are the map's
  // own navigation; the page links are destinations they can go looking for.
  bar.classList.remove('compact', 'tight', 'nolinks');
  // The bar overflows rather than shrinking because the pills are nowrap and
  // min-width: max-content — see shared.css.
  const over = () => bar.scrollWidth > bar.clientWidth + 1;
  if (!over()) return;
  bar.classList.add('tight');
  if (!over()) return;
  bar.classList.add('nolinks');
  if (over()) bar.classList.add('compact');
}
