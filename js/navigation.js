/* navigation.js - PAGE TRANSITION ENGINE + PROGRESS TRACKER
   Handles: goTo(), updateProgress(), all input methods
   (nav buttons, wheel, keyboard arrows, touch swipe)
   The Voyage // Portfolio of DopeHuxur */

(function initNavigation() {
    /* CONFIG */
    const TOTAL_PAGES = 5;
    const ANIM_DURATION = 720;  // ms - matches CSS --tr duration
    const ENTER_DELAY = 55;   // ms - stagger between exit start and enter start
    const WHEEL_COOLDOWN = 880;  // ms - prevent rapid wheel firing
    const SWIPE_THRESHOLD = 44;  // px - minimum swipe distance to trigger
    const MOBILE_BP = 768; // px — must match CSS breakpoint

    /* STATE */
    let current = 0;
    let animating = false;

    /* DOM REFERENCES */
    const pageEls = document.querySelectorAll('.page');
    const progressFill = document.getElementById('progressFill');
    const shipMarker = document.getElementById('shipMarker');
    const progressStops = document.querySelectorAll('.progress-stop');
    const progressLabels = document.querySelectorAll('.progress-label');
    const navButtons = document.querySelectorAll('.nav-links button');
    /* ── IS MOBILE?????? ── */
    function isMobile() { return window.innerWidth <= MOBILE_BP; }

    /* updateProgress (SYNCS TRACKER AND NAV STATE) */
    function updateProgress(idx) {
        // GOLD FILL LINE WIDTH
        const pct = (idx / (TOTAL_PAGES - 1)) * 100;
        if (progressFill) progressFill.style.width = pct + '%';

        // SHIP POSITION ALONG THE TRACK
        if (shipMarker) shipMarker.style.left = pct + '%';

        // STOP DOTS FOR GOLD IF PASSED OR CURRENT
        progressStops.forEach((stop, i) => {
        stop.classList.toggle('passed', i <= idx);
        });

        // PROGRESS LABELS (HIGHLIGHT CURRENT)
        progressLabels.forEach((label, i) => {
        label.classList.toggle('active', i === idx);
        });

        // NAV BUTTONS (UNDERLINE ACTIVE)
        navButtons.forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.page) === idx);
        });

        // SYNC MOBILE MENU ITEMS
        document.querySelectorAll('.mobile-menu-item').forEach(item => {
            item.classList.toggle('active', parseInt(item.dataset.page) === idx);
        });
    }

    /* goTo (CORE PAGE TRANSITION FUNCTION) */
    function goTo(next) {
        if (isMobile()) {
            // SCROLL TO SECTION INSTEAD OF ANIMATING ON MOBILE
            scrollToPage(next);
            return;
        }
        // GUARD: SAME PAGE OR MID-ANIMATION
        if (next === current || animating) return;
        // GUARD: OUT OF BOUNDS
        if (next < 0 || next >= TOTAL_PAGES) return;

        animating = true;
        const direction = next > current ? 'up' : 'down';
        const prev = current;
        current = next;

        // EXIT CURRENT PAGE
        pageEls[prev].classList.remove('active');
        pageEls[prev].classList.add(direction === 'up' ? 'exit-up' : 'exit-down');

        // ENTER NEXT PAGE AFTER SHORT STAGGER
        setTimeout(() => {
        pageEls[next].classList.remove('exit-up', 'exit-down');
        pageEls[next].classList.add('active');
        }, ENTER_DELAY);

        // UPDATE PROGRESS TRACKER IMMEDIATELY
        updateProgress(next);

        // CLEAN UP CLASSES AND UNLOCK AFTER ANIMATION DURATION
        setTimeout(() => {
        pageEls[prev].classList.remove('exit-up', 'exit-down', 'active');
        animating = false;
        }, ANIM_DURATION);
    }

    /* scrollToPage (SMOOTH SCROLL TO SECTION ON MOBILE) */
    function scrollToPage(idx) {
        const target = document.getElementById('page-' + idx);
        if (!target) return;
        current = idx;
        updateProgress(idx);
        // OFFSET FOR FIXED NAV (~66px)
        const offset = target.getBoundingClientRect().top + window.scrollY - 66;
        window.scrollTo({ top: offset, behavior: 'smooth' });
    }

    /* UPDATE PROGRESS BASED ON SCROLL POSITION ON MOBILE */
    const scrollObserver = new IntersectionObserver(entries => {
        if (!isMobile()) return;
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            const idx = parseInt(entry.target.id.replace('page-', ''));
            if (!isNaN(idx) && idx !== current) {
            current = idx;
            updateProgress(idx);
            }
        }
        });
    }, { threshold: 0.4 }); // 40% VISIBLE = ACTIVE

    pageEls.forEach(p => scrollObserver.observe(p));

    /* LOCK/UNLOCK BODY SCROLL FOR DESKTOP */
    function applyScrollLock() {
        if (isMobile()) {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        } else {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        }
    }

    applyScrollLock();
    window.addEventListener('resize', applyScrollLock);

    /* INPUT: BUTTON CLICKS (NAV + data-page CTAs) */
    document.querySelectorAll('[data-page]').forEach(btn => {
        if (btn.tagName === 'BUTTON') {
        btn.addEventListener('click', () => {
            goTo(parseInt(btn.dataset.page));
        });
        }
    });

    /* INPUT: KEYBOARD ARROW KEYS */
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        goTo(Math.min(current + 1, TOTAL_PAGES - 1));
        }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        goTo(Math.max(current - 1, 0));
        }
    });

    /* INPUT: MOUSE WHEEL WITH COOLDOWN LOCK */
    let wheelLocked = false;

    document.addEventListener('wheel', e => {
        if (isMobile()) return;
        if (wheelLocked) return;
        wheelLocked = true;

        if (e.deltaY > 0) {
            goTo(Math.min(current + 1, TOTAL_PAGES - 1));
        } else {
            goTo(Math.max(current - 1, 0));
        }

        setTimeout(() => { wheelLocked = false; }, WHEEL_COOLDOWN);
    }, { passive: true });

    /* INPUT: TOUCH SWIPE */
    let touchStartY = null;

    document.addEventListener('touchstart', e => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', e => {
        if (isMobile() || touchStartY === null) return;

        const delta = touchStartY - e.changedTouches[0].clientY;

        if (Math.abs(delta) > SWIPE_THRESHOLD) {
            if (delta > 0) {
                goTo(Math.min(current + 1, TOTAL_PAGES - 1));
            } else {
                goTo(Math.max(current - 1, 0));
            }
        }

        touchStartY = null;
    }, { passive: true });

    /* INITIALISE */
    updateProgress(0);

})();