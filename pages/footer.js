/**
 * footer.js - Xử lý tải và khởi tạo footer động
 * Tương tự như header.js
 */

async function loadFooter() {
  const holder = document.getElementById('footer-placeholder');
  if (!holder) return;

  const footerPath = holder.dataset.footerPath;
  if (!footerPath) {
    console.warn('[footer.js] Thiếu data-footer-path trên #footer-placeholder');
    return;
  }

  try {
    const res = await fetch(footerPath);
    if (!res.ok) throw new Error(`Không tải được footer: ${res.status}`);
    const html = await res.text();
    holder.innerHTML = html;
    initFooter();
  } catch (err) {
    console.error('[footer.js]', err);
  }
}

function initFooter() {
  // Tự động cập nhật năm hiện tại trong footer
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Thêm hiệu ứng hover cho các social links
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateY(-2px)';
    });
    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translateY(0)';
    });
  });

  // Smooth scroll cho các liên kết trong footer
  const footerLinks = document.querySelectorAll('.footer-nav-list a, .legal-link');
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Sync footer với sidebar state (nếu có)
  syncFooterWithSidebar();
}

function syncFooterWithSidebar() {
  const sidebar = document.getElementById('appSidebar');
  const footer = document.querySelector('.global-footer');
  
  if (!footer || !sidebar) return;

  const isMobile = () => window.innerWidth < 768;

  function updateFooterMargin() {
    if (isMobile()) {
      footer.style.marginLeft = '0';
      return;
    }
    
    footer.style.marginLeft = sidebar.classList.contains('collapsed')
      ? 'var(--sidebar-col-w)'
      : 'var(--sidebar-w)';
  }

  // Lắng nghe sự kiện thu gọn/mở rộng sidebar
  const arrowBtn = document.getElementById('sidebar-toggle-arrow');
  arrowBtn?.addEventListener('click', updateFooterMargin);

  // Cập nhật khi resize window
  window.addEventListener('resize', updateFooterMargin);

  // Cập nhật ngay lập tức
  updateFooterMargin();
}

// Khởi tạo khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', loadFooter);
