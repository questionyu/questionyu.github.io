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
    '/css/main.css?v=7.1.0',
    '/js/affix.js?v=7.1.0',
    '/js/exturl.js?v=7.1.0',
    '/js/motion.js?v=7.1.0',
    '/js/next-boot.js?v=7.1.0',
    '/js/schemes/pisces.js?v=7.1.0',
    '/js/utils.js?v=7.1.0',
    '/lib/fancybox/source/jquery.fancybox.css',
    '/lib/fancybox/source/jquery.fancybox.pack.js',
    '/lib/font-awesome/css/font-awesome.min.css?v=4.6.2',
    '/lib/font-awesome/fonts/fontawesome-webfont.woff2?v=4.7.0',
    '/lib/jquery/index.js?v=2.1.3',
    '/lib/jquery_lazyload/jquery.lazyload.js?v=1.9.7',
    '/lib/quicklink/dist/quicklink.umd.js',
    '/lib/velocity/velocity.min.js?v=1.2.1',
    '/lib/velocity/velocity.ui.min.js?v=1.2.1',
    '/uploads/avatar.jpg',
    '/images/cc-by-nc-sa.svg',
    '/images/quote-l.svg',
    '/images/quote-r.svg',
    '/images/searchicon.png',
    '/favicon.ico',
    '/manifest.json',
    '/atom.xml',
    '/search.xml',
    '/sitemap.xml',
    '/offline.html',
    '/JetBrains.html',
    '/404.html',
    '/233.html',
    '/4 种序列模式挖掘算法的比较分析.html',
    '/360SB.html',
    '/2015-Double-11.html',
    '/Apriori 的初步了解.html',
    '/BBU4161.html',
    '/BBU6404.html',
    '/BIRCH 的初步了解.html',
    '/BUPTIS-Office-365.html',
    '/Change-Comment-System-Again.html',
    '/Change-Comment-System.html',
    '/Changed-A-New-Domain.html',
    '/CNNIC-Forged-CA-Certificates.html',
    '/COM6506.html',
    '/COM6516.html',
    '/Computer-Internship.html',
    '/Config-OpenGL-Dev.html',
    '/Coursework-2015.html',
    '/Create-Localhost-Certificate.html',
    '/Date-Regex.html',
    '/DBSCAN 的初步了解.html',
    '/EBU4201.html',
    '/Fix-Ubuntu-Input-Method-Crash.html',
    '/Found-A-SB.html',
    '/Free-By-IPv6.html',
    '/Git-GPG-Signing-Commits.html',
    '/Half-Tramp.html',
    '/Hello-World.html',
    '/Install-Shadowsocks-Libev.html',
    '/K-means 的初步了解.html',
    '/K-means 的基本流程.html',
    '/Linux-Change-SSH-Port.html',
    '/macOS-Android-Platform-Tools.html',
    '/macOS-Input-Method-ZRM.html',
    '/macOS-Package-Manager-Homebrew.html',
    '/MI3TD-Merge-Partitions.html',
    '/number-of-1-bits.html',
    '/OxygenOS-Bus-Card.html',
    '/Python-Lecture-Notes.html',
    '/Python.html',
    '/Remove-Next-Gray-Border.html',
    '/Sorrow.html',
    '/The-Truth-About-Mirror.html',
    '/Typecho-Excerpt.html',
    '/Ubuntu-18-Startup.html',
    '/XX.html',
    '/假日随笔.html',
    '/博客遇上 Hexo.html',
    '/将 Hexo 源文件备份到 Github.html',
    '/移动对象轨迹序列模式挖掘.html',
    '/聚类算法的初步了解.html',
    '/about/',
    '/project/',
    '/project/origin.html',
    '/project/K-Means-5.html',
    '/project/K-Means-10.html',
    '/project/K-Means-15.html',
    '/project/BIRCH.html',
    '/project/DBSCAN.html',
    '/project/ST-DBSCAN-with-noise.html',
    '/project/ST-DBSCAN-without-noise.html',
    '/project/origin_data.txt',
    '/project/k_means_result_5.txt',
    '/project/k_means_result_10.txt',
    '/project/k_means_result_15.txt',
    '/project/birch_result_0.004.txt',
    '/project/dbscan_result_100_200.txt',
    '/project/st_dbscan_result.txt',
    '/project/st_dbscan_result_no_noise.txt',
    '/page/2',
    '/page/3',
    '/page/4',
    '/page/5',
    '/page/6',
    '/page/7',
    '/page/8',
    '/page/9',
    '/page/10',
    '/archives/',
    '/archives/page/2',
    '/archives/page/3',
    '/archives/page/4',
    '/archives/page/5',
    '/categories/',
    '/tags/'
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
    var blogDetail = /https\:\/\/real\-neo\.me\/[\s\S]*\.html/i;
    var blog = /https\:\/\/real\-neo\.me[\s\S]*/i;
    if (event.request.url.match(blogDetail)) {
        event.respondWith(async function () {
            const cachedResponse = await caches.match(event.request);
            if (cachedResponse) return cachedResponse;

            try {
                const cache = await caches.open('ins-dynamic');
                const networkResponsePromise = fetch(event.request);
                const networkResponse = await networkResponsePromise;
                await cache.put(event.request, networkResponse.clone());
                return networkResponsePromise;
            } catch (e) {
                return caches.match('/offline.html');
            }
        }());
    } else if (event.request.url.match(blog)) {
        event.respondWith(async function () {
            try {
                const cache = await caches.open('real-neo');
                const networkResponsePromise = fetch(event.request);
                const networkResponse = await networkResponsePromise;
                await cache.put(event.request, networkResponse.clone());
                return networkResponsePromise;
            } catch (e) {
                const cachedResponse = await caches.match(event.request);
                if (cachedResponse) return cachedResponse;
                return caches.match('/offline.html');
            }
        }());
    }
});
