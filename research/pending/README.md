# Research in flight

Drafted output that has not been through the gate yet, parked here so it
survives the thing it was previously parked in.

Working files normally live in the session scratchpad, which is a real
directory under `%TEMP%` and does survive closing the application — but it is
temp, so Windows may clean it up, and a new session gets a new scratchpad path,
so nothing points at the old one automatically. Fifty-three verified units is
too much to leave sitting on that. Anything here is committed and pushed, so it
survives the machine.

Nothing in this directory has been verified or applied. It is drafts.

## dld-assessments

A wave on `dld.assessments`, which was 70 of 210 filled. Interrupted partway.

- `BRIEF.md` — the brief the drafters worked to. Its CONTENT RULE is the
  important part: assessment instruments may be named and linked, never
  reproduced.
- `done-<region>.json` — units drafted and self-verified, not yet gated.
  Africa 12, Asia 14, Americas 15, Europe and Oceania 12. 53 units, 210
  bullets, every bullet carrying an evidence entry.
- `remaining-<region>.json` — the worklist items not yet attempted, in the same
  shape `build-fill-wl.js` emits, so a resumed run can be pointed straight at
  them. Africa 24, Asia 20, Americas 8, Europe and Oceania 26.

To resume: gate the `done-` files first (`terr-verify.js` on a directory
holding only those), apply what passes, then send fresh drafters at the
`remaining-` files.

Delete a subdirectory once its work is applied. This is a staging area, not an
archive — the record of what was done lives in the entries and in git.
