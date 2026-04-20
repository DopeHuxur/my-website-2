/* main.js - CURSOR, THEME TOGGLE, INTERACTIVE HOVER STATES
   The Voyage // Portfolio of DopeHuxur */

(function initMain() {

    const MOBILE_BP = 768;
    function isMobile() { return window.innerWidth <= MOBILE_BP; }

    /* SEXY ROUND CIRCLE FOLLOWING DOT CURSOR */
    const cursorDot  = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;

    function enableCursor() {
        document.body.style.cursor = 'none';
        if (cursorDot)  cursorDot.style.display  = 'block';
        if (cursorRing) cursorRing.style.display = 'block';
    }
    function disableCursor() {
        document.body.style.cursor = '';
        if (cursorDot)  cursorDot.style.display  = 'none';
        if (cursorRing) cursorRing.style.display = 'none';
    }

    // MOUSE TRACKER
    document.addEventListener('mousemove', e => {
        if (isMobile()) return;
        mx = e.clientX; my = e.clientY;
        cursorDot.style.left = mx + 'px';
        cursorDot.style.top  = my + 'px';
        enableCursor();
    });

    // RING LERP TOWARD MOUSE (Stand proud, you can larp)
    (function lerpRing() {
        rx += (mx - rx) * 0.11;
        ry += (my - ry) * 0.11;
        if (cursorRing) {
        cursorRing.style.left = rx + 'px';
        cursorRing.style.top  = ry + 'px';
        }
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
            if (isMobile() || !cursorRing) return;
            cursorRing.style.width       = '48px';
            cursorRing.style.height      = '48px';
            cursorRing.style.borderColor = 'rgba(201, 168, 76, 0.65)';
        });
        el.addEventListener('mouseleave', () => {
            if (isMobile() || !cursorRing) return;
            cursorRing.style.width       = '28px';
            cursorRing.style.height      = '28px';
            cursorRing.style.borderColor = 'rgba(201, 168, 76, 0.42)';
        });
    });

    // HIDE CURSOR ON TOUCH DEVICES
    document.addEventListener('touchstart', disableCursor, { passive: true });
    window.addEventListener('resize', () => { if (isMobile()) disableCursor(); });

    /* DARK MODE VS WHITE MODE ENJOYER TOGGLE */
    function toggleTheme() {
        const html = document.documentElement;
        html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem('voyage-theme', html.dataset.theme); } catch (_) {}
    }

    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
    document.getElementById('themeToggleMobile')?.addEventListener('click', toggleTheme);

    /* RESTORE SAVED THEME PREFERENCE ON LOAD */
    try {
        const saved = localStorage.getItem('voyage-theme');
        if (saved === 'light' || saved === 'dark') {
            document.documentElement.dataset.theme = saved;
        }
    } catch (_) {}

    /* HAMBURGER MENU */
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    let menuOpen = false;

    function openMenu() {
        menuOpen = true;
        hamburger.classList.remove('closing');
        hamburger.classList.add('open');
        mobileMenu.classList.add('open');
        document.addEventListener('click', outsideClickHandler);
    }

    function closeMenu() {
        menuOpen = false;
        hamburger.classList.remove('open');
        hamburger.classList.add('closing');
        mobileMenu.classList.remove('open');
        // REMOVE CLOSING CLASS AFTER ANIMATION
        setTimeout(() => hamburger.classList.remove('closing'), 500);
        document.removeEventListener('click', outsideClickHandler);
    }

    function outsideClickHandler(e) {
        if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
        }
    }

    hamburger?.addEventListener('click', e => {
        e.stopPropagation();
        menuOpen ? closeMenu() : openMenu();
    });

    // CLOSE MOBILE MENU ON ITEM CLICK
    document.querySelectorAll('.mobile-menu-item').forEach(item => {
        item.addEventListener('click', () => {
        closeMenu();
        });
    });

    // CLOSE ON RESIZE BACK TO DESKTOP
    window.addEventListener('resize', () => {
        if (!isMobile() && menuOpen) closeMenu();
    });

//MAY CHAOS TAKE THE WORLD (HOVER EFFECT)
    const chaosElement = document.getElementById('chaos-word');

    const normalText = "chaos.";
    const madnessText = "May chaos take the world!";

    chaosElement.addEventListener('mouseenter', () => {
        chaosElement.textContent = madnessText;
        chaosElement.classList.add('frenzied-flame');
    });

    chaosElement.addEventListener('mouseleave', () => {
        chaosElement.textContent = normalText;
        chaosElement.classList.remove('frenzied-flame');
    });
    
})();