/**
 * CliniPortal 2.0 — Clinical Protocols Hub & Reader View
 * Path: src/content/protocols/protocol-view.ts
 *
 * Giao diện Dashboard Bento Grid tra cứu phác đồ và Trình đọc chi tiết 4 Tab chuyên sâu.
 */

import { ClinicalProtocol, ProtocolFilterState } from './protocol-types';
import { PROTOCOL_SPECIALTIES, TRIAGE_LEVELS } from './protocol-metadata';
import { KHO_PROTOCOLS_REGISTRY, getProtocolById } from './registry';
import { renderProtocolSvg } from './protocol-flowchart-engine';

export function renderProtocolsHubView(filter: ProtocolFilterState, selectedProtocolId?: string, activeTab: string = 'flowchart'): string {
  const filteredProtocols = filterProtocols(filter);
  const selectedProtocol = selectedProtocolId ? getProtocolById(selectedProtocolId) : null;

  return `
    <div class="protocols-hub-container" style="padding: 1.5rem; max-width: 1400px; margin: 0 auto; font-family: var(--font-family, system-ui, sans-serif); color: var(--color-text, #0f172a);">
      
      <!-- 1. Header Banner -->
      <div class="protocols-header-banner" style="background: linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(13, 148, 136, 0.08) 100%); border: 1px solid var(--color-border, #e2e8f0); border-radius: 16px; padding: 1.5rem 2rem; margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
            <span style="background: var(--color-primary, #0284c7); color: #fff; padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: 800; letter-spacing: 0.5px;">EBM PROTOCOL HUB</span>
            <span style="color: var(--color-text-muted, #64748b); font-size: 12px;">• Type-Safe Clinical Pathways Engine</span>
          </div>
          <h1 style="margin: 0; font-size: 1.6rem; font-weight: 800; color: var(--color-text, #0f172a); display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-code-fork" style="color: var(--color-primary, #0284c7);"></i> Kho Phác Đồ Điều Trị & Lưu Đồ Lâm Sàng
          </h1>
          <p style="margin: 0.35rem 0 0; color: var(--color-text-muted, #64748b); font-size: 0.95rem;">
            Phác đồ xử trí rẽ nhánh theo Bộ Y Tế & Hội chuyên khoa quốc tế, tích hợp Bảng chỉnh liều eGFR, Cảnh báo chống chỉ định chéo và Ra quyết định cùng Bệnh nhân.
          </p>
        </div>
        <div style="display: flex; gap: 0.75rem; align-items: center;">
          <div style="text-align: right;">
            <div style="font-size: 1.4rem; font-weight: 800; color: var(--color-primary, #0284c7);">${KHO_PROTOCOLS_REGISTRY.length}</div>
            <div style="font-size: 11px; color: var(--color-text-muted, #64748b); font-weight: 600;">PHÁC ĐỒ CHUẨN</div>
          </div>
        </div>
      </div>

      <!-- 2. Specialty Quick Filter Pills -->
      <div class="protocols-specialties-bar" style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.75rem; margin-bottom: 1.25rem; scrollbar-width: thin;">
        ${Object.values(PROTOCOL_SPECIALTIES).map(s => {
          const isActive = filter.specialty === s.key;
          return `
            <button class="js-filter-specialty" data-specialty="${s.key}" style="border: 1px solid ${isActive ? s.color : 'var(--color-border, #e2e8f0)'}; background: ${isActive ? s.bg : 'var(--color-surface, #fff)'}; color: ${isActive ? s.color : 'var(--color-text, #0f172a)'}; padding: 6px 14px; border-radius: 20px; font-size: 12.5px; font-weight: ${isActive ? '700' : '500'}; display: inline-flex; align-items: center; gap: 6px; cursor: pointer; white-space: nowrap; transition: all 0.2s ease;">
              <i class="${s.icon}" style="color:${s.color};"></i> ${escapeHtml(s.name)}
            </button>
          `;
        }).join('')}
      </div>

      <!-- 3. Search & Triage Filter Row -->
      <div class="protocols-filter-row" style="display: grid; grid-template-columns: 1fr auto auto; gap: 0.75rem; margin-bottom: 1.5rem;">
        <div style="position: relative;">
          <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--color-text-muted, #94a3b8); font-size: 14px;"></i>
          <input type="text" id="protocol-search-input" value="${escapeHtml(filter.searchQuery)}" placeholder="Tìm kiếm theo tên bệnh, thuốc, mã ICD-10 (VD: A91, Nhồi máu cơ tim, Sốc, GINA...)..." style="width: 100%; padding: 10px 14px 10px 38px; border: 1px solid var(--color-border, #cbd5e1); border-radius: 10px; background: var(--color-surface, #fff); color: var(--color-text, #0f172a); font-size: 13.5px; outline: none;" />
        </div>

        <select id="protocol-triage-select" style="padding: 10px 14px; border: 1px solid var(--color-border, #cbd5e1); border-radius: 10px; background: var(--color-surface, #fff); color: var(--color-text, #0f172a); font-size: 13px; font-weight: 600;">
          <option value="all">Tất cả Mức độ Triage</option>
          <option value="emergency" ${filter.triageLevel === 'emergency' ? 'selected' : ''}>🚨 Cấp cứu Tối khẩn</option>
          <option value="inpatient" ${filter.triageLevel === 'inpatient' ? 'selected' : ''}>🏥 Điều trị Nội trú</option>
          <option value="outpatient" ${filter.triageLevel === 'outpatient' ? 'selected' : ''}>🟢 Điều trị Ngoại trú</option>
        </select>
      </div>

      <!-- 4. Protocols Bento Grid -->
      <div class="protocols-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
        ${filteredProtocols.length > 0 ? filteredProtocols.map(p => renderProtocolCard(p)).join('') : `
          <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: var(--color-surface, #fff); border: 1px dashed var(--color-border, #cbd5e1); border-radius: 14px;">
            <i class="fa-solid fa-clipboard-question" style="font-size: 2.5rem; color: var(--color-text-muted, #94a3b8); margin-bottom: 0.75rem;"></i>
            <h3 style="margin: 0 0 0.5rem; color: var(--color-text, #0f172a);">Không tìm thấy phác đồ phù hợp</h3>
            <p style="margin: 0; color: var(--color-text-muted, #64748b); font-size: 13px;">Hãy thử tìm bằng từ khóa khác hoặc xóa bộ lọc chuyên khoa.</p>
          </div>
        `}
      </div>

      <!-- 5. Modal / Detail Reader (nếu có selectedProtocol) -->
      ${selectedProtocol ? renderProtocolReaderModal(selectedProtocol, activeTab) : ''}
    </div>
  `;
}

/**
 * Render từng Card phác đồ trong Bento Grid
 */
function renderProtocolCard(p: ClinicalProtocol): string {
  const spec = PROTOCOL_SPECIALTIES[p.specialty] || PROTOCOL_SPECIALTIES['all']!;
  const triage = TRIAGE_LEVELS[p.triageLevel] || TRIAGE_LEVELS['inpatient']!;

  return `
    <div class="protocol-card js-view-protocol" data-id="${p.id}" style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 14px; padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease; position: relative;">
      
      <div>
        <!-- Top Tags Row -->
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
          <div style="display: flex; gap: 0.35rem; flex-wrap: wrap; align-items: center;">
            <span style="background: ${spec.bg}; color: ${spec.color}; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 6px; border: 1px solid ${spec.color}33;">
              <i class="${spec.icon}"></i> ${escapeHtml(spec.name)}
            </span>
            ${p.icd10 && p.icd10.length > 0 ? `
              <span style="background: var(--color-bg, #f8fafc); color: var(--color-text-muted, #64748b); font-size: 10.5px; font-weight: 700; padding: 2px 6px; border-radius: 6px; border: 1px solid var(--color-border, #e2e8f0);">
                ICD: ${p.icd10.join(', ')}
              </span>
            ` : ''}
          </div>
          <span style="background: ${triage.bg}; color: ${triage.color}; font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 6px; text-transform: uppercase;">
            ${escapeHtml(triage.name)}
          </span>
        </div>

        <!-- Title -->
        <h3 style="margin: 0 0 0.5rem; font-size: 1.05rem; font-weight: 800; line-height: 1.35; color: var(--color-text, #0f172a);">
          ${escapeHtml(p.title)}
        </h3>

        <!-- Summary -->
        <p style="margin: 0 0 1rem; color: var(--color-text-muted, #64748b); font-size: 12.5px; line-height: 1.45; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          ${escapeHtml(p.summary)}
        </p>
      </div>

      <!-- Footer Meta -->
      <div style="padding-top: 0.75rem; border-top: 1px dashed var(--color-border, #e2e8f0); display: flex; justify-content: space-between; align-items: center; font-size: 11.5px; color: var(--color-text-muted, #64748b);">
        <div style="display: flex; gap: 0.75rem; align-items: center;">
          <span><i class="fa-solid fa-list-check" style="color: var(--color-primary, #0284c7);"></i> ${p.steps.length} bước</span>
          ${p.contraindications && p.contraindications.length > 0 ? `
            <span style="color: #ef4444; font-weight: 600;"><i class="fa-solid fa-triangle-exclamation"></i> ${p.contraindications.length} cảnh báo</span>
          ` : ''}
        </div>
        <span style="color: var(--color-primary, #0284c7); font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
          Xem phác đồ <i class="fa-solid fa-chevron-right" style="font-size: 9px;"></i>
        </span>
      </div>
    </div>
  `;
}

/**
 * Render Trình đọc Phác đồ Chi tiết 4 Tab
 */
function renderProtocolReaderModal(p: ClinicalProtocol, activeTab: string): string {
  const spec = PROTOCOL_SPECIALTIES[p.specialty] || PROTOCOL_SPECIALTIES['all']!;

  return `
    <div class="protocol-modal-backdrop" style="position: fixed; inset: 0; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(4px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1.5rem;">
      <div class="protocol-modal-dialog" style="background: var(--color-surface, #fff); width: 100%; max-width: 1200px; max-height: 90vh; border-radius: 18px; border: 1px solid var(--color-border, #e2e8f0); display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
        
        <!-- Modal Header -->
        <div style="padding: 1.25rem 1.75rem; border-bottom: 1px solid var(--color-border, #e2e8f0); display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; background: var(--color-bg, #f8fafc);">
          <div>
            <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.35rem;">
              <span style="background: ${spec.bg}; color: ${spec.color}; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 6px;">
                <i class="${spec.icon}"></i> ${escapeHtml(spec.name)}
              </span>
              <span style="font-size: 11.5px; color: var(--color-text-muted, #64748b);">Nguồn: <strong>${escapeHtml(p.guidelineSource)}</strong></span>
              <span style="background: rgba(16, 185, 129, 0.1); color: #10b981; font-size: 10.5px; font-weight: 700; padding: 2px 6px; border-radius: 4px;">${escapeHtml(p.evidenceLevel)}</span>
            </div>
            <h2 style="margin: 0; font-size: 1.35rem; font-weight: 800; color: var(--color-text, #0f172a);">${escapeHtml(p.title)}</h2>
          </div>
          <button class="js-close-proto-modal" style="background: none; border: none; font-size: 1.25rem; color: var(--color-text-muted, #64748b); cursor: pointer; padding: 6px; border-radius: 8px;">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Tab Navigation Bar -->
        <div style="display: flex; border-bottom: 1px solid var(--color-border, #e2e8f0); background: var(--color-surface, #fff); padding: 0 1.75rem;">
          <button class="js-proto-tab ${activeTab === 'flowchart' ? 'active' : ''}" data-tab="flowchart" style="padding: 12px 18px; border: none; background: none; border-bottom: 2px solid ${activeTab === 'flowchart' ? 'var(--color-primary, #0284c7)' : 'transparent'}; color: ${activeTab === 'flowchart' ? 'var(--color-primary, #0284c7)' : 'var(--color-text-muted, #64748b)'}; font-weight: 700; font-size: 13px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-diagram-project"></i> 1. Lưu Đồ Thuật Toán
          </button>
          <button class="js-proto-tab ${activeTab === 'drugs' ? 'active' : ''}" data-tab="drugs" style="padding: 12px 18px; border: none; background: none; border-bottom: 2px solid ${activeTab === 'drugs' ? 'var(--color-primary, #0284c7)' : 'transparent'}; color: ${activeTab === 'drugs' ? 'var(--color-primary, #0284c7)' : 'var(--color-text-muted, #64748b)'}; font-weight: 700; font-size: 13px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-pills"></i> 2. Bảng Liều & Chỉnh eGFR
          </button>
          <button class="js-proto-tab ${activeTab === 'pitfalls' ? 'active' : ''}" data-tab="pitfalls" style="padding: 12px 18px; border: none; background: none; border-bottom: 2px solid ${activeTab === 'pitfalls' ? 'var(--color-primary, #0284c7)' : 'transparent'}; color: ${activeTab === 'pitfalls' ? 'var(--color-primary, #0284c7)' : 'var(--color-text-muted, #64748b)'}; font-weight: 700; font-size: 13px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-triangle-exclamation"></i> 3. Cạm Bẫy & Chống Chỉ Định Chéo
          </button>
          <button class="js-proto-tab ${activeTab === 'sdm' ? 'active' : ''}" data-tab="sdm" style="padding: 12px 18px; border: none; background: none; border-bottom: 2px solid ${activeTab === 'sdm' ? 'var(--color-primary, #0284c7)' : 'transparent'}; color: ${activeTab === 'sdm' ? 'var(--color-primary, #0284c7)' : 'var(--color-text-muted, #64748b)'}; font-weight: 700; font-size: 13px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
            <i class="fa-solid fa-handshake-simple"></i> 4. Ra Quyết Định Cùng Bệnh Nhân (SDM)
          </button>
        </div>

        <!-- Modal Body Content -->
        <div style="padding: 1.5rem 1.75rem; overflow-y: auto; flex: 1;">
          
          <!-- TAB 1: FLOWCHART -->
          ${activeTab === 'flowchart' ? `
            <div class="tab-pane-flowchart">
              <!-- Red Flags Alert Banner -->
              ${p.redFlags && p.redFlags.length > 0 ? `
                <div style="background: rgba(239, 68, 68, 0.08); border-left: 4px solid #ef4444; padding: 0.85rem 1.25rem; border-radius: 8px; margin-bottom: 1.25rem;">
                  <div style="font-weight: 800; color: #ef4444; font-size: 12.5px; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 6px;">
                    <i class="fa-solid fa-triangle-exclamation"></i> DẤU HIỆU CỜ ĐỎ / BÁO ĐỘNG ĐỎ CẤP CỨU:
                  </div>
                  <ul style="margin: 0; padding-left: 1.2rem; color: var(--color-text, #0f172a); font-size: 12.5px; line-height: 1.5;">
                    ${p.redFlags.map(rf => `<li>${escapeHtml(rf)}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}

              <!-- SPECIALTY-TAILORED CONTAINER COMPARTMENT (NGĂN TỦ ĐẶC THÙ CHUYÊN KHOA) -->
              ${p.emergencyDetails ? `
                <div style="background: rgba(239, 68, 68, 0.04); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 10px; padding: 1rem 1.25rem; margin-bottom: 1.25rem;">
                  <div style="font-weight: 800; color: #ef4444; font-size: 13px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 6px;">
                    <i class="fa-solid fa-truck-medical"></i> KHUNG HỒI SỨC HUYẾT ĐỘNG & THỜI GIAN VÀNG (EMERGENCY TARGETS):
                  </div>
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.75rem; font-size: 12.5px;">
                    <div><strong>🎯 Đích Huyết Động:</strong> ${p.emergencyDetails.hemodynamicTargets ? p.emergencyDetails.hemodynamicTargets.join('; ') : '—'}</div>
                    <div><strong>💉 Vận Mạch & Inotropes:</strong> ${p.emergencyDetails.inotropesVasopressors ? p.emergencyDetails.inotropesVasopressors.join('; ') : '—'}</div>
                    <div><strong>💧 Dịch Hồi Sức:</strong> ${escapeHtml(p.emergencyDetails.resuscitationFluid || '—')}</div>
                    <div><strong>📊 Thang Điểm Cấp Cứu:</strong> ${p.emergencyDetails.emergencyScores ? p.emergencyDetails.emergencyScores.join(', ') : '—'}</div>
                  </div>
                </div>
              ` : ''}

              ${p.cardioDetails ? `
                <div style="background: rgba(220, 38, 38, 0.04); border: 1px solid rgba(220, 38, 38, 0.3); border-radius: 10px; padding: 1rem 1.25rem; margin-bottom: 1.25rem;">
                  <div style="font-weight: 800; color: #dc2626; font-size: 13px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 6px;">
                    <i class="fa-solid fa-heart-pulse"></i> KHUNG CAN THIỆP TIM MẠCH & 4 TRỤ CỘT GDMT (CARDIOLOGY COMPARTMENT):
                  </div>
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.75rem; font-size: 12.5px;">
                    ${p.cardioDetails.ecgBiomarkers ? `<div><strong>📊 Tiêu Chuẩn ECG & Men Tim:</strong> ${escapeHtml(p.cardioDetails.ecgBiomarkers)}</div>` : ''}
                    ${p.cardioDetails.antiplateletAnticoagulation ? `<div><strong>💊 Phác Đồ DAPT & Kháng Đông:</strong> ${escapeHtml(p.cardioDetails.antiplateletAnticoagulation)}</div>` : ''}
                    ${p.cardioDetails.gdmtPillars ? `<div><strong>🏛️ 4 Trụ Cột GDMT:</strong> ${escapeHtml(p.cardioDetails.gdmtPillars)}</div>` : ''}
                    ${p.cardioDetails.cardiacScores ? `<div><strong>📈 Thang Điểm & Phân Tầng:</strong> ${p.cardioDetails.cardiacScores.join('; ')}</div>` : ''}
                  </div>
                </div>
              ` : ''}

              ${p.giDetails ? `
                <div style="background: rgba(202, 138, 4, 0.04); border: 1px solid rgba(202, 138, 4, 0.3); border-radius: 10px; padding: 1rem 1.25rem; margin-bottom: 1.25rem;">
                  <div style="font-weight: 800; color: #ca8a04; font-size: 13px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 6px;">
                    <i class="fa-solid fa-stethoscope"></i> KHUNG CAN THIỆP TIÊU HÓA & ĐÁNH GIÁ GAN MẬT (GI COMPARTMENT):
                  </div>
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.75rem; font-size: 12.5px;">
                    ${p.giDetails.endoscopyProtocol ? `<div><strong>🔬 Phác Đồ Nội Soi:</strong> ${escapeHtml(p.giDetails.endoscopyProtocol)}</div>` : ''}
                    ${p.giDetails.liverFunctionStaging ? `<div><strong>🩺 Phân Độ Gan & Não Gan:</strong> ${escapeHtml(p.giDetails.liverFunctionStaging)}</div>` : ''}
                    ${p.giDetails.ascitesSbpManagement ? `<div><strong>💧 Xử Trí Cổ Trướng / SBP:</strong> ${escapeHtml(p.giDetails.ascitesSbpManagement)}</div>` : ''}
                    ${p.giDetails.pancreatitisFluid ? `<div><strong>🧪 Bù Dịch Viêm Tụy Cấp:</strong> ${escapeHtml(p.giDetails.pancreatitisFluid)}</div>` : ''}
                  </div>
                </div>
              ` : ''}

              ${p.infectiousDetails ? `
                <div style="background: rgba(13, 148, 136, 0.04); border: 1px solid rgba(13, 148, 136, 0.3); border-radius: 10px; padding: 1rem 1.25rem; margin-bottom: 1.25rem;">
                  <div style="font-weight: 800; color: #0d9488; font-size: 13px; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 6px;">
                    <i class="fa-solid fa-virus"></i> KHUNG GIAI ĐOẠN BỆNH & QUẢN LÝ KHÁNG SINH (INFECTIOUS COMPARTMENT):
                  </div>
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.75rem; font-size: 12.5px;">
                    <div><strong>📅 Phân Chia Ngày Bệnh:</strong> ${escapeHtml(p.infectiousDetails.diseaseDayPhase || '—')}</div>
                    <div><strong>🔬 Động Học Hct / Tiểu Cầu:</strong> ${escapeHtml(p.infectiousDetails.hctPlateletKinetic || '—')}</div>
                    <div><strong>💊 Quản Lý Kháng Sinh:</strong> ${escapeHtml(p.infectiousDetails.antimicrobialStewardship || '—')}</div>
                    <div><strong>🛡️ Cấp Độ Cách Ly:</strong> ${escapeHtml(p.infectiousDetails.isolationPrecautions || '—')}</div>
                  </div>
                </div>
              ` : ''}

              <!-- Flowchart SVG Canvas -->
              <div style="background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; overflow-x: auto; margin-bottom: 1.5rem;">
                ${renderProtocolSvg(p)}
              </div>

              <!-- Steps List Accordion -->
              <h3 style="margin: 0 0 0.75rem; font-size: 1.05rem; font-weight: 800; color: var(--color-text, #0f172a);">Các bước xử trí tuần tự:</h3>
              <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                ${p.steps.map(step => `
                  <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 10px; padding: 1rem 1.25rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                      <div style="font-weight: 800; font-size: 13.5px; color: ${step.isAlert ? '#ef4444' : 'var(--color-primary, #0284c7)'};">
                        Bước ${step.order}: ${escapeHtml(step.title)}
                      </div>
                      ${step.timeframe ? `<span style="font-size: 11px; background: var(--color-bg, #f1f5f9); color: var(--color-text-muted, #64748b); padding: 2px 8px; border-radius: 4px; font-weight: 600;">⏱️ ${escapeHtml(step.timeframe)}</span>` : ''}
                    </div>
                    <p style="margin: 0 0 0.5rem; font-size: 13px; color: var(--color-text, #0f172a); line-height: 1.5;">${escapeHtml(step.description)}</p>
                    ${step.conditionIf ? `
                      <div style="background: rgba(245, 158, 11, 0.08); border-left: 3px solid #f59e0b; padding: 4px 10px; font-size: 12px; color: #b45309; border-radius: 4px;">
                        <strong>NẾU:</strong> ${escapeHtml(step.conditionIf)} <br><strong>THÌ:</strong> ${escapeHtml(step.conditionThen || '')}
                      </div>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- TAB 2: DRUGS & RENAL MATRIX -->
          ${activeTab === 'drugs' ? `
            <div class="tab-pane-drugs">
              <h3 style="margin: 0 0 1rem; font-size: 1.1rem; font-weight: 800; color: var(--color-text, #0f172a);">Bảng Chi Tiết Thuốc & Phác Đồ Dược Lý</h3>
              <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;">
                  <thead>
                    <tr style="background: var(--color-bg, #f8fafc); border-bottom: 2px solid var(--color-border, #cbd5e1);">
                      <th style="padding: 10px 12px; font-weight: 700;">Tên Hoạt Chất / Đường Dùng</th>
                      <th style="padding: 10px 12px; font-weight: 700;">Liều Nạp & Duy Trì</th>
                      <th style="padding: 10px 12px; font-weight: 700;">Chỉnh Liều Thận (eGFR) & Gan</th>
                      <th style="padding: 10px 12px; font-weight: 700;">Lưu Ý Lâm Sàng & Tác Dụng Phụ</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${getAllDrugs(p).map(drug => `
                      <tr style="border-bottom: 1px solid var(--color-border, #e2e8f0);">
                        <td style="padding: 12px; vertical-align: top;">
                          <div style="font-weight: 800; color: var(--color-primary, #0284c7);">${escapeHtml(drug.genericName)}</div>
                          <span style="font-size: 10.5px; background: rgba(2, 132, 199, 0.1); color: var(--color-primary, #0284c7); padding: 1px 6px; border-radius: 4px; font-weight: 700;">Đường ${drug.route}</span>
                          ${drug.tradeNames ? `<div style="font-size: 11px; color: var(--color-text-muted, #64748b); margin-top: 3px;">(${drug.tradeNames.join(', ')})</div>` : ''}
                        </td>
                        <td style="padding: 12px; vertical-align: top;">
                          ${drug.loadingDose ? `<div style="margin-bottom: 4px;"><strong style="color:#ef4444;">Nạp:</strong> ${escapeHtml(drug.loadingDose)}</div>` : ''}
                          <div><strong>Duy trì:</strong> ${escapeHtml(drug.maintenanceDose)}</div>
                          ${drug.maxDose24h ? `<div style="font-size: 11px; color: var(--color-text-muted, #64748b); margin-top: 3px;">Max: ${escapeHtml(drug.maxDose24h)}</div>` : ''}
                        </td>
                        <td style="padding: 12px; vertical-align: top;">
                          ${drug.renalAdjustment ? `<div style="margin-bottom: 4px;"><strong>Thận:</strong> ${escapeHtml(drug.renalAdjustment)}</div>` : ''}
                          ${drug.hepaticAdjustment ? `<div><strong>Gan:</strong> ${escapeHtml(drug.hepaticAdjustment)}</div>` : ''}
                          ${!drug.renalAdjustment && !drug.hepaticAdjustment ? `<span style="color: var(--color-text-muted, #94a3b8); font-size: 11.5px;">Không yêu cầu chỉnh liều đặc biệt</span>` : ''}
                        </td>
                        <td style="padding: 12px; vertical-align: top; color: var(--color-text, #0f172a);">
                          ${escapeHtml(drug.clinicalNotes || '—')}
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          ` : ''}

          <!-- TAB 3: PITFALLS & CROSS-CONTRAINDICATIONS -->
          ${activeTab === 'pitfalls' ? `
            <div class="tab-pane-pitfalls">
              <h3 style="margin: 0 0 1rem; font-size: 1.1rem; font-weight: 800; color: var(--color-text, #0f172a);">Cạm Bẫy & Lá Chắn Cảnh Báo Chống Chỉ Định Chéo</h3>
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${p.contraindications && p.contraindications.length > 0 ? p.contraindications.map(c => `
                  <div style="background: ${c.dangerLevel === 'absolute' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(245, 158, 11, 0.05)'}; border: 1px solid ${c.dangerLevel === 'absolute' ? '#ef4444' : '#f59e0b'}; border-radius: 12px; padding: 1.25rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                      <div style="font-weight: 800; font-size: 14px; color: ${c.dangerLevel === 'absolute' ? '#ef4444' : '#b45309'}; display: flex; align-items: center; gap: 6px;">
                        <i class="fa-solid fa-ban"></i> KHI CÓ BỆNH KÈM: ${escapeHtml(c.conflictWithCondition)}
                      </div>
                      <span style="background: ${c.dangerLevel === 'absolute' ? '#ef4444' : '#f59e0b'}; color: #fff; font-size: 10.5px; font-weight: 800; padding: 2px 8px; border-radius: 4px; text-transform: uppercase;">
                        ${c.dangerLevel === 'absolute' ? 'Tuyệt đối cấm' : 'Cảnh giác cao'}
                      </span>
                    </div>

                    <div style="font-size: 13px; margin-bottom: 0.5rem;">
                      <strong style="color:#ef4444;">⛔ THUỐC / HÀNH ĐỘNG CẤM:</strong> <strong>${escapeHtml(c.forbiddenDrugOrAction)}</strong>
                    </div>

                    <div style="font-size: 12.5px; color: var(--color-text, #0f172a); margin-bottom: 0.5rem; line-height: 1.45;">
                      <strong>Cơ chế nguy cơ:</strong> ${escapeHtml(c.explanation)}
                    </div>

                    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 8px; padding: 0.6rem 1rem; font-size: 12.5px; color: #0d9488;">
                      <strong>💡 Khuyến nghị xử trí an toàn:</strong> ${escapeHtml(c.recommendation)}
                    </div>
                  </div>
                `).join('') : '<p>Chưa có dữ liệu chống chỉ định đặc biệt.</p>'}
              </div>
            </div>
          ` : ''}

          <!-- TAB 4: SHARED DECISION MAKING (SDM) -->
          ${activeTab === 'sdm' ? `
            <div class="tab-pane-sdm">
              <h3 style="margin: 0 0 0.5rem; font-size: 1.1rem; font-weight: 800; color: var(--color-text, #0f172a);">Ma Trận Ra Quyết Định Điều Trị Cùng Bệnh Nhân (Shared Decision Making)</h3>
              <p style="margin: 0 0 1.25rem; color: var(--color-text-muted, #64748b); font-size: 13px;">So sánh các phương án điều trị theo khuyến cáo để Bác sĩ cùng Người bệnh thảo luận và đưa ra lựa chọn tối ưu nhất.</p>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 1.25rem;">
                ${p.sharedDecisionOptions && p.sharedDecisionOptions.length > 0 ? p.sharedDecisionOptions.map((opt, idx) => `
                  <div style="background: var(--color-bg, #f8fafc); border: 2px solid ${idx === 0 ? 'var(--color-primary, #0284c7)' : 'var(--color-border, #cbd5e1)'}; border-radius: 14px; padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <span style="background: ${idx === 0 ? 'var(--color-primary, #0284c7)' : '#64748b'}; color: #fff; font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 6px;">
                          ${idx === 0 ? 'PHƯƠNG ÁN KHUYẾN NGHỊ CHÍNH' : 'PHƯƠNG ÁN THAY THẾ / BẢO TỒN'}
                        </span>
                        <span style="font-size: 11px; font-weight: 700; color: var(--color-text-muted, #64748b);">
                          Chi phí: <strong>${opt.estimatedCost === 'high' ? 'Cao' : (opt.estimatedCost === 'medium' ? 'Trung bình' : 'Tiết kiệm')}</strong>
                        </span>
                      </div>

                      <h4 style="margin: 0 0 0.75rem; font-size: 1.05rem; font-weight: 800; color: var(--color-text, #0f172a);">${escapeHtml(opt.optionName)}</h4>

                      <div style="margin-bottom: 0.75rem;">
                        <div style="font-weight: 700; font-size: 12px; color: #10b981; margin-bottom: 0.25rem;"><i class="fa-solid fa-circle-check"></i> Ưu điểm & Lợi ích:</div>
                        <ul style="margin: 0; padding-left: 1.2rem; font-size: 12.5px; color: var(--color-text, #0f172a); line-height: 1.45;">
                          ${opt.pros.map(pro => `<li>${escapeHtml(pro)}</li>`).join('')}
                        </ul>
                      </div>

                      <div style="margin-bottom: 0.75rem;">
                        <div style="font-weight: 700; font-size: 12px; color: #ef4444; margin-bottom: 0.25rem;"><i class="fa-solid fa-circle-xmark"></i> Nhược điểm & Nguy cơ:</div>
                        <ul style="margin: 0; padding-left: 1.2rem; font-size: 12.5px; color: var(--color-text, #0f172a); line-height: 1.45;">
                          ${opt.cons.map(con => `<li>${escapeHtml(con)}</li>`).join('')}
                        </ul>
                      </div>
                    </div>

                    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 8px; padding: 0.6rem 0.85rem; font-size: 12px; color: var(--color-text-muted, #64748b); margin-top: 0.75rem;">
                      <strong>🎯 Đối tượng phù hợp:</strong> ${escapeHtml(opt.suitableFor)}
                    </div>
                  </div>
                `).join('') : '<p>Chưa có dữ liệu ra quyết định cùng bệnh nhân.</p>'}
              </div>
            </div>
          ` : ''}

        </div>

        <!-- Modal Footer -->
        <div style="padding: 1rem 1.75rem; border-top: 1px solid var(--color-border, #e2e8f0); background: var(--color-bg, #f8fafc); display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 11.5px; color: var(--color-text-muted, #64748b);">
            Cập nhật lần cuối: ${escapeHtml(p.updatedAt || '2026')} • CliniPortal Clinical Decision Support System
          </span>
          <button class="js-close-proto-modal" style="background: var(--color-primary, #0284c7); color: #fff; border: none; padding: 8px 18px; border-radius: 8px; font-weight: 700; font-size: 13px; cursor: pointer;">
            Đóng Phác Đồ
          </button>
        </div>

      </div>
    </div>
  `;
}

function filterProtocols(filter: ProtocolFilterState): ClinicalProtocol[] {
  let list = KHO_PROTOCOLS_REGISTRY;

  if (filter.specialty && filter.specialty !== 'all') {
    list = list.filter(p => p.specialty === filter.specialty);
  }

  if (filter.triageLevel && filter.triageLevel !== 'all') {
    list = list.filter(p => p.triageLevel === filter.triageLevel);
  }

  if (filter.searchQuery && filter.searchQuery.trim()) {
    const q = filter.searchQuery.toLowerCase().trim();
    list = list.filter(p => 
      p.title.toLowerCase().includes(q) ||
      (p.titleEn && p.titleEn.toLowerCase().includes(q)) ||
      (p.aliases && p.aliases.some(a => a.toLowerCase().includes(q))) ||
      p.icd10.some(code => code.toLowerCase().includes(q)) ||
      p.summary.toLowerCase().includes(q)
    );
  }

  return list;
}

function getAllDrugs(p: ClinicalProtocol) {
  const map = new Map<string, any>();
  (p.steps || []).forEach(step => {
    (step.drugs || []).forEach(drug => {
      if (!map.has(drug.genericName)) {
        map.set(drug.genericName, drug);
      }
    });
  });
  return Array.from(map.values());
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Gắn sự kiện tương tác cho Protocols Hub & Reader View
 */
export function attachProtocolsEvents(
  container: HTMLElement,
  currentState: { filter: ProtocolFilterState; selectedId?: string; activeTab: string },
  onStateUpdate: (newState: { filter: ProtocolFilterState; selectedId?: string; activeTab: string }) => void
): void {
  // 1. Specialty Filter Buttons
  container.querySelectorAll('.js-filter-specialty').forEach(btn => {
    btn.addEventListener('click', () => {
      const spec = btn.getAttribute('data-specialty') || 'all';
      currentState.filter.specialty = spec;
      onStateUpdate(currentState);
    });
  });

  // 2. Search Input
  const searchInput = container.querySelector('#protocol-search-input') as HTMLInputElement | null;
  if (searchInput) {
    let debounceTimer: any;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        currentState.filter.searchQuery = searchInput.value;
        onStateUpdate(currentState);
      }, 200);
    });
  }

  // 3. Triage Select
  const triageSelect = container.querySelector('#protocol-triage-select') as HTMLSelectElement | null;
  if (triageSelect) {
    triageSelect.addEventListener('change', () => {
      currentState.filter.triageLevel = (triageSelect.value || 'all') as any;
      onStateUpdate(currentState);
    });
  }

  // 4. View Protocol Card -> Open Modal
  container.querySelectorAll('.js-view-protocol').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      if (id) {
        currentState.selectedId = id;
        currentState.activeTab = 'flowchart';
        onStateUpdate(currentState);
      }
    });
  });

  // 5. Close Modal
  container.querySelectorAll('.js-close-proto-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentState.selectedId = undefined;
      onStateUpdate(currentState);
    });
  });

  const modalOverlay = container.querySelector('.protocol-reader-modal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        currentState.selectedId = undefined;
        onStateUpdate(currentState);
      }
    });
  }

  // 6. Switch Tabs inside Modal
  container.querySelectorAll('.js-proto-tab').forEach(tabBtn => {
    tabBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const tab = tabBtn.getAttribute('data-tab') || 'flowchart';
      currentState.activeTab = tab;
      onStateUpdate(currentState);
    });
  });
}

