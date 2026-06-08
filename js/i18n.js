(function () {
  const LANG_KEY      = 'portfolio-lang';
  const LANG_SRC_KEY  = 'portfolio-lang-src'; // 'ip' | 'user' — how lang was set

  const USSR = ['RU','UA','BY','KZ','UZ','AZ','GE','AM','TM','TJ','KG','MD','LT','LV','EE'];

  const T = {
    en: {
      'nav.skills':            'Skills',
      'nav.portfolio':         'Portfolio',
      'nav.about':             'About',
      'nav.contact':           'Contact',
      'hero.tag':              'Available for work',
      'hero.greeting':         "Hi, I'm ",
      'hero.title':            'Full-Stack Developer',
      'hero.sub':              'I build web applications, backend services, and everything in between — from pixel-perfect frontends to scalable APIs and databases.',
      'skills.label':          '// what I work with',
      'skills.title':          'Skills & Technologies',
      'about.label':           '// about me',
      'about.title':           'Who I am',
      'about.p1':              "I'm a full-stack developer with experience across the entire stack — from crafting responsive UIs to building robust backend services and working with databases.",
      'about.p2':              "I enjoy working with asynchronous and multi-threaded systems, building APIs with FastAPI, and containerizing applications with Docker.",
      'about.p3':              "Always learning, always building.",
      'about.stat1':           'Languages & Frameworks',
      'about.stat2':           'Stack Developer',
      'about.stat3':           'PostgreSQL & SQL',
      'about.stat4':           'Passion for Code',
      'portfolio.label':       '// my work',
      'portfolio.title':       'Portfolio',
      'portfolio.desc':        'Selected projects — from Minecraft mods to AI tools and hardware hacks.',
      'portfolio.btn':         'View all repositories →',
      'proj.multitools.desc':  'Client-side Fabric mod for Minecraft 1.21.11. Hotbar automation, elytra combos, mace PvP helpers and a Mod Menu settings screen.',
      'proj.quizai.desc':      'AI-powered quiz and answer system. Ask questions, get smart answers — built with modern JavaScript.',
      'proj.vacuum.desc':      'Control a Tuya smart robot vacuum with an Xbox 360 joystick via Python. Real hardware meets game controllers.',
      'proj.portfolio.title':  'This Portfolio',
      'proj.portfolio.desc':   'Glassmorphism design, Monocraft font, dark/light theme, EN/RU i18n, typing animation and smooth scroll effects. Pure vanilla stack.',
      'proj.private':          'Private repository',
      'contact.label':         '// get in touch',
      'contact.title':         "Let's work together",
      'contact.desc':          'Have a project in mind? Feel free to reach out.',
      'contact.name':          'Name',
      'contact.email':         'Email',
      'contact.subject':       'Subject',
      'contact.message':       'Message',
      'contact.submit':        'Send Message',
    },
    ru: {
      'nav.skills':            'Навыки',
      'nav.portfolio':         'Портфолио',
      'nav.about':             'Обо мне',
      'nav.contact':           'Контакты',
      'hero.tag':              'Открыт для работы',
      'hero.greeting':         'Привет, я ',
      'hero.title':            'Full-Stack разработчик',
      'hero.sub':              'Я создаю веб-приложения, бэкенд-сервисы и всё что между ними — от пиксельно точных интерфейсов до масштабируемых API и баз данных.',
      'skills.label':          '// с чем я работаю',
      'skills.title':          'Навыки и технологии',
      'about.label':           '// обо мне',
      'about.title':           'Кто я',
      'about.p1':              'Я full-stack разработчик с опытом на всём стеке — от создания адаптивных интерфейсов до надёжных бэкенд-сервисов и баз данных.',
      'about.p2':              'Мне нравится работать с асинхронными и многопоточными системами, создавать API на FastAPI и контейнеризировать приложения с Docker.',
      'about.p3':              'Всегда учусь, всегда создаю.',
      'about.stat1':           'Языков и фреймворков',
      'about.stat2':           'Stack разработчик',
      'about.stat3':           'PostgreSQL & SQL',
      'about.stat4':           'Страсть к коду',
      'portfolio.label':       '// мои работы',
      'portfolio.title':       'Портфолио',
      'portfolio.desc':        'Избранные проекты — от Minecraft-модов до AI-инструментов и аппаратных хаков.',
      'portfolio.btn':         'Посмотреть репозитории →',
      'proj.multitools.desc':  'Клиентский Fabric-мод для Minecraft 1.21.11. Автоматизация хотбара, элитра-комбо, помощник в PvP с булавой и встроенный экран настроек.',
      'proj.quizai.desc':      'AI-система для викторин и ответов. Задавай вопросы — получай умные ответы. Написана на современном JavaScript.',
      'proj.vacuum.desc':      'Управление роботом-пылесосом Tuya через джойстик Xbox 360 с помощью Python. Реальное железо + геймпад.',
      'proj.portfolio.title':  'Это портфолио',
      'proj.portfolio.desc':   'Дизайн в стиле гласморфизм, шрифт Monocraft, тёмная/светлая тема, i18n EN/RU, анимация печати и плавные эффекты. Чистый vanilla-стек.',
      'proj.private':          'Приватный репозиторий',
      'contact.label':         '// связаться',
      'contact.title':         'Давайте работать вместе',
      'contact.desc':          'Есть проект? Напишите мне.',
      'contact.name':          'Имя',
      'contact.email':         'Email',
      'contact.subject':       'Тема',
      'contact.message':       'Сообщение',
      'contact.submit':        'Отправить',
    }
  };

  const PLACEHOLDERS = {
    en: {
      'ph.name':    'Your name',
      'ph.subject': "What's this about?",
      'ph.message': 'Your message...',
    },
    ru: {
      'ph.name':    'Ваше имя',
      'ph.subject': 'О чём вы?',
      'ph.message': 'Ваше сообщение...',
    }
  };

  let currentLang = 'en';

  function applyLang(lang, animate, save = true) {
    currentLang = lang;
    if (save) localStorage.setItem(LANG_KEY, lang);
    document.documentElement.setAttribute('lang', lang);

    const t  = T[lang];
    const ph = PLACEHOLDERS[lang];

    if (animate) {
      document.querySelectorAll('[data-i18n]').forEach(el => el.classList.add('lang-fade'));
    }

    const doUpdate = () => {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) el.textContent = t[key];
        if (animate) {
          el.classList.remove('lang-fade');
          el.classList.add('lang-fade-in');
          setTimeout(() => el.classList.remove('lang-fade-in'), 300);
        }
      });
      document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        if (ph[key] !== undefined) el.placeholder = ph[key];
      });
      updateLangUI(lang);
    };

    if (animate) setTimeout(doUpdate, 150);
    else doUpdate();
  }

  function updateLangUI(lang) {
    document.querySelectorAll('.lang-option').forEach(el => {
      el.classList.toggle('active', el.getAttribute('data-lang') === lang);
    });
    document.querySelectorAll('.lang-switcher').forEach(sw => {
      sw.setAttribute('data-lang', lang);
    });
  }

  async function detectByIP() {
    try {
      const ctrl  = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 3000);
      const res   = await fetch('https://ipapi.co/json/', { signal: ctrl.signal });
      clearTimeout(timer);
      const data  = await res.json();
      return USSR.includes(data.country_code) ? 'ru' : 'en';
    } catch {
      return 'en';
    }
  }

  async function init() {
    const saved = localStorage.getItem(LANG_KEY);

    const src = localStorage.getItem(LANG_SRC_KEY);

    if (saved && src === 'user') {
      // User explicitly clicked the switcher — respect their choice
      applyLang(saved, false);
    } else {
      // No explicit user choice (first visit OR old auto-save bug):
      // render immediately with saved/default, then detect by IP and save
      applyLang(saved || 'en', false, false);
      detectByIP().then(detected => {
        localStorage.setItem(LANG_SRC_KEY, 'ip');
        applyLang(detected, false, true);
      });
    }

    document.querySelectorAll('.lang-switcher').forEach(sw => {
      sw.addEventListener('click', () => {
        const next = currentLang === 'en' ? 'ru' : 'en';
        localStorage.setItem(LANG_SRC_KEY, 'user'); // mark as explicit choice
        applyLang(next, true);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', init);
  window.i18n = { applyLang };
})();
