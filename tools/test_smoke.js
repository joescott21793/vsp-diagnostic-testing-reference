// Node smoke test for the VSP reference matching engine.
// Run: node test_smoke.js   (loads data.js + app.js, no DOM needed)
const fs = require("fs");
const vm = require("vm");

const ctx = {};
vm.createContext(ctx);
for (const f of ["data.js", "app.js"]) {
  vm.runInContext(fs.readFileSync(require("path").join(__dirname, "..", f), "utf8"), ctx, { filename: f });
}
const {
  norm, inRange, subtypesForCode, applicableTestsForCode,
  testFrequency, doSearch, pachymetryFreq, applicableForSubtype,
} = ctx;

let pass = 0, fail = 0;
function eq(name, actual, expected) {
  const a = JSON.stringify(actual), e = JSON.stringify(expected);
  if (a === e) { pass++; console.log("PASS", name); }
  else { fail++; console.log("FAIL", name, "\n  actual:  ", a, "\n  expected:", e); }
}
function freqFor(code, testId) {
  const r = applicableTestsForCode(code).find(x => x.test.id === testId);
  return r ? r.freq : null;
}

// 1. H40.003 glaucoma suspect -> OCT 2x
eq("H40.003 subtype", subtypesForCode("H40.003").map(s => s.id), ["glc-suspect"]);
eq("H40.003 oct-nerve", freqFor("H40.003", "oct-nerve"), "2x per 12 months");
eq("H40.003 oct-retina", freqFor("H40.003", "oct-retina"), "2x per 12 months");
eq("H40.003 gonio", freqFor("H40.003", "gonio"), "2x per 12 months");

// 2. H40.1111 mild POAG
eq("H40.1111 subtype", subtypesForCode("H40.1111").map(s => s.id), ["glc-mild-poag"]);
eq("H40.1111 oct-nerve", freqFor("H40.1111", "oct-nerve"), "2x per 12 months");

// 3. E11.3211 mild NPDR w/ ME -> OCT 1x
eq("E11.3211 subtype", subtypesForCode("E11.3211").map(s => s.id), ["dr-t2-mild"]);
eq("E11.3211 oct-retina", freqFor("E11.3211", "oct-retina"), "1x per 12 months");
eq("E11.3211 oct-nerve", freqFor("E11.3211", "oct-nerve"), "1x per 12 months");

// 4. E11.3411 severe NPDR -> OCT 2x
eq("E11.3411 oct-retina", freqFor("E11.3411", "oct-retina"), "2x per 12 months");

// 5. H34.8110 RVO -> OCT 2x
eq("H34.8110 subtype family", subtypesForCode("H34.8110").map(s => s.id), ["rvo-crvo"]);
eq("H34.8110 oct-retina", freqFor("H34.8110", "oct-retina"), "2x per 12 months");

// 6. H18.611 keratoconus -> topo 2x, pachymetry 1x/12mo
eq("H18.611 topo", freqFor("H18.611", "topo"), "2x per 12 months");
eq("H18.611 pachy", pachymetryFreq("H18.611"), "1x per 12 months");

// 7. Z98.83 -> pachymetry 2x/lifetime
eq("Z98.83 pachy", pachymetryFreq("Z98.83"), "2x per lifetime");

// 8. H40.003 must NOT match 92132 (anterior OCT)
eq("H40.003 oct-anterior", freqFor("H40.003", "oct-anterior"), null);
// but low-tension glaucoma SHOULD match anterior OCT at up-to-2x
eq("H40.1211 oct-anterior", freqFor("H40.1211", "oct-anterior"), "Up to 2x per 12 months");

// VSP quirk: codes in both 1x and 2x resolve to 2x
eq("Q15.0 oct-nerve", freqFor("Q15.0", "oct-nerve"), "2x per 12 months");
eq("H31.102 oct-retina", freqFor("H31.102", "oct-retina"), "2x per 12 months");

// open-list tests always applicable
eq("H40.003 vf", freqFor("H40.003", "vf"), "2x per 12 months");
eq("H40.003 erg", freqFor("H40.003", "erg"), "1x per 12 months");

// text search: broad family -> picker; specific -> subtype
eq("search 'glaucoma' type", doSearch("glaucoma").type, "picker");
eq("search 'glaucoma suspect' type", doSearch("glaucoma suspect").type, "subtype"); // exactly 1 hit -> straight to subtype
eq("search 'keratoconus' subtypes", doSearch("keratoconus").subtypes.length >= 3, true);
eq("search 'H40.003' type", doSearch("H40.003").type, "code");
eq("search 'wet amd' type", doSearch("wet amd").type, "picker");

// subtype path (picker -> subtype view) uses range overlap
const poagNos = subtypesForCode("H40.1194").find(s => s.id === "glc-poag-nos");
const poagTests = applicableForSubtype(poagNos);
eq("poag-nos includes gonio 2x",
  poagTests.find(t => t.test.id === "gonio").freq, "2x per 12 months");
eq("poag-nos includes oct-nerve 2x",
  poagTests.find(t => t.test.id === "oct-nerve").freq, "2x per 12 months");
const kc = subtypesForCode("H18.611").find(s => s.id === "kc-stable");
eq("kc-stable topo 2x",
  applicableForSubtype(kc).find(t => t.test.id === "topo").freq, "2x per 12 months");

// multi-category range correctness (VSP shorthands expanded per category)
eq("E10.9 NOT gonio 2x", freqFor("E10.9", "gonio"), "1x per 12 months");
eq("E10.9 NOT fundus 2x", freqFor("E10.9", "fundus"), "1x per 12 months");
eq("E11.311 gonio 2x", freqFor("E11.311", "gonio"), "2x per 12 months");
eq("E11.311 fundus 2x", freqFor("E11.311", "fundus"), "2x per 12 months");
eq("H36 fundus 2x", freqFor("H36", "fundus"), "2x per 12 months");
eq("H35.40 fundus 2x", freqFor("H35.40", "fundus"), "2x per 12 months");
// unrestricted 1x tiers apply to any appropriate diagnosis
eq("H40.003 fundus 1x", freqFor("H40.003", "fundus"), "1x per 12 months");
eq("Z13.1 fundus 1x", freqFor("Z13.1", "fundus"), "1x per 12 months");
eq("H40.003 ext-ophth 1x (H40.001-H40.9 in 92201 list)", freqFor("H40.003", "ext-ophth"), "1x per 12 months");

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
