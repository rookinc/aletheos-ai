(function () {
  "use strict";

  const URL = "./data/g900_summit_flag.v0.1.json";
  const ID = "g900-summit-flag-view";

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function boundaryOk(data) {
    const b = data && data.boundary;
    return !!(
      b &&
      b.mutates_body === false &&
      b.adds_vertices === false &&
      b.adds_edges === false &&
      b.admits_channels === false &&
      b.lights_markers === false &&
      b.runtime_motion_authority === false &&
      b.physics_claim === false &&
      b.force_claim === false &&
      data.render &&
      data.render.body_coordinate_claim === false &&
      data.well_relation &&
      data.well_relation.flag_is_well === false
    );
  }

  function findScopeHost() {
    const canvas = document.querySelector("canvas");
    if (!canvas) return null;

    const host = canvas.parentElement;
    if (!host) return null;

    const style = window.getComputedStyle(host);
    if (style.position === "static") {
      host.style.position = "relative";
    }

    return host;
  }

  function renderFlag(data) {
    if (document.getElementById(ID)) return;

    const host = findScopeHost();
    if (!host) {
      console.warn("[G900 summit flag] canvas host not found");
      return;
    }

    const flag = document.createElement("aside");
    flag.id = ID;
    flag.className = "g900-summit-flag-view";
    flag.innerHTML = [
      '<div class="g900-summit-flag-pennant">067</div>',
      '<div class="g900-summit-flag-copy">',
      '  <strong>Summit flag</strong>',
      '  <span>The flag is not the well.</span>',
      '</div>'
    ].join("");

    flag.title = data.well_relation.keeper || data.meaning || "Summit flag receipt";
    host.appendChild(flag);
  }

  async function boot() {
    try {
      const response = await fetch(URL, { cache: "no-store" });
      if (!response.ok) throw new Error("HTTP " + response.status);
      const data = await response.json();

      if (!boundaryOk(data)) {
        throw new Error("summit flag boundary check failed");
      }

      renderFlag(data);
    } catch (error) {
      console.warn("[G900 summit flag]", error && error.message ? error.message : error);
    }
  }

  ready(boot);
}());
