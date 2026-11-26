import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {faceFixture as f, exteriorFixture as g} from '../data/flux-fixtures.js';
import {flux, fixedCut, faceEnergy, evolveFace, facePeriod as T, sag, exteriorRun} from '../flux.js';

const near = (a, b, tol = 1e-12) => assert.ok(Math.abs(a - b) <= tol, `${a} vs ${b}, tolerance ${tol}`);
const sum = values => values.reduce((x, y) => x + y, 0);
const nodes = Array.from({length: 20}, (_, i) => i);
const neighbors = nodes.map(i => f.edges.filter(([a,b]) => a === i || b === i).map(([a,b]) => a === i ? b : a));
const keys = Object.keys(f.cuts);

test('native fixture hashes and integer stiffness and circulation identities', () => {
  const pins = JSON.parse(fs.readFileSync(new URL('../data/flux-provenance.json', import.meta.url)));
  const bytes = fs.readFileSync(new URL('../data/flux-fixtures.js', import.meta.url));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), pins.fixtureSha256);
  assert.equal(f.edges.length, 60);
  assert.deepEqual(neighbors.map(a => a.length), Array(20).fill(6));
  for (let a = 0; a < 4; a++) {
    for (const i of nodes) assert.equal(12*f.exactFluxBasis[i][a] - 2*sum(neighbors[i].map(j => f.exactFluxBasis[j][a])), 10*f.exactFluxBasis[i][a]);
    for (let b = a + 1; b < 4; b++) {
      for (const i of nodes) assert.equal(sum(neighbors[i].map(j => f.exactFluxBasis[i][a]*f.exactFluxBasis[j][b] - f.exactFluxBasis[j][a]*f.exactFluxBasis[i][b])), 0);
    }
  }
  const currents = f.edges.map(([i,j]) => f.position[i]*f.velocity[j]-f.position[j]*f.velocity[i]);
  assert.equal(currents.filter(x => Math.abs(x) > 1e-12).length, 32);
  currents.forEach((j, i) => near(j, f.archivedCycle[i], 3e-17));
  near(flux({mode:'cycle'}).witness.cycleMean, 0.004351065602812942, 2e-16);
});

test('every cut edge obeys both sign controls at every sampled phase', () => {
  for (const cut of keys) for (const mode of ['instant','cycle']) for (const phase of [0,1/16,1/8,1/4,.37,1]) {
    const original = flux({cut,mode,phase});
    const both = flux({cut,mode,phase,control:'both'});
    const velocity = flux({cut,mode,phase,control:'velocity'});
    for (let i = 0; i < original.edges.length; i++) {
      const a = original.edges[i];
      near(a.current, both.edges[i].current, 0);
      near(a.current, -velocity.edges[i].current, 0);
      assert.ok(f.cuts[cut].includes(a.from) && !f.cuts[cut].includes(a.to));
    }
    near(original.traffic.outward, both.traffic.outward, 0);
    near(original.traffic.inward, both.traffic.inward, 0);
    if (mode === 'cycle') {
      near(original.net, 0);
      near(original.traffic.net, 0);
      assert.ok(original.outward > 0 && original.inward > 0);
    }
  }
});

test('traffic agrees with independent local energy change and time-domain integration', () => {
  for (const cut of keys) for (const mode of ['instant','cycle']) for (const control of ['original','velocity']) {
    const s = flux({cut,mode,phase:.173, control});
    const dt = s.interval[1]-s.interval[0];
    const finish = evolveFace(s.position,s.velocity,dt);
    const a=faceEnergy(s.position,s.velocity), b=faceEnergy(finish.position,finish.velocity);
    near(s.traffic.net, sum(f.cuts[cut].map(i => a[i]-b[i])), 8e-14);
    assert.ok(s.traffic.inward >= 0 && s.traffic.outward >= 0);
    let outward=0, inward=0;
    const samples=4096;
    for (let k=0;k<samples;k++) {
      const v=evolveFace(s.position,s.velocity,(k+.5)*dt/samples);
      for (const {from:i,to:j} of s.edges) {
        const current=(v.position[i]-v.position[j])*(v.velocity[i]+v.velocity[j]);
        outward+=Math.max(0,current)*dt/samples;
        inward+=Math.max(0,-current)*dt/samples;
      }
    }
    near(s.traffic.outward,outward,2e-6);
    near(s.traffic.inward,inward,2e-6);
  }
});

test('native fixed-cut intervention removes only the signed displacement, preserves velocities and uses the same interval', () => {
  const expected = {face7:[-.10414583919800074,-.10413021501873976],patch:[.12497046182181593,.12495625802248744],half:[-.42849813467085207,-.4269338815768333]};
  for (const cut of keys) {
    const r = fixedCut({cut});
    const state = evolveFace(f.position,f.velocity,T/4);
    const axis = f.signedAxis.map(x => x / Math.sqrt(24));
    const held = sum(axis.map((e,i) => e*state.position[i]));
    const cleared = state.position.map((x,i) => x-held*axis[i]);
    for (const [arm, start] of [[r.free,state.position],[r.cleared,cleared]]) {
      const energy0 = faceEnergy(start, state.velocity);
      const next = evolveFace(start, state.velocity, T/8);
      const energy1 = faceEnergy(next.position, next.velocity);
      near(arm, sum(f.cuts[cut].map(i => energy0[i]-energy1[i])), 2e-14);
    }
    near(r.free, expected[cut][0]);near(r.cleared, expected[cut][1]);
    near(r.retainedBefore,-.008257011370655295);
    near(r.retainedAfter,0,1e-14);
    assert.deepEqual(r.interval,[T/4,3*T/8]);
    assert.equal(r.reversal,false);
    assert.ok(Math.abs(r.difference)>1e-5);
  }
});

test('exterior quotient conserves all native edges, preserves singleton ports and agrees with SciPy exponential', () => {
  assert.equal(sum(g.multiplicity),1800);
  assert.equal(g.multiplicity[g.sourceClass],1);
  assert.equal(g.multiplicity[g.receiverClass],1);
  assert.equal(g.distance[g.receiverClass],6);
  let edges=0;
  for (const [i,nearby] of g.neighbors.entries()) {
    assert.equal(sum(nearby.map(a => a[1])),8);
    for (const [j,m] of nearby) {
      edges+=g.multiplicity[i]*m;
      const backwards=g.neighbors[j].find(([k])=>k===i)[1];
      assert.equal(g.multiplicity[i]*m,g.multiplicity[j]*backwards);
    }
  }
  assert.equal(edges,14400);
  const ref=JSON.parse(fs.readFileSync(new URL('./flux-sag-reference.json',import.meta.url)));
  for (const cut of ['near','middle','far']) for (let step=0;step<=4;step++) {
    const r=sag({cut,step});
    for (const arm of ['free','cleared']) {
      const x=ref.samples[r.cutRadius][arm][step];
      near(r[arm].source,x.qA,1e-13);near(r[arm].receiver,x.qB,1e-13);near(r[arm].net,x.j,1e-13);
    }
    if (step<2) assert.deepEqual(r.free,r.cleared);
    if (step===2) {near(r.free.receiver,ref.held,1e-14);assert.equal(r.cleared.receiver,0);assert.equal(r.free.receiverVelocity,r.cleared.receiverVelocity);}
    if (step===4) {near(r.deltaSource,r.retainedBefore**2,1e-14);near(r.deltaSource,ref.return,1e-14);assert.ok(r.free.postTraffic.net>0 && r.cleared.postTraffic.net>0);}
  }
});

test('integrated exterior traffic converges when the quadrature step is halved', () => {
  const one=exteriorRun(128),two=exteriorRun(256);
  for (const arm of ['free','cleared']) for (const cut of ['near','middle','far']) {
    const a=one[arm].frames[4][cut],b=two[arm].frames[4][cut];
    near(a.traffic.outward,b.traffic.outward,6e-5);near(a.traffic.inward,b.traffic.inward,6e-5);
    near(a.postTraffic.net,b.postTraffic.net,2e-12);
    near(a.traffic.net,a.traffic.outward-a.traffic.inward,1e-14);
  }
});
