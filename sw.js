const CACHE_NAME = 'cliniportal-v2';

// Essential App Shell resources to precache
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/reset.css',
  './css/main.css',
  './css/components/header.css',
  './css/components/sidebar.css',
  './css/components/footer.css',
  './css/components/homepage-widgets.css',
  './css/components/homepage-effects.css',
  './js/main.js',
  './components/header.html',
  './components/header.js',
  './components/footer.html',
  './components/footer.js',
  './js/components/tool-components.js',
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
          // Fallback to home page if requested offline page isn't cached yet
          return caches.match('./index.html');
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
