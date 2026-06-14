const canvas = document.getElementById("flux-canvas");
const ctx = canvas.getContext("2d");
const hud = document.getElementById("hud");
const presetSelect = document.getElementById("preset");
const phaseBox = document.getElementById("phases");
const kernelStatus = document.getElementById("kernel-status");

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
