const P900_EDGE_URL = "/json/p900/p900_phase17_external_edge_list.json";
const P900_CHECKPOINT_URL = "/json/p900/p900_phase20_checkpoint_summary.json";

function safePoint(v) {
  return {
    x: Number(v?.x ?? 0),
    y: Number(v?.y ?? 0),
    z: Number(v?.z ?? 0),
  };
}

function buildP900Point(sector, local) {
  const residue = local % 30;
  const bit = local >= 30 ? 1 : 0;

  const sectorAngle = (Math.PI * 2 * sector) / 15;
  const residueAngle = (Math.PI * 2 * residue) / 30;

  const band = bit === 0 ? -0.42 : 0.42;
  const majorRadius = 4.8 + 0.42 * Math.sin(residueAngle * 3);
  const sheetOffset = 0.10 * Math.cos(residueAngle * 5);

  return {
    id: `${sector}:${local}`,
    sector,
    local,
    residue,
    bit,
    x: Math.cos(sectorAngle) * (majorRadius + sheetOffset),
    y: Math.sin(sectorAngle) * (majorRadius + sheetOffset),
    z: band + 2.1 * Math.sin(residueAngle),
  };
}

function drawLine(ctx, a, b, color, width = 1, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
  ctx.restore();
}

function drawPoint(ctx, p, color, radius = 2.2, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export async function loadP900ExternalData() {
  const [edgeRes, checkpointRes] = await Promise.all([
    fetch(P900_EDGE_URL, { cache: "no-store" }),
    fetch(P900_CHECKPOINT_URL, { cache: "no-store" }),
  ]);

  if (!edgeRes.ok) throw new Error(`failed to load ${P900_EDGE_URL}`);
  if (!checkpointRes.ok) throw new Error(`failed to load ${P900_CHECKPOINT_URL}`);

  const edgeData = await edgeRes.json();
  const checkpoint = await checkpointRes.json();

  const points = new Map();
  for (let sector = 0; sector < 15; sector += 1) {
    for (let local = 0; local < 60; local += 1) {
      const p = buildP900Point(sector, local);
      points.set(p.id, p);
    }
  }

  return {
    edgeData,
    checkpoint,
    points,
  };
}

export function renderP900ExternalScene(ctx, canvas, data, project3D, options = {}) {
  if (!data?.edgeData?.external_edges || !data?.points) return;

  const {
    showEdges = true,
    showFaces = true,
    showLabels = false,
    revealCount = 900,
  } = options;

  const visibleCount = Math.max(0, Math.min(900, Math.floor(Number(revealCount) || 0)));
  const visibleIds = new Set();
  for (let sector = 0; sector < 15; sector += 1) {
    for (let local = 0; local < 60; local += 1) {
      const ordinal = sector * 60 + local + 1;
      if (ordinal <= visibleCount) {
        visibleIds.add(`${sector}:${local}`);
      }
    }
  }

  const projected = new Map();
  for (const [id, p] of data.points.entries()) {
    projected.set(id, project3D(safePoint(p)));
  }

  if (showEdges) {
    for (const edge of data.edgeData.external_edges) {
      const aid = `${edge.a[0]}:${edge.a[1]}`;
      const bid = `${edge.b[0]}:${edge.b[1]}`;
      if (!visibleIds.has(aid) || !visibleIds.has(bid)) continue;

      const a = projected.get(aid);
      const b = projected.get(bid);
      if (!a || !b) continue;

      const sameResidue = edge.a[1] % 30 === edge.b[1] % 30;
      const crossBit = (edge.a[1] >= 30) !== (edge.b[1] >= 30);

      const color = crossBit
        ? "rgba(255, 196, 230, 0.28)"
        : "rgba(186, 239, 255, 0.24)";

      drawLine(ctx, a, b, color, sameResidue ? 0.8 : 0.5, 1);
    }
  }

  if (showFaces) {
    for (const [id, p] of data.points.entries()) {
      if (!visibleIds.has(id)) continue;
      const q = projected.get(id);
      const color = p.bit === 0
        ? "rgba(186, 239, 255, 0.68)"
        : "rgba(255, 196, 230, 0.68)";
      drawPoint(ctx, q, color, 1.8, 0.85);
    }
  }

  if (showLabels) {
    ctx.save();
    ctx.fillStyle = "rgba(232,240,248,0.72)";
    ctx.font = "10px sans-serif";
    for (const [id, p] of data.points.entries()) {
      if (!visibleIds.has(id)) continue;
      if (p.local !== 0 && p.local !== 30) continue;
      const q = projected.get(id);
      ctx.fillText(`${p.sector}:${p.local}`, q.x + 4, q.y - 4);
    }
    ctx.restore();
  }

  ctx.save();
  ctx.fillStyle = "rgba(232,240,248,0.72)";
  ctx.font = "12px sans-serif";
  ctx.fillText(`P900 External: ${visibleCount}/900 states`, 28, 38);
  ctx.fillText("30 doubled-G15 sheets, no internal G60 edges", 28, 56);
  ctx.restore();
}
