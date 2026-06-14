const canvas = document.getElementById("return-canvas");
const ctx = canvas.getContext("2d");

const stationReadout = document.getElementById("station-readout");
const edgeReadout = document.getElementById("edge-readout");
const kindReadout = document.getElementById("kind-readout");
const cycleReadout = document.getElementById("cycle-readout");
const returnReadout = document.getElementById("return-readout");
const boundaryReadout = document.getElementById("boundary-readout");
const g60SourceStatus = document.getElementById("g60-source-status");
const g900SignatureStatus = document.getElementById("g900-signature-status");

let model = null;
let startTime = null;

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function edgeAt(index) {
  return model.cycle.edges[index % model.cycle.edges.length];
}

function stationPoint(label, cx, cy, r) {
  const labels = model.cycle.stations;
  const i = labels.indexOf(label);
  const angle = -Math.PI / 2 + i * Math.PI * 2 / labels.length;
  return {
    x: cx + Math.cos(angle) * r,
    y: cy + Math.sin(angle) * r
  };
}

function drawNode(p, label, active) {
  ctx.beginPath();
  ctx.arc(p.x, p.y, active ? 18 : 14, 0, Math.PI * 2);
  ctx.fillStyle = active ? "rgba(216,188,118,0.95)" : "rgba(8,18,31,0.95)";
  ctx.fill();
  ctx.lineWidth = active ? 2 : 1;
  ctx.strokeStyle = active ? "rgba(216,188,118,0.95)" : "rgba(156,200,255,0.42)";
  ctx.stroke();

  ctx.fillStyle = active ? "#07111d" : "rgba(232,241,251,0.88)";
  ctx.font = "800 15px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, p.x, p.y + 0.5);
}

function drawEdge(a, b, edge, active, progress) {
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.lineWidth = active ? 4 : 1.5;
  ctx.strokeStyle = edge.kind === "diad"
    ? (active ? "rgba(216,188,118,0.95)" : "rgba(216,188,118,0.28)")
    : (active ? "rgba(156,200,255,0.95)" : "rgba(156,200,255,0.25)");
  ctx.stroke();

  if (active) {
    const x = a.x + (b.x - a.x) * progress;
    const y = a.y + (b.y - a.y) * progress;
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.fillStyle = edge.kind === "diad" ? "rgba(216,188,118,1)" : "rgba(156,200,255,1)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.strokeStyle = edge.kind === "diad" ? "rgba(216,188,118,0.24)" : "rgba(156,200,255,0.24)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function drawReturnTrace(cx, cy, r, cycleCount, localPhase) {
  if (cycleCount <= 0) return;

  const pulse = 0.45 + 0.25 * Math.sin(localPhase * Math.PI * 2);
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.62, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(120,255,190," + pulse.toFixed(3) + ")";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = "rgba(120,255,190,0.52)";
  ctx.font = "800 11px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  ctx.textAlign = "center";
  ctx.fillText("REGISTERED RETURN", cx, cy);
}


function updateSequenceRail(activeEdgeLabel) {
  const rail = document.getElementById("sequence-rail");
  if (!rail) return;

  rail.querySelectorAll("span[data-edge]").forEach((el) => {
    el.classList.toggle("is-active", el.dataset.edge === activeEdgeLabel);
  });
}

function draw(now) {
  if (!model) return;
  if (startTime === null) startTime = now;

  const rect = canvas.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;
  ctx.clearRect(0, 0, w, h);

  const elapsed = (now - startTime) / 1000;
  const secondsPerEdge = 1.15;
  const raw = elapsed / secondsPerEdge;
  const edgeIndex = Math.floor(raw) % model.cycle.edges.length;
  const cycleCount = Math.floor(raw / model.cycle.edges.length);
  const progress = raw - Math.floor(raw);

  const edge = edgeAt(edgeIndex);
  const currentStation = edge.from;

  const cx = w / 2;
  const cy = h / 2 + 8;
  const r = Math.min(w, h) * 0.34;

  ctx.fillStyle = "rgba(205,221,238,0.06)";
  ctx.fillRect(0, 0, w, h);

  ctx.beginPath();
  ctx.arc(cx, cy, r * 1.08, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(156,200,255,0.10)";
  ctx.lineWidth = 1;
  ctx.stroke();

  for (const e of model.cycle.edges) {
    const a = stationPoint(e.from, cx, cy, r);
    const b = stationPoint(e.to, cx, cy, r);
    drawEdge(a, b, e, e.label === edge.label, progress);
  }

  drawReturnTrace(cx, cy, r, cycleCount, progress);

  for (const label of model.cycle.stations) {
    const p = stationPoint(label, cx, cy, r);
    drawNode(p, label, label === currentStation);
  }

  stationReadout.textContent = currentStation;
  edgeReadout.textContent = edge.label;
  kindReadout.textContent = edge.kind;
  cycleReadout.textContent = String(cycleCount);
  updateSequenceRail(edge.label);

  if (cycleCount > 0) {
    returnReadout.textContent =
      "Return admitted: action has completed " + cycleCount +
      " closed W-X-Y-Z-T-I-W cycle(s) and returned through IW to W.";
  } else {
    returnReadout.textContent =
      "Return pending: action is still inside the first closed cycle.";
  }

  requestAnimationFrame(draw);
}


async function loadG60SourceBinding() {
  if (!g60SourceStatus) return null;

  try {
    const binding = await fetch("data/g60_source_binding.v1.json", { cache: "no-store" }).then((r) => r.json());
    const source = binding.canonical_source || {};
    const found = binding.source_file_count || 0;
    const active = binding.active_projection || {};
    const files = (binding.source_files || []).filter((f) => f.exists);

    const primary = files.slice(0, 3).map((f) => {
      const hash = f.sha256 ? f.sha256.slice(0, 12) : "nohash";
      return f.path + " @" + hash;
    }).join("<br>");

    g60SourceStatus.innerHTML =
      "<strong>G60 source binding</strong><br>" +
      "source: " + (source.graph_id || "unknown") + " / scaffold " + (source.scaffolding || "unknown") + "<br>" +
      "rule: G60 is the thing; this cell is a projection witness.<br>" +
      "active projection: " + (active.id || "unknown") + "<br>" +
      "source files found: " + found +
      (primary ? "<br>" + primary : "");

    return binding;
  } catch (err) {
    g60SourceStatus.textContent = "G60 source binding failed to load.";
    console.warn("G60 source binding load failed", err);
    return null;
  }
}


async function loadG900SignatureBinding() {
  if (!g900SignatureStatus) return null;

  try {
    const binding = await fetch("data/g900_signature_binding.v1.json", { cache: "no-store" }).then((r) => r.json());
    const cand = binding.candidate || {};
    const adm = binding.admission_signature || {};
    const boundary = binding.identity_boundary || {};
    const tag = adm.tag || "unavailable";

    g900SignatureStatus.innerHTML =
      "<strong>G900 local signature</strong><br>" +
      "candidate: " + (cand.symbol || "X_sigma") + " / " + (cand.kernel || "K_900") + "<br>" +
      "counts: " + (cand.vertices || "?") + " vertices / " + (cand.edges || "?") + " edges<br>" +
      "census: " + (boundary.census_status || "not externally identified") + "<br>" +
      "tag: " + tag + "<br>" +
      "role: context only; not the active rendered cell.";

    return binding;
  } catch (err) {
    g900SignatureStatus.textContent = "G900 signature binding failed to load.";
    console.warn("G900 signature binding load failed", err);
    return null;
  }
}

async function boot() {
  resizeCanvas();
  model = await fetch("data/perfect_return_cell.v1.json", { cache: "no-store" }).then((r) => r.json());
  await loadG60SourceBinding();
  await loadG900SignatureBinding();
  boundaryReadout.textContent = model.boundary;
  requestAnimationFrame(draw);
}

window.addEventListener("resize", resizeCanvas);
boot().catch((err) => {
  console.error(err);
  boundaryReadout.textContent = "Failed to load Perfect Return Cell model.";
});
