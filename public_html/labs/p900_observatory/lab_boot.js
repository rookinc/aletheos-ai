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
  cameraPreset1Btn: document.getElementById("camera-preset-1"),
  cameraPreset2Btn: document.getElementById("camera-preset-2"),
  cameraPreset3Btn: document.getElementById("camera-preset-3"),
  layerSelect: document.getElementById("layer-select"),
  surfaceOpacitySlider: document.getElementById("surface-opacity-slider"),
  surfaceOpacityReadout: document.getElementById("surface-opacity-readout"),
  bodyOpacitySlider: document.getElementById("body-opacity-slider"),
  bodyOpacityReadout: document.getElementById("body-opacity-readout"),
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
  edgeToggle: document.getElementById("edge-toggle"),
  edgeOpacitySlider: document.getElementById("edge-opacity-slider"),
  edgeOpacityReadout: document.getElementById("edge-opacity-readout"),
  vertexToggle: document.getElementById("vertex-toggle"),
  vertexOpacitySlider: document.getElementById("vertex-opacity-slider"),
  vertexOpacityReadout: document.getElementById("vertex-opacity-readout"),
  fpsReadout: document.getElementById("fps-readout"),
  statusText: document.getElementById("status-text"),
  cameraText: document.getElementById("camera-text"),
  settingsPresetSelect: document.getElementById("settings-preset-select"),
  settingsExportUrlBtn: document.getElementById("settings-export-url-btn"),
  settingsShareDialog: document.getElementById("settings-share-dialog"),
  settingsShareNameInput: document.getElementById("settings-share-name-input"),
  settingsShareUrlText: document.getElementById("settings-share-url-text"),
  settingsShareCopyBtn: document.getElementById("settings-share-copy"),
  settingsShareCloseBtn: document.getElementById("settings-share-close"),
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

const SETTINGS_PRESETS = {
  default: {
    sheetRate: 30,
    surface: 50,
    body: 50,
    trailOn: true,
    trail: 67,
    edgesOn: true,
    edgeOpacity: 1,
    verticesOn: true,
    vertexOpacity: 1,
    cameraPreset: 1,
  },
  cloud: {
    sheetRate: 656.75,
    surface: 13,
    body: 25,
    trailOn: true,
    trail: 67,
    edgesOn: true,
    edgeOpacity: 1,
    verticesOn: true,
    vertexOpacity: 1,
    camera: {
      distance: 9,
      yawDeg: 1845,
      pitchDeg: 245,
      rollDeg: 0,
    },
  },
  balanced: {
    sheetRate: 30,
    surface: 50,
    body: 50,
    trailOn: true,
    trail: 67,
    edgesOn: true,
    edgeOpacity: 1,
    verticesOn: true,
    vertexOpacity: 1,
    cameraPreset: 1,
  },
  trinity: {
    sheetRate: 614.75,
    surface: 0,
    body: 62,
    trailOn: true,
    trail: 0,
    edgesOn: true,
    edgeOpacity: 1,
    verticesOn: true,
    vertexOpacity: 0.84,
    camera: {
      distance: 9,
      yawDeg: 1765,
      pitchDeg: 278,
      rollDeg: 0,
    },
  },
  body_ring: {
    sheetRate: 30,
    surface: 0,
    body: 62,
    trailOn: true,
    trail: 0,
    edgesOn: true,
    edgeOpacity: 1,
    verticesOn: true,
    vertexOpacity: 0.84,
    cameraPreset: 2,
  },
  ectoplasm: {
    sheetRate: 741,
    surface: 0,
    body: 4,
    trailOn: true,
    trail: 100,
    edgesOn: true,
    edgeOpacity: 0.82,
    verticesOn: true,
    vertexOpacity: 0.11,
    camera: {
      distance: 9,
      yawDeg: 1797,
      pitchDeg: 283,
      rollDeg: 0,
    },
  },
  surface_scan: {
    sheetRate: 30,
    surface: 100,
    body: 0,
    trailOn: true,
    trail: 67,
    edgesOn: true,
    edgeOpacity: 1,
    verticesOn: true,
    vertexOpacity: 1,
    cameraPreset: 1,
  },
  spine: {
    sheetRate: 960,
    surface: 0,
    body: 15,
    trailOn: true,
    trail: 99,
    edgesOn: true,
    edgeOpacity: 1,
    verticesOn: true,
    vertexOpacity: 1,
    camera: {
      distance: 9,
      yawDeg: 2060,
      pitchDeg: 76,
      rollDeg: 0,
    },
  },
};


function layer() {
  return LAYERS[els.layerSelect?.value] || LAYERS.toroidal_surface;
}

function percentSliderValue(sliderEl, fallback) {
  const n = Number(sliderEl?.value ?? fallback);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(0, Math.min(100, n));
}

function surfaceOpacity() {
  return percentSliderValue(els.surfaceOpacitySlider, 50) / 100;
}

function bodyOpacity() {
  return percentSliderValue(els.bodyOpacitySlider, 50) / 100;
}

function faderViewLabel() {
  const s = surfaceOpacity();
  const b = bodyOpacity();

  if (s > 0 && b > 0) return "Surface plus body";
  if (s > 0) return "Surface";
  if (b > 0) return "Body";
  return "Hidden";
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

function setCameraPreset(presetId) {
  if (presetId === 1) {
    applyLayerCamera();
  } else if (presetId === 2) {
    camera.distance = 9;
    camera.yaw = 1797 * Math.PI / 180;
    camera.pitch = 189 * Math.PI / 180;
    camera.roll = 0;
  } else if (presetId === 3) {
    camera.distance = 9;
    camera.yaw = 1837 * Math.PI / 180;
    camera.pitch = 268 * Math.PI / 180;
    camera.roll = 0;
  }

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

function trailPercent() {
  return Math.max(0, Math.min(100, Number(els.trailSlider?.value ?? 67)));
}

function trailAmount() {
  const minFade = 0.02;
  const maxFade = 0.45;
  const strength = trailPercent() / 100;
  return maxFade - (maxFade - minFade) * strength;
}

function trailEnabled() {
  return !!els.trailToggle?.checked;
}

function edgeEnabled() {
  return els.edgeToggle?.checked ?? true;
}

function vertexEnabled() {
  return els.vertexToggle?.checked ?? true;
}

function edgeOpacity() {
  const n = Number(els.edgeOpacitySlider?.value ?? 1);
  if (!Number.isFinite(n)) return 1;
  return Math.max(0, Math.min(1, n));
}

function vertexOpacity() {
  const n = Number(els.vertexOpacitySlider?.value ?? 1);
  if (!Number.isFinite(n)) return 1;
  return Math.max(0, Math.min(1, n));
}

function setSliderValue(sliderEl, value) {
  if (sliderEl) sliderEl.value = String(value);
}

function setCheckboxValue(checkEl, value) {
  if (checkEl) checkEl.checked = !!value;
}

function applySettingsPreset(presetName) {
  const preset = SETTINGS_PRESETS[presetName];
  if (!preset) return;

  const rate = clampSheetRate(preset.sheetRate);
  setSliderValue(els.sheetRateSlider, rate);
  if (els.sheetRateNumber) els.sheetRateNumber.value = rate.toFixed(2);

  setSliderValue(els.surfaceOpacitySlider, preset.surface);
  setSliderValue(els.bodyOpacitySlider, preset.body);

  setCheckboxValue(els.trailToggle, preset.trailOn);
  setSliderValue(els.trailSlider, preset.trail);

  setCheckboxValue(els.edgeToggle, preset.edgesOn);
  setSliderValue(els.edgeOpacitySlider, preset.edgeOpacity);

  setCheckboxValue(els.vertexToggle, preset.verticesOn);
  setSliderValue(els.vertexOpacitySlider, preset.vertexOpacity);

  if (preset.camera) {
    camera.distance = preset.camera.distance;
    camera.yaw = preset.camera.yawDeg * Math.PI / 180;
    camera.pitch = preset.camera.pitchDeg * Math.PI / 180;
    camera.roll = preset.camera.rollDeg * Math.PI / 180;
  } else if (preset.cameraPreset) {
    setCameraPreset(preset.cameraPreset);
  }

  updateRateReadout();
  draw();
}

function updateRateReadout() {
  if (els.sheetRateReadout) els.sheetRateReadout.textContent = sheetRate().toFixed(2);
  syncSheetRateNumber();
  if (els.trailReadout) els.trailReadout.textContent = trailPercent().toFixed(0) + "%";
  if (els.edgeOpacityReadout) els.edgeOpacityReadout.textContent = edgeOpacity().toFixed(2);
  if (els.vertexOpacityReadout) els.vertexOpacityReadout.textContent = vertexOpacity().toFixed(2);
  if (els.surfaceOpacityReadout) els.surfaceOpacityReadout.textContent = Math.round(surfaceOpacity() * 100) + "%";
  if (els.bodyOpacityReadout) els.bodyOpacityReadout.textContent = Math.round(bodyOpacity() * 100) + "%";
}

function numericParam(params, key, fallback, minValue, maxValue) {
  const raw = params.get(key);
  if (raw === null) return fallback;
  const n = Number(raw);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(minValue, Math.min(maxValue, n));
}

function boolParam(params, key, fallback) {
  const raw = params.get(key);
  if (raw === null) return fallback;
  return raw === "1" || raw === "true";
}

function cameraDeg(value) {
  return Math.round(value * 180 / Math.PI);
}

function currentSettingsParams() {
  const params = new URLSearchParams();

  params.set("preset", els.settingsPresetSelect?.value || "default");
  params.set("sheets", sheetRate().toFixed(2));

  params.set("surface", String(Math.round(surfaceOpacity() * 100)));
  params.set("body", String(Math.round(bodyOpacity() * 100)));

  params.set("trail_on", trailEnabled() ? "1" : "0");
  params.set("trail", String(Math.round(trailPercent())));

  params.set("edges_on", edgeEnabled() ? "1" : "0");
  params.set("edges", edgeOpacity().toFixed(2));

  params.set("vertices_on", vertexEnabled() ? "1" : "0");
  params.set("vertices", vertexOpacity().toFixed(2));

  params.set("cam_d", camera.distance.toFixed(2));
  params.set("cam_y", String(cameraDeg(camera.yaw)));
  params.set("cam_p", String(cameraDeg(camera.pitch)));
  params.set("cam_r", String(cameraDeg(camera.roll)));

  return params;
}

function currentPresetLabel() {
  const select = els.settingsPresetSelect;
  if (!select) return "";
  const option = select.options[select.selectedIndex];
  return option ? option.textContent.trim() : "";
}

function buildSettingsUrl(nameValue) {
  const url = new URL(window.location.href);
  const params = currentSettingsParams();
  const name = String(nameValue || "").trim();

  if (name) params.set("name", name);
  else params.delete("name");

  url.search = params.toString();
  return url.toString();
}

function updateShareUrlText() {
  if (!els.settingsShareUrlText) return;
  const name = els.settingsShareNameInput?.value || "";
  els.settingsShareUrlText.value = buildSettingsUrl(name);
}

function openShareDialog() {
  if (!els.settingsShareDialog) return;

  const params = new URLSearchParams(window.location.search);
  const urlName = params.get("name");
  const fallbackName = currentPresetLabel();

  if (els.settingsShareNameInput && !els.settingsShareNameInput.value) {
    els.settingsShareNameInput.value = urlName || fallbackName || "";
  }

  updateShareUrlText();
  els.settingsShareDialog.hidden = false;

  window.setTimeout(() => {
    els.settingsShareNameInput?.focus();
    els.settingsShareNameInput?.select();
  }, 0);
}

function closeShareDialog() {
  if (els.settingsShareDialog) els.settingsShareDialog.hidden = true;
}

async function copyShareUrl() {
  updateShareUrlText();

  const text = els.settingsShareUrlText?.value || "";
  if (!text) return;

  let copied = false;
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      copied = true;
    }
  } catch (err) {
    copied = false;
  }

  if (!copied && els.settingsShareUrlText) {
    els.settingsShareUrlText.focus();
    els.settingsShareUrlText.select();
    try {
      copied = document.execCommand("copy");
    } catch (err) {
      copied = false;
    }
  }

  if (copied) {
    const url = new URL(text);
    window.history.replaceState(null, "", url.toString());
  }

  if (els.settingsShareCopyBtn) {
    const oldText = els.settingsShareCopyBtn.textContent;
    els.settingsShareCopyBtn.textContent = copied ? "Copied" : "Select text";
    window.setTimeout(() => {
      if (els.settingsShareCopyBtn) els.settingsShareCopyBtn.textContent = oldText;
    }, 1200);
  }
}

async function exportSettingsUrl() {
  openShareDialog();
}

function setSharedGraphLensOption(nameValue, basePreset, params) {
  const select = els.settingsPresetSelect;
  const name = String(nameValue || "").trim();
  if (!select || !name) return;

  let option = select.querySelector('option[data-shared-url-name="1"]');
  if (!option) {
    option = document.createElement("option");
    option.dataset.sharedUrlName = "1";
    select.insertBefore(option, select.firstChild);
  }

  option.value = "__shared_url__";
  option.dataset.basePreset = basePreset || "default";
  option.dataset.sharedUrlParams = params ? params.toString() : "";
  option.textContent = name;
  option.selected = true;
}

function applySharedGraphLensOption(option) {
  if (!option || option.value !== "__shared_url__") return false;
  const raw = option.dataset.sharedUrlParams || "";
  if (!raw) return false;

  const current = new URL(window.location.href);
  current.search = raw;
  window.history.replaceState(null, "", current.toString());

  applySettingsFromUrl();
  return true;
}

function applySettingsFromUrl() {
  const params = new URLSearchParams(window.location.search);
  if (!params.size) return;

  const preset = params.get("preset");
  if (preset && SETTINGS_PRESETS[preset]) {
    if (els.settingsPresetSelect) els.settingsPresetSelect.value = preset;
    applySettingsPreset(preset);
  }

  setSharedGraphLensOption(params.get("name"), preset, params);

  setSheetRate(numericParam(params, "sheets", sheetRate(), 0.25, 960));

  setSliderValue(els.surfaceOpacitySlider, numericParam(params, "surface", Math.round(surfaceOpacity() * 100), 0, 100));
  setSliderValue(els.bodyOpacitySlider, numericParam(params, "body", Math.round(bodyOpacity() * 100), 0, 100));

  setCheckboxValue(els.trailToggle, boolParam(params, "trail_on", trailEnabled()));
  setSliderValue(els.trailSlider, numericParam(params, "trail", trailPercent(), 0, 100));

  setCheckboxValue(els.edgeToggle, boolParam(params, "edges_on", edgeEnabled()));
  setSliderValue(els.edgeOpacitySlider, numericParam(params, "edges", edgeOpacity(), 0, 1));

  setCheckboxValue(els.vertexToggle, boolParam(params, "vertices_on", vertexEnabled()));
  setSliderValue(els.vertexOpacitySlider, numericParam(params, "vertices", vertexOpacity(), 0, 1));

  camera.distance = numericParam(params, "cam_d", camera.distance, ZOOM_MIN, ZOOM_MAX);
  camera.yaw = numericParam(params, "cam_y", cameraDeg(camera.yaw), -100000, 100000) * Math.PI / 180;
  camera.pitch = numericParam(params, "cam_p", cameraDeg(camera.pitch), -100000, 100000) * Math.PI / 180;
  camera.roll = numericParam(params, "cam_r", cameraDeg(camera.roll), -100000, 100000) * Math.PI / 180;

  updateRateReadout();
  draw();
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
    "view mix       : " + faderViewLabel(),
    "source         : " + sourceLabel(),
    "candidate      : " + candidate.id,
    "role           : " + candidate.role,
    "surface        : " + Math.round(surfaceOpacity() * 100) + "%",
    "body           : " + Math.round(bodyOpacity() * 100) + "%",
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
    "trail          : " + (trailEnabled() ? trailPercent().toFixed(0) + "%" : "off"),
    "playback       : " + (playing ? "playing" : "paused"),
    "touch_response : " + (touchEnabled() ? "on" : "off"),
    "motion         : visual inspection only",
    "boundary       : no states added beyond 900",
    "claim          : renderer inspection, not final law",
  ].join("\n");
}

function draw() {
  if (!candidate) return;

  const sAlpha = surfaceOpacity();
  const bAlpha = bodyOpacity();

  const surfaceScene = {
    candidate,
    view: "external_p900",
    vertices: buildVertices(candidate, "external_p900", tick, playing),
    edges: buildEdges(candidate, "external_p900"),
  };

  const bodyScene = {
    candidate,
    view: "internal_g60",
    vertices: buildVertices(candidate, "internal_g60", tick, playing),
    edges: buildEdges(candidate, "internal_g60"),
  };

  renderScene(ctx, canvas, surfaceScene, camera, {
    showVertices: vertexEnabled() && sAlpha > 0,
    showEdges: edgeEnabled() && sAlpha > 0,
    showLabels: false,
    edgeAlpha: LAYERS.toroidal_surface.edgeAlpha * edgeOpacity() * sAlpha,
    vertexScale: LAYERS.toroidal_surface.vertexScale,
    vertexAlpha: vertexOpacity() * sAlpha,
    trailEnabled: trailEnabled() && playing,
    trailAmount: trailAmount(),
    preserveCanvas: false,
  });

  renderScene(ctx, canvas, bodyScene, camera, {
    showVertices: vertexEnabled() && bAlpha > 0,
    showEdges: edgeEnabled() && bAlpha > 0,
    showLabels: false,
    edgeAlpha: LAYERS.internal_g60.edgeAlpha * edgeOpacity() * bAlpha,
    vertexScale: LAYERS.internal_g60.vertexScale,
    vertexAlpha: vertexOpacity() * bAlpha,
    trailEnabled: false,
    trailAmount: trailAmount(),
    preserveCanvas: true,
  });

  els.statusText.textContent = candidate.id + " / " + faderViewLabel();
  els.cameraText.textContent =
    "cam d=" + camera.distance.toFixed(2) +
    " y=" + Math.round(camera.yaw * 180 / Math.PI) + "deg" +
    " p=" + Math.round(camera.pitch * 180 / Math.PI) + "deg" +
    " r=" + Math.round(camera.roll * 180 / Math.PI) + "deg";

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

  if (els.settingsPresetSelect) {
    els.settingsPresetSelect.addEventListener("change", () => {
      const option = els.settingsPresetSelect.options[els.settingsPresetSelect.selectedIndex];
      if (applySharedGraphLensOption(option)) return;
      applySettingsPreset(els.settingsPresetSelect.value);
    });
  }

  if (els.settingsExportUrlBtn) {
    els.settingsExportUrlBtn.addEventListener("click", exportSettingsUrl);
  }

  if (els.settingsShareNameInput) {
    els.settingsShareNameInput.addEventListener("input", updateShareUrlText);
  }

  if (els.settingsShareCopyBtn) {
    els.settingsShareCopyBtn.addEventListener("click", copyShareUrl);
  }

  if (els.settingsShareCloseBtn) {
    els.settingsShareCloseBtn.addEventListener("click", closeShareDialog);
  }

  if (els.settingsShareDialog) {
    els.settingsShareDialog.addEventListener("click", (event) => {
      if (event.target === els.settingsShareDialog) closeShareDialog();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeShareDialog();
  });

  if (els.cameraPreset1Btn) {
    els.cameraPreset1Btn.addEventListener("click", () => setCameraPreset(1));
  }

  if (els.cameraPreset2Btn) {
    els.cameraPreset2Btn.addEventListener("click", () => setCameraPreset(2));
  }

  if (els.cameraPreset3Btn) {
    els.cameraPreset3Btn.addEventListener("click", () => setCameraPreset(3));
  }

  for (const el of [
    els.surfaceOpacitySlider,
    els.bodyOpacitySlider,
  ]) {
    if (!el) continue;
    el.addEventListener("input", () => {
      updateRateReadout();
      draw();
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

  for (const el of [
    els.edgeToggle,
    els.edgeOpacitySlider,
    els.vertexToggle,
    els.vertexOpacitySlider,
  ]) {
    if (!el) continue;
    el.addEventListener("input", () => {
      updateRateReadout();
      draw();
    });
    el.addEventListener("change", () => {
      updateRateReadout();
      draw();
    });
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

  applySettingsFromUrl();

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
