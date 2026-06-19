(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function readSheetsPerSecond() {
    const input =
      document.getElementById("sheet-rate-slider") ||
      document.getElementById("sheets-per-second-slider");

    if (input && input.value !== undefined) {
      const value = Number(input.value);
      if (Number.isFinite(value)) return value;
    }

    return 790;
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

    function tick(now) {
      if (previous !== null) {
        samples.push(now - previous);
        if (samples.length > 90) samples.shift();

        const avg = samples.reduce((a, b) => a + b, 0) / samples.length;
        const hz = avg > 0 ? 1000 / avg : 0;
        const sheets = readSheetsPerSecond();

        publishRuntimeOscillatorSummary({
          frame_interval_ms: Number(avg.toFixed(3)),
          render_hz: Number(hz.toFixed(3)),
          sheets_per_second: Number(sheets.toFixed(2)),
          status: "measured"
        });
      }

      previous = now;
      window.requestAnimationFrame(tick);
    }

    window.requestAnimationFrame(tick);
  }

  ready(function () {
    publishRuntimeOscillatorSummary({
      sheets_per_second: Number(readSheetsPerSecond().toFixed(2)),
      status: "booted"
    });

    if (typeof window.requestAnimationFrame === "function") {
      measureRenderCadence();
    } else {
      publishRuntimeOscillatorSummary({
        sheets_per_second: Number(readSheetsPerSecond().toFixed(2)),
        status: "render_clock_unavailable"
      });
    }
  });
}());
