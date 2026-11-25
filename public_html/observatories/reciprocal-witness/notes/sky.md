# The sky receiver

An observer at B looks outward toward a direction on the last-scattering shell A. Radiation from that direction travels inward to B. The optical comparison takes place at Σ, the input of the local combiner. The sky image uses coordinates centered on the observing position. Nested and face-to-face drawings depict the same direction of arrival.

## Coherent reference

In *CMB Obfuscation and Thalean Observer Mechanics*, the chosen internal matrices are A = diag(−1,1) and B = [[0,1],[1,0]]. They act on the unit vector (1,0)ᵀ. The products AB and BA give (0,+1)ᵀ and (0,−1)ᵀ. The signed amplitude in the second coordinate is the signal b. The local receiver supplies r, with a phase calibrated against one route. The values are normalized field amplitudes.

The signal alone gives I = b†b = 1. Interference yields P± = |r ± b|²/4. Taking the difference isolates Re(r†b). With matched unit inputs these powers sum to one. For a unit reference and a relative phase φ the cross term varies as cos φ. Uniform phase averaging makes the cross term zero. An arbitrary phase added to both inputs cancels in their comparison.

| Local operation | P₊ | P₋ | P₊ − P₋ | Incident I |
| --- | ---: | ---: | ---: | ---: |
| AB, reference aligned | 1 | 0 | +1 | 1 |
| Reverse order | 0 | 1 | −1 | 1 |
| Reverse only the reference | 0 | 1 | −1 | 1 |
| Reverse both | 1 | 0 | +1 | 1 |
| Average uncontrolled relative phase | ½ | ½ | 0 | 1 |
| Reference disconnected | ¼ | ¼ | 0 | 1 |

The last row uses the stated quarter-power calibration for each output. The incoming intensity has its own upstream meter. In the optional local feedback model, a register stores m = P₊ − P₋ after arrival. A unit-gain calibration actuator reads m one apparatus tick later. Clearing the register then changes that local command by m. The observational sky remains the same. This is an explicit apparatus law. The independent observer's copy of the receipt is read-only.

## The retained native reference

Scott Allen Cave and CoRI's finite analyzer uses the signed middle edge 59→17 at a four-valent G60 site. For a turn with signed edges i,j, contract h = sᵢsⱼW[:,i,j] with the two columns of the signed partner tensor on that same middle edge. Previous turns supply r and candidate turns supply b. Both quadratures are in native integer units.

| Previous triad and its reference | Candidate at 23, (0,+420) | Candidate at 11, (0,−420) |
| --- | ---: | ---: |
| 15→59→17, (0,+480) | +201,600 | −201,600 |
| 4→59→17, (0,−480) | −201,600 | +201,600 |

Divide the dot products in the table by 480 × 420 to read a signed overlap of +1 or −1. Both exits have squared norm 176,400. The value on the earlier triad supplies the observer's reference. The fixed middle edge supplies the analyzer. Positive overlap identifies a preferred candidate. An action law reading the correct record at the correct site is also needed to make a walker take an exit. The native fork and the optical combiner are separately calculated examples. No sky phase is inferred from their correspondences.

The reference archive tests 960 lawful turn windows on 240 directed edges and finds 480 instances of each overlap sign. The direct symmetric edge-pair emitter has zero projection onto the archived phase plane on both legs. The analyzer above uses the archived alternative partner tensor. Its strength as a physical radiation coupling remains open.

## Measured Planck context

The map displays the measured quadrupole and octupole of the Planck 2018 PR3 SMICA full-mission thermodynamic temperature product, COM_CMB_IQU-smica_2048_R3.00_full.fits, column I_STOKES. The Returning Observer archive includes the CMB-DATUM-003 reduction from the Planck sky. Its preparation averages nested HEALPix pixels from NSIDE 2048 to 128, then takes full-sky equal-weight quadrature of the ℓ=2 and ℓ=3 modes. These twelve real coefficients are in thermodynamic µK. The map evaluates those modes on a Galactic Mollweide projection. Longitude increases leftward and north is up. Fine angular structure and the dipole are absent from this selected band. The color scale runs from −55 to +55 µK. The temperature and the supplied coherent reference can be inspected separately.

Credit ESA/Planck Collaboration, IRSA. Low-band reduction by CoRI. Projection and palette produced for this observatory. [Planck PR3 CMB map catalog](https://irsa.ipac.caltech.edu/data/Planck/release_3/all-sky-maps/matrix_cmb.html)

## What the Sgr A* anchor measures

The EHT's 2017 global interferometer sampled spatial Fourier components of sky brightness at 1.3 mm. The group's reconstructions and modeling support a ring diameter of 51.8 ± 2.3 µas (68% credible interval). The bright ring is an apparent angular structure formed by radiation from plasma in curved spacetime. A model cut is a selected set of graph links, with a positive orientation. Its edge currents can be tested directly in the finite dynamics. A free-versus-cleared change of telescope-side amplitude and a change in signed energy crossing that cut are separate measurements. The EHT sky provides no measurement of the simulated receiver intervention or an outward signal from behind the horizon. The instrument's ring is an original scale schematic. [EHT Collaboration, primary result](https://doi.org/10.3847/2041-8213/ac6674)

## Replay

From the instrument directory run `node tests/sky-check.mjs`. With Python and NumPy, `python3 tests/sky-archive.py` reruns the unchanged attachment inside `data/sky-triad-comparator.zip`, verifies its hashes, and compares the browser's four integer contractions to the archive. With SciPy ≥ 1.15 and Pillow, `python3 tests/sky-map.py` regenerates the observational rendering from the included low-band coefficients. Exact inputs, version digests, upstream product, and original-source scope are recorded in `data/sky-provenance.json`.
