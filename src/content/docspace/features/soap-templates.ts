/**
 * DocSpace — Sổ Tay Bệnh Phòng SOAP Digital Templates
 * Path: src/content/docspace/features/soap-templates.ts
 */

import { 
  getAllSoapPatients, getSoapPatientById, saveSoapPatient, updateSoapPatient, deleteSoapPatient,
  getSoapSupabaseConfig, saveSoapSupabaseConfig, fetchAllSoapFromSupabase,
  addSoapDailyLog, switchSoapPatientDate, getProfile, getActiveProfile, saveSBAR, saveCase, getAllPatients,
  getChronicPatientById,
  safeStorageGet, safeStorageSet
} from '../storage';
import { SoapPatientRecord, SoapPrescriptionItem } from '../types';
import { renderSidebar, renderDocSpaceHeader, escapeHtml } from '../docspace-view';
import { generateSOAPSuggestion, generateDischargeSummary } from '../ai/llm-client';
import { icdPicker } from './icd-picker';
import { ebmBridge } from './ebm-bridge-view';
import { KHO_GUIDELINES_STATIC } from '../../ebm/guidelines/kho-guidelines-registry';
import { CLINICAL_CASES } from '../../basic-medical/quiz/patho-quiz-data';
import { drugPicker } from './drug-picker';
import { drugIntelligencePanel } from './drug-intelligence-panel';
import { clinicalReasoningPanel } from './clinical-reasoning-panel';
import { quickReferenceDrawer } from './quick-reference-drawer';
import { calculatorPicker } from './calculator-picker';
import { labDiagnosticsHub } from './lab-diagnostics-hub';
import { reactionChainDrawer } from './reaction-chain-drawer';
import { renderProtocolQuickApplyBtn, renderSoapToProtocolBtn, initSoapAiBridgeEvents } from './ai-soap-features';

export const ALERT_KEYWORDS = [
  'hạ kali', 'tụt kali', 'tăng kali',
  'creatinine tăng', 'troponin', 'spO2 giảm', 'sốt cao', 'huyết áp tụt',
  'nguy kịch', 'chống chỉ định', 'dương tính'
];

export function highlightAlerts(text: string): string {
  if (!text) return '<span style="color:var(--color-text-muted); font-style:italic;">Chưa có dữ liệu</span>';
  let safe = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  
  ALERT_KEYWORDS.forEach(kw => {
    const reg = new RegExp(`(${kw})`, 'gi');
    safe = safe.replace(reg, `<strong style="color:var(--color-danger); background:rgba(239,68,68,0.1); padding:2px 4px; border-radius:4px;">$1</strong>`);
  });
  return safe.replace(/\n/g, '<br>');
}

export function getMasterDate(): string {
  const today: string = new Date().toISOString().split('T')[0]!;
  return safeStorageGet('dsp_soap_master_date', today);
}

export function setMasterDate(dateStr: string): void {
  safeStorageSet('dsp_soap_master_date', dateStr);
}

export function getDayOfWeekName(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    return days[d.getDay()] || '';
  } catch {
    return '';
  }
}

export function renderRxItemsList(items: SoapPrescriptionItem[]): string {
  if (!items || items.length === 0) {
    return `<div class="rx-empty-msg" style="font-size:12px; color:var(--color-text-muted); font-style:italic; padding:6px 0;">Chưa có đơn thuốc có cấu trúc. Bấm <strong>"+ Kê thuốc từ Từ điển"</strong> ở trên để kê đơn.</div>`;
  }
  return items.map((item, idx) => `
    <div class="rx-item-row" data-id="${item.id || idx}">
      <div>
        <input type="text" class="js-rx-name dsp-input" value="${escapeHtml(item.name)}" style="font-size:11px; padding:2px 4px; font-weight:bold; width:100%;" />
        <input type="text" class="js-rx-dosage dsp-input" value="${escapeHtml(item.dosage || '')}" placeholder="Hàm lượng" style="font-size:10px; padding:2px 4px; color:var(--color-text-muted); width:100%; margin-top:2px;" />
      </div>
      <input type="text" class="js-rx-route dsp-input" value="${escapeHtml(item.route || 'Uống')}" placeholder="Đường dùng" style="font-size:11px; padding:2px 4px;" />
      <input type="text" class="js-rx-freq dsp-input" value="${escapeHtml(item.frequency || '')}" placeholder="Tần suất (VD: 1v x 2/ngày)" style="font-size:11px; padding:2px 4px;" />
      <input type="text" class="js-rx-qty dsp-input" value="${escapeHtml(item.quantity || '')}" placeholder="SL (VD: 10 viên)" style="font-size:11px; padding:2px 4px;" />
      <input type="text" class="js-rx-instr dsp-input" value="${escapeHtml(item.instructions || '')}" placeholder="Lời dặn (VD: Uống sau ăn)" style="font-size:11px; padding:2px 4px;" />
      <button type="button" class="js-remove-rx dsp-icon-btn dsp-icon-btn--danger" style="padding:2px;" title="Xóa thuốc">&times;</button>
    </div>
  `).join('');
}

export function printSinglePrescription(p: SoapPatientRecord): void {
  const printArea = document.getElementById('soapPrintArea');
  if (!printArea) return;

  const todayStr: string = p.activeDate || (new Date().toISOString().split('T')[0]!);
  const parts = todayStr.split('-');
  const dateStr = parts.length === 3 ? `Ngày ${parts[2]} tháng ${parts[1]} năm ${parts[0]}` : todayStr;

  const rxItems = p.prescriptions || [];
  let rxHtml = '';

  if (rxItems.length > 0) {
    rxHtml = rxItems.map((item, idx) => `
      <div style="margin-bottom:14px; font-size:13px; line-height:1.5;">
        <div style="font-weight:bold; display:flex; justify-content:space-between;">
          <span>${idx + 1}. ${escapeHtml(item.name)} ${item.dosage ? `(${escapeHtml(item.dosage)})` : ''}</span>
          <span style="font-weight:bold; margin-left:auto;">Số lượng: ${escapeHtml(item.quantity || '1')}</span>
        </div>
        <div style="padding-left:18px; color:#334155; font-style:italic; margin-top:2px;">
          • Cách dùng: ${item.route ? `${escapeHtml(item.route)}, ` : ''}${item.frequency ? `${escapeHtml(item.frequency)}. ` : ''}${item.instructions ? escapeHtml(item.instructions) : ''}
        </div>
      </div>
    `).join('');
  } else {
    rxHtml = `<div style="font-style:italic; color:#64748b; margin-bottom:20px; font-size:13px;">Không có đơn thuốc dạng danh sách có cấu trúc. Y lệnh chăm sóc: ${escapeHtml(p.pPlan || 'Chưa có')}</div>`;
  }

  printArea.innerHTML = `
    <div style="padding:40px; font-family: 'Times New Roman', Times, serif; color:#000; background:#fff; width:100%; max-width:800px; margin:0 auto; box-sizing:border-box;">
      <!-- Clinic Header -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:2px solid #000; padding-bottom:12px; margin-bottom:20px;">
        <div>
          <div style="font-size:15px; font-weight:bold; text-transform:uppercase;">CLINICPORTAL — HỆ THỐNG Y KHOA</div>
          <div style="font-size:12px; color:#475569; margin-top:2px;">Sổ tay Bệnh phòng SOAP Digital</div>
        </div>
        <div style="text-align:right; font-size:12px; color:#475569;">
          <div>Mã BN: <strong>${escapeHtml(p.medicalRecordNo || p.patientCode)}</strong></div>
          <div>Số Giường: <strong>${escapeHtml(p.bedNumber)}</strong></div>
        </div>
      </div>

      <!-- Title -->
      <div style="text-align:center; margin-bottom:24px;">
        <h2 style="margin:0; font-size:22px; font-weight:bold; font-family:Arial, sans-serif; text-transform:uppercase; letter-spacing:1px;">ĐƠN THUỐC</h2>
        <div style="font-size:12px; font-style:italic; color:#64748b; margin-top:2px;">(Kê đơn điện tử eRx)</div>
      </div>

      <!-- Patient Information -->
      <div style="font-size:13px; line-height:1.8; margin-bottom:20px; border:1px solid #cbd5e1; padding:12px 16px; border-radius:6px; background:#f8fafc;">
        <div style="display:flex; justify-content:space-between;">
          <span>Họ và tên bệnh nhân: <strong style="font-size:14px; text-transform:uppercase;">${escapeHtml(p.fullName)}</strong></span>
          <span>Tuổi: <strong>${p.age}</strong> &nbsp;|&nbsp; Giới tính: <strong>${p.gender === 'nam' ? 'Nam' : p.gender === 'nu' ? 'Nữ' : 'Khác'}</strong></span>
        </div>
        <div>Chẩn đoán: <strong>${escapeHtml(p.currentDiagnosis || p.admissionDiagnosis)}</strong></div>
      </div>

      <!-- Prescribed Drugs -->
      <div style="margin-bottom:30px; min-height:220px;">
        <div style="font-size:14px; font-weight:bold; font-style:italic; margin-bottom:12px; border-bottom:1px solid #e2e8f0; padding-bottom:4px;">
          Rx (Chỉ định dùng thuốc):
        </div>
        ${rxHtml}
      </div>

      <!-- Instructions & Signatures -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; font-size:13px; margin-top:40px; page-break-inside:avoid;">
        <div style="max-width:50%;">
          <div style="font-weight:bold; margin-bottom:4px;">Lời dặn của bác sĩ:</div>
          <div style="font-style:italic; color:#334155; line-height:1.5;">
            - Tái khám khi hết thuốc hoặc có dấu hiệu bất thường.<br>
            - Đóng gói và bảo quản thuốc ở nhiệt độ phòng.
          </div>
        </div>
        <div style="text-align:center; min-width:200px;">
          <div style="font-style:italic; margin-bottom:4px;">${dateStr}</div>
          <div style="font-weight:bold; text-transform:uppercase;">Bác sĩ kê đơn</div>
          <div style="height:60px;"></div>
          <div style="font-weight:bold; font-style:italic;">(Ký & ghi rõ họ tên)</div>
        </div>
      </div>
    </div>
  `;

  printArea.style.display = 'block';
  window.print();
  printArea.style.display = 'none';
}

export async function renderSoapView(profileId: string, activePatientId?: string): Promise<string> {
  const profile = getProfile(profileId);
  if (!profile) return '<div>Hồ sơ không tồn tại</div>';

  const masterDate = getMasterDate();
  const patients = getAllSoapPatients(profileId);
  const demographics = getAllPatients(profileId); // Lấy danh sách bệnh nhân OpenEMR

  // Sync activeDate for all patients to masterDate if available
  patients.forEach(p => {
    if (p.dailyLogs && p.dailyLogs.length > 0) {
      const match = p.dailyLogs.find(l => l.date === masterDate);
      if (match) {
        p.activeDate = masterDate;
        p.dayOfIllness = match.dayOfIllness;
        p.sNotes = match.sNotes;
        p.oNotes = match.oNotes;
        p.aAssessment = match.aAssessment;
        p.pPlan = match.pPlan;
        p.prescriptions = match.prescriptions;
        p.clsOrders = match.clsOrders;
        p.clsResults = match.clsResults;
        p.isEmrEntered = match.isEmrEntered;
        p.soapStatus = match.soapStatus;
      }
    }
  });

  const activePatient = activePatientId ? getSoapPatientById(profileId, activePatientId) : null;
  const sbConfig = getSoapSupabaseConfig();
  const isSbConnected = !!(sbConfig.url && sbConfig.key);

  const rowsHtml = patients.map(p => {
    const logs = p.dailyLogs || [];
    const activeDate = p.activeDate || (logs[logs.length - 1]?.date);

    const dateBadgesHtml = logs.map(l => {
      const isSelected = l.date === activeDate;
      const parts = l.date.split('-');
      const formattedDate = parts.length === 3 ? `${parts[2]}/${parts[1]}` : l.date;
      return `
        <button class="js-switch-date" data-id="${p.id}" data-date="${l.date}" 
          style="padding:3px 8px; border-radius:12px; font-size:11px; font-weight:600; cursor:pointer; transition:all 0.2s; border:1px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}; background:${isSelected ? 'var(--color-primary)' : 'var(--color-bg)'}; color:${isSelected ? '#fff' : 'var(--color-text)'};">
          ${formattedDate} (N${l.dayOfIllness})
        </button>
      `;
    }).join('');

    return `
      <div class="dsp-soap-card dsp-soap-row" data-patient-id="${p.id}">
        <!-- Card Header (Compact 1-row) -->
        <div class="dsp-soap-card-header">
          <div class="dsp-soap-patient-info">
            <div class="dsp-soap-patient-name">
              <span>${p.patientCode} - ${p.fullName}</span>
              <span style="font-size:10px; padding:1px 6px; border-radius:6px; font-weight:700; background:rgba(2,132,199,0.1); color:var(--color-primary); border:1px solid rgba(2,132,199,0.2);">
                G.${p.bedNumber}
              </span>
            </div>
            <div class="dsp-soap-patient-meta">
              <span>${p.age}t · ${p.gender === 'nam' ? 'Nam' : p.gender === 'nu' ? 'Nữ' : 'Khác'}</span>
              <span>· <strong>CĐ:</strong> ${p.admissionDiagnosis}</span>
            </div>
            ${p.demographicId && demographics.find(d => d.id === p.demographicId)?.allergies?.length ? `
              <div style="font-size: 10px; display: inline-flex; gap: 4px; margin-left: 4px;">
                ${demographics.find(d => d.id === p.demographicId)?.allergies?.map(a => `<span style="background: #fee2e2; color: #b91c1c; padding: 1px 5px; border-radius: 4px; font-weight: 600;"><i class="fa-solid fa-triangle-exclamation"></i> Dị ứng: ${a.allergen}</span>`).join('')}
              </div>
            ` : ''}
          </div>

          <div class="dsp-soap-header-actions">
            <!-- Ngày switcher -->
            <div class="dsp-soap-badges-row">
              <span style="font-size:10px; font-weight:700; color:var(--color-text-muted);"><i class="fa-solid fa-calendar-day"></i></span>
              ${dateBadgesHtml}
              <button class="js-add-date dsp-icon-btn" data-id="${p.id}" title="Thêm ngày diễn tiến mới" style="width:22px; height:22px; font-size:10px;">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
            
            <div class="dsp-soap-badges-row" style="border-left:1px solid var(--color-border); padding-left:6px; margin-left:4px;">
              <span style="font-size:10px; padding:2px 6px; border-radius:6px; font-weight:700; ${p.isEmrEntered ? 'background:#dcfce7; color:#15803d;' : 'background:#fef3c7; color:#b45309;'}" title="Trạng thái nhập EMR">
                ${p.isEmrEntered ? '✓ EMR' : '⏳ EMR'}
              </span>
              <span style="font-size:10px; padding:2px 6px; border-radius:6px; font-weight:700; ${p.soapStatus === 'da_lam' ? 'background:#e0f2fe; color:#0369a1;' : 'background:#f3f4f6; color:#4b5563;'}" title="Trạng thái làm SOAP">
                ${p.soapStatus === 'da_lam' ? '✓ SOAP' : '○ SOAP'}
              </span>

              <button class="dsp-icon-btn js-edit-soap" data-id="${p.id}" title="Chỉnh sửa SOAP & Kê đơn" style="color:var(--color-primary);">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="dsp-icon-btn js-print-rx" data-id="${p.id}" title="In Đơn Thuốc (eRx)" style="color:var(--color-text-muted);">
                <i class="fa-solid fa-print"></i>
              </button>
              <button class="dsp-icon-btn js-discharge-summary" data-id="${p.id}" title="Tạo Tóm tắt Bệnh án Ra viện (AI)" style="color:var(--color-info);">
                <i class="fa-solid fa-file-medical"></i>
              </button>
              ${renderSoapToProtocolBtn(p.id)}
              <button class="dsp-icon-btn js-toggle-emr" data-id="${p.id}" title="Đổi trạng thái EMR (Đã xong / Chưa xong)">
                <i class="fa-solid fa-arrows-rotate"></i>
              </button>
              <button class="dsp-icon-btn dsp-icon-btn--danger js-delete-patient" data-id="${p.id}" title="Xóa hồ sơ bệnh nhân">
                <i class="fa-solid fa-trash-can"></i>
              </button>
              <button class="dsp-icon-btn js-toggle-row-collapse" data-id="${p.id}" title="Thu gọn / Mở rộng card này" style="background:var(--color-bg);">
                <i class="fa-solid fa-chevron-up"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Card Body -->
        <div class="dsp-soap-card-body">
          <!-- S&O -->
          <div class="dsp-soap-col">
            <div class="dsp-soap-col-title">Diễn biến (S & O)</div>
            <div class="dsp-soap-col-content">
              <div style="margin-bottom:8px;">
                <strong style="color:var(--color-primary);">S:</strong><br>
                ${highlightAlerts(p.sNotes)}
              </div>
              <div>
                <strong style="color:var(--color-primary);">O:</strong><br>
                ${highlightAlerts(p.oNotes)}
              </div>
            </div>
          </div>

          <!-- CLS -->
          <div class="dsp-soap-col">
            <div class="dsp-soap-col-title">CLS Cần làm & Kết quả</div>
            <div class="dsp-soap-col-content">
              <div style="margin-bottom:12px;">
                <div style="font-size:11px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase; margin-bottom:4px;">Chỉ định:</div>
                <div style="display:flex; flex-direction:column; gap:6px;">
                  ${(p.clsOrders || []).map(o => `
                    <label style="display:flex; align-items:center; gap:6px; font-size:12px; cursor:pointer;">
                      <input type="checkbox" class="js-cls-order-toggle" data-patient="${p.id}" data-order="${o.id}" ${o.isDone ? 'checked' : ''} />
                      <span style="${o.isDone ? 'text-decoration:line-through; opacity:0.6;' : ''}">${o.name}</span>
                    </label>
                  `).join('') || '<span style="font-size:12px; color:var(--color-text-muted); font-style:italic;">Chưa có chỉ định</span>'}
                </div>
              </div>

              <div>
                <div style="font-size:11px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase; margin-bottom:4px;">Kết quả:</div>
                <div style="display:flex; flex-direction:column; gap:6px;">
                  ${(p.clsResults || []).map(r => `
                    <div style="font-size:12px; padding:6px 8px; border-radius:6px; line-height:1.4; ${r.alertLevel !== 'normal' ? 'background:rgba(239,68,68,0.1); color:var(--color-danger); font-weight:600;' : 'background:var(--color-bg); border:1px solid var(--color-border);'}">
                      • ${r.text}
                    </div>
                  `).join('') || '<span style="font-size:12px; color:var(--color-text-muted); font-style:italic;">Chưa có KQ</span>'}
                </div>
              </div>
            </div>
          </div>

          <!-- A (Đánh giá) -->
          <div class="dsp-soap-col">
            <div class="dsp-soap-col-title">A (Đánh giá)</div>
            <div class="dsp-soap-col-content">
              <div style="font-size:11px; font-weight:700; color:var(--color-primary); margin-bottom:6px;">Ngày bệnh: N${p.dayOfIllness} (${p.activeDate || 'Hôm nay'})</div>
              ${highlightAlerts(p.aAssessment)}
            </div>
          </div>

          <!-- P (Y lệnh) -->
          <div class="dsp-soap-col">
            <div class="dsp-soap-col-title">P (Y lệnh & Đơn thuốc)</div>
            <div class="dsp-soap-col-content">
              ${p.prescriptions && p.prescriptions.length > 0 ? `
                <div style="margin-bottom:8px; background:var(--color-bg); padding:8px; border-radius:6px; border:1px solid var(--color-border);">
                  <div style="font-size:10px; font-weight:700; color:var(--color-primary); text-transform:uppercase; margin-bottom:4px; display:flex; justify-content:space-between; align-items:center;">
                    <span><i class="fa-solid fa-capsules"></i> Đơn thuốc (eRx):</span>
                    <button class="js-print-rx dsp-btn dsp-btn-sm dsp-btn-ghost" data-id="${p.id}" style="padding:0 4px; font-size:10px; color:var(--color-primary); min-height:0; height:auto;">
                      <i class="fa-solid fa-print"></i> In đơn
                    </button>
                  </div>
                  ${p.prescriptions.map(rx => `
                    <div style="font-size:11px; margin-bottom:4px; line-height:1.3; border-bottom:1px dashed var(--color-border); padding-bottom:3px;">
                      <strong>${escapeHtml(rx.name)}</strong> ${rx.dosage ? `(${escapeHtml(rx.dosage)})` : ''} — <span style="font-weight:600;">SL: ${escapeHtml(rx.quantity || '1')}</span>
                      <div style="color:var(--color-text-muted); font-size:10px;">${rx.route ? rx.route + ' · ' : ''}${rx.frequency || ''} ${rx.instructions ? '(' + rx.instructions + ')' : ''}</div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}
              ${highlightAlerts(p.pPlan)}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <style>
      @media print {
        body * { visibility: hidden !important; }
        #soapPrintArea, #soapPrintArea * { visibility: visible !important; }
        #soapPrintArea { position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; }
      }
    </style>

    <div class="dsp-layout" id="dspLayout">
      ${renderSidebar(profile, 'soap')}

      <main class="dsp-main" id="dspMain">
        ${renderDocSpaceHeader(profile, 'soap')}
        <div class="dsp-page-content" style="max-width:100%;">
          
          <!-- Compact Toolbar Bar (Thay cho Hero Header to tướng) -->
          <div class="dsp-hero-header" style="padding:8px 16px; margin-bottom:12px; border-radius:10px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <h1 class="dsp-hero-title" style="font-size:1.05rem; margin:0; display:flex; align-items:center; gap:6px;">
                <i class="fa-solid fa-notes-medical" style="color:var(--color-primary);"></i> Sổ Tay Bệnh Phòng
              </h1>
              <span class="dsp-badge" style="font-size:11px; background:rgba(2,132,199,0.1); color:var(--color-primary); font-weight:700;">
                ${patients.length} BN
              </span>
            </div>
            
            <div class="dsp-hero-actions" style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
              <!-- CHỌN NGÀY CHÍNH (MASTER DATE SELECTOR) -->
              <div style="display:flex; align-items:center; background:var(--color-surface); border:1px solid var(--color-border); border-radius:6px; padding:3px 8px; gap:6px; box-shadow:0 1px 2px rgba(0,0,0,0.03);">
                <i class="fa-solid fa-calendar-day" style="color:var(--color-primary); font-size:12px;"></i>
                <span style="font-size:11px; font-weight:700; color:var(--color-text-muted);">NGÀY:</span>
                <input type="date" id="masterDateSelect" value="${masterDate}" style="border:none; background:transparent; font-size:12px; font-weight:700; color:var(--color-primary); cursor:pointer; outline:none; padding:0;" />
              </div>

              <!-- NÚT THU GỌN TẤT CẢ -->
              <button class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnToggleCollapseAll" title="Thu gọn / Mở rộng tất cả bệnh nhân" style="font-size:11px; padding:4px 8px;">
                <i class="fa-solid fa-up-right-and-down-left-from-center"></i> <span>Thu gọn</span>
              </button>

              <!-- NÚT IN PHIẾU THEO DÕI -->
              <button class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnPrintAllSoap" title="In Phiếu Theo Dõi Toàn Khoa" style="font-size:11px; padding:4px 8px;">
                <i class="fa-solid fa-print"></i> <span>In phiếu</span>
              </button>

              <button class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnSupabaseModal" title="Cấu hình Supabase Cloud Sync" style="font-size:11px; padding:4px 8px;">
                <i class="fa-solid fa-cloud" style="color:${isSbConnected ? '#10b981' : '#94a3b8'};"></i>
                <span>${isSbConnected ? 'Đã sync' : 'Sync'}</span>
              </button>

              <a href="#/docspace/chronic-care" class="dsp-btn dsp-btn-sm dsp-btn-ghost" title="Mở Bảng Điều Khiển Bệnh Mạn Tính & Ngoại Trú" style="font-size:11px; padding:4px 8px; color:#ef4444;">
                <i class="fa-solid fa-heart-pulse"></i> <span>Bệnh Mạn Tính</span>
              </a>

              <button class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnExistingPatient" title="Lấy bệnh nhân từ danh sách nội trú" style="font-size:11px; padding:4px 8px;">
                <i class="fa-solid fa-bed-pulse"></i> <span>Nội trú</span>
              </button>

              <button class="dsp-btn dsp-btn-sm dsp-btn-primary" id="btnNewPatient" title="Nhận bệnh nhân mới vào sổ tay" style="font-size:11px; padding:4px 10px;">
                <i class="fa-solid fa-plus"></i> <span>Nhận Bệnh</span>
              </button>
            </div>
          </div>

          <!-- Danh sách Bệnh nhân SOAP (Card Layout) -->
          <div class="dsp-soap-list">
            ${rowsHtml.length > 0 ? rowsHtml : `
              <div class="dsp-empty-state dsp-empty-state--lg" style="background:var(--color-surface); border:1px dashed var(--color-border); border-radius:12px;">
                <i class="fa-solid fa-notes-medical" style="color:var(--color-border);"></i>
                <h3>Chưa có bệnh nhân nào trong sổ tay</h3>
                <p>Bấm <strong>"Nhận Bệnh Mới"</strong> hoặc <strong>"Bệnh Nội Trú"</strong> ở góc trên để bắt đầu lập hồ sơ SOAP.</p>
              </div>
            `}
          </div>

        </div>
      </main>
    </div>

    <!-- Container In Phiếu Theo Dõi Bệnh Nhân (@media print) -->
    <div id="soapPrintArea" style="display:none;"></div>

    <!-- Modal Form Nhận Bệnh -->
    <div id="modalNewPatient" style="display:none; position:fixed; inset:0; z-index:1050; background:rgba(15,23,42,0.65); backdrop-filter:blur(4px); align-items:center; justify-content:center; padding:20px;">
      <div style="background:var(--color-surface); border-radius:12px; max-width:500px; width:100%; padding:24px; box-shadow:0 10px 25px rgba(0,0,0,0.2);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <h3 id="modalNewPatientTitle" style="margin:0; font-size:18px;"><i class="fa-solid fa-user-plus"></i> Nhận Bệnh Mới Vào Khoa</h3>
          <button id="btnCloseNewPatientModal" style="background:none; border:none; font-size:20px; cursor:pointer; color:var(--color-text-muted);">&times;</button>
        </div>
        <form id="formNewPatient">
          <div style="margin-bottom:12px;">
            <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Chọn từ Hồ sơ Bệnh nhân (OpenEMR)</label>
            <select id="npDemographicId" class="dsp-input" style="width:100%; border-color:var(--color-primary);">
              <option value="">-- Nhập mới hoàn toàn --</option>
              ${demographics.map(d => `<option value="${d.id}" data-code="${d.medicalRecordNo}" data-name="${d.fullName}" data-gender="${d.gender}" data-dob="${d.dob || ''}">${d.medicalRecordNo} - ${d.fullName}</option>`).join('')}
            </select>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
            <div>
              <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Mã BN / Ký hiệu *</label>
              <input type="text" id="npCode" required placeholder="VD: G01" class="dsp-input" style="width:100%;" />
            </div>
            <div>
              <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Số Giường *</label>
              <input type="text" id="npBed" required placeholder="VD: 12" class="dsp-input" style="width:100%;" />
            </div>
          </div>
          <div style="margin-bottom:12px;">
            <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Họ và Tên *</label>
            <input type="text" id="npName" required placeholder="VD: Nguyễn Văn A" class="dsp-input" style="width:100%;" />
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
            <div>
              <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Tuổi *</label>
              <input type="number" id="npAge" required placeholder="VD: 65" class="dsp-input" style="width:100%;" />
            </div>
            <div>
              <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Giới tính</label>
              <select id="npGender" class="dsp-input" style="width:100%;">
                <option value="nam">Nam</option>
                <option value="nu">Nữ</option>
                <option value="khac">Khác</option>
              </select>
            </div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
            <div>
              <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Số Bệnh Án</label>
              <input type="text" id="npMedicalNo" placeholder="VD: HS-10293" class="dsp-input" style="width:100%;" />
            </div>
            <div>
              <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Ngày Bệnh (N) *</label>
              <input type="number" id="npDayOfIllness" required placeholder="VD: 1" class="dsp-input" style="width:100%;" value="1" />
            </div>
          </div>
          <div style="margin-bottom:16px;">
            <label style="font-size:12px; font-weight:700; display:block; margin-bottom:4px;">Mã ICD-10 & Chẩn Đoán Vào Khoa *</label>
            <input type="text" id="npDiagnosis" required placeholder="Gõ tìm mã bệnh (VD: Suy tim, I50...)" class="dsp-input" style="width:100%;" />
          </div>
          <div style="display:flex; justify-content:flex-end; gap:8px;">
            <button type="button" id="btnCancelNewPatient" class="dsp-btn dsp-btn-ghost">Hủy</button>
            <button type="submit" class="dsp-btn dsp-btn-primary">Lưu Bệnh Nhân</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Cấu Hình Supabase Cloud -->
    <div id="modalSupabase" style="display:none; position:fixed; inset:0; z-index:1050; background:rgba(15,23,42,0.65); backdrop-filter:blur(4px); align-items:center; justify-content:center; padding:20px;">
      <div style="background:var(--color-surface); border-radius:12px; max-width:600px; width:100%; padding:24px; box-shadow:0 10px 25px rgba(0,0,0,0.2);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <h3 style="margin:0; font-size:18px; color:var(--color-primary);"><i class="fa-solid fa-cloud"></i> Cấu Hình Đồng Bộ Supabase Cloud</h3>
          <button id="btnCloseSupabaseModal" style="background:none; border:none; font-size:20px; cursor:pointer; color:var(--color-text-muted);">&times;</button>
        </div>
        <form id="formSupabase">
          <div style="margin-bottom:12px;">
            <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Supabase Project URL *</label>
            <input type="url" id="sbUrl" required placeholder="https://xxxxxxxx.supabase.co" class="dsp-input" style="width:100%;" value="${sbConfig.url}" />
          </div>
          <div style="margin-bottom:12px;">
            <label style="font-size:12px; font-weight:600; display:block; margin-bottom:4px;">Supabase Anon API Key *</label>
            <input type="password" id="sbKey" required placeholder="eyJhbGciOiJIUzI1NiIsInR..." class="dsp-input" style="width:100%;" value="${sbConfig.key}" />
          </div>

          <div style="background:var(--color-bg); padding:12px; border-radius:8px; border:1px solid var(--color-border); margin-bottom:16px; font-size:12px;">
            <strong> Hướng dẫn khởi tạo Bảng Supabase:</strong>
            <p style="margin:4px 0 8px 0; color:var(--color-text-muted);">Mở <em>SQL Editor</em> trên Supabase Dashboard và dán câu lệnh sau:</p>
            <pre style="background:#1e293b; color:#f8fafc; padding:8px; border-radius:6px; font-size:11px; overflow-x:auto;">CREATE TABLE IF NOT EXISTS soap_patients (
  id TEXT PRIMARY KEY,
  doctor_id TEXT,
  patient_code TEXT,
  full_name TEXT,
  data JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE soap_patients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON soap_patients FOR ALL USING (true);</pre>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center;">
            <button type="button" id="btnSyncFromCloud" class="dsp-btn dsp-btn-ghost" style="color:var(--color-primary);">
              <i class="fa-solid fa-cloud-arrow-down"></i> Tải dữ liệu từ Cloud về
            </button>

            <div style="display:flex; gap:8px;">
              <button type="button" id="btnCancelSupabase" class="dsp-btn dsp-btn-ghost">Hủy</button>
              <button type="submit" class="dsp-btn dsp-btn-primary">Lưu & Đồng Bộ</button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Chọn Bệnh Nhân In Phiếu Theo Dõi -->
    <div id="modalPrintOptions" style="display:none; position:fixed; inset:0; z-index:1050; background:rgba(15,23,42,0.65); backdrop-filter:blur(4px); align-items:center; justify-content:center; padding:20px;">
      <div style="background:var(--color-surface); border-radius:12px; max-width:550px; width:100%; padding:24px; box-shadow:0 10px 25px rgba(0,0,0,0.2);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <h3 style="margin:0; font-size:18px; color:var(--color-primary);"><i class="fa-solid fa-print"></i> Chọn Bệnh Nhân In Phiếu Theo Dõi</h3>
          <button id="btnClosePrintModal" style="background:none; border:none; font-size:20px; cursor:pointer; color:var(--color-text-muted);">&times;</button>
        </div>
        
        <div style="margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; background:var(--color-bg); padding:10px 14px; border-radius:8px; border:1px solid var(--color-border);">
          <label style="font-size:13px; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:8px;">
            <input type="checkbox" id="chkPrintSelectAll" checked />
            <span>Chọn tất cả bệnh nhân (${patients.length})</span>
          </label>
          <span style="font-size:12px; font-weight:600; color:var(--color-primary);">Ngày: ${masterDate}</span>
        </div>

        <div style="max-height:280px; overflow-y:auto; border:1px solid var(--color-border); border-radius:8px; padding:8px; margin-bottom:16px; display:flex; flex-direction:column; gap:6px;">
          ${patients.map(p => `
            <label style="display:flex; align-items:center; justify-content:space-between; padding:8px 12px; border-radius:6px; background:var(--color-bg); cursor:pointer;">
              <div style="display:flex; align-items:center; gap:10px;">
                <input type="checkbox" class="js-print-patient-chk" value="${p.id}" checked />
                <span style="font-weight:700; font-size:13px;">${p.patientCode} - ${p.fullName}</span>
              </div>
              <span style="font-size:12px; color:var(--color-text-muted);">Giường ${p.bedNumber}</span>
            </label>
          `).join('')}
        </div>

        <div style="display:flex; justify-content:flex-end; gap:8px;">
          <button type="button" id="btnCancelPrintModal" class="dsp-btn dsp-btn-ghost">Hủy</button>
          <button type="button" id="btnConfirmPrintModal" class="dsp-btn dsp-btn-primary">
            <i class="fa-solid fa-print"></i> In Phiếu Theo Dõi
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Edit SOAP Bệnh Nhân -->
    <div id="modalEditSoap" style="display:${activePatient ? 'flex' : 'none'}; position:fixed; inset:0; z-index:1050; background:rgba(15,23,42,0.65); backdrop-filter:blur(4px); align-items:center; justify-content:center; padding:20px;">
      ${activePatient ? renderEditSoapModalContent(activePatient) : ''}
    </div>
  `;
}

export function renderEditSoapModalContent(p: SoapPatientRecord): string {
  const logs = p.dailyLogs || [];
  const activeDate = p.activeDate || (logs[logs.length - 1]?.date);

  const dateBadgesHtml = logs.map(l => {
    const isSelected = l.date === activeDate;
    const parts = l.date.split('-');
    const formattedDate = parts.length === 3 ? `${parts[2]}/${parts[1]}` : l.date;
    return `
      <button type="button" class="js-modal-switch-date" data-id="${p.id}" data-date="${l.date}" 
        style="padding:3px 10px; border-radius:12px; font-size:12px; font-weight:600; cursor:pointer; border:1px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}; background:${isSelected ? 'var(--color-primary)' : 'var(--color-bg)'}; color:${isSelected ? '#fff' : 'var(--color-text)'};">
        ${formattedDate} (N${l.dayOfIllness})
      </button>
    `;
  }).join('');

  return `
    <div style="background:var(--color-surface); border-radius:14px; max-width:920px; width:100%; max-height:92vh; display:flex; flex-direction:column; box-shadow:0 20px 60px rgba(0,0,0,0.25); overflow:hidden; position:relative;">
      
      <!-- Modal Header -->
      <div style="padding:12px 20px; border-bottom:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; background:linear-gradient(135deg,rgba(2,132,199,0.06),rgba(14,165,233,0.02)); flex-shrink:0;">
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg,var(--color-primary),#0ea5e9); display:flex; align-items:center; justify-content:center; flex-shrink:0; box-shadow:0 3px 8px rgba(2,132,199,0.3);">
            <i class="fa-solid fa-notes-medical" style="color:#fff; font-size:15px;"></i>
          </div>
          <div>
            <h3 style="margin:0; font-size:15px; font-weight:800; color:var(--color-primary); line-height:1.2;">${escapeHtml(p.patientCode)} – ${escapeHtml(p.fullName)}</h3>
            <div style="font-size:11px; color:var(--color-text-muted); margin-top:2px; display:flex; align-items:center; gap:8px;">
              <span>${p.age}t · ${p.gender === 'nam' ? 'Nam' : 'Nữ'}</span>
              <span style="width:3px; height:3px; border-radius:50%; background:var(--color-border); display:inline-block;"></span>
              <span>Giường <strong style="color:var(--color-text);">${escapeHtml(p.bedNumber)}</strong></span>
              <span style="width:3px; height:3px; border-radius:50%; background:var(--color-border); display:inline-block;"></span>
              <span>HS: ${escapeHtml(p.medicalRecordNo || p.patientCode)}</span>
            </div>
          </div>
        </div>
        <button id="btnCloseEditSoapModal" style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; width:30px; height:30px; font-size:18px; cursor:pointer; color:var(--color-text-muted); display:flex; align-items:center; justify-content:center; transition:all 0.2s; flex-shrink:0;">&times;</button>
      </div>

      <!-- Date Selector Bar -->
      <div style="padding:6px 20px; background:var(--color-bg); border-bottom:1px solid var(--color-border); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px; flex-shrink:0;">
        <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
          <span style="font-size:11px; font-weight:700; color:var(--color-text-muted); display:flex; align-items:center; gap:4px; text-transform:uppercase; letter-spacing:0.04em;">
            <i class="fa-solid fa-calendar-day" style="color:var(--color-primary);"></i> Ngày:
          </span>
          ${dateBadgesHtml}
        </div>
        <button type="button" id="btnModalAddDate" data-id="${p.id}" class="dsp-btn dsp-btn-sm dsp-btn-ghost" style="color:var(--color-primary); border:1.5px dashed var(--color-primary); border-radius:6px; font-size:11px; padding:3px 8px;">
          <i class="fa-solid fa-plus-circle"></i> + Thêm Ngày Diễn Tiến
        </button>
      </div>

      <!-- Smart Clinical Action Header (Thanh Công Cụ Chuyên Môn Thông Minh) -->
      <div class="dsp-soap-smart-toolbar" style="padding:6px 20px; background:var(--color-surface); border-bottom:1px solid var(--color-border); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px; flex-shrink:0;">
        <div style="display:flex; gap:5px; align-items:center; flex-wrap:wrap;">
          <span style="font-size:10px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase; margin-right:2px;">Chẩn đoán:</span>
          <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnIcdSoap" style="color:#0284c7; padding:2px 7px; font-size:11px;" title="Tra cứu mã ICD-10">
            <i class="fa-solid fa-list-ol"></i> ICD-10
          </button>
          <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnScoreSoap" style="color:#d97706; padding:2px 7px; font-size:11px;" title="Mở Thang điểm Lâm sàng (SOFA, CURB65, TIMI...)">
            <i class="fa-solid fa-calculator"></i> Thang điểm
          </button>
          <button type="button" class="dsp-btn dsp-btn-sm" id="btnReactionChainSoap" style="background:linear-gradient(135deg, #0284c7, #6366f1); color:#fff; padding:2px 9px; font-size:11px; font-weight:700; border:none; border-radius:6px;" title="Kích hoạt Chuỗi Phản Ứng Lâm Sàng">
            <i class="fa-solid fa-link"></i> Chuỗi CRCE
          </button>
          <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnVaultKnowledgeSoap" style="color:var(--color-primary); padding:2px 7px; font-size:11px;" title="Kho Tri Thức Vault (2.330+ Bài)">
            <i class="fa-solid fa-graduation-cap"></i> Vault Tri thức
          </button>
        </div>

        <div style="display:flex; gap:5px; align-items:center; flex-wrap:wrap;">
          <span style="font-size:10px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase; margin-right:2px;">Dược &amp; CLS:</span>
          <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnDrugIntelSoap" style="color:#e11d48; padding:2px 7px; font-size:11px;" title="Tra cứu Dược thư &amp; Tương tác thuốc">
            <i class="fa-solid fa-capsules"></i> Drug Intel
          </button>
          <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnOpenLabFromO" style="color:#059669; padding:2px 7px; font-size:11px;" title="Kho Cận lâm sàng &amp; Bắt cờ đỏ">
            <i class="fa-solid fa-flask-vial"></i> Tra cứu CLS
          </button>
          <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnQuickRefSoap" style="color:#7c3aed; padding:2px 7px; font-size:11px;" title="Cẩm nang Giường bệnh &amp; Công thức">
            <i class="fa-solid fa-bolt"></i> Tra cứu nhanh
          </button>
        </div>
      </div>

      <!-- Scrollable Body -->
      <div style="padding:14px 20px; overflow-y:auto; flex:1; display:flex; flex-direction:column; gap:10px;">
        <form id="formEditSoap">
          <input type="hidden" id="esPatientId" value="${p.id}" />

          <!-- Thông tin hành chính (collapsible) -->
          <details style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; overflow:hidden; margin-bottom:2px;">
            <summary style="font-size:11.5px; font-weight:700; color:var(--color-primary); cursor:pointer; user-select:none; display:flex; align-items:center; justify-content:space-between; padding:8px 12px; list-style:none;">
              <span style="display:flex; align-items:center; gap:6px;"><i class="fa-solid fa-id-card"></i> Thông tin hành chính &amp; Chẩn đoán vào viện</span>
              <span style="font-size:10px; color:var(--color-text-muted); font-weight:normal; background:var(--color-surface); padding:1px 6px; border-radius:6px; border:1px solid var(--color-border);">Mở rộng</span>
            </summary>
            <div style="padding:10px 12px; border-top:1px solid var(--color-border);">
              <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; margin-bottom:8px;">
                <div>
                  <label style="font-size:11px; font-weight:600; display:block; margin-bottom:2px; color:var(--color-text-muted);">Mã BN / Ký hiệu *</label>
                  <input type="text" id="esPatientCode" value="${escapeHtml(p.patientCode || '')}" required class="dsp-input" style="width:100%; font-size:12px;" />
                </div>
                <div>
                  <label style="font-size:11px; font-weight:600; display:block; margin-bottom:2px; color:var(--color-text-muted);">Số Giường *</label>
                  <input type="text" id="esBedNumber" value="${escapeHtml(p.bedNumber || '')}" required class="dsp-input" style="width:100%; font-size:12px;" />
                </div>
                <div>
                  <label style="font-size:11px; font-weight:600; display:block; margin-bottom:2px; color:var(--color-text-muted);">Họ và Tên *</label>
                  <input type="text" id="esFullName" value="${escapeHtml(p.fullName || '')}" required class="dsp-input" style="width:100%; font-size:12px;" />
                </div>
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; margin-bottom:8px;">
                <div>
                  <label style="font-size:11px; font-weight:600; display:block; margin-bottom:2px; color:var(--color-text-muted);">Tuổi *</label>
                  <input type="number" id="esAge" value="${p.age || 0}" required class="dsp-input" style="width:100%; font-size:12px;" />
                </div>
                <div>
                  <label style="font-size:11px; font-weight:600; display:block; margin-bottom:2px; color:var(--color-text-muted);">Giới tính</label>
                  <select id="esGender" class="dsp-input" style="width:100%; font-size:12px;">
                    <option value="nam" ${p.gender === 'nam' ? 'selected' : ''}>Nam</option>
                    <option value="nu" ${p.gender === 'nu' ? 'selected' : ''}>Nữ</option>
                    <option value="khac" ${p.gender === 'khac' ? 'selected' : ''}>Khác</option>
                  </select>
                </div>
                <div>
                  <label style="font-size:11px; font-weight:600; display:block; margin-bottom:2px; color:var(--color-text-muted);">Số Bệnh Án</label>
                  <input type="text" id="esMedicalRecordNo" value="${escapeHtml(p.medicalRecordNo || '')}" class="dsp-input" style="width:100%; font-size:12px;" />
                </div>
              </div>
              <div>
                <label style="font-size:11px; font-weight:600; display:block; margin-bottom:2px; color:var(--color-text-muted);">Chẩn đoán vào khoa *</label>
                <input type="text" id="esAdmissionDiagnosis" value="${escapeHtml(p.admissionDiagnosis || '')}" required class="dsp-input" style="width:100%; font-size:12px;" />
              </div>
            </div>
          </details>

          <!-- 💡 Trung Tâm Hỗ Trợ Lâm Sàng & AI Co-Pilot Hợp Nhất (Unified Clinical Intelligence Hub) -->
          <div id="soapUnifiedInsightContainer" style="display:none; background:var(--color-surface); border:1px solid var(--color-border); border-left:4px solid var(--color-primary); border-radius:8px; padding:10px 14px; margin-bottom:6px; box-shadow:0 2px 6px rgba(0,0,0,0.03);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:6px;">
              <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                <span style="font-size:11.5px; font-weight:800; color:var(--color-primary); display:flex; align-items:center; gap:5px;">
                  <i class="fa-solid fa-brain"></i> Trung Tâm Phân Tích Thông Minh
                </span>
                <div style="display:inline-flex; background:var(--color-bg); border-radius:6px; padding:2px; gap:2px;">
                  <button type="button" class="dsp-insight-tab-btn is-active" data-target="tabAiCoPilot" style="font-size:10px; font-weight:700; padding:2px 7px; border:none; border-radius:4px; background:var(--color-surface); color:var(--color-primary); cursor:pointer;">
                    <i class="fa-solid fa-robot"></i> Trợ lý AI
                  </button>
                  <button type="button" class="dsp-insight-tab-btn" data-target="tabEbmGuideline" style="font-size:10px; font-weight:700; padding:2px 7px; border:none; border-radius:4px; background:transparent; color:var(--color-text-muted); cursor:pointer;">
                    <i class="fa-solid fa-scale-balanced"></i> Khuyến cáo EBM
                  </button>
                  <button type="button" class="dsp-insight-tab-btn" data-target="tabVaultKnowledge" style="font-size:10px; font-weight:700; padding:2px 7px; border:none; border-radius:4px; background:transparent; color:var(--color-text-muted); cursor:pointer;">
                    <i class="fa-solid fa-graduation-cap"></i> Bài giảng Vault
                  </button>
                </div>
              </div>
              <div style="display:flex; align-items:center; gap:6px;">
                <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-primary" id="btnApplyAiSuggestion" style="font-size:10px; padding:2px 8px;">
                  <i class="fa-solid fa-check"></i> Áp dụng vào form
                </button>
                <button type="button" class="dsp-icon-btn" id="btnCloseUnifiedInsight" style="width:22px; height:22px; font-size:12px;" title="Thu gọn">&times;</button>
              </div>
            </div>

            <!-- Tab 1: AI Co-Pilot -->
            <div id="tabAiCoPilot" class="dsp-insight-tab-pane">
              <div id="soapAiSuggestionText" style="font-size:12px; line-height:1.5; color:var(--color-text); white-space:pre-wrap; max-height:160px; overflow-y:auto;">
                ⚡ Chưa có yêu cầu AI. Nhấn nút <strong>✨ AI</strong> ở góc ô S, O, A, P để nhận gợi ý phân tích.
              </div>
            </div>

            <!-- Tab 2: EBM Guidelines -->
            <div id="tabEbmGuideline" class="dsp-insight-tab-pane" style="display:none;">
              <div id="soapEbmContextBar">
                <span style="font-size:11px; color:var(--color-text-muted); font-style:italic;">Chưa phát hiện khuyến cáo EBM tương ứng.</span>
              </div>
            </div>

            <!-- Tab 3: Vault Knowledge -->
            <div id="tabVaultKnowledge" class="dsp-insight-tab-pane" style="display:none;">
              <div id="soapVaultContextBar">
                <span style="font-size:11px; color:var(--color-text-muted); font-style:italic;">Nhập chẩn đoán hoặc đánh giá để xem các bài giảng liên quan trong Vault.</span>
              </div>
            </div>
          </div>

          <!-- S & O — 2 cột Bento Grid -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <!-- S -->
            <div style="background:var(--color-bg); border:1px solid rgba(2,132,199,0.25); border-radius:8px; overflow:hidden;">
              <div style="padding:6px 12px; background:linear-gradient(135deg,rgba(2,132,199,0.08),rgba(14,165,233,0.03)); border-bottom:1px solid rgba(2,132,199,0.15); display:flex; align-items:center; justify-content:space-between;">
                <label style="font-size:11.5px; font-weight:700; color:var(--color-text); display:flex; align-items:center; gap:5px; margin:0;">
                  <span style="background:var(--color-primary); color:#fff; font-size:10px; font-weight:800; width:16px; height:16px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0;">S</span>
                  <span>Triệu chứng cơ năng</span>
                </label>
                <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost js-ai-suggest" data-field="subjective" style="color:var(--color-primary); padding:1px 5px; font-size:10px; height:auto; min-height:0;" title="Trợ lý AI gợi ý S">
                  <i class="fa-solid fa-wand-magic-sparkles"></i> AI
                </button>
              </div>
              <div style="padding:8px 12px;">
                <textarea id="esSNotes" rows="3" class="dsp-input" style="width:100%; font-size:12.5px; line-height:1.45; resize:vertical; border:none; background:transparent; padding:0;" placeholder="Triệu chứng chủ quan, lý do than phiền...">${escapeHtml(p.sNotes || '')}</textarea>
              </div>
            </div>

            <!-- O -->
            <div style="background:var(--color-bg); border:1px solid rgba(14,165,233,0.25); border-radius:8px; overflow:hidden;">
              <div style="padding:6px 12px; background:linear-gradient(135deg,rgba(14,165,233,0.08),rgba(56,189,248,0.03)); border-bottom:1px solid rgba(14,165,233,0.15); display:flex; align-items:center; justify-content:space-between;">
                <label style="font-size:11.5px; font-weight:700; color:var(--color-text); display:flex; align-items:center; gap:5px; margin:0;">
                  <span style="background:#0ea5e9; color:#fff; font-size:10px; font-weight:800; width:16px; height:16px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0;">O</span>
                  <span>Thăm khám &amp; Cận lâm sàng</span>
                </label>
                <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost js-ai-suggest" data-field="objective" style="color:#0ea5e9; padding:1px 5px; font-size:10px; height:auto; min-height:0;" title="Trợ lý AI gợi ý O">
                  <i class="fa-solid fa-wand-magic-sparkles"></i> AI
                </button>
              </div>
              <div style="padding:8px 12px;">
                <textarea id="esONotes" rows="3" class="dsp-input" style="width:100%; font-size:12.5px; line-height:1.45; resize:vertical; border:none; background:transparent; padding:0;" placeholder="Dấu hiệu sinh tồn, khám thực thể...">${escapeHtml(p.oNotes || '')}</textarea>
              </div>
            </div>
          </div>

          <!-- A — Assessment -->
          <div style="background:var(--color-bg); border:1px solid rgba(245,158,11,0.3); border-radius:8px; overflow:hidden;">
            <div style="padding:6px 12px; background:linear-gradient(135deg,rgba(245,158,11,0.08),rgba(251,191,36,0.02)); border-bottom:1px solid rgba(245,158,11,0.2); display:flex; align-items:center; justify-content:space-between;">
              <div style="display:flex; align-items:center; gap:5px;">
                <span style="background:#f59e0b; color:#fff; font-size:10px; font-weight:800; width:16px; height:16px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0;">A</span>
                <span style="font-size:11.5px; font-weight:800; color:#92400e; text-transform:uppercase; letter-spacing:0.04em;">Đánh giá &amp; Biện luận chẩn đoán</span>
              </div>
              <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost js-ai-suggest" data-field="assessment" style="color:#d97706; padding:1px 6px; font-size:10px; height:auto; min-height:0;" title="Trợ lý AI biện luận chẩn đoán">
                <i class="fa-solid fa-wand-magic-sparkles"></i> AI Biện Luận
              </button>
            </div>
            <div style="padding:8px 12px;">
              <textarea id="esAAssessment" rows="3" class="dsp-input" style="width:100%; font-size:12.5px; line-height:1.45; border:none; background:transparent; padding:0; resize:vertical;" placeholder="Chẩn đoán xác định, phân tầng nguy cơ và biện luận lâm sàng...">${escapeHtml(p.aAssessment || '')}</textarea>
            </div>
          </div>

          <!-- P — Plan & Treatment -->
          <div style="background:var(--color-bg); border:1px solid rgba(16,185,129,0.3); border-radius:8px; overflow:hidden;">
            <div style="padding:6px 12px; background:linear-gradient(135deg,rgba(16,185,129,0.08),rgba(52,211,153,0.02)); border-bottom:1px solid rgba(16,185,129,0.2); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:6px;">
              <div style="display:flex; align-items:center; gap:5px;">
                <span style="background:#10b981; color:#fff; font-size:10px; font-weight:800; width:16px; height:16px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0;">P</span>
                <span style="font-size:11.5px; font-weight:800; color:#065f46; text-transform:uppercase; letter-spacing:0.04em;">Y lệnh điều trị, Chăm sóc &amp; Dinh dưỡng</span>
              </div>
              <div style="display:flex; gap:4px; align-items:center;">
                ${renderProtocolQuickApplyBtn()}
                <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost js-ai-suggest" data-field="plan" style="color:#059669; padding:1px 6px; font-size:10px; height:auto; min-height:0;" title="Trợ lý AI gợi ý kế hoạch">
                  <i class="fa-solid fa-wand-magic-sparkles"></i> AI Gợi ý
                </button>
              </div>
            </div>
            <div style="padding:8px 12px;">
              <textarea id="esPPlan" rows="3" class="dsp-input" style="width:100%; font-size:12.5px; line-height:1.45; border:none; background:transparent; padding:0; resize:vertical;" placeholder="Y lệnh chăm sóc, chế độ ăn, theo dõi sinh hiệu, xét nghiệm tiếp theo...">${escapeHtml(p.pPlan || '')}</textarea>
            </div>
          </div>

          <!-- eRx — Đơn thuốc điện tử -->
          <div style="background:var(--color-bg); border:1px solid rgba(139,92,246,0.3); border-radius:8px; overflow:hidden;">
            <div style="padding:6px 12px; background:linear-gradient(135deg,rgba(139,92,246,0.07),rgba(167,139,250,0.02)); border-bottom:1px solid rgba(139,92,246,0.18); display:flex; align-items:center; justify-content:space-between;">
              <div style="display:flex; align-items:center; gap:5px;">
                <i class="fa-solid fa-prescription-bottle-medical" style="color:#7c3aed; font-size:12px;"></i>
                <span style="font-size:11px; font-weight:800; color:#5b21b6; text-transform:uppercase; letter-spacing:0.04em;">Đơn thuốc điện tử (e-Prescribing / eRx)</span>
              </div>
              <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-primary" id="btnOpenRxPicker" style="font-size:10.5px; padding:2px 8px; background:#7c3aed; border-color:#7c3aed;">
                <i class="fa-solid fa-plus"></i> + Kê thuốc từ Từ điển
              </button>
            </div>
            <div id="rxListContainer" style="padding:8px 12px; display:flex; flex-direction:column; gap:4px; min-height:36px;">
              ${renderRxItemsList(p.prescriptions || [])}
            </div>
          </div>

          <!-- CLS Chỉ định & Kết quả nhanh -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div style="background:var(--color-bg); border:1px solid rgba(14,165,233,0.25); border-radius:8px; overflow:hidden;">
              <div style="padding:6px 12px; background:linear-gradient(135deg,rgba(14,165,233,0.07),transparent); border-bottom:1px solid rgba(14,165,233,0.15); display:flex; align-items:center; justify-content:space-between;">
                <div style="display:flex; align-items:center; gap:4px;">
                  <i class="fa-solid fa-flask-vial" style="color:#0369a1; font-size:11px;"></i>
                  <span style="font-size:11px; font-weight:800; color:#0369a1; text-transform:uppercase; letter-spacing:0.04em;">Chỉ định CLS</span>
                </div>
                <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnOpenLabOrderSets" style="color:#0284c7; padding:1px 5px; font-size:10px; height:auto; min-height:0;" title="Mở danh mục Gói Chỉ Định Xét Nghiệm">
                  <i class="fa-solid fa-list-check"></i> + Gói Chỉ Định
                </button>
              </div>
              <div style="padding:8px 12px;">
                <textarea id="esClsOrders" rows="2" placeholder="VD: CTM, Sinh hóa máu, XQ Ngực..." class="dsp-input" style="width:100%; font-size:12px; line-height:1.4; border:none; background:transparent; padding:0; resize:vertical;">${escapeHtml((p.clsOrders || []).map(o => o.name).join('\n'))}</textarea>
              </div>
            </div>
            <div style="background:var(--color-bg); border:1px solid rgba(16,185,129,0.25); border-radius:8px; overflow:hidden;">
              <div style="padding:6px 12px; background:linear-gradient(135deg,rgba(16,185,129,0.07),transparent); border-bottom:1px solid rgba(16,185,129,0.15); display:flex; align-items:center; justify-content:space-between;">
                <div style="display:flex; align-items:center; gap:4px;">
                  <i class="fa-solid fa-chart-line" style="color:#047857; font-size:11px;"></i>
                  <span style="font-size:11px; font-weight:800; color:#047857; text-transform:uppercase; letter-spacing:0.04em;">Dán nhanh kết quả CLS</span>
                </div>
                <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-primary" id="btnOpenLabParser" style="background:#059669; border-color:#059669; color:#fff; padding:1px 6px; font-size:10px; height:auto; min-height:0;" title="Tự động bắt cờ đỏ nguy kịch">
                  <i class="fa-solid fa-bolt"></i> ⚡ Bắt cờ đỏ
                </button>
              </div>
              <div style="padding:8px 12px;">
                <textarea id="esClsQuickPaste" rows="2" placeholder="Dán kết quả CLS mới (VD: WBC 18.5, K+ 6.2)..." class="dsp-input" style="width:100%; font-size:12px; line-height:1.4; border:none; background:transparent; padding:0; resize:vertical;"></textarea>
              </div>
            </div>
          </div>

          <!-- ═══ Footer Actions ═══ -->
          <div style="display:flex; align-items:center; justify-content:space-between; border-top:1px solid var(--color-border); padding-top:10px; margin-top:2px; gap:8px; flex-wrap:wrap;">
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              <button type="button" id="btnCopyEmrFormat" style="display:inline-flex; align-items:center; gap:5px; padding:6px 11px; border-radius:6px; border:1px solid rgba(2,132,199,0.35); background:rgba(2,132,199,0.05); color:var(--color-primary); font-size:11.5px; font-weight:600; cursor:pointer; transition:all 0.2s;">
                <i class="fa-solid fa-copy"></i> 1-Click Copy EMR
              </button>
              <button type="button" id="btnCreateSbarFromSoap" data-id="${p.id}" style="display:inline-flex; align-items:center; gap:5px; padding:6px 11px; border-radius:6px; border:1px solid var(--color-border); background:var(--color-bg); color:var(--color-text); font-size:11.5px; font-weight:600; cursor:pointer; transition:all 0.2s;">
                <i class="fa-solid fa-file-waveform"></i> Tạo SBAR
              </button>
            </div>

            <div style="display:flex; align-items:center; gap:8px;">
              <button type="button" id="btnDeletePatient" style="display:inline-flex; align-items:center; gap:5px; padding:6px 11px; border-radius:6px; border:1px solid rgba(239,68,68,0.3); background:rgba(239,68,68,0.05); color:var(--color-danger); font-size:11.5px; font-weight:600; cursor:pointer; transition:all 0.2s;">
                <i class="fa-solid fa-trash"></i> Xóa
              </button>
              <button type="submit" style="display:inline-flex; align-items:center; gap:6px; padding:7px 16px; border-radius:8px; border:none; background:linear-gradient(135deg,var(--color-primary),#0ea5e9); color:#fff; font-size:12.5px; font-weight:700; cursor:pointer; box-shadow:0 3px 8px rgba(2,132,199,0.3); transition:all 0.2s;">
                <i class="fa-solid fa-save"></i> Lưu Ngày (${activeDate || 'Hôm nay'})
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;
}

export function printWardTrackingSheet(patients: SoapPatientRecord[]): void {
  const printArea = document.getElementById('soapPrintArea');
  if (!printArea) return;

  const masterDate = getMasterDate();
  const dateParts = masterDate.split('-');
  const formattedDate = dateParts.length === 3 ? `${dateParts[2]} / ${dateParts[1]} / ${dateParts[0]}` : masterDate;
  const dayName = getDayOfWeekName(masterDate);

  const patientRowsHtml = patients.map(p => {
    const clsOrdersHtml = (p.clsOrders || []).map(o => `
      <div style="display:flex; align-items:center; gap:4px; font-size:11px; margin-bottom:2px;">
        <span style="font-size:12px;">${o.isDone ? '☒' : '☐'}</span>
        <span style="${o.isDone ? 'text-decoration:line-through;' : ''}">${o.name}</span>
      </div>
    `).join('') || '<div style="font-size:11px; color:#64748b; font-style:italic;">☐ Chưa có chỉ định</div>';

    const clsResultsHtml = (p.clsResults || []).map(r => `
      <div style="font-size:11px; margin-bottom:2px; ${r.alertLevel !== 'normal' ? 'font-weight:bold;' : ''}">
        • ${r.text}
      </div>
    `).join('') || '<div style="font-size:11px; color:#64748b; font-style:italic;">Chưa có KQ</div>';

    const pPlanHtml = (p.pPlan || '').split('\n').filter(Boolean).map(line => `
      <div style="display:flex; align-items:flex-start; gap:4px; font-size:11px; margin-bottom:4px;">
        <span style="font-size:12px;">☐</span>
        <span>${line}</span>
      </div>
    `).join('') || '<div style="display:flex; gap:4px; font-size:11px;"><span>☐</span> <span></span></div>';

    return `
      <tr style="border-bottom:1px solid #000; vertical-align:top;">
        <!-- Cột 1: Bệnh nhân -->
        <td style="border:1px solid #000; padding:8px; width:22%; font-size:12px;">
          <div style="font-weight:bold; font-size:13px;">${p.patientCode} - ${p.fullName}</div>
          <div style="font-size:11px; color:#334155; margin-top:2px;">
            (${p.age}t · ${p.gender === 'nam' ? 'Nam' : 'Nữ'}) · G: <strong>${p.bedNumber}</strong>
          </div>
          <div style="font-size:11px; margin-top:6px;">
            <strong>&Delta;:</strong> ${p.currentDiagnosis || p.admissionDiagnosis}
          </div>
        </td>

        <!-- Cột 2: TCCN & TCTT -->
        <td style="border:1px solid #000; padding:8px; width:30%; font-size:11px; line-height:1.4;">
          ${p.sNotes ? `<div><strong>S:</strong> ${p.sNotes}</div>` : ''}
          ${p.oNotes ? `<div style="margin-top:4px;"><strong>O:</strong> ${p.oNotes}</div>` : ''}
          ${!p.sNotes && !p.oNotes ? '<span style="color:#64748b; font-style:italic;">Chưa có diễn tiến</span>' : ''}
        </td>

        <!-- Cột 3: CLS Cần làm & KQ -->
        <td style="border:1px solid #000; padding:8px; width:24%; font-size:11px; line-height:1.4;">
          <div style="min-height:40px; margin-bottom:6px;">
            ${clsOrdersHtml}
          </div>
          <div style="border-top:1px dashed #000; padding-top:4px;">
            <strong>KQ:</strong>
            <div style="margin-top:2px;">
              ${clsResultsHtml}
            </div>
          </div>
        </td>

        <!-- Cột 4: Y lệnh điều trị -->
        <td style="border:1px solid #000; padding:8px; width:24%; font-size:11px; line-height:1.4;">
          ${pPlanHtml}
        </td>
      </tr>
    `;
  }).join('');

  printArea.innerHTML = `
    <div style="padding:15px; font-family: Arial, sans-serif; color:#000; background:#fff; width:100%;">
      <!-- Top Bar Header -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; font-size:13px; border-bottom:2px solid #000; padding-bottom:6px;">
        <div>
          <strong>Ngày:</strong> ${formattedDate} &nbsp;&nbsp;&nbsp; <strong>(${dayName})</strong>
        </div>
        <div>
          <span><span style="font-size:14px;">☐</span> đã nhập máy / đã in</span>
        </div>
      </div>

      <!-- Main Tracking Table -->
      <table style="width:100%; border-collapse:collapse; border:1px solid #000; text-align:left;">
        <thead>
          <tr style="background:#f1f5f9; border-bottom:1px solid #000; font-weight:bold; font-size:12px; text-align:center;">
            <th style="border:1px solid #000; padding:6px; width:22%;">Bệnh nhân</th>
            <th style="border:1px solid #000; padding:6px; width:30%;">TCCN & TCTT</th>
            <th style="border:1px solid #000; padding:6px; width:24%;">CLS cần làm</th>
            <th style="border:1px solid #000; padding:6px; width:24%;">Y lệnh điều trị</th>
          </tr>
        </thead>
        <tbody>
          ${patientRowsHtml.length > 0 ? patientRowsHtml : `
            <tr><td colSpan="4" style="text-align:center; padding:30px;">Chưa có bệnh nhân nào.</td></tr>
          `}
        </tbody>
      </table>
    </div>
  `;

  printArea.style.display = 'block';
  window.print();
  printArea.style.display = 'none';
}