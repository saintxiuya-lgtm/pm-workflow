/* ============================================
   PM Workflow — main.js
   Theme toggle + smooth scroll
   ============================================ */

(function () {
  'use strict';

  /* --- Theme --- */
  var STORAGE_KEY = 'pm-workflow-theme';

  function getPreferedTheme() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  function updateThemeBtnText(theme) {
    var btns = document.querySelectorAll('.theme-toggle');
    btns.forEach(function (btn) {
      btn.textContent = theme === 'dark' ? '亮色' : '暗色';
    });
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    var next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
    updateThemeBtnText(next);
  }

  /* --- Init --- */
  function init() {
    var theme = getPreferedTheme();
    applyTheme(theme);
    updateThemeBtnText(theme);

    // Theme toggle buttons (topnav)
    var toggles = document.querySelectorAll('.theme-toggle');
    toggles.forEach(function (btn) {
      btn.addEventListener('click', toggleTheme);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
