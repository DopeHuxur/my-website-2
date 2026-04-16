/* loader.js - LOADING SCREEN LOGIC
   Cycles through nautical status messages then fades out
   the loader and reveals the site after ~3.2s
   The Voyage // Portfolio of DopeHuxur */

(function initLoader() {
    const LOADER_DURATION = 3200; // ms before loader hides
    const STATUS_INTERVAL = 700;  // ms between status message changes

    const statusMessages = [
        'Setting sail…',
        'Charting course…',
        'Reading the stars…',
        'Anchors aweigh…',
    ];

    const loaderEl  = document.getElementById('loader');
    const statusEl  = document.getElementById('loaderStatus');

    if (!loaderEl || !statusEl) return;

    let messageIndex = 0;

    // CYCLE STATUS TEXT WITH FADE TRANSITION
    const statusInterval = setInterval(() => {
        messageIndex = (messageIndex + 1) % statusMessages.length;

        statusEl.style.opacity = '0';

        setTimeout(() => {
        statusEl.textContent = statusMessages[messageIndex];
        statusEl.style.opacity = '1';
        }, 300);
    }, STATUS_INTERVAL);

    // DISMISS LOADER AFTER LOADER_DURATION
    setTimeout(() => {
        clearInterval(statusInterval);
        loaderEl.classList.add('hidden');
    }, LOADER_DURATION);
})();
