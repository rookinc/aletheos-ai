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

  return {
    version: payload.version,
    body: payload.body,
    body_version: payload.body_version,
    layer_count: payload.layers.length,
    next: payload.layers
      .filter((layer) => layer.status === "next")
      .map((layer) => layer.id),
    reserved: payload.layers
      .filter((layer) => layer.status === "reserved")
      .map((layer) => layer.id),
    mutates_body: false
  };
}
