import { readG900Grammar, getGrammarLayerStackLabel } from "./kernel/g900_grammar.js";
import { getKernelHello } from "./kernel/g900_kernel.js";
const TAU = Math.PI * 2;
const DEFAULT_SHEET_RATE = 333;
const MIN_ZOOM = 0.28;
const MAX_ZOOM = 64.0;

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

function drawBlankStage(ctx, canvas, state) {
  const { w, h, dpr } = resizeCanvas(canvas);
  drawBackground(ctx, w, h);
  drawStageGrid(ctx, w, h, dpr, state);

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


async function loadGrammarReadout() {
  const line = document.getElementById("kernel-layer-line");
  try {
    const response = await fetch("./kernel/g900_grammar.v1.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }

    const payload = await response.json();
    const grammar = readG900Grammar(payload);

    document.documentElement.dataset.g900Grammar = grammar.version;

    if (line) {
      line.textContent = "GRAMMAR " + grammar.version + " | " + getGrammarLayerStackLabel(grammar);
    }

    console.info("[G900 grammar]", grammar);
    return grammar;
  } catch (error) {
    if (line) {
      line.textContent = "Grammar load failed";
    }
    console.error("[G900 grammar]", error);
    return null;
  }
}

function boot() {
  loadGrammarReadout();
  const kernelHello = getKernelHello();
  document.documentElement.dataset.g900Kernel = kernelHello.version;

  const kernelLine = document.getElementById("kernel-status-line");
  if (kernelLine) {
    kernelLine.textContent = "KERNEL  " + kernelHello.version + "  online";
  }

  console.info("[G900 kernel]", kernelHello);

  const canvas = document.getElementById("stage-canvas");
  if (!canvas) return;

  ensureSheetControls();

  const ctx = canvas.getContext("2d");

  const state = {
    sheet: 0,
    playing: false,
    yaw: 0.15,
    pitch: -0.58,
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
      state.yaw = 0.15;
      state.pitch = -0.58;
      state.zoom = 1;
      localStorage.setItem("g900.stageZoom", "1");
      syncPlayButton(state);
    });
  }

  document.querySelectorAll("[data-view-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      applyViewPreset(state, btn.dataset.viewMode);
    });
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
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
