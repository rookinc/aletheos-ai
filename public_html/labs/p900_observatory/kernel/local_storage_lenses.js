const P900_LENS_STORAGE_KEY = "p900_saved_lenses_v1";
const P900_LENS_SCHEMA_VERSION = 1;

function safeNowIso() {
  return new Date().toISOString();
}

function safeId() {
  const timePart = Date.now().toString(36);
  const randPart = Math.random().toString(36).slice(2, 8);
  return "lens_" + timePart + "_" + randPart;
}

function normalizeLens(raw) {
  if (!raw || typeof raw !== "object") return null;

  const id = String(raw.id || "").trim();
  const name = String(raw.name || "").trim();
  const params = String(raw.params || "").trim();

  if (!id || !name || !params) return null;

  return {
    id,
    name,
    params,
    createdAt: String(raw.createdAt || safeNowIso()),
    updatedAt: String(raw.updatedAt || raw.createdAt || safeNowIso()),
    schemaVersion: Number(raw.schemaVersion || P900_LENS_SCHEMA_VERSION),
  };
}

function readRawStorage(storage) {
  try {
    return storage.getItem(P900_LENS_STORAGE_KEY);
  } catch (err) {
    return null;
  }
}

function writeRawStorage(storage, value) {
  try {
    storage.setItem(P900_LENS_STORAGE_KEY, value);
    return true;
  } catch (err) {
    return false;
  }
}

export function localLensStorageAvailable(storage = window.localStorage) {
  if (!storage) return false;

  const testKey = P900_LENS_STORAGE_KEY + "_test";
  try {
    storage.setItem(testKey, "1");
    storage.removeItem(testKey);
    return true;
  } catch (err) {
    return false;
  }
}

export function loadLocalLenses(storage = window.localStorage) {
  const raw = readRawStorage(storage);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map(normalizeLens)
      .filter(Boolean);
  } catch (err) {
    return [];
  }
}

export function saveLocalLenses(lenses, storage = window.localStorage) {
  const clean = Array.isArray(lenses)
    ? lenses.map(normalizeLens).filter(Boolean)
    : [];

  return writeRawStorage(storage, JSON.stringify(clean));
}

export function createLocalLens({ name, params }, storage = window.localStorage) {
  const cleanName = String(name || "").trim();
  const cleanParams = String(params || "").trim();

  if (!cleanName) {
    return { ok: false, reason: "missing_name", lens: null };
  }

  if (!cleanParams) {
    return { ok: false, reason: "missing_params", lens: null };
  }

  const now = safeNowIso();
  const lens = {
    id: safeId(),
    name: cleanName,
    params: cleanParams,
    createdAt: now,
    updatedAt: now,
    schemaVersion: P900_LENS_SCHEMA_VERSION,
  };

  const lenses = loadLocalLenses(storage);
  lenses.push(lens);

  const ok = saveLocalLenses(lenses, storage);
  return { ok, reason: ok ? "saved" : "storage_failed", lens: ok ? lens : null };
}

export function updateLocalLens(id, patch, storage = window.localStorage) {
  const targetId = String(id || "").trim();
  if (!targetId) return { ok: false, reason: "missing_id", lens: null };

  const lenses = loadLocalLenses(storage);
  const index = lenses.findIndex((lens) => lens.id === targetId);
  if (index < 0) return { ok: false, reason: "not_found", lens: null };

  const updated = normalizeLens({
    ...lenses[index],
    ...patch,
    id: targetId,
    updatedAt: safeNowIso(),
  });

  if (!updated) return { ok: false, reason: "invalid_patch", lens: null };

  lenses[index] = updated;

  const ok = saveLocalLenses(lenses, storage);
  return { ok, reason: ok ? "updated" : "storage_failed", lens: ok ? updated : null };
}

export function deleteLocalLens(id, storage = window.localStorage) {
  const targetId = String(id || "").trim();
  if (!targetId) return { ok: false, reason: "missing_id" };

  const lenses = loadLocalLenses(storage);
  const kept = lenses.filter((lens) => lens.id !== targetId);

  if (kept.length === lenses.length) {
    return { ok: false, reason: "not_found" };
  }

  const ok = saveLocalLenses(kept, storage);
  return { ok, reason: ok ? "deleted" : "storage_failed" };
}

export function getLocalLens(id, storage = window.localStorage) {
  const targetId = String(id || "").trim();
  if (!targetId) return null;

  return loadLocalLenses(storage).find((lens) => lens.id === targetId) || null;
}

export function clearLocalLenses(storage = window.localStorage) {
  try {
    storage.removeItem(P900_LENS_STORAGE_KEY);
    return true;
  } catch (err) {
    return false;
  }
}
