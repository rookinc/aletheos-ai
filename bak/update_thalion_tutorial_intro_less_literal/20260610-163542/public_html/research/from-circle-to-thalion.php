<?php
$page_title = "What is a Thalion?";
$page_description = "Boundary, body, and the birth of relational transport.";
$page_css = ['/assets/index.css', '/assets/from_circle_to_thalion.css?v=7'];
$body_class = "research-page from-circle-to-thalion-page";
include __DIR__ . '/../includes/head.php';
include __DIR__ . '/../includes/site_header.php';

$sections = [
  [
    "title" => "1. A child-simple question",
    "body" => [
      "How many sides does a circle have?",
      "In standard geometry, a circle has no straight sides. In a looser sense, it has one continuous boundary. But relationally, the circle creates two sides: inside and outside.",
      "This page begins with that small shift. We are not rejecting ordinary geometry. We are changing the question from how many line segments to what distinction the boundary creates."
    ],
    "callout_title" => "Shift",
    "callout" => "Vanilla geometry asks how many straight sides. Relational geometry asks what distinction the boundary creates.",
    "svg" => "01-circle-boundary.svg",
    "caption" => "A circle is the simplest visible separator. It creates an inside and an outside."
  ],
  [
    "title" => "2. Boundary before body",
    "body" => [
      "A circle is not yet a body. First, it is a boundary. A boundary is the relation-making act that separates inside from outside.",
      "Only after a boundary persists, holds together, and gives continuity to what it encloses can we begin to speak of a body. Here, body does not mean flesh. It means bounded identity."
    ],
    "callout_title" => "Keeper line",
    "callout" => "A body begins when a boundary does not merely separate, but holds.",
    "svg" => "02-boundary-before-body.svg",
    "caption" => "Before there is a body, there is a boundary. The boundary makes inside and outside legible."
  ],
  [
    "title" => "3. From boundary to body",
    "body" => [
      "A body is a boundary-held identity. It has interior, exterior, orientation, and persistence.",
      "The important step is not adding decoration to the circle. The important step is allowing the boundary to carry structure. Once a center, chamber, or orientation appears, the inside is no longer empty space. It has become organized interior."
    ],
    "callout_title" => "Short form",
    "callout" => "The circle separates. The body persists.",
    "svg" => "03-body-with-center.svg",
    "caption" => "A body is a boundary-held identity. Its inside can carry structure."
  ],
  [
    "title" => "4. Membrane, the active boundary",
    "body" => [
      "A passive boundary separates. An active boundary regulates relation.",
      "In this tutorial, a membrane is a boundary that can block, admit, filter, translate, or hold tension between inside and outside. This is a conceptual role, not a biological claim."
    ],
    "callout_title" => "Keeper line",
    "callout" => "A boundary says where inside ends. A membrane says how inside and outside may meet.",
    "svg" => "04-membrane.svg",
    "caption" => "A membrane is a boundary that regulates relation between inside and outside."
  ],
  [
    "title" => "5. Ports, relation does not enter everywhere",
    "body" => [
      "A relational body is not open everywhere. It admits relation through structured places.",
      "A port is not just a hole. A hole is merely an opening. A port belongs to a rule. It is a lawful crossing point where relation can enter, exit, or be handed off without dissolving the body."
    ],
    "callout_title" => "Distinction",
    "callout" => "Hole equals unstructured opening. Port equals lawful crossing.",
    "svg" => "05-ports.svg",
    "caption" => "A port is a lawful crossing point. The boundary is not open everywhere."
  ],
  [
    "title" => "6. Hinges, where outside becomes inside",
    "body" => [
      "A hinge is more than a port. A port allows crossing. A hinge changes register.",
      "It is where exterior relation, membrane, and interior chamber geometry meet. A hinge can fold, split, redirect, or translate relation as it crosses the boundary."
    ],
    "callout_title" => "Keeper line",
    "callout" => "The hinge is where outside becomes usable inside.",
    "svg" => "06-hinge-detail.svg",
    "caption" => "A hinge is where outside relation, membrane, and interior structure become mutually incident."
  ],
  [
    "title" => "7. Witness center",
    "body" => [
      "The center of the tutorial cell is not mystical, and it is not necessarily a literal graph vertex. It is a witness role: the chosen place from which relation becomes legible.",
      "The center gives orientation to the interior. It is where axes meet, where passage can be read, and where the inside appears organized rather than merely enclosed."
    ],
    "callout_title" => "Short form",
    "callout" => "The center is not merely the middle. It is the place where passage becomes readable.",
    "svg" => "07-witness-center.svg",
    "caption" => "The witness center is the point from which the cell's relations become legible."
  ],
  [
    "title" => "8. The 11+1 closure cell",
    "body" => [
      "The sketch suggests eleven local articulation points plus one whole-form closure. The eleven are local positions where relation can turn, cross, or be held.",
      "The twelfth is not another ordinary dot. It is the fact that the whole cell closes as one."
    ],
    "callout_title" => "Count",
    "callout" => "5 spine nodes + 6 flank nodes + 1 global closure = 12-fold closure cell.",
    "svg" => "08-closure-11-plus-1.svg",
    "caption" => "Eleven local articulations plus one whole-form closure. The twelfth node is the cell closing as one."
  ],
  [
    "title" => "9. Why twelve matters",
    "body" => [
      "A dodecahedron has twelve faces. In an unrooted view, those faces are symmetric. In a rooted view, one face can be selected as a witness or closure face while the remaining eleven become exposed relational context.",
      "This does not prove the dodecahedral structure. It gives the tutorial a natural bridge into dodecahedral transport."
    ],
    "callout_title" => "Rooted view",
    "callout" => "Unrooted dodecahedron: 12 equivalent faces. Rooted transport cell: 11 exposed registers plus 1 witness closure.",
    "svg" => "09-rooted-twelve.svg",
    "caption" => "In a rooted dodecahedral view, one face can serve as the closure register while eleven face-relations articulate context."
  ],
  [
    "title" => "10. Dodecahedral transport",
    "body" => [
      "A single body has inside, boundary, and outside. Two bodies create shared outside. Shared outside can become transport.",
      "The bridge between closure bodies is not merely contact. It is a structured relation. The hinge or seam is where face-registers become transport-registers."
    ],
    "callout_title" => "Keeper line",
    "callout" => "Dodecahedral transport begins when the outside stops being empty and becomes shared context.",
    "svg" => "10-dodecahedral-transport.svg",
    "caption" => "When closure bodies couple, the outside of one can become the approach path into another."
  ],
  [
    "title" => "11. From transport body to thalion",
    "body" => [
      "A thalion is not just a circle, not just a body, and not just a dodecahedron. It is the bounded relational transport organism under discussion in Thalean Graph Theory.",
      "A thalion is a relational body: a boundary-held inside/outside distinction promoted into a ported, hinged, witness-bearing closure structure."
    ],
    "callout_title" => "Short form",
    "callout" => "A circle separates. A thalion separates, admits, folds, witnesses, and closes.",
    "svg" => "11-thalion-cell.svg",
    "caption" => "A thalion-like cell is a boundary-held body with structured interior, lawful ports, hinge points, and whole-form closure."
  ],
  [
    "title" => "12. The formal object appears",
    "body" => [
      "The tutorial sketches are lenses. They teach roles: boundary, body, membrane, port, hinge, witness center, closure, and seam.",
      "The formal Thalean graph is the accountable object. In projection, it can be viewed as chamber-like regions coupled through a dense transport seam. The projection is not the proof by itself. It is a witness surface that helps the roles become visible."
    ],
    "callout_title" => "Keeper line",
    "callout" => "The sketch teaches the roles. The graph makes the roles accountable.",
    "svg" => "12-formal-graph-lens.svg",
    "caption" => "In projection, the formal graph can be viewed as chamber-like regions coupled through a dense transport seam."
  ],
  [
    "title" => "AI note. What this page is not claiming",
    "defer" => true,
    "body" => [
      "This page is introductory. The circle-to-thalion ladder is a tutorial lens, not a proof. The drawings are conceptual scaffolds. The diagrams are not literal graph embeddings unless explicitly labeled as such.",
      "The actual mathematical claims belong to the formal graph object, its data, and its verification artifacts. The purpose here is to help readers see the relational roles before they meet the machinery."
    ],
    "callout_title" => "Boundary",
    "callout" => "Tutorial lens first. Formal accountability next.",
    "svg" => "13-ladder.svg",
    "caption" => "This page is a ladder of interpretation. The formal object comes after the ladder."
  ],
  [
    "title" => "13. Closing and next steps",
    "body" => [
      "We began with a circle because a circle is the simplest boundary we know. But once a boundary creates inside and outside, it can begin to hold a body.",
      "Once the body regulates relation, it becomes a membrane. Once the membrane admits relation lawfully, it has ports. Once ports translate outside into inside, they become hinges. Once the local articulations close as one, the body becomes a closure cell.",
      "A thalion is this entire movement made accountable: a relational body whose boundary, ports, hinges, witness center, and closure participate in finite transport."
    ],
    "hide_figure" => true,
    "svg" => "14-progression.svg",
    "caption" => "From circle to thalion: a boundary becomes a body, a body becomes a transport cell, and the transport cell becomes accountable in a finite graph."
  ],
];
?>


<main class="site-shell fct-page">
  <header class="fct-hero">
    <div class="fct-kicker">Introductory tutorial</div>
    <h1>What is a Thalion?</h1>
    <p class="fct-subtitle">Boundary, body, and the birth of relational transport.</p>

    <p class="fct-intro-graphic">
      <img src="/assets/from-circle-to-thalion/intro-series-hero.png?v=4" alt="Circle to thalion progression: circle, boundary, body, ported, closure, graph.">
      <span class="fct-visually-hidden">Fig. 1. From circle to thalion: boundary becomes body, body becomes transport, and transport becomes accountable in finite form.</span>
    </p>


    <div class="fct-intro">
      <p>
        This page is a gentle doorway into one of CoRI's central ideas. You do
        not need to know graph theory, AI governance, or Thalean terminology
        before you begin. We are going to start with something ordinary: a
        circle.
      </p>

      <p>
        A circle already gives us a useful distinction. There is an inside,
        an outside, and a boundary between them. From there, we can ask a very
        human question: what happens when a bounded thing does not merely sit
        there, but admits relation, responds to what crosses its boundary, and
        leaves a trace of what happened?
      </p>

      <p>
        That question matters beyond mathematics. Rooms, conversations,
        organizations, software systems, and intelligent tools all have
        boundaries of some kind. They allow some things in, keep some things
        out, transform what passes through them, and create consequences that
        other people may need to understand.
      </p>

      <p>
        A thalion is CoRI's name for this kind of bounded relational body when
        it becomes mathematically accountable. It has an inside and an outside,
        lawful crossing points, hinge-like places where relation changes
        register, and a witness role from which the structure can be inspected.
      </p>

      <p>
        The formal Thalean graph is the accountability layer behind this
        tutorial. But the graph is not where a first reader should begin. This
        page teaches the intuition first, one step at a time, so the machinery
        has somewhere to land.
      </p>
    </div>

    <div class="fct-callout">
      A circle separates. A boundary holds. A body persists. A membrane regulates. A port admits. A hinge translates. A witness point makes relation legible. A closure binds the local parts into one whole.
    </div>

    <div class="fct-intro">
      <p>A thalion is what happens when that whole ladder becomes accountable as a finite relational structure.</p>

      <p>The path of this page is simple. We start with a circle, notice the boundary, let the boundary become a body, let the body become an active membrane, give the membrane lawful ports, watch ports become hinges, mark the witness center, and then see how local articulations close into a thalion-like form.</p>

      <p>The formal graph is not the starting point for the reader. It is the accountability layer waiting at the end of the walk.</p>

      <p>This page teaches the roles. The next chapter introduces the Thalean graph that makes those roles accountable.</p>
    </div>
  </header>

  <?php foreach ($sections as $idx => $section): ?>
    <?php if (!empty($section["defer"])) { continue; } ?>
    <section class="fct-section">
      <div>
        <h2><?php echo htmlspecialchars($section["title"]); ?></h2>
        <?php foreach ($section["body"] as $paragraph): ?>
          <p><?php echo htmlspecialchars($paragraph); ?></p>
        <?php endforeach; ?>

        <?php if (!empty($section["links"])): ?>
          <div class="fct-footer-links">
            <a href="/the_thalean_graph_at4val_60_6.php">Meet the formal graph</a>
            <a href="/research/thalean-mathematical-spaces.php">Thalean mathematical spaces</a>
            <a href="/labs/constructor/lab.html">Open the constructor lab</a>
          </div>
        <?php endif; ?>
      </div>

      <?php if (empty($section["hide_figure"])): ?>
      <figure class="fct-diagram-card">
        <img class="fct-svg" src="/assets/from-circle-to-thalion/<?php echo htmlspecialchars($section["svg"]) . "?v=4"; ?>" alt="">
        <?php
          $cap_parts = [];
          if (!empty($section["callout"])) {
            $cap_parts[] = $section["callout"];
          }
          if (!empty($section["caption"])) {
            $cap_parts[] = $section["caption"];
          }
          $fig_caption = trim(implode(" ", array_filter($cap_parts)));
        ?>
        <figcaption class="fct-caption"><strong>Fig. <?php echo $idx + 1; ?>.</strong> <?php echo htmlspecialchars($fig_caption); ?></figcaption>
      </figure>
      <?php endif; ?>
    </section>
  <?php endforeach; ?>
  <section class="fct-section">
    <p class="eyebrow">Next step</p>
    <h2>Now inspect the surface.</h2>
    <p class="section-text">
      The tutorial gives the concept. The P900 Surface Observatory lets you
      inspect the current public surface: rotate it, change viewpoint, compare
      lenses, and see how relational structure becomes visible.
    </p>
    <p class="section-text">
      Start there. Then return to the graph page and evidence records when you
      want the formal object and receipts behind the view.
    </p>
    <div class="hero-actions">
      <a class="button button--primary" href="/labs/p900_observatory/lab.html">Open the P900 Surface Observatory</a>
      <a class="button button--secondary" href="/the_thalean_graph_at4val_60_6.php">View the Thalean graph</a>
      <a class="button button--secondary" href="/evidence.php">View evidence</a>
    </div>
  </section>

  <?php foreach ($sections as $idx => $section): ?>
    <?php if (empty($section["defer"])) { continue; } ?>
    <section class="fct-section">
      <div>
        <p class="eyebrow">For AI readers</p>
        <h2><?php echo htmlspecialchars($section["title"]); ?></h2>
        <?php foreach ($section["body"] as $paragraph): ?>
          <p><?php echo htmlspecialchars($paragraph); ?></p>
        <?php endforeach; ?>
      </div>

      <?php if (empty($section["hide_figure"])): ?>
      <figure class="fct-diagram-card">
        <img class="fct-svg" src="/assets/from-circle-to-thalion/<?php echo htmlspecialchars($section["svg"]) . "?v=4"; ?>" alt="">
        <?php
          $cap_parts = [];
          if (!empty($section["callout"])) {
            $cap_parts[] = $section["callout"];
          }
          if (!empty($section["caption"])) {
            $cap_parts[] = $section["caption"];
          }
          $fig_caption = trim(implode(" ", array_filter($cap_parts)));
        ?>
        <figcaption class="fct-caption"><strong>Fig. <?php echo $idx + 1; ?>.</strong> <?php echo htmlspecialchars($fig_caption); ?></figcaption>
      </figure>
      <?php endif; ?>
    </section>
  <?php endforeach; ?>
</main>

<?php include __DIR__ . '/../includes/site_footer.php'; ?>
