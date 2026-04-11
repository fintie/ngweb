self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil((async function() {
    const keys = await caches.keys();
    await Promise.all(keys.map(function(key) { return caches.delete(key); }));
    await self.clients.claim();
    const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    clients.forEach(function(client) {
      client.navigate(client.url);
    });
  })());
});

self.addEventListener('fetch', function() {
  return;
});
