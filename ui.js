/* ---------- UI rendering ---------- */
const $ = sel => document.querySelector(sel);

const QUICK = ["Keratoconus", "Glaucoma suspect", "Mild POAG", "Severe POAG",
  "Proliferative DR", "Wet AMD", "Retinal vein occlusion", "Corneal edema"];

let lastContext = null; // {kind:'code',code,subtypes} or {kind:'subtype',subtype}

function esc(s) {
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

function freqBadge(freq) {
  const cls = /2x/.test(freq) ? "b2" : (/1x/.test(freq) ? "b1" : "b0");
  return `<span class="badge ${cls}">${esc(freq)}</span>`;
}

function entriesForContext(test, ctx) {
  // returns [{freqLabel, entries:[...], highlight:Set of indexes}]
  const groups = [];
  if (test.lifetime) {
    test.lifetime.forEach(L => {
      groups.push({ freqLabel: L.freq, entries: L.codes.map(([s,e,l]) => ({start:s,end:e,label:l})), note: L.note || null, hl: new Set() });
    });
    // highlight matching lifetime entries
    groups.forEach(g => g.entries.forEach((e,i) => {
      const hit = ctx.kind === "code" ? inRange(ctx.code, e.start, e.end)
        : ctx.subtype.ranges.some(([a,b]) => rangesOverlap(a,b,e.start,e.end));
      if (hit) g.hl.add(i);
    }));
    return groups;
  }
  for (const [freqLabel, tableKey] of test.tables) {
    if (!tableKey) {
      groups.push({ freqLabel, entries: [], note: test.nullNote || "Applies to all appropriate medical diagnoses (no restricted list).", hl: new Set() });
      continue;
    }
    const entries = CODE_TABLES[tableKey] || [];
    const hl = new Set();
    entries.forEach((e, i) => {
      const hit = ctx.kind === "code" ? inRange(ctx.code, e.start, e.end)
        : ctx.subtype.ranges.some(([a,b]) => rangesOverlap(a,b,e.start,e.end));
      if (hit) hl.add(i);
    });
    groups.push({ freqLabel, entries, hl, note: null });
  }
  return groups;
}

function renderEntries(groups) {
  let html = "";
  for (const g of groups) {
    html += `<div class="freq-group"><div class="freq-head">${freqBadge(g.freqLabel)}</div>`;
    if (g.note) html += `<p class="muted">${esc(g.note)}</p>`;
    if (g.entries.length) {
      // group by family
      const fams = {};
      g.entries.forEach((e, i) => {
        const f = familyOfEntry(e);
        (fams[f] = fams[f] || []).push([e, g.hl.has(i)]);
      });
      for (const f of Object.keys(fams).sort()) {
        html += `<div class="fam"><div class="fam-name">${esc(f)}</div><ul>`;
        for (const [e, hit] of fams[f]) {
          html += `<li class="${hit ? "hit" : ""}"><span class="code">${esc(prettyRange(e.start, e.end))}</span> <span class="lbl">${esc(e.label)}</span></li>`;
        }
        html += `</ul></div>`;
      }
    }
    html += `</div>`;
  }
  return html;
}

function renderCard(item, ctx, idx) {
  const t = item.test;
  const cardId = "card-" + idx;
  let ctxLine = "";
  if (ctx.kind === "code") {
    ctxLine = `<span class="code">${esc(ctx.code)}</span> → ${freqBadge(item.freq)}`;
    if (item.note) ctxLine += ` <span class="muted">${esc(item.note)}</span>`;
  } else {
    ctxLine = `${freqBadge(item.freq)} <span class="muted">for this subtype</span>`;
  }
  let inner = `<div class="ctx-line">${ctxLine}</div>`;
  inner += `<p>${esc(t.freqNote)}</p>`;
  if (t.conflicts) inner += `<div class="warn"><strong>Same-day billing conflict:</strong><ul>${t.conflicts.map(c => `<li>${esc(c)}</li>`).join("")}</ul></div>`;
  if (t.modifiers) inner += `<div class="mod"><strong>Modifiers:</strong><ul>${t.modifiers.map(c => `<li>${esc(c)}</li>`).join("")}</ul></div>`;
  inner += `<h4>Covered diagnoses (per VSP)</h4>`;
  inner += renderEntries(entriesForContext(t, ctx));
  if (t.specialHandling) inner += `<div class="special"><strong>Special handling:</strong><ul>${t.specialHandling.map(c => `<li>${esc(c)}</li>`).join("")}</ul></div>`;
  inner += `<p class="src">Source: ${esc(SOURCE)}</p>`;
  return `<div class="card" id="${cardId}">
    <button class="card-head" onclick="toggleCard('${cardId}')" aria-expanded="false">
      <span class="card-title">${esc(t.name)} <span class="cpt">${esc(t.cpt)}</span></span>
      ${freqBadge(item.freq)}
      <span class="chev">▾</span>
    </button>
    <div class="card-body" hidden>${inner}</div>
  </div>`;
}

function toggleCard(id) {
  const card = document.getElementById(id);
  const body = card.querySelector(".card-body");
  const head = card.querySelector(".card-head");
  const open = body.hidden;
  body.hidden = !open;
  head.setAttribute("aria-expanded", String(open));
  card.classList.toggle("open", open);
}

function renderResults(res) {
  const box = $("#results");
  if (res.type === "empty") { box.innerHTML = ""; return; }
  if (res.type === "none") {
    box.innerHTML = `<div class="empty">No matches for “${esc(res.query)}”. Try a diagnosis name (e.g. keratoconus) or an ICD-10 code (e.g. H40.003).</div>`;
    return;
  }
  if (res.type === "picker") {
    lastContext = null;
    let html = `<div class="picker-head">“${esc(res.query)}” matches several subtypes. Pick one:</div>`;
    for (const fam of res.families) {
      html += `<div class="fam"><div class="fam-name">${esc(fam)}</div><div class="chips">`;
      for (const s of res.subtypes.filter(x => x.family === fam)) {
        html += `<button class="chip" onclick="pickSubtype('${s.id}')">${esc(s.name)}</button>`;
      }
      html += `</div></div>`;
    }
    box.innerHTML = html;
    return;
  }
  let ctx, title, items;
  if (res.type === "code") {
    const sub = res.subtypes[0];
    ctx = { kind: "code", code: res.code, subtypes: res.subtypes };
    title = `Results for <span class="code">${esc(res.code)}</span>` +
      (sub ? ` — ${esc(sub.name)}` : ` <span class="muted">(no specific subtype matched; showing tests whose VSP lists include this code)</span>`);
    items = res.results;
  } else {
    ctx = { kind: "subtype", subtype: res.subtype };
    title = `Results for ${esc(res.subtype.name)} <span class="muted">(${esc(res.subtype.ranges.map(([a,b]) => prettyRange(a,b)).join(", "))})</span>`;
    items = applicableForSubtype(res.subtype);
  }
  lastContext = ctx;
  if (!items.length) {
    box.innerHTML = `<div class="empty">${title}<br><span class="muted">No listed tests cover this diagnosis under VSP Essential Medical Eye Care.</span></div>`;
    return;
  }
  box.innerHTML = `<div class="res-head">${title}</div>` +
    items.map((it, i) => renderCard(it, ctx, i)).join("");
}

function pickSubtype(id) {
  const s = SUBTYPES.find(x => x.id === id);
  if (s) renderResults({ type: "subtype", subtype: s });
  $("#results").scrollIntoView({ behavior: "smooth", block: "start" });
}

function runSearch() {
  renderResults(doSearch($("#q").value));
}

function init() {
  $("#q").addEventListener("input", runSearch);
  $("#clear").addEventListener("click", () => { $("#q").value = ""; renderResults({type:"empty"}); $("#q").focus(); });
  const qc = $("#quick");
  QUICK.forEach(term => {
    const b = document.createElement("button");
    b.className = "chip"; b.textContent = term;
    b.onclick = () => { $("#q").value = term; runSearch(); };
    qc.appendChild(b);
  });
}
document.addEventListener("DOMContentLoaded", init);
