const P900_EDGE_URL = "/json/p900/p900_phase17_external_edge_list.json";
const P900_CHECKPOINT_URL = "/json/p900/p900_phase20_checkpoint_summary.json";

function safePoint(v) {
  return {
    x: Number(v?.x ?? 0),
    y: Number(v?.y ?? 0),
    z: Number(v?.z ?? 0),
  };
}

function buildP900Point(sector, local, modelTick = 0, echoLayer = 0) {
  const residue = local % 30;
  const bit = local >= 30 ? 1 : 0;

  const overdrive = Math.max(0, Number(modelTick) - 900);
  const layer = Math.max(0, Number(echoLayer) || 0);

  const sectorAngle =
    (Math.PI * 2 * sector) / 15 +
    overdrive * 0.004 +
    layer * 0.055;

  const residueAngle =
    (Math.PI * 2 * residue) / 30 +
    overdrive * 0.007 +
    layer * 0.031;

  const breath =
    0.22 * Math.sin(overdrive * 0.025 + residue * 0.31 + bit * Math.PI + layer * 0.7);

  const band = (bit === 0 ? -0.42 : 0.42) + breath;

  const majorRadius =
    4.8 +
    layer * 0.42 +
    0.42 * Math.sin(residueAngle * 3) +
    0.18 * Math.sin(overdrive * 0.011 + sector * 0.7);

  const sheetOffset = 0.10 * Math.cos(residueAngle * 5);

  return {
    id: `${sector}:${local}`,
    sector,
    local,
    residue,
    bit,
    echoLayer: layer,
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

function visibleArtifactIds(simStateCount) {
  const ids = new Set();
  const artifactVisible = Math.min(900, Math.max(0, Math.floor(Number(simStateCount) || 0)));

  for (let sector = 0; sector < 15; sector += 1) {
    for (let local = 0; local < 60; local += 1) {
      const ordinal = sector * 60 + local + 1;
      if (ordinal <= artifactVisible) {
        ids.add(`${sector}:${local}`);
      }
    }
  }

  return ids;
}

function overdriveEchoInfo(simStateCount) {
  const overdrive = Math.max(0, Math.floor(Number(simStateCount) || 0) - 900);
  const fullEchoLayers = Math.floor(overdrive / 900);
  const partialEchoStates = overdrive % 900;

  return {
    overdrive,
    fullEchoLayers,
    partialEchoStates,
    simulatedStates: Math.max(0, Math.floor(Number(simStateCount) || 0)),
  };
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
      const p = buildP900Point(sector, local, 0, 0);
      points.set(p.id, p);
    }
  }

  return {
    edgeData,
    checkpoint,
    points,
  };
}

function renderLayer(ctx, data, project3D, options) {
  const {
    modelTick,
    simStateCount,
    echoLayer,
    echoPartialLimit,
    showEdges,
    showFaces,
    showLabels,
    alphaScale,
    pointRadius,
  } = options;

  const visibleIds = visibleArtifactIds(echoPartialLimit ?? simStateCount);
  const projected = new Map();

  for (let sector = 0; sector < 15; sector += 1) {
    for (let local = 0; local < 60; local += 1) {
      const id = `${sector}:${local}`;
      if (!visibleIds.has(id)) continue;
      const p = buildP900Point(sector, local, modelTick, echoLayer);
      projected.set(id, project3D(safePoint(p)));
    }
  }

  if (showEdges) {
    for (const edge of data.edgeData.external_edges) {
      const aid = `${edge.a[0]}:${edge.a[1]}`;
      const bid = `${edge.b[0]}:${edge.b[1]}`;
      if (!visibleIds.has(aid) || !visibleIds.has(bid)) continue;

      const a = projected.get(aid);
      const b = projected.get(bid);
      if (!a || !b) continue;

      const crossBit = (edge.a[1] >= 30) !== (edge.b[1] >= 30);
      const color = crossBit
        ? `rgba(255, 196, 230, ${0.30 * alphaScale})`
        : `rgba(186, 239, 255, ${0.26 * alphaScale})`;

      drawLine(ctx, a, b, color, echoLayer === 0 ? 0.8 : 0.55, 1);
    }
  }

  if (showFaces) {
    for (let sector = 0; sector < 15; sector += 1) {
      for (let local = 0; local < 60; local += 1) {
        const id = `${sector}:${local}`;
        if (!visibleIds.has(id)) continue;

        const q = projected.get(id);
        if (!q) continue;

        const bit = local >= 30 ? 1 : 0;
        const color = bit === 0
          ? `rgba(186, 239, 255, ${0.72 * alphaScale})`
          : `rgba(255, 196, 230, ${0.72 * alphaScale})`;

        drawPoint(ctx, q, color, pointRadius, 0.9);
      }
    }
  }

  if (showLabels && echoLayer === 0) {
    ctx.save();
    ctx.fillStyle = "rgba(232,240,248,0.72)";
    ctx.font = "10px sans-serif";

    for (let sector = 0; sector < 15; sector += 1) {
      for (const local of [0, 30]) {
        const id = `${sector}:${local}`;
        if (!visibleIds.has(id)) continue;
        const q = projected.get(id);
        if (q) ctx.fillText(`${sector}:${local}`, q.x + 4, q.y - 4);
      }
    }

    ctx.restore();
  }
}

export function renderP900ExternalScene(ctx, canvas, data, project3D, options = {}) {
  if (!data?.edgeData?.external_edges || !data?.points) return;

  const {
    showEdges = true,
    showFaces = true,
    showLabels = false,
    revealCount = 0,
    modelTick = revealCount,
  } = options;

  const simStateCount = Math.max(0, Math.floor(Number(revealCount) || 0));
  const visualTick = Math.max(0, Math.floor(Number(modelTick) || 0));
  const echo = overdriveEchoInfo(simStateCount);

  renderLayer(ctx, data, project3D, {
    modelTick: visualTick,
    simStateCount,
    echoLayer: 0,
    showEdges,
    showFaces,
    showLabels,
    alphaScale: 1,
    pointRadius: 1.8,
  });

  /*
    Post-900 overdrive is intentionally simulated.

    To keep phone rendering safe, we draw at most three echo layers.
    The readout still reports the full simulated state count and
    overdrive count. The visual shows the latest overdrive shell behavior
    rather than allocating unbounded geometry.
  */
  const visibleEchoLayers = Math.min(3, echo.fullEchoLayers + (echo.partialEchoStates > 0 ? 1 : 0));
  const firstLayer = Math.max(1, echo.fullEchoLayers - visibleEchoLayers + 2);

  for (let i = 0; i < visibleEchoLayers; i += 1) {
    const layer = firstLayer + i;
    const isPartial = layer === echo.fullEchoLayers + 1 && echo.partialEchoStates > 0;
    const partialLimit = isPartial ? echo.partialEchoStates : 900;

    renderLayer(ctx, data, project3D, {
      modelTick: visualTick,
      simStateCount: 900,
      echoLayer: layer,
      echoPartialLimit: partialLimit,
      showEdges,
      showFaces,
      showLabels: false,
      alphaScale: Math.max(0.16, 0.46 - i * 0.10),
      pointRadius: Math.max(0.9, 1.35 - i * 0.15),
    });
  }

  ctx.save();
  ctx.fillStyle = "rgba(232,240,248,0.72)";
  ctx.font = "12px sans-serif";
  ctx.fillText(`P900 Simulator: ${echo.simulatedStates} simulated states`, 28, 38);
  ctx.fillText(`artifact 900, overdrive ${echo.overdrive}`, 28, 56);
  ctx.fillText("post-900 echo beyond checkpoint", 28, 74);
  ctx.restore();
}
