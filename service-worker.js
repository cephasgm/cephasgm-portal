const CACHE_NAME = "cephasgm-cache-v1";
const ASSETS = [
  "/cephasgm-portal/",
  "/cephasgm-portal/index.html",
  "/cephasgm-portal/portallogin.html",
  "/cephasgm-portal/portaldashboard.html",
  "/cephasgm-portal/portaladmin.html",
  "/cephasgm-portal/portaldownloads.html",
  "/cephasgm-portal/manifest.json",
  "/cephasgm-portal/images/icon-192.png",
  "/cephasgm-portal/images/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});
