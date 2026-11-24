/**
 * CliniPortal 2.0 — Multi-Axis Shared-Label Research Comparison Engine
 * Path: src/content/ebm/research/js/research-compare-engine.ts
 *
 * Powers 4 deep comparative views across 2–5 research studies:
 *  1. Diff-Aware PICO & 7-Axis Shared Label Matrix (with Shared vs Diff highlighting)
 *  2. Dynamic Cross-Study Forest Plot SVG (HR / RR / OR + 95% CI + Sample Size Weight)
 *  3. Chronological Evidence Evolution Timeline
 *  4. Outcome Discordance & Methodological Synthesis Matrix + Markdown Export
 */

import { renderCrossStudyForestPlotSvg, lookupSharedJournalMetric } from '../../shared-core';
import {
  ENDPOINT_CATEGORIES,
  GRADE_LABELS,
  IMPACT_VERDICTS,
  INTERVENTION_CLASSES,
  OUTCOME_DIRECTIONS,
  RESEARCH_CONDITIONS,
  RESEARCH_DESIGNS,
  ROB_LABELS
} from './research-taxonomy';
import { researchStore } from './research-store';
import type { ResearchCompareTab, ResearchStudyRecord } from './research-types';

function escapeHtml(val?: string | number | null): string {
  if (val === undefined || val === null) return '';
  return String(val)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

interface ComparisonRowSpec {
  id: string;
  axisGroup: string;
  label: string;
  rawKey: (s: ResearchStudyRecord) => string;
  renderCell: (s: ResearchStudyRecord) => string;
}

function buildComparisonRows(): ComparisonRowSpec[] {
  return [
    {
      id: 'year-journal',
      axisGroup: 'Định danh & Nguồn',
      label: '📅 Năm & Tạp chí (IF / Q)',
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
        `;
      }
    },
    {
      id: 'condition',
      axisGroup: 'Nhãn Bệnh / Vấn đề',
      label: '🩺 Bệnh / Vấn đề chung',
      rawKey: (s) => s.conditionKey,
      renderCell: (s) => `
        <div><span class="res-tag tone-indigo">${escapeHtml(
          RESEARCH_CONDITIONS[s.conditionKey] || s.conditionKey
        )}</span></div>
        ${
          s.problemLabels.length > 0
            ? `<div style="font-size: 0.74rem; color: var(--res-text-muted); margin-top: 4px;">${s.problemLabels
                .map((p) => `#${escapeHtml(p)}`)
                .join(' • ')}</div>`
            : ''
        }
      `
    },
    {
      id: 'design',
      axisGroup: 'Nhãn Thiết kế',
      label: '🔬 Thiết kế & Làm mù',
      rawKey: (s) => `${s.design}|${s.blinding || ''}`,
      renderCell: (s) => {
        const dm = RESEARCH_DESIGNS[s.design];
        return `
          <div><span class="res-tag tone-${dm?.tone || 'indigo'}">${escapeHtml(
            dm?.label || s.design
          )}</span></div>
          <div style="font-size: 0.76rem; color: var(--res-text-secondary); margin-top: 4px;">
            ${escapeHtml([s.phase, s.blinding, s.centerScope].filter(Boolean).join(' • ') || 'Chuẩn học thuật')}
          </div>
        `;
      }
    },
    {
      id: 'sample-followup',
      axisGroup: 'Cỡ mẫu & Thời gian',
      label: '👥 Cỡ mẫu (N) & Theo dõi',
      rawKey: (s) => `${s.sampleSize || 0}|${s.followUpDuration || ''}`,
      renderCell: (s) => `
        <div style="font-family: var(--res-font-mono); font-weight: 800; font-size: 0.9rem;">
          ${s.sampleSize ? `N = ${s.sampleSize.toLocaleString('en-US')}` : 'Tổng hợp đa nghiên cứu'}
        </div>
        ${
          s.followUpDuration
            ? `<div style="font-size: 0.76rem; color: var(--res-text-muted); margin-top: 2px;">Theo dõi: ${escapeHtml(
                s.followUpDuration
              )}</div>`
            : ''
        }
        ${
          s.asianData
            ? `<div style="margin-top: 4px;"><span class="res-tag tone-teal" style="font-size: 0.68rem;">🌏 Có dữ liệu Châu Á</span></div>`
            : ''
        }
      `
    },
    {
      id: 'population',
      axisGroup: 'PICO — Quần thể',
      label: '🧬 Dân số chọn vào (P)',
      rawKey: (s) => s.population || s.populationTags.join(','),
      renderCell: (s) => `
        <div style="line-height: 1.5;">${escapeHtml(s.population || 'Xem chi tiết trong bài')}</div>
      `
    },
    {
      id: 'intervention',
      axisGroup: 'PICO — Can thiệp',
      label: '💊 Can thiệp vs Đối chứng (I/C)',
      rawKey: (s) => s.interventionClass,
      renderCell: (s) => `
        <div style="margin-bottom: 4px;">
          <span class="res-tag tone-violet">${escapeHtml(
            INTERVENTION_CLASSES[s.interventionClass] || s.interventionClass
          )}</span>
        </div>
        <div style="line-height: 1.48;">${escapeHtml(s.intervention || s.drug || '—')}</div>
        ${
          s.comparatorType
            ? `<div style="font-size: 0.74rem; color: var(--res-text-muted); margin-top: 3px;">Đối chứng: ${escapeHtml(
                s.comparatorType
              )}</div>`
            : ''
        }
      `
    },
    {
      id: 'endpoint',
      axisGroup: 'PICO — Tiêu chí chính',
      label: '🎯 Kết cục chính (Primary O)',
      rawKey: (s) => s.primaryEndpointCategory,
      renderCell: (s) => `
        <div style="margin-bottom: 4px;">
          <span class="res-tag tone-teal">${escapeHtml(
            ENDPOINT_CATEGORIES[s.primaryEndpointCategory] || s.primaryEndpointCategory
          )}</span>
        </div>
        <div style="line-height: 1.48; font-weight: 600;">${escapeHtml(s.primaryEndpoint || '—')}</div>
      `
    },
    {
      id: 'direction-verdict',
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
            <span class="res-tag tone-${ver?.tone || 'indigo'}">${escapeHtml(
              ver?.shortLabel || s.impactVerdict
            )}</span>
          </div>
        `;
      }
    },
    {
      id: 'quant-results',
      axisGroup: 'Định lượng Thống kê',
      label: '📈 Chỉ số Hiệu quả (HR / RR / NNT)',
      rawKey: (s) => s.keyResults || String(s.primaryMetric?.effectEstimate || ''),
      renderCell: (s) => {
        const pm = s.primaryMetric;
        const monoLine = pm?.effectEstimate
          ? `${pm.measure || 'HR'} = ${pm.effectEstimate}${
              pm.ciLower && pm.ciUpper ? ` (95% CI: ${pm.ciLower}–${pm.ciUpper})` : ''
            }${pm.pValue ? ` • p = ${pm.pValue}` : ''}${pm.nnt ? ` • NNT = ${pm.nnt}` : ''}`
          : null;
        return `
          ${
            monoLine
              ? `<div style="font-family: var(--res-font-mono); font-weight: 800; color: var(--res-primary); margin-bottom: 5px;">${escapeHtml(
                  monoLine
                )}</div>`
              : ''
          }
          <div style="font-size: 0.8rem; line-height: 1.5; color: var(--res-text-secondary);">${escapeHtml(
            s.keyResults || pm?.rawDiffText || s.summary || '—'
          )}</div>
        `;
      }
    },
    {
      id: 'safety-rob',
      axisGroup: 'Thẩm định & An toàn',
      label: '🛡️ RoB 2.0 / GRADE & An toàn',
      rawKey: (s) => `${s.robOverall}|${s.gradeCertainty}`,
      renderCell: (s) => {
        const rob = ROB_LABELS[s.robOverall] || { label: s.robOverall, tone: 'slate' as const };
        const gr = GRADE_LABELS[s.gradeCertainty] || {
          label: s.gradeCertainty,
          stars: '⊕⊕⊕◯',
          tone: 'teal' as const
        };
        return `
          <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 5px;">
            <span class="res-tag tone-${rob.tone}">${escapeHtml(rob.label)}</span>
            <span class="res-tag tone-${gr.tone}">${gr.stars} ${escapeHtml(gr.label)}</span>
          </div>
          ${
            s.safetyHighlight
              ? `<div style="font-size: 0.76rem; color: var(--res-rose); line-height: 1.45;">⚠️ ${escapeHtml(
                  s.safetyHighlight
                )}</div>`
              : ''
          }
        `;
      }
    },
    {
      id: 'conclusion',
      axisGroup: 'Ứng dụng Thực hành',
      label: '💡 Ranh giới Áp dụng Lâm sàng',
      rawKey: (s) => s.detailedConclusion || s.summary || '',
      renderCell: (s) => `
        <div style="line-height: 1.55;">${escapeHtml(s.detailedConclusion || s.summary || '—')}</div>
        <div style="margin-top: 0.55rem;">
          <a href="#/ebm/kho-nghien-cuu/${escapeHtml(
            s.slug
          )}" class="res-btn" style="min-height: 36px; padding: 0.25rem 0.7rem; font-size: 0.76rem;">
            <i class="fa-solid fa-book-open"></i> Mở bài giải phẫu MDX
          </a>
        </div>
      `
    }
  ];
}

function renderSharedLabelsSummaryBanner(studies: ResearchStudyRecord[]): string {
  if (studies.length < 2) return '';

  const sharedPills: string[] = [];
  const condSet = new Set(studies.map((s) => s.conditionKey));
  if (condSet.size === 1) {
    const c = studies[0].conditionKey;
    sharedPills.push(`Cùng Bệnh/Vấn đề: ${RESEARCH_CONDITIONS[c] || c}`);
  }

  const intvSet = new Set(studies.map((s) => s.interventionClass));
  if (intvSet.size === 1) {
    const ic = studies[0].interventionClass;
    sharedPills.push(`Cùng Nhóm Can thiệp: ${INTERVENTION_CLASSES[ic] || ic}`);
  }

  const desSet = new Set(studies.map((s) => s.design));
  if (desSet.size === 1) {
    const d = studies[0].design;
    sharedPills.push(`Cùng Thiết kế: ${RESEARCH_DESIGNS[d]?.shortLabel || d}`);
  } else {
    sharedPills.push(`Khác Thiết kế (${Array.from(desSet).map((d) => RESEARCH_DESIGNS[d]?.shortLabel || d).join(' vs ')})`);
  }

  const dirSet = new Set(studies.map((s) => s.outcomeDirection));
  const hasDiscord = dirSet.size > 1;

  return `
    <div style="background: var(--res-surface-subtle); border: 1px solid var(--res-border); border-radius: 12px; padding: 0.85rem 1rem; margin-bottom: 1rem; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.65rem;">
      <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.45rem;">
        <strong style="font-size: 0.8rem; color: var(--res-text);"><i class="fa-solid fa-tags" style="color: var(--res-primary);"></i> Nhãn Chung Phát Hiện:</strong>
        ${sharedPills.map((p) => `<span class="res-tag tone-emerald">${escapeHtml(p)}</span>`).join('')}
      </div>
      ${
        hasDiscord
          ? `<span class="res-tag tone-amber"><i class="fa-solid fa-bolt"></i> Phát hiện Khác biệt Hướng Kết Quả — Xem tab "Giải Mã Bất Đồng Thuận"</span>`
          : `<span class="res-tag tone-teal"><i class="fa-solid fa-check-double"></i> Đồng thuận Hướng Kết Quả</span>`
      }
    </div>
  `;
}

function renderMatrixMode(studies: ResearchStudyRecord[], diffOnly: boolean): string {
  const rows = buildComparisonRows();

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
            <div style="font-size: 0.68rem; font-weight: 600; color: var(--res-text-muted); margin-top: 2px;">
              ${isShared ? '✓ Giống nhau' : isDiff ? '⚡ Khác nhau' : row.axisGroup}
            </div>
          </td>
          ${studies.map((s) => `<td>${row.renderCell(s)}</td>`).join('')}
        </tr>
      `;
    })
    .join('');

  return `
    <div class="table-responsive">
      <table class="res-cmp-matrix-table">
        <thead>
          <tr>
            <th class="res-cmp-axis-col">Trục Nhãn Đối Sánh</th>
            ${studies
              .map(
                (s) => `
              <th>
                <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 0.5rem;">
                  <div>
                    ${
                      s.trialAcronym
                        ? `<span class="res-acronym-badge">${escapeHtml(s.trialAcronym)}</span>`
                        : ''
                    }
                    <a href="#/ebm/kho-nghien-cuu/${escapeHtml(
                      s.slug
                    )}" style="font-family: var(--res-font-display); font-weight: 800; font-size: 0.9rem; color: var(--res-text); text-decoration: none;">
                      ${escapeHtml(s.title)}
                    </a>
                  </div>
                  <button type="button" class="res-icon-btn js-res-remove-cmp" data-id="${escapeHtml(
                    s.id
                  )}" title="Bỏ khỏi bàn cân" style="min-width: 34px; min-height: 34px;">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </th>
            `
              )
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

  const qualitativeStudies = studies.filter(
    (s) => !s.primaryMetric || typeof s.primaryMetric.effectEstimate !== 'number'
  );

  const svgHtml = renderCrossStudyForestPlotSvg(points, {
    title: 'Biểu Đồ Rừng Đối Sánh Trực Quan Giữa Các Nghiên Cứu Đã Chọn',
    subtitle: 'Trục Logarit chuẩn xuất bản y khoa • So sánh trực tiếp độ lớn hiệu quả (HR / RR / OR) và khoảng tin cậy 95% CI'
  });

  return `
    <div>
      ${
        svgHtml
          ? svgHtml
          : `<div style="padding: 2rem; text-align: center; background: var(--res-surface-subtle); border-radius: 14px; border: 1px dashed var(--res-border); color: var(--res-text-muted);">
              Các bài đang chọn là nghiên cứu định tính / đoàn hệ mô tả chưa khai báo tỷ số HR/RR/OR có khoảng tin cậy 95% CI trong <code>primaryMetric</code>. Hãy thử chọn các RCT hoặc Meta-analysis (như <strong>EMPA-REG</strong>, <strong>STAREE</strong>, <strong>CAPE COD</strong>, <strong>STATIN-CVD META</strong>) để vẽ Forest Plot động!
            </div>`
      }
      ${
        qualitativeStudies.length > 0 && svgHtml
          ? `<div style="margin-top: 0.85rem; font-size: 0.8rem; color: var(--res-text-muted);">
              <i class="fa-solid fa-circle-info"></i> Ghi chú: ${qualitativeStudies.length} bài không có tỷ số nguy cơ (HR/RR/OR) được đối chiếu chi tiết tại tab <strong>Ma Trận PICO &amp; Nhãn</strong>.
            </div>`
          : ''
      }
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
          return `
            <div style="background: var(--res-surface-subtle); border: 1px solid var(--res-border); border-radius: 14px; padding: 1rem 1.15rem;">
              <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.45rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                  <span style="font-family: var(--res-font-mono); font-weight: 800; font-size: 0.95rem; color: var(--res-primary);">Năm ${s.year}</span>
                  <span class="res-tag tone-${dm?.tone || 'indigo'}">${escapeHtml(dm?.shortLabel || s.design)}</span>
                  <span class="res-journal-pill">${escapeHtml(s.journal)}</span>
                </div>
                <span class="res-tag tone-${dir?.tone || 'teal'}">${escapeHtml(dir?.shortLabel || s.outcomeDirection)}</span>
              </div>
              <h4 style="font-family: var(--res-font-display); margin: 0 0 0.4rem; font-size: 0.98rem;">
                ${s.trialAcronym ? `<span class="res-acronym-badge">${escapeHtml(s.trialAcronym)}</span>` : ''}
                ${escapeHtml(s.title)}
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
    return `<p style="color: var(--res-text-muted);">Hãy chọn ít nhất 2 nghiên cứu để phân tích nguyên nhân tương đồng / khác biệt kết quả.</p>`;
  }

  // Synthesize methodological drivers of difference
  const designs = new Set(studies.map((s) => RESEARCH_DESIGNS[s.design]?.label || s.design));
  const blindings = new Set(studies.map((s) => s.blinding || 'Không làm mù / Quan sát'));
  const populations = studies.map((s) => ({
    name: s.trialAcronym || `${s.journal} ${s.year}`,
    pop: s.population || s.populationTags.join(', '),
    endpoint: s.primaryEndpoint || s.primaryEndpointCategory,
    dir: OUTCOME_DIRECTIONS[s.outcomeDirection]?.shortLabel || s.outcomeDirection,
    rob: ROB_LABELS[s.robOverall]?.label || s.robOverall
  }));

  return `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 1rem; margin-bottom: 1.1rem;">
      <div style="background: var(--res-surface-subtle); border: 1px solid var(--res-border); border-radius: 14px; padding: 1rem;">
        <div style="font-family: var(--res-font-display); font-weight: 800; margin-bottom: 0.4rem; color: var(--res-primary);">
          1. Trục Thiết Kế &amp; Kiểm Soát Nhiễu
        </div>
        <div style="font-size: 0.83rem; line-height: 1.55; color: var(--res-text-secondary);">
          ${
            designs.size > 1
              ? `⚡ Các bài đang đối sánh có <strong>bậc thiết kế khác nhau</strong> (${escapeHtml(
                  Array.from(designs).join(' đối chiếu với ')
                )}). Nghiên cứu quan sát/đoàn hệ dễ chịu ảnh hưởng bởi nhiễu tồn dư (residual confounding) so với RCT mù đôi.`
              : `✓ Cùng nhóm thiết kế (<strong>${escapeHtml(Array.from(designs)[0])}</strong>). Chế độ làm mù: ${escapeHtml(
                  Array.from(blindings).join(' vs ')
                )}.`
          }
        </div>
      </div>

      <div style="background: var(--res-surface-subtle); border: 1px solid var(--res-border); border-radius: 14px; padding: 1rem;">
        <div style="font-family: var(--res-font-display); font-weight: 800; margin-bottom: 0.4rem; color: var(--res-teal);">
          2. Trục Quần Thể &amp; Định Nghĩa Kết Cục (P &amp; O)
        </div>
        <div style="font-size: 0.83rem; line-height: 1.55; color: var(--res-text-secondary);">
          Sự phân hóa kết quả giữa các nghiên cứu cùng chủ đề thường bắt nguồn từ <strong>ngưỡng nặng lúc tuyển bệnh</strong> (ví dụ dự phòng tiên phát vs thứ phát; sốc nhiễm khuẩn vs chưa sốc) và <strong>tiêu chí gộp (Composite Endpoint)</strong>.
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <table class="res-cmp-matrix-table">
        <thead>
          <tr>
            <th>Nghiên cứu</th>
            <th>Đặc thù Dân số tuyển chọn (P)</th>
            <th>Định nghĩa Kết cục chính (O)</th>
            <th>Sai lệch (RoB)</th>
            <th>Hướng Kết quả</th>
          </tr>
        </thead>
        <tbody>
          ${populations
            .map(
              (p) => `
            <tr>
              <td><strong>${escapeHtml(p.name)}</strong></td>
              <td>${escapeHtml(p.pop)}</td>
              <td>${escapeHtml(p.endpoint)}</td>
              <td>${escapeHtml(p.rob)}</td>
              <td><strong>${escapeHtml(p.dir)}</strong></td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    </div>
  `;
}

export function buildMarkdownComparisonExport(studies: ResearchStudyRecord[]): string {
  const headers = ['Tiêu chí', ...studies.map((s) => s.trialAcronym || `${s.journal} ${s.year}`)];
  const sep = headers.map(() => '---');
  const lines = [
    `| ${headers.join(' | ')} |`,
    `| ${sep.join(' | ')} |`,
    `| **Năm & Tạp chí** | ${studies.map((s) => `${s.journal} (${s.year})`).join(' | ')} |`,
    `| **Thiết kế & Cỡ mẫu** | ${studies
      .map((s) => `${RESEARCH_DESIGNS[s.design]?.shortLabel || s.design} (N=${s.sampleSize || 'N/A'})`)
      .join(' | ')} |`,
    `| **Bệnh / Vấn đề** | ${studies
      .map((s) => RESEARCH_CONDITIONS[s.conditionKey] || s.conditionKey)
      .join(' | ')} |`,
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
          `${OUTCOME_DIRECTIONS[s.outcomeDirection]?.shortLabel || s.outcomeDirection} • GRADE ${s.gradeCertainty}`
      )
      .join(' | ')} |`
  ];
  return lines.join('\n');
}

export function renderComparisonStudioSection(): string {
  const selected = researchStore.getCompareStudies();
  const activeTab: ResearchCompareTab = researchStore.getCompareTab();
  const diffOnly = researchStore.isDiffHighlightOnly();
  const clusters = researchStore.getSmartComparableClusters();

  if (selected.length === 0) {
    return `
      <section class="res-compare-studio">
        <div style="text-align: center; padding: 2.5rem 1rem;">
          <i class="fa-solid fa-scale-balanced" style="font-size: 2.6rem; color: var(--res-primary); margin-bottom: 0.85rem;"></i>
          <h3 style="font-family: var(--res-font-display); font-size: 1.25rem; margin: 0 0 0.5rem;">
            Bàn Cân Đối Sánh Đa Chiều Đang Trống
          </h3>
          <p style="color: var(--res-text-muted); max-width: 600px; margin: 0 auto 1.35rem; font-size: 0.9rem; line-height: 1.6;">
            Chọn từ <strong>2 đến 5 nghiên cứu</strong> ở danh sách khám phá, hoặc bấm vào một <strong>Cụm Nhãn Chung</strong> dưới đây để nạp tự động các nghiên cứu cùng chủ đề vào bàn cân đối chiếu:
          </p>
          <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 0.6rem;">
            ${clusters
              .slice(0, 6)
              .map(
                (c) => `
              <button type="button" class="res-cluster-pill js-load-cluster" data-ids="${escapeHtml(
                c.studies.map((s) => s.id).join(',')
              )}">
                <i class="fa-solid fa-layer-group" style="color: var(--res-primary);"></i>
                <span>${escapeHtml(c.title)} (${c.studies.length})</span>
                ${c.hasDiscordance ? `<span class="res-cluster-discord">⚡ Khác KQ</span>` : ''}
              </button>
            `
              )
              .join('')}
          </div>
        </div>
      </section>
    `;
  }

  let bodyHtml = '';
  if (activeTab === 'forest') {
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
            Đối chiếu song song theo 7 trục nhãn chuẩn hóa: Bệnh lý, Thiết kế, Cỡ mẫu, PICO, Định lượng HR/RR/NNT, RoB 2.0 &amp; Ranh giới áp dụng
          </p>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
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
          <button type="button" class="res-btn" id="js-export-cmp-md">
            <i class="fa-regular fa-copy"></i> Sao chép Bảng Markdown
          </button>
          <button type="button" class="res-btn" id="js-clear-cmp-all">
            <i class="fa-solid fa-trash-can"></i> Xóa bàn cân
          </button>
        </div>
      </div>

      ${renderSharedLabelsSummaryBanner(selected)}

      <div class="res-compare-subtabs" role="tablist">
        <button type="button" class="res-btn ${
          activeTab === 'matrix' ? 'res-btn-primary' : ''
        } js-cmp-subtab" data-tab="matrix">
          <i class="fa-solid fa-table-columns"></i> 1. Ma Trận PICO &amp; Nhãn Chung
        </button>
        <button type="button" class="res-btn ${
          activeTab === 'forest' ? 'res-btn-primary' : ''
        } js-cmp-subtab" data-tab="forest">
          <i class="fa-solid fa-chart-gantt"></i> 2. Cross-Study Forest Plot SVG
        </button>
        <button type="button" class="res-btn ${
          activeTab === 'timeline' ? 'res-btn-primary' : ''
        } js-cmp-subtab" data-tab="timeline">
          <i class="fa-solid fa-timeline"></i> 3. Tiến Hóa Theo Năm
        </button>
        <button type="button" class="res-btn ${
          activeTab === 'discordance' ? 'res-btn-primary' : ''
        } js-cmp-subtab" data-tab="discordance">
          <i class="fa-solid fa-magnifying-glass-arrows-right"></i> 4. Giải Mã Bất Đồng Thuận
        </button>
      </div>

      <div>${bodyHtml}</div>
    </section>
  `;
}
