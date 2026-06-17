export async function readG900CarrierRegistry(url = "./data/g900_carriers.v0.1.json") {
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("failed to load G900 carrier registry: " + response.status);
  }

  const payload = await response.json();

  validateG900CarrierRegistry(payload);

  return payload;
}

export function validateG900CarrierRegistry(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("carrier registry must be an object");
  }

  if (payload.schema !== "g900.viewer.carriers") {
    throw new Error("unexpected carrier registry schema");
  }

  if (payload.version !== "0.1") {
    throw new Error("carrier registry version must be 0.1");
  }

  if (payload.body !== "g900") {
    throw new Error("carrier registry body must be g900");
  }

  if (payload.body_version !== "0.1") {
    throw new Error("carrier registry body_version must be 0.1");
  }

  if (!payload.overlay || payload.overlay.id !== "carriers" || payload.overlay.layer !== 6) {
    throw new Error("carrier registry must bind to overlay layer 6 carriers");
  }

  if (!payload.boundary || payload.boundary.mutates_body !== false) {
    throw new Error("carrier registry must declare mutates_body false");
  }

  if (payload.boundary.runtime_motion_authority !== false) {
    throw new Error("carrier registry must declare runtime_motion_authority false");
  }

  if (payload.boundary.physics_claim !== false) {
    throw new Error("carrier registry must declare physics_claim false");
  }

  if (!Array.isArray(payload.carrier_sets)) {
    throw new Error("carrier_sets must be an array");
  }

  const ids = new Set();

  for (const carrierSet of payload.carrier_sets) {
    if (!carrierSet || typeof carrierSet !== "object") {
      throw new Error("carrier set must be an object");
    }

    if (typeof carrierSet.id !== "string" || !carrierSet.id) {
      throw new Error("carrier set id must be a nonempty string");
    }

    if (ids.has(carrierSet.id)) {
      throw new Error("duplicate carrier set id: " + carrierSet.id);
    }

    ids.add(carrierSet.id);

    if (carrierSet.mutates_body !== false) {
      throw new Error("carrier set must declare mutates_body false: " + carrierSet.id);
    }

    if (!Array.isArray(carrierSet.rails)) {
      throw new Error("carrier set rails must be an array: " + carrierSet.id);
    }
  }

  return true;
}

export function getG900CarrierSummary(payload) {
  validateG900CarrierRegistry(payload);

  const carrierSets = payload.carrier_sets;
  const railCount = carrierSets.reduce((total, carrierSet) => {
    return total + carrierSet.rails.length;
  }, 0);

  return {
    version: payload.version,
    body: payload.body,
    body_version: payload.body_version,
    overlay: payload.overlay,
    status: payload.status,
    carrier_set_count: carrierSets.length,
    rail_count: railCount,
    mutates_body: false,
    runtime_motion_authority: false,
    physics_claim: false
  };
}
