self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
      const appClient = clients.find(client => 'focus' in client);
      if (appClient) {
        return appClient.focus();
      }
      return self.clients.openWindow(new URL('./', self.registration.scope).href);
    })
  );
});
