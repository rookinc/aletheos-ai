/* Optional Aletheos site analytics. The consent record is compatible with the October 2026 site. */
(() => {
  'use strict';
  const id = 'G-3MHQ9Y1GJX';
  const key = 'aletheos.analytics.consent.v1';
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  if (location.protocol !== 'https:' || !['aletheos.ai', 'www.aletheos.ai'].includes(location.hostname)
      || window !== window.top || window.aletheosAnalyticsMounted) return;
  window.aletheosAnalyticsMounted = true;

  let current = null;
  let volatile = false;
  let active = false;
  let interacted = false;
  let timer;
  let panel, options, dock;
  const path = location.pathname;
  const instrument = path.match(/^\/(?:observatories|labs)\/([a-z0-9_-]+)(?:\/|$)/i)?.[1];
  const inLoom = instrument === 'universal-carrier';
  const controls = {
    torusPlay: 'playback', torusSpeed: 'cycle_speed', homeCamera: 'camera_reset',
    settingsButton: 'settings', expandStage: 'full_stage', masterBrightness: 'brightness',
    whiteSquelch: 'white_squelch', motionLaw: 'pacing', prev: 'previous_contact', next: 'next_contact',
    step: 'contact', scatterFlag: 'scattering', rgbFlag: 'palette', axisFlag: 'axes',
    tailLength: 'tail_length', 'loom-optics-check': 'optics_check', recRoute: 'receiver_route',
    recState: 'receiver_state', model: 'model', left: 'left_setting', right: 'right_setting',
    sample: 'sample', clear: 'clear'
  };
  const modes = new Set(['Reziprokium', 'Thalean', 'Einstein', 'Schrödinger', 'Bohm', 'Wheeler', 'Bohr', 'Bell']);

  function valid(record) {
    return record && ['allow', 'deny'].includes(record.choice)
      && Number.isFinite(record.expires) && record.expires > Date.now();
  }
  function readChoice() {
    try {
      const record = volatile ? current : JSON.parse(localStorage.getItem(key));
      return valid(record) ? record : null;
    } catch {
      return valid(current) ? current : null;
    }
  }
  function clearCookies() {
    for (const entry of document.cookie.split(';')) {
      const name = entry.trim().split('=')[0];
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of new Set(['', '; Domain=' + location.hostname, '; Domain=aletheos.ai'])) {
        document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax; Secure' + domain;
      }
    }
  }
  function referrer() {
    try {
      const from = new URL(document.referrer);
      return from.origin === location.origin ? from.origin + from.pathname : from.origin;
    } catch { return ''; }
  }
  function enable() {
    active = true;
    window['ga-disable-' + id] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'
    });
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('js', new Date());
    window.gtag('config', id, {
      page_location: location.origin + path, page_referrer: referrer(),
      allow_google_signals: false, allow_ad_personalization_signals: false
    });
    const tag = document.createElement('script');
    tag.async = true;
    tag.referrerPolicy = 'strict-origin';
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.append(tag);
  }
  function sync() {
    current = readChoice();
    clearTimeout(timer);
    if (current) {
      // Browser timeout values are bounded by a signed 32-bit integer.
      timer = setTimeout(sync, Math.min(current.expires - Date.now() + 1, 2147483647));
    }
    if (panel) {
      panel.hidden = !!current;
      options.hidden = !current;
      options.setAttribute('aria-expanded', String(!panel.hidden));
    }
    if (current?.choice === 'allow') {
      if (!active) enable();
    } else {
      window['ga-disable-' + id] = true;
      clearCookies();
      if (active) {
        active = false;
        location.reload();
      }
    }
  }
  function choose(choice) {
    current = { choice, expires: Date.now() + lifetime };
    try {
      localStorage.setItem(key, JSON.stringify(current));
      volatile = false;
    } catch { volatile = true; }
    sync();
    if (options && !options.hidden) options.focus({preventScroll: true});
  }
  function mount() {
    dock = document.createElement('div');
    dock.id = 'aletheos-privacy-choices';
    const shadow = dock.attachShadow({mode: 'open'});
    shadow.innerHTML = `
      <style>
        :host{all:initial;position:fixed;z-index:2147483646;bottom:max(10px,env(safe-area-inset-bottom));right:max(10px,env(safe-area-inset-right));font:15px/1.45 system-ui,sans-serif;color:#e9f4f4;color-scheme:dark}
        [hidden]{display:none!important}
        section{box-sizing:border-box;width:min(365px,calc(100vw - 24px));padding:16px 18px;background:#10262c;border:1px solid #54737b;border-radius:10px;box-shadow:0 4px 18px #0004}
        p{margin:0 0 12px}strong{display:block;margin-bottom:4px;font-size:16px}
        button{appearance:none;cursor:pointer;min-height:44px;border:1px solid #a9c6c9;border-radius:5px;padding:6px 11px;background:#16343b;color:#f0f8f8;font:600 14px/1.2 system-ui,sans-serif}
        button:focus-visible{outline:3px solid #74e2e8;outline-offset:2px}
        .actions{display:flex;flex-wrap:wrap;gap:8px}.choices{background:#183137}
      </style>
      <section id="choices" aria-label="Analytics privacy choices"><p><strong>May Aletheos.ai use Google Analytics?</strong>
        Google Analytics measures visits, site searches, link clicks, and instrument use. This browser remembers your choice for 180 days. You can change it any time.</p>
        <div class="actions"><button type="button" id="deny">Decline analytics</button><button type="button" id="allow">Allow analytics</button></div></section>
      <button type="button" class="choices" aria-controls="choices" hidden>Privacy choices</button>`;
    panel = shadow.querySelector('section');
    options = shadow.querySelector('.choices');
    options.onclick = () => {
      panel.hidden = false;
      options.hidden = true;
      options.setAttribute('aria-expanded', 'true');
      shadow.querySelector('#deny').focus({preventScroll:true});
    };
    shadow.querySelector('#allow').onclick = () => choose('allow');
    shadow.querySelector('#deny').onclick = () => choose('deny');
    document.body.append(dock);
    sync();
  }
  window.addEventListener('storage', e => {
    if (e.key === key || e.key === null) { volatile = false; sync(); }
  });
  window.addEventListener('pageshow', e => { if (e.persisted) sync(); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) sync(); });
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount, {once:true});

  function send(event, params) {
    if (!active || readChoice()?.choice !== 'allow') return;
    window.gtag('event', event, {...params, send_to:id});
  }
  function firstInteraction(target) {
    if (active && instrument && !interacted && target !== dock
        && target.closest('button, select, input, summary, canvas, [role="button"]')) {
      interacted = true;
      send('scope_first_interaction', {observatory_id:instrument});
    }
  }
  function loomControl(el) {
    if (!inLoom) return;
    let name = Object.hasOwn(controls, el.id) ? controls[el.id] : null;
    if (el.matches('#settingsPanel input[data-layer]')) name = 'layer_opacity';
    if (el.matches('.view-keys button[data-camera]')) name = 'camera_view';
    if (name) send('loom_control', {observatory_id:instrument, control_name:name});
  }

  document.addEventListener('pointerdown', e => {
    if (e.isTrusted && e.target instanceof Element) firstInteraction(e.target);
  }, {capture:true, passive:true});
  document.addEventListener('change', e => {
    if (!active || !e.isTrusted || !(e.target instanceof Element)) return;
    firstInteraction(e.target);
    if (e.target.matches('select, input[type=range], input[type=checkbox]')) loomControl(e.target);
  }, true);
  document.addEventListener('click', e => {
    if (!active || !e.isTrusted || !(e.target instanceof Element) || e.target === dock) return;
    const el = e.target;
    firstInteraction(el);
    const button = el.closest('button');
    if (button) loomControl(button);
    const drawer = el.closest('summary')?.parentElement;
    if (inLoom && drawer?.matches('details:not([open])')) {
      const name = drawer.id === 'light-loom-guide' ? 'guide' : drawer.dataset.mode;
      if (name === 'guide' || modes.has(name)) send('instrument_drawer_open', {observatory_id:instrument, drawer_name:name});
    }
    const anchor = el.closest('a[href]');
    if (!anchor) return;
    const url = new URL(anchor.href, document.baseURI);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return;
    const sameSite = ['aletheos.ai','www.aletheos.ai'].includes(url.hostname);
    const target = sameSite && url.pathname.match(/^\/(?:observatories|labs)\/([a-z0-9_-]+)(?:\/|$)/i);
    if (target && !instrument) {
      send('observatory_open', {observatory_id:target[1], placement:anchor.closest('.loom-feature') ? 'hero' : 'catalog_link'});
      return;
    }
    const ext = url.pathname.toLowerCase().match(/\.(pdf|zip|csv|json)$/);
    const type = ext?.[1] || (sameSite && url.pathname.startsWith('/library/records/') ? 'record' : null);
    if (type) send('research_resource_open', {resource_type:type});
  }, true);
})();
