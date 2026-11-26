// Open the Light Loom, paste this entire file in the browser's DevTools console,
// and run it. It returns a JSON-compatible receipt or throws on a failed check.
// The current squelch setting is restored even if the audit fails.
(() => {
  function requireCheck(ok, message) {
    if (!ok) throw new Error('Light Loom optics: ' + message);
  }
  function canvas(w, h) {
    const el = document.createElement('canvas');
    el.width = w;
    el.height = h;
    return el;
  }

  const slider = document.getElementById('whiteSquelch');
  requireCheck(slider && typeof createLightMixer === 'function' &&
    typeof createScatteringPass === 'function', 'Run on the Universal Carrier / Light Loom page.');
  const background = [11, 24, 36];
  const levels = [0, 25, 50, 75, 99, 100];
  const original = slider.value;
  const observedCutoffs = [];
  try {
    for (const percent of levels) {
      slider.value = String(percent);
      slider.dispatchEvent(new Event('input', {bubbles: true}));
      const expected = Math.ceil(255 * percent / 100);
      requireCheck(whiteCutoff === expected, 'wrong cutoff at ' + percent + '%');
      observedCutoffs.push(whiteCutoff);
    }
  } finally {
    slider.value = original;
    slider.dispatchEvent(new Event('input', {bubbles: true}));
  }

  // In each row a different primary sweeps 0..255 while the other two stay 255.
  // The unfiltered output is the oracle's input: gate the displayed bytes.
  const width = 256, height = 3;
  const source = canvas(width, height);
  const ctx = source.getContext('2d', {alpha: false});
  const ramp = ctx.createImageData(width, height);
  ramp.data.fill(255);
  for (let row = 0; row < height; row++) {
    for (let x = 0; x < width; x++) ramp.data[4 * (row * width + x) + row] = x;
  }

  function auditMixer(useGL) {
    const display = canvas(width, height);
    const hud = canvas(width, height).getContext('2d', {willReadFrequently: true});
    if (!useGL) display.getContext('2d'); // force the shipped fallback
    const gl = useGL ? display.getContext('webgl', {alpha: false}) : null;
    if (useGL && !gl) return {backend: 'WebGL', status: 'unavailable'};
    const mix = createLightMixer(display, hud, source, () => {});
    function read(gain, rgb, cutoff) {
      hud.clearRect(0, 0, width, height);
      mix(gain, rgb, source, cutoff);
      if (!gl) return hud.getImageData(0, 0, width, height).data;
      requireCheck(hud.getImageData(0, 0, 1, 1).data[3] === 0,
        'unexpected fallback while probing WebGL');
      const data = new Uint8Array(4 * width * height);
      gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, data);
      requireCheck(gl.getError() === gl.NO_ERROR, 'WebGL readback failed');
      return data;
    }

    try {
      ctx.putImageData(ramp, 0, 0);
      const baseline = read(1, true, 0);
      const gates = [];
      for (const [index, percent] of levels.entries()) {
        const cutoff = observedCutoffs[index], filtered = read(1, true, cutoff);
        let passed = 0;
        const weakestBytes = new Set();
        for (let i = 0; i < baseline.length; i += 4) {
          const weakest = Math.min(baseline[i], baseline[i + 1], baseline[i + 2]);
          weakestBytes.add(weakest);
          const passes = weakest >= cutoff;
          if (passes) passed++;
          for (let c = 0; c < 3; c++) {
            const expected = passes ? baseline[i + c] : background[c];
            requireCheck(filtered[i + c] === expected, 'backend ' + (gl ? 'WebGL' : '2D') +
              ', ' + percent + '%, pixel ' + i / 4 + ', channel ' + c);
          }
        }
        if (cutoff > 0) requireCheck(weakestBytes.has(cutoff - 1) && weakestBytes.has(cutoff),
          'fixture did not straddle the gate at ' + cutoff);
        if (percent === 100) requireCheck(passed === 3, 'expected three pure-white ramp endpoints');
        gates.push({percent, cutoff, passed, samples: width * height});
      }

      const paletteCases = [
        {signal: [255, 0, 0], rgb: true, gain: 1, expected: [255, 24, 36]},
        {signal: [255, 0, 0], rgb: false, gain: 1, expected: [11, 255, 255]},
        {signal: [0, 255, 0], rgb: false, gain: 1, expected: [255, 24, 255]},
        {signal: [0, 0, 255], rgb: false, gain: 1, expected: [255, 255, 36]},
        {signal: [20, 20, 20], rgb: false, gain: 9, expected: [255, 255, 255]}
      ];
      for (const {signal, rgb, gain, expected} of paletteCases) {
        ctx.fillStyle = 'rgb(' + signal.join(',') + ')';
        ctx.fillRect(0, 0, width, height);
        const pixel = read(gain, rgb, 0);
        requireCheck(expected.every((byte, i) => pixel[i] === byte), 'palette or gain mismatch');
      }
      return {backend: gl ? 'WebGL' : 'Canvas 2D', status: 'passed', gates, paletteCases: paletteCases.length};
    } finally {
      // Repeated checks should not consume device WebGL contexts used by the stage.
      if (gl) gl.getExtension('WEBGL_lose_context')?.loseContext();
    }
  }

  function auditScatter() {
    // A half-plane with a straight vertical edge yields the cumulative Gaussian
    // response in x. Use a discrete kernel as a reference for browser blur.
    const size = 96, middle = size / 2;
    const input = canvas(size, size);
    const ink = input.getContext('2d', {alpha: false});
    ink.fillStyle = '#ff0000';
    ink.fillRect(middle, 0, middle, size);
    const out = createScatteringPass()(input, 1);
    const bytes = out.getContext('2d').getImageData(0, middle, size, 1).data;
    const sigma = 4, direct = 0.35, radius = 24;
    const weights = Array.from({length: radius * 2 + 1}, (_, i) =>
      Math.exp(-0.5 * ((i - radius) / sigma) ** 2));
    const total = weights.reduce((a, b) => a + b, 0);
    let maxError = 0;
    for (let x = middle - 16; x <= middle + 16; x++) {
      let sum = 0;
      for (let j = 0; j < weights.length; j++) if (x + j - radius >= middle) sum += weights[j];
      const expected = 255 * ((x >= middle ? direct : 0) + (1 - direct) * sum / total);
      maxError = Math.max(maxError, Math.abs(bytes[x * 4] - expected));
      requireCheck(bytes[x * 4 + 1] === 0 && bytes[x * 4 + 2] === 0, 'scattering mixed planes');
    }
    // Canvas filters and the downsampled fallback approximate the continuous blur.
    requireCheck(maxError <= 8, 'Gaussian step-response error ' + maxError + ' exceeds 8 bytes');
    return {backend: 'filter' in ink ? 'Canvas blur' : 'software Gaussian', sigmaCSSPx: 4, dpr: 1,
      directFraction: direct, samples: 33, maxByteError: +maxError.toFixed(3), toleranceBytes: 8};
  }

  const renderers = [auditMixer(false), auditMixer(true)];
  return {status: 'passed on listed available backends', url: location.href, userAgent: navigator.userAgent,
    renderers, scattering: auditScatter()};
})()
