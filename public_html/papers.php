<?php
$page_title = 'Papers and Notes - Aletheos.ai';
$page_description = 'Public papers, theorem notes, working notes, and bounded research outputs from CoRI and the Thalean program.';
$page_css = ['assets/index.css', 'assets/research_page.css'];

include __DIR__ . '/includes/head.php';
include __DIR__ . '/includes/site_header.php';
?>

<main class="site-shell research-page">
  <section class="hero research-hero">
    <p class="eyebrow">Papers and notes</p>

    <div class="hero-grid">
      <div class="hero-copy">
        <h1 class="hero-title">Research outputs with boundaries attached.</h1>

        <p class="hero-text">
          This page gathers public papers and notes from CoRI and the Thalean
          research program. Each item is presented with a status label so a
          visitor can tell the difference between theorem-facing work,
          exploratory notes, literature synthesis, and speculative bridgework.
        </p>

        <p class="hero-text hero-text--secondary">
          The rule is simple: the public name of a project does not upgrade the
          proof status of a claim. Papers, notes, artifacts, and labs each have
          their own boundaries.
        </p>

        <div class="hero-actions" aria-label="Paper page actions">
          <a class="button button--primary" href="/research.php">Back to research map</a>
          <a class="button button--secondary" href="/evidence.php">View evidence layer</a>
        </div>
      </div>

      <aside class="hero-emblem" aria-label="Paper status themes">
        <div class="orbital-mark">
          <span class="orbital-mark__ring orbital-mark__ring--outer"></span>
          <span class="orbital-mark__ring orbital-mark__ring--middle"></span>
          <span class="orbital-mark__ring orbital-mark__ring--inner"></span>
          <span class="orbital-mark__point orbital-mark__point--one"></span>
          <span class="orbital-mark__point orbital-mark__point--two"></span>
          <span class="orbital-mark__point orbital-mark__point--three"></span>
        </div>
        <p class="emblem-caption">claim - status - witness</p>
      </aside>
    </div>
  </section>

  <section class="index-section">
    <div class="section-head">
      <p class="section-kicker">Status labels</p>
      <h2>How to read this library.</h2>
      <p class="section-text">
        The same research program can contain different kinds of claims. A
        theorem-facing note, a computational experiment, a visual witness, and a
        speculative physical bridge should not be read as the same kind of
        evidence.
      </p>
    </div>

    <div class="principle-grid">
      <article class="principle-card">
        <span class="card-label">Theorem-facing</span>
        <h3>Finite structure</h3>
        <p>
          A mathematical or artifact-backed note tied to a specific finite
          object, identity, construction, or verification path.
        </p>
      </article>

      <article class="principle-card">
        <span class="card-label">Working note</span>
        <h3>Developing frame</h3>
        <p>
          A public research note that organizes terms, examples, conjectures, or
          method without claiming final closure.
        </p>
      </article>

      <article class="principle-card">
        <span class="card-label">Speculative bridge</span>
        <h3>Bounded analogy</h3>
        <p>
          A cautious connection to another domain, useful for inquiry but not
          treated as proof by association.
        </p>
      </article>
    </div>
  </section>

  <section class="index-section">
    <div class="section-head">
      <p class="section-kicker">Thalean graph sequence</p>
      <h2>The current public paper trail around the graph core.</h2>
      <p class="section-text">
        These papers develop the finite graph object, quotient geometry, chamber
        grammar, witness surface, and early benchmark extensions.
      </p>
    </div>

    <div class="card-grid paper-grid">
      <a class="index-card feature-card" href="https://zenodo.org/records/19043356" target="_blank" rel="noopener">
        <span class="card-label">Theorem-facing</span>
        <h3>Dodecahedral Transport</h3>
        <p>
          Sector geometry on L(Petersen) and the identity
          Q = MM^T = A^3 + 2A^2 + 2I.
        </p>
        <p class="doi-line">DOI: 10.5281/zenodo.19043356</p>
      </a>

      <a class="index-card" href="https://zenodo.org/records/19520206" target="_blank" rel="noopener">
        <span class="card-label">Theorem-facing</span>
        <h3>Chamber Grammar</h3>
        <p>
          The internal chamber grammar of the Thalean sector matrix and the
          quotient-visible structure it exposes.
        </p>
        <p class="doi-line">DOI: 10.5281/zenodo.19520206</p>
      </a>

      <a class="index-card" href="https://zenodo.org/records/19542052" target="_blank" rel="noopener">
        <span class="card-label">Witness note</span>
        <h3>Thalean Witness</h3>
        <p>
          A unified finite witness surface for the current theorem-facing
          object.
        </p>
        <p class="doi-line">DOI: 10.5281/zenodo.19542052</p>
      </a>

      <a class="index-card" href="https://doi.org/10.5281/zenodo.19561286" target="_blank" rel="noopener">
        <span class="card-label">Speculative bridge</span>
        <h3>Structured CMB Benchmark</h3>
        <p>
          An exploratory mixed structured template for a TE-dominated middle-band
          CMB benchmark.
        </p>
        <p class="doi-line">DOI: 10.5281/zenodo.19561286</p>
      </a>
    </div>
  </section>

  <section class="index-section">
    <div class="section-head">
      <p class="section-kicker">Method papers and active notes</p>
      <h2>CoRI methods being prepared for public release.</h2>
      <p class="section-text">
        These entries identify active research lanes. They are included to show
        the shape of the public program, not to imply that every item has the
        same proof status or release state.
      </p>
    </div>

    <div class="card-grid">
      <article class="index-card feature-card">
        <span class="card-label">Method paper</span>
        <h3>Coherence Gap Invariants</h3>
        <p>
          A finite-graph diagnostic for separating projected surface agreement
          from global coherence through changed viewpoints, perturbations, and
          control comparisons.
        </p>
      </article>

      <article class="index-card">
        <span class="card-label">Theorem note</span>
        <h3>Metric Closure and Star Polyiamond</h3>
        <p>
          A unit-distance workshop note treating a failed lift as evidence, then
          closing it through a metric closure operator into a known finite graph.
        </p>
      </article>

      <article class="index-card">
        <span class="card-label">Physics-facing probe</span>
        <h3>Sonoluminescence Boundary Flux</h3>
        <p>
          A carefully bounded research lane comparing boundary-flux language,
          stability regimes, and emission constraints without claiming a
          replacement for established physical models.
        </p>
      </article>
    </div>
  </section>

  <section class="index-section scope-section">
    <div class="section-head">
      <p class="section-kicker">Boundary discipline</p>
      <h2>Papers are not decorations. They are claim containers.</h2>
      <p class="section-text">
        Aletheos keeps research outputs public so that claims can be inspected,
        challenged, revised, and tied back to artifacts. Public presentation
        should make status clearer, not blur it.
      </p>
    </div>
  </section>
</main>

<?php include __DIR__ . '/includes/site_footer.php'; ?>
</body>
</html>
