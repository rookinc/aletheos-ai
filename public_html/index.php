<?php
$page_title = 'Aletheos.ai — Findings and ideas from CoRI';
$page_description = 'CoRI shares findings and ideas from philosophy, scientific research, and AI stewardship for people concerned about our changing world. A Rook Services Inc. initiative.';
$page_css = ['/assets/index.css'];
include __DIR__ . '/includes/head.php';
include __DIR__ . '/includes/site_header.php';
?>

<main class="site-shell">

  <style>
    .thalean-mini-hero{display:grid;grid-template-columns:minmax(0,190px) 1fr;gap:1.2rem;align-items:center;margin:0 0 1.5rem;padding:1rem;border:1px solid #d7dcd9;border-radius:22px;background:#fff;box-shadow:0 12px 30px rgba(25,39,47,.06)}
    .thalean-mini-hero__art{display:block;overflow:hidden;border-radius:15px;background:#081a2b;aspect-ratio:16/9}
    .thalean-mini-hero__art svg{display:block;width:100%;height:100%}
    .thalean-mini-hero__copy h2{font-size:clamp(1.2rem,4vw,1.8rem);line-height:1.2;margin:.25rem 0 .4rem}
    .thalean-mini-hero__copy p:not(.eyebrow){margin:.25rem 0 .7rem;color:#59616b;font-size:.95rem}
    .thalean-mini-hero__copy .button{font-size:.9rem}
    @media(max-width:560px){.thalean-mini-hero{grid-template-columns:112px minmax(0,1fr);gap:.8rem;padding:.75rem;border-radius:18px}.thalean-mini-hero__art{aspect-ratio:1/1}.thalean-mini-hero__copy h2{font-size:1.1rem}.thalean-mini-hero__copy p:not(.eyebrow){font-size:.8rem;line-height:1.35}.thalean-mini-hero__copy .button{padding:.5rem .65rem;font-size:.8rem}}
  </style>
  <!-- THALEAN-MINI-HERO-001 -->
  <section class="thalean-mini-hero" aria-labelledby="thalean-mini-title">
    <a class="thalean-mini-hero__art" href="/observatories/thalean-graph/" aria-label="Open The Graviton on the Thalean Graph simulator">
      <svg viewBox="0 0 320 180" role="img" aria-label="Illustrative circular field with three colored BC markers">
        <defs>
          <radialGradient id="thalean-glow"><stop stop-color="#78cbb6" stop-opacity=".6"/><stop offset=".6" stop-color="#4eb8c5" stop-opacity=".19"/><stop offset="1" stop-color="#061625" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="320" height="180" fill="#081a2b"/>
        <circle cx="160" cy="90" r="84" fill="url(#thalean-glow)"/>
        <g fill="none" stroke-width=".8" opacity=".32">
          <circle cx="160" cy="90" r="72" stroke="#75b9d8"/>
          <circle cx="160" cy="90" r="62" stroke="#75b9d8"/>
          <ellipse cx="160" cy="90" rx="68" ry="25" stroke="#7ac7e3" transform="rotate(32 160 90)"/>
          <ellipse cx="160" cy="90" rx="68" ry="25" stroke="#c39bdb" transform="rotate(-37 160 90)"/>
        </g>
        <g fill="none" stroke-width="1" opacity=".34">
          <path d="M160 26 Q245 90 160 154 Q75 90 160 26" stroke="#64d6e7"/>
          <path d="M98 90 Q160 8 222 90 Q160 172 98 90" stroke="#e9c66a"/>
          <path d="M115 43 Q252 54 205 137 Q68 126 115 43" stroke="#d99bd9"/>
        </g>
        <circle cx="160" cy="90" r="15" fill="#0c2431"/>
        <circle cx="218" cy="55" r="6" fill="#63d7ef"/>
        <circle cx="100" cy="92" r="6" fill="#f0d06e"/>
        <circle cx="202" cy="141" r="6" fill="#e4a0e1"/>
      </svg>
    </a>
    <div class="thalean-mini-hero__copy">
      <h2 id="thalean-mini-title">The Graviton on the Thalean Graph</h2>
      <p>Explore the Thalean Graph through two interactive geometric lenses.</p>
      <a class="button button--primary" href="/observatories/thalean-graph/">Explore the simulator</a>
    </div>
  </section>
  <!-- /THALEAN-MINI-HERO-001 -->



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
