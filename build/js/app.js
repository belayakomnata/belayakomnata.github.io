if('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/js/sw.js')
        .then(() => { console.log('Service Worker Registered'); });
}

let deffer;
const pwaBtn = document.getElementById("pwa-btn");

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deffer = e;
  
    pwaBtn.addEventListener('click', (ec) => {
        pwaBtn.style.display = 'none';
        deffer.prompt();
        deffer.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the prompt');
            } else {
                console.log('User dismissed the prompt');
            }
            deffer = null;
        });
    });
});