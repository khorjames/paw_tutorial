var cacheName = 'hello-pwa';
var filesToCache = [
    '/',
    '/index.html',
    '/offline.html',
    'css/style.css',
    'js/main.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener("install", event => {
    console.log("Service worker installed");
 });
 
 self.addEventListener("activate", event => {
    console.log("Service worker activated");
 });

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  // request.mode = navigate isn't supported in all browsers
  // so include a check for Accept: text/html header.
  if (e.request.mode === 'navigate' || (e.request.method === 'GET' && e.request.headers.get('accept').includes('text/html'))) {
    e.respondWith(
      fetch(e.request.url).catch(error => {
          // Return the offline page
          return caches.match("offline.html");
      })
    );
}
else{
    // Respond with everything else if we can
    e.respondWith(caches.match(e.request)
                    .then(function (response) {
                    return response || fetch(e.request);
                })
        );
  }
});
