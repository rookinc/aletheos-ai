<?php
$page_title = 'Aletheos.ai — Findings and ideas from CoRI';
$page_description = 'CoRI shares findings and ideas from philosophy, scientific research, and AI stewardship for people concerned about our changing world. A Rook Services Inc. initiative.';
$page_css = ['/assets/index.css'];
include __DIR__ . '/includes/head.php';
include __DIR__ . '/includes/site_header.php';
?>

<main class="site-shell">
  

  

  <section class="index-section">
    <p class="eyebrow">Philosophy · Two ways into the conversation</p>
    <h2>Experience and the lives we affect.</h2>
    <div class="card-grid">
      <article class="index-card">
        <p class="card-label">Consciousness and relation</p>
        <h3>What do we mean by conscious?</h3>
        <p>
          If the universe is conscious, what does that mean to a physician?
          Examine the language of experience, evidence, and the relationships
          through which we understand one another.
        </p>
        <a class="button button--secondary" href="/philosophy/consciousness-and-relation.php">Read the inquiry</a>
      </article>
      <article class="index-card">
        <p class="card-label">Morality · A personal perspective</p>
        <h3>Let my trace not be cruelty.</h3>
        <p>
          Scott Allen Cave considers responsibility before certainty: our actions
          leave marks in lives whose experience we cannot fully enter.
        </p>
        <a class="button button--secondary" href="/philosophy/let-my-trace-not-be-cruelty.php">Read Scott's essay</a>
      </article>
    </div>
  </section>

  <section class="index-section">
    <p class="eyebrow">The questions we pursue</p>
    <h2>AI stewardship, philosophy, and science.</h2>
    <div class="card-grid">
      <article class="index-card">
        <h3>Living with artificial intelligence</h3>
        <p>
          How do we preserve human agency as AI changes daily life? Who shapes
          its purposes, who benefits, and who bears its consequences?
        </p>
        <a class="button button--secondary" href="/research.php#ai-stewardship">AI stewardship</a>
      </article>
      <article class="index-card">
        <h3>Making sense of human experience</h3>
        <p>
          What can we know? What do we value? How do our ideas about meaning,
          responsibility, and our relationships shape the lives we lead?
        </p>
        <a class="button button--secondary" href="/philosophy.php">Philosophical inquiry</a>
      </article>
      <article class="index-card">
        <h3>Discovering how our world works</h3>
        <p>
          Scientific inquiry across disciplines can change how we understand
          nature and our place within it. Findings need explanations that make
          their significance and uncertainty clear.
        </p>
        <a class="button button--secondary" href="/research.php#scientific-research">Scientific research</a>
      </article>
    </div>
  </section>


  <!-- THALEAN-OBSERVATORY-001 -->
  <section class="index-section" id="thalean-observatory">
    <p class="eyebrow">Interactive research · Mathematical simulation</p>
    <h2>The Graviton on HOG 52002</h2>
    <div class="card-grid">
      <article class="index-card">
        <p class="card-label">The Thalaen Graph</p>
        <h3>Explore the structure of a mathematical universe.</h3>
        <p>
          Enter an interactive visualization of finite graph structures,
          cyclic motion, and internal-state relationships. Rotate the
          model, switch between plasma and flowing-sheet views, and
          examine its vertex and spherical overlays.
        </p>
        <p>
          The simulator explores mathematical possibilities.
          It does not establish the existence of physical gravitons
          or a theory of gravity.
        </p>
        <a class="button button--primary"
           href="/observatories/thalean-graph/">
          Explore the simulator
        </a>
      </article>
    </div>
  </section>
  <!-- /THALEAN-OBSERVATORY-001 -->

<section class="hero">
    <p class="eyebrow">Center of Recursive Inquiry · A Rook Services Inc. initiative</p>
    <p class="eyebrow">Research finding · Computer simulation · 26 October 2026</p>
    <h1>What can memory change?</h1>
    <p class="hero-text">
      Two simulated systems began with identical conditions. When retained
      history influenced the next choices in one of them, their paths separated.
      Turning that influence off restored identical paths.
    </p>
    <p class="hero-text">
      Keeping a record and using it to make a choice are different behaviors.
      Read what this controlled comparison shows, why the distinction matters,
      and what it leaves open.
    </p>
    <div class="hero-actions">
      <a class="button button--primary" href="/research/memory-and-possibility.php">Read the finding</a>
      <a class="button button--secondary" href="/research.php">More findings and ideas</a>
    </div>
  </section>

  <section class="index-section">
    <p class="eyebrow">CoRI</p>
    <h2>Err. Doubt. Endure. Discover.</h2>
    <p class="section-text">
      Research should give people something worth thinking about. We bring
      findings, philosophical arguments, and open questions into public view,
      explain the reasons behind them, and revise our understanding when the
      work calls for it.
    </p>
    <div class="hero-actions">
      <a class="button button--secondary" href="/mission.php">Our mission</a>
      <a class="button button--secondary" href="/papers.php">Longer reading</a>
    </div>
  </section>
</main>

<?php include __DIR__ . '/includes/site_footer.php'; ?>
</body>
</html>
