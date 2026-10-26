<?php
$page_title = 'What can memory change? — CoRI findings';
$page_description = "A public explanation of CoRI's controlled memory experiment: what was observed, why it matters within the model, and what remains unknown.";
$page_css = ['/assets/index.css'];
include dirname(__DIR__) . '/includes/head.php';
include dirname(__DIR__) . '/includes/site_header.php';
?>

<main class="site-shell">
  <article>
    <section class="hero">
      <p class="eyebrow">CoRI research finding · Computer simulation · 26 October 2026</p>
      <h1>What can memory change?</h1>
      <p class="hero-text">
        In a controlled computer experiment, two simulated systems began with
        the same conditions. When retained history influenced subsequent choices
        in one system, their paths separated. Turning that influence off restored
        identical paths.
      </p>
      <p class="hero-text">
        The finding shows that the experimental memory rule in this model changes
        what the system does next. It does more than preserve a picture of where
        the system has been.
      </p>
    </section>

    <section class="index-section">
      <h2>What we observed</h2>
      <p class="section-text">
        Imagine two travelers following the same network of possible routes.
        They start together and receive the same sequence of random numbers for
        choosing their next steps. Both record the route already traveled.
        For one traveler, that record also changes the odds of the next choice.
      </p>
      <p class="section-text">
        In the tested run, the two paths first differed at the third step.
        Across 120 steps, their positions differed after 118 of them. The
        baseline visited 92 distinct states; the version influenced by its
        history visited five. When the influence of history was set to zero,
        both paths matched throughout all 120 steps.
      </p>
      <p class="section-text">
        These counts describe one specified configuration. They do not show
        that every setting will produce the same pattern.
      </p>
    </section>

    <section class="index-section">
      <h2>Why the distinction matters</h2>
      <p class="section-text">
        When someone says a system has memory, two different things may be
        meant: it keeps a record, or that record affects its next action.
        This experiment makes the distinction visible and testable in a small
        model. Storing a history and using it to choose are different behaviors.
      </p>
      <p class="section-text">
        For people thinking about intelligent systems, it suggests a useful
        question to ask: what information from the past is retained, and how
        does it influence future choices? That question is a public implication
        of the comparison, rather than a finding about any particular AI product.
      </p>
    </section>

    <section class="index-section">
      <h2>What remains uncertain</h2>
      <p class="section-text">
        The influence of memory was deliberately built into an adjustable
        experimental rule. The result confirms that the implemented rule has
        the measured effect in this run. It does not establish a new law of
        nature, a physical gravitational effect, or a theory of human memory.
      </p>
      <p class="section-text">
        Further comparisons can investigate how often concentration or
        divergence occurs across starting conditions, memory strengths, and
        retention settings. Such a survey has not been established by this
        single demonstration.
      </p>
    </section>

    <section class="index-section">
      <h2>Where this finding comes from</h2>
      <p class="section-text">
        The comparison was run in CoRI's Living Geometry simulator on
        26 October 2026. It is part of the Thalean research program. The
        underlying mathematical motion and the adjustable memory experiment
        are separately identified in the instrument.
      </p>
      <details>
        <summary>Methods and reproduction details</summary>
        <p class="section-text">
          Open Memory Laboratory, enable memory coupling in B, and restart.
          Run 120 encounters with seed 41, initial
          quotient state 1 (index 0), memory strength 2, retention 0.96, feedback
          gain 1, and history depth 256. The two runs use the same starting state
          and random samples. The baseline ignores history when selecting its
          next state; the comparison uses a history-dependent probability rule
          over the same allowed neighbors. Set strength to zero and rerun to
          reproduce the identical-path control. The linked implementation
          report records the development release and its verification status.
        </p>
        <div class="hero-actions">
          <a class="button button--secondary" href="https://dev.rook.ca/aletheos/living.html#memory">Run the development experiment</a>
          <a class="button button--secondary" href="https://github.com/rookinc/aletheos-ai/blob/0509cc6b1b62a75bbf7e149be2235ae87ead659f/native-terrain/deployment/served-browser-receipt-20261026.json">Recorded observations</a>
          <a class="button button--secondary" href="https://github.com/rookinc/aletheos-ai/blob/0509cc6b1b62a75bbf7e149be2235ae87ead659f/native-terrain/LIVING-REPORT.md">Implementation and limits</a>
        </div>
      </details>
      <div class="hero-actions">
        <a class="button button--primary" href="/research.php">More findings and questions</a>
      </div>
    </section>
  </article>
</main>

<?php include dirname(__DIR__) . '/includes/site_footer.php'; ?>
</body>
</html>
