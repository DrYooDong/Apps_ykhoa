/**
 * DocSpace — Patient Demographics View
 * Quản lý thông tin hành chính, tiền sử và dị ứng bệnh nhân
 */

import { getAllPatients, savePatient, deletePatient, updatePatient, getVitalsForPatient, saveVital } from '../storage';
import { PatientDemographic, AllergyEntry } from '../types';
import { renderSidebar, renderDocSpaceHeader, formatDate, escapeHtml } from '../docspace-view';
import { getActiveProfile } from '../storage';

export async function renderPatientDemographicsView(profileId: string): Promise<string> {
  const profile = getActiveProfile();
  if (!profile) return '';

  const patients = getAllPatients(profileId);

  const listHtml = patients.length
    ? patients.map(p => `
        <div class="dsp-list-item dsp-patient-card" data-patient-id="${p.id}" style="align-items: flex-start;">
          <div class="dsp-list-item-icon" style="background: var(--color-bg); color: var(--color-primary); margin-top: 4px;">
            <i class="fa-solid fa-user-injured"></i>
          </div>
          <div class="dsp-list-item-body">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 0.5rem;">
              <div>
                <span class="dsp-badge" style="background: var(--color-bg); color: var(--color-text-muted); margin-right: 0.5rem;">${escapeHtml(p.medicalRecordNo)}</span>
                <span class="dsp-badge dsp-badge--${p.gender === 'nam' ? 'info' : (p.gender === 'nu' ? 'danger' : 'warning')}">${p.gender.toUpperCase()}</span>
              </div>
              <button type="button" class="dsp-icon-btn dsp-icon-btn--danger" data-action="delete-patient" data-id="${p.id}" title="Xóa bệnh nhân">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
            <div class="dsp-list-item-title" style="margin-bottom: 0.25rem; font-size: 1.05rem;">
              <a href="javascript:void(0)" data-action="edit-patient" data-id="${p.id}" style="text-decoration:none; color:inherit;">
                ${escapeHtml(p.fullName)} ${p.dob ? `(${calculateAge(p.dob)}t)` : ''}
              </a>
            </div>
            ${p.allergies && p.allergies.length > 0 ? `
              <div style="margin-top: 0.5rem;">
                ${p.allergies.map(a => `<span class="dsp-badge" style="background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca;"><i class="fa-solid fa-triangle-exclamation"></i> Dị ứng: ${escapeHtml(a.allergen)}</span>`).join(' ')}
              </div>
            ` : ''}
            <div style="margin-top: 0.5rem; display: flex; gap: 0.5rem;">
              <a href="#/docspace/chronic-care" class="dsp-btn dsp-btn-ghost dsp-btn-sm" style="font-size: 0.72rem; padding: 2px 6px; color: #ef4444;" title="Theo dõi diễn tiến ĐTĐ, THA, CKD">
                <i class="fa-solid fa-heart-pulse"></i> Hồ sơ Mạn tính
              </a>
              <a href="#/docspace/soap" class="dsp-btn dsp-btn-ghost dsp-btn-sm" style="font-size: 0.72rem; padding: 2px 6px; color: var(--color-primary);" title="Mở sổ tay SOAP">
                <i class="fa-solid fa-notes-medical"></i> Sổ tay SOAP
              </a>
            </div>
          </div>
        </div>
      `).join('')
    : `<div class="dsp-empty-state">
         <i class="fa-solid fa-users"></i>
         <p>Chưa có hồ sơ bệnh nhân nào. Hãy thêm bệnh nhân mới →</p>
       </div>`;

  return `
    <div class="dsp-layout" id="dspLayout">
      ${renderSidebar(profile, 'patients')}
      <main class="dsp-main">
        ${renderDocSpaceHeader(profile, 'patients')}
        <div class="dsp-page-content">

          <div class="dsp-page-header">
            <h1 class="dsp-page-title"><i class="fa-solid fa-users"></i> Hồ sơ Bệnh nhân (Demographics)</h1>
            <p class="dsp-page-subtitle">Quản lý tập trung thông tin hành chính, tiền sử bệnh và dị ứng.</p>
          </div>

          <div class="dsp-two-col">
            <!-- Left: Form -->
            <div class="dsp-col-main">
              <div class="dsp-card">
                <div class="dsp-card-header">
                  <h2 class="dsp-card-title" id="formTitle">Thêm Bệnh nhân mới</h2>
                </div>
                <div class="dsp-card-body">
                  <form id="patientForm" class="dsp-form">
                    <input type="hidden" id="editPatientId" value="">
                    
                    <h3 style="font-size: 1rem; color: var(--color-primary); margin-bottom: 1rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">Thông tin Hành chính</h3>
                    
                    <div class="dsp-form-row">
                      <div class="dsp-form-group">
                        <label>Mã BN / Số Hồ sơ <span style="color:red">*</span></label>
                        <input type="text" id="patientCode" class="dsp-input" required placeholder="VD: BN-12345">
                      </div>
                      <div class="dsp-form-group">
                        <label>Họ và tên <span style="color:red">*</span></label>
                        <input type="text" id="patientName" class="dsp-input" required placeholder="VD: Nguyễn Văn A">
                      </div>
                    </div>

                    <div class="dsp-form-row">
                      <div class="dsp-form-group">
                        <label>Ngày sinh (YYYY-MM-DD)</label>
                        <input type="date" id="patientDob" class="dsp-input">
                      </div>
                      <div class="dsp-form-group">
                        <label>Giới tính <span style="color:red">*</span></label>
                        <select id="patientGender" class="dsp-input" required>
                          <option value="nam">Nam</option>
                          <option value="nu">Nữ</option>
                          <option value="khac">Khác</option>
                        </select>
                      </div>
                    </div>
                    
                    <div class="dsp-form-row">
                      <div class="dsp-form-group">
                        <label>Số điện thoại</label>
                        <input type="tel" id="patientPhone" class="dsp-input" placeholder="0901234567">
                      </div>
                      <div class="dsp-form-group">
                        <label>Địa chỉ</label>
                        <input type="text" id="patientAddress" class="dsp-input" placeholder="Quận/Huyện, Tỉnh/TP">
                      </div>
                    </div>

                    <h3 style="font-size: 1rem; color: var(--color-primary); margin-top: 1.5rem; margin-bottom: 1rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">Tiền sử (Medical History)</h3>
                    <div class="dsp-form-group">
                      <label>Bệnh lý Nội khoa (cách nhau dấu phẩy)</label>
                      <input type="text" id="histMedical" class="dsp-input" placeholder="VD: Tăng huyết áp, Đái tháo đường tuýp 2">
                    </div>
                    <div class="dsp-form-group">
                      <label>Phẫu thuật / Ngoại khoa</label>
                      <input type="text" id="histSurgical" class="dsp-input" placeholder="VD: Mổ ruột thừa năm 2010">
                    </div>

                    <h3 style="font-size: 1rem; color: #b91c1c; margin-top: 1.5rem; margin-bottom: 1rem; border-bottom: 1px solid var(--color-border); padding-bottom: 0.5rem;">Dị ứng (Allergies)</h3>
                    <div class="dsp-form-group">
                      <label>Tác nhân dị ứng & Biểu hiện (cách nhau dấu phẩy)</label>
                      <input type="text" id="patientAllergies" class="dsp-input" placeholder="VD: Penicillin (Sốc phản vệ), Tôm (Mề đay)">
                      <div class="dsp-form-hint">Nhập tự do các loại dị ứng của bệnh nhân để hệ thống cảnh báo.</div>
                    </div>

                    <div style="margin-top: 1.5rem; display: flex; gap: 0.5rem; justify-content: flex-end;">
                      <button type="button" class="dsp-btn" id="btnCancelEdit" style="display:none;">Hủy</button>
                      <button type="submit" class="dsp-btn dsp-btn--primary">Lưu Hồ sơ</button>
                    </div>
                  </form>
                </div>
              </div>

              <!-- Medications Section (Only visible when editing) -->
              <div class="dsp-card" id="medsSection" style="display: none; margin-top: 1.5rem;">
                <div class="dsp-card-header">
                  <h2 class="dsp-card-title"><i class="fa-solid fa-capsules"></i> Đơn thuốc (e-Prescribing)</h2>
                </div>
                <div class="dsp-card-body">
                  <form id="medsForm" class="dsp-form">
                    <div class="dsp-form-row">
                      <div class="dsp-form-group">
                        <label>Tên thuốc <span style="color:red">*</span></label>
                        <input type="text" id="medName" class="dsp-input" required placeholder="VD: Amlodipin">
                      </div>
                      <div class="dsp-form-group">
                        <label>Liều lượng</label>
                        <input type="text" id="medDosage" class="dsp-input" placeholder="VD: 5mg">
                      </div>
                    </div>
                    <div class="dsp-form-row">
                      <div class="dsp-form-group">
                        <label>Đường dùng</label>
                        <select id="medRoute" class="dsp-input">
                          <option value="Uống">Uống (PO)</option>
                          <option value="Tiêm tĩnh mạch">Tiêm tĩnh mạch (IV)</option>
                          <option value="Tiêm bắp">Tiêm bắp (IM)</option>
                          <option value="Tiêm dưới da">Tiêm dưới da (SC)</option>
                          <option value="Ngậm dưới lưỡi">Ngậm dưới lưỡi (SL)</option>
                          <option value="Tại chỗ">Tại chỗ / Bôi</option>
                        </select>
                      </div>
                      <div class="dsp-form-group">
                        <label>Tần suất</label>
                        <input type="text" id="medFreq" class="dsp-input" placeholder="VD: 1 viên x 2 lần/ngày">
                      </div>
                    </div>
                    <div class="dsp-form-row">
                      <div class="dsp-form-group">
                        <label>Trạng thái</label>
                        <select id="medStatus" class="dsp-input">
                          <option value="active">Đang dùng</option>
                          <option value="discontinued">Đã ngưng</option>
                        </select>
                      </div>
                      <div class="dsp-form-group" style="display: flex; align-items: flex-end; justify-content: flex-end;">
                        <button type="submit" class="dsp-btn dsp-btn-sm dsp-btn--primary" style="width: 100%;"><i class="fa-solid fa-plus"></i> Thêm Thuốc</button>
                      </div>
                    </div>
                  </form>
                  <div id="medsListContainer" style="margin-top: 1.5rem;">
                    <!-- List of medications -->
                  </div>
                </div>
              </div>

              <!-- Vitals Section (Only visible when editing) -->
              <div class="dsp-card" id="vitalsSection" style="display: none; margin-top: 1.5rem;">
                <div class="dsp-card-header">
                  <h2 class="dsp-card-title"><i class="fa-solid fa-heart-pulse"></i> Sinh hiệu & Chỉ số</h2>
                </div>
                <div class="dsp-card-body">
                  <form id="vitalsForm" class="dsp-form">
                    <div class="dsp-form-row">
                      <div class="dsp-form-group">
                        <label>Mạch (l/p)</label>
                        <input type="number" id="vitalHR" class="dsp-input" placeholder="VD: 80">
                      </div>
                      <div class="dsp-form-group">
                        <label>Huyết áp (mmHg)</label>
                        <div style="display:flex; gap:0.5rem; align-items:center;">
                          <input type="number" id="vitalBPSys" class="dsp-input" placeholder="Tâm thu (VD: 120)">
                          <span>/</span>
                          <input type="number" id="vitalBPDia" class="dsp-input" placeholder="Tâm trương (VD: 80)">
                        </div>
                      </div>
                    </div>
                    <div class="dsp-form-row">
                      <div class="dsp-form-group">
                        <label>Nhịp thở (l/p)</label>
                        <input type="number" id="vitalRR" class="dsp-input" placeholder="VD: 18">
                      </div>
                      <div class="dsp-form-group">
                        <label>Nhiệt độ (°C)</label>
                        <input type="number" step="0.1" id="vitalTemp" class="dsp-input" placeholder="VD: 37.0">
                      </div>
                    </div>
                    <div class="dsp-form-row">
                      <div class="dsp-form-group">
                        <label>SpO2 (%)</label>
                        <input type="number" id="vitalSpO2" class="dsp-input" placeholder="VD: 98">
                      </div>
                      <div class="dsp-form-group">
                        <label>Cân nặng (kg)</label>
                        <input type="number" step="0.1" id="vitalWeight" class="dsp-input" placeholder="VD: 60">
                      </div>
                    </div>
                    <div style="margin-top: 1rem; display: flex; justify-content: flex-end;">
                      <button type="submit" class="dsp-btn dsp-btn-sm" style="background: var(--color-info); color: white;"><i class="fa-solid fa-plus"></i> Ghi Sinh hiệu</button>
                    </div>
                  </form>
                  <div id="vitalsListContainer" style="margin-top: 1.5rem;">
                    <!-- List of past vitals -->
                  </div>
                </div>
              </div>
            </div>

            <!-- Right: List -->
            <div class="dsp-col-side">
              <div class="dsp-card">
                <div class="dsp-card-header">
                  <h2 class="dsp-card-title">Danh sách Bệnh nhân</h2>
                </div>
                <div class="dsp-card-body" style="padding: 0;">
                  <div class="dsp-list-group" id="patientListContainer" style="max-height: calc(100vh - 200px); overflow-y: auto;">
                    ${listHtml}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;
}

function calculateAge(dobStr: string): number {
  if (!dobStr) return 0;
  const dob = new Date(dobStr);
  const diffMs = Date.now() - dob.getTime();
  const ageDt = new Date(diffMs); 
  return Math.abs(ageDt.getUTCFullYear() - 1970);
}

export function bindPatientDemographicsEvents(): void {
  const form = document.getElementById('patientForm') as HTMLFormElement;
  if (form) {
    form.addEventListener('submit', handleSavePatient);
  }

  const container = document.getElementById('patientListContainer');
  if (container) {
    container.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      
      const delBtn = target.closest('[data-action="delete-patient"]') as HTMLElement;
      if (delBtn) {
        const id = delBtn.dataset.id;
        if (id && confirm('Bạn có chắc chắn muốn xóa hồ sơ bệnh nhân này?')) {
          const profileId = getActiveProfile()?.id;
          if (profileId) {
            deletePatient(profileId, id);
            window.dispatchEvent(new CustomEvent('dsp-navigate', { detail: 'patients' }));
          }
        }
        return;
      }

      const editBtn = target.closest('[data-action="edit-patient"]') as HTMLElement;
      if (editBtn) {
        const id = editBtn.dataset.id;
        if (id) {
          loadPatientToForm(id);
        }
        return;
      }
    });
  }

  const btnCancelEdit = document.getElementById('btnCancelEdit');
  if (btnCancelEdit) {
    btnCancelEdit.addEventListener('click', () => {
      form.reset();
      (document.getElementById('editPatientId') as HTMLInputElement).value = '';
      document.getElementById('formTitle')!.innerText = 'Thêm Bệnh nhân mới';
      btnCancelEdit.style.display = 'none';
      document.getElementById('vitalsSection')!.style.display = 'none';
      document.getElementById('medsSection')!.style.display = 'none';
    });
  }

  const vitalsForm = document.getElementById('vitalsForm') as HTMLFormElement;
  if (vitalsForm) {
    vitalsForm.addEventListener('submit', handleSaveVitals);
  }

  const medsForm = document.getElementById('medsForm') as HTMLFormElement;
  if (medsForm) {
    medsForm.addEventListener('submit', handleSaveMedication);
  }
}

function handleSaveMedication(e: Event): void {
  e.preventDefault();
  const profileId = getActiveProfile()?.id;
  const patientId = (document.getElementById('editPatientId') as HTMLInputElement).value;
  if (!profileId || !patientId) return;

  const patient = getAllPatients(profileId).find(p => p.id === patientId);
  if (!patient) return;

  const meds = patient.medications || [];
  meds.push({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    name: (document.getElementById('medName') as HTMLInputElement).value.trim(),
    dosage: (document.getElementById('medDosage') as HTMLInputElement).value.trim(),
    route: (document.getElementById('medRoute') as HTMLSelectElement).value,
    frequency: (document.getElementById('medFreq') as HTMLInputElement).value.trim(),
    startDate: new Date().toISOString().split('T')[0],
    status: (document.getElementById('medStatus') as HTMLSelectElement).value as any,
  });

  updatePatient(profileId, patientId, { medications: meds });
  (document.getElementById('medsForm') as HTMLFormElement).reset();
  loadPatientToForm(patientId); // Reload to show new meds
}

function handleSaveVitals(e: Event): void {
  e.preventDefault();
  const profileId = getActiveProfile()?.id;
  const patientId = (document.getElementById('editPatientId') as HTMLInputElement).value;
  if (!profileId || !patientId) return;

  saveVital(profileId, {
    patientId,
    hr: parseFloat((document.getElementById('vitalHR') as HTMLInputElement).value) || undefined,
    bpSys: parseFloat((document.getElementById('vitalBPSys') as HTMLInputElement).value) || undefined,
    bpDia: parseFloat((document.getElementById('vitalBPDia') as HTMLInputElement).value) || undefined,
    rr: parseFloat((document.getElementById('vitalRR') as HTMLInputElement).value) || undefined,
    temp: parseFloat((document.getElementById('vitalTemp') as HTMLInputElement).value) || undefined,
    spo2: parseFloat((document.getElementById('vitalSpO2') as HTMLInputElement).value) || undefined,
    weight: parseFloat((document.getElementById('vitalWeight') as HTMLInputElement).value) || undefined,
  });

  (document.getElementById('vitalsForm') as HTMLFormElement).reset();
  loadPatientToForm(patientId); // Reload vitals list
}

function loadPatientToForm(id: string): void {
  const profileId = getActiveProfile()?.id;
  if (!profileId) return;
  const patients = getAllPatients(profileId);
  const p = patients.find(x => x.id === id);
  if (!p) return;

  (document.getElementById('editPatientId') as HTMLInputElement).value = p.id;
  (document.getElementById('patientCode') as HTMLInputElement).value = p.medicalRecordNo;
  (document.getElementById('patientName') as HTMLInputElement).value = p.fullName;
  (document.getElementById('patientDob') as HTMLInputElement).value = p.dob || '';
  (document.getElementById('patientGender') as HTMLSelectElement).value = p.gender;
  (document.getElementById('patientPhone') as HTMLInputElement).value = p.phone || '';
  (document.getElementById('patientAddress') as HTMLInputElement).value = p.address || '';
  
  (document.getElementById('histMedical') as HTMLInputElement).value = p.history?.medical?.join(', ') || '';
  (document.getElementById('histSurgical') as HTMLInputElement).value = p.history?.surgical?.join(', ') || '';
  
  const allergiesStr = p.allergies?.map(a => `${a.allergen} (${a.reaction})`).join(', ') || '';
  (document.getElementById('patientAllergies') as HTMLInputElement).value = allergiesStr;

  document.getElementById('formTitle')!.innerText = 'Sửa Hồ sơ Bệnh nhân';
  document.getElementById('btnCancelEdit')!.style.display = 'inline-block';

  // Load Vitals
  document.getElementById('vitalsSection')!.style.display = 'block';
  const vitals = getVitalsForPatient(profileId, id);
  const vitalsList = document.getElementById('vitalsListContainer');
  if (vitalsList) {
    if (vitals.length > 0) {
      vitalsList.innerHTML = vitals.map(v => `
        <div style="background: #f8fafc; border-left: 3px solid var(--color-info); padding: 0.75rem; margin-bottom: 0.5rem; border-radius: 4px; font-size: 0.9rem;">
          <div style="color: #64748b; font-size: 0.8rem; margin-bottom: 4px;">${formatDate(v.timestamp)}</div>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            ${v.hr ? `<div><strong>Mạch:</strong> ${v.hr}</div>` : ''}
            ${v.bpSys ? `<div><strong>HA:</strong> ${v.bpSys}/${v.bpDia || ''}</div>` : ''}
            ${v.rr ? `<div><strong>Nhịp thở:</strong> ${v.rr}</div>` : ''}
            ${v.temp ? `<div><strong>Nhiệt độ:</strong> ${v.temp}°C</div>` : ''}
            ${v.spo2 ? `<div><strong>SpO2:</strong> ${v.spo2}%</div>` : ''}
            ${v.weight ? `<div><strong>Cân nặng:</strong> ${v.weight}kg</div>` : ''}
          </div>
        </div>
      `).join('');
    } else {
      vitalsList.innerHTML = `<div class="dsp-text-sm" style="color: var(--color-text-muted);">Chưa có dữ liệu sinh hiệu.</div>`;
    }
  }

  // Load Medications
  document.getElementById('medsSection')!.style.display = 'block';
  const medsList = document.getElementById('medsListContainer');
  if (medsList) {
    const meds = p.medications || [];
    if (meds.length > 0) {
      medsList.innerHTML = meds.map(m => `
        <div style="background: #f8fafc; border-left: 3px solid ${m.status === 'active' ? 'var(--color-success)' : 'var(--color-text-muted)'}; padding: 0.75rem; margin-bottom: 0.5rem; border-radius: 4px; font-size: 0.9rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <strong style="font-size: 1rem;">${escapeHtml(m.name)}</strong>
              ${m.dosage ? `<span style="color: #64748b; margin-left: 4px;">${escapeHtml(m.dosage)}</span>` : ''}
            </div>
            <span class="dsp-badge" style="background: ${m.status === 'active' ? '#dcfce7' : '#f1f5f9'}; color: ${m.status === 'active' ? '#166534' : '#64748b'};">${m.status === 'active' ? 'Đang dùng' : 'Đã ngưng'}</span>
          </div>
          <div style="margin-top: 4px; font-size: 0.85rem; color: var(--color-text);">
            ${m.route ? `<span>${escapeHtml(m.route)}</span>` : ''} 
            ${m.frequency ? `<span style="margin-left: 8px;"><i class="fa-solid fa-clock"></i> ${escapeHtml(m.frequency)}</span>` : ''}
          </div>
        </div>
      `).join('');
    } else {
      medsList.innerHTML = `<div class="dsp-text-sm" style="color: var(--color-text-muted);">Chưa có đơn thuốc nào.</div>`;
    }
  }
}

function handleSavePatient(e: Event): void {
  e.preventDefault();
  const profileId = getActiveProfile()?.id;
  if (!profileId) return;

  const id = (document.getElementById('editPatientId') as HTMLInputElement).value;
  const medicalRecordNo = (document.getElementById('patientCode') as HTMLInputElement).value.trim();
  const fullName = (document.getElementById('patientName') as HTMLInputElement).value.trim();
  const dob = (document.getElementById('patientDob') as HTMLInputElement).value;
  const gender = (document.getElementById('patientGender') as HTMLSelectElement).value as any;
  const phone = (document.getElementById('patientPhone') as HTMLInputElement).value.trim();
  const address = (document.getElementById('patientAddress') as HTMLInputElement).value.trim();
  
  const histMedicalStr = (document.getElementById('histMedical') as HTMLInputElement).value;
  const histSurgicalStr = (document.getElementById('histSurgical') as HTMLInputElement).value;
  const allergiesStr = (document.getElementById('patientAllergies') as HTMLInputElement).value;

  // Xử lý chuỗi dị ứng (parse đơn giản)
  const allergies: AllergyEntry[] = allergiesStr.split(',').map(s => s.trim()).filter(Boolean).map(s => {
    let allergen = s;
    let reaction = 'Chưa rõ';
    const match = s.match(/(.+?)\((.+?)\)/);
    if (match) {
      allergen = match[1].trim();
      reaction = match[2].trim();
    }
    return {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      allergen,
      severity: 'high',
      reaction,
      notedDate: new Date().toISOString()
    };
  });

  const data: Omit<PatientDemographic, 'id' | 'doctorId' | 'createdAt' | 'updatedAt' | 'deletedAt'> = {
    medicalRecordNo,
    fullName,
    dob,
    gender,
    phone,
    address,
    history: {
      medical: histMedicalStr.split(',').map(s => s.trim()).filter(Boolean),
      surgical: histSurgicalStr.split(',').map(s => s.trim()).filter(Boolean),
      family: [],
      social: []
    },
    allergies
  };

  if (id) {
    updatePatient(profileId, id, data);
  } else {
    savePatient(profileId, data);
  }

  // Reload view
  window.dispatchEvent(new CustomEvent('dsp-navigate', { detail: 'patients' }));
}
