/**
 * Footer Dynamic Loader & Component (footer.js)
 * Location: components/footer.js
 * CliniPortal Framework — Vanilla JavaScript Fallback for Static HTML
 */

function renderFooterHtml(projectRoot = './') {
  const root = projectRoot.endsWith('/') ? projectRoot : projectRoot + '/';
  const currentYear = new Date().getFullYear();

  return `
    <footer class="global-footer">
      <div class="footer-main-content">
        <!-- Cột 1: Thông tin thương hiệu -->
        <div class="footer-section footer-brand">
          <div class="footer-logo">
            <span class="logo-icon">🩺</span>
            <span class="logo-text">CliniPortal</span>
          </div>
          <p class="footer-tagline">Hệ sinh thái công cụ hỗ trợ lâm sàng dành cho bác sĩ nội khoa</p>
          <div class="footer-social-links">
            <a href="#" class="social-link" aria-label="Facebook" title="Theo dõi trên Facebook">📘</a>
            <a href="#" class="social-link" aria-label="Zalo" title="Nhóm Zalo">💬</a>
            <a href="#" class="social-link" aria-label="Email" title="Liên hệ qua Email">📧</a>
          </div>
        </div>

        <!-- Cột 2: Liên kết nhanh -->
        <div class="footer-section footer-links">
          <h4 class="footer-heading">Liên kết nhanh</h4>
          <ul class="footer-nav-list">
            <li><a href="${root}index.html#/">🏠 Trang chủ</a></li>
            <li><a href="${root}index.html#/calculators">⚙️ Công cụ lâm sàng</a></li>
            <li><a href="${root}index.html#/ebm">📄 Y học chứng cứ</a></li>
            <li><a href="${root}index.html#/tcm">☯️ Y học cổ truyền</a></li>
            <li><a href="${root}index.html#/pharmacology">💊 Dược lý lâm sàng</a></li>
            <li><a href="${root}index.html#/approaches">🤒 Tiếp cận lâm sàng</a></li>
          </ul>
        </div>

        <!-- Cột 3: Nhóm công cụ nổi bật -->
        <div class="footer-section footer-links">
          <h4 class="footer-heading">Công cụ nổi bật</h4>
          <ul class="footer-nav-list">
            <li><a href="${root}index.html#/calculators/sepsis-studio">🦠 Sàng lọc Nhiễm khuẩn & Sepsis</a></li>
            <li><a href="${root}index.html#/calculators/pneumonia-studio">🫁 Đánh giá Viêm phổi</a></li>
            <li><a href="${root}index.html#/calculators/renal-function">🫘 Chức năng thận</a></li>
            <li><a href="${root}index.html#/calculators/dg-abg-studio">🔬 Khí máu động mạch</a></li>
            <li><a href="${root}index.html#/docspace/soap">📋 Sổ tay SOAP Digital</a></li>
          </ul>
        </div>

        <!-- Cột 4: Thông tin liên hệ & Hỗ trợ -->
        <div class="footer-section footer-contact">
          <h4 class="footer-heading">Hỗ trợ &amp; Liên hệ</h4>
          <ul class="footer-contact-list">
            <li>
              <span class="contact-icon">📍</span>
              <span>Việt Nam</span>
            </li>
            <li>
              <span class="contact-icon">🌐</span>
              <span>Hệ sinh thái Y học chứng cứ &amp; Hỗ trợ quyết định lâm sàng</span>
            </li>
            <li>
              <span class="contact-icon">💡</span>
              <span>Dành cho Bác sĩ &amp; Nhân viên Y tế</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Dòng bản quyền & Cảnh báo Y khoa -->
      <div class="footer-bottom-bar">
        <div class="footer-disclaimer">
          <strong>⚠️ Tuyên bố miễn trừ trách nhiệm y khoa:</strong> Thông tin trên CliniPortal chỉ mang tính chất tham khảo học tập và hỗ trợ quyết định lâm sàng. Bác sĩ điều trị chịu trách nhiệm cuối cùng về mọi chỉ định và chẩn đoán trên bệnh nhân cụ thể.
        </div>
        <div class="footer-copyright">
          &copy; ${currentYear} <strong>CliniPortal</strong>. Bản quyền thuộc về Đội ngũ Phát triển CliniPortal.
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
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
  } else {
    loadFooter();
  }
}
