/**
 * CliniPortal 2.0 — CliniResearch Studio Main Explorer, Label Atlas & Comparison Workspace (v3.0)
 * Path: src/content/ebm/research/js/research-studio-view.ts
 *
 * Distinct Academic Journal & Quantitative Trial Studio UI:
 *  - Editorial Masthead with live trial metrics, pooled N, and unique atomic label count
 *  - 3 Workspace Modes: (1) Khám Phá Nghiên Cứu, (2) Bản Đồ Tách Nhãn 9 Trục, (3) Bàn Cân Đối Sánh
 *  - Auto-discovered Smart Label Clusters strip (1-click multi-study comparison)
 *  - Decomposed Label Anatomy Cards + Multi-Criteria Sorting + Deep URL Hash Sync
 *  - Slide-over Quick-Appraisal Drawer (with Personal Notes & Related Label Matches) + Floating Compare Dock
 */

import '../css/research-studio.css';
import { lookupSharedJournalMetric } from '../../shared-core';
import {
  buildCsvComparisonExport,
  buildMarkdownComparisonExport,
  buildShareableCompareHash,
  renderComparisonStudioSection
} from './research-compare-engine';
import {
  ATOMIC_AXIS_META,
  COMPARATOR_TYPES,
  decomposeStudyLabels,
  ENDPOINT_CATEGORIES,
  FUNDING_LABELS,
  GRADE_LABELS,
  humanizeSlugLabel,
  IMPACT_VERDICTS,
  INTERVENTION_CLASSES,
  OUTCOME_DIRECTIONS,
  POPULATION_TAGS_VI,
  PROBLEM_LABELS_VI,
  RESEARCH_CONDITIONS,
  RESEARCH_DESIGNS,
  RESEARCH_SPECIALTIES,
  ROB_LABELS,
  TOPIC_TAGS_VI
} from './research-taxonomy';
import { researchStore } from './research-store';
import type {
  AtomicLabelAxis,
  CompareMatrixGroupKey,
  FilterableFacetKey,
  ResearchCompareTab,
  ResearchSortKey,
  ResearchStudyRecord
} from './research-types';

type StudioMainMode = 'explore' | 'labels' | 'compare';
let currentMainMode: StudioMainMode = 'explore';
let isMobileFacetsOpen = false;
let atlasComparableOnly = false;
let atlasSearchQuery = '';

function escapeHtml(val?: string | number | null): string {
  if (val === undefined || val === null) return '';
  return String(val)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function parseHashQueryParams(): void {
  if (typeof window === 'undefined') return;
  const hash = window.location.hash || '';
  const qIdx = hash.indexOf('?');
  if (qIdx === -1) return;

  const params = new URLSearchParams(hash.slice(qIdx + 1));
  const mode = params.get('mode');
  if (mode === 'compare') {
    currentMainMode = 'compare';
  } else if (mode === 'labels') {
    currentMainMode = 'labels';
  }

  const idsParam = params.get('ids');
  if (idsParam) {
    const ids = idsParam
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (ids.length > 0) {
      researchStore.loadClusterIntoCompare(ids);
      currentMainMode = 'compare';
    }
  }

  const directFacetMap: Array<[string, FilterableFacetKey]> = [
    ['condition', 'conditionKey'],
    ['problem', 'problemLabel'],
    ['population', 'populationTag'],
    ['design', 'design'],
    ['intervention', 'interventionClass'],
    ['comparator', 'comparatorType'],
    ['endpoint', 'endpointCategory'],
    ['outcome', 'outcomeDirection'],
    ['verdict', 'impactVerdict'],
    ['rob', 'robOverall'],
    ['grade', 'gradeCertainty'],
    ['funding', 'fundingSource'],
    ['specialty', 'specialty'],
    ['topic', 'topicTag']
  ];

  let appliedFacet = false;
  for (const [paramKey, facetKey] of directFacetMap) {
    const val = params.get(paramKey);
    if (val) {
      if (!appliedFacet) researchStore.resetFilters();
      researchStore.filters[facetKey] = val;
      appliedFacet = true;
    }
  }
  if (appliedFacet && mode !== 'compare') {
    currentMainMode = 'explore';
  }
}

function renderFacetGroup(
  title: string,
  facetKey: FilterableFacetKey,
  options: Array<{ value: string; label: string; count: number }>
): string {
  const activeVal = researchStore.filters[facetKey];
  const nonZero = options.filter((o) => o.count > 0 || o.value === activeVal);
  if (nonZero.length === 0) return '';

  return `
    <div class="res-facet-group">
      <div class="res-facet-heading">
        <span>${escapeHtml(title)}</span>
        ${
          activeVal
            ? `<button type="button" class="js-facet-select" data-facet="${facetKey}" data-val="" style="border:none; background:none; color:var(--res-primary); font-size:0.7rem; font-weight:700; cursor:pointer;">Xóa</button>`
            : ''
        }
      </div>
      <div class="res-facet-list">
        ${nonZero
          .map(
            (opt) => `
          <button type="button" class="res-facet-btn js-facet-select ${
            activeVal === opt.value ? 'is-active' : ''
          }" data-facet="${facetKey}" data-val="${escapeHtml(opt.value)}">
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(
              opt.label
            )}</span>
            <span class="res-facet-count">${opt.count}</span>
          </button>
        `
          )
          .join('')}
      </div>
    </div>
  `;
}

function renderLeftFacetRail(allStudies: ResearchStudyRecord[]): string {
  const countBy = (fn: (s: ResearchStudyRecord) => boolean): number => allStudies.filter(fn).length;

  const outcomeOpts = Object.entries(OUTCOME_DIRECTIONS).map(([k, v]) => ({
    value: k,
    label: v.shortLabel || v.label,
    count: countBy((s) => s.outcomeDirection === k)
  }));

  const designOpts = Object.entries(RESEARCH_DESIGNS).map(([k, v]) => ({
    value: k,
    label: v.shortLabel || v.label,
    count: countBy((s) => s.design === k)
  }));

  const condOpts = Object.entries(RESEARCH_CONDITIONS)
    .map(([k, label]) => ({
      value: k,
      label,
      count: countBy((s) => s.conditionKey === k)
    }))
    .sort((a, b) => b.count - a.count);

  const intvOpts = Object.entries(INTERVENTION_CLASSES)
    .map(([k, label]) => ({
      value: k,
      label,
      count: countBy((s) => s.interventionClass === k)
    }))
    .sort((a, b) => b.count - a.count);

  const endpointOpts = Object.entries(ENDPOINT_CATEGORIES)
    .map(([k, label]) => ({
      value: k,
      label,
      count: countBy((s) => s.primaryEndpointCategory === k)
    }))
    .sort((a, b) => b.count - a.count);

  const specOpts = Object.entries(RESEARCH_SPECIALTIES)
    .map(([k, v]) => ({
      value: k,
      label: v.label,
      count: countBy((s) => s.specialty === k || s.specialty2 === k)
    }))
    .sort((a, b) => b.count - a.count);

  const yearOpts = [
    { value: '2026', label: 'Năm 2026', count: countBy((s) => s.year === 2026) },
    { value: '2024-2025', label: 'Giai đoạn 2024 – 2025', count: countBy((s) => s.year >= 2024 && s.year <= 2025) },
    { value: '2020-2023', label: 'Giai đoạn 2020 – 2023', count: countBy((s) => s.year >= 2020 && s.year <= 2023) },
    { value: 'pre-2020', label: 'Landmark trước 2020', count: countBy((s) => s.year < 2020) }
  ];

  const gradeOpts = Object.entries(GRADE_LABELS).map(([k, v]) => ({
    value: k,
    label: `${v.stars} ${v.shortLabel}`,
    count: countBy((s) => s.gradeCertainty === k)
  }));

  const robOpts = Object.entries(ROB_LABELS).map(([k, v]) => ({
    value: k,
    label: v.shortLabel,
    count: countBy((s) => s.robOverall === k)
  }));

  return `
    <aside class="res-facet-rail ${isMobileFacetsOpen ? 'is-mobile-open' : ''}" id="res-facet-rail" aria-label="Bộ lọc nhãn nghiên cứu">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.85rem;">
        <strong style="font-family: var(--res-font-display); font-size: 0.9rem;">
          <i class="fa-solid fa-sliders" style="color: var(--res-primary);"></i> Bộ Lọc Tách Nhãn
        </strong>
        ${
          researchStore.getActiveFilterCount() > 0
            ? `<button type="button" id="js-reset-all-facets" style="border:none; background:none; color:var(--res-rose); font-size:0.76rem; font-weight:700; cursor:pointer;">Đặt lại (${researchStore.getActiveFilterCount()})</button>`
            : ''
        }
      </div>

      <div class="res-facet-group">
        <div class="res-facet-list">
          <button type="button" class="res-facet-btn ${
            researchStore.filters.savedOnly ? 'is-active' : ''
          }" id="js-toggle-saved-only">
            <span><i class="fa-solid fa-bookmark" style="color: var(--res-amber); margin-right: 4px;"></i> Đã đánh dấu lưu</span>
            <span class="res-facet-count">${researchStore.getBookmarkedCount()}</span>
          </button>
          <button type="button" class="res-facet-btn ${
            researchStore.filters.asianOnly ? 'is-active' : ''
          }" id="js-toggle-asian-only">
            <span><i class="fa-solid fa-earth-asia" style="color: var(--res-teal); margin-right: 4px;"></i> Có quần thể Châu Á</span>
            <span class="res-facet-count">${countBy((s) => Boolean(s.asianData))}</span>
          </button>
        </div>
      </div>

      ${renderFacetGroup('1. Hướng Kết Quả', 'outcomeDirection', outcomeOpts)}
      ${renderFacetGroup('2. Thiết Kế Nghiên Cứu', 'design', designOpts)}
      ${renderFacetGroup('3. Bệnh / Vấn Đề Lâm Sàng', 'conditionKey', condOpts)}
      ${renderFacetGroup('4. Nhóm Can Thiệp (I)', 'interventionClass', intvOpts)}
      ${renderFacetGroup('5. Nhóm Kết Cục (O)', 'endpointCategory', endpointOpts)}
      ${renderFacetGroup('6. Mức Độ Chắc Chắn GRADE', 'gradeCertainty', gradeOpts)}
      ${renderFacetGroup('7. Nguy Cơ Sai Lệch (RoB)', 'robOverall', robOpts)}
      ${renderFacetGroup('8. Năm Công Bố', 'yearPeriod', yearOpts)}
      ${renderFacetGroup('9. Chuyên Khoa', 'specialty', specOpts)}
    </aside>
  `;
}

function renderStudyCard(s: ResearchStudyRecord): string {
  const jMeta = lookupSharedJournalMetric(s.journal);
  const designMeta = RESEARCH_DESIGNS[s.design] || {
    label: s.design,
    shortLabel: s.design,
    icon: 'fa-solid fa-flask',
    tone: 'indigo' as const
  };
  const dirMeta = OUTCOME_DIRECTIONS[s.outcomeDirection] || {
    label: s.outcomeDirection,
    shortLabel: s.outcomeDirection,
    icon: 'fa-solid fa-chart-simple',
    tone: 'teal' as const
  };
  const verdictMeta = IMPACT_VERDICTS[s.impactVerdict] || {
    label: s.impactVerdict,
    shortLabel: s.impactVerdict,
    icon: 'fa-solid fa-bolt',
    tone: 'indigo' as const
  };
  const gradeMeta = GRADE_LABELS[s.gradeCertainty] || {
    label: s.gradeCertainty,
    shortLabel: s.gradeCertainty,
    stars: '⊕⊕⊕◯',
    tone: 'teal' as const
  };
  const robMeta = ROB_LABELS[s.robOverall] || { label: s.robOverall, shortLabel: s.robOverall, tone: 'slate' as const };

  const isCompared = researchStore.isInCompare(s.id);
  const pm = s.primaryMetric;
  const quantBannerText = pm?.effectEstimate
    ? `${pm.measure || 'HR'} ${pm.effectEstimate}${
        pm.ciLower && pm.ciUpper ? ` (95% CI: ${pm.ciLower}–${pm.ciUpper})` : ''
      }${pm.pValue ? ` • p=${pm.pValue}` : ''}${pm.nnt ? ` • NNT=${pm.nnt}` : ''}`
    : pm?.rawDiffText
      ? `${pm.measure ? `[${pm.measure}] ` : ''}${pm.rawDiffText}`
      : s.sampleSize
        ? `Cỡ mẫu N = ${s.sampleSize.toLocaleString('en-US')} • ${verdictMeta.shortLabel || s.impactVerdict}`
        : `${verdictMeta.shortLabel || s.impactVerdict} • GRADE ${gradeMeta.stars}`;

  const peerMatches = researchStore.getRelatedStudiesByLabels(s, 3);
  const peerIds = [s.id, ...peerMatches.slice(0, 2).map((p) => p.study.id)];

  return `
    <article class="res-study-card ${isCompared ? 'is-compared' : ''}">
      <div class="res-card-ribbon dir-${escapeHtml(s.outcomeDirection)}"></div>

      <div>
        <!-- Top Meta Row -->
        <div class="res-card-meta-top">
          <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; align-items: center;">
            <button type="button" class="res-tag res-tag-clickable tone-${
              designMeta.tone
            } js-quick-label" data-facet="design" data-val="${escapeHtml(s.design)}" title="Lọc theo thiết kế này">
              <i class="${designMeta.icon}"></i> ${escapeHtml(designMeta.shortLabel || s.design)}
            </button>
            <button type="button" class="res-tag res-tag-clickable tone-${
              dirMeta.tone
            } js-quick-label" data-facet="outcomeDirection" data-val="${escapeHtml(
              s.outcomeDirection
            )}" title="Lọc theo hướng kết quả này">
              <i class="${dirMeta.icon}"></i> ${escapeHtml(dirMeta.shortLabel || s.outcomeDirection)}
            </button>
          </div>

          <span class="res-journal-pill">
            ${escapeHtml(jMeta?.shortName || s.journal)} • ${s.year}${
              jMeta?.impactFactor ? ` • IF ${jMeta.impactFactor}` : ''
            }
          </span>
        </div>

        <!-- Title -->
        <h2 class="res-card-title">
          <a href="#/ebm/kho-nghien-cuu/${escapeHtml(s.slug)}">
            ${
              s.trialAcronym
                ? `<span class="res-acronym-badge">${escapeHtml(s.trialAcronym)}</span>`
                : ''
            }${escapeHtml(s.title)}
          </a>
        </h2>

        <!-- Mini PICO Dissection -->
        <div class="res-mini-pico">
          <div class="res-mini-pico-row">
            <span class="res-pico-key">P</span>
            <span class="res-pico-val">${
              s.sampleSize ? `<strong>N=${s.sampleSize.toLocaleString('en-US')}:</strong> ` : ''
            }${escapeHtml(s.population || 'Quần thể lâm sàng chuyên biệt')}</span>
          </div>
          <div class="res-mini-pico-row">
            <span class="res-pico-key">I/C</span>
            <span class="res-pico-val">${escapeHtml(s.intervention || s.drug || '—')}</span>
          </div>
          <div class="res-mini-pico-row">
            <span class="res-pico-key">O</span>
            <span class="res-pico-val">${escapeHtml(s.primaryEndpoint || s.summary || '—')}</span>
          </div>
        </div>

        <!-- Quantitative Metric Strip -->
        <div class="res-metric-banner" style="margin-top: 0.65rem;">
          <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">📊 ${escapeHtml(quantBannerText)}</span>
          <span style="flex-shrink: 0;">${gradeMeta.stars}</span>
        </div>

        <!-- Decomposed 4-Slot Atomic Label Anatomy on Card -->
        <div class="res-card-label-anatomy" aria-label="Nhãn đã tách theo trục">
          <div class="res-card-label-slot">
            <span class="res-card-label-slot-k">🩺 Bệnh lý &amp; Vấn đề</span>
            <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">
              <button type="button" class="res-tag res-tag-clickable tone-indigo js-quick-label" data-facet="conditionKey" data-val="${escapeHtml(
                s.conditionKey
              )}" style="font-size: 0.69rem; padding: 0.16rem 0.45rem;">
                ${escapeHtml(RESEARCH_CONDITIONS[s.conditionKey] || s.conditionKey)}
              </button>
            </div>
          </div>

          <div class="res-card-label-slot">
            <span class="res-card-label-slot-k">💊 Can thiệp &amp; Đối chứng</span>
            <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">
              <button type="button" class="res-tag res-tag-clickable tone-violet js-quick-label" data-facet="interventionClass" data-val="${escapeHtml(
                s.interventionClass
              )}" style="font-size: 0.69rem; padding: 0.16rem 0.45rem;">
                ${escapeHtml(INTERVENTION_CLASSES[s.interventionClass] || s.interventionClass)}
              </button>
            </div>
          </div>

          <div class="res-card-label-slot">
            <span class="res-card-label-slot-k">🎯 Kết cục &amp; RoB</span>
            <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">
              <button type="button" class="res-tag res-tag-clickable tone-teal js-quick-label" data-facet="endpointCategory" data-val="${escapeHtml(
                s.primaryEndpointCategory
              )}" style="font-size: 0.69rem; padding: 0.16rem 0.45rem;">
                ${escapeHtml(
                  (ENDPOINT_CATEGORIES[s.primaryEndpointCategory] || s.primaryEndpointCategory).split(' (')[0]
                )}
              </button>
              <button type="button" class="res-tag res-tag-clickable tone-${robMeta.tone} js-quick-label" data-facet="robOverall" data-val="${escapeHtml(
                s.robOverall
              )}" style="font-size: 0.69rem; padding: 0.16rem 0.45rem;">
                ${escapeHtml(robMeta.shortLabel)}
              </button>
            </div>
          </div>

          <div class="res-card-label-slot">
            <span class="res-card-label-slot-k">🏷️ Chủ đề đối chiếu</span>
            <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">
              ${(s.topicTags || [])
                .slice(0, 2)
                .map(
                  (tag) => `
                <button type="button" class="res-tag res-tag-clickable tone-rose js-quick-label" data-facet="topicTag" data-val="${escapeHtml(
                  tag
                )}" style="font-size: 0.69rem; padding: 0.16rem 0.45rem;">
                  #${escapeHtml(TOPIC_TAGS_VI[tag] || tag)}
                </button>
              `
                )
                .join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Card Action Footer -->
      <div class="res-card-footer">
        <div class="res-card-actions">
          <button type="button" class="res-icon-btn ${
            s.bookmarked ? 'is-active' : ''
          } js-bookmark-study" data-id="${escapeHtml(s.id)}" title="Lưu nghiên cứu">
            <i class="${s.bookmarked ? 'fa-solid' : 'fa-regular'} fa-bookmark"></i>
          </button>
          <button type="button" class="res-btn js-preview-study" data-id="${escapeHtml(
            s.id
          )}" title="Xem nhanh PICO, Nhãn tách bạch & Ghi chú">
            <i class="fa-solid fa-eye"></i> Xem nhanh
          </button>
          <button type="button" class="res-btn ${
            isCompared ? 'res-btn-primary' : 'res-btn-teal'
          } js-compare-toggle" data-id="${escapeHtml(s.id)}">
            <i class="fa-solid fa-scale-balanced"></i>
            <span>${isCompared ? 'Đã chọn' : 'So sánh'}</span>
          </button>
          ${
            peerMatches.length > 0
              ? `<button type="button" class="res-btn js-load-cluster" data-ids="${escapeHtml(
                  peerIds.join(',')
                )}" title="Nạp bài này cùng ${Math.min(2, peerMatches.length)} bài tương đồng nhãn nhất vào Bàn Cân">
                  <i class="fa-solid fa-code-compare"></i>
                </button>`
              : ''
          }
        </div>

        <a href="#/ebm/kho-nghien-cuu/${escapeHtml(s.slug)}" class="res-btn res-btn-primary">
          <span>Giải phẫu MDX</span>
          <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </article>
  `;
}

function renderMatrixTable(studies: ResearchStudyRecord[]): string {
  return `
    <div class="res-table-card">
      <div class="table-responsive">
        <table class="res-data-table">
          <thead>
            <tr>
              <th>So sánh</th>
              <th>Nghiên cứu &amp; Tạp chí</th>
              <th>Thiết kế &amp; Cỡ mẫu</th>
              <th>Bệnh lý &amp; Can thiệp</th>
              <th>Hướng Kết quả &amp; Chỉ số</th>
              <th>RoB / GRADE</th>
              <th>Mở bài</th>
            </tr>
          </thead>
          <tbody>
            ${studies
              .map((s) => {
                const dm = RESEARCH_DESIGNS[s.design];
                const dir = OUTCOME_DIRECTIONS[s.outcomeDirection];
                const gr = GRADE_LABELS[s.gradeCertainty];
                const rob = ROB_LABELS[s.robOverall];
                const isCmp = researchStore.isInCompare(s.id);
                return `
                  <tr>
                    <td>
                      <button type="button" class="res-icon-btn ${
                        isCmp ? 'is-active' : ''
                      } js-compare-toggle" data-id="${escapeHtml(s.id)}" title="Thêm/bỏ so sánh">
                        <i class="fa-solid fa-scale-balanced"></i>
                      </button>
                    </td>
                    <td>
                      <a href="#/ebm/kho-nghien-cuu/${escapeHtml(
                        s.slug
                      )}" style="font-family: var(--res-font-display); font-weight: 800; color: var(--res-text); text-decoration: none;">
                        ${
                          s.trialAcronym
                            ? `<span class="res-acronym-badge">${escapeHtml(s.trialAcronym)}</span>`
                            : ''
                        }${escapeHtml(s.title)}
                      </a>
                      <div style="font-family: var(--res-font-mono); font-size: 0.74rem; color: var(--res-text-muted); margin-top: 3px;">
                        ${escapeHtml(s.journal)} • ${s.year}
                      </div>
                    </td>
                    <td>
                      <span class="res-tag tone-${dm?.tone || 'indigo'}">${escapeHtml(
                        dm?.shortLabel || s.design
                      )}</span>
                      <div style="font-family: var(--res-font-mono); font-size: 0.76rem; margin-top: 4px;">
                        ${s.sampleSize ? `N = ${s.sampleSize.toLocaleString('en-US')}` : 'Synthesis'}
                      </div>
                    </td>
                    <td>
                      <div style="font-weight: 700; font-size: 0.8rem;">${escapeHtml(
                        RESEARCH_CONDITIONS[s.conditionKey] || s.conditionKey
                      )}</div>
                      <div style="font-size: 0.76rem; color: var(--res-text-muted); margin-top: 2px;">${escapeHtml(
                        INTERVENTION_CLASSES[s.interventionClass] || s.interventionClass
                      )}</div>
                    </td>
                    <td>
                      <span class="res-tag tone-${dir?.tone || 'teal'}">${escapeHtml(
                        dir?.shortLabel || s.outcomeDirection
                      )}</span>
                      <div style="font-size: 0.76rem; color: var(--res-text-secondary); margin-top: 4px; max-width: 280px;">
                        ${escapeHtml(
                          s.primaryMetric?.effectEstimate
                            ? `${s.primaryMetric.measure || 'HR'} ${s.primaryMetric.effectEstimate} (${
                                s.primaryMetric.ciLower || ''
                              }–${s.primaryMetric.ciUpper || ''})`
                            : s.primaryMetric?.rawDiffText || (s.summary || '').slice(0, 95) + '…'
                        )}
                      </div>
                    </td>
                    <td>
                      <span class="res-tag tone-${rob?.tone || 'slate'}" style="margin-bottom: 4px;">${escapeHtml(
                        rob?.shortLabel || s.robOverall
                      )}</span><br/>
                      <span class="res-tag tone-${gr?.tone || 'teal'}">${gr?.stars || '⊕⊕⊕◯'}</span>
                    </td>
                    <td>
                      <a href="#/ebm/kho-nghien-cuu/${escapeHtml(s.slug)}" class="res-btn res-btn-primary">
                        Đọc MDX
                      </a>
                    </td>
                  </tr>
                `;
              })
              .join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

/**
 * Mode 2 (NEW): Interactive 9-Axis Atomic Label Atlas / Decomposer View
 */
function renderLabelAtlasView(): string {
  const index = researchStore.getAtomicLabelIndex();
  const axesOrder: AtomicLabelAxis[] = [
    'condition',
    'intervention',
    'population',
    'design',
    'comparator',
    'endpoint',
    'outcome',
    'quality',
    'topic'
  ];

  const qNorm = atlasSearchQuery.trim().toLowerCase();
  const totalUniqueLabels = axesOrder.reduce((acc, ax) => acc + index[ax].length, 0);
  const comparableLabelsCount = axesOrder.reduce(
    (acc, ax) => acc + index[ax].filter((item) => item.studies.length >= 2).length,
    0
  );

  return `
    <section class="res-atlas-shell">
      <div class="res-atlas-hero-card">
        <div>
          <h2 style="font-family: var(--res-font-display); font-size: 1.15rem; margin: 0 0 0.3rem;">
            <i class="fa-solid fa-diagram-project" style="color: var(--res-primary);"></i>
            Bản Đồ Tách Nhãn Nguyên Tử 9 Trục (${totalUniqueLabels} nhãn • ${comparableLabelsCount} nhãn có ≥ 2 bài so sánh)
          </h2>
          <p style="margin: 0; font-size: 0.84rem; color: var(--res-text-muted); max-width: 720px; line-height: 1.55;">
            Mỗi nghiên cứu được tách thành các nhãn độc lập theo 9 trục chuẩn hóa. Chọn <strong>Lọc</strong> để xem danh sách hoặc bấm <strong>So sánh</strong> để nạp trực tiếp toàn bộ nghiên cứu mang cùng nhãn lên Bàn Cân Đối Sánh!
          </p>
        </div>

        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem;">
          <input
            type="search"
            id="js-atlas-search"
            class="res-search-input"
            style="min-height: 40px; padding-left: 0.85rem; width: 230px;"
            value="${escapeHtml(atlasSearchQuery)}"
            placeholder="Tìm nhãn (statin, dengue, placebo...)"
          />
          <button type="button" class="res-btn ${
            atlasComparableOnly ? 'res-btn-primary' : ''
          }" id="js-atlas-comparable-toggle" style="min-height: 40px;">
            <i class="fa-solid fa-scale-balanced"></i>
            <span>Chỉ nhãn ≥ 2 bài (${comparableLabelsCount})</span>
          </button>
        </div>
      </div>

      <div class="res-atlas-grid">
        ${axesOrder
          .map((axis) => {
            const meta = ATOMIC_AXIS_META[axis];
            const items = index[axis].filter((it) => {
              if (atlasComparableOnly && it.studies.length < 2) return false;
              if (qNorm) {
                const hay = `${it.label.label} ${it.label.value} ${meta.title}`.toLowerCase();
                if (!hay.includes(qNorm)) return false;
              }
              return true;
            });

            if (items.length === 0) return '';

            return `
              <div class="res-atlas-axis-card">
                <div class="res-atlas-axis-hdr">
                  <div>
                    <div style="font-family: var(--res-font-display); font-weight: 800; font-size: 0.94rem; color: var(--res-text); display: flex; align-items: center; gap: 0.45rem;">
                      <i class="${meta.icon}" style="color: var(--res-primary);"></i>
                      <span>${escapeHtml(meta.title)}</span>
                    </div>
                    <div style="font-size: 0.74rem; color: var(--res-text-muted); margin-top: 2px;">${escapeHtml(
                      meta.description
                    )}</div>
                  </div>
                  <span class="res-facet-count">${items.length} nhãn</span>
                </div>

                <div class="res-atlas-label-list">
                  ${items
                    .map((it) => {
                      const studyIds = it.studies.map((s) => s.id).join(',');
                      return `
                        <div class="res-atlas-label-row">
                          <div style="min-width: 0; display: flex; flex-wrap: wrap; align-items: center; gap: 0.35rem;">
                            <span class="res-tag tone-${it.label.tone}" style="font-size: 0.72rem;">
                              ${escapeHtml(it.label.label)}
                            </span>
                            <span class="res-facet-count">${it.studies.length} bài</span>
                            ${
                              it.hasDiscordance
                                ? `<span class="res-cluster-discord" title="Các nghiên cứu mang nhãn này có hướng kết quả khác nhau">⚡ Trái chiều</span>`
                                : ''
                            }
                          </div>

                          <div class="res-atlas-label-actions">
                            <button
                              type="button"
                              class="res-mini-action-btn js-quick-label"
                              data-facet="${it.label.facetKey}"
                              data-val="${escapeHtml(it.label.value)}"
                              title="Lọc danh sách theo nhãn này"
                            >
                              <i class="fa-solid fa-filter"></i> Lọc
                            </button>
                            ${
                              it.studies.length >= 2
                                ? `<button
                                    type="button"
                                    class="res-mini-action-btn is-primary js-load-cluster"
                                    data-ids="${escapeHtml(studyIds)}"
                                    title="Nạp ${it.studies.length} nghiên cứu cùng nhãn này vào Bàn Cân"
                                  >
                                    <i class="fa-solid fa-scale-balanced"></i> So sánh (${it.studies.length})
                                  </button>`
                                : ''
                            }
                          </div>
                        </div>
                      `;
                    })
                    .join('')}
                </div>
              </div>
            `;
          })
          .join('')}
      </div>
    </section>
  `;
}

function renderActiveFilterChips(): string {
  const f = researchStore.filters;
  const chips: Array<{ key: FilterableFacetKey; label: string }> = [];

  if (f.outcomeDirection) {
    chips.push({
      key: 'outcomeDirection',
      label: `Hướng KQ: ${OUTCOME_DIRECTIONS[f.outcomeDirection]?.shortLabel || f.outcomeDirection}`
    });
  }
  if (f.impactVerdict) {
    chips.push({
      key: 'impactVerdict',
      label: `Phán quyết: ${IMPACT_VERDICTS[f.impactVerdict]?.shortLabel || f.impactVerdict}`
    });
  }
  if (f.design) {
    chips.push({
      key: 'design',
      label: `Thiết kế: ${RESEARCH_DESIGNS[f.design]?.shortLabel || f.design}`
    });
  }
  if (f.conditionKey) {
    chips.push({
      key: 'conditionKey',
      label: `Bệnh: ${RESEARCH_CONDITIONS[f.conditionKey] || f.conditionKey}`
    });
  }
  if (f.problemLabel) {
    chips.push({
      key: 'problemLabel',
      label: `Vấn đề: ${humanizeSlugLabel(f.problemLabel, PROBLEM_LABELS_VI)}`
    });
  }
  if (f.populationTag) {
    chips.push({
      key: 'populationTag',
      label: `Quần thể: ${humanizeSlugLabel(f.populationTag, POPULATION_TAGS_VI)}`
    });
  }
  if (f.interventionClass) {
    chips.push({
      key: 'interventionClass',
      label: `Can thiệp: ${INTERVENTION_CLASSES[f.interventionClass] || f.interventionClass}`
    });
  }
  if (f.comparatorType) {
    chips.push({
      key: 'comparatorType',
      label: `Đối chứng: ${COMPARATOR_TYPES[f.comparatorType] || f.comparatorType}`
    });
  }
  if (f.endpointCategory) {
    chips.push({
      key: 'endpointCategory',
      label: `Kết cục: ${ENDPOINT_CATEGORIES[f.endpointCategory] || f.endpointCategory}`
    });
  }
  if (f.specialty) {
    chips.push({
      key: 'specialty',
      label: `Chuyên khoa: ${RESEARCH_SPECIALTIES[f.specialty]?.label || f.specialty}`
    });
  }
  if (f.yearPeriod) {
    chips.push({ key: 'yearPeriod', label: `Năm: ${f.yearPeriod}` });
  }
  if (f.robOverall) {
    chips.push({ key: 'robOverall', label: `RoB: ${ROB_LABELS[f.robOverall]?.shortLabel || f.robOverall}` });
  }
  if (f.gradeCertainty) {
    chips.push({
      key: 'gradeCertainty',
      label: `GRADE: ${GRADE_LABELS[f.gradeCertainty]?.shortLabel || f.gradeCertainty}`
    });
  }
  if (f.fundingSource) {
    chips.push({
      key: 'fundingSource',
      label: `Tài trợ: ${FUNDING_LABELS[f.fundingSource]?.label || f.fundingSource}`
    });
  }
  if (f.topicTag) {
    chips.push({ key: 'topicTag', label: `Chủ đề: #${TOPIC_TAGS_VI[f.topicTag] || f.topicTag}` });
  }

  if (chips.length === 0) return '';

  return `
    <div class="res-active-chips">
      <span style="font-size: 0.76rem; font-weight: 800; color: var(--res-text-muted);">Đang lọc theo nhãn:</span>
      ${chips
        .map(
          (c) => `
        <button type="button" class="res-active-chip js-clear-single-facet" data-key="${c.key}">
          <span>${escapeHtml(c.label)}</span>
          <i class="fa-solid fa-xmark"></i>
        </button>
      `
        )
        .join('')}
    </div>
  `;
}

function renderQuickPreviewDrawer(): string {
  const study = researchStore.getPreviewStudy();
  if (!study) return '';

  const dm = RESEARCH_DESIGNS[study.design];
  const dir = OUTCOME_DIRECTIONS[study.outcomeDirection];
  const isCmp = researchStore.isInCompare(study.id);
  const atomicLabels = decomposeStudyLabels(study);
  const related = researchStore.getRelatedStudiesByLabels(study, 3);
  const noteVal = researchStore.getPersonalNote(study.id);

  return `
    <div class="res-drawer-backdrop" id="js-preview-backdrop">
      <aside class="res-drawer-panel" role="dialog" aria-modal="true" aria-label="Xem nhanh nghiên cứu">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 0.75rem;">
          <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
            <span class="res-tag tone-${dm?.tone || 'indigo'}">${escapeHtml(dm?.label || study.design)}</span>
            <span class="res-tag tone-${dir?.tone || 'teal'}">${escapeHtml(dir?.shortLabel || study.outcomeDirection)}</span>
          </div>
          <button type="button" class="res-icon-btn" id="js-close-preview" aria-label="Đóng xem nhanh">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div>
          <div style="font-family: var(--res-font-mono); font-size: 0.78rem; color: var(--res-primary); font-weight: 700;">
            ${escapeHtml(study.journal)} • ${study.year}${study.sampleSize ? ` • N = ${study.sampleSize.toLocaleString('en-US')}` : ''}
          </div>
          <h3 style="font-family: var(--res-font-display); font-size: 1.15rem; line-height: 1.35; margin: 0.35rem 0 0;">
            ${escapeHtml(study.title)}
          </h3>
        </div>

        <!-- Decomposed Atomic Labels inside Quick Preview -->
        <div>
          <div style="font-size: 0.74rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: var(--res-text-muted); margin-bottom: 0.45rem;">
            🏷️ Nhãn Nguyên Tử Đã Tách (${atomicLabels.length} nhãn)
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.32rem;">
            ${atomicLabels
              .map(
                (lbl) => `
              <button type="button" class="res-tag res-tag-clickable tone-${lbl.tone} js-quick-label" data-facet="${lbl.facetKey}" data-val="${escapeHtml(
                  lbl.value
                )}" style="font-size: 0.7rem;">
                <span style="opacity: 0.7;">${escapeHtml(lbl.axisShort)}:</span> ${escapeHtml(lbl.label)}
              </button>
            `
              )
              .join('')}
          </div>
        </div>

        <div class="res-mini-pico">
          <div class="res-mini-pico-row"><span class="res-pico-key">P</span><span>${escapeHtml(study.population || '—')}</span></div>
          <div class="res-mini-pico-row"><span class="res-pico-key">I/C</span><span>${escapeHtml(study.intervention || study.drug || '—')}</span></div>
          <div class="res-mini-pico-row"><span class="res-pico-key">O</span><span>${escapeHtml(study.primaryEndpoint || '—')}</span></div>
        </div>

        ${
          study.keyResults
            ? `<div style="background: var(--res-surface-code); border: 1px solid var(--res-primary-border); border-radius: 12px; padding: 0.85rem; font-size: 0.83rem; line-height: 1.55;">
                <strong style="color: var(--res-primary);">📈 Kết quả định lượng cốt lõi:</strong><br/>
                ${escapeHtml(study.keyResults)}
              </div>`
            : ''
        }

        ${
          related.length > 0
            ? `<div>
                <div style="font-size: 0.74rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: var(--res-text-muted); margin-bottom: 0.4rem;">
                  ⚖️ Đối chiếu nhanh với bài cùng nhãn
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.45rem;">
                  ${related
                    .map(
                      (r) => `
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; padding: 0.55rem 0.7rem; border-radius: 10px; background: var(--res-surface-subtle); border: 1px solid var(--res-border);">
                      <div style="min-width: 0;">
                        <div style="font-size: 0.8rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                          ${escapeHtml(r.study.trialAcronym || r.study.title)}
                        </div>
                        <div style="font-size: 0.7rem; color: var(--res-text-muted);">
                          Tương đồng ${r.similarityPercent}% nhãn${r.isDiscordant ? ' • ⚡ Trái chiều KQ' : ''}
                        </div>
                      </div>
                      <button type="button" class="res-mini-action-btn is-primary js-load-cluster" data-ids="${escapeHtml(
                        `${study.id},${r.study.id}`
                      )}">
                        <i class="fa-solid fa-scale-balanced"></i> So đôi
                      </button>
                    </div>
                  `
                    )
                    .join('')}
                </div>
              </div>`
            : ''
        }

        <div>
          <label for="js-drawer-note-input" style="font-size: 0.74rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: var(--res-text-muted); display: block; margin-bottom: 0.35rem;">
            📝 Ghi chú cá nhân (tự lưu trình duyệt)
          </label>
          <textarea id="js-drawer-note-input" data-id="${escapeHtml(study.id)}" class="res-notes-textarea" placeholder="Ghi nhận điểm cần nhớ cho Journal Club hoặc thực hành lâm sàng...">${escapeHtml(noteVal)}</textarea>
        </div>

        <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--res-border); display: flex; flex-wrap: wrap; gap: 0.6rem;">
          <button type="button" class="res-btn ${
            isCmp ? 'res-btn-primary' : 'res-btn-teal'
          } js-compare-toggle" data-id="${escapeHtml(study.id)}" style="flex: 1;">
            <i class="fa-solid fa-scale-balanced"></i>
            <span>${isCmp ? 'Đã ghim vào Bàn Cân' : '+ Đưa vào Bàn Cân'}</span>
          </button>
          <a href="#/ebm/kho-nghien-cuu/${escapeHtml(
            study.slug
          )}" class="res-btn res-btn-primary" style="flex: 1;">
            <i class="fa-solid fa-book-open"></i> Đọc Bài MDX Đầy Đủ
          </a>
        </div>
      </aside>
    </div>
  `;
}

function renderFloatingCompareDock(): string {
  const cmpList = researchStore.getCompareStudies();
  if (cmpList.length === 0 || currentMainMode === 'compare') return '';

  return `
    <div class="res-compare-dock" role="region" aria-label="Khay đối sánh nghiên cứu">
      <div class="res-dock-chips">
        <strong style="font-family: var(--res-font-display); font-size: 0.84rem;">
          <i class="fa-solid fa-scale-balanced" style="color: var(--res-primary);"></i>
          Khay So Sánh (${cmpList.length}/5):
        </strong>
        ${cmpList
          .map(
            (s) => `
          <span class="res-dock-pill">
            <span>${escapeHtml(s.trialAcronym || `${s.journal} ${s.year}`)}</span>
            <button type="button" class="js-compare-toggle" data-id="${escapeHtml(
              s.id
            )}" title="Gỡ bài này">✕</button>
          </span>
        `
          )
          .join('')}
      </div>

      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <button type="button" class="res-btn" id="js-dock-clear">Xóa</button>
        <button type="button" class="res-btn res-btn-primary" id="js-dock-open-compare">
          <i class="fa-solid fa-bolt"></i> Đối Sánh Ngay (${cmpList.length})
        </button>
      </div>
    </div>
  `;
}

function buildStudioInnerMarkup(): string {
  const allStudies = researchStore.getAllStudies();
  const filtered = researchStore.getFilteredStudies();
  const cmpStudies = researchStore.getCompareStudies();
  const clusters = researchStore.getSmartComparableClusters();
  const labelIndex = researchStore.getAtomicLabelIndex();
  const totalAtomicLabels = Object.values(labelIndex).reduce((acc, arr) => acc + arr.length, 0);

  const rctAndMetaCount = allStudies.filter(
    (s) => s.design === 'rct' || s.design === 'meta-analysis' || s.design === 'systematic-review'
  ).length;
  const totalPooledN = allStudies.reduce((acc, s) => acc + (s.sampleSize || 0), 0);

  return `
    <div class="res-shell-container">
      <!-- Top Bar -->
      <div class="res-topbar">
        <nav class="res-breadcrumb" aria-label="Breadcrumb">
          <a href="#/ebm"><i class="fa-solid fa-scale-balanced"></i> Trung Tâm Y Học Chứng Cứ</a>
          <span>/</span>
          <span style="font-weight: 800; color: var(--res-text);">CliniResearch Studio v3.0</span>
        </nav>

        <div class="res-mode-switcher" role="tablist">
          <button type="button" class="res-mode-tab ${
            currentMainMode === 'explore' ? 'is-active' : ''
          }" id="js-mode-explore">
            <i class="fa-solid fa-microscope"></i>
            <span>Khám Phá</span>
            <span class="res-mode-count">${allStudies.length}</span>
          </button>
          <button type="button" class="res-mode-tab ${
            currentMainMode === 'labels' ? 'is-active' : ''
          }" id="js-mode-labels">
            <i class="fa-solid fa-tags"></i>
            <span>Bản Đồ Tách Nhãn</span>
            <span class="res-mode-count">${totalAtomicLabels}</span>
          </button>
          <button type="button" class="res-mode-tab ${
            currentMainMode === 'compare' ? 'is-active' : ''
          }" id="js-mode-compare">
            <i class="fa-solid fa-scale-balanced"></i>
            <span>Bàn Cân Đối Sánh</span>
            <span class="res-mode-count">${cmpStudies.length}</span>
          </button>
        </div>
      </div>

      <!-- Academic Editorial Masthead -->
      <header class="res-masthead">
        <div class="res-masthead-grid">
          <div>
            <div class="res-eyebrow-row">
              <span class="res-eyebrow-pill"><i class="fa-solid fa-flask-vial"></i> CLINIRESEARCH STUDIO 3.0 • MDX NATIVE</span>
              <span class="res-eyebrow-pill">9-AXIS ATOMIC LABEL ENGINE</span>
            </div>
            <h1 class="res-masthead-title">
              Kho Giải Phẫu Nghiên Cứu Y Khoa &amp; Hệ Tách Nhãn Đối Sánh Đa Chiều
            </h1>
            <p class="res-masthead-desc">
              Không gian chuyên biệt mổ xẻ sâu các thử nghiệm lâm sàng (RCT), phân tích gộp (Meta-Analysis), đoàn hệ và nghiên cứu chẩn đoán. Mỗi bài báo được tách nhãn nguyên tử theo 9 trục chuẩn hóa để đối chiếu PICO, Forest Plot SVG, DNA Giao – Khác và giải mã bất đồng thuận chỉ với 1 chạm.
            </p>
          </div>

          <div class="res-kpi-grid">
            <div class="res-kpi-box">
              <div class="res-kpi-num">${allStudies.length}</div>
              <div class="res-kpi-lbl">Bài giải phẫu nghiên cứu MDX</div>
            </div>
            <div class="res-kpi-box">
              <div class="res-kpi-num">${rctAndMetaCount}</div>
              <div class="res-kpi-lbl">RCT, Systematic Review &amp; Meta</div>
            </div>
            <div class="res-kpi-box">
              <div class="res-kpi-num">${totalAtomicLabels}</div>
              <div class="res-kpi-lbl">Nhãn nguyên tử tách trên 9 trục</div>
            </div>
            <div class="res-kpi-box">
              <div class="res-kpi-num">${(totalPooledN / 1000).toFixed(1)}k+</div>
              <div class="res-kpi-lbl">Tổng cỡ mẫu bệnh nhân (N gộp)</div>
            </div>
          </div>
        </div>
      </header>

      <!-- Auto-Discovered Comparable Clusters Strip -->
      <section class="res-cluster-strip" aria-label="Cụm nghiên cứu cùng nhãn chung">
        <div class="res-cluster-hdr">
          <div class="res-cluster-title">
            <i class="fa-solid fa-wand-magic-sparkles" style="color: var(--res-teal);"></i>
            <span>So Sánh Nhanh 1-Chạm Theo Cụm Nhãn Chung (${clusters.length} cụm phát hiện tự động)</span>
          </div>
          <button type="button" class="res-mini-action-btn is-primary" id="js-open-atlas-shortcut">
            <i class="fa-solid fa-tags"></i> Mở Bản Đồ Tách Nhãn 9 Trục →
          </button>
        </div>
        <div class="res-cluster-scroll">
          ${clusters
            .map(
              (c) => `
            <button type="button" class="res-cluster-pill js-load-cluster" data-ids="${escapeHtml(
              c.studies.map((s) => s.id).join(',')
            )}" title="${escapeHtml(c.axisLabel)}: Bấm để nạp vào Bàn Cân Đối Sánh">
              <span style="color: var(--res-primary); font-weight: 800;">${escapeHtml(c.title)}</span>
              <span class="res-facet-count">${c.studies.length} bài</span>
              ${c.hasDiscordance ? `<span class="res-cluster-discord">⚡ Trái chiều KQ</span>` : ''}
            </button>
          `
            )
            .join('')}
        </div>
      </section>

      ${
        currentMainMode === 'compare'
          ? renderComparisonStudioSection()
          : currentMainMode === 'labels'
            ? renderLabelAtlasView()
            : `
        <div class="res-workspace-grid">
          ${renderLeftFacetRail(allStudies)}

          <div>
            <!-- Search, Sort & View Switch Toolbar -->
            <div class="res-toolbar-card">
              <div class="res-toolbar-row">
                <button type="button" class="res-btn res-mobile-filter-btn" id="js-mob-facets-btn">
                  <i class="fa-solid fa-sliders"></i>
                  <span>Lọc nhãn (${researchStore.getActiveFilterCount()})</span>
                </button>

                <div class="res-search-wrap">
                  <i class="fa-solid fa-magnifying-glass"></i>
                  <input
                    type="search"
                    id="js-res-search-input"
                    class="res-search-input"
                    value="${escapeHtml(researchStore.filters.search)}"
                    placeholder="Tìm thử nghiệm (EMPA-REG, STAREE, CAPE COD), thuốc, bệnh, kết cục, nhãn..."
                  />
                </div>

                <select class="res-select" id="js-res-sort-select" aria-label="Sắp xếp nghiên cứu">
                  <option value="year-desc" ${researchStore.getSortBy() === 'year-desc' ? 'selected' : ''}>Sắp xếp: Mới nhất</option>
                  <option value="sample-desc" ${researchStore.getSortBy() === 'sample-desc' ? 'selected' : ''}>Sắp xếp: Cỡ mẫu (N) lớn nhất</option>
                  <option value="if-desc" ${researchStore.getSortBy() === 'if-desc' ? 'selected' : ''}>Sắp xếp: Impact Factor cao nhất</option>
                  <option value="grade-desc" ${researchStore.getSortBy() === 'grade-desc' ? 'selected' : ''}>Sắp xếp: GRADE cao nhất</option>
                </select>

                <div style="display: flex; align-items: center; gap: 0.4rem;">
                  <button type="button" class="res-btn ${
                    researchStore.getViewMode() === 'cards' ? 'res-btn-primary' : ''
                  }" id="js-view-cards" title="Chế độ Thẻ PICO">
                    <i class="fa-solid fa-grip"></i> Thẻ PICO
                  </button>
                  <button type="button" class="res-btn ${
                    researchStore.getViewMode() === 'matrix' ? 'res-btn-primary' : ''
                  }" id="js-view-matrix" title="Chế độ Bảng định lượng">
                    <i class="fa-solid fa-table-list"></i> Bảng
                  </button>
                </div>

                <span style="font-family: var(--res-font-mono); font-size: 0.8rem; font-weight: 700; color: var(--res-text-muted);">
                  <strong style="color: var(--res-primary);">${filtered.length}</strong>/${allStudies.length}
                </span>
              </div>

              ${renderActiveFilterChips()}
            </div>

            <!-- Results Stream -->
            ${
              filtered.length === 0
                ? `<div class="res-article-canvas" style="text-align: center; padding: 3rem 1.5rem;">
                    <i class="fa-solid fa-filter-circle-xmark" style="font-size: 2.4rem; color: var(--res-text-muted); margin-bottom: 0.75rem;"></i>
                    <h3 style="font-family: var(--res-font-display); margin: 0 0 0.4rem;">Không có nghiên cứu nào khớp tổ hợp nhãn đang chọn</h3>
                    <p style="color: var(--res-text-muted); font-size: 0.88rem; margin: 0 0 1.1rem;">Hãy gỡ bớt một nhãn lọc để mở rộng tập nghiên cứu đối chiếu.</p>
                    <button type="button" class="res-btn res-btn-primary" id="js-empty-reset-btn">Đặt lại bộ lọc</button>
                  </div>`
                : researchStore.getViewMode() === 'cards'
                  ? `<div class="res-cards-grid">${filtered.map((s) => renderStudyCard(s)).join('')}</div>`
                  : renderMatrixTable(filtered)
            }
          </div>
        </div>
      `
      }
    </div>

    ${renderQuickPreviewDrawer()}
    ${renderFloatingCompareDock()}
  `;
}

export function renderResearchStudioView(): string {
  researchStore.init();
  parseHashQueryParams();
  return `<div class="res-studio-root" id="res-studio-mount">${buildStudioInnerMarkup()}</div>`;
}

export function initResearchStudioController(): void {
  const mount = document.getElementById('res-studio-mount');
  if (!mount) return;

  const rerender = (focusInputId?: string): void => {
    let cursorPos: number | null = null;
    if (focusInputId) {
      const oldInp = document.getElementById(focusInputId) as HTMLInputElement | null;
      cursorPos = oldInp?.selectionStart ?? null;
    }
    mount.innerHTML = buildStudioInnerMarkup();
    bindStudioEvents();
    if (focusInputId) {
      const newInp = document.getElementById(focusInputId) as HTMLInputElement | null;
      if (newInp) {
        newInp.focus();
        if (cursorPos !== null) newInp.setSelectionRange(cursorPos, cursorPos);
      }
    }
  };

  const bindStudioEvents = (): void => {
    document.getElementById('js-mode-explore')?.addEventListener('click', () => {
      currentMainMode = 'explore';
      rerender();
    });

    document.getElementById('js-mode-labels')?.addEventListener('click', () => {
      currentMainMode = 'labels';
      rerender();
    });

    document.getElementById('js-open-atlas-shortcut')?.addEventListener('click', () => {
      currentMainMode = 'labels';
      rerender();
    });

    document.getElementById('js-mode-compare')?.addEventListener('click', () => {
      currentMainMode = 'compare';
      rerender();
    });

    document.getElementById('js-mob-facets-btn')?.addEventListener('click', () => {
      isMobileFacetsOpen = !isMobileFacetsOpen;
      rerender();
    });

    const searchInp = document.getElementById('js-res-search-input') as HTMLInputElement | null;
    searchInp?.addEventListener('input', () => {
      researchStore.filters.search = searchInp.value;
      rerender('js-res-search-input');
    });

    const sortSel = document.getElementById('js-res-sort-select') as HTMLSelectElement | null;
    sortSel?.addEventListener('change', () => {
      researchStore.setSortBy(sortSel.value as ResearchSortKey);
      rerender();
    });

    // Label Atlas controls
    const atlasSearchInp = document.getElementById('js-atlas-search') as HTMLInputElement | null;
    atlasSearchInp?.addEventListener('input', () => {
      atlasSearchQuery = atlasSearchInp.value;
      rerender('js-atlas-search');
    });

    document.getElementById('js-atlas-comparable-toggle')?.addEventListener('click', () => {
      atlasComparableOnly = !atlasComparableOnly;
      rerender();
    });

    document.getElementById('js-view-cards')?.addEventListener('click', () => {
      researchStore.setViewMode('cards');
      rerender();
    });

    document.getElementById('js-view-matrix')?.addEventListener('click', () => {
      researchStore.setViewMode('matrix');
      rerender();
    });

    document.getElementById('js-toggle-saved-only')?.addEventListener('click', () => {
      researchStore.filters.savedOnly = !researchStore.filters.savedOnly;
      rerender();
    });

    document.getElementById('js-toggle-asian-only')?.addEventListener('click', () => {
      researchStore.filters.asianOnly = !researchStore.filters.asianOnly;
      rerender();
    });

    document.getElementById('js-reset-all-facets')?.addEventListener('click', () => {
      researchStore.resetFilters();
      rerender();
    });

    document.getElementById('js-empty-reset-btn')?.addEventListener('click', () => {
      researchStore.resetFilters();
      rerender();
    });

    // Facet buttons & clickable card / atlas / venn label tags
    mount.querySelectorAll<HTMLButtonElement>('.js-facet-select, .js-quick-label').forEach((btn) => {
      btn.addEventListener('click', () => {
        const facet = btn.getAttribute('data-facet') as FilterableFacetKey | null;
        const val = btn.getAttribute('data-val') || '';
        if (!facet) return;
        const current = researchStore.filters[facet];
        researchStore.filters[facet] = current === val || !val ? null : val;
        researchStore.setPreviewStudyId(null);
        currentMainMode = 'explore';
        rerender();
      });
    });

    mount.querySelectorAll<HTMLButtonElement>('.js-clear-single-facet').forEach((btn) => {
      btn.addEventListener('click', () => {
        const k = btn.getAttribute('data-key') as FilterableFacetKey | null;
        if (k) {
          researchStore.filters[k] = null;
          rerender();
        }
      });
    });

    // Smart Cluster 1-click load into Comparison Studio
    mount.querySelectorAll<HTMLButtonElement>('.js-load-cluster').forEach((btn) => {
      btn.addEventListener('click', () => {
        const rawIds = btn.getAttribute('data-ids') || '';
        const ids = rawIds.split(',').filter(Boolean);
        if (ids.length > 0) {
          researchStore.loadClusterIntoCompare(ids);
          researchStore.setPreviewStudyId(null);
          currentMainMode = 'compare';
          rerender();
        }
      });
    });

    // Bookmark toggle
    mount.querySelectorAll<HTMLButtonElement>('.js-bookmark-study').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (id) {
          researchStore.toggleBookmark(id);
          rerender();
        }
      });
    });

    // Compare toggle
    mount.querySelectorAll<HTMLButtonElement>('.js-compare-toggle, .js-res-remove-cmp').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (id) {
          researchStore.toggleCompare(id);
          rerender();
        }
      });
    });

    // Inline Study Picker inside Compare Studio
    const inlineAddSel = document.getElementById('js-cmp-inline-add') as HTMLSelectElement | null;
    inlineAddSel?.addEventListener('change', () => {
      if (inlineAddSel.value) {
        researchStore.toggleCompare(inlineAddSel.value);
        rerender();
      }
    });

    // Pin Baseline Study in Compare Matrix
    mount.querySelectorAll<HTMLButtonElement>('.js-pin-baseline').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (id) {
          researchStore.togglePinnedBaseline(id);
          rerender();
        }
      });
    });

    // Toggle Matrix Axis Groups
    mount.querySelectorAll<HTMLButtonElement>('.js-toggle-cmp-group').forEach((btn) => {
      btn.addEventListener('click', () => {
        const g = btn.getAttribute('data-group') as CompareMatrixGroupKey | null;
        if (g) {
          researchStore.toggleCompareGroup(g);
          rerender();
        }
      });
    });

    // Quick-Preview Drawer
    mount.querySelectorAll<HTMLButtonElement>('.js-preview-study').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        researchStore.setPreviewStudyId(id);
        rerender();
      });
    });

    const drawerNote = document.getElementById('js-drawer-note-input') as HTMLTextAreaElement | null;
    drawerNote?.addEventListener('input', () => {
      const id = drawerNote.getAttribute('data-id');
      if (id) researchStore.setPersonalNote(id, drawerNote.value);
    });

    document.getElementById('js-close-preview')?.addEventListener('click', () => {
      researchStore.setPreviewStudyId(null);
      rerender();
    });

    document.getElementById('js-preview-backdrop')?.addEventListener('click', (e) => {
      if ((e.target as HTMLElement)?.id === 'js-preview-backdrop') {
        researchStore.setPreviewStudyId(null);
        rerender();
      }
    });

    // Floating Compare Dock actions
    document.getElementById('js-dock-clear')?.addEventListener('click', () => {
      researchStore.clearCompare();
      rerender();
    });

    document.getElementById('js-dock-open-compare')?.addEventListener('click', () => {
      currentMainMode = 'compare';
      rerender();
    });

    // Comparison Studio sub-controls
    mount.querySelectorAll<HTMLButtonElement>('.js-cmp-subtab').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab') as ResearchCompareTab | null;
        if (tab) {
          researchStore.setCompareTab(tab);
          rerender();
        }
      });
    });

    document.getElementById('js-toggle-diff-only')?.addEventListener('click', () => {
      researchStore.toggleDiffHighlightOnly();
      rerender();
    });

    document.getElementById('js-clear-cmp-all')?.addEventListener('click', () => {
      researchStore.clearCompare();
      rerender();
    });

    const copyLinkBtn = document.getElementById('js-copy-cmp-link');
    copyLinkBtn?.addEventListener('click', () => {
      const studies = researchStore.getCompareStudies();
      const hash = buildShareableCompareHash(studies);
      const fullUrl =
        typeof window !== 'undefined'
          ? `${window.location.origin}${window.location.pathname}${hash}`
          : hash;
      if (navigator.clipboard) {
        void navigator.clipboard.writeText(fullUrl).then(() => {
          copyLinkBtn.innerHTML = '<i class="fa-solid fa-check"></i> Đã chép Link!';
          setTimeout(() => {
            copyLinkBtn.innerHTML = '<i class="fa-solid fa-link"></i> Link';
          }, 1800);
        });
      }
    });

    const exportBtn = document.getElementById('js-export-cmp-md');
    exportBtn?.addEventListener('click', () => {
      const md = buildMarkdownComparisonExport(researchStore.getCompareStudies());
      if (navigator.clipboard && md) {
        void navigator.clipboard.writeText(md).then(() => {
          exportBtn.innerHTML = '<i class="fa-solid fa-check"></i> Đã chép!';
          setTimeout(() => {
            exportBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Markdown';
          }, 1800);
        });
      }
    });

    const exportCsvBtn = document.getElementById('js-export-cmp-csv');
    exportCsvBtn?.addEventListener('click', () => {
      const studies = researchStore.getCompareStudies();
      const csv = buildCsvComparisonExport(studies);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cliniresearch-compare-${studies.length}studies.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  bindStudioEvents();
}
