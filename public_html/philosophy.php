<?php
$page_title = 'Philosophy — Experience, meaning, and responsibility at CoRI';
$page_description = 'Public philosophical inquiry into consciousness, subjective and objective meaning, relationships, and morality, including Scott Allen Cave’s personal perspective.';
$page_css = ['/assets/index.css'];
include __DIR__ . '/includes/head.php';
include __DIR__ . '/includes/site_header.php';
?>

<main class="site-shell">
  <section class="hero">
    <p class="eyebrow">Philosophy at CoRI</p>
    <h1>Experience. Meaning. Responsibility.</h1>
    <p class="hero-text">
      Philosophy helps us examine the words we use, the beliefs we live by,
      and the obligations we recognize toward others. These essays begin with
      questions people can encounter in ordinary life. You do not need to
      learn a mathematical framework to take part.
    </p>
  </section>

  <section class="index-section" id="consciousness">
    <p class="eyebrow">Consciousness and relation · Philosophical inquiry</p>
    <h2>What do we mean by conscious?</h2>
    <p class="section-text">
      If someone says the universe is conscious, what should a physician
      understand? We examine the different claims that sentence might express,
      then ask how subjective experience and objective evidence relate in
      medicine, everyday encounters, and our understanding of reality.
    </p>
    <a class="button button--primary" href="/philosophy/consciousness-and-relation.php">Explore the language of consciousness</a>
  </section>

  <section class="index-section" id="morality">
    <p class="eyebrow">Morality · Scott Allen Cave's personal perspective</p>
    <h2>Let my trace not be cruelty.</h2>
    <p class="section-text">
      Our actions can become part of another person's memory, even when we
      cannot fully know their experience. Scott develops his interpretation
      of moral responsibility from that encounter: what kind of trace are we
      willing to leave in the lives of others?
    </p>
    <a class="button button--primary" href="/philosophy/let-my-trace-not-be-cruelty.php">Read the personal essay</a>
  </section>

  <section class="index-section">
    <h2>A conversation readers can examine.</h2>
    <p class="section-text">
      A personal interpretation offers a position to consider. A philosophical
      argument gives reasons to accept, challenge, or revise a position.
      Scientific observations can inform both. Each contribution identifies
      which kind of work it is doing, so that readers can judge it on its own
      terms and bring different perspectives to the question.
    </p>
    <div class="hero-actions">
      <a class="button button--secondary" href="/research.php">All findings and ideas</a>
      <a class="button button--secondary" href="/about_cori.php">About CoRI</a>
    </div>
  </section>
</main>

<?php include __DIR__ . '/includes/site_footer.php'; ?>
</body>
</html>
