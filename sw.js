const CACHE_NAME = 'cargo-logistics-v2';
const ASSETS = [
  'index.html',
  'manifest.json',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css',
  'https://cdn.jsdelivr.net/npm/toastify-js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});

// التعامل مع حدث النقر على إشعار النظام لفتح التطبيق أو التركيز عليه
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      // إذا كان التطبيق مفتوحاً بالفعل، ركز عليه
      for (let i = 0; i < clientList.length; i++) {
        let client = clientList[i];
        if (client.url.indexOf('index.html') !== -1 && 'focus' in client) {
          return client.focus();
        }
      }
      // إذا كان مغلقاً، افتح نافذة جديدة له
      if (clients.openWindow) {
        return clients.openWindow('index.html');
      }
    })
  );
});
