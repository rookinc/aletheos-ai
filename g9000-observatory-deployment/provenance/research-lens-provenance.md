# Response lens provenance

The response lens is an independent certificate visualization. It does not attach spectrum rows to individual 3D stage vertices. The base G9000 carrier was separately verified against the native 040 fixture, permitting the Return route overlay (see `research-registration.json`); this does not supply a spectral-mode or four-sheet-cover identification with the displayed field.

Its data contract is `window.RESEARCH_DATA.response_spectrum.weights`, the twelve rows supplied by `research-lens-crosswalk.json`. Each energy and weight is encoded by two rational strings `(a,b)` representing `a+b√5`. `response-lens.js` uses BigInt rational arithmetic for positivity, zero decisions, ordering and normalization. Only SVG positions and explicitly marked decimals use floating approximations.

The original source is `THALEAN-NATIVE-CHARACTER-RESPONSE-012/certificates/channel_structure.json`, with twelve combined energy levels, eight active per normalized channel and four shared. At E=2, the difference weight is 4/9 and the sum weight is zero. The sum channel first appears at E=4. Every channel's total exact weight is one.

The comparison 16 native / 72 frozen control comes from `THALEAN-NATIVE-CHARACTER-RESPONSE-012/certificates/response_comparison.json`. These are L-only response dimensions. They are deliberately separate from F-inclusive dimensions 176 and loop-envelope dimensions 120 or 280 in 013. The 104/16 block and 7/30 versus 23/30 seed-weight visualization is omitted here to avoid duplicating the Return lens.

No Hz, physical-time, water, CMB or spin interpretation is assigned. The component never evolves the X/Y orientation plane as a presumed Hamiltonian oscillator. The source-scope details remain available in the component.

## API

Load `response-lens.css`, then `research-data.js` and `response-lens.js`. Call:

```js
const response = window.RESPONSE_LENS.mount(host);
response.setChannel('sum'); // 'sum', 'difference' or 'both'
response.selectEnergy('5|-1'); // exact coefficient key, or zero-based display index
response.getState(); // channel + selectedEnergy coefficient pair
response.destroy();
```

The component uses only its host and prefixed CSS. It performs no network requests or graph-stage mutations. It supports channel radio keyboard navigation, twelve persistent energy buttons, exact cancellation states and live selected-weight announcements. An unavailable or malformed certificate produces a visible component-local error.

## Verification

`node --test scripts/response-lens.test.cjs` reads the bundled `dist/research-data.js`. During independent development, the same tests can use `RESPONSE_LENS_DATA=/absolute/path/research-lens-crosswalk.json`.

Tests independently sum the original coefficient strings in Q(√5), verify activity counts, exact low-energy cancellations and labels, preserve the 16/72 L-only scope, and reject malformed or unnormalized inputs. The Site owner performs integrated mobile/desktop browser checks.
