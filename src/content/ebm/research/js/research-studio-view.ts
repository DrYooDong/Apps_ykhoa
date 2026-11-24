/**
 * CliniPortal 2.0 — CliniResearch Studio Main Explorer & Comparison Workspace
 * Path: src/content/ebm/research/js/research-studio-view.ts
 *
 * Distinct Academic Journal & Quantitative Trial Studio UI:
 *  - Editorial Masthead with live trial metrics & total pooled sample size (N)
 *  - Auto-discovered Smart Label Clusters strip (1-click multi-study comparison)
 *  - 3-Zone Faceted Tag Explorer (Outcome, Design, Condition, Intervention, Year, RoB)
 *  - PICO Evidence Cards & Quantitative Matrix Views
 *  - Slide-over 5-second Quick-Appraisal Drawer + Persistent Floating Compare Dock
 */

import '../css/research-studio.css';
import { lookupSharedJournalMetric } from '../../shared-core';
import {
  buildMarkdownComparisonExport,
  renderComparisonStudioSection
} from './research-compare-engine';
import {
  GRADE_LABELS,
  IMPACT_VERDICTS,
  INTERVENTION_CLASSES,
  OUTCOME_DIRECTIONS,
  RESEARCH_CONDITIONS,
  RESEARCH_DESIGNS,
  RESEARCH_SPECIALTIES,
  ROB_LABELS
} from './research-taxonomy';
import { researchStore } from './research-store';
import type { ResearchCompareTab, ResearchStudyRecord } from './research-types';

type StudioMainMode = 'explore' | 'compare';
let currentMainMode: StudioMainMode = 'explore';
let isMobileFacetsOpen = false;

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
  if (params.get('mode') === 'compare') {
    currentMainMode = 'compare';
  }
  const cond = params.get('condition');
  if (cond) {
    researchStore.filters.conditionKey = cond;
    currentMainMode = 'explore';
  }
  const intv = params.get('intervention');
  if (intv) {
    researchStore.filters.interventionClass = intv;
    currentMainMode = 'explore';
  }
}

function renderFacetGroup(
  title: string,
  facetKey:
    | 'outcomeDirection'
    | 'design'
    | 'conditionKey'
    | 'interventionClass'
    | 'specialty'
    | 'yearPeriod'
    | 'robOverall',
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

  const robOpts = Object.entries(ROB_LABELS).map(([k, v]) => ({
    value: k,
    label: v.label,
    count: countBy((s) => s.robOverall === k)
  }));

  return `
    <aside class="res-facet-rail ${isMobileFacetsOpen ? 'is-mobile-open' : ''}" id="res-facet-rail" aria-label="Bộ lọc nhãn nghiên cứu">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.85rem;">
        <strong style="font-family: var(--res-font-display); font-size: 0.9rem;">
          <i class="fa-solid fa-sliders" style="color: var(--res-primary);"></i> Trục Nhãn Nghiên Cứu
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

      ${renderFacetGroup('1. Kết Quả Nghiên Cứu', 'outcomeDirection', outcomeOpts)}
      ${renderFacetGroup('2. Thiết Kế Nghiên Cứu', 'design', designOpts)}
      ${renderFacetGroup('3. Bệnh / Vấn Đề Lâm Sàng', 'conditionKey', condOpts)}
      ${renderFacetGroup('4. Nhóm Can Thiệp / Cơ Chế', 'interventionClass', intvOpts)}
      ${renderFacetGroup('5. Năm Công Bố', 'yearPeriod', yearOpts)}
      ${renderFacetGroup('6. Chuyên Khoa', 'specialty', specOpts)}
      ${renderFacetGroup('7. Nguy Cơ Sai Lệch (RoB)', 'robOverall', robOpts)}
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
    stars: '⊕⊕⊕◯',
    tone: 'teal' as const
  };

  const isCompared = researchStore.isInCompare(s.id);
  const pm = s.primaryMetric;
  const quantBannerText = pm?.effectEstimate
    ? `${pm.measure || 'HR'} ${pm.effectEstimate}${
        pm.ciLower && pm.ciUpper ? ` (95% CI: ${pm.ciLower}–${pm.ciUpper})` : ''
      }${pm.pValue ? ` • p=${pm.pValue}` : ''}${pm.nnt ? ` • NNT=${pm.nnt}` : ''}`
    : s.sampleSize
      ? `Cỡ mẫu N = ${s.sampleSize.toLocaleString('en-US')} • ${verdictMeta.shortLabel || s.impactVerdict}`
      : `${verdictMeta.shortLabel || s.impactVerdict} • GRADE ${gradeMeta.stars}`;

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
          <span>📊 ${escapeHtml(quantBannerText)}</span>
          <span>${gradeMeta.stars}</span>
        </div>

        <!-- Clickable Shared Label Chips -->
        <div class="res-card-labels-row" style="margin-top: 0.65rem;">
          <button type="button" class="res-tag res-tag-clickable tone-slate js-quick-label" data-facet="conditionKey" data-val="${escapeHtml(
            s.conditionKey
          )}">
            🩺 ${escapeHtml(RESEARCH_CONDITIONS[s.conditionKey] || s.conditionKey)}
          </button>
          <button type="button" class="res-tag res-tag-clickable tone-violet js-quick-label" data-facet="interventionClass" data-val="${escapeHtml(
            s.interventionClass
          )}">
            💊 ${escapeHtml(INTERVENTION_CLASSES[s.interventionClass] || s.interventionClass)}
          </button>
          ${s.topicTags
            .slice(0, 2)
            .map(
              (tag) => `
            <button type="button" class="res-tag res-tag-clickable tone-teal js-quick-label" data-facet="topicTag" data-val="${escapeHtml(
              tag
            )}">
              #${escapeHtml(tag)}
            </button>
          `
            )
            .join('')}
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
          )}" title="Xem nhanh PICO & Thẩm định 5 giây">
            <i class="fa-solid fa-eye"></i> Xem nhanh
          </button>
          <button type="button" class="res-btn ${
            isCompared ? 'res-btn-primary' : 'res-btn-teal'
          } js-compare-toggle" data-id="${escapeHtml(s.id)}">
            <i class="fa-solid fa-scale-balanced"></i>
            <span>${isCompared ? 'Đã chọn' : 'So sánh'}</span>
          </button>
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
              <th>Bệnh / Vấn đề &amp; Can thiệp</th>
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
                      <div style="font-size: 0.76rem; color: var(--res-text-secondary); margin-top: 4px; max-width: 270px;">
                        ${escapeHtml(
                          s.primaryMetric?.effectEstimate
                            ? `${s.primaryMetric.measure || 'HR'} ${s.primaryMetric.effectEstimate} (${
                                s.primaryMetric.ciLower || ''
                              }–${s.primaryMetric.ciUpper || ''})`
                            : (s.summary || '').slice(0, 95) + '…'
                        )}
                      </div>
                    </td>
                    <td>
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

function renderActiveFilterChips(): string {
  const f = researchStore.filters;
  const chips: Array<{ key: string; label: string }> = [];

  if (f.outcomeDirection) {
    chips.push({
      key: 'outcomeDirection',
      label: `Kết quả: ${OUTCOME_DIRECTIONS[f.outcomeDirection]?.shortLabel || f.outcomeDirection}`
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
  if (f.interventionClass) {
    chips.push({
      key: 'interventionClass',
      label: `Can thiệp: ${INTERVENTION_CLASSES[f.interventionClass] || f.interventionClass}`
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
    chips.push({ key: 'robOverall', label: `RoB: ${ROB_LABELS[f.robOverall]?.label || f.robOverall}` });
  }
  if (f.topicTag) {
    chips.push({ key: 'topicTag', label: `Nhãn: #${f.topicTag}` });
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
          <h3 style="font-family: var(--res-font-display); font-size: 1.2rem; line-height: 1.35; margin: 0.35rem 0 0;">
            ${escapeHtml(study.title)}
          </h3>
        </div>

        <div class="res-mini-pico">
          <div class="res-mini-pico-row"><span class="res-pico-key">P</span><span>${escapeHtml(study.population || '—')}</span></div>
          <div class="res-mini-pico-row"><span class="res-pico-key">I/C</span><span>${escapeHtml(study.intervention || study.drug || '—')}</span></div>
          <div class="res-mini-pico-row"><span class="res-pico-key">O</span><span>${escapeHtml(study.primaryEndpoint || '—')}</span></div>
        </div>

        ${
          study.keyResults
            ? `<div style="background: var(--res-surface-code); border: 1px solid var(--res-primary-border); border-radius: 12px; padding: 0.85rem; font-size: 0.84rem; line-height: 1.55;">
                <strong style="color: var(--res-primary);">📈 Kết quả định lượng cốt lõi:</strong><br/>
                ${escapeHtml(study.keyResults)}
              </div>`
            : ''
        }

        ${
          (study.keyRecommendations || []).length > 0
            ? `<div>
                <strong style="font-size: 0.84rem;">🎯 Điểm nhấn giải phẫu:</strong>
                <ul style="margin: 0.45rem 0 0 1.1rem; padding: 0; font-size: 0.83rem; line-height: 1.6; color: var(--res-text-secondary);">
                  ${(study.keyRecommendations || []).map((r) => `<li>${escapeHtml(r)}</li>`).join('')}
                </ul>
              </div>`
            : ''
        }

        <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--res-border); display: flex; flex-wrap: wrap; gap: 0.6rem;">
          <button type="button" class="res-btn ${
            isCmp ? 'res-btn-primary' : 'res-btn-teal'
          } js-compare-toggle" data-id="${escapeHtml(study.id)}" style="flex: 1;">
            <i class="fa-solid fa-scale-balanced"></i>
            <span>${isCmp ? 'Đã ghim vào Bàn Cân' : '+ Đưa vào Bàn Cân So Sánh'}</span>
          </button>
          <a href="#/ebm/kho-nghien-cuu/${escapeHtml(
            study.slug
          )}" class="res-btn res-btn-primary" style="flex: 1;">
            <i class="fa-solid fa-book-open"></i> Đọc Bài Phân Tích Đầy Đủ
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
          <span style="font-weight: 800; color: var(--res-text);">Kho Phân Tích Nghiên Cứu Chuyên Sâu (CliniResearch Studio)</span>
        </nav>

        <div class="res-mode-switcher" role="tablist">
          <button type="button" class="res-mode-tab ${
            currentMainMode === 'explore' ? 'is-active' : ''
          }" id="js-mode-explore">
            <i class="fa-solid fa-microscope"></i>
            <span>Khám Phá Nghiên Cứu</span>
            <span class="res-mode-count">${allStudies.length}</span>
          </button>
          <button type="button" class="res-mode-tab ${
            currentMainMode === 'compare' ? 'is-active' : ''
          }" id="js-mode-compare">
            <i class="fa-solid fa-scale-balanced"></i>
            <span>Bàn Cân Đối Sánh Nhãn</span>
            <span class="res-mode-count">${cmpStudies.length}</span>
          </button>
        </div>
      </div>

      <!-- Academic Editorial Masthead -->
      <header class="res-masthead">
        <div class="res-masthead-grid">
          <div>
            <div class="res-eyebrow-row">
              <span class="res-eyebrow-pill"><i class="fa-solid fa-flask-vial"></i> CLINIRESEARCH ARCHIVE • MDX NATIVE</span>
              <span class="res-eyebrow-pill">7-AXIS SHARED LABEL TAXONOMY</span>
            </div>
            <h1 class="res-masthead-title">
              Kho Giải Phẫu Nghiên Cứu Y Khoa &amp; Đối Sánh Bằng Chứng Đa Chiều
            </h1>
            <p class="res-masthead-desc">
              Không gian độc lập chuyên thu thập, mổ xẻ chuyên sâu các thử nghiệm lâm sàng (RCT), phân tích gộp (Meta-Analysis) và đoàn hệ dưới định dạng MDX. Tích hợp hệ nhãn chung chuẩn hóa giúp đối chiếu trực tiếp PICO, Forest Plot và lý giải nguyên nhân bất đồng thuận giữa các nghiên cứu.
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
              <div class="res-kpi-num">${clusters.length}</div>
              <div class="res-kpi-lbl">Cụm Nhãn Chung sẵn sàng so sánh</div>
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
            <span>Gợi Ý So Sánh Nhanh Theo Nhãn Chung (1-Chạm Nạp Vào Bàn Cân)</span>
          </div>
          <span style="font-size: 0.75rem; color: var(--res-text-muted);">Tự động gom nhóm từ YAML Frontmatter</span>
        </div>
        <div class="res-cluster-scroll">
          ${clusters
            .map(
              (c) => `
            <button type="button" class="res-cluster-pill js-load-cluster" data-ids="${escapeHtml(
              c.studies.map((s) => s.id).join(',')
            )}" title="Bấm để mở Bàn cân so sánh nhóm nghiên cứu này">
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
          : `
        <div class="res-workspace-grid">
          ${renderLeftFacetRail(allStudies)}

          <div>
            <!-- Search & View Switch Toolbar -->
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
                    placeholder="Tìm tên thử nghiệm (EMPA-REG, STAREE, CAPE COD), hoạt chất, bệnh, kết cục, nhãn..."
                  />
                </div>

                <div style="display: flex; align-items: center; gap: 0.4rem;">
                  <button type="button" class="res-btn ${
                    researchStore.getViewMode() === 'cards' ? 'res-btn-primary' : ''
                  }" id="js-view-cards" title="Chế độ Thẻ PICO">
                    <i class="fa-solid fa-grip"></i> Thẻ PICO
                  </button>
                  <button type="button" class="res-btn ${
                    researchStore.getViewMode() === 'matrix' ? 'res-btn-primary' : ''
                  }" id="js-view-matrix" title="Chế độ Bảng định lượng">
                    <i class="fa-solid fa-table-list"></i> Bảng số liệu
                  </button>
                </div>

                <span style="font-family: var(--res-font-mono); font-size: 0.8rem; font-weight: 700; color: var(--res-text-muted);">
                  Hiển thị <strong style="color: var(--res-primary);">${filtered.length}</strong>/${allStudies.length}
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

  const rerender = (preserveSearchFocus = false): void => {
    let cursorPos: number | null = null;
    if (preserveSearchFocus) {
      const oldInp = document.getElementById('js-res-search-input') as HTMLInputElement | null;
      cursorPos = oldInp?.selectionStart ?? null;
    }
    mount.innerHTML = buildStudioInnerMarkup();
    bindStudioEvents();
    if (preserveSearchFocus) {
      const newInp = document.getElementById('js-res-search-input') as HTMLInputElement | null;
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
      rerender(true);
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

    // Facet buttons & clickable card label tags
    mount.querySelectorAll<HTMLButtonElement>('.js-facet-select, .js-quick-label').forEach((btn) => {
      btn.addEventListener('click', () => {
        const facet = btn.getAttribute('data-facet') as keyof typeof researchStore.filters | null;
        const val = btn.getAttribute('data-val') || '';
        if (!facet || facet === 'asianOnly' || facet === 'savedOnly' || facet === 'search') return;
        const current = researchStore.filters[facet];
        researchStore.filters[facet] = current === val || !val ? null : val;
        currentMainMode = 'explore';
        rerender();
      });
    });

    mount.querySelectorAll<HTMLButtonElement>('.js-clear-single-facet').forEach((btn) => {
      btn.addEventListener('click', () => {
        const k = btn.getAttribute('data-key') as keyof typeof researchStore.filters | null;
        if (k && k !== 'asianOnly' && k !== 'savedOnly' && k !== 'search') {
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

    // Quick-Preview Drawer
    mount.querySelectorAll<HTMLButtonElement>('.js-preview-study').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        researchStore.setPreviewStudyId(id);
        rerender();
      });
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

    const exportBtn = document.getElementById('js-export-cmp-md');
    exportBtn?.addEventListener('click', () => {
      const md = buildMarkdownComparisonExport(researchStore.getCompareStudies());
      if (navigator.clipboard && md) {
        void navigator.clipboard.writeText(md).then(() => {
          exportBtn.innerHTML = '<i class="fa-solid fa-check"></i> Đã chép Markdown!';
          setTimeout(() => {
            exportBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Sao chép Bảng Markdown';
          }, 1800);
        });
      }
    });
  };

  bindStudioEvents();
}
