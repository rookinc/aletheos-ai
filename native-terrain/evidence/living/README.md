# Registered carrier source

The two preserved files are exact bytes from the user-supplied
`The_Graviton_on_Graph_HOG52002_GRA004_Overleaf.zip`. Their SHA-256 values match
the archive's `evidence/MANIFEST.json`:

- Source Audit 040: `ee12ef66c5ac2e71dd5c31996bbee4979266cbf72fb1c01400153a44913bfca5`
- Existing Audit 040 receipt: `2c8be2cfa828639cf31ebf7c57aecd3726e55dcce7b55a25f033dfe8c86cd409`

These are reference evidence, not a new certificate. The preserved source retains
its original Project 41 dependency paths and is not a standalone script here.
Run `python tools/build-living-registered.py` from `native-terrain` to reproduce
the simulator's data using the checked-in canonical G60, deck maps, and Project
41 bundle. The generator rejects changed source hashes or mismatched graph and
deck data. Node tests independently check the output.

The simulator selects the native ordered axis registration `(a,b)` as a documented
convention. Its G1800 is the Cartesian product graph modulo diagonal `b`, with
`K[(u,v)] = [(ab(v),b(u))]`. The `delta` map is diagonal `a`, and G900 is the
further diagonal V4 quotient. The five frames use the common native coordinates
established in Audit 040, giving `F(f,x) = (f+1,Kx)`.

During SIM-003 development the canonical-model portion of the preserved source
was also executed in the supplied archive's original dependency tree: all 1800
fibers, 7200 edges, and 1800 values of `K` matched the generated data exactly.
This is one recovered native registration. The simulator does not claim to have
independently re-run all 24 historical transported constructions.
