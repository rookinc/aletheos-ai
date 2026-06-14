<?php
$page_title = 'Labs — Aletheos.ai';
$page_description = 'Interactive Aletheos labs for exploring the P900 surface and informative action.';
$page_css = ['/assets/labs_page.css'];
include __DIR__ . '/includes/head.php';
include __DIR__ . '/includes/site_header.php';
?>

<main class="site-shell labs-page">
  <section class="hero">
    <p class="eyebrow">Labs</p>
    <h1>See the structure move.</h1>
    <p class="hero-text">
      Start with the P900 Observatory. Rotate the surface, change the view,
      compare lenses, and look for what stays connected.
    </p>
    <p class="hero-text">
      The labs are not proofs. They are places to explore the work with your
      eyes before following the receipts.
    </p>
    <div class="hero-actions">
      <a class="button button--primary" href="/labs/p900_observatory/lab.html">Open P900</a>
      <a class="button button--secondary" href="/labs/informative_action/">Try Informative Action</a>
      <a href="labs/registered_boundary_flux/lab.html" class="button button--primary">Open Boundary Flux</a>
    </div>
  </section>

  <section class="index-section">
    <p class="eyebrow">Start here</p>
    <h2>The live surfaces.</h2>
    <div class="card-grid">
      <article class="index-card">
        <p class="card-label">Main lab</p>
        <h3>P900 Surface Observatory</h3>
        <p>
          The main live surface. Spin it, save views, compare lenses, and look
          for recurring structure.
        </p>
        <p>
          This is the best place to begin after reading the thalion tutorial.
        </p>
        <a class="button button--primary" href="/labs/p900_observatory/lab.html">Open P900</a>
      </article>

      <article class="index-card">
        <p class="card-label">Small demo</p>
        <h3>Informative Action Lab</h3>
        <p>
          A simple visual toy for watching action move through a system and
          leave a trace.
        </p>
        <p>
          Useful for seeing the basic idea of action, response, and memory.
        </p>
        <a class="button button--secondary" href="/labs/informative_action/">Try the demo</a>
      </article>

      <article class="index-card">
        <p class="card-label">Need the story?</p>
        <h3>What is a thalion?</h3>
        <p>
          Start with a circle, then climb through boundary, body, ports, hinges,
          witness, closure, and thalion.
        </p>
        <a class="button button--secondary" href="/research/from-circle-to-thalion.php">Read the tutorial</a>
      </article>
    </div>
  </section>

  <section class="index-section">
    <p class="eyebrow">What to look for</p>
    <h2>Move it. Compare it. Ask what remains.</h2>
    <div class="principle-grid">
      <article class="principle-card">
        <h3>View</h3>
        <p>
          Rotate the surface. A good pattern should not depend on only one
          attractive angle.
        </p>
      </article>

      <article class="principle-card">
        <h3>Connection</h3>
        <p>
          Look for what stays related as the view changes: clusters, seams,
          layers, paths, and repeated forms.
        </p>
      </article>

      <article class="principle-card">
        <h3>Trace</h3>
        <p>
          Follow the trail back to the graph, data, checks, and evidence when
          you want to know what supports the view.
        </p>
      </article>
    </div>
  </section>

  <section class="index-section">
    <p class="eyebrow">Behind the views</p>
    <h2>The pictures are entry points.</h2>
    <p class="section-text">
      The labs make the work easier to see, but they do not replace the formal
      object or the evidence records.
    </p>
    <div class="card-grid">
      <article class="index-card">
        <p class="card-label">Object</p>
        <h3>The Thalean Graph</h3>
        <p>
          The formal graph page gives the canonical finite object behind the
          public surfaces.
        </p>
        <a class="button button--secondary" href="/the_thalean_graph_at4val_60_6.php">View the graph</a>
      </article>

      <article class="index-card">
        <p class="card-label">Receipts</p>
        <h3>Evidence</h3>
        <p>
          The evidence page keeps the public records, reports, checker scripts,
          and data files reachable.
        </p>
        <a class="button button--secondary" href="/evidence.php">View evidence</a>
      </article>

      <article class="index-card">
        <p class="card-label">Framework</p>
        <h3>Thalean Action Theory</h3>
        <p>
          The framework explains relation, action, witness, trace, and
          accountable structure.
        </p>
        <a class="button button--secondary" href="/thalean_action_theory.php">Read TAT</a>
      </article>
    </div>
  </section>

  <section class="index-section">
    <p class="eyebrow">Status</p>
    <h2>Playful, provisional, inspectable.</h2>
    <p class="section-text">
      These are working surfaces. They are meant to help people see, question,
      and discuss the structure more easily.
    </p>
  </section>
</main>

<?php include __DIR__ . '/includes/site_footer.php'; ?>
