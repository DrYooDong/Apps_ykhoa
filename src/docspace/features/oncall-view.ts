/**
 * DocSpace — On-call Patient List View
 * Danh sách bệnh nhân trong ca trực — tạo, cập nhật, xuất báo cáo bàn giao
 */

import {
  getAllShifts, createShift, getShiftById,
  addPatientToShift, updatePatient, removePatient, closeShift, deleteShift
} from '../storage';
import { OnCallShift, OnCallPatient, PatientFlag } from '../types';
import { renderSidebar, formatDate, formatRelativeDate } from '../docspace-view';
import { getActiveProfile } from '../storage';

const FLAG_CONFIG: Record<PatientFlag, { label: string; icon: string; cls: string }> = {
  critical: { label: 'Nặng',   icon: 'fa-solid fa-circle-exclamation', cls: 'dsp-flag--critical' },
  watch:    { label: 'Theo dõi', icon: 'fa-solid fa-eye',              cls: 'dsp-flag--watch' },
  stable:   { label: 'Ổn định', icon: 'fa-solid fa-check-circle',      cls: 'dsp-flag--stable' },
};

export function renderOnCallView(profileId: string, activeShiftId?: string): string {
  const profile = getActiveProfile();
  if (!profile) return '';

  const shifts = getAllShifts(profileId);
  const activeShift = activeShiftId
    ? getShiftById(profileId, activeShiftId)
    : shifts.find(s => !s.closedAt) || null;

  const shiftListHtml = shifts.length
    ? shifts.map(s => {
        const isActive = activeShift?.id === s.id;
        const isClosed = !!s.closedAt;
        return `
          <button class="dsp-list-item dsp-list-item--btn${isActive ? ' dsp-list-item--active' : ''}"
                  data-action="select-shift" data-id="${s.id}">
            <div class="dsp-list-item-body">
              <div class="dsp-list-item-title">
                ${formatDate(s.date)} — ${escapeHtml(s.unit)}
                ${!isClosed ? '<span class="dsp-badge dsp-badge--active">Đang trực</span>' : ''}
              </div>
              <div class="dsp-list-item-meta">${s.patients.length} bệnh nhân</div>
            </div>
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        `;
      }).join('')
    : `<div class="dsp-empty-state"><i class="fa-solid fa-moon"></i><p>Chưa có ca trực nào</p></div>`;

  const shiftDetailHtml = activeShift
    ? renderShiftDetail(activeShift)
    : `<div class="dsp-empty-state dsp-empty-state--lg">
         <i class="fa-solid fa-moon"></i>
         <h3>Chọn ca trực để xem danh sách</h3>
         <p>Hoặc tạo ca trực mới bên trái</p>
       </div>`;

  return `
    <div class="dsp-layout" id="dspLayout">
      ${renderSidebar(profile, 'oncall')}
      <main class="dsp-main">
        <div class="dsp-page-content">

          <div class="dsp-page-header">
            <h1 class="dsp-page-title"><i class="fa-solid fa-moon"></i> Ca Trực</h1>
            <p class="dsp-page-subtitle">Quản lý danh sách bệnh nhân trong buổi trực — ghi diễn biến, xuất báo cáo bàn giao.</p>
          </div>

          <div class="dsp-two-col">
            <!-- Left: Shift list + create -->
            <div class="dsp-col-side">
              <div class="dsp-card">
                <div class="dsp-card-header">
                  <h2 class="dsp-card-title">Ca trực (${shifts.length})</h2>
                </div>

                <!-- Create new shift -->
                <form class="dsp-create-shift-form" id="dspCreateShiftForm" novalidate>
                  <div class="dsp-form-group">
                    <label class="dsp-label" for="dspShiftDate">Ngày trực</label>
                    <input class="dsp-input" type="date" id="dspShiftDate"
                      value="${new Date().toISOString().split('T')[0]}" required />
                  </div>
                  <div class="dsp-form-group">
                    <label class="dsp-label" for="dspShiftUnit">Đơn vị</label>
                    <input class="dsp-input" type="text" id="dspShiftUnit"
                      placeholder="VD: Phòng Nội 3, ICU..." maxlength="60" required />
                  </div>
                  <button class="dsp-btn dsp-btn-primary dsp-btn-full" type="submit" id="dspCreateShiftBtn">
                    <i class="fa-solid fa-plus"></i> Tạo ca trực mới
                  </button>
                </form>

                <div class="dsp-divider"></div>
                <div class="dsp-list" id="dspShiftList">${shiftListHtml}</div>
              </div>
            </div>

            <!-- Right: Shift detail -->
            <div class="dsp-col-main">
              <div class="dsp-card" id="dspShiftDetailCard">
                ${shiftDetailHtml}
              </div>
            </div>
          </div>

          <!-- Add Patient Modal -->
          <div class="dsp-modal" id="dspAddPatientModal" style="display:none">
            <div class="dsp-modal-backdrop" id="dspPatientModalBackdrop"></div>
            <div class="dsp-modal-box">
              <div class="dsp-modal-header">
                <h2 class="dsp-modal-title" id="dspAddPatientTitle">Thêm bệnh nhân</h2>
                <button class="dsp-icon-btn" id="dspClosePatientModal"><i class="fa-solid fa-xmark"></i></button>
              </div>
              <div class="dsp-modal-body">
                <form id="dspAddPatientForm" novalidate>
                  <input type="hidden" id="dspEditPatientId" value="" />
                  <div class="dsp-form-group">
                    <label class="dsp-label" for="dspPatientBed">Giường <span class="dsp-required">*</span></label>
                    <input class="dsp-input" type="text" id="dspPatientBed" placeholder="VD: G.12, ICU-3" maxlength="20" required />
                  </div>
                  <div class="dsp-form-group">
                    <label class="dsp-label" for="dspPatientDiagnosis">Chẩn đoán <span class="dsp-required">*</span></label>
                    <input class="dsp-input" type="text" id="dspPatientDiagnosis" placeholder="VD: Viêm phổi nặng, Suy tim EF giảm" maxlength="120" required />
                  </div>
                  <div class="dsp-form-group">
                    <label class="dsp-label" for="dspPatientNote">Ghi chú / Xử trí</label>
                    <textarea class="dsp-textarea" id="dspPatientNote" placeholder="Diễn biến, y lệnh hiện tại..." rows="3"></textarea>
                  </div>
                  <div class="dsp-form-group">
                    <label class="dsp-label">Mức độ</label>
                    <div class="dsp-flag-group">
                      ${(Object.keys(FLAG_CONFIG) as PatientFlag[]).map(flag => `
                        <label class="dsp-flag-option dsp-flag-option--${flag}">
                          <input type="radio" name="dspPatientFlag" value="${flag}" ${flag === 'stable' ? 'checked' : ''} />
                          <i class="${FLAG_CONFIG[flag].icon}"></i> ${FLAG_CONFIG[flag].label}
                        </label>
                      `).join('')}
                    </div>
                  </div>
                  <div class="dsp-form-actions">
                    <button type="button" class="dsp-btn dsp-btn-ghost" id="dspCancelPatient">Hủy</button>
                    <button type="submit" class="dsp-btn dsp-btn-primary" id="dspSavePatientBtn">
                      <i class="fa-solid fa-check"></i> Lưu
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- Export Report Modal -->
          <div class="dsp-modal" id="dspExportReportModal" style="display:none">
            <div class="dsp-modal-backdrop" id="dspExportModalBackdrop"></div>
            <div class="dsp-modal-box dsp-modal-box--lg">
              <div class="dsp-modal-header">
                <h2 class="dsp-modal-title">Báo cáo Bàn giao</h2>
                <div class="dsp-modal-actions">
                  <button class="dsp-btn dsp-btn-primary dsp-btn-sm" id="dspPrintReportBtn">
                    <i class="fa-solid fa-print"></i> In
                  </button>
                  <button class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="dspCopyReportBtn">
                    <i class="fa-regular fa-copy"></i> Sao chép
                  </button>
                  <button class="dsp-icon-btn" id="dspCloseReport"><i class="fa-solid fa-xmark"></i></button>
                </div>
              </div>
              <div class="dsp-modal-body" id="dspReportContent"></div>
            </div>
          </div>

        </div>
      </main>
    </div>
  `;
}

// ─── Shift Detail HTML ────────────────────────────────────────────

function renderShiftDetail(shift: OnCallShift): string {
  const isClosed = !!shift.closedAt;
  const criticalCount = shift.patients.filter(p => p.flag === 'critical').length;

  const patientsHtml = shift.patients.length
    ? sortPatients(shift.patients).map(p => renderPatientCard(p, isClosed)).join('')
    : `<div class="dsp-empty-state"><i class="fa-solid fa-bed"></i><p>Chưa có bệnh nhân nào trong ca này</p></div>`;

  return `
    <div class="dsp-shift-detail" data-shift-id="${shift.id}">
      <div class="dsp-card-header">
        <div>
          <h2 class="dsp-card-title">
            ${formatDate(shift.date)} — ${escapeHtml(shift.unit)}
            ${!isClosed ? '<span class="dsp-badge dsp-badge--active">Đang trực</span>' : '<span class="dsp-badge dsp-badge--closed">Đã kết ca</span>'}
          </h2>
          <div class="dsp-shift-stats">
            <span>${shift.patients.length} bệnh nhân</span>
            ${criticalCount > 0 ? `<span class="dsp-text-danger"><i class="fa-solid fa-circle-exclamation"></i> ${criticalCount} nặng</span>` : ''}
          </div>
        </div>
        <div class="dsp-card-header-actions">
          ${!isClosed ? `
            <button class="dsp-btn dsp-btn-primary dsp-btn-sm" id="dspAddPatientBtn">
              <i class="fa-solid fa-plus"></i> Thêm BN
            </button>
          ` : ''}
          <button class="dsp-btn dsp-btn-ghost dsp-btn-sm" id="dspExportReportBtn">
            <i class="fa-solid fa-file-export"></i> Xuất báo cáo
          </button>
          ${!isClosed ? `
            <button class="dsp-btn dsp-btn-ghost dsp-btn-sm dsp-btn-danger" id="dspCloseShiftBtn">
              <i class="fa-solid fa-flag-checkered"></i> Kết ca
            </button>
          ` : ''}
        </div>
      </div>

      <div class="dsp-patient-list" id="dspPatientList">
        ${patientsHtml}
      </div>
    </div>
  `;
}

function renderPatientCard(patient: OnCallPatient, isClosed: boolean): string {
  const flag = patient.flag || 'stable';
  const flagCfg = FLAG_CONFIG[flag];
  return `
    <div class="dsp-patient-card dsp-patient-card--${flag}" data-patient-id="${patient.id}">
      <div class="dsp-patient-header">
        <div class="dsp-patient-bed">
          <i class="fa-solid fa-bed"></i> ${escapeHtml(patient.bed)}
        </div>
        <div class="dsp-flag-badge ${flagCfg.cls}">
          <i class="${flagCfg.icon}"></i> ${flagCfg.label}
        </div>
      </div>
      <div class="dsp-patient-diagnosis">${escapeHtml(patient.diagnosis)}</div>
      ${patient.note ? `<div class="dsp-patient-note">${escapeHtml(patient.note).replace(/\n/g, '<br>')}</div>` : ''}
      <div class="dsp-patient-footer">
        <span class="dsp-patient-time">Thêm lúc ${formatRelativeDate(patient.addedAt)}</span>
        ${!isClosed ? `
          <div class="dsp-patient-actions">
            <button class="dsp-icon-btn" data-action="edit-patient" data-id="${patient.id}" title="Cập nhật">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="dsp-icon-btn dsp-icon-btn--danger" data-action="remove-patient" data-id="${patient.id}" title="Xóa">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// ─── Report HTML (for print) ─────────────────────────────────────

export function renderShiftReport(shift: OnCallShift): string {
  const sorted = sortPatients(shift.patients);
  const rows = sorted.map(p => {
    const flag = p.flag || 'stable';
    return `
      <tr>
        <td><strong>${escapeHtml(p.bed)}</strong></td>
        <td>${escapeHtml(p.diagnosis)}</td>
        <td>${escapeHtml(p.note || '—')}</td>
        <td>${FLAG_CONFIG[flag].label}</td>
      </tr>
    `;
  }).join('');

  return `
    <div class="dsp-report" id="dspPrintTarget">
      <div class="dsp-report-header">
        <div class="dsp-report-logo"><i class="fa-solid fa-hospital"></i> CliniPortal · DocSpace</div>
        <div class="dsp-report-date">In lúc: ${new Date().toLocaleString('vi-VN')}</div>
      </div>
      <h2 class="dsp-report-title">Báo cáo Bàn giao Ca Trực</h2>
      <div class="dsp-report-meta">
        <span><strong>Ngày:</strong> ${formatDate(shift.date)}</span>
        <span><strong>Đơn vị:</strong> ${escapeHtml(shift.unit)}</span>
        <span><strong>Tổng BN:</strong> ${shift.patients.length}</span>
        ${shift.patients.filter(p => p.flag === 'critical').length > 0
          ? `<span><strong>Bệnh nhân nặng:</strong> ${shift.patients.filter(p => p.flag === 'critical').length}</span>` : ''}
      </div>
      <table class="dsp-report-table">
        <thead>
          <tr>
            <th>Giường</th>
            <th>Chẩn đoán</th>
            <th>Ghi chú / Xử trí</th>
            <th>Mức độ</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      ${shift.notes ? `<div class="dsp-report-notes"><strong>Ghi chú ca trực:</strong> ${escapeHtml(shift.notes)}</div>` : ''}
      <div class="dsp-report-footer">
        <div>BS. trực: ___________________</div>
        <div>Ký nhận: ___________________</div>
      </div>
    </div>
  `;
}

// ─── Controller ───────────────────────────────────────────────────

let _activeShiftId: string | null = null;

export function mountOnCallController(profileId: string, shiftId?: string): void {
  _activeShiftId = shiftId || null;

  // Create shift
  document.getElementById('dspCreateShiftForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = (document.getElementById('dspShiftDate') as HTMLInputElement).value;
    const unit = (document.getElementById('dspShiftUnit') as HTMLInputElement).value.trim();
    if (!date || !unit) return;
    const shift = createShift(profileId, date, unit);
    window.location.hash = `#/docspace/oncall?shift=${shift.id}`;
  });

  // Select shift
  document.getElementById('dspShiftList')?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('[data-action="select-shift"]') as HTMLElement;
    if (!btn) return;
    const id = btn.getAttribute('data-id') || '';
    window.location.hash = `#/docspace/oncall?shift=${id}`;
  });

  // Add patient btn
  document.getElementById('dspAddPatientBtn')?.addEventListener('click', () => openPatientModal());

  // Patient list actions
  document.getElementById('dspPatientList')?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('[data-action]') as HTMLElement;
    if (!btn || !_activeShiftId) return;
    const action = btn.getAttribute('data-action');
    const patientId = btn.getAttribute('data-id') || '';

    if (action === 'remove-patient') {
      if (confirm('Xóa bệnh nhân này khỏi danh sách?')) {
        removePatient(profileId, _activeShiftId, patientId);
        window.location.hash = `#/docspace/oncall?shift=${_activeShiftId}`;
      }
    } else if (action === 'edit-patient') {
      const shift = getShiftById(profileId, _activeShiftId);
      const patient = shift?.patients.find(p => p.id === patientId);
      if (patient) openPatientModal(patient);
    }
  });

  // Patient form submit
  document.getElementById('dspAddPatientForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!_activeShiftId) return;
    const editId = (document.getElementById('dspEditPatientId') as HTMLInputElement).value;
    const bed = (document.getElementById('dspPatientBed') as HTMLInputElement).value.trim();
    const diagnosis = (document.getElementById('dspPatientDiagnosis') as HTMLInputElement).value.trim();
    const note = (document.getElementById('dspPatientNote') as HTMLTextAreaElement).value.trim();
    const flag = (document.querySelector('input[name="dspPatientFlag"]:checked') as HTMLInputElement)?.value as PatientFlag || 'stable';

    if (!bed || !diagnosis) return;

    if (editId) {
      updatePatient(profileId, _activeShiftId, editId, { bed, diagnosis, note, flag });
    } else {
      addPatientToShift(profileId, _activeShiftId, { bed, diagnosis, note, flag });
    }
    closePatientModal();
    window.location.hash = `#/docspace/oncall?shift=${_activeShiftId}`;
  });

  // Close patient modal
  document.getElementById('dspPatientModalBackdrop')?.addEventListener('click', closePatientModal);
  document.getElementById('dspCancelPatient')?.addEventListener('click', closePatientModal);
  document.getElementById('dspClosePatientModal')?.addEventListener('click', closePatientModal);

  // Close shift
  document.getElementById('dspCloseShiftBtn')?.addEventListener('click', () => {
    if (!_activeShiftId) return;
    const notes = prompt('Ghi chú cuối ca (tùy chọn):') || undefined;
    closeShift(profileId, _activeShiftId, notes);
    window.location.hash = `#/docspace/oncall?shift=${_activeShiftId}`;
  });

  // Export report
  document.getElementById('dspExportReportBtn')?.addEventListener('click', () => {
    if (!_activeShiftId) return;
    const shift = getShiftById(profileId, _activeShiftId);
    if (!shift) return;
    const modal = document.getElementById('dspExportReportModal');
    const content = document.getElementById('dspReportContent');
    if (modal && content) {
      content.innerHTML = renderShiftReport(shift);
      modal.style.display = 'flex';
    }
  });

  // Report modal controls
  document.getElementById('dspExportModalBackdrop')?.addEventListener('click', () => {
    (document.getElementById('dspExportReportModal') as HTMLElement).style.display = 'none';
  });
  document.getElementById('dspCloseReport')?.addEventListener('click', () => {
    (document.getElementById('dspExportReportModal') as HTMLElement).style.display = 'none';
  });
  document.getElementById('dspPrintReportBtn')?.addEventListener('click', () => window.print());
  document.getElementById('dspCopyReportBtn')?.addEventListener('click', () => {
    const el = document.getElementById('dspReportContent');
    if (el) navigator.clipboard.writeText(el.innerText);
  });
}

function openPatientModal(patient?: OnCallPatient): void {
  const modal = document.getElementById('dspAddPatientModal');
  const title = document.getElementById('dspAddPatientTitle');
  if (!modal) return;

  // Reset form
  (document.getElementById('dspEditPatientId') as HTMLInputElement).value = patient?.id || '';
  (document.getElementById('dspPatientBed') as HTMLInputElement).value = patient?.bed || '';
  (document.getElementById('dspPatientDiagnosis') as HTMLInputElement).value = patient?.diagnosis || '';
  (document.getElementById('dspPatientNote') as HTMLTextAreaElement).value = patient?.note || '';
  const flagToCheck = patient?.flag || 'stable';
  const radio = document.querySelector(`input[name="dspPatientFlag"][value="${flagToCheck}"]`) as HTMLInputElement;
  if (radio) radio.checked = true;

  if (title) title.textContent = patient ? 'Cập nhật bệnh nhân' : 'Thêm bệnh nhân';
  modal.style.display = 'flex';
}

function closePatientModal(): void {
  (document.getElementById('dspAddPatientModal') as HTMLElement).style.display = 'none';
}

function sortPatients(patients: OnCallPatient[]): OnCallPatient[] {
  const order: Record<string, number> = { critical: 0, watch: 1, stable: 2 };
  return [...patients].sort((a, b) => (order[a.flag || 'stable'] || 2) - (order[b.flag || 'stable'] || 2));
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
