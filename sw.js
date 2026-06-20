const CACHE_NAME = "tk-tongkonan-pwa-v2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./lagu-anak-anak-ceria.mp3",
  "./Ukiran toraja 4 Warna.png",
  "./img/Batu Pahat untukTiang Rumah Tongkonan Toraja.jpg",
  "./img/Phon Pinus.jpg",
  "./img/Rumah tongkoan toraja.jpg",
  "./img/aksesoris kepala kerbau tongkonan.jpg",
  "./img/pohon bambu toraja.jpg",
  "./img/rumah tongkonan atap bambu.jpg",
  "./img/ukiran toraja yang menggunakan 4 warna dasar toraja.jpg",
  "./icons/icon-128.png",
  "./icons/icon-144.png",
  "./icons/icon-152.png",
  "./icons/icon-192.png",
  "./icons/icon-384.png",
  "./icons/icon-512.png",
  "./icons/icon-72.png",
  "./icons/icon-96.png",
  "./icons/maskable-icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match("./index.html"));
    })
  );
});
