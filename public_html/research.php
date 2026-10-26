<?php
$page_title = 'Findings and ideas — Aletheos.ai';
$page_description = 'What CoRI is learning, why it matters, and what remains uncertain: findings, philosophical perspectives, and open questions in AI stewardship and science.';
$page_css = ['/assets/index.css'];
include __DIR__ . '/includes/head.php';
include __DIR__ . '/includes/site_header.php';
?>

<main class="site-shell research-page">
  <section class="hero">
    <p class="eyebrow">Findings and ideas</p>
    <h1>What are we learning?</h1>
    <p class="hero-text">
      Start with a finding or a question and what it might mean for people.
      Our public explanations distinguish scientific observations, philosophical
      arguments, and possibilities still being explored. The supporting papers
      and methods are available for readers who want to go further.
    </p>
  </section>

  <section class="index-section">
    <p class="eyebrow">Research finding · Computer simulation · 26 October 2026</p>
    <h2>What can memory change?</h2>
    <p class="section-text">
      A controlled comparison shows retained history changing subsequent choices
      in a finite model. Read what happened, why the distinction between storing
      history and acting on it matters, and what the experiment leaves open.
    </p>
    <a class="button button--primary" href="/research/memory-and-possibility.php">Read the finding</a>
  </section>

  <section class="index-section" id="ai-stewardship">
    <p class="eyebrow">AI stewardship · Questions we pursue</p>
    <h2>How do we shape a future with AI?</h2>
    <p class="section-text">
      Artificial intelligence raises questions about human agency, responsibility,
      governance, and the distribution of benefits and harms. Who decides what
      a system is for? Who can question its decisions? How should people have
      a voice in changes that affect them?
    </p>
    <p class="section-text">
      CoRI's role is to investigate these questions and explain what the work
      contributes to public understanding. Commercial products and evaluations
      belong to Rook's implementation work.
    </p>
  </section>

  <section class="index-section" id="philosophy">
    <p class="eyebrow">Philosophy · Questions we pursue</p>
    <h2>How do we understand ourselves and our obligations?</h2>
    <p class="section-text">
      Knowledge, meaning, ethics, relation, and human experience are subjects
      of inquiry in their own right. Philosophical work examines the reasons
      behind our beliefs, the assumptions within an argument, and the
      consequences of how we think about one another.
    </p>
    <p class="section-text">
      A philosophical interpretation should make its reasoning and alternatives
      clear. It can help us understand a scientific finding without becoming
      an additional scientific result merely by association.
    </p>
  </section>

  <section class="index-section" id="scientific-research">
    <p class="eyebrow">Science · Questions we pursue</p>
    <h2>What can inquiry tell us about our world?</h2>
    <p class="section-text">
      CoRI's remit spans scientific disciplines. Current public material
      includes mathematics, information and computation, and investigations
      of physical models. We explain what each result establishes and where
      further evidence is needed.
    </p>
    <p class="section-text">
      The Thalean program is one current line of research. Its finite
      constructions and simulations support particular findings; their wider
      relevance must be established through further work.
    </p>
  </section>

  <section class="index-section" id="thalean-program">
    <p class="eyebrow">For readers who want to go deeper</p>
    <h2>Papers, methods, and experiments.</h2>
    <p class="section-text">
      These resources support the public findings and serve researchers who
      want to examine, reproduce, or employ the methods.
    </p>
    <div class="hero-actions">
      <a class="button button--secondary" href="/papers.php">Papers and notes</a>
      <a class="button button--secondary" href="/labs.php">Experiments</a>
      <a class="button button--secondary" href="/evidence.php">Evidence records</a>
      <a class="button button--secondary" href="/thalean_action_theory.php">Thalean framework</a>
      <a class="button button--secondary" href="/the_thalean_graph_at4val_60_6.php">Thalean graph</a>
      <a class="button button--secondary" href="/research/from-circle-to-thalion.php">Thalion tutorial</a>
      <a class="button button--secondary" href="/research/thalean-mathematical-spaces.php">Mathematical spaces</a>
      <a class="button button--secondary" href="/coherence.php">Coherence notes</a>
      <a class="button button--secondary" href="/glossary.php">Glossary</a>
    </div>
  </section>
</main>

<?php include __DIR__ . '/includes/site_footer.php'; ?>
</body>
</html>
