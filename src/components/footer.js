/**
 * Footer Dynamic Loader & Component (footer.js)
 * Location: components/footer.js
 * CliniPortal Framework — Vanilla JavaScript Fallback for Static HTML
 */

function renderFooterHtml(projectRoot = './') {
  const root = projectRoot.endsWith('/') ? projectRoot : projectRoot + '/';
  const currentYear = new Date().getFullYear();

  return `
    <footer class="global-footer" id="siteFooter">
      <div class="footer-main-content">
        <!-- Cột 1: Thương hiệu & Trạng thái Offline -->
        <div class="footer-section footer-brand">
          <a href="${root}index.html#/" class="footer-logo" title="Về Trang chủ CliniPortal">
            <span class="footer-logo-box"><i class="fa-solid fa-stethoscope"></i></span>
            <span>CliniPortal <span class="text-primary-accent">MedLens</span></span>
          </a>
          <p class="footer-tagline">
            Hệ sinh thái hỗ trợ quyết định lâm sàng, y học chứng cứ và khoa học y cơ sở chuẩn xác dành cho bác sĩ nội khoa &amp; trực cấp cứu.
          </p>
          <div class="footer-status-pill" title="Hệ thống sẵn sàng hoạt động không cần kết nối mạng">
            <span class="footer-status-dot" aria-hidden="true"></span>
            <span>Offline-First Ready · EBM 2026</span>
          </div>
        </div>

        <!-- Cột 2: 5 Phân hệ Trọng điểm -->
        <div class="footer-section footer-links is-accordion" data-footer-accordion>
          <button type="button" class="footer-accordion-toggle" aria-expanded="false">
            <span>5 Phân Hệ Cốt Lõi</span>
            <i class="fa-solid fa-chevron-down footer-accordion-chevron" aria-hidden="true"></i>
          </button>
          <div class="footer-accordion-panel">
            <ul class="footer-nav-list">
              <li><a href="${root}index.html#/"><i class="fa-solid fa-house"></i> Trang chủ Launchpad</a></li>
              <li><a href="${root}index.html#/docspace"><i class="fa-solid fa-id-badge"></i> DocSpace Pro Workstation</a></li>
              <li><a href="${root}index.html#/basic-medical"><i class="fa-solid fa-dna"></i> Cơ sở Y khoa (Basic Sciences)</a></li>
              <li><a href="${root}index.html#/clinical-handbook"><i class="fa-solid fa-book-medical"></i> Sổ Tay Lâm Sàng (Đúc kết)</a></li>
              <li><a href="${root}index.html#/ebm"><i class="fa-solid fa-scale-balanced"></i> EBM Suite &amp; Tháp 6S</a></li>
              <li><a href="${root}index.html#/ebm/kho-guidelines"><i class="fa-solid fa-file-medical"></i> Kho Guidelines 2026</a></li>
            </ul>
          </div>
        </div>

        <!-- Cột 3: Tổ hợp Studio & Công cụ -->
        <div class="footer-section footer-links is-accordion" data-footer-accordion>
          <button type="button" class="footer-accordion-toggle" aria-expanded="false">
            <span>Studio &amp; Công Cụ</span>
            <i class="fa-solid fa-chevron-down footer-accordion-chevron" aria-hidden="true"></i>
          </button>
          <div class="footer-accordion-panel">
            <ul class="footer-nav-list">
              <li><a href="https://dryoodong.github.io/CDSS_Standalone/?theme=light" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-microchip"></i> CDSS Platform Suite</a></li>
              <li><a href="${root}index.html#/docspace/soap"><i class="fa-solid fa-notes-medical"></i> Sổ tay Thực chiến SOAP</a></li>
              <li><a href="${root}index.html#/basic-medical/simulators"><i class="fa-solid fa-wave-square"></i> Mô phỏng Sinh lý (Simulators)</a></li>
              <li><a href="${root}index.html#/basic-medical/metabolic-map"><i class="fa-solid fa-diagram-project"></i> Bản đồ Chuyển hóa</a></li>
              <li><a href="${root}index.html#/basic-medical/khang-sinh"><i class="fa-solid fa-shield-virus"></i> Kháng sinh học &amp; AMS</a></li>
              <li><a href="${root}index.html#/ebm/lab"><i class="fa-solid fa-flask"></i> EBM Practice Lab</a></li>
            </ul>
          </div>
        </div>

        <!-- Cột 4: Chuẩn mực Y khoa & Miễn trừ Lâm sàng -->
        <div class="footer-section footer-contact">
          <h4 class="footer-heading">Chuẩn Mực &amp; An Toàn Lâm Sàng</h4>
          <div class="footer-disclaimer-card">
            <div class="footer-disclaimer-title">
              <i class="fa-solid fa-triangle-exclamation"></i>
              <span>Miễn trừ trách nhiệm y khoa</span>
            </div>
            <p class="footer-disclaimer-text">
              Thông tin tham khảo chuyên môn theo Bộ Y tế, ESC, KDIGO, IDSA. Không thay thế phán xét lâm sàng trực tiếp của bác sĩ điều trị trên từng bệnh nhân.
            </p>
          </div>
          <ul class="footer-contact-list">
            <li>
              <i class="fa-solid fa-envelope"></i>
              <a href="mailto:support@cliniportal.vn">support@cliniportal.vn</a>
            </li>
            <li>
              <i class="fa-solid fa-laptop-medical"></i>
              <span>Tối ưu đa thiết bị: Laptop · Tablet · Mobile</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-divider"></div>

      <div class="footer-bottom">
        <div class="footer-copyright">
          <p>&copy; <span id="currentYear">${currentYear}</span> <strong>CliniPortal MedLens</strong> · Hệ sinh thái Y khoa Offline-First</p>
          <div class="footer-tech-badges">
            <span class="footer-tech-badge is-primary"><i class="fa-solid fa-shield-heart"></i> EBM Verified</span>
            <span class="footer-tech-badge"><i class="fa-solid fa-wifi"></i> Offline PWA</span>
            <span class="footer-tech-badge"><i class="fa-solid fa-universal-access"></i> WCAG AA</span>
          </div>
        </div>
        <div class="footer-legal">
          <a href="${root}index.html#/ebm" class="legal-link">Thư viện EBM</a>
          <a href="${root}index.html#/clinical-handbook" class="legal-link">Sổ tay Lâm sàng</a>
          <a href="${root}index.html#/docspace" class="legal-link">DocSpace Pro</a>
        </div>
      </div>
    </footer>
  `;
}

function loadFooter() {
  try {
    if (typeof window !== 'undefined' && (window.self !== window.top || window.location.search.includes('embedded=1'))) {
      return;
    }
  } catch (e) {
    return;
  }

  const holder = document.getElementById('footer-placeholder');
  if (!holder) return;

  const footerPath = holder.dataset.footerPath || '';
  const depth = (footerPath.match(/\.\.\//g) || []).length;
  const projectRoot = depth > 0 ? '../'.repeat(depth) : './';

  holder.innerHTML = renderFooterHtml(projectRoot);

  holder.querySelectorAll('[data-footer-accordion]').forEach((section) => {
    const toggleBtn = section.querySelector('.footer-accordion-toggle');
    if (!toggleBtn) return;
    toggleBtn.addEventListener('click', () => {
      if (window.innerWidth > 767) return;
      const isOpen = section.classList.toggle('is-open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
  } else {
    loadFooter();
  }
}
