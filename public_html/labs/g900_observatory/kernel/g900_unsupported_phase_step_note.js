(() => {
  "use strict";

  const RECEIPT_URL = new URL(
    "artifacts/json/g900_unsupported_phase_step_public_note_001.v1.json",
    window.location.href
  );

  const CARD_ID = "g900-unsupported-phase-step-card";
  const BODY_ID = "g900-unsupported-phase-step-note";

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[ch]);
  }

  function findHeader() {
    const headers = Array.from(document.querySelectorAll("header"));
    return (
      headers.find((node) => node.textContent.includes("G900 Witness Observatory")) ||
      document.querySelector(".lab-header") ||
      document.querySelector("header") ||
      document.body
    );
  }

  function ensureCard() {
    let card = document.getElementById(CARD_ID);
    if (card) return card;

    card = document.createElement("details");
    card.id = CARD_ID;
    card.className = "g900-header-instructions g900-boundary-note-card";
    card.setAttribute("aria-label", "G900 instructions and 6/9 anomaly note");

    card.innerHTML = `
      <summary>
        <span class="g900-header-instructions-label">Instructions</span>
        <span class="g900-header-instructions-chip">6/9 boundary note</span>
      </summary>
      <div id="${BODY_ID}" class="g900-boundary-note-body">
        Loading audited note...
      </div>
    `;

    findHeader().appendChild(card);
    return card;
  }

  function renderUnavailable(message) {
    ensureCard();
    const body = document.getElementById(BODY_ID);
    if (!body) return;

    body.innerHTML = `
      <p class="g900-boundary-note-muted">Receipt unavailable.</p>
      <p class="g900-boundary-note-small">${escapeHtml(message)}</p>
    `;
  }

  function validateReceipt(data) {
    const boundary = data && data.boundary ? data.boundary : {};
    const note = data && data.public_note ? data.public_note : {};
    const checks = data && data.checks ? data.checks : {};

    return Boolean(
      data &&
      data.audit_pass === true &&
      boundary.channels_admitted === false &&
      boundary.mutates_body === false &&
      boundary.physics_claim === false &&
      boundary.force_claim === false &&
      checks.unsupported_pairs_exactly_6_9 === true &&
      note.short_copy &&
      note.keeper_statement
    );
  }

  function renderNote(data) {
    ensureCard();
    const body = document.getElementById(BODY_ID);
    if (!body) return;

    const note = data.public_note || {};
    const boundary = Array.isArray(note.boundary) ? note.boundary : [];

    body.innerHTML = `
      <p class="g900-boundary-note-summary">${escapeHtml(note.short_copy)}</p>

      <dl class="g900-boundary-note-facts">
        <div><dt>Status</dt><dd>Unsupported internal phase step</dd></div>
        <div><dt>Pair</dt><dd>6/9</dd></div>
        <div><dt>Observed in</dt><dd>Slot 12</dd></div>
        <div><dt>Phase grammar</dt><dd>Real</dd></div>
        <div><dt>Carrier support</dt><dd>Unsupported by tested rails</dd></div>
        <div><dt>Channel admitted</dt><dd>No</dd></div>
      </dl>

      <div class="g900-boundary-note-boundary">
        <h3>Boundary</h3>
        <p>${escapeHtml(note.keeper_statement)}</p>
        <ul>
          ${boundary.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </div>

      <p class="g900-boundary-note-receipt">
        Receipt: <code>g900_unsupported_phase_step_public_note_001.v1.json</code>
      </p>
    `;
  }

  async function loadUnsupportedPhaseStepNote() {
    ensureCard();

    try {
      const response = await fetch(RECEIPT_URL, { cache: "no-store" });
      if (!response.ok) {
        renderUnavailable(`HTTP ${response.status}`);
        return;
      }

      const data = await response.json();

      if (!validateReceipt(data)) {
        renderUnavailable("Receipt failed boundary checks.");
        return;
      }

      renderNote(data);
    } catch (err) {
      renderUnavailable(err && err.message ? err.message : String(err));
    }
  }

  window.G900UnsupportedPhaseStepNote = {
    load: loadUnsupportedPhaseStepNote,
    render: renderNote
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadUnsupportedPhaseStepNote);
  } else {
    loadUnsupportedPhaseStepNote();
  }
})();
