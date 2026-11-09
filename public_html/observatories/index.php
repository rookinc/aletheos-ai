<?php
/* Aletheos Observatory Library 001 — discover published child pages locally. */
$catalog = [
    'xyz-flower' => [
        'title' => 'XYZ Flower · Thalean Observatory', 'category' => 'geometry', 'kind' => '3D flower and native transport', 'icon' => 'flower',
        'description' => 'Follow 450 native Thalean dart routes through three perpendicular flowers on the XY, XZ and YZ planes. Orbit, isolate planes, and adjust bloom depth.',
        'detail' => '150 routes per plane, with verified 20-step returns. Includes flat flower, mandala, native F and Fourier views.'
    ],

    'jupiter' => [
        'title' => 'Jupiter Vortex Lab', 'category' => 'fluid', 'kind' => 'Fluid dynamics', 'icon' => 'vortex',
        'description' => 'Evolve interacting vortices in a regional fluid model, then explore a separate experiment on the native 9,000-state Thalean graph.',
        'detail' => 'Regional dynamics and graph moments; an exploratory model of selected behavior.'
    ],
    'sonoluminescence' => [
        'title' => 'Sonoluminescence Boundary Lab', 'category' => 'fluid', 'kind' => 'Bubble dynamics', 'icon' => 'bubble',
        'description' => 'Drive a microscopic bubble through expansion, collapse, and rebound. Inspect its trajectory and compare collapse strength with illustrative boundary-flux gates.',
        'detail' => 'Calculated radial motion; the light marker and gate scores are illustrative.'
    ],
    'thalean-orthogonal' => [
        'title' => 'Thalean Orthogonal Observatory', 'category' => 'geometry', 'kind' => 'Geometric views', 'icon' => 'planes',
        'description' => 'Explore the Thalean construction through orthogonal views and the shared region of its X, Y, and Z projections.',
        'detail' => 'Change the viewpoint to examine how the same construction appears.'
    ],
    'thalean-graph-explorer' => [
        'title' => 'Thalean Graph & Water Explorer', 'category' => 'geometry', 'kind' => 'Graph and water views', 'icon' => 'graph',
        'description' => 'Move between graph and water views, inspect transport, and explore the camera and laser controls.',
        'detail' => 'An interactive geometric model with several ways to inspect the construction.'
    ],
    'thalean-graph' => [
        'title' => 'The Graviton on the Thalean Graph', 'category' => 'geometry', 'kind' => 'Graph exploration', 'icon' => 'graph',
        'description' => 'Explore the G60 construction through plasma and flowing-sheet views, BC chamber cycles, and geometric overlays.',
        'detail' => 'A mathematical exploration of structure and motion.'
    ],
    'b32k' => [
        'title' => 'Thalean G9000 / B32K', 'category' => 'geometry', 'kind' => 'Transport and geometry', 'icon' => 'cube',
        'description' => 'Inspect the B32K stage and its Thalean geometric construction. Use the observatory controls to explore its motion and layers.',
        'detail' => 'An interactive view into the geometric research program.'
    ],
    'water' => [
        'title' => 'G9000 Water Observatory', 'category' => 'geometry', 'kind' => 'Water-inspired geometry', 'icon' => 'drop',
        'description' => 'Explore a water-inspired geometric model through its internal structure and evolving motion.',
        'detail' => 'An exploratory geometric construction; see the model’s stated assumptions.'
    ],
    'uft4-omega' => [
        'title' => 'UFT4 Omega — Legacy', 'category' => 'archive', 'kind' => 'Earlier observatory', 'icon' => 'tower',
        'description' => 'Revisit the earlier quotient-tower observatory and its layered geometric views.',
        'detail' => 'Retained as an earlier stage of the observatory work.'
    ]
];
$entries = [];
$base = realpath(__DIR__);
$children = scandir(__DIR__);
if ($children === false) $children = [];
foreach ($children as $slug) {
    if (!preg_match('/^[A-Za-z0-9][A-Za-z0-9_-]*$/D', $slug)) continue;
    $path = __DIR__ . '/' . $slug;
    if (!is_dir($path) || is_link($path)) continue;
    $resolved = realpath($path);
    if ($resolved === false || dirname($resolved) !== $base) continue;
    $published = false;
    foreach (['index.html', 'index.php'] as $entryName) {
        $entryPath = $path . '/' . $entryName;
        if (is_file($entryPath) && !is_link($entryPath)) { $published = true; break; }
    }
    if (!$published) continue;
    $entry = isset($catalog[$slug]) ? $catalog[$slug] : [
        'title' => ucwords(str_replace(['-', '_'], ' ', $slug)),
        'category' => 'other', 'kind' => 'Interactive observatory', 'icon' => 'graph',
        'description' => 'Open this observatory to explore its interactive construction and controls.',
        'detail' => 'See the observatory for its model, assumptions, and scope.'
    ];
    $entry['slug'] = $slug;
    $entry['href'] = '/observatories/' . $slug . '/';
    $entry['order'] = isset($catalog[$slug]) ? array_search($slug, array_keys($catalog), true) : count($catalog);
    $entries[] = $entry;
}
/* Related laboratories are listed only when their actual local entry file exists. */
$related = [
    ['slug' => 'p900-lab', 'title' => 'P900 Surface Observatory', 'kind' => 'Surface geometry', 'icon' => 'cube',
     'description' => 'Inspect the P900 surface construction in its dedicated interactive laboratory.',
     'detail' => 'A related laboratory in the Aletheos research collection.',
     'paths' => ['labs/p900_observatory/lab.html']],
    ['slug' => 'informative-action-lab', 'title' => 'Informative Action Lab', 'kind' => 'Action and memory', 'icon' => 'planes',
     'description' => 'Explore the informative-action experiment and its interactive controls.',
     'detail' => 'A related laboratory in the Aletheos research collection.',
     'paths' => ['labs/informative_action/index.php', 'labs/informative_action/index.html']],
    ['slug' => 'g900-lab', 'title' => 'G900 Witness Observatory', 'kind' => 'Graph witnesses', 'icon' => 'graph',
     'description' => 'Inspect graph structures, body and carrier relationships, and receipt routes with supporting research artifacts.',
     'detail' => 'An artifact-backed laboratory for the G900 research program.',
     'paths' => ['labs/g900_observatory/lab.html']]
];
$documentRoot = realpath(__DIR__ . '/..');
foreach ($related as $lab) {
    foreach ($lab['paths'] as $relativePath) {
        $file = $documentRoot . '/' . $relativePath;
        $resolved = realpath($file);
        if (!is_file($file) || is_link($file) || $resolved === false || strpos($resolved, $documentRoot . '/') !== 0) continue;
        $lab['category'] = 'geometry';
        $lab['href'] = '/' . $relativePath;
        $lab['order'] = count($catalog) + 1;
        $entries[] = $lab;
        break;
    }
}
usort($entries, function ($a, $b) {
    if ($a['order'] !== $b['order']) return $a['order'] < $b['order'] ? -1 : 1;
    return strcmp($a['title'], $b['title']);
});
function obs_escape($value) { return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8'); }
function obs_icon($name) {
    $shapes = [
        'flower' => '<circle cx="22.000" cy="40.000" r="11"/><circle cx="27.500" cy="49.526" r="11"/><circle cx="33.000" cy="59.053" r="11"/><circle cx="27.500" cy="30.474" r="11"/><circle cx="33.000" cy="40.000" r="11"/><circle cx="38.500" cy="49.526" r="11"/><circle cx="44.000" cy="59.053" r="11"/><circle cx="33.000" cy="20.947" r="11"/><circle cx="38.500" cy="30.474" r="11"/><circle cx="44.000" cy="40.000" r="11"/><circle cx="49.500" cy="49.526" r="11"/><circle cx="55.000" cy="59.053" r="11"/><circle cx="44.000" cy="20.947" r="11"/><circle cx="49.500" cy="30.474" r="11"/><circle cx="55.000" cy="40.000" r="11"/><circle cx="60.500" cy="49.526" r="11"/><circle cx="55.000" cy="20.947" r="11"/><circle cx="60.500" cy="30.474" r="11"/><circle cx="66.000" cy="40.000" r="11"/>',
        'vortex' => '<path d="M14 37c-8-20 24-31 35-12 8 14-14 28-25 16-8-9 5-19 12-12 5 5-2 11-6 7M78 27c11 21-20 38-34 21"/><path d="M9 54c22 19 58 10 70-13M19 12c16-10 43-5 51 12" opacity=".4"/>',
        'bubble' => '<circle cx="44" cy="36" r="27"/><circle cx="44" cy="36" r="12" stroke-dasharray="3 5" opacity=".45"/><circle cx="44" cy="36" r="3" fill="currentColor" stroke="none"/><path d="M6 36h8m60 0h8M44 1v7m0 56v7" opacity=".5"/>',
        'planes' => '<path d="M44 5 74 22 44 40 14 22ZM14 22v29l30 18V40m30-18v29L44 69M44 5v35M14 51l30-18 30 18"/><path d="m29 14 30 18v28M29 60V32l30-18" opacity=".35"/>',
        'graph' => '<path d="m44 5 29 21-11 34H26L15 26Zm0 0L26 60l47-34H15l47 34Z"/><g fill="currentColor" stroke="none"><circle cx="44" cy="5" r="3"/><circle cx="73" cy="26" r="3"/><circle cx="62" cy="60" r="3"/><circle cx="26" cy="60" r="3"/><circle cx="15" cy="26" r="3"/></g>',
        'cube' => '<path d="m17 19 38-9 17 19-38 9Zm0 0v34l17 18V38m38-9v33l-38 9M55 10v33l17 19M17 53l38-10"/><path d="m34 38 21 5M25 28l39-9M25 62V28" opacity=".4"/>',
        'drop' => '<path d="M44 5c-7 14-26 29-26 43a26 26 0 0 0 52 0C70 34 51 19 44 5Z"/><ellipse cx="44" cy="48" rx="24" ry="9" opacity=".4"/><path d="M44 5c-14 27-12 58 0 69 12-11 14-42 0-69" opacity=".5"/>',
        'tower' => '<ellipse cx="44" cy="12" rx="29" ry="9"/><ellipse cx="44" cy="36" rx="19" ry="7"/><ellipse cx="44" cy="61" rx="29" ry="9"/><path d="m15 12 10 24-10 25m58-49L63 36l10 25M44 3v67" opacity=".55"/>'
    ];
    return '<svg viewBox="0 0 88 80" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' . (isset($shapes[$name]) ? $shapes[$name] : $shapes['graph']) . '</svg>';
}
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Observatory Library — Aletheos.ai</title>
<meta name="description" content="Explore Aletheos observatories: interactive mathematical models, Thalean graph views, Jupiter vortices, and sonoluminescence bubble dynamics.">
<meta name="theme-color" content="#f5f5ef">
<meta name="observatory-library-release" content="aletheos-observatory-library-001">
<link rel="canonical" href="https://aletheos.ai/observatories/">
<style>
:root{color-scheme:light;--paper:#f5f5ef;--white:#fffefa;--ink:#172e32;--muted:#56696a;--line:#d6dfd8;--teal:#216a64;--pale:#e6eeE7;--gold:#9b6b36}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.6 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}a{color:inherit}a:focus-visible,button:focus-visible,input:focus-visible{outline:3px solid #a87233;outline-offset:4px}.skip{position:absolute;top:-100px;left:20px;padding:8px 14px;background:var(--ink);color:white;z-index:3}.skip:focus{top:10px}.shell{max-width:1180px;margin:auto;padding:0 32px}.site-header{border-bottom:1px solid var(--line)}.header-inner{min-height:82px;display:flex;align-items:center;justify-content:space-between;gap:24px}.brand{text-decoration:none;display:flex;gap:10px;align-items:center;font-size:22px;font-weight:650;letter-spacing:-.6px}.brand-mark{display:grid;place-items:center;width:33px;height:33px;border:1px solid #9db4a7;border-radius:50%;font-size:18px;font-family:Georgia,serif;font-weight:normal}.top-link{text-decoration:none;color:var(--muted);font-size:14px}.top-link:hover{color:var(--teal)}.hero{padding:68px 0 48px;display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:45px;align-items:center}.eyebrow{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--teal);font-weight:700;margin:0 0 17px}h1{font:normal clamp(40px,6vw,69px)/1.04 Georgia,"Times New Roman",serif;letter-spacing:-2.3px;margin:0 0 22px;max-width:680px}.intro{font-size:18px;line-height:1.65;color:var(--muted);max-width:630px;margin:0}.hero-art{color:var(--teal);width:100%;opacity:.8}.hero-art svg{width:100%;height:auto;display:block}.library-top{border-top:1px solid var(--line);padding:25px 0 22px;display:flex;align-items:center;justify-content:space-between;gap:24px}.section-label{font-size:13px;color:var(--muted);margin:0}.section-label strong{color:var(--ink);font-weight:600}.tools{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:flex-end}.search-wrap{position:relative}.search-wrap input{appearance:none;border:1px solid var(--line);background:var(--white);padding:10px 12px;font:inherit;font-size:13px;border-radius:6px;width:210px;color:var(--ink)}.filter-group{display:flex;gap:5px;flex-wrap:wrap}button{font:inherit;cursor:pointer}.filter{border:1px solid transparent;padding:7px 11px;border-radius:5px;background:transparent;color:var(--muted);font-size:12px;line-height:1.5}.filter:hover{background:var(--pale)}.filter[aria-pressed="true"]{color:var(--white);background:var(--teal)}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}.card{min-width:0;display:flex;flex-direction:column;background:var(--white);border:1px solid var(--line);border-radius:9px;overflow:hidden;transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease}.card:hover{transform:translateY(-3px);border-color:#95afa1;box-shadow:0 12px 30px #203c2e09}.card[hidden]{display:none}.card-visual{height:146px;display:flex;align-items:center;justify-content:center;border-bottom:1px solid #e6ebe4;background:linear-gradient(145deg,#eff2e9,#e5eee8);position:relative;color:var(--teal)}.card-visual svg{width:95px;height:88px}.card[data-category="fluid"] .card-visual{background:linear-gradient(145deg,#eee9df,#f5efe4);color:#8f6240}.card[data-category="archive"] .card-visual{background:linear-gradient(145deg,#edece8,#e5e7e4);color:#6c7774}.card-body{padding:25px 24px 20px;display:flex;flex-direction:column;flex:1}.card-kind{font-size:10px;letter-spacing:1.6px;text-transform:uppercase;color:var(--teal);font-weight:650;margin:0 0 10px}.card[data-category="fluid"] .card-kind{color:var(--gold)}.card[data-category="archive"] .card-kind{color:#66736c}h2{font-size:22px;line-height:1.28;letter-spacing:-.5px;margin:0 0 15px;font-weight:600}.card-title{text-decoration:none}.card-title:hover{text-decoration:underline;text-underline-offset:4px}.description{margin:0 0 20px;font-size:14px;line-height:1.7;color:var(--muted)}.detail{font-size:12px;line-height:1.6;color:#637472;margin:auto 0 20px;padding-top:2px}.open{display:flex;justify-content:space-between;align-items:center;padding-top:16px;border-top:1px solid #e3e9e1;font-size:13px;font-weight:650;color:var(--teal);text-decoration:none}.open:hover span:first-child{text-decoration:underline;text-underline-offset:4px}.arrow{font-size:20px;line-height:1}.empty{padding:30px;border:1px solid var(--line);border-radius:9px;background:var(--white);color:var(--muted)}.method{margin:56px 0 64px;display:grid;grid-template-columns:260px 1fr;gap:40px;border-top:1px solid var(--line);padding-top:28px}.method h2{font:normal 26px/1.3 Georgia,serif;letter-spacing:-.5px}.method p{font-size:14px;color:var(--muted);margin:0;max-width:700px}.footer{background:#e9eee6;border-top:1px solid var(--line);font-size:12px;color:var(--muted)}.footer-inner{padding-top:22px;padding-bottom:22px;display:flex;justify-content:space-between;gap:20px}.footer a{text-decoration:none}.footer a:hover{text-decoration:underline}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap}[hidden]{display:none!important}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.card{transition:none}.card:hover{transform:none}}@media(max-width:1000px){.hero{grid-template-columns:1fr 180px;gap:25px}.library-top{align-items:flex-start;flex-direction:column;gap:15px}.tools{width:100%;justify-content:space-between}.grid{grid-template-columns:repeat(2,minmax(0,1fr))}.method{grid-template-columns:210px 1fr}}@media(max-width:600px){.shell{padding-left:20px;padding-right:20px}.header-inner{min-height:70px;gap:12px}.brand{font-size:20px}.top-link{font-size:12px}.hero{display:block;padding:42px 0 31px}.hero-art{display:none}h1{font-size:45px;letter-spacing:-1.6px}.eyebrow{font-size:10px;letter-spacing:1.7px}.intro{font-size:16px}.tools{display:block}.search-wrap input{width:100%;margin-bottom:13px}.filter-group{gap:3px}.filter{font-size:11px;padding:7px 9px}.grid{grid-template-columns:1fr;gap:17px}.card-visual{height:126px}.card-body{padding:23px}.method{display:block;margin:40px 0}.method h2{margin-bottom:12px}.footer-inner{flex-direction:column;gap:7px}.library-top{padding-top:20px}.card:hover{transform:none}}@media(max-width:350px){.shell{padding-left:15px;padding-right:15px}h1{font-size:40px}.top-link{max-width:90px;text-align:right;line-height:1.4}.card-body{padding:20px}.filter{font-size:10.5px;padding:7px 8px}}
</style>
</head>
<body>
<a href="#library" class="skip">Skip to observatories</a>
<header class="site-header"><div class="shell header-inner"><a class="brand" href="/" aria-label="Aletheos home"><span class="brand-mark" aria-hidden="true">A</span>Aletheos</a><a class="top-link" href="/">Back to Aletheos <span aria-hidden="true">↗</span></a></div></header>
<main class="shell">
<section class="hero" aria-labelledby="page-title"><div><p class="eyebrow">Center of Recursive Inquiry</p><h1 id="page-title">Observatory library.</h1><p class="intro">A place to look closely. Explore mathematical structures and scientific models, change the conditions, and watch what follows.</p></div><div class="hero-art" aria-hidden="true"><svg viewBox="0 0 260 230" fill="none" stroke="currentColor" stroke-width=".8"><circle cx="130" cy="115" r="87" opacity=".28"/><ellipse cx="130" cy="115" rx="87" ry="36" transform="rotate(28 130 115)"/><ellipse cx="130" cy="115" rx="87" ry="36" transform="rotate(-28 130 115)"/><ellipse cx="130" cy="115" rx="36" ry="87"/><path d="M43 115h174M130 28v174" opacity=".25"/><circle cx="130" cy="115" r="11" fill="#e3ede2"/><circle cx="130" cy="28" r="4" fill="currentColor"/><circle cx="205" cy="151" r="4" fill="currentColor"/><circle cx="55" cy="151" r="4" fill="currentColor"/></svg></div></section>
<section id="library" aria-label="Available observatories">
<div class="library-top"><p class="section-label" id="resultCount" role="status" aria-live="polite"><strong><?= count($entries) ?></strong> <?= count($entries) === 1 ? 'observatory' : 'observatories' ?> available</p><div class="tools" id="tools" hidden><div class="search-wrap"><label class="sr-only" for="search">Search observatories</label><input id="search" type="search" placeholder="Find an observatory…" autocomplete="off"></div><div class="filter-group" role="group" aria-label="Filter observatories"><button class="filter" type="button" data-filter="all" aria-pressed="true">All</button><button class="filter" type="button" data-filter="fluid" aria-pressed="false">Physical models</button><button class="filter" type="button" data-filter="geometry" aria-pressed="false">Geometry</button><button class="filter" type="button" data-filter="archive" aria-pressed="false">Earlier work</button></div></div></div>
<div class="grid" id="observatoryGrid">
<?php foreach ($entries as $entry): $href = $entry['href']; ?>
<article class="card" data-category="<?= obs_escape($entry['category']) ?>" data-search="<?= obs_escape(strtolower($entry['title'] . ' ' . $entry['description'] . ' ' . $entry['kind'])) ?>">
<div class="card-visual"><?= obs_icon($entry['icon']) ?></div><div class="card-body"><p class="card-kind"><?= obs_escape($entry['kind']) ?></p><h2><a class="card-title" href="<?= obs_escape($href) ?>"><?= obs_escape($entry['title']) ?></a></h2><p class="description"><?= obs_escape($entry['description']) ?></p><p class="detail"><?= obs_escape($entry['detail']) ?></p><a class="open" href="<?= obs_escape($href) ?>" aria-label="Open <?= obs_escape($entry['title']) ?>"><span>Open observatory</span><span class="arrow" aria-hidden="true">↗</span></a></div></article>
<?php endforeach; ?>
</div>
<p class="empty" id="noResults"<?= count($entries) ? ' hidden' : '' ?>><?= count($entries) ? 'No observatories match. Try a different word or choose All.' : 'The observatory library is being prepared. Please check back soon.' ?></p>
</section>
<section class="method" aria-labelledby="method-title"><h2 id="method-title">An invitation<br>to investigate.</h2><p>Each observatory is a working model with a particular scope. Its assumptions, controls, and limitations matter to what you can conclude. Use these experiments to inspect patterns and ask sharper questions; consult the notes within each observatory for the meaning of its results.</p></section>
</main>
<footer class="footer"><div class="shell footer-inner"><span>Center of Recursive Inquiry · A Rook Services Inc. initiative</span><a href="/">Aletheos.ai <span aria-hidden="true">↗</span></a></div></footer>
<script>
(()=>{'use strict';const tools=document.getElementById('tools'),search=document.getElementById('search'),buttons=[...document.querySelectorAll('[data-filter]')],cards=[...document.querySelectorAll('.card')],count=document.getElementById('resultCount'),empty=document.getElementById('noResults');let category='all';function update(){const query=search.value.trim().toLocaleLowerCase();let n=0;for(const card of cards){const match=(category==='all'||card.dataset.category===category)&&card.dataset.search.includes(query);card.hidden=!match;if(match)n++;}count.textContent=n+' of '+cards.length+' '+(cards.length===1?'observatory':'observatories');empty.hidden=n!==0;}for(const button of buttons)button.addEventListener('click',()=>{category=button.dataset.filter;for(const b of buttons)b.setAttribute('aria-pressed',String(b===button));update();});search.addEventListener('input',update);tools.hidden=false;})();
</script>
</body>
</html>
