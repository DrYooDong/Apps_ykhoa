    (function () {
      // --- Theme toggle ---
      const html = document.documentElement;
      const themeBtn = document.getElementById('theme-toggle-btn');
      let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      html.setAttribute('data-theme', theme);

      themeBtn.addEventListener('click', () => {
        theme = theme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', theme);
        themeBtn.textContent = theme === 'dark' ? '☀️' : '🌓';
      });

      // --- Sidebar: desktop collapse ---
      const sidebar   = document.getElementById('appSidebar');
      const arrowBtn  = document.getElementById('sidebar-toggle-arrow');
      const menuBtn   = document.getElementById('mobileMenuBtn');
      const overlay   = document.getElementById('sidebarOverlay');
      const footer    = document.querySelector('.global-footer');
      const isMobile  = () => window.innerWidth < 768;

      arrowBtn.addEventListener('click', () => {
        if (!isMobile()) {
          const collapsed = sidebar.classList.toggle('collapsed');
          if (footer) footer.style.marginLeft = collapsed ? 'var(--sidebar-col-w)' : 'var(--sidebar-w)';
        }
      });

      // --- Sidebar: mobile slide ---
      menuBtn.addEventListener('click', () => {
        if (isMobile()) {
          const open = sidebar.classList.toggle('open');
          overlay.classList.toggle('show', open);
        } else {
          const collapsed = sidebar.classList.toggle('collapsed');
          if (footer) footer.style.marginLeft = collapsed ? 'var(--sidebar-col-w)' : 'var(--sidebar-w)';
        }
      });

      overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
      });

      window.addEventListener('resize', () => {
        if (!isMobile()) {
          sidebar.classList.remove('open');
          overlay.classList.remove('show');
        }
      });

      // --- Active nav ---
      document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function () {
          document.querySelectorAll('.nav-item').forEach(n => {
            n.classList.remove('active');
            n.removeAttribute('aria-current');
          });
          this.classList.add('active');
          this.setAttribute('aria-current', 'page');
          if (isMobile()) {
            sidebar.classList.remove('open');
            overlay.classList.remove('show');
          }
        });
      });

      // --- Search shortcut "/" ---
      document.addEventListener('keydown', e => {
        if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
          e.preventDefault();
          document.querySelector('.search-container .input')?.focus();
        }
        if (e.key === 'Escape') {
          document.querySelector('.search-container .input')?.blur();
        }
      });
    })();
