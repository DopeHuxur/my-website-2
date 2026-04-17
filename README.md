# The Voyage ⚓

> *"Somewhere few care to map. An immersive
experience for those drawn to thoughtful design
and subtle poetry."*

An atmospheric portfolio built with pure HTML, CSS, and vanilla JavaScript.

![The Voyage Portfolio](https://img.shields.io/badge/status-live-gold?style=flat-square&color=c9a84c)
![HTML](https://img.shields.io/badge/HTML5-pure-c9a84c?style=flat-square)
![CSS](https://img.shields.io/badge/CSS3-vanilla-c9a84c?style=flat-square)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-c9a84c?style=flat-square)

---

## ✦ Features

- **Nautical Loading Screen** - animated horizon line with a sailing ship that crosses the screen before revealing the site
- **Full-Page Navigation** - smooth transitions between pages; supports click, scroll wheel, keyboard arrows, and touch swipe
- **Rotating Compass Rose** - large SVG compass fills the background with bright outer rings and letters, subtle inner star
- **Pirate Ship Progress Tracker** - a tiny SVG ship sails along a horizon line at the bottom, marking your position across all pages
- **Glass Effects** - `backdrop-filter` blur + saturation on nav, cards, and panels
- **Custom Cursor** - gold dot with lagging ring that expands on interactive elements
- **Dark / Light Mode Toggle** - preference persisted in `localStorage`
- **Film Grain + Vignette** - atmospheric texture overlays
- **Fully Responsive** - collapses gracefully on mobile

---

## ✦ Pages

| # | Route | Content |
|---|-------|---------|
| 0 | Port | Hero with name, alias, and tagline |
| 1 | Log | About / bio + skill groups (Frontend, Backend, Design) |
| 2 | Voyage | Work experience timeline |
| 3 | Chart | Project cards linking to GitHub repos |
| 4 | Signal | Contact + social links |

---

## ✦ Project Structure

```
the-voyage/
├── index.html           ← HTML shell - no inline styles or scripts
├── css/
│   ├── style.css        ← Design tokens, reset, compass, grain, keyframes
│   ├── components.css   ← Loader, cursor, nav, footer, progress tracker
│   └── pages.css        ← Per-page layouts + page transition system
└── js/
    ├── loader.js        ← Loading screen status cycling + dismissal
    ├── navigation.js    ← goTo(), progress tracker, all input methods
    └── main.js          ← Cursor lerp, theme toggle, hover states
```

---

## ✦ Getting Started

No build step required. Just open the file.

**Option 1 - Open directly:**
```bash
open index.html
```

**Option 2 - Local dev server (recommended to avoid CORS on fonts):**
```bash
# Using Python
python3 -m http.server 3000

# Using Node
npx serve .

# Using VS Code
# Install "Live Server" extension → right-click index.html → Open with Live Server
```

Then visit `http://localhost:3000`.

---

## ✦ Customisation

### Updating your details

All personal content lives in `index.html`. Search for these sections:

```html
<!-- PAGE 0: Home -->       → your name, alias, tagline
<!-- PAGE 1: About -->        → bio paragraphs, skill tags
<!-- PAGE 2: Experience -->    → experience entries
<!-- PAGE 3: Projects -->   → project cards + links
<!-- PAGE 4: Contact -->    → email link, social URLs
```

### Adding project links

Each project card is an `<a>` tag. Replace the `href` with your repo URL:

```html
<a class="proj-card" href="https://github.com/YOUR_USERNAME/YOUR_REPO"
   target="_blank" rel="noopener noreferrer">
```

The "View all expeditions" link at the bottom points to your GitHub profile:

```html
<a class="view-all" href="https://github.com/YOUR_USERNAME" target="_blank" ...>
```

### Changing the colour scheme

All colours are CSS custom properties in `css/style.css`:

```css
:root {
  --gold: #c9a84c;           /* primary accent colour */
  --gold-dim: rgba(...);     /* translucent fill for glass surfaces */
  --gold-border: rgba(...);  /* border colour for glass edges */
}
```

Change `--gold` to any hex value and everything updates automatically.

### Adding or removing pages

1. Add a new `<div class="page" id="page-N">` block in `index.html`
2. Add a nav `<button data-page="N">` entry
3. Add a `.progress-stop` dot and `.progress-label` entry to the tracker
4. Update `TOTAL_PAGES = 5` → your new count in `js/navigation.js`

---

## ✦ Navigation

| Input | Action |
|-------|--------|
| Click nav button | Go to page |
| Scroll wheel | Next / previous page |
| Arrow keys (↑ ↓ ← →) | Next / previous page |
| Touch swipe | Next / previous page |
| Click progress ship dot | - (visual only, not interactive) |

---

## ✦ Browser Support

| Browser | Support |
|---------|---------|
| Chrome 100+ | ✅ Full |
| Firefox 100+ | ✅ Full |
| Safari 15.4+ | ✅ Full (`backdrop-filter` supported) |
| Edge 100+ | ✅ Full |
| Mobile Safari / Chrome | ✅ Touch swipe supported |

> `backdrop-filter` may degrade gracefully on older browsers - the glass surfaces will appear as flat translucent panels.

---

## ✦ Performance

- Zero external JavaScript dependencies
- Fonts loaded via Google Fonts (2 families, 5 weights)
- All animations are CSS transforms or `opacity` - GPU accelerated
- No layout-triggering JS animations
- SVG compass is a single inline element - no image requests

---

## ✦ Deployment

**Vercel:**
```bash
npx vercel
```
Point it at the project root. Since there's no build step, it deploys instantly.

**Netlify (recommended):**
Drag and drop the `the-voyage/` folder into [netlify.com/drop](https://netlify.com/drop).

**GitHub Pages:**
```bash
# In your repo settings → Pages → deploy from branch → main → / (root)
```
Live at `https://YOUR_USERNAME.github.io/the-voyage`

---

## ✦ Roadmap

Future upgrades worth considering:

- [ ] Migrate to **Next.js 14** (App Router) + TypeScript
- [ ] Replace SVG compass with **Three.js** WebGL scene
- [ ] Add **GSAP ScrollTrigger** for richer page transitions
- [ ] Add **Lenis** smooth scroll
- [ ] Implement working contact form via **Resend** API
- [ ] Add **Playwright** smoke tests

---

## ✦ License

MIT - do whatever you want, just don't ship it as your own portfolio without changing the content.

---

*Built with care on distant shores - The Voyage, 2026*
