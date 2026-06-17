function fail(message) {
  throw new Error("G900 static body error: " + message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function finiteNumber(value, message) {
  const n = Number(value);
  assert(Number.isFinite(n), message);
  return n;
}

function readXyz(value, message) {
  assert(Array.isArray(value), message + " must be an array");
  assert(value.length === 3, message + " must have length 3");

  return [
    finiteNumber(value[0], message + " x must be finite"),
    finiteNumber(value[1], message + " y must be finite"),
    finiteNumber(value[2], message + " z must be finite")
  ];
}

export function readG900StaticBody(payload) {
  assert(payload && typeof payload === "object", "payload must be an object");
  assert(payload.schema === "g900.viewer.static_body", "schema mismatch");
  assert(typeof payload.version === "string" && payload.version.length > 0, "version is required");

  assert(payload.anchor && typeof payload.anchor === "object", "anchor is required");
  assert(payload.anchor.kind === "grid_origin", "anchor.kind must be grid_origin");

  const anchor = {
    kind: payload.anchor.kind,
    xyz: readXyz(payload.anchor.xyz, "anchor.xyz")
  };

  const scale = finiteNumber(payload.scale ?? 1, "scale must be finite");
  assert(scale > 0, "scale must be positive");

  assert(Array.isArray(payload.vertices), "vertices must be an array");
  assert(Array.isArray(payload.edges), "edges must be an array");

  const vertices = payload.vertices.map((vertex, index) => {
    assert(vertex && typeof vertex === "object", "vertex " + index + " must be an object");
    assert(vertex.id !== undefined, "vertex " + index + " id is required");

    return {
      id: String(vertex.id),
      xyz: readXyz(vertex.xyz, "vertex " + index + " xyz")
    };
  });

  const ids = new Set(vertices.map((vertex) => vertex.id));
  assert(ids.size === vertices.length, "vertex ids must be unique");

  const edges = payload.edges.map((edge, index) => {
    assert(Array.isArray(edge), "edge " + index + " must be an array");
    assert(edge.length === 2, "edge " + index + " must have length 2");

    const a = String(edge[0]);
    const b = String(edge[1]);

    assert(ids.has(a), "edge " + index + " missing source vertex " + a);
    assert(ids.has(b), "edge " + index + " missing target vertex " + b);

    return [a, b];
  });

  return {
    schema: payload.schema,
    version: payload.version,
    name: payload.name || "G900 static body",
    description: payload.description || "",
    source: payload.source || {},
    anchor,
    scale,
    vertices,
    edges
  };
}

export function getStaticBodySummary(body) {
  return [
    String(body.vertices.length) + " vertices",
    String(body.edges.length) + " edges",
    "anchored " + body.anchor.kind
  ].join(" | ");
}
