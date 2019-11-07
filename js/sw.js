this.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open('site-store').then(function(cache) {
        return cache.addAll([
            '/favicon.ico', '/index.html', '/about.html', '/music.html', '/shop.html', '/contacts.html', '/404.html',
            '/css/app.css',
            '/js/app.js', '/js/audio.js',
            '/img/header.jpg', '/img/logo-og.jpg',
            '/img/icons/gb.svg', '/img/icons/i.svg', '/img/icons/sc.svg', '/img/icons/tg.svg', '/img/icons/tt.svg',
            '/audio/cover.jpg', '/audio/icon.png',
            '/audio/его руки дрожат.MP3', '/audio/скоро всё наладится.MP3', '/audio/тяжело быть мной.MP3', 
            '/audio/забудь мою мечту.MP3', '/audio/сон смешного человека.MP3', '/audio/хватит быть собой.MP3', 
            '/audio/внутри океана.MP3', '/audio/красная помада.MP3', '/audio/тихо плачет воробей.MP3', 
            '/audio/голова затуманена небом.MP3', '/audio/останови меня.MP3', '/audio/трещина ползёт вниз.MP3'
        ])
      })
    );
});
   
this.addEventListener('fetch', function(e) {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    )
});