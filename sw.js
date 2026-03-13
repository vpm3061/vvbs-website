const CACHE_NAME = 'vvbs-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/services.html',
  '/media-network.html',
  '/portfolio.html',
  '/clients.html',
  '/contact.html',
  '/thank-you.html',
  '/css/style.css',
  '/js/main.js',
  '/images/logo.png',
  '/images/icon-192.png',
  '/images/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(() => {})
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match('/'))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null))
    )
  );
});