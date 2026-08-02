/**
 * DocSpace — Work Checklist (Formerly On-call)
 * Hiển thị danh sách các việc cần làm đồng bộ từ SOAP
 */

import { getAllSoapPatients, updateSoapPatient, getActiveProfile } from '../storage';
import { SoapPatientRecord } from '../types';
import { renderSidebar } from '../docspace-view';

export function renderOnCallView(profileId: string): string {
  const profile = getActiveProfile();
  if (!profile) return '';

  const patients = getAllSoapPatients(profileId);
  
  const pendingEMR = patients.filter(p => !p.isEmrEntered);
  const pendingSOAP = patients.filter(p => p.soapStatus === 'chua_lam');
  
  const pendingCLS: { p: SoapPatientRecord, o: any }[] = [];
  patients.forEach(p => {
    (p.clsOrders || []).forEach(o => {
      if (!o.isDone) {
        pendingCLS.push({ p, o });
      }
    });
  });

  const totalTasks = pendingEMR.length + pendingSOAP.length + pendingCLS.length;

  return `
    <div class="dsp-layout" id="dspLayout">
      ${renderSidebar(profile, 'oncall')}
      <main class="dsp-main">
        <div class="dsp-page-content">
          <div class="dsp-page-header">
            <h1 class="dsp-page-title"><i class="fa-solid fa-list-check"></i> Checklist Công Việc</h1>
            <p class="dsp-page-subtitle">Danh sách các công việc còn tồn đọng được đồng bộ tự động từ Sổ tay SOAP.</p>
          </div>

          <div style="background:var(--color-surface); border-radius:12px; padding:24px; box-shadow:0 4px 6px rgba(0,0,0,0.05);">
            <div style="margin-bottom: 24px; display:flex; justify-content:space-between; align-items:center;">
              <h2 style="margin:0; font-size:18px; color:var(--color-primary);"><i class="fa-solid fa-clipboard-check"></i> Tình trạng hôm nay</h2>
              <span style="background:var(--color-bg); padding:4px 12px; border-radius:12px; font-weight:700; font-size:14px;">Còn lại ${totalTasks} việc</span>
            </div>

            <!-- Cận lâm sàng -->
            <div style="margin-bottom: 32px;">
              <h3 style="font-size:15px; color:var(--color-text); margin-bottom:12px; border-bottom:1px solid var(--color-border); padding-bottom:8px;">1. Chỉ định CLS đang chờ kết quả (${pendingCLS.length})</h3>
              ${pendingCLS.length === 0 ? `<p style="color:var(--color-text-muted); font-size:13px; font-style:italic;">Không có chỉ định CLS nào đang chờ.</p>` : `
                <div style="display:flex; flex-direction:column; gap:8px;">
                  ${pendingCLS.map(item => `
                    <label style="display:flex; align-items:center; gap:12px; padding:12px; background:var(--color-bg); border-radius:8px; border:1px solid var(--color-border); cursor:pointer;">
                      <input type="checkbox" class="js-chk-cls" data-pid="${item.p.id}" data-oid="${item.o.id}" style="width:18px; height:18px;" />
                      <div style="flex:1;">
                        <div style="font-weight:700; font-size:14px;">${item.o.name}</div>
                        <div style="font-size:12px; color:var(--color-text-muted);">Bệnh nhân: ${item.p.fullName} - Giường ${item.p.bedNumber}</div>
                      </div>
                    </label>
                  `).join('')}
                </div>
              `}
            </div>

            <!-- EMR -->
            <div style="margin-bottom: 32px;">
              <h3 style="font-size:15px; color:var(--color-text); margin-bottom:12px; border-bottom:1px solid var(--color-border); padding-bottom:8px;">2. Bệnh án chưa nhập EMR (${pendingEMR.length})</h3>
              ${pendingEMR.length === 0 ? `<p style="color:var(--color-text-muted); font-size:13px; font-style:italic;">Tuyệt vời! Đã nhập EMR cho tất cả bệnh nhân.</p>` : `
                <div style="display:flex; flex-direction:column; gap:8px;">
                  ${pendingEMR.map(p => `
                    <label style="display:flex; align-items:center; gap:12px; padding:12px; background:var(--color-bg); border-radius:8px; border:1px solid var(--color-border); cursor:pointer;">
                      <input type="checkbox" class="js-chk-emr" data-pid="${p.id}" style="width:18px; height:18px;" />
                      <div style="flex:1;">
                        <div style="font-weight:700; font-size:14px;">${p.fullName} - Giường ${p.bedNumber}</div>
                        <div style="font-size:12px; color:var(--color-text-muted);">Mã BA: ${p.medicalRecordNo}</div>
                      </div>
                    </label>
                  `).join('')}
                </div>
              `}
            </div>

            <!-- SOAP -->
            <div style="margin-bottom: 16px;">
              <h3 style="font-size:15px; color:var(--color-text); margin-bottom:12px; border-bottom:1px solid var(--color-border); padding-bottom:8px;">3. Bệnh nhân chưa khám / Ghi diễn tiến (${pendingSOAP.length})</h3>
              ${pendingSOAP.length === 0 ? `<p style="color:var(--color-text-muted); font-size:13px; font-style:italic;">Tuyệt vời! Đã ghi diễn tiến cho tất cả bệnh nhân.</p>` : `
                <div style="display:flex; flex-direction:column; gap:8px;">
                  ${pendingSOAP.map(p => `
                    <label style="display:flex; align-items:center; gap:12px; padding:12px; background:var(--color-bg); border-radius:8px; border:1px solid var(--color-border); cursor:pointer;">
                      <input type="checkbox" class="js-chk-soap" data-pid="${p.id}" style="width:18px; height:18px;" />
                      <div style="flex:1;">
                        <div style="font-weight:700; font-size:14px;">${p.fullName} - Giường ${p.bedNumber}</div>
                        <div style="font-size:12px; color:var(--color-text-muted);">Chẩn đoán: ${p.currentDiagnosis || p.admissionDiagnosis}</div>
                      </div>
                      <a href="#/docspace/soap?edit=${p.id}" class="dsp-btn dsp-btn-sm dsp-btn-ghost" style="color:var(--color-primary);" title="Mở trang SOAP">
                        <i class="fa-solid fa-pen-to-square"></i> Khám
                      </a>
                    </label>
                  `).join('')}
                </div>
              `}
            </div>
          </div>

        </div>
      </main>
    </div>
  `;
}

export function mountOnCallController(profileId: string): void {
  // Toggle CLS
  document.querySelectorAll('.js-chk-cls').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const el = e.currentTarget as HTMLInputElement;
      if (el.checked) {
        const pid = el.getAttribute('data-pid');
        const oid = el.getAttribute('data-oid');
        if (!pid || !oid) return;
        
        const patients = getAllSoapPatients(profileId);
        const p = patients.find(pt => pt.id === pid);
        if (p) {
          const newOrders = [...p.clsOrders];
          const orderIdx = newOrders.findIndex(o => o.id === oid);
          if (orderIdx >= 0) {
            newOrders[orderIdx].isDone = true;
            updateSoapPatient(profileId, pid, { clsOrders: newOrders });
            // Rerender page
            const container = document.getElementById('app');
            if (container) {
               container.innerHTML = renderOnCallView(profileId);
               mountOnCallController(profileId);
            }
          }
        }
      }
    });
  });

  // Toggle EMR
  document.querySelectorAll('.js-chk-emr').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const el = e.currentTarget as HTMLInputElement;
      if (el.checked) {
        const pid = el.getAttribute('data-pid');
        if (pid) {
          updateSoapPatient(profileId, pid, { isEmrEntered: true });
          const container = document.getElementById('app');
          if (container) {
             container.innerHTML = renderOnCallView(profileId);
             mountOnCallController(profileId);
          }
        }
      }
    });
  });

  // Toggle SOAP
  document.querySelectorAll('.js-chk-soap').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const el = e.currentTarget as HTMLInputElement;
      if (el.checked) {
        const pid = el.getAttribute('data-pid');
        if (pid) {
          updateSoapPatient(profileId, pid, { soapStatus: 'da_lam' });
          const container = document.getElementById('app');
          if (container) {
             container.innerHTML = renderOnCallView(profileId);
             mountOnCallController(profileId);
          }
        }
      }
    });
  });
}
