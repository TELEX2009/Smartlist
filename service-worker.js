const CACHE_NAME = "sri-grocery-planner-v1";
const APP_FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./data/groceries.js",
  "./js/storage.js",
  "./js/search.js",
  "./js/pdf.js",
  "./assets/icons/app-icon.png",
  "./assets/logo/sri-grocery-planner-logo.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
