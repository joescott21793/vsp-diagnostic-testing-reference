#!/usr/bin/env python3
"""Parse the extracted VSP Essential Medical Eye Care text into structured JSON.

IMPORTANT: split on '\\n' only so line numbers match grep/sed (pdftotext
embeds form-feed page breaks that str.splitlines() would treat as lines).
"""
import json
import re

SRC = "emec.txt"
with open(SRC) as f:
    lines = f.read().split("\n")

# sections: name -> (start_line_1indexed, end_line_1indexed), grep-based numbers
SECTIONS = {
    "oct_anterior_2x": (413, 443),      # 92132
    "oct_nerve_1x": (449, 509),         # 92133
    "oct_nerve_2x": (511, 579),
    "oct_retina_1x": (589, 662),        # 92134/92137
    "oct_retina_2x": (664, 735),
    "topo_1x": (347, 349),              # 92025
    "topo_2x": (351, 366),
    "gonio_2x": (335, 342),             # 92020
    "ext_ophth_1x": (748, 828),         # 92201/92202
    "fundus_2x": (847, 857),            # 92250
}

RANGE_RE = re.compile(
    r"^\s*([A-Z]\d[\dA-Z.]*?)\s*[-\u2013\u2014]\s*([A-Z]\d[\dA-Z.]*?)\s+(.+?)\s*$"
)
SINGLE_RE = re.compile(r"^\s*([A-Z]\d[\dA-Z.]*?)\s+([A-Za-z(].+?)\s*$")
STOP_RES = [
    re.compile(r"^\s*Cannot be billed"),
    re.compile(r"^\s*Do not report"),
    re.compile(r"^\s*Allowable "),
    re.compile(r"^\s*\d{5}[\s/]"),
    re.compile(r"^\s*\u2022\s*Allowable"),
]
CODE_LIKE = re.compile(r"[A-Z]\d[\dA-Z.]{1,7}")

def parse_section(start, end):
    entries = []
    for i in range(start - 1, end):
        line = lines[i]
        if not line.strip():
            continue
        if any(rx.match(line) for rx in STOP_RES):
            continue
        m = RANGE_RE.match(line)
        if m:
            entries.append({
                "start": m.group(1).strip(),
                "end": m.group(2).strip(),
                "label": re.sub(r"\s+", " ", m.group(3).strip()),
            })
            continue
        m = SINGLE_RE.match(line)
        if m and CODE_LIKE.fullmatch(m.group(1).strip()):
            entries.append({
                "start": m.group(1).strip(),
                "end": m.group(1).strip(),
                "label": re.sub(r"\s+", " ", m.group(2).strip()),
            })
            continue
        # continuation of previous entry's description (wrapped line)
        if entries and re.match(r"^\s+[a-z]", line):
            entries[-1]["label"] += " " + re.sub(r"\s+", " ", line.strip())
            continue
        print(f"UNPARSED line {i+1}: {line[:90]}")
    return entries

out = {name: parse_section(s, e) for name, (s, e) in SECTIONS.items()}

with open("codes_raw.json", "w") as f:
    json.dump(out, f, indent=1)

for name, entries in out.items():
    print(f"{name}: {len(entries)} entries")
