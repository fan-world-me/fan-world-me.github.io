(function () {
  const THEME_KEY = 'portfolio-theme';
  const html = document.documentElement;

  function getPreferred() {
    return localStorage.getItem(THEME_KEY) || 'dark';
  }

  function setTheme(theme, animate) {
    if (animate) {
      html.classList.add('theme-transitioning');
      setTimeout(() => html.classList.remove('theme-transitioning'), 400);
    }
    html.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateUI(theme);
  }

  function updateUI(theme) {
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.setAttribute('data-theme', theme);
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  function toggle() {
    const cur = html.getAttribute('data-theme') || 'dark';
    setTheme(cur === 'dark' ? 'light' : 'dark', true);
  }

  setTheme(getPreferred(), false);

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.addEventListener('click', toggle);
    });
    updateUI(html.getAttribute('data-theme'));
  });

  window.themeManager = { setTheme, toggle };
})();
