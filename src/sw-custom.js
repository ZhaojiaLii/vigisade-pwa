const CACHE = 'pwa-angular-cache-v1';
const ROUTES_TO_CACHE = [
  '/',
  '/index.html',
  '/AvenirNext-Bold.woff',
  '/AvenirNext-Bold.woff2',
  '/AvenirNext-DemiBold.woff',
  '/AvenirNext-DemiBold.woff2',
  '/AvenirNext-Medium.woff',
  '/AvenirNext-Medium.woff2',
  '/AvenirNext-Regular.woff',
  '/AvenirNext-Regular.woff2',
  '/AvenirNext-UltraLight.woff',
  '/AvenirNext-UltraLight.woff2',
  '/assets/i18n/en.json',
  '/assets/i18n/fr.json',
  '/assets/i18n/es.json',
  '/assets/fonts/AvenirNext-Bold.woff',
  '/assets/fonts/AvenirNext-Bold.woff2',
  '/assets/fonts/AvenirNext-DemiBold.woff',
  '/assets/fonts/AvenirNext-DemiBold.woff2',
  '/assets/fonts/AvenirNext-Medium.woff',
  '/assets/fonts/AvenirNext-Medium.woff2',
  '/assets/fonts/AvenirNext-Regular.woff',
  '/assets/fonts/AvenirNext-Regular.woff2',
  '/assets/fonts/AvenirNext-UltraLight.woff',
  '/assets/fonts/AvenirNext-UltraLight.woff2',
  '/assets/icons/Google.svg',
  '/assets/icons/Sade.svg',
  '/favicon.ico',
  '/manifest.json',
  // '/main.js',
  // '/polyfills.js',
  // '/runtime.js',
  // '/styles.js',
  // '/vendor.js',
  // '/es2015-polyfills.js',
  // '/main.js/main.js.map',
  // '/es2015-polyfills.js/es2015-polyfills.js.map',
  // '/polyfills.js/polyfills.js.map',
  // '/runtime.js/runtime.js.map',
  // '/styles.js/styles.js.map',
  // '/vendor.js/vendor.js.map',
  // '/sw-custom.js'
  // '/scss/common/card.scss',
  // '/scss/common/footer.scss',
  // '/scss/common/form.scss',
  // '/scss/common/global.scss',
  // '/scss/common/menu.scss',
  // '/scss/mixins/mixins.scss',
  // '/scss/setup/_bootstrap.scss',
  // '/scss/setup/_override.scss',
  // '/scss/styles.scss',
];
let data;
let our_db;
openDatabase();
self.addEventListener('install',function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(ROUTES_TO_CACHE);
    }).then(function () {
      self.skipWaiting();
    })
  )
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(key){
        if(key !== CACHE){
          // console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }))
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  const req = event.request.clone();
  if (req.method === "POST") {
    event.respondWith(
      fetch(event.request.clone())
        .catch(function () {
        // console.log('error when POST in fetch listener', error);
        if (data) {
          savePostRequests(event.request.clone().url, data, 'POST');
        }
      }));
  }
});

self.addEventListener('message', function(event){
  if (event.data.hasOwnProperty('POSTdata')) {
    data = event.data.POSTdata;
  }
});

self.addEventListener('sync', function(event) {
  // console.log("background sync event fired: ", event);
  if (event.tag === 'syncLoginPOST') {
    event.waitUntil(
      sendPostToServer()
    )
  }
  if (event.tag === 'syncVisitPOST') {
    event.waitUntil(
      sendPostToServer()
    )
  }
  if (event.tag === 'syncDangerousPOST') {
    event.waitUntil(
      sendPostToServer()
    )
  }
});

function openDatabase () {
  const indexedDBOpenRequest = indexedDB.open('pwaDB', 1);
  indexedDBOpenRequest.onerror = function (error) {
    console.error('IndexedDB error:', error)
  };
  indexedDBOpenRequest.onupgradeneeded = function () {
    this.result.createObjectStore('post_requests', {autoIncrement:  true, keyPath: 'id' })
  };
  indexedDBOpenRequest.onsuccess = function () {
    our_db = this.result
  }
}

function getObjectStore (storeName, mode) {
  return our_db.transaction(storeName,mode).objectStore(storeName)
}

function savePostRequests (url, payload, method) {
  const request = getObjectStore('post_requests', 'readwrite').add({
    url: url,
    payload: payload,
    method: method,
  });
  request.onsuccess = function (event) {
    // console.log('a new pos_request has been added to indexedb', event)
  };
  request.onerror = function (error) {
    console.error(error)
  }
}

function sendPostToServer () {
  const savedRequests = [];
  const req = getObjectStore('post_requests').openCursor();
  req.onsuccess = async function (event) {
    const cursor = event.target.result;
    if (cursor) {
      savedRequests.push(cursor.value);
      cursor.continue()
    } else {
      for (let savedRequest of savedRequests) {
        const requestUrl = savedRequest.url;
        const payload = JSON.stringify(savedRequest.payload);
        const method = savedRequest.method;
        let token;
        token = await cookieStore.get('vigisade-tkn');
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`
        };
        fetch(requestUrl, {
          headers: headers,
          method: method,
          body: payload
        }).then(function (response) {
          // console.log('server response', response);
          if (response.status < 400) {
            // console.log(`request sync finished`);
            getObjectStore('post_requests', 'readwrite').delete(savedRequest.id);
          }
        }).catch(function (error) {
          console.error('Send to Server failed:', error);
          throw error
        })
      }
    }
  }
}

function sendGetToServer () {
  const savedRequests = [];
  const req = getObjectStore('post_requests').openCursor();
  req.onsuccess = async function (event) {
    const cursor = event.target.result;
    if (cursor) {
      savedRequests.push(cursor.value);
      cursor.continue()
    } else {
      for (let savedRequest of savedRequests) {
        const requestUrl = savedRequest.url;
        const method = savedRequest.method;
        let token;
        token = await cookieStore.get('vigisade-tkn');
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`
        };
        fetch(requestUrl, {
          headers: headers,
          method: method,
        }).then(function (response) {
          // console.log('server response', response);
          if (response.status < 400) {
            console.log(`request sync finished`);
            getObjectStore('post_requests', 'readwrite').delete(savedRequest.id);
          }
        }).catch(function (error) {
          console.error('Send to Server failed:', error);
          throw error
        })
      }
    }
  }
}
