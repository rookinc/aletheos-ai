<?php
$page_title = "From Circle to Thalion";
$page_description = "Boundary, body, and the birth of relational transport.";
$body_class = "research-page from-circle-to-thalion-page";
require_once __DIR__ . "/../includes/head.php";
require_once __DIR__ . "/../includes/site_header.php";

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
    "title" => "13. What this page is not claiming",
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
    "title" => "14. Closing and next steps",
    "body" => [
      "We began with a circle because a circle is the simplest boundary we know. But once a boundary creates inside and outside, it can begin to hold a body.",
      "Once the body regulates relation, it becomes a membrane. Once the membrane admits relation lawfully, it has ports. Once ports translate outside into inside, they become hinges. Once the local articulations close as one, the body becomes a closure cell.",
      "A thalion is this entire movement made accountable: a relational body whose boundary, ports, hinges, witness center, and closure participate in finite transport."
    ],
    "links" => true,
    "svg" => "14-progression.svg",
    "caption" => "From circle to thalion: a boundary becomes a body, a body becomes a transport cell, and the transport cell becomes accountable in a finite graph."
  ],
];
?>

<style>
.fct-page {
  max-width: 1120px;
  margin: 0 auto;
  padding: 3rem 1.25rem 5rem;
}

.fct-hero {
  padding: 3rem 0 2rem;
  border-bottom: 1px solid rgba(120, 120, 120, 0.25);
}

.fct-kicker {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.78rem;
  opacity: 0.72;
  margin-bottom: 0.8rem;
}

.fct-hero h1 {
  font-size: clamp(2.4rem, 7vw, 5.5rem);
  line-height: 0.95;
  margin: 0 0 1rem;
}

.fct-subtitle {
  font-size: clamp(1.05rem, 2.5vw, 1.4rem);
  max-width: 760px;
  opacity: 0.86;
}

.fct-section {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(280px, 0.92fr);
  gap: 2rem;
  align-items: center;
  padding: 3rem 0;
  border-bottom: 1px solid rgba(120, 120, 120, 0.18);
  scroll-margin-top: 2rem;
}

.fct-section:nth-child(even) {
  direction: rtl;
}

.fct-section:nth-child(even) > * {
  direction: ltr;
}

.fct-section h2 {
  font-size: clamp(1.55rem, 4vw, 2.55rem);
  line-height: 1.08;
  margin: 0 0 1rem;
}

.fct-section p {
  font-size: clamp(1rem, 2.4vw, 1.12rem);
  line-height: 1.62;
  margin: 0 0 1rem;
}

.fct-callout {
  margin-top: 1.35rem;
  padding: 1rem 1.1rem;
  border-left: 4px solid currentColor;
  background: rgba(120, 120, 120, 0.08);
  border-radius: 0.6rem;
}

.fct-callout strong {
  display: block;
  margin-bottom: 0.35rem;
}

.fct-diagram-card {
  background: radial-gradient(circle at 50% 42%, rgba(255,255,255,0.09), rgba(120,120,120,0.06));
  border: 1px solid rgba(120, 120, 120, 0.24);
  border-radius: 1.4rem;
  padding: 1.25rem;
  min-height: 330px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.fct-svg {
  display: block;
  width: min(100%, 420px);
  height: auto;
  margin: 0 auto;
}

.fct-caption {
  font-size: clamp(0.86rem, 2.2vw, 0.98rem);
  line-height: 1.42;
  opacity: 0.75;
  margin-top: 1rem;
  text-align: center;
}

.fct-footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.fct-footer-links a {
  display: inline-block;
  padding: 0.7rem 1rem;
  border: 1px solid rgba(120, 120, 120, 0.28);
  border-radius: 999px;
  text-decoration: none;
}

.fct-footer-links a:hover {
  text-decoration: underline;
}

@media (max-width: 820px) {
  .fct-page {
    padding: 1.5rem 1rem 3.5rem;
  }

  .fct-hero {
    padding: 2rem 0 1.5rem;
  }

  .fct-hero h1 {
    font-size: clamp(2.35rem, 12vw, 3.6rem);
  }

  .fct-subtitle {
    font-size: 1.05rem;
  }

  .fct-section,
  .fct-section:nth-child(even) {
    display: block;
    direction: ltr;
    padding: 2.25rem 0;
  }

  .fct-section h2 {
    font-size: clamp(1.55rem, 7vw, 2.25rem);
  }

  .fct-section p {
    font-size: 0.98rem;
    line-height: 1.56;
  }

  .fct-callout {
    padding: 0.9rem 1rem;
    font-size: 0.94rem;
  }

  .fct-diagram-card {
    margin-top: 1.35rem;
    min-height: 235px;
    padding: 1rem;
    border-radius: 1.1rem;
  }

  .fct-svg {
    width: min(100%, 330px);
  }

  .fct-caption {
    font-size: 0.88rem;
  }

  .fct-footer-links a {
    font-size: 0.95rem;
    padding: 0.65rem 0.85rem;
  }
}
</style>

<main class="fct-page">
  <header class="fct-hero">
    <div class="fct-kicker">Introductory tutorial</div>
    <h1>From Circle to Thalion</h1>
    <p class="fct-subtitle">Boundary, body, and the birth of relational transport.</p>
    <div class="fct-callout">
      <strong>Core idea</strong>
      A circle gives us a boundary; a thalion is what happens when boundary becomes body, body becomes transport, and transport closes as accountable form.
    </div>
  </header>

  <?php foreach ($sections as $section): ?>
    <section class="fct-section">
      <div>
        <h2><?php echo htmlspecialchars($section["title"]); ?></h2>
        <?php foreach ($section["body"] as $paragraph): ?>
          <p><?php echo htmlspecialchars($paragraph); ?></p>
        <?php endforeach; ?>

        <?php if (isset($section["callout"])): ?>
          <div class="fct-callout">
            <strong><?php echo htmlspecialchars($section["callout_title"]); ?></strong>
            <?php echo htmlspecialchars($section["callout"]); ?>
          </div>
        <?php endif; ?>

        <?php if (!empty($section["links"])): ?>
          <div class="fct-footer-links">
            <a href="/the_thalean_graph_at4val_60_6.php">Meet the formal graph</a>
            <a href="/research/thalean-mathematical-spaces.php">Thalean mathematical spaces</a>
            <a href="/labs/constructor/lab.html">Open the constructor lab</a>
          </div>
        <?php endif; ?>
      </div>

      <figure class="fct-diagram-card">
        <img class="fct-svg" src="/assets/from-circle-to-thalion/<?php echo htmlspecialchars($section["svg"]); ?>" alt="">
        <figcaption class="fct-caption"><?php echo htmlspecialchars($section["caption"]); ?></figcaption>
      </figure>
    </section>
  <?php endforeach; ?>
</main>

<?php require_once __DIR__ . "/../includes/site_footer.php"; ?>
