// TOM CMB review, Triad-Comparator. Rows are signed 20-face turn vectors.
// On canonical edge index 61 (17→59), the 59→17 analyzer is its negative.
// Its in-phase column vanishes on every face. This is its signed Q column.
const analyzerQ = [1,1,-4,-4,-4,6,1,1,1,-4,6,1,1,-4,1,-4,1,1,1,1];
const triads = [
  {sites: [15,59,17], turn: [1,1,-9,-9,-9,16,6,1,1,-14,16,6,1,-9,1,-14,6,1,1,6]},
  {sites: [4,59,17], turn: [-1,-1,9,9,9,-16,-6,-1,-1,14,-16,-6,-1,9,-1,14,-6,-1,-1,-6]},
  {sites: [59,17,23], turn: [-1,9,-16,-6,-16,14,-1,-1,9,-6,14,-1,9,-6,-1,-6,-1,-1,9,-1]},
  {sites: [59,17,11], turn: [1,-9,16,6,16,-14,1,1,-9,6,-14,1,-9,6,1,6,1,1,-9,1]}
];
const dot = (a,b) => a.reduce((sum, value, index) => sum + value * b[index], 0);
const vector = (row) => [0, dot(row.turn, analyzerQ)];

function forkReadout(sign) {
  const previous = sign === 1 ? triads[0] : sign === -1 ? triads[1] : null;
  const ref = previous ? vector(previous) : [0,0];
  const candidates = triads.slice(2).map(row => {
    const b = vector(row);
    const rawOverlap = dot(ref, b);
    return {
      exit: row.sites[2],
      vector: b,
      rawOverlap,
      squaredNorm: dot(b,b),
      normalizedOverlap: previous ? rawOverlap / (Math.hypot(...ref) * Math.hypot(...b)) : null
    };
  });
  return {
    incoming: [59,17],
    reference: {triad: previous ? [...previous.sites] : null, vector: ref},
    candidates,
    preferredExit: candidates.find(port => port.normalizedOverlap > 0)?.exit ?? null
  };
}

export const skyVersion = 'CMB-OBF §4 · CMB review 2026-11-24 · Triad-Comparator 0180cf7c';

// Unit input e₁. In the published internal representation AB e₁=e₂ and
// BA e₁=−e₂. r is the chosen sign of e₂. phaseDeg is the signal's phase
// relative to the retained reference before this route sign is applied.
export function sky({order = 1, reference = 1, averaged = false, phaseDeg = 0, feedback = false} = {}) {
  if (![1,-1].includes(order) || ![1,-1,0].includes(reference) || !Number.isFinite(phaseDeg)) {
    throw new RangeError('Supply order ±1, reference ±1 or 0, and a finite phase in degrees.');
  }
  const phase = (phaseDeg % 360 + 360) % 360;
  const cosine = phase % 90 === 0 ? [1,0,-1,0][phase / 90] : Math.cos(phase * Math.PI / 180);
  const incomingIntensity = order * order;
  const referenceIntensity = reference * reference;
  const contrast = (averaged ? 0 : order * reference * cosine) || 0;
  const baseline = (incomingIntensity + referenceIntensity) / 4;
  const plus = baseline + contrast / 2;
  const minus = baseline - contrast / 2;
  const register = feedback ? contrast : 0;
  return {
    sourceVersion: skyVersion, order, reference, averaged, phaseDeg: phase,
    incomingIntensity, referenceIntensity, plus, minus, contrast,
    selectedPort: contrast > 0 ? '+' : contrast < 0 ? '-' : null,
    fork: forkReadout(reference),
    local: {
      enabled: Boolean(feedback), checkpoint: 'after combination', clock: 'next apparatus tick',
      retained: contrast, free: register, cleared: 0, difference: register,
      units: 'normalized calibration command'
    }
  };
}
