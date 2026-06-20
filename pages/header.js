function goBack() {
  window.history.back();
}

async function loadHeader() {
  const holder = document.getElementById('header-placeholder');
  if (!holder) return;

  const headerPath = holder.dataset.headerPath;
  if (!headerPath) {
    console.warn('[header.js] Thiếu data-header-path trên #header-placeholder');
    return;
  }

  try {
    const res = await fetch(headerPath);
    if (!res.ok) throw new Error(`Không tải được header: ${res.status}`);
    const html = await res.text();
    holder.innerHTML = html;
    initHeader();
  } catch (err) {
    console.error('[header.js]', err);
  }
}

function initHeader() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const mobileMenuBtn  = document.getElementById('mobileMenuBtn');
  const sidebar        = document.getElementById('appSidebar');
  const overlay        = document.getElementById('sidebarOverlay');
  const arrowBtn       = document.getElementById('sidebar-toggle-arrow');
  const footer         = document.querySelector('.global-footer');

  // --- Theme toggle ---
      const html = document.documentElement;
      const themeBtn = document.getElementById('theme-toggle-btn');
      let theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'dark' : 'light';
      html.setAttribute('data-theme', theme);

      themeBtn.addEventListener('click', () => {
        theme = theme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', theme);
        themeBtn.textContent = theme === 'dark' ? '☀️' : '🌓';
      });

  // ── Sidebar helpers ──────────────────────────────────────
  const isMobile = () => window.innerWidth < 768;

  function syncFooter() {
    if (!footer || isMobile()) return;
    footer.style.marginLeft = sidebar?.classList.contains('collapsed')
      ? 'var(--sidebar-col-w)'
      : 'var(--sidebar-w)';
  }

  function openSidebar() {
    sidebar?.classList.add('open');
    overlay?.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar?.classList.remove('open');
    overlay?.classList.remove('show');
    document.body.style.overflow = '';
  }

  // ── Nút mũi tên thu gọn sidebar (desktop) ───────────────
  arrowBtn?.addEventListener('click', () => {
    if (!isMobile()) {
      sidebar?.classList.toggle('collapsed');
      syncFooter();
    }
  });

  // ── Mobile menu btn ──────────────────────────────────────
  mobileMenuBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isMobile()) {
      sidebar?.classList.contains('open') ? closeSidebar() : openSidebar();
    } else {
      sidebar?.classList.toggle('collapsed');
      syncFooter();
    }
  });

  overlay?.addEventListener('click', closeSidebar);

  window.addEventListener('resize', () => {
    if (!isMobile()) closeSidebar();
  });

  // ── Search shortcut (/ để focus, Esc để đóng) ───────────
  document.addEventListener('keydown', (e) => {
    const tag = document.activeElement.tagName;
    if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
      e.preventDefault();
      document.querySelector('.search-container .input')?.focus();
    }
    if (e.key === 'Escape') {
      document.querySelector('.search-container .input')?.blur();
      closeSidebar();
    }
  });

  // ── Active nav theo URL hiện tại ─────────────────────────
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-item').forEach(item => {
    const href = item.getAttribute('href');
    if (href && currentPath.endsWith(href.replace(/^.*\//, ''))) {
      item.classList.add('active');
      item.setAttribute('aria-current', 'page');
    }
    item.addEventListener('click', () => {
      if (isMobile()) closeSidebar();
    });
  });
}

document.addEventListener('DOMContentLoaded', loadHeader);