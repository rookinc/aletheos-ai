function assert(condition, message) {
  if (!condition) {
    throw new Error("G900 static body error: " + message);
  }
}

function deepFreeze(value) {
  if (!value || typeof value !== "object") return value;

  Object.freeze(value);

  for (const key of Object.keys(value)) {
    deepFreeze(value[key]);
  }

  return value;
}

function readXyz(value, label) {
  assert(Array.isArray(value), label + " must be an array");
  assert(value.length === 3, label + " must have three coordinates");

  return value.map((n, i) => {
    assert(Number.isFinite(n), label + "[" + i + "] must be finite");
    return n;
  });
}

export function readG900StaticBody(payload) {
  assert(payload && typeof payload === "object", "payload must be an object");
  assert(payload.schema === "g900.viewer.static_body", "schema mismatch");
  assert(typeof payload.version === "string", "version must be a string");
  assert(payload.anchor && payload.anchor.kind === "grid_origin", "anchor must be grid_origin");
  assert(Number.isFinite(payload.scale), "scale must be finite");
  assert(Array.isArray(payload.vertices), "vertices must be an array");
  assert(Array.isArray(payload.edges), "edges must be an array");

  const ids = new Set();

  const vertices = payload.vertices.map((vertex) => {
    assert(vertex && typeof vertex === "object", "vertex must be an object");
    assert(typeof vertex.id === "string" && vertex.id.length > 0, "vertex id required");
    assert(!ids.has(vertex.id), "duplicate vertex id " + vertex.id);
    ids.add(vertex.id);

    return {
      id: vertex.id,
      xyz: readXyz(vertex.xyz, "vertex " + vertex.id + " xyz")
    };
  });

  const edges = payload.edges.map((edge, index) => {
    assert(Array.isArray(edge), "edge " + index + " must be an array");
    assert(edge.length === 2, "edge " + index + " must have two endpoints");
    assert(ids.has(edge[0]), "edge " + index + " has unknown source " + edge[0]);
    assert(ids.has(edge[1]), "edge " + index + " has unknown target " + edge[1]);

    return [edge[0], edge[1]];
  });

  return deepFreeze({
    schema: payload.schema,
    version: payload.version,
    name: payload.name || "G900 static body",
    description: payload.description || "",
    anchor: {
      kind: "grid_origin",
      xyz: readXyz(payload.anchor.xyz || [0, 0, 0], "anchor xyz")
    },
    scale: payload.scale,
    vertices,
    edges
  });
}

export function getStaticBodySummary(body) {
  return String(body.vertices.length) + " vertices | " + String(body.edges.length) + " edges | anchored grid_origin";
}
