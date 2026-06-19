(function () {
  "use strict";

  const PANEL_ID = "g900-runtime-oscillator-console";

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function findConsoleAnchor() {
    const download = document.getElementById("download-state-json");
    if (!download) return null;

    const row = download.closest("div");
    if (row && row.parentElement) {
      return row;
    }

    return download;
  }

  function readSheetsPerSecond() {
    const bodyText = document.body ? document.body.textContent || "" : "";
    const match = bodyText.match(/Sheets\/sec\s*([0-9]+(?:\.[0-9]+)?)/i);
    if (match) return Number(match[1]);

    const input =
      document.querySelector("[data-sheets-per-second]") ||
      document.getElementById("sheets-per-second") ||
      document.getElementById("sheets-per-second-slider");

    if (input && input.value !== undefined) {
      const value = Number(input.value);
      if (Number.isFinite(value)) return value;
    }

    return 790;
  }

  function createPanel(host) {
    if (document.getElementById(PANEL_ID)) return document.getElementById(PANEL_ID);

    const panel = document.createElement("section");
    panel.id = PANEL_ID;
    panel.className = "g900-runtime-oscillator-console";
    panel.innerHTML = [
      "<h3>Runtime oscillator</h3>",
      '<dl class="g900-runtime-oscillator-grid">',
      "  <div><dt>Oscillator source</dt><dd>device timing substrate</dd></div>",
      '  <div><dt>Runtime witness</dt><dd id="g900-runtime-clock-witness">performance.now()</dd></div>',
      '  <div><dt>Render witness</dt><dd id="g900-render-clock-witness">requestAnimationFrame</dd></div>',
      '  <div><dt>Frame interval</dt><dd id="g900-runtime-frame-interval">measuring...</dd></div>',
      '  <div><dt>Render Hz</dt><dd id="g900-runtime-render-hz">measuring...</dd></div>',
      '  <div><dt>Sheets/sec</dt><dd id="g900-runtime-sheets-per-sec">measuring...</dd></div>',
      "</dl>",
      '<p class="g900-runtime-oscillator-chain">',
      "  Chain: oscillator -&gt; scaled oscillation -&gt; runtime clock -&gt; sheets/sec readout -&gt; grammar-earned sheets -&gt; visible trace.",
      "</p>",
      '<p class="g900-runtime-oscillator-boundary">',
      "  Apparatus dependency only. No gate authority. No channel admission. No marker lighting. No force or physics claim.",
      "</p>"
    ].join("");

    host.appendChild(panel);
    return panel;
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function publishRuntimeOscillatorSummary(summary) {
    window.__g900RuntimeOscillatorSummary = Object.assign({
      schema: "g900.viewer.runtime_oscillator",
      version: "0.1",
      oscillator_source: "device_timing_substrate",
      runtime_witness: "performance.now",
      render_witness: "requestAnimationFrame",
      mutates_body: false,
      runtime_motion_authority: false,
      opens_gates: false,
      admits_channels: false,
      lights_markers: false,
      physics_claim: false,
      force_claim: false
    }, summary || {});
  }

  function measureRenderCadence() {
    const samples = [];
    let previous = null;
    let count = 0;

    function tick(now) {
      if (previous !== null) {
        samples.push(now - previous);
        if (samples.length > 90) samples.shift();

        const avg = samples.reduce((a, b) => a + b, 0) / samples.length;
        const hz = avg > 0 ? 1000 / avg : 0;
        const sheets = readSheetsPerSecond();

        setText("g900-runtime-frame-interval", avg.toFixed(2) + " ms");
        setText("g900-runtime-render-hz", hz.toFixed(2) + " Hz");
        setText("g900-runtime-sheets-per-sec", sheets.toFixed(2));
        publishRuntimeOscillatorSummary({
          frame_interval_ms: Number(avg.toFixed(3)),
          render_hz: Number(hz.toFixed(3)),
          sheets_per_second: Number(sheets.toFixed(2)),
          status: "measured"
        });
      }

      previous = now;
      count += 1;

      if (count < 1000000) {
        window.requestAnimationFrame(tick);
      }
    }

    window.requestAnimationFrame(tick);
  }

  ready(function () {
    const anchor = findConsoleAnchor();

    if (!anchor || !anchor.parentElement) {
      console.warn("[G900 runtime oscillator] download-state-json anchor not found; console panel not mounted.");
      return;
    }

    const panel = createPanel(document.createElement("div"));
    anchor.insertAdjacentElement("afterend", panel);

    if (typeof performance !== "undefined" && typeof performance.now === "function") {
      setText("g900-runtime-clock-witness", "performance.now(), monotonic runtime witness");
    }

    if (typeof window.requestAnimationFrame === "function") {
      setText("g900-render-clock-witness", "requestAnimationFrame cadence");
      measureRenderCadence();
    } else {
      setText("g900-render-clock-witness", "unavailable");
      setText("g900-runtime-frame-interval", "unavailable");
      setText("g900-runtime-render-hz", "unavailable");
    }

    setText("g900-runtime-sheets-per-sec", readSheetsPerSecond().toFixed(2));
    publishRuntimeOscillatorSummary({
      sheets_per_second: Number(readSheetsPerSecond().toFixed(2)),
      status: "booted"
    });
  });
}());
