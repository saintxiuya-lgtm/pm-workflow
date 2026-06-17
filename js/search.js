/* ============================================
   PM Workflow — 搜索功能
   ============================================ */

(function () {
  'use strict';

  // --- Init ---
  function init() {
    var searchToggle = document.querySelector('.search-toggle');
    var searchModal  = document.getElementById('search-modal');
    var searchInput  = document.getElementById('search-input');
    var searchResults = document.getElementById('search-results');
    var searchClose  = document.querySelector('.search-close');

    if (!searchToggle || !searchModal) return;

    // Wait for search data to be available
    function getIndex() {
      return window.SEARCH_INDEX || [];
    }

    searchToggle.addEventListener('click', function () {
      searchModal.classList.add('open');
      setTimeout(function () { searchInput?.focus(); }, 100);
    });

    searchClose?.addEventListener('click', function () {
      searchModal.classList.remove('open');
    });

    searchModal.addEventListener('click', function (e) {
      if (e.target === searchModal) {
        searchModal.classList.remove('open');
      }
    });

    searchInput?.addEventListener('input', function () {
      var index = getIndex();
      if (!index.length) {
        searchResults.innerHTML = '<div class="search-no-results">搜索数据加载中，请稍候…</div>';
        return;
      }
      var results = searchItems(this.value, index);
      renderResults(results, searchResults);
    });

    // Ctrl+K / Cmd+K to open search
    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchToggle.click();
      }
      if (e.key === 'Escape' && searchModal.classList.contains('open')) {
        searchModal.classList.remove('open');
      }
    });
  }

  // --- Search logic ---
  function searchItems(query, index) {
    var q = query.toLowerCase().trim();
    if (!q) return [];
    return index.filter(function (item) {
      return item.text && item.text.indexOf(q) !== -1;
    });
  }

  // --- Render results ---
  function renderResults(results, container) {
    if (results.length === 0) {
      container.innerHTML = '<div class="search-no-results">没有找到匹配的结果，试试其他关键词吧。</div>';
      return;
    }

    var html = '<div class="search-results-list">';
    results.forEach(function (item) {
      var icon = item.type === 'skill' ? '📌' : item.type === 'tool' ? '🛠️' : item.type === 'phase' ? (item.icon || '📄') : '📄';
      html += '<a href="' + (item.href || '#') + '" class="search-result-item">';
      html += '  <span class="search-result-icon">' + icon + '</span>';
      html += '  <div class="search-result-body">';
      html += '    <div class="search-result-title">' + escapeHtml(item.title) + '</div>';
      if (item.cmd) {
        html += '    <div class="search-result-cmd">' + escapeHtml(item.cmd) + '</div>';
      }
      if (item.phase) {
        html += '    <div class="search-result-meta">属于：' + escapeHtml(item.phase) + '</div>';
      }
      if (item.desc) {
        var shortDesc = item.desc.length > 80 ? item.desc.substring(0, 80) + '…' : item.desc;
        html += '    <div class="search-result-desc">' + escapeHtml(shortDesc) + '</div>';
      }
      html += '  </div>';
      html += '</a>';
    });
    html += '</div>';
    container.innerHTML = html;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // --- Run on DOM ready ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
