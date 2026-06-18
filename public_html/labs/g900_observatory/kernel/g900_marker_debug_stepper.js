const BODY_URL = new URL("../data/g900_static_body.v1.json", import.meta.url);
const MARKERS_URL = new URL("../data/g900_markers.v0.1.json", import.meta.url);
const AUDIT_URL = new URL("../artifacts/json/g900_marker_edge_index_audit_001.v1.json", import.meta.url);

const state = {
  body: null,
  marker: null,
  edgeIndexes: [],
  projected: new Map(),
  step: 0,
  speed: 4,
  playing: false,
  last: 0,
  acc: 0,
  trailSeconds: 2.5,
  pulses: [],
  yaw: 0.16,
  pitch: -0.62,
  zoom: 1.15,
  dragging: false,
  lastX: 0,
  lastY: 0
};

function el(id) {
  return document.getElementById(id);
}

async function getJson(url) {
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) throw new Error("failed to load " + url + ": " + r.status);
  return r.json();
}

function edgeIndex(edgeId) {
  const m = String(edgeId).match(/^tuple_edge_(\d+)$/);
  return m ? Number(m[1]) : null;
}

function setText(id, value) {
  const node = el(id);
  if (node) node.textContent = String(value);
}

function syncUi() {
  setText("stepText", state.step);
  setText("speedText", state.speed);
  setText("trailText", state.trailSeconds.toFixed(1));
  setText("pulseCount", state.pulses.length);

  const slider = el("step");
  if (slider && Number(slider.value) !== state.step) slider.value = String(state.step);

  const pill = el("activePill");
  if (pill) {
    const active = state.step === 24;
    pill.textContent = active ? "Active: 6 -> 9" : "Inactive";
    pill.className = active ? "pill hot" : "pill";
  }
}

function addPulse() {
  state.pulses.push({ born: performance.now() });
}

function setStep(value) {
  const next = Math.max(0, Math.min(24, Math.round(value)));
  const prev = state.step;
  state.step = next;
  if (prev !== 24 && next === 24) addPulse();
  syncUi();
}

function stepForward() {
  setStep(state.step >= 24 ? 0 : state.step + 1);
}

function stepBack() {
  setStep(state.step <= 0 ? 24 : state.step - 1);
}

function project(xyz, w, h) {
  const x = xyz[0];
  const y = xyz[1];
  const z = xyz[2];

  const cy = Math.cos(state.yaw);
  const sy = Math.sin(state.yaw);
  const cp = Math.cos(state.pitch);
  const sp = Math.sin(state.pitch);

  const x1 = x * cy - z * sy;
  const z1 = x * sy + z * cy;
  const y2 = y * cp - z1 * sp;
  const z2 = y * sp + z1 * cp;

  const s = Math.min(w, h) * 0.115 * state.zoom / Math.max(0.55, 1 + z2 * 0.04);
  return {
    x: w * 0.5 + x1 * s,
    y: h * 0.5 + y2 * s
  };
}

function line(ctx, a, b, rgb, alpha, width) {
  ctx.strokeStyle = "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + alpha + ")";
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}

function prepareProjection(w, h) {
  state.projected.clear();
  const anchor = state.body.anchor?.xyz || [0, 0, 0];
  const scale = state.body.scale || 1;

  for (const v of state.body.vertices) {
    const p = [
      (anchor[0] + v.xyz[0]) * scale,
      (anchor[1] + v.xyz[1]) * scale,
      (anchor[2] + v.xyz[2]) * scale
    ];
    state.projected.set(v.id, project(p, w, h));
  }
}

function drawMarker(ctx, alpha, width) {
  for (const idx of state.edgeIndexes) {
    const edge = state.body.edges[idx];
    if (!edge) continue;
    const a = state.projected.get(edge[0]);
    const b = state.projected.get(edge[1]);
    if (!a || !b) continue;
    line(ctx, a, b, [255, 138, 99], alpha, width);
  }
}

function draw() {
  const canvas = el("stage");
  if (!canvas || !state.body) return;

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(1, Math.floor(rect.width * dpr));
  const h = Math.max(1, Math.floor(rect.height * dpr));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, w, h);

  const bg = ctx.createRadialGradient(w * 0.5, h * 0.38, 1, w * 0.5, h * 0.5, Math.max(w, h) * 0.7);
  bg.addColorStop(0, "rgba(20,36,52,1)");
  bg.addColorStop(1, "rgba(3,7,12,1)");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  prepareProjection(w, h);

  for (const edge of state.body.edges) {
    const a = state.projected.get(edge[0]);
    const b = state.projected.get(edge[1]);
    if (a && b) line(ctx, a, b, [217, 184, 108], 0.055, 0.75 * dpr);
  }

  const now = performance.now();
  state.pulses = state.pulses.filter((p) => now - p.born <= state.trailSeconds * 1000);
  for (const p of state.pulses) {
    const t = 1 - (now - p.born) / (state.trailSeconds * 1000);
    drawMarker(ctx, 0.1 + 0.48 * t, (0.8 + 2.4 * t) * dpr);
  }

  if (state.step === 24) {
    drawMarker(ctx, 0.96, 3.2 * dpr);
  }

  ctx.fillStyle = "rgba(234,242,251,.88)";
  ctx.font = Math.floor(13 * dpr) + "px monospace";
  ctx.fillText("step " + state.step + " / 24   activation: step 24   trail: runtime display memory", 18 * dpr, h - 20 * dpr);

  syncUi();
}

function loop(now) {
  if (!state.last) state.last = now;
  const dt = (now - state.last) / 1000;
  state.last = now;

  if (state.playing) {
    state.acc += dt;
    const period = 1 / Math.max(1, state.speed);
    while (state.acc >= period) {
      stepForward();
      state.acc -= period;
    }
  }

  draw();
  requestAnimationFrame(loop);
}

function bind() {
  el("prev")?.addEventListener("click", stepBack);
  el("next")?.addEventListener("click", stepForward);
  el("play")?.addEventListener("click", () => {
    state.playing = !state.playing;
    el("play").textContent = state.playing ? "Pause" : "Play";
  });
  el("reset")?.addEventListener("click", () => {
    state.playing = false;
    el("play").textContent = "Play";
    state.pulses = [];
    setStep(0);
  });
  el("step")?.addEventListener("input", (e) => {
    state.playing = false;
    el("play").textContent = "Play";
    setStep(Number(e.target.value));
  });
  el("speed")?.addEventListener("input", (e) => {
    state.speed = Number(e.target.value);
    syncUi();
  });
  el("trail")?.addEventListener("input", (e) => {
    state.trailSeconds = Number(e.target.value) / 10;
    syncUi();
  });

  const canvas = el("stage");
  canvas?.addEventListener("pointerdown", (e) => {
    state.dragging = true;
    state.lastX = e.clientX;
    state.lastY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
  });
  canvas?.addEventListener("pointermove", (e) => {
    if (!state.dragging) return;
    const dx = e.clientX - state.lastX;
    const dy = e.clientY - state.lastY;
    state.lastX = e.clientX;
    state.lastY = e.clientY;
    state.yaw += dx * 0.01;
    state.pitch = Math.max(-1.45, Math.min(1.45, state.pitch + dy * 0.01));
  });
  canvas?.addEventListener("pointerup", (e) => {
    state.dragging = false;
    canvas.releasePointerCapture(e.pointerId);
  });
  canvas?.addEventListener("wheel", (e) => {
    e.preventDefault();
    state.zoom = Math.max(0.55, Math.min(2.6, state.zoom + (e.deltaY < 0 ? 0.08 : -0.08)));
  }, { passive: false });
}

async function main() {
  const body = await getJson(BODY_URL);
  const markers = await getJson(MARKERS_URL);
  const audit = await getJson(AUDIT_URL);

  if (audit.audit_pass !== true) throw new Error("edge-index audit is not passing");

  const marker = markers.marker_sets?.[0]?.markers?.[0];
  if (!marker || marker.id !== "unsupported_phase_step_6_9") {
    throw new Error("missing expected 6/9 marker");
  }

  state.body = body;
  state.marker = marker;
  state.edgeIndexes = marker.edge_ids.map(edgeIndex).filter(Number.isInteger);

  if (state.edgeIndexes.length !== 60) throw new Error("expected 60 marker edge indexes");

  setText("edgeCount", marker.edge_ids.length);
  setText("vertexCount", marker.vertex_ids.length);

  bind();
  syncUi();
  requestAnimationFrame(loop);
}

main().catch((err) => {
  console.error(err);
  const pill = el("activePill");
  if (pill) {
    pill.textContent = "Load failed";
    pill.className = "pill hot";
  }
});
