/**
 * CliniPortal 2.0 — Multi-Axis Atomic-Label Research Comparison Engine (v3.0)
 * Path: src/content/ebm/research/js/research-compare-engine.ts
 *
 * Powers 5 deep comparative views across 2–5 research studies:
 *  1. Diff-Aware PICO & 9-Axis Matrix (with Axis Toggles + Pin Baseline Study)
 *  2. Atomic Label Overlap & Divergence View (Shared DNA vs Divergent Drivers)
 *  3. Quantitative Visual Deck: Cross-Study Forest Plot SVG + Log Sample-Size Bars + AUC/WMD/ARR Cards
 *  4. Chronological Evidence Evolution Timeline
 *  5. Automated Discordance & Confounding Decoder + Markdown/CSV/URL Export
 */

import { renderCrossStudyForestPlotSvg, lookupSharedJournalMetric } from '../../shared-core';
import {
  ATOMIC_AXIS_META,
  COMPARATOR_TYPES,
  computeLabelOverlap,
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
  ROB_LABELS
} from './research-taxonomy';
import { researchStore } from './research-store';
import type {
  CompareMatrixGroupKey,
  ResearchCompareTab,
  ResearchStudyRecord
} from './research-types';

function escapeHtml(val?: string | number | null): string {
  if (val === undefined || val === null) return '';
  return String(val)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const MATRIX_GROUP_META: Array<{ key: CompareMatrixGroupKey; label: string; icon: string }> = [
  { key: 'identity', label: 'Định danh', icon: 'fa-regular fa-newspaper' },
  { key: 'condition', label: 'Bệnh & Vấn đề', icon: 'fa-solid fa-stethoscope' },
  { key: 'design', label: 'Thiết kế & N', icon: 'fa-solid fa-flask-vial' },
  { key: 'pico', label: 'Khung PICO', icon: 'fa-solid fa-diagram-project' },
  { key: 'quant', label: 'Định lượng', icon: 'fa-solid fa-chart-line' },
  { key: 'appraisal', label: 'RoB / GRADE', icon: 'fa-solid fa-shield-halved' },
  { key: 'clinical', label: 'Phân nhóm & Áp dụng', icon: 'fa-solid fa-user-doctor' }
];

interface ComparisonRowSpec {
  id: string;
  group: CompareMatrixGroupKey;
  axisGroup: string;
  label: string;
  rawKey: (s: ResearchStudyRecord) => string;
  renderCell: (s: ResearchStudyRecord) => string;
}

function buildComparisonRows(): ComparisonRowSpec[] {
  return [
    {
      id: 'year-journal',
      group: 'identity',
      axisGroup: 'Định danh & Nguồn',
      label: '📅 Năm, Tạp chí (IF / Q) & Mã',
      rawKey: (s) => `${s.year}|${s.journal}`,
      renderCell: (s) => {
        const jm = lookupSharedJournalMetric(s.journal);
        return `
          <div><strong>${escapeHtml(s.journal)}</strong> (${s.year})</div>
          ${
            jm?.impactFactor
              ? `<div style="font-family: var(--res-font-mono); font-size: 0.74rem; color: var(--res-primary); margin-top: 2px;">IF ${jm.impactFactor} • ${jm.quartile}</div>`
              : ''
          }
          ${
            s.nctId || s.doi
              ? `<div style="font-family: var(--res-font-mono); font-size: 0.7rem; color: var(--res-text-muted); margin-top: 3px;">${escapeHtml(
                  [s.nctId, s.doi ? `DOI: ${s.doi}` : ''].filter(Boolean).join(' • ')
                )}</div>`
              : ''
          }
        `;
      }
    },
    {
      id: 'condition',
      group: 'condition',
      axisGroup: 'Nhãn Bệnh / Vấn đề',
      label: '🩺 Bệnh lý & Nhãn Vấn đề',
      rawKey: (s) => s.conditionKey,
      renderCell: (s) => `
        <div style="display: flex; flex-wrap: wrap; gap: 0.3rem;">
          <span class="res-tag tone-indigo">${escapeHtml(
            RESEARCH_CONDITIONS[s.conditionKey] || s.conditionKey
          )}</span>
          ${(s.icd10 || [])
            .slice(0, 3)
            .map((code) => `<span class="res-tag tone-slate" style="font-family: var(--res-font-mono); font-size: 0.68rem;">${escapeHtml(code)}</span>`)
            .join('')}
        </div>
        ${
          (s.problemLabels || []).length > 0
            ? `<div style="display: flex; flex-wrap: wrap; gap: 0.28rem; margin-top: 5px;">${s.problemLabels
                .map(
                  (p) =>
                    `<span class="res-tag tone-slate" style="font-size: 0.68rem;">${escapeHtml(
                      humanizeSlugLabel(p, PROBLEM_LABELS_VI)
                    )}</span>`
                )
                .join('')}</div>`
            : ''
        }
      `
    },
    {
      id: 'design',
      group: 'design',
      axisGroup: 'Nhãn Thiết kế',
      label: '🔬 Thiết kế, Làm mù & Phạm vi',
      rawKey: (s) => `${s.design}|${s.blinding || ''}`,
      renderCell: (s) => {
        const dm = RESEARCH_DESIGNS[s.design];
        return `
          <div><span class="res-tag tone-${dm?.tone || 'indigo'}"><i class="${
            dm?.icon || 'fa-solid fa-flask'
          }"></i> ${escapeHtml(dm?.label || s.design)}</span></div>
          <div style="font-size: 0.76rem; color: var(--res-text-secondary); margin-top: 4px;">
            ${escapeHtml(
              [s.phase, s.blinding, s.centerScope, s.hypothesisType].filter(Boolean).join(' • ') ||
                'Chuẩn học thuật'
            )}
          </div>
        `;
      }
    },
    {
      id: 'sample-followup',
      group: 'design',
      axisGroup: 'Cỡ mẫu & Theo dõi',
      label: '👥 Cỡ mẫu (N), Theo dõi & Châu Á',
      rawKey: (s) => `${s.sampleSize || 0}|${s.followUpDuration || ''}`,
      renderCell: (s) => `
        <div style="font-family: var(--res-font-mono); font-weight: 800; font-size: 0.92rem; color: var(--res-text);">
          ${s.sampleSize ? `N = ${s.sampleSize.toLocaleString('en-US')}` : 'Tổng hợp đa nghiên cứu'}
        </div>
        ${
          s.followUpDuration
            ? `<div style="font-size: 0.76rem; color: var(--res-text-muted); margin-top: 2px;">⏱️ Theo dõi: ${escapeHtml(
                s.followUpDuration
              )}</div>`
            : ''
        }
        ${
          s.asianData
            ? `<div style="margin-top: 5px;"><span class="res-tag tone-teal" style="font-size: 0.68rem;">🌏 Có dữ liệu Châu Á</span></div>`
            : `<div style="margin-top: 5px;"><span class="res-tag tone-slate" style="font-size: 0.68rem;">🌐 Chủ yếu Âu / Mỹ / Úc</span></div>`
        }
      `
    },
    {
      id: 'population',
      group: 'pico',
      axisGroup: 'PICO — Quần thể (P)',
      label: '🧬 Dân số chọn vào (P)',
      rawKey: (s) => (s.populationTags || []).slice().sort().join('|') || s.population || '',
      renderCell: (s) => `
        ${
          (s.populationTags || []).length > 0
            ? `<div style="display: flex; flex-wrap: wrap; gap: 0.28rem; margin-bottom: 5px;">${s.populationTags
                .map(
                  (pt) =>
                    `<span class="res-tag tone-teal" style="font-size: 0.68rem;">${escapeHtml(
                      humanizeSlugLabel(pt, POPULATION_TAGS_VI)
                    )}</span>`
                )
                .join('')}</div>`
            : ''
        }
        <div style="line-height: 1.5; font-size: 0.81rem;">${escapeHtml(s.population || 'Xem chi tiết trong bài')}</div>
      `
    },
    {
      id: 'intervention',
      group: 'pico',
      axisGroup: 'PICO — Can thiệp & Đối chứng (I/C)',
      label: '💊 Can thiệp (I) vs Đối chứng (C)',
      rawKey: (s) => `${s.interventionClass}|${s.comparatorType || ''}`,
      renderCell: (s) => `
        <div style="display: flex; flex-wrap: wrap; gap: 0.3rem; margin-bottom: 5px;">
          <span class="res-tag tone-violet">${escapeHtml(
            INTERVENTION_CLASSES[s.interventionClass] || s.interventionClass
          )}</span>
          ${
            s.comparatorType
              ? `<span class="res-tag tone-slate">vs ${escapeHtml(
                  COMPARATOR_TYPES[s.comparatorType] || s.comparatorType
                )}</span>`
              : ''
          }
        </div>
        <div style="line-height: 1.48; font-size: 0.81rem;">${escapeHtml(s.intervention || s.drug || '—')}</div>
      `
    },
    {
      id: 'endpoint',
      group: 'pico',
      axisGroup: 'PICO — Tiêu chí chính (O)',
      label: '🎯 Kết cục chính (Primary O)',
      rawKey: (s) => s.primaryEndpointCategory,
      renderCell: (s) => `
        <div style="margin-bottom: 5px;">
          <span class="res-tag tone-teal">${escapeHtml(
            ENDPOINT_CATEGORIES[s.primaryEndpointCategory] || s.primaryEndpointCategory
          )}</span>
        </div>
        <div style="line-height: 1.48; font-weight: 600; font-size: 0.81rem;">${escapeHtml(s.primaryEndpoint || '—')}</div>
      `
    },
    {
      id: 'direction-verdict',
      group: 'quant',
      axisGroup: 'Nhãn Kết quả',
      label: '📊 Hướng Kết quả & Phán quyết',
      rawKey: (s) => `${s.outcomeDirection}|${s.impactVerdict}`,
      renderCell: (s) => {
        const dir = OUTCOME_DIRECTIONS[s.outcomeDirection];
        const ver = IMPACT_VERDICTS[s.impactVerdict];
        return `
          <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
            <span class="res-tag tone-${dir?.tone || 'slate'}"><i class="${
              dir?.icon || 'fa-solid fa-circle'
            }"></i> ${escapeHtml(dir?.shortLabel || s.outcomeDirection)}</span>
            <span class="res-tag tone-${ver?.tone || 'indigo'}"><i class="${
              ver?.icon || 'fa-solid fa-bolt'
            }"></i> ${escapeHtml(ver?.shortLabel || s.impactVerdict)}</span>
          </div>
        `;
      }
    },
    {
      id: 'quant-results',
      group: 'quant',
      axisGroup: 'Định lượng Thống kê',
      label: '📈 Chỉ số Hiệu quả (HR / RR / AUC / NNT)',
      rawKey: (s) => s.primaryMetric?.rawDiffText || s.keyResults || String(s.primaryMetric?.effectEstimate || ''),
      renderCell: (s) => {
        const pm = s.primaryMetric;
        const monoLine = pm?.effectEstimate
          ? `${pm.measure || 'HR'} = ${pm.effectEstimate}${
              pm.ciLower && pm.ciUpper ? ` (95% CI: ${pm.ciLower}–${pm.ciUpper})` : ''
            }${pm.pValue ? ` • p = ${pm.pValue}` : ''}${pm.nnt ? ` • NNT = ${pm.nnt}` : ''}`
          : pm?.rawDiffText
            ? `${pm.measure ? `[${pm.measure}] ` : ''}${pm.rawDiffText}`
            : null;
        return `
          ${
            monoLine
              ? `<div style="font-family: var(--res-font-mono); font-weight: 800; font-size: 0.78rem; color: var(--res-primary); margin-bottom: 5px; background: var(--res-surface-code); padding: 0.35rem 0.55rem; border-radius: 7px;">${escapeHtml(
                  monoLine
                )}</div>`
              : ''
          }
          <div style="font-size: 0.8rem; line-height: 1.5; color: var(--res-text-secondary);">${escapeHtml(
            s.keyResults || s.summary || '—'
          )}</div>
        `;
      }
    },
    {
      id: 'safety-rob',
      group: 'appraisal',
      axisGroup: 'Thẩm định & An toàn',
      label: '🛡️ RoB 2.0, GRADE, Tài trợ & An toàn',
      rawKey: (s) => `${s.robOverall}|${s.gradeCertainty}|${s.fundingSource || ''}`,
      renderCell: (s) => {
        const rob = ROB_LABELS[s.robOverall] || { label: s.robOverall, shortLabel: s.robOverall, tone: 'slate' as const };
        const gr = GRADE_LABELS[s.gradeCertainty] || {
          label: s.gradeCertainty,
          shortLabel: s.gradeCertainty,
          stars: '⊕⊕⊕◯',
          tone: 'teal' as const
        };
        const fund = s.fundingSource ? FUNDING_LABELS[s.fundingSource] : null;
        return `
          <div style="display: flex; flex-wrap: wrap; gap: 0.32rem; margin-bottom: 5px;">
            <span class="res-tag tone-${rob.tone}">${escapeHtml(rob.shortLabel)}</span>
            <span class="res-tag tone-${gr.tone}">${gr.stars} ${escapeHtml(gr.shortLabel)}</span>
            ${fund ? `<span class="res-tag tone-${fund.tone}">${escapeHtml(fund.label)}</span>` : ''}
            ${s.fragilityIndex ? `<span class="res-tag tone-indigo" style="font-family: var(--res-font-mono);">FI = ${s.fragilityIndex}</span>` : ''}
          </div>
          ${
            s.safetyHighlight
              ? `<div style="font-size: 0.76rem; color: var(--res-rose); line-height: 1.45; margin-top: 4px;">⚠️ ${escapeHtml(
                  s.safetyHighlight
                )}</div>`
              : ''
          }
        `;
      }
    },
    {
      id: 'subgroups',
      group: 'clinical',
      axisGroup: 'Phân nhóm Trọng điểm',
      label: '🧩 Điểm Nhấn Phân Nhóm / Kết Cục Phụ',
      rawKey: (s) => Object.keys(s.subgroups || {}).join('|') || (s.keyRecommendations || [])[0] || '',
      renderCell: (s) => {
        const entries = Object.entries(s.subgroups || {});
        if (entries.length > 0) {
          return `<ul style="margin: 0 0 0 1rem; padding: 0; font-size: 0.78rem; line-height: 1.5; color: var(--res-text-secondary);">
            ${entries
              .slice(0, 3)
              .map(([k, v]) => `<li style="margin-bottom: 0.25rem;"><strong>${escapeHtml(k)}:</strong> ${escapeHtml(v.replace(/^(COL|HBAR):\s*/i, ''))}</li>`)
              .join('')}
          </ul>`;
        }
        return `<ul style="margin: 0 0 0 1rem; padding: 0; font-size: 0.78rem; line-height: 1.5; color: var(--res-text-secondary);">
          ${(s.keyRecommendations || [])
            .slice(0, 2)
            .map((r) => `<li style="margin-bottom: 0.25rem;">${escapeHtml(r)}</li>`)
            .join('')}
        </ul>`;
      }
    },
    {
      id: 'conclusion',
      group: 'clinical',
      axisGroup: 'Ứng dụng Thực hành',
      label: '💡 Ranh giới Áp dụng Lâm sàng',
      rawKey: (s) => s.detailedConclusion || s.summary || '',
      renderCell: (s) => `
        <div style="line-height: 1.55; font-size: 0.81rem;">${escapeHtml(s.detailedConclusion || s.summary || '—')}</div>
        <div style="margin-top: 0.55rem;">
          <a href="#/ebm/kho-nghien-cuu/${escapeHtml(
            s.slug
          )}" class="res-btn" style="min-height: 34px; padding: 0.22rem 0.65rem; font-size: 0.75rem;">
            <i class="fa-solid fa-book-open"></i> Mở bài giải phẫu MDX
          </a>
        </div>
      `
    }
  ];
}

function renderLabelDnaBanner(studies: ResearchStudyRecord[]): string {
  if (studies.length < 2) {
    return `
      <div style="background: var(--res-surface-subtle); border: 1px solid var(--res-border); border-radius: 12px; padding: 0.85rem 1rem; margin-bottom: 1rem; font-size: 0.83rem; color: var(--res-text-secondary);">
        <i class="fa-solid fa-circle-info" style="color: var(--res-primary);"></i> Đang có <strong>1 nghiên cứu</strong> trên bàn cân. Hãy chọn thêm ít nhất <strong>1 nghiên cứu khác</strong> từ thanh Chọn Nhanh bên dưới để kích hoạt phân tích Nhãn Chung – Khác và Biểu đồ đối chiếu!
      </div>
    `;
  }

  const overlap = computeLabelOverlap(studies);
  const dirSet = new Set(studies.map((s) => s.outcomeDirection));
  const hasDiscord = dirSet.size > 1;

  return `
    <div class="res-dna-banner">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.3rem;">
        <div class="res-similarity-ring" style="--sim-pct: ${overlap.similarityPercent};" title="Tỷ lệ giao nhau của toàn bộ nhãn nguyên tử giữa các bài đang so sánh">
          <span class="res-similarity-ring-val">${overlap.similarityPercent}%</span>
        </div>
        <span style="font-family: var(--res-font-mono); font-size: 0.66rem; font-weight: 800; color: var(--res-text-muted); text-transform: uppercase;">Tương đồng nhãn</span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.55rem;">
        <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem;">
          <strong style="font-family: var(--res-font-display); font-size: 0.88rem; color: var(--res-text);">
            <i class="fa-solid fa-dna" style="color: var(--res-primary);"></i>
            DNA Nhãn Chung (${overlap.sharedLabels.length} nhãn đồng nhất • ${overlap.divergentAxes.length} trục phân hóa)
          </strong>
          ${
            hasDiscord
              ? `<span class="res-tag tone-amber"><i class="fa-solid fa-bolt"></i> Trái chiều Hướng Kết Quả — Xem tab "Giải Mã Bất Đồng Thuận"</span>`
              : `<span class="res-tag tone-emerald"><i class="fa-solid fa-check-double"></i> Đồng thuận Hướng Kết Quả</span>`
          }
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
          ${
            overlap.sharedLabels.length > 0
              ? overlap.sharedLabels
                  .map(
                    (lbl) => `
                  <span class="res-tag tone-${lbl.tone}" title="Trục: ${escapeHtml(lbl.axisTitle)}">
                    <i class="${lbl.icon}"></i>
                    <span style="opacity: 0.72; font-size: 0.66rem;">${escapeHtml(lbl.axisShort)}:</span>
                    <span>${escapeHtml(lbl.label)}</span>
                  </span>
                `
                  )
                  .join('')
              : `<span style="font-size: 0.8rem; color: var(--res-text-muted);">Các bài đang chọn thuộc các nhánh bệnh lý/thiết kế độc lập — xem tab <strong>Tách Nhãn Giao – Khác</strong> để đối chiếu từng trục.</span>`
          }
        </div>
      </div>
    </div>
  `;
}

function renderInlineStudyPicker(selected: ResearchStudyRecord[]): string {
  const all = researchStore.getAllStudies();
  const selectedIds = new Set(selected.map((s) => s.id));
  const remaining = all.filter((s) => !selectedIds.has(s.id));
  if (remaining.length === 0 || selected.length >= 5) return '';

  // Rank suggested additions by highest atomic-label overlap with the first study on the desk
  const anchor = selected[0];
  const suggestions = anchor
    ? researchStore
        .getRelatedStudiesByLabels(anchor, 4)
        .filter((r) => !selectedIds.has(r.study.id))
    : [];

  return `
    <div class="res-cmp-picker-card">
      <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.55rem; flex: 1;">
        <strong style="font-size: 0.8rem; color: var(--res-text);">
          <i class="fa-solid fa-plus-circle" style="color: var(--res-primary);"></i> Thêm bài vào bàn cân (${selected.length}/5):
        </strong>
        <select class="res-select" id="js-cmp-inline-add" aria-label="Chọn nghiên cứu để thêm vào bàn cân">
          <option value="">— Chọn nghiên cứu từ kho (${remaining.length} bài khả dụng) —</option>
          ${remaining
            .map(
              (s) => `
            <option value="${escapeHtml(s.id)}">
              [${s.year}] ${escapeHtml(s.trialAcronym ? `${s.trialAcronym} — ` : '')}${escapeHtml(
                s.title.slice(0, 72)
              )}${s.title.length > 72 ? '…' : ''}
            </option>
          `
            )
            .join('')}
        </select>
      </div>

      ${
        suggestions.length > 0
          ? `<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.35rem;">
              <span style="font-size: 0.72rem; font-weight: 700; color: var(--res-text-muted);">Gợi ý cùng nhãn:</span>
              ${suggestions
                .slice(0, 3)
                .map(
                  (sug) => `
                <button type="button" class="res-mini-action-btn is-primary js-compare-toggle" data-id="${escapeHtml(
                  sug.study.id
                )}" title="Tương đồng ${sug.similarityPercent}% nhãn với ${escapeHtml(
                    anchor?.trialAcronym || anchor?.slug
                  )}">
                  <i class="fa-solid fa-plus"></i>
                  <span>${escapeHtml(sug.study.trialAcronym || sug.study.journal)} (${sug.similarityPercent}%)</span>
                </button>
              `
                )
                .join('')}
            </div>`
          : ''
      }
    </div>
  `;
}

function renderMatrixMode(studies: ResearchStudyRecord[], diffOnly: boolean): string {
  const rows = buildComparisonRows().filter((r) => researchStore.isCompareGroupVisible(r.group));
  const pinnedId = researchStore.getPinnedBaselineId();

  const groupTogglesHtml = `
    <div class="res-axis-toggle-bar" aria-label="Bật tắt trục so sánh">
      <span style="font-size: 0.73rem; font-weight: 800; color: var(--res-text-muted); margin-right: 0.25rem;">
        <i class="fa-solid fa-sliders"></i> Trục hiển thị:
      </span>
      ${MATRIX_GROUP_META.map((g) => {
        const isOn = researchStore.isCompareGroupVisible(g.key);
        return `
          <button type="button" class="res-axis-chip ${isOn ? 'is-on' : ''} js-toggle-cmp-group" data-group="${g.key}">
            <i class="${g.icon}"></i> ${escapeHtml(g.label)}
          </button>
        `;
      }).join('')}
    </div>
  `;

  const bodyRowsHtml = rows
    .map((row) => {
      const vals = studies.map((s) => row.rawKey(s));
      const uniqueCount = new Set(vals).size;
      const isShared = studies.length > 1 && uniqueCount === 1;
      const isDiff = studies.length > 1 && uniqueCount > 1;

      if (diffOnly && isShared && row.id !== 'year-journal') {
        return '';
      }

      const rowClass = diffOnly && isDiff ? 'res-cmp-row-diff' : isShared ? 'res-cmp-row-shared' : '';

      return `
        <tr class="${rowClass}">
          <td class="res-cmp-axis-col">
            <div>${row.label}</div>
            <div style="font-size: 0.68rem; font-weight: 700; color: ${
              isShared ? 'var(--res-emerald)' : isDiff ? 'var(--res-amber)' : 'var(--res-text-muted)'
            }; margin-top: 3px;">
              ${isShared ? '✓ Đồng nhất' : isDiff ? '⚡ Khác biệt' : row.axisGroup}
            </div>
          </td>
          ${studies.map((s) => `<td>${row.renderCell(s)}</td>`).join('')}
        </tr>
      `;
    })
    .join('');

  return `
    ${groupTogglesHtml}
    <div class="table-responsive">
      <table class="res-cmp-matrix-table">
        <thead>
          <tr>
            <th class="res-cmp-axis-col">Trục Nhãn Đối Sánh</th>
            ${studies
              .map((s) => {
                const isPinned = pinnedId === s.id;
                return `
              <th class="${isPinned ? 'res-cmp-baseline-th' : ''}">
                <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 0.5rem;">
                  <div>
                    ${
                      isPinned
                        ? `<div style="margin-bottom: 4px;"><span class="res-tag tone-indigo" style="font-size: 0.66rem;"><i class="fa-solid fa-thumbtack"></i> Bài Chuẩn (Baseline)</span></div>`
                        : ''
                    }
                    ${
                      s.trialAcronym
                        ? `<span class="res-acronym-badge">${escapeHtml(s.trialAcronym)}</span>`
                        : ''
                    }
                    <a href="#/ebm/kho-nghien-cuu/${escapeHtml(
                      s.slug
                    )}" style="font-family: var(--res-font-display); font-weight: 800; font-size: 0.88rem; color: var(--res-text); text-decoration: none;">
                      ${escapeHtml(s.title)}
                    </a>
                  </div>
                  <div style="display: flex; gap: 0.25rem; flex-shrink: 0;">
                    <button type="button" class="res-icon-btn js-pin-baseline ${
                      isPinned ? 'is-active' : ''
                    }" data-id="${escapeHtml(
                      s.id
                    )}" title="${isPinned ? 'Bỏ ghim bài chuẩn' : 'Ghim làm bài chuẩn đối chiếu'}" style="min-width: 32px; min-height: 32px;">
                      <i class="fa-solid fa-thumbtack"></i>
                    </button>
                    <button type="button" class="res-icon-btn js-res-remove-cmp" data-id="${escapeHtml(
                      s.id
                    )}" title="Bỏ khỏi bàn cân" style="min-width: 32px; min-height: 32px;">
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                </div>
              </th>
            `;
              })
              .join('')}
          </tr>
        </thead>
        <tbody>
          ${bodyRowsHtml}
        </tbody>
      </table>
    </div>
  `;
}

/**
 * Tab 2 (NEW): Atomic Label Venn & Axis-by-Axis Divergence Dissection
 */
function renderLabelVennMode(studies: ResearchStudyRecord[]): string {
  if (studies.length < 2) {
    return `<p style="color: var(--res-text-muted);">Hãy chọn ít nhất 2 nghiên cứu để tách nhãn giao nhau và nhãn phân hóa.</p>`;
  }

  const overlap = computeLabelOverlap(studies);

  return `
    <div class="res-label-venn-grid" style="margin-bottom: 1.15rem;">
      <div class="res-label-venn-box" style="border-top: 3px solid var(--res-emerald);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem;">
          <strong style="font-family: var(--res-font-display); font-size: 0.92rem; color: var(--res-emerald);">
            <i class="fa-solid fa-link"></i> 1. Vùng Giao — Nhãn Đồng Nhất (${overlap.sharedLabels.length})
          </strong>
          <span class="res-tag tone-emerald" style="font-family: var(--res-font-mono);">${overlap.similarityPercent}% Match</span>
        </div>
        <p style="margin: 0 0 0.7rem; font-size: 0.78rem; color: var(--res-text-muted);">
          Những nhãn xuất hiện đồng thời trên <strong>tất cả ${studies.length} nghiên cứu</strong> — đây là mẫu số chung cho phép đặt chúng lên cùng bàn cân EBM:
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
          ${
            overlap.sharedLabels.length > 0
              ? overlap.sharedLabels
                  .map(
                    (lbl) => `
                  <button type="button" class="res-tag res-tag-clickable tone-${lbl.tone} js-quick-label" data-facet="${lbl.facetKey}" data-val="${escapeHtml(
                      lbl.value
                    )}" title="Bấm để lọc toàn bộ kho theo nhãn này">
                    <i class="${lbl.icon}"></i>
                    <span><strong>${escapeHtml(lbl.axisShort)}:</strong> ${escapeHtml(lbl.label)}</span>
                  </button>
                `
                  )
                  .join('')
              : `<span style="font-size: 0.8rem; color: var(--res-text-muted);">Không có nhãn nguyên tử nào trùng khớp tuyệt đối trên cả ${studies.length} bài.</span>`
          }
        </div>
      </div>

      <div class="res-label-venn-box" style="border-top: 3px solid var(--res-amber);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem;">
          <strong style="font-family: var(--res-font-display); font-size: 0.92rem; color: var(--res-amber);">
            <i class="fa-solid fa-code-branch"></i> 2. Vùng Khác — Trục Nhãn Phân Hóa (${overlap.divergentAxes.length}/9 trục)
          </strong>
        </div>
        <p style="margin: 0 0 0.7rem; font-size: 0.78rem; color: var(--res-text-muted);">
          Những trục mà các nghiên cứu tách nhánh khác nhau — chính là nguồn gốc của khác biệt về độ lớn hiệu quả hoặc bất đồng thuận kết quả:
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.35rem;">
          ${overlap.divergentAxes
            .map((ax) => {
              const meta = ATOMIC_AXIS_META[ax.axis];
              return `<span class="res-tag tone-${meta.tone}"><i class="${meta.icon}"></i> ${escapeHtml(
                meta.short
              )}</span>`;
            })
            .join('')}
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <table class="res-cmp-matrix-table">
        <thead>
          <tr>
            <th class="res-cmp-axis-col">Trục Nhãn Đã Tách</th>
            ${studies
              .map(
                (s) => `
              <th>
                ${s.trialAcronym ? `<span class="res-acronym-badge">${escapeHtml(s.trialAcronym)}</span>` : ''}
                <span>${escapeHtml(s.journal)} (${s.year})</span>
              </th>
            `
              )
              .join('')}
          </tr>
        </thead>
        <tbody>
          ${(['condition', 'population', 'design', 'intervention', 'comparator', 'endpoint', 'outcome', 'quality', 'topic'] as const)
            .map((axis) => {
              const meta = ATOMIC_AXIS_META[axis];
              const perStudyLabels = studies.map((s) =>
                decomposeStudyLabels(s).filter((l) => l.axis === axis)
              );
              const sigs = perStudyLabels.map((arr) => arr.map((x) => x.key).sort().join('|'));
              const isSame = new Set(sigs).size === 1;
              return `
                <tr class="${isSame ? 'res-cmp-row-shared' : ''}">
                  <td class="res-cmp-axis-col">
                    <div style="display: flex; align-items: center; gap: 0.4rem;">
                      <i class="${meta.icon}" style="color: var(--res-primary);"></i>
                      <span>${escapeHtml(meta.title)}</span>
                    </div>
                    <div style="font-size: 0.68rem; font-weight: 700; color: ${
                      isSame ? 'var(--res-emerald)' : 'var(--res-amber)'
                    }; margin-top: 3px;">
                      ${isSame ? '✓ Đồng nhất 100%' : '⚡ Phân hóa giữa các bài'}
                    </div>
                  </td>
                  ${perStudyLabels
                    .map(
                      (arr) => `
                    <td>
                      <div style="display: flex; flex-wrap: wrap; gap: 0.32rem;">
                        ${
                          arr.length > 0
                            ? arr
                                .map(
                                  (lbl) => `
                              <button type="button" class="res-tag res-tag-clickable tone-${lbl.tone} js-quick-label" data-facet="${lbl.facetKey}" data-val="${escapeHtml(
                                    lbl.value
                                  )}">
                                ${escapeHtml(lbl.label)}
                              </button>
                            `
                                )
                                .join('')
                            : `<span style="color: var(--res-text-muted); font-size: 0.78rem;">—</span>`
                        }
                      </div>
                    </td>
                  `
                    )
                    .join('')}
                </tr>
              `;
            })
            .join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderForestMode(studies: ResearchStudyRecord[]): string {
  const points = studies
    .filter((s) => s.primaryMetric && typeof s.primaryMetric.effectEstimate === 'number')
    .map((s) => ({
      id: s.id,
      label: s.trialAcronym ? `${s.trialAcronym} (${s.year})` : `${s.journal} (${s.year})`,
      sublabel: s.primaryEndpoint || s.title,
      measure: s.primaryMetric?.measure || 'HR',
      estimate: Number(s.primaryMetric?.effectEstimate),
      ciLower: Number(s.primaryMetric?.ciLower || Number(s.primaryMetric?.effectEstimate) * 0.8),
      ciUpper: Number(s.primaryMetric?.ciUpper || Number(s.primaryMetric?.effectEstimate) * 1.2),
      sampleSize: s.sampleSize,
      pValue: s.primaryMetric?.pValue,
      direction: s.outcomeDirection
    }));

  const nonRatioStudies = studies.filter(
    (s) => !s.primaryMetric || typeof s.primaryMetric.effectEstimate !== 'number'
  );

  const svgHtml = renderCrossStudyForestPlotSvg(points, {
    title: 'Biểu Đồ Rừng Đối Sánh Trực Quan Giữa Các Nghiên Cứu (HR / RR / OR)',
    subtitle: 'Trục Logarit chuẩn xuất bản y khoa • Kích thước ô tỷ lệ cỡ mẫu (N) • Đường đứt nét 1.0 = ngưỡng không khác biệt'
  });

  // Logarithmic Sample Size Comparison Bar Chart (works for 100% of studies!)
  const maxLogN = Math.max(
    ...studies.map((s) => Math.log10(Math.max(10, s.sampleSize || 10))),
    2
  );

  const sampleBarsHtml = `
    <div class="res-quant-panel">
      <div style="font-family: var(--res-font-display); font-weight: 800; font-size: 0.9rem; margin-bottom: 0.75rem; color: var(--res-text);">
        <i class="fa-solid fa-users-line" style="color: var(--res-primary);"></i>
        So Sánh Quy Mô Cỡ Mẫu N (Thang Log₁₀)
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.7rem;">
        ${studies
          .map((s) => {
            const nVal = s.sampleSize || 0;
            const pct = nVal > 0 ? Math.max(8, Math.round((Math.log10(Math.max(10, nVal)) / maxLogN) * 100)) : 5;
            const dm = RESEARCH_DESIGNS[s.design];
            return `
              <div>
                <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 0.5rem; font-size: 0.8rem;">
                  <strong style="color: var(--res-text);">${escapeHtml(s.trialAcronym || `${s.journal} ${s.year}`)}</strong>
                  <span style="font-family: var(--res-font-mono); font-weight: 800; color: var(--res-primary);">
                    ${nVal ? `N = ${nVal.toLocaleString('en-US')}` : 'Chưa rõ N'} • ${escapeHtml(dm?.shortLabel || s.design)}
                  </span>
                </div>
                <div class="res-bar-track">
                  <div class="res-bar-fill" style="width: ${pct}%;"></div>
                </div>
              </div>
            `;
          })
          .join('')}
      </div>
    </div>
  `;

  // Quantitative Effect & NNT / AUC / WMD Summary Cards
  const quantDeckHtml = `
    <div class="res-quant-panel">
      <div style="font-family: var(--res-font-display); font-weight: 800; font-size: 0.9rem; margin-bottom: 0.75rem; color: var(--res-text);">
        <i class="fa-solid fa-square-poll-vertical" style="color: var(--res-teal);"></i>
        Đối Chiếu Chỉ Số Định Lượng &amp; NNT / AUC / WMD
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.6rem;">
        ${studies
          .map((s) => {
            const pm = s.primaryMetric;
            const dir = OUTCOME_DIRECTIONS[s.outcomeDirection];
            const headline = pm?.effectEstimate
              ? `${pm.measure || 'HR'} ${pm.effectEstimate} (${pm.ciLower ?? '?'}–${pm.ciUpper ?? '?'})${
                  pm.nnt ? ` • NNT = ${pm.nnt}` : ''
                }`
              : pm?.rawDiffText || s.keyResults?.slice(0, 110) || 'Xem chi tiết bài MDX';
            return `
              <div style="background: var(--res-surface); border: 1px solid var(--res-border); border-radius: 10px; padding: 0.65rem 0.8rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.4rem; margin-bottom: 0.3rem;">
                  <strong style="font-size: 0.82rem;">${escapeHtml(s.trialAcronym || `${s.journal} ${s.year}`)}</strong>
                  <span class="res-tag tone-${dir?.tone || 'teal'}" style="font-size: 0.68rem;">${escapeHtml(
                    dir?.shortLabel || s.outcomeDirection
                  )}</span>
                </div>
                <div style="font-family: var(--res-font-mono); font-size: 0.76rem; color: var(--res-primary); font-weight: 700; line-height: 1.45;">
                  ${escapeHtml(headline)}
                </div>
              </div>
            `;
          })
          .join('')}
      </div>
    </div>
  `;

  return `
    <div>
      ${
        svgHtml
          ? svgHtml
          : `<div style="padding: 1.5rem; text-align: center; background: var(--res-surface-subtle); border-radius: 14px; border: 1px dashed var(--res-border); color: var(--res-text-muted); font-size: 0.86rem;">
              <i class="fa-solid fa-chart-simple" style="font-size: 1.4rem; color: var(--res-primary); margin-bottom: 0.4rem; display: block;"></i>
              Các bài đang chọn sử dụng chỉ số <strong>AUC / WMD / Tỷ lệ hiện mắc / aOR không đáng kể</strong> thay vì tỷ số HR/RR có 95% CI cho Forest Plot logarit. Xem đối chiếu quy mô cỡ mẫu (N) và chỉ số định lượng chi tiết ngay bên dưới!
            </div>`
      }
      ${
        nonRatioStudies.length > 0 && svgHtml
          ? `<div style="margin-top: 0.65rem; font-size: 0.78rem; color: var(--res-text-muted);">
              <i class="fa-solid fa-circle-info"></i> ${nonRatioStudies.length} bài dùng chỉ số AUC/WMD/Prevalence (${nonRatioStudies
                .map((x) => escapeHtml(x.trialAcronym || x.journal))
                .join(', ')}) được đối chiếu ở bảng chỉ số bên dưới.
            </div>`
          : ''
      }
      <div class="res-quant-bars-grid">
        ${sampleBarsHtml}
        ${quantDeckHtml}
      </div>
    </div>
  `;
}

function renderTimelineMode(studies: ResearchStudyRecord[]): string {
  const sorted = [...studies].sort((a, b) => a.year - b.year);

  return `
    <div style="display: flex; flex-direction: column; gap: 0.9rem; position: relative; padding-left: 1rem; border-left: 3px solid var(--res-primary);">
      ${sorted
        .map((s) => {
          const dm = RESEARCH_DESIGNS[s.design];
          const dir = OUTCOME_DIRECTIONS[s.outcomeDirection];
          const jm = lookupSharedJournalMetric(s.journal);
          return `
            <div style="background: var(--res-surface-subtle); border: 1px solid var(--res-border); border-radius: 14px; padding: 1rem 1.15rem;">
              <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.45rem;">
                <div style="display: flex; align-items: center; gap: 0.45rem; flex-wrap: wrap;">
                  <span style="font-family: var(--res-font-mono); font-weight: 800; font-size: 0.95rem; color: var(--res-primary);">Năm ${s.year}</span>
                  <span class="res-tag tone-${dm?.tone || 'indigo'}">${escapeHtml(dm?.shortLabel || s.design)}</span>
                  <span class="res-journal-pill">${escapeHtml(s.journal)}${jm?.impactFactor ? ` • IF ${jm.impactFactor}` : ''}</span>
                  ${s.sampleSize ? `<span class="res-journal-pill">N = ${s.sampleSize.toLocaleString('en-US')}</span>` : ''}
                </div>
                <span class="res-tag tone-${dir?.tone || 'teal'}">${escapeHtml(dir?.shortLabel || s.outcomeDirection)}</span>
              </div>
              <h4 style="font-family: var(--res-font-display); margin: 0 0 0.4rem; font-size: 0.98rem;">
                ${s.trialAcronym ? `<span class="res-acronym-badge">${escapeHtml(s.trialAcronym)}</span>` : ''}
                <a href="#/ebm/kho-nghien-cuu/${escapeHtml(s.slug)}" style="color: var(--res-text); text-decoration: none;">${escapeHtml(s.title)}</a>
              </h4>
              <p style="margin: 0; font-size: 0.84rem; color: var(--res-text-secondary); line-height: 1.55;">
                ${escapeHtml(s.summary || s.keyResults || '')}
              </p>
            </div>
          `;
        })
        .join('')}
    </div>
  `;
}

function renderDiscordanceMode(studies: ResearchStudyRecord[]): string {
  if (studies.length < 2) {
    return `<p style="color: var(--res-text-muted);">Hãy chọn ít nhất 2 nghiên cứu để giải mã nguyên nhân tương đồng / bất đồng thuận kết quả.</p>`;
  }

  const designs = new Set(studies.map((s) => RESEARCH_DESIGNS[s.design]?.shortLabel || s.design));
  const comparators = new Set(studies.map((s) => COMPARATOR_TYPES[s.comparatorType || ''] || s.comparatorType || 'Chưa rõ'));
  const sampleSizes = studies.map((s) => s.sampleSize || 0).filter((n) => n > 0);
  const maxN = sampleSizes.length ? Math.max(...sampleSizes) : 0;
  const minN = sampleSizes.length ? Math.min(...sampleSizes) : 0;
  const nRatio = minN > 0 ? Math.round(maxN / minN) : 1;
  const fundings = new Set(studies.map((s) => FUNDING_LABELS[s.fundingSource || '']?.label || 'Chưa ghi nhận'));

  return `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 275px), 1fr)); gap: 0.9rem; margin-bottom: 1.1rem;">
      <div style="background: var(--res-surface-subtle); border: 1px solid var(--res-border); border-top: 3px solid var(--res-primary); border-radius: 14px; padding: 0.95rem;">
        <div style="font-family: var(--res-font-display); font-weight: 800; font-size: 0.88rem; margin-bottom: 0.35rem; color: var(--res-primary);">
          1. Trục Thiết Kế &amp; Kiểm Soát Nhiễu
        </div>
        <div style="font-size: 0.81rem; line-height: 1.55; color: var(--res-text-secondary);">
          ${
            designs.size > 1
              ? `⚡ Khác bậc thiết kế (<strong>${escapeHtml(Array.from(designs).join(' vs '))}</strong>). Thiết kế quan sát hồi cứu dễ chịu sai lệch chọn lựa và nhiễu tồn dư so với RCT mù đôi.`
              : `✓ Cùng bậc thiết kế (<strong>${escapeHtml(Array.from(designs)[0])}</strong>). Khác biệt kết quả nếu có chủ yếu nằm ở dân số (P) hoặc định nghĩa kết cục (O).`
          }
        </div>
      </div>

      <div style="background: var(--res-surface-subtle); border: 1px solid var(--res-border); border-top: 3px solid var(--res-teal); border-radius: 14px; padding: 0.95rem;">
        <div style="font-family: var(--res-font-display); font-weight: 800; font-size: 0.88rem; margin-bottom: 0.35rem; color: var(--res-teal);">
          2. Trục Lực Thống Kê (Cỡ Mẫu N)
        </div>
        <div style="font-size: 0.81rem; line-height: 1.55; color: var(--res-text-secondary);">
          ${
            nRatio >= 5
              ? `⚡ Chênh lệch cỡ mẫu gấp <strong>${nRatio} lần</strong> (N từ ${minN.toLocaleString('en-US')} đến ${maxN.toLocaleString('en-US')}). Nghiên cứu cỡ mẫu nhỏ dễ thổi phồng độ lớn hiệu quả (Small-Study Effect) hoặc thiếu lực phát hiện biến cố hiếm.`
              : `✓ Quy mô cỡ mẫu tương đối đồng hạng (N = ${minN.toLocaleString('en-US')} – ${maxN.toLocaleString('en-US')}).`
          }
        </div>
      </div>

      <div style="background: var(--res-surface-subtle); border: 1px solid var(--res-border); border-top: 3px solid var(--res-violet); border-radius: 14px; padding: 0.95rem;">
        <div style="font-family: var(--res-font-display); font-weight: 800; font-size: 0.88rem; margin-bottom: 0.35rem; color: var(--res-violet);">
          3. Trục Nhóm Đối Chứng (C) &amp; Tài Trợ
        </div>
        <div style="font-size: 0.81rem; line-height: 1.55; color: var(--res-text-secondary);">
          Đối chứng: <strong>${escapeHtml(Array.from(comparators).join(' vs '))}</strong>.<br/>
          Nguồn tài trợ: <strong>${escapeHtml(Array.from(fundings).join(' vs '))}</strong>.
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <table class="res-cmp-matrix-table">
        <thead>
          <tr>
            <th>Nghiên cứu</th>
            <th>Cỡ mẫu &amp; Thiết kế</th>
            <th>Đặc thù Dân số (P)</th>
            <th>Định nghĩa Kết cục chính (O)</th>
            <th>RoB &amp; GRADE</th>
            <th>Hướng Kết quả</th>
          </tr>
        </thead>
        <tbody>
          ${studies
            .map((s) => {
              const dir = OUTCOME_DIRECTIONS[s.outcomeDirection];
              const rob = ROB_LABELS[s.robOverall];
              const gr = GRADE_LABELS[s.gradeCertainty];
              return `
            <tr>
              <td><strong>${escapeHtml(s.trialAcronym || `${s.journal} ${s.year}`)}</strong></td>
              <td>
                <div>${escapeHtml(RESEARCH_DESIGNS[s.design]?.shortLabel || s.design)}</div>
                <div style="font-family: var(--res-font-mono); font-size: 0.74rem; color: var(--res-text-muted);">${
                  s.sampleSize ? `N = ${s.sampleSize.toLocaleString('en-US')}` : '—'
                }</div>
              </td>
              <td style="font-size: 0.8rem;">${escapeHtml(s.population || s.populationTags.join(', '))}</td>
              <td style="font-size: 0.8rem;">${escapeHtml(s.primaryEndpoint || s.primaryEndpointCategory)}</td>
              <td>
                <span class="res-tag tone-${rob?.tone || 'slate'}">${escapeHtml(rob?.shortLabel || s.robOverall)}</span>
                <div style="margin-top: 4px;"><span class="res-tag tone-${gr?.tone || 'teal'}">${gr?.stars || ''}</span></div>
              </td>
              <td><span class="res-tag tone-${dir?.tone || 'teal'}">${escapeHtml(dir?.shortLabel || s.outcomeDirection)}</span></td>
            </tr>
          `;
            })
            .join('')}
        </tbody>
      </table>
    </div>
  `;
}

export function buildMarkdownComparisonExport(studies: ResearchStudyRecord[]): string {
  const overlap = computeLabelOverlap(studies);
  const headers = ['Trục Đối Sánh', ...studies.map((s) => s.trialAcronym || `${s.journal} ${s.year}`)];
  const sep = headers.map(() => '---');
  const lines = [
    `> **CliniResearch Studio — Bảng Đối Sánh Đa Chiều** | Tương đồng nhãn: **${overlap.similarityPercent}%** (${overlap.sharedLabels.length} nhãn chung)`,
    '',
    `| ${headers.join(' | ')} |`,
    `| ${sep.join(' | ')} |`,
    `| **Năm & Tạp chí** | ${studies.map((s) => `${s.journal} (${s.year})`).join(' | ')} |`,
    `| **Thiết kế & Cỡ mẫu** | ${studies
      .map((s) => `${RESEARCH_DESIGNS[s.design]?.shortLabel || s.design} (N=${s.sampleSize || 'N/A'})`)
      .join(' | ')} |`,
    `| **Bệnh / Vấn đề** | ${studies
      .map((s) => RESEARCH_CONDITIONS[s.conditionKey] || s.conditionKey)
      .join(' | ')} |`,
    `| **Quần thể (P)** | ${studies.map((s) => (s.population || '').replace(/\|/g, '/')).join(' | ')} |`,
    `| **Can thiệp (I/C)** | ${studies
      .map((s) => (s.intervention || s.drug || '').replace(/\|/g, '/'))
      .join(' | ')} |`,
    `| **Tiêu chí chính (O)** | ${studies
      .map((s) => (s.primaryEndpoint || '').replace(/\|/g, '/'))
      .join(' | ')} |`,
    `| **Kết quả chính** | ${studies
      .map((s) => (s.keyResults || s.summary || '').replace(/\|/g, '/'))
      .join(' | ')} |`,
    `| **Hướng KQ & GRADE** | ${studies
      .map(
        (s) =>
          `${OUTCOME_DIRECTIONS[s.outcomeDirection]?.shortLabel || s.outcomeDirection} • RoB ${s.robOverall} • GRADE ${s.gradeCertainty}`
      )
      .join(' | ')} |`
  ];
  return lines.join('\n');
}

export function buildCsvComparisonExport(studies: ResearchStudyRecord[]): string {
  const esc = (v?: string | number | null): string => {
    const s = v === undefined || v === null ? '' : String(v);
    return `"${s.replace(/"/g, '""')}"`;
  };
  const header = [
    'Acronym',
    'Title',
    'Journal',
    'Year',
    'Condition',
    'Design',
    'SampleSize',
    'FollowUp',
    'InterventionClass',
    'Comparator',
    'EndpointCategory',
    'OutcomeDirection',
    'ImpactVerdict',
    'PrimaryMetric',
    'RoB',
    'GRADE',
    'Conclusion'
  ];
  const rows = studies.map((s) => [
    s.trialAcronym || s.slug,
    s.title,
    s.journal,
    s.year,
    RESEARCH_CONDITIONS[s.conditionKey] || s.conditionKey,
    RESEARCH_DESIGNS[s.design]?.label || s.design,
    s.sampleSize || '',
    s.followUpDuration || '',
    INTERVENTION_CLASSES[s.interventionClass] || s.interventionClass,
    COMPARATOR_TYPES[s.comparatorType || ''] || s.comparatorType || '',
    ENDPOINT_CATEGORIES[s.primaryEndpointCategory] || s.primaryEndpointCategory,
    OUTCOME_DIRECTIONS[s.outcomeDirection]?.shortLabel || s.outcomeDirection,
    IMPACT_VERDICTS[s.impactVerdict]?.shortLabel || s.impactVerdict,
    s.primaryMetric?.effectEstimate
      ? `${s.primaryMetric.measure || 'HR'} ${s.primaryMetric.effectEstimate} (${s.primaryMetric.ciLower ?? ''}-${s.primaryMetric.ciUpper ?? ''})`
      : s.primaryMetric?.rawDiffText || s.keyResults || '',
    s.robOverall,
    s.gradeCertainty,
    s.detailedConclusion || s.summary || ''
  ]);
  return '\uFEFF' + [header, ...rows].map((r) => r.map(esc).join(',')).join('\r\n');
}

export function buildShareableCompareHash(studies: ResearchStudyRecord[]): string {
  const ids = studies.map((s) => encodeURIComponent(s.slug)).join(',');
  return `#/ebm/research?mode=compare&ids=${ids}`;
}

export function renderComparisonStudioSection(): string {
  const selected = researchStore.getCompareStudies();
  const activeTab: ResearchCompareTab = researchStore.getCompareTab();
  const diffOnly = researchStore.isDiffHighlightOnly();
  const clusters = researchStore.getSmartComparableClusters();

  if (selected.length === 0) {
    return `
      <section class="res-compare-studio">
        <div style="text-align: center; padding: 2.2rem 1rem;">
          <i class="fa-solid fa-scale-balanced" style="font-size: 2.6rem; color: var(--res-primary); margin-bottom: 0.85rem;"></i>
          <h3 style="font-family: var(--res-font-display); font-size: 1.25rem; margin: 0 0 0.5rem;">
            Bàn Cân Đối Sánh Đa Chiều Đang Trống
          </h3>
          <p style="color: var(--res-text-muted); max-width: 640px; margin: 0 auto 1.35rem; font-size: 0.9rem; line-height: 1.6;">
            Chọn từ <strong>2 đến 5 nghiên cứu</strong> ở tab Khám Phá, tab <strong>Bản Đồ Tách Nhãn</strong>, hoặc bấm 1 chạm vào một <strong>Cụm Nhãn Chung</strong> dưới đây:
          </p>
          <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem; margin-bottom: 1.3rem;">
            ${clusters
              .slice(0, 8)
              .map(
                (c) => `
              <button type="button" class="res-cluster-pill js-load-cluster" data-ids="${escapeHtml(
                c.studies.map((s) => s.id).join(',')
              )}">
                <i class="fa-solid fa-layer-group" style="color: var(--res-primary);"></i>
                <span>${escapeHtml(c.title)} (${c.studies.length})</span>
                ${c.hasDiscordance ? `<span class="res-cluster-discord">⚡ Trái chiều KQ</span>` : ''}
              </button>
            `
              )
              .join('')}
          </div>
          ${renderInlineStudyPicker([])}
        </div>
      </section>
    `;
  }

  let bodyHtml = '';
  if (activeTab === 'labels') {
    bodyHtml = renderLabelVennMode(selected);
  } else if (activeTab === 'forest') {
    bodyHtml = renderForestMode(selected);
  } else if (activeTab === 'timeline') {
    bodyHtml = renderTimelineMode(selected);
  } else if (activeTab === 'discordance') {
    bodyHtml = renderDiscordanceMode(selected);
  } else {
    bodyHtml = renderMatrixMode(selected, diffOnly);
  }

  return `
    <section class="res-compare-studio">
      <div class="res-compare-hdr">
        <div>
          <h2 style="font-family: var(--res-font-display); font-size: 1.2rem; margin: 0 0 0.25rem;">
            <i class="fa-solid fa-scale-balanced" style="color: var(--res-primary);"></i>
            Bàn Cân Đối Sánh Nghiên Cứu (${selected.length}/5 bài)
          </h2>
          <p style="margin: 0; font-size: 0.82rem; color: var(--res-text-muted);">
            Tách nhãn nguyên tử theo 9 trục chuẩn hóa • Ghim bài chuẩn (📌) • Xuất bảng Markdown / CSV / Link chia sẻ
          </p>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 0.45rem;">
          ${
            activeTab === 'matrix'
              ? `<button type="button" class="res-btn ${
                  diffOnly ? 'res-btn-primary' : ''
                }" id="js-toggle-diff-only">
                  <i class="fa-solid fa-highlighter"></i>
                  <span>${diffOnly ? 'Đang lọc: Chỉ điểm khác biệt' : 'Làm nổi điểm khác biệt'}</span>
                </button>`
              : ''
          }
          <button type="button" class="res-btn" id="js-copy-cmp-link" title="Sao chép đường dẫn bàn cân để chia sẻ Journal Club">
            <i class="fa-solid fa-link"></i> Link
          </button>
          <button type="button" class="res-btn" id="js-export-cmp-md">
            <i class="fa-regular fa-copy"></i> Markdown
          </button>
          <button type="button" class="res-btn" id="js-export-cmp-csv">
            <i class="fa-solid fa-file-csv"></i> CSV
          </button>
          <button type="button" class="res-btn" id="js-clear-cmp-all">
            <i class="fa-solid fa-trash-can"></i> Xóa
          </button>
        </div>
      </div>

      ${renderLabelDnaBanner(selected)}
      ${renderInlineStudyPicker(selected)}

      <div class="res-compare-subtabs" role="tablist">
        <button type="button" class="res-btn ${
          activeTab === 'matrix' ? 'res-btn-primary' : ''
        } js-cmp-subtab" data-tab="matrix">
          <i class="fa-solid fa-table-columns"></i> 1. Ma Trận PICO &amp; Nhãn
        </button>
        <button type="button" class="res-btn ${
          activeTab === 'labels' ? 'res-btn-primary' : ''
        } js-cmp-subtab" data-tab="labels">
          <i class="fa-solid fa-tags"></i> 2. Tách Nhãn Giao – Khác
        </button>
        <button type="button" class="res-btn ${
          activeTab === 'forest' ? 'res-btn-primary' : ''
        } js-cmp-subtab" data-tab="forest">
          <i class="fa-solid fa-chart-gantt"></i> 3. Forest Plot &amp; Định Lượng
        </button>
        <button type="button" class="res-btn ${
          activeTab === 'timeline' ? 'res-btn-primary' : ''
        } js-cmp-subtab" data-tab="timeline">
          <i class="fa-solid fa-timeline"></i> 4. Tiến Hóa Theo Năm
        </button>
        <button type="button" class="res-btn ${
          activeTab === 'discordance' ? 'res-btn-primary' : ''
        } js-cmp-subtab" data-tab="discordance">
          <i class="fa-solid fa-magnifying-glass-arrows-right"></i> 5. Giải Mã Bất Đồng Thuận
        </button>
      </div>

      <div>${bodyHtml}</div>
    </section>
  `;
}
