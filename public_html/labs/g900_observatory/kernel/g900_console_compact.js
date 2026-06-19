(function () {
  "use strict";

  function textByDt(panel, label) {
    const dts = Array.from(panel.querySelectorAll("dt"));
    const dt = dts.find((x) => x.textContent.trim().toLowerCase() === label.toLowerCase());
    if (!dt) return "";
    const dd = dt.parentElement ? dt.parentElement.querySelector("dd") : null;
    return dd ? dd.textContent.trim() : "";
  }

  function compactPanel(panelId, summaryId, summaryFn) {
    const panel = document.getElementById(panelId);
    if (!panel || panel.dataset.g900Compacted === "true") return false;

    const heading = panel.querySelector("h3");
    const title = heading ? heading.textContent.trim() : "Console detail";

    const details = document.createElement("details");
    details.className = "g900-console-compact-details";

    const summary = document.createElement("summary");
    summary.innerHTML =
      '<span class="g900-console-compact-title">' + title + '</span>' +
      '<span id="' + summaryId + '" class="g900-console-compact-readout"></span>';

    const nodes = Array.from(panel.childNodes);
    for (const node of nodes) details.appendChild(node);

    const movedHeading = details.querySelector("h3");
    if (movedHeading) movedHeading.remove();

    details.insertBefore(summary, details.firstChild);
    panel.appendChild(details);
    panel.dataset.g900Compacted = "true";

    function update() {
      const readout = document.getElementById(summaryId);
      if (readout) readout.textContent = summaryFn(panel);
    }

    update();
    let ticks = 0;
    const timer = window.setInterval(function () {
      update();
      ticks += 1;
      if (ticks > 120) window.clearInterval(timer);
    }, 500);

    return true;
  }

  function compactRuntime() {
    return compactPanel(
      "g900-runtime-oscillator-console",
      "g900-runtime-oscillator-compact-readout",
      function () {
        const hz = document.getElementById("g900-runtime-render-hz");
        const sheets = document.getElementById("g900-runtime-sheets-per-sec");
        const frame = document.getElementById("g900-runtime-frame-interval");

        const hzText = hz ? hz.textContent.trim() : "measuring";
        const sheetText = sheets ? sheets.textContent.trim() : "measuring";
        const frameText = frame ? frame.textContent.trim() : "";

        return "render " + hzText + " | sheets/sec " + sheetText + (frameText ? " | " + frameText : "");
      }
    );
  }

  function compactApparatus() {
    return compactPanel(
      "g900-apparatus-profile-console",
      "g900-apparatus-profile-compact-readout",
      function (panel) {
        const platform = textByDt(panel, "Platform hint") || "runtime";
        const viewport = textByDt(panel, "Viewport") || "viewport";
        const dpr = textByDt(panel, "Pixel ratio") || "?";
        return platform + " | " + viewport + " | DPR " + dpr + " | no hardware ID";
      }
    );
  }

  function compactStateJson() {
    const pres = Array.from(document.querySelectorAll("pre"));
    const pre = pres.find((node) => node.textContent.includes('"schema": "g900.viewer.state"'));
    if (!pre || pre.dataset.g900Compacted === "true") return false;

    const details = document.createElement("details");
    details.className = "g900-state-json-compact";
    details.innerHTML =
      '<summary>' +
      '<span class="g900-console-compact-title">Raw state JSON</span>' +
      '<span class="g900-console-compact-readout">collapsed</span>' +
      '</summary>';

    pre.parentNode.insertBefore(details, pre);
    details.appendChild(pre);
    pre.dataset.g900Compacted = "true";
    return true;
  }

  function run() {
    compactRuntime();
    compactApparatus();
    compactStateJson();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }

  const observer = new MutationObserver(run);
  observer.observe(document.documentElement, { childList: true, subtree: true });
}());
