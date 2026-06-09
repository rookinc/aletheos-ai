(function() {
  const canvas = document.getElementById("rwCanvas");
  const modeSelect = document.getElementById("modeSelect");
  const showProjection = document.getElementById("showProjection");
  const showTrace = document.getElementById("showTrace");
  const showWitness = document.getElementById("showWitness");
  const modeTitle = document.getElementById("modeTitle");
  const modeSummary = document.getElementById("modeSummary");
  const statusBox = document.getElementById("statusBox");
  const criterionBox = document.getElementById("criterionBox");

  function currentOptions() {
    return {
      showProjection: showProjection.checked,
      showTrace: showTrace.checked,
      showWitness: showWitness.checked
    };
  }

  function render() {
    const record = RW_MODES[modeSelect.value];

    if (!record) {
      modeTitle.textContent = "No witness loaded";
      modeSummary.textContent = "The witness data file did not load.";
      statusBox.textContent = "{}";
      return;
    }

    const system = rwBuildRenderableSystem(record);
    const status = rwEvaluate(system);

    modeTitle.textContent = system.title;
    modeSummary.textContent = system.summary + " " + system.intended_gap + ".";
    statusBox.textContent = JSON.stringify(status, null, 2);

    criterionBox.textContent = [
      "Closed(v) iff there exists a in A_I such that:",
      "",
      "    pi(a) = v",
      "    O(v) = tau_A(a)",
      "",
      "Admitted(v) iff:",
      "",
      "    Closed(v)",
      "    W(v, O(v))"
    ].join("\n");

    rwRender(canvas, system, currentOptions());
  }

  function loadData() {
    fetch("data/finite_witnesses.json")
      .then(function(resp) {
        if (!resp.ok) {
          throw new Error("failed to load witness data");
        }
        return resp.json();
      })
      .then(function(data) {
        rwSetData(data);
        render();
      })
      .catch(function(err) {
        modeTitle.textContent = "Load error";
        modeSummary.textContent = String(err.message || err);
        statusBox.textContent = "{}";
      });
  }

  [modeSelect, showProjection, showTrace, showWitness].forEach(function(el) {
    el.addEventListener("change", render);
  });

  loadData();
})();
