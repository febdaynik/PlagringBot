const CACHE_NAME = "kn"
  , cacheList = ["index.html", "vue.min.js", "index.js", "reset.min.css", "index.css", "images/menu.svg", "images/favicon.png", "images/bookshelf.svg", "images/n.svg", "images/k.svg"];
this.addEventListener("install", function(e) {
    e.waitUntil(caches.open("kn").then(e=>e.addAll(cacheList)))
});
const CACHE_PREFIX = "kn-1";
this.addEventListener("activate", function(e) {
    e.waitUntil(caches.keys().then(e=>Promise.all(e.map(e=>{
        if (0 === e.indexOf("kn-1") && "kn" !== e)
            return caches.delete(e)
    }
    ))))
}),
this.addEventListener("fetch", function(e) {
    "GET" === e.request.method && 0 !== e.request.url.indexOf("http://") && -1 === e.request.url.indexOf("an.yandex.ru") && e.respondWith(caches.match(e.request, {
        ignoreSearch: !0
    }).then(function(n) {
        return n || fetch(e.request)
    }))
});
