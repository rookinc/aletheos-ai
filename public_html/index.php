<?php
$page_title = 'Aletheos.ai - CoRI Research Surface';
$page_description = 'Aletheos.ai is the public research surface for the Centre of Recursive Inquiry (CoRI), Thalean Action Theory, Thalean Graph Theory, labs, papers, and audit artifacts.';
$page_css = ['assets/index.css', 'assets/css/at4val-3d-viewer.css'];

include __DIR__ . '/includes/head.php';
include __DIR__ . '/includes/site_header.php';
?>

<main class="site-shell">
  <section class="hero hero--observatory">
    <p class="eyebrow">Centre of Recursive Inquiry</p>

    <div class="hero-grid">
      <div class="hero-copy">
        <h1 class="hero-title">From apparent pattern to accountable structure.</h1>

        <div
          class="intro-graph intro-graph--at4val"
          data-at4val-3d
          data-src="/json/at4val_60_6_3d.json"
          aria-label="Rotating 3D rendering of AT4val[60,6]"
        >
          <canvas></canvas>
        </div>

        <p class="hero-text">
          Some patterns vanish when you turn them. Others survive changed
          viewpoints, controlled perturbations, and traceable constraints.
        </p>

        <p class="hero-text">
          At CoRI, we study relationships: how things connect, how those
          connections hold together, and how a pattern changes when it is
          viewed from another angle.
        </p>

        <p class="hero-text">
          Our tool of choice is the Thalean graph. It gives us a small finite
          structure for studying relationships: a structure we can inspect,
          disturb, rotate, quotient, compare, and test. A single working
          instance of that structure is called a thalion.
        </p>

        <p class="hero-text hero-text--secondary">
          A thalion is not a metaphor. It is a concrete relational object:
          sixty states, fixed connections, and enough internal structure to
          test whether an apparent pattern is merely suggestive, or actually
          accountable.
        </p>

        <p class="hero-text hero-text--secondary">
          Aletheos.ai is the public research surface for this work: Thalean
          Action Theory, Thalean Graph Theory, coherence diagnostics, public
          labs, papers, and audit artifacts.
        </p>

        <div class="hero-actions" aria-label="Primary actions">
          <a class="button button--primary" href="/research/from-circle-to-thalion.php">What is a Thalion?</a>
          <a class="button button--secondary" href="/thalean_action_theory.php">Start with TAT</a>
        </div>
      </div>

      <aside class="hero-emblem" aria-label="Aletheos research themes">
        <div class="orbital-mark">
          <span class="orbital-mark__ring orbital-mark__ring--outer"></span>
          <span class="orbital-mark__ring orbital-mark__ring--middle"></span>
          <span class="orbital-mark__ring orbital-mark__ring--inner"></span>
          <span class="orbital-mark__point orbital-mark__point--one"></span>
          <span class="orbital-mark__point orbital-mark__point--two"></span>
          <span class="orbital-mark__point orbital-mark__point--three"></span>
        </div>
        <p class="emblem-caption">relation - action - witness</p>
      </aside>
    </div>
  </section>

  <section class="index-section constructor-section">
    <a class="constructor-feature" href="/labs/constructor/lab.html" aria-label="Open the Thalean constructor lab tool">
      <div class="constructor-feature__copy">
        <p class="section-kicker">Lab tool</p>
        <h2>Explore the constructor.</h2>
        <p class="section-text">
          The constructor is an interactive witness surface for exploring
          Thalean structure visually. It provides a place to rotate, compare,
          and inspect transport forms, layered symmetry, and finite geometric
          witnesses.
        </p>
        <span class="constructor-feature__cta">Open the interactive lab tool</span>
      </div>

      <figure class="constructor-feature__media">
        <img
          src="assets/thalean-constructor-preview.png"
          alt="A luminous Thalean constructor render showing layered geometric transport structure on a dark grid."
          loading="lazy"
        >
      </figure>
    </a>
  </section>

  <section class="index-section mission-section">
    <div class="section-head">
      <p class="section-kicker">The method</p>
      <h2>Patterns should be tested by the views that stress them.</h2>
      <p class="section-text">
        Not every compelling pattern is coherent. CoRI studies what remains
        stable when an idea is moved, compressed, perturbed, compared against
        controls, and tied back to reproducible evidence.
      </p>
    </div>

    <div class="principle-grid">
      <article class="principle-card">
        <span class="card-label">Viewpoint change</span>
        <h3>Changed viewpoints</h3>
        <p>Does the pattern survive when viewed from another root, scale, frame, quotient, or observer position?</p>
      </article>

      <article class="principle-card">
        <span class="card-label">Stress testing</span>
        <h3>Controlled perturbations</h3>
        <p>Does the structure persist under rewiring, null models, shuffled controls, boundary cases, or failure audits?</p>
      </article>

      <article class="principle-card">
        <span class="card-label">Evidence trail</span>
        <h3>Traceable constraints</h3>
        <p>Can the claim be tied to artifacts, scripts, invariants, ledgers, and reproducible checks?</p>
      </article>
    </div>
  </section>

  <section class="index-section approach-section">
    <div class="section-head">
      <p class="section-kicker">The public map</p>
      <h2>TAT is the umbrella. TGT is the graph core.</h2>
      <p class="section-text">
        Thalean Action Theory gives the project its public scope: relation,
        action, identity, boundary, witness, and accountability. Thalean Graph
        Theory provides the finite graph objects and theorem-facing structures
        that make the work inspectable.
      </p>
    </div>

    <div class="card-grid">
      <a class="index-card feature-card" href="/research/from-circle-to-thalion.php">
        <span class="card-label">Introductory tutorial</span>
        <h3>What is a Thalion?</h3>
        <p>Start with boundary, body, membrane, port, hinge, witness, closure, and relational transport.</p>
      </a>

      <a class="index-card" href="/thalean_action_theory.php">
        <span class="card-label">Framework</span>
        <h3>Thalean Action Theory</h3>
        <p>Identity as relational invariance under admissible change.</p>
      </a>

      <a class="index-card" href="/the_thalean_graph_at4val_60_6.php">
        <span class="card-label">Graph core</span>
        <h3>The Thalean Graph</h3>
        <p>The current public presentation of the 60-state graph object and its technical notes.</p>
      </a>

      <a class="index-card" href="/labs.php">
        <span class="card-label">Labs</span>
        <h3>Witness surfaces</h3>
        <p>Experimental viewers and public lab surfaces for inspecting the structure.</p>
      </a>

      <a class="index-card" href="/audit.php">
        <span class="card-label">Audit</span>
        <h3>Claims leave tracks</h3>
        <p>Verification outputs and machine-readable records for the public artifact set.</p>
      </a>
    </div>
  </section>
</main>

<script src="/assets/js/at4val-3d-viewer.js" defer></script>
<?php include __DIR__ . '/includes/site_footer.php'; ?>
