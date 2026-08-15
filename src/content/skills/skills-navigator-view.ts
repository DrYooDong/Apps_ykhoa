/**
 * CliniPortal — Clinical Skills Navigator & Content Reader SPA View (TypeScript)
 * Path: src/content/skills/skills-navigator-view.ts
 */

export function renderSkillsNavigatorView(category: string = 'all'): string {
  const sections = [
    {
      id: 'kham-lam-sang',
      title: '1. Khám Lâm Sàng Hệ Cơ Quan (Bedside Examination)',
      icon: 'fa-stethoscope',
      color: '#0284c7',
      items: [
        { slug: 'clinical/kham-tim-mach/kn-khamtim', title: 'Khám Thực Thể Hệ Tim Mạch (Nhìn - Sờ - Gõ - Nghe)' },
        { slug: 'clinical/kham-tim-mach/kn-khamdmngoaibien', title: 'Khám Động Mạch Ngoại Biên & Đo Chỉ Số ABI' },
        { slug: 'clinical/kham-tim-mach/kn-khamtmngoaibien', title: 'Khám Tĩnh Mạch Ngoại Biên & Tĩnh Mạch Cổ Nổi (JVP)' },
        { slug: 'clinical/kham-than-kinh/kn-thankinh', title: 'Khám 12 Đôi Dây Thần Kinh Sọ Não & Vận Động - Cảm Giác' }
      ]
    },
    {
      id: 'hoi-suc',
      title: '2. Kỹ Năng Hồi Sức Cấp Cứu (Resuscitation Skills)',
      icon: 'fa-kit-medical',
      color: '#dc2626',
      items: [
        { slug: 'resuscitation/kn-hoisinh-timphoi', title: 'Hồi Sinh Tim Phổi Cơ Bản & Nâng Cao (BLS / ACLS CPR)' },
        { slug: 'resuscitation/kn-phanve', title: 'Phác Đồ Xử Trí Cấp Cứu Sốc Phản Vệ (Adrenaline)' },
        { slug: 'resuscitation/kn-kiemsoat-duongtho', title: 'Khai Thông & Kiểm Soát Đường Thở Nâng Cao' },
        { slug: 'resuscitation/kn-sieuam-capcuu', title: 'Siêu Âm Cấp Cứu Tại Giường (POCUS eFAST)' },
        { slug: 'resuscitation/kn-triage', title: 'Phân Loại Nạn Nhân Cấp Cứu Hàng Loạt (Triage START)' }
      ]
    },
    {
      id: 'thu-thuat',
      title: '3. Thủ Thuật Lâm Sàng Xâm Lấn (Clinical Procedures)',
      icon: 'fa-syringe',
      color: '#7c3aed',
      items: [
        { slug: 'procedures/dat-nkq', title: 'Kỹ Thuật Đặt Ống Nội Khí Quản (Endotracheal Intubation)' },
        { slug: 'procedures/choc-dich-mang-phoi', title: 'Chọc Hút & Dẫn Lưu Dịch Màng Phổi (Thoracentesis)' },
        { slug: 'procedures/choc-dich-tuy-song', title: 'Chọc Dò Dịch Não Tủy Thắt Lưng (Lumbar Puncture)' },
        { slug: 'procedures/so-cuu-cam-mau-bang-bo', title: 'Sơ Cứu Cầm Máu & Băng Bó Cố Định Gãy Xương' }
      ]
    },
    {
      id: 'can-lam-sang',
      title: '4. Kỹ Năng Đọc Cận Lâm Sàng (Paraclinical Interpretation)',
      icon: 'fa-x-ray',
      color: '#ea580c',
      items: [
        { slug: 'can-lam-sang/doc-xq-nguc', title: 'Quy Trình 12 Bước Phân Tích X-Quang Ngực Thẳng (CXR)' },
        { slug: 'can-lam-sang/doc-ecg-toan-dien', title: 'Đọc & Phân Tích Điện Tâm Đồ 12 Chuyển Đạo Toàn Diện' },
        { slug: 'can-lam-sang/doc-tpttb-mau', title: 'Đọc Kết Quả Tổng Phân Tích Tế Bào Máu Ngoại Vi (CBC)' },
        { slug: 'can-lam-sang/doc-sh-gan', title: 'Đánh Giá Chức Năng Gan & Men Gan AST/ALT/Bilirubin' },
        { slug: 'can-lam-sang/doc-sh-than', title: 'Đánh Giá Chức Năng Thận & Độ Lọc Cầu Thận eGFR' }
      ]
    },
    {
      id: 'benh-an',
      title: '5. Làm Bệnh Án & Giao Tiếp SBAR (Clinical Reasoning & SBAR)',
      icon: 'fa-comments',
      color: '#059669',
      items: [
        { slug: 'benh-an/kn-benhan-noikhoa', title: 'Mẫu Bệnh Án Nội Khoa Toàn Diện & Biện Luận Lâm Sàng' },
        { slug: 'treatment-management/lyluan-dieutrinoikhoa', title: 'Lý Luận & Chiến Lược Điều Trị Bệnh Học Nội Khoa' },
        { slug: 'treatment-management/ke-toa-tham-van-thuoc-tre-em', title: 'Nguyên Tắc Kê Đơn & Hiệu Chỉnh Liều Thuốc Trẻ Em' }
      ]
    }
  ];

  const filteredSections = category === 'all' 
    ? sections 
    : sections.filter(s => s.id === category);

  return `
    <div class="skills-navigator-container animate-fade-in" style="max-width: 1440px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/skills" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Kỹ Năng Lâm Sàng</a> / Danh Mục Quy Trình Kỹ Năng
          </div>
          <h1 style="font-size: 2rem; font-weight: 800; color: #0284c7; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-user-doctor"></i> Hệ Thống Quy Trình Kỹ Năng Lâm Sàng & OSCE
          </h1>
          <p style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0 0 0;">
            Hơn 30+ quy trình kỹ năng lâm sàng chuẩn hóa từ Macleod, ATLS, ACLS và Bộ Y Tế.
          </p>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/skills/osce-randomizer" class="btn btn-outline" style="padding: 0.6rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-dice" style="color: #7c3aed;"></i> OSCE Randomizer
          </a>
          <a href="#/skills/auscultation" class="btn btn-outline" style="padding: 0.6rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-headphones" style="color: #dc2626;"></i> Nghe Tim - Phổi
          </a>
        </div>
      </div>

      <!-- Sections Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 1.5rem;">
        ${filteredSections.map(sec => `
          <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
            <div>
              <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; border-bottom: 1px solid var(--color-border, #f1f5f9); padding-bottom: 0.75rem;">
                <div style="width: 40px; height: 40px; border-radius: 8px; background: ${sec.color}15; color: ${sec.color}; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
                  <i class="fa-solid ${sec.icon}"></i>
                </div>
                <h3 style="margin: 0; font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a);">${sec.title}</h3>
              </div>

              <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem;">
                ${sec.items.map((item, idx) => `
                  <li>
                    <a href="#/skills/reader/${item.slug}" style="display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0.75rem; border-radius: 6px; background: #f8fafc; text-decoration: none; color: var(--color-text, #334155); font-size: 0.875rem; transition: all 0.2s;" onmouseover="this.style.background='#f1f5f9'" onmouseout="this.style.background='#f8fafc'">
                      <span style="font-weight: 600;">${idx + 1}. ${item.title}</span>
                      <i class="fa-solid fa-chevron-right" style="font-size: 0.75rem; color: #94a3b8;"></i>
                    </a>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function renderSkillReaderView(slug: string): string {
  const cleanSlug = slug.endsWith('.html') ? slug : `${slug}.html`;
  const filePath = `src/content/skills/${cleanSlug}`;

  // Trigger async fetch after DOM renders
  setTimeout(() => {
    fetchSkillContent(filePath, slug);
  }, 50);

  return `
    <div class="skill-reader-container animate-fade-in" style="max-width: 1200px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b);">
          <a href="#/skills" style="color: var(--color-primary, #0284c7); text-decoration: none;">Kỹ Năng Lâm Sàng</a> &nbsp;/&nbsp;
          <span style="color: var(--color-text, #0f172a); font-weight: 600;" id="skill-reader-title-crumb">${slug}</span>
        </div>
        
        <div style="display: flex; gap: 0.5rem;">
          <a href="#/skills" class="btn btn-outline" style="padding: 0.4rem 0.85rem; border-radius: 6px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.825rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> Quay lại Skills Hub
          </a>
        </div>
      </div>

      <!-- Skill Article Content Container -->
      <div id="skill-article-body" style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 2rem; min-height: 400px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
        <div style="text-align: center; padding: 3rem 0; color: #64748b;">
          <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 2rem; color: var(--color-primary, #0284c7); margin-bottom: 1rem;"></i>
          <p>Đang tải quy trình kỹ năng lâm sàng...</p>
        </div>
      </div>
    </div>
  `;
}

async function fetchSkillContent(filePath: string, slug: string): Promise<void> {
  const container = document.getElementById('skill-article-body');
  if (!container) return;

  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const htmlText = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    // Extract title
    const pageTitle = doc.querySelector('title')?.textContent || doc.querySelector('h1')?.textContent || slug;
    const crumb = document.getElementById('skill-reader-title-crumb');
    if (crumb) crumb.textContent = pageTitle.replace('– CliniPortal', '').trim();
    document.title = `${pageTitle} – CliniPortal`;

    // Remove legacy header/footer/sidebar placeholders
    doc.querySelectorAll('#header-placeholder, #footer-placeholder, .sidebar, .sidebar-overlay, script, link[rel="stylesheet"]').forEach(el => el.remove());

    // Extract main content
    const mainContent = doc.querySelector('.app-container, .main-content, .content-container, main, body');
    if (mainContent) {
      container.innerHTML = mainContent.innerHTML;
    } else {
      container.innerHTML = htmlText;
    }
  } catch (err) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2.5rem; color: #dc2626;">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 2.5rem; margin-bottom: 1rem;"></i>
        <h3>Không thể tải quy trình kỹ năng</h3>
        <p style="color: #64748b; font-size: 0.9rem;">Vui lòng kiểm tra lại kết nối hoặc quay lại Skills Hub.</p>
        <a href="#/skills" class="btn btn-primary" style="margin-top: 1rem; display: inline-block; padding: 0.5rem 1rem; background: var(--color-primary, #0284c7); color: #fff; border-radius: 6px; text-decoration: none;">Về Skills Hub</a>
      </div>
    `;
  }
}
