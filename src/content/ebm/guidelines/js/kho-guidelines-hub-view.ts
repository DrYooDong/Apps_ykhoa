/**
 * CliniPortal — Kho Tóm Tắt Guidelines & Nghiên Cứu Lâm Sàng SPA Hub View
 * Path: src/content/ebm/guidelines/kho-guidelines-hub-view.ts
 *
 * Giao diện Kho Tóm Tắt 59+ Guidelines & RCT Landmark chuyên sâu
 * Tích hợp tìm kiếm thời gian thực, lọc chuyên khoa, lọc nguồn và liên kết đọc chi tiết.
 */

import { KHO_GUIDELINES_STATIC } from './kho-guidelines-registry';
import type { Study } from './guidelines-types';

export function renderKhoGuidelinesHubView(): string {
  const totalSummaries = KHO_GUIDELINES_STATIC.length;

  return `
    <div class="kho-guidelines-hub animate-fade-in" style="min-height: calc(100vh - 60px); background: var(--color-bg, #f0f4f8); padding: 5.5rem 1.5rem 4rem 1.5rem;">
      <div style="max-width: 1400px; margin: 0 auto;">
        
        <!-- BREADCRUMBS -->
        <nav style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem; font-size: 0.85rem; color: var(--color-text-muted, #64748b);">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <a href="#/ebm" style="color: var(--color-primary, #0284c7); text-decoration: none; font-weight: 700; display: inline-flex; align-items: center; gap: 5px;">
              <i class="fa-solid fa-book-medical"></i> Y học Chứng cứ
            </a>
            <span>/</span>
            <span style="color: var(--color-text, #0f172a); font-weight: 800;">Kho Tóm Tắt Guidelines</span>
          </div>

          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <a href="#/ebm/guidelines" class="btn btn-outline" style="padding: 0.45rem 0.95rem; border-radius: 8px; border: 1.5px solid var(--color-border, #cbd5e1); font-size: 0.82rem; font-weight: 700; color: var(--color-text, #334155); text-decoration: none; display: inline-flex; align-items: center; gap: 6px; background: var(--color-surface, #fff); transition: all 0.2s ease;">
              <i class="fa-solid fa-table-list" style="color: #0284c7;"></i>
              <span>Web Tra cứu &amp; Chỉ số IF (${totalSummaries}+)</span>
            </a>
            <a href="#/ebm/radar" class="btn btn-outline" style="padding: 0.45rem 0.95rem; border-radius: 8px; border: 1.5px solid var(--color-border, #cbd5e1); font-size: 0.82rem; font-weight: 700; color: var(--color-text, #334155); text-decoration: none; display: inline-flex; align-items: center; gap: 6px; background: var(--color-surface, #fff); transition: all 0.2s ease;">
              <i class="fa-solid fa-radar" style="color: #10b981;"></i>
              <span>Guideline Radar (Diff)</span>
            </a>
          </div>
        </nav>

        <!-- LUXURY HERO BANNER -->
        <header style="margin-bottom: 2rem; background: linear-gradient(135deg, #092640 0%, #0f172a 50%, #1e1b4b 100%); color: #ffffff; padding: 2.75rem 2.25rem; border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 14px 36px -6px rgba(0, 0, 0, 0.25), 0 0 20px rgba(2, 132, 199, 0.15); position: relative; overflow: hidden;">
          <div style="position: absolute; top: -60px; right: -60px; width: 240px; height: 240px; background: radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, transparent 70%); border-radius: 50%; pointer-events: none;"></div>
          
          <div style="position: relative; z-index: 2;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; flex-wrap: wrap;">
              <span class="badge" style="background: rgba(251, 191, 36, 0.2); color: #fde047; border: 1.5px solid rgba(251, 191, 36, 0.4); font-weight: 800; font-size: 0.8rem; padding: 0.35rem 0.85rem; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.04em;">
                <i class="fa-solid fa-folder-open" style="color: #facc15;"></i> Kho Tài Liệu Tóm Tắt Chuyên Sâu
              </span>
              <span class="badge" style="background: rgba(56, 189, 248, 0.18); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.35); font-weight: 700; font-size: 0.78rem; padding: 0.35rem 0.75rem; border-radius: 999px;">
                ${totalSummaries} Hướng Dẫn &amp; RCT Landmark
              </span>
            </div>

            <h1 style="font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif); font-size: clamp(1.8rem, 3.5vw, 2.35rem); font-weight: 800; color: #ffffff; margin: 0.5rem 0 0.85rem 0; line-height: 1.25; letter-spacing: -0.02em;">
              Kho Tóm Tắt Hướng Dẫn Điều Trị &amp; Nghiên Cứu Lâm Sàng (EBM Guidelines)
            </h1>

            <p style="margin: 0; font-size: 1rem; color: rgba(255, 255, 255, 0.9); line-height: 1.7; max-width: 980px;">
              Tổng hợp đầy đủ các bài tóm tắt khuyến cáo y học chứng cứ, phác đồ điều trị và các thử nghiệm lâm sàng Landmark từ Bộ Y Tế Việt Nam, ESC, AHA/ACC, KDIGO, GOLD, GINA, NEJM. Trình bày trực quan với sơ đồ phác đồ, cấu trúc PICO, bảng liều dùng và phân loại COR / LOE.
            </p>
          </div>
        </header>

        <!-- SEARCH & FILTER TOOLBAR -->
        <div style="background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #cbd5e1); border-radius: 16px; padding: 1.25rem 1.5rem; margin-bottom: 2rem; box-shadow: 0 4px 14px rgba(0,0,0,0.03);">
          
          <!-- SEARCH INPUT -->
          <div style="position: relative; margin-bottom: 1.15rem;">
            <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--color-text-muted, #64748b); font-size: 1rem;"></i>
            <input 
              type="text" 
              id="khoGuidelineSearchInput" 
              placeholder="Tìm kiếm tóm tắt theo tên bệnh, thuốc (SGLT2i, GLP-1RA, DOAC), tổ chức (Bộ Y Tế, ESC, KDIGO, ADA)..." 
              style="width: 100%; padding: 0.75rem 1rem 0.75rem 2.75rem; border-radius: 12px; border: 1.5px solid var(--color-border, #cbd5e1); font-size: 0.95rem; background: var(--color-surface-2, #f8fafc); color: var(--color-text, #0f172a); outline: none; transition: all 0.2s ease;"
            />
          </div>

          <!-- QUICK SPECIALTY PILLS -->
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.85rem;">
            <span style="font-size: 0.78rem; font-weight: 800; color: var(--color-text-muted, #64748b); text-transform: uppercase; margin-right: 0.25rem;">
              Chuyên khoa:
            </span>
            <button class="kho-filter-pill active" data-filter-type="specialty" data-filter-val="all">Tất cả (${totalSummaries})</button>
            <button class="kho-filter-pill" data-filter-type="specialty" data-filter-val="cardio">❤️ Tim mạch</button>
            <button class="kho-filter-pill" data-filter-type="specialty" data-filter-val="pulmo">🫁 Hô hấp</button>
            <button class="kho-filter-pill" data-filter-type="specialty" data-filter-val="gi">🔬 Tiêu hóa - Gan mật</button>
            <button class="kho-filter-pill" data-filter-type="specialty" data-filter-val="renal">🩺 Thận học</button>
            <button class="kho-filter-pill" data-filter-type="specialty" data-filter-val="endo">🩸 Nội tiết - ĐTĐ</button>
            <button class="kho-filter-pill" data-filter-type="specialty" data-filter-val="infect">🦠 Truyền nhiễm</button>
            <button class="kho-filter-pill" data-filter-type="specialty" data-filter-val="icu">⚡ Hồi sức Cấp cứu</button>
            <button class="kho-filter-pill" data-filter-type="specialty" data-filter-val="neuro">🧠 Thần kinh</button>
            <button class="kho-filter-pill" data-filter-type="specialty" data-filter-val="obgyn">🤰 Sản Phụ khoa</button>
          </div>

          <!-- QUICK SOURCE PILLS -->
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <span style="font-size: 0.78rem; font-weight: 800; color: var(--color-text-muted, #64748b); text-transform: uppercase; margin-right: 0.25rem;">
              Nguồn tài liệu:
            </span>
            <button class="kho-filter-pill active" data-filter-type="source" data-filter-val="all">Tất cả nguồn</button>
            <button class="kho-filter-pill" data-filter-type="source" data-filter-val="vn-moh">🇻🇳 Bộ Y Tế Việt Nam</button>
            <button class="kho-filter-pill" data-filter-type="source" data-filter-val="intl-guideline">🌐 Hướng Dẫn Quốc Tế</button>
            <button class="kho-filter-pill" data-filter-type="source" data-filter-val="intl-study">🏆 Thử Nghiệm Landmark RCT</button>
            
            <span id="khoResultsCount" style="margin-left: auto; font-size: 0.82rem; font-weight: 700; color: var(--color-primary, #0284c7);">
              Hiển thị: <strong>${totalSummaries}</strong> bài tóm tắt
            </span>
          </div>
        </div>

        <!-- CARDS GRID -->
        <div class="kho-guidelines-grid" id="khoGuidelinesGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(380px, 100%), 1fr)); gap: 1.35rem;">
          <!-- Rendered dynamically by JS -->
        </div>

        <!-- EMPTY STATE -->
        <div id="khoEmptyState" style="display: none; text-align: center; padding: 4rem 1.5rem; background: var(--color-surface, #ffffff); border: 1px dashed var(--color-border, #cbd5e1); border-radius: 16px; margin-top: 1.5rem;">
          <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🔍</div>
          <h3 style="font-size: 1.15rem; font-weight: 800; color: var(--color-text, #0f172a); margin-bottom: 0.35rem;">Không tìm thấy bài tóm tắt phù hợp</h3>
          <p style="font-size: 0.88rem; color: var(--color-text-muted, #64748b); max-width: 480px; margin: 0 auto 1.25rem auto;">
            Hãy thử tìm bằng từ khóa khác hoặc xóa bộ lọc chuyên khoa để xem toàn bộ danh mục.
          </p>
          <button class="btn btn-primary" onclick="resetKhoFilters()" style="padding: 0.5rem 1.25rem; border-radius: 8px; font-weight: 700; background: var(--color-primary, #0284c7); color: #fff; border: none; cursor: pointer;">
            🔄 Xóa bộ lọc
          </button>
        </div>

      </div>
    </div>
  `;
}

export function initKhoGuidelinesHub(): void {
  let activeSpecialty = 'all';
  let activeSource = 'all';
  let searchQuery = '';

  const searchInput = document.getElementById('khoGuidelineSearchInput') as HTMLInputElement | null;
  const gridEl = document.getElementById('khoGuidelinesGrid');
  const countEl = document.getElementById('khoResultsCount');
  const emptyEl = document.getElementById('khoEmptyState');

  function getCleanSlug(file?: string): string {
    if (!file) return '';
    return file.replace(/^.*\//, '').replace(/\.(html|mdx)$/i, '');
  }

  function getSpecialtyBadge(spec?: string): { label: string; bg: string; color: string } {
    switch (spec) {
      case 'cardio': return { label: 'Tim mạch', bg: 'rgba(239, 68, 68, 0.1)', color: '#dc2626' };
      case 'pulmo': return { label: 'Hô hấp', bg: 'rgba(2, 132, 199, 0.1)', color: '#0284c7' };
      case 'gi': return { label: 'Tiêu hóa - Gan mật', bg: 'rgba(217, 119, 6, 0.1)', color: '#d97706' };
      case 'renal': return { label: 'Thận học', bg: 'rgba(13, 148, 136, 0.1)', color: '#0d9488' };
      case 'endo': return { label: 'Nội tiết - ĐTĐ', bg: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed' };
      case 'infect': return { label: 'Truyền nhiễm', bg: 'rgba(5, 150, 105, 0.1)', color: '#059669' };
      case 'icu': return { label: 'Hồi sức Cấp cứu', bg: 'rgba(225, 29, 72, 0.1)', color: '#e11d48' };
      case 'neuro': return { label: 'Thần kinh', bg: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' };
      case 'obgyn': return { label: 'Sản Phụ khoa', bg: 'rgba(236, 72, 153, 0.1)', color: '#db2777' };
      default: return { label: 'Đa khoa', bg: 'rgba(100, 116, 139, 0.1)', color: '#64748b' };
    }
  }

  function getIcdList(icd?: string | string[]): string[] {
    if (!icd) return [];
    if (Array.isArray(icd)) return icd;
    return icd.split(',').map(s => s.trim()).filter(Boolean);
  }

  function renderList(): void {
    if (!gridEl) return;

    const filtered = KHO_GUIDELINES_STATIC.filter((item: Study) => {
      // Specialty Filter
      if (activeSpecialty !== 'all' && item.specialty !== activeSpecialty) {
        return false;
      }
      // Source Filter
      if (activeSource !== 'all' && item.sourceType !== activeSource) {
        return false;
      }
      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = (item.title || '').toLowerCase().includes(q);
        const titleEnMatch = (item.titleEn || '').toLowerCase().includes(q);
        const orgMatch = (item.organization || '').toLowerCase().includes(q);
        const drugMatch = (item.intervention || '').toLowerCase().includes(q);
        const sumMatch = (item.summary || '').toLowerCase().includes(q);
        const icdList = getIcdList(item.icd10);
        const icdMatch = icdList.some((icd: string) => icd.toLowerCase().includes(q));
        if (!titleMatch && !titleEnMatch && !orgMatch && !drugMatch && !sumMatch && !icdMatch) {
          return false;
        }
      }
      return true;
    });

    if (countEl) {
      countEl.innerHTML = `Hiển thị: <strong>${filtered.length}</strong> / ${KHO_GUIDELINES_STATIC.length} bài tóm tắt`;
    }

    if (filtered.length === 0) {
      gridEl.innerHTML = '';
      if (emptyEl) emptyEl.style.display = 'block';
      return;
    }

    if (emptyEl) emptyEl.style.display = 'none';

    gridEl.innerHTML = filtered.map((item: Study) => {
      const slug = getCleanSlug(item.file);
      const spec = getSpecialtyBadge(item.specialty);
      const isBYT = item.sourceType === 'vn-moh' || (item.organization || '').includes('Bộ Y tế');
      const isLandmark = item.design === 'rct' || item.sourceType === 'intl-study';
      const icdList = getIcdList(item.icd10);

      return `
        <article class="kho-card" style="background: var(--color-surface, #ffffff); border: 1px solid var(--color-border, #cbd5e1); border-radius: 18px; padding: 1.45rem; display: flex; flex-direction: column; justify-content: space-between; gap: 1rem; position: relative; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.03); transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease, border-color 0.25s ease;">
          <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: ${isBYT ? 'linear-gradient(90deg, #dc2626, #f59e0b)' : (isLandmark ? 'linear-gradient(90deg, #059669, #06b6d4)' : 'linear-gradient(90deg, #0284c7, #8b5cf6)')};"></div>
          
          <div>
            <!-- META BADGES ROW -->
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
              <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
                <span class="badge" style="font-size: 0.74rem; font-weight: 800; padding: 0.25rem 0.6rem; border-radius: 6px; background: ${spec.bg}; color: ${spec.color};">
                  ${spec.label}
                </span>
                <span class="badge" style="font-size: 0.74rem; font-weight: 700; padding: 0.25rem 0.55rem; border-radius: 6px; background: rgba(100,116,139,0.08); color: var(--color-text-muted, #64748b);">
                  ${item.year || 2026}
                </span>
              </div>
              <span class="badge" style="font-size: 0.72rem; font-weight: 800; padding: 0.2rem 0.55rem; border-radius: 6px; ${isBYT ? 'background: rgba(220,38,38,0.1); color: #dc2626; border: 1px solid rgba(220,38,38,0.25);' : 'background: rgba(2,132,199,0.1); color: #0284c7; border: 1px solid rgba(2,132,199,0.25);'}">
                ${item.organization || 'EBM'}
              </span>
            </div>

            <!-- TITLE -->
            <h2 style="font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif); font-size: 1.05rem; font-weight: 800; color: var(--color-text, #0f172a); margin: 0 0 0.5rem 0; line-height: 1.45; letter-spacing: -0.01em;">
              <a href="#/ebm/kho-guidelines/${slug}" style="color: inherit; text-decoration: none; transition: color 0.15s;" onmouseover="this.style.color='var(--color-primary, #0284c7)'" onmouseout="this.style.color='inherit'">
                ${item.title}
              </a>
            </h2>

            <!-- SUMMARY EXCERPT -->
            <p style="font-size: 0.86rem; color: var(--color-text-muted, #475569); line-height: 1.6; margin: 0 0 0.85rem 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
              ${item.summary || item.detailedConclusion || ''}
            </p>

            <!-- INTERVENTION TAGS -->
            ${item.intervention ? `
              <div style="font-size: 0.78rem; color: var(--color-text-muted, #64748b); background: var(--color-surface-2, #f8fafc); padding: 0.5rem 0.75rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); margin-bottom: 0.75rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                <strong style="color: var(--color-text, #0f172a);">💊 Can thiệp:</strong> ${item.intervention}
              </div>
            ` : ''}
          </div>

          <!-- ACTION BUTTON -->
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; padding-top: 0.75rem; border-top: 1px solid var(--color-border, #f1f5f9);">
            <div style="display: flex; gap: 0.3rem; flex-wrap: wrap;">
              ${icdList.slice(0, 3).map((icd: string) => `
                <span style="font-size: 0.72rem; font-family: monospace; font-weight: 700; padding: 2px 6px; border-radius: 4px; background: rgba(2,132,199,0.08); color: var(--color-primary, #0284c7);">
                  ${icd}
                </span>
              `).join('')}
            </div>

            <a href="#/ebm/kho-guidelines/${slug}" class="btn-read-summary" style="padding: 0.45rem 0.95rem; border-radius: 8px; background: linear-gradient(135deg, #0284c7 0%, #0284c7 100%); color: #ffffff; text-decoration: none; font-size: 0.82rem; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 8px rgba(2, 132, 199, 0.25); transition: all 0.2s ease;">
              <span>Đọc tóm tắt</span>
              <i class="fa-solid fa-arrow-right" style="font-size: 0.75rem;"></i>
            </a>
          </div>
        </article>
      `;
    }).join('');
  }

  // Bind Search
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = (e.target as HTMLInputElement).value;
      renderList();
    });
  }

  // Bind Specialty and Source Filters
  document.querySelectorAll('.kho-filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-filter-type');
      const val = btn.getAttribute('data-filter-val') || 'all';

      if (type === 'specialty') {
        document.querySelectorAll('.kho-filter-pill[data-filter-type="specialty"]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeSpecialty = val;
      } else if (type === 'source') {
        document.querySelectorAll('.kho-filter-pill[data-filter-type="source"]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeSource = val;
      }

      renderList();
    });
  });

  (window as any).resetKhoFilters = () => {
    activeSpecialty = 'all';
    activeSource = 'all';
    searchQuery = '';
    if (searchInput) searchInput.value = '';
    document.querySelectorAll('.kho-filter-pill').forEach(b => {
      if (b.getAttribute('data-filter-val') === 'all') {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
    renderList();
  };

  // Initial Render
  renderList();
}
