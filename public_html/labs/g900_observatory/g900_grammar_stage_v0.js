const TAU = Math.PI * 2;

const FORCE_MODES = {
  gravity: {
    label: "Gravity",
    verb: "compresses",
    color: [217, 184, 108],
    phase: 0.0,
    compression: 1.34,
    polarity: 0.62,
    confinement: 0.82,
    transform: 0.56,
    spin: 0.54
  },
  em: {
    label: "EM",
    verb: "polarizes",
    color: [84, 207, 232],
    phase: 1.2,
    compression: 0.74,
    polarity: 1.38,
    confinement: 0.70,
    transform: 0.82,
    spin: 0.82
  },
  strong: {
    label: "Strong",
    verb: "confines",
    color: [255, 126, 92],
    phase: 2.4,
    compression: 0.92,
    polarity: 0.58,
    confinement: 1.52,
    transform: 0.56,
    spin: 0.44
  },
  weak: {
    label: "Weak",
    verb: "transforms",
    color: [178, 142, 255],
    phase: 3.6,
    compression: 0.68,
    polarity: 0.86,
    confinement: 0.74,
    transform: 1.52,
    spin: 1.12
  }
};

const C_CYCLES = [
  { id: "O0", anchorA: 1, edges: [[0, 2], [2, 5], [5, 0]] },
  { id: "O1", anchorA: 9, edges: [[10, 13], [13, 1], [1, 10]] },
  { id: "B0", anchorA: 3, edges: [[2, 4], [4, 5], [5, 2]] },
  { id: "B1", anchorA: 7, edges: [[14, 11], [11, 2], [2, 14]] }
];

const C_TRANSITIONS = C_CYCLES.flatMap((cycle) =>
  cycle.edges.map(([fromC, toC], edgeIndex) => ({
    cycleId: cycle.id,
    anchorA: cycle.anchorA,
    edgeIndex,
    fromC,
    toC,
    deltaC: mod(toC - fromC, 15)
  }))
);

const A_DELTA = {
  "0,2": 2,
  "1,10": 7,
  "2,4": 13,
  "2,5": 9,
  "2,14": 6,
  "4,5": 9,
  "5,0": 4,
  "5,2": 8,
  "10,13": 2,
  "11,2": 11,
  "13,1": 6,
  "14,11": 13
};

const ROLE_PAIRS = [
  "WX/ZT",
  "TI/XY",
  "IW/YZ"
];

const FORCE_ORDER = ["gravity", "em", "strong", "weak"];

function normalizeForceModes(value) {
  let modes = [];

  if (Array.isArray(value)) {
    modes = value;
  } else if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        modes = parsed;
      } else {
        modes = value.split(/[,+ ]+/);
      }
    } catch (err) {
      modes = value.split(/[,+ ]+/);
    }
  }

  modes = modes
    .map((x) => String(x || "").trim())
    .filter((x) => FORCE_MODES[x]);

  const unique = [];
  for (const id of FORCE_ORDER) {
    if (modes.includes(id) && !unique.includes(id)) {
      unique.push(id);
    }
  }

  return unique.length ? unique : ["gravity"];
}

function saveForceModes(modes) {
  localStorage.setItem("g900.forceModes", JSON.stringify(normalizeForceModes(modes)));
}

function makeCompositeMode(forceModes) {
  const ids = normalizeForceModes(forceModes);
  const parts = ids.map((id) => FORCE_MODES[id]);
  const n = parts.length;

  if (n === 1) {
    return { ...parts[0], id: ids[0], ids, isComposite: false };
  }

  const avg = (field) => parts.reduce((acc, part) => acc + part[field], 0) / n;
  const color = [0, 1, 2].map((i) =>
    Math.round(parts.reduce((acc, part) => acc + part.color[i], 0) / n)
  );

  return {
    id: ids.join("+"),
    ids,
    isComposite: true,
    label: parts.map((p) => p.label).join(" + "),
    verb: "compose",
    color,
    phase: avg("phase"),
    compression: avg("compression"),
    polarity: avg("polarity"),
    confinement: avg("confinement"),
    transform: avg("transform"),
    spin: avg("spin")
  };
}

const LADDERS = [
  "action",
  "G15",
  "G30",
  "G60",
  "local",
  "G900",
  "trace"
];

function mod(n, m) {
  return ((n % m) + m) % m;
}

function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}

function clamp01(n) {
  return clamp(n, 0, 1);
}

function rgba(rgb, alpha) {
  return "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + alpha + ")";
}

function readNumber(id, fallback) {
  const el = document.getElementById(id);
  if (!el) return fallback;
  const n = Number(el.value);
  return Number.isFinite(n) ? n : fallback;
}

function readChecked(id, fallback) {
  const el = document.getElementById(id);
  if (!el) return fallback;
  return Boolean(el.checked);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function hashUnit(seed, salt) {
  const x = Math.sin((seed + 1) * 127.1 + (salt + 1) * 311.7) * 43758.5453123;
  return x - Math.floor(x);
}

function makeFrame(state) {
  const mode = makeCompositeMode(state.forceModes || state.forceMode || ["gravity"]);
  const tick = state.tick;
  const seed = state.seed;

  const g15 = [];
  const support = [];

  for (let slot = 0; slot < 15; slot += 1) {
    const a = slot / 15 * TAU;
    const waveA = 0.5 + 0.5 * Math.sin(a * 2 + mode.phase + tick * 0.025);
    const waveB = 0.5 + 0.5 * Math.cos(a * 5 - mode.phase * 0.7 - tick * 0.011);
    const jitter = hashUnit(seed, slot) * 0.14;
    const value = clamp01(0.18 + waveA * 0.38 + waveB * 0.24 + jitter);
    g15.push(value);
  }

  const threshold = 0.52 + (mode.confinement - 1) * 0.08;
  for (let i = 0; i < 15; i += 1) {
    if (g15[i] >= threshold) support.push(i);
  }
  if (!support.length) {
    let best = 0;
    for (let i = 1; i < 15; i += 1) {
      if (g15[i] > g15[best]) best = i;
    }
    support.push(best);
  }

  const activeSlot = support[mod(Math.floor(tick / 5), support.length)];
  const g30Pos = mod(Math.floor(tick), 30);
  const sign = g30Pos < 15 ? 1 : -1;
  const sheet = mod(Math.floor(tick / 15) + Math.floor(mode.phase), 4);
  const g60State = sheet * 15 + activeSlot;

  const transitionIndex = mod(Math.floor(tick / 4) + Math.floor(mode.phase * 3), C_TRANSITIONS.length);
  const transition = C_TRANSITIONS[transitionIndex];
  const aDelta = A_DELTA[transition.fromC + "," + transition.toC];

  const thalionIndex = mod(Math.floor(tick / 60) + activeSlot + Math.floor(mode.phase * 4), 15);
  const g900State = thalionIndex * 60 + g60State;

  const spread = g15.reduce((acc, v) => acc + Math.abs(v - 0.5), 0) / 15;
  const compressionScore = clamp01((1 - spread) * mode.compression);
  const polarityScore = clamp01(Math.abs(g15.reduce((acc, v, i) => acc + (i % 2 ? -v : v), 0)) / 8 * mode.polarity);
  const coherence = clamp01(0.32 + compressionScore * 0.28 + polarityScore * 0.18 + mode.confinement * 0.08);
  const residual = clamp01(1 - coherence + support.length / 45);

  return {
    mode,
    tick,
    ladder: LADDERS[mod(Math.floor(tick / 8), LADDERS.length)],
    g15,
    support,
    activeSlot,
    g30Pos,
    sign,
    sheet,
    g60State,
    transition,
    aDelta,
    rolePair: ROLE_PAIRS[transitionIndex % ROLE_PAIRS.length],
    thalionIndex,
    g900State,
    compressionScore,
    polarityScore,
    coherence,
    residual
  };
}

function rotate(point, yaw, pitch, roll) {
  let [x, y, z] = point;

  let c = Math.cos(yaw);
  let s = Math.sin(yaw);
  let x1 = x * c - y * s;
  let y1 = x * s + y * c;
  x = x1;
  y = y1;

  c = Math.cos(pitch);
  s = Math.sin(pitch);
  let y2 = y * c - z * s;
  let z2 = y * s + z * c;
  y = y2;
  z = z2;

  c = Math.cos(roll);
  s = Math.sin(roll);
  let x3 = x * c + z * s;
  let z3 = -x * s + z * c;
  x = x3;
  z = z3;

  return [x, y, z];
}

function project(point, view, width, height, zoom, panX, panY) {
  let yaw = view.yaw;
  let pitch = view.pitch;
  let roll = view.roll;

  const p = rotate(point, yaw, pitch, roll);
  const depth = 5.0 + p[2];
  const k = Math.min(width, height) * 0.42 * zoom / Math.max(1.5, depth);

  return {
    x: width * 0.5 + p[0] * k + panX,
    y: height * 0.5 + p[1] * k + panY,
    z: p[2],
    k
  };
}

function makeG900Points(frame, renderState) {
  const points = [];
  const mode = frame.mode;
  const tick = frame.tick;

  const globalCompression = 1.0 - frame.compressionScore * 0.18;
  const polarityPush = frame.polarityScore * 0.28;
  const confinementScale = 1.05 - (mode.confinement - 1) * 0.12;
  const transformTwist = mode.transform * 0.18 * Math.sin(tick * 0.017);

  for (let thalion = 0; thalion < 15; thalion += 1) {
    const ringAngle = thalion / 15 * TAU + tick * 0.004 * mode.spin;
    const ringRadius = 2.05 * globalCompression;

    const cx = Math.cos(ringAngle) * ringRadius;
    const cy = Math.sin(ringAngle) * ringRadius;
    const cz = Math.sin(ringAngle * 2 + tick * 0.006) * 0.22 * mode.polarity;

    const radial = [Math.cos(ringAngle), Math.sin(ringAngle), 0];
    const tangent = [-Math.sin(ringAngle), Math.cos(ringAngle), 0];

    for (let sheet = 0; sheet < 4; sheet += 1) {
      const sheetLift = (sheet - 1.5) * 0.19 * confinementScale;
      const sheetTwist = sheet * 0.34 + transformTwist;

      for (let slot = 0; slot < 15; slot += 1) {
        const localAngle = slot / 15 * TAU + sheetTwist + tick * 0.002 * mode.spin;
        const activity = frame.g15[slot];
        const supportHit = frame.support.includes(slot);
        const activeHit =
          thalion === frame.thalionIndex &&
          sheet === frame.sheet &&
          slot === frame.activeSlot;

        const localRadius =
          0.32 +
          activity * 0.18 +
          (supportHit ? 0.045 : 0) +
          (activeHit ? 0.10 : 0);

        const polar = ((slot + thalion + sheet) % 2 === 0 ? 1 : -1) * polarityPush;

        const x =
          cx +
          radial[0] * Math.cos(localAngle) * localRadius +
          tangent[0] * Math.sin(localAngle) * localRadius * (1.0 + polar);

        const y =
          cy +
          radial[1] * Math.cos(localAngle) * localRadius +
          tangent[1] * Math.sin(localAngle) * localRadius * (1.0 + polar);

        const z =
          cz +
          sheetLift +
          Math.sin(localAngle * 2 + thalion * 0.3) * 0.08 * mode.transform;

        const id = thalion * 60 + sheet * 15 + slot;

        points.push({
          id,
          thalion,
          sheet,
          slot,
          x,
          y,
          z,
          activity,
          supportHit,
          activeHit
        });
      }
    }
  }

  return points;
}

function drawBackground(ctx, w, h) {
  ctx.fillStyle = "rgb(3, 11, 19)";
  ctx.fillRect(0, 0, w, h);

  const step = Math.max(32, Math.min(w, h) / 12);
  ctx.lineWidth = 1;

  ctx.strokeStyle = "rgba(120, 170, 255, 0.055)";
  for (let x = w * 0.5 % step; x < w; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = h * 0.5 % step; y < h; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(217, 184, 108, 0.08)";
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.5, Math.min(w, h) * 0.34, 0, TAU);
  ctx.stroke();
}

function drawLine(ctx, a, b, color, alpha, width) {
  ctx.strokeStyle = rgba(color, alpha);
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}

function drawStage(ctx, canvas, frame, state) {
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(1, Math.floor(rect.width * dpr));
  const h = Math.max(1, Math.floor(rect.height * dpr));

  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }

  drawBackground(ctx, w, h);

  const surfaceOpacity = readNumber("surface-opacity-slider", 50) / 100;
  const bodyOpacity = readNumber("body-opacity-slider", 50) / 100;
  const trailEnabled = readChecked("trail-toggle", true);
  const trailOpacity = trailEnabled ? readNumber("trail-slider", 67) / 100 : 0;
  const edgesEnabled = readChecked("edge-toggle", true);
  const edgeOpacity = edgesEnabled ? readNumber("edge-opacity-slider", 1) : 0;
  const verticesEnabled = readChecked("vertex-toggle", true);
  const vertexOpacity = verticesEnabled ? readNumber("vertex-opacity-slider", 1) : 0;

  const modeColor = frame.mode.color;
  const points = makeG900Points(frame, state);
  const view = state.views[state.viewMode] || state.views.axis;
  const projected = points.map((p) => ({
    ...p,
    p: project([p.x, p.y, p.z], view, w, h, state.zoom, state.panX * dpr, state.panY * dpr)
  }));

  const byKey = new Map();
  for (const p of projected) {
    byKey.set(p.thalion + ":" + p.sheet + ":" + p.slot, p);
  }

  state.trail.push({
    color: modeColor,
    points: projected
      .filter((p) => p.activeHit || (p.thalion === frame.thalionIndex && p.supportHit))
      .map((p) => ({ x: p.p.x, y: p.p.y, a: p.activity }))
  });

  const maxTrail = Math.round(12 + trailOpacity * 58);
  while (state.trail.length > maxTrail) state.trail.shift();

  if (trailOpacity > 0) {
    for (let i = 0; i < state.trail.length; i += 1) {
      const t = state.trail[i];
      const age = (i + 1) / state.trail.length;
      ctx.fillStyle = rgba(t.color, age * age * trailOpacity * 0.22);
      for (const p of t.points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2 + p.a * 4, 0, TAU);
        ctx.fill();
      }
    }
  }

  if (edgeOpacity > 0) {
    const bodyAlpha = edgeOpacity * bodyOpacity * 0.20;
    const surfaceAlpha = edgeOpacity * surfaceOpacity * 0.17;

    for (let thalion = 0; thalion < 15; thalion += 1) {
      for (let sheet = 0; sheet < 4; sheet += 1) {
        for (let slot = 0; slot < 15; slot += 1) {
          const a = byKey.get(thalion + ":" + sheet + ":" + slot);
          const b = byKey.get(thalion + ":" + sheet + ":" + mod(slot + 1, 15));
          if (a && b) {
            const active = a.supportHit || b.supportHit;
            drawLine(ctx, a.p, b.p, modeColor, bodyAlpha + (active ? 0.12 : 0), active ? 1.2 : 0.7);
          }
        }
      }

      for (let sheet = 0; sheet < 3; sheet += 1) {
        for (let slot = 0; slot < 15; slot += 1) {
          const a = byKey.get(thalion + ":" + sheet + ":" + slot);
          const b = byKey.get(thalion + ":" + (sheet + 1) + ":" + slot);
          if (a && b) {
            drawLine(ctx, a.p, b.p, [120, 170, 255], surfaceAlpha, 0.65);
          }
        }
      }
    }

    for (let thalion = 0; thalion < 15; thalion += 1) {
      const next = mod(thalion + 1, 15);
      for (let sheet = 0; sheet < 4; sheet += 1) {
        const slot = frame.activeSlot;
        const a = byKey.get(thalion + ":" + sheet + ":" + slot);
        const b = byKey.get(next + ":" + sheet + ":" + slot);
        if (a && b) {
          drawLine(ctx, a.p, b.p, [217, 184, 108], surfaceAlpha + 0.06, 0.9);
        }
      }
    }
  }

  const activeTraceEnabled = readChecked("active-transition-toggle", true);
  const transitionA = byKey.get(frame.thalionIndex + ":" + frame.sheet + ":" + frame.transition.fromC);
  const transitionB = byKey.get(frame.thalionIndex + ":" + frame.sheet + ":" + frame.transition.toC);
  if (activeTraceEnabled && transitionA && transitionB) {
    drawLine(ctx, transitionA.p, transitionB.p, modeColor, 0.84, 3.2);
  }

  if (verticesEnabled && vertexOpacity > 0) {
    projected.sort((a, b) => a.p.z - b.p.z);

    for (const item of projected) {
      const supportBoost = item.supportHit ? 0.26 : 0;
      const activeBoost = item.activeHit ? 0.48 : 0;
      const alpha = vertexOpacity * (0.16 + item.activity * 0.34 + supportBoost + activeBoost);
      const radius = 0.8 + item.activity * 2.1 + (item.supportHit ? 1.1 : 0) + (item.activeHit ? 2.2 : 0);

      ctx.fillStyle = item.activeHit
        ? rgba([255, 245, 190], alpha)
        : item.supportHit
          ? rgba(modeColor, alpha)
          : "rgba(160, 205, 240, " + alpha * 0.55 + ")";

      ctx.beginPath();
      ctx.arc(item.p.x, item.p.y, radius * dpr, 0, TAU);
      ctx.fill();
    }
  }

  ctx.save();
  ctx.fillStyle = "rgba(214, 184, 108, 0.82)";
  ctx.font = Math.max(10, Math.floor(Math.min(w, h) * 0.020)) + "px ui-monospace, Menlo, Consolas, monospace";
  ctx.textBaseline = "bottom";
  const status = [
    frame.mode.label + " " + frame.mode.verb,
    frame.ladder,
    "G15 " + frame.support.length + "/15",
    "G30 " + (frame.sign > 0 ? "+" : "-"),
    "G60 " + frame.sheet + ":" + frame.activeSlot,
    "G900 " + frame.g900State + "/899",
    "C " + frame.transition.fromC + "->" + frame.transition.toC,
    "A+d " + frame.aDelta,
    frame.rolePair
  ].join(" | ");
  ctx.fillText(status, 16 * dpr, h - 12 * dpr);
  ctx.restore();

  const cameraText = document.getElementById("camera-text");
  if (cameraText) {
    cameraText.textContent =
      state.viewMode.toUpperCase() +
      " | " +
      frame.mode.label +
      " | " +
      frame.ladder +
      " | Z" +
      state.zoom.toFixed(2) +
      " | drag rotate / pinch zoom";
  }

  const metrics = document.getElementById("metrics-console");
  if (metrics) {
    metrics.textContent = JSON.stringify({
      mode: frame.mode.label,
      ladder: frame.ladder,
      g15_support: frame.support,
      g30_sign: frame.sign,
      g60: frame.sheet + ":" + frame.activeSlot,
      g900: frame.g900State,
      transition: frame.transition,
      a_delta: frame.aDelta,
      role_pair: frame.rolePair,
      boundary: "finite action grammar, not physical-force derivation"
    }, null, 2);
  }
}

function installForceChips() {
  document.querySelectorAll(".force-chip[data-force-mode]").forEach((chip) => {
    chip.addEventListener("click", () => {
      const mode = chip.dataset.forceMode;
      window.__g900GrammarStage.toggleForceMode(mode);
    });
  });
}

function syncForceChips(modes) {
  const activeModes = normalizeForceModes(modes);

  document.querySelectorAll(".force-chip[data-force-mode]").forEach((chip) => {
    const active = activeModes.includes(chip.dataset.forceMode);
    chip.classList.toggle("is-active", active);
    chip.setAttribute("aria-pressed", active ? "true" : "false");
  });

  document.body.dataset.forceMode = activeModes.join("+");
  document.body.classList.toggle("force-on-gravity", activeModes.includes("gravity"));
  document.body.classList.toggle("force-on-em", activeModes.includes("em"));
  document.body.classList.toggle("force-on-strong", activeModes.includes("strong"));
  document.body.classList.toggle("force-on-weak", activeModes.includes("weak"));
}

function syncReadouts() {
  setText("surface-opacity-readout", Math.round(readNumber("surface-opacity-slider", 50)) + "%");
  setText("body-opacity-readout", Math.round(readNumber("body-opacity-slider", 50)) + "%");
  setText("trail-readout", Math.round(readNumber("trail-slider", 67)) + "%");
  setText("edge-opacity-readout", readNumber("edge-opacity-slider", 1).toFixed(2));
  setText("vertex-opacity-readout", readNumber("vertex-opacity-slider", 1).toFixed(2));
}

function boot() {
  const canvas = document.getElementById("stage-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const state = {
    tick: 0,
    seed: 17,
    playing: false,
    forceModes: normalizeForceModes(localStorage.getItem("g900.forceModes") || localStorage.getItem("g900.forceMode") || "gravity"),
    viewMode: "axis",
    zoom: Number(localStorage.getItem("g900.stageZoom") || "1") || 1,
    panX: 0,
    panY: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
    pinchDistance: 0,
    pinchZoom: 1,
    trail: [],
    views: {
      axis: { yaw: 0.15, pitch: -0.58, roll: 0.08 },
      ring: { yaw: 0.0, pitch: -1.25, roll: 0.0 },
      shear: { yaw: 0.68, pitch: -0.48, roll: 0.42 }
    }
  };

  window.__g900GrammarStage = {
    get frame() {
      return makeFrame(state);
    },
    setForceMode(mode) {
      if (!FORCE_MODES[mode]) return;
      state.forceModes = normalizeForceModes([mode]);
      state.trail.length = 0;
      saveForceModes(state.forceModes);
      syncForceChips(state.forceModes);
    },
    toggleForceMode(mode) {
      if (!FORCE_MODES[mode]) return;

      const current = normalizeForceModes(state.forceModes);
      let next;

      if (current.includes(mode)) {
        next = current.filter((id) => id !== mode);
      } else {
        next = current.concat([mode]);
      }

      if (!next.length) {
        next = current;
      }

      state.forceModes = normalizeForceModes(next);
      state.trail.length = 0;
      saveForceModes(state.forceModes);
      syncForceChips(state.forceModes);
    },
    setView(mode) {
      state.viewMode = mode;
      state.trail.length = 0;
    },
    reset() {
      state.tick = 0;
      state.zoom = 1;
      state.panX = 0;
      state.panY = 0;
      state.trail.length = 0;
      state.views.axis = { yaw: 0.15, pitch: -0.58, roll: 0.08 };
      state.views.ring = { yaw: 0.0, pitch: -1.25, roll: 0.0 };
      state.views.shear = { yaw: 0.68, pitch: -0.48, roll: 0.42 };
      localStorage.setItem("g900.stageZoom", "1");
    }
  };

  syncForceChips(state.forceModes);
  syncReadouts();
  installForceChips();

  ["surface-opacity-slider", "body-opacity-slider", "trail-slider", "edge-opacity-slider", "vertex-opacity-slider", "active-transition-toggle"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", syncReadouts);
  });

  const rateSlider = document.getElementById("sheet-rate-slider");
  const rateNumber = document.getElementById("sheet-rate-number");
  const rateApply = document.getElementById("sheet-rate-apply");

  function setRate(v) {
    const n = clamp(Number(v) || 30, 0.25, 960);
    if (rateSlider) rateSlider.value = String(n);
    if (rateNumber) rateNumber.value = n.toFixed(2);
  }

  if (rateSlider) {
    rateSlider.addEventListener("input", () => setRate(rateSlider.value));
  }
  if (rateApply && rateNumber) {
    rateApply.addEventListener("click", () => setRate(rateNumber.value));
  }

  const playBtn = document.getElementById("play-pause-btn");
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      state.playing = !state.playing;
      playBtn.textContent = state.playing ? "II" : "▶";
    });
  }

  const resetBtn = document.getElementById("reset-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      state.playing = false;
      if (playBtn) playBtn.textContent = "▶";
      window.__g900GrammarStage.reset();
    });
  }

  const backBtn = document.getElementById("step-back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      state.playing = false;
      if (playBtn) playBtn.textContent = "▶";
      state.tick = Math.max(0, state.tick - 1);
    });
  }

  const forwardBtn = document.getElementById("step-forward-btn");
  if (forwardBtn) {
    forwardBtn.addEventListener("click", () => {
      state.playing = false;
      if (playBtn) playBtn.textContent = "▶";
      state.tick += 1;
    });
  }

  const lockToggle = document.getElementById("touch-response-toggle");
  if (lockToggle) {
    if (localStorage.getItem("g900.stageLocked") === null) {
      lockToggle.checked = false;
    } else {
      lockToggle.checked = localStorage.getItem("g900.stageLocked") === "true";
    }

    lockToggle.addEventListener("change", () => {
      const locked = Boolean(lockToggle.checked);
      localStorage.setItem("g900.stageLocked", locked ? "true" : "false");
      syncStageLockState();
    });

    syncStageLockState();
  } else {
    document.body.dataset.stageLocked = "false";
  }

  const viewButtons = [
    ["camera-preset-1", "axis"],
    ["camera-preset-2", "ring"],
    ["camera-preset-3", "shear"]
  ];

  for (const [id, view] of viewButtons) {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener("click", () => {
        window.__g900GrammarStage.setView(view);
      });
    }
  }

  const activePointers = new Map();

  function pointerDistance(a, b) {
    const dx = a.clientX - b.clientX;
    const dy = a.clientY - b.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function getActiveView() {
    return state.views[state.viewMode] || state.views.axis;
  }

  function syncStageLockState() {
    const toggle = document.getElementById("touch-response-toggle");
    const locked = toggle ? Boolean(toggle.checked) : false;

    document.body.dataset.stageLocked = locked ? "true" : "false";

    const label = document.querySelector(".stage-lock-text");
    if (label) {
      label.textContent = locked ? "Locked" : "Pinch and Zoom";
    }

    return locked;
  }

  function isStageGestureEnabled() {
    return !syncStageLockState();
  }

  function beginPinch() {
    if (activePointers.size !== 2) return;
    const pts = Array.from(activePointers.values());
    state.pinchDistance = pointerDistance(pts[0], pts[1]);
    state.pinchZoom = state.zoom;
  }

  canvas.addEventListener("pointerdown", (event) => {
    if (!isStageGestureEnabled()) return;

    canvas.setPointerCapture(event.pointerId);
    activePointers.set(event.pointerId, event);

    state.dragging = true;
    state.lastX = event.clientX;
    state.lastY = event.clientY;

    if (activePointers.size === 2) {
      beginPinch();
    }
  });

  canvas.addEventListener("pointermove", (event) => {
    if (!isStageGestureEnabled()) return;
    if (!activePointers.has(event.pointerId)) return;

    activePointers.set(event.pointerId, event);

    if (activePointers.size === 2 && state.pinchDistance > 0) {
      const pts = Array.from(activePointers.values());
      const d = pointerDistance(pts[0], pts[1]);
      const factor = d / Math.max(1, state.pinchDistance);
      state.zoom = clamp(state.pinchZoom * factor, 0.45, 3.2);
      localStorage.setItem("g900.stageZoom", String(state.zoom));
      return;
    }

    if (activePointers.size === 1 && state.dragging) {
      const dx = event.clientX - state.lastX;
      const dy = event.clientY - state.lastY;
      state.lastX = event.clientX;
      state.lastY = event.clientY;

      const view = getActiveView();
      view.yaw += dx * 0.0085;
      view.pitch = clamp(view.pitch + dy * 0.0065, -1.48, 1.48);

      state.trail.length = 0;
    }
  });

  function endPointer(event) {
    activePointers.delete(event.pointerId);

    if (activePointers.size === 0) {
      state.dragging = false;
      state.pinchDistance = 0;
      state.pinchZoom = state.zoom;
      return;
    }

    if (activePointers.size === 1) {
      const pt = Array.from(activePointers.values())[0];
      state.lastX = pt.clientX;
      state.lastY = pt.clientY;
      state.pinchDistance = 0;
      state.pinchZoom = state.zoom;
    }
  }

  canvas.addEventListener("pointerup", endPointer);
  canvas.addEventListener("pointercancel", endPointer);
  canvas.addEventListener("pointerleave", endPointer);

  canvas.addEventListener("wheel", (event) => {
    if (!isStageGestureEnabled()) return;

    event.preventDefault();

    if (event.shiftKey) {
      const view = getActiveView();
      view.roll += event.deltaY * 0.004;
      state.trail.length = 0;
      return;
    }

    const factor = Math.exp(-event.deltaY * 0.0018);
    state.zoom = clamp(state.zoom * factor, 0.45, 3.2);
    localStorage.setItem("g900.stageZoom", String(state.zoom));
  }, { passive: false });

  let last = performance.now();

  function loop(now) {
    const dt = Math.max(0, (now - last) / 1000);
    last = now;

    const rate = readNumber("sheet-rate-number", readNumber("sheet-rate-slider", 30));
    if (state.playing) {
      state.tick += dt * clamp(rate, 0.25, 960);
    }

    const frame = makeFrame(state);
    window.__g900GrammarFrame = frame;
    drawStage(ctx, canvas, frame, state);

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
