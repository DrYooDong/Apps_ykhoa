/**
 * CliniPortal — Clinical Handbook Article Reader SPA View
 * Path: src/content/clinical-handbook/views/handbook-reader-view.ts
 * 
 * Màn hình Cấp 4: Trình đọc bài viết Đúc kết MDX Native
 * Tích hợp Table of Contents (TOC), Font-size resizer, Wide-mode toggle & EBM Badges
 */

import '../../../styles/components/guidelines-article.css';
import '../../../styles/components/mdx-base.css';
import '../../../styles/components/mdx/mdx-diagrams.css';
import { cliniMdxEngine } from '../../../core/mdx-engine';
import { getHandbookArticle, getHandbookDisease, getHandbookSpecialtyById } from '../data/handbook-catalog';
import { SpecialtyId } from '../types/handbook.types';

// Eager load all handbook MDX files in Vite for zero-latency offline loading
const handbookMdxModules = ((import.meta as any).glob?.('/src/content/clinical-handbook/**/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true
}) || {}) as Record<string, string>;

export function renderHandbookReaderView(specialtyId: SpecialtyId, diseaseSlug: string, articleSlug: string): string {
  const specialty = getHandbookSpecialtyById(specialtyId);
  const disease = getHandbookDisease(specialtyId, diseaseSlug);
  const article = getHandbookArticle(specialtyId, diseaseSlug, articleSlug);

  const cleanArticleSlug = articleSlug.replace(/\.mdx$/i, '');

  return `
    <div class="guideline-article-page" id="handbookReaderContainer" style="padding: 1.5rem 1rem 3rem 1rem; max-width: 1400px; margin: 0 auto;">

      <!-- TOP BREADCRUMB -->
      <nav class="breadcrumb-nav" aria-label="Breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <a href="#/clinical-handbook" style="color: inherit; text-decoration: none;">Sổ tay Lâm sàng</a> &nbsp;/&nbsp; 
        <a href="#/clinical-handbook/${specialty?.id || specialtyId}" style="color: inherit; text-decoration: none;">${specialty?.shortName || specialtyId}</a> &nbsp;/&nbsp; 
        <a href="#/clinical-handbook/${specialty?.id || specialtyId}/${disease?.slug || diseaseSlug}" style="color: inherit; text-decoration: none;">${disease?.name || diseaseSlug}</a> &nbsp;/&nbsp; 
        <span style="color: #0284c7; font-weight: 600;" id="handbook-reader-breadcrumb-title">${article?.title || cleanArticleSlug}</span>
      </nav>

      <!-- READER TOOLBAR -->
      <header class="reader-toolbar" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; background: var(--color-surface, #1e293b); padding: 0.75rem 1.25rem; border-radius: 12px; border: 1px solid var(--color-border, rgba(255, 255, 255, 0.08)); margin-bottom: 1.5rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <a href="#/clinical-handbook/${specialtyId}/${diseaseSlug}" class="btn-back" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 8px; background: rgba(255, 255, 255, 0.06); color: var(--color-text, #f8fafc); text-decoration: none; font-size: 0.85rem; font-weight: 600; border: 1px solid rgba(255, 255, 255, 0.1);">
            <i class="fa-solid fa-arrow-left"></i>
            <span>Về ${disease?.name || 'Bệnh lý'}</span>
          </a>

          <span style="font-size: 0.75rem; color: #38bdf8; background: rgba(56, 189, 248, 0.12); padding: 3px 8px; border-radius: 4px; font-weight: 700;">
            <i class="fa-solid fa-shield-virus" style="margin-right: 4px;"></i> ${article?.evidenceLevel || 'EBM 2026'}
          </span>
        </div>

        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <!-- Font Size Adjusters -->
          <div style="display: inline-flex; border-radius: 6px; overflow: hidden; border: 1px solid var(--color-border, rgba(255, 255, 255, 0.1));">
            <button id="btn-font-dec" title="Giảm cỡ chữ" style="background: transparent; border: none; color: var(--color-text); padding: 4px 10px; cursor: pointer; font-size: 0.85rem;">A-</button>
            <button id="btn-font-reset" title="Cỡ chữ mặc định" style="background: transparent; border-left: 1px solid var(--color-border, rgba(255, 255, 255, 0.1)); border-right: 1px solid var(--color-border, rgba(255, 255, 255, 0.1)); border-top: none; border-bottom: none; color: var(--color-text); padding: 4px 10px; cursor: pointer; font-size: 0.85rem;">A</button>
            <button id="btn-font-inc" title="Tăng cỡ chữ" style="background: transparent; border: none; color: var(--color-text); padding: 4px 10px; cursor: pointer; font-size: 0.85rem;">A+</button>
          </div>

          <!-- Print / Export -->
          <button id="btn-print-article" title="In hoặc lưu PDF" style="background: rgba(255, 255, 255, 0.06); border: 1px solid var(--color-border, rgba(255, 255, 255, 0.1)); color: var(--color-text); padding: 5px 12px; border-radius: 6px; cursor: pointer; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-print"></i>
            <span>In / PDF</span>
          </button>
        </div>
      </header>

      <!-- TWO COLUMN LAYOUT: SIDEBAR TOC + ARTICLE BODY -->
      <div class="article-reader-layout" style="display: grid; grid-template-columns: minmax(0, 1fr) 280px; gap: 2rem; align-items: start;">
        
        <!-- MAIN ARTICLE BODY CONTAINER -->
        <main class="article-main-body" id="handbook-rendered-body" style="background: var(--color-surface, #1e293b); border: 1px solid var(--color-border, rgba(255, 255, 255, 0.08)); border-radius: 16px; padding: 2.2rem 2.5rem; min-height: 500px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);">
          <!-- Loading state initially -->
          <div style="text-align: center; padding: 4rem 1rem; color: var(--color-text-muted);">
            <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 2rem; color: #0284c7; margin-bottom: 1rem;"></i>
            <p>Đang nạp bài đúc kết lâm sàng...</p>
          </div>
        </main>

        <!-- STICKY TABLE OF CONTENTS (TOC) -->
        <aside class="article-sidebar" style="position: sticky; top: 1.5rem; background: var(--color-surface, #1e293b); border: 1px solid var(--color-border, rgba(255, 255, 255, 0.08)); border-radius: 12px; padding: 1.25rem; max-height: calc(100vh - 3rem); overflow-y: auto;">
          <div style="font-size: 0.8rem; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-bars-staggered"></i>
            <span>Mục lục bài viết</span>
          </div>

          <div id="handbook-toc-container" style="font-size: 0.82rem; line-height: 1.5;">
            <p style="color: var(--color-text-muted);">Đang tạo mục lục...</p>
          </div>

          <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--color-border, rgba(255, 255, 255, 0.08));">
            <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 0.5rem;">
              <i class="fa-solid fa-graduation-cap" style="color: #34d399; margin-right: 4px;"></i>
              <strong>Sổ Tay Lâm Sàng CliniPortal</strong>
            </div>
            <p style="font-size: 0.72rem; color: var(--color-text-muted); margin: 0; line-height: 1.4;">
              Biên soạn theo nguyên tắc Y học chứng cứ (EBM), cập nhật AASLD 2024 / EASL 2024.
            </p>
          </div>
        </aside>

      </div>

    </div>
  `;
}

export async function initHandbookReaderView(specialtyId: SpecialtyId, diseaseSlug: string, articleSlug: string): Promise<void> {
  const mountEl = document.getElementById('handbook-rendered-body');
  const tocEl = document.getElementById('handbook-toc-container');
  if (!mountEl) return;

  const cleanArticleSlug = articleSlug.replace(/\.mdx$/i, '');

  // 1. Try finding raw MDX from eager glob
  let rawMdx = '';
  const searchPattern = `${specialtyId}/${diseaseSlug}/${cleanArticleSlug}.mdx`;

  for (const [key, val] of Object.entries(handbookMdxModules)) {
    if (key.includes(searchPattern) || key.endsWith(`${cleanArticleSlug}.mdx`)) {
      rawMdx = val;
      break;
    }
  }

  // 2. Fallback to fetch if not found in glob
  if (!rawMdx) {
    const candidatePaths = [
      `/src/content/clinical-handbook/${specialtyId}/${diseaseSlug}/${cleanArticleSlug}.mdx`,
      `src/content/clinical-handbook/${specialtyId}/${diseaseSlug}/${cleanArticleSlug}.mdx`,
      `./src/content/clinical-handbook/${specialtyId}/${diseaseSlug}/${cleanArticleSlug}.mdx`,
      `/src/content/clinical-handbook/${cleanArticleSlug}.mdx`
    ];

    for (const p of candidatePaths) {
      try {
        const fetchUrl = `${p}?raw`;
        let resp = await fetch(fetchUrl);
        if (!resp.ok) resp = await fetch(p);
        if (resp.ok) {
          rawMdx = await resp.text();
          break;
        }
      } catch {
        // Continue searching
      }
    }
  }

  if (!rawMdx) {
    mountEl.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem;">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 2.5rem; color: #ef4444; margin-bottom: 1rem;"></i>
        <h3 style="color: #ef4444; font-size: 1.25rem;">Chưa tìm thấy tệp MDX</h3>
        <p style="color: var(--color-text-muted); font-size: 0.9rem;">
          Tệp <code>${specialtyId}/${diseaseSlug}/${cleanArticleSlug}.mdx</code> hiện đang được cập nhật hoặc không tồn tại.
        </p>
        <a href="#/clinical-handbook/${specialtyId}/${diseaseSlug}" style="display: inline-block; margin-top: 1rem; color: #0284c7; font-weight: 600;">
          ← Quay lại danh mục bài viết
        </a>
      </div>
    `;
    return;
  }

  // 3. Parse with CliniMdxEngine
  const parsed = cliniMdxEngine.parse(rawMdx);
  const cleanTitle = parsed.title || cleanArticleSlug;

  const crumbEl = document.getElementById('handbook-reader-breadcrumb-title');
  if (crumbEl) crumbEl.textContent = cleanTitle;
  document.title = `${cleanTitle} – Sổ Tay Lâm Sàng CliniPortal`;

  // Render HTML into body
  mountEl.innerHTML = `
    <article class="mdx-rendered-article handbook-prose" style="font-size: 1.02rem; line-height: 1.75; color: var(--color-text, #e2e8f0);">
      ${parsed.html}
    </article>
  `;

  // Render TOC
  if (tocEl && parsed.toc && parsed.toc.length > 0) {
    tocEl.innerHTML = `
      <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.4rem;">
        ${parsed.toc.map(item => `
          <li style="margin-left: ${item.level === 3 ? '12px' : '0'};">
            <a 
              href="#${item.id}" 
              style="
                color: var(--color-text-muted, #94a3b8); 
                text-decoration: none; 
                display: block; 
                padding: 3px 6px; 
                border-radius: 4px; 
                transition: all 0.15s;
                border-left: 2px solid transparent;
              "
              class="handbook-toc-link"
              data-target="${item.id}"
            >
              ${item.text}
            </a>
          </li>
        `).join('')}
      </ul>
    `;

    // Smooth scroll for TOC links
    document.querySelectorAll('.handbook-toc-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = (link as HTMLElement).getAttribute('data-target');
        if (targetId) {
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.replaceState(null, '', `#${targetId}`);
          }
        }
      });
    });
  }

  // Font-size Resizer Controls
  let currentFontSize = 16;
  const proseEl = mountEl.querySelector('.handbook-prose') as HTMLElement | null;

  const btnDec = document.getElementById('btn-font-dec');
  const btnReset = document.getElementById('btn-font-reset');
  const btnInc = document.getElementById('btn-font-inc');
  const btnPrint = document.getElementById('btn-print-article');

  if (btnDec && proseEl) {
    btnDec.addEventListener('click', () => {
      if (currentFontSize > 13) {
        currentFontSize -= 1;
        proseEl.style.fontSize = `${currentFontSize}px`;
      }
    });
  }

  if (btnReset && proseEl) {
    btnReset.addEventListener('click', () => {
      currentFontSize = 16;
      proseEl.style.fontSize = `16px`;
    });
  }

  if (btnInc && proseEl) {
    btnInc.addEventListener('click', () => {
      if (currentFontSize < 22) {
        currentFontSize += 1;
        proseEl.style.fontSize = `${currentFontSize}px`;
      }
    });
  }

  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }
}
