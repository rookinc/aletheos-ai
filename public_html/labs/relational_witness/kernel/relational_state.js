let RW_DATA = null;
let RW_MODES = {};

function rwSetData(data) {
  RW_DATA = data;
  RW_MODES = data.systems || {};
}

function rwBuildRenderableSystem(record) {
  const finite = record.finite;
  const layout = record.layout || {};
  const ambientLayout = layout.ambient || {};
  const surfaceLayout = layout.surface || {};

  const ambient = finite.A.map(function(id, idx) {
    const pos = ambientLayout[id] || {};
    return {
      id: id,
      label: pos.label || id,
      x: Number(pos.x || 220),
      y: Number(pos.y || (210 + idx * 90)),
      trace: finite.tau_A[id] || "-"
    };
  });

  const surface = finite.V.map(function(id, idx) {
    const pos = surfaceLayout[id] || {};
    return {
      id: id,
      label: pos.label || id,
      x: Number(pos.x || 660),
      y: Number(pos.y || (210 + idx * 90)),
      trace: finite.O[id] || "-",
      coherent: Boolean(finite.surface_coherent[id])
    };
  });

  const projection = Object.keys(finite.pi || {}).map(function(from) {
    return {
      from: from,
      to: finite.pi[from]
    };
  });

  return {
    title: record.title,
    summary: record.summary,
    intended_gap: record.intended_gap,
    finite: finite,
    ambient: ambient,
    surface: surface,
    projection: projection,
    selected: finite.selected || finite.V[0]
  };
}

function rwFindNode(system, id) {
  return system.ambient.concat(system.surface).find(function(node) {
    return node.id === id;
  });
}

function rwEvaluate(system) {
  const finite = system.finite;
  const vId = system.selected;
  const projectedFrom = [];

  finite.A_I.forEach(function(aId) {
    if (finite.pi[aId] === vId) {
      projectedFrom.push(aId);
    }
  });

  const projected = projectedFrom.length > 0;

  let matchingAmbient = null;
  projectedFrom.forEach(function(aId) {
    if (finite.O[vId] === finite.tau_A[aId]) {
      matchingAmbient = aId;
    }
  });

  const coherent = Boolean(finite.surface_coherent[vId]);
  const closed = matchingAmbient !== null;
  const witnessed = Boolean(finite.W[vId]);
  const admitted = closed && witnessed;

  return {
    surface_coherent: coherent,
    projected: projected,
    observed_closed: closed,
    witnessed: witnessed,
    admitted: admitted,
    selected_surface: vId,
    projected_from: projectedFrom,
    matching_ambient: matchingAmbient,
    observed_trace: finite.O[vId] || null,
    ambient_trace: matchingAmbient ? finite.tau_A[matchingAmbient] : null
  };
}
