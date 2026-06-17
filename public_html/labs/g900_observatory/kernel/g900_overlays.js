export async function readG900OverlayRegistry(url = "./data/g900_overlays.v0.1.json") {
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("failed to load G900 overlay registry: " + response.status);
  }

  const payload = await response.json();

  validateG900OverlayRegistry(payload);

  return payload;
}

export function validateG900OverlayRegistry(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("overlay registry must be an object");
  }

  if (payload.schema !== "g900.viewer.overlays") {
    throw new Error("unexpected overlay registry schema");
  }

  if (payload.body !== "g900") {
    throw new Error("overlay registry body must be g900");
  }

  if (payload.body_version !== "0.1") {
    throw new Error("overlay registry body_version must be 0.1");
  }

  if (!payload.boundary || payload.boundary.mutates_body !== false) {
    throw new Error("overlay registry must declare mutates_body false");
  }

  if (!Array.isArray(payload.layers)) {
    throw new Error("overlay registry layers must be an array");
  }

  const ids = new Set();
  const layerNumbers = new Set();

  for (const layer of payload.layers) {
    if (!layer || typeof layer !== "object") {
      throw new Error("overlay layer must be an object");
    }

    if (typeof layer.id !== "string" || !layer.id) {
      throw new Error("overlay layer id must be a nonempty string");
    }

    if (ids.has(layer.id)) {
      throw new Error("duplicate overlay layer id: " + layer.id);
    }

    ids.add(layer.id);

    if (!Number.isInteger(layer.layer)) {
      throw new Error("overlay layer number must be an integer: " + layer.id);
    }

    if (layerNumbers.has(layer.layer)) {
      throw new Error("duplicate overlay layer number: " + layer.layer);
    }

    layerNumbers.add(layer.layer);

    if (layer.layer < 2) {
      throw new Error("overlay layers must be layer 2 or above: " + layer.id);
    }

    if (layer.mutates_body !== false) {
      throw new Error("overlay layer must not mutate body: " + layer.id);
    }
  }

  return true;
}

export function getG900OverlaySummary(payload) {
  validateG900OverlayRegistry(payload);

  const layerRows = payload.layers
    .slice()
    .sort((a, b) => a.layer - b.layer)
    .map((layer) => {
      return {
        layer: layer.layer,
        id: layer.id,
        label: layer.label,
        status: layer.status,
        kind: layer.kind,
        mutates_body: layer.mutates_body,
        physics_claim: layer.physics_claim === true,
        claim: layer.claim || null
      };
    });

  const ladderRows = Array.isArray(payload.layer_ladder)
    ? payload.layer_ladder
        .slice()
        .sort((a, b) => a.layer - b.layer)
        .map((layer) => {
          return {
            layer: layer.layer,
            id: layer.id,
            label: layer.label,
            status: layer.status,
            kind: layer.kind,
            mutates_body: layer.mutates_body,
            meaning: layer.meaning || null
          };
        })
    : [];

  return {
    version: payload.version,
    body: payload.body,
    body_version: payload.body_version,
    status: payload.status,
    layer_ladder_version: payload.layer_ladder_version || null,
    layer_count: payload.layers.length,
    ladder_count: ladderRows.length,
    active: payload.layers
      .filter((layer) => layer.status === "active_reading")
      .map((layer) => layer.id),
    next: payload.layers
      .filter((layer) => layer.status === "next")
      .map((layer) => layer.id),
    reserved: payload.layers
      .filter((layer) => layer.status === "reserved")
      .map((layer) => layer.id),
    force_shadows: payload.layers
      .filter((layer) => layer.status === "force_shadow_reserved")
      .map((layer) => layer.id),
    layers: layerRows,
    ladder: ladderRows,
    mutates_body: payload.boundary.mutates_body,
    runtime_motion_authority: payload.boundary.runtime_motion_authority,
    physics_claim: payload.boundary.physics_claim,
    force_shadows_late: payload.boundary.force_shadows_late === true
  };
}
