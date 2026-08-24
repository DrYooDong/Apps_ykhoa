/**
 * CliniPortal Knowledge Vault — Clinical Reaction Chain (CRCE v3.0) View
 * Phân hệ Chuỗi Phản Ứng Lâm Sàng 5 Bước Độc Lập cho 30 Bệnh Lý Trọng Tâm
 * Kết nối 16 Kho Tri Thức EBM Vault
 */

import { 
  DIAGNOSTIC_CHAIN_DATABASE, 
  DiseaseReactionChainDefinition, 
  getAllReactionChains,
  DiagnosticCriterionItem,
  DrugChainOption,
  DiseaseComplicationItem
} from '../docspace/data/diagnostic-criteria-database';
import { VAULT_CATALOG } from './vault-loader';
import { VaultArticle } from './types';

export interface VaultCrceState {
  searchQuery: string;
  selectedDiseaseKey: string | null;
  activeSpecialty: string;
  activeSeverity: string;
  activeStep: 1 | 2 | 3 | 4 | 5;
  checkedCriteriaIds: Set<string>;
}

export const DEFAULT_CRCE_STATE: VaultCrceState = {
  searchQuery: '',
  selectedDiseaseKey: null,
  activeSpecialty: 'ALL',
  activeSeverity: 'ALL',
  activeStep: 1,
  checkedCriteriaIds: new Set<string>()
};

function escapeHtml(str: string): string {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * Tính toán tỷ lệ phần trăm khớp tiêu chuẩn chẩn đoán
 */
export function calculateCriteriaMatch(
  definition: DiseaseReactionChainDefinition, 
  checkedIds: Set<string>
): { percentage: number; isSatisfied: boolean; label: string } {
  if (!definition.criteria || definition.criteria.length === 0) {
    return { percentage: 0, isSatisfied: false, label: 'Chưa có tiêu chuẩn' };
  }

  const rule = definition.criteriaRule;
  const total = definition.criteria.length;
  const checkedCount = definition.criteria.filter(c => checkedIds.has(c.id)).length;
  const percentage = Math.round((checkedCount / total) * 100);

  // Kiểm tra mandatory
  let mandatoryPassed = true;
  if (rule.mandatoryIds && rule.mandatoryIds.length > 0) {
    mandatoryPassed = rule.mandatoryIds.every(id => checkedIds.has(id));
  }

  // Kiểm tra major
  let majorPassed = true;
  if (rule.minMajorRequired && rule.minMajorRequired > 0) {
    const majorCount = definition.criteria.filter(c => c.type === 'major' && checkedIds.has(c.id)).length;
    majorPassed = majorCount >= rule.minMajorRequired;
  }

  // Kiểm tra minor
  let minorPassed = true;
  if (rule.minMinorRequired && rule.minMinorRequired > 0) {
    const minorCount = definition.criteria.filter(c => c.type === 'minor' && checkedIds.has(c.id)).length;
    minorPassed = minorCount >= rule.minMinorRequired;
  }

  const isSatisfied = mandatoryPassed && majorPassed && minorPassed && checkedCount > 0;
  let label = 'Chưa đủ tiêu chuẩn';
  if (isSatisfied) {
    label = percentage >= 80 ? 'Xác định (Chắc chắn)' : 'Đủ tiêu chuẩn chẩn đoán';
  } else if (checkedCount > 0) {
    label = 'Nghi ngờ / Theo dõi tiếp';
  }

  return { percentage, isSatisfied, label };
}

/**
 * Tìm kiếm các bài viết trong VAULT_CATALOG liên quan đến bệnh lý
 */
export function findRelatedVaultArticles(definition: DiseaseReactionChainDefinition): VaultArticle[] {
  const queryWords = [
    definition.diseaseName.toLowerCase(),
    definition.icdCode.toLowerCase(),
    ...(definition.icdPrefixes || []).map(p => p.toLowerCase())
  ];

  return VAULT_CATALOG.filter(art => {
    const title = art.title.toLowerCase();
    const snippet = (art.snippet || '').toLowerCase();
    const icds = (art.icd10 || []).map(i => i.toLowerCase());
    const aliases = (art.aliases || []).map(a => a.toLowerCase());
    const keywords = (art.keywords || []).map(k => k.toLowerCase());

    // Khớp mã ICD
    if (icds.some(icd => icd.includes(definition.icdCode.toLowerCase()) || definition.icdPrefixes.some(p => icd.startsWith(p.toLowerCase())))) {
      return true;
    }

    // Khớp tên bệnh hoặc từ khóa
    return queryWords.some(w => title.includes(w) || aliases.some(a => a.includes(w)) || keywords.some(k => k.includes(w)) || snippet.includes(w));
  }).slice(0, 8);
}

/**
 * Render View Chính Chuỗi CRCE trong Knowledge Vault
 */
export function renderVaultCrceView(state: VaultCrceState): string {
  const allDiseases = Object.entries(DIAGNOSTIC_CHAIN_DATABASE).map(([key, def]) => ({
    key,
    ...def
  }));

  // Nếu đang chọn xem chi tiết 1 bệnh
  if (state.selectedDiseaseKey && DIAGNOSTIC_CHAIN_DATABASE[state.selectedDiseaseKey]) {
    const disease = DIAGNOSTIC_CHAIN_DATABASE[state.selectedDiseaseKey];
    return renderDiseaseReactorView(state.selectedDiseaseKey, disease, state);
  }

  // Nếu ở chế độ danh mục 30 bệnh
  const specialties = Array.from(new Set(allDiseases.map(d => d.specialty))).sort();
  const q = state.searchQuery.trim().toLowerCase();

  const filteredDiseases = allDiseases.filter(d => {
    if (state.activeSpecialty !== 'ALL' && d.specialty !== state.activeSpecialty) return false;
    if (state.activeSeverity !== 'ALL' && d.severity !== state.activeSeverity) return false;
    if (q) {
      const matchName = d.diseaseName.toLowerCase().includes(q);
      const matchIcd = d.icdCode.toLowerCase().includes(q) || (d.icdPrefixes || []).some(p => p.toLowerCase().includes(q));
      const matchSpec = d.specialty.toLowerCase().includes(q);
      const matchGold = d.goldStandard.toLowerCase().includes(q);
      const matchSum = d.summary.toLowerCase().includes(q);
      if (!matchName && !matchIcd && !matchSpec && !matchGold && !matchSum) {
        return false;
      }
    }
    return true;
  });

  return `
    <div class="vault-crce-container">
      <!-- CRCE Hero Header -->
      <div class="vault-crce-hero">
        <div class="vault-crce-hero-left">
          <h2>
            <i class="fa-solid fa-bolt-lightning" style="color: #f59e0b;"></i>
            Chuỗi Phản Ứng Lâm Sàng CRCE v3.0
          </h2>
          <p>
            Động cơ phản ứng dây chuyền 5 bước (Lâm sàng ➔ Tiêu chuẩn CĐ ➔ Phác đồ ➔ Dược thư ➔ Biến chứng) cho <strong>30 Bệnh Lý Trọng Tâm</strong> kết nối 16 Kho Tri Thức EBM.
          </p>
        </div>
        <div class="vault-crce-hero-stats">
          <div class="vault-crce-stat-card">
            <div class="val">${allDiseases.length}</div>
            <div class="lbl">Bệnh Trọng Tâm</div>
          </div>
          <div class="vault-crce-stat-card">
            <div class="val">5 Bước</div>
            <div class="lbl">Chuỗi Phản Ứng</div>
          </div>
          <div class="vault-crce-stat-card">
            <div class="val">100%</div>
            <div class="lbl">Chuẩn Guideline</div>
          </div>
        </div>
      </div>

      <!-- Controls & Filter Bar -->
      <div class="vault-crce-controls">
        <div class="vault-crce-search-wrap">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            id="vault-crce-search-input" 
            class="vault-crce-search-input" 
            placeholder="Tìm kiếm bệnh (Tên bệnh, mã ICD-10, Gold Standard...)"
            value="${escapeHtml(state.searchQuery)}"
          />
        </div>

        <select id="vault-crce-specialty-select" class="vault-crce-select">
          <option value="ALL">Tất cả Chuyên khoa (${specialties.length})</option>
          ${specialties.map(s => `
            <option value="${escapeHtml(s)}" ${state.activeSpecialty === s ? 'selected' : ''}>
              ${escapeHtml(s)}
            </option>
          `).join('')}
        </select>

        <select id="vault-crce-severity-select" class="vault-crce-select">
          <option value="ALL" ${state.activeSeverity === 'ALL' ? 'selected' : ''}>Tất cả Mức độ</option>
          <option value="emergency" ${state.activeSeverity === 'emergency' ? 'selected' : ''}>🚨 Cấp cứu Tối khẩn</option>
          <option value="urgent" ${state.activeSeverity === 'urgent' ? 'selected' : ''}>⚡ Bán khẩn / Nội trú</option>
          <option value="routine" ${state.activeSeverity === 'routine' ? 'selected' : ''}>📋 Thường quy / Ngoại trú</option>
        </select>
      </div>

      <!-- Results Count Bar -->
      <div style="font-size: 0.9rem; color: var(--vault-muted); display: flex; justify-content: space-between; align-items: center;">
        <span>Hiển thị <strong>${filteredDiseases.length}</strong> / <strong>${allDiseases.length}</strong> chuỗi phản ứng bệnh lý</span>
        ${state.searchQuery || state.activeSpecialty !== 'ALL' || state.activeSeverity !== 'ALL' ? `
          <button id="vault-crce-reset-filter" style="background:none; border:none; color:var(--vault-primary); cursor:pointer; font-weight:600; font-size:0.85rem;">
            <i class="fa-solid fa-rotate-left"></i> Đặt lại bộ lọc
          </button>
        ` : ''}
      </div>

      <!-- Disease Cards Grid (30 Diseases) -->
      <div class="vault-crce-grid">
        ${filteredDiseases.map(d => `
          <div class="vault-crce-card" data-disease-key="${d.key}">
            <div class="vault-crce-card-top">
              <div class="vault-crce-card-badges">
                <span class="vault-crce-badge-icd">ICD: ${escapeHtml(d.icdCode)}</span>
                <span class="vault-crce-badge-spec">${escapeHtml(d.specialty)}</span>
                <span class="vault-crce-badge-severity ${d.severity}">
                  ${d.severity === 'emergency' ? '🚨 Cấp cứu' : d.severity === 'urgent' ? '⚡ Bán khẩn' : '📋 Thường quy'}
                </span>
              </div>
              <h3 class="vault-crce-card-title">${escapeHtml(d.diseaseName)}</h3>
              <div class="vault-crce-card-summary">${escapeHtml(d.summary)}</div>
              <div class="vault-crce-card-gold">
                <strong><i class="fa-solid fa-award"></i> Tiêu chuẩn vàng:</strong> ${escapeHtml(d.goldStandard)}
              </div>
            </div>

            <div class="vault-crce-card-footer">
              <span>
                <i class="fa-solid fa-list-check" style="color:#0284c7;"></i> ${d.criteria.length} TC • 
                <i class="fa-solid fa-pills" style="color:#10b981;"></i> ${(d.protocol.firstLineDrugs || []).length + (d.protocol.secondLineDrugs || []).length} Thuốc • 
                <i class="fa-solid fa-triangle-exclamation" style="color:#ef4444;"></i> ${d.complications.length} BC
              </span>
              <button class="vault-crce-card-btn" data-disease-key="${d.key}">
                <i class="fa-solid fa-bolt"></i> Khởi động Chuỗi
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * Render Giao diện Reactor 5 Bước Chi Tiết của 1 Bệnh Lý
 */
function renderDiseaseReactorView(
  diseaseKey: string, 
  disease: DiseaseReactionChainDefinition, 
  state: VaultCrceState
): string {
  const matchResult = calculateCriteriaMatch(disease, state.checkedCriteriaIds);
  const relatedArticles = findRelatedVaultArticles(disease);

  return `
    <div class="vault-crce-container">
      <div class="vault-crce-reactor">
        <!-- Reactor Header -->
        <div class="vault-crce-reactor-header">
          <div>
            <button id="vault-crce-back-btn" class="vault-crce-back-btn">
              <i class="fa-solid fa-arrow-left"></i> Danh sách 30 Bệnh CRCE
            </button>
            <div class="vault-crce-reactor-meta">
              <div class="vault-crce-card-badges" style="margin-top: 0.6rem;">
                <span class="vault-crce-badge-icd">ICD-10: ${escapeHtml(disease.icdCode)}</span>
                <span class="vault-crce-badge-spec">${escapeHtml(disease.specialty)}</span>
                <span class="vault-crce-badge-severity ${disease.severity}">
                  ${disease.severity === 'emergency' ? '🚨 Cấp cứu tối khẩn' : disease.severity === 'urgent' ? '⚡ Bán khẩn nội trú' : '📋 Thường quy'}
                </span>
              </div>
              <h2>${escapeHtml(disease.diseaseName)}</h2>
              <p style="margin: 0; font-size: 0.9rem; color: var(--vault-muted); line-height: 1.45;">
                ${escapeHtml(disease.summary)}
              </p>
            </div>
          </div>

          <div class="vault-crce-reactor-actions">
            <div class="vault-crce-card-gold" style="margin: 0; max-width: 360px;">
              <strong><i class="fa-solid fa-award"></i> Tiêu chuẩn vàng:</strong> ${escapeHtml(disease.goldStandard)}
            </div>
          </div>
        </div>

        <!-- 5-Step Stepper Progress Bar -->
        <div class="vault-crce-stepper">
          <button class="vault-crce-step-btn ${state.activeStep === 1 ? 'active' : ''}" data-step="1">
            <span class="step-num">BƯỚC 1</span>
            <span class="step-title"><i class="fa-solid fa-stethoscope"></i> Lâm Sàng & DDXD</span>
          </button>
          <button class="vault-crce-step-btn ${state.activeStep === 2 ? 'active' : ''}" data-step="2">
            <span class="step-num">BƯỚC 2</span>
            <span class="step-title"><i class="fa-solid fa-list-check"></i> Tiêu Chuẩn CĐ</span>
          </button>
          <button class="vault-crce-step-btn ${state.activeStep === 3 ? 'active' : ''}" data-step="3">
            <span class="step-num">BƯỚC 3</span>
            <span class="step-title"><i class="fa-solid fa-notes-medical"></i> Phác Đồ Điều Trị</span>
          </button>
          <button class="vault-crce-step-btn ${state.activeStep === 4 ? 'active' : ''}" data-step="4">
            <span class="step-num">BƯỚC 4</span>
            <span class="step-title"><i class="fa-solid fa-pills"></i> Dược Lâm Sàng</span>
          </button>
          <button class="vault-crce-step-btn ${state.activeStep === 5 ? 'active' : ''}" data-step="5">
            <span class="step-num">BƯỚC 5</span>
            <span class="step-title"><i class="fa-solid fa-triangle-exclamation"></i> Biến Chứng & Giám Sát</span>
          </button>
        </div>

        <!-- Step Content Panel -->
        <div class="vault-crce-panel">
          ${renderStepContent(state.activeStep, disease, state, matchResult)}
        </div>

        <!-- 16 Kho Vault Pathway Links Footer -->
        <div class="vault-crce-pathways">
          <h4>
            <i class="fa-solid fa-book-bookmark" style="color: var(--vault-primary);"></i>
            Tài Liệu Knowledge Vault Liên Quan Cho "${escapeHtml(disease.diseaseName)}" (${relatedArticles.length})
          </h4>
          <div class="vault-crce-pathways-list">
            ${relatedArticles.length > 0 ? relatedArticles.map(art => `
              <button class="vault-crce-pathway-btn" data-article-id="${art.id}" data-rel-path="${escapeHtml(art.relPath)}">
                <i class="fa-solid ${art.khoIcon}"></i>
                <span>${escapeHtml(art.title)}</span>
                <span style="font-size:10px; opacity:0.75;">(${art.khoName})</span>
              </button>
            `).join('') : `
              <span style="font-size: 0.85rem; color: var(--vault-muted);">
                Tất cả 16 Kho Tri Thức đều sẵn sàng hỗ trợ tra cứu bệnh lý này.
              </span>
            `}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render Nội Dung Chi Tiết của Từng Bước trong Chuỗi
 */
function renderStepContent(
  step: 1 | 2 | 3 | 4 | 5, 
  disease: DiseaseReactionChainDefinition, 
  state: VaultCrceState,
  matchResult: { percentage: number; isSatisfied: boolean; label: string }
): string {
  switch (step) {
    case 1:
      return `
        <div>
          <h3 class="vault-crce-panel-title">
            <i class="fa-solid fa-stethoscope" style="color:#0284c7;"></i>
            Bước 1: Đối Chiếu Lâm Sàng & Phân Tầng Ban Đầu
          </h3>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin-bottom: 1.25rem;">
            <div class="vault-crce-protocol-card">
              <h4><i class="fa-solid fa-bullseye"></i> Tiêu Chuẩn Vàng Xác Định</h4>
              <p style="margin: 0; font-size: 0.9rem; color: var(--vault-text); line-height: 1.5;">
                ${escapeHtml(disease.goldStandard)}
              </p>
            </div>

            <div class="vault-crce-protocol-card">
              <h4><i class="fa-solid fa-shield-halved"></i> Mức Độ Khẩn Cấp & Định Hướng</h4>
              <p style="margin: 0; font-size: 0.9rem; color: var(--vault-text); line-height: 1.5;">
                Phân loại: <strong>${disease.severity === 'emergency' ? '🚨 Cấp cứu Tối khẩn (Can thiệp trong 60 phút)' : disease.severity === 'urgent' ? '⚡ Bán khẩn (Nhập viện điều trị nội trú)' : '📋 Thường quy (Quản lý ngoại trú / Ban ngày)'}</strong>.
                Chuyên khoa phụ trách chính: <strong>${escapeHtml(disease.specialty)}</strong>.
              </p>
            </div>
          </div>

          <div class="vault-crce-protocol-card">
            <h4><i class="fa-solid fa-magnifying-glass-chart"></i> Triệu Chứng Cơ Năng & Khám Thực Thể Trọng Tâm</h4>
            <ul>
              ${disease.criteria.map(c => `
                <li>
                  <strong>${c.type === 'mandatory' ? '🔴 Bắt buộc:' : c.type === 'major' ? '🟠 Tiêu chuẩn chính:' : '🔵 Tiêu chuẩn phụ:'}</strong>
                  ${escapeHtml(c.label)}
                  ${c.description ? `<br><small style="color:var(--vault-muted);">${escapeHtml(c.description)}</small>` : ''}
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      `;

    case 2:
      return `
        <div>
          <h3 class="vault-crce-panel-title">
            <i class="fa-solid fa-list-check" style="color:#10b981;"></i>
            Bước 2: Thẩm Định Tiêu Chuẩn Chẩn Đoán Tương Tác
          </h3>

          <div class="vault-crce-rule-box">
            <i class="fa-solid fa-scale-balanced"></i>
            <strong>Quy tắc chẩn đoán xác định:</strong> ${escapeHtml(disease.criteriaRule.ruleDescription)}
          </div>

          <!-- Interactive Match Percentage Bar -->
          <div class="vault-crce-match-bar-wrap">
            <div class="vault-crce-match-bar-header">
              <span>Tiến độ thẩm định: <strong>${state.checkedCriteriaIds.size} / ${disease.criteria.length} tiêu chuẩn</strong></span>
              <span style="color: ${matchResult.isSatisfied ? '#10b981' : '#f59e0b'};">
                <i class="fa-solid ${matchResult.isSatisfied ? 'fa-circle-check' : 'fa-circle-question'}"></i>
                ${matchResult.label} (${matchResult.percentage}%)
              </span>
            </div>
            <div class="vault-crce-match-bar">
              <div class="vault-crce-match-bar-fill" style="width: ${matchResult.percentage}%;"></div>
            </div>
          </div>

          <!-- Criteria Checklist -->
          <div class="vault-crce-criteria-list">
            ${disease.criteria.map(c => {
              const isChecked = state.checkedCriteriaIds.has(c.id);
              return `
                <div class="vault-crce-criteria-item ${isChecked ? 'checked' : ''}" data-criteria-id="${c.id}">
                  <input type="checkbox" ${isChecked ? 'checked' : ''} style="margin-top:3px; cursor:pointer; width:16px; height:16px; accent-color:#10b981;">
                  <div style="flex:1;">
                    <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-bottom:4px;">
                      <span class="vault-crce-crit-badge ${c.type}">
                        ${c.type === 'mandatory' ? 'Bắt buộc' : c.type === 'major' ? 'Chính' : c.type === 'minor' ? 'Phụ' : c.type === 'lab' ? 'Xét nghiệm' : 'Hình ảnh'}
                      </span>
                      ${c.sourceGuideline ? `<span style="font-size:11px; color:var(--vault-muted);"><i class="fa-solid fa-bookmark"></i> ${escapeHtml(c.sourceGuideline)}</span>` : ''}
                      ${c.labThreshold ? `<span style="font-size:11px; color:#8b5cf6; font-weight:700;"><i class="fa-solid fa-vial"></i> Ngưỡng: ${escapeHtml(c.labThreshold)}</span>` : ''}
                    </div>
                    <div style="font-size:0.9rem; font-weight:600; color:var(--vault-text);">${escapeHtml(c.label)}</div>
                    ${c.description ? `<div style="font-size:0.8rem; color:var(--vault-muted); margin-top:2px;">${escapeHtml(c.description)}</div>` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;

    case 3:
      return `
        <div>
          <h3 class="vault-crce-panel-title">
            <i class="fa-solid fa-notes-medical" style="color:#e11d48;"></i>
            Bước 3: Phác Đồ Điều Trị Phân Tầng Chuẩn Guideline
          </h3>

          <div class="vault-crce-rule-box" style="border-color: rgba(225, 29, 72, 0.3); background: rgba(225, 29, 72, 0.06);">
            <i class="fa-solid fa-file-waveform" style="color: #e11d48;"></i>
            <strong>Hướng dẫn tham chiếu:</strong> ${escapeHtml(disease.protocol.title)} (${escapeHtml(disease.protocol.guideline)})
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin-bottom: 1.25rem;">
            <div class="vault-crce-protocol-card">
              <h4><i class="fa-solid fa-bullseye"></i> Mục Tiêu Điều Trị Trọng Tâm</h4>
              <ul>
                ${(disease.protocol.targetGoals || []).map(g => `<li>${escapeHtml(g)}</li>`).join('')}
              </ul>
            </div>

            <div class="vault-crce-protocol-card">
              <h4><i class="fa-solid fa-truck-medical"></i> Xử Trí Ban Đầu & Cấp Cứu</h4>
              <ul>
                ${(disease.protocol.initialManagement || []).map(m => `<li>${escapeHtml(m)}</li>`).join('')}
              </ul>
            </div>
          </div>

          <div class="vault-crce-protocol-card">
            <h4><i class="fa-solid fa-hand-holding-medical"></i> Chăm Sóc Hỗ Trợ & Điều Dưỡng</h4>
            <ul>
              ${(disease.protocol.supportiveCare || []).map(s => `<li>${escapeHtml(s)}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;

    case 4:
      return `
        <div>
          <h3 class="vault-crce-panel-title">
            <i class="fa-solid fa-pills" style="color:#8b5cf6;"></i>
            Bước 4: Dược Lâm Sàng & Danh Mục Thuốc Điều Trị
          </h3>

          <div style="margin-bottom: 1.25rem;">
            <h4 style="margin: 0 0 0.75rem 0; font-size: 1rem; font-weight: 700; color: #10b981; display: flex; align-items: center; gap: 6px;">
              <i class="fa-solid fa-star"></i> Thuốc Lựa Chọn Đầu Tay (First-Line Therapy)
            </h4>
            <div class="vault-crce-drugs-grid">
              ${(disease.protocol.firstLineDrugs || []).map(drug => renderDrugCard(drug, true)).join('')}
            </div>
          </div>

          ${disease.protocol.secondLineDrugs && disease.protocol.secondLineDrugs.length > 0 ? `
            <div>
              <h4 style="margin: 1.5rem 0 0.75rem 0; font-size: 1rem; font-weight: 700; color: #f59e0b; display: flex; align-items: center; gap: 6px;">
                <i class="fa-solid fa-shield"></i> Thuốc Lựa Chọn Thay Thế (Second-Line / Phối Hợp)
              </h4>
              <div class="vault-crce-drugs-grid">
                ${disease.protocol.secondLineDrugs.map(drug => renderDrugCard(drug, false)).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      `;

    case 5:
      return `
        <div>
          <h3 class="vault-crce-panel-title">
            <i class="fa-solid fa-triangle-exclamation" style="color:#ef4444;"></i>
            Bước 5: Biến Chứng Nguy Kịch & Giám Sát Ca Trực
          </h3>

          <div style="margin-bottom: 1.25rem;">
            <h4 style="margin: 0 0 0.75rem 0; font-size: 1rem; font-weight: 700; color: var(--vault-text);">
              <i class="fa-solid fa-clock-rotate-left"></i> Các Biến Chứng Đe Dọa Tính Mạng Theo Mốc Thời Gian
            </h4>
            <div class="vault-crce-comp-grid">
              ${(disease.complications || []).map(comp => `
                <div class="vault-crce-comp-card ${comp.timeframe}">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <strong style="font-size:0.95rem; color:var(--vault-text);">${escapeHtml(comp.name)}</strong>
                    <span class="vault-crce-crit-badge ${comp.timeframe === 'acute_24h' ? 'mandatory' : comp.timeframe === 'subacute_7d' ? 'major' : 'minor'}">
                      ${comp.timeframe === 'acute_24h' ? 'Cấp tính 24h' : comp.timeframe === 'subacute_7d' ? 'Bán cấp 7 ngày' : 'Mạn tính'}
                    </span>
                  </div>
                  <div style="font-size:0.83rem; color:#ef4444; font-weight:600;">
                    <i class="fa-solid fa-triangle-exclamation"></i> Dấu hiệu: ${escapeHtml(comp.warningSigns)}
                  </div>
                  <div style="font-size:0.83rem; color:var(--vault-text);">
                    <strong>Dự phòng / Xử trí:</strong> ${escapeHtml(comp.preventiveAction)}
                  </div>
                  <div style="background:var(--vault-surface); border:1px solid var(--vault-border); border-radius:6px; padding:6px 8px; font-size:0.8rem; color:#d97706;">
                    <strong>🚨 Cảnh báo On-Call:</strong> ${escapeHtml(comp.onCallAlertText)}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          ${disease.monitoringLabs && disease.monitoringLabs.length > 0 ? `
            <div class="vault-crce-protocol-card" style="margin-top: 1.25rem;">
              <h4><i class="fa-solid fa-vial-circle-check"></i> Cận Lâm Sàng & Xét Nghiệm Cần Theo Dõi Sát</h4>
              <ul>
                ${disease.monitoringLabs.map(lab => `<li>${escapeHtml(lab)}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      `;
  }
}

function renderDrugCard(drug: DrugChainOption, isFirstLine: boolean): string {
  return `
    <div class="vault-crce-drug-card ${isFirstLine ? 'first-line' : 'second-line'}">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <span class="vault-crce-drug-name">${escapeHtml(drug.drugName)}</span>
        <span class="vault-crce-crit-badge ${isFirstLine ? 'mandatory' : 'major'}">
          ${isFirstLine ? '1st Line' : '2nd Line'}
        </span>
      </div>
      <div class="vault-crce-drug-meta">
        <strong>Nhóm:</strong> ${escapeHtml(drug.class)} • <strong>Đường dùng:</strong> ${escapeHtml(drug.route)}
      </div>
      <div class="vault-crce-drug-dose">
        <i class="fa-solid fa-prescription-bottle-medical"></i> ${escapeHtml(drug.dosage)} • ${escapeHtml(drug.frequency)}
      </div>
      ${drug.instructions ? `
        <div style="font-size:0.8rem; color:var(--vault-text);">
          <strong>Cách dùng:</strong> ${escapeHtml(drug.instructions)}
        </div>
      ` : ''}
      ${drug.contraindications && drug.contraindications.length > 0 ? `
        <div style="font-size:0.78rem; color:#ef4444;">
          <strong>Chống chỉ định:</strong> ${escapeHtml(drug.contraindications.join(', '))}
        </div>
      ` : ''}
    </div>
  `;
}

/**
 * Gắn bộ lắng nghe sự kiện tương tác cho View CRCE
 */
export function attachVaultCrceEvents(
  container: HTMLElement, 
  state: VaultCrceState, 
  onStateChange: (newState: VaultCrceState) => void,
  onOpenArticle: (articleIdOrPath: string) => void
): void {
  // 1. Search Input Filter
  const searchInput = container.querySelector('#vault-crce-search-input') as HTMLInputElement | null;
  if (searchInput) {
    let timer: any;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        state.searchQuery = (e.target as HTMLInputElement).value;
        onStateChange(state);
      }, 200);
    });
  }

  // 2. Specialty Select Filter
  const specialtySelect = container.querySelector('#vault-crce-specialty-select') as HTMLSelectElement | null;
  if (specialtySelect) {
    specialtySelect.addEventListener('change', (e) => {
      state.activeSpecialty = (e.target as HTMLSelectElement).value;
      onStateChange(state);
    });
  }

  // 3. Severity Select Filter
  const severitySelect = container.querySelector('#vault-crce-severity-select') as HTMLSelectElement | null;
  if (severitySelect) {
    severitySelect.addEventListener('change', (e) => {
      state.activeSeverity = (e.target as HTMLSelectElement).value;
      onStateChange(state);
    });
  }

  // 4. Reset Filter Button
  const resetBtn = container.querySelector('#vault-crce-reset-filter');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      state.searchQuery = '';
      state.activeSpecialty = 'ALL';
      state.activeSeverity = 'ALL';
      onStateChange(state);
    });
  }

  // 5. Select Disease from Card or Button
  container.querySelectorAll('.vault-crce-card, .vault-crce-card-btn').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const diseaseKey = el.getAttribute('data-disease-key');
      if (diseaseKey) {
        state.selectedDiseaseKey = diseaseKey;
        state.activeStep = 1;
        state.checkedCriteriaIds.clear();
        onStateChange(state);
      }
    });
  });

  // 6. Back Button to Disease Grid
  const backBtn = container.querySelector('#vault-crce-back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      state.selectedDiseaseKey = null;
      state.checkedCriteriaIds.clear();
      onStateChange(state);
    });
  }

  // 7. Stepper Step Switcher
  container.querySelectorAll('.vault-crce-step-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const stepStr = btn.getAttribute('data-step');
      if (stepStr) {
        state.activeStep = parseInt(stepStr, 10) as 1 | 2 | 3 | 4 | 5;
        onStateChange(state);
      }
    });
  });

  // 8. Interactive Criteria Checklist Toggle
  container.querySelectorAll('.vault-crce-criteria-item').forEach(item => {
    item.addEventListener('click', () => {
      const critId = item.getAttribute('data-criteria-id');
      if (critId) {
        if (state.checkedCriteriaIds.has(critId)) {
          state.checkedCriteriaIds.delete(critId);
        } else {
          state.checkedCriteriaIds.add(critId);
        }
        onStateChange(state);
      }
    });
  });

  // 9. Open Related Article Drawer
  container.querySelectorAll('.vault-crce-pathway-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-article-id');
      const rel = btn.getAttribute('data-rel-path');
      if (id || rel) {
        onOpenArticle(id || rel || '');
      }
    });
  });
}
