import { projectPoint } from "./camera.js";

function resizeCanvas(canvas, ctx) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(1, Math.floor(rect.width * dpr));
  const h = Math.max(1, Math.floor(rect.height * dpr));

  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);

  return { width: rect.width, height: rect.height };
}

function edgeColor(kind, alpha) {
  if (kind === "internal_same_sector") return "rgba(156, 227, 176, " + alpha + ")";
  if (kind === "external_half_turn_mod30") return "rgba(217, 184, 108, " + alpha + ")";
  if (kind === "external_identity_same_local") return "rgba(120, 170, 255, " + alpha + ")";
  return "rgba(220, 230, 245, " + alpha + ")";
}

function vertexColor(p, view) {
  if (view === "internal_g60") {
    return p.bit ? "rgba(156, 227, 176, 0.9)" : "rgba(120, 170, 255, 0.9)";
  }
  if (view === "external_p900") {
    return p.bit ? "rgba(217, 184, 108, 0.9)" : "rgba(120, 170, 255, 0.86)";
  }
  if (view === "residue_sheets") {
    return p.bit ? "rgba(217, 184, 108, 0.85)" : "rgba(180, 210, 255, 0.82)";
  }
  if (view === "sector_fibers") {
    return "rgba(237, 246, 255, 0.82)";
  }
  return p.bit ? "rgba(217, 184, 108, 0.86)" : "rgba(120, 170, 255, 0.82)";
}

export function renderScene(ctx, canvas, scene, camera, options) {
  const viewport = resizeCanvas(canvas, ctx);
  if (options.trailEnabled) {
    ctx.save();
    ctx.fillStyle = "rgba(5, 9, 15, " + String(Math.max(0.02, Math.min(0.9, options.trailAmount ?? 0.16))) + ")";
    ctx.fillRect(0, 0, viewport.width, viewport.height);
    ctx.restore();
  } else {
    ctx.clearRect(0, 0, viewport.width, viewport.height);
  }

  const projected = new Map();
  const edgeAlpha = Math.max(0.02, Math.min(1, Number(options.edgeAlpha ?? 0.38)));
  const vertexScale = Math.max(0.2, Math.min(3, Number(options.vertexScale ?? 1)));

  const usableCenterOffsetX = 18;

  for (const p of scene.vertices) {
    const screen = projectPoint(p, camera, viewport);
    screen.x += usableCenterOffsetX;
    projected.set(p.id, {
      raw: p,
      screen,
    });
  }

  if (options.showEdges) {
    const edgeItems = [];

    for (const e of scene.edges) {
      const a = projected.get(e.source);
      const b = projected.get(e.target);
      if (!a || !b) continue;

      edgeItems.push({
        edge: e,
        a,
        b,
        depth: (a.screen.depth + b.screen.depth) / 2,
      });
    }

    edgeItems.sort((a, b) => b.depth - a.depth);

    for (const item of edgeItems) {
      const a = item.a.screen;
      const b = item.b.screen;

      ctx.save();
      ctx.strokeStyle = edgeColor(item.edge.kind, edgeAlpha);
      ctx.lineWidth = item.edge.kind === "internal_same_sector" ? 0.55 : 0.75;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      ctx.restore();
    }
  }

  if (options.showVertices) {
    const points = Array.from(projected.values()).sort((a, b) => b.screen.depth - a.screen.depth);

    for (const item of points) {
      const p = item.raw;
      const q = item.screen;
      const r = Math.max(1.0, Math.min(4.8, q.scale * 0.018 * vertexScale));

      ctx.save();
      ctx.fillStyle = vertexColor(p, scene.view);
      ctx.beginPath();
      ctx.arc(q.x, q.y, r, 0, Math.PI * 2);
      ctx.fill();

      if (options.showLabels && p.local % 15 === 0) {
        ctx.fillStyle = "rgba(237,246,255,0.75)";
        ctx.font = "10px ui-monospace, monospace";
        ctx.fillText(String(p.sector) + ":" + String(p.local), q.x + 5, q.y - 5);
      }

      ctx.restore();
    }
  }
}
