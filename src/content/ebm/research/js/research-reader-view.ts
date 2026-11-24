/**
 * CliniPortal 2.0 — 3-Column Academic Research Article Reader View
 * Path: src/content/ebm/research/js/research-reader-view.ts
 *
 * Renders deep-analysis MDX research papers in a dedicated 3-column journal layout
 * (Left: Section Navigator, Center: Deep MDX Analysis, Right: Quantitative Trial Dossier
 * + Shared-Label Related Studies with 1-Click Direct Comparison).
 */

import '../css/research-studio.css';
import { sharedEbmMdxEngine, lookupSharedJournalMetric } from '../../shared-core';
import { hydrateFlowchartViewers } from '../../guidelines/js/core/flowchart-viewer';
import { hydrateFigureCards } from '../../guidelines/js/core/figure-lightbox';
import { hydrateForestPlots } from '../../guidelines/js/core/forest-plot-renderer';
import {
  GRADE_LABELS,
  IMPACT_VERDICTS,
  INTERVENTION_CLASSES,
  OUTCOME_DIRECTIONS,
  RESEARCH_CONDITIONS,
  RESEARCH_DESIGNS,
  ROB_LABELS
} from './research-taxonomy';
import { researchStore } from './research-store';
import type { ResearchStudyRecord } from './research-types';

const viteResearchMdxGlob: Record<string, () => Promise<string>> = (import.meta as unknown as {
  glob?: (pattern: string, opts: Record<string, unknown>) => Record<string, () => Promise<string>>;
}).glob
  ? (import.meta as unknown as {
      glob: (pattern: string, opts: Record<string, unknown>) => Record<string, () => Promise<string>>;
    }).glob('/src/content/ebm/research/kho-nghien-cuu/*.mdx', { query: '?raw', import: 'default' })
  : {};

function escapeHtml(str?: string | number | null): string {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildOfflineFallbackMdx(study: ResearchStudyRecord): string {
  const recs = (study.keyRecommendations || [])
    .map((r) => `<li>${escapeHtml(r)}</li>`)
    .join('');

  return `---
title: "${study.title.replace(/"/g, "'")}"
slug: "${study.slug}"
category: "research"
---
<div class="sec-card" id="sec-overview">
  <div class="sec-hdr"><h2 class="sec-title">1. Tóm Tắt Giải Phẫu Nghiên Cứu (Offline Snapshot)</h2></div>
  <div class="sec-body">
    <p>${escapeHtml(study.summary || study.description || '')}</p>
    <p><strong>Đối tượng (P):</strong> ${escapeHtml(study.population || 'Đang cập nhật')}</p>
    <p><strong>Can thiệp &amp; Đối chứng (I/C):</strong> ${escapeHtml(study.intervention || study.drug || 'Đang cập nhật')}</p>
    <p><strong>Tiêu chí chính (O):</strong> ${escapeHtml(study.primaryEndpoint || 'Đang cập nhật')}</p>
    <p><strong>Kết quả định lượng:</strong> ${escapeHtml(study.keyResults || '')}</p>
    ${recs ? `<ul>${recs}</ul>` : ''}
    <p><strong>Kết luận thực hành:</strong> ${escapeHtml(study.detailedConclusion || '')}</p>
  </div>
</div>`;
}

export function renderResearchReaderView(rawSlug: string): string {
  researchStore.init();
  const cleanSlug = rawSlug.replace(/^.*\//, '').replace(/\.(mdx|html)$/i, '');
  const study = researchStore.getStudyBySlugOrId(cleanSlug);
  const savedFont =
    typeof localStorage !== 'undefined' ? Number(localStorage.getItem('cp_res_reader_font') || '16') : 16;

  setTimeout(() => {
    void hydrateResearchArticle(cleanSlug);
  }, 20);

  if (!study) {
    return `
      <div class="res-reader-root">
        <div class="res-shell-container" style="max-width: 720px; padding-top: 3rem;">
          <div class="res-article-canvas" style="text-align: center; padding: 3rem 1.5rem;">
            <i class="fa-solid fa-flask-vial" style="font-size: 2.8rem; color: var(--res-primary); margin-bottom: 1rem;"></i>
            <h2 style="font-family: var(--res-font-display); margin-bottom: 0.5rem;">Không tìm thấy bài phân tích nghiên cứu</h2>
            <p style="color: var(--res-text-muted); margin-bottom: 1.5rem;">Mã định danh <code>${escapeHtml(cleanSlug)}</code> chưa có trong Kho Nghiên Cứu.</p>
            <a href="#/ebm/research" class="res-btn res-btn-primary">
              <i class="fa-solid fa-arrow-left"></i> Quay lại Kho Nghiên Cứu
            </a>
          </div>
        </div>
      </div>
    `;
  }

  const jMeta = lookupSharedJournalMetric(study.journal);
  const designMeta = RESEARCH_DESIGNS[study.design] || {
    label: study.design,
    shortLabel: study.design,
    icon: 'fa-solid fa-flask',
    tone: 'indigo' as const
  };
  const dirMeta = OUTCOME_DIRECTIONS[study.outcomeDirection] || {
    label: study.outcomeDirection,
    shortLabel: study.outcomeDirection,
    icon: 'fa-solid fa-chart-simple',
    tone: 'teal' as const
  };
  const verdictMeta = IMPACT_VERDICTS[study.impactVerdict] || {
    label: study.impactVerdict,
    shortLabel: study.impactVerdict,
    icon: 'fa-solid fa-bolt',
    tone: 'indigo' as const
  };
  const robMeta = ROB_LABELS[study.robOverall] || { label: study.robOverall, tone: 'slate' as const };
  const gradeMeta = GRADE_LABELS[study.gradeCertainty] || {
    label: study.gradeCertainty,
    stars: '⊕⊕⊕◯',
    tone: 'teal' as const
  };
  const isCompared = researchStore.isInCompare(study.id);
  const relatedList = researchStore.getRelatedStudiesByLabels(study, 4);

  const pm = study.primaryMetric;
  const metricSummary = pm?.effectEstimate
    ? `${pm.measure || 'HR'} ${pm.effectEstimate}${
        pm.ciLower && pm.ciUpper ? ` (${pm.ciLower}–${pm.ciUpper})` : ''
      }`
    : null;

  return `
    <div class="res-reader-root" id="res-reader-root">
      <!-- Top Academic Control Bar -->
      <header class="res-reader-topbar">
        <nav class="res-breadcrumb" aria-label="Breadcrumb">
          <a href="#/ebm"><i class="fa-solid fa-scale-balanced"></i> Y học Chứng cứ</a>
          <span>/</span>
          <a href="#/ebm/research"><i class="fa-solid fa-microscope"></i> Kho Nghiên Cứu</a>
          <span>/</span>
          <span style="font-weight: 800; color: var(--res-text);">${escapeHtml(
            study.trialAcronym || study.slug
          )}</span>
        </nav>

        <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 0.45rem;">
          <button type="button" class="res-btn" id="res-font-dec-btn" title="Giảm cỡ chữ">A-</button>
          <span id="res-font-val" style="font-family: var(--res-font-mono); font-size: 0.78rem; font-weight: 700; min-width: 38px; text-align: center;">${savedFont}px</span>
          <button type="button" class="res-btn" id="res-font-inc-btn" title="Tăng cỡ chữ">A+</button>

          <button type="button" class="res-btn ${
            isCompared ? 'res-btn-primary' : 'res-btn-teal'
          }" id="res-reader-compare-btn" data-study-id="${escapeHtml(study.id)}">
            <i class="fa-solid fa-scale-balanced"></i>
            <span>${isCompared ? 'Đã ghim vào Bàn Cân' : '+ Ghim vào Bàn Cân'}</span>
          </button>

          <button type="button" class="res-btn" onclick="window.print()" title="In hoặc xuất PDF">
            <i class="fa-solid fa-print"></i>
          </button>
        </div>
      </header>

      <!-- Academic Paper Masthead -->
      <section class="res-paper-masthead">
        <div class="res-eyebrow-row">
          <span class="res-eyebrow-pill"><i class="${designMeta.icon}"></i> ${escapeHtml(designMeta.label)}</span>
          <span class="res-eyebrow-pill"><i class="fa-regular fa-newspaper"></i> ${escapeHtml(study.journal)} • ${study.year}</span>
          ${
            jMeta?.impactFactor
              ? `<span class="res-eyebrow-pill">IF ${jMeta.impactFactor} • ${jMeta.quartile}</span>`
              : ''
          }
          ${
            study.nctId
              ? `<span class="res-eyebrow-pill">${escapeHtml(study.nctId)}</span>`
              : ''
          }
          ${
            study.doi
              ? `<span class="res-eyebrow-pill">DOI: ${escapeHtml(study.doi)}</span>`
              : ''
          }
        </div>

        <h1 class="res-masthead-title">${escapeHtml(study.title)}</h1>
        ${
          study.titleEn
            ? `<p style="margin: 0 0 0.85rem; font-size: 0.92rem; font-style: italic; color: var(--res-hero-muted);">${escapeHtml(
                study.titleEn
              )}</p>`
            : ''
        }

        <div style="display: flex; flex-wrap: wrap; gap: 0.45rem; align-items: center;">
          <a href="#/ebm/research?condition=${encodeURIComponent(
            study.conditionKey
          )}" class="res-eyebrow-pill" style="text-decoration: none;">
            🩺 Bệnh/Vấn đề: ${escapeHtml(RESEARCH_CONDITIONS[study.conditionKey] || study.conditionKey)}
          </a>
          <a href="#/ebm/research?intervention=${encodeURIComponent(
            study.interventionClass
          )}" class="res-eyebrow-pill" style="text-decoration: none;">
            💊 Nhóm: ${escapeHtml(INTERVENTION_CLASSES[study.interventionClass] || study.interventionClass)}
          </a>
          <span class="res-eyebrow-pill">📊 KQ: ${escapeHtml(dirMeta.shortLabel || dirMeta.label)}</span>
          <span class="res-eyebrow-pill">⚡ ${escapeHtml(verdictMeta.shortLabel || verdictMeta.label)}</span>
        </div>
      </section>

      <!-- 3-Column Journal Dissection Layout -->
      <div class="res-reader-3col">
        <!-- Column 1: Sticky Section TOC -->
        <aside class="res-reader-toc-card" aria-label="Mục lục giải phẫu nghiên cứu">
          <div class="res-facet-heading">
            <span><i class="fa-solid fa-list-ol"></i> Giải Phẫu Bài Báo</span>
          </div>
          <nav id="res-reader-toc-list">
            ${(study.sections || [])
              .map(
                (sec, idx) => `
              <a href="#${escapeHtml(sec.id)}" class="res-toc-link" data-toc-target="${escapeHtml(sec.id)}">
                <span style="font-family: var(--res-font-mono); color: var(--res-primary); font-weight: 800;">${String(
                  sec.number ?? idx + 1
                ).padStart(2, '0')}</span>
                <span>${escapeHtml(sec.title)}</span>
              </a>
            `
              )
              .join('')}
          </nav>
        </aside>

        <!-- Column 2: Full MDX Deep Analysis Canvas -->
        <main class="res-article-canvas" id="res-article-mount" style="font-size: ${savedFont}px;">
          <div style="text-align: center; padding: 4rem 1rem; color: var(--res-text-muted);">
            <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 2rem; color: var(--res-primary); margin-bottom: 0.75rem;"></i>
            <div>Đang nạp bài phân tích chuyên sâu MDX...</div>
          </div>
        </main>

        <!-- Column 3: Quantitative Trial Dossier & Shared-Label Comparison Matcher -->
        <aside class="res-reader-dossier-card" aria-label="Hồ sơ định lượng và đối sánh chéo">
          <div class="res-facet-heading">
            <span><i class="fa-solid fa-chart-column"></i> Hồ Sơ Định Lượng</span>
          </div>

          <div>
            <div class="res-dossier-kv">
              <span style="color: var(--res-text-muted);">Thiết kế</span>
              <strong>${escapeHtml(designMeta.shortLabel || study.design)}</strong>
            </div>
            ${
              study.blinding
                ? `<div class="res-dossier-kv"><span style="color: var(--res-text-muted);">Làm mù</span><strong>${escapeHtml(
                    study.blinding
                  )}</strong></div>`
                : ''
            }
            <div class="res-dossier-kv">
              <span style="color: var(--res-text-muted);">Cỡ mẫu (N)</span>
              <strong style="font-family: var(--res-font-mono);">${
                study.sampleSize ? study.sampleSize.toLocaleString('en-US') : 'Tổng hợp'
              }</strong>
            </div>
            ${
              study.followUpDuration
                ? `<div class="res-dossier-kv"><span style="color: var(--res-text-muted);">Theo dõi</span><strong>${escapeHtml(
                    study.followUpDuration
                  )}</strong></div>`
                : ''
            }
            ${
              metricSummary
                ? `<div class="res-dossier-kv"><span style="color: var(--res-text-muted);">Chỉ số chính</span><strong style="font-family: var(--res-font-mono); color: var(--res-primary);">${escapeHtml(
                    metricSummary
                  )}</strong></div>`
                : ''
            }
            ${
              pm?.nnt
                ? `<div class="res-dossier-kv"><span style="color: var(--res-text-muted);">NNT</span><strong style="font-family: var(--res-font-mono); color: var(--res-emerald);">NNT = ${pm.nnt}</strong></div>`
                : ''
            }
            <div class="res-dossier-kv">
              <span style="color: var(--res-text-muted);">Sai lệch (RoB)</span>
              <span class="res-tag tone-${robMeta.tone}">${escapeHtml(robMeta.label)}</span>
            </div>
            <div class="res-dossier-kv">
              <span style="color: var(--res-text-muted);">Mức GRADE</span>
              <span class="res-tag tone-${gradeMeta.tone}">${gradeMeta.stars}</span>
            </div>
          </div>

          ${
            study.safetyHighlight
              ? `<div style="margin-top: 0.85rem; padding: 0.7rem; border-radius: 10px; background: var(--res-rose-soft); border: 1px solid var(--res-rose-border); font-size: 0.78rem; line-height: 1.5;">
                  <strong style="color: var(--res-rose);"><i class="fa-solid fa-shield-heart"></i> Tín hiệu An toàn:</strong><br/>
                  ${escapeHtml(study.safetyHighlight)}
                </div>`
              : ''
          }

          ${
            study.sourceUrl
              ? `<a href="${escapeHtml(
                  study.sourceUrl
                )}" target="_blank" rel="noopener noreferrer" class="res-btn" style="width: 100%; margin-top: 0.85rem;">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i> Mở Bài Báo Gốc
                </a>`
              : ''
          }

          <!-- Shared-Label Related Studies -->
          <div style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid var(--res-border);">
            <div class="res-facet-heading">
              <span><i class="fa-solid fa-code-compare"></i> Nghiên Cứu Cùng Nhãn</span>
            </div>
            ${
              relatedList.length === 0
                ? `<p style="font-size: 0.78rem; color: var(--res-text-muted);">Chưa có bài nghiên cứu khác cùng nhãn để đối chiếu.</p>`
                : relatedList
                    .map(
                      ({ study: rel, sharedBadges }) => `
                  <div class="res-related-item">
                    <div style="display: flex; flex-wrap: wrap; gap: 0.25rem; margin-bottom: 0.35rem;">
                      ${sharedBadges
                        .map(
                          (b) =>
                            `<span class="res-tag ${
                              b.startsWith('⚡') ? 'tone-amber' : 'tone-indigo'
                            }" style="font-size: 0.67rem; padding: 0.1rem 0.4rem;">${escapeHtml(b)}</span>`
                        )
                        .join('')}
                    </div>
                    <a href="#/ebm/kho-nghien-cuu/${escapeHtml(
                      rel.slug
                    )}" style="font-family: var(--res-font-display); font-size: 0.82rem; font-weight: 800; color: var(--res-text); text-decoration: none; display: block; line-height: 1.35; margin-bottom: 0.45rem;">
                      ${escapeHtml(rel.trialAcronym ? `[${rel.trialAcronym}] ` : '')}${escapeHtml(rel.title)}
                    </a>
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.4rem;">
                      <span style="font-family: var(--res-font-mono); font-size: 0.7rem; color: var(--res-text-muted);">${escapeHtml(
                        rel.journal
                      )} (${rel.year})</span>
                      <button type="button" class="res-btn res-pair-compare-btn" data-pair-a="${escapeHtml(
                        study.id
                      )}" data-pair-b="${escapeHtml(
                        rel.id
                      )}" style="min-height: 34px; padding: 0.2rem 0.55rem; font-size: 0.73rem;">
                        <i class="fa-solid fa-scale-balanced"></i> So sánh đôi
                      </button>
                    </div>
                  </div>
                `
                    )
                    .join('')
            }
          </div>
        </aside>
      </div>
    </div>
  `;
}

async function hydrateResearchArticle(slug: string): Promise<void> {
  const mountEl = document.getElementById('res-article-mount');
  if (!mountEl) return;

  const study = researchStore.getStudyBySlugOrId(slug);
  let rawMdx = '';

  // 1. Try Vite Raw Glob
  for (const [modPath, loader] of Object.entries(viteResearchMdxGlob)) {
    if (modPath.endsWith(`/${slug}.mdx`)) {
      try {
        const loaded = await loader();
        if (loaded && !loaded.includes('<!DOCTYPE html>')) {
          rawMdx = loaded;
          break;
        }
      } catch {
        // fallback to fetch
      }
    }
  }

  // 2. Try HTTP Fetch
  if (!rawMdx) {
    const candidates = [
      `/src/content/ebm/research/kho-nghien-cuu/${slug}.mdx?raw`,
      `/src/content/ebm/research/kho-nghien-cuu/${slug}.mdx`,
      `src/content/ebm/research/kho-nghien-cuu/${slug}.mdx`
    ];
    for (const url of candidates) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const text = await res.text();
          if (text && !text.includes('<!DOCTYPE html>')) {
            rawMdx = text;
            break;
          }
        }
      } catch {
        // ignore
      }
    }
  }

  // 3. Offline file:/// Fallback
  if (!rawMdx && study) {
    rawMdx = buildOfflineFallbackMdx(study);
  }

  const parsed = sharedEbmMdxEngine.parse(rawMdx, {
    imageBasePath: 'src/content/ebm/research/kho-nghien-cuu/images'
  });

  mountEl.innerHTML = `<article class="research-mdx-article">${parsed.html}</article>`;

  // Populate TOC dynamically if frontmatter sections were empty
  const tocContainer = document.getElementById('res-reader-toc-list');
  if (tocContainer && tocContainer.children.length === 0 && parsed.toc.length > 0) {
    tocContainer.innerHTML = parsed.toc
      .map(
        (t, idx) => `
      <a href="#${escapeHtml(t.id)}" class="res-toc-link" data-toc-target="${escapeHtml(t.id)}">
        <span style="font-family: var(--res-font-mono); color: var(--res-primary); font-weight: 800;">${String(
          idx + 1
        ).padStart(2, '0')}</span>
        <span>${escapeHtml(t.text)}</span>
      </a>`
      )
      .join('');
  }

  // Smooth TOC anchor clicks (prevent SPA hash router hijack!)
  document.querySelectorAll<HTMLAnchorElement>('#res-reader-root a[href^="#sec-"], #res-reader-root [data-toc-target]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const targetId = a.getAttribute('data-toc-target') || (a.getAttribute('href') || '').replace(/^#/, '');
      const secEl = targetId ? document.getElementById(targetId) : null;
      if (secEl) {
        e.preventDefault();
        secEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Hydrate visual interactive blocks inside MDX
  try {
    hydrateFlowchartViewers(mountEl);
    hydrateFigureCards(mountEl);
    hydrateForestPlots(mountEl);
  } catch {
    // Non-blocking hydration
  }

  // Bind Reader Controls (Font size, Compare toggle, Pairwise compare)
  let curFont = Number(localStorage.getItem('cp_res_reader_font') || '16');
  const fontValEl = document.getElementById('res-font-val');
  const updateFont = (delta: number): void => {
    curFont = Math.max(14, Math.min(22, curFont + delta));
    mountEl.style.fontSize = `${curFont}px`;
    if (fontValEl) fontValEl.textContent = `${curFont}px`;
    try {
      localStorage.setItem('cp_res_reader_font', String(curFont));
    } catch {
      // ignore
    }
  };
  document.getElementById('res-font-dec-btn')?.addEventListener('click', () => updateFont(-1));
  document.getElementById('res-font-inc-btn')?.addEventListener('click', () => updateFont(1));

  const cmpBtn = document.getElementById('res-reader-compare-btn');
  cmpBtn?.addEventListener('click', () => {
    const id = cmpBtn.getAttribute('data-study-id');
    if (!id) return;
    const res = researchStore.toggleCompare(id);
    cmpBtn.classList.toggle('res-btn-primary', res.added);
    cmpBtn.classList.toggle('res-btn-teal', !res.added);
    const span = cmpBtn.querySelector('span');
    if (span) span.textContent = res.added ? 'Đã ghim vào Bàn Cân' : '+ Ghim vào Bàn Cân';
  });

  document.querySelectorAll<HTMLButtonElement>('.res-pair-compare-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const a = btn.getAttribute('data-pair-a');
      const b = btn.getAttribute('data-pair-b');
      if (a && b) {
        researchStore.loadClusterIntoCompare([a, b]);
        window.location.hash = '#/ebm/research?mode=compare';
      }
    });
  });
}
