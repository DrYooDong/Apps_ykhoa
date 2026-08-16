/**
 * DocSpace — Sổ Tay Bệnh Phòng SOAP Digital
 * Quản lý diễn tiến bệnh phòng, Cận lâm sàng, Lịch sử theo Ngày, In Phiếu Theo Dõi & Đồng bộ Cloud Supabase
 */

import { 
  getAllSoapPatients, getSoapPatientById, saveSoapPatient, updateSoapPatient, deleteSoapPatient,
  getSoapSupabaseConfig, saveSoapSupabaseConfig, fetchAllSoapFromSupabase,
  addSoapDailyLog, switchSoapPatientDate, getProfile, getActiveProfile, saveSBAR, saveCase, getAllPatients,
  safeStorageGet, safeStorageSet
} from '../storage';
import { SoapPatientRecord, SoapPrescriptionItem } from '../types';
import { renderSidebar, renderDocSpaceHeader, escapeHtml } from '../docspace-view';
import { generateSOAPSuggestion, generateDischargeSummary } from '../ai/llm-client';
import { icdPicker } from './icd-picker';
import { ebmBridge } from './ebm-bridge-view';
import { drugPicker } from './drug-picker';
import { drugIntelligencePanel } from './drug-intelligence-panel';
import { clinicalReasoningPanel } from './clinical-reasoning-panel';
import { quickReferenceDrawer } from './quick-reference-drawer';
import { resourcePicker } from './resource-picker';
import { calculatorPicker } from './calculator-picker';
import { renderProtocolQuickApplyBtn, renderSoapToProtocolBtn, initSoapAiBridgeEvents } from './ai-soap-features';

const ALERT_KEYWORDS = [
  'hạ kali', 'tụt kali', 'tăng kali',
  'creatinine tăng', 'troponin', 'spO2 giảm', 'sốt cao', 'huyết áp tụt',
  'nguy kịch', 'chống chỉ định', 'dương tính'
];

function highlightAlerts(text: string): string {
  if (!text) return '<span style="color:var(--color-text-muted); font-style:italic;">Chưa có dữ liệu</span>';
  let safe = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  
  ALERT_KEYWORDS.forEach(kw => {
    const reg = new RegExp(`(${kw})`, 'gi');
    safe = safe.replace(reg, `<strong style="color:var(--color-danger); background:rgba(239,68,68,0.1); padding:2px 4px; border-radius:4px;">$1</strong>`);
  });
  return safe.replace(/\n/g, '<br>');
}

function getMasterDate(): string {
  const today: string = new Date().toISOString().split('T')[0]!;
  return safeStorageGet('dsp_soap_master_date', today);
}

function setMasterDate(dateStr: string): void {
  safeStorageSet('dsp_soap_master_date', dateStr);
}

function getDayOfWeekName(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    return days[d.getDay()] || '';
  } catch {
    return '';
  }
}

function renderRxItemsList(items: SoapPrescriptionItem[]): string {
  if (!items || items.length === 0) {
    return `<div class="rx-empty-msg" style="font-size:12px; color:var(--color-text-muted); font-style:italic; padding:6px 0;">Chưa có đơn thuốc có cấu trúc. Bấm <strong>"+ Kê thuốc từ Từ điển"</strong> ở trên để kê đơn.</div>`;
  }
  return items.map((item, idx) => `
    <div class="rx-item-row" data-id="${item.id || idx}" style="display:grid; grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr 30px; gap:6px; align-items:center; background:var(--color-surface); padding:6px 8px; border-radius:6px; border:1px solid var(--color-border); font-size:12px;">
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

function printSinglePrescription(p: SoapPatientRecord): void {
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

function renderEditSoapModalContent(p: SoapPatientRecord): string {
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
    <div style="background:var(--color-surface); border-radius:14px; max-width:900px; width:100%; max-height:92vh; display:flex; flex-direction:column; box-shadow:0 20px 60px rgba(0,0,0,0.22); overflow:hidden; position:relative;">
      
      <!-- Modal Header -->
      <div style="padding:14px 20px; border-bottom:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; background:linear-gradient(135deg,rgba(2,132,199,0.06),rgba(14,165,233,0.02)); flex-shrink:0;">
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="width:38px; height:38px; border-radius:10px; background:linear-gradient(135deg,var(--color-primary),#0ea5e9); display:flex; align-items:center; justify-content:center; flex-shrink:0; box-shadow:0 3px 8px rgba(2,132,199,0.3);">
            <i class="fa-solid fa-notes-medical" style="color:#fff; font-size:16px;"></i>
          </div>
          <div>
            <h3 style="margin:0; font-size:16px; font-weight:800; color:var(--color-primary); line-height:1.2;">${p.patientCode} – ${p.fullName}</h3>
            <div style="font-size:11px; color:var(--color-text-muted); margin-top:2px; display:flex; align-items:center; gap:8px;">
              <span>${p.age}t · ${p.gender === 'nam' ? 'Nam' : 'Nữ'}</span>
              <span style="width:3px; height:3px; border-radius:50%; background:var(--color-border); display:inline-block;"></span>
              <span>Giường <strong style="color:var(--color-text);">${p.bedNumber}</strong></span>
              <span style="width:3px; height:3px; border-radius:50%; background:var(--color-border); display:inline-block;"></span>
              <span>HS: ${p.medicalRecordNo}</span>
            </div>
          </div>
        </div>
        <button id="btnCloseEditSoapModal" style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; width:32px; height:32px; font-size:18px; cursor:pointer; color:var(--color-text-muted); display:flex; align-items:center; justify-content:center; transition:all 0.2s; flex-shrink:0;">&times;</button>
      </div>

      <!-- Date Selector Bar -->
      <div style="padding:8px 20px; background:var(--color-bg); border-bottom:1px solid var(--color-border); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px; flex-shrink:0;">
        <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
          <span style="font-size:11px; font-weight:700; color:var(--color-text-muted); display:flex; align-items:center; gap:4px; text-transform:uppercase; letter-spacing:0.04em;">
            <i class="fa-solid fa-calendar-day" style="color:var(--color-primary);"></i> Ngày Diễn Tiến:
          </span>
          ${dateBadgesHtml}
        </div>
        <button type="button" id="btnModalAddDate" data-id="${p.id}" class="dsp-btn dsp-btn-sm dsp-btn-ghost" style="color:var(--color-primary); border:1.5px dashed var(--color-primary); border-radius:8px; font-size:11px; padding:4px 10px;">
          <i class="fa-solid fa-plus-circle"></i> + Thêm Ngày Diễn Tiến Mới
        </button>
      </div>

      <!-- Scrollable Body -->
      <div style="padding:16px 20px; overflow-y:auto; flex:1; display:flex; flex-direction:column; gap:12px;">
        <form id="formEditSoap">
          <input type="hidden" id="esPatientId" value="${p.id}" />

          <!-- Thông tin hành chính (collapsible) -->
          <details style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:10px; overflow:hidden; margin-bottom:4px;">
            <summary style="font-size:12px; font-weight:700; color:var(--color-primary); cursor:pointer; user-select:none; display:flex; align-items:center; justify-content:space-between; padding:10px 14px; list-style:none;">
              <span style="display:flex; align-items:center; gap:6px;"><i class="fa-solid fa-id-card"></i> Sửa thông tin hành chính (Mã BN, Tên, Tuổi, Giường, Chẩn đoán...)</span>
              <span style="font-size:10px; color:var(--color-text-muted); font-weight:normal; background:var(--color-surface); padding:2px 8px; border-radius:8px; border:1px solid var(--color-border);">Bấm để mở rộng/thu gọn</span>
            </summary>
            <div style="padding:12px 14px; border-top:1px solid var(--color-border);">
              <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin-bottom:10px;">
                <div>
                  <label style="font-size:11px; font-weight:600; display:block; margin-bottom:3px; color:var(--color-text-muted);">Mã BN / Ký hiệu *</label>
                  <input type="text" id="esPatientCode" value="${p.patientCode || ''}" required class="dsp-input" style="width:100%; font-size:12px;" />
                </div>
                <div>
                  <label style="font-size:11px; font-weight:600; display:block; margin-bottom:3px; color:var(--color-text-muted);">Số Giường *</label>
                  <input type="text" id="esBedNumber" value="${p.bedNumber || ''}" required class="dsp-input" style="width:100%; font-size:12px;" />
                </div>
                <div>
                  <label style="font-size:11px; font-weight:600; display:block; margin-bottom:3px; color:var(--color-text-muted);">Họ và Tên *</label>
                  <input type="text" id="esFullName" value="${p.fullName || ''}" required class="dsp-input" style="width:100%; font-size:12px;" />
                </div>
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin-bottom:10px;">
                <div>
                  <label style="font-size:11px; font-weight:600; display:block; margin-bottom:3px; color:var(--color-text-muted);">Tuổi *</label>
                  <input type="number" id="esAge" value="${p.age || 0}" required class="dsp-input" style="width:100%; font-size:12px;" />
                </div>
                <div>
                  <label style="font-size:11px; font-weight:600; display:block; margin-bottom:3px; color:var(--color-text-muted);">Giới tính</label>
                  <select id="esGender" class="dsp-input" style="width:100%; font-size:12px;">
                    <option value="nam" ${p.gender === 'nam' ? 'selected' : ''}>Nam</option>
                    <option value="nu" ${p.gender === 'nu' ? 'selected' : ''}>Nữ</option>
                    <option value="khac" ${p.gender === 'khac' ? 'selected' : ''}>Khác</option>
                  </select>
                </div>
                <div>
                  <label style="font-size:11px; font-weight:600; display:block; margin-bottom:3px; color:var(--color-text-muted);">Số Bệnh Án</label>
                  <input type="text" id="esMedicalRecordNo" value="${p.medicalRecordNo || ''}" class="dsp-input" style="width:100%; font-size:12px;" />
                </div>
              </div>
              <div>
                <label style="font-size:11px; font-weight:600; display:block; margin-bottom:3px; color:var(--color-text-muted);">Chẩn đoán vào khoa *</label>
                <input type="text" id="esAdmissionDiagnosis" value="${p.admissionDiagnosis || ''}" required class="dsp-input" style="width:100%; font-size:12px;" />
              </div>
            </div>
          </details>

          <!-- S & O — 2 cột -->
          <div style="background:var(--color-bg); border:1px solid var(--color-border); border-radius:10px; overflow:hidden;">
            <div style="padding:8px 14px; background:linear-gradient(135deg,rgba(2,132,199,0.08),rgba(14,165,233,0.03)); border-bottom:1px solid rgba(2,132,199,0.15); display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-comment-medical" style="color:var(--color-primary); font-size:12px;"></i>
              <span style="font-size:11px; font-weight:800; color:var(--color-primary); text-transform:uppercase; letter-spacing:0.06em;">Diễn tiến (S &amp; O)</span>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr;">
              <div style="padding:12px 14px; border-right:1px solid var(--color-border);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                  <label style="font-size:12px; font-weight:700; color:var(--color-text); display:flex; align-items:center; gap:5px; margin:0;">
                    <span style="background:var(--color-primary); color:#fff; font-size:10px; font-weight:800; width:18px; height:18px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0;">S</span>
                    <span>Triệu chứng cơ năng</span>
                  </label>
                  <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost js-ai-suggest" data-field="subjective" style="color:var(--color-primary); padding:1px 6px; font-size:10px; height:auto; min-height:0;">
                    <i class="fa-solid fa-wand-magic-sparkles"></i> AI
                  </button>
                </div>
                <textarea id="esSNotes" rows="4" class="dsp-input" style="width:100%; font-size:13px; line-height:1.5; resize:vertical; border:none; background:transparent; padding:0;" placeholder="Triệu chứng chủ quan...">${p.sNotes || ''}</textarea>
              </div>
              <div style="padding:12px 14px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                  <label style="font-size:12px; font-weight:700; color:var(--color-text); display:flex; align-items:center; gap:5px; margin:0;">
                    <span style="background:#0ea5e9; color:#fff; font-size:10px; font-weight:800; width:18px; height:18px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0;">O</span>
                    <span>Thăm khám / CLS</span>
                  </label>
                  <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost js-ai-suggest" data-field="objective" style="color:var(--color-primary); padding:1px 6px; font-size:10px; height:auto; min-height:0;">
                    <i class="fa-solid fa-wand-magic-sparkles"></i> AI
                  </button>
                </div>
                <textarea id="esONotes" rows="4" class="dsp-input" style="width:100%; font-size:13px; line-height:1.5; resize:vertical; border:none; background:transparent; padding:0;" placeholder="Khám thực thể hoặc thả thẻ CLS...">${p.oNotes || ''}</textarea>
              </div>
            </div>
          </div>

          <!-- A — Assessment -->
          <div style="background:var(--color-bg); border:1px solid rgba(245,158,11,0.3); border-radius:10px; overflow:hidden;">
            <div style="padding:8px 14px; background:linear-gradient(135deg,rgba(245,158,11,0.08),rgba(251,191,36,0.02)); border-bottom:1px solid rgba(245,158,11,0.2); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:6px;">
              <div style="display:flex; align-items:center; gap:6px;">
                <span style="background:#f59e0b; color:#fff; font-size:10px; font-weight:800; width:18px; height:18px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0;">A</span>
                <span style="font-size:11px; font-weight:800; color:#92400e; text-transform:uppercase; letter-spacing:0.06em;">Đánh giá &amp; Chẩn đoán</span>
              </div>
              <div style="display:flex; gap:4px; flex-wrap:wrap;">
                <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost js-ai-suggest" data-field="assessment" style="color:var(--color-primary); padding:2px 7px; font-size:10px; height:auto; min-height:0;">
                  <i class="fa-solid fa-wand-magic-sparkles"></i> AI Gợi ý
                </button>
                <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnReasoningCoachSoap" style="color:var(--color-success, #10b981); padding:2px 7px; font-size:10px; height:auto; min-height:0;" title="Mở Ma Trận Chẩn Đoán Phân Biệt & Tiếp Cận">
                  <i class="fa-solid fa-sitemap"></i> Tiếp cận chẩn đoán
                </button>
                <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnIcdSoap" style="color:var(--color-primary); padding:2px 7px; font-size:10px; height:auto; min-height:0;">
                  <i class="fa-solid fa-list-ul"></i> + ICD-10
                </button>
                <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnScoreSoap" style="color:var(--color-primary); padding:2px 7px; font-size:10px; height:auto; min-height:0;">
                  <i class="fa-solid fa-calculator"></i> + Thang điểm
                </button>
                <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-primary" id="btnSearchEBM" style="padding:2px 8px; font-size:10px; height:auto; min-height:0;">
                  <i class="fa-solid fa-book-medical"></i> Tra cứu EBM
                </button>
              </div>
            </div>

            <div style="padding:12px 14px;">
              <textarea id="esAAssessment" rows="4" class="dsp-input" style="width:100%; font-size:13px; line-height:1.5; border:none; background:transparent; padding:0; resize:vertical;" placeholder="Ghi nhận đánh giá lâm sàng hoặc chẩn đoán (Ví dụ: Suy tim (I50.0), Rung nhĩ (I48), Viêm phổi)...">${p.aAssessment || ''}</textarea>
            </div>
          </div>

          <!-- AI Co-Pilot Box -->
          <div id="soapAiSuggestionBox" style="display:none; padding:12px 14px; border-radius:10px; border:1.5px dashed var(--color-primary); background:rgba(2,132,199,0.03);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-size:12px; font-weight:700; color:var(--color-primary); display:flex; align-items:center; gap:6px;">
                <i class="fa-solid fa-robot"></i> Trợ lý AI Lâm sàng (Co-Pilot)
              </span>
              <div style="display:flex; gap:6px;">
                <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-primary" id="btnApplyAiSuggestion" style="font-size:11px; padding:2px 8px;">
                  <i class="fa-solid fa-check"></i> Áp dụng vào form
                </button>
                <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnCloseAiSuggestion" style="font-size:11px; padding:2px 6px;">&times;</button>
              </div>
            </div>
            <div id="soapAiSuggestionText" style="font-size:12px; line-height:1.5; color:var(--color-text); white-space:pre-wrap; max-height:200px; overflow-y:auto;">
              Đang kết nối AI...
            </div>
          </div>

          <!-- P — Y lệnh khác -->
          <div style="background:var(--color-bg); border:1px solid rgba(16,185,129,0.3); border-radius:10px; overflow:hidden;">
            <div style="padding:8px 14px; background:linear-gradient(135deg,rgba(16,185,129,0.07),rgba(52,211,153,0.02)); border-bottom:1px solid rgba(16,185,129,0.2); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:6px;">
              <div style="display:flex; align-items:center; gap:6px;">
                <span style="background:#10b981; color:#fff; font-size:10px; font-weight:800; width:18px; height:18px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0;">P</span>
                <span style="font-size:11px; font-weight:800; color:#065f46; text-transform:uppercase; letter-spacing:0.06em;">Y lệnh khác (Chăm sóc, Dinh dưỡng...)</span>
              </div>
              <div style="display:flex; gap:4px; flex-wrap:wrap;">
                ${renderProtocolQuickApplyBtn()}
                <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost js-ai-suggest" data-field="plan" style="color:var(--color-primary); padding:2px 7px; font-size:10px; height:auto; min-height:0;">
                  <i class="fa-solid fa-wand-magic-sparkles"></i> AI Gợi ý
                </button>
                <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnDrugIntelSoap" style="color:#db2777; padding:2px 7px; font-size:10px; height:auto; min-height:0;" title="Dược thư & Tương tác thuốc">
                  <i class="fa-solid fa-pills"></i> Drug Intelligence
                </button>
                <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnPrescribeSoap" style="color:var(--color-primary); padding:2px 7px; font-size:10px; height:auto; min-height:0;">
                  <i class="fa-solid fa-capsules"></i> + Kê đơn
                </button>
                <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnQuickRefSoap" style="color:var(--color-primary); padding:2px 7px; font-size:10px; height:auto; min-height:0;" title="Tra cứu nhanh công thức & hướng dẫn">
                  <i class="fa-solid fa-bolt"></i> Tra cứu nhanh
                </button>
              </div>
            </div>
            <div style="padding:12px 14px;">
              <textarea id="esPPlan" rows="3" class="dsp-input" style="width:100%; font-size:13px; line-height:1.5; border:none; background:transparent; padding:0; resize:vertical;">${p.pPlan || ''}</textarea>
            </div>
          </div>

          <!-- eRx — Đơn thuốc điện tử -->
          <div style="background:var(--color-bg); border:1px solid rgba(139,92,246,0.3); border-radius:10px; overflow:hidden;">
            <div style="padding:8px 14px; background:linear-gradient(135deg,rgba(139,92,246,0.07),rgba(167,139,250,0.02)); border-bottom:1px solid rgba(139,92,246,0.18); display:flex; align-items:center; justify-content:space-between;">
              <div style="display:flex; align-items:center; gap:6px;">
                <i class="fa-solid fa-prescription-bottle-medical" style="color:#7c3aed; font-size:13px;"></i>
                <span style="font-size:11px; font-weight:800; color:#5b21b6; text-transform:uppercase; letter-spacing:0.06em;">Đơn thuốc điện tử (e-Prescribing / eRx)</span>
              </div>
              <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-primary" id="btnOpenRxPicker" style="font-size:11px; padding:3px 10px; background:#7c3aed; border-color:#7c3aed;">
                <i class="fa-solid fa-plus"></i> + Kê thuốc từ Từ điển
              </button>
            </div>
            <div id="rxListContainer" style="padding:10px 14px; display:flex; flex-direction:column; gap:5px; min-height:40px;">
              ${renderRxItemsList(p.prescriptions || [])}
            </div>
          </div>

          <!-- CLS Chỉ định & Kết quả nhanh -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div style="background:var(--color-bg); border:1px solid rgba(14,165,233,0.25); border-radius:10px; overflow:hidden;">
              <div style="padding:7px 14px; background:linear-gradient(135deg,rgba(14,165,233,0.07),transparent); border-bottom:1px solid rgba(14,165,233,0.15); display:flex; align-items:center; gap:5px;">
                <i class="fa-solid fa-flask-vial" style="color:#0369a1; font-size:11px;"></i>
                <span style="font-size:11px; font-weight:800; color:#0369a1; text-transform:uppercase; letter-spacing:0.04em;">Chỉ định CLS</span>
                <span style="font-size:10px; color:var(--color-text-muted); font-weight:400; text-transform:none;">(Mỗi dòng 1 chỉ định)</span>
              </div>
              <div style="padding:10px 14px;">
                <textarea id="esClsOrders" rows="3" placeholder="VD: CTM, Sinh hóa máu, XQ Ngực..." class="dsp-input" style="width:100%; font-size:12px; line-height:1.5; border:none; background:transparent; padding:0; resize:vertical;">${(p.clsOrders || []).map(o => o.name).join('\n')}</textarea>
              </div>
            </div>
            <div style="background:var(--color-bg); border:1px solid rgba(16,185,129,0.25); border-radius:10px; overflow:hidden;">
              <div style="padding:7px 14px; background:linear-gradient(135deg,rgba(16,185,129,0.07),transparent); border-bottom:1px solid rgba(16,185,129,0.15); display:flex; align-items:center; gap:5px;">
                <i class="fa-solid fa-chart-line" style="color:#047857; font-size:11px;"></i>
                <span style="font-size:11px; font-weight:800; color:#047857; text-transform:uppercase; letter-spacing:0.04em;">Kết quả CLS dán nhanh</span>
              </div>
              <div style="padding:10px 14px;">
                <textarea id="esClsQuickPaste" rows="3" placeholder="Dán kết quả CLS mới vào đây..." class="dsp-input" style="width:100%; font-size:12px; line-height:1.5; border:none; background:transparent; padding:0; resize:vertical;"></textarea>
              </div>
            </div>
          </div>

          <!-- ═══ Footer Actions ═══ -->
          <div style="display:flex; align-items:center; justify-content:space-between; border-top:2px solid var(--color-border); padding-top:14px; margin-top:4px; gap:8px; flex-wrap:wrap;">
            <!-- Nhóm nút phụ (trái) -->
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              <button type="button" id="btnCopyEmrFormat" style="display:inline-flex; align-items:center; gap:6px; padding:7px 13px; border-radius:8px; border:1.5px solid rgba(2,132,199,0.35); background:rgba(2,132,199,0.05); color:var(--color-primary); font-size:12px; font-weight:600; cursor:pointer; transition:all 0.2s;">
                <i class="fa-solid fa-copy"></i> 1-Click Copy EMR
              </button>
              <button type="button" id="btnCreateSbarFromSoap" data-id="${p.id}" style="display:inline-flex; align-items:center; gap:6px; padding:7px 13px; border-radius:8px; border:1.5px solid var(--color-border); background:var(--color-bg); color:var(--color-text); font-size:12px; font-weight:600; cursor:pointer; transition:all 0.2s;">
                <i class="fa-solid fa-file-waveform"></i> Tạo SBAR
              </button>
              <button type="button" id="btnCreateCaseFromSoap" data-id="${p.id}" style="display:inline-flex; align-items:center; gap:6px; padding:7px 13px; border-radius:8px; border:1.5px solid var(--color-border); background:var(--color-bg); color:var(--color-text); font-size:12px; font-weight:600; cursor:pointer; transition:all 0.2s;">
                <i class="fa-solid fa-stethoscope"></i> Lưu Ca Bệnh
              </button>
            </div>

            <!-- Nhóm nút chính (phải) -->
            <div style="display:flex; align-items:center; gap:8px;">
              <button type="button" id="btnDeletePatient" style="display:inline-flex; align-items:center; gap:6px; padding:7px 13px; border-radius:8px; border:1.5px solid rgba(239,68,68,0.3); background:rgba(239,68,68,0.05); color:var(--color-danger); font-size:12px; font-weight:600; cursor:pointer; transition:all 0.2s;">
                <i class="fa-solid fa-trash"></i> Xóa
              </button>
              <button type="submit" style="display:inline-flex; align-items:center; gap:7px; padding:8px 18px; border-radius:9px; border:none; background:linear-gradient(135deg,var(--color-primary),#0ea5e9); color:#fff; font-size:13px; font-weight:700; cursor:pointer; box-shadow:0 3px 10px rgba(2,132,199,0.3); transition:all 0.2s; letter-spacing:0.01em;">
                <i class="fa-solid fa-save"></i> Lưu Ngày (${activeDate || 'Hôm nay'})
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;
}

function printWardTrackingSheet(patients: SoapPatientRecord[]): void {
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

export function mountSoapController(profileId: string): void {
  // Master Date Select
  document.getElementById('masterDateSelect')?.addEventListener('change', (e) => {
    const newDate = (e.target as HTMLInputElement).value;
    if (newDate) {
      setMasterDate(newDate);
      window.location.hash = '#/docspace/soap';
    }
  });

  // Modal Print Selection
  const btnPrintAllSoap = document.getElementById('btnPrintAllSoap');
  const modalPrintOptions = document.getElementById('modalPrintOptions');
  const btnClosePrintModal = document.getElementById('btnClosePrintModal');
  const btnCancelPrintModal = document.getElementById('btnCancelPrintModal');
  const chkPrintSelectAll = document.getElementById('chkPrintSelectAll') as HTMLInputElement;

  if (btnPrintAllSoap && modalPrintOptions) {
    btnPrintAllSoap.addEventListener('click', () => {
      const patients = getAllSoapPatients(profileId);
      if (patients.length === 0) {
        alert('Chưa có bệnh nhân nào để in.');
        return;
      }
      modalPrintOptions.style.display = 'flex';
    });
  }

  [btnClosePrintModal, btnCancelPrintModal].forEach(btn => {
    btn?.addEventListener('click', () => {
      if (modalPrintOptions) modalPrintOptions.style.display = 'none';
    });
  });

  chkPrintSelectAll?.addEventListener('change', (e) => {
    const isChecked = (e.target as HTMLInputElement).checked;
    document.querySelectorAll<HTMLInputElement>('.js-print-patient-chk').forEach(chk => {
      chk.checked = isChecked;
    });
  });

  document.getElementById('btnConfirmPrintModal')?.addEventListener('click', () => {
    const selectedIds = Array.from(document.querySelectorAll<HTMLInputElement>('.js-print-patient-chk:checked')).map(c => c.value);
    if (selectedIds.length === 0) {
      alert('Vui lòng chọn ít nhất 1 bệnh nhân để in.');
      return;
    }

    const allPatients = getAllSoapPatients(profileId);
    const selectedPatients = allPatients.filter(p => selectedIds.includes(p.id));

    if (modalPrintOptions) modalPrintOptions.style.display = 'none';
    printWardTrackingSheet(selectedPatients);
  });

  // Modal Nhận Bệnh
  const btnNewPatient = document.getElementById('btnNewPatient');
  const btnExistingPatient = document.getElementById('btnExistingPatient');
  const modalNewPatient = document.getElementById('modalNewPatient');
  const modalNewPatientTitle = document.getElementById('modalNewPatientTitle');
  const inputDayOfIllness = document.getElementById('npDayOfIllness') as HTMLInputElement;
  const btnCloseNewPatient = document.getElementById('btnCloseNewPatientModal');
  const btnCancelNewPatient = document.getElementById('btnCancelNewPatient');

  if (btnNewPatient && modalNewPatient) {
    btnNewPatient.addEventListener('click', () => {
      if (modalNewPatientTitle) modalNewPatientTitle.innerHTML = '<i class="fa-solid fa-user-plus"></i> Nhận Bệnh Mới Vào Khoa';
      if (inputDayOfIllness) inputDayOfIllness.value = '1';
      modalNewPatient.style.display = 'flex';
    });
  }

  if (btnExistingPatient && modalNewPatient) {
    btnExistingPatient.addEventListener('click', () => {
      if (modalNewPatientTitle) modalNewPatientTitle.innerHTML = '<i class="fa-solid fa-bed-pulse"></i> Thêm Bệnh Nội Trú (Đang nằm viện)';
      if (inputDayOfIllness) inputDayOfIllness.value = '2';
      modalNewPatient.style.display = 'flex';
    });
  }

  [btnCloseNewPatient, btnCancelNewPatient].forEach(btn => {
    btn?.addEventListener('click', () => {
      if (modalNewPatient) modalNewPatient.style.display = 'none';
    });
  });

  // Handle demographic selection auto-fill
  document.getElementById('npDemographicId')?.addEventListener('change', (e) => {
    const select = e.target as HTMLSelectElement;
    const option = select.options[select.selectedIndex];
    if (option && option.value) {
      (document.getElementById('npCode') as HTMLInputElement).value = option.dataset.code || '';
      (document.getElementById('npName') as HTMLInputElement).value = option.dataset.name || '';
      (document.getElementById('npGender') as HTMLSelectElement).value = option.dataset.gender || 'nam';
      if (option.dataset.dob) {
        const dob = new Date(option.dataset.dob);
        const diffMs = Date.now() - dob.getTime();
        const ageDt = new Date(diffMs); 
        (document.getElementById('npAge') as HTMLInputElement).value = Math.abs(ageDt.getUTCFullYear() - 1970).toString();
      }
    } else {
      (document.getElementById('npCode') as HTMLInputElement).value = '';
      (document.getElementById('npName') as HTMLInputElement).value = '';
      (document.getElementById('npAge') as HTMLInputElement).value = '';
    }
  });

  // Modal Supabase Config
  const btnSupabaseModal = document.getElementById('btnSupabaseModal');
  const modalSupabase = document.getElementById('modalSupabase');
  const btnCloseSupabase = document.getElementById('btnCloseSupabaseModal');
  const btnCancelSupabase = document.getElementById('btnCancelSupabase');

  if (btnSupabaseModal && modalSupabase) {
    btnSupabaseModal.addEventListener('click', () => {
      modalSupabase.style.display = 'flex';
    });
  }

  [btnCloseSupabase, btnCancelSupabase].forEach(btn => {
    btn?.addEventListener('click', () => {
      if (modalSupabase) modalSupabase.style.display = 'none';
    });
  });

  document.getElementById('formSupabase')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = (document.getElementById('sbUrl') as HTMLInputElement).value.trim();
    const key = (document.getElementById('sbKey') as HTMLInputElement).value.trim();
    saveSoapSupabaseConfig(url, key);

    const res = await fetchAllSoapFromSupabase(profileId);
    if (res.success) {
      alert(`✅ Đã kết nối Supabase thành công! Tải/Đồng bộ ${res.count} hồ sơ.`);
    } else {
      alert(`⚠️ Đã lưu cấu hình, nhưng chưa thể kết nối: ${res.error}`);
    }
    if (modalSupabase) modalSupabase.style.display = 'none';
    window.location.hash = '#/docspace/soap';
  });

  document.getElementById('btnSyncFromCloud')?.addEventListener('click', async () => {
    const res = await fetchAllSoapFromSupabase(profileId);
    if (res.success) {
      alert(`✅ Tải thành công ${res.count} dữ liệu bệnh nhân từ Supabase Cloud!`);
      window.location.hash = '#/docspace/soap';
    } else {
      alert(`❌ Lỗi tải dữ liệu: ${res.error}`);
    }
  });

  // Toggle Row Collapse
  document.querySelectorAll('.js-toggle-row-collapse').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const row = (e.currentTarget as HTMLElement).closest('.dsp-soap-row');
      if (row) {
        row.classList.toggle('is-collapsed');
      }
    });
  });

  // Switch Date Buttons
  document.querySelectorAll('.js-switch-date, .js-modal-switch-date').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
      const date = (e.currentTarget as HTMLElement).getAttribute('data-date');
      if (id && date) {
        switchSoapPatientDate(profileId, id, date);
        const isModal = (e.currentTarget as HTMLElement).classList.contains('js-modal-switch-date');
        window.location.hash = isModal ? `#/docspace/soap?edit=${id}` : '#/docspace/soap';
      }
    });
  });

  // Add New Date Buttons
  const handleAddDate = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    const newDate = prompt('Nhập ngày diễn tiến mới (YYYY-MM-DD):', today);
    if (newDate) {
      addSoapDailyLog(profileId, id, newDate);
      window.location.hash = `#/docspace/soap?edit=${id}`;
    }
  };

  document.querySelectorAll('.js-add-date').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
      if (id) handleAddDate(id);
    });
  });

  document.getElementById('btnModalAddDate')?.addEventListener('click', (e) => {
    const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
    if (id) handleAddDate(id);
  });

  // Submit Form Nhận Bệnh
  document.getElementById('formNewPatient')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = (document.getElementById('npCode') as HTMLInputElement).value.trim();
    const bed = (document.getElementById('npBed') as HTMLInputElement).value.trim();
    const name = (document.getElementById('npName') as HTMLInputElement).value.trim();
    const age = parseInt((document.getElementById('npAge') as HTMLInputElement).value, 10) || 0;
    const gender = (document.getElementById('npGender') as HTMLSelectElement).value as any;
    const medicalNo = (document.getElementById('npMedicalNo') as HTMLInputElement).value.trim();
    const diagnosisVal = (document.getElementById('npDiagnosis') as HTMLInputElement).value.trim();
    let icdCode = '';
    let icdLabel = diagnosisVal;
    if (diagnosisVal.includes(' - ')) {
      const parts = diagnosisVal.split(' - ');
      icdCode = (parts[0] || '').trim();
      icdLabel = parts.slice(1).join(' - ').trim();
    }
    const dayOfIllness = parseInt((document.getElementById('npDayOfIllness') as HTMLInputElement).value, 10) || 1;
    const demographicId = (document.getElementById('npDemographicId') as HTMLSelectElement)?.value || undefined;

    saveSoapPatient(profileId, {
      ...(demographicId ? { demographicId } : {}),
      patientCode: code,
      bedNumber: bed,
      fullName: name,
      age,
      gender,
      medicalRecordNo: medicalNo,
      admissionDiagnosis: diagnosisVal,
      currentDiagnosis: diagnosisVal,
      isEmrEntered: false,
      soapStatus: 'chua_lam',
      dayOfIllness: dayOfIllness,
      sNotes: '',
      oNotes: '',
      aAssessment: diagnosisVal,
      icd10Code: icdCode,
      icd10Label: icdLabel,
      pPlan: '',
      clsOrders: [],
      clsResults: [],
    });

    window.location.hash = '#/docspace/soap';
  });

  // Toggle EMR Status
  document.querySelectorAll('.js-toggle-emr').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
      if (!id) return;
      const p = getSoapPatientById(profileId, id);
      if (p) {
        updateSoapPatient(profileId, id, { isEmrEntered: !p.isEmrEntered });
        window.location.hash = '#/docspace/soap';
      }
    });
  });

  // Edit SOAP Button
  document.querySelectorAll('.js-edit-soap').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
      if (id) {
        window.location.hash = `#/docspace/soap?edit=${id}`;
      }
    });
  });

  // Print Single Prescription eRx Button
  document.querySelectorAll('.js-print-rx').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
      if (id) {
        const p = getSoapPatientById(profileId, id);
        if (p) {
          printSinglePrescription(p);
        }
      }
    });
  });

  // Close Edit SOAP Modal
  document.getElementById('btnCloseEditSoapModal')?.addEventListener('click', () => {
    window.location.hash = '#/docspace/soap';
  });

  // Submit Edit SOAP Form
  document.getElementById('formEditSoap')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = (document.getElementById('esPatientId') as HTMLInputElement).value;
    const patientCode = (document.getElementById('esPatientCode') as HTMLInputElement)?.value.trim();
    const bedNumber = (document.getElementById('esBedNumber') as HTMLInputElement)?.value.trim();
    const fullName = (document.getElementById('esFullName') as HTMLInputElement)?.value.trim();
    const age = parseInt((document.getElementById('esAge') as HTMLInputElement)?.value, 10) || 0;
    const gender = ((document.getElementById('esGender') as HTMLSelectElement)?.value || 'nam') as any;
    const medicalRecordNo = (document.getElementById('esMedicalRecordNo') as HTMLInputElement)?.value.trim();
    const admissionDiagnosis = (document.getElementById('esAdmissionDiagnosis') as HTMLInputElement)?.value.trim();

    const sNotes = (document.getElementById('esSNotes') as HTMLTextAreaElement).value.trim();
    const oNotes = (document.getElementById('esONotes') as HTMLTextAreaElement).value.trim();
    const aAssessment = (document.getElementById('esAAssessment') as HTMLTextAreaElement).value.trim();
    const pPlan = (document.getElementById('esPPlan') as HTMLTextAreaElement).value.trim();
    const quickPaste = (document.getElementById('esClsQuickPaste') as HTMLTextAreaElement)?.value.trim();
    const clsOrdersText = (document.getElementById('esClsOrders') as HTMLTextAreaElement)?.value.trim();

    const p = getSoapPatientById(profileId, id);
    if (!p) return;

    let newOrders = [...(p.clsOrders || [])];
    if (clsOrdersText !== undefined) {
      const lines = clsOrdersText.split('\n').map(l => l.trim()).filter(Boolean);
      newOrders = lines.map(line => {
        const existing = p.clsOrders?.find(o => o.name === line);
        if (existing) return existing;
        return { id: Date.now().toString() + Math.random().toString(36).substring(7), name: line, isDone: false };
      });
    }

    const newResults = [...p.clsResults];
    if (quickPaste) {
      newResults.push({
        id: Date.now().toString(),
        text: quickPaste,
        alertLevel: ALERT_KEYWORDS.some(kw => quickPaste.toLowerCase().includes(kw)) ? 'high' : 'normal'
      });
    }

    // Collect Prescriptions from rxListContainer
    const rxRows = Array.from(document.querySelectorAll<HTMLElement>('#rxListContainer .rx-item-row'));
    const prescriptions: SoapPrescriptionItem[] = rxRows.map(row => {
      const name = row.querySelector<HTMLInputElement>('.js-rx-name')?.value.trim() || '';
      const dosage = row.querySelector<HTMLInputElement>('.js-rx-dosage')?.value.trim() || '';
      const route = row.querySelector<HTMLInputElement>('.js-rx-route')?.value.trim() || '';
      const frequency = row.querySelector<HTMLInputElement>('.js-rx-freq')?.value.trim() || '';
      const quantity = row.querySelector<HTMLInputElement>('.js-rx-qty')?.value.trim() || '';
      const instructions = row.querySelector<HTMLInputElement>('.js-rx-instr')?.value.trim() || '';
      return {
        id: row.dataset.id || Date.now().toString() + Math.random().toString(36).substring(7),
        name,
        dosage,
        route,
        frequency,
        quantity,
        instructions
      };
    }).filter(item => item.name);

    updateSoapPatient(profileId, id, {
      ...(patientCode ? { patientCode } : {}),
      ...(bedNumber ? { bedNumber } : {}),
      ...(fullName ? { fullName } : {}),
      ...(age !== undefined ? { age } : {}),
      ...(gender ? { gender } : {}),
      ...(medicalRecordNo !== undefined ? { medicalRecordNo } : {}),
      ...(admissionDiagnosis ? { admissionDiagnosis, currentDiagnosis: admissionDiagnosis } : {}),
      sNotes,
      oNotes,
      aAssessment,
      pPlan,
      prescriptions,
      soapStatus: 'da_lam',
      clsOrders: newOrders,
      clsResults: newResults
    });

    window.location.hash = '#/docspace/soap';
  });

  // Handle Remove Rx Item Button Event Delegation
  document.getElementById('rxListContainer')?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('js-remove-rx')) {
      const row = target.closest('.rx-item-row');
      if (row) row.remove();
    }
  });

  // Handle Open Rx Picker Button
  document.getElementById('btnOpenRxPicker')?.addEventListener('click', () => {
    drugPicker.open(undefined, (drug) => {
      const container = document.getElementById('rxListContainer');
      if (container) {
        const brand = drug.brandNames && drug.brandNames.length > 0 ? ` (${drug.brandNames[0]})` : '';
        const name = drug.name + brand;
        const dosage = drug.dosage?.standardAdult || '';
        const newItem: SoapPrescriptionItem = {
          id: Date.now().toString() + Math.random().toString(36).substring(7),
          name,
          dosage,
          route: 'Uống',
          frequency: '1v x 2/ngày',
          quantity: '10 viên',
          instructions: 'Uống sau ăn'
        };

        const div = document.createElement('div');
        div.className = 'rx-item-row';
        div.dataset.id = newItem.id;
        div.style.cssText = 'display:grid; grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr 30px; gap:6px; align-items:center; background:var(--color-surface); padding:6px 8px; border-radius:6px; border:1px solid var(--color-border); font-size:12px;';
        div.innerHTML = `
          <div>
            <input type="text" class="js-rx-name dsp-input" value="${escapeHtml(newItem.name)}" style="font-size:11px; padding:2px 4px; font-weight:bold; width:100%;" />
            <input type="text" class="js-rx-dosage dsp-input" value="${escapeHtml(newItem.dosage)}" placeholder="Hàm lượng" style="font-size:10px; padding:2px 4px; color:var(--color-text-muted); width:100%; margin-top:2px;" />
          </div>
          <input type="text" class="js-rx-route dsp-input" value="${escapeHtml(newItem.route)}" placeholder="Đường dùng" style="font-size:11px; padding:2px 4px;" />
          <input type="text" class="js-rx-freq dsp-input" value="${escapeHtml(newItem.frequency)}" placeholder="Tần suất" style="font-size:11px; padding:2px 4px;" />
          <input type="text" class="js-rx-qty dsp-input" value="${escapeHtml(newItem.quantity)}" placeholder="Số lượng" style="font-size:11px; padding:2px 4px;" />
          <input type="text" class="js-rx-instr dsp-input" value="${escapeHtml(newItem.instructions)}" placeholder="Lời dặn" style="font-size:11px; padding:2px 4px;" />
          <button type="button" class="js-remove-rx dsp-icon-btn dsp-icon-btn--danger" style="padding:2px;" title="Xóa thuốc">&times;</button>
        `;

        if (container.querySelector('.rx-empty-msg')) {
          container.innerHTML = '';
        }
        container.appendChild(div);
      }
    });
  });

  // Create SBAR from SOAP
  document.getElementById('btnCreateSbarFromSoap')?.addEventListener('click', async (e) => {
    const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
    const p = id ? getSoapPatientById(profileId, id) : null;
    if (!p) return;

    const title = `Bệnh nhân ${p.fullName} - Giường ${p.bedNumber}`;
    const background = `${p.age}t, ${p.gender === 'nam' ? 'Nam' : 'Nữ'}. Chẩn đoán: ${p.currentDiagnosis || p.admissionDiagnosis}`;
    const situation = `S: ${p.sNotes}\nO: ${p.oNotes}`;
    
    await saveSBAR(profileId, {
      title,
      situation,
      background,
      assessment: p.aAssessment,
      recommendation: p.pPlan,
      isDraft: true
    });
    window.location.hash = '#/docspace/sbar';
  });

  // Create Case from SOAP
  document.getElementById('btnCreateCaseFromSoap')?.addEventListener('click', async (e) => {
    const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
    const p = id ? getSoapPatientById(profileId, id) : null;
    if (!p) return;

    await saveCase(profileId, {
      date: new Date().toISOString().split('T')[0]!,
      context: 'duty',
      chiefComplaint: p.sNotes || 'Theo dõi bệnh phòng',
      management: p.pPlan,
      lesson: '',
      icd10Label: p.currentDiagnosis || p.admissionDiagnosis
    });
    window.location.hash = '#/docspace/cases';
  });

  // AI Co-Pilot Suggestion Handlers in Edit SOAP Modal
  let activeAiTargetField: 'esSNotes' | 'esONotes' | 'esAAssessment' | 'esPPlan' = 'esAAssessment';

  document.querySelectorAll('.js-ai-suggest').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const field = (e.currentTarget as HTMLElement).getAttribute('data-field') as 'subjective' | 'objective' | 'assessment' | 'plan';
      if (!field) return;

      const profile = getActiveProfile();
      if (!profile || !profile.aiSettings || !profile.aiSettings.enabled) {
        alert('Vui lòng bật và cấu hình AI trong Cài đặt AI trước.');
        return;
      }

      const patientName = (document.getElementById('esFullName') as HTMLInputElement)?.value || 'Chưa rõ';
      const age = (document.getElementById('esAge') as HTMLInputElement)?.value || 'Chưa rõ';
      const gender = (document.getElementById('esGender') as HTMLSelectElement)?.value || 'nam';
      const admissionDiagnosis = (document.getElementById('esAdmissionDiagnosis') as HTMLInputElement)?.value || 'Chưa rõ';

      const sNotes = (document.getElementById('esSNotes') as HTMLTextAreaElement)?.value || '';
      const oNotes = (document.getElementById('esONotes') as HTMLTextAreaElement)?.value || '';
      const aAssessment = (document.getElementById('esAAssessment') as HTMLTextAreaElement)?.value || '';
      const pPlan = (document.getElementById('esPPlan') as HTMLTextAreaElement)?.value || '';

      const targetFieldMap = {
        subjective: 'esSNotes',
        objective: 'esONotes',
        assessment: 'esAAssessment',
        plan: 'esPPlan'
      } as const;

      activeAiTargetField = targetFieldMap[field];

      const box = document.getElementById('soapAiSuggestionBox');
      const textEl = document.getElementById('soapAiSuggestionText');
      if (box) box.style.display = 'block';
      if (textEl) textEl.textContent = '⚡ Đang gọi AI kết nối và truyền dữ liệu...';

      const btnEl = e.currentTarget as HTMLButtonElement;
      const originalHtml = btnEl.innerHTML;
      btnEl.disabled = true;
      btnEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang gọi...';

      try {
        let streamedContent = '';
        await generateSOAPSuggestion(
          field,
          {
            patientName,
            age,
            gender,
            admissionDiagnosis,
            pSubjective: sNotes,
            pObjective: oNotes,
            pAssessment: aAssessment,
            pPlan: pPlan
          },
          profile.aiSettings,
          (chunk) => {
            streamedContent += chunk;
            if (textEl) textEl.textContent = streamedContent;
          }
        );
      } catch (err: any) {
        if (textEl) textEl.textContent = '❌ Lỗi AI: ' + err.message;
      } finally {
        btnEl.disabled = false;
        btnEl.innerHTML = originalHtml;
      }
    });
  });

  document.getElementById('btnApplyAiSuggestion')?.addEventListener('click', () => {
    const textEl = document.getElementById('soapAiSuggestionText');
    const targetEl = document.getElementById(activeAiTargetField) as HTMLTextAreaElement;
    if (textEl && targetEl) {
      const currentVal = targetEl.value.trim();
      const aiText = textEl.textContent?.trim() || '';
      if (aiText && !aiText.startsWith('❌') && !aiText.startsWith('⚡')) {
        targetEl.value = currentVal ? `${currentVal}\n\n${aiText}` : aiText;
        const box = document.getElementById('soapAiSuggestionBox');
        if (box) box.style.display = 'none';
      }
    }
  });

  document.getElementById('btnCloseAiSuggestion')?.addEventListener('click', () => {
    const box = document.getElementById('soapAiSuggestionBox');
    if (box) box.style.display = 'none';
  });

  // Discharge Summary Modal Event Handler
  document.querySelectorAll('.js-discharge-summary').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
      if (!id) return;

      const p = getSoapPatientById(profileId, id);
      if (!p) return;

      const profile = getActiveProfile();
      if (!profile || !profile.aiSettings || !profile.aiSettings.enabled) {
        alert('Vui lòng bật và cấu hình AI trong Cài đặt AI trước.');
        return;
      }

      const modal = document.createElement('div');
      modal.className = 'dsp-modal-overlay';
      modal.style.cssText = 'position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); z-index:9999; display:flex; align-items:center; justify-content:center; padding:1rem;';
      modal.innerHTML = `
        <div class="dsp-card" style="width:100%; max-width:800px; max-height:85vh; display:flex; flex-direction:column; background:var(--color-surface); border-radius:12px; overflow:hidden;">
          <div style="padding:1rem 1.5rem; border-bottom:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; background:var(--color-bg);">
            <h3 style="margin:0; color:var(--color-primary); display:flex; align-items:center; gap:8px;">
              <i class="fa-solid fa-file-medical"></i> Tóm tắt Bệnh án Ra viện (AI Clinical Summary)
            </h3>
            <button type="button" class="dsp-icon-btn" id="btnCloseDischargeModal">&times;</button>
          </div>
          <div style="padding:1.5rem; overflow-y:auto; flex:1; font-size:13px; line-height:1.6; white-space:pre-wrap;" id="dischargeSummaryText">
            ⚡ Đang đọc diễn tiến SOAP logs và khởi tạo Tóm tắt Ra viện bằng AI...
          </div>
          <div style="padding:1rem 1.5rem; border-top:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; background:var(--color-bg);">
            <button type="button" class="dsp-btn dsp-btn-outline" id="btnCopyDischargeSummary">
              <i class="fa-solid fa-copy"></i> Sao chép văn bản
            </button>
            <button type="button" class="dsp-btn dsp-btn-primary" id="btnDoneDischargeModal">
              <i class="fa-solid fa-check"></i> Hoàn tất
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      const closeBtn = modal.querySelector('#btnCloseDischargeModal');
      const doneBtn = modal.querySelector('#btnDoneDischargeModal');
      const copyBtn = modal.querySelector('#btnCopyDischargeSummary');
      const textContainer = modal.querySelector('#dischargeSummaryText');

      const closeModal = () => modal.remove();
      closeBtn?.addEventListener('click', closeModal);
      doneBtn?.addEventListener('click', closeModal);

      copyBtn?.addEventListener('click', () => {
        const text = textContainer?.textContent || '';
        navigator.clipboard.writeText(text);
        alert('Đã sao chép Tóm tắt Ra viện vào Clipboard!');
      });

      try {
        let streamed = '';
        await generateDischargeSummary(p, p.dailyLogs || [], profile.aiSettings, (chunk) => {
          streamed += chunk;
          if (textContainer) textContainer.textContent = streamed;
        });
      } catch (err: any) {
        if (textContainer) textContainer.textContent = '❌ Lỗi AI: ' + err.message;
      }
    });
  });

  // Toggle Collapse Single Row / Card
  document.querySelectorAll('.js-toggle-row-collapse').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = (e.currentTarget as HTMLElement).closest('.dsp-soap-row');
      if (card) {
        card.classList.toggle('is-collapsed');
      }
    });
  });

  // Toggle Collapse All Cards (Thu gọn / Mở rộng tất cả)
  let isAllCollapsed = false;
  document.getElementById('btnToggleCollapseAll')?.addEventListener('click', (e) => {
    e.stopPropagation();
    isAllCollapsed = !isAllCollapsed;
    const cards = document.querySelectorAll('.dsp-soap-row');
    cards.forEach(card => {
      if (isAllCollapsed) {
        card.classList.add('is-collapsed');
      } else {
        card.classList.remove('is-collapsed');
      }
    });
    const btn = document.getElementById('btnToggleCollapseAll');
    if (btn) {
      btn.innerHTML = isAllCollapsed 
        ? `<i class="fa-solid fa-down-left-and-up-right-to-center"></i> <span>Mở rộng</span>`
        : `<i class="fa-solid fa-up-right-and-down-left-from-center"></i> <span>Thu gọn</span>`;
    }
  });

  // Delete Patient Button (Row & Modal)
  document.querySelectorAll('.js-delete-patient').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
      const p = id ? getSoapPatientById(profileId, id) : null;
      const nameStr = p ? `${p.patientCode} - ${p.fullName}` : 'bệnh nhân này';
      if (id && confirm(`Bạn có chắc chắn muốn xóa hồ sơ ${nameStr} khỏi sổ tay?`)) {
        deleteSoapPatient(profileId, id);
        window.location.hash = '#/docspace/soap';
      }
    });
  });

  document.getElementById('btnDeletePatient')?.addEventListener('click', () => {
    const id = (document.getElementById('esPatientId') as HTMLInputElement)?.value;
    const p = id ? getSoapPatientById(profileId, id) : null;
    const nameStr = p ? `${p.patientCode} - ${p.fullName}` : 'bệnh nhân này';
    if (id && confirm(`Bạn có chắc chắn muốn xóa hồ sơ ${nameStr} khỏi sổ tay?`)) {
      deleteSoapPatient(profileId, id);
      window.location.hash = '#/docspace/soap';
    }
  });

  // 1-Click Copy EMR Format
  document.getElementById('btnCopyEmrFormat')?.addEventListener('click', () => {
    const id = (document.getElementById('esPatientId') as HTMLInputElement)?.value;
    const p = getSoapPatientById(profileId, id);
    if (!p) return;

    let fullO = p.oNotes || '';
    const oLower = fullO.toLowerCase();
    const defaultFindings = [];
    
    if (!oLower.includes('tỉnh') && !oLower.includes('tri giác') && !oLower.includes('mê') && !oLower.includes('lơ mơ')) {
      defaultFindings.push('Bệnh tỉnh, tiếp xúc tốt.');
    }
    if (!oLower.includes('da') && !oLower.includes('niêm') && !oLower.includes('phù') && !oLower.includes('hạch')) {
      defaultFindings.push('Da niêm hồng, không phù, hạch ngoại vi không sờ chạm.');
    }
    if (!oLower.includes('tim') && !oLower.includes('nhịp') && !oLower.includes('t1')) {
      defaultFindings.push('Tim đều, T1 T2 rõ, không âm thổi.');
    }
    if (!oLower.includes('phổi') && !oLower.includes('rale') && !oLower.includes('thở') && !oLower.includes('ran')) {
      defaultFindings.push('Phổi thông khí 2 bên rõ, không rale.');
    }
    if (!oLower.includes('bụng') && !oLower.includes('gan') && !oLower.includes('tiêu') && !oLower.includes('lách')) {
      defaultFindings.push('Bụng mềm, gan lách không sờ chạm.');
    }
    
    if (defaultFindings.length > 0) {
      if (fullO) fullO += '\n';
      fullO += defaultFindings.join(' ');
    }

    const clsText = p.clsResults.map(r => r.text).join('\n') || 'Chưa ghi';
    const emrText = `S: \n${p.sNotes || 'Chưa ghi'}\nO: \n${fullO}\nKết quả CLS:\n${clsText}\n(A): vấn đề\n${p.aAssessment || 'Chưa ghi'}\n(P) Kế hoạch điều trị:\n${p.pPlan || 'Chưa ghi'}`;

    navigator.clipboard.writeText(emrText).then(() => {
      alert('✅ Đã sao chép định dạng tờ điều trị vào bộ nhớ tạm!\n(Các hệ cơ quan bình thường đã được tự động bổ sung vào O)');
      updateSoapPatient(profileId, id, { isEmrEntered: true });
      window.location.hash = '#/docspace/soap';
    });
  });

  // Tra cứu EBM (Smart Extraction Query)
  document.getElementById('btnSearchEBM')?.addEventListener('click', () => {
    const aText = (document.getElementById('esAAssessment') as HTMLTextAreaElement)?.value.trim() || '';
    const sText = (document.getElementById('esSNotes') as HTMLTextAreaElement)?.value.trim() || '';
    const oText = (document.getElementById('esONotes') as HTMLTextAreaElement)?.value.trim() || '';
    const diagInput = (document.getElementById('esAdmissionDiagnosis') as HTMLInputElement)?.value.trim() || '';
    const currDiagInput = (document.getElementById('esCurrentDiagnosis') as HTMLInputElement)?.value.trim() || '';

    let query = currDiagInput || diagInput;
    if (!query && aText) {
      const firstLine = aText.split('\n')[0].split('.')[0].replace(/\(.*?\)/g, '').trim();
      query = firstLine || aText;
    } else if (!query) {
      query = `${sText} ${oText}`.trim();
    }
    ebmBridge.openSearch(query || 'practice-changing', { targetFieldId: 'esAAssessment' });
  });

  // Tiếp cận chẩn đoán (Reasoning Coach)
  document.getElementById('btnReasoningCoachSoap')?.addEventListener('click', () => {
    const sText = (document.getElementById('esSNotes') as HTMLTextAreaElement)?.value || '';
    const diag = (document.getElementById('esCurrentDiagnosis') as HTMLInputElement)?.value || '';
    const query = `${diag} ${sText}`.toLowerCase();

    let defaultKey = 'dau_nguc';
    if (query.includes('thở') || query.includes('phổi') || query.includes('copd') || query.includes('hen')) defaultKey = 'kho_tho';
    else if (query.includes('sốt') || query.includes('nhiễm') || query.includes('sepsis')) defaultKey = 'sot_chua_ro_nguyen_nhan';

    const id = (document.getElementById('esPatientId') as HTMLInputElement)?.value;
    const p = id ? getSoapPatientById(profileId, id) : null;
    clinicalReasoningPanel.open('esAAssessment', p, defaultKey);
  });

  // Drug Intelligence & Kê đơn
  document.getElementById('btnDrugIntelSoap')?.addEventListener('click', () => {
    const id = (document.getElementById('esPatientId') as HTMLInputElement)?.value;
    const p = id ? getSoapPatientById(profileId, id) : null;
    drugIntelligencePanel.open('esPPlan', p);
  });

  document.getElementById('btnPrescribeSoap')?.addEventListener('click', () => {
    drugPicker.open('esPPlan');
  });

  // ICD-10 Picker
  document.getElementById('btnIcdSoap')?.addEventListener('click', () => {
    icdPicker.open('esAAssessment');
  });

  // Thang điểm
  document.getElementById('btnScoreSoap')?.addEventListener('click', () => {
    const id = (document.getElementById('esPatientId') as HTMLInputElement)?.value;
    const p = id ? getSoapPatientById(profileId, id) : null;
    calculatorPicker.open('esAAssessment', p);
  });

  // Quick Reference Drawer
  document.getElementById('btnQuickRefSoap')?.addEventListener('click', () => {
    quickReferenceDrawer.open('formulas');
  });

  // Drag and Drop Engine cho Thẻ Cận Lâm Sàng
  const LAB_TEMPLATES: Record<string, string> = {
    abg: `[Khí máu động mạch (ABG)]\n- pH: 7.38 (7.35 - 7.45)\n- pCO2: 40 mmHg (35 - 45)\n- pO2: 85 mmHg (80 - 100)\n- HCO3-: 24 mmol/L (22 - 26)\n- SaO2: 96%`,
    cbc: `[Công thức máu (CBC)]\n- WBC: 8.5 x10^9/L (Neu: 65%)\n- RBC: 4.5 x10^12/L | Hgb: 13.5 g/dL | Hct: 40%\n- PLT: 250 x10^9/L`,
    biochem: `[Sinh hóa máu]\n- Glucose: 5.6 mmol/L\n- Urea: 5.2 mmol/L | Creatinine: 85 umol/L\n- AST (SGOT): 25 U/L | ALT (SGPT): 28 U/L`,
    ion: `[Điện giải đồ]\n- Na+: 138 mmol/L (135 - 145)\n- K+: 4.0 mmol/L (3.5 - 5.0)\n- Cl-: 102 mmol/L (98 - 106)`,
    cxr: `[X-quang ngực (CXR)]\n- Phế trường 2 bên sáng đều, không tổn thương thâm nhiễm.\n- Bóng tim không to, góc màng phổi 2 bên nhọn.`,
    ecg: `[Điện tâm đồ (ECG)]\n- Nhịp xoang đều, tần số: 75 l/p.\n- Trục trung tính, không ST-T thay đổi bệnh lý.`
  };

  document.querySelectorAll<HTMLElement>('.js-lab-card').forEach(card => {
    card.addEventListener('dragstart', (e) => {
      const labType = card.getAttribute('data-lab-type') || '';
      e.dataTransfer?.setData('text/plain', LAB_TEMPLATES[labType] || '');
      card.style.opacity = '0.5';
    });
    card.addEventListener('dragend', () => {
      card.style.opacity = '1';
    });
  });

  const dropTargets = ['esSNotes', 'esONotes', 'esClsQuickPaste'];
  dropTargets.forEach(id => {
    const targetEl = document.getElementById(id) as HTMLTextAreaElement;
    if (!targetEl) return;

    targetEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      targetEl.style.borderColor = 'var(--color-primary)';
      targetEl.style.backgroundColor = 'rgba(2, 132, 199, 0.05)';
    });

    targetEl.addEventListener('dragleave', () => {
      targetEl.style.borderColor = 'var(--color-border)';
      targetEl.style.backgroundColor = '';
    });

    targetEl.addEventListener('drop', (e) => {
      e.preventDefault();
      targetEl.style.borderColor = 'var(--color-border)';
      targetEl.style.backgroundColor = '';
      const textData = e.dataTransfer?.getData('text/plain');
      if (textData) {
        const startPos = targetEl.selectionStart || targetEl.value.length;
        const endPos = targetEl.selectionEnd || targetEl.value.length;
        const currentVal = targetEl.value;
        const prefix = currentVal.length > 0 && !currentVal.endsWith('\n') ? '\n' : '';
        targetEl.value = currentVal.substring(0, startPos) + prefix + textData + currentVal.substring(endPos);
      }
    });
  });

  // Khởi tạo các sự kiện AI & Protocol Bridge (SOAP ↔ Protocol)
  initSoapAiBridgeEvents(profileId);
}
