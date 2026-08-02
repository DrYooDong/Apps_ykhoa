/**
 * DocSpace — Sổ Tay Bệnh Phòng SOAP Digital
 * Quản lý diễn tiến bệnh phòng, Cận lâm sàng, Lịch sử theo Ngày, In Phiếu Theo Dõi & Đồng bộ Cloud Supabase
 */

import { 
  getAllSoapPatients, getSoapPatientById, saveSoapPatient, updateSoapPatient, deleteSoapPatient,
  getSoapSupabaseConfig, saveSoapSupabaseConfig, fetchAllSoapFromSupabase,
  addSoapDailyLog, switchSoapPatientDate, getProfile, saveSBAR, saveCase
} from '../storage';
import { SoapPatientRecord } from '../types';
import { renderSidebar } from '../docspace-view';
import { icdPicker } from './icd-picker';
import { ebmBridge } from './ebm-bridge-view';
import { drugPicker } from './drug-picker';
import { calculatorPicker } from './calculator-picker';
import { resourcePicker } from './resource-picker';

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
  const today = new Date().toISOString().split('T')[0];
  return localStorage.getItem('dsp_soap_master_date') || today;
}

function setMasterDate(dateStr: string): void {
  localStorage.setItem('dsp_soap_master_date', dateStr);
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

export async function renderSoapView(profileId: string, activePatientId?: string): Promise<string> {
  const profile = getProfile(profileId);
  if (!profile) return '<div>Hồ sơ không tồn tại</div>';

  const masterDate = getMasterDate();
  const patients = getAllSoapPatients(profileId);

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
      <tr class="dsp-soap-row" style="border-bottom: 1px solid var(--color-border);" data-patient-id="${p.id}">
        <!-- Cột 1: Bệnh nhân -->
        <td style="padding:10px; vertical-align:top; width:22%;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div>
              <div style="font-weight:700; font-size:15px; color:var(--color-primary);">
                ${p.patientCode} - ${p.fullName}
              </div>
              <div style="font-size:12px; color:var(--color-text-muted); margin-top:4px;">
                (${p.age}t · ${p.gender === 'nam' ? 'Nam' : p.gender === 'nu' ? 'Nữ' : 'Khác'}) · Giường: <strong>${p.bedNumber}</strong>
              </div>
              <div style="font-size:12px; margin-top:6px;">
                <strong>Chẩn đoán:</strong> ${p.admissionDiagnosis}
              </div>
            </div>
            <button class="dsp-btn dsp-btn-ghost js-toggle-row-collapse" data-id="${p.id}" title="Thu gọn/Mở rộng" style="padding:4px 8px; font-size:12px; border:none; background:rgba(0,0,0,0.03);">
              <i class="fa-solid fa-chevron-up"></i>
            </button>
          </div>

          <div class="dsp-soap-col-content">
            <!-- Lịch sử Ngày & Ngày bệnh -->
            <div style="margin-top:10px; border-top:1px dashed var(--color-border); padding-top:8px;">
              <div style="font-size:10px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase; margin-bottom:4px; display:flex; justify-content:space-between; align-items:center;">
                <span><i class="fa-solid fa-calendar-days"></i> Ngày Diễn Tiến:</span>
                <button class="js-add-date" data-id="${p.id}" title="Thêm ngày mới" style="background:none; border:none; color:var(--color-primary); font-weight:700; cursor:pointer; font-size:11px;">
                  <i class="fa-solid fa-plus-circle"></i> + Ngày
                </button>
              </div>
              <div style="display:flex; flex-wrap:wrap; gap:4px;">
                ${dateBadgesHtml}
              </div>
            </div>

            <div style="margin-top:10px; display:flex; flex-wrap:wrap; gap:4px;">
              <span style="font-size:10px; padding:2px 8px; border-radius:12px; font-weight:600; ${p.isEmrEntered ? 'background:#dcfce7; color:#15803d;' : 'background:#fef3c7; color:#b45309;'}">
                ${p.isEmrEntered ? '✓ Đã nhập EMR' : '⏳ Chưa nhập EMR'}
              </span>
              <span style="font-size:10px; padding:2px 8px; border-radius:12px; font-weight:600; ${p.soapStatus === 'da_lam' ? 'background:#e0f2fe; color:#0369a1;' : 'background:#f3f4f6; color:#4b5563;'}">
                ${p.soapStatus === 'da_lam' ? '✓ Đã làm SOAP' : '○ Chưa làm SOAP'}
              </span>
            </div>
            <div style="margin-top:12px; display:flex; gap:6px; flex-wrap:wrap;">
              <button class="dsp-btn dsp-btn-sm dsp-btn-ghost js-edit-soap" data-id="${p.id}" title="Chỉnh sửa SOAP">
                <i class="fa-solid fa-pen"></i> Chỉnh sửa
              </button>
              <button class="dsp-btn dsp-btn-sm dsp-btn-ghost js-toggle-emr" data-id="${p.id}" title="Đổi trạng thái EMR">
                <i class="fa-solid fa-rotate"></i> EMR
              </button>
              <button class="dsp-btn dsp-btn-sm dsp-btn-ghost js-delete-patient" data-id="${p.id}" title="Xóa hồ sơ bệnh nhân" style="color:var(--color-danger);">
                <i class="fa-solid fa-trash"></i> Xóa
              </button>
            </div>
          </div>
        </td>

        <!-- Cột 2: S & O (Triệu chứng) -->
        <td style="padding:10px; vertical-align:top; width:20%; line-height:1.5; font-size:13px;">
          <div class="dsp-soap-col-content">
            <div style="margin-bottom:6px;">
              <strong style="color:var(--color-primary);">S:</strong><br>
              ${highlightAlerts(p.sNotes)}
            </div>
            <div>
              <strong style="color:var(--color-primary);">O:</strong><br>
              ${highlightAlerts(p.oNotes)}
            </div>
          </div>
        </td>

        <!-- Cột 3: CLS Cần Làm & KQ CLS -->
        <td style="padding:10px; vertical-align:top; width:22%; font-size:13px;">
          <div class="dsp-soap-col-content">
            <div style="margin-bottom:10px;">
              <div style="font-size:11px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase; margin-bottom:4px;">CLS Cần Làm:</div>
              <div style="display:flex; flex-direction:column; gap:4px;">
                ${(p.clsOrders || []).map(o => `
                  <label style="display:flex; align-items:center; gap:6px; font-size:12px; cursor:pointer;">
                    <input type="checkbox" class="js-cls-order-toggle" data-patient="${p.id}" data-order="${o.id}" ${o.isDone ? 'checked' : ''} />
                    <span style="${o.isDone ? 'text-decoration:line-through; opacity:0.6;' : ''}">${o.name}</span>
                  </label>
                `).join('') || '<span style="font-size:12px; color:var(--color-text-muted); italic;">Chưa có chỉ định</span>'}
              </div>
            </div>

            <div style="margin-top:12px; border-top:1px dashed var(--color-border); padding-top:8px;">
              <div style="font-size:11px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase; margin-bottom:4px;">KQ CLS:</div>
              <div style="display:flex; flex-direction:column; gap:4px;">
                ${(p.clsResults || []).map(r => `
                  <div style="font-size:12px; padding:4px 6px; border-radius:4px; ${r.alertLevel !== 'normal' ? 'background:rgba(239,68,68,0.1); color:var(--color-danger); font-weight:600;' : 'background:var(--color-bg);'}">
                    • ${r.text}
                  </div>
                `).join('') || '<span style="font-size:12px; color:var(--color-text-muted); italic;">Chưa có KQ</span>'}
              </div>
            </div>
          </div>
        </td>

        <!-- Cột 4: A (Đánh Giá & Biện Luận) -->
        <td style="padding:10px; vertical-align:top; width:18%; line-height:1.5; font-size:13px;">
          <div class="dsp-soap-col-content">
            <div style="font-size:11px; font-weight:700; color:var(--color-primary); margin-bottom:4px;">Ngày bệnh: N${p.dayOfIllness} (${p.activeDate || 'Hôm nay'})</div>
            ${highlightAlerts(p.aAssessment)}
          </div>
        </td>

        <!-- Cột 5: P (Y Lệnh) -->
        <td style="padding:10px; vertical-align:top; width:18%; line-height:1.5; font-size:13px;">
          <div class="dsp-soap-col-content">
            ${highlightAlerts(p.pPlan)}
          </div>
        </td>
      </tr>
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
        <div class="dsp-page-content" style="max-width:100%;">
          
          <!-- Header Bar -->
          <div class="dsp-hero-header">
            <div class="dsp-hero-content">
              <h1 class="dsp-hero-title">
                <i class="fa-solid fa-notes-medical"></i> Sổ Tay Bệnh Phòng SOAP
              </h1>
              <p class="dsp-hero-subtitle">Theo dõi diễn tiến lâm sàng, In Phiếu Theo Dõi Bệnh Nhân & đồng bộ Cloud Supabase</p>
            </div>
            
            <div class="dsp-hero-actions">
              <!-- CHỌN NGÀY CHÍNH (MASTER DATE SELECTOR) -->
              <div style="display:flex; align-items:center; background:var(--color-surface); border:1px solid var(--color-border); border-radius:8px; padding:6px 12px; gap:8px; box-shadow:0 1px 2px rgba(0,0,0,0.05);">
                <i class="fa-solid fa-calendar-day" style="color:var(--color-primary); font-size:14px;"></i>
                <span style="font-size:12px; font-weight:700; color:var(--color-text-muted);">NGÀY ĐI BUỒNG:</span>
                <input type="date" id="masterDateSelect" value="${masterDate}" style="border:none; background:transparent; font-size:13px; font-weight:700; color:var(--color-primary); cursor:pointer; outline:none;" />
              </div>

              <!-- NÚT IN PHIẾU THEO DÕI -->
              <button class="dsp-btn dsp-btn-ghost" id="btnPrintAllSoap" title="In Phiếu Theo Dõi Toàn Khoa" style="border:1px solid rgba(0,0,0,0.1);">
                <i class="fa-solid fa-print"></i> In Phiếu Theo Dõi
              </button>

              <button class="dsp-btn dsp-btn-ghost" id="btnSupabaseModal" title="Cấu hình Supabase Cloud Sync" style="border:1px solid rgba(0,0,0,0.1);">
                <i class="fa-solid fa-cloud" style="color:${isSbConnected ? '#10b981' : '#94a3b8'};"></i>
                <span>${isSbConnected ? 'Supabase: Đã kết nối' : 'Supabase: Cấu hình Sync'}</span>
              </button>
              <button class="dsp-btn dsp-btn-ghost" id="btnExistingPatient">
                <i class="fa-solid fa-bed-pulse"></i> Bệnh Nội Trú
              </button>
              <button class="dsp-btn dsp-btn-primary" id="btnNewPatient">
                <i class="fa-solid fa-user-plus"></i> Nhận Bệnh Mới
              </button>
            </div>
          </div>

          <!-- Bảng Matrix Table -->
          <div style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:12px; overflow:hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <div style="overflow-x:auto;">
              <table style="width:100%; border-collapse:collapse; text-align:left;">
                <thead>
                  <tr style="background:var(--color-bg); border-bottom:1px solid var(--color-border); font-size:12px; color:var(--color-text-muted); text-transform:uppercase;">
                    <th style="padding:12px 14px;">Bệnh Nhân & Ngày</th>
                    <th style="padding:12px 14px;">Diễn Biến (S & O)</th>
                    <th style="padding:12px 14px;">CLS Cần Làm & KQ CLS</th>
                    <th style="padding:12px 14px;">A (Đánh Giá)</th>
                    <th style="padding:12px 14px;">P (Y Lệnh)</th>
                  </tr>
                </thead>
                <tbody>
                  ${rowsHtml.length > 0 ? rowsHtml : `
                    <tr>
                      <td colSpan="5" style="text-align:center; padding:40px; color:var(--color-text-muted);">
                        Chưa có bệnh nhân nào trong sổ tay. Bấm <strong>"Nhận Bệnh Mới"</strong> hoặc <strong>"Bệnh Nội Trú"</strong> để bắt đầu.
                      </td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>

    <!-- Container In Phiếu Theo Dõi Bệnh Nhân (@media print) -->
    <div id="soapPrintArea" style="display:none;"></div>

    <!-- Modal Form Nhận Bệnh -->
    <div id="modalNewPatient" style="display:none; position:fixed; inset:0; z-index:999; background:rgba(0,0,0,0.5); align-items:center; justify-content:center; padding:20px;">
      <div style="background:var(--color-surface); border-radius:12px; max-width:500px; width:100%; padding:24px; box-shadow:0 10px 25px rgba(0,0,0,0.2);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <h3 id="modalNewPatientTitle" style="margin:0; font-size:18px;"><i class="fa-solid fa-user-plus"></i> Nhận Bệnh Mới Vào Khoa</h3>
          <button id="btnCloseNewPatientModal" style="background:none; border:none; font-size:20px; cursor:pointer; color:var(--color-text-muted);">&times;</button>
        </div>
        <form id="formNewPatient">
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
    <div id="modalSupabase" style="display:none; position:fixed; inset:0; z-index:999; background:rgba(0,0,0,0.5); align-items:center; justify-content:center; padding:20px;">
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
    <div id="modalPrintOptions" style="display:none; position:fixed; inset:0; z-index:999; background:rgba(0,0,0,0.5); align-items:center; justify-content:center; padding:20px;">
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
    <div id="modalEditSoap" style="display:${activePatient ? 'flex' : 'none'}; position:fixed; inset:0; z-index:999; background:rgba(0,0,0,0.5); align-items:center; justify-content:center; padding:20px;">
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
    <div style="background:var(--color-surface); border-radius:12px; max-width:850px; width:100%; max-height:90vh; display:flex; flex-direction:column; box-shadow:0 10px 25px rgba(0,0,0,0.2); overflow:hidden;">
      <div style="padding:16px 20px; border-bottom:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; background:var(--color-bg);">
        <div>
          <h3 style="margin:0; font-size:18px; color:var(--color-primary);">${p.patientCode} - ${p.fullName}</h3>
          <div style="font-size:12px; color:var(--color-text-muted); margin-top:2px;">
            ${p.age}t · ${p.gender === 'nam' ? 'Nam' : 'Nữ'} · Giường ${p.bedNumber} · HS: ${p.medicalRecordNo}
          </div>
        </div>
        <button id="btnCloseEditSoapModal" style="background:none; border:none; font-size:24px; cursor:pointer; color:var(--color-text-muted);">&times;</button>
      </div>

      <!-- Select Date Bar -->
      <div style="padding:10px 20px; background:var(--color-surface); border-bottom:1px solid var(--color-border); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px;">
        <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
          <span style="font-size:12px; font-weight:700; color:var(--color-text-muted);"><i class="fa-solid fa-calendar-day"></i> Ngày Diễn Tiến:</span>
          ${dateBadgesHtml}
        </div>

        <button type="button" id="btnModalAddDate" data-id="${p.id}" class="dsp-btn dsp-btn-sm dsp-btn-ghost" style="color:var(--color-primary); border:1px dashed var(--color-primary);">
          <i class="fa-solid fa-plus-circle"></i> + Thêm Ngày Diễn Tiến Mới
        </button>
      </div>

      <div style="padding:20px; overflow-y:auto; flex:1; display:flex; flex-direction:column; gap:16px;">
        <form id="formEditSoap">
          <input type="hidden" id="esPatientId" value="${p.id}" />

          <!-- Thông tin hành chính bệnh nhân -->
          <details style="margin-bottom:16px; background:var(--color-bg); border:1px solid var(--color-border); border-radius:8px; padding:10px;">
            <summary style="font-size:13px; font-weight:700; color:var(--color-primary); cursor:pointer; user-select:none; display:flex; align-items:center; justify-content:space-between;">
              <span><i class="fa-solid fa-id-card"></i> Sửa thông tin hành chính (Mã BN, Tên, Tuổi, Giường, Chẩn đoán...)</span>
              <span style="font-size:11px; color:var(--color-text-muted); font-weight:normal;">(Bấm để mở rộng/thu gọn)</span>
            </summary>
            
            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-top:12px;">
              <div>
                <label style="font-size:11px; font-weight:600; display:block; margin-bottom:4px;">Mã BN / Ký hiệu *</label>
                <input type="text" id="esPatientCode" value="${p.patientCode || ''}" required class="dsp-input" style="width:100%; font-size:12px;" />
              </div>
              <div>
                <label style="font-size:11px; font-weight:600; display:block; margin-bottom:4px;">Số Giường *</label>
                <input type="text" id="esBedNumber" value="${p.bedNumber || ''}" required class="dsp-input" style="width:100%; font-size:12px;" />
              </div>
              <div>
                <label style="font-size:11px; font-weight:600; display:block; margin-bottom:4px;">Họ và Tên *</label>
                <input type="text" id="esFullName" value="${p.fullName || ''}" required class="dsp-input" style="width:100%; font-size:12px;" />
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-top:10px;">
              <div>
                <label style="font-size:11px; font-weight:600; display:block; margin-bottom:4px;">Tuổi *</label>
                <input type="number" id="esAge" value="${p.age || 0}" required class="dsp-input" style="width:100%; font-size:12px;" />
              </div>
              <div>
                <label style="font-size:11px; font-weight:600; display:block; margin-bottom:4px;">Giới tính</label>
                <select id="esGender" class="dsp-input" style="width:100%; font-size:12px;">
                  <option value="nam" ${p.gender === 'nam' ? 'selected' : ''}>Nam</option>
                  <option value="nu" ${p.gender === 'nu' ? 'selected' : ''}>Nữ</option>
                  <option value="khac" ${p.gender === 'khac' ? 'selected' : ''}>Khác</option>
                </select>
              </div>
              <div>
                <label style="font-size:11px; font-weight:600; display:block; margin-bottom:4px;">Số Bệnh Án</label>
                <input type="text" id="esMedicalRecordNo" value="${p.medicalRecordNo || ''}" class="dsp-input" style="width:100%; font-size:12px;" />
              </div>
            </div>

            <div style="margin-top:10px;">
              <label style="font-size:11px; font-weight:600; display:block; margin-bottom:4px;">Chẩn đoán vào khoa *</label>
              <input type="text" id="esAdmissionDiagnosis" value="${p.admissionDiagnosis || ''}" required class="dsp-input" style="width:100%; font-size:12px;" />
            </div>
          </details>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
            <div>
              <label style="font-size:12px; font-weight:700; display:block; margin-bottom:4px;">S</label>
              <textarea id="esSNotes" rows="3" class="dsp-input" style="width:100%; font-size:13px; line-height:1.4;" placeholder="Triệu chứng chủ quan...">${p.sNotes || ''}</textarea>
            </div>
            <div>
              <label style="font-size:12px; font-weight:700; display:block; margin-bottom:4px;">O</label>
              <textarea id="esONotes" rows="3" class="dsp-input" style="width:100%; font-size:13px; line-height:1.4;" placeholder="Khám thực thể...">${p.oNotes || ''}</textarea>
            </div>
          </div>
          
          <div style="margin-bottom:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <label style="font-size:12px; font-weight:700; display:block; margin:0;">(A) Đánh giá & Chẩn đoán</label>
              <div style="display:flex; gap:4px;">
                <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnIcdSoap" style="color:var(--color-primary); padding:2px 8px; font-size:11px; height:auto; min-height:0;">
                  <i class="fa-solid fa-list-ul"></i> + ICD-10
                </button>
                <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnScoreSoap" style="color:var(--color-primary); padding:2px 8px; font-size:11px; height:auto; min-height:0;">
                  <i class="fa-solid fa-calculator"></i> + Thang điểm
                </button>
                <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-primary" id="btnSearchEBM" style="padding:2px 8px; font-size:11px; height:auto; min-height:0;">
                  <i class="fa-solid fa-book-medical"></i> Tra cứu EBM
                </button>
              </div>
            </div>
            <textarea id="esAAssessment" rows="4" class="dsp-input" style="width:100%; font-size:13px; line-height:1.4;" placeholder="Ghi nhận đánh giá lâm sàng hoặc chẩn đoán (Ví dụ: Suy tim (I50.0), Đái tháo đường (E11.9))...">${p.aAssessment || ''}</textarea>
          </div>

          <div style="margin-bottom:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <label style="font-size:12px; font-weight:700; display:block; margin:0;">Y lệnh (P)</label>
              <div style="display:flex; gap:4px;">
                <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnPrescribeSoap" style="color:var(--color-primary); padding:2px 8px; font-size:11px; height:auto; min-height:0;">
                  <i class="fa-solid fa-capsules"></i> + Kê đơn
                </button>
                <button type="button" class="dsp-btn dsp-btn-sm dsp-btn-ghost" id="btnSkillSoap" style="color:var(--color-primary); padding:2px 8px; font-size:11px; height:auto; min-height:0;">
                  <i class="fa-solid fa-hand-holding-medical"></i> + Kỹ năng
                </button>
              </div>
            </div>
            <textarea id="esPPlan" rows="4" class="dsp-input" style="width:100%; font-size:13px; line-height:1.4;">${p.pPlan || ''}</textarea>
          </div>

          <div style="background:var(--color-bg); padding:12px; border-radius:8px; border:1px solid var(--color-border); margin-bottom:16px;">
            <div style="font-size:12px; font-weight:700; margin-bottom:8px;">KẾT QUẢ CLS DÁN NHANH:</div>
            <textarea id="esClsQuickPaste" rows="2" placeholder="Dán kết quả CLS mới vào đây..." class="dsp-input" style="width:100%; font-size:12px;"></textarea>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--color-border); padding-top:16px;">
            <div style="display:flex; gap:8px;">
              <button type="button" id="btnCopyEmrFormat" class="dsp-btn dsp-btn-ghost" style="color:var(--color-primary);">
                <i class="fa-solid fa-copy"></i> 1-Click Copy EMR
              </button>
              <button type="button" class="dsp-btn dsp-btn-ghost" id="btnCreateSbarFromSoap" data-id="${p.id}" style="color:var(--color-text);">
                <i class="fa-solid fa-file-waveform"></i> Tạo SBAR
              </button>
              <button type="button" class="dsp-btn dsp-btn-ghost" id="btnCreateCaseFromSoap" data-id="${p.id}" style="color:var(--color-text);">
                <i class="fa-solid fa-stethoscope"></i> Lưu Ca Bệnh
              </button>
            </div>

            <div style="display:flex; gap:8px;">
              <button type="button" id="btnDeletePatient" class="dsp-btn dsp-btn-ghost" style="color:var(--color-danger);">
                <i class="fa-solid fa-trash"></i> Xóa
              </button>
              <button type="submit" class="dsp-btn dsp-btn-primary">
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
      icdCode = parts[0].trim();
      icdLabel = parts.slice(1).join(' - ').trim();
    }
    const dayOfIllness = parseInt((document.getElementById('npDayOfIllness') as HTMLInputElement).value, 10) || 1;

    saveSoapPatient(profileId, {
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
    const quickPaste = (document.getElementById('esClsQuickPaste') as HTMLTextAreaElement).value.trim();

    const p = getSoapPatientById(profileId, id);
    if (!p) return;

    const newResults = [...p.clsResults];
    if (quickPaste) {
      newResults.push({
        id: Date.now().toString(),
        text: quickPaste,
        alertLevel: ALERT_KEYWORDS.some(kw => quickPaste.toLowerCase().includes(kw)) ? 'high' : 'normal'
      });
    }

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
      soapStatus: 'da_lam',
      clsResults: newResults
    });

    window.location.hash = '#/docspace/soap';
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
      date: new Date().toISOString().split('T')[0],
      context: 'duty',
      chiefComplaint: p.sNotes || 'Theo dõi bệnh phòng',
      management: p.pPlan,
      lesson: '',
      icd10Label: p.currentDiagnosis || p.admissionDiagnosis
    });
    window.location.hash = '#/docspace/cases';
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

  // Tra cứu EBM (đã nâng cấp để nhận nhiều mã ICD)
  document.getElementById('btnSearchEBM')?.addEventListener('click', () => {
    const text = (document.getElementById('esAAssessment') as HTMLTextAreaElement).value;
    if (!text.trim()) {
      alert('Vui lòng nhập chẩn đoán trước khi tra cứu.');
      return;
    }
    ebmBridge.openSearch(text);
  });

  // Kê đơn
  document.getElementById('btnPrescribeSoap')?.addEventListener('click', () => {
    drugPicker.open('esPPlan');
  });

  // ICD-10 Picker
  document.getElementById('btnIcdSoap')?.addEventListener('click', () => {
    icdPicker.open('esAAssessment');
  });

  // Thang điểm
  document.getElementById('btnScoreSoap')?.addEventListener('click', () => {
    calculatorPicker.open('esAAssessment');
  });

  // Kỹ năng
  document.getElementById('btnSkillSoap')?.addEventListener('click', () => {
    resourcePicker.open({
      title: 'Kho Kỹ năng & Thủ thuật',
      icon: 'fa-solid fa-hand-holding-medical',
      jsonUrl: 'content/skills/index.json',
      mode: 'insertText',
      targetInputId: 'esPPlan',
      prefixText: '- Chỉ định thực hiện: '
    });
  });
}
