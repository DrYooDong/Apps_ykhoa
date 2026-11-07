/**
 * CliniPortal — Clinical Handbook Hub SPA View
 * Path: src/content/clinical-handbook/views/handbook-hub-view.ts
 * 
 * Màn hình Cấp 1 & Cấp 2: Mục lục 8 Chuyên khoa & Danh mục Bệnh lý thực chiến
 */

import '../../../styles/components/module-dashboard.css';
import '../../../styles/components/physio-promax-hub.css';
import { 
  HANDBOOK_SPECIALTIES, 
  getHandbookSpecialtyById 
} from '../data/handbook-catalog';
import { SpecialtyId } from '../types/handbook.types';

export function renderHandbookHubView(activeSpecialtyId: SpecialtyId = 'truyen-nhiem'): string {
  const currentSpecialty = getHandbookSpecialtyById(activeSpecialtyId) || HANDBOOK_SPECIALTIES[0];
  const totalDiseases = HANDBOOK_SPECIALTIES.reduce((acc, s) => acc + s.diseases.length, 0);

  return `
    <div class="promax-wrapper" id="handbookMainContent">

      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <span style="color: #0284c7; font-weight: 600;">Sổ Tay Kinh Nghiệm & Đúc Kết Lâm Sàng</span>
      </div>

      <!-- PROMAX LUXURY HERO SECTION -->
      <section class="promax-hero hero-handbook-theme" style="background: linear-gradient(135deg, rgba(2, 132, 199, 0.12) 0%, rgba(15, 23, 42, 0.6) 100%); border: 1px solid rgba(2, 132, 199, 0.25); border-radius: 16px; padding: 2rem; margin-bottom: 2rem; position: relative; overflow: hidden;">
        <div style="position: relative; z-index: 2;">
          <div class="promax-badge-pulse" style="display: inline-flex; align-items: center; gap: 8px; padding: 4px 12px; background: rgba(2, 132, 199, 0.15); border: 1px solid rgba(2, 132, 199, 0.3); border-radius: 999px; font-size: 0.8rem; color: #38bdf8; margin-bottom: 1rem;">
            <span class="pulse-dot" style="width: 8px; height: 8px; background: #38bdf8; border-radius: 50%; display: inline-block;"></span>
            <span>Clinical Pearls & Decision Handbook • EBM 2026</span>
          </div>

          <h1 style="font-size: 2rem; font-weight: 800; margin: 0 0 0.75rem 0; color: var(--color-text, #f8fafc); letter-spacing: -0.02em;">
            🩺 SỔ TAY KINH NGHIỆM & ĐÚC KẾT LÂM SÀNG
          </h1>
          <p style="font-size: 1rem; line-height: 1.6; color: var(--color-text-muted, #94a3b8); max-width: 860px; margin-bottom: 1.5rem;">
            Kho tích lũy tri thức thực chiến theo từng <strong>Chuyên khoa & Bệnh lý cụ thể</strong>. 
            Đúc kết những <strong>vùng xám ra quyết định, cạm bẫy cận lâm sàng, sai lầm kê đơn thường gặp</strong> và bảng đối chiếu nhanh tại giường bệnh theo chuẩn Y học chứng cứ mới nhất.
          </p>

          <!-- KPI METRIC BAR -->
          <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.75rem; background: var(--color-surface, rgba(30, 41, 59, 0.7)); padding: 0.6rem 1.2rem; border-radius: 10px; border: 1px solid var(--color-border, rgba(255, 255, 255, 0.08));">
              <i class="fa-solid fa-stethoscope" style="font-size: 1.25rem; color: #38bdf8;"></i>
              <div>
                <div style="font-size: 1.15rem; font-weight: 700; color: var(--color-text);">${HANDBOOK_SPECIALTIES.length}</div>
                <div style="font-size: 0.75rem; color: var(--color-text-muted);">Chuyên Khoa</div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 0.75rem; background: var(--color-surface, rgba(30, 41, 59, 0.7)); padding: 0.6rem 1.2rem; border-radius: 10px; border: 1px solid var(--color-border, rgba(255, 255, 255, 0.08));">
              <i class="fa-solid fa-viruses" style="font-size: 1.25rem; color: #34d399;"></i>
              <div>
                <div style="font-size: 1.15rem; font-weight: 700; color: var(--color-text);">${totalDiseases}</div>
                <div style="font-size: 0.75rem; color: var(--color-text-muted);">Bệnh Lý Trọng Tâm</div>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 0.75rem; background: var(--color-surface, rgba(30, 41, 59, 0.7)); padding: 0.6rem 1.2rem; border-radius: 10px; border: 1px solid var(--color-border, rgba(255, 255, 255, 0.08));">
              <i class="fa-solid fa-lightbulb" style="font-size: 1.25rem; color: #f59e0b;"></i>
              <div>
                <div style="font-size: 1.15rem; font-weight: 700; color: var(--color-text);">MDX Native</div>
                <div style="font-size: 0.75rem; color: var(--color-text-muted);">Đúc Kết Thực Chiến</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SEARCH BAR -->
      <div style="margin-bottom: 2rem;">
        <div style="position: relative; max-width: 600px;">
          <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--color-text-muted); font-size: 0.95rem;"></i>
          <input 
            type="text" 
            id="handbook-search-input" 
            placeholder="Tìm kiếm bệnh lý hoặc kinh nghiệm (Viêm gan B, Sốt xuất huyết, ALT, FibroScan...)" 
            style="width: 100%; padding: 0.75rem 1rem 0.75rem 2.75rem; background: var(--color-surface, #1e293b); border: 1px solid var(--color-border, #334155); border-radius: 10px; color: var(--color-text, #f8fafc); font-size: 0.95rem; outline: none; transition: border-color 0.2s;"
          />
        </div>
      </div>

      <!-- TẦNG 1: MỤC LỤC 8 CHUYÊN KHOA (SPECIALTIES TABS / PILLS) -->
      <section style="margin-bottom: 2rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--color-text, #f8fafc); margin: 0; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-layer-group" style="color: #0284c7;"></i>
            <span>1. Chọn Chuyên Khoa Y Khoa</span>
          </h2>
          <span style="font-size: 0.85rem; color: var(--color-text-muted);">${HANDBOOK_SPECIALTIES.length} chuyên khoa</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem;">
          ${HANDBOOK_SPECIALTIES.map(specialty => {
            const isActive = specialty.id === currentSpecialty.id;
            return `
              <a 
                href="#/clinical-handbook/${specialty.id}" 
                class="handbook-specialty-card"
                style="
                  display: block; 
                  padding: 1.1rem; 
                  border-radius: 12px; 
                  text-decoration: none; 
                  background: ${isActive ? 'linear-gradient(135deg, rgba(2, 132, 199, 0.2) 0%, rgba(15, 23, 42, 0.8) 100%)' : 'var(--color-surface, #1e293b)'}; 
                  border: 1px solid ${isActive ? '#0284c7' : 'var(--color-border, rgba(255, 255, 255, 0.08))'}; 
                  transition: all 0.2s ease;
                  box-shadow: ${isActive ? '0 4px 16px rgba(2, 132, 199, 0.25)' : 'none'};
                "
              >
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
                  <div style="width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: ${specialty.bgColor || 'rgba(2, 132, 199, 0.15)'}; color: ${specialty.color}; font-size: 1.2rem;">
                    <i class="fa-solid ${specialty.icon}"></i>
                  </div>
                  <span style="font-size: 0.72rem; padding: 2px 8px; border-radius: 999px; background: rgba(255, 255, 255, 0.06); color: var(--color-text-muted); border: 1px solid rgba(255, 255, 255, 0.1);">
                    ${specialty.diseases.length} bệnh
                  </span>
                </div>
                <h3 style="font-size: 1rem; font-weight: 700; color: ${isActive ? '#38bdf8' : 'var(--color-text, #f8fafc)'}; margin: 0 0 0.25rem 0;">
                  ${specialty.name}
                </h3>
                <p style="font-size: 0.78rem; color: var(--color-text-muted, #94a3b8); margin: 0; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                  ${specialty.description}
                </p>
              </a>
            `;
          }).join('')}
        </div>
      </section>

      <!-- TẦNG 2: DANH MỤC BỆNH LÝ TRONG CHUYÊN KHOA ĐANG CHỌN -->
      <section style="margin-top: 2.5rem;" id="disease-list-section">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; border-bottom: 1px solid var(--color-border, rgba(255, 255, 255, 0.08)); padding-bottom: 0.75rem;">
          <div>
            <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: ${currentSpecialty.color}; font-weight: 700; margin-bottom: 0.2rem;">
              Chuyên khoa đang chọn
            </div>
            <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--color-text, #f8fafc); margin: 0; display: flex; align-items: center; gap: 0.6rem;">
              <i class="fa-solid ${currentSpecialty.icon}" style="color: ${currentSpecialty.color};"></i>
              <span>${currentSpecialty.name}</span>
            </h2>
          </div>
          <span style="font-size: 0.85rem; padding: 4px 12px; border-radius: 6px; background: rgba(2, 132, 199, 0.12); color: #38bdf8; font-weight: 600;">
            ${currentSpecialty.badge}
          </span>
        </div>

        <!-- DANH SÁCH BỆNH LÝ DẠNG CARDS -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.25rem;" id="handbook-disease-cards-container">
          ${currentSpecialty.diseases.map(disease => `
            <div 
              class="handbook-disease-card"
              style="
                background: var(--color-surface, #1e293b); 
                border: 1px solid var(--color-border, rgba(255, 255, 255, 0.08)); 
                border-radius: 14px; 
                padding: 1.4rem; 
                display: flex; 
                flex-direction: column; 
                justify-content: space-between; 
                transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
              "
            >
              <div>
                <!-- Top Meta -->
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.8rem;">
                  <div style="display: flex; align-items: center; gap: 0.6rem;">
                    <div style="width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: rgba(2, 132, 199, 0.12); color: ${disease.color || '#0284c7'}; font-size: 1.1rem;">
                      <i class="fa-solid ${disease.icon}"></i>
                    </div>
                    <div>
                      <span style="font-size: 0.72rem; font-weight: 700; color: #38bdf8; background: rgba(56, 189, 248, 0.1); padding: 2px 6px; border-radius: 4px;">
                        ICD-10: ${disease.icd10}
                      </span>
                    </div>
                  </div>

                  ${disease.badge ? `
                    <span style="font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 999px; background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3);">
                      ${disease.badge}
                    </span>
                  ` : ''}
                </div>

                <!-- Tên bệnh lý -->
                <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--color-text, #f8fafc); margin: 0 0 0.2rem 0;">
                  ${disease.name}
                </h3>
                <div style="font-size: 0.78rem; color: var(--color-text-muted, #94a3b8); margin-bottom: 0.75rem; font-style: italic;">
                  ${disease.nameEn}
                </div>

                <!-- Tóm tắt ngắn -->
                <p style="font-size: 0.84rem; line-height: 1.5; color: var(--color-text-muted, #cbd5e1); margin: 0 0 1rem 0;">
                  ${disease.summary}
                </p>

                <!-- Key Pearls Preview -->
                <div style="background: rgba(2, 132, 199, 0.05); border-left: 3px solid #0284c7; padding: 8px 10px; border-radius: 0 8px 8px 0; margin-bottom: 1rem;">
                  <div style="font-size: 0.72rem; font-weight: 700; color: #38bdf8; text-transform: uppercase; margin-bottom: 4px; display: flex; align-items: center; gap: 4px;">
                    <i class="fa-solid fa-lightbulb" style="color: #f59e0b;"></i> Đúc kết cốt lõi:
                  </div>
                  <ul style="margin: 0; padding-left: 1rem; font-size: 0.75rem; color: var(--color-text, #e2e8f0); line-height: 1.45;">
                    ${disease.keyPearlsPreview.slice(0, 2).map(pearl => `<li style="margin-bottom: 3px;">${pearl}</li>`).join('')}
                  </ul>
                </div>
              </div>

              <!-- Action Link -->
              <div style="border-top: 1px solid var(--color-border, rgba(255, 255, 255, 0.06)); padding-top: 0.85rem; display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 0.75rem; color: var(--color-text-muted);">
                  <i class="fa-solid fa-book-medical" style="margin-right: 4px; color: #38bdf8;"></i>
                  ${disease.articles.length > 0 ? `<strong>${disease.articles.length}</strong> bài đúc kết` : 'Đang cập nhật'}
                </span>

                <a 
                  href="#/clinical-handbook/${currentSpecialty.id}/${disease.slug}" 
                  style="
                    display: inline-flex; 
                    align-items: center; 
                    gap: 6px; 
                    font-size: 0.85rem; 
                    font-weight: 700; 
                    color: #fff; 
                    background: #0284c7; 
                    padding: 6px 14px; 
                    border-radius: 8px; 
                    text-decoration: none; 
                    transition: background 0.2s;
                  "
                >
                  <span>Xem đúc kết</span>
                  <i class="fa-solid fa-chevron-right" style="font-size: 0.75rem;"></i>
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

    </div>
  `;
}

export function initHandbookHubView(): void {
  const searchInput = document.getElementById('handbook-search-input') as HTMLInputElement | null;
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const val = (e.target as HTMLInputElement).value.toLowerCase().trim();
    const cards = document.querySelectorAll('.handbook-disease-card');

    cards.forEach(card => {
      const el = card as HTMLElement;
      const text = el.innerText.toLowerCase();
      if (!val || text.includes(val)) {
        el.style.display = 'flex';
      } else {
        el.style.display = 'none';
      }
    });
  });
}
