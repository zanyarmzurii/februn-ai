const CACHE_NAME = 'februn-ai-v4';
const urlsToCache = [
  '/',
  '/globals.css',
  '/manifest.json',
  // Add more static assets as needed
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
