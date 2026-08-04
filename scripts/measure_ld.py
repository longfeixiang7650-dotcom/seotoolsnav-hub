#!/usr/bin/env python3
"""Measure longDescription length per tool. Robust: for each entry id take the longDescription that appears AFTER it."""
import re

with open("app/data/tools.ts") as f:
    content = f.read()

# Locate each tool entry by its own id field. An entry id always appears as
# a line "    id: \"xxx\"," at the start of the object. We find ALL object
# openings "  {" and get the id that immediately follows (1-2 lines after).
# Simpler: use regex to find id and then measure from there, taking the FIRST
# longDescription that appears BEFORE the next occurrence of "id: " (next tool).
ids = list(re.finditer(r'id:\s*"([^"]+)"', content))
mapping = {}  # tid -> max len found in its segment
for i, m in enumerate(ids):
    tid = m.group(1)
    start = m.end()
    end = ids[i+1].start() if i+1 < len(ids) else len(content)
    seg = content[start:end]
    ldm = re.search(r'longDescription:\s*`(.*?)`,\n', seg, re.DOTALL)
    ln = len(ldm.group(1)) if ldm else -1
    mapping[tid] = ln

results = sorted(mapping.items(), key=lambda kv: kv[1])
print(f"Unique tools: {len(results)}")
print("SHORTEST:")
for tid, ln in results[:20]:
    print(f"  {ln}\t{tid}")
