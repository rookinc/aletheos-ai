import { readG900StaticBody, getStaticBodySummary } from "./kernel/g900_static_body.js";
import { readG900OverlayRegistry, getG900OverlaySummary } from "./kernel/g900_overlays.js";
import { readG900CarrierRegistry, getG900CarrierSummary } from "./kernel/g900_carriers.js";
import { readG900ChannelRegistry, getG900ChannelSummary } from "./kernel/g900_channels.js";
import { readG900ScaledOscillationKernel, getG900ScaledOscillationSummary } from "./kernel/g900_scaled_oscillation.js";
import { readG900GroundedLensRegistry, getG900GroundedLensSummary } from "./kernel/g900_grounded_lenses.js";
const TAU = Math.PI * 2;
const DEFAULT_SHEET_RATE = 333;
const TIMING_SAMPLE_RATE_PRESETS = [120, 240, 480, 960];
const PITCH_ROLL_SHEETS_PER_TURN = 900;
const MIN_ZOOM = 0.28;
const MAX_ZOOM = 64.0;
const FIRST_CARRIER_RAIL_ID = "root_0_0_tuple_shell_depth_2";
const ADMITTED_INFORMATION_TRANSPORT_URL = "./data/g900_admitted_information_transports.v0.1.json";
const ADMITTED_PERMISSION_CHANNEL_URL = "./data/g900_admitted_permission_channels.v0.1.json";
const FALLBACK_INFORMATION_FLOW_EDGE_IDS = ["tuple_edge_611", "tuple_edge_2425", "tuple_edge_1472", "tuple_edge_1475"];
const INFORMATION_FLOW_SHEETS_PER_SEGMENT = 72;
const INFORMATION_FLOW_TRAIL_COUNT = 9;

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
    const value = select ? select.value : "slot_internal";
  return Object.prototype.hasOwnProperty.call(CARRIER_RENDER_FAMILIES, value) ? value : "slot_internal";
}

function getCarrierRailIdsForFamily(familyMode) {
  if (!activeCarrierRegistry || !Array.isArray(activeCarrierRegistry.carrier_sets)) {
    return [];
  }

  const family = CARRIER_RENDER_FAMILIES[familyMode] || CARRIER_RENDER_FAMILIES.slot_internal;
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
let activeGroundedLensRegistry = null;
let activeAdmittedInformationTransportRegistry = null;
let activeAdmittedPermissionChannelRegistry = null;
let informationFlowState = {
  version: "0.1",
  visible: true,
  mode: "return_cell_pulse",
  transport_id: "g900_return_cell_one_step_information_transport_007",
  permission_channel_id: "g900_return_cell_permission_channel_005",
  edge_ids: FALLBACK_INFORMATION_FLOW_EDGE_IDS.slice(),
  active_edge_id: null,
  phase: 0,
  trail_count: INFORMATION_FLOW_TRAIL_COUNT,
  mutates_body: false,
  physics_claim: false,
  physical_transport_claim: false,
  source_law_promoted: false
};
const CARRIER_RENDER_MODE_IDS = ["slot_internal", "slot_pair_boundary", "six_nine_neighborhood", "nearest_receipt_branch"];

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

  if (!Array.isArray(raw)) raw = ["slot_internal"];

  const seen = new Set();
  const cleaned = [];

  raw.forEach((mode) => {
    if (CARRIER_RENDER_MODE_IDS.includes(mode) && !seen.has(mode)) {
      seen.add(mode);
      cleaned.push(mode);
    }
  });

  return cleaned.length ? cleaned : ["slot_internal"];
}

let activeCarrierRenderModes = normalizeCarrierRenderModes(
  localStorage.getItem("g900.carrierRenderModes") ||
  localStorage.getItem("g900.carrierRenderMode") ||
  "slot_internal"
);
let carrierRenderState = {
  version: "0.1",
  visible: false,
  family_mode: "slot_internal",
  family_label: "Slot internal carriers",
  rail_ids: [],
  mutates_body: false,
  physics_claim: false,
  motion_authority: false
};


function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function wrapAngleRadians(value) {
  if (!Number.isFinite(value)) return 0;
  return ((((value + Math.PI) % TAU) + TAU) % TAU) - Math.PI;
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
  const slider = document.getElementById("sheet-rate-slider") || document.getElementById("g900-timing-sheet-rate-slider");
  if (!slider) return DEFAULT_SHEET_RATE;

  const value = Number(slider.value);
  return Number.isFinite(value) ? clamp(value, 0.25, 960) : DEFAULT_SHEET_RATE;
}

function syncSheetRateReadout() {
  const rate = getSheetRate();
  const formatted = rate.toFixed(2);

  const readout = document.getElementById("sheet-rate-readout");
  if (readout) readout.textContent = formatted;

  const timingReadout = document.getElementById("g900-timing-sample-rate-readout");
  if (timingReadout) timingReadout.textContent = formatted;

  const timingPill = document.getElementById("g900-timing-sample-rate-pill");
  if (timingPill) timingPill.textContent = formatted + " sheets/sec";

  syncTimingPresetButtons(rate);
}

function syncTimingPresetButtons(rate) {
  document.querySelectorAll("[data-g900-rate-preset]").forEach((button) => {
    const preset = Number(button.dataset.g900RatePreset);
    button.classList.toggle("is-active", Number.isFinite(preset) && Math.abs(preset - rate) < 0.01);
  });
}

function syncTimingPanelState(state) {
  const status = document.getElementById("g900-timing-animation-status");
  if (status && state) {
    status.textContent = state.playing ? "Running" : "Paused";
    status.classList.toggle("is-running", Boolean(state.playing));
  }
}

function setG900SheetRate(value) {
  const next = clamp(Number(value), 0.25, 960);
  const normalized = Number.isFinite(next) ? next : DEFAULT_SHEET_RATE;
  const valueText = String(normalized);
  const mainSlider = document.getElementById("sheet-rate-slider");
  const timingSlider = document.getElementById("g900-timing-sheet-rate-slider");

  if (mainSlider) mainSlider.value = valueText;
  if (timingSlider) timingSlider.value = valueText;

  localStorage.setItem("g900.blankSheetRate", valueText);
  syncSheetRateReadout();
}

function syncSheetCounter(state) {
  const readout = document.getElementById("sheet-counter-readout");
  if (readout) readout.textContent = "Sheet " + Math.floor(state.sheet);

  const timingSheet = document.getElementById("g900-timing-sheet-readout");
  if (timingSheet) timingSheet.textContent = "Sheet " + Math.floor(state.sheet);
}

function readCameraPitchEnabledPreference() {
  const saved = localStorage.getItem("g900.cameraPitchEnabled");
  if (saved === null) return null;
  return saved === "true";
}

function writeCameraPitchEnabledPreference(enabled) {
  localStorage.setItem("g900.cameraPitchEnabled", enabled ? "true" : "false");
}

function isCameraPitchEnabled(state) {
  return Boolean(state && state.pitchRollEnabled !== false);
}

function syncCameraPitchButton(state) {
  const button = document.getElementById("camera-pitch-toggle");
  if (!button) return;

  const enabled = isCameraPitchEnabled(state);
  button.classList.toggle("is-active", enabled);
  button.setAttribute("aria-pressed", enabled ? "true" : "false");
  button.title = enabled ? "Camera pitch motion on" : "Camera pitch motion off";
  button.textContent = "CAM";
}

function setCameraPitchEnabled(state, enabled) {
  if (!state) return;

  state.pitchRollEnabled = Boolean(enabled);
  writeCameraPitchEnabledPreference(state.pitchRollEnabled);
  syncCameraPitchButton(state);
  syncG900ViewerStateConsole(state);
}

function syncStageControlDeckLayout() {
  const cameraButton = document.getElementById("camera-pitch-toggle");
  if (!cameraButton || !cameraButton.parentElement) return;

  cameraButton.parentElement.classList.add(
    "g900-stage-control-deck",
    "g900-camera-layout-compact"
  );
}

function syncPlayButton(state) {
  const playBtn = document.getElementById("play-toggle");
  if (playBtn) {
    playBtn.textContent = state.playing ? "PAUSE" : "PLAY";
  }
  syncTimingPanelState(state);
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

async function fetchG900Json(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("HTTP " + response.status + " for " + url);
  }
  return response.json();
}

function validateG900AdmittedInformationTransportRegistry(payload) {
  if (!payload || payload.schema !== "g900.admitted_information_transports") {
    throw new Error("unexpected admitted information transport registry schema");
  }
  if (payload.admitted_information_transport_count !== 1) {
    throw new Error("expected exactly one admitted information transport");
  }
  if (!payload.boundary || payload.boundary.physical_transport_claim !== false || payload.boundary.mutates_body !== false) {
    throw new Error("information transport registry boundary mismatch");
  }
  return payload;
}

function validateG900AdmittedPermissionChannelRegistry(payload) {
  if (!payload || payload.schema !== "g900.admitted_permission_channels") {
    throw new Error("unexpected admitted permission channel registry schema");
  }
  if (payload.admitted_permission_channel_count !== 1) {
    throw new Error("expected exactly one admitted permission channel");
  }
  if (!payload.boundary || payload.boundary.mutates_body !== false || payload.boundary.force_claim !== false || payload.boundary.physics_claim !== false) {
    throw new Error("permission channel registry boundary mismatch");
  }
  return payload;
}

function getAdmittedReturnCellTransport() {
  const registry = activeAdmittedInformationTransportRegistry;
  const rows = registry && Array.isArray(registry.transports) ? registry.transports : [];
  return rows.find((row) => row && row.id === "g900_return_cell_one_step_information_transport_007") || rows[0] || null;
}

function getAdmittedReturnCellPermissionChannel() {
  const registry = activeAdmittedPermissionChannelRegistry;
  const rows = registry && Array.isArray(registry.channels) ? registry.channels : [];
  return rows.find((row) => row && row.id === "g900_return_cell_permission_channel_005") || rows[0] || null;
}

function getInformationFlowEdgeIds() {
  const channel = getAdmittedReturnCellPermissionChannel();
  if (channel && Array.isArray(channel.q_edge_ids) && channel.q_edge_ids.length) {
    return channel.q_edge_ids.slice();
  }
  return FALLBACK_INFORMATION_FLOW_EDGE_IDS.slice();
}

function readInformationFlowEdgesAlpha() {
  return readRange01("information-flow-edges-alpha-slider", 0.22);
}

function readInformationFlowTracersAlpha() {
  return readRange01("information-flow-tracers-alpha-slider", 0.58);
}

function readInformationFlowStylusAlpha() {
  return readRange01("information-flow-stylus-alpha-slider", 0.96);
}

function readInformationFlowTracerSmear() {
  return Math.round(readRange01("information-flow-tracer-smear-slider", 0.50) * 100);
}

function readInformationFlowTracerSpacing() {
  const smear = readInformationFlowTracerSmear();
  return 0.30 - 0.0024 * smear;
}

function syncInformationFlowAlphaReadouts() {
  syncLayerRangeOutput("information-flow-edges-alpha-slider");
  syncLayerRangeOutput("information-flow-tracers-alpha-slider");
  syncLayerRangeOutput("information-flow-tracer-smear-slider");
  syncLayerRangeOutput("information-flow-stylus-alpha-slider");
}

function readG900ForceCandidateStubState() {
  const visible = readChecked("force-candidates-toggle", false);
  const claimStatus = "candidate_only_not_physical_claim";
  const candidates = [
    {
      id: "gravity_information_candidate",
      label: "Gravity",
      grammar: "compression_information",
      physical_claim_candidate: "gravity_force_information_candidate",
      claim_status: claimStatus
    },
    {
      id: "em_information_candidate",
      label: "EM",
      grammar: "polarization_information",
      physical_claim_candidate: "electromagnetic_force_information_candidate",
      claim_status: claimStatus
    },
    {
      id: "strong_information_candidate",
      label: "Strong",
      grammar: "confinement_information",
      physical_claim_candidate: "strong_force_information_candidate",
      claim_status: claimStatus
    },
    {
      id: "weak_information_candidate",
      label: "Weak",
      grammar: "transformation_information",
      physical_claim_candidate: "weak_force_information_candidate",
      claim_status: claimStatus
    }
  ];

  return {
    schema: "g900.viewer.force_candidates",
    version: "0.1",
    status: "force_candidate_stub_declared",
    visible: Boolean(visible),
    render_stub_only: true,
    renders_force_information: false,
    candidate_count: candidates.length,
    candidates,
    quartz_tied: true,
    quartz_driven: false,
    sheet_dependent: false,
    physical_claim_candidate_only: true,
    force_claim: false,
    physics_claim: false,
    physical_transport_claim: false,
    energy_flow_claim: false,
    body_mutation: false,
    new_transport_admission: false,
    keeper: "Force becomes a candidate information grammar first, not a physical force simulation yet."
  };
}

function syncForceCandidateStubState() {
  syncLayerSwitchLabel("force-candidates-toggle");
  window.__g900ForceCandidateSummary = readG900ForceCandidateStubState();
  if (typeof syncG900RenderContractsLedger === "function") {
    syncG900RenderContractsLedger();
  }
}

function bindForceCandidateStubPanel() {
  bindLayerControl("force-candidates-toggle", syncForceCandidateStubState);
  syncForceCandidateStubState();
}

function readG900RenderContractsLedger() {
  const sheetRate = typeof getSheetRate === "function" ? getSheetRate() : 240;
  const cameraPitchEnabled = typeof isCameraPitchEnabled === "function"
    ? isCameraPitchEnabled(window.__g900BlankStage || {})
    : false;
  const informationVisible = readChecked("information-flow-toggle", true);
  const bodyVisible = readChecked("graph-layer-toggle", true);

  const candidateOnly = "candidate_only_not_physical_claim";

  const entries = [
    {
      id: "body_graph",
      label: "G900 body graph",
      render_surface: "canvas",
      visible: Boolean(bodyVisible),
      clock_relation: "fixed_body_reference_under_clocked_view",
      quartz_tied: true,
      quartz_driven: false,
      sheet_dependent: false,
      physical_claim_candidate: "finite_geometry_candidate",
      claim_status: candidateOnly,
      mutates_body: false,
      physics_claim: false
    },
    {
      id: "carrier_render",
      label: "Carrier render",
      render_surface: "canvas",
      visible: readChecked("carrier-render-toggle", false),
      clock_relation: "static_source_provenance_reading",
      quartz_tied: true,
      quartz_driven: false,
      sheet_dependent: false,
      physical_claim_candidate: "source_provenance_candidate",
      claim_status: candidateOnly,
      mutates_body: false,
      physics_claim: false
    },
    {
      id: "return_cell_preview",
      label: "Return-cell preview",
      render_surface: "canvas",
      visible: Boolean(readReturnCellChannelPreviewState().visible),
      clock_relation: "static_permission_candidate_reading",
      quartz_tied: true,
      quartz_driven: false,
      sheet_dependent: false,
      physical_claim_candidate: "permission_boundary_candidate",
      claim_status: candidateOnly,
      mutates_body: false,
      physics_claim: false
    },
    {
      id: "force_candidate_stub",
      label: "Force candidate stub",
      render_surface: "panel",
      visible: readChecked("force-candidates-toggle", false),
      clock_relation: "static_force_information_candidate_registry",
      quartz_tied: true,
      quartz_driven: false,
      sheet_dependent: false,
      physical_claim_candidate: "finite_force_information_candidate_family",
      claim_status: candidateOnly,
      render_stub_only: true,
      renders_force_information: false,
      mutates_body: false,
      physics_claim: false
    },
    {
      id: "information_route_edges",
      label: "Information route edges",
      render_surface: "canvas",
      visible: Boolean(informationVisible),
      clock_relation: "route_support_for_sheet_indexed_information_motion",
      quartz_tied: true,
      quartz_driven: true,
      sheet_dependent: false,
      alpha: Number(readInformationFlowEdgesAlpha().toFixed(3)),
      physical_claim_candidate: "finite_information_path_candidate",
      claim_status: candidateOnly,
      mutates_body: false,
      physics_claim: false
    },
    {
      id: "information_tracers",
      label: "Information tracers",
      render_surface: "canvas",
      visible: Boolean(informationVisible),
      clock_relation: "sheet_indexed_memory_trace",
      quartz_tied: true,
      quartz_driven: true,
      sheet_dependent: true,
      alpha: Number(readInformationFlowTracersAlpha().toFixed(3)),
      tracer_smear: readInformationFlowTracerSmear(),
      tracer_spacing: Number(readInformationFlowTracerSpacing().toFixed(4)),
      physical_claim_candidate: "finite_memory_trace_candidate",
      claim_status: candidateOnly,
      mutates_body: false,
      physics_claim: false
    },
    {
      id: "information_stylus",
      label: "Information stylus",
      render_surface: "canvas",
      visible: Boolean(informationVisible),
      clock_relation: "sheet_indexed_present_tick",
      quartz_tied: true,
      quartz_driven: true,
      sheet_dependent: true,
      alpha: Number(readInformationFlowStylusAlpha().toFixed(3)),
      physical_claim_candidate: "finite_present_tick_candidate",
      claim_status: candidateOnly,
      mutates_body: false,
      physics_claim: false
    },
    {
      id: "camera_pitch",
      label: "Camera pitch",
      render_surface: "camera",
      visible: true,
      enabled: Boolean(cameraPitchEnabled),
      clock_relation: cameraPitchEnabled ? "sheet_indexed_camera_motion" : "disabled_static_view",
      quartz_tied: true,
      quartz_driven: Boolean(cameraPitchEnabled),
      sheet_dependent: Boolean(cameraPitchEnabled),
      physical_claim_candidate: "apparatus_motion_candidate",
      claim_status: candidateOnly,
      mutates_body: false,
      physics_claim: false
    },
    {
      id: "grounded_af_lens",
      label: "A/F grounded lens",
      render_surface: "canvas",
      visible: readChecked("grounded-lens-toggle", false),
      clock_relation: "static_reference_frame_reading",
      quartz_tied: true,
      quartz_driven: false,
      sheet_dependent: false,
      physical_claim_candidate: "reference_frame_candidate",
      claim_status: candidateOnly,
      mutates_body: false,
      physics_claim: false
    },
    {
      id: "timing_panel",
      label: "Timing panel",
      render_surface: "panel",
      visible: true,
      clock_relation: "quartz_runtime_boundary",
      quartz_tied: true,
      quartz_driven: true,
      sheet_dependent: false,
      physical_claim_candidate: "clock_boundary_candidate",
      claim_status: candidateOnly,
      mutates_body: false,
      physics_claim: false
    }
  ];

  return {
    schema: "g900.viewer.render_contracts",
    version: "0.1",
    status: "render_contracts_candidate_projection_ledger",
    clock_source: "scaled_quartz_timing_substrate",
    clock_boundary: "runtime_clock_not_source_law",
    all_rendered_surfaces_quartz_bound: true,
    quartz_driven_subset_only: true,
    state_variable: "sheet",
    sheets_per_second: Number(sheetRate),
    rule: "Every rendered surface is bound to the quartz runtime apparatus; moving surfaces are quartz-driven and sheet-indexed; every physical projection remains candidate-only.",
    physical_claim_candidate_only: true,
    physics_claim: false,
    force_claim: false,
    body_mutation: false,
    new_transport_admission: false,
    render_entry_count: entries.length,
    entries
  };
}

function syncG900RenderContractsLedger() {
  window.__g900RenderContractsLedger = readG900RenderContractsLedger();
}

function syncInformationFlowPanelReadouts() {
  const transport = getAdmittedReturnCellTransport();
  const edgeIds = getInformationFlowEdgeIds();
  syncInformationFlowAlphaReadouts();

  const transportReadout = document.getElementById("information-flow-transport-readout");
  if (transportReadout) {
    transportReadout.textContent = transport ? transport.id : informationFlowState.transport_id;
  }

  const pulseReadout = document.getElementById("information-flow-pulse-readout");
  if (pulseReadout) {
    const edgeText = informationFlowState.active_edge_id || (edgeIds.length ? edgeIds[0] : "waiting");
    pulseReadout.textContent = edgeText + " / " + edgeIds.length + " edges";
  }

  const note = document.getElementById("information-flow-note");
  if (note) {
    note.textContent = "Simulated information pulse over the admitted finite transport. Body unchanged. Not physical transport.";
  }
}

function syncInformationFlowState() {
  const toggle = document.getElementById("information-flow-toggle");
  const transport = getAdmittedReturnCellTransport();
  const channel = getAdmittedReturnCellPermissionChannel();
  const edgeIds = getInformationFlowEdgeIds();

  informationFlowState.visible = toggle ? Boolean(toggle.checked) : true;
  informationFlowState.transport_id = transport ? transport.id : "g900_return_cell_one_step_information_transport_007";
  informationFlowState.permission_channel_id = channel ? channel.id : "g900_return_cell_permission_channel_005";
  informationFlowState.edge_ids = edgeIds;
  informationFlowState.edges_alpha = Number(readInformationFlowEdgesAlpha().toFixed(3));
  informationFlowState.tracers_alpha = Number(readInformationFlowTracersAlpha().toFixed(3));
  informationFlowState.tracer_smear = readInformationFlowTracerSmear();
  informationFlowState.tracer_spacing = Number(readInformationFlowTracerSpacing().toFixed(4));
  informationFlowState.stylus_alpha = Number(readInformationFlowStylusAlpha().toFixed(3));
  informationFlowState.mutates_body = false;
  informationFlowState.physics_claim = false;
  informationFlowState.physical_transport_claim = false;
  informationFlowState.source_law_promoted = false;

  syncInformationFlowPanelReadouts();
  syncG900RenderContractsLedger();
  window.__g900InformationFlowSummary = {
    version: informationFlowState.version,
    visible: Boolean(informationFlowState.visible),
    mode: informationFlowState.mode,
    transport_id: informationFlowState.transport_id,
    permission_channel_id: informationFlowState.permission_channel_id,
    edge_ids: informationFlowState.edge_ids.slice(),
    active_edge_id: informationFlowState.active_edge_id,
    phase: Number((informationFlowState.phase || 0).toFixed(4)),
    trail_count: informationFlowState.trail_count,
    edges_alpha: informationFlowState.edges_alpha,
    tracers_alpha: informationFlowState.tracers_alpha,
    tracer_smear: informationFlowState.tracer_smear,
    tracer_spacing: informationFlowState.tracer_spacing,
    stylus_alpha: informationFlowState.stylus_alpha,
    simulated_information_motion: true,
    uses_admitted_information_transport: Boolean(transport),
    uses_admitted_permission_channel: Boolean(channel),
    mutates_body: false,
    adds_vertices: false,
    adds_edges: false,
    source_law_promoted: false,
    physical_transport_claim: false,
    physical_flux_claim: false,
    energy_flow_claim: false,
    force_claim: false,
    physics_claim: false
  };
}

async function loadG900InformationMotionRegistries() {
  try {
    activeAdmittedInformationTransportRegistry = validateG900AdmittedInformationTransportRegistry(
      await fetchG900Json(ADMITTED_INFORMATION_TRANSPORT_URL)
    );
  } catch (error) {
    console.warn("G900 admitted information transport registry unavailable", error);
    activeAdmittedInformationTransportRegistry = null;
  }

  try {
    activeAdmittedPermissionChannelRegistry = validateG900AdmittedPermissionChannelRegistry(
      await fetchG900Json(ADMITTED_PERMISSION_CHANNEL_URL)
    );
  } catch (error) {
    console.warn("G900 admitted permission channel registry unavailable", error);
    activeAdmittedPermissionChannelRegistry = null;
  }

  syncInformationFlowState();
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

function drawAFGroundedLensOverlay(ctx, w, h, dpr, state, body) {
  if (readActiveGroundedLensId() !== "a_grounded_f_return_lens") return;
  if (!body || !Array.isArray(body.vertices)) return;

  const anchorIds = ["12:23", "12:24"];
  const anchorVertices = anchorIds.map((id) => body.vertices.find((vertex) => vertex && vertex.id === id));
  if (!anchorVertices[0] || !anchorVertices[1]) return;

  const a = projectPoint(anchorVertices[0].xyz, state, w, h, dpr);
  const f = projectPoint(anchorVertices[1].xyz, state, w, h, dpr);
  const center = projectPoint([0, 0, 0], state, w, h, dpr);

  const dx = f.x - a.x;
  const dy = f.y - a.y;
  const dist = Math.max(1, Math.hypot(dx, dy));
  const tx = dx / dist;
  const ty = dy / dist;

  const mid = {
    x: (a.x + f.x) * 0.5,
    y: (a.y + f.y) * 0.5,
  };

  let ox = mid.x - center.x;
  let oy = mid.y - center.y;
  let od = Math.hypot(ox, oy);

  if (od < 1) {
    ox = -ty;
    oy = tx;
    od = 1;
  }

  ox /= od;
  oy /= od;

  const longLift = Math.max(125 * dpr, Math.min(w, h) * 0.34);
  const tangentSpread = Math.max(55 * dpr, Math.min(w, h) * 0.16);

  const c1 = {
    x: f.x + tx * tangentSpread + ox * longLift,
    y: f.y + ty * tangentSpread + oy * longLift,
  };

  const c2 = {
    x: a.x - tx * tangentSpread + ox * longLift,
    y: a.y - ty * tangentSpread + oy * longLift,
  };

  const labelLift = Math.max(34 * dpr, Math.min(w, h) * 0.075);

  const aLabel = {
    x: a.x + ox * labelLift - tx * 24 * dpr,
    y: a.y + oy * labelLift - ty * 24 * dpr,
  };

  const fLabel = {
    x: f.x + ox * labelLift + tx * 24 * dpr,
    y: f.y + oy * labelLift + ty * 24 * dpr,
  };

  const rA = Math.max(4.2 * dpr, Math.min(w, h) * 0.010);
  const rF = Math.max(3.6 * dpr, Math.min(w, h) * 0.008);

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.strokeStyle = "rgba(255, 230, 175, 0.22)";
  ctx.lineWidth = Math.max(7 * dpr, Math.min(w, h) * 0.015);
  ctx.beginPath();
  ctx.moveTo(f.x, f.y);
  ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, a.x, a.y);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 188, 118, 0.82)";
  ctx.lineWidth = Math.max(1.5 * dpr, Math.min(w, h) * 0.003);
  ctx.beginPath();
  ctx.moveTo(f.x, f.y);
  ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, a.x, a.y);
  ctx.stroke();

  ctx.strokeStyle = "rgba(223, 195, 123, 0.60)";
  ctx.lineWidth = Math.max(1.1 * dpr, Math.min(w, h) * 0.002);
  ctx.setLineDash([5 * dpr, 5 * dpr]);
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(f.x, f.y);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "rgba(255, 230, 175, 0.96)";
  ctx.beginPath();
  ctx.arc(a.x, a.y, rA, 0, TAU);
  ctx.fill();

  ctx.fillStyle = "rgba(255, 148, 112, 0.94)";
  ctx.beginPath();
  ctx.arc(f.x, f.y, rF, 0, TAU);
  ctx.fill();

  ctx.font = Math.max(10 * dpr, Math.floor(Math.min(w, h) * 0.022)) + "px ui-monospace, Menlo, Consolas, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillStyle = "rgba(6, 14, 22, 0.92)";
  ctx.fillText("A", a.x, a.y);
  ctx.fillText("F", f.x, f.y);

  ctx.font = Math.max(8 * dpr, Math.floor(Math.min(w, h) * 0.014)) + "px ui-monospace, Menlo, Consolas, monospace";
  ctx.fillStyle = "rgba(255, 230, 175, 0.82)";
  ctx.fillText("A GROUND 12:23", aLabel.x, aLabel.y);

  ctx.fillStyle = "rgba(255, 170, 135, 0.76)";
  ctx.fillText("F RETURN 12:24", fLabel.x, fLabel.y);

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

function readActiveGroundedLensId() {
  const toggle = document.getElementById("grounded-lens-toggle");
  return toggle && toggle.checked ? "a_grounded_f_return_lens" : null;
}

function readReturnCellChannelPreviewState() {
  const toggle = document.getElementById("channel-scope-panel-toggle");
  const activeButton = document.querySelector("[data-channel-scope-mode].is-active");
  const scopeMode = activeButton ? activeButton.dataset.channelScopeMode : "no_admitted_channels";
  const visible = Boolean(toggle && toggle.checked && scopeMode === "return_cell_question");

  return {
    visible: visible,
    scope_mode: scopeMode,
    render_kind: visible ? "return_cell_candidate_channel_preview" : null,
    candidate_id: visible ? "return_cell_03_09_09_12_06_12_06_13" : null,
    candidate_receipt: visible ? "g900_return_cell_channel_1bed7a7cba65a7be" : null,
    admitted_channel_count: 0,
    channel_count: 0,
    admitted_now: false,
    renders_admitted_channel: false,
    mutates_body: false,
    adds_vertices: false,
    adds_edges: false,
    transport_relation_claim: false,
    force_claim: false,
    physics_claim: false
  };
}

function findBodyVertex(body, id) {
  if (!body || !Array.isArray(body.vertices)) return null;
  return body.vertices.find(function (vertex) {
    return vertex && vertex.id === id && Array.isArray(vertex.xyz);
  }) || null;
}

function drawInformationPulseOnSegment(ctx, a, b, t, alpha, radius, dpr) {
  const x = a.x + (b.x - a.x) * t;
  const y = a.y + (b.y - a.y) * t;

  ctx.save();
  ctx.shadowColor = "rgba(100, 255, 205, " + Math.min(0.9, alpha) + ")";
  ctx.shadowBlur = Math.max(8 * dpr, radius * 3.4);
  ctx.fillStyle = "rgba(102, 255, 202, " + alpha + ")";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, TAU);
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(235, 255, 248, " + Math.min(0.92, alpha + 0.18) + ")";
  ctx.lineWidth = Math.max(0.8 * dpr, radius * 0.22);
  ctx.beginPath();
  ctx.arc(x, y, radius * 1.45, 0, TAU);
  ctx.stroke();
  ctx.restore();
}

function getProjectedInformationFlowSegments(body, state, w, h, dpr) {
  const edgeIds = getInformationFlowEdgeIds();
  const segments = [];

  if (!body || !Array.isArray(body.edges) || !Array.isArray(body.vertices)) return segments;

  const byId = new Map();
  for (const vertex of body.vertices) {
    if (!vertex || !Array.isArray(vertex.xyz)) continue;
    byId.set(vertex.id, vertex);
  }

  edgeIds.forEach((edgeId) => {
    const index = edgeIndexFromTupleEdgeId(edgeId);
    if (index === null || index < 0 || index >= body.edges.length) return;

    const edge = body.edges[index];
    if (!Array.isArray(edge) || edge.length < 2) return;

    const av = byId.get(edge[0]);
    const bv = byId.get(edge[1]);
    if (!av || !bv) return;

    const a = projectPoint([
      (body.anchor.xyz[0] + av.xyz[0]) * body.scale,
      (body.anchor.xyz[1] + av.xyz[1]) * body.scale,
      (body.anchor.xyz[2] + av.xyz[2]) * body.scale
    ], state, w, h, dpr);

    const b = projectPoint([
      (body.anchor.xyz[0] + bv.xyz[0]) * body.scale,
      (body.anchor.xyz[1] + bv.xyz[1]) * body.scale,
      (body.anchor.xyz[2] + bv.xyz[2]) * body.scale
    ], state, w, h, dpr);

    segments.push({
      edge_id: edgeId,
      edge_index: index,
      from_vertex: edge[0],
      to_vertex: edge[1],
      a,
      b
    });
  });

  return segments;
}

function drawInformationFlowPulse(ctx, w, h, dpr, state, body) {
  syncInformationFlowState();

  if (!informationFlowState.visible) return;
  const segments = getProjectedInformationFlowSegments(body, state, w, h, dpr);
  if (!segments.length) return;

  const rawPhase = (state.sheet / INFORMATION_FLOW_SHEETS_PER_SEGMENT) % segments.length;
  const phase = ((rawPhase % segments.length) + segments.length) % segments.length;
  const activeIndex = Math.floor(phase);
  const activeT = phase - activeIndex;
  const activeSegment = segments[activeIndex];

  informationFlowState.phase = phase;
  informationFlowState.active_edge_id = activeSegment ? activeSegment.edge_id : null;

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const edgeAlpha = readInformationFlowEdgesAlpha();
  const tracerAlpha = readInformationFlowTracersAlpha();
  const stylusAlpha = readInformationFlowStylusAlpha();
  const tracerScale = tracerAlpha / 0.58;
  const tracerSpacing = readInformationFlowTracerSpacing();

  segments.forEach((segment) => {
    drawLine(ctx, segment.a, segment.b, [102, 255, 202], edgeAlpha, Math.max(2.2 * dpr, Math.min(w, h) * 0.0042));
    drawLine(ctx, segment.a, segment.b, [235, 255, 248], Math.min(0.95, edgeAlpha + 0.13), Math.max(0.8 * dpr, Math.min(w, h) * 0.0014));
  });

  for (let i = INFORMATION_FLOW_TRAIL_COUNT - 1; i >= 0; i -= 1) {
    const trailPhase = phase - i * tracerSpacing;
    const wrapped = ((trailPhase % segments.length) + segments.length) % segments.length;
    const segmentIndex = Math.floor(wrapped);
    const t = wrapped - segmentIndex;
    const segment = segments[segmentIndex];
    if (!segment) continue;

    const memoryAge = i / INFORMATION_FLOW_TRAIL_COUNT;
    const memoryNearness = 1 - memoryAge;
    const alpha = Math.min(0.98, (0.10 + memoryNearness * 0.48) * tracerScale);
    const radius = Math.max(1.8 * dpr, Math.min(w, h) * (0.0034 + 0.00038 * memoryNearness * INFORMATION_FLOW_TRAIL_COUNT));
    drawInformationPulseOnSegment(ctx, segment.a, segment.b, t, alpha, radius, dpr);
  }

  if (activeSegment) {
    drawInformationPulseOnSegment(
      ctx,
      activeSegment.a,
      activeSegment.b,
      activeT,
      stylusAlpha,
      Math.max(4.4 * dpr, Math.min(w, h) * 0.0092),
      dpr
    );
  }

  const labelSegment = activeSegment || segments[0];
  const lx = (labelSegment.a.x + labelSegment.b.x) * 0.5;
  const ly = (labelSegment.a.y + labelSegment.b.y) * 0.5 - Math.max(18 * dpr, Math.min(w, h) * 0.032);

  ctx.font = Math.max(8 * dpr, Math.floor(Math.min(w, h) * 0.013)) + "px ui-monospace, Menlo, Consolas, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(207, 255, 237, 0.86)";
  // Information pulse label hidden by g900-hide-information-pulse-label-001.

  ctx.restore();

  syncInformationFlowPanelReadouts();
  syncInformationFlowState();
}

function drawReturnCellChannelPreview(ctx, w, h, dpr, state, body) {
  const preview = readReturnCellChannelPreviewState();
  if (!preview.visible || !body || !Array.isArray(body.vertices)) return;

  const pairs = [
    ["3:23", "9:23"],
    ["9:24", "12:24"],
    ["6:23", "12:23"],
    ["6:24", "13:24"]
  ];

  const projectedPairs = [];

  pairs.forEach(function (pair) {
    const a = findBodyVertex(body, pair[0]);
    const b = findBodyVertex(body, pair[1]);
    if (!a || !b) return;

    projectedPairs.push({
      ids: pair,
      from: projectPoint(a.xyz, state, w, h, dpr),
      to: projectPoint(b.xyz, state, w, h, dpr)
    });
  });

  if (!projectedPairs.length) return;

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  projectedPairs.forEach(function (edge) {
    const ax = edge.from.x;
    const ay = edge.from.y;
    const bx = edge.to.x;
    const by = edge.to.y;
    const mx = (ax + bx) * 0.5;
    const my = (ay + by) * 0.5;
    const dx = bx - ax;
    const dy = by - ay;
    const len = Math.max(1, Math.hypot(dx, dy));
    const nx = -dy / len;
    const ny = dx / len;
    const lift = Math.max(18 * dpr, Math.min(w, h) * 0.032);

    const c1x = mx + nx * lift;
    const c1y = my + ny * lift;

    ctx.strokeStyle = "rgba(115, 255, 190, 0.20)";
    ctx.lineWidth = Math.max(8 * dpr, Math.min(w, h) * 0.014);
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.quadraticCurveTo(c1x, c1y, bx, by);
    ctx.stroke();

    ctx.strokeStyle = "rgba(118, 241, 176, 0.88)";
    ctx.lineWidth = Math.max(1.6 * dpr, Math.min(w, h) * 0.0032);
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.quadraticCurveTo(c1x, c1y, bx, by);
    ctx.stroke();

    ctx.fillStyle = "rgba(118, 241, 176, 0.95)";
    ctx.beginPath();
    ctx.arc(ax, ay, Math.max(2.8 * dpr, Math.min(w, h) * 0.0055), 0, TAU);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(bx, by, Math.max(2.8 * dpr, Math.min(w, h) * 0.0055), 0, TAU);
    ctx.fill();
  });

  ctx.font = Math.max(8 * dpr, Math.floor(Math.min(w, h) * 0.013)) + "px ui-monospace, Menlo, Consolas, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(190, 255, 225, 0.82)";

  const first = projectedPairs[0];
  if (first) {
    const lx = (first.from.x + first.to.x) * 0.5;
    const ly = (first.from.y + first.to.y) * 0.5 - Math.max(18 * dpr, Math.min(w, h) * 0.035);
    // Return-cell channel preview label hidden by g900-hide-return-cell-label-001.
  }

  ctx.restore();
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
      zoom: Number(state.zoom.toFixed(6)),
      pitch_roll_enabled: isCameraPitchEnabled(state),
      pitch_roll_sheets_per_turn: PITCH_ROLL_SHEETS_PER_TURN
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
        vertices_size_multiplier: Number((graphVertexSizeMultiplier(readRange01("graph-vertices-slider", 1)) * graphVertexZoomMultiplier(window.__g900BlankStage)).toFixed(3)),
        vertices_slider_size_multiplier: Number(graphVertexSizeMultiplier(readRange01("graph-vertices-slider", 1)).toFixed(3)),
        vertices_zoom_multiplier: Number(graphVertexZoomMultiplier(window.__g900BlankStage).toFixed(3)),
        edges_opacity: readRange01("graph-edges-slider", 1)
      }
    },
    overlays: activeOverlayRegistry ? getG900OverlaySummary(activeOverlayRegistry) : null,
    carriers: activeCarrierRegistry ? getG900CarrierSummary(activeCarrierRegistry) : null,
    channels: activeChannelRegistry ? getG900ChannelSummary(activeChannelRegistry) : null,
    grounded_lens: activeGroundedLensRegistry ? getG900GroundedLensSummary(activeGroundedLensRegistry, readActiveGroundedLensId()) : null,
    carrier_render: readWindowSummary("__g900CarrierRenderSummary"),
    channel_scope: readWindowSummary("__g900ChannelScopeSummary"),
    channel_preview: readReturnCellChannelPreviewState(),
    information_flow: readWindowSummary("__g900InformationFlowSummary"),
    force_candidates: readG900ForceCandidateStubState(),
    render_contracts: readWindowSummary("__g900RenderContractsLedger"),
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
      },
      information_flow: readWindowSummary("__g900InformationFlowSummary")
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
  const toggle = document.getElementById("graph-layer-toggle");
  if (!toggle) return true;
  return Boolean(toggle.checked);
}

function graphLayerPercent(id, fallback) {
  const el = document.getElementById(id);
  if (!el) return fallback;

  const value = Number(el.value);
  if (!Number.isFinite(value)) return fallback;

  return Math.max(0, Math.min(1, value / 100));
}

function graphVertexSizeMultiplier(vertexAlpha) {
  const growth = clamp((vertexAlpha - 0.5) / 0.5, 0, 1);
  return 1 + growth;
}

function graphVertexZoomMultiplier(state) {
  const zoom = state && Number.isFinite(Number(state.zoom)) ? Number(state.zoom) : 1;
  return Math.max(0.25, zoom);
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
    try {
      activeGroundedLensRegistry = await readG900GroundedLensRegistry();
    } catch (error) {
      console.warn("G900 grounded lens registry unavailable", error);
      activeGroundedLensRegistry = null;
    }
    await loadG900InformationMotionRegistries();
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
  const note = document.getElementById("carrier-render-note");
  const visible = Boolean(toggle && toggle.checked);

  const panel = document.querySelector('[data-activity-panel="carriers"]') || document.querySelector('[data-layer-panel="carriers"]');
  if (panel) {
    panel.classList.toggle("is-render-active", visible);
    panel.classList.toggle("carrier-render-panel-open", visible);
  }

  const selection = selectG900CarrierRailStack(activeCarrierRegistry, activeCarrierRenderModes);

  carrierRenderState.visible = visible;
  carrierRenderState.family_mode = selection.mode;
  carrierRenderState.family_modes = selection.modes.slice();
  carrierRenderState.family_label = selection.label;
  carrierRenderState.family_description = selection.description;
  carrierRenderState.rail_ids = selection.rail_ids;
  carrierRenderState.alpha = Number(readCarrierAlpha().toFixed(3));
  carrierRenderState.color_map = getG900CarrierModeColorMap(selection.modes);

  syncCarrierAlphaReadout();
  syncCarrierRenderLegend();
  publishCarrierRenderSummary();

  if (typeof syncG900RenderSwitchLabel === "function") {
    syncG900RenderSwitchLabel("carrier-render-toggle");
  }

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

function readCarrierAlpha() {
  return readRange01("carrier-alpha-slider", 0.58);
}

function syncCarrierAlphaReadout() {
  const slider = document.getElementById("carrier-alpha-slider");
  const out = document.getElementById("carrier-alpha-readout");
  if (!slider || !out) return;
  out.textContent = slider.value;
}

function brightenRgb(rgb, amount) {
  return rgb.map((value) => Math.min(255, Math.round(value + (255 - value) * amount)));
}

function compositeCarrierStrokes(modes) {
  const activeModes = normalizeCarrierRenderModes(modes);
  const strokes = activeModes.map(getG900CarrierModeStroke);
  const n = Math.max(1, strokes.length);

  const rgb = [0, 0, 0];
  for (const stroke of strokes) {
    rgb[0] += stroke.rgb[0];
    rgb[1] += stroke.rgb[1];
    rgb[2] += stroke.rgb[2];
  }

  const averaged = rgb.map((value) => Math.round(value / n));
  const brightened = n > 1 ? brightenRgb(averaged, Math.min(0.34, 0.10 * (n - 1))) : averaged;

  return {
    rgb: brightened,
    mode_count: n,
    width: Math.min(2.15, 0.82 + 0.22 * n)
  };
}

function buildCarrierEdgeProfiles() {
  const profiles = new Map();

  if (!carrierRenderState.visible || !activeCarrierRegistry) {
    return profiles;
  }

  const activeModes = normalizeCarrierRenderModes(
    Array.isArray(carrierRenderState.family_modes)
      ? carrierRenderState.family_modes
      : carrierRenderState.family_mode || "slot_internal"
  );

  for (const mode of activeModes) {
    const selection = selectG900CarrierRailStack(activeCarrierRegistry, [mode]);

    for (const railId of selection.rail_ids) {
      const rail = findCarrierRailById(railId);
      if (!rail || !Array.isArray(rail.edge_ids)) continue;

      for (const edgeId of rail.edge_ids) {
        let profile = profiles.get(edgeId);
        if (!profile) {
          profile = {
            edge_id: edgeId,
            modes: [],
            rails: []
          };
          profiles.set(edgeId, profile);
        }

        if (!profile.modes.includes(mode)) profile.modes.push(mode);
        if (!profile.rails.includes(railId)) profile.rails.push(railId);
      }
    }
  }

  return profiles;
}

function summarizeCarrierEdgeProfiles(profiles) {
  const modeCounts = {};
  let overlapEdgeCount = 0;

  for (const profile of profiles.values()) {
    if (profile.modes.length > 1) overlapEdgeCount += 1;

    for (const mode of profile.modes) {
      modeCounts[mode] = (modeCounts[mode] || 0) + 1;
    }
  }

  return {
    edge_profile_count: profiles.size,
    overlap_edge_count: overlapEdgeCount,
    mode_edge_counts: modeCounts,
    alpha: Number(readCarrierAlpha().toFixed(3)),
    mutates_body: false,
    render_assignment_only: true
  };
}

function buildCarrierRenderSummary() {
  return {
    visible: Boolean(carrierRenderState.visible),
    family_modes: Array.isArray(carrierRenderState.family_modes)
      ? carrierRenderState.family_modes.slice()
      : [],
    family_mode: carrierRenderState.family_mode || "",
    family_label: carrierRenderState.family_label || "",
    rail_ids: Array.isArray(carrierRenderState.rail_ids)
      ? carrierRenderState.rail_ids.slice()
      : [],
    alpha: Number(readCarrierAlpha().toFixed(3)),
    color_map: carrierRenderState.color_map || {},
    edge_profiles: carrierRenderState.edge_profiles || {
      edge_profile_count: 0,
      overlap_edge_count: 0,
      mode_edge_counts: {},
      alpha: Number(readCarrierAlpha().toFixed(3)),
      mutates_body: false,
      render_assignment_only: true
    },
    render_model: "white_base_body_plus_carrier_tint",
    mutates_body: false,
    channel_ready_profile_surface: true
  };
}

function publishCarrierRenderSummary() {
  if (typeof window === "undefined") return;
  window.__g900CarrierRenderSummary = buildCarrierRenderSummary();
}

function syncCarrierRenderLegend() {
  const legend = document.getElementById("carrier-render-legend");
  if (!legend) return;

  const summary = carrierRenderState.edge_profiles || {};
  const edgeCount = summary.edge_profile_count || 0;
  const overlapCount = summary.overlap_edge_count || 0;

  legend.dataset.edgeProfileCount = String(edgeCount);
  legend.dataset.overlapEdgeCount = String(overlapCount);
  legend.title = "Carrier edge profiles: " + edgeCount + "; overlap edges: " + overlapCount;
}

function drawCarrierRailReadings(_ctx, _w, _h, _dpr, _state, _body) {
  // Carrier readings are now assigned to existing body-edge render profiles
  // inside drawStaticBody. This compatibility stub intentionally draws no overlay.
}

function bindCarrierRenderPanel() {
  syncCarrierRenderState();

  bindLayerControl("carrier-render-toggle", syncCarrierRenderState);
  bindLayerControl("carrier-alpha-slider", syncCarrierRenderState);

  document.querySelectorAll("[data-carrier-render-mode]").forEach((btn) => {
    if (btn.dataset.bound === "1") return;
    btn.dataset.bound = "1";

    btn.addEventListener("click", () => {
      const mode = btn.dataset.carrierRenderMode || "slot_internal";
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
  if (!body) return;

  const graphVisible = graphLayerEnabled();
  const carrierVisible = Boolean(carrierRenderState.visible);
  if (!graphVisible && !carrierVisible) return;

  const vertexAlpha = graphLayerPercent("graph-vertices-slider", 0.72);
  const edgeAlpha = graphLayerPercent("graph-edges-slider", 0.18);
  const carrierAlpha = readCarrierAlpha();
  const carrierProfiles = buildCarrierEdgeProfiles();

  carrierRenderState.edge_profiles = summarizeCarrierEdgeProfiles(carrierProfiles);
  syncCarrierRenderLegend();
  publishCarrierRenderSummary();

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

  // Base body pass. Graph edges are ordinary body visibility, not carrier tint.
  if (graphVisible) {
    for (const edge of body.edges) {
      const a = byId.get(edge[0]);
      const b = byId.get(edge[1]);
      if (!a || !b) continue;

      drawLine(ctx, a, b, [237, 246, 255], edgeAlpha, 0.65);
    }
  }

  // Carrier tint pass. Carrier alpha controls only this contribution.
  if (carrierVisible && carrierAlpha > 0) {
    body.edges.forEach((edge, index) => {
      const a = byId.get(edge[0]);
      const b = byId.get(edge[1]);
      if (!a || !b) return;

      const edgeId = "tuple_edge_" + String(index).padStart(4, "0");
      const profile = carrierProfiles.get(edgeId);
      if (!profile) return;

      const composite = compositeCarrierStrokes(profile.modes);
      const alpha = Math.min(0.95, carrierAlpha * (0.82 + 0.10 * (composite.mode_count - 1)));

      drawLine(ctx, a, b, composite.rgb, alpha, composite.width);
    });
  }

  // Base vertex pass. Vertices stay white and are controlled by the graph layer.
  if (graphVisible) {
    const baseVertexRadius = Math.max(0.7, Math.min(w, h) * 0.0014);
    const vertexRadius = baseVertexRadius * graphVertexSizeMultiplier(vertexAlpha) * graphVertexZoomMultiplier(state);

    ctx.fillStyle = "rgba(237, 246, 255, " + vertexAlpha + ")";

    for (const point of byId.values()) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, vertexRadius, 0, TAU);
      ctx.fill();
    }
  }

  ctx.restore();
}

function drawBlankStage(ctx, canvas, state) {
  const { w, h, dpr } = resizeCanvas(canvas);
  drawBackground(ctx, w, h);
  drawStageGrid(ctx, w, h, dpr, state);
  syncCarrierRenderState();
  drawStaticBody(ctx, w, h, dpr, state, activeStaticBody);
  drawReturnCellChannelPreview(ctx, w, h, dpr, state, activeStaticBody);
  drawInformationFlowPulse(ctx, w, h, dpr, state, activeStaticBody);
  drawAFGroundedLensOverlay(ctx, w, h, dpr, state, activeStaticBody);

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
      " | PLAY PITCH ROLL / DRAG YAW/PITCH / PINCH ZOOM",
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
      '  <button id="play-toggle" class="mini-transport-btn" type="button" aria-label="Play sheet clock" data-control-wide="play">PLAY</button>',
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

  const timingSlider = document.getElementById("g900-timing-sheet-rate-slider");
  if (timingSlider) {
    timingSlider.min = "0.25";
    timingSlider.max = "960";
    timingSlider.step = "0.25";
  }

  const savedRate = localStorage.getItem("g900.blankSheetRate");
  setG900SheetRate(savedRate !== null ? savedRate : DEFAULT_SHEET_RATE);

  slider.addEventListener("input", () => {
    setG900SheetRate(slider.value);
  });

  if (timingSlider && timingSlider.dataset.bound !== "1") {
    timingSlider.dataset.bound = "1";
    timingSlider.addEventListener("input", () => {
      setG900SheetRate(timingSlider.value);
    });
  }

  document.querySelectorAll("[data-g900-rate-preset]").forEach((button) => {
    if (button.dataset.bound === "1") return;
    button.dataset.bound = "1";
    button.addEventListener("click", () => {
      setG900SheetRate(button.dataset.g900RatePreset);
    });
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
  bindForceCandidateStubPanel();

  bindLayerControl("information-flow-toggle", syncInformationFlowState);
  bindLayerControl("information-flow-edges-alpha-slider", syncInformationFlowState);
  bindLayerControl("information-flow-tracers-alpha-slider", syncInformationFlowState);
  bindLayerControl("information-flow-tracer-smear-slider", syncInformationFlowState);
  bindLayerControl("information-flow-stylus-alpha-slider", syncInformationFlowState);
  syncInformationFlowState();
  bindVisibleStateJsonDownload();

  const ctx = canvas.getContext("2d");

  const state = {
    sheet: 0,
    playing: false,
    yaw: 0.15,
    pitch: -0.58,
    roll: 0,
    zoom: Number(localStorage.getItem("g900.stageZoom") || "1") || 1,
    pitchRollEnabled: true,
    dragging: false,
    lastX: 0,
    lastY: 0,
    pinchDistance: 0,
    pinchZoom: 1
  };

  window.__g900BlankStage = state;
  const savedCameraPitchEnabled = readCameraPitchEnabledPreference();
  if (savedCameraPitchEnabled !== null) {
    state.pitchRollEnabled = savedCameraPitchEnabled;
  }
  syncTimingPanelState(state);
  syncCameraPitchButton(state);
  syncStageControlDeckLayout();

  const cameraPitchBtn = document.getElementById("camera-pitch-toggle");
  if (cameraPitchBtn) {
    cameraPitchBtn.addEventListener("click", () => {
      setCameraPitchEnabled(state, !isCameraPitchEnabled(state));
    });
  }

  const playBtn = document.getElementById("play-toggle");
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      state.playing = !state.playing;
      syncPlayButton(state);
      syncG900ViewerStateConsole(state);
    });
  }

  const timingPauseBtn = document.getElementById("timing-pause-btn");
  if (timingPauseBtn) {
    timingPauseBtn.addEventListener("click", () => {
      state.playing = false;
      syncPlayButton(state);
      syncG900ViewerStateConsole(state);
    });
  }

  const stepBackBtn = document.getElementById("step-back-btn");
  if (stepBackBtn) {
    stepBackBtn.addEventListener("click", () => {
      state.playing = false;
      state.sheet = Math.max(0, state.sheet - 1);
      syncPlayButton(state);
      syncSheetCounter(state);
      syncG900ViewerStateConsole(state);
    });
  }

  const stepForwardBtn = document.getElementById("step-forward-btn");
  if (stepForwardBtn) {
    stepForwardBtn.addEventListener("click", () => {
      state.playing = false;
      state.sheet += 1;
      syncPlayButton(state);
      syncSheetCounter(state);
      syncG900ViewerStateConsole(state);
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
    state.pitch = wrapAngleRadians(state.pitch + dy * 0.0065);

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
      const sheetDelta = dt * getSheetRate();
      state.sheet += sheetDelta;
      if (isCameraPitchEnabled(state)) {
        state.pitch = wrapAngleRadians(state.pitch + sheetDelta * (TAU / PITCH_ROLL_SHEETS_PER_TURN));
      }
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



function ensureStageGraphToolbar() {
  const legacyToolbar = document.getElementById("stage-bottom-toolbar");
  if (legacyToolbar) {
    legacyToolbar.remove();
  }

  bindLayerControl("graph-layer-toggle", syncGraphLayerReadouts);
  bindLayerControl("graph-vertices-slider", syncGraphLayerReadouts);
  bindLayerControl("graph-edges-slider", syncGraphLayerReadouts);
  syncGraphLayerReadouts();
}

function syncG900RenderSwitchLabel(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const label = input.closest("label");
  const span = label ? label.querySelector("span:last-child") : null;
  if (span) span.textContent = input.checked ? "ON" : "OFF";

  const panelId = input.dataset.renderToggle;
  if (panelId) {
    const panel = document.querySelector('[data-activity-panel="' + panelId + '"]');
    if (panel) panel.classList.toggle("is-render-active", Boolean(input.checked));
  }
}

function setG900PanelBodyCollapsed(panelId, collapsed) {
  const body = document.querySelector('[data-panel-body="' + panelId + '"]');
  if (body) body.hidden = Boolean(collapsed);

  const title = document.querySelector('[data-panel-title-toggle="' + panelId + '"]');
  if (title) title.setAttribute("aria-expanded", collapsed ? "false" : "true");

  const panel = document.querySelector('[data-activity-panel="' + panelId + '"]');
  if (panel) panel.classList.toggle("is-panel-collapsed", Boolean(collapsed));

  localStorage.setItem("g900.panelCollapsed." + panelId, collapsed ? "1" : "0");
}

function initialG900PanelCollapsed(panelId) {
  const saved = localStorage.getItem("g900.panelCollapsed." + panelId);
  if (saved === "1") return true;
  if (saved === "0") return false;
  return true;
}

function applyG900PanelDefaultMigration() {
  const key = "g900.panelDefaults.version";
  const version = "state-closed-001";

  if (localStorage.getItem(key) === version) return;

  localStorage.setItem(key, version);
}

function bindG900ActivityPanelControls() {
  ensureStageGraphToolbar();
  applyG900PanelDefaultMigration();

  ["body", "carriers", "channels", "force-candidates", "information-flow", "grounded-lens", "timing"].forEach((panelId) => {
    setG900PanelBodyCollapsed(panelId, initialG900PanelCollapsed(panelId));
  });

  document.querySelectorAll("[data-panel-title-toggle]").forEach((title) => {
    if (title.dataset.activityBound === "1") return;
    title.dataset.activityBound = "1";

    const panelId = title.dataset.panelTitleToggle;

    const activate = () => {
      const body = document.querySelector('[data-panel-body="' + panelId + '"]');
      const nextCollapsed = body ? !body.hidden : false;
      setG900PanelBodyCollapsed(panelId, nextCollapsed);
    };

    title.addEventListener("click", activate);
    title.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      activate();
    });
  });

  document.querySelectorAll("[data-render-toggle]").forEach((input) => {
    if (input.dataset.activitySwitchBound === "1") return;
    input.dataset.activitySwitchBound = "1";
    syncG900RenderSwitchLabel(input.id);
    input.addEventListener("change", () => {
      syncG900RenderSwitchLabel(input.id);
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bindG900ActivityPanelControls);
} else {
  bindG900ActivityPanelControls();
}

