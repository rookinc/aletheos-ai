function assert(condition, message) {
  if (!condition) {
    throw new Error("G900 grammar error: " + message);
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

export function readG900Grammar(payload) {
  assert(payload && typeof payload === "object", "payload must be an object");
  assert(payload.schema === "g900.viewer.grammar", "schema mismatch");
  assert(typeof payload.version === "string", "version must be a string");
  assert(Array.isArray(payload.layers), "layers must be an array");

  const seen = new Set();
  const layers = payload.layers.map((layer, expectedIndex) => {
    assert(layer && typeof layer === "object", "layer must be an object");
    assert(layer.index === expectedIndex, "layer index must be contiguous");
    assert(typeof layer.key === "string" && layer.key.length > 0, "layer key required");
    assert(!seen.has(layer.key), "duplicate layer key " + layer.key);
    seen.add(layer.key);

    assert(typeof layer.label === "string", "layer label required for " + layer.key);
    assert(typeof layer.role === "string", "layer role required for " + layer.key);
    assert(Array.isArray(layer.depends_on), "depends_on must be an array for " + layer.key);

    for (const dependency of layer.depends_on) {
      assert(seen.has(dependency), layer.key + " depends on unknown or later layer " + dependency);
    }

    return {
      index: layer.index,
      key: layer.key,
      label: layer.label,
      role: layer.role,
      depends_on: [...layer.depends_on]
    };
  });

  return deepFreeze({
    schema: payload.schema,
    version: payload.version,
    name: payload.name || "G900 grammar",
    description: payload.description || "",
    layers
  });
}

export function getGrammarLayerStack(grammar) {
  return grammar.layers.map((layer) => ({ ...layer, depends_on: [...layer.depends_on] }));
}

export function getGrammarLayerStackLabel(grammar) {
  return grammar.layers
    .map((layer) => String(layer.index) + ":" + layer.key)
    .join(" | ");
}
