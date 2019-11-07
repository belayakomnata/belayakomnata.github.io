if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
}

let deffer;
const pwaBtn = document.getElementById("pwa-btn");

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deffer = e;
  
    pwaBtn.addEventListener('click', (ec) => {
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