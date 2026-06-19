export async function readG900GroundedLensRegistry() {
  const response = await fetch("./data/g900_grounded_lenses.v0.1.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Unable to load G900 grounded lens registry: HTTP " + response.status);
  }

  return response.json();
}

export function getG900GroundedLensSummary(registry) {
  if (!registry || typeof registry !== "object") {
    return {
      status: "grounded_lens_registry_unavailable",
      lens_count: 0,
      active_lens_count: 0,
      mutates_body: false,
      admits_channels: false,
      physics_claim: false
    };
  }

  const lenses = Array.isArray(registry.lenses) ? registry.lenses : [];

  return {
    schema: registry.schema || "g900.viewer.grounded_lenses",
    version: registry.version || "0.1",
    status: registry.status || "grounded_lens_registry_loaded",
    body: registry.body || "g900",
    body_version: registry.body_version || null,
    lens_count: lenses.length,
    active_lens_count: 0,
    render_allowed_now: false,
    available_lenses: lenses.map((lens) => ({
      id: lens.id,
      label: lens.label,
      status: lens.status,
      kind: lens.kind,
      ground: lens.ground,
      scoped_terminal: lens.scoped_terminal,
      native_selector: lens.native_selector || null,
      support_artifact: lens.support_artifact || null,
      keeper: lens.keeper || null
    })),
    mutates_body: false,
    admits_channels: false,
    physics_claim: false,
    force_claim: false,
    boundary: {
      transport_relation: false,
      channel_admission: false,
      marker_lighting: false,
      gate_open: false,
      body_mutation: false,
      force_claim: false,
      physics_claim: false
    }
  };
}
