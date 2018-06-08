const publicVapidKey = 'BF94IsDzQAlsR50YSmz3q59h_rKTSHyJjP7nfly6oFJIzWWiIk5UDbzRehnlxpygz-oyMt-mkhpYGVWuo1uxud8';

// Check for service working
if('serviceWorker' in navigator) {
    send().catch(err => console.error(err));
}

// Register SQ, Register Push, Send Push
async function send () {
    // Register Service Worker
    console.log('Registering service worker...');
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    console.log('Service Worker Registered...');

    // Register Push
    console.log('Registering Push...');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey:  urlBase64ToUint8Array(publicVapidKey)
    });
    console.log('Push Registered ');

    // Send push notification
    console.log('Sending push')

    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers:{
            'content-type': 'application/json'
        }
    });

    console.log('Push sent...')
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }