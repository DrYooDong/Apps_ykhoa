const CACHE_NAME = 'cliniportal-v2.1';

// Essential App Shell resources to precache
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './offline.html',
  './manifest.json',
  './src/styles/reset.css',
  './src/styles/main.css',
  './src/styles/components/header.css',
  './src/styles/components/sidebar.css',
  './src/styles/components/footer.css',
  './src/styles/components/bottom-nav.css',
  './src/styles/components/homepage-widgets.css',
  './src/styles/components/homepage-effects.css',
  './src/components/header.js',
  './assets/icons/app-icon.svg',
  './assets/icons/icon-192x192.png',
  './assets/icons/icon-512x512.png',
  './pages/Công cụ/cong-cu.html',
  './pages/Tiếp cận/tiep-can.html',
  './pages/Dược lý/duoc-ly.html',
  './pages/Kỹ năng/ky-nang.html',
  './pages/Công cụ/Chung/Tra cứu mã ICD10/Tracuu_maICD10.html'
];

// Install Event - Precache critical shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Use addAll with error recovery for missing individual non-critical files
        return Promise.allSettled(
          PRECACHE_ASSETS.map(url => cache.add(url).catch(err => {
            console.warn(`[SW] Precache failed for ${url}:`, err);
          }))
        );
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up stale caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(`[SW] Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Hybrid Caching Strategy
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Skip non-GET requests and non-http(s) (e.g. chrome-extension://)
  if (req.method !== 'GET' || (!url.protocol.startsWith('http'))) {
    return;
  }

  // Strategy 1: External CDN (Google Fonts, FontAwesome) -> Cache-First
  if (url.origin.includes('fonts.googleapis.com') || 
      url.origin.includes('fonts.gstatic.com') || 
      url.origin.includes('cdnjs.cloudflare.com')) {
    event.respondWith(
      caches.match(req).then((cachedResp) => {
        if (cachedResp) return cachedResp;
        return fetch(req).then((networkResp) => {
          if (networkResp && networkResp.status === 200) {
            const respClone = networkResp.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(req, respClone));
          }
          return networkResp;
        }).catch(() => cachedResp);
      })
    );
    return;
  }

  // Strategy 2: HTML Page Navigations -> Network-First with Cache Fallback
  if (req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(req).then((networkResp) => {
        if (networkResp && networkResp.status === 200) {
          const respClone = networkResp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, respClone));
        }
        return networkResp;
      }).catch(() => {
        return caches.match(req).then((cachedResp) => {
          if (cachedResp) return cachedResp;
          // Fallback to home page or offline fallback page
          return caches.match('./index.html').then(homeResp => homeResp || caches.match('./offline.html'));
        });
      })
    );
    return;
  }

  // Strategy 3: Local Static Assets (CSS, JS, Images, JSON) -> Stale-While-Revalidate
  event.respondWith(
    caches.match(req).then((cachedResp) => {
      const fetchPromise = fetch(req).then((networkResp) => {
        if (networkResp && networkResp.status === 200 && networkResp.type === 'basic') {
          const respClone = networkResp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, respClone));
        }
        return networkResp;
      }).catch((err) => {
        console.log(`[SW] Network fetch failed for ${req.url}:`, err);
      });

      return cachedResp || fetchPromise;
    })
  );
});

// Message Event - Handle Offline Sync commands from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'CACHE_URLS') {
    const urlsToCache = event.data.urls || [];
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        // Fetch and cache each URL
        return Promise.allSettled(
          urlsToCache.map(url => cache.add(url).catch(err => {
            console.warn(`[SW] Failed to cache on-demand: ${url}`, err);
          }))
        ).then(() => {
          // Reply back to client if port is available
          if (event.ports && event.ports[0]) {
            event.ports[0].postMessage({ status: 'success', count: urlsToCache.length });
          }
        });
      })
    );
  }
});
