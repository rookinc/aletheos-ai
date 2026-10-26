<?php
$page_title = 'Mission - Aletheos.ai';
$page_description = 'CoRI brings findings in AI stewardship, philosophy, and science into public discussion, explaining their significance, consequences, and uncertainties.';
$page_css = ['/assets/index.css'];

include __DIR__ . '/includes/head.php';
include __DIR__ . '/includes/site_header.php';
?>

<main class="site-shell">
  <section class="hero">
    <p class="eyebrow">Our mission</p>
    <h1>Deepen understanding. Steward what follows.</h1>
    <p class="hero-text">
      The Center of Recursive Inquiry, a Rook Services Inc. initiative, advances
      AI stewardship, philosophical inquiry, and scientific research across
      disciplines. We bring what we learn into public discussion so that
      people have clearer grounds for understanding the world and making
      judgments about changes that affect them.
    </p>
    <p class="hero-text">
      Our primary audience is the concerned public. Aletheos.ai explains
      findings, considers why they matter, and identifies what remains
      uncertain. A reader should be able to engage with the result without
      first learning the techniques used to reach it.
    </p>
  </section>

  <section class="index-section">
    <p class="eyebrow">What we pursue</p>
    <h2>Knowledge, judgment, and responsible participation.</h2>
    <div class="principle-grid">
      <article class="principle-card">
        <h3>Steward AI</h3>
        <p>
          Examine how intelligent systems affect human agency, relationships,
          and institutions. Develop understanding that helps people participate
          in decisions about the technologies shaping their lives.
        </p>
        <a href="/research.php#ai-stewardship">AI stewardship</a>
      </article>
      <article class="principle-card">
        <h3>Practice philosophy</h3>
        <p>
          Ask what we know, how we know it, what we value, and how we should
          live. Make room for sustained argument, interpretation, and reflection
          on human experience.
        </p>
        <a href="/research.php#philosophy">Philosophical inquiry</a>
      </article>
      <article class="principle-card">
        <h3>Investigate the world</h3>
        <p>
          Pursue scientific questions across disciplines and explain what
          their findings reveal. Consider how new understanding changes our
          picture of the world and where further evidence is still needed.
        </p>
        <a href="/research.php#scientific-research">Scientific research</a>
      </article>
    </div>
  </section>

  <section class="index-section">
    <p class="eyebrow">Our responsibility to readers</p>
    <h2>Explain the finding and its significance.</h2>
    <p class="section-text">
      A public explanation should answer three questions: what did we learn,
      why might it matter, and what remains unsettled? We distinguish
      demonstrated results, philosophical interpretations, and questions still
      being investigated. We give consequences and limitations the context
      readers need to judge them.
    </p>
    <p class="section-text">
      The supporting papers, evidence, and methods are available for deeper
      scrutiny. Researchers and others who want to use our tools can follow
      that work further. Findings and their meaning lead the public story.
    </p>
  </section>

  <section class="index-section">
    <p class="eyebrow">An invitation</p>
    <h2>Err. Doubt. Endure. Discover.</h2>
    <p class="section-text">
      Read a finding, consider an argument, and ask what it means for the world
      you inhabit. CoRI welcomes careful criticism and different perspectives.
      Questions from the public help us recognize which consequences need
      closer attention and which explanations need to become clearer.
    </p>
    <div class="hero-actions">
      <a class="button button--primary" href="/research.php">Read findings and questions</a>
      <a class="button button--secondary" href="/about_cori.php">About CoRI</a>
    </div>
  </section>
</main>

<?php include __DIR__ . '/includes/site_footer.php'; ?>
</body>
</html>
