"""Which skill fires for a query, measured the way skills actually load.

    python trigger_test.py <skills_dir> <eval.json> [--runs N] [--workers N] [--out f.json]

The skill-creator harness installs a description as a slash command in
.claude/commands/ and checks whether that name comes back. In Claude Code
2.1.247 that never fires from natural language -- commands are for when the
user types /name. Real skills, in .claude/skills/<name>/SKILL.md, do get
consulted proactively. So this installs the real thing and watches for it.

It records WHICH skill fired, not merely whether one did. With three skills
covering one repo, "the wrong one fired" is the failure worth seeing, and a
pass/fail per skill cannot show it.

Each run is killed at the first tool call, so a query costs a few seconds
rather than however long the skill would have taken to actually do the work.
"""
import argparse
import json
import queue
import shutil
import subprocess
import threading
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

CLAUDE = shutil.which("claude") or "claude"


def _pump(stream, q):
    try:
        while True:
            b = stream.read(1)
            if not b:
                break
            q.put(b + (stream.read1(65536) if hasattr(stream, "read1") else b""))
    except Exception:
        pass
    finally:
        q.put(None)


def which_skill(query: str, cwd: Path, model: str, timeout: int = 120):
    """Return the skill name that fired, 'other:<tool>', or None."""
    cmd = [CLAUDE, "-p", query, "--output-format", "stream-json",
           "--verbose", "--include-partial-messages", "--model", model]
    env = None
    import os
    env = {k: v for k, v in os.environ.items() if k != "CLAUDECODE"}
    p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL,
                         cwd=str(cwd), env=env)
    q: queue.Queue = queue.Queue()
    threading.Thread(target=_pump, args=(p.stdout, q), daemon=True).start()
    buf, started, pending, acc = "", time.time(), None, ""
    try:
        while time.time() - started < timeout:
            try:
                chunk = q.get(timeout=1.0)
            except queue.Empty:
                continue
            if chunk is None:
                break
            buf += chunk.decode("utf-8", errors="replace")
            while "\n" in buf:
                line, buf = buf.split("\n", 1)
                line = line.strip()
                if not line:
                    continue
                try:
                    e = json.loads(line)
                except json.JSONDecodeError:
                    continue
                if e.get("type") == "stream_event":
                    se = e.get("event", {})
                    t = se.get("type", "")
                    if t == "content_block_start":
                        cb = se.get("content_block", {})
                        if cb.get("type") == "tool_use":
                            name = cb.get("name", "")
                            if name == "Skill":
                                pending, acc = "Skill", ""
                            else:
                                return "other:" + name
                    elif t == "content_block_delta" and pending:
                        d = se.get("delta", {})
                        if d.get("type") == "input_json_delta":
                            acc += d.get("partial_json", "")
                            if '"skill"' in acc and acc.count('"') >= 4:
                                try:
                                    got = json.loads(acc + '"}' if acc.count('"') % 2 else acc + "}")
                                    if got.get("skill"):
                                        return got["skill"]
                                except Exception:
                                    pass
                    elif t in ("content_block_stop", "message_stop"):
                        if pending:
                            try:
                                return json.loads(acc).get("skill", "Skill:?")
                            except Exception:
                                return "Skill:?"
                        if t == "message_stop":
                            return None
                elif e.get("type") == "result":
                    return None
    finally:
        if p.poll() is None:
            p.kill()
    return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("skills_dir")
    ap.add_argument("eval_json")
    ap.add_argument("--expect", required=True, help="skill name these queries are about")
    ap.add_argument("--runs", type=int, default=1)
    ap.add_argument("--workers", type=int, default=5)
    ap.add_argument("--model", default="claude-opus-5")
    ap.add_argument("--out", default=None)
    a = ap.parse_args()

    cwd = Path(a.skills_dir)
    evals = json.load(open(a.eval_json, encoding="utf-8"))
    jobs = [(i, e, r) for i, e in enumerate(evals) for r in range(a.runs)]

    results = {i: [] for i in range(len(evals))}
    lock = threading.Lock()

    def work(job):
        i, e, _ = job
        got = which_skill(e["query"], cwd, a.model)
        with lock:
            results[i].append(got)
        return i

    with ThreadPoolExecutor(max_workers=a.workers) as ex:
        for _ in ex.map(work, jobs):
            pass

    rows, right, wrong, silent = [], 0, 0, 0
    for i, e in enumerate(evals):
        got = results[i]
        fired_correct = sum(1 for g in got if g == a.expect)
        fired_other = sum(1 for g in got if g and not g.startswith("other:") and g != a.expect)
        rate = fired_correct / len(got)
        ok = (rate >= 0.5) if e["should_trigger"] else (rate < 0.5)
        rows.append({"query": e["query"], "should_trigger": e["should_trigger"],
                     "rate": rate, "got": got, "pass": ok, "wrong_skill": fired_other})
        if ok:
            right += 1
        else:
            wrong += 1
        if e["should_trigger"] and not any(got):
            silent += 1

    out = {"expect": a.expect, "runs_per_query": a.runs,
           "passed": right, "failed": wrong, "total": len(evals),
           "should_trigger_silent": silent, "results": rows}
    print(json.dumps(out, indent=1, ensure_ascii=False))
    if a.out:
        Path(a.out).write_text(json.dumps(out, indent=1, ensure_ascii=False), encoding="utf-8")


if __name__ == "__main__":
    main()
