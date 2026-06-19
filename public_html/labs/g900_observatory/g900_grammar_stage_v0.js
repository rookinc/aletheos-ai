import { readG900StaticBody, getStaticBodySummary } from "./kernel/g900_static_body.js";
import { readG900OverlayRegistry, getG900OverlaySummary } from "./kernel/g900_overlays.js";
import { readG900CarrierRegistry, getG900CarrierSummary } from "./kernel/g900_carriers.js";
import { readG900ChannelRegistry, getG900ChannelSummary } from "./kernel/g900_channels.js";
import { readG900ScaledOscillationKernel, getG900ScaledOscillationSummary } from "./kernel/g900_scaled_oscillation.js";
const TAU = Math.PI * 2;
const DEFAULT_SHEET_RATE = 333;
const MIN_ZOOM = 0.28;
const MAX_ZOOM = 64.0;
const FIRST_CARRIER_RAIL_ID = "root_0_0_tuple_shell_depth_2";

const CARRIER_RENDER_FAMILIES = {
  smoke: {
    label: "Smoke rail",
    setIds: ["source_provenance_scaffold"]
  },
  slot_internal: {
    label: "Slot internal carriers",
    setIds: ["slot_internal_carriers"]
  },
  slot_pair_boundary: {
    label: "Slot-pair boundary carriers",
    setIds: ["slot_pair_boundary_carriers"]
  },
  all: {
    label: "All admitted carriers",
    setIds: ["source_provenance_scaffold", "slot_internal_carriers", "slot_pair_boundary_carriers"]
  }
};

function readCarrierRenderFamilyMode() {
    const value = select ? select.value : "smoke";
  return Object.prototype.hasOwnProperty.call(CARRIER_RENDER_FAMILIES, value) ? value : "smoke";
}

function getCarrierRailIdsForFamily(familyMode) {
  if (!activeCarrierRegistry || !Array.isArray(activeCarrierRegistry.carrier_sets)) {
    return [];
  }

  const family = CARRIER_RENDER_FAMILIES[familyMode] || CARRIER_RENDER_FAMILIES.smoke;
  const allowedSetIds = new Set(family.setIds);
  const railIds = [];

  for (const carrierSet of activeCarrierRegistry.carrier_sets) {
    if (!carrierSet || !allowedSetIds.has(carrierSet.id) || !Array.isArray(carrierSet.rails)) {
      continue;
    }

    for (const rail of carrierSet.rails) {
      if (rail && typeof rail.id === "string") {
        railIds.push(rail.id);
      }
    }
  }

  return railIds;
}
let activeStaticBody = null;
let activeOverlayRegistry = null;
let activeCarrierRegistry = null;
let activeChannelRegistry = null;
let activeScaledOscillationKernel = null;
const CARRIER_RENDER_MODE_IDS = ["smoke", "slot_internal", "slot_pair_boundary", "six_nine_neighborhood", "nearest_receipt_branch"];

function normalizeCarrierRenderModes(value) {
  let raw = value;

  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      raw = parsed;
    } catch (_) {
      raw = raw.split(/[,+ ]+/).filter(Boolean);
    }
  }

  if (!Array.isArray(raw)) raw = ["smoke"];

  const seen = new Set();
  const cleaned = [];

  raw.forEach((mode) => {
    if (CARRIER_RENDER_MODE_IDS.includes(mode) && !seen.has(mode)) {
      seen.add(mode);
      cleaned.push(mode);
    }
  });

  return cleaned.length ? cleaned : ["smoke"];
}

let activeCarrierRenderModes = normalizeCarrierRenderModes(
  localStorage.getItem("g900.carrierRenderModes") ||
  localStorage.getItem("g900.carrierRenderMode") ||
  "smoke"
);
let carrierRenderState = {
  version: "0.1",
  visible: false,
  family_mode: "smoke",
  family_label: "Smoke rail",
  rail_ids: [],
  mutates_body: false,
  physics_claim: false,
  motion_authority: false
};


function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function resizeCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(1, Math.floor(rect.width * dpr));
  const h = Math.max(1, Math.floor(rect.height * dpr));

  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }

  return { w, h, dpr };
}

function drawBackground(ctx, w, h) {
  ctx.clearRect(0, 0, w, h);

  const grad = ctx.createRadialGradient(
    w * 0.50, h * 0.42, 0,
    w * 0.50, h * 0.42, Math.max(w, h) * 0.72
  );

  grad.addColorStop(0, "rgba(10, 24, 39, 0.96)");
  grad.addColorStop(1, "rgba(2, 10, 17, 1)");

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  const grid = Math.max(28, Math.floor(Math.min(w, h) / 10));

  ctx.strokeStyle = "rgba(120, 170, 220, 0.055)";
  ctx.lineWidth = 1;

  for (let x = 0; x <= w; x += grid) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }

  for (let y = 0; y <= h; y += grid) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(217, 184, 108, 0.075)";
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.5, Math.min(w, h) * 0.31, 0, TAU);
  ctx.stroke();
}

function getSheetRate() {
  const slider = document.getElementById("sheet-rate-slider");
  if (!slider) return DEFAULT_SHEET_RATE;

  const value = Number(slider.value);
  return Number.isFinite(value) ? clamp(value, 0.25, 960) : DEFAULT_SHEET_RATE;
}

function syncSheetRateReadout() {
  const readout = document.getElementById("sheet-rate-readout");
  if (!readout) return;

  readout.textContent = getSheetRate().toFixed(2);
}

function syncSheetCounter(state) {
  const readout = document.getElementById("sheet-counter-readout");
  if (!readout) return;

  readout.textContent = "Sheet " + Math.floor(state.sheet);
}

function syncPlayButton(state) {
  const playBtn = document.getElementById("play-toggle");
  if (playBtn) {
    playBtn.textContent = state.playing ? "II" : "▶";
  }
}

function rotatePoint(point, state) {
  let [x, y, z] = point;

  let c = Math.cos(state.yaw);
  let sn = Math.sin(state.yaw);
  let x1 = x * c + z * sn;
  let z1 = -x * sn + z * c;
  x = x1;
  z = z1;

  c = Math.cos(state.pitch);
  sn = Math.sin(state.pitch);
  let y1 = y * c - z * sn;
  z1 = y * sn + z * c;
  y = y1;
  z = z1;

  return [x, y, z];
}

function projectPoint(point, state, w, h, dpr) {
  const p = rotatePoint(point, state);
  const depth = 4.5 + p[2];
  const scale = Math.min(w, h) * 0.18 * state.zoom / Math.max(1.2, depth);

  return {
    x: w * 0.5 + p[0] * scale,
    y: h * 0.5 + p[1] * scale,
    z: p[2],
    dpr
  };
}

function drawLine(ctx, a, b, color, alpha, width) {
  ctx.strokeStyle = "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + alpha + ")";
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}

function drawStageGrid(ctx, w, h, dpr, state) {
  const gridOn = document.getElementById("stage-grid-toggle");
  if (gridOn && !gridOn.checked) return;

  const gridSize = 3;
  const step = 1;

  for (let i = -gridSize; i <= gridSize; i += step) {
    const a = projectPoint([-gridSize, 0, i], state, w, h, dpr);
    const b = projectPoint([gridSize, 0, i], state, w, h, dpr);
    const c = projectPoint([i, 0, -gridSize], state, w, h, dpr);
    const d = projectPoint([i, 0, gridSize], state, w, h, dpr);

    const strong = i === 0;
    drawLine(ctx, a, b, [120, 170, 220], strong ? 0.26 : 0.11, strong ? 1.35 : 0.8);
    drawLine(ctx, c, d, [120, 170, 220], strong ? 0.26 : 0.11, strong ? 1.35 : 0.8);
  }

  const origin = projectPoint([0, 0, 0], state, w, h, dpr);
  const xAxis = projectPoint([3.2, 0, 0], state, w, h, dpr);
  const yAxis = projectPoint([0, -3.2, 0], state, w, h, dpr);
  const zAxis = projectPoint([0, 0, 3.2], state, w, h, dpr);

  drawLine(ctx, origin, xAxis, [0, 220, 255], 0.88, 2.2);
  drawLine(ctx, origin, yAxis, [255, 230, 0], 0.88, 2.2);
  drawLine(ctx, origin, zAxis, [255, 0, 220], 0.88, 2.2);

  ctx.save();
  ctx.font = Math.max(10, Math.floor(Math.min(w, h) * 0.022)) + "px ui-monospace, Menlo, Consolas, monospace";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  ctx.fillStyle = "rgba(0, 220, 255, 0.94)";
  ctx.fillText("X", xAxis.x, xAxis.y);

  ctx.fillStyle = "rgba(255, 230, 0, 0.94)";
  ctx.fillText("Y", yAxis.x, yAxis.y);

  ctx.fillStyle = "rgba(255, 0, 220, 0.94)";
  ctx.fillText("Z", zAxis.x, zAxis.y);

  ctx.restore();
}





// Generic layer panel rule:
// panel-specific IDs may remain, but panel structure and styling must use
// .layer-panel[data-layer-panel="name"] instead of per-panel CSS classes.

function syncLayerRangeOutput(sliderId) {
  const slider = document.getElementById(sliderId);
  if (!slider) return;

  const output = slider.closest(".layer-slider-row")?.querySelector("output");
  if (!output) return;

  output.value = slider.value;
  output.textContent = slider.value;
}

function syncLayerSwitchLabel(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const label = input.closest(".layer-switch")?.querySelector("span");
  if (!label) return;

  label.textContent = input.checked ? "ON" : "OFF";
}

function readChecked(id, fallback) {
  const el = document.getElementById(id);
  if (!el) return fallback;
  return Boolean(el.checked);
}

function readRange01(id, fallback) {
  const el = document.getElementById(id);
  if (!el) return fallback;

  const n = Number(el.value);
  if (!Number.isFinite(n)) return fallback;

  return clamp(n / 100, 0, 1);
}

function isG900OrientationLocked() {
  const el = document.getElementById("stage-grid-toggle");
  return Boolean(el && el.checked);
}

function syncG900PerspectiveControls() {
  const locked = isG900OrientationLocked();

  document.querySelectorAll("[data-view-mode]").forEach((btn) => {
    btn.disabled = locked;
    btn.setAttribute("aria-disabled", locked ? "true" : "false");
    btn.classList.toggle("stage-perspective-locked", locked);
  });

  const canvas = document.querySelector("canvas");
  if (canvas) {
    canvas.classList.toggle("stage-perspective-locked", locked);
  }

  document.body.classList.toggle("g900-perspective-locked", locked);
}

function readWindowSummary(name) {
  try {
    const value = window[name];
    if (!value || typeof value !== "object") return null;
    return JSON.parse(JSON.stringify(value));
  } catch (error) {
    return null;
  }
}

function buildG900ViewerStateObject(state) {
  const grammarVersion = document.documentElement.dataset.g900Grammar || "0.1";
  const kernelVersion = document.documentElement.dataset.g900Kernel || "0.1";
  const bodyVersion = activeStaticBody ? activeStaticBody.version : null;
  syncCarrierRenderState();

  return {
    schema: "g900.viewer.state",
    version: "0.1",
    export_ready: false,
    stage: "g900_full_body_observatory",
    kernel: {
      version: kernelVersion
    },
    grammar: {
      version: grammarVersion
    },
    timeline: {
      sheet: Math.floor(state.sheet),
      playing: Boolean(state.playing),
      sheets_per_second: Number(getSheetRate().toFixed(2))
    },
    camera: {
      yaw: Number(state.yaw.toFixed(6)),
      pitch: Number(state.pitch.toFixed(6)),
      roll: Number((state.roll || 0).toFixed(6)),
      zoom: Number(state.zoom.toFixed(6))
    },
    layers: {
      grid: {
        layer: 0,
        id: "grid",
        enabled: readChecked("stage-grid-toggle", true)
      },
      graph: {
        layer: 1,
        id: "graph",
        enabled: Boolean(activeStaticBody) && readChecked("graph-layer-toggle", true),
        body_version: bodyVersion,
        vertices_opacity: readRange01("graph-vertices-slider", 1),
        edges_opacity: readRange01("graph-edges-slider", 1)
      }
    },
    overlays: activeOverlayRegistry ? getG900OverlaySummary(activeOverlayRegistry) : null,
    carriers: activeCarrierRegistry ? getG900CarrierSummary(activeCarrierRegistry) : null,
    channels: activeChannelRegistry ? getG900ChannelSummary(activeChannelRegistry) : null,
    channel_scope: readWindowSummary("__g900ChannelScopeSummary"),
    timing_kernel: {
      scaled_oscillation: activeScaledOscillationKernel ? getG900ScaledOscillationSummary(activeScaledOscillationKernel) : null,
      runtime_oscillator: readWindowSummary("__g900RuntimeOscillatorSummary"),
      origin_time: readWindowSummary("__g900OriginTimeSummary")
    },
    apparatus_profile: readWindowSummary("__g900ApparatusProfileSummary"),
    orientation: readWindowSummary("__g900NullWellOrientationSummary"),
    render: {
      carriers: {
        version: carrierRenderState.version,
        visible: carrierRenderState.visible,
        family_mode: carrierRenderState.family_mode,
        family_label: carrierRenderState.family_label,
        rail_ids: carrierRenderState.rail_ids,
        mutates_body: false,
        physics_claim: false,
        motion_authority: false
      }
    },
    body: activeStaticBody ? {
      version: activeStaticBody.version,
      name: activeStaticBody.name,
      vertices: activeStaticBody.vertices.length,
      edges: activeStaticBody.edges.length,
      anchor: activeStaticBody.anchor,
      scale: activeStaticBody.scale,
      source: activeStaticBody.source || {}
    } : {
      status: "pending"
    }
  };
}

function syncG900ViewerStateConsole(state) {
  const el = document.getElementById("viewer-state-object");
  if (!el) return;

  el.textContent = JSON.stringify(buildG900ViewerStateObject(state), null, 2);
}



function graphLayerEnabled() {
  const el = document.getElementById("graph-layer-toggle");
  return !el || el.checked;
}

function graphLayerPercent(id, fallback) {
  const el = document.getElementById(id);
  if (!el) return fallback;

  const value = Number(el.value);
  if (!Number.isFinite(value)) return fallback;

  return Math.max(0, Math.min(1, value / 100));
}

function syncGraphLayerReadouts() {
  syncLayerSwitchLabel("graph-layer-toggle");
  syncLayerRangeOutput("graph-vertices-slider");
  syncLayerRangeOutput("graph-edges-slider");
}


function bindLayerControl(inputId, handler) {
  const el = document.getElementById(inputId);
  if (!el || el.dataset.bound === "1") return;

  el.dataset.bound = "1";
  el.addEventListener("input", handler);
}

function bindGraphLayerPanel() {
  syncGraphLayerReadouts();
  bindLayerControl("graph-layer-toggle", syncGraphLayerReadouts);
  bindLayerControl("graph-vertices-slider", syncGraphLayerReadouts);
  bindLayerControl("graph-edges-slider", syncGraphLayerReadouts);
}

async function loadStaticBodyReadout() {
  const line = document.getElementById("static-body-line");

  try {
    const response = await fetch("./data/g900_static_body.v1.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }

    activeStaticBody = readG900StaticBody(await response.json());
    try {
      activeOverlayRegistry = await readG900OverlayRegistry();
    } catch (error) {
      console.warn("G900 overlay registry unavailable", error);
      activeOverlayRegistry = null;
    }
    try {
      activeCarrierRegistry = await readG900CarrierRegistry();
    } catch (error) {
      console.warn("G900 carrier registry unavailable", error);
      activeCarrierRegistry = null;
    }
    try {
      activeChannelRegistry = await readG900ChannelRegistry();
    } catch (error) {
      console.warn("G900 channel registry unavailable", error);
      activeChannelRegistry = null;
    }
    try {
      activeScaledOscillationKernel = await readG900ScaledOscillationKernel();
    } catch (error) {
      console.warn("G900 scaled oscillation kernel unavailable", error);
      activeScaledOscillationKernel = null;
    }
    document.documentElement.dataset.g900StaticBody = activeStaticBody.version;

    if (line) {
      line.textContent = "BODY " + activeStaticBody.version + " | " + getStaticBodySummary(activeStaticBody);
    }

    console.info("[G900 static body]", activeStaticBody);
  } catch (error) {
    activeStaticBody = null;

    if (line) {
      line.textContent = "BODY load failed";
    }

    console.error("[G900 static body]", error);
  }
}


function findCarrierRailById(railId) {
  if (!activeCarrierRegistry || !Array.isArray(activeCarrierRegistry.carrier_sets)) {
    return null;
  }

  for (const carrierSet of activeCarrierRegistry.carrier_sets) {
    if (!carrierSet || !Array.isArray(carrierSet.rails)) continue;

    for (const rail of carrierSet.rails) {
      if (rail && rail.id === railId) {
        return rail;
      }
    }
  }

  return null;
}


function getG900CarrierModeDefinitions() {
  return {
    smoke: {
      label: "Smoke rail",
      description: "single source-provenance smoke rail",
      include: function (rail) {
        return rail && rail.status === "smoke_rail";
      }
    },
    slot_internal: {
      label: "Slot internal carriers",
      description: "fifteen admitted slot-internal carrier readings",
      include: function (rail) {
        return rail && rail.kind === "slot_internal_carrier";
      }
    },
    slot_pair_boundary: {
      label: "Slot-pair boundary carriers",
      description: "thirty admitted slot-pair boundary carrier readings",
      include: function (rail) {
        return rail && rail.kind === "slot_pair_boundary_carrier";
      }
    },
    six_nine_neighborhood: {
      label: "Six-nine neighborhood",
      description: "focused carrier reading around the six-nine receipt neighborhood",
      include: function (rail) {
        if (!rail || !rail.id) return false;
        return [
          "slot_06_internal_carrier",
          "slot_09_internal_carrier",
          "slot_pair_03_09_boundary_carrier",
          "slot_pair_06_12_boundary_carrier",
          "slot_pair_06_13_boundary_carrier",
          "slot_pair_09_11_boundary_carrier",
          "slot_pair_09_12_boundary_carrier"
        ].includes(rail.id);
      }
    },
    nearest_receipt_branch: {
      label: "Nearest receipt branch",
      description: "receipt-side branch around 03-09 and source-side 09-11 fork",
      include: function (rail) {
        if (!rail || !rail.id) return false;
        return [
          "slot_03_internal_carrier",
          "slot_09_internal_carrier",
          "slot_11_internal_carrier",
          "slot_12_internal_carrier",
          "slot_pair_03_09_boundary_carrier",
          "slot_pair_09_11_boundary_carrier",
          "slot_pair_09_12_boundary_carrier"
        ].includes(rail.id);
      }
    }
  };
}

function flattenG900CarrierRails(registry) {
  const rails = [];
  const sets = registry && Array.isArray(registry.carrier_sets) ? registry.carrier_sets : [];

  for (const set of sets) {
    const setRails = Array.isArray(set.rails) ? set.rails : [];
    for (const rail of setRails) {
      rails.push(rail);
    }
  }

  return rails;
}

function selectG900CarrierRailStack(registry, modeList) {
  const definitions = getG900CarrierModeDefinitions();
  const activeModes = normalizeCarrierRenderModes(modeList);
  const allRails = flattenG900CarrierRails(registry);
  const byId = new Map();
  const labels = [];
  const descriptions = [];

  activeModes.forEach((mode) => {
    const definition = definitions[mode];
    if (!definition) return;

    labels.push(definition.label);
    descriptions.push(definition.description);

    allRails.filter(definition.include).forEach((rail) => {
      if (rail && rail.id && !byId.has(rail.id)) {
        byId.set(rail.id, rail);
      }
    });
  });

  const rails = Array.from(byId.values());

  return {
    modes: activeModes,
    mode: activeModes.join("+"),
    label: labels.join(" + "),
    description: descriptions.join("; "),
    rails: rails,
    rail_ids: rails.map(function (rail) { return rail.id; })
  };
}

function syncCarrierRenderState() {
  syncLayerSwitchLabel("carrier-render-toggle");

  const toggle = document.getElementById("carrier-render-toggle");
  const body = document.getElementById("carrier-render-panel-body");
  const note = document.getElementById("carrier-render-note");
  const visible = Boolean(toggle && toggle.checked);

  if (body) body.hidden = !visible;

  const panel = document.querySelector('[data-layer-panel="carriers"]');
  if (panel) panel.classList.toggle("carrier-render-panel-open", visible);

  const selection = selectG900CarrierRailStack(activeCarrierRegistry, activeCarrierRenderModes);

  carrierRenderState.visible = visible;
  carrierRenderState.family_mode = selection.mode;
  carrierRenderState.family_modes = selection.modes.slice();
  carrierRenderState.family_label = selection.label;
  carrierRenderState.family_description = selection.description;
  carrierRenderState.rail_ids = selection.rail_ids;
  carrierRenderState.color_map = getG900CarrierModeColorMap(selection.modes);

  document.querySelectorAll("[data-carrier-render-mode]").forEach((btn) => {
    const active = selection.modes.includes(btn.dataset.carrierRenderMode);
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });

  if (note) {
    note.textContent = "Layer 2 carrier readings. Active stack: " + selection.label + ". Rendering only. Body unchanged.";
  }
}

function edgeIndexFromTupleEdgeId(edgeId) {
  const match = String(edgeId || "").match(/^tuple_edge_(\d+)$/);
  if (!match) return null;
  return Number(match[1]);
}

function getG900CarrierModeStroke(mode) {
  const strokes = {
    smoke: {
      rgb: [240, 200, 120],
      alpha: 0.52,
      width: 1.15
    },
    slot_internal: {
      rgb: [120, 185, 255],
      alpha: 0.46,
      width: 1.05
    },
    slot_pair_boundary: {
      rgb: [190, 150, 255],
      alpha: 0.42,
      width: 1.0
    },
    six_nine_neighborhood: {
      rgb: [120, 245, 170],
      alpha: 0.58,
      width: 1.35
    },
    nearest_receipt_branch: {
      rgb: [255, 145, 165],
      alpha: 0.6,
      width: 1.4
    }
  };

  return strokes[mode] || {
    rgb: [186, 222, 230],
    alpha: 0.38,
    width: 1.05
  };
}

function getG900CarrierModeColorMap(modeList) {
  const out = {};
  normalizeCarrierRenderModes(modeList).forEach((mode) => {
    const stroke = getG900CarrierModeStroke(mode);
    out[mode] = {
      rgb: stroke.rgb.slice(),
      alpha: stroke.alpha,
      width: stroke.width
    };
  });
  return out;
}

function drawCarrierRailReadings(ctx, w, h, dpr, state, body) {
  if (!carrierRenderState.visible || !body) return;

  const activeModes = normalizeCarrierRenderModes(
    Array.isArray(carrierRenderState.family_modes)
      ? carrierRenderState.family_modes
      : carrierRenderState.family_mode || "smoke"
  );

  const byId = new Map();

  for (const vertex of body.vertices) {
    if (!vertex || !Array.isArray(vertex.xyz)) continue;

    const point = [
      (body.anchor.xyz[0] + vertex.xyz[0]) * body.scale,
      (body.anchor.xyz[1] + vertex.xyz[1]) * body.scale,
      (body.anchor.xyz[2] + vertex.xyz[2]) * body.scale
    ];

    byId.set(vertex.id, projectPoint(point, state, w, h, dpr));
  }

  ctx.save();

  for (const mode of activeModes) {
    const stroke = getG900CarrierModeStroke(mode);
    const selection = selectG900CarrierRailStack(activeCarrierRegistry, [mode]);
    const drawnEdges = new Set();

    for (const railId of selection.rail_ids) {
      const rail = findCarrierRailById(railId);
      if (!rail || !Array.isArray(rail.edge_ids)) continue;

      for (const edgeId of rail.edge_ids) {
        if (drawnEdges.has(edgeId)) continue;
        drawnEdges.add(edgeId);

        const edgeIndex = edgeIndexFromTupleEdgeId(edgeId);
        if (edgeIndex === null) continue;

        const edge = body.edges[edgeIndex];
        if (!Array.isArray(edge) || edge.length !== 2) continue;

        const a = byId.get(edge[0]);
        const b = byId.get(edge[1]);
        if (!a || !b) continue;

        drawLine(ctx, a, b, stroke.rgb, stroke.alpha, stroke.width);
      }
    }
  }

  ctx.restore();
}

function bindCarrierRenderPanel() {
  syncCarrierRenderState();

  bindLayerControl("carrier-render-toggle", syncCarrierRenderState);

  document.querySelectorAll("[data-carrier-render-mode]").forEach((btn) => {
    if (btn.dataset.bound === "1") return;
    btn.dataset.bound = "1";

    btn.addEventListener("click", () => {
      const mode = btn.dataset.carrierRenderMode || "smoke";
      const set = new Set(activeCarrierRenderModes);

      if (set.has(mode)) {
        set.delete(mode);
      } else {
        set.add(mode);
      }

      activeCarrierRenderModes = normalizeCarrierRenderModes(Array.from(set));
      localStorage.setItem("g900.carrierRenderModes", JSON.stringify(activeCarrierRenderModes));
      syncCarrierRenderState();
    });
  });
}


function drawStaticBody(ctx, w, h, dpr, state, body) {
  if (!body || !graphLayerEnabled()) return;

  const vertexAlpha = graphLayerPercent("graph-vertices-slider", 0.72);
  const edgeAlpha = graphLayerPercent("graph-edges-slider", 0.18);

  const byId = new Map();

  for (const vertex of body.vertices) {
    const point = [
      (body.anchor.xyz[0] + vertex.xyz[0]) * body.scale,
      (body.anchor.xyz[1] + vertex.xyz[1]) * body.scale,
      (body.anchor.xyz[2] + vertex.xyz[2]) * body.scale
    ];

    byId.set(vertex.id, projectPoint(point, state, w, h, dpr));
  }

  ctx.save();

  for (const edge of body.edges) {
    const a = byId.get(edge[0]);
    const b = byId.get(edge[1]);
    if (!a || !b) continue;

    drawLine(ctx, a, b, [223, 195, 123], edgeAlpha, 0.65);
  }

  ctx.fillStyle = "rgba(237, 246, 255, " + vertexAlpha + ")";

  for (const point of byId.values()) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, Math.max(0.7, Math.min(w, h) * 0.0014), 0, TAU);
    ctx.fill();
  }

  ctx.restore();
}

function drawBlankStage(ctx, canvas, state) {
  const { w, h, dpr } = resizeCanvas(canvas);
  drawBackground(ctx, w, h);
  drawStageGrid(ctx, w, h, dpr, state);
  drawStaticBody(ctx, w, h, dpr, state, activeStaticBody);
  syncCarrierRenderState();
  drawCarrierRailReadings(ctx, w, h, dpr, state, activeStaticBody);

  ctx.save();
  ctx.textBaseline = "bottom";
  ctx.font = Math.max(10, Math.floor(Math.min(w, h) * 0.020)) + "px ui-monospace, Menlo, Consolas, monospace";

  ctx.fillStyle = "rgba(217, 184, 108, 0.84)";
  ctx.fillText(
    "Blank G900 stage | sheet " + Math.floor(state.sheet),
    18 * dpr,
    h - 28 * dpr
  );

  ctx.fillStyle = "rgba(160, 185, 210, 0.54)";
  ctx.fillText(
    "RATE " + getSheetRate().toFixed(2) +
      " | YAW " + state.yaw.toFixed(2) +
      " | PITCH " + state.pitch.toFixed(2) +
      " | Z " + state.zoom.toFixed(2) +
      " | DRAG YAW/PITCH / PINCH ZOOM",
    18 * dpr,
    h - 11 * dpr
  );

  ctx.restore();
}

function applyViewPreset(state, mode) {
  if (mode === "x") {
    state.yaw = Math.PI / 2;
    state.pitch = 0;
  } else if (mode === "y") {
    state.yaw = 0;
    state.pitch = -1.48;
  } else if (mode === "z") {
    state.yaw = 0;
    state.pitch = 0;
  } else if (mode === "iso" || mode === "iso45") {
    state.yaw = -Math.PI / 4;
    state.pitch = -0.78;
  }
}

function ensureSheetControls() {
  let slider = document.getElementById("sheet-rate-slider");

  if (!slider) {
    const canvas = document.getElementById("stage-canvas");
    const host = canvas ? canvas.parentElement : document.body;

    const controls = document.createElement("div");
    controls.className = "sheet-stepper-controls";
    controls.innerHTML = [
      '<div class="sheet-button-row">',
      '  <button id="step-back-btn" class="mini-transport-btn" type="button" aria-label="Step back one sheet"><<</button>',
      '  <button id="play-toggle" class="mini-transport-btn" type="button" aria-label="Play sheet clock">▶</button>',
      '  <button id="reset-stage-btn" class="mini-transport-btn" type="button" aria-label="Reset stage">↻</button>',
      '  <button id="step-forward-btn" class="mini-transport-btn" type="button" aria-label="Step forward one sheet">>></button>',
      '  <button class="mini-transport-btn" type="button" data-view-mode="axis" aria-label="Axis view">A</button>',
      '  <button class="mini-transport-btn" type="button" data-view-mode="ring" aria-label="Ring view">R</button>',
      '  <button class="mini-transport-btn" type="button" data-view-mode="shear" aria-label="Shear view">S</button>',
      '</div>',
      '<div class="sheet-rate-head">',
      '  <label for="sheet-rate-slider">Sheets/sec</label>',
      '  <span id="sheet-rate-readout">' + DEFAULT_SHEET_RATE.toFixed(2) + '</span>',
      '</div>',
      '<input id="sheet-rate-slider" type="range" min="0.25" max="960" step="0.25" value="' + DEFAULT_SHEET_RATE + '" />'
    ].join("");

    host.insertAdjacentElement("beforebegin", controls);
    slider = document.getElementById("sheet-rate-slider");
  }

  slider.min = "0.25";
  slider.max = "960";
  slider.step = "0.25";

  const savedRate = localStorage.getItem("g900.blankSheetRate");
  slider.value = savedRate !== null ? savedRate : String(DEFAULT_SHEET_RATE);

  syncSheetRateReadout();

  slider.addEventListener("input", () => {
    localStorage.setItem("g900.blankSheetRate", String(getSheetRate()));
    syncSheetRateReadout();
  });
}


function bindVisibleStateJsonDownload() {
  const link = document.getElementById("download-state-json");
  if (!link || link.dataset.bound === "1") return;

  link.dataset.bound = "1";

  link.addEventListener("click", () => {
    const pre = document.getElementById("viewer-state-object");
    const payload = pre ? pre.textContent : "{}";
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");

    link.href = "data:application/json;charset=utf-8," + encodeURIComponent(payload + "\n");
    link.download = "g900_viewer_state_" + stamp + ".json";
  });
}


function boot() {
  loadStaticBodyReadout();
  const canvas = document.getElementById("stage-canvas");
  if (!canvas) return;

  ensureSheetControls();
  bindGraphLayerPanel();
  bindCarrierRenderPanel();
  bindVisibleStateJsonDownload();

  const ctx = canvas.getContext("2d");

  const state = {
    sheet: 0,
    playing: false,
    yaw: 0.15,
    pitch: -0.58,
    roll: 0,
    zoom: Number(localStorage.getItem("g900.stageZoom") || "1") || 1,
    dragging: false,
    lastX: 0,
    lastY: 0,
    pinchDistance: 0,
    pinchZoom: 1
  };

  window.__g900BlankStage = state;

  const playBtn = document.getElementById("play-toggle");
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      state.playing = !state.playing;
      syncPlayButton(state);
    });
  }

  const stepBackBtn = document.getElementById("step-back-btn");
  if (stepBackBtn) {
    stepBackBtn.addEventListener("click", () => {
      state.playing = false;
      state.sheet = Math.max(0, state.sheet - 1);
      syncPlayButton(state);
      syncSheetCounter(state);
    });
  }

  const stepForwardBtn = document.getElementById("step-forward-btn");
  if (stepForwardBtn) {
    stepForwardBtn.addEventListener("click", () => {
      state.playing = false;
      state.sheet += 1;
      syncPlayButton(state);
      syncSheetCounter(state);
    });
  }

  const resetBtn = document.getElementById("reset-stage-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      state.playing = false;
      state.sheet = 0;
      syncSheetCounter(state);
      if (!isG900OrientationLocked()) {
        state.yaw = 0.15;
        state.pitch = -0.58;
      }
      state.zoom = 1;
      localStorage.setItem("g900.stageZoom", "1");
      syncPlayButton(state);
    });
  }

  document.querySelectorAll("[data-view-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (isG900OrientationLocked()) return;
      applyViewPreset(state, btn.dataset.viewMode);
    });
  });

  const orientationLockToggle = document.getElementById("stage-grid-toggle");
  if (orientationLockToggle) {
    orientationLockToggle.addEventListener("change", syncG900PerspectiveControls);
  }
  syncG900PerspectiveControls();

  canvas.addEventListener("pointerdown", (event) => {
    if (isG900OrientationLocked()) return;
    state.dragging = true;
    state.lastX = event.clientX;
    state.lastY = event.clientY;
    canvas.setPointerCapture(event.pointerId);
  });

  canvas.addEventListener("pointermove", (event) => {
    if (isG900OrientationLocked()) {
      state.dragging = false;
      return;
    }
    if (!state.dragging) return;

    const dx = event.clientX - state.lastX;
    const dy = event.clientY - state.lastY;

    state.yaw += dx * 0.010;
    state.pitch = clamp(state.pitch + dy * 0.0065, -1.48, 1.48);

    state.lastX = event.clientX;
    state.lastY = event.clientY;
  });

  canvas.addEventListener("pointerup", (event) => {
    state.dragging = false;
    try {
      canvas.releasePointerCapture(event.pointerId);
    } catch (err) {}
  });

  canvas.addEventListener("wheel", (event) => {
    event.preventDefault();

    const next = state.zoom * Math.exp(-event.deltaY * 0.001);
    state.zoom = clamp(next, MIN_ZOOM, MAX_ZOOM);
    localStorage.setItem("g900.stageZoom", String(state.zoom));
  }, { passive: false });

  canvas.addEventListener("touchstart", (event) => {
    if (event.touches.length === 2) {
      const a = event.touches[0];
      const b = event.touches[1];
      state.pinchDistance = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      state.pinchZoom = state.zoom;
    }
  }, { passive: true });

  canvas.addEventListener("touchmove", (event) => {
    if (event.touches.length === 2 && state.pinchDistance > 0) {
      const a = event.touches[0];
      const b = event.touches[1];
      const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      state.zoom = clamp(state.pinchZoom * dist / state.pinchDistance, MIN_ZOOM, MAX_ZOOM);
      localStorage.setItem("g900.stageZoom", String(state.zoom));
    }
  }, { passive: true });

  syncPlayButton(state);
  syncSheetCounter(state);

  let last = performance.now();

  function loop(now) {
    const dt = Math.max(0, (now - last) / 1000);
    last = now;

    if (state.playing) {
      state.sheet += dt * getSheetRate();
    }

    syncSheetCounter(state);
    drawBlankStage(ctx, canvas, state);
    syncG900ViewerStateConsole(state);
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
