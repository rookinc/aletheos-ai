# Light Loom verification guide

The Thalean G9000 Light Loom replays one finite, ten-contact experiment. Start with [manifest.json](manifest.json) for the claim-to-source map, [packet.json](packet.json) for the numbers shown on screen, and [numerical-receipt.txt](numerical-receipt.txt) for the recorded verification run. The downloadable [Light-Loom-Replay.zip](Light-Loom-Replay.zip) contains the executable generators, their inputs, the independent reference graph, and the standalone observatory used for the checks.

## Run the experiment

Extract the ZIP and change into its `Light-Loom-Replay` directory. The reference environment is Python 3.12.14. NumPy, SciPy and SymPy versions are pinned in `requirements.txt`. After installing the dependencies, the numerical checks run offline. The runner builds fresh results in a temporary directory and exits unsuccessfully on a discrepancy.

```sh
python -m pip install -r requirements.txt
python run_checks.py --separated
```

To compare a different website revision, save its complete HTML and pass its path as an argument. To skip the three separate all-launch preparations, omit `--separated`. For the packet and graph checks alone, Python's standard library suffices.

```sh
python run_checks.py /path/to/saved-page.html --separated
python check_packet.py packet.json
python verify_graph.py packet.json --census AT_4valent_60.s6 --theorem source/theorem_object.json
```

## What selects this experiment

The 60-vertex graph admits multiple preparations. This experiment chooses quotient pentagon 11 → 0 → 4 → 12 → 13, initial lift 26, and rational phase parameter tan(ψ/2) = −1/5. The signed turn tensor, face and edge incidences, quotient projection and symmetry actions are inputs. The potential uses a calibrated Green operator. The pair instrument uses a fixed encoder and analyzer quartet. The kit includes each of these inputs. [Source revisions and original archive locations](source/revisions.json)

1. **Graph identity.** The 60-entry permutation in `identity.json` maps every Loom edge to entry 6 in the external order-60 GraphSym census. The 15-entry permutation maps the quotient slots into the theorem object's matrix order. Use the original Loom slots when evaluating the Bell formula. [GraphSym order-60 census](https://github.com/rhysje00/graphsym/blob/7f41251f06d341722428190bd33e8685436cf389/graphs/at4valent/AT_4valent_60.s6) · [G15 theorem object](https://aletheos.ai/json/theorem_object.json)
2. **Signed contact dynamics.** `pentagon.py` lifts the chosen quotient word, finds symmetry action 447, constructs the exact starting face coordinates, and checks the first-zero held/free update. `experiment.py` advances the signed face register and computes endpoint energy from its edge amplitudes. The regenerated ten rows are compared field by field against the page. Five steps negate the signed register and recover its energy. Ten restore the contact and signed register together.
3. **Gravity and pairs.** The Green matrix applied to normalized endpoint energy yields the potential. Its span is exactly 1928797/134996400 on all ten rows. A separate check compares the ten site-26 probes used for pacing. The original pair encoder and analyzers generate each correlation. `factorization.py` derives the three-chamber score identity. `verify.py` checks all 40 setting/contact probability tables using charge projectors and also checks the chamber identity on 11 polarizations.
4. **Other drawers.** `reciprokum.py` reproduces the fixed guard reading and both interventions on the paired cover. `verify-drawers.py` computes the ten Bohm exits from the two eligible signed guards at each arrival, checks the four lifts per Wheeler slot, and verifies the Bohr commutator norm and vanishing one-wing charge means. The current Bohm UI displays the archived successor. The check computes it from guard slopes.
5. **Separate preparations.** `--separated` regenerates the fixed K=3, F=3 all-launch receiver calculations and compares their joint probabilities, correlations, scores and marginal changes with `D.separated`. The Bell drawer's “Register one pair” samples a selected joint probability table. The fixed-quartet scores characterize the encoded preparation and supply no experimental inference of nonlocality.

## Read the fields

The UI uses contacts 1–10, and the packet uses indices 0–9. Native site IDs are 0–59 and quotient slots are 0–14. Each row has 20 face positions `q`, 20 signed velocities `v`, 60 normalized endpoint energies `rho`, and a directed `tail` and `head`. The saved page’s `probe26` array is outside the embedded packet.

`coarse_span`, `E` and uppercase `CHSH` are rational strings. Read them with Python's `fractions.Fraction`. `E` is ordered 00, 01, 10, 11, with signs +, +, +, − in CHSH. The lowercase `chsh`, face arrays, and normalized site energies are decimal exports. The seed and generator retain the exact rational arithmetic. Joint signs in the separate receiver tables are ordered ++, +−, −+, −−.

| Contact | Native dart | Quotient dart | Fixed-turn h · v | Exact CHSH |
| --- | --- | --- | --- | --- |
| 1 | 26 → 15 | 11 → 0 | −83400/19 | 19119/7792 |
| 6 | 54 → 40 | 11 → 0 | +83400/19 | 19119/7792 |

The largest score is 29885/11688, at contacts 3 and 8. At contact 1 the four correlations are 4/5, 4/5, 33259/77920 and −33259/77920. These are model predictions for the stipulated measurement protocol.

## Test the displayed pixels

Open the bundled or published Light Loom in a browser, then run the entire contents of [verify-optics.js](verify-optics.js) in that page's DevTools console. It returns a receipt naming the renderer it exercised and restores the squelch setting. [Recorded browser results](optics-receipt.json)

The fixture tests each primary channel on both sides of the actual pixel threshold. At 99% the weakest displayed byte must reach 253. At 100%, a pixel with any channel at 254 falls back to the dark stage background. Only (255,255,255) passes. Separate tests exercise CMY/RGB mixing, master gain and a straight-edge scattering profile with 35% direct light and 65% Gaussian blur. Browser blur approximations have a tolerance of eight color bytes on that test edge. Software WebGL and Canvas 2D were exercised in Chromium; each additional browser can run the same test and report its own result.

The reference page is frozen at [d0d8e176](https://github.com/rookinc/aletheos-ai/blob/d0d8e17612d3746d99bcd70ced842645811e4a0e/public_html/observatories/universal-carrier/index.html). The kit's `SHA256SUMS` lists the delivered files. Run `sha256sum -c SHA256SUMS` from the extracted directory to verify them.
