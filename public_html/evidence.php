<?php
$page_title = 'Evidence — Aletheos.ai';
$page_description = 'Evidence records for Aletheos and CoRI: theorem objects, JSON artifacts, verification reports, checker scripts, and bounded status notes.';
$page_css = [];
include __DIR__ . '/includes/head.php';
include __DIR__ . '/includes/site_header.php';
?>

<main class="site-shell">
  <section class="hero">
    <p class="eyebrow">Evidence</p>
    <h1>The receipts live here.</h1>
    <p class="hero-text">
      Aletheos claims should remain tied to inspectable artifacts: theorem
      objects, JSON records, verification reports, checker scripts, and explicit
      status boundaries.
    </p>
    <p class="hero-text">
      Evidence does not mean final certainty. It means the work leaves a trail
      that others can inspect, challenge, and improve.
    </p>
    <div class="hero-actions">
      <a class="button button--primary" href="/json/theorem_object.json">Open theorem object</a>
      <a class="button button--secondary" href="/audit/reports/verification_report.md">Read verification report</a>
      <a class="button button--secondary" href="/research.php">Back to research</a>
    </div>
  </section>

  <section class="index-section">
    <p class="eyebrow">Canonical artifacts</p>
    <h2>The public object records.</h2>

    <div class="card-grid">
      <article class="index-card">
        <p class="card-label">Theorem object</p>
        <h3>Canonical graph record</h3>
        <p>
          The machine-readable theorem object for the public Thalean graph
          surface.
        </p>
        <a class="button button--secondary" href="/json/theorem_object.json">Open JSON</a>
      </article>

      <article class="index-card">
        <p class="card-label">Matrix records</p>
        <h3>Incidence and quadratic data</h3>
        <p>
          Public records for the finite matrices and quotient-visible structures
          used by the research pages and labs.
        </p>
        <a class="button button--secondary" href="/json/matrix_M.json">Open matrix M</a>
      </article>

      <article class="index-card">
        <p class="card-label">Transport data</p>
        <h3>Cocycle and transport records</h3>
        <p>
          Public data supporting the transport-facing side of the Thalean graph
          stack.
        </p>
        <a class="button button--secondary" href="/json/transport_cocycle.json">Open transport data</a>
      </article>
    </div>
  </section>

  <section class="index-section">
    <p class="eyebrow">Verification</p>
    <h2>Checks, reports, and repeatable tests.</h2>

    <div class="card-grid">
      <article class="index-card">
        <p class="card-label">Report</p>
        <h3>Verification report</h3>
        <p>
          The current public verification summary for graph, matrix, and
          theorem-facing artifact checks.
        </p>
        <a class="button button--secondary" href="/audit/reports/verification_report.md">Read report</a>
      </article>

      <article class="index-card">
        <p class="card-label">Checker scripts</p>
        <h3>Public checkers</h3>
        <p>
          Scripts used to inspect public artifacts and keep claims connected to
          reproducible checks.
        </p>
        <a class="button button--secondary" href="/audit/checkers/run_all.py">Open checker index</a>
      </article>

      <article class="index-card">
        <p class="card-label">Reports</p>
        <h3>Machine-readable outputs</h3>
        <p>
          JSON reports produced by the checker layer and related verification
          routines.
        </p>
        <a class="button button--secondary" href="/audit/reports/verification_report.json">Open report JSON</a>
      </article>
    </div>
  </section>

  <section class="index-section">
    <p class="eyebrow">Research boundaries</p>
    <h2>Status matters.</h2>

    <div class="principle-grid">
      <article class="principle-card">
        <h3>What is canonical?</h3>
        <p>
          Canonical records describe the finite object and supporting artifacts
          that public pages and labs should treat as source data.
        </p>
      </article>

      <article class="principle-card">
        <h3>What is exploratory?</h3>
        <p>
          Labs and visual surfaces may help reveal structure, but they do not
          replace formal artifacts or proof-facing checks.
        </p>
      </article>

      <article class="principle-card">
        <h3>What is bounded?</h3>
        <p>
          Physical analogies, visual metaphors, and interface renderings should
          remain explicitly bounded. They are inspection aids, not automatic
          claims about the world.
        </p>
      </article>
    </div>
  </section>

  <section class="index-section">
    <p class="eyebrow">Machine-readable records</p>
    <h2>Data should stay reachable.</h2>

    <div class="card-grid">
      <article class="index-card">
        <p class="card-label">Graph</p>
        <h3>3D graph data</h3>
        <p>
          Public graph data used by rendering and inspection surfaces.
        </p>
        <a class="button button--secondary" href="/json/at4val_60_6_3d.json">Open graph JSON</a>
      </article>

      <article class="index-card">
        <p class="card-label">P900</p>
        <h3>P900 manifest</h3>
        <p>
          Manifest and supporting records for the current P900 public surface.
        </p>
        <a class="button button--secondary" href="/json/p900/manifest.json">Open manifest</a>
      </article>

      <article class="index-card">
        <p class="card-label">Metadata</p>
        <h3>Site metadata</h3>
        <p>
          General metadata used to describe public artifacts and their status.
        </p>
        <a class="button button--secondary" href="/json/metadata.json">Open metadata</a>
      </article>
    </div>
  </section>

  <section class="index-section">
    <p class="eyebrow">Evidence posture</p>
    <h2>Public claims should remain inspectable.</h2>
    <p class="section-text">
      Evidence is not decoration. It is the discipline that keeps an idea from
      floating free of its constraints.
    </p>
    <p class="section-text">
      The goal is not to overwhelm visitors with files. The goal is to make sure
      that a public claim can point back to the records, checks, and boundaries
      that support it.
    </p>
  </section>
</main>

<?php include __DIR__ . '/includes/site_footer.php'; ?>
