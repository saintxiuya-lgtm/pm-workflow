/* ============================================
   PM Workflow — 交互脚本
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // --- Mobile nav toggle ---
  const toggleBtn = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });

    // Close nav when clicking a link (mobile)
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('open');
      });
    });

    // Close nav when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.site-nav')) {
        navLinks.classList.remove('open');
      }
    });
  }

  // --- Active nav link ---
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Keyboard shortcut: ESC to close mobile nav ---
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navLinks) {
      navLinks.classList.remove('open');
    }
  });

});
