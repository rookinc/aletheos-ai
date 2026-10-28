<?php
$page_title="Aletheos.ai";
?><!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Aletheos.ai</title>
<style>
body{
    margin:0;
    font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
    background:#0b0c10;
    color:#ececec;
    line-height:1.65;
}
main{
    max-width:900px;
    margin:0 auto;
    padding:5rem 2rem;
}
h1{
    font-size:3rem;
    margin-bottom:.25rem;
}
h2{
    margin-top:3rem;
}
.tag{
    color:#8ab4ff;
    text-transform:uppercase;
    letter-spacing:.12em;
    font-size:.85rem;
}
.lead{
    font-size:1.3rem;
    color:#d9d9d9;
}
blockquote{
    border-left:4px solid #4f8cff;
    padding-left:1rem;
    color:#bfc8d6;
    margin:2rem 0;
}
.grid{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
    gap:1rem;
    margin-top:2rem;
}
.card{
    border:1px solid #2d2f36;
    border-radius:10px;
    padding:1rem;
}
.card a{
    color:white;
    text-decoration:none;
}
footer{
    margin-top:4rem;
    color:#888;
    font-size:.9rem;
}

/* Thalean featured observatory */
.thalean-exhibit{margin-top:3rem;border:1px solid #31475b;border-radius:14px;overflow:hidden;background:linear-gradient(145deg,#101e30,#0b1019)}
.thalean-exhibit__body{padding:1.5rem}
.thalean-exhibit__eyebrow{font-size:.7rem;letter-spacing:.13em;text-transform:uppercase;color:#86d4e6;font-weight:700}
.thalean-exhibit h2{margin:.6rem 0 .1rem;font-size:clamp(1.4rem,4vw,2rem);line-height:1.25}
.thalean-exhibit__subtitle{margin:.1rem 0 1rem;color:#a5c5d9}
.thalean-exhibit__preview{display:block;position:relative;overflow:hidden;aspect-ratio:16/8;border-top:1px solid #2d4053;border-bottom:1px solid #2d4053;background:radial-gradient(ellipse at 50% 55%,#235b79 0%,#102c45 24%,#0b1829 54%,#08101d 85%)}
.thalean-exhibit__preview::before,.thalean-exhibit__preview::after{content:"";position:absolute;left:50%;top:50%;width:38%;height:75%;border:2px solid #60d5e8;border-radius:50%;transform:translate(-50%,-50%) rotate(-42deg);box-shadow:0 0 28px #39b7d550}
.thalean-exhibit__preview::after{border-color:#d1a4e8;transform:translate(-50%,-50%) rotate(48deg);width:57%;height:50%;box-shadow:0 0 26px #d1a4e83b}
.thalean-exhibit__core{position:absolute;left:50%;top:50%;width:18px;height:18px;border-radius:50%;transform:translate(-50%,-50%);background:#fff2a0;box-shadow:0 0 35px 16px #ffe18b88;z-index:1}
.thalean-exhibit__cta{display:inline-block;padding:.65rem 1rem;border-radius:8px;background:#a6e8f2;color:#061521;text-decoration:none;font-weight:700;font-size:.9rem}
.thalean-exhibit__note{color:#9baebe;font-size:.8rem;margin-bottom:0}
@media(max-width:600px){.thalean-exhibit__body{padding:1rem}.thalean-exhibit__preview{aspect-ratio:16/10}}
</style>
</head>
<body>

<main>

<div class="tag">
Institutional Release 1
</div>

<h1>Aletheos</h1>

<p class="lead">
The public research surface of the Centre of Recursive Inquiry.
</p>

<blockquote>
Building accountable intelligence.
</blockquote>

<p>
The Centre of Recursive Inquiry (CoRI) is a public research institution devoted
to building accountable knowledge, trustworthy systems, and durable institutions
for the age of intelligent systems.
</p>

<p>
We believe intelligence should become more accountable as it becomes more capable.
Knowledge should remain public.
Execution may remain commercial.
Truth should become stronger through inspection.
</p>

<p>
This site marks the first institutional release of CoRI.
Everything presented here is organized around the lifecycle of knowledge:
research, protocols, authority, software, observatories, and publications.
</p>

<h2>The Institution</h2>

<div class="grid">

<div class="card"><strong>Manifesto</strong><br>Institutional purpose.</div>

<div class="card"><strong>Research</strong><br>Discovery and investigation.</div>

<div class="card"><strong>Protocols</strong><br>Public specifications.</div>

<div class="card"><strong>Authority</strong><br>Trust infrastructure.</div>

<div class="card"><strong>SDK</strong><br>Developer adoption.</div>

<div class="card"><strong>Observatories</strong><br>Inspectable systems.</div>

<div class="card"><strong>Publications</strong><br>Permanent public record.</div>

</div>


<!-- THALEAN-EXHIBIT-001 -->
<section class="thalean-exhibit" aria-labelledby="thalean-exhibit-title">
  <div class="thalean-exhibit__body">
    <div class="thalean-exhibit__eyebrow">Featured observatory · Interactive research</div>
    <h2 id="thalean-exhibit-title">The Graviton on HOG 52002</h2>
    <p class="thalean-exhibit__subtitle">The Thalaen Graph</p>
  </div>
  <a class="thalean-exhibit__preview" href="/observatories/thalean-graph/" aria-label="Explore The Thalaen Graph simulator"><span class="thalean-exhibit__core" aria-hidden="true"></span></a>
  <div class="thalean-exhibit__body">
    <p>Explore finite graph structures through an interactive field viewer. Rotate the model, switch between plasma and flowing-sheet views, and inspect internal-state and vertex overlays.</p>
    <p><a class="thalean-exhibit__cta" href="/observatories/thalean-graph/">Explore the simulator</a></p>
    <p class="thalean-exhibit__note">Exploratory mathematical visualization. It does not establish physical gravitons, electromagnetic fields, or gravity.</p>
  </div>
</section>
<!-- /THALEAN-EXHIBIT-001 -->

<h2>Current Status</h2>

<p>
The institutional foundations are now in place.
The public research surface will expand from here.
</p>

<footer>

© 2026 Centre of Recursive Inquiry

</footer>

</main>

</body>
</html>
