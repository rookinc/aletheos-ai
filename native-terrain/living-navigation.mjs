/** Keep mode navigation on the current entry, even with a release <base>. */
export function modeUrl(currentHref, mode) {
  if (!['geometry', 'waltz', 'harmonics', 'memory'].includes(mode)) throw Error('Unknown simulation mode');
  const url = new URL(currentHref);
  url.hash = mode;
  return url.href;
}
