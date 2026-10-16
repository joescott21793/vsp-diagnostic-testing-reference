/* VSP Diagnostic Testing Reference — app logic (pure static, no build step) */

/* ---------- code matching utils ---------- */
function norm(code) {
  return String(code).toUpperCase().replace(/[\s.]/g, "");
}
function cmpStr(a, b) {
  const n = Math.max(a.length, b.length);
  for (let i = 0; i < n; i++) {
    const ca = a[i] || "", cb = b[i] || "";
    if (ca === cb) continue;
    return ca < cb ? -1 : 1;
  }
  return 0;
}
// X in a printed bound is a laterality placeholder: 0 for lower, 9 for upper
function inRange(code, start, end) {
  const c = norm(code);
  const s = norm(start).replace(/X/g, "0");
  const e = norm(end).replace(/X/g, "9");
  return cmpStr(c, s) >= 0 && cmpStr(c, e) <= 0;
}
function rangesOverlap(a1, a2, b1, b2) {
  // overlap iff max(lower bounds) <= min(upper bounds);
  // X (laterality placeholder) -> 0 in lower bounds, 9 in upper bounds
  const lo = (cmpStr(norm(a1).replace(/X/g, "0"), norm(b1).replace(/X/g, "0")) >= 0 ? norm(a1) : norm(b1)).replace(/X/g, "0");
  const hi = (cmpStr(norm(a2).replace(/X/g, "9"), norm(b2).replace(/X/g, "9")) <= 0 ? norm(a2) : norm(b2)).replace(/X/g, "9");
  return cmpStr(lo, hi) <= 0;
}
function prettyCode(code) {
  const c = norm(code);
  if (/^[A-Z]\d{2}/.test(c) && c.length > 3) return c.slice(0,3) + "." + c.slice(3);
  return c;
}
function prettyRange(start, end) {
  return start === end ? prettyCode(start) : prettyCode(start) + " – " + prettyCode(end);
}

/* ---------- severity subtypes ---------- */
/* Each subtype: id, family, name, ranges [[start,end]...], keywords */
const SUBTYPES = [];
function addSub(id, family, name, ranges, keywords) {
  SUBTYPES.push({ id, family, name, ranges, keywords: keywords.map(k => k.toLowerCase()) });
}
// --- Glaucoma ---
addSub("glc-suspect", "Glaucoma", "Glaucoma suspect",
  [["H40.001","H40.009"],["H40.011","H40.019"],["H40.021","H40.029"],["H40.031","H40.039"],["H40.041","H40.049"],["H40.051","H40.059"],["H40.061","H40.063"]],
  ["glaucoma suspect", "suspect", "ocular hypertension"]);
addSub("glc-mild-poag", "Glaucoma", "Mild primary open-angle glaucoma",
  [["H40.1110","H40.1114"]], ["mild poag", "mild primary open angle", "mild open angle"]);
addSub("glc-mod-poag", "Glaucoma", "Moderate primary open-angle glaucoma",
  [["H40.1120","H40.1124"]], ["moderate poag", "moderate primary open angle"]);
addSub("glc-sev-poag", "Glaucoma", "Severe primary open-angle glaucoma",
  [["H40.1130","H40.1134"]], ["severe poag", "severe primary open angle", "advanced poag"]);
addSub("glc-poag-nos", "Glaucoma", "Primary open-angle glaucoma, stage unspecified",
  [["H40.10X0","H40.10X4"],["H40.1100","H40.1104"],["H40.1140","H40.1144"],["H40.1190","H40.1194"]],
  ["poag", "primary open angle", "open angle glaucoma", "chronic open angle"]);
addSub("glc-lowtension", "Glaucoma", "Low-tension (normal-tension) glaucoma",
  [["H40.1210","H40.1294"]], ["low tension", "normal tension", "low-tension"]);
addSub("glc-pigmentary", "Glaucoma", "Pigmentary glaucoma",
  [["H40.1310","H40.1394"]], ["pigmentary", "pigment dispersion"]);
addSub("glc-pseudoexf", "Glaucoma", "Pseudoexfoliation glaucoma",
  [["H40.1410","H40.1494"]], ["pseudoexfoliation", "capsular glaucoma", "exfoliation"]);
addSub("glc-angle", "Glaucoma", "Angle-closure glaucoma",
  [["H40.20X0","H40.20X4"],["H40.211","H40.213"],["H40.2210","H40.2294"],["H40.231","H40.233"],["H40.241","H40.243"]],
  ["angle closure", "angle-closure", "narrow angle", "acute glaucoma"]);
addSub("glc-traumatic", "Glaucoma", "Glaucoma secondary to eye trauma",
  [["H40.30X0","H40.33X4"]], ["traumatic glaucoma", "trauma"]);
addSub("glc-inflammatory", "Glaucoma", "Glaucoma secondary to eye inflammation",
  [["H40.40X0","H40.43X4"]], ["inflammatory glaucoma", "uveitic glaucoma"]);
addSub("glc-other-eye", "Glaucoma", "Glaucoma secondary to other eye disorders",
  [["H40.50X0","H40.53X4"]], ["secondary glaucoma"]);
addSub("glc-drug", "Glaucoma", "Glaucoma secondary to drugs (steroid-induced)",
  [["H40.60X0","H40.63X4"]], ["steroid induced", "steroid-induced", "drug induced", "drug-induced"]);
addSub("glc-neovascular", "Glaucoma", "Neovascular glaucoma",
  [["H40.841","H40.843"]], ["neovascular", "rubeotic"]);
addSub("glc-other", "Glaucoma", "Other / unspecified glaucoma",
  [["H40.811","H40.813"],["H40.821","H40.823"],["H40.831","H40.833"],["H40.89","H40.89"],["H40.9","H40.9"]],
  ["unspecified glaucoma"]);
addSub("glc-congenital", "Glaucoma", "Congenital glaucoma",
  [["Q15.0","Q15.0"]], ["congenital glaucoma", "buphthalmos"]);
addSub("glc-disease", "Glaucoma", "Glaucoma in diseases classified elsewhere",
  [["H42","H42"]], ["glaucoma in diseases classified elsewhere"]);
// --- Diabetic retinopathy ---
const DR_TYPES = [
  ["t1", "Type 1", "E10", ["type 1", "t1dm"]],
  ["t2", "Type 2", "E11", ["type 2", "t2dm"]],
  ["sec", "Secondary / drug-induced", "E08", ["secondary"]],
  ["drug", "Drug-induced", "E09", ["drug induced"]],
  ["other", "Other specified", "E13", ["other specified"]],
];
const DR_SEV = [
  ["unspec", "unspecified", [["311","311"],["319","319"]], ["unspecified"]],
  ["mild", "mild nonproliferative", [["3211","3219"],["3291","3299"]], ["mild", "background", "npdr mild"]],
  ["moderate", "moderate nonproliferative", [["3311","3319"],["3391","3399"]], ["moderate"]],
  ["severe", "severe nonproliferative", [["3411","3419"],["3491","3499"]], ["severe"]],
  ["prolif", "proliferative", [["3511","3599"]], ["proliferative", "pdr"]],
];
DR_TYPES.forEach(([tid, tname, prefix, tkw]) => {
  DR_SEV.forEach(([sid, sname, segs, skw]) => {
    const ranges = segs.map(([a,b]) => [prefix + "." + a, prefix + "." + b]);
    addSub(`dr-${tid}-${sid}`, "Diabetic retinopathy",
      `${sname[0].toUpperCase()+sname.slice(1)} diabetic retinopathy — ${tname} diabetes`,
      ranges, [...skw, ...tkw, "diabetic retinopathy", "dr"]);
  });
});
addSub("dm-no-dr", "Diabetic retinopathy", "Diabetes without retinopathy (screening)",
  [["E10.9","E10.9"],["E11.9","E11.9"],["E13.9","E13.9"],["E08.9","E08.9"],["E09.9","E09.9"],["Z13.1","Z13.1"]],
  ["diabetes no retinopathy", "diabetic screening", "no dr", "screening"]);
// --- Macular degeneration ---
addSub("amd-dry", "Macular degeneration", "Dry (atrophic) macular degeneration",
  [["H35.30","H35.30"],["H35.311","H35.313"],["H35.361","H35.363"]],
  ["dry amd", "dry macular", "atrophic", "drusen"]);
addSub("amd-wet", "Macular degeneration", "Wet (exudative / neovascular) macular degeneration",
  [["H35.321","H35.329"]], ["wet amd", "wet macular", "exudative", "neovascular amd", "cnv"]);
addSub("amd-unspec", "Macular degeneration", "Macular degeneration, unspecified",
  [["H35.30","H35.389"]], ["macular degeneration", "amd", "maculopathy"]);
// --- Retinal vascular occlusion ---
addSub("rvo-artery", "Retinal vascular occlusion", "Retinal artery occlusion",
  [["H34.00","H34.09"]], ["artery occlusion", "crao", "brao", "arterial"]);
addSub("rvo-crvo", "Retinal vascular occlusion", "Central retinal vein occlusion",
  [["H34.811","H34.813"]], ["crvo", "central vein"]);
addSub("rvo-brvo", "Retinal vascular occlusion", "Branch retinal vein occlusion",
  [["H34.831","H34.833"]], ["brvo", "branch vein"]);
addSub("rvo-other", "Retinal vascular occlusion", "Other / unspecified retinal vascular occlusion",
  [["H34.10","H34.19"],["H34.20","H34.29"],["H34.80","H34.80"],["H34.82","H34.82"],["H34.9","H34.9"]],
  ["retinal vein occlusion", "rvo", "vascular occlusion"]);
// --- Retinal detachment ---
addSub("rd-rhegma", "Retinal detachment", "Rhegmatogenous retinal detachment (with break)",
  [["H33.001","H33.059"],["H33.301","H33.323"]], ["rhegmatogenous", "retinal break", "tear", "hole"]);
addSub("rd-serous", "Retinal detachment", "Serous (exudative) retinal detachment",
  [["H33.21","H33.23"]], ["serous", "exudative detachment"]);
addSub("rd-traction", "Retinal detachment", "Traction retinal detachment",
  [["H33.41","H33.43"]], ["traction"]);
addSub("rd-other", "Retinal detachment", "Other / unspecified retinal detachment",
  [["H33.101","H33.193"],["H33.8","H33.8"]], ["retinal detachment", "detachment"]);
// --- Cornea ---
addSub("kc-unspec", "Cornea", "Keratoconus, unspecified",
  [["H18.601","H18.603"]], ["keratoconus"]);
addSub("kc-stable", "Cornea", "Keratoconus, stable",
  [["H18.611","H18.613"]], ["stable keratoconus"]);
addSub("kc-unstable", "Cornea", "Keratoconus, unstable / acute",
  [["H18.621","H18.623"]], ["unstable keratoconus", "acute keratoconus", "hydrops"]);
addSub("corn-dystrophy", "Cornea", "Corneal dystrophy",
  [["H18.501","H18.599"]], ["dystrophy", "fuchs"]);
addSub("corn-edema", "Cornea", "Corneal edema",
  [["H18.20","H18.20"],["H18.211","H18.233"]], ["edema", "swelling"]);
addSub("corn-ulcer", "Cornea", "Corneal ulcer",
  [["H16.001","H16.073"]], ["ulcer", "keratitis"]);
addSub("corn-scar", "Cornea", "Corneal scar / opacity",
  [["H17.00","H17.9"]], ["scar", "opacity", "leukoma"]);
addSub("pterygium", "Cornea", "Pterygium",
  [["H11.001","H11.063"]], ["pterygium"]);
addSub("irreg-astig", "Cornea", "Irregular astigmatism",
  [["H52.211","H52.213"]], ["irregular astigmatism"]);
addSub("bullous", "Cornea", "Bullous keratopathy",
  [["H18.11","H18.13"]], ["bullous"]);
addSub("corn-transplant", "Cornea", "Corneal transplant status",
  [["Z94.7","Z94.7"]], ["transplant", "graft", "pkp", "dmek"]);
// --- Optic nerve / visual pathways ---
addSub("optic-neuritis", "Optic nerve", "Optic neuritis",
  [["H46.0","H46.9"]], ["optic neuritis", "papillitis"]);
addSub("naion", "Optic nerve", "Ischemic optic neuropathy",
  [["H47.011","H47.013"]], ["ischemic optic", "naion", "aion"]);
addSub("papilledema", "Optic nerve", "Papilledema",
  [["H47.10","H47.13"]], ["papilledema", "disc swelling"]);
addSub("optic-atrophy", "Optic nerve", "Optic atrophy",
  [["H47.20","H47.299"]], ["optic atrophy"]);
addSub("vf-defect", "Optic nerve", "Visual field defects",
  [["H53.40","H53.489"]], ["field defect", "hemianopia", "quadrantanopia", "scotoma"]);

const FAMILIES = [...new Set(SUBTYPES.map(s => s.family))];

/* ---------- expand VSP multi-category shorthands into per-category ranges ----------
   "E08.311 - E13.3599" means DR codes for every diabetes type (E08/E09/E10/E11/E13),
   NOT every code lexicographically between (which would wrongly include E10.9).
   "H35.00 - H36" means H35.00-H35.9 plus all of H36. */
(function expandTables() {
  function expand(e) {
    const s = norm(e.start), en = norm(e.end);
    if (s === "E08311" && en === "E133599")
      return ["E08", "E09", "E10", "E11", "E13"].map(t => ({ start: t + ".311", end: t + ".3599", label: e.label }));
    if (s === "H3500" && en === "H36")
      return [{ start: "H35.00", end: "H35.9", label: e.label }, { start: "H36", end: "H36", label: e.label }];
    return [e];
  }
  for (const k of Object.keys(CODE_TABLES)) CODE_TABLES[k] = CODE_TABLES[k].flatMap(expand);
})();

/* ---------- test catalog (VSP EMEC, Mar 2026) ---------- */
const SOURCE = "VSP Essential Medical Eye Care (Provider Reference Manual), last updated Mar 30, 2026";
const TESTS = [
  {
    id: "oct-retina", cpt: "92134 / 92137", name: "OCT — Retina (incl. OCT angiography)",
    keywords: ["oct", "retina", "macula", "oct-a", "octa"],
    tables: [["2x per 12 months", "oct_retina_2x"], ["1x per 12 months", "oct_retina_1x"]],
    freqNote: "1x or 2x per 12 months depending on diagnosis. Mild/background disease (e.g. mild-moderate nonproliferative DR) → once; glaucoma, severe/proliferative DR, retinal detachments, vascular occlusion, macular degeneration → twice.",
    conflicts: ["Cannot be billed same day with extended ophthalmoscopy (92201/92202, initial or subsequent) or fundus photography (92250, including retinal screening)."],
  },
  {
    id: "oct-nerve", cpt: "92133", name: "OCT — Optic Nerve",
    keywords: ["oct", "optic nerve", "rnfl", "nerve fiber"],
    tables: [["2x per 12 months", "oct_nerve_2x"], ["1x per 12 months", "oct_nerve_1x"]],
    freqNote: "1x or 2x per 12 months depending on diagnosis. Glaucoma (including suspect), severe/proliferative DR, retinal vascular occlusion → twice; mild-moderate DR, optic nerve disorders → once.",
    conflicts: ["Cannot be billed same day with extended ophthalmoscopy (92201/92202, initial or subsequent) or fundus photography (92250, including retinal screening)."],
  },
  {
    id: "oct-anterior", cpt: "92132", name: "OCT — Anterior Segment",
    keywords: ["oct", "anterior", "angle", "cornea oct"],
    tables: [["Up to 2x per 12 months", "oct_anterior_2x"]],
    freqNote: "Allowable up to two times per 12-month period for the listed diagnoses (corneal scars/opacities, edema, iris/ciliary body disorders, angle-closure and secondary glaucomas).",
  },
  {
    id: "fundus", cpt: "92250", name: "Fundus Photography",
    keywords: ["fundus", "photo", "photography", "retinal photo"],
    tables: [["2x per 12 months", "fundus_2x"], ["1x per 12 months", null]],
    nullNote: "Once per 12 months for all other appropriate medical diagnoses.",
    freqNote: "Once per 12 months generally; twice per 12 months for diabetic retinopathy, chorioretinal inflammations, choroid disorders, retinal detachments/breaks, retinal vascular occlusion, and other retinal disorders.",
    conflicts: ["Cannot be billed same day with extended ophthalmoscopy (92201/92202, initial or subsequent) or scanning computerized ophthalmic diagnostic imaging of optic nerve or retina (92133, 92134/92137)."],
    specialHandling: [
      "Initial glaucoma care: covered if IOP is clearly documented at ≥21 mmHg, or 15–20 mmHg with clear funduscopic evidence of glaucomatous optic nerve damage (abnormal cup size, rim thinning/notching, progressive change, disc hemorrhage, nerve fiber layer defects). Repeat studies by the same doctor covered at >1-year intervals unless other clinical indications justify sooner.",
      "Rapid progressive diabetic retinopathy: covered only when there is no prior retinal laser surgery and photography is not performed more than once every 6 months.",
      "Not covered to evaluate stable or minimal diabetic retinopathy.",
      "Diabetic retinal screening (baseline to confirm absence of disease): bill 92250 with modifier 52, Z13.5 primary + E10.9/E11.9/E13.9 secondary, once per 12 months, reimbursed $39 (or U&C if less). Medicaid members are not eligible for screening (fundus photography with medical necessity is covered instead).",
    ],
  },
  {
    id: "vf", cpt: "92081–92083", name: "Visual Fields",
    keywords: ["visual field", "fields", "perimetry", "hvF", "vf"],
    tables: [],
    freqNote: "Allowable twice per 12-month period when medical necessity is established. No restricted diagnosis list — bill with an appropriate medical diagnosis code.",
    openList: true,
  },
  {
    id: "topo", cpt: "92025", name: "Corneal Topography",
    keywords: ["topography", "pentacam", "corneal mapping"],
    tables: [["2x per 12 months", "topo_2x"], ["1x per 12 months", "topo_1x"]],
    freqNote: "Once per 12 months for pterygium, irregular astigmatism, congenital corneal anomalies; twice per 12 months for corneal ulcer, scars/opacities, bullous keratopathy, edema, degenerations, dystrophies, keratoconus, deformities, recurrent erosion, burns/corrosion, transplant status.",
  },
  {
    id: "gonio", cpt: "92020", name: "Gonioscopy",
    keywords: ["gonioscopy", "angle", "gonio"],
    tables: [["2x per 12 months", "gonio_2x"], ["1x per 12 months", null]],
    nullNote: "Once per 12 months when medical necessity is established.",
    freqNote: "Once per 12 months when medical necessity is established; twice per 12 months for diabetic retinopathy, retinal vascular occlusion, glaucoma suspect, primary open-angle glaucoma, angle-closure glaucoma, drug-induced glaucoma, neovascular glaucoma, and congenital glaucoma.",
  },
  {
    id: "erg", cpt: "92273 / 92274", name: "Electroretinography (ERG)",
    keywords: ["erg", "electroretinography", "full field", "multifocal"],
    tables: [],
    freqNote: "Allowable once per 12 months as medically necessary. No restricted diagnosis list.",
    modifiers: ["Provide location modifier RT or LT."],
    openList: true,
  },
  {
    id: "ext-ophth", cpt: "92201 / 92202", name: "Extended Ophthalmoscopy",
    keywords: ["extended ophthalmoscopy", "scleral depression", "retinal drawing"],
    tables: [["1x per 12 months", "ext_ophth_1x"]],
    freqNote: "Allowable once per 12-month period for the listed diagnoses.",
    conflicts: ["Do not report 92201/92202 in conjunction with 92250 (fundus photography)."],
    specialHandling: [
      "May not be billed separately during an exam except when all of the following are met: presenting symptoms and/or diagnosis of retinal or vitreoretinal problems support the need; the record shows extended ophthalmoscopy was performed; a dilated retinal evaluation alone does not count unless additional procedures (e.g. contact lens or three-mirror evaluation) were required and are clearly indicated in the chart; the record contains a detailed drawing describing the retina, including defects (drawing available on request, need not accompany the claim).",
    ],
  },
  {
    id: "pachy", cpt: "76514", name: "Corneal Pachymetry",
    keywords: ["pachymetry", "corneal thickness", "pachy"],
    tables: [],
    freqNote: "Allowable once per lifetime per patient. Twice per lifetime with Z98.83 (filtering bleb after glaucoma surgery). Once per 12-month period for keratoconus (H18.601–H18.623).",
    lifetime: [
      { freq: "2x per lifetime", codes: [["Z98.83","Z98.83","Filtering (vitreous) bleb after glaucoma surgery status"]] },
      { freq: "1x per 12 months", codes: [["H18.601","H18.603","Keratoconus, unspecified"],["H18.611","H18.613","Keratoconus, stable"],["H18.621","H18.623","Keratoconus, unstable"]] },
      { freq: "1x per lifetime", codes: [], note: "all other diagnoses" },
    ],
  },
  {
    id: "remote", cpt: "92227", name: "Remote Retinal Imaging",
    keywords: ["remote", "tele", "92227", "retinal imaging remote"],
    tables: [],
    freqNote: "Allowable once per 12-month period (imaging for detection/monitoring of disease with remote clinical staff review and report).",
    conflicts: ["Do not report 92227 with 92002–92014, 92133, 92134, 92250, 92228, or with E/M of the single organ system, the eye (99202–99350)."],
  },
  {
    id: "vep", cpt: "95930", name: "Visual Evoked Potential (VEP)",
    keywords: ["vep", "visual evoked", "checkerboard"],
    tables: [],
    freqNote: "Allowable once per 12-month period. For central nervous system testing except glaucoma.",
    conflicts: ["VSP will not reimburse fundus photography, extended ophthalmoscopy (initial or subsequent), or OCT (optic nerve or retina) on the same day as VEP testing."],
    specialHandling: [
      "Appropriate for: detecting optic neuritis at an early subclinical stage, and evaluating ischemic optic neuropathy, pseudotumor cerebri, toxic/nutritional amblyopias, neoplasms compressing anterior visual pathways, optic nerve injury or atrophy, and hysterical blindness (to rule out).",
      "The record must fully support medical necessity (history, exam, pertinent test results).",
    ],
  },
];

/* ---------- applicability ---------- */
function testFrequency(test, code) {
  const c = norm(code);
  // check 2x lists first: VSP quirk — codes in both 1x and 2x lists resolve to 2x
  const two = checkTwoX(test, c);
  if (two) return two;
  for (const [freqLabel, tableKey] of test.tables) {
    if (!tableKey) return freqLabel; // unrestricted tier (e.g. fundus/gonio 1x)
    const entries = CODE_TABLES[tableKey] || [];
    if (entries.some(e => inRange(c, e.start, e.end))) return freqLabel;
  }
  return null;
}
function checkTwoX(test, c) {
  for (const [freqLabel, tableKey] of test.tables) {
    if (!tableKey || !freqLabel.startsWith("2x")) continue;
    const entries = CODE_TABLES[tableKey] || [];
    if (entries.some(e => inRange(c, e.start, e.end))) return freqLabel;
  }
  return null;
}
function subtypeTestFrequency(test, subtype) {
  // does any of the subtype's ranges overlap the test's lists?
  let hit1x = null;
  for (const [freqLabel, tableKey] of test.tables) {
    if (!tableKey) { if (!hit1x) hit1x = freqLabel; continue; } // unrestricted tier
    const entries = CODE_TABLES[tableKey] || [];
    const hit = entries.some(e => subtype.ranges.some(([s1, s2]) =>
      rangesOverlap(s1, s2, e.start, e.end)));
    if (hit) {
      if (freqLabel.startsWith("2x") || freqLabel.startsWith("Up to 2x")) return freqLabel;
      hit1x = freqLabel;
    }
  }
  return hit1x;
}
function applicableTestsForCode(code) {
  const out = [];
  for (const t of TESTS) {
    if (t.openList) { out.push({ test: t, freq: t.id === "vf" ? "2x per 12 months" : "1x per 12 months", note: "No restricted diagnosis list" }); continue; }
    if (t.lifetime) {
      const f = pachymetryFreq(code);
      if (f) out.push({ test: t, freq: f, note: null });
      continue;
    }
    const f = testFrequency(t, code);
    if (f) out.push({ test: t, freq: f, note: null });
  }
  return out;
}
function pachymetryFreq(code) {
  const c = norm(code);
  if (inRange(c, "Z98.83", "Z98.83")) return "2x per lifetime";
  if (inRange(c, "H18.601", "H18.623")) return "1x per 12 months";
  return "1x per lifetime";
}
function applicableForSubtype(subtype) {
  const out = [];
  for (const t of TESTS) {
    if (t.openList) { out.push({ test: t, freq: t.id === "vf" ? "2x per 12 months" : "1x per 12 months", note: "No restricted diagnosis list" }); continue; }
    if (t.lifetime) {
      const hitLT = subtype.ranges.some(([a,b]) => rangesOverlap(a,b,"Z98.83","Z98.83"));
      const hitKC = subtype.ranges.some(([a,b]) => rangesOverlap(a,b,"H18.601","H18.623"));
      if (hitLT) out.push({ test: t, freq: "2x per lifetime", note: null });
      else if (hitKC) out.push({ test: t, freq: "1x per 12 months", note: null });
      else out.push({ test: t, freq: "1x per lifetime", note: null });
      continue;
    }
    const f = subtypeTestFrequency(t, subtype);
    if (f) out.push({ test: t, freq: f, note: null });
  }
  return out;
}
function subtypesForCode(code) {
  const c = norm(code);
  return SUBTYPES.filter(s => s.ranges.some(([a, b]) => inRange(c, a, b)));
}

/* ---------- family grouping for display ---------- */
function familyOfEntry(e) {
  const s = norm(e.start);
  if (/^H40|^Q150|^H42/.test(s)) return "Glaucoma";
  if (/^E0[89]|^E1[013]/.test(s)) return "Diabetic retinopathy";
  if (/^H34/.test(s)) return "Retinal vascular occlusion";
  if (/^H33/.test(s)) return "Retinal detachment / breaks";
  if (/^H35|^H36/.test(s)) return "Macula / retina";
  if (/^H30|^H31|^H32/.test(s)) return "Choroid / inflammation";
  if (/^H46|^H47|^H53/.test(s)) return "Optic nerve / visual pathways";
  if (/^H1[678]|^H11|^H52|^Q134|^T26|^Z947/.test(s)) return "Cornea / anterior segment";
  if (/^H21|^H22/.test(s)) return "Iris / ciliary body";
  if (/^D31|^C69/.test(s)) return "Neoplasms";
  if (/^S05|^T15/.test(s)) return "Trauma";
  if (/^Z/.test(s)) return "Screening / follow-up";
  if (/^M0[568]|^L93/.test(s)) return "Systemic disease";
  if (/^T37/.test(s)) return "Medication-related";
  return "Other";
}

/* ---------- search ---------- */
function isCodeLike(q) {
  return /^[A-TV-Z]\d/i.test(q.trim());
}
function doSearch(raw) {
  const q = raw.trim();
  if (!q) return { type: "empty" };
  if (isCodeLike(q)) {
    const code = norm(q);
    const subs = subtypesForCode(code);
    return { type: "code", code: prettyCode(code), subtypes: subs,
             results: applicableTestsForCode(code) };
  }
  const ql = q.toLowerCase();
  const subHits = SUBTYPES.filter(s =>
    s.name.toLowerCase().includes(ql) ||
    s.keywords.some(k => ql.includes(k) || k.includes(ql)));
  if (subHits.length === 1) return { type: "subtype", subtype: subHits[0] };
  if (subHits.length > 1) {
    const fams = [...new Set(subHits.map(s => s.family))];
    return { type: "picker", subtypes: subHits, families: fams, query: q };
  }
  return { type: "none", query: q };
}
