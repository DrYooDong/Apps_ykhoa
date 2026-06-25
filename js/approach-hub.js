/**
 * ============================================================
   CLINICAL APPROACH HUB INTERACTIVE SCRIPTS
   Shared JS for tiep-can.html and category index pages
   ============================================================
 */

document.addEventListener('DOMContentLoaded', function () {

  // --- ACCORDION TOGGLE ---
  const groupHeadings = document.querySelectorAll('.group-heading');
  groupHeadings.forEach(heading => {
    heading.addEventListener('click', () => {
      const container = heading.closest('.group-container');
      if (container) {
        container.classList.toggle('active');
      }
    });
  });

  // --- EXPAND ALL / COLLAPSE ALL ---
  const btnExpandAll = document.getElementById('btnExpandAll');
  const btnCollapseAll = document.getElementById('btnCollapseAll');

  if (btnExpandAll) {
    btnExpandAll.addEventListener('click', () => {
      document.querySelectorAll('.group-container').forEach(g => {
        if (!g.classList.contains('hidden-by-search')) g.classList.add('active');
      });
    });
  }

  if (btnCollapseAll) {
    btnCollapseAll.addEventListener('click', () => {
      document.querySelectorAll('.group-container').forEach(g => g.classList.remove('active'));
    });
  }

  // --- SEARCH FUNCTIONALITY ---
  const searchInput = document.getElementById('tcSearch');
  const clearBtn = document.getElementById('searchClearBtn');
  const searchCount = document.getElementById('searchCount');
  const noResults = document.getElementById('searchNoResults');
  const allCards = document.querySelectorAll('.tool-card');
  const allGroups = document.querySelectorAll('.group-container');

  if (searchInput) {
    // Store original HTML for highlight restoration
    const originalHTML = new Map();
    allCards.forEach(card => {
      const titleEl = card.querySelector('.tool-title-row h3');
      const descEl = card.querySelector('.tool-content p');
      if (titleEl) originalHTML.set(titleEl, titleEl.innerHTML);
      if (descEl) originalHTML.set(descEl, descEl.innerHTML);
    });

    function performSearch() {
      const query = searchInput.value.trim().toLowerCase();
      const hasQuery = query.length > 0;

      if (clearBtn) {
        clearBtn.classList.toggle('visible', hasQuery);
      }

      // Restore original text first
      originalHTML.forEach((html, el) => { el.innerHTML = html; });

      let matchCount = 0;

      allCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const isMatch = !hasQuery || text.includes(query);
        card.classList.toggle('hidden-by-search', !isMatch);
        if (isMatch && hasQuery) matchCount++;
      });

      // Highlight matches
      if (hasQuery && query.length >= 2) {
        allCards.forEach(card => {
          if (card.classList.contains('hidden-by-search')) return;
          const titleEl = card.querySelector('.tool-title-row h3');
          const descEl = card.querySelector('.tool-content p');
          [titleEl, descEl].forEach(el => {
            if (!el) return;
            const orig = originalHTML.get(el);
            if (!orig) return;
            const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            el.innerHTML = orig.replace(regex, '<mark class="search-hl">$1</mark>');
          });
        });
      }

      // Show/hide groups based on visible cards
      allGroups.forEach(group => {
        const visibleCards = group.querySelectorAll('.tool-card:not(.hidden-by-search)');
        group.classList.toggle('hidden-by-search', hasQuery && visibleCards.length === 0);
        if (hasQuery && visibleCards.length > 0) {
          group.classList.add('active');
        }
      });

      // Update count
      if (searchCount) {
        if (hasQuery) {
          searchCount.textContent = matchCount > 0 ? `${matchCount} kết quả` : '';
          searchCount.classList.toggle('has-results', matchCount > 0);
        } else {
          searchCount.textContent = '';
          searchCount.classList.remove('has-results');
        }
      }

      // No results
      if (noResults) {
        const totalVisible = document.querySelectorAll('.tool-card:not(.hidden-by-search)').length;
        noResults.classList.toggle('visible', hasQuery && totalVisible === 0);
      }
    }

    searchInput.addEventListener('input', performSearch);

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        performSearch();
        searchInput.focus();
      });
    }
  }
});
