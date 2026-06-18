// Service Worker for My Bank Cards
const CACHE_NAME = 'bank-cards-v1';
const urlsToCache = [
    '/my-bank-cards/',
    '/my-bank-cards/index.html',
    '/my-bank-cards/manifest.json',
    '/my-bank-cards/icons/icon-72.png',
    '/my-bank-cards/icons/icon-96.png',
    '/my-bank-cards/icons/icon-128.png',
    '/my-bank-cards/icons/icon-144.png',
    '/my-bank-cards/icons/icon-152.png',
    '/my-bank-cards/icons/icon-192.png',
    '/my-bank-cards/icons/icon-384.png',
    '/my-bank-cards/icons/icon-512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
