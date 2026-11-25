import assert from 'node:assert/strict';
import {sky} from '../sky.js';

for (const order of [-1,1]) {
  for (const reference of [-1,0,1]) {
    for (const averaged of [false,true]) {
      for (const phaseDeg of [0,30,90,127,180,270]) {
        const config = {order,reference,averaged,phaseDeg};
        const result = sky(config);
        // Independent complex-amplitude combiner. For the uncontrolled case
        // use a uniform four-phase quadrature, exact for this harmonic.
        const phases = averaged ? [0,90,180,270] : [phaseDeg];
        const ports = [1,-1].map(s => {
          const powers = phases.map(a => {
            const theta = a * Math.PI / 180;
            const re = reference + s * order * Math.cos(theta);
            const im = s * order * Math.sin(theta);
            return (re*re + im*im) / 4;
          });
          return powers.reduce((a,b) => a+b,0)/powers.length;
        });
        assert.equal(result.incomingIntensity,1);
        assert.ok(Math.abs(result.plus - ports[0]) < 4e-15);
        assert.ok(Math.abs(result.minus - ports[1]) < 4e-15);
        assert.equal(result.local.free,0);
        assert.equal(sky({...config, feedback:true}).local.difference,result.contrast);
        const flipped = sky({...config, order:-order, reference:-reference});
        assert.equal(flipped.contrast,result.contrast);
      }
    }
  }
}

assert.deepEqual([sky().plus,sky().minus],[1,0]);
assert.deepEqual([sky({order:-1}).plus,sky({order:-1}).minus],[0,1]);
assert.deepEqual([sky({reference:0}).plus,sky({reference:0}).minus],[0.25,0.25]);
assert.deepEqual([sky({averaged:true}).plus,sky({averaged:true}).minus],[0.5,0.5]);
assert.equal(sky().fork.preferredExit,23);
assert.equal(sky({reference:-1}).fork.preferredExit,11);
assert.equal(sky({reference:0}).fork.preferredExit,null);
assert.deepEqual(sky().fork.candidates.map(r=>r.vector),[[0,420],[0,-420]]);
assert.deepEqual(sky().fork.candidates.map(r=>r.rawOverlap),[201600,-201600]);
assert.deepEqual(sky({reference:-1}).fork.candidates.map(r=>r.normalizedOverlap),[-1,1]);
assert.throws(()=>sky({order:0}),RangeError);
console.log('72 optical preparations, matched controls, optional local latch, and both finite fork references passed.');
