import test from 'node:test';
import assert from 'node:assert/strict';
import {modeUrl} from '../living-navigation.mjs';

test('mode navigation retains the public entry and query despite a different asset base', () => {
  const current='https://dev.rook.ca/aletheos/living.html?run=41#waltz';
  const releaseBase='https://dev.rook.ca/aletheos/living-release-example/';
  // A bare fragment resolves against <base>, which would break refresh routing.
  assert.notEqual(new URL('#memory',releaseBase).pathname,new URL(current).pathname);
  assert.equal(modeUrl(current,'memory'),'https://dev.rook.ca/aletheos/living.html?run=41#memory');
  assert.equal(modeUrl(modeUrl(current,'geometry'),'harmonics'),'https://dev.rook.ca/aletheos/living.html?run=41#harmonics');
  assert.throws(()=>modeUrl(current,'other'));
});
