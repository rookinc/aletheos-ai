import { readG900MarkerRegistry } from "./g900_markers.js";

const BODY_URL = "./data/g900_static_body.v1.json";
const CHANNELS_URL = "./data/g900_channels.v0.1.json";
const RECEIPT_URL = "./artifacts/json/g900_unsupported_phase_marker_6_9_001.v1.json";

const TAU = Math.PI * 2;

const state = {
  yaw: 0.15,
  pitch: -0.58,
  zoom: 4.4,
  markerVisible: true,
  dragging: false,
  lastX: 0,
  lastY: 0,
  body: null,
  registry: null,
  channels: null,
  receipt: null
};

const canvas = document.getElementById("marker-debug-canvas");
const ctx = canvas.getContext("2d");

function setText(id, value) {
  const node = document.getElementById(id);
  if (node) node.textContent = String(value);
}

async function readJson(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(url + " failed: " + response.status);
  }
  return response.json();
}

function edgeIndexFromTupleEdgeId(edgeId) {
  const match = String(edgeId || "").match(/^tuple_edge_(\d+)$/);
  if (!match) return null;
  return Number(match[1]);
}

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(1, Math.round(rect.width * dpr));
  const h = Math.max(1, Math.round(rect.height * dpr));

  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }

  return { w, h, dpr };
}

function projectPoint(xyz, w, h) {
  const cy = Math.cos(state.yaw);
  const sy = Math.sin(state.yaw);
  const cp = Math.cos(state.pitch);
  const sp = Math.sin(state.pitch);

  const x0 = xyz[0];
  const y0 = xyz[1];
  const z0 = xyz[2];

  const x1 = x0 * cy - z0 * sy;
  const z1 = x0 * sy + z0 * cy;
  const y1 = y0 * cp - z1 * sp;
  const z2 = y0 * sp + z1 * cp;

  const perspective = 1 / Math.max(0.25, 1 + z2 * 0.05);
  const scale = Math.min(w, h) * 0.115 * state.zoom * perspective;

  return {
    x: w * 0.5 + x1 * scale,
    y: h * 0.5 + y1 * scale,
    z: z2
  };
}

function drawLine(a, b, rgba, width) {
  ctx.strokeStyle = rgba;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}

function draw() {
  const { w, h, dpr } = resizeCanvas();

  ctx.clearRect(0, 0, w, h);

  const grad = ctx.createRadialGradient(w * 0.5, h * 0.35, 1, w * 0.5, h * 0.5, Math.max(w, h) * 0.62);
  grad.addColorStop(0, "rgba(45, 82, 118, 0.34)");
  grad.addColorStop(1, "rgba(3, 7, 12, 1)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  if (!state.body) return;

  const body = state.body;
  const byId = new Map();

  for (const vertex of body.vertices) {
    const point = [
      (body.anchor.xyz[0] + vertex.xyz[0]) * body.scale,
      (body.anchor.xyz[1] + vertex.xyz[1]) * body.scale,
      (body.anchor.xyz[2] + vertex.xyz[2]) * body.scale
    ];
    byId.set(vertex.id, projectPoint(point, w, h));
  }

  ctx.save();

  for (const edge of body.edges) {
    const a = byId.get(edge[0]);
    const b = byId.get(edge[1]);
    if (!a || !b) continue;
    drawLine(a, b, "rgba(223, 195, 123, 0.055)", Math.max(0.65, 0.7 * dpr));
  }

  const marker = state.registry?.marker_sets?.[0]?.markers?.[0];
  if (state.markerVisible && marker) {
    for (const edgeId of marker.edge_ids) {
      const idx = edgeIndexFromTupleEdgeId(edgeId);
      if (idx === null) continue;

      const edge = body.edges[idx];
      if (!Array.isArray(edge) || edge.length !== 2) continue;

      const a = byId.get(edge[0]);
      const b = byId.get(edge[1]);
      if (!a || !b) continue;

      drawLine(a, b, "rgba(255, 210, 122, 0.94)", Math.max(1.7, 2.2 * dpr));
    }
  }

  for (const vertex of body.vertices) {
    const p = byId.get(vertex.id);
    if (!p) continue;

    ctx.fillStyle = "rgba(235, 246, 255, 0.22)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, Math.max(0.65, Math.min(w, h) * 0.0012), 0, TAU);
    ctx.fill();
  }

  ctx.restore();
}

function updateStatus() {
  const marker = state.registry?.marker_sets?.[0]?.markers?.[0];

  setText("debug-status", state.markerVisible ? "Marker visible" : "Marker hidden");
  setText("debug-body-vertices", state.body?.vertices?.length ?? "-");
  setText("debug-body-edges", state.body?.edges?.length ?? "-");
  setText("debug-marker-edges", marker?.edge_ids?.length ?? "-");
  setText("debug-marker-vertices", marker?.vertex_ids?.length ?? "-");
  setText("debug-channel-count", state.channels?.channel_count ?? "-");

  const toggle = document.getElementById("debug-toggle");
  if (toggle) toggle.textContent = state.markerVisible ? "Hide marker" : "Show marker";
}

async function init() {
  state.body = await readJson(BODY_URL);
  state.channels = await readJson(CHANNELS_URL);
  state.receipt = await readJson(RECEIPT_URL);
  state.registry = await readG900MarkerRegistry("./data/g900_markers.v0.1.json");

  const marker = state.registry.marker_sets[0].markers[0];

  if (state.channels.channel_count !== 0) {
    throw new Error("channel registry is not zero");
  }
  if (state.receipt.audit_pass !== true) {
    throw new Error("marker receipt audit did not pass");
  }
  if (marker.id !== "unsupported_phase_step_6_9") {
    throw new Error("unexpected marker id");
  }
  if (marker.edge_ids.length !== 60) {
    throw new Error("expected 60 marker edges");
  }
  if (marker.vertex_ids.length !== 120) {
    throw new Error("expected 120 marker vertices");
  }

  updateStatus();
  draw();
}

document.getElementById("debug-toggle")?.addEventListener("click", () => {
  state.markerVisible = !state.markerVisible;
  updateStatus();
  draw();
});

document.getElementById("debug-reset")?.addEventListener("click", () => {
  state.yaw = 0.15;
  state.pitch = -0.58;
  state.zoom = 4.4;
  draw();
});

canvas.addEventListener("pointerdown", (event) => {
  state.dragging = true;
  state.lastX = event.clientX;
  state.lastY = event.clientY;
  canvas.setPointerCapture(event.pointerId);
});

canvas.addEventListener("pointermove", (event) => {
  if (!state.dragging) return;

  const dx = event.clientX - state.lastX;
  const dy = event.clientY - state.lastY;
  state.lastX = event.clientX;
  state.lastY = event.clientY;

  state.yaw += dx * 0.01;
  state.pitch = Math.max(-1.35, Math.min(1.35, state.pitch + dy * 0.01));

  draw();
});

canvas.addEventListener("pointerup", (event) => {
  state.dragging = false;
  canvas.releasePointerCapture(event.pointerId);
});

canvas.addEventListener("wheel", (event) => {
  event.preventDefault();
  const delta = event.deltaY > 0 ? -0.25 : 0.25;
  state.zoom = Math.max(1.2, Math.min(8, state.zoom + delta));
  draw();
}, { passive: false });

window.addEventListener("resize", draw);

init().catch((error) => {
  console.error(error);
  setText("debug-status", "Failed");
});
