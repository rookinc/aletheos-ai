const DEFAULT_URL = "./data/g900_scaled_oscillation.v0.1.json";

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

function requireFalse(value, label) {
  if (value !== false) {
    throw new Error(label + " must be false");
  }
}

function requireArray(value, label) {
  if (!Array.isArray(value)) {
    throw new Error(label + " must be an array");
  }
}

export async function readG900ScaledOscillationKernel(url = DEFAULT_URL) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("failed to load G900 scaled oscillation kernel: " + response.status);
  }
  const payload = await response.json();
  validateG900ScaledOscillationKernel(payload);
  return payload;
}

export function validateG900ScaledOscillationKernel(payload) {
  requireObject(payload, "scaled oscillation kernel");

  if (payload.schema !== "g900.viewer.scaled_oscillation") {
    throw new Error("unexpected scaled oscillation schema");
  }

  if (payload.version !== "0.1") {
    throw new Error("scaled oscillation version must be 0.1");
  }

  if (payload.body !== "g900") {
    throw new Error("scaled oscillation body must be g900");
  }

  requireString(payload.status, "scaled oscillation status");
  requireString(payload.label, "scaled oscillation label");
  requireArray(payload.dependency_chain, "scaled oscillation dependency_chain");

  for (const step of payload.dependency_chain) {
    requireString(step, "scaled oscillation dependency step");
  }

  requireObject(payload.readout, "scaled oscillation readout");
  requireString(payload.readout.id, "scaled oscillation readout id");
  requireString(payload.readout.meaning, "scaled oscillation readout meaning");

  if (payload.readout.id !== "sheets_per_second") {
    throw new Error("scaled oscillation readout id must be sheets_per_second");
  }

  requireObject(payload.boundary, "scaled oscillation boundary");
  requireFalse(payload.boundary.mutates_body, "scaled oscillation mutates_body");
  requireFalse(payload.boundary.runtime_motion_authority, "scaled oscillation runtime_motion_authority");
  requireFalse(payload.boundary.opens_gates, "scaled oscillation opens_gates");
  requireFalse(payload.boundary.admits_channels, "scaled oscillation admits_channels");
  requireFalse(payload.boundary.lights_markers, "scaled oscillation lights_markers");
  requireFalse(payload.boundary.physics_claim, "scaled oscillation physics_claim");
  requireFalse(payload.boundary.force_claim, "scaled oscillation force_claim");
  requireFalse(payload.boundary.renderer_authority, "scaled oscillation renderer_authority");
  requireFalse(payload.boundary.counter_authority, "scaled oscillation counter_authority");

  return true;
}

export function getG900ScaledOscillationSummary(payload) {
  validateG900ScaledOscillationKernel(payload);

  return {
    schema: payload.schema,
    version: payload.version,
    status: payload.status,
    label: payload.label,
    dependency_chain: payload.dependency_chain.slice(),
    readout: {
      id: payload.readout.id,
      label: payload.readout.label,
      meaning: payload.readout.meaning,
      default_value: payload.readout.default_value,
      unit: payload.readout.unit,
      authored_by: payload.readout.authored_by,
      timed_by: payload.readout.timed_by
    },
    boundary: {
      mutates_body: false,
      runtime_motion_authority: false,
      opens_gates: false,
      admits_channels: false,
      lights_markers: false,
      physics_claim: false,
      force_claim: false,
      renderer_authority: false,
      counter_authority: false
    },
    keeper: payload.keeper
  };
}
