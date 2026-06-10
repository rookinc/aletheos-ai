<?php
$page_title = 'Research — Aletheos.ai';
$page_description = 'Research index for Aletheos and CoRI: Thalean Action Theory, the Thalean graph, papers, labs, and public evidence.';
$page_css = ['/assets/research_page.css'];
include __DIR__ . '/includes/head.php';
include __DIR__ . '/includes/site_header.php';
?>

<main class="site-shell research-page">
  <section class="hero">
    <p class="eyebrow">Research</p>
    <h1>The formal work lives here.</h1>
    <p class="hero-text">
      Research pages collect the framework, canonical object, papers, technical
      notes, inspection surfaces, and evidence records behind Aletheos.
    </p>
    <p class="hero-text">
      The public goal is simple: claims should remain connected to relation,
      action, witness, and traceable constraint.
    </p>
    <div class="hero-actions">
      <a class="button button--primary" href="/the_thalean_graph_at4val_60_6.php">View the Thalean graph</a>
      <a class="button button--secondary" href="/papers.php">Read papers</a>
      <a class="button button--secondary" href="/evidence.php">View evidence</a>
    </div>
  </section>

  <section class="index-section">
    <p class="eyebrow">Core path</p>
    <h2>From concept to object.</h2>

    <div class="card-grid">
      <article class="index-card">
        <p class="card-label">Beginner path</p>
        <h3>Start Here</h3>
        <p>
          Start with a circle, then climb through boundary, body, membrane,
          port, hinge, witness, closure, and thalion.
        </p>
        <a class="button button--secondary" href="/research/from-circle-to-thalion.php">Read the tutorial</a>
      </article>

      <article class="index-card">
        <p class="card-label">Framework</p>
        <h3>Thalean Action Theory</h3>
        <p>
          The research framework for relation, action, witness, trace,
          admissibility, and accountable structure.
        </p>
        <a class="button button--secondary" href="/thalean_action_theory.php">Read TAT</a>
      </article>

      <article class="index-card">
        <p class="card-label">Canonical object</p>
        <h3>The Thalean Graph</h3>
        <p>
          The theorem-facing public surface for the canonical finite object,
          verification records, and companion papers.
        </p>
        <a class="button button--primary" href="/the_thalean_graph_at4val_60_6.php">View the object</a>
      </article>
    </div>
  </section>

  <section class="index-section">
    <p class="eyebrow">Research library</p>
    <h2>Papers, notes, and definitions.</h2>

    <div class="card-grid">
      <article class="index-card">
        <p class="card-label">Papers</p>
        <h3>Papers and notes</h3>
        <p>
          Manuscripts, technical notes, and supporting written artifacts for the
          current research stack.
        </p>
        <a class="button button--secondary" href="/papers.php">Open papers</a>
      </article>

      <article class="index-card">
        <p class="card-label">Technical spaces</p>
        <h3>Mathematical spaces</h3>
        <p>
          A deeper technical page for the mathematical setting around the
          Thalean construction.
        </p>
        <a class="button button--secondary" href="/research/thalean-mathematical-spaces.php">Open technical page</a>
      </article>

      <article class="index-card">
        <p class="card-label">Definitions</p>
        <h3>Glossary</h3>
        <p>
          Public definitions for recurring terms: thalion, witness, boundary,
          action, surface, TAT, TGT, and related language.
        </p>
        <a class="button button--secondary" href="/glossary.php">Open glossary</a>
      </article>
    </div>
  </section>

  <section class="index-section">
    <p class="eyebrow">Inspection and evidence</p>
    <h2>Surfaces and receipts.</h2>

    <div class="card-grid">
      <article class="index-card">
        <p class="card-label">Labs</p>
        <h3>Public inspection surfaces</h3>
        <p>
          Open live surfaces for viewing, moving, comparing, and questioning the
          current structures.
        </p>
        <a class="button button--secondary" href="/labs.php">Open labs</a>
      </article>

      <article class="index-card">
        <p class="card-label">Evidence</p>
        <h3>Receipts and artifacts</h3>
        <p>
          Find theorem objects, JSON records, verification reports, checker
          scripts, and bounded status records.
        </p>
        <a class="button button--secondary" href="/evidence.php">View evidence</a>
      </article>

      <article class="index-card">
        <p class="card-label">Coherence</p>
        <h3>Coherence notes</h3>
        <p>
          Notes on surface coherence, projection, observed closure, and the
          difference between appearance and accountable structure.
        </p>
        <a class="button button--secondary" href="/coherence.php">Open coherence notes</a>
      </article>
    </div>
  </section>

  <section class="index-section">
    <p class="eyebrow">Research posture</p>
    <h2>Useful, bounded, inspectable.</h2>
    <p class="section-text">
      CoRI does not treat visual analogy, numerical coincidence, or one
      attractive rendering as proof. The work is strongest when a pattern
      survives changed viewpoints, controlled perturbations, and traceable
      constraints.
    </p>
    <p class="section-text">
      Aletheos.ai is the public surface for that discipline: relation, action,
      witness, evidence, and explicit status boundaries.
    </p>
  </section>
</main>

<?php include __DIR__ . '/includes/site_footer.php'; ?>
