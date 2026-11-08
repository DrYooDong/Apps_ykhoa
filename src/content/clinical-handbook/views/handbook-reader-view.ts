/**
 * CliniPortal — Clinical Handbook Article Reader SPA View
 * Path: src/content/clinical-handbook/views/handbook-reader-view.ts
 * 
 * Màn hình Cấp 4: Trình đọc bài viết Đúc kết MDX Native
 * Tích hợp Table of Contents (TOC), Font-size resizer, Print / PDF & EBM Badges
 * 100% Design Tokens & Dark/Light Mode Compliant
 */

import '../../../styles/components/clinical-handbook.css';
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
    <div class="handbook-reader-container" id="handbookReaderContainer">

      <!-- TOP BREADCRUMB -->
      <nav class="handbook-breadcrumb" aria-label="Breadcrumb">
        <a href="#/">🏠 Trang chủ</a>
        <span class="separator">/</span>
        <a href="#/clinical-handbook">Sổ tay Lâm sàng</a>
        <span class="separator">/</span>
        <a href="#/clinical-handbook/${specialty?.id || specialtyId}">${specialty?.shortName || specialtyId}</a>
        <span class="separator">/</span>
        <a href="#/clinical-handbook/${specialty?.id || specialtyId}/${disease?.slug || diseaseSlug}">${disease?.name || diseaseSlug}</a>
        <span class="separator">/</span>
        <span class="current" id="handbook-reader-breadcrumb-title">${article?.title || cleanArticleSlug}</span>
      </nav>

      <!-- READER TOOLBAR -->
      <header class="handbook-reader-toolbar">
        <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
          <a href="#/clinical-handbook/${specialtyId}/${diseaseSlug}" class="btn-handbook-back">
            <i class="fa-solid fa-arrow-left"></i>
            <span>Về ${disease?.name || 'Bệnh lý'}</span>
          </a>

          <span class="handbook-status-badge">
            <i class="fa-solid fa-shield-virus" style="margin-right: 4px;"></i>
            ${article?.evidenceLevel || 'EBM 2026'}
          </span>
        </div>

        <div style="display: flex; align-items: center; gap: 0.65rem; flex-wrap: wrap;">
          <!-- Font Size Adjusters -->
          <div class="font-size-control-group" aria-label="Điều chỉnh cỡ chữ">
            <button id="btn-font-dec" title="Giảm cỡ chữ">A-</button>
            <button id="btn-font-reset" title="Cỡ chữ mặc định">A</button>
            <button id="btn-font-inc" title="Tăng cỡ chữ">A+</button>
          </div>

          <!-- Print / Export -->
          <button id="btn-print-article" class="btn-reader-action" title="In hoặc lưu PDF">
            <i class="fa-solid fa-print"></i>
            <span>In / PDF</span>
          </button>
        </div>
      </header>

      <!-- TWO COLUMN LAYOUT: SIDEBAR TOC + ARTICLE BODY -->
      <div class="handbook-reader-layout">
        
        <!-- MAIN ARTICLE BODY CONTAINER -->
        <main class="handbook-article-body" id="handbook-rendered-body">
          <!-- Loading state initially -->
          <div style="text-align: center; padding: 4rem 1rem; color: var(--handbook-muted);">
            <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 2rem; color: var(--handbook-primary); margin-bottom: 1rem;"></i>
            <p>Đang nạp bài đúc kết lâm sàng...</p>
          </div>
        </main>

        <!-- STICKY TABLE OF CONTENTS (TOC) -->
        <aside class="handbook-reader-sidebar" aria-label="Mục lục bài viết">
          <div class="reader-sidebar-title">
            <i class="fa-solid fa-bars-staggered"></i>
            <span>Mục lục bài viết</span>
          </div>

          <div id="handbook-toc-container">
            <p style="color: var(--handbook-muted); font-size: 0.8rem;">Đang tạo mục lục...</p>
          </div>

          <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--handbook-divider);">
            <div style="font-size: 0.75rem; color: var(--handbook-muted); margin-bottom: 0.4rem;">
              <i class="fa-solid fa-graduation-cap" style="color: #34d399; margin-right: 4px;"></i>
              <strong style="color: var(--handbook-text);">Sổ Tay Lâm Sàng CliniPortal</strong>
            </div>
            <p style="font-size: 0.72rem; color: var(--handbook-muted); margin: 0; line-height: 1.45;">
              Biên soạn theo nguyên tắc Y học chứng cứ (EBM), đối chiếu AASLD 2024 / EASL 2024.
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
        <p style="color: var(--handbook-muted); font-size: 0.9rem;">
          Tệp <code>${specialtyId}/${diseaseSlug}/${cleanArticleSlug}.mdx</code> hiện đang được cập nhật hoặc không tồn tại.
        </p>
        <a href="#/clinical-handbook/${specialtyId}/${diseaseSlug}" class="btn-handbook-read" style="display: inline-flex; margin-top: 1rem;">
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

  // Render HTML into body with handbook prose formatting
  mountEl.innerHTML = `
    <article class="mdx-rendered-article handbook-prose">
      ${parsed.html}
    </article>
  `;

  // Render TOC
  if (tocEl && parsed.toc && parsed.toc.length > 0) {
    tocEl.innerHTML = `
      <ul class="handbook-toc-list">
        ${parsed.toc.map(item => `
          <li style="margin-left: ${item.level === 3 ? '12px' : '0'};">
            <a 
              href="#${item.id}" 
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

            document.querySelectorAll('.handbook-toc-link').forEach(l => l.classList.remove('is-active'));
            link.classList.add('is-active');
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
