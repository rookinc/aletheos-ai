(function () {
  "use strict";

  const URL = "./data/g900_channels.v0.1.json";
  const STORAGE_MODE_KEY = "g900.channelScopeMode";
  const STORAGE_OPEN_KEY = "g900.channelScopeOpen";

  const FALLBACK_MODES = {
    no_admitted_channels: {
      label: "No admitted channels",
      status: "mvp_null_state",
      meaning: "Layer 3 records that the MVP Scope admits zero live channels."
    },
    carrier_eligibility: {
      label: "Carrier eligibility",
      status: "permission_question",
      meaning: "Carrier readings may become future channel questions, but carriers are not channels."
    },
    six_nine_boundary_question: {
      label: "Six-nine boundary question",
      status: "permission_question",
      meaning: "The six-nine receipt neighborhood can be inspected as a future permission region without admitting transport."
    },
    return_cell_question: {
      label: "Return-cell question",
      status: "withheld_from_mvp",
      meaning: "Return-cell channel receipts exist upstream, but the MVP Scope does not admit or render them."
    }
  };

  let registry = null;
  let modes = Object.assign({}, FALLBACK_MODES);
  let activeMode = localStorage.getItem(STORAGE_MODE_KEY) || "no_admitted_channels";

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function panelOpen() {
    const toggle = document.getElementById("channel-scope-panel-toggle");
    return Boolean(toggle && toggle.checked);
  }

  function modeRecord(mode) {
    return modes[mode] || FALLBACK_MODES.no_admitted_channels;
  }

  function publish() {
    const mode = activeMode;
    const record = modeRecord(mode);

    window.__g900ChannelScopeSummary = {
      schema: "g900.viewer.channel_scope",
      version: "0.1",
      layer: 3,
      panel_open: panelOpen(),
      mode: mode,
      label: record.label,
      status: record.status,
      admitted_channel_count: registry ? registry.admitted_channel_count : 0,
      channel_count: registry ? registry.channel_count : 0,
      renders_channels: false,
      admits_channels: false,
      mutates_body: false,
      runtime_motion_authority: false,
      marker_lighting: false,
      gate_open: false,
      physics_claim: false,
      force_claim: false,
      meaning: record.meaning,
      keeper: registry && registry.keeper ? registry.keeper : "Carriers show readable structure. Channels ask permission. The MVP Scope admits zero live channels."
    };
  }

  function syncPanelOpen() {
    const open = panelOpen();
    const body = document.getElementById("channel-scope-panel-body");

    if (body) body.hidden = !open;

    setText("channel-scope-panel-toggle-label", open ? "ON" : "OFF");

    const panel = document.querySelector('[data-layer-panel="channels"]');
    if (panel) panel.classList.toggle("channel-scope-panel-open", open);

    localStorage.setItem(STORAGE_OPEN_KEY, open ? "1" : "0");
  }

  function syncFlags() {
    document.querySelectorAll("[data-channel-scope-mode]").forEach(function (btn) {
      const active = btn.dataset.channelScopeMode === activeMode;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function sync() {
    const admitted = registry && Number.isFinite(Number(registry.admitted_channel_count)) ? Number(registry.admitted_channel_count) : 0;
    const record = modeRecord(activeMode);

    syncPanelOpen();
    syncFlags();

    setText("channel-count-readout", String(admitted));
    setText("channel-scope-note", "Layer 3 channel scope map. " + record.meaning + " Zero live channel rendering. Body unchanged.");

    publish();
  }

  async function loadRegistry() {
    try {
      const response = await fetch(URL, { cache: "no-store" });
      if (!response.ok) throw new Error("HTTP " + response.status);

      registry = await response.json();

      if (Array.isArray(registry.scope_modes)) {
        modes = {};
        for (const mode of registry.scope_modes) {
          if (mode && mode.id) modes[mode.id] = mode;
        }
      }
    } catch (error) {
      console.warn("[G900 channel scope]", error && error.message ? error.message : error);
      registry = null;
      modes = Object.assign({}, FALLBACK_MODES);
    }
  }

  function bind() {
    const toggle = document.getElementById("channel-scope-panel-toggle");
    if (toggle) {
      toggle.checked = localStorage.getItem(STORAGE_OPEN_KEY) === "1";
      toggle.addEventListener("change", sync);
    }

    document.querySelectorAll("[data-channel-scope-mode]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeMode = btn.dataset.channelScopeMode || "no_admitted_channels";
        localStorage.setItem(STORAGE_MODE_KEY, activeMode);
        sync();
      });
    });
  }

  ready(async function () {
    bind();
    await loadRegistry();
    sync();
  });
}());
