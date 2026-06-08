/* =============================================
   SCROLL PROGRESS BAR
   ============================================= */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (window.pageYOffset / total) * 100 : 0) + '%';
  }, { passive: true });
}

/* =============================================
   BACK TO TOP BUTTON
   ============================================= */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.pageYOffset > 500);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* =============================================
   CURSOR GLOW (desktop only)
   ============================================= */
function initCursorGlow() {
  if (window.matchMedia('(hover: none)').matches) return;
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  let mx = 0, my = 0, gx = 0, gy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    glow.style.opacity = '1';
  }, { passive: true });

  document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });

  (function loop() {
    gx += (mx - gx) * 0.07;
    gy += (my - gy) * 0.07;
    glow.style.transform = `translate(${gx - 200}px,${gy - 200}px)`;
    requestAnimationFrame(loop);
  })();
}

/* =============================================
   ANIMATED COUNTERS
   ============================================= */
function animateCounter(el, raw, duration) {
  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) {
    el.classList.add('stat-pop');
    return;
  }
  const target = parseInt(match[1]);
  const suffix = match[2] || '';
  const start  = performance.now();

  (function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.round(eased * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  })(start);
}

function initCounters() {
  const els = document.querySelectorAll('.stat-number');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting || e.target.dataset.done) return;
      e.target.dataset.done = '1';
      animateCounter(e.target, e.target.dataset.val, 1400);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.6 });

  els.forEach(el => {
    el.dataset.val = el.textContent.trim();
    obs.observe(el);
  });
}

/* =============================================
   TYPING / CYCLING ANIMATION
   ============================================= */
function initTypingAnimation() {
  const el = document.querySelector('[data-i18n="hero.title"]');
  if (!el) return;

  const roles = {
    en: ['Full-Stack Developer', 'Backend Developer', 'Python Dev', 'Node.js Dev', 'API Builder'],
    ru: ['Full-Stack разработчик', 'Бэкенд разработчик', 'Python разработчик', 'Node.js разработчик']
  };

  let idx = 0, text = '', deleting = false, timer;

  function getLang() { return document.documentElement.getAttribute('lang') || 'en'; }
  function getList() { return roles[getLang()] || roles.en; }

  function tick() {
    const list   = getList();
    const full   = list[idx % list.length];
    text = deleting
      ? full.slice(0, text.length - 1)
      : full.slice(0, text.length + 1);

    const caret = (deleting || text.length < full.length) ? '<span class="caret">|</span>' : '<span class="caret caret-blink">|</span>';
    el.innerHTML = text + caret;

    let delay = deleting ? 38 : 75;
    if (!deleting && text === full)  { delay = 2400; deleting = true; }
    else if (deleting && text === '') { deleting = false; idx++; delay = 350; }

    timer = setTimeout(tick, delay);
  }

  // Restart when language changes
  const mo = new MutationObserver(() => {
    clearTimeout(timer);
    text = ''; deleting = false;
    setTimeout(tick, 300);
  });
  mo.observe(document.documentElement, { attributeFilter: ['lang'] });

  setTimeout(tick, 1000);
}

/* =============================================
   INIT
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initBackToTop();
  initCursorGlow();
  initCounters();
  initTypingAnimation();
});
