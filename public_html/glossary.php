<?php
$page_title = 'Thalean Glossary - Aletheos.ai';
$page_description = 'A public glossary for Thalean Relational Theory, Thalean Graph Theory, coherence diagnostics, witness surfaces, and audit language.';
$page_css = ['assets/index.css', 'assets/research_page.css'];

include __DIR__ . '/includes/head.php';
include __DIR__ . '/includes/site_header.php';
?>

<main class="site-shell research-page">
  <section class="hero research-hero">
    <p class="eyebrow">Glossary</p>

    <div class="hero-grid">
      <div class="hero-copy">
        <h1 class="hero-title">Thalean terms, plainly defined.</h1>

        <p class="hero-text">
          This glossary defines the public vocabulary used across Aletheos.ai:
          relation, action, witness, boundary, coherence, and the finite graph
          structures behind the Thalean program.
        </p>

        <p class="hero-text hero-text--secondary">
          The purpose is not to turn vocabulary into doctrine. It is to keep
          public claims readable, bounded, and inspectable.
        </p>

        <div class="hero-actions" aria-label="Glossary actions">
          <a class="button button--primary" href="/relational_theory.php">Back to TRT</a>
          <a class="button button--secondary" href="/research.php">Research map</a>
        </div>
      </div>

      <aside class="hero-emblem" aria-label="Glossary themes">
        <div class="orbital-mark">
          <span class="orbital-mark__ring orbital-mark__ring--outer"></span>
          <span class="orbital-mark__ring orbital-mark__ring--middle"></span>
          <span class="orbital-mark__ring orbital-mark__ring--inner"></span>
          <span class="orbital-mark__point orbital-mark__point--one"></span>
          <span class="orbital-mark__point orbital-mark__point--two"></span>
          <span class="orbital-mark__point orbital-mark__point--three"></span>
        </div>
        <p class="emblem-caption">term - boundary - witness</p>
      </aside>
    </div>
  </section>

  <section class="index-section">
    <div class="section-head">
      <p class="section-kicker">Core frame</p>
      <h2>The umbrella terms.</h2>
    </div>

    <div class="card-grid">
      <article class="index-card feature-card">
        <span class="card-label">TRT</span>
        <h3>Thalean Relational Theory</h3>
        <p>
          The umbrella framework for studying identity, meaning, action, and
          accountability through relational structure and admissible change.
        </p>
      </article>

      <article class="index-card">
        <span class="card-label">TGT</span>
        <h3>Thalean Graph Theory</h3>
        <p>
          The mathematical graph-theoretic core of the program: finite graph
          objects, quotient witnesses, incidence laws, and invariants.
        </p>
      </article>

      <article class="index-card">
        <span class="card-label">CoRI</span>
        <h3>Center of Recursive Inquiry</h3>
        <p>
          The research workshop and method: changed viewpoints, controlled
          perturbations, traceable constraints, and public witness discipline.
        </p>
      </article>
    </div>
  </section>

  <section class="index-section">
    <div class="section-head">
      <p class="section-kicker">Identity and action</p>
      <h2>How TRT talks about structure.</h2>
    </div>

    <div class="card-grid">
      <article class="index-card">
        <span class="card-label">Identity</span>
        <h3>Relational invariance</h3>
        <p>
          Identity is not isolated substance. Identity is what remains
          recognizable across a disciplined family of admissible changes.
        </p>
      </article>

      <article class="index-card">
        <span class="card-label">Action</span>
        <h3>Admissible transformation</h3>
        <p>
          An action is a lawful transition inside a relational frame. Not every
          imaginable change counts as a meaningful test of identity.
        </p>
      </article>

      <article class="index-card">
        <span class="card-label">Boundary</span>
        <h3>Admissibility surface</h3>
        <p>
          A boundary is not merely a wall. It regulates exchange, distinguishes
          inside from outside, and helps determine which actions preserve a body.
        </p>
      </article>
    </div>
  </section>

  <section class="index-section">
    <div class="section-head">
      <p class="section-kicker">Witness and coherence</p>
      <h2>How claims become inspectable.</h2>
    </div>

    <div class="card-grid">
      <article class="index-card">
        <span class="card-label">Witness</span>
        <h3>Inspectable trace</h3>
        <p>
          A witness is a concrete artifact, calculation, page, visualization,
          script, or proof element that lets a claim be checked.
        </p>
      </article>

      <article class="index-card">
        <span class="card-label">Surface</span>
        <h3>Projected appearance</h3>
        <p>
          A surface is the locally visible or projected appearance of a
          structure. A surface may be useful without being the full object.
        </p>
      </article>

      <article class="index-card">
        <span class="card-label">Coherence gap</span>
        <h3>Local success, global failure</h3>
        <p>
          A coherence gap occurs when a locally convincing surface fails broader
          relational tests across roots, frames, perturbations, or constraints.
        </p>
      </article>
    </div>
  </section>

  <section class="index-section">
    <div class="section-head">
      <p class="section-kicker">Graph terms</p>
      <h2>The finite graph vocabulary.</h2>
    </div>

    <div class="card-grid">
      <article class="index-card feature-card">
        <span class="card-label">Thalion</span>
        <h3>The G60 organism</h3>
        <p>
          A thalion refers to the full concrete 60-state Thalean graph instance
          with its relationships and properties, not merely a quotient shadow.
        </p>
      </article>

      <article class="index-card">
        <span class="card-label">Quotient</span>
        <h3>Compressed witness layer</h3>
        <p>
          A quotient groups or compresses a larger structure according to a rule.
          It can reveal structure, but it should not be mistaken for the whole.
        </p>
      </article>

      <article class="index-card">
        <span class="card-label">Shadow</span>
        <h3>Downstream trace</h3>
        <p>
          A shadow is a compressed or projected trace of a fuller structure,
          such as a matrix, quotient-visible surface, or derived profile.
        </p>
      </article>
    </div>
  </section>
</main>

<?php include __DIR__ . '/includes/site_footer.php'; ?>
</body>
</html>
