/* ============================================
   PM Workflow — 主脚本（侧边栏布局）
   ============================================ */

(function () {
  'use strict';

  // --- Theme ---
  var STORAGE_KEY = 'pm-workflow-theme';

  function getPreferredTheme() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  function updateThemeToggleText(theme) {
    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.textContent = theme === 'dark' ? '亮色' : '暗色';
    }
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
    updateThemeToggleText(next);
  }

  // Init theme
  var currentTheme = getPreferredTheme();
  applyTheme(currentTheme);
  document.addEventListener('DOMContentLoaded', function () {
    updateThemeToggleText(currentTheme);
  });

  // Theme toggle button
  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('theme-toggle')) {
      toggleTheme();
    }
  });

  // --- Sidebar toggle (mobile) ---
  document.addEventListener('click', function (e) {
    var toggle = e.target.closest('#menu-toggle');
    if (!toggle) return;

    var sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    var isOpen = sidebar.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close sidebar on click outside (mobile)
  document.addEventListener('click', function (e) {
    if (window.innerWidth > 960) return;
    var sidebar = document.getElementById('sidebar');
    var toggle = document.getElementById('menu-toggle');
    if (!sidebar || !sidebar.classList.contains('open')) return;
    if (e.target.closest('#sidebar') || e.target.closest('#menu-toggle')) return;
    sidebar.classList.remove('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  });

  // --- Smooth scroll for anchor links ---
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
})();
