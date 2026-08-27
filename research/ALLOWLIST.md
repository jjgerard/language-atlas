# Network access for the research pipeline

The atlas's research tools fetch primary sources. `hist-verify.js` and
`terr-verify.js` exist to fetch the url a drafted row cites and look for the
quote on the page, so with no egress they cannot verify anything and a
research pass cannot run at all: every claim has to trace to a url retrieved
in session, and a search-result snippet is explicitly not evidence.

A Claude Code cloud session runs in an environment whose **Network access**
is one of None, Trusted, Full or Custom. The Default environment is created on
**Trusted**, which is package registries, GitHub and cloud SDKs -- so
legislation.gov.uk, eur-lex, UNESCO and the rest are refused at CONNECT with
a 403. Change it in the environment dialog at claude.ai/code; see
https://code.claude.com/docs/en/cloud-environments#access-levels

## Which level

**Full** is the honest answer for a drafting pass. A pass that documents
places nobody has documented does not know which hosts it will need: the
atlas already cites 642 distinct hosts, and the next country adds more.

**Custom** is enough to run the gate over rows that are already drafted.
`hist-from-parts.js` currently stages 188 rows citing 31 hosts; allowing
just those verifies that batch and nothing else. Paste this into
**Allowed domains**, with 'Also include default list of common package
managers' checked:

```text
axl.cefan.ulaval.ca
belombrepri.edu.sc
cmec.ca
codes.findlaw.com
curriculum.gov.sk.ca
digecur.mineduc.gob.gt
ece.gov.nt.ca
ed.gov
edu.gov.mb.ca
education-profiles.org
education.sa.gov.au
globalnews.ca
globalpartnership.org
gov.nl.ca
indigenouslanguagepolicy.ca
justice.gov.nt.ca
lawphil.net
laws-lois.justice.gc.ca
mehrd.gov.sb
nj.gov
onlinelibrary.wiley.com
open.yukon.ca
paclii.org
paraguay.justia.com
pngpie.org
portal.ct.gov
prsindia.org
rm.coe.int
srca.nm.gov
unicef.org
web.archive.org
```

Regenerate the list after any drafting run:

```
node research/tools/hist-from-parts.js --out /tmp/specs
```

The 642 hosts the entries already cite are in `ALLOWLIST-cited.txt` beside this
file, regenerable from the docLinks on the four stores.
