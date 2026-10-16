#!/usr/bin/env python3
"""Emit data.js with the transcribed VSP code tables."""
import json

d = json.load(open("codes_raw.json"))

with open("data.js", "w") as f:
    f.write("// Transcribed verbatim from VSP Essential Medical Eye Care (Mar 30, 2026),\n")
    f.write("// extracted via pdftotext from Essential_Medical_Eye_Care.pdf\n")
    f.write("const CODE_TABLES = ")
    json.dump(d, f, indent=1)
    f.write(";\n")

print("data.js written,", sum(len(v) for v in d.values()), "total entries")
