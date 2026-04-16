(function initMain() {

    /* SEXY ROUND CIRCLE FOLLOWING DOT CURSOR */
    const cursorDot  = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursorRing');

    // MOUSE POSITION (snapped)
    let mouseX = 0, mouseY = 0;
    // RING POSITION (lerped)
    let ringX  = 0, ringY  = 0;

    // MOUSE TRACKER
    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top  = mouseY + 'px';
    });

    // RING LERP TOWARD MOUSE
    (function lerpRing() {
        ringX += (mouseX - ringX) * 0.11;
        ringY += (mouseY - ringY) * 0.11;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top  = ringY + 'px';
        requestAnimationFrame(lerpRing);
    })();

    // RING EXPANSION POWERED BY GOJO SATORU
    const interactiveSelectors = [
        'a',
        'button',
        '.proj-card',
        '.skill-tag',
        '.exp-tag',
        '.social-link',
    ].join(', ');

    document.querySelectorAll(interactiveSelectors).forEach(el => {
        el.addEventListener('mouseenter', () => {
        cursorRing.style.width       = '48px';
        cursorRing.style.height      = '48px';
        cursorRing.style.borderColor = 'rgba(201, 168, 76, 0.65)';
        });
        el.addEventListener('mouseleave', () => {
        cursorRing.style.width       = '28px';
        cursorRing.style.height      = '28px';
        cursorRing.style.borderColor = 'rgba(201, 168, 76, 0.42)';
        });
    });

    /* DARK MODE VS WHITE MODE ENJOYER TOGGLE */
    const themeToggle = document.getElementById('themeToggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
        const html = document.documentElement;
        html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';

        // PREFERNCE PERSISTENCE ON PAGE REFRESH
        try {
            localStorage.setItem('voyage-theme', html.dataset.theme);
        } catch (_) {
            // WHEN localStorage IS UNAVAILABLE SILENTLY FAIL AND CONTINUE WITHOUT PERSISTENCE
        }
        });
    }

    /* RESTORE SAVED THEME PREFERENCE ON LOAD */
    try {
        const saved = localStorage.getItem('voyage-theme');
        if (saved && (saved === 'light' || saved === 'dark')) {
        document.documentElement.dataset.theme = saved;
        }
    } catch (_) {
        // SILENTLY FALL BACK TO DEFAULT THEME
    }

})();
