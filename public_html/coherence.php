<?php
$page_title = 'Local Mimicry and Global Coherence - Aletheos.ai';
$page_description = 'A CoRI research page explaining the coherence gap: how a pattern can look right from one selected viewpoint while failing as a global structure.';
$page_css = ['assets/index.css', 'assets/research_page.css'];

include __DIR__ . '/includes/head.php';
include __DIR__ . '/includes/site_header.php';
?>

<main class="site-shell research-page">
  <section class="hero research-hero">
    <p class="eyebrow">Coherence diagnostics</p>

    <div class="hero-grid">
      <div class="hero-copy">
        <h1 class="hero-title">Local mimicry is not global coherence.</h1>

        <p class="hero-text">
          A pattern can look right from one chosen viewpoint while failing as a
          global structure. CoRI studies that gap.
        </p>

        <p class="hero-text hero-text--secondary">
          The coherence-gap program turns that warning into a graph-theoretic
          diagnostic: change the root, change the frame, perturb the object,
          compare against controls, and ask what remains.
        </p>

        <div class="hero-actions" aria-label="Coherence page actions">
          <a class="button button--primary" href="/research.php">Back to research map</a>
          <a class="button button--secondary" href="/audit.php">View audit layer</a>
        </div>
      </div>

      <aside class="hero-emblem" aria-label="Coherence themes">
        <div class="orbital-mark">
          <span class="orbital-mark__ring orbital-mark__ring--outer"></span>
          <span class="orbital-mark__ring orbital-mark__ring--middle"></span>
          <span class="orbital-mark__ring orbital-mark__ring--inner"></span>
          <span class="orbital-mark__point orbital-mark__point--one"></span>
          <span class="orbital-mark__point orbital-mark__point--two"></span>
          <span class="orbital-mark__point orbital-mark__point--three"></span>
        </div>
        <p class="emblem-caption">root - stress - coherence</p>
      </aside>
    </div>
  </section>

  <section class="index-section">
    <div class="section-head">
      <p class="section-kicker">The problem</p>
      <h2>A selected view can flatter a pattern.</h2>
      <p class="section-text">
        Some structures match a target profile from one root, one scale, or one
        carefully selected view. That can be useful evidence, but it is not yet
        global coherence.
      </p>
      <p class="section-text section-text--spaced">
        The coherence-gap question is simple: does the pattern survive when the
        privileged viewpoint is removed?
      </p>
    </div>

    <div class="principle-grid">
      <article class="principle-card">
        <span class="card-label">Selected view</span>
        <h3>Local mimicry</h3>
        <p>
          The object imitates a desired profile from one chosen root or
          presentation, but the agreement may be local or accidental.
        </p>
      </article>

      <article class="principle-card">
        <span class="card-label">All-root test</span>
        <h3>Global coherence</h3>
        <p>
          The structure remains recognizable when viewed across roots, shells,
          roles, and equivalent descriptions.
        </p>
      </article>

      <article class="principle-card">
        <span class="card-label">Failure mode</span>
        <h3>Coherence gap</h3>
        <p>
          The difference between selected-view success and all-root structural
          stability becomes a measurable warning sign.
        </p>
      </article>
    </div>
  </section>

  <section class="index-section">
    <div class="section-head">
      <p class="section-kicker">The diagnostic</p>
      <h2>Stress the pattern by changing the view.</h2>
      <p class="section-text">
        Coherence diagnostics ask whether a pattern survives root changes,
        shell-role stress, frontier exposure, controlled rewiring, and comparison
        against null models.
      </p>
    </div>

    <div class="card-grid">
      <article class="index-card">
        <span class="card-label">Root change</span>
        <h3>Move the observer</h3>
        <p>
          A graph property that only appears from one chosen root may be a local
          presentation effect rather than a global invariant.
        </p>
      </article>

      <article class="index-card">
        <span class="card-label">Boundary stress</span>
        <h3>Expose the frontier</h3>
        <p>
          Weakness often appears at shell boundaries, transition zones, and
          mixed radial/lateral roles.
        </p>
      </article>

      <article class="index-card">
        <span class="card-label">Controls</span>
        <h3>Compare against perturbations</h3>
        <p>
          Rewiring, shuffling, and null models help separate robust structure
          from decorative agreement.
        </p>
      </article>
    </div>
  </section>

  <section class="index-section">
    <div class="section-head">
      <p class="section-kicker">Why it matters</p>
      <h2>The view that flatters the object is not enough.</h2>
      <p class="section-text">
        The coherence-gap paper gives CoRI a general research pattern: do not
        trust the easiest view of a structure. Test the views that stress it.
      </p>
      <p class="section-text section-text--spaced">
        That principle now informs the broader site: theorem objects, witness
        surfaces, audit artifacts, and physics-facing probes are all treated as
        ways to ask whether apparent patterns can become accountable structures.
      </p>
    </div>
  </section>
</main>

<?php include __DIR__ . '/includes/site_footer.php'; ?>
</body>
</html>
