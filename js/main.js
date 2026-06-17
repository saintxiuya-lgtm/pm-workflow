/* ============================================
   PM Workflow — 交互脚本 v2
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // --- Theme management ---
  function getTheme() {
    const stored = localStorage.getItem('pm-workflow-theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    updateThemeToggleText(theme);
  }

  function updateThemeToggleText(theme) {
    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.textContent = theme === 'dark' ? '亮色' : '暗色';
    }
  }

  var currentTheme = getTheme();
  applyTheme(currentTheme);

  document.querySelector('.theme-toggle')?.addEventListener('click', function() {
    var newTheme = document.documentElement.hasAttribute('data-theme') ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('pm-workflow-theme', newTheme);
  });

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (!localStorage.getItem('pm-workflow-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // --- Mobile nav toggle ---
  var toggleBtn = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', function() {
      var expanded = navLinks.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });

    // Close nav when clicking a link (mobile)
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close nav when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.site-nav')) {
        navLinks.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Active nav link ---
  var currentPath = window.location.pathname.split('/').pop() || '';
  // Handle path-based URLs like /discover/
  if (!currentPath) {
    var parts = window.location.pathname.replace(/\/$/, '').split('/');
    currentPath = parts[parts.length - 1];
  }
  if (!currentPath || currentPath === '') currentPath = 'index.html';

  document.querySelectorAll('.nav-links a').forEach(function(link) {
    var href = link.getAttribute('href');
    if (href) {
      var hrefClean = href.replace(/^\//, '').replace(/\/$/, '');
      if (!hrefClean || hrefClean === '') hrefClean = 'index.html';
      // Match exact or path-based
      if (hrefClean === currentPath || (href === '/' && (currentPath === 'index.html' || currentPath === '') || (currentPath && href.includes(currentPath)))) {
        link.classList.add('active');
      }
    }
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Keyboard shortcut: ESC to close mobile nav ---
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
});
