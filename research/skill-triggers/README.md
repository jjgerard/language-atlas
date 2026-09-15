# Does the right skill wake up?

The three skills in `.claude/skills/` all cover this repo, so the risk is not
that none fires but that the wrong one does. This measures it.

    python research/skill-triggers/trigger_test.py <dir-with-.claude/skills>         research/skill-triggers/<skill>.json --expect <skill> --runs 2

Each `<skill>.json` holds 20 realistic things you might say — 10 that should
wake that skill, 10 near-misses that should not. The near-misses are mostly the
OTHER two skills, because that is the boundary that actually needs testing.

Point it at a COPY of the repo's `.claude` in a scratch directory, not at the
repo. It spawns a second Claude per query and kills it at the first tool call,
so it never runs the work itself.

## Two things that cost an afternoon to find

**The skill-creator plugin's own optimiser does not work here.** It installs a
description as a slash command in `.claude/commands/` and waits for that name
to come back. In Claude Code 2.1.247 a command only fires when the user types
`/name`; skills are what get consulted from plain language. Every query scored
zero and the harness read that as "did not trigger". It is also POSIX-only in
two places — `subprocess` cannot exec the extensionless `claude` shim on
Windows, and `select.select` on a pipe raises WinError 10093.

**An unquoted YAML value cannot contain a colon followed by a space.** A
description reading "not only a full pass: dumping the prose" silently killed
the whole `description` field, and the skill fell back to its H1 heading. It
looks fine in the file. The check at the end of a rewrite is to parse the
frontmatter back and confirm the description is still there.

## Where it stood, 2026-09-15

Baseline 47/60. After rewriting the descriptions, 59/60, no mis-routes — no
query that should wake one skill woke a different one.

The two failure shapes both came from descriptions that narrated a whole
workflow and only described doing it. A request for one stage in the middle
("gate the drafts and apply what survives", "run w4apply, dry first") matched
nothing, and so did a question about whether to do the work at all ("is
one-instrument-per-row going to be a problem?"). Saying outright that any
stage counts, and that questions count, fixed eleven of the twelve.

The one still failing is `coding-pass` on "/patterns still says nothing carries
a coding yet for the eal pair, sort that out" — which reads like a bug report
about a web page, and arguably should be left alone rather than chased with
more description.
