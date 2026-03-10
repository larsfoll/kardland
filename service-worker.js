const cacheKey = "kardland-assets-1";

const assetsToCache = [
  "cards/1c.svg",
  "cards/1d.svg",
  "cards/1h.svg",
  "cards/1s.svg",
  "cards/2c.svg",
  "cards/2d.svg",
  "cards/2h.svg",
  "cards/2s.svg",
  "cards/3c.svg",
  "cards/3d.svg",
  "cards/3h.svg",
  "cards/3s.svg",
  "cards/4c.svg",
  "cards/4d.svg",
  "cards/4h.svg",
  "cards/4s.svg",
  "cards/5c.svg",
  "cards/5d.svg",
  "cards/5h.svg",
  "cards/5s.svg",
  "cards/6c.svg",
  "cards/6d.svg",
  "cards/6h.svg",
  "cards/6s.svg",
  "cards/7c.svg",
  "cards/7d.svg",
  "cards/7h.svg",
  "cards/7s.svg",
  "cards/8c.svg",
  "cards/8d.svg",
  "cards/8h.svg",
  "cards/8s.svg",
  "cards/9c.svg",
  "cards/9d.svg",
  "cards/9h.svg",
  "cards/9s.svg",
  "cards/10c.svg",
  "cards/10d.svg",
  "cards/10h.svg",
  "cards/10s.svg",
  "cards/11c.svg",
  "cards/11d.svg",
  "cards/11h.svg",
  "cards/11s.svg",
  "cards/12c.svg",
  "cards/12d.svg",
  "cards/12h.svg",
  "cards/12s.svg",
  "cards/13c.svg",
  "cards/13d.svg",
  "cards/13h.svg",
  "cards/13s.svg",
  "cards/back.png",
  "images/allowedPlaceholder.svg",
  "images/cherry.jpg",
  "images/clubFoundationPlaceholder-L.svg",
  "images/clubFoundationPlaceholder.svg",
  "images/diamondFoundationPlaceholder-L.svg",
  "images/diamondFoundationPlaceholder.svg",
  "images/disallowedPlaceholder.svg",
  "images/fine_wood.jpg",
  "images/fine_wood.png",
  "images/freecell_regions.svg",
  "images/freecell_thumbnail.jpg",
  "images/FreeCellLabel.svg",
  "images/freeCellPlaceholder-L.svg",
  "images/freeCellPlaceholder.svg",
  "images/freeCellPlaceholder1.svg",
  "images/heartFoundationPlaceholder-L.svg",
  "images/heartFoundationPlaceholder.svg",
  "images/info_scroll.svg",
  "images/KardLandLogo.svg",
  "images/KardLandLogoHorizontal.svg",
  "images/kingFoundationPlaceholder.svg",
  "images/klondike_regions.svg",
  "images/klondike_thumbnail.jpg",
  "images/KlondikeLabel.svg",
  "images/klondikeRedealPlaceholder.svg",
  "images/klondikeWastePlaceholder.svg",
  "images/paper_texture_dark.png",
  "images/paperTexture_grayscale.png",
  "images/paperTexture.png",
  "images/spadeFoundationPlaceholder-L.svg",
  "images/spadeFoundationPlaceholder.svg",
  "images/table_grayscale.jpg",
  "images/table.jpg",
  "images/walnut.jpg",
  "images/wenge.jpg",
  "scripts/fiftytwo.js",
  "scripts/freecell.js",
  "scripts/klondike.js",
  "scripts/modal.js",
  "apple-touch-icon.png",
  "favicon-96x96.png",
  "favicon.ico",
  "favicon.svg",
  "freecell.css",
  "freecell.html",
  "index.html",
  "kardland.css",
  "klondike.css",
  "klondike.html",
  "site.webmanifest",
  "web-app-manifest-192x192.png",
  "web-app-manifest-512x512.png",
  "/",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(cacheKey).then((cache) => {
      cache.addAll(assetsToCache);
    }),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      for (const key of keys) {
        if (key !== cacheKey) {
          caches.delete(key);
        }
      }
    }),
  );
});

const cacheFirst = async ({ request, fallbackUrl }) => {
  const responseFromCache = await caches.match(request);

  if (responseFromCache) {
    return responseFromCache;
  }

  try {
    const responseFromNetwork = await fetch(request);

    return responseFromNetwork;
  } catch (error) {
    // If the network request failed,
    // get the fallback response from the cache.
    const fallbackResponse = await caches.match(fallbackUrl);

    if (fallbackResponse) {
      return fallbackResponse;
    }

    // When even the fallback response is not available,
    // there is nothing we can do, but we must always
    // return a Response object.
    return new Response("Network error happened", {
      status: 408,
      headers: { "Content-Type": "text/plain" },
    });
  }
};

self.addEventListener("fetch", (event) => {
  event.respondWith(
    cacheFirst({
      request: event.request,
      fallbackUrl: "/",
    }),
  );
});
