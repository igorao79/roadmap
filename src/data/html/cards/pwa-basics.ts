import { ContentSection } from '../../types';

export const pwaBasicsContent: ContentSection[] = [
  {
    title: 'Что такое Progressive Web Apps?',
    content: 'PWA - это веб-приложения, которые используют современные веб-технологии для предоставления нативного пользовательского опыта. PWA могут работать оффлайн, отправлять push-уведомления и устанавливаться на домашний экран.',
    code: `<!-- HTML для PWA -->
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#3ddac1">

  <!-- Web App Manifest -->
  <link rel="manifest" href="/manifest.json">

  <!-- Favicon и иконки -->
  <link rel="icon" href="/favicon.ico">
  <link rel="apple-touch-icon" href="/icon-192.png">

  <title>My PWA App</title>
</head>
<body>
  <h1>Progressive Web App</h1>
  <p>Это PWA с оффлайн функциональностью</p>

  <script>
    // Регистрация Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => console.log('SW registered'))
          .catch(error => console.log('SW failed'));
      });
    }
  </script>
</body>
</html>`
  },
  {
    title: 'Web App Manifest',
    content: 'Manifest.json описывает метаданные приложения и определяет, как PWA будет выглядеть и вести себя при установке на устройство пользователя.',
    code: `{
  "name": "Frontend Roadmap",
  "short_name": "Roadmap",
  "description": "Интерактивная дорожная карта frontend разработчика",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3ddac1",
  "orientation": "portrait-primary",
  "scope": "/",
  "lang": "ru",
  "categories": ["education", "productivity"],
  "icons": [
    {
      "src": "/icon-72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "shortcuts": [
    {
      "name": "HTML основы",
      "short_name": "HTML",
      "description": "Изучить основы HTML",
      "url": "/html-basics",
      "icons": [{ "src": "/icon-96.png", "sizes": "96x96" }]
    }
  ]
}`
  },
  {
    title: 'Service Workers',
    content: 'Service Workers - это JavaScript файлы, которые работают в фоне браузера и позволяют перехватывать сетевые запросы, кэшировать ресурсы и обеспечивать оффлайн работу.',
    code: `// sw.js - Service Worker
const CACHE_NAME = 'roadmap-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/manifest.json'
];

// Установка Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Обработка запросов
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Возвращаем из кэша, если есть
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Очистка старого кэша
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});`
  },
  {
    title: 'Кэширование стратегии',
    content: 'Service Workers поддерживают различные стратегии кэширования: Cache First, Network First, Stale While Revalidate, Network Only, Cache Only.',
    code: `// Cache First стратегия
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Из кэша
        }
        return fetch(event.request)
          .then(response => {
            // Сохраняем в кэш
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseClone));
            }
            return response;
          });
      })
  );
});

// Stale While Revalidate
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        const fetchPromise = fetch(event.request)
          .then(networkResponse => {
            // Обновляем кэш
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, networkResponse.clone()));
            return networkResponse;
          });

        // Возвращаем кэшированную версию сразу
        return cachedResponse || fetchPromise;
      })
  );
});`
  },
  {
    title: 'Push-уведомления',
    content: 'PWA могут отправлять push-уведомления даже когда приложение закрыто. Это требует подписки пользователя и серверной инфраструктуры.',
    code: `// Запрос разрешения на уведомления
async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    console.log('Разрешение получено');
  }
}

// Подписка на push-уведомления
async function subscribeToNotifications() {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });

  // Отправляем подписку на сервер
  await fetch('/api/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: { 'Content-Type': 'application/json' }
  });
}

// Обработка push-событий в Service Worker
self.addEventListener('push', event => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icon-192.png',
    badge: '/icon-72.png',
    vibrate: [100, 50, 100],
    data: { url: data.url }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});`
  },
  {
    title: 'Background Sync',
    content: 'Background Sync API позволяет отложить выполнение задач до восстановления сетевого соединения. Полезно для отправки форм в оффлайн режиме.',
    code: `// Регистрация фоновой синхронизации
async function registerBackgroundSync() {
  if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
    const registration = await navigator.serviceWorker.ready;
    await registration.sync.register('sync-forms');
  }
}

// В Service Worker
self.addEventListener('sync', event => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncForms());
  }
});

async function syncForms() {
  const forms = await getFormsFromIndexedDB();

  for (const form of forms) {
    try {
      await fetch('/api/submit-form', {
        method: 'POST',
        body: JSON.stringify(form.data),
        headers: { 'Content-Type': 'application/json' }
      });

      // Удаляем отправленную форму
      await deleteFormFromIndexedDB(form.id);
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
    }
  }
}`
  }
];
