/**
 * CliniPortal 2.0 — 3-Column Academic Research Article Reader View (v3.0)
 * Path: src/content/ebm/research/js/research-reader-view.ts
 *
 * Features:
 *  - Dedicated NEJM/Nature Editorial stylesheet (research-article.css)
 *  - Fixed top Reading Progress Bar + IntersectionObserver Active TOC ScrollSpy
 *  - Interactive 9-Axis Decomposed Label Anatomy Card (click any label -> compare peers in 1 click)
 *  - Reading Depth Switcher (30s Executive Brief vs Full Dissection) + Focus/Zen Mode
 *  - Interactive EBM Statistical Glossary Tooltips (HR, RR, OR, 95% CI, NNT, RoB 2.0, AUC)
 *  - Right Dossier: Quantitative Metrics, Citation Copier (AMA / Vancouver / BibTeX), Personal Notes & Label-Matched Peers
 */

import '../css/research-studio.css';
import '../css/research-article.css';
import { sharedEbmMdxEngine, lookupSharedJournalMetric } from '../../shared-core';
import { hydrateFlowchartViewers } from '../../guidelines/js/core/flowchart-viewer';
import { hydrateFigureCards } from '../../guidelines/js/core/figure-lightbox';
import { hydrateForestPlots } from '../../guidelines/js/core/forest-plot-renderer';
import { hydrateEbmGlossaryTooltips } from '../../guidelines/js/core/ebm-depth-and-glossary';
import { KHO_GUIDELINES_STATIC } from '../../guidelines/js/kho-guidelines-registry';
import {
  ATOMIC_AXIS_META,
  decomposeStudyLabels,
  FUNDING_LABELS,
  GRADE_LABELS,
  IMPACT_VERDICTS,
  INTERVENTION_CLASSES,
  OUTCOME_DIRECTIONS,
  RESEARCH_CONDITIONS,
  RESEARCH_DESIGNS,
  ROB_LABELS
} from './research-taxonomy';
import { researchStore } from './research-store';
import type { AtomicLabelAxis, ResearchAtomicLabel, ResearchStudyRecord } from './research-types';

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

function buildCitationText(study: ResearchStudyRecord, format: 'ama' | 'vancouver' | 'bibtex'): string {
  const titleText = study.titleEn || study.title;
  const authorText = study.authors || study.organization || 'Study Investigators';
  const doiSuffix = study.doi ? ` doi:${study.doi}` : '';
  const nctSuffix = study.nctId ? ` (${study.nctId})` : '';

  if (format === 'vancouver') {
    return `${authorText}. ${titleText}. ${study.journal}. ${study.year}.${doiSuffix}${nctSuffix}`;
  }
  if (format === 'bibtex') {
    const key = (study.trialAcronym || study.slug).replace(/[^a-zA-Z0-9]/g, '').toLowerCase() + study.year;
    return `@article{${key},\n  title = {${titleText}},\n  author = {${authorText}},\n  journal = {${study.journal}},\n  year = {${study.year}}${
      study.doi ? `,\n  doi = {${study.doi}}` : ''
    }\n}`;
  }
  // AMA default
  return `${authorText}. ${titleText}. ${study.journal}. ${study.year}.${doiSuffix}`;
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

function renderDecomposedLabelAnatomyCard(study: ResearchStudyRecord): string {
  const labels = decomposeStudyLabels(study);
  const axesOrder: AtomicLabelAxis[] = [
    'condition',
    'population',
    'design',
    'intervention',
    'comparator',
    'endpoint',
    'outcome',
    'quality',
    'topic'
  ];

  const groupedCells = axesOrder
    .map((axis) => {
      const axisLabels = labels.filter((l) => l.axis === axis);
      if (axisLabels.length === 0) return '';
      const meta = ATOMIC_AXIS_META[axis];
      return `
        <div class="res-label-axis-cell">
          <div class="res-label-axis-name">
            <i class="${meta.icon}" style="color: var(--res-primary);"></i>
            <span>${escapeHtml(meta.short)}</span>
          </div>
          <div class="res-label-axis-pills">
            ${axisLabels
              .map((lbl) => {
                const peers = researchStore.getStudiesByAtomicLabelKey(lbl.key);
                return `
                  <button
                    type="button"
                    class="res-atomic-pill tone-${lbl.tone} js-reader-atomic-label"
                    data-label-key="${escapeHtml(lbl.key)}"
                    data-facet="${lbl.facetKey}"
                    data-val="${escapeHtml(lbl.value)}"
                    data-label-text="${escapeHtml(lbl.label)}"
                    data-axis-short="${escapeHtml(lbl.axisShort)}"
                    title="Bấm để xem &amp; so sánh các nghiên cứu mang cùng nhãn này (${peers.length} bài)"
                  >
                    <span>${escapeHtml(lbl.label)}</span>
                    <span class="res-atomic-pill-count">${peers.length}</span>
                  </button>
                `;
              })
              .join('')}
          </div>
        </div>
      `;
    })
    .filter(Boolean)
    .join('');

  return `
    <section class="res-label-anatomy-card" aria-label="Tách nhãn nguyên tử 9 trục của nghiên cứu">
      <div class="res-label-anatomy-hdr">
        <div class="res-label-anatomy-title">
          <i class="fa-solid fa-tags" style="color: var(--res-primary);"></i>
          <span>Tách Nhãn Nguyên Tử Của Nghiên Cứu (${labels.length} nhãn trên 9 trục)</span>
        </div>
        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.45rem;">
          <span style="font-size: 0.74rem; color: var(--res-text-muted);">Bấm vào bất kỳ nhãn nào để so sánh ngay với các nghiên cứu cùng nhãn</span>
          <a href="#/ebm/research?mode=labels" class="res-mini-action-btn is-primary" style="text-decoration: none;">
            <i class="fa-solid fa-diagram-project"></i> Bản Đồ Tách Nhãn
          </a>
        </div>
      </div>

      <div class="res-label-anatomy-grid">
        ${groupedCells}
      </div>

      <div id="res-label-match-mount"></div>
    </section>
  `;
}

function renderExecutiveBriefDeck(study: ResearchStudyRecord): string {
  const dir = OUTCOME_DIRECTIONS[study.outcomeDirection];
  const verdict = IMPACT_VERDICTS[study.impactVerdict];
  return `
    <div class="res-quick-brief-deck" id="res-quick-brief-deck" style="display: none;">
      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.75rem;">
        <strong style="font-family: var(--res-font-display); font-size: 0.96rem; color: var(--res-primary);">
          <i class="fa-solid fa-bolt"></i> Tóm Tắt Executive 30 Giây — Cốt Lõi Thực Hành
        </strong>
        <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
          <span class="res-tag tone-${dir?.tone || 'teal'}">${escapeHtml(dir?.shortLabel || study.outcomeDirection)}</span>
          <span class="res-tag tone-${verdict?.tone || 'indigo'}">${escapeHtml(verdict?.shortLabel || study.impactVerdict)}</span>
        </div>
      </div>
      ${study.summary ? `<p style="margin: 0 0 0.75rem; font-size: 0.9rem; line-height: 1.65;">${escapeHtml(study.summary)}</p>` : ''}
      ${
        study.keyResults
          ? `<div style="background: var(--res-surface); border: 1px solid var(--res-border); border-radius: 10px; padding: 0.75rem 0.9rem; margin-bottom: 0.75rem; font-size: 0.84rem; line-height: 1.55;">
              <strong style="color: var(--res-primary);">📈 Số liệu định lượng trọng tâm:</strong> ${escapeHtml(study.keyResults)}
            </div>`
          : ''
      }
      ${
        study.detailedConclusion
          ? `<div style="background: var(--res-emerald-soft); border: 1px solid var(--res-emerald-border); border-radius: 10px; padding: 0.75rem 0.9rem; font-size: 0.84rem; line-height: 1.55;">
              <strong style="color: var(--res-emerald);">💡 Phán quyết áp dụng lâm sàng:</strong> ${escapeHtml(study.detailedConclusion)}
            </div>`
          : ''
      }
    </div>
  `;
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
    // Redirect automatically if document belongs to Kho Guidelines
    const movedGuideline = KHO_GUIDELINES_STATIC.find((item) => {
      const fileSlug = (item.file || '').replace(/\.(mdx|html)$/i, '');
      return fileSlug === cleanSlug || item.id === cleanSlug;
    });
    if (movedGuideline && typeof window !== 'undefined') {
      setTimeout(() => {
        window.location.hash = `#/ebm/kho-guidelines/${cleanSlug}`;
      }, 0);
      return `
        <div class="res-reader-root">
          <div class="res-shell-container" style="max-width: 720px; padding-top: 3rem;">
            <div class="res-article-canvas" style="text-align: center; padding: 3rem 1.5rem;">
              <i class="fa-solid fa-arrow-right-arrow-left" style="font-size: 2.2rem; color: var(--res-primary); margin-bottom: 1rem;"></i>
              <h2 style="font-family: var(--res-font-display); margin-bottom: 0.5rem;">Đang chuyển sang Kho Guidelines...</h2>
              <p style="color: var(--res-text-muted); margin-bottom: 1.5rem;">Tài liệu <code>${escapeHtml(cleanSlug)}</code> thuộc nhóm Hướng dẫn / Tiếp cận lâm sàng.</p>
              <a href="#/ebm/kho-guidelines/${escapeHtml(cleanSlug)}" class="res-btn res-btn-primary">
                Mở trong Kho Guidelines
              </a>
            </div>
          </div>
        </div>
      `;
    }

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
  const robMeta = ROB_LABELS[study.robOverall] || {
    label: study.robOverall,
    shortLabel: study.robOverall,
    tone: 'slate' as const
  };
  const gradeMeta = GRADE_LABELS[study.gradeCertainty] || {
    label: study.gradeCertainty,
    shortLabel: study.gradeCertainty,
    stars: '⊕⊕⊕◯',
    tone: 'teal' as const
  };
  const fundMeta = study.fundingSource ? FUNDING_LABELS[study.fundingSource] : null;

  const isCompared = researchStore.isInCompare(study.id);
  const isSaved = Boolean(study.bookmarked);
  const relatedList = researchStore.getRelatedStudiesByLabels(study, 4);
  const personalNote = researchStore.getPersonalNote(study.id);

  const pm = study.primaryMetric;
  const metricSummary = pm?.effectEstimate
    ? `${pm.measure || 'HR'} ${pm.effectEstimate}${
        pm.ciLower && pm.ciUpper ? ` (${pm.ciLower}–${pm.ciUpper})` : ''
      }`
    : pm?.measure
      ? `${pm.measure}${pm.pValue ? ` (p=${pm.pValue})` : ''}`
      : null;

  const clusterCompareIds = [study.id, ...relatedList.slice(0, 3).map((r) => r.study.id)].join(',');

  return `
    <div class="res-reading-progress" id="res-reading-progress" aria-hidden="true"></div>

    <div class="res-reader-root" id="res-reader-root">
      <!-- Top Academic Control Bar -->
      <header class="res-reader-topbar">
        <nav class="res-breadcrumb" aria-label="Breadcrumb">
          <a href="#/ebm"><i class="fa-solid fa-scale-balanced"></i> Y học Chứng cứ</a>
          <span>/</span>
          <a href="#/ebm/research"><i class="fa-solid fa-microscope"></i> CliniResearch Studio</a>
          <span>/</span>
          <span style="font-weight: 800; color: var(--res-text);">${escapeHtml(
            study.trialAcronym || study.slug
          )}</span>
        </nav>

        <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 0.4rem;">
          <button type="button" class="res-btn" id="res-font-dec-btn" title="Giảm cỡ chữ" style="min-height: 38px; padding: 0.3rem 0.65rem;">A-</button>
          <span id="res-font-val" style="font-family: var(--res-font-mono); font-size: 0.76rem; font-weight: 700; min-width: 36px; text-align: center;">${savedFont}px</span>
          <button type="button" class="res-btn" id="res-font-inc-btn" title="Tăng cỡ chữ" style="min-height: 38px; padding: 0.3rem 0.65rem;">A+</button>

          <button type="button" class="res-btn" id="res-zen-toggle-btn" title="Chế độ đọc tập trung (ẩn 2 cột bên)" style="min-height: 38px;">
            <i class="fa-solid fa-expand"></i> <span>Tập trung</span>
          </button>

          <button type="button" class="res-icon-btn ${isSaved ? 'is-active' : ''}" id="res-reader-bookmark-btn" data-study-id="${escapeHtml(
            study.id
          )}" title="Đánh dấu lưu bài học" style="min-width: 38px; min-height: 38px;">
            <i class="${isSaved ? 'fa-solid' : 'fa-regular'} fa-bookmark"></i>
          </button>

          <button type="button" class="res-btn ${
            isCompared ? 'res-btn-primary' : 'res-btn-teal'
          }" id="res-reader-compare-btn" data-study-id="${escapeHtml(study.id)}" style="min-height: 38px;">
            <i class="fa-solid fa-scale-balanced"></i>
            <span>${isCompared ? 'Đã ghim vào Bàn Cân' : '+ Ghim vào Bàn Cân'}</span>
          </button>

          <button type="button" class="res-btn" onclick="window.print()" title="In hoặc xuất PDF Journal Club" style="min-height: 38px;">
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
            study.sampleSize
              ? `<span class="res-eyebrow-pill"><i class="fa-solid fa-users"></i> N = ${study.sampleSize.toLocaleString('en-US')}</span>`
              : ''
          }
          ${study.nctId ? `<span class="res-eyebrow-pill">${escapeHtml(study.nctId)}</span>` : ''}
          ${study.doi ? `<span class="res-eyebrow-pill">DOI: ${escapeHtml(study.doi)}</span>` : ''}
        </div>

        <h1 class="res-masthead-title">${escapeHtml(study.title)}</h1>
        ${
          study.titleEn
            ? `<p style="margin: 0 0 0.9rem; font-size: 0.92rem; font-style: italic; color: var(--res-hero-muted);">${escapeHtml(
                study.titleEn
              )}</p>`
            : ''
        }

        <div style="display: flex; flex-wrap: wrap; gap: 0.45rem; align-items: center;">
          <a href="#/ebm/research?condition=${encodeURIComponent(
            study.conditionKey
          )}" class="res-eyebrow-pill" style="text-decoration: none;">
            🩺 ${escapeHtml(RESEARCH_CONDITIONS[study.conditionKey] || study.conditionKey)}
          </a>
          <a href="#/ebm/research?intervention=${encodeURIComponent(
            study.interventionClass
          )}" class="res-eyebrow-pill" style="text-decoration: none;">
            💊 ${escapeHtml(INTERVENTION_CLASSES[study.interventionClass] || study.interventionClass)}
          </a>
          <span class="res-eyebrow-pill">📊 ${escapeHtml(dirMeta.shortLabel || dirMeta.label)}</span>
          <span class="res-eyebrow-pill">⚡ ${escapeHtml(verdictMeta.shortLabel || verdictMeta.label)}</span>
          <span class="res-eyebrow-pill">${gradeMeta.stars} ${escapeHtml(gradeMeta.shortLabel)}</span>
        </div>
      </section>

      <!-- Decomposed 9-Axis Atomic Label Strip (Click any label to compare peers immediately!) -->
      ${renderDecomposedLabelAnatomyCard(study)}

      <!-- 3-Column Journal Dissection Layout -->
      <div class="res-reader-3col">
        <!-- Column 1: Sticky Section TOC with ScrollSpy -->
        <aside class="res-reader-toc-card" aria-label="Mục lục giải phẫu nghiên cứu">
          <div class="res-facet-heading">
            <span><i class="fa-solid fa-list-ol"></i> Giải Phẫu Bài Báo</span>
            <span class="res-facet-count" id="res-toc-count">${(study.sections || []).length} mục</span>
          </div>
          <nav id="res-reader-toc-list">
            ${(study.sections || [])
              .map(
                (sec, idx) => `
              <a href="#${escapeHtml(sec.id)}" class="res-toc-link ${idx === 0 ? 'is-active' : ''}" data-toc-target="${escapeHtml(sec.id)}">
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
        <main class="res-article-canvas" id="res-article-wrapper">
          <div class="res-depth-bar" role="region" aria-label="Chế độ chiều sâu bài học">
            <div class="res-depth-pills">
              <button type="button" class="res-depth-btn" id="res-depth-basic-btn">
                <i class="fa-solid fa-bolt"></i> Tóm tắt nhanh 30s
              </button>
              <button type="button" class="res-depth-btn is-active" id="res-depth-deep-btn">
                <i class="fa-solid fa-microscope"></i> Giải phẫu toàn phần MDX
              </button>
            </div>
            <span style="font-family: var(--res-font-mono); font-size: 0.72rem; color: var(--res-text-muted);" id="res-read-time-badge">
              <i class="fa-regular fa-clock"></i> Đang tính thời gian đọc...
            </span>
          </div>

          ${renderExecutiveBriefDeck(study)}

          <div id="res-article-mount" style="font-size: ${savedFont}px;">
            <div style="text-align: center; padding: 4rem 1rem; color: var(--res-text-muted);">
              <i class="fa-solid fa-circle-notch fa-spin" style="font-size: 2rem; color: var(--res-primary); margin-bottom: 0.75rem;"></i>
              <div>Đang nạp bài phân tích chuyên sâu MDX...</div>
            </div>
          </div>
        </main>

        <!-- Column 3: Quantitative Trial Dossier, Citation, Notes & Shared-Label Peer Matcher -->
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
            ${
              study.fragilityIndex
                ? `<div class="res-dossier-kv"><span style="color: var(--res-text-muted);">Fragility Index</span><strong style="font-family: var(--res-font-mono);">FI = ${study.fragilityIndex}</strong></div>`
                : ''
            }
            <div class="res-dossier-kv">
              <span style="color: var(--res-text-muted);">Sai lệch (RoB)</span>
              <span class="res-tag tone-${robMeta.tone}">${escapeHtml(robMeta.shortLabel)}</span>
            </div>
            <div class="res-dossier-kv">
              <span style="color: var(--res-text-muted);">Mức GRADE</span>
              <span class="res-tag tone-${gradeMeta.tone}">${gradeMeta.stars}</span>
            </div>
            ${
              fundMeta
                ? `<div class="res-dossier-kv"><span style="color: var(--res-text-muted);">Tài trợ</span><span class="res-tag tone-${fundMeta.tone}" style="font-size: 0.68rem;">${escapeHtml(
                    fundMeta.label
                  )}</span></div>`
                : ''
            }
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
                )}" target="_blank" rel="noopener noreferrer" class="res-btn" style="width: 100%; margin-top: 0.85rem; min-height: 38px;">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i> Mở Bài Báo Gốc
                </a>`
              : ''
          }

          <!-- 1-Click Citation Copier -->
          <div style="margin-top: 1rem; padding-top: 0.85rem; border-top: 1px solid var(--res-border);">
            <div class="res-facet-heading" style="margin-bottom: 0.25rem;">
              <span><i class="fa-solid fa-quote-right"></i> Trích Dẫn 1-Chạm</span>
            </div>
            <div class="res-cite-tabs">
              <button type="button" class="res-cite-btn js-copy-cite" data-fmt="ama">Copy AMA</button>
              <button type="button" class="res-cite-btn js-copy-cite" data-fmt="vancouver">Vancouver</button>
              <button type="button" class="res-cite-btn js-copy-cite" data-fmt="bibtex">BibTeX</button>
            </div>
          </div>

          <!-- Personal Notes -->
          <div style="margin-top: 1rem; padding-top: 0.85rem; border-top: 1px solid var(--res-border);">
            <div class="res-facet-heading" style="margin-bottom: 0.35rem;">
              <span><i class="fa-solid fa-pen-to-square"></i> Ghi Chú Journal Club</span>
            </div>
            <textarea
              id="res-reader-note-input"
              data-study-id="${escapeHtml(study.id)}"
              class="res-notes-textarea"
              placeholder="Lưu nhận định phản biện hoặc câu hỏi lâm sàng của riêng bạn..."
            >${escapeHtml(personalNote)}</textarea>
          </div>

          <!-- Shared-Label Related Studies -->
          <div style="margin-top: 1.15rem; padding-top: 0.95rem; border-top: 1px solid var(--res-border);">
            <div class="res-facet-heading">
              <span><i class="fa-solid fa-code-compare"></i> Nghiên Cứu Cùng Nhãn</span>
              ${
                relatedList.length >= 2
                  ? `<button type="button" class="res-mini-action-btn is-primary" id="res-compare-all-peers" data-ids="${escapeHtml(
                      clusterCompareIds
                    )}" style="min-height: 26px; font-size: 0.67rem;">So cả cụm</button>`
                  : ''
              }
            </div>
            ${
              relatedList.length === 0
                ? `<p style="font-size: 0.78rem; color: var(--res-text-muted);">Chưa có bài nghiên cứu khác cùng nhãn để đối chiếu.</p>`
                : relatedList
                    .map(
                      ({ study: rel, sharedBadges, similarityPercent }) => `
                  <div class="res-related-item">
                    <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.25rem; margin-bottom: 0.35rem;">
                      <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">
                        ${sharedBadges
                          .map(
                            (b) =>
                              `<span class="res-tag ${
                                b.startsWith('⚡') ? 'tone-amber' : 'tone-indigo'
                              }" style="font-size: 0.65rem; padding: 0.08rem 0.38rem;">${escapeHtml(b)}</span>`
                          )
                          .join('')}
                      </div>
                      <span style="font-family: var(--res-font-mono); font-size: 0.66rem; font-weight: 800; color: var(--res-primary);">${similarityPercent}%</span>
                    </div>
                    <a href="#/ebm/kho-nghien-cuu/${escapeHtml(
                      rel.slug
                    )}" style="font-family: var(--res-font-display); font-size: 0.81rem; font-weight: 800; color: var(--res-text); text-decoration: none; display: block; line-height: 1.35; margin-bottom: 0.45rem;">
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
                      )}" style="min-height: 32px; padding: 0.18rem 0.52rem; font-size: 0.72rem;">
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

function renderInlineLabelMatchPanel(
  currentStudy: ResearchStudyRecord,
  labelKey: string,
  axisShort: string,
  labelText: string,
  facetKey: string,
  facetVal: string
): string {
  const matched = researchStore.getStudiesByAtomicLabelKey(labelKey);
  const peers = matched.filter((s) => s.id !== currentStudy.id);
  const allIds = [currentStudy.id, ...peers.slice(0, 4).map((p) => p.id)].join(',');

  const facetParamMap: Record<string, string> = {
    conditionKey: 'condition',
    problemLabel: 'problem',
    populationTag: 'population',
    design: 'design',
    interventionClass: 'intervention',
    comparatorType: 'comparator',
    endpointCategory: 'endpoint',
    outcomeDirection: 'outcome',
    impactVerdict: 'verdict',
    robOverall: 'rob',
    gradeCertainty: 'grade',
    fundingSource: 'funding',
    topicTag: 'topic'
  };
  const urlParam = facetParamMap[facetKey] || 'topic';

  return `
    <div class="res-label-match-panel">
      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.55rem;">
        <div style="font-size: 0.84rem; font-weight: 800; color: var(--res-text);">
          <i class="fa-solid fa-code-compare" style="color: var(--res-primary);"></i>
          Nhãn <span class="res-tag tone-indigo">${escapeHtml(axisShort)}: ${escapeHtml(labelText)}</span>
          — tìm thấy <strong>${matched.length} nghiên cứu</strong> (${peers.length} bài khác để đối chiếu)
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
          ${
            peers.length > 0
              ? `<button type="button" class="res-mini-action-btn is-primary js-inline-compare-group" data-ids="${escapeHtml(
                  allIds
                )}">
                  <i class="fa-solid fa-scale-balanced"></i> So sánh ${Math.min(5, matched.length)} bài này ngay
                </button>`
              : ''
          }
          <a href="#/ebm/research?${urlParam}=${encodeURIComponent(
            facetVal
          )}" class="res-mini-action-btn" style="text-decoration: none;">
            <i class="fa-solid fa-filter"></i> Lọc toàn kho
          </a>
          <button type="button" class="res-mini-action-btn" id="js-close-label-match" title="Đóng">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      ${
        peers.length === 0
          ? `<p style="margin: 0.55rem 0 0; font-size: 0.8rem; color: var(--res-text-muted);">Hiện đây là nghiên cứu duy nhất trong kho mang nhãn <strong>${escapeHtml(
              labelText
            )}</strong>. Khi bạn nạp thêm nghiên cứu cùng nhãn, hệ thống sẽ tự động kết nối đối chiếu tại đây.</p>`
          : `<div class="res-label-match-list">
              ${peers
                .map((p) => {
                  const dir = OUTCOME_DIRECTIONS[p.outcomeDirection];
                  return `
                    <div class="res-label-match-item">
                      <div>
                        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.3rem; margin-bottom: 0.3rem;">
                          <span style="font-family: var(--res-font-mono); font-size: 0.7rem; color: var(--res-text-muted);">${escapeHtml(
                            p.journal
                          )} • ${p.year}</span>
                          <span class="res-tag tone-${dir?.tone || 'teal'}" style="font-size: 0.65rem;">${escapeHtml(
                            dir?.shortLabel || p.outcomeDirection
                          )}</span>
                        </div>
                        <a href="#/ebm/kho-nghien-cuu/${escapeHtml(
                          p.slug
                        )}" style="font-family: var(--res-font-display); font-size: 0.82rem; font-weight: 800; color: var(--res-text); text-decoration: none; line-height: 1.35; display: block;">
                          ${p.trialAcronym ? `[${escapeHtml(p.trialAcronym)}] ` : ''}${escapeHtml(p.title)}
                        </a>
                      </div>
                      <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.4rem; margin-top: 0.35rem;">
                        <span style="font-family: var(--res-font-mono); font-size: 0.7rem; color: var(--res-primary);">${
                          p.sampleSize ? `N = ${p.sampleSize.toLocaleString('en-US')}` : ''
                        }</span>
                        <button type="button" class="res-mini-action-btn is-primary js-inline-compare-group" data-ids="${escapeHtml(
                          `${currentStudy.id},${p.id}`
                        )}">
                          <i class="fa-solid fa-scale-balanced"></i> So sánh đôi
                        </button>
                      </div>
                    </div>
                  `;
                })
                .join('')}
            </div>`
      }
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

  // Estimate reading time from plain text words
  const readTimeEl = document.getElementById('res-read-time-badge');
  if (readTimeEl) {
    const wordCount = (mountEl.textContent || '').trim().split(/\s+/).filter(Boolean).length;
    const mins = Math.max(2, Math.round(wordCount / 220));
    readTimeEl.innerHTML = `<i class="fa-regular fa-clock"></i> ~${mins} phút đọc • ${wordCount.toLocaleString('en-US')} từ`;
  }

  // Populate TOC dynamically if frontmatter sections were empty
  const tocContainer = document.getElementById('res-reader-toc-list');
  if (tocContainer && tocContainer.children.length === 0 && parsed.toc.length > 0) {
    tocContainer.innerHTML = parsed.toc
      .map(
        (t, idx) => `
      <a href="#${escapeHtml(t.id)}" class="res-toc-link ${idx === 0 ? 'is-active' : ''}" data-toc-target="${escapeHtml(t.id)}">
        <span style="font-family: var(--res-font-mono); color: var(--res-primary); font-weight: 800;">${String(
          idx + 1
        ).padStart(2, '0')}</span>
        <span>${escapeHtml(t.text)}</span>
      </a>`
      )
      .join('');
    const cntEl = document.getElementById('res-toc-count');
    if (cntEl) cntEl.textContent = `${parsed.toc.length} mục`;
  }

  // Smooth TOC & quickmenu anchor clicks (prevent SPA hash router hijack!)
  document
    .querySelectorAll<HTMLAnchorElement>('#res-reader-root a[href^="#sec-"], #res-reader-root [data-toc-target]')
    .forEach((a) => {
      a.addEventListener('click', (e) => {
        const targetId = a.getAttribute('data-toc-target') || (a.getAttribute('href') || '').replace(/^#/, '');
        const secEl = targetId ? document.getElementById(targetId) : null;
        if (secEl) {
          e.preventDefault();
          secEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

  // Reading Progress Bar + Active TOC ScrollSpy
  const progressBar = document.getElementById('res-reading-progress');
  const updateProgress = (): void => {
    if (!progressBar) return;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? Math.min(100, Math.max(0, (window.scrollY / docH) * 100)) : 0;
    progressBar.style.width = `${pct.toFixed(1)}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const secEls = Array.from(mountEl.querySelectorAll<HTMLElement>('.sec-card[id]'));
  if (secEls.length > 0 && typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const activeId = entry.target.getAttribute('id');
            if (!activeId) continue;
            document.querySelectorAll<HTMLAnchorElement>('#res-reader-toc-list .res-toc-link').forEach((link) => {
              link.classList.toggle('is-active', link.getAttribute('data-toc-target') === activeId);
            });
            mountEl.querySelectorAll<HTMLAnchorElement>('.quickmenu-item').forEach((qLink) => {
              qLink.classList.toggle('active', qLink.getAttribute('href') === `#${activeId}`);
            });
          }
        }
      },
      { rootMargin: '-18% 0px -68% 0px', threshold: 0 }
    );
    secEls.forEach((el) => observer.observe(el));
  }

  // Hydrate visual interactive blocks & EBM Glossary Tooltips inside MDX
  try {
    hydrateFlowchartViewers(mountEl);
    hydrateFigureCards(mountEl);
    hydrateForestPlots(mountEl);
    hydrateEbmGlossaryTooltips(mountEl);
  } catch {
    // Non-blocking hydration
  }

  // Bind Reading Depth Switcher (30s Executive Brief vs Full Dissection)
  const rootEl = document.getElementById('res-reader-root');
  const briefDeck = document.getElementById('res-quick-brief-deck');
  const basicBtn = document.getElementById('res-depth-basic-btn');
  const deepBtn = document.getElementById('res-depth-deep-btn');
  basicBtn?.addEventListener('click', () => {
    rootEl?.classList.add('depth-basic');
    if (briefDeck) briefDeck.style.display = 'block';
    basicBtn.classList.add('is-active');
    deepBtn?.classList.remove('is-active');
  });
  deepBtn?.addEventListener('click', () => {
    rootEl?.classList.remove('depth-basic');
    if (briefDeck) briefDeck.style.display = 'none';
    deepBtn.classList.add('is-active');
    basicBtn?.classList.remove('is-active');
  });

  // Bind Focus / Zen Mode
  const zenBtn = document.getElementById('res-zen-toggle-btn');
  zenBtn?.addEventListener('click', () => {
    const active = rootEl?.classList.toggle('is-zen-mode');
    zenBtn.classList.toggle('res-btn-primary', Boolean(active));
    const span = zenBtn.querySelector('span');
    if (span) span.textContent = active ? 'Thoát tập trung' : 'Tập trung';
  });

  // Bind Atomic Label Anatomy Strip -> Inline Peer Matcher
  const matchMount = document.getElementById('res-label-match-mount');
  let activeLabelKey: string | null = null;
  document.querySelectorAll<HTMLButtonElement>('.js-reader-atomic-label').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!study || !matchMount) return;
      const key = btn.getAttribute('data-label-key') || '';
      if (activeLabelKey === key) {
        activeLabelKey = null;
        matchMount.innerHTML = '';
        btn.classList.remove('is-selected');
        return;
      }
      activeLabelKey = key;
      document
        .querySelectorAll<HTMLButtonElement>('.js-reader-atomic-label')
        .forEach((b) => b.classList.toggle('is-selected', b === btn));

      matchMount.innerHTML = renderInlineLabelMatchPanel(
        study,
        key,
        btn.getAttribute('data-axis-short') || '',
        btn.getAttribute('data-label-text') || '',
        btn.getAttribute('data-facet') || '',
        btn.getAttribute('data-val') || ''
      );

      document.getElementById('js-close-label-match')?.addEventListener('click', () => {
        activeLabelKey = null;
        matchMount.innerHTML = '';
        document
          .querySelectorAll<HTMLButtonElement>('.js-reader-atomic-label')
          .forEach((b) => b.classList.remove('is-selected'));
      });

      matchMount.querySelectorAll<HTMLButtonElement>('.js-inline-compare-group').forEach((cmpBtn) => {
        cmpBtn.addEventListener('click', () => {
          const ids = (cmpBtn.getAttribute('data-ids') || '').split(',').filter(Boolean);
          if (ids.length > 0) {
            researchStore.loadClusterIntoCompare(ids);
            window.location.hash = `#/ebm/research?mode=compare&ids=${ids.join(',')}`;
          }
        });
      });
    });
  });

  // Bind Font Size Controls
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

  // Bind Bookmark Toggle
  const bmBtn = document.getElementById('res-reader-bookmark-btn');
  bmBtn?.addEventListener('click', () => {
    const id = bmBtn.getAttribute('data-study-id');
    if (!id) return;
    const saved = researchStore.toggleBookmark(id);
    bmBtn.classList.toggle('is-active', saved);
    const icon = bmBtn.querySelector('i');
    if (icon) {
      icon.className = `${saved ? 'fa-solid' : 'fa-regular'} fa-bookmark`;
    }
  });

  // Bind Compare Toggle
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

  // Bind Citation Copy Buttons
  document.querySelectorAll<HTMLButtonElement>('.js-copy-cite').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!study) return;
      const fmt = (btn.getAttribute('data-fmt') || 'ama') as 'ama' | 'vancouver' | 'bibtex';
      const cite = buildCitationText(study, fmt);
      if (navigator.clipboard) {
        const orig = btn.textContent || '';
        void navigator.clipboard.writeText(cite).then(() => {
          btn.textContent = '✓ Đã chép';
          setTimeout(() => {
            btn.textContent = orig;
          }, 1500);
        });
      }
    });
  });

  // Bind Personal Note Autosave
  const noteInput = document.getElementById('res-reader-note-input') as HTMLTextAreaElement | null;
  noteInput?.addEventListener('input', () => {
    const id = noteInput.getAttribute('data-study-id');
    if (id) researchStore.setPersonalNote(id, noteInput.value);
  });

  // Bind Pairwise & Cluster Compare Buttons
  document.querySelectorAll<HTMLButtonElement>('.res-pair-compare-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const a = btn.getAttribute('data-pair-a');
      const b = btn.getAttribute('data-pair-b');
      if (a && b) {
        researchStore.loadClusterIntoCompare([a, b]);
        window.location.hash = `#/ebm/research?mode=compare&ids=${a},${b}`;
      }
    });
  });

  document.getElementById('res-compare-all-peers')?.addEventListener('click', (e) => {
    const ids = ((e.currentTarget as HTMLElement).getAttribute('data-ids') || '')
      .split(',')
      .filter(Boolean);
    if (ids.length > 0) {
      researchStore.loadClusterIntoCompare(ids);
      window.location.hash = `#/ebm/research?mode=compare&ids=${ids.join(',')}`;
    }
  });
}
