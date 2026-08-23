// Persistence for native domains, by committing data/<domain>.json to GitHub.
//
// Fly gives this app no persistent disk, so the SQLite file is gone the moment
// a machine is rebuilt. Committing the approved set back to the repo is what
// survives that: a fresh instance pulls the latest commit and boots from it
// (see store.js seedIfEmpty). Same approach as both trackers, one file per
// domain so a diff shows which map changed.

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO; // "owner/repo"
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

const configured = !!(GITHUB_TOKEN && GITHUB_REPO);

if (!configured) {
  console.warn('[git] persistence disabled — set GITHUB_TOKEN and GITHUB_REPO to commit approved entries back to the repo.');
}

async function githubRequest(method, url, body) {
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'User-Agent': 'language-atlas',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const err = new Error(`GitHub API ${method} ${url} -> ${res.status}: ${text.slice(0, 300)}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

// getEntriesFn is called fresh on every attempt, not once up front, so a retry
// reflects the store as it is at that moment. A retry that replayed a stale
// snapshot could overwrite a second, faster write with older data.
async function syncDomain(domainId, getEntriesFn, attempt = 1) {
  if (!configured) return;
  const filePath = `data/${domainId}.json`;
  const apiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`;

  let sha;
  try {
    sha = (await githubRequest('GET', `${apiUrl}?ref=${GITHUB_BRANCH}`)).sha;
  } catch {
    sha = undefined; // not on this branch yet — the first sync creates it
  }

  const entries = getEntriesFn();
  const content = Buffer.from(JSON.stringify(entries, null, 1) + '\n', 'utf8').toString('base64');

  try {
    await githubRequest('PUT', apiUrl, {
      message: `Sync ${filePath} (${entries.length} approved ${entries.length === 1 ? 'entry' : 'entries'})`,
      content,
      branch: GITHUB_BRANCH,
      sha,
    });
  } catch (err) {
    // 409/422 here almost always means another write landed between our GET
    // and PUT — retry with a fresh sha and a fresh snapshot rather than
    // silently dropping the change.
    if ((err.status === 409 || err.status === 422) && attempt < 5) {
      await new Promise(r => setTimeout(r, 150 * attempt));
      return syncDomain(domainId, getEntriesFn, attempt + 1);
    }
    console.error(`[git] failed to push ${filePath}:`, err.message);
  }
}

module.exports = { syncDomain, configured };
