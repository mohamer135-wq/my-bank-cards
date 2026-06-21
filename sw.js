const CACHE = 'bankcards-v2';
const OFFLINE_URLS = [
  './',
  './index.html',
  './manifest.json',
];
const EXTERNAL = [
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/webfonts/fa-solid-900.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/webfonts/fa-regular-400.woff2',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => {
      // Cache core files first (must succeed)
      return c.addAll(OFFLINE_URLS)
        .then(() => {
          // Cache external resources (best effort)
          return Promise.allSettled(
            EXTERNAL.map(url => fetch(url).then(r => r.ok ? c.put(url, r) : null).catch(() => null))
          );
        });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  // Network-first for external CDN, Cache-first for local
  const isLocal = url.origin === location.origin;
  if (isLocal) {
    // Cache-first for local files
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          if (res && res.status === 200) {
            caches.open(CACHE).then(c => c.put(e.request, res.clone()));
          }
          return res;
        }).catch(() => cached || new Response('Offline', {status: 503}));
      })
    );
  } else {
    // Stale-while-revalidate for CDN
    e.respondWith(
      caches.match(e.request).then(cached => {
        const fetchPromise = fetch(e.request).then(res => {
          if (res && res.status === 200) {
            caches.open(CACHE).then(c => c.put(e.request, res.clone()));
          }
          return res;
        }).catch(() => null);
        return cached || fetchPromise;
      })
    );
  }
});
