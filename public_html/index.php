<?php
$page_title = 'Aletheos.ai — Public research surface for CoRI';
$page_description = 'Aletheos.ai is the public research surface for CoRI: accountable structure, relation, action, witness, and traceable evidence.';
$page_css = ['/assets/index.css', '/assets/css/at4val-3d-viewer.css'];
include __DIR__ . '/includes/head.php';
include __DIR__ . '/includes/site_header.php';
?>

<main class="site-shell">
  <section class="hero">
    <p class="eyebrow">Aletheos.ai</p>
    <h1>Making intelligence accountable.</h1>

      <div
        class="intro-graph intro-graph--at4val"
        data-at4val-3d
        data-src="/json/at4val_60_6_3d.json"
        aria-label="Rotating 3D rendering of AT4val[60,6]"
      >
        <canvas></canvas>
      </div>

    <p class="hero-text">
      Aletheos is the public research surface for the Centre of Recursive Inquiry.
      It studies how apparent patterns become accountable structures.
    </p>
    <p class="hero-text">
      The work asks a practical question: when relation becomes action, what trace
      remains, and how can others inspect it?
    </p>
    <div class="hero-actions">
      <a class="button button--primary" href="/research/from-circle-to-thalion.php">Start here</a>
      <a class="button button--secondary" href="/labs.php">Open labs</a>
      <a class="button button--secondary" href="/evidence.php">View evidence</a>
    </div>
  </section>

  <section class="index-section">
    <p class="eyebrow">Four doors</p>
    <h2>Choose your entry point.</h2>

    <div class="card-grid">
      <article class="index-card">
        <p class="card-label">New visitor</p>
        <h3>Start Here</h3>
        <p>
          Begin with the ordinary-language path from circle to boundary, body,
          witness, closure, and thalion.
        </p>
        <a class="button button--secondary" href="/research/from-circle-to-thalion.php">Read the tutorial</a>
      </article>

      <article class="index-card">
        <p class="card-label">Research reader</p>
        <h3>Research</h3>
        <p>
          Explore Thalean Action Theory, the Thalean graph, papers, technical
          notes, and current formal claims.
        </p>
        <a class="button button--secondary" href="/research.php">View research</a>
      </article>

      <article class="index-card">
        <p class="card-label">Explorer</p>
        <h3>Labs</h3>
        <p>
          Open public inspection surfaces for viewing, moving, comparing, and
          questioning the current structures.
        </p>
        <a class="button button--secondary" href="/labs.php">Open labs</a>
      </article>

      <article class="index-card">
        <p class="card-label">Verifier</p>
        <h3>Evidence</h3>
        <p>
          Find the receipts: theorem objects, JSON records, verification reports,
          checker scripts, and bounded status notes.
        </p>
        <a class="button button--secondary" href="/evidence.php">View evidence</a>
      </article>
    </div>
  </section>

  <section class="index-section">
    <p class="eyebrow">Current focus</p>
    <h2>The active public stack.</h2>

    <div class="card-grid">
      <article class="index-card">
        <p class="card-label">Concept</p>
        <h3>What is a thalion?</h3>
        <p>
          A thalion is the concrete finite transport organism at the center of
          this research program: boundary, body, relation, witness, and trace
          held together as inspectable structure.
        </p>
        <a class="button button--secondary" href="/research/from-circle-to-thalion.php">Start with the concept</a>
      </article>

      <article class="index-card">
        <p class="card-label">Object</p>
        <h3>The Thalean graph</h3>
        <p>
          The theorem-facing public surface for the canonical finite object,
          verification records, and companion papers.
        </p>
        <a class="button button--secondary" href="/the_thalean_graph_at4val_60_6.php">View the object</a>
      </article>

      <article class="index-card">
        <p class="card-label">Surface</p>
        <h3>P900 Surface Observatory</h3>
        <p>
          The primary live lab for inspecting the current public graph surface
          through viewpoint, rotation, saved lenses, and visible relation.
        </p>
        <a class="button button--primary" href="/labs/p900_observatory/lab.html">Open P900</a>
      </article>

      <article class="index-card">
        <p class="card-label">Action</p>
        <h3>Informative Action Lab</h3>
        <p>
          Watch action move through a simple visual system, generate a response,
          and leave a trace that can be inspected afterward.
        </p>
        <a class="button button--secondary" href="/labs/informative_action/">Open Informative Action</a>
      </article>
    </div>
  </section>

  <section class="index-section">
    <p class="eyebrow">CoRI</p>
    <h2>Err. Doubt. Endure. Discover.</h2>
    <p class="section-text">
      The Centre of Recursive Inquiry studies how ideas, systems, and claims
      become accountable under changed viewpoints, controlled perturbations,
      and traceable constraints.
    </p>
    <p class="section-text">
      Aletheos.ai is its public surface: a place where relation, action, witness,
      and evidence can be inspected rather than merely asserted.
    </p>
    <div class="hero-actions">
      <a class="button button--secondary" href="/about_cori.php">About CoRI</a>
      <a class="button button--secondary" href="/thalean_action_theory.php">Read TAT</a>
    </div>
  </section>
</main>

<script src="/assets/js/at4val-3d-viewer.js" defer></script>
<?php include __DIR__ . '/includes/site_footer.php'; ?>
