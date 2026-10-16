# VSP Diagnostic Testing Reference

A phone-friendly reference for VSP Essential Medical Eye Care diagnostic testing coverage. Type a diagnosis name or ICD-10 code and see which tests apply, how often each is allowed, and what can't be billed together.

## What's inside

12 test categories, each with the exact ICD-10 code ranges from the source document:

| Test | CPT |
|---|---|
| OCT — Retina (incl. OCT angiography) | 92134 / 92137 |
| OCT — Optic Nerve | 92133 |
| OCT — Anterior Segment | 92132 |
| Fundus Photography | 92250 |
| Visual Fields | 92081–92083 |
| Corneal Topography | 92025 |
| Gonioscopy | 92020 |
| Electroretinography (ERG) | 92273 / 92274 |
| Extended Ophthalmoscopy | 92201 / 92202 |
| Corneal Pachymetry | 76514 |
| Remote Retinal Imaging | 92227 |
| Visual Evoked Potential (VEP) | 95930 |

Each result expands to show the allowable frequency, the covered ICD-10 ranges grouped by condition family, same-day billing conflicts, modifiers, special-handling rules, and the source. Diseases are split by severity subtype (e.g. glaucoma suspect vs mild/moderate/severe primary open-angle glaucoma; diabetic retinopathy by type and severity), not broad buckets.

## Source

All coverage rules are transcribed verbatim from **VSP Essential Medical Eye Care (Provider Reference Manual), last updated March 30, 2026**. One quirk is kept as printed: Q15.0 appears in both the 1x and 2x lists for 92133, and H31.101–H31.123 appear in both lists for 92134/92137 — the app resolves those codes to twice per 12 months.

## Disclaimer

Reference tool only. Coverage follows the March 2026 document; client-specific plan details may vary. Always confirm the patient's Essential Medical Eye Care eligibility on the VSP Patient Record Report before providing services.

## Run it

No build step. Open `index.html` in a browser, or serve the folder with any static server:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000.
