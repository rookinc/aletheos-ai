<?php
$page_title = 'Informative Action — Aletheos.ai';
$page_description = 'A beginner-friendly interactive lab for watching action move through a small system and leave an inspectable trace.';
$page_css = ['/assets/index.css', '/assets/collapse_witness.css'];

include __DIR__ . '/../../includes/head.php';
include __DIR__ . '/../../includes/site_header.php';
?>

<main class="site-shell collapse-tool-page">
  <section class="tool-panel">
    <p class="eyebrow">Informative Action Lab</p>
    <h1>Watch action leave a trace.</h1>
    <p class="hero-text">
      This lab shows a small structure changing over time. Something pushes on
      the structure, the structure responds, and the result leaves a visible
      trace.
    </p>
    <p class="hero-text">
      You do not need the math first. Start by watching what moves, what changes,
      and what remains connected.
    </p>
</section>
  <section class="tool-panel tool-notes">
    <p class="eyebrow">How to use this lab</p>
    <h2>Watch, pause, compare.</h2>

    <div class="principle-grid">
      <article class="principle-card">
        <h3>Watch one cycle</h3>
        <p>
          Let the motion run once before changing anything. Notice which parts
          move first, which parts follow, and what shape the trace takes.
        </p>
      </article>

      <article class="principle-card">
        <h3>Pause and step</h3>
        <p>
          Use the step buttons to slow the motion down. This makes it easier
          to see how one stage turns into the next.
        </p>
      </article>

      <article class="principle-card">
        <h3>Change one slider</h3>
        <p>
          Adjust speed, push, or smoothing one at a time. Then compare what
          changed and what stayed connected.
        </p>
      </article>
    </div>
  </section>
<section class="tool-panel controls-panel" aria-label="Informative action controls">
    <div class="tool-panel__head">
      <div>
        <p class="section-kicker">Controls</p>
        <h2>Explore the motion</h2>
      </div>
      <div id="cw-status" class="cw-status">Loading visual model…</div>
    </div>

    <div class="collapse-controls">
      <button id="cw-play" class="cw-button" type="button">Pause</button>
      <button id="cw-reset" class="cw-button" type="button">Reset</button>

      <div class="phase-stepper" aria-label="Phase stepper">
        <button type="button" id="phase-prev" class="button-secondary">◀ Previous step</button>
        <button type="button" id="phase-live" class="button-secondary">Resume live</button>
        <button type="button" id="phase-next" class="button-secondary">Next step ▶</button>
      </div>

      <label class="cw-control">
        Speed
        <input id="cw-speed" type="range" min="0.1" max="3" step="0.1" value="1">
      </label>

      <label class="cw-control">
        Push
        <input id="cw-force" type="range" min="0" max="7" step="0.1" value="3.5">
      </label>

      <label class="cw-control">
        Smoothing
        <input id="cw-damping" type="range" min="0" max="0.2" step="0.005" value="0.045">
      </label>

      <fieldset class="cw-mode-toggle" aria-label="View mode">
        <legend>View</legend>
        <label>
          <input type="radio" name="cw-mode" value="raw" id="cw-mode-raw">
          Structure only
        </label>
        <label>
          <input type="radio" name="cw-mode" value="overlay" id="cw-mode-overlay" checked>
          Action overlay
        </label>
      </fieldset>

      <button id="cw-export-svg" class="cw-button" type="button">Export SVG</button>
      <button id="cw-copy-state" class="cw-button" type="button">Copy JSON</button>
    </div>
  </section>

  <section class="collapse-grid collapse-grid--tool" aria-label="Informative action visual panels">
    <section class="collapse-panel">
      <div class="collapse-panel__head">
        <h2>1. Starting pattern</h2>
        <span>before</span>
      </div>
      <svg id="g15-panel" class="collapse-svg" viewBox="0 0 420 320" role="img" aria-label="Starting structure animation"></svg>
    </section>

    <section class="collapse-panel">
      <div class="collapse-panel__head">
        <h2>2. Response</h2>
        <span>change</span>
      </div>
      <svg id="incidence-panel" class="collapse-svg" viewBox="0 0 420 320" role="img" aria-label="Response pattern"></svg>
    </section>

    <section class="collapse-panel collapse-panel--featured">
      <div class="collapse-panel__head">
        <h2>3. Visible trace</h2>
        <span>after</span>
      </div>
      <svg id="witness-panel" class="collapse-svg" viewBox="0 0 420 320" role="img" aria-label="Visible action trace"></svg>
    </section>

    <section class="collapse-panel collapse-panel--bubble">
      <div class="collapse-panel__head">
        <h2>4. Bubble view</h2>
        <span>guide</span>
      </div>
      <svg id="bubble-panel" class="collapse-svg" viewBox="0 0 420 320" role="img" aria-label="Smooth bubble analogy"></svg>
    </section>
  </section>

  <section class="cw-readout-grid" aria-label="Current visual readout">
    <div class="cw-readout">
      <span class="cw-readout__label">Step</span>
      <strong id="cw-phase">loading</strong>
    </div>
    <div class="cw-readout">
      <span class="cw-readout__label">Time</span>
      <strong id="cw-time">0.00</strong>
    </div>
    <div class="cw-readout">
      <span class="cw-readout__label">Peak motion</span>
      <strong id="cw-maxu">0.000</strong>
    </div>
    <div class="cw-readout">
      <span class="cw-readout__label">Stations</span>
      <strong id="cw-stations">A D E C B F</strong>
    </div>
    <div class="cw-readout">
      <span class="cw-readout__label">View mode</span>
      <strong id="cw-mode-readout">action overlay</strong>
    </div>
  </section>

  <section class="tool-panel tool-notes">
    <details class="cw-details cw-details--provenance">
      <summary>Current state JSON</summary>
      <div class="cw-provenance">
        <pre><code id="cw-state-json">Waiting for renderer…</code></pre>
      </div>
    </details>
  </section>


  <section class="tool-panel">
    <p class="eyebrow">What’s next?</p>
    <h2>Follow the trace.</h2>
    <p class="section-text">
      After you have watched the motion, the next step is to connect the picture
      back to the larger project.
    </p>
    <div class="card-grid">
      <article class="index-card">
        <p class="card-label">Main surface</p>
        <h3>Open P900</h3>
        <p>
          Move from this small action demo to the main public surface.
        </p>
        <a class="button button--primary" href="/labs/p900_observatory/lab.html">Open P900</a>
      </article>

      <article class="index-card">
        <p class="card-label">Formal object</p>
        <h3>View the graph</h3>
        <p>
          See the canonical finite object behind the public surfaces.
        </p>
        <a class="button button--secondary" href="/the_thalean_graph_at4val_60_6.php">View the graph</a>
      </article>

      <article class="index-card">
        <p class="card-label">Receipts</p>
        <h3>Check the evidence</h3>
        <p>
          Follow the data, reports, checker scripts, and public records.
        </p>
        <a class="button button--secondary" href="/evidence.php">View evidence</a>
      </article>
    </div>
  </section>


  <section class="cw-ai-panel">
    <p class="eyebrow">For AI readers</p>
    <h2>Boundary note.</h2>
    <p>
      This lab is an exploratory inspection tool. It is not a final proof, and
      it does not claim that the picture is a physical object.
    </p>
    <p>
      The bubble view is an analogy surface. It makes a change easier to see,
      but it should not be cited as a physical model.
    </p>
    <p>
      The intended claim is narrower: informative action can change a system in
      a way that remains inspectable afterward. The lab renders that idea as
      action, response, and trace.
    </p>
  </section>
</main>

<?php include __DIR__ . '/../../includes/site_footer.php'; ?>
<script src="/assets/collapse_witness.js?v=20260504-functional"></script>
</body>
</html>
