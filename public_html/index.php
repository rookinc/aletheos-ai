<?php
$page_title = 'Aletheos.ai — Accountable Intelligence Research';
$page_description = 'Aletheos.ai is the public home of CoRI, a research workshop studying how apparent patterns become accountable structures through changed viewpoints, controlled perturbations, and traceable constraints.';
$page_css = ['assets/index.css'];

include __DIR__ . '/includes/head.php';
include __DIR__ . '/includes/site_header.php';
?>

<main class="site-shell">
  <section class="hero hero--observatory">
    <p class="eyebrow">Center of Recursive Inquiry</p>

    <div class="hero-grid">
      <div class="hero-copy">
        <h1 class="hero-title">From apparent pattern to accountable structure.</h1>
        <p class="hero-text">
          Aletheos is the public home of the Center of Recursive Inquiry. CoRI studies
          how apparent patterns become accountable structures: by testing whether they
          survive changed viewpoints, controlled perturbations, and traceable constraints.
        </p>
        <p class="hero-text hero-text--secondary">
          We approach accountability as a structural problem. Ideas, systems, and
          mathematical objects become stronger when they leave traces that can be
          inspected, challenged, and reproduced.
        </p>

        <div class="hero-actions" aria-label="Primary actions">
          <a class="button button--primary" href="the_thalean_graph_at4val_60_6.php">Explore the research</a>
          <a class="button button--secondary" href="labs.php">Visit the labs</a>
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
        <p class="emblem-caption">relation · observation · trace</p>
      </aside>
    </div>
  </section>

  <section class="index-section constructor-section">
    <a class="constructor-feature" href="/labs/constructor/lab.html" aria-label="Open the Thalean constructor lab tool">
      <div class="constructor-feature__copy">
        <p class="section-kicker">Lab tool</p>
        <h2>Explore the constructor.</h2>
        <p class="section-text">
          The constructor is an interactive lab surface for exploring Thalean structure
          visually. It provides a place to rotate, compare, and inspect transport
          forms, layered symmetry, and finite geometric witnesses.
        </p>
        <span class="constructor-feature__cta">Open the interactive lab tool →</span>
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
        Not every compelling pattern is coherent. CoRI studies what remains stable
        when an idea is moved, compressed, perturbed, compared against controls, and
        tied back to reproducible evidence.
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
      <p class="section-kicker">The approach</p>
      <h2>Thalean Graph Theory is the research path.</h2>
      <p class="section-text">
        Aletheos studies accountability as a structural problem. Instead of treating
        actions as isolated events, we ask how actions move through networks of
        relation, constraint, observation, and evidence.
      </p>
    </div>

    <div class="card-grid">
      <a class="index-card feature-card" href="the_thalean_graph_at4val_60_6.php">
        <span class="card-label">Research</span>
        <h3>The Thalean Graph</h3>
        <p>The current public presentation of the 60-state graph object and its technical notes.</p>
      </a>

      <a class="index-card" href="labs.php">
        <span class="card-label">Workshop</span>
        <h3>Labs</h3>
        <p>Experimental viewers, witness lenses, and rendering stages for exploring the structure.</p>
      </a>

      <a class="index-card" href="audit.php">
        <span class="card-label">Records</span>
        <h3>Audit</h3>
        <p>Verification outputs and machine-readable records for the public artifact set.</p>
      </a>
    </div>
  </section>

</main>

<?php include __DIR__ . '/includes/site_footer.php'; ?>
</body>
</html>
