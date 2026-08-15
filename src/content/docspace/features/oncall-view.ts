import { getAllSoapPatients, updateSoapPatient, getActiveProfile } from '../storage';
import { SoapPatientRecord } from '../types';
import { renderSidebar, renderDocSpaceHeader } from '../docspace-view';
import { generateHandoverPriority } from '../ai/llm-client';

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
        ${renderDocSpaceHeader(profile, 'oncall')}
        <div class="dsp-page-content">
          <div class="dsp-page-header" style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h1 class="dsp-page-title"><i class="fa-solid fa-list-check"></i> Checklist Công Việc</h1>
              <p class="dsp-page-subtitle">Danh sách các công việc còn tồn đọng được đồng bộ tự động từ Sổ tay SOAP.</p>
            </div>
            <button type="button" class="dsp-btn dsp-btn-primary" id="btnAiPriorityShiftReport">
              <i class="fa-solid fa-wand-magic-sparkles"></i> ✨ AI Báo cáo & Phân loại Ưu tiên
            </button>
          </div>

          <div id="oncallAiPriorityBox" style="display:none; margin-bottom: 24px; background:var(--color-surface); border-radius:12px; padding:20px; border:1px dashed var(--color-primary);">
            <div style="font-weight:700; color:var(--color-primary); margin-bottom:8px; display:flex; align-items:center; gap:8px; font-size:16px;">
              <i class="fa-solid fa-user-doctor"></i> Báo cáo Phân loại Ưu tiên Ca trực (AI Chief Resident)
            </div>
            <div id="oncallAiPriorityText" style="font-size:13px; line-height:1.6; white-space:pre-wrap; color:var(--color-text);"></div>
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

            <!-- Chưa làm SOAP -->
            <div style="margin-bottom: 32px;">
              <h3 style="font-size:15px; color:var(--color-text); margin-bottom:12px; border-bottom:1px solid var(--color-border); padding-bottom:8px;">2. Bệnh nhân chưa khám / làm SOAP hôm nay (${pendingSOAP.length})</h3>
              ${pendingSOAP.length === 0 ? `<p style="color:var(--color-text-muted); font-size:13px; font-style:italic;">Đã hoàn thành SOAP cho tất cả bệnh nhân.</p>` : `
                <div style="display:flex; flex-direction:column; gap:8px;">
                  ${pendingSOAP.map(p => `
                    <div style="display:flex; align-items:center; justify-content:space-between; padding:12px; background:var(--color-bg); border-radius:8px; border:1px solid var(--color-border);">
                      <div>
                        <div style="font-weight:700; font-size:14px;">Giường ${p.bedNumber} - ${p.fullName} (${p.patientCode})</div>
                        <div style="font-size:12px; color:var(--color-text-muted);">Chẩn đoán: ${p.admissionDiagnosis}</div>
                      </div>
                      <a href="#/docspace/soap?edit=${p.id}" class="dsp-btn dsp-btn-sm dsp-btn-outline" style="text-decoration:none;">Làm SOAP ngay</a>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>

            <!-- Chưa nhập EMR -->
            <div>
              <h3 style="font-size:15px; color:var(--color-text); margin-bottom:12px; border-bottom:1px solid var(--color-border); padding-bottom:8px;">3. Bệnh nhân chưa nhập EMR bệnh viện (${pendingEMR.length})</h3>
              ${pendingEMR.length === 0 ? `<p style="color:var(--color-text-muted); font-size:13px; font-style:italic;">Đã nhập EMR đầy đủ.</p>` : `
                <div style="display:flex; flex-direction:column; gap:8px;">
                  ${pendingEMR.map(p => `
                    <label style="display:flex; align-items:center; gap:12px; padding:12px; background:var(--color-bg); border-radius:8px; border:1px solid var(--color-border); cursor:pointer;">
                      <input type="checkbox" class="js-chk-emr" data-pid="${p.id}" style="width:18px; height:18px;" />
                      <div style="flex:1;">
                        <div style="font-weight:700; font-size:14px;">Giường ${p.bedNumber} - ${p.fullName} (${p.patientCode})</div>
                        <div style="font-size:12px; color:var(--color-text-muted);">Mã HS: ${p.medicalRecordNo || p.patientCode}</div>
                      </div>
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
  // AI Priority Shift Report Handler
  document.getElementById('btnAiPriorityShiftReport')?.addEventListener('click', async () => {
    const profile = getActiveProfile();
    if (!profile || !profile.aiSettings || !profile.aiSettings.enabled) {
      alert('Vui lòng bật và cấu hình AI trong Cài đặt AI trước.');
      return;
    }

    const patients = getAllSoapPatients(profileId);
    const pendingEMR = patients.filter(p => !p.isEmrEntered);
    const pendingSOAP = patients.filter(p => p.soapStatus === 'chua_lam');
    const pendingCLS: { p: SoapPatientRecord, o: any }[] = [];
    patients.forEach(p => {
      (p.clsOrders || []).forEach(o => {
        if (!o.isDone) pendingCLS.push({ p, o });
      });
    });

    if (pendingEMR.length === 0 && pendingSOAP.length === 0 && pendingCLS.length === 0) {
      alert('Tất cả công việc ca trực đã hoàn thành 100%! Không có việc tồn đọng.');
      return;
    }

    const box = document.getElementById('oncallAiPriorityBox');
    const textEl = document.getElementById('oncallAiPriorityText');
    if (box) box.style.display = 'block';
    if (textEl) textEl.textContent = '⚡ Chief Resident AI đang phân tích mức độ ưu tiên công việc ca trực...';

    const btn = document.getElementById('btnAiPriorityShiftReport') as HTMLButtonElement;
    if (btn) btn.disabled = true;

    try {
      let streamed = '';
      await generateHandoverPriority(
        { emr: pendingEMR, soap: pendingSOAP, cls: pendingCLS },
        profile.aiSettings,
        (chunk) => {
          streamed += chunk;
          if (textEl) textEl.textContent = streamed;
        }
      );
    } catch (err: any) {
      if (textEl) textEl.textContent = '❌ Lỗi AI: ' + err.message;
    } finally {
      if (btn) btn.disabled = false;
    }
  });

  // Checkbox Event Handling
  document.querySelectorAll('.js-chk-cls').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const el = e.target as HTMLInputElement;
      const pid = el.getAttribute('data-pid');
      const oid = el.getAttribute('data-oid');
      if (!pid || !oid) return;

      const patients = getAllSoapPatients(profileId);
      const p = patients.find(x => x.id === pid);
      if (!p) return;

      const order = (p.clsOrders || []).find(x => x.id === oid);
      if (order) {
        order.isDone = el.checked;
        updateSoapPatient(profileId, pid, { clsOrders: p.clsOrders });
      }
    });
  });

  document.querySelectorAll('.js-chk-emr').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const el = e.target as HTMLInputElement;
      const pid = el.getAttribute('data-pid');
      if (!pid) return;

      updateSoapPatient(profileId, pid, { isEmrEntered: el.checked });
      window.location.reload();
    });
  });
}
