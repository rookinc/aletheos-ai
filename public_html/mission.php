<?php
$page_title = 'Mission - Aletheos.ai';
$page_description = 'Aletheos is the public home of CoRI, a research workshop studying how apparent patterns become accountable structures through changed viewpoints, controlled perturbations, and traceable constraints.';
$page_css = ['assets/index.css'];

include __DIR__ . '/includes/head.php';
include __DIR__ . '/includes/site_header.php';
?>

<main class="site-shell">
  <section class="hero">
    <p class="eyebrow">Mission</p>

    <div class="hero-grid">
      <div class="hero-copy">
        <h1 class="hero-title">From apparent pattern to accountable structure.</h1>

        <p class="hero-text">
          CoRI studies how apparent patterns become accountable structures: by
          testing whether they survive changed viewpoints, controlled
          perturbations, and traceable constraints.
        </p>

        <p class="hero-text hero-text--secondary">
          Aletheos.ai is the public surface for that work. It gathers theorem
          objects, research notes, audit artifacts, and interactive labs so that
          ideas can be inspected instead of merely asserted.
        </p>
      </div>

      <aside class="hero-emblem" aria-label="Aletheos mission themes">
        <div class="orbital-mark">
          <span class="orbital-mark__ring orbital-mark__ring--outer"></span>
          <span class="orbital-mark__ring orbital-mark__ring--middle"></span>
          <span class="orbital-mark__ring orbital-mark__ring--inner"></span>
          <span class="orbital-mark__point orbital-mark__point--one"></span>
          <span class="orbital-mark__point orbital-mark__point--two"></span>
          <span class="orbital-mark__point orbital-mark__point--three"></span>
        </div>
        <p class="emblem-caption">viewpoint - perturbation - trace</p>
      </aside>
    </div>
  </section>

  <section class="index-section">
    <div class="section-head">
      <p class="section-kicker">The question</p>
      <h2>When does a pattern become something we can trust?</h2>
      <p class="section-text">
        A pattern can be beautiful, surprising, or locally convincing without
        being globally coherent. CoRI asks what survives when a claim is moved
        through different viewpoints, tested against controls, and tied back to
        reproducible evidence.
      </p>
    </div>

    <div class="principle-grid">
      <article class="principle-card">
        <span class="card-label">Changed viewpoints</span>
        <h3>Move the observer</h3>
        <p>
          We ask whether a structure remains visible when the root, scale,
          quotient, frame, or observational position changes.
        </p>
      </article>

      <article class="principle-card">
        <span class="card-label">Controlled perturbations</span>
        <h3>Stress the pattern</h3>
        <p>
          We compare against null models, rewiring, shuffled controls, boundary
          cases, and failure modes instead of protecting the preferred view.
        </p>
      </article>

      <article class="principle-card">
        <span class="card-label">Traceable constraints</span>
        <h3>Leave a witness surface</h3>
        <p>
          We prefer claims that can be connected to artifacts, scripts,
          invariants, ledgers, verification reports, and explicit limitations.
        </p>
      </article>
    </div>
  </section>

  <section class="index-section">
    <div class="section-head">
      <p class="section-kicker">Invitation</p>
      <h2>This work is open to careful readers, builders, and collaborators.</h2>
      <p class="section-text">
        Aletheos is still forming. If these questions matter to you as a
        researcher, builder, parent, educator, artist, founder, or citizen, you
        are invited to follow the work, question it, and help make the claims
        stronger.
      </p>
      <div class="hero-actions">
        <a class="button button--primary" href="/about_cori.php">Learn about CoRI</a>
      </div>
    </div>
  </section>
</main>

<?php include __DIR__ . '/includes/site_footer.php'; ?>
</body>
</html>
