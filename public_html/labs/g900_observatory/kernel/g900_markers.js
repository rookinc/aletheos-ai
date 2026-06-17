export async function readG900MarkerRegistry(url = "./data/g900_markers.v0.1.json") {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("failed to load G900 marker registry: " + response.status);
  }

  const payload = await response.json();
  validateG900MarkerRegistry(payload);
  return payload;
}

function requireObject(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(label + " must be an object");
  }
}

function requireArray(value, label) {
  if (!Array.isArray(value)) {
    throw new Error(label + " must be an array");
  }
}

function requireString(value, label) {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(label + " must be a non-empty string");
  }
}

function requireFalse(value, label) {
  if (value !== false) {
    throw new Error(label + " must be false");
  }
}

function requireTrue(value, label) {
  if (value !== true) {
    throw new Error(label + " must be true");
  }
}

function validateStringArray(value, label) {
  requireArray(value, label);
  for (const item of value) {
    requireString(item, label + " item");
  }
}

function validateMarker(marker) {
  requireObject(marker, "marker");
  requireString(marker.id, "marker id");
  requireString(marker.label, "marker label");
  requireString(marker.kind, "marker kind");
  requireString(marker.status, "marker status");
  requireString(marker.source_receipt, "marker source_receipt");

  validateStringArray(marker.edge_ids, "marker edge_ids");
  validateStringArray(marker.vertex_ids, "marker vertex_ids");

  if (marker.edge_ids.length === 0 && marker.vertex_ids.length === 0) {
    throw new Error("marker must reference at least one edge or vertex");
  }

  requireFalse(marker.mutates_body, "marker mutates_body");
  requireFalse(marker.channels_admitted, "marker channels_admitted");
  requireFalse(marker.physics_claim, "marker physics_claim");
  requireFalse(marker.force_claim, "marker force_claim");
}

function validateMarkerSet(markerSet) {
  requireObject(markerSet, "marker set");
  requireString(markerSet.id, "marker set id");
  requireString(markerSet.label, "marker set label");
  requireString(markerSet.status, "marker set status");
  requireFalse(markerSet.mutates_body, "marker set mutates_body");
  requireArray(markerSet.markers, "marker set markers");

  const ids = new Set();

  for (const marker of markerSet.markers) {
    validateMarker(marker);
    if (ids.has(marker.id)) {
      throw new Error("duplicate marker id: " + marker.id);
    }
    ids.add(marker.id);
  }
}

export function validateG900MarkerRegistry(payload) {
  requireObject(payload, "marker registry");

  if (payload.schema !== "g900.viewer.markers") {
    throw new Error("unexpected marker registry schema");
  }
  if (payload.version !== "0.1") {
    throw new Error("marker registry version must be 0.1");
  }
  if (payload.body !== "g900") {
    throw new Error("marker registry body must be g900");
  }
  if (payload.body_version !== "0.1") {
    throw new Error("marker registry body_version must be 0.1");
  }

  requireObject(payload.boundary, "marker registry boundary");
  requireTrue(payload.boundary.data_only, "marker registry data_only");
  requireTrue(payload.boundary.marker_only, "marker registry marker_only");
  requireTrue(payload.boundary.existing_body_edges_only, "marker registry existing_body_edges_only");
  requireFalse(payload.boundary.adds_edges, "marker registry adds_edges");
  requireFalse(payload.boundary.adds_vertices, "marker registry adds_vertices");
  requireFalse(payload.boundary.channels_admitted, "marker registry channels_admitted");
  requireFalse(payload.boundary.renders_channels, "marker registry renders_channels");
  requireFalse(payload.boundary.mutates_body, "marker registry mutates_body");
  requireFalse(payload.boundary.physics_claim, "marker registry physics_claim");
  requireFalse(payload.boundary.force_claim, "marker registry force_claim");

  requireArray(payload.marker_sets, "marker_sets");

  let markerCount = 0;
  let edgeRefCount = 0;
  let vertexRefCount = 0;
  const setIds = new Set();

  for (const markerSet of payload.marker_sets) {
    validateMarkerSet(markerSet);

    if (setIds.has(markerSet.id)) {
      throw new Error("duplicate marker set id: " + markerSet.id);
    }

    setIds.add(markerSet.id);
    markerCount += markerSet.markers.length;

    for (const marker of markerSet.markers) {
      edgeRefCount += marker.edge_ids.length;
      vertexRefCount += marker.vertex_ids.length;
    }
  }

  if (payload.marker_set_count !== setIds.size) {
    throw new Error("marker_set_count mismatch");
  }
  if (payload.marker_count !== markerCount) {
    throw new Error("marker_count mismatch");
  }
  if (payload.edge_counted_with_multiplicity !== edgeRefCount) {
    throw new Error("edge_counted_with_multiplicity mismatch");
  }
  if (payload.vertex_counted_with_multiplicity !== vertexRefCount) {
    throw new Error("vertex_counted_with_multiplicity mismatch");
  }
}

export function getG900MarkerSummary(payload) {
  validateG900MarkerRegistry(payload);

  return {
    version: payload.version,
    body: payload.body,
    body_version: payload.body_version,
    status: payload.status,
    marker_set_count: payload.marker_set_count,
    marker_count: payload.marker_count,
    marker_sets: payload.marker_sets.map((markerSet) => ({
      id: markerSet.id,
      label: markerSet.label,
      status: markerSet.status,
      marker_count: markerSet.markers.length,
      markers: markerSet.markers.map((marker) => ({
        id: marker.id,
        label: marker.label,
        kind: marker.kind,
        status: marker.status,
        edge_count: marker.edge_ids.length,
        vertex_count: marker.vertex_ids.length,
        source_receipt: marker.source_receipt
      }))
    })),
    boundary: payload.boundary
  };
}

