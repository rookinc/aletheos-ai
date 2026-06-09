const PHASE30_URL = "/json/p900/p900_phase30_combined_graph_export.json";

function shortId(id) {
  return String(id || "")
    .replace("_representative", "")
    .replace("gap1_orbit_1_representative", "gap1_orbit_1")
    .replace("gap1_orbit_2_representative", "gap1_orbit_2");
}

function countNumber(counts, raw, key, fallback) {
  return Number(
    counts?.[key] ??
    raw?.[key] ??
    raw?.[key.replace("_count", "")] ??
    fallback
  );
}

function normalizeEdge(e) {
  const sectorA = Number(e.sector_a ?? e.source_sector ?? 0);
  const localA = Number(e.local_a ?? e.source_local ?? 0);
  const sectorB = Number(e.sector_b ?? e.target_sector ?? 0);
  const localB = Number(e.local_b ?? e.target_local ?? 0);

  const source = `${sectorA}:${localA}`;
  const target = `${sectorB}:${localB}`;

  return {
    source,
    target,
    kind: e.edge_class || e.class || "edge",
    class: e.class || e.edge_class || "edge",
    sector_a: sectorA,
    local_a: localA,
    sector_b: sectorB,
    local_b: localB,
    residue_a: e.residue_a ?? null,
    residue_b: e.residue_b ?? null,
    shift_mod60: e.shift_mod60 ?? null,
  };
}

function normalizeCandidate(raw, fallbackId) {
  const sourceId = raw.id || raw.candidate_id || raw.name || fallbackId;
  const id = shortId(sourceId) || shortId(fallbackId);
  const counts = raw.counts || {};

  const internalEdges = Array.isArray(raw.internal_edges)
    ? raw.internal_edges.map(normalizeEdge)
    : [];

  const externalEdges = Array.isArray(raw.external_edges)
    ? raw.external_edges.map(normalizeEdge)
    : [];

  const combinedEdges = Array.isArray(raw.combined_edges)
    ? raw.combined_edges.map(normalizeEdge)
    : internalEdges.concat(externalEdges);

  return {
    id,
    source_id: sourceId,
    role: raw.role || raw.label || "",
    name: raw.name || sourceId,
    half_turn_set: raw.half_turn_set || [],
    identity_set: raw.identity_set || [],
    vertices: countNumber(counts, raw, "vertices", 900),
    internal_edges: countNumber(counts, raw, "internal_edges", internalEdges.length || 1800),
    external_edges: countNumber(counts, raw, "external_edges", externalEdges.length || 1800),
    combined_edges: countNumber(counts, raw, "combined_edges", combinedEdges.length || 3600),
    duplicate_edges: countNumber(counts, raw, "duplicate_edges", 0),
    degree_histogram: counts.degree_histogram || raw.degree_histogram || { "8": 900 },
    edge_class_counts: counts.edge_class_counts || raw.edge_class_counts || {},
    edge_lists: {
      internal_g60: internalEdges,
      external_p900: externalEdges,
      combined: combinedEdges,
    },
    raw,
  };
}

function candidatesFromPayload(payload) {
  if (Array.isArray(payload.candidates)) {
    return payload.candidates.map((item, index) => normalizeCandidate(item || {}, item?.id || `candidate_${index}`));
  }

  if (payload.candidates && typeof payload.candidates === "object") {
    return Object.entries(payload.candidates).map(([id, item]) => normalizeCandidate(item || {}, id));
  }

  throw new Error("No candidates found in Phase 30 payload");
}

function fallbackPayload() {
  return {
    status: "fallback_embedded",
    renderer_defaults: {
      default_candidate: "gap1_orbit_2",
      default_view: "combined",
      available_views: ["combined", "internal_g60", "external_p900", "residue_sheets", "sector_fibers"],
    },
    candidates: [
      {
        id: "gap1_orbit_1",
        role: "global-tightness candidate",
        half_turn_set: [0, 1, 2, 3, 5],
        identity_set: [4, 6, 7, 8, 9],
        counts: {
          vertices: 900,
          internal_edges: 1800,
          external_edges: 1800,
          combined_edges: 3600,
          duplicate_edges: 0,
          degree_histogram: { "8": 900 },
          edge_class_counts: {
            external_half_turn_mod30: 900,
            external_identity_same_local: 900,
            internal_same_sector: 1800,
          },
        },
      },
      {
        id: "gap1_orbit_2",
        role: "local-balance provisional selector",
        half_turn_set: [0, 1, 2, 3, 9],
        identity_set: [4, 5, 6, 7, 8],
        counts: {
          vertices: 900,
          internal_edges: 1800,
          external_edges: 1800,
          combined_edges: 3600,
          duplicate_edges: 0,
          degree_histogram: { "8": 900 },
          edge_class_counts: {
            external_half_turn_mod30: 900,
            external_identity_same_local: 900,
            internal_same_sector: 1800,
          },
        },
      },
    ],
  };
}

export async function loadP900Phase30() {
  try {
    const res = await fetch(PHASE30_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const payload = await res.json();
    const candidates = candidatesFromPayload(payload);

    if (!candidates.length) {
      throw new Error("No candidates found in Phase 30 payload");
    }

    return { payload, candidates, source: PHASE30_URL };
  } catch (err) {
    console.warn("Using embedded P900 Phase 30 fallback.", err);
    const payload = fallbackPayload();
    return { payload, candidates: candidatesFromPayload(payload), source: "embedded fallback" };
  }
}
