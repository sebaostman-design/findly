const CACHE = 'findly-v2';

self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => clients.claim());

// Handle push events (Taso 2 — requires VAPID + backend)
self.addEventListener('push', e => {
  const data = e.data?.json() || {};
  e.waitUntil(self.registration.showNotification(data.title || 'Findly', {
    body: data.body || '',
    icon: '/findly/icon-192.png',
    badge: '/findly/icon-192.png',
    data: { url: data.url || '/findly/' }
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data?.url || '/findly/'));
});
