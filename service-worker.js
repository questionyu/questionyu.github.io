// Copyright 2016 Google Inc.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const cacheName = 'real-neo';
const filesToCache = [
    '/',
    '/js/affix.js?v=7.1.0',
    '/js/exturl.js?v=7.1.0',
    '/lib/jquery/index.js?v=2.1.3',
    '/lib/fancybox/source/jquery.fancybox.pack.js',
    '/lib/jquery_lazyload/jquery.lazyload.js?v=1.9.7',
    '/js/motion.js?v=7.1.0',
    '/js/next-boot.js?v=7.1.0',
    '/js/schemes/pisces.js?v=7.1.0',
    '/lib/quicklink/dist/quicklink.umd.js',
    '/js/utils.js?v=7.1.0',
    '/lib/velocity/velocity.min.js?v=1.2.1',
    '/lib/velocity/velocity.ui.min.js?v=1.2.1',
    '/uploads/avatar.jpg',
    '/images/cc-by-nc-sa.svg',
    '/lib/font-awesome/css/font-awesome.min.css?v=4.6.2',
    '/lib/fancybox/source/jquery.fancybox.css',
    '/css/main.css?v=7.1.0',
    '/lib/font-awesome/fonts/fontawesome-webfont.woff2?v=4.7.0',
    '/favicon.ico'
];

/**
 * installation event: it adds all the files to be cached
 */
self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

/**
 * activation of service worker: it removes all cashed files if necessary
 */
self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
    console.log('[Service Worker] Fetch', event.request.url);
    var regex = /https\:\/\/real\-neo\.me\/[\s\S]*\.html/i;
    if (event.request.url.match(regex)) {
        // Generic fallback + save cache
        console.log('::::::::::::::::::1 - starting');
        event.respondWith(async function () {
            console.log('::::::::::::::::::1 - responding');
            const cachedResponse = await caches.match(event.request);

            if (cachedResponse) return cachedResponse;

            try {
                const cache = await caches.open('real-neo');
                const networkResponsePromise = fetch(event.request);
                const networkResponse = await networkResponsePromise;
                await cache.put(event.request, networkResponse.clone());
                console.log('::::::::::::::::::1 - network');
                return networkResponsePromise;
            } catch (e) {
                console.log('::::::::::::::::::1 - Error, cache');
                return caches.match('/images/default-avatar.png');
            }
        }());
    } else {
        // Network falling back to cache
        console.log('::::::::::::::::::2 - starting');
        event.respondWith(async function () {
            console.log('::::::::::::::::::2 - responding');
            try {
                const cache = await caches.open('real-neo');
                const networkResponsePromise = fetch(event.request);
                const networkResponse = await networkResponsePromise;
                await cache.put(event.request, networkResponse.clone());
                console.log('::::::::::::::::::2 - network');
                return networkResponsePromise;
            } catch (e) {
                console.log('::::::::::::::::::2 - Error, cache');
                return caches.match(event.request);
            }
        }());
    }
});
