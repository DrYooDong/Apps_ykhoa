/**
 * CliniPortal 2.0 — Category View Component (Hub Danh Mục)
 * Render danh sách các bài viết / công cụ thuộc phân hệ y khoa tương ứng một cách tự động từ index.json.
 */

import { categoryCoreMapper } from '../core/category-mapper';
import { contentLoaderEngine, ContentIndexItem } from '../core/content-loader';

function formatSubcategoryName(sub: string = ''): string {
  const map: Record<string, string> = {
    'emergency': 'Cấp cứu & Hồi sức',
    'cardiology': 'Tim mạch',
    'respiratory': 'Hô hấp',
    'renal': 'Thận - Tiết niệu - Điện giải',
    'endocrinology': 'Nội tiết & Chuyển hoá',
    'neurology': 'Thần kinh',
    'gastroenterology': 'Tiêu hoá & Gan mật',
    'hematology': 'Huyết học',
    'infectious': 'Truyền nhiễm & Kháng sinh',
    'general': 'Tổng quát & Lâm sàng',
    'specialties': 'Chuyên khoa lâm sàng',
    'symptoms': 'Tiếp cận Triệu chứng',
    'pathology': 'Tiếp cận Bệnh lý',
    'paraclinical': 'Cận lâm sàng & Thăm dò',
    'interactive-tools': 'Lưu đồ & Phác đồ tương tác',
    'ebm-lab': 'EBM Lab & Biểu đồ y khoa',
    'guidelines': 'Khuyến cáo & Guidelines quốc tế',
    'diagnostics': 'Chẩn đoán học YHCT',
    'monographs': 'Chuyên đề & Phương thang'
  };
  const key = sub.toLowerCase().trim();
  if (map[key]) return map[key];
  return sub ? sub.charAt(0).toUpperCase() + sub.slice(1) : 'Tổng Quát & Lâm Sàng';
}

function formatTypeLabel(type: string = '', path: string = ''): string {
  if (type === 'calculator' || path.endsWith('.html')) {
    return 'Công Cụ Tương Tác';
  }
  if (type === 'document' || path.endsWith('.md')) {
    return 'Bài Đọc / Guideline';
  }
  return 'Công Cụ Y Khoa';
}

function getTypeBadgeBg(type: string = ''): string {
  if (type === 'calculator') return 'var(--color-info-hl, #e0f2fe)';
  return 'var(--color-surface-offset, #f1f5f9)';
}

function getTypeBadgeColor(type: string = ''): string {
  if (type === 'calculator') return 'var(--color-primary, #0284c7)';
  return 'var(--color-text-muted, #64748b)';
}

export async function renderCategoryView(categoryKey: string): Promise<string> {
  const categoryName = categoryCoreMapper.getDisplayName(categoryKey) || categoryKey.toUpperCase();
  const items: ContentIndexItem[] = await contentLoaderEngine.loadCategoryIndex(categoryKey);

  let contentHtml = '';

  if (items.length === 0) {
    contentHtml = `
      <div style="text-align: center; padding: 4rem 1rem; background: var(--color-surface, #ffffff); border: 1px dashed var(--color-border, #e2e8f0); border-radius: 0.75rem;">
        <i class="fa-solid fa-folder-open" style="font-size: 3rem; color: var(--color-text-muted, #94a3b8); margin-bottom: 1rem;"></i>
        <h3 style="font-size: 1.25rem; font-weight: 600; color: var(--color-text, #0f172a);">Đang chuẩn bị dữ liệu cho chuyên khoa ${categoryName}</h3>
        <p style="color: var(--color-text-muted, #64748b); font-size: 0.9rem; margin-top: 0.5rem;">Vui lòng quay lại sau hoặc thử tra cứu từ khóa trên thanh tìm kiếm nhanh.</p>
      </div>
    `;
  } else {
    // Gom nhóm items theo subcategory
    const groups: Map<string, ContentIndexItem[]> = new Map();
    items.forEach(item => {
      const subKey = item.subcategory || 'general';
      if (!groups.has(subKey)) {
        groups.set(subKey, []);
      }
      groups.get(subKey)!.push(item);
    });

    contentHtml = Array.from(groups.entries()).map(([subKey, groupItems]) => {
      const groupTitle = formatSubcategoryName(subKey);
      
      const cardsHtml = groupItems.map(item => {
        const cleanName = item.name.replace(/\.(html|md)$/i, '').replace(/_/g, ' ');
        return `
          <a href="#/${categoryKey}/${item.id}" class="content-item-card category-card-item" 
             data-title="${cleanName.toLowerCase()}" 
             data-desc="${(item.description || '').toLowerCase()}" 
             data-sub="${subKey.toLowerCase()}"
             style="display: flex; flex-direction: column; justify-content: space-between; padding: 1.25rem; background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.75rem; text-decoration: none; color: inherit; transition: all 0.2s ease; box-shadow: 0 1px 2px rgba(0,0,0,0.04);">
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
                <span style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; padding: 0.2rem 0.55rem; border-radius: 0.35rem; background: ${getTypeBadgeBg(item.type)}; color: ${getTypeBadgeColor(item.type)};">
                  ${formatTypeLabel(item.type, item.path)}
                </span>
                <i class="fa-solid fa-arrow-right" style="font-size: 0.825rem; color: var(--color-text-muted, #94a3b8);"></i>
              </div>
              <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 0.5rem; line-height: 1.4;">${cleanName}</h3>
              ${item.description ? `<p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); line-height: 1.5; margin: 0;">${item.description}</p>` : ''}
            </div>
          </a>
        `;
      }).join('');

      return `
        <section class="category-subgroup-section" data-sub="${subKey}" style="margin-bottom: 2.5rem;">
          <h2 style="font-size: 1.25rem; font-weight: 700; color: var(--color-primary, #0284c7); margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid var(--color-border, #e2e8f0); display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-folder-open"></i> ${groupTitle}
            <span style="font-size: 0.75rem; font-weight: 600; background: var(--color-surface-offset, #f1f5f9); color: var(--color-text-muted, #64748b); padding: 0.2rem 0.6rem; border-radius: 1rem;">${groupItems.length}</span>
          </h2>
          <div class="category-cards-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 1.25rem;">
            ${cardsHtml}
          </div>
        </section>
      `;
    }).join('');
  }

  return `
    <div class="category-hub-container" style="max-width: 1320px; margin: 0 auto; padding: 1.5rem 1rem;">
      <header class="category-header" style="margin-bottom: 2rem;">
        <div class="breadcrumb" style="font-size: 0.875rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.5rem;">
          <a href="#/" style="color: inherit; text-decoration: none;">Trang chủ</a> &nbsp;/&nbsp; <span style="color: var(--color-primary, #0284c7); font-weight: 600;">${categoryName}</span>
        </div>
        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem;">
          <div>
            <h1 style="font-size: 2rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 0.5rem;"><i class="fa-solid fa-folder-open"></i> Phân Hệ: ${categoryName}</h1>
            <p style="color: var(--color-text-muted, #64748b); margin: 0;">Danh sách toàn bộ các bài học, phác đồ và công cụ lâm sàng thuộc chuyên khoa ${categoryName} (${items.length} công cụ).</p>
          </div>
          <a href="#/" class="btn btn-secondary" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.55rem 1.1rem; font-size: 0.875rem; border-radius: 0.5rem; text-decoration: none; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #0f172a); background: var(--color-surface, #fff);">
            <i class="fa-solid fa-house"></i> Về Trang chủ
          </a>
        </div>
      </header>

      ${items.length > 0 ? `
        <div class="category-filter-bar" style="margin-bottom: 2rem;">
          <div style="position: relative; max-width: 520px;">
            <i class="fa-solid fa-filter" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--color-text-muted, #64748b);"></i>
            <input type="search" id="category-filter-input" placeholder="Lọc nhanh trong ${categoryName} (ví dụ: An thần, eGFR, ECG)..." 
              style="width: 100%; padding: 0.75rem 1rem 0.75rem 2.75rem; border: 1px solid var(--color-border, #e2e8f0); border-radius: 0.5rem; font-size: 0.925rem; background: var(--color-surface, #ffffff); color: var(--color-text, #0f172a); outline: none; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" />
          </div>
        </div>
      ` : ''}

      <div class="category-content-groups">
        ${contentHtml}
      </div>
    </div>
  `;
}

