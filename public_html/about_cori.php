<?php
$page_title = 'About CoRI - Aletheos.ai';
$page_description = 'CoRI shares findings and explanations in AI stewardship, philosophy, and science with people concerned about the world and their place in it.';
$page_css = ['/assets/index.css'];

include __DIR__ . '/includes/head.php';
include __DIR__ . '/includes/site_header.php';
?>

<main class="site-shell">
  <section class="hero">
    <p class="eyebrow">About CoRI</p>
    <h1>Err. Doubt. Endure. Discover.</h1>
    <p class="hero-text">
      The Center of Recursive Inquiry is a Rook Services Inc. initiative
      pursuing AI stewardship, philosophy, and scientific research across
      disciplines.
    </p>
    <p class="hero-text">
      We share what we learn with people concerned about the world and their
      place in it. Our public work explains findings, considers their
      consequences, and makes room for questions about what they mean for
      people's lives.
    </p>
  </section>

  <section class="index-section">
    <p class="eyebrow">Our scope</p>
    <h2>Questions that reach into everyday life.</h2>
    <div class="card-grid">
      <article class="index-card">
        <h3>AI stewardship</h3>
        <p>
          What happens to people's choices, knowledge, and relationships as AI
          becomes part of daily life? We examine its consequences and the
          responsibilities involved in developing, using, and governing it.
        </p>
        <a class="button button--secondary" href="/research.php#ai-stewardship">Explore AI stewardship</a>
      </article>
      <article class="index-card">
        <h3>Philosophy</h3>
        <p>
          What do we know, what do we value, and how should we live? We explore
          meaning, ethics, relation, and human experience through arguments and
          interpretations that readers can consider for themselves.
        </p>
        <a class="button button--secondary" href="/research.php#philosophy">Explore philosophy</a>
      </article>
      <article class="index-card">
        <h3>Scientific research</h3>
        <p>
          What can research tell us about the world, and how far does a finding
          reach? We pursue questions across scientific disciplines and explain
          the results, their significance, and what remains uncertain.
        </p>
        <a class="button button--secondary" href="/research.php#scientific-research">Explore scientific research</a>
      </article>
    </div>
  </section>

  <section class="index-section">
    <p class="eyebrow">A current finding</p>
    <h2>Can a system's history change what it does next?</h2>
    <p class="section-text">
      In a controlled comparison, a specified memory rule changed the later
      paths of a finite model. The result helps distinguish retaining a record
      from allowing that record to influence subsequent choices.
    </p>
    <p class="section-text">
      The finding concerns that model. Its implications for actual AI systems
      or the natural world require separate evidence. This is one result from
      the Thalean program within CoRI's wider research scope.
    </p>
    <div class="hero-actions">
      <a class="button button--primary" href="/research/memory-and-possibility.php">Read what the comparison shows</a>
    </div>
  </section>

  <section class="index-section">
    <p class="eyebrow">Aletheos.ai</p>
    <h2>CoRI's public research home.</h2>
    <p class="section-text">
      Aletheos presents findings and explanations for the concerned public.
      Each contribution should help readers understand what we learned, why
      it may matter, and where the limits lie. Philosophical interpretations
      and scientific findings are identified in their own terms.
    </p>
    <p class="section-text">
      Papers, evidence, methods, and tools remain available for readers who
      want to investigate further or use the underlying work in their own
      research.
    </p>
    <p class="section-text">
      CoRI discovers, tests, and publishes. Rook Services Inc. engineers,
      implements, and commercializes technology. Rook's products, services,
      and commercial evaluations are presented at
      <a href="https://rook.ca/">rook.ca</a>.
    </p>
    <div class="hero-actions">
      <a class="button button--secondary" href="/mission.php">Read our mission</a>
      <a class="button button--secondary" href="/research.php">Read findings and questions</a>
    </div>
  </section>
</main>

<?php include __DIR__ . '/includes/site_footer.php'; ?>
</body>
</html>
