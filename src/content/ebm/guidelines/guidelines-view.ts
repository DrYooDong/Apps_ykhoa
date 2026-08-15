/**
 * CliniPortal — Guidelines & Evidence Directory SPA View (TypeScript)
 * Path: src/content/ebm/guidelines/guidelines-view.ts
 */

import { SPECIALTIES, SOURCE_TYPES, IMPACTS } from '../data';
import { createSpecialtyBadge, createImpactBadge } from '../renderer';

export function renderGuidelinesView(): string {
  const specialtyOptions = Object.entries(SPECIALTIES)
    .map(([key, item]) => `<option value="${key}">${item.name}</option>`)
    .join('');

  const sourceOptions = Object.entries(SOURCE_TYPES)
    .map(([key, item]) => `<option value="${key}">${item.name}</option>`)
    .join('');

  return `
    <div class="guidelines-spa-container animate-fade-in" style="max-width: 1440px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/ebm" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Trung Tâm Y Học Chứng Cứ</a> / Kho Guidelines & Nghiên Cứu
          </div>
          <h1 style="font-size: 2rem; font-weight: 800; color: var(--color-primary, #0284c7); margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-book-medical"></i> Kho Hướng Dẫn Điều Trị & Nghiên Cứu Lâm Sàng (EBM)
          </h1>
          <p style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin: 0.5rem 0 0 0;">
            Tổng hợp các hướng dẫn điều trị Bộ Y Tế, các hiệp hội quốc tế (ACC/AHA, ESC, ADA, GINA, GOLD, KDIGO...) và các thử nghiệm lâm sàng ngẫu nhiên có nhóm chứng (RCTs).
          </p>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/ebm/guideline-radar" class="btn btn-outline" style="padding: 0.6rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-radar" style="color: #7c3aed;"></i> Guideline Radar
          </a>
          <a href="#/ebm/journal-quality" class="btn btn-outline" style="padding: 0.6rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-award" style="color: #ca8a04;"></i> Đánh Giá Tạp Chí
          </a>
          <a href="#/ebm/ebm-lab" class="btn btn-outline" style="padding: 0.6rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-flask" style="color: #059669;"></i> EBM Practice Lab
          </a>
        </div>
      </div>

      <!-- Quick Filter & Search Bar -->
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem; margin-bottom: 1.5rem; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
        <div style="display: grid; grid-template-columns: 2fr 1fr 1fr auto; gap: 1rem; align-items: center;">
          <div style="position: relative;">
            <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #94a3b8;"></i>
            <input type="text" id="guideline-search-input" placeholder="Tìm kiếm theo tên bệnh, thuốc, hội chuyên khoa (VD: ĐTĐ, Suy tim, KDIGO, ADA...)..." style="width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; font-size: 0.95rem;" oninput="window.filterGuidelinesList()" />
          </div>

          <div>
            <select id="guideline-spec-filter" style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; font-size: 0.9rem;" onchange="window.filterGuidelinesList()">
              <option value="all">Tất cả chuyên khoa</option>
              ${specialtyOptions}
            </select>
          </div>

          <div>
            <select id="guideline-source-filter" style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; font-size: 0.9rem;" onchange="window.filterGuidelinesList()">
              <option value="all">Tất cả nguồn ban hành</option>
              ${sourceOptions}
            </select>
          </div>

          <div>
            <button class="btn btn-primary" onclick="window.resetGuidelineFilters()" style="padding: 0.75rem 1.25rem; border-radius: 8px; font-weight: 600; border: none; background: #f1f5f9; color: #475569; cursor: pointer;">
              <i class="fa-solid fa-rotate-left"></i> Đặt lại
            </button>
          </div>
        </div>
      </div>

      <!-- Guidelines Grid / List -->
      <div id="guidelines-card-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 1.25rem;">
        ${renderSampleGuidelineCards()}
      </div>
    </div>
  `;
}

function renderSampleGuidelineCards(): string {
  const guidelines = [
    {
      id: '2026-ada-diabetes',
      title: 'Standards of Care in Diabetes — 2026',
      org: 'American Diabetes Association (ADA)',
      year: 2026,
      spec: 'endo',
      impact: 'practice-changing',
      summary: 'Khuyến cáo mới nhất về cá thể hóa mục tiêu HbA1c, ưu tiên SGLT2i và GLP-1 RA trên bệnh nhân có CKD hoặc ASCVD.',
      link: '#/ebm/kho-guidelines/2026-ada-diabetes.html'
    },
    {
      id: '2026-aha-acc-ckm-syndrome',
      title: 'Cardiovascular-Kidney-Metabolic (CKM) Syndrome 2026',
      org: 'AHA / ACC',
      year: 2026,
      spec: 'cardio',
      impact: 'practice-changing',
      summary: 'Khung tiếp cận đa chuyên khoa kết nối bệnh tim mạch, đái tháo đường và bệnh thận mạn.',
      link: '#/ebm/kho-guidelines/2026-aha-acc-ckm-syndrome.html'
    },
    {
      id: '2026-byt-copd',
      title: 'Hướng Dẫn Chẩn Đoán & Điều Trị Bệnh Phổi Tắc Nghẽn Mạn Tính (COPD)',
      org: 'Bộ Y Tế Việt Nam',
      year: 2026,
      spec: 'pulmo',
      impact: 'practice-changing',
      summary: 'Cập nhật phân loại nhóm ABE theo GOLD 2026, chiến lược khởi trị LABA/LAMA và chỉ định ICS theo bạch cầu ái toan.',
      link: '#/ebm/kho-guidelines/2026-byt-copd.html'
    },
    {
      id: '2026-ssc-sepsis',
      title: 'Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock',
      org: 'SSC / ESICM / SCCM',
      year: 2026,
      spec: 'icu',
      impact: 'practice-changing',
      summary: 'Gói 1 giờ (Hour-1 Bundle), bù dịch tinh thể 30ml/kg cân nhắc theo đáp ứng động, Noradrenaline đầu tay.',
      link: '#/ebm/kho-guidelines/2026-ssc-sepsis.html'
    },
    {
      id: '2024-kdigo-ckd',
      title: 'KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease',
      org: 'KDIGO',
      year: 2024,
      spec: 'renal',
      impact: 'practice-changing',
      summary: 'Chiến lược bảo vệ thận toàn diện với Tứ trụ (ACEi/ARB, SGLT2i, nsMRA Finerenone, GLP-1 RA).',
      link: '#/ebm/kho-guidelines/2024-kdigo-ckd.html'
    },
    {
      id: '2025-aha-acc-hypertension',
      title: '2025 AHA/ACC Clinical Practice Guideline for the Prevention and Management of High Blood Pressure in Adults',
      org: 'AHA / ACC',
      year: 2025,
      spec: 'cardio',
      impact: 'practice-changing',
      summary: 'Mục tiêu huyết áp nghiêm ngặt < 130/80 mmHg, phối hợp thuốc liều cố định (SPC) ngay từ đầu.',
      link: '#/ebm/kho-guidelines/2025-aha-acc-hypertension.html'
    },
    {
      id: '2026-gina-asthma',
      title: 'Global Strategy for Asthma Management and Prevention (GINA 2026)',
      org: 'GINA',
      year: 2026,
      spec: 'pulmo',
      impact: 'practice-changing',
      summary: 'Khẳng định Track 1: Sử dụng ICS-Formoterol làm thuốc cắt cơn và duy trì (MART) từ Bậc 1 đến Bậc 5.',
      link: '#/ebm/kho-guidelines/2026-gina-asthma.html'
    },
    {
      id: '2026-apasl-viem-gan-b',
      title: 'APASL 2026 Clinical Practice Guidelines on the Management of Hepatitis B Virus Infection',
      org: 'APASL',
      year: 2026,
      spec: 'infect',
      impact: 'informative',
      summary: 'Mở rộng tiêu chuẩn điều trị kháng virus HBV với TDF, TAF, ETV và theo dõi ung thư biểu mô tế bào gan (HCC).',
      link: '#/ebm/kho-guidelines/2026-apasl-viem-gan-b.html'
    }
  ];

  return guidelines.map(g => `
    <div class="guideline-card" data-spec="${g.spec}" style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.75rem;">
          <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
            ${createSpecialtyBadge(g.spec)}
            ${createImpactBadge(g.impact)}
          </div>
          <span style="font-size: 0.75rem; font-weight: 700; color: #64748b; background: #f1f5f9; padding: 0.2rem 0.5rem; border-radius: 4px;">${g.year}</span>
        </div>

        <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 0 0 0.5rem 0; line-height: 1.4;">
          ${g.title}
        </h3>

        <div style="font-size: 0.8rem; color: var(--color-primary, #0284c7); font-weight: 600; margin-bottom: 0.75rem;">
          <i class="fa-solid fa-building-columns"></i> ${g.org}
        </div>

        <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); line-height: 1.5; margin: 0 0 1rem 0;">
          ${g.summary}
        </p>
      </div>

      <div style="border-top: 1px solid var(--color-border, #f1f5f9); padding-top: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 0.75rem; color: #94a3b8;"><i class="fa-solid fa-file-lines"></i> Tóm tắt lâm sàng</span>
        <a href="${g.link}" class="btn btn-sm" style="padding: 0.35rem 0.75rem; background: var(--color-primary, #0284c7); color: #fff; border-radius: 6px; text-decoration: none; font-size: 0.8rem; font-weight: 600;">
          Xem chi tiết <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>
  `).join('');
}

// Global Window Bindings
declare global {
  interface Window {
    filterGuidelinesList: () => void;
    resetGuidelineFilters: () => void;
  }
}

if (typeof window !== 'undefined') {
  window.filterGuidelinesList = () => {
    const q = (document.getElementById('guideline-search-input') as HTMLInputElement)?.value.toLowerCase().trim() || '';
    const spec = (document.getElementById('guideline-spec-filter') as HTMLSelectElement)?.value || 'all';

    document.querySelectorAll('.guideline-card').forEach(card => {
      const text = card.textContent?.toLowerCase() || '';
      const cardSpec = (card as HTMLElement).dataset.spec || 'all';

      const matchQ = !q || text.includes(q);
      const matchSpec = (spec === 'all' || cardSpec === spec);

      if (matchQ && matchSpec) {
        (card as HTMLElement).style.display = 'flex';
      } else {
        (card as HTMLElement).style.display = 'none';
      }
    });
  };

  window.resetGuidelineFilters = () => {
    const searchInput = document.getElementById('guideline-search-input') as HTMLInputElement;
    const specFilter = document.getElementById('guideline-spec-filter') as HTMLSelectElement;
    const srcFilter = document.getElementById('guideline-source-filter') as HTMLSelectElement;

    if (searchInput) searchInput.value = '';
    if (specFilter) specFilter.value = 'all';
    if (srcFilter) srcFilter.value = 'all';

    window.filterGuidelinesList();
  };
}
