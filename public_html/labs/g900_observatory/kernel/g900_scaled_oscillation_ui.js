import {
  readG900ScaledOscillationKernel,
  getG900ScaledOscillationSummary
} from "./g900_scaled_oscillation.js";

function findTimingHost() {
  return (
    document.querySelector(".g900-sheets-sec-boundary") ||
    document.querySelector("[data-timing-boundary]") ||
    document.querySelector("details")
  );
}

function renderScaledOscillation(summary) {
  const host = findTimingHost();
  if (!host) return;

  if (document.getElementById("g900-scaled-oscillation-kernel-note")) return;

  const note = document.createElement("div");
  note.id = "g900-scaled-oscillation-kernel-note";
  note.className = "g900-scaled-oscillation-kernel-note";

  const chain = summary.dependency_chain
    .map((step) => step.replaceAll("_", " "))
    .join(" -> ");

  note.innerHTML = [
    '<strong>Timing kernel:</strong> quartz / oscillator supplies scaled oscillation.',
    '<br>',
    'Sheets/sec is a downstream scope readout. The grammar earns the sheets.',
    '<br>',
    '<span class="g900-scaled-oscillation-chain">' + chain + '</span>',
    '<br>',
    '<span class="g900-scaled-oscillation-boundary">No gate authority. No channel admission. No marker lighting. No force or physics claim.</span>'
  ].join("");

  host.insertAdjacentElement("afterend", note);
}

async function boot() {
  try {
    const payload = await readG900ScaledOscillationKernel();
    renderScaledOscillation(getG900ScaledOscillationSummary(payload));
  } catch (error) {
    console.warn("[G900 scaled oscillation]", error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
