// serviceWorkerRegistration.js


    if ('serviceWorker' in navigator) {
        const swCode = `
            self.addEventListener('install', (event) => {
                event.waitUntil(
                    caches.open('cycler-tracker-v1').then((cache) => {
                        return cache.addAll([
                            '/',
                            '/index.html',
                            '/styles.css',
                            '/app.js'
                        ]);
                    })
                );
            });

            self.addEventListener('fetch', (event) => {
                event.respondWith(
                    caches.match(event.request).then((response) => {
                        return response || fetch(event.request);
                    })
                );
            });
        `;

        const swBlob = new Blob([swCode], {type: 'application/javascript'});
        const swURL = URL.createObjectURL(swBlob);

        navigator.serviceWorker.register(swURL)
            .then(() => {
                console.log('Service Worker registered successfully');
                document.body.classList.add('sw-ready');
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
