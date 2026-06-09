import { createCamera, clamp } from "./kernel/camera.js";
import { loadP900Phase30 } from "./kernel/p900_data.js";
import { buildVertices, buildEdges } from "./kernel/p900_geometry.js";
import { renderScene } from "./kernel/renderer.js";

const canvas = document.getElementById("stage-canvas");
const ctx = canvas.getContext("2d");

const els = {
  candidateSelect: document.getElementById("candidate-select"),
  viewSelect: document.getElementById("view-select"),
  toggleVertices: document.getElementById("toggle-vertices"),
  toggleEdges: document.getElementById("toggle-edges"),
  toggleLabels: document.getElementById("toggle-labels"),
  togglePulse: document.getElementById("toggle-pulse"),
  zoomSlider: document.getElementById("zoom-slider"),
  autoRotateToggle: document.getElementById("auto-rotate-toggle"),
  yawLeftBtn: document.getElementById("yaw-left-btn"),
  yawRightBtn: document.getElementById("yaw-right-btn"),
  pitchDownBtn: document.getElementById("pitch-down-btn"),
  pitchUpBtn: document.getElementById("pitch-up-btn"),
  rollLeftBtn: document.getElementById("roll-left-btn"),
  rollRightBtn: document.getElementById("roll-right-btn"),
  statusText: document.getElementById("status-text"),
  cameraText: document.getElementById("camera-text"),
  metricsConsole: document.getElementById("metrics-console"),
};

const camera = createCamera();

let data = null;
let candidates = [];
let tick = 0;

function selectedCandidate() {
  const id = els.candidateSelect.value;
  return candidates.find((c) => c.id === id) || candidates[0];
}

function options() {
  return {
    candidate: selectedCandidate(),
    view: els.viewSelect.value,
    showVertices: els.toggleVertices.checked,
    showEdges: els.toggleEdges.checked,
    showLabels: els.toggleLabels.checked,
    pulse: els.togglePulse.checked,
  };
}

function consoleText(o) {
  const c = o.candidate;

  return [
    "system           : P900 Surface Observatory",
    "source           : " + (data ? data.source : "unknown"),
    "candidate        : " + c.id,
    "role             : " + c.role,
    "view             : " + o.view,
    "artifact_vertices: " + c.vertices,
    "internal_edges   : " + c.internal_edges,
    "external_edges   : " + c.external_edges,
    "combined_edges   : " + c.combined_edges,
    "duplicate_edges  : " + c.duplicate_edges,
    "degree_histogram : " + JSON.stringify(c.degree_histogram),
    "half_turn_set    : " + c.half_turn_set.join(","),
    "identity_set     : " + c.identity_set.join(","),
    "edge_classes     : " + JSON.stringify(c.edge_class_counts),
    "rendered_edges   : " + buildEdges(c, o.view).length,
    "motion           : visual inspection only",
    "boundary         : no states added beyond artifact vertices",
    "claim_status     : renderer inspection, not final law",
  ].join("\n");
}

function draw() {
  const o = options();
  if (!o.candidate) return;

  const scene = {
    candidate: o.candidate,
    view: o.view,
    vertices: buildVertices(o.candidate, o.view, tick, o.pulse),
    edges: buildEdges(o.candidate, o.view),
  };

  renderScene(ctx, canvas, scene, camera, o);

  els.statusText.textContent = o.candidate.id + " / " + o.view;
  els.cameraText.textContent =
    "dist " + camera.distance.toFixed(1) +
    " yaw " + camera.yaw.toFixed(2) +
    " pitch " + camera.pitch.toFixed(2) +
    " roll " + camera.roll.toFixed(2);

  els.metricsConsole.textContent = consoleText(o);
}

function frame() {
  tick += 1;
  if (els.autoRotateToggle.checked) {
    camera.yaw += 0.006;
  }
  draw();
  requestAnimationFrame(frame);
}

function bindControls() {
  els.zoomSlider.addEventListener("input", () => {
    camera.distance = clamp(Number(els.zoomSlider.value), 5, 80);
    draw();
  });

  els.yawLeftBtn.addEventListener("click", () => { camera.yaw -= 0.12; draw(); });
  els.yawRightBtn.addEventListener("click", () => { camera.yaw += 0.12; draw(); });
  els.pitchDownBtn.addEventListener("click", () => { camera.pitch -= 0.08; draw(); });
  els.pitchUpBtn.addEventListener("click", () => { camera.pitch += 0.08; draw(); });
  els.rollLeftBtn.addEventListener("click", () => { camera.roll -= 0.08; draw(); });
  els.rollRightBtn.addEventListener("click", () => { camera.roll += 0.08; draw(); });

  for (const el of [
    els.candidateSelect,
    els.viewSelect,
    els.toggleVertices,
    els.toggleEdges,
    els.toggleLabels,
    els.togglePulse,
    els.autoRotateToggle,
  ]) {
    el.addEventListener("change", draw);
  }

  window.addEventListener("resize", draw);
}

async function main() {
  bindControls();

  data = await loadP900Phase30();
  candidates = data.candidates;

  if (!candidates.length) {
    throw new Error("No P900 candidates loaded");
  }

  const ids = new Set(candidates.map((c) => c.id));
  if (!ids.has(els.candidateSelect.value)) {
    els.candidateSelect.value = candidates[0].id;
  }

  els.statusText.textContent = "ready";
  draw();
  requestAnimationFrame(frame);
}

main().catch((err) => {
  console.error(err);
  els.statusText.textContent = "error";
  els.metricsConsole.textContent = String(err && err.stack ? err.stack : err);
});
