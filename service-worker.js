const CACHE_NAME = "cephasgm-portal-v3";
const ASSETS = [
  "/cephasgm-portal/",
  "/cephasgm-portal/index.html",
  "/cephasgm-portal/portallogin.html",
  "/cephasgm-portal/portaldashboard.html",
  "/cephasgm-portal/portaladmin.html",
  "/cephasgm-portal/portaldownloads.html",
  "/cephasgm-portal/portalaccounting.html",
  "/cephasgm-portal/portalassistant.html",
  "/cephasgm-portal/cephasai.html",
  "/cephasgm-portal/manifest.json",
  "/cephasgm-portal/icon-192.png",
  "/cephasgm-portal/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("✅ Caching assets");
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});
