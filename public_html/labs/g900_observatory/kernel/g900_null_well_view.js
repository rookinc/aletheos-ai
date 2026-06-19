(function () {
  "use strict";

  const URL = "./data/g900_null_well.v0.1.json";
  const ID = "g900-null-well-view";
  const ACTIVE_CLASS = "g900-null-well-orientation-active";

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function boundaryOk(data) {
    const b = data && data.boundary;
    const i = data && data.identity;
    const r = data && data.render;

    return !!(
      b &&
      i &&
      r &&
      Array.isArray(i.target_only_pair_ids) &&
      i.target_only_pair_ids.length === 0 &&
      Array.isArray(i.union_only_pair_ids) &&
      i.union_only_pair_ids.length === 1 &&
      i.union_only_pair_ids[0] === null &&
      i.flag_is_well === false &&
      r.body_coordinate_claim === false &&
      b.mutates_body === false &&
      b.adds_vertices === false &&
      b.adds_edges === false &&
      b.admits_channels === false &&
      b.lights_markers === false &&
      b.runtime_motion_authority === false &&
      b.physics_claim === false &&
      b.force_claim === false
    );
  }

  function findScopeHost() {
    const canvas = document.querySelector("canvas");
    if (!canvas || !canvas.parentElement) return null;

    const host = canvas.parentElement;
    const style = window.getComputedStyle(host);
    if (style.position === "static") host.style.position = "relative";
    return host;
  }

  function findOrientationControl() {
    const input = document.getElementById("stage-grid-toggle");
    if (!input) return null;

    return {
      input,
      shell: input.closest(".stage-grid-toggle") || input.closest("label") || input
    };
  }

  function publishNullWellOrientationSummary(value) {
    const control = findOrientationControl();
    window.__g900NullWellOrientationSummary = {
      schema: "g900.viewer.null_well_orientation",
      version: "0.1",
      mode: value ? "null_well_orientation" : "off",
      button: "#",
      xyz_indicator: value,
      null_well_visible: value,
      null_well_kind: "union_side_null_socket",
      render_kind: "viewport_null_socket",
      body_coordinate_claim: false,
      control_checked: control ? control.input.checked === true : false,
      mutates_body: false,
      adds_vertices: false,
      adds_edges: false,
      admits_channels: false,
      lights_markers: false,
      runtime_motion_authority: false,
      physics_claim: false,
      force_claim: false
    };
  }

  function setActive(value) {
    document.body.classList.toggle(ACTIVE_CLASS, value);

    const control = findOrientationControl();
    if (control) {
      control.input.setAttribute("aria-pressed", value ? "true" : "false");
      control.shell.classList.toggle("g900-orientation-toggle-active", value);
      control.shell.classList.toggle("g900-null-well-toggle-active", value);
    }

    publishNullWellOrientationSummary(value);
  }

  function bindOrientationControl() {
    const control = findOrientationControl();
    if (!control || control.input.dataset.g900NullWellBound === "true") return;

    control.input.dataset.g900NullWellBound = "true";
    control.shell.title = "Toggle # orientation: XYZ indicator plus Null Well readout";
    control.shell.setAttribute("aria-label", "Toggle # orientation with Null Well readout");

    control.input.addEventListener("change", function () {
      setActive(control.input.checked === true);
    });

    setActive(control.input.checked === true);
  }

  function renderWell(data) {
    if (document.getElementById(ID)) {
      setActive(true);
      return;
    }

    const host = findScopeHost();
    if (!host) {
      console.warn("[G900 null well] canvas host not found");
      return;
    }

    const well = document.createElement("aside");
    well.id = ID;
    well.className = "g900-null-well-view";
    well.title = data.identity.keeper || "Null Well orientation readout";
    well.innerHTML = [
      '<div class="g900-null-well-socket" aria-hidden="true">',
      '  <span class="g900-null-well-ring ring-a"></span>',
      '  <span class="g900-null-well-ring ring-b"></span>',
      '  <span class="g900-null-well-core"></span>',
      '</div>',
      '<div class="g900-null-well-label">',
      '  <span>union-side null</span>',
      '</div>'
    ].join("");

    host.appendChild(well);

    bindOrientationControl();
  }

  async function boot() {
    try {
      const response = await fetch(URL, { cache: "no-store" });
      if (!response.ok) throw new Error("HTTP " + response.status);

      const data = await response.json();
      if (!boundaryOk(data)) throw new Error("null well boundary check failed");

      renderWell(data);
    } catch (error) {
      console.warn("[G900 null well]", error && error.message ? error.message : error);
    }
  }

  ready(boot);
}());
