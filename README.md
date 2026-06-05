# fan_world_me — Portfolio

> Personal portfolio of Yaroslav, Full-Stack Developer. Glassmorphism design, Monocraft font, dark/light theme, EN/RU i18n, smooth animations.

![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-brightgreen)

## 🌐 Live

[fan-world-me.github.io](https://fan-world-me.github.io)

## ✨ Features

- **Monocraft font** — pixel-style monospace font for headings
- **Dark / Light theme** — toggle with smooth transitions, saved to localStorage
- **EN / RU language** — auto-detected by IP (ex-USSR → RU), saved to localStorage
- **Typing animation** — cycling job titles with blinking caret
- **Scroll progress bar** — gradient line at the top of the page
- **Cursor glow** — soft cyan glow following the cursor (desktop only)
- **Back to top** — button appears after scrolling 500px
- **Animated counters** — stat numbers count up on scroll-into-view
- **Glassmorphism UI** — glass-effect cards with backdrop blur
- **Scroll animations** — elements fade in via Intersection Observer
- **Hamburger menu** — full-screen overlay with centered links
- **Contact form** — Web3Forms integration (free, no backend)
- **SEO** — schema.org/Person JSON-LD, Open Graph, Twitter Cards
- **OG Image** — custom SVG preview card (1200×630)
- **Mobile-first** — fully responsive, touch-friendly

## 🛠 Stack

**Frontend:** HTML5, CSS3, Vanilla JavaScript  
**Fonts:** Monocraft, Inter, Fira Code  
**Hosting:** GitHub Pages  
**Form:** Web3Forms

## 📁 Structure

```
/
├── index.html          — main page
├── 404.html            — custom 404
├── og-image.svg        — OG preview image (1200×630)
├── icon.svg            — site favicon / PWA icon
├── manifest.json       — PWA manifest (not linked, kept for reference)
├── robots.txt          — search engine rules
├── sitemap.xml         — sitemap for Google
├── Monocraft.ttf       — Monocraft font
├── css/
│   ├── variables.css   — CSS variables + light theme overrides
│   ├── animations.css  — scroll-reveal keyframes
│   ├── mobile.css      — mobile layout + hamburger menu
│   └── form.css        — contact form styles
└── js/
    ├── theme.js        — dark/light toggle
    ├── i18n.js         — EN/RU translations + IP detection
    ├── animations.js   — Intersection Observer scroll effects
    └── effects.js      — progress bar, cursor glow, back-to-top, counters, typing
```

## 🚀 Local Development

```bash
npx serve -s . -l 8000
# open http://localhost:8000
```

## 📬 Contact

- **Telegram:** [@fan_world_me](https://t.me/fan_world_me)
- **Discord:** fan_world_me
- **Email:** yarik.kom2011@gmail.com
- **GitHub:** [fan-world-me](https://github.com/fan-world-me)

## 📄 License

[GNU General Public License v3.0](LICENSE)

---

Built with ❤️ by [Yaroslav](https://github.com/fan-world-me)
