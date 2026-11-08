/**
 * CliniPortal — Clinical Handbook Disease Detail View
 * Path: src/content/clinical-handbook/views/handbook-disease-view.ts
 * 
 * Màn hình Cấp 3: Trang chi tiết Bệnh lý & Danh sách các bài viết Đúc kết MDX
 * 100% Design Tokens & Dark/Light Mode Compliant
 */

import '../../../styles/components/clinical-handbook.css';
import { getHandbookDisease, getHandbookSpecialtyById } from '../data/handbook-catalog';
import { SpecialtyId } from '../types/handbook.types';

export function renderHandbookDiseaseView(specialtyId: SpecialtyId, diseaseSlug: string): string {
  const specialty = getHandbookSpecialtyById(specialtyId);
  const disease = getHandbookDisease(specialtyId, diseaseSlug);

  if (!disease || !specialty) {
    return `
      <div class="handbook-main-container" style="padding: 4rem 1.5rem; text-align: center;">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(239, 68, 68, 0.12); color: #ef4444; display: inline-flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 1rem;">
          <i class="fa-solid fa-triangle-exclamation"></i>
        </div>
        <h2 style="color: var(--handbook-text); margin-bottom: 0.5rem;">Không tìm thấy bệnh lý yêu cầu</h2>
        <p style="color: var(--handbook-muted); margin-bottom: 1.5rem;">Vui lòng kiểm tra lại đường dẫn hoặc quay về danh mục Chuyên khoa.</p>
        <a href="#/clinical-handbook" class="btn-handbook-read">
          <i class="fa-solid fa-arrow-left"></i>
          <span>Quay lại danh mục Chuyên khoa</span>
        </a>
      </div>
    `;
  }

  return `
    <div class="handbook-main-container" id="diseaseDetailContent">

      <!-- BREADCRUMB -->
      <nav class="handbook-breadcrumb" aria-label="Breadcrumb">
        <a href="#/">🏠 Trang chủ</a>
        <span class="separator">/</span>
        <a href="#/clinical-handbook">Sổ tay Lâm sàng</a>
        <span class="separator">/</span>
        <a href="#/clinical-handbook/${specialty.id}">${specialty.shortName}</a>
        <span class="separator">/</span>
        <span class="current">${disease.name}</span>
      </nav>

      <!-- HERO BỆNH LÝ -->
      <section class="handbook-disease-hero">
        <div class="disease-hero-top">
          <div class="disease-hero-left">
            <div class="disease-hero-icon" style="color: ${disease.color || 'var(--handbook-primary)'};">
              <i class="fa-solid ${disease.icon}"></i>
            </div>
            <div class="disease-hero-title">
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem; flex-wrap: wrap;">
                <span class="handbook-icd-badge">
                  ICD-10: ${disease.icd10}
                </span>
                <span class="handbook-status-badge">
                  ${specialty.shortName}
                </span>
                ${disease.badge ? `
                  <span class="handbook-status-badge">
                    ${disease.badge}
                  </span>
                ` : ''}
              </div>
              <h1>${disease.name}</h1>
              <div class="en-name">${disease.nameEn}</div>
            </div>
          </div>

          <a href="#/clinical-handbook/${specialty.id}" class="btn-handbook-back">
            <i class="fa-solid fa-arrow-left"></i>
            <span>Về ${specialty.shortName}</span>
          </a>
        </div>

        <p class="disease-hero-desc">
          ${disease.summary}
        </p>

        <!-- GUIDELINE TAGS & HIGHLIGHTS -->
        <div class="guideline-tags-row">
          <span class="guideline-tags-label">
            <i class="fa-solid fa-bookmark" style="color: #f59e0b;"></i>
            <span>Khuyến cáo đối chiếu:</span>
          </span>
          ${disease.guidelines.map(g => `
            <span class="guideline-tag-chip">${g}</span>
          `).join('')}
        </div>
      </section>

      <!-- DANH MỤC CÁC CHỦ ĐỀ / BÀI VIẾT ĐÚC KẾT MDX -->
      <section style="margin-bottom: 2.5rem;">
        <div class="handbook-section-title-row">
          <div>
            <h2>
              <i class="fa-solid fa-list-check"></i>
              <span>Các Bài Đúc Kết & Kinh Nghiệm Lâm Sàng (${disease.articles.length})</span>
            </h2>
            <p style="font-size: 0.85rem; color: var(--handbook-muted); margin: 0.2rem 0 0 0;">
              Biên soạn theo chuẩn MDX Native • Tích lũy kiến thức thực chiến, bẫy cận lâm sàng & ra quyết định
            </p>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${disease.articles.map(article => `
            <div class="handbook-article-card ${!article.isDraft ? 'is-active-card' : ''}">
              
              <!-- Header Row -->
              <div class="article-card-header">
                <div class="article-card-left-tags">
                  <span class="article-order-badge ${article.isDraft ? 'is-draft' : ''}">
                    Chuyên đề #${article.order}
                  </span>

                  ${article.isFeatured ? `
                    <span class="featured-pill">
                      ⭐ Trọng Tâm
                    </span>
                  ` : ''}

                  <span class="reading-time-pill">
                    <i class="fa-regular fa-clock"></i> ${article.estimatedMinutes} phút đọc
                  </span>
                </div>

                <span class="article-status-pill ${article.isDraft ? 'is-draft' : 'is-verified'}">
                  ${article.isDraft ? 'Đang biên soạn' : (article.evidenceLevel || 'Đã thẩm định EBM')}
                </span>
              </div>

              <!-- Tiêu đề bài viết -->
              <div>
                <h3>${article.title}</h3>
                ${article.subtitle ? `
                  <div class="article-card-sub">${article.subtitle}</div>
                ` : ''}
                <p class="article-card-desc">${article.description}</p>
              </div>

              <!-- Takeaway Highlight -->
              <div class="article-takeaway-highlight">
                <strong><i class="fa-solid fa-lightbulb" style="color: #f59e0b; margin-right: 4px;"></i> Đúc kết cốt lõi:</strong> ${article.keyTakeaway}
              </div>

              <!-- Tags & Action Button -->
              <div class="article-card-action-row">
                <div class="article-topic-tags">
                  ${article.tags.map(t => `<span class="topic-tag-chip">#${t}</span>`).join('')}
                </div>

                ${!article.isDraft ? `
                  <a 
                    href="#/clinical-handbook/${specialty.id}/${disease.slug}/${article.slug}" 
                    class="btn-handbook-read"
                  >
                    <span>Đọc bài đúc kết (MDX)</span>
                    <i class="fa-solid fa-arrow-right" style="font-size: 0.75rem;"></i>
                  </a>
                ` : `
                  <span style="font-size: 0.8rem; color: var(--handbook-muted); font-style: italic;">
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
