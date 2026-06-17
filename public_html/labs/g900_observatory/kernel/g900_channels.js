const CHANNEL_REGISTRY_URL = "./data/g900_channels.v0.1.json";

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
  if (!payload || typeof payload !== "object") {
    throw new Error("channel registry must be an object");
  }

  if (payload.schema !== "g900.viewer.channels") {
    throw new Error("unexpected channel registry schema: " + payload.schema);
  }

  if (payload.version !== "0.1") {
    throw new Error("unexpected channel registry version: " + payload.version);
  }

  if (payload.body !== "g900") {
    throw new Error("channel registry body must be g900");
  }

  if (!payload.overlay || payload.overlay.id !== "channels" || payload.overlay.layer !== 3) {
    throw new Error("channel registry overlay must be channels layer 3");
  }

  if (payload.overlay.status !== "next") {
    throw new Error("channel registry overlay status must be next");
  }

  if (payload.mutates_body !== false) {
    throw new Error("channel registry must not mutate body");
  }

  if (payload.runtime_motion_authority !== false) {
    throw new Error("channel registry must not have runtime motion authority");
  }

  if (payload.physics_claim !== false) {
    throw new Error("channel registry must not make physics claim");
  }

  if (!Array.isArray(payload.channel_sets)) {
    throw new Error("channel registry channel_sets must be an array");
  }

  let channelCount = 0;

  for (const channelSet of payload.channel_sets) {
    if (!channelSet || typeof channelSet !== "object") {
      throw new Error("channel set must be an object");
    }

    if (typeof channelSet.id !== "string" || !channelSet.id) {
      throw new Error("channel set id must be a nonempty string");
    }

    if (channelSet.mutates_body !== false) {
      throw new Error("channel set must not mutate body: " + channelSet.id);
    }

    if (!Array.isArray(channelSet.channels)) {
      throw new Error("channel set channels must be an array: " + channelSet.id);
    }

    channelCount += channelSet.channels.length;

    for (const channel of channelSet.channels) {
      if (!channel || typeof channel !== "object") {
        throw new Error("channel must be an object");
      }

      if (typeof channel.id !== "string" || !channel.id) {
        throw new Error("channel id must be a nonempty string");
      }

      if (channel.mutates_body !== false) {
        throw new Error("channel must not mutate body: " + channel.id);
      }
    }
  }

  if (payload.channel_set_count !== payload.channel_sets.length) {
    throw new Error("channel_set_count mismatch");
  }

  if (payload.channel_count !== channelCount) {
    throw new Error("channel_count mismatch");
  }

  if (!payload.boundary || payload.boundary.admits_channels !== false) {
    throw new Error("channel scaffold must not admit channels");
  }

  if (payload.boundary.renders_channels !== false) {
    throw new Error("channel scaffold must not render channels");
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
    admitted_channel_count: payload.channel_count,
    channel_sets: payload.channel_sets.map((channelSet) => ({
      id: channelSet.id,
      label: channelSet.label,
      status: channelSet.status,
      channel_count: Array.isArray(channelSet.channels) ? channelSet.channels.length : 0
    })),
    mutates_body: false,
    runtime_motion_authority: false,
    physics_claim: false,
    boundary: payload.boundary
  };
}
