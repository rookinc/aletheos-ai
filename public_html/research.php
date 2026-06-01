<?php
$page_title = 'Research - Aletheos.ai';
$page_description = 'Aletheos research map for CoRI: finite structure, coherence diagnostics, physics-facing probes, and public audit artifacts.';
$page_css = ['assets/index.css', 'assets/research_page.css'];

include __DIR__ . '/includes/head.php';
include __DIR__ . '/includes/site_header.php';
?>

<main class="site-shell research-page">
  <section class="hero research-hero">
    <p class="eyebrow">Research</p>

    <div class="hero-grid">
      <div class="hero-copy">
        <h1 class="hero-title">Research at CoRI.</h1>

        <p class="hero-text">
          CoRI studies how apparent patterns become accountable structures:
          by testing whether they survive changed viewpoints, controlled
          perturbations, and traceable constraints.
        </p>

        <p class="hero-text hero-text--secondary">
          The research program begins with exact finite structures, then asks
          how their invariants, failures, closures, and audit trails can help
          distinguish projected surface agreement from global coherence.
        </p>

        <div class="hero-actions" aria-label="Research actions">
          <a class="button button--primary" href="/the_thalean_graph_at4val_60_6.php">Open the Thalean graph page</a>
          <a class="button button--secondary" href="/audit.php">View the audit layer</a>
        </div>
      </div>

      <aside class="hero-emblem" aria-label="CoRI research themes">
        <div class="orbital-mark">
          <span class="orbital-mark__ring orbital-mark__ring--outer"></span>
          <span class="orbital-mark__ring orbital-mark__ring--middle"></span>
          <span class="orbital-mark__ring orbital-mark__ring--inner"></span>
          <span class="orbital-mark__point orbital-mark__point--one"></span>
          <span class="orbital-mark__point orbital-mark__point--two"></span>
          <span class="orbital-mark__point orbital-mark__point--three"></span>
        </div>
        <p class="emblem-caption">structure - stress - trace</p>
      </aside>
    </div>
  </section>

  <section class="index-section">
    <div class="section-head">
      <p class="section-kicker">Research lanes</p>
      <h2>A map of the current program.</h2>
      <p class="section-text">
        The work is organized around a practical question: what makes a pattern
        accountable enough to inspect, challenge, reproduce, and build on?
      </p>
    </div>

    <div class="card-grid">
      <a class="index-card feature-card" href="/the_thalean_graph_at4val_60_6.php">
        <span class="card-label">Finite structure</span>
        <h3>The Thalean graph</h3>
        <p>
          The central theorem object: AT4val[60,6], its G60/G30/G15 quotient
          structure, sector geometry, chamber grammar, and exact matrix identity.
        </p>
      </a>

      <a class="index-card" href="/coherence.php">
        <span class="card-label">Diagnostics</span>
        <h3>Coherence gap</h3>
        <p>
          A developing graph-theoretic diagnostic for separating projected
          surface agreement from global coherence through all-root inspection,
          shell stress, and controlled rewiring.
        </p>
      </a>

      <article class="index-card">
        <span class="card-label">Closure</span>
        <h3>Metric closure</h3>
        <p>
          A workshop method for treating failed constructions as evidence:
          failed lift, metric closure, quotient extraction, verification, and
          catalogue identification.
        </p>
      </article>

      <article class="index-card">
        <span class="card-label">Physics-facing probes</span>
        <h3>Structured benchmarks</h3>
        <p>
          Cautious bridge work applying the same discipline to CMB benchmark
          templates and sonoluminescence boundary-flux experimental design.
        </p>
      </article>

      <a class="index-card" href="/glossary.php">
        <span class="card-label">Vocabulary</span>
        <h3>Thalean glossary</h3>
        <p>
          Public definitions for TRT, TGT, thalion, witness, boundary,
          admissibility, surface, and coherence gap.
        </p>
      </a>

      <a class="index-card" href="/audit.php">
        <span class="card-label">Audit layer</span>
        <h3>Claims leave tracks</h3>
        <p>
          Public theorem objects, JSON contracts, verification reports, and
          checker scripts keep claims tied to inspectable artifacts.
        </p>
      </a>

      <a class="index-card" href="/labs.php">
        <span class="card-label">Labs</span>
        <h3>Witness surfaces</h3>
        <p>
          Interactive tools for changing viewpoint, inspecting finite structure,
          and exploring quotient-visible witnesses.
        </p>
      </a>
    </div>
  </section>

  <section class="index-section">
    <div class="section-head">
      <p class="section-kicker">Scope</p>
      <h2>Exploratory, artifact-backed, and deliberately bounded.</h2>
      <p class="section-text">
        CoRI does not treat visual analogy, numerical coincidence, or one
        favorable viewpoint as proof. The goal is to develop ideas carefully by
        making their assumptions, constraints, artifacts, and failure modes
        visible.
      </p>
    </div>
  </section>
</main>

<?php include __DIR__ . '/includes/site_footer.php'; ?>
</body>
</html>
