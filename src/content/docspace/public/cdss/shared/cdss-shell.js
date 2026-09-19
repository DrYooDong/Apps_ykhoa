/**
 * CliniPortal CDSS — Shared Shell Navigation & Theme Controller
 * Path: src/content/docspace/public/cdss/shared/cdss-shell.js
 * 
 * Đồng bộ Dark/Light Mode, trạng thái lưu trữ LocalStorage,
 * và sự kiện giao diện cho tất cả các CDSS modules.
 */

(function () {
  const THEME_KEY = 'cliniportal_theme';

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme, updateToggleBtn = true) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    if (updateToggleBtn) {
      const toggleBtns = document.querySelectorAll('#theme-toggle, .cdss-portal-theme-btn, .cdss-theme-toggle');
      toggleBtns.forEach(btn => {
        btn.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        btn.setAttribute('title', theme === 'dark' ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối');
      });
    }

    window.dispatchEvent(new CustomEvent('cliniportal-theme-change', { detail: { theme } }));
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  }

  // Khởi tạo theme tức thời trước khi render hoàn tất
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme, false);

  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(getPreferredTheme(), true);

    // Gán sự kiện cho các nút toggle
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('#theme-toggle, .cdss-portal-theme-btn, .cdss-theme-toggle');
      if (btn) {
        e.preventDefault();
        toggleTheme();
      }
    });

    // Lắng nghe thay đổi theme từ hệ điều hành nếu user chưa từng set thủ công
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(THEME_KEY)) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  });

  // Xuất helper ra window để các module có thể gọi
  window.CliniPortalShell = {
    getTheme: () => document.documentElement.getAttribute('data-theme') || 'light',
    setTheme: (t) => {
      localStorage.setItem(THEME_KEY, t);
      applyTheme(t);
    },
    toggleTheme: toggleTheme
  };
})();
