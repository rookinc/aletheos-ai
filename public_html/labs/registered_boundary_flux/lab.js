const canvas = document.getElementById("flux-canvas");
const ctx = canvas.getContext("2d");
const hud = document.getElementById("hud");
const presetSelect = document.getElementById("preset");
const phaseBox = document.getElementById("phases");
const kernelStatus = document.getElementById("kernel-status");
const registerStatus = document.getElementById("register-status");

const sliderIds = ["boundary", "interior", "flux", "emission", "trace"];
const sliders = {};
sliderIds.forEach((id) => {
  sliders[id] = document.getElementById(id);
});

let data = {
  phases: [],
  presets: []
};

let phaseIndex = 0;
let t = 0;
let playing = true;

function resizeCanvas() {
  const r = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(r.width * dpr));
  canvas.height = Math.max(1, Math.floor(r.height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function settings() {
  const s = {};
  sliderIds.forEach((id) => {
    s[id] = Number(sliders[id].value) / 100;
  });
  return s;
}

function applyPreset(preset) {
  sliderIds.forEach((id) => {
    if (typeof preset[id] === "number") {
      sliders[id].value = Math.round(preset[id] * 100);
    }
  });
}



function renderRegisterStatus() {
  if (!registerStatus) return;

  const body = data.register_body || {};
  const active = body.active_projection || {};
  const label = body.default || "unknown_register";
  const topBottom = active.top_bottom || "unknown";
  const sides = active.side_faces || "unknown";
  const seams = active.edges_corners || "unknown";

  registerStatus.textContent =
    "Register: " + label.replaceAll("_", " ") +
    " | caps: " + topBottom +
    " | sides: " + sides +
    " | seams: " + seams;
}

function renderKernelStatus() {
  if (!kernelStatus) return;

  const status = data.status || "unknown";
  const source = data.source_project && data.source_project.name
    ? data.source_project.name
    : "unknown source";
  const hooks = Array.isArray(data.evidence_hooks)
    ? data.evidence_hooks.length
    : 0;

  kernelStatus.textContent =
    "Kernel: " + status.replaceAll("_", " ") +
    " | Source: " + source +
    " | Evidence hooks: " + hooks;
}

function renderPresetOptions() {
  presetSelect.innerHTML = "";
  data.presets.forEach((preset) => {
    const opt = document.createElement("option");
    opt.value = preset.id;
    opt.textContent = preset.label;
    presetSelect.appendChild(opt);
  });

  if (data.presets.length) {
    applyPreset(data.presets[0]);
  }
}

function shortMeaning(text) {
  if (!text) return "";
  if (text.length <= 48) return text;
  return text.slice(0, 45) + "...";
}

function renderPhases() {
  phaseBox.innerHTML = "";
  data.phases.forEach((phase, i) => {
    const div = document.createElement("div");
    div.className = "phase" + (i === phaseIndex ? " active" : "");
    div.innerHTML = "<strong>" + phase.label + "</strong>" + shortMeaning(phase.meaning);
    div.addEventListener("click", () => {
      phaseIndex = i;
      renderPhases();
      draw();
    });
    phaseBox.appendChild(div);
  });
}

function currentPhase() {
  if (!data.phases.length) {
    return { id: "none", label: "None" };
  }
  return data.phases[phaseIndex];
}

presetSelect.addEventListener("change", () => {
  const preset = data.presets.find((p) => p.id === presetSelect.value);
  if (preset) applyPreset(preset);
  draw();
});

document.getElementById("prev").addEventListener("click", () => {
  phaseIndex = (phaseIndex - 1 + data.phases.length) % data.phases.length;
  renderPhases();
  draw();
});

document.getElementById("next").addEventListener("click", () => {
  phaseIndex = (phaseIndex + 1) % data.phases.length;
  renderPhases();
  draw();
});

document.getElementById("reset").addEventListener("click", () => {
  t = 0;
  phaseIndex = 0;
  renderPhases();
  draw();
});

document.getElementById("play").addEventListener("click", (ev) => {
  playing = !playing;
  ev.target.textContent = playing ? "PAUSE" : "PLAY";
});

sliderIds.forEach((id) => {
  sliders[id].addEventListener("input", draw);
});

window.addEventListener("resize", () => {
  resizeCanvas();
  draw();
});

function boot(json) {
  data = json;
  renderKernelStatus();
  renderRegisterStatus();
  resizeCanvas();
  renderPresetOptions();
  renderPhases();
  loop();
}

fetch("data/kernel.v1.json")
  .then((res) => res.json())
  .then(boot)
  .catch((err) => {
    console.error(err);
    hud.textContent = "failed to load regimes";
  });

function loop() {
  if (playing) t += 0.018;
  draw();
  requestAnimationFrame(loop);
}

function rgba(r, g, b, a) {
  return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

function getSize() {
  const r = canvas.getBoundingClientRect();
  return {
    w: r.width,
    h: r.height,
    cx: r.width * 0.5,
    cy: r.height * 0.52,
    rad: Math.min(r.width, r.height) * 0.40
  };
}

function wobblePoint(cx, cy, rad, ang, amp) {
  const w =
    1 +
    amp * 0.07 * Math.sin(ang * 5 + t * 1.4) +
    amp * 0.04 * Math.cos(ang * 9 - t);
  return {
    x: cx + Math.cos(ang) * rad * w,
    y: cy + Math.sin(ang) * rad * w
  };
}

function stroke(a, b, color, width, alpha) {
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function drawTrace(g, s) {
  const n = 8 + Math.floor(s.trace * 38);
  for (let i = 0; i < n; i++) {
    const a0 = t * 0.05 + i * 0.24;
    const a1 = a0 + 0.55 + s.trace * 1.85;
    ctx.globalAlpha = 0.06 + s.trace * 0.34;
    ctx.strokeStyle = i % 2 ? rgba(85, 212, 230, 0.55) : rgba(185, 149, 255, 0.46);
    ctx.lineWidth = 1 + s.trace * 2.2;
    ctx.beginPath();
    ctx.arc(g.cx, g.cy, g.rad * (0.18 + i * 0.017), a0, a1);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

function drawBoundary(g, s) {
  const loops = 2 + Math.floor(s.boundary * 8);
  for (let k = 0; k < loops; k++) {
    const rr = g.rad * (0.70 + k * 0.025);
    ctx.beginPath();
    for (let i = 0; i <= 220; i++) {
      const a = Math.PI * 2 * i / 220;
      const p = wobblePoint(g.cx, g.cy, rr, a, s.boundary);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = k % 2 ? rgba(85, 212, 230, 0.34) : rgba(216, 188, 118, 0.34);
    ctx.lineWidth = 0.8 + s.boundary * 1.8;
    ctx.stroke();
  }
}

function drawInterior(g, s) {
  const n = 60 + Math.floor(s.interior * 170);
  for (let i = 0; i < n; i++) {
    const a = i * 2.399963 + t * 0.06;
    const rr = g.rad * 0.60 * Math.sqrt(i / n) * (0.45 + s.interior * 0.65);
    const p = wobblePoint(g.cx, g.cy, rr, a, s.interior);
    ctx.fillStyle = i % 3 === 0 ? rgba(158, 224, 178, 0.56) : rgba(156, 200, 255, 0.42);
    ctx.beginPath();
    ctx.arc(p.x, p.y, 0.9 + s.interior * 1.9, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawFlux(g, s) {
  const phaseLift = data.phases.length ? phaseIndex / Math.max(1, data.phases.length - 1) : 0;
  const n = 20 + Math.floor(s.flux * 90);
  for (let i = 0; i < n; i++) {
    const a = Math.PI * 2 * i / n + t * 0.035;
    const b = a + Math.PI * (0.58 + 0.34 * Math.sin(i * 0.7 + t));
    const p1 = wobblePoint(g.cx, g.cy, g.rad * (0.24 + s.boundary * 0.52), a, s.flux);
    const p2 = wobblePoint(g.cx, g.cy, g.rad * (0.18 + s.boundary * 0.58), b, s.flux);
    const color = i % 2 ? rgba(216, 188, 118, 0.70) : rgba(156, 200, 255, 0.62);
    stroke(p1, p2, color, 0.6 + s.flux * 1.9, 0.12 + s.flux * 0.55 + phaseLift * 0.10);
  }
}

function drawEmission(g, s) {
  const boost = phaseIndex === 3 ? 1.45 : 1.0;
  const n = 6 + Math.floor(s.emission * 44);
  for (let i = 0; i < n; i++) {
    const a = -0.45 + i / Math.max(1, n - 1) * 1.05 + Math.sin(t + i) * 0.025;
    const start = { x: g.cx + g.rad * 0.04, y: g.cy + g.rad * 0.02 };
    const end = {
      x: g.cx + Math.cos(a) * g.rad * (0.38 + s.emission * 0.72 * boost),
      y: g.cy + Math.sin(a) * g.rad * (0.38 + s.emission * 0.72 * boost)
    };
    stroke(start, end, rgba(255, 238, 170, 0.82), 0.5 + s.emission * 2.3, 0.12 + s.emission * 0.70);
  }
}

function draw() {
  const g = getSize();
  const s = settings();
  const phase = currentPhase();

  ctx.clearRect(0, 0, g.w, g.h);

  drawTrace(g, s);
  drawBoundary(g, s);
  drawFlux(g, s);
  drawInterior(g, s);
  drawEmission(g, s);

  hud.textContent = "phase=" + phase.id + " t=" + t.toFixed(2);
}

/* 3d camera interaction pass 001 */
const rbfCamera = {
  yaw: -0.35,
  pitch: 0.35,
  zoom: 1.0,
  pointers: new Map(),
  lastX: 0,
  lastY: 0,
  lastDist: 0
};

function rbfPointerDistance() {
  const pts = Array.from(rbfCamera.pointers.values());
  if (pts.length < 2) return 0;
  const dx = pts[0].x - pts[1].x;
  const dy = pts[0].y - pts[1].y;
  return Math.sqrt(dx * dx + dy * dy);
}

function rbfClampCamera() {
  if (rbfCamera.pitch > 1.35) rbfCamera.pitch = 1.35;
  if (rbfCamera.pitch < -1.35) rbfCamera.pitch = -1.35;
  if (rbfCamera.zoom > 2.8) rbfCamera.zoom = 2.8;
  if (rbfCamera.zoom < 0.45) rbfCamera.zoom = 0.45;
}

canvas.addEventListener("pointerdown", (ev) => {
  canvas.setPointerCapture(ev.pointerId);
  rbfCamera.pointers.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
  rbfCamera.lastX = ev.clientX;
  rbfCamera.lastY = ev.clientY;
  rbfCamera.lastDist = rbfPointerDistance();
});

canvas.addEventListener("pointermove", (ev) => {
  if (!rbfCamera.pointers.has(ev.pointerId)) return;

  rbfCamera.pointers.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });

  if (rbfCamera.pointers.size >= 2) {
    const d = rbfPointerDistance();
    if (rbfCamera.lastDist > 0 && d > 0) {
      rbfCamera.zoom *= d / rbfCamera.lastDist;
      rbfClampCamera();
    }
    rbfCamera.lastDist = d;
  } else {
    const dx = ev.clientX - rbfCamera.lastX;
    const dy = ev.clientY - rbfCamera.lastY;
    rbfCamera.yaw += dx * 0.008;
    rbfCamera.pitch += dy * 0.008;
    rbfClampCamera();
    rbfCamera.lastX = ev.clientX;
    rbfCamera.lastY = ev.clientY;
  }

  draw();
});

function rbfEndPointer(ev) {
  rbfCamera.pointers.delete(ev.pointerId);
  rbfCamera.lastDist = rbfPointerDistance();
}

canvas.addEventListener("pointerup", rbfEndPointer);
canvas.addEventListener("pointercancel", rbfEndPointer);
canvas.addEventListener("wheel", (ev) => {
  ev.preventDefault();
  rbfCamera.zoom *= ev.deltaY < 0 ? 1.08 : 0.92;
  rbfClampCamera();
  draw();
}, { passive: false });

/* 3d projection renderer pass 001 */
function rbfProject(g, x, y, z) {
  const cy = Math.cos(rbfCamera.yaw);
  const sy = Math.sin(rbfCamera.yaw);
  const cp = Math.cos(rbfCamera.pitch);
  const sp = Math.sin(rbfCamera.pitch);

  const x1 = x * cy + z * sy;
  const z1 = -x * sy + z * cy;
  const y1 = y * cp - z1 * sp;
  const z2 = y * sp + z1 * cp;

  const f = 3.4;
  const scale = (g.rad * rbfCamera.zoom * f) / (f + z2);
  return {
    x: g.cx + x1 * scale,
    y: g.cy + y1 * scale,
    z: z2,
    scale: scale / g.rad
  };
}

function rbfRingPoint(a, radius, z, warp) {
  const w =
    1 +
    warp * 0.07 * Math.sin(a * 5 + t * 1.4) +
    warp * 0.04 * Math.cos(a * 9 - t);
  return {
    x: Math.cos(a) * radius * w,
    y: Math.sin(a) * radius * w,
    z: z
  };
}

function rbfStroke3(g, a, b, color, width, alpha) {
  const pa = rbfProject(g, a.x, a.y, a.z);
  const pb = rbfProject(g, b.x, b.y, b.z);
  const depth = Math.max(0.22, Math.min(1.0, 0.72 - (pa.z + pb.z) * 0.08));
  ctx.globalAlpha = alpha * depth;
  ctx.strokeStyle = color;
  ctx.lineWidth = width * Math.max(0.35, (pa.scale + pb.scale) * 0.5);
  ctx.beginPath();
  ctx.moveTo(pa.x, pa.y);
  ctx.lineTo(pb.x, pb.y);
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function rbfDot3(g, p, color, size, alpha) {
  const pp = rbfProject(g, p.x, p.y, p.z);
  const depth = Math.max(0.25, Math.min(1.0, 0.75 - pp.z * 0.08));
  ctx.globalAlpha = alpha * depth;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(pp.x, pp.y, size * Math.max(0.45, pp.scale), 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

function rbfDrawBoundary3(g, s) {
  const loops = 3 + Math.floor(s.boundary * 8);
  for (let k = 0; k < loops; k++) {
    const z = -0.18 + k * 0.045;
    const r = 0.82 + k * 0.015;
    let prev = null;
    for (let i = 0; i <= 180; i++) {
      const a = Math.PI * 2 * i / 180;
      const p = rbfRingPoint(a, r, z, s.boundary);
      if (prev) {
        const color = k % 2
          ? rgba(85, 212, 230, 0.48)
          : rgba(216, 188, 118, 0.48);
        rbfStroke3(g, prev, p, color, 1.1 + s.boundary * 1.5, 0.65);
      }
      prev = p;
    }
  }
}

function rbfDrawInterior3(g, s) {
  const n = 75 + Math.floor(s.interior * 190);
  for (let i = 0; i < n; i++) {
    const a = i * 2.399963 + t * 0.045;
    const rr = 0.62 * Math.sqrt(i / n) * (0.45 + s.interior * 0.65);
    const z = Math.sin(i * 1.7 + t * 0.7) * 0.34 * s.interior;
    const p = {
      x: Math.cos(a) * rr,
      y: Math.sin(a) * rr,
      z: z
    };
    const color = i % 3 === 0
      ? rgba(158, 224, 178, 0.70)
      : rgba(156, 200, 255, 0.58);
    rbfDot3(g, p, color, 1.2 + s.interior * 2.0, 0.88);
  }
}

function rbfDrawFlux3(g, s) {
  const phaseLift = data.phases.length
    ? phaseIndex / Math.max(1, data.phases.length - 1)
    : 0;
  const n = 24 + Math.floor(s.flux * 105);
  for (let i = 0; i < n; i++) {
    const a = Math.PI * 2 * i / n + t * 0.030;
    const b = a + Math.PI * (0.56 + 0.34 * Math.sin(i * 0.7 + t));
    const z1 = Math.sin(i * 0.41 + t) * 0.34;
    const z2 = Math.cos(i * 0.53 - t * 0.5) * 0.34;
    const p1 = rbfRingPoint(a, 0.24 + s.boundary * 0.52, z1, s.flux);
    const p2 = rbfRingPoint(b, 0.18 + s.boundary * 0.58, z2, s.flux);
    const color = i % 2
      ? rgba(216, 188, 118, 0.75)
      : rgba(156, 200, 255, 0.70);
    rbfStroke3(g, p1, p2, color, 0.7 + s.flux * 1.8, 0.16 + s.flux * 0.58 + phaseLift * 0.10);
  }
}

function rbfDrawEmission3(g, s) {
  const boost = phaseIndex === 3 ? 1.45 : 1.0;
  const n = 8 + Math.floor(s.emission * 48);
  const source = { x: 0.08, y: 0.02, z: 0.05 };
  for (let i = 0; i < n; i++) {
    const a = -0.52 + i / Math.max(1, n - 1) * 1.10 + Math.sin(t + i) * 0.025;
    const len = 0.42 + s.emission * 0.72 * boost;
    const p2 = {
      x: source.x + Math.cos(a) * len,
      y: source.y + Math.sin(a) * len * 0.55,
      z: Math.sin(i * 0.45 + t) * 0.20
    };
    rbfStroke3(g, source, p2, rgba(255, 238, 170, 0.88), 0.7 + s.emission * 2.3, 0.16 + s.emission * 0.72);
  }
}

function rbfDrawTrace3(g, s) {
  const n = 10 + Math.floor(s.trace * 36);
  for (let k = 0; k < n; k++) {
    const z = -0.42 + k * 0.024;
    const r = 0.18 + k * 0.018;
    const start = t * 0.035 + k * 0.22;
    const end = start + 0.70 + s.trace * 1.60;
    let prev = null;
    for (let i = 0; i <= 24; i++) {
      const a = start + (end - start) * i / 24;
      const p = rbfRingPoint(a, r, z, s.trace);
      if (prev) {
        const color = k % 2
          ? rgba(85, 212, 230, 0.58)
          : rgba(185, 149, 255, 0.50);
        rbfStroke3(g, prev, p, color, 1.0 + s.trace * 1.8, 0.10 + s.trace * 0.38);
      }
      prev = p;
    }
  }
}

function draw() {
  const g = getSize();
  const s = settings();
  const phase = currentPhase();

  ctx.clearRect(0, 0, g.w, g.h);

  rbfDrawTrace3(g, s);
  rbfDrawBoundary3(g, s);
  rbfDrawFlux3(g, s);
  rbfDrawInterior3(g, s);
  rbfDrawEmission3(g, s);

  hud.textContent =
    "phase=" + phase.id +
    " zoom=" + rbfCamera.zoom.toFixed(2);
}

/* cube register face projection pass 001 */
function cubeP(x, y, z) {
  return { x: x, y: y, z: z };
}

function cubeFacePoint(face, u, v) {
  if (face === "top") return cubeP(u, -0.78, v);
  if (face === "bottom") return cubeP(u, 0.78, v);
  if (face === "front") return cubeP(u, v, 0.78);
  if (face === "back") return cubeP(u, v, -0.78);
  if (face === "left") return cubeP(-0.78, u, v);
  if (face === "right") return cubeP(0.78, u, v);
  return cubeP(u, v, 0);
}

function cubeDrawEdges(g, s) {
  const a = 0.78;
  const pts = [
    cubeP(-a,-a,-a), cubeP(a,-a,-a), cubeP(a,a,-a), cubeP(-a,a,-a),
    cubeP(-a,-a,a),  cubeP(a,-a,a),  cubeP(a,a,a),  cubeP(-a,a,a)
  ];
  const edges = [
    [0,1],[1,2],[2,3],[3,0],
    [4,5],[5,6],[6,7],[7,4],
    [0,4],[1,5],[2,6],[3,7]
  ];
  edges.forEach((e) => {
    rbfStroke3(g, pts[e[0]], pts[e[1]], rgba(216,188,118,0.70), 1.5 + s.boundary, 0.72);
  });
}

function cubeDrawFaceGrid(g, face, color, weight, alpha) {
  const steps = 5;
  for (let i = -steps; i <= steps; i++) {
    const u = i / steps * 0.78;
    rbfStroke3(g, cubeFacePoint(face, u, -0.78), cubeFacePoint(face, u, 0.78), color, weight, alpha);
    rbfStroke3(g, cubeFacePoint(face, -0.78, u), cubeFacePoint(face, 0.78, u), color, weight, alpha);
  }

  for (let i = -steps; i < steps; i++) {
    const u0 = i / steps * 0.78;
    const u1 = (i + 1) / steps * 0.78;
    rbfStroke3(g, cubeFacePoint(face, u0, -0.78), cubeFacePoint(face, u1, 0.78), color, weight * 0.72, alpha * 0.55);
    rbfStroke3(g, cubeFacePoint(face, -0.78, u0), cubeFacePoint(face, 0.78, u1), color, weight * 0.72, alpha * 0.55);
  }
}

function cubeDrawPolarityCap(g, face, s, sign) {
  const center = cubeFacePoint(face, 0, 0);
  const n = 16;
  const radius = 0.52 + s.boundary * 0.18;
  const color = sign > 0 ? rgba(156,200,255,0.78) : rgba(216,188,118,0.72);

  for (let i = 0; i < n; i++) {
    const a = Math.PI * 2 * i / n + t * 0.02 * sign;
    const p = cubeFacePoint(face, Math.cos(a) * radius, Math.sin(a) * radius);
    rbfStroke3(g, center, p, color, 0.8 + s.boundary * 1.2, 0.42 + s.boundary * 0.35);
  }

  let prev = null;
  for (let i = 0; i <= 96; i++) {
    const a = Math.PI * 2 * i / 96 + t * 0.02 * sign;
    const p = cubeFacePoint(face, Math.cos(a) * radius, Math.sin(a) * radius);
    if (prev) rbfStroke3(g, prev, p, color, 1.0 + s.boundary, 0.50);
    prev = p;
  }
}

function cubeDrawRelationshipWall(g, face, s, offset) {
  const n = 14 + Math.floor(s.flux * 42);
  for (let i = 0; i < n; i++) {
    const a = i * 1.618 + offset;
    const u1 = Math.sin(a + t * 0.05) * 0.72;
    const v1 = Math.cos(a * 1.7) * 0.72;
    const u2 = Math.sin(a * 2.1 + 1.2) * 0.72;
    const v2 = Math.cos(a * 1.3 + t * 0.04) * 0.72;
    const color = i % 2 ? rgba(158,224,178,0.54) : rgba(156,200,255,0.50);
    rbfStroke3(g, cubeFacePoint(face, u1, v1), cubeFacePoint(face, u2, v2), color, 0.6 + s.flux * 1.6, 0.18 + s.flux * 0.45);
  }
}

function cubeDrawInteriorCarrier(g, s) {
  const n = 70 + Math.floor(s.interior * 170);
  for (let i = 0; i < n; i++) {
    const a = i * 2.399963 + t * 0.035;
    const r = Math.sqrt(i / n) * 0.55 * (0.45 + s.interior * 0.75);
    const p = cubeP(
      Math.cos(a) * r,
      Math.sin(a) * r,
      Math.sin(i * 1.37 + t * 0.5) * 0.52 * s.interior
    );
    const color = i % 3 === 0 ? rgba(158,224,178,0.76) : rgba(156,200,255,0.60);
    rbfDot3(g, p, color, 1.2 + s.interior * 1.8, 0.82);
  }
}

function cubeDrawSeams(g, s) {
  const faces = ["front", "back", "left", "right"];
  faces.forEach((face, k) => {
    const color = k % 2 ? rgba(216,188,118,0.62) : rgba(85,212,230,0.58);
    rbfStroke3(g, cubeFacePoint(face, -0.78, -0.78), cubeFacePoint(face, 0.78, 0.78), color, 0.9 + s.boundary, 0.35);
    rbfStroke3(g, cubeFacePoint(face, -0.78, 0.78), cubeFacePoint(face, 0.78, -0.78), color, 0.9 + s.boundary, 0.35);
  });
}

function cubeDrawEmission(g, s) {
  const boost = phaseIndex === 3 ? 1.45 : 1.0;
  const n = 8 + Math.floor(s.emission * 44);
  const source = cubeP(0, 0, 0);
  for (let i = 0; i < n; i++) {
    const a = -0.55 + i / Math.max(1, n - 1) * 1.10;
    const end = cubeP(
      0.78 + s.emission * 0.32 * boost,
      Math.sin(a) * 0.42,
      Math.cos(a) * 0.42
    );
    rbfStroke3(g, source, end, rgba(255,238,170,0.88), 0.7 + s.emission * 2.2, 0.16 + s.emission * 0.70);
  }
}

function cubeDrawFaceTrace(g, s) {
  const n = 8 + Math.floor(s.trace * 34);
  for (let k = 0; k < n; k++) {
    const face = k % 2 ? "top" : "front";
    const r = 0.20 + k * 0.015;
    let prev = null;
    for (let i = 0; i <= 32; i++) {
      const a = t * 0.025 + k * 0.24 + i / 32 * (0.80 + s.trace * 1.60);
      const p = cubeFacePoint(face, Math.cos(a) * r, Math.sin(a) * r);
      if (prev) {
        const color = k % 2 ? rgba(185,149,255,0.54) : rgba(85,212,230,0.50);
        rbfStroke3(g, prev, p, color, 0.8 + s.trace * 1.6, 0.10 + s.trace * 0.34);
      }
      prev = p;
    }
  }
}

function draw() {
  const g = getSize();
  const s = settings();
  const phase = currentPhase();

  ctx.clearRect(0, 0, g.w, g.h);

  cubeDrawFaceTrace(g, s);
  cubeDrawEdges(g, s);

  cubeDrawFaceGrid(g, "top", rgba(156,200,255,0.34), 0.7 + s.boundary, 0.38);
  cubeDrawFaceGrid(g, "bottom", rgba(216,188,118,0.28), 0.7 + s.boundary, 0.30);

  cubeDrawRelationshipWall(g, "front", s, 0.1);
  cubeDrawRelationshipWall(g, "back", s, 1.4);
  cubeDrawRelationshipWall(g, "left", s, 2.7);
  cubeDrawRelationshipWall(g, "right", s, 4.0);

  cubeDrawPolarityCap(g, "top", s, 1);
  cubeDrawPolarityCap(g, "bottom", s, -1);
  cubeDrawSeams(g, s);
  cubeDrawInteriorCarrier(g, s);
  cubeDrawEmission(g, s);

  hud.textContent =
    "cube phase=" + phase.id +
    " zoom=" + rbfCamera.zoom.toFixed(2);
}
