const CHANNEL_REGISTRY_URL = "./data/g900_channels.v0.1.json";

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

export async function readG900ChannelRegistry() {
  const response = await fetch(CHANNEL_REGISTRY_URL, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to load G900 channel registry: HTTP " + response.status);
  }

  const payload = await response.json();
  validateG900ChannelRegistry(payload);
  return payload;
}

export function validateG900ChannelRegistry(payload) {
  requireObject(payload, "channel registry");

  if (payload.schema !== "g900.viewer.channels") {
    throw new Error("unexpected channel registry schema: " + payload.schema);
  }

  if (payload.version !== "0.1") {
    throw new Error("unexpected channel registry version: " + payload.version);
  }

  if (payload.body !== "g900") {
    throw new Error("channel registry body must be g900");
  }

  requireObject(payload.overlay, "channel overlay");

  if (payload.overlay.id !== "channels" || payload.overlay.layer !== 3) {
    throw new Error("channel registry overlay must be channels layer 3");
  }

  if (payload.overlay.status !== "next") {
    throw new Error("channel registry overlay status must be next");
  }

  requireFalse(payload.mutates_body, "channel registry mutates_body");
  requireFalse(payload.runtime_motion_authority, "channel registry runtime_motion_authority");
  requireFalse(payload.physics_claim, "channel registry physics_claim");

  if (!Array.isArray(payload.channel_sets)) {
    throw new Error("channel registry channel_sets must be an array");
  }

  let channelCount = 0;

  for (const channelSet of payload.channel_sets) {
    requireObject(channelSet, "channel set");
    requireString(channelSet.id, "channel set id");
    requireFalse(channelSet.mutates_body, "channel set mutates_body");

    if (!Array.isArray(channelSet.channels)) {
      throw new Error("channel set channels must be an array: " + channelSet.id);
    }

    channelCount += channelSet.channels.length;

    for (const channel of channelSet.channels) {
      requireObject(channel, "channel");
      requireString(channel.id, "channel id");
      requireFalse(channel.mutates_body, "channel mutates_body");
    }
  }

  if (payload.channel_set_count !== payload.channel_sets.length) {
    throw new Error("channel_set_count mismatch");
  }

  if (payload.channel_count !== channelCount) {
    throw new Error("channel_count mismatch");
  }

  if (payload.admitted_channel_count !== 0) {
    throw new Error("MVP channel registry must admit zero channels");
  }

  requireObject(payload.boundary, "channel boundary");
  requireFalse(payload.boundary.admits_channels, "channel boundary admits_channels");
  requireFalse(payload.boundary.renders_channels, "channel boundary renders_channels");
  requireFalse(payload.boundary.mutates_body, "channel boundary mutates_body");
  requireFalse(payload.boundary.physics_claim, "channel boundary physics_claim");
  requireFalse(payload.boundary.force_claim, "channel boundary force_claim");
  requireFalse(payload.boundary.runtime_motion_authority, "channel boundary runtime_motion_authority");
  requireFalse(payload.boundary.marker_lighting, "channel boundary marker_lighting");
  requireFalse(payload.boundary.gate_open, "channel boundary gate_open");

  if (!Array.isArray(payload.scope_modes) || payload.scope_modes.length === 0) {
    throw new Error("channel registry scope_modes must be a nonempty array");
  }

  for (const mode of payload.scope_modes) {
    requireObject(mode, "channel scope mode");
    requireString(mode.id, "channel scope mode id");
    requireString(mode.label, "channel scope mode label");
    requireString(mode.status, "channel scope mode status");
    requireString(mode.meaning, "channel scope mode meaning");
  }

  return true;
}

export function getG900ChannelSummary(payload) {
  validateG900ChannelRegistry(payload);

  return {
    version: payload.version,
    body: payload.body,
    body_version: payload.body_version,
    overlay: {
      id: payload.overlay.id,
      layer: payload.overlay.layer,
      status: payload.overlay.status
    },
    status: payload.status,
    contract: payload.contract,
    channel_set_count: payload.channel_set_count,
    channel_count: payload.channel_count,
    admitted_channel_count: payload.admitted_channel_count,
    scope_modes: payload.scope_modes.map((mode) => ({
      id: mode.id,
      label: mode.label,
      status: mode.status,
      meaning: mode.meaning
    })),
    candidate_receipts: Array.isArray(payload.candidate_receipts) ? payload.candidate_receipts.map((receipt) => ({
      id: receipt.id,
      candidate_id: receipt.candidate_id,
      receipt: receipt.receipt,
      mvp_status: receipt.mvp_status,
      renders_now: receipt.renders_now,
      admitted_in_mvp: receipt.admitted_in_mvp
    })) : [],
    mutates_body: false,
    runtime_motion_authority: false,
    physics_claim: false,
    boundary: payload.boundary,
    keeper: payload.keeper
  };
}
