import { createCamera, clamp } from "./kernel/camera.js";
import { loadP900Phase30 } from "./kernel/p900_data.js";
import { buildVertices, buildEdges } from "./kernel/p900_geometry.js";
import { renderScene } from "./kernel/renderer.js";

const canvas = document.getElementById("stage-canvas");
const ctx = canvas.getContext("2d");

const els = {
  stepBackBtn: document.getElementById("step-back-btn"),
  playPauseBtn: document.getElementById("play-pause-btn"),
  stepForwardBtn: document.getElementById("step-forward-btn"),
  resetBtn: document.getElementById("reset-btn"),
  layerSelect: document.getElementById("layer-select"),
  touchResponseToggle: document.getElementById("touch-response-toggle"),
  sheetRateSlider: document.getElementById("sheet-rate-slider"),
  sheetRateReadout: document.getElementById("sheet-rate-readout"),
  sheetRateNumber: document.getElementById("sheet-rate-number"),
  sheetRateApplyBtn: document.getElementById("sheet-rate-apply"),
  trailToggle: document.getElementById("trail-toggle"),
  trailSlider: document.getElementById("trail-slider"),
  trailReadout: document.getElementById("trail-readout"),
  trailNumber: document.getElementById("trail-number"),
  trailApplyBtn: document.getElementById("trail-apply"),
  fpsReadout: document.getElementById("fps-readout"),
  statusText: document.getElementById("status-text"),
  cameraText: document.getElementById("camera-text"),
  metricsConsole: document.getElementById("metrics-console"),
};

const LAYERS = {
  toroidal_surface: {
    label: "Toroidal surface",
    view: "external_p900",
    distance: 9,
    yaw: 32.97,
    pitch: 3.43,
    roll: 0,
    edgeAlpha: 0.42,
    vertexScale: 1.05,
  },
  internal_g60: {
    label: "Internal G60 bodies",
    view: "internal_g60",
    distance: 8.5,
    yaw: 32.97,
    pitch: 3.43,
    roll: 0,
    edgeAlpha: 0.30,
    vertexScale: 1.18,
  },
  combined: {
    label: "Combined body plus surface",
    view: "combined",
    distance: 11,
    yaw: 32.97,
    pitch: 3.43,
    roll: 0,
    edgeAlpha: 0.24,
    vertexScale: 0.95,
  },
};

const PREFERRED_CANDIDATE_ID = "gap1_orbit_2";
const ZOOM_MIN = 0.85;
const ZOOM_MAX = 80;
const SHEET_COUNT = 30;

function layer() {
  return LAYERS[els.layerSelect?.value] || LAYERS.toroidal_surface;
}

function wrapAngle(value) {
  const tau = Math.PI * 2;
  let x = value % tau;
  if (x < 0) x += tau;
  return x;
}

const camera = createCamera();
let data = null;
let candidate = null;
let tick = 0;
let playing = false;
let lastFrameTime = null;
let fpsSmoothed = null;

function applyLayerCamera() {
  const l = layer();
  camera.distance = l.distance;
  camera.yaw = l.yaw;
  camera.pitch = l.pitch;
  camera.roll = l.roll;
}

applyLayerCamera();

function resetView() {
  playing = false;
  tick = 0;
  applyLayerCamera();
  draw();
}


function stepSheets(deltaSheets) {
  playing = false;
  const radiansPerSheet = Math.PI * 2 / SHEET_COUNT;
  tick += deltaSheets;
  camera.pitch = wrapAngle(camera.pitch - radiansPerSheet * deltaSheets);
  draw();
}

function touchEnabled() {
  return !(els.touchResponseToggle?.checked ?? false);
}

function sheetRate() {
  return Number(els.sheetRateSlider?.value ?? 30);
}

function clampSheetRate(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 30;
  return Math.max(0.25, Math.min(960, n));
}

function setSheetRate(value) {
  const n = clampSheetRate(value);
  if (els.sheetRateSlider) els.sheetRateSlider.value = String(n);
  if (els.sheetRateNumber) els.sheetRateNumber.value = n.toFixed(2);
  updateRateReadout();
  draw();
}

function syncSheetRateNumber() {
  if (!els.sheetRateNumber) return;
  if (document.activeElement === els.sheetRateNumber) return;
  els.sheetRateNumber.value = sheetRate().toFixed(2);
}

function trailAmount() {
  return Number(els.trailSlider?.value ?? 0.16);
}

function trailEnabled() {
  return !!els.trailToggle?.checked;
}

function updateRateReadout() {
  if (els.sheetRateReadout) els.sheetRateReadout.textContent = sheetRate().toFixed(2);
  syncSheetRateNumber();
  if (els.trailReadout) els.trailReadout.textContent = trailAmount().toFixed(2);
}

function sourceLabel() {
  if (!data || !data.source) return "unknown";
  if (String(data.source).includes("p900_phase30_combined_graph_export")) {
    return "phase30 combined graph export";
  }
  return String(data.source);
}

function consoleText() {
  const l = layer();
  const edgeClasses = candidate.edge_class_counts || {};
  const renderedEdges = buildEdges(candidate, l.view).length;

  return [
    "P900 Surface Observatory",
    "",
    "layer          : " + l.label,
    "source         : " + sourceLabel(),
    "candidate      : " + candidate.id,
    "role           : " + candidate.role,
    "view           : " + l.view,
    "",
    "vertices       : " + candidate.vertices,
    "internal       : " + candidate.internal_edges,
    "external       : " + candidate.external_edges,
    "combined       : " + candidate.combined_edges,
    "rendered       : " + renderedEdges,
    "degree         : " + JSON.stringify(candidate.degree_histogram),
    "",
    "half_turn      : " + candidate.half_turn_set.join(","),
    "identity       : " + candidate.identity_set.join(","),
    "",
    "classes",
    "  internal     : " + (edgeClasses.internal_same_sector ?? "n/a"),
    "  half_turn    : " + (edgeClasses.external_half_turn_mod30 ?? "n/a"),
    "  identity     : " + (edgeClasses.external_identity_same_local ?? "n/a"),
    "",
    "frame_step     : 1 sheet",
    "sheet_rate     : " + sheetRate().toFixed(2) + " sheets/sec",
    "cycle_rate     : " + (sheetRate() / SHEET_COUNT).toFixed(2) + " cycles/sec",
    "trail          : " + (trailEnabled() ? trailAmount().toFixed(2) : "off"),
    "playback       : " + (playing ? "playing" : "paused"),
    "touch_response : " + (touchEnabled() ? "on" : "off"),
    "motion         : visual inspection only",
    "boundary       : no states added beyond 900",
    "claim          : renderer inspection, not final law",
  ].join("\n");
}

function draw() {
  if (!candidate) return;

  const l = layer();
  const scene = {
    candidate,
    view: l.view,
    vertices: buildVertices(candidate, l.view, tick, playing),
    edges: buildEdges(candidate, l.view),
  };

  renderScene(ctx, canvas, scene, camera, {
    showVertices: true,
    showEdges: true,
    showLabels: false,
    edgeAlpha: l.edgeAlpha,
    vertexScale: l.vertexScale,
    trailEnabled: trailEnabled() && playing,
    trailAmount: trailAmount(),
  });

  els.statusText.textContent = candidate.id + " / " + l.label;
  els.cameraText.textContent =
    "dist " + camera.distance.toFixed(1) +
    " pitch " + Math.round(camera.pitch * 180 / Math.PI) + "deg";

  els.metricsConsole.textContent = consoleText();
  els.playPauseBtn.textContent = playing ? "Ⅱ" : "▶";
}

function frame(now) {
  const elapsedRaw = lastFrameTime == null ? 0 : (now - lastFrameTime) / 1000;
  const elapsed = Math.min(0.1, elapsedRaw);
  lastFrameTime = now;

  if (elapsedRaw > 0) {
    const fpsNow = 1 / elapsedRaw;
    fpsSmoothed = fpsSmoothed == null ? fpsNow : fpsSmoothed * 0.92 + fpsNow * 0.08;
    if (els.fpsReadout) els.fpsReadout.textContent = "fps " + Math.round(fpsSmoothed);
  }

  if (playing) {
    const radiansPerSecond = sheetRate() * Math.PI * 2 / SHEET_COUNT;
    tick += elapsed * sheetRate();
    camera.pitch = wrapAngle(camera.pitch - radiansPerSecond * elapsed);
  }

  updateRateReadout();
  draw();
  requestAnimationFrame(frame);
}

const pointers = new Map();
let lastPinchDistance = null;

function pointerDistance() {
  const pts = Array.from(pointers.values());
  if (pts.length < 2) return null;
  const dx = pts[0].x - pts[1].x;
  const dy = pts[0].y - pts[1].y;
  return Math.hypot(dx, dy);
}

function bindStageTouchControls() {
  canvas.addEventListener("pointerdown", (event) => {
    if (!touchEnabled()) return;
    canvas.setPointerCapture(event.pointerId);
    pointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
    });
    lastPinchDistance = pointerDistance();
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!touchEnabled()) return;
    const p = pointers.get(event.pointerId);
    if (!p) return;

    p.x = event.clientX;
    p.y = event.clientY;

    if (pointers.size >= 2) {
      const d = pointerDistance();
      if (d && lastPinchDistance) {
        const delta = d - lastPinchDistance;
        camera.distance = clamp(camera.distance - delta * 0.025, ZOOM_MIN, ZOOM_MAX);
        lastPinchDistance = d;
        draw();
      }
      return;
    }

    const dx = p.x - p.lastX;
    const dy = p.y - p.lastY;

    camera.yaw += dx * 0.006;
    camera.pitch = wrapAngle(camera.pitch + dy * 0.006);

    p.lastX = p.x;
    p.lastY = p.y;

    draw();
  });

  canvas.addEventListener("pointerup", (event) => {
    pointers.delete(event.pointerId);
    lastPinchDistance = pointerDistance();
  });

  canvas.addEventListener("pointercancel", (event) => {
    pointers.delete(event.pointerId);
    lastPinchDistance = pointerDistance();
  });

  canvas.addEventListener("wheel", (event) => {
    if (!touchEnabled()) return;
    event.preventDefault();
    camera.distance = clamp(camera.distance + event.deltaY * 0.015, ZOOM_MIN, ZOOM_MAX);
    draw();
  }, { passive: false });
}

async function main() {
  bindStageTouchControls();

  if (els.stepBackBtn) {
    els.stepBackBtn.addEventListener("click", () => stepSheets(-1));
  }

  els.playPauseBtn.addEventListener("click", () => {
    playing = !playing;
    draw();
  });

  if (els.stepForwardBtn) {
    els.stepForwardBtn.addEventListener("click", () => stepSheets(1));
  }

  if (els.resetBtn) els.resetBtn.addEventListener("click", resetView);

  if (els.layerSelect) {
    els.layerSelect.addEventListener("change", () => {
      resetView();
    });
  }

  if (els.touchResponseToggle) {
    els.touchResponseToggle.addEventListener("change", () => {
      pointers.clear();
      lastPinchDistance = null;
      draw();
    });
  }

  if (els.sheetRateSlider) {
    els.sheetRateSlider.addEventListener("input", () => {
      updateRateReadout();
      draw();
    });
  }

  if (els.sheetRateApplyBtn) {
    els.sheetRateApplyBtn.addEventListener("click", () => {
      setSheetRate(els.sheetRateNumber?.value ?? sheetRate());
    });
  }

  if (els.sheetRateNumber) {
    els.sheetRateNumber.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        setSheetRate(els.sheetRateNumber.value);
      }
    });

    els.sheetRateNumber.addEventListener("blur", () => {
      setSheetRate(els.sheetRateNumber.value);
    });
  }

  if (els.trailSlider) {
    els.trailSlider.addEventListener("input", () => {
      updateRateReadout();
      draw();
    });
  }

  if (els.trailToggle) {
    els.trailToggle.addEventListener("change", draw);
  }

  for (const cfg of [
    [els.trailApplyBtn, els.trailNumber, els.trailSlider, 0.02, 0.45, 0.16, 2],
    [els.edgeOpacityApplyBtn, els.edgeOpacityNumber, els.edgeOpacitySlider, 0, 1, 1, 2],
    [els.vertexOpacityApplyBtn, els.vertexOpacityNumber, els.vertexOpacitySlider, 0, 1, 1, 2],
  ]) {
    const [btn, numberEl, sliderEl, min, max, fallback, digits] = cfg;
    if (btn) {
      btn.addEventListener("click", () => {
        setSliderFromNumber(sliderEl, numberEl, min, max, fallback, digits);
      });
    }

    if (numberEl) {
      numberEl.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          setSliderFromNumber(sliderEl, numberEl, min, max, fallback, digits);
        }
      });

      numberEl.addEventListener("blur", () => {
        setSliderFromNumber(sliderEl, numberEl, min, max, fallback, digits);
      });
    }
  }

  for (const cfg of [
    [els.sheetRateSlider, els.sheetRateNumber, 2],
    [els.trailSlider, els.trailNumber, 2],
    [els.edgeOpacitySlider, els.edgeOpacityNumber, 2],
    [els.vertexOpacitySlider, els.vertexOpacityNumber, 2],
  ]) {
    const [sliderEl, numberEl, digits] = cfg;
    if (!sliderEl || !numberEl) continue;

    sliderEl.addEventListener("input", () => {
      numberEl.value = Number(sliderEl.value).toFixed(digits);
    });
  }

  window.addEventListener("resize", draw);

  data = await loadP900Phase30();
  candidate = data.candidates.find((c) => c.id === PREFERRED_CANDIDATE_ID) || data.candidates[0];

  if (!candidate) throw new Error("No P900 candidate loaded");

  els.statusText.textContent = "ready";
  updateRateReadout();
  draw();
  requestAnimationFrame(frame);
}

main().catch((err) => {
  console.error(err);
  els.statusText.textContent = "error";
  els.metricsConsole.textContent = String(err && err.stack ? err.stack : err);
});
