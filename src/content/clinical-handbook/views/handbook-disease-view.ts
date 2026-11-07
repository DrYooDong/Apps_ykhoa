/**
 * CliniPortal — Clinical Handbook Disease Detail View
 * Path: src/content/clinical-handbook/views/handbook-disease-view.ts
 * 
 * Màn hình Cấp 3: Trang chi tiết Bệnh lý & Danh sách các bài viết Đúc kết MDX
 */

import { getHandbookDisease, getHandbookSpecialtyById } from '../data/handbook-catalog';
import { SpecialtyId } from '../types/handbook.types';

export function renderHandbookDiseaseView(specialtyId: SpecialtyId, diseaseSlug: string): string {
  const specialty = getHandbookSpecialtyById(specialtyId);
  const disease = getHandbookDisease(specialtyId, diseaseSlug);

  if (!disease || !specialty) {
    return `
      <div class="promax-wrapper" style="padding: 3rem 1.5rem; text-align: center;">
        <h2>Không tìm thấy bệnh lý yêu cầu</h2>
        <p style="color: var(--color-text-muted);">Vui lòng kiểm tra lại đường dẫn hoặc quay về Sổ tay lâm sàng.</p>
        <a href="#/clinical-handbook" style="display: inline-block; margin-top: 1rem; color: #0284c7; font-weight: 600;">
          ← Quay lại danh mục Chuyên khoa
        </a>
      </div>
    `;
  }

  return `
    <div class="promax-wrapper" id="diseaseDetailContent">

      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <a href="#/clinical-handbook" style="color: inherit; text-decoration: none;">Sổ tay Lâm sàng</a> &nbsp;/&nbsp; 
        <a href="#/clinical-handbook/${specialty.id}" style="color: inherit; text-decoration: none;">${specialty.name}</a> &nbsp;/&nbsp; 
        <span style="color: #0284c7; font-weight: 600;">${disease.name}</span>
      </div>

      <!-- HERO BỆNH LÝ -->
      <section style="background: linear-gradient(135deg, rgba(2, 132, 199, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%); border: 1px solid rgba(2, 132, 199, 0.3); border-radius: 16px; padding: 2rem; margin-bottom: 2rem;">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 56px; height: 56px; border-radius: 14px; background: rgba(2, 132, 199, 0.2); color: #38bdf8; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; border: 1px solid rgba(56, 189, 248, 0.3);">
              <i class="fa-solid ${disease.icon}"></i>
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <span style="font-size: 0.75rem; font-weight: 700; color: #38bdf8; background: rgba(56, 189, 248, 0.12); padding: 2px 8px; border-radius: 4px;">
                  ICD-10: ${disease.icd10}
                </span>
                <span style="font-size: 0.75rem; font-weight: 600; color: #34d399; background: rgba(52, 211, 153, 0.12); padding: 2px 8px; border-radius: 4px;">
                  ${specialty.shortName}
                </span>
              </div>
              <h1 style="font-size: 1.85rem; font-weight: 800; color: var(--color-text, #f8fafc); margin: 0;">
                ${disease.name}
              </h1>
              <div style="font-size: 0.9rem; color: var(--color-text-muted, #94a3b8); font-style: italic; margin-top: 0.2rem;">
                ${disease.nameEn}
              </div>
            </div>
          </div>

          <a href="#/clinical-handbook/${specialty.id}" style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.85rem; color: var(--color-text-muted); text-decoration: none; padding: 6px 12px; border-radius: 8px; border: 1px solid var(--color-border, rgba(255, 255, 255, 0.1)); background: var(--color-surface, #1e293b);">
            <i class="fa-solid fa-arrow-left"></i>
            <span>Về ${specialty.shortName}</span>
          </a>
        </div>

        <p style="font-size: 0.95rem; line-height: 1.6; color: var(--color-text, #e2e8f0); margin: 0 0 1.25rem 0; max-width: 900px;">
          ${disease.summary}
        </p>

        <!-- GUIDELINE TAGS & HIGHLIGHTS -->
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
          <span style="font-size: 0.78rem; font-weight: 700; color: var(--color-text-muted);"><i class="fa-solid fa-bookmark" style="margin-right: 4px; color: #f59e0b;"></i> Khuyến cáo đối chiếu:</span>
          ${disease.guidelines.map(g => `
            <span style="font-size: 0.75rem; background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.12); color: #cbd5e1; padding: 3px 10px; border-radius: 6px;">
              ${g}
            </span>
          `).join('')}
        </div>
      </section>

      <!-- DANH MỤC CÁC CHỦ ĐỀ / BÀI VIẾT ĐÚC KẾT MDX -->
      <section style="margin-bottom: 2.5rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem;">
          <div>
            <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--color-text, #f8fafc); margin: 0; display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-solid fa-list-check" style="color: #0284c7;"></i>
              <span>Các Bài Đúc Kết & Kinh Nghiệm Lâm Sàng (${disease.articles.length})</span>
            </h2>
            <p style="font-size: 0.85rem; color: var(--color-text-muted); margin: 0.2rem 0 0 0;">
              Biên soạn theo chuẩn MDX Native • Tích lũy kiến thức thực chiến, bẫy cận lâm sàng & ra quyết định
            </p>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${disease.articles.map((article, idx) => `
            <div 
              class="handbook-article-item"
              style="
                background: var(--color-surface, #1e293b); 
                border: 1px solid ${article.isDraft ? 'var(--color-border, rgba(255, 255, 255, 0.08))' : 'rgba(2, 132, 199, 0.4)'}; 
                border-radius: 12px; 
                padding: 1.25rem 1.5rem; 
                display: flex; 
                flex-direction: column; 
                gap: 0.75rem;
                transition: transform 0.2s, box-shadow 0.2s;
                position: relative;
                overflow: hidden;
              "
            >
              ${!article.isDraft ? `
                <div style="position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: #0284c7;"></div>
              ` : ''}

              <!-- Header Row -->
              <div style="display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span style="font-size: 0.75rem; font-weight: 800; color: #fff; background: ${article.isDraft ? '#64748b' : '#0284c7'}; padding: 2px 8px; border-radius: 4px;">
                    Chuyên đề #${article.order}
                  </span>
                  ${article.isFeatured ? `
                    <span style="font-size: 0.72rem; font-weight: 700; color: #f59e0b; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3); padding: 2px 8px; border-radius: 4px;">
                      ⭐ Trọng Tâm
                    </span>
                  ` : ''}
                  <span style="font-size: 0.75rem; color: var(--color-text-muted);">
                    <i class="fa-regular fa-clock" style="font-size: 0.7rem;"></i> ${article.estimatedMinutes} phút đọc
                  </span>
                </div>

                <span style="font-size: 0.72rem; padding: 2px 8px; border-radius: 4px; ${article.isDraft ? 'background: rgba(100, 116, 139, 0.2); color: #94a3b8;' : 'background: rgba(16, 185, 129, 0.15); color: #10b981;'}">
                  ${article.isDraft ? 'Đang biên soạn' : 'Đã thẩm định EBM'}
                </span>
              </div>

              <!-- Tiêu đề bài viết -->
              <div>
                <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #f8fafc); margin: 0 0 0.25rem 0;">
                  ${article.title}
                </h3>
                ${article.subtitle ? `
                  <div style="font-size: 0.85rem; color: var(--color-text-muted, #94a3b8); margin-bottom: 0.4rem;">
                    ${article.subtitle}
                  </div>
                ` : ''}
                <p style="font-size: 0.85rem; line-height: 1.5; color: var(--color-text, #cbd5e1); margin: 0;">
                  ${article.description}
                </p>
              </div>

              <!-- Pearl Highlight -->
              <div style="background: rgba(2, 132, 199, 0.06); border-left: 3px solid #0284c7; padding: 6px 12px; border-radius: 0 6px 6px 0; font-size: 0.8rem; color: var(--color-text); line-height: 1.45;">
                <strong style="color: #38bdf8;"><i class="fa-solid fa-lightbulb" style="color: #f59e0b;"></i> Đúc kết cốt lõi:</strong> ${article.keyTakeaway}
              </div>

              <!-- Tags & Action Button -->
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; border-top: 1px solid var(--color-border, rgba(255, 255, 255, 0.05)); padding-top: 0.6rem; margin-top: 0.25rem;">
                <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
                  ${article.tags.map(t => `<span style="font-size: 0.72rem; color: var(--color-text-muted); background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); padding: 1px 6px; border-radius: 3px;">#${t}</span>`).join('')}
                </div>

                ${!article.isDraft ? `
                  <a 
                    href="#/clinical-handbook/${specialty.id}/${disease.slug}/${article.slug}" 
                    style="
                      display: inline-flex; 
                      align-items: center; 
                      gap: 6px; 
                      font-size: 0.85rem; 
                      font-weight: 700; 
                      color: #fff; 
                      background: #0284c7; 
                      padding: 6px 16px; 
                      border-radius: 8px; 
                      text-decoration: none; 
                      box-shadow: 0 2px 8px rgba(2, 132, 199, 0.3);
                    "
                  >
                    <span>Đọc bài đúc kết (MDX)</span>
                    <i class="fa-solid fa-arrow-right" style="font-size: 0.75rem;"></i>
                  </a>
                ` : `
                  <span style="font-size: 0.8rem; color: var(--color-text-muted); font-style: italic;">
                    <i class="fa-solid fa-pen-nib" style="margin-right: 4px;"></i> Đang hoàn thiện bản thảo
                  </span>
                `}
              </div>
            </div>
          `).join('')}
        </div>
      </section>

    </div>
  `;
}
