export async function readG900CarrierRegistry(url = "./data/g900_carriers.v0.1.json") {
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("failed to load G900 carrier registry: " + response.status);
  }

  const payload = await response.json();

  validateG900CarrierRegistry(payload);

  return payload;
}

function requireObject(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(label + " must be an object");
  }
}

function requireString(value, label) {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(label + " must be a nonempty string");
  }
}

function requireArray(value, label) {
  if (!Array.isArray(value)) {
    throw new Error(label + " must be an array");
  }
}

function requireFalse(value, label) {
  if (value !== false) {
    throw new Error(label + " must be false");
  }
}

function validateStringArray(values, label) {
  requireArray(values, label);

  for (const value of values) {
    requireString(value, label + " item");
  }
}

function validateRail(rail, carrierSetId) {
  requireObject(rail, "carrier rail");

  requireString(rail.id, "carrier rail id");
  requireString(rail.label, "carrier rail label");
  requireString(rail.kind, "carrier rail kind");

  requireFalse(rail.mutates_body, "carrier rail mutates_body");

  validateStringArray(rail.vertex_ids, "carrier rail vertex_ids");
  validateStringArray(rail.edge_ids, "carrier rail edge_ids");

  requireObject(rail.source, "carrier rail source");

  if (rail.vertex_ids.length === 0 && rail.edge_ids.length === 0) {
    throw new Error("carrier rail must reference at least one vertex or edge: " + carrierSetId + "/" + rail.id);
  }

  return true;
}

function validateCarrierSet(carrierSet) {
  requireObject(carrierSet, "carrier set");

  requireString(carrierSet.id, "carrier set id");
  requireString(carrierSet.label, "carrier set label");
  requireString(carrierSet.status, "carrier set status");

  requireFalse(carrierSet.mutates_body, "carrier set mutates_body");

  requireArray(carrierSet.rails, "carrier set rails");

  const railIds = new Set();

  for (const rail of carrierSet.rails) {
    validateRail(rail, carrierSet.id);

    if (railIds.has(rail.id)) {
      throw new Error("duplicate rail id in carrier set " + carrierSet.id + ": " + rail.id);
    }

    railIds.add(rail.id);
  }

  return true;
}

export function validateG900CarrierRegistry(payload) {
  requireObject(payload, "carrier registry");

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

  requireObject(payload.overlay, "carrier registry overlay");

  if (payload.overlay.id !== "carriers" || payload.overlay.layer !== 2) {
    throw new Error("carrier registry must bind to overlay layer 2 carriers");
  }

  requireObject(payload.boundary, "carrier registry boundary");
  requireFalse(payload.boundary.mutates_body, "carrier registry boundary mutates_body");
  requireFalse(payload.boundary.runtime_motion_authority, "carrier registry boundary runtime_motion_authority");
  requireFalse(payload.boundary.physics_claim, "carrier registry boundary physics_claim");

  requireArray(payload.carrier_sets, "carrier_sets");

  const carrierSetIds = new Set();
  let railCount = 0;
  let vertexRefCount = 0;
  let edgeRefCount = 0;

  for (const carrierSet of payload.carrier_sets) {
    validateCarrierSet(carrierSet);

    if (carrierSetIds.has(carrierSet.id)) {
      throw new Error("duplicate carrier set id: " + carrierSet.id);
    }

    carrierSetIds.add(carrierSet.id);
    railCount += carrierSet.rails.length;

    for (const rail of carrierSet.rails) {
      vertexRefCount += rail.vertex_ids.length;
      edgeRefCount += rail.edge_ids.length;
    }
  }

  if (payload.counts) {

    if (Object.prototype.hasOwnProperty.call(payload.counts, "vertices")) {
      throw new Error("legacy carrier count field forbidden: counts.vertices");
    }

    if (Object.prototype.hasOwnProperty.call(payload.counts, "edges")) {
      throw new Error("legacy carrier count field forbidden: counts.edges");
    }
    requireObject(payload.counts, "carrier registry counts");

    if (payload.counts.carrier_sets !== carrierSetIds.size) {
      throw new Error("carrier registry counts.carrier_sets mismatch");
    }

    if (payload.counts.rails !== railCount) {
      throw new Error("carrier registry counts.rails mismatch");
    }

    if (payload.counts.vertices_counted_with_multiplicity !== vertexRefCount) {
      throw new Error("carrier registry counts.vertices_counted_with_multiplicity mismatch");
    }

    if (payload.counts.edges_counted_with_multiplicity !== edgeRefCount) {
      throw new Error("carrier registry counts.edges_counted_with_multiplicity mismatch");
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
    contract: {
      carrier_set: "id label status mutates_body:false rails[]",
      rail: "id label kind vertex_ids[] edge_ids[] mutates_body:false source{}"
    },
    carrier_sets: carrierSets.map((carrierSet) => {
      return {
        id: carrierSet.id,
        label: carrierSet.label,
        status: carrierSet.status,
        rail_count: carrierSet.rails.length,
        rails: carrierSet.rails.map((rail) => {
          return {
            id: rail.id,
            label: rail.label,
            kind: rail.kind,
            status: rail.status || null,
            vertex_count: rail.vertex_ids.length,
            edge_count: rail.edge_ids.length,
            source_kind: rail.source ? rail.source.kind : null,
            selector: rail.source ? rail.source.selector : null
          };
        })
      };
    }),
    carrier_set_count: carrierSets.length,
    rail_count: railCount,
    mutates_body: false,
    runtime_motion_authority: false,
    physics_claim: false
  };
}
