/**
 * CliniPortal — Antibiotics Interactive Tools View
 * Path: src/content/basic-medical/antibiotics/views/antibiotics-tools-view.ts
 * 
 * Bộ điều khiển 5 Công cụ Lâm sàng Tương tác:
 * 1. D8 Prescribing Safety Wizard
 * 2. PK/PD Infusion Mode Simulator
 * 3. WHO AWaRe 2023 Traffic Light Navigator
 * 4. Beta-Lactam Delabeling Matrix
 * 5. IV-to-PO Step-Down Evaluator
 */

import { renderBasicMedicalNav, scrollActiveBasicMedicalNavIntoView } from '../../views/basic-medical-nav';
import { AntibioticToolId } from '../types/antibiotics.types';
import { ANTIBIOTIC_TOOLS, getAntibioticToolById } from '../data/antibiotics-curriculum-data';

export function renderAntibioticsToolView(toolId: AntibioticToolId): string {
  const currentTool = getAntibioticToolById(toolId) || ANTIBIOTIC_TOOLS[0];

  return `
    <div class="basic-medical-hub-container animate-fade-in" style="max-width: 1300px; margin: 0 auto; padding: 1rem 1.25rem 4rem;">
      
      <!-- Universal Sticky Sub-Nav -->
      ${renderBasicMedicalNav('khang-sinh')}

      <!-- Breadcrumbs & Tool Header -->
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem;">
        <div style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--color-text-muted, #64748b);">
          <a href="#/basic-medical" style="color: var(--color-primary, #0284c7); text-decoration: none; font-weight: 700;">Basic Medical</a>
          <span>/</span>
          <a href="#/basic-medical/khang-sinh" style="color: var(--color-primary, #0284c7); text-decoration: none; font-weight: 700;">Kháng Sinh (AMS)</a>
          <span>/</span>
          <span style="font-weight: 800; color: var(--color-text, #0f172a);">${currentTool.shortTitle}</span>
        </div>

        <div style="display: flex; align-items: center; gap: 6px; overflow-x: auto;" class="hide-scrollbar">
          ${ANTIBIOTIC_TOOLS.map(t => {
            const isActive = t.id === currentTool.id;
            return `
              <a href="#/basic-medical/khang-sinh/tools/${t.id}" style="
                display: inline-flex;
                align-items: center;
                gap: 5px;
                padding: 5px 10px;
                border-radius: 6px;
                font-size: 0.75rem;
                font-weight: ${isActive ? '800' : '600'};
                text-decoration: none;
                white-space: nowrap;
                color: ${isActive ? '#ffffff' : 'var(--color-text-muted, #64748b)'};
                background: ${isActive ? 'var(--color-primary, #0284c7)' : 'var(--color-surface, #ffffff)'};
                border: 1px solid ${isActive ? 'var(--color-primary, #0284c7)' : 'var(--color-border, #cbd5e1)'};
              ">
                <i class="fa-solid ${t.icon}"></i> ${t.shortTitle}
              </a>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Tool Workspace Container -->
      <div class="atb-tool-workspace" id="atbToolMount" style="
        background: var(--color-surface, #ffffff);
        border: 1px solid var(--color-border, #e2e8f0);
        border-radius: 16px;
        padding: 2rem;
        box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        min-height: 500px;
      ">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; padding-bottom: 1.25rem; border-bottom: 1px solid var(--color-border, #f1f5f9);">
          <div style="width: 52px; height: 52px; border-radius: 12px; background: rgba(2, 132, 199, 0.1); color: ${currentTool.color}; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
            <i class="fa-solid ${currentTool.icon}"></i>
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <h2 style="font-size: 1.5rem; font-weight: 900; margin: 0; color: var(--color-text, #0f172a);">
                ${currentTool.title}
              </h2>
              <span style="font-size: 0.72rem; font-weight: 800; padding: 2px 8px; border-radius: 999px; background: rgba(2,132,199,0.1); color: var(--color-primary, #0284c7);">
                ${currentTool.badge}
              </span>
            </div>
            <p style="margin: 4px 0 0 0; font-size: 0.88rem; color: var(--color-text-muted, #64748b);">
              ${currentTool.description}
            </p>
          </div>
        </div>

        <div id="atbActiveToolContent">
          <!-- Dynamic Tool UI hydrated by initAntibioticsToolsView -->
          <div style="text-align: center; padding: 3rem 1rem; color: var(--color-text-muted, #64748b);">
            <i class="fa-solid fa-spinner fa-spin" style="font-size: 2rem; color: var(--color-primary, #0284c7); margin-bottom: 1rem;"></i>
            <p style="margin: 0; font-weight: 600;">Đang tải giao diện tương tác ${currentTool.title}...</p>
          </div>
        </div>

      </div>

    </div>
  `;
}

export function initAntibioticsToolsView(toolId: AntibioticToolId): void {
  scrollActiveBasicMedicalNavIntoView();
  const contentEl = document.getElementById('atbActiveToolContent');
  if (!contentEl) return;

  if (toolId === 'd8-safety-wizard') {
    renderD8WizardInteractive(contentEl);
  } else if (toolId === 'pkpd-simulator') {
    renderPKPDSimulatorInteractive(contentEl);
  } else if (toolId === 'aware-navigator') {
    renderAWaReNavigatorInteractive(contentEl);
  } else if (toolId === 'delabeling-matrix') {
    renderDelabelingMatrixInteractive(contentEl);
  } else if (toolId === 'iv-po-stepdown') {
    renderIVPOStepdownInteractive(contentEl);
  } else {
    renderD8WizardInteractive(contentEl);
  }
}

/** 1. D8 Prescribing Safety Wizard */
function renderD8WizardInteractive(container: HTMLElement): void {
  container.innerHTML = `
    <div style="max-width: 900px; margin: 0 auto;">
      <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 12px; padding: 1.25rem; margin-bottom: 1.5rem; display: flex; align-items: flex-start; gap: 1rem;">
        <i class="fa-solid fa-shield-halved" style="color: #10b981; font-size: 1.6rem; margin-top: 2px;"></i>
        <div>
          <h4 style="margin: 0 0 4px 0; font-size: 0.98rem; font-weight: 800; color: var(--color-text, #0f172a);">
            Bảng kiểm 8 điều (D8 Prescribing Safety Checklist)
          </h4>
          <p style="margin: 0; font-size: 0.84rem; line-height: 1.5; color: var(--color-text-muted, #64748b);">
            Tự vấn 8 câu hỏi an toàn trước khi viết bút ký đơn thuốc. Nhấn chọn từng tiêu chí để kiểm tra tính hợp lý của đơn.
          </p>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.85rem;" id="d8StepsList">
        ${[
          { num: 1, title: 'Chẩn đoán xác định', q: 'Có bằng chứng nhiễm khuẩn thực sự không? (Bạch cầu, CRP/Procalcitonin, Sốt, Ổ mủ) hay chỉ là sốt do virus / phản ứng viêm không nhiễm trùng?', icon: 'fa-stethoscope' },
          { num: 2, title: 'Xác định ổ nhiễm khuẩn', q: 'Ổ nhiễm khuẩn nguyên phát ở đâu? (Hô hấp, Tiết niệu, Da mô mềm, Ổ bụng, Huyết) để chọn kháng sinh ngấm tốt vào mô đó?', icon: 'fa-crosshairs' },
          { num: 3, title: 'Tác nhân vi sinh tiềm năng', q: 'Vi khuẩn gây bệnh thường gặp nhất là gì? Kết quả Nhuộm Gram sơ bộ là gì? Có yếu tố nguy cơ nhiễm vi khuẩn đa kháng (ESBL, MRSA, Pseudomonas) không?', icon: 'fa-bacterium' },
          { num: 4, title: 'Lựa chọn hoạt chất tối ưu', q: 'Kháng sinh được chọn có thuộc nhóm ACCESS (Ưu tiên) không? Nếu chọn WATCH/RESERVE, đã có bằng chứng kháng sinh đồ hoặc hội chẩn AMS chưa?', icon: 'fa-capsules' },
          { num: 5, title: 'Liều & Khoảng cách dùng theo Chức năng Thận', q: 'Đã tính CrCl (Cockcroft-Gault) hoặc eGFR chưa? Liều dùng đã được hiệu chỉnh chính xác theo mức lọc cầu thận của bệnh nhân chưa?', icon: 'fa-calculator' },
          { num: 6, title: 'Đường dùng thuốc hợp lý', q: 'Có bắt buộc phải dùng đường tĩnh mạch (IV) không? Bệnh nhân có nuốt được và hấp thu qua đường tiêu hóa không (ưu tiên PO nếu ổn định)?', icon: 'fa-syringe' },
          { num: 7, title: 'Thời gian điều trị dự kiến', q: 'Đơn thuốc đã ghi rõ số ngày điều trị dự kiến (ví dụ: CAP 5 ngày, UTI 3-5 ngày) để tránh tình trạng dùng kháng sinh kéo dài vô hạn?', icon: 'fa-calendar-days' },
          { num: 8, title: 'Điểm dừng đánh giá lại sau 48 - 72 giờ (Antibiotic Timeout)', q: 'Đã hẹn lịch đánh giá lại lâm sàng và kết quả cấy vi sinh lúc 48 - 72h để xuống thang (De-escalation) hoặc ngừng kháng sinh chưa?', icon: 'fa-clock-rotate-left' }
        ].map(step => `
          <label style="
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            padding: 1rem 1.25rem;
            border-radius: 10px;
            background: var(--color-bg, #f8fafc);
            border: 1px solid var(--color-border, #e2e8f0);
            cursor: pointer;
            transition: all 0.2s ease;
          " onmouseover="this.style.borderColor='var(--color-primary, #0284c7)';" onmouseout="this.style.borderColor='var(--color-border, #e2e8f0)';">
            <input type="checkbox" class="d8-check" style="margin-top: 4px; width: 18px; height: 18px; accent-color: #10b981; cursor: pointer;" />
            <div style="flex: 1;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 3px;">
                <span style="font-size: 0.75rem; font-weight: 800; padding: 2px 6px; border-radius: 4px; background: rgba(2,132,199,0.1); color: var(--color-primary, #0284c7);">
                  D${step.num}
                </span>
                <strong style="font-size: 0.92rem; color: var(--color-text, #0f172a);">${step.title}</strong>
              </div>
              <div style="font-size: 0.82rem; color: var(--color-text-muted, #64748b); line-height: 1.5;">${step.q}</div>
            </div>
          </label>
        `).join('')}
      </div>

      <div style="margin-top: 1.75rem; padding: 1.25rem; border-radius: 12px; background: var(--color-bg, #f8fafc); border: 1px dashed var(--color-border, #cbd5e1); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; font-weight: 800; color: var(--color-text, #0f172a);">Tiến độ hoàn thành Bảng kiểm:</div>
          <div style="font-size: 0.8rem; color: var(--color-text-muted, #64748b);"><span id="d8Score">0</span> / 8 tiêu chí đạt yêu cầu</div>
        </div>
        <button id="d8ValidateBtn" style="padding: 0.55rem 1.25rem; border-radius: 8px; border: none; background: #10b981; color: #fff; font-weight: 800; font-size: 0.85rem; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
          <i class="fa-solid fa-clipboard-check"></i> Xác nhận An Toàn Kê Đơn
        </button>
      </div>
    </div>
  `;

  const checkboxes = container.querySelectorAll<HTMLInputElement>('.d8-check');
  const scoreEl = container.querySelector<HTMLElement>('#d8Score');
  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const checked = container.querySelectorAll('.d8-check:checked').length;
      if (scoreEl) scoreEl.textContent = String(checked);
    });
  });
}

/** 2. PK/PD Simulator */
function renderPKPDSimulatorInteractive(container: HTMLElement): void {
  container.innerHTML = `
    <div style="max-width: 900px; margin: 0 auto;">
      <div style="background: rgba(2, 132, 199, 0.08); border: 1px solid rgba(2, 132, 199, 0.25); border-radius: 12px; padding: 1.25rem; margin-bottom: 1.5rem;">
        <h4 style="margin: 0 0 4px 0; font-size: 0.98rem; font-weight: 800; color: var(--color-primary, #0284c7);">
          Mô phỏng Truyền Kéo Dài Beta-Lactam (%T > MIC)
        </h4>
        <p style="margin: 0; font-size: 0.84rem; color: var(--color-text-muted, #64748b);">
          Kháng sinh Beta-lactam (Meropenem, Piperacillin-Tazobactam, Cefepime) diệt khuẩn phụ thuộc thời gian. So sánh 3 chế độ truyền với cùng một tổng liều:
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
        <div style="border: 1px solid #fca5a5; background: rgba(239, 68, 68, 0.04); border-radius: 10px; padding: 1rem;">
          <div style="font-weight: 800; color: #dc2626; font-size: 0.88rem; margin-bottom: 4px;">1. Tiêm ngắt quãng (30 phút)</div>
          <div style="font-size: 0.8rem; color: var(--color-text-muted, #64748b); line-height: 1.45;">Nồng độ đỉnh Cmax vọt lên rất cao nhưng tụt nhanh xuống dưới MIC chỉ sau 2-3h. %T > MIC chỉ đạt 40-50%. Nguy cơ thất bại điều trị cao ở ICU.</div>
        </div>
        <div style="border: 1px solid #93c5fd; background: rgba(2, 132, 199, 0.06); border-radius: 10px; padding: 1rem;">
          <div style="font-weight: 800; color: #0284c7; font-size: 0.88rem; margin-bottom: 4px;">2. Truyền kéo dài (3 - 4 giờ)</div>
          <div style="font-size: 0.8rem; color: var(--color-text-muted, #64748b); line-height: 1.45;">Tránh lãng phí nồng độ đỉnh thừa thãi, duy trì nồng độ thuốc trên MIC trong phần lớn chu kỳ đưa liều. %T > MIC đạt 80-100%.</div>
        </div>
        <div style="border: 1px solid #86efac; background: rgba(16, 185, 129, 0.06); border-radius: 10px; padding: 1rem;">
          <div style="font-weight: 800; color: #16a34a; font-size: 0.88rem; margin-bottom: 4px;">3. Truyền liên tục (Continuous 24h)</div>
          <div style="font-size: 0.8rem; color: var(--color-text-muted, #64748b); line-height: 1.45;">Cần liều nạp (Loading dose) ban đầu, sau đó truyền liên tục duy trì Css ổn định gấp 4-5 lần MIC. %T > MIC = 100% tuyệt đối.</div>
        </div>
      </div>

      <div style="background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem; text-align: center;">
        <div style="font-size: 0.85rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 0.5rem;">Biểu đồ mô phỏng Động học nồng độ theo thời gian (Concentration-Time Curve)</div>
        <svg viewBox="0 0 700 220" style="width: 100%; max-height: 220px; font-family: inherit;">
          <!-- Grid lines -->
          <line x1="50" y1="20" x2="50" y2="180" stroke="var(--color-border, #cbd5e1)" stroke-width="1.5" />
          <line x1="50" y1="180" x2="680" y2="180" stroke="var(--color-border, #cbd5e1)" stroke-width="1.5" />
          <!-- MIC threshold line -->
          <line x1="50" y1="120" x2="680" y2="120" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6,4" />
          <text x="60" y="112" fill="#f59e0b" font-size="11" font-weight="800">ĐƯỜNG NGƯỠNG MIC CỦA VI KHUẨN</text>
          
          <!-- Curve 1: Intermittent 30m (Red) -->
          <path d="M 50 180 Q 70 30 110 50 T 260 180" fill="none" stroke="#ef4444" stroke-width="2.5" />
          <text x="130" y="45" fill="#ef4444" font-size="11" font-weight="700">Tiêm 30p (Bolus)</text>
          
          <!-- Curve 2: Extended 4h (Blue) -->
          <path d="M 50 180 Q 110 80 180 85 T 260 140" fill="none" stroke="#0284c7" stroke-width="2.5" />
          <text x="200" y="80" fill="#0284c7" font-size="11" font-weight="700">Truyền kéo dài 4h (%T>MIC cao)</text>

          <!-- Curve 3: Continuous (Green) -->
          <line x1="50" y1="85" x2="680" y2="85" stroke="#10b981" stroke-width="2.5" />
          <text x="520" y="78" fill="#10b981" font-size="11" font-weight="800">Truyền liên tục 24h (100% T>MIC)</text>
          
          <!-- Axes labels -->
          <text x="20" y="25" fill="var(--color-text-muted, #64748b)" font-size="10">mg/L</text>
          <text x="650" y="200" fill="var(--color-text-muted, #64748b)" font-size="10">Thời gian (h)</text>
        </svg>
      </div>
    </div>
  `;
}

/** 3. WHO AWaRe 2023 Navigator */
function renderAWaReNavigatorInteractive(container: HTMLElement): void {
  const sampleDrugs = [
    { name: 'Amoxicillin', tier: 'access', class: 'Aminopenicillin', ind: 'CAP nhẹ, Viêm tai giữa, Viêm họng', note: 'Kháng sinh nền tảng số 1 cộng đồng' },
    { name: 'Amoxicillin-clavulanic acid', tier: 'access', class: 'Beta-lactam + Inhibitor', ind: 'CAP có bệnh kèm, Vết cắn động vật, Nhiễm khuẩn răng miệng', note: 'Phổ rộng kỵ khí' },
    { name: 'Cefalexin', tier: 'access', class: 'Cephalosporin thế hệ 1', ind: 'SSTI nhẹ, Nhiễm khuẩn vết mổ', note: 'Bao phủ liên cầu & tụ cầu nhạy cảm' },
    { name: 'Nitrofurantoin', tier: 'access', class: 'Nitrofuran', ind: 'Viêm bàng quang cấp không biến chứng', note: 'Chỉ tác dụng đường tiểu, không dùng cho viêm thận' },
    { name: 'Ciprofloxacin', tier: 'watch', class: 'Fluoroquinolone', ind: 'Viêm đài bể thận, Nhiễm khuẩn huyết Gram (-)', note: 'Tránh dùng cho viêm bàng quang nhẹ (FDA Black Box)' },
    { name: 'Ceftriaxone', tier: 'watch', class: 'Cephalosporin thế hệ 3', ind: 'Nhiễm trùng nội trú, Viêm phổi nặng, Viêm màng não', note: 'Dễ chọn lọc ESBL, cần hạn chế' },
    { name: 'Meropenem', tier: 'watch', class: 'Carbapenem', ind: 'Nhiễm khuẩn bệnh viện nặng do trực khuẩn Gram (-) đa kháng', note: 'Cần giám sát AMS' },
    { name: 'Colistin', tier: 'reserve', class: 'Polymyxin', ind: 'Acinetobacter baumannii, Pseudomonas đa kháng Carbapenem', note: 'Vũ khí tối hậu, độc tính thận cao' },
    { name: 'Linezolid', tier: 'reserve', class: 'Oxazolidinone', ind: 'Nhiễm khuẩn MRSA nặng, VRE', note: 'Bắt buộc hội chẩn AMS trước khi dùng' }
  ];

  container.innerHTML = `
    <div style="max-width: 900px; margin: 0 auto;">
      <div style="margin-bottom: 1.5rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 260px; position: relative;">
          <input type="text" id="awareSearch" placeholder="Nhập tên thuốc (ví dụ: Amoxicillin, Ciprofloxacin, Colistin...)" style="width: 100%; padding: 0.65rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #cbd5e1); font-size: 0.88rem;" />
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.75rem;" id="awareResults">
        ${sampleDrugs.map(d => {
          let badgeColor = '#10b981';
          let badgeBg = 'rgba(16, 185, 129, 0.12)';
          let tierLabel = 'ACCESS (ĐÈN XANH - TIẾP CẬN)';
          if (d.tier === 'watch') {
            badgeColor = '#f59e0b';
            badgeBg = 'rgba(245, 158, 11, 0.12)';
            tierLabel = 'WATCH (ĐÈN VÀNG - GIÁM SÁT)';
          } else if (d.tier === 'reserve') {
            badgeColor = '#ef4444';
            badgeBg = 'rgba(239, 68, 68, 0.12)';
            tierLabel = 'RESERVE (ĐÈN ĐỎ - DỰ TRỮ)';
          }
          return `
            <div class="aware-item-row" data-name="${d.name.toLowerCase()}" style="background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); border-radius: 10px; padding: 1rem 1.25rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 3px;">
                  <strong style="font-size: 1.05rem; color: var(--color-text, #0f172a);">${d.name}</strong>
                  <span style="font-size: 0.72rem; font-weight: 700; color: var(--color-text-muted, #64748b);">(${d.class})</span>
                </div>
                <div style="font-size: 0.82rem; color: var(--color-text-muted, #64748b);"><strong>Chỉ định chính:</strong> ${d.ind}</div>
                <div style="font-size: 0.78rem; color: var(--color-primary, #0284c7); margin-top: 2px;"><em>Lưu ý AMS:</em> ${d.note}</div>
              </div>
              <span style="font-size: 0.75rem; font-weight: 800; padding: 4px 10px; border-radius: 999px; background: ${badgeBg}; color: ${badgeColor}; white-space: nowrap;">
                ${tierLabel}
              </span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  const input = container.querySelector<HTMLInputElement>('#awareSearch');
  const rows = container.querySelectorAll<HTMLElement>('.aware-item-row');
  if (input) {
    input.addEventListener('input', () => {
      const q = input.value.toLowerCase().trim();
      rows.forEach(r => {
        const name = r.getAttribute('data-name') || '';
        r.style.display = (q === '' || name.includes(q)) ? 'flex' : 'none';
      });
    });
  }
}

/** 4. Beta-Lactam Delabeling Matrix */
function renderDelabelingMatrixInteractive(container: HTMLElement): void {
  container.innerHTML = `
    <div style="max-width: 900px; margin: 0 auto;">
      <div style="background: rgba(244, 63, 94, 0.08); border: 1px solid rgba(244, 63, 94, 0.25); border-radius: 12px; padding: 1.25rem; margin-bottom: 1.5rem;">
        <h4 style="margin: 0 0 4px 0; font-size: 0.98rem; font-weight: 800; color: #f43f5e;">
          Thuật toán Xóa nhãn Dị ứng Penicillin & Ma trận Phản ứng chéo EBM 2026
        </h4>
        <p style="margin: 0; font-size: 0.84rem; color: var(--color-text-muted, #64748b);">
          Y học chứng cứ hiện đại xác nhận: Phản ứng chéo giữa Penicillin và Cephalosporin thế hệ 3/4 &lt; 2%, Carbapenem &lt; 1%, Aztreonam 0%.
        </p>
      </div>

      <div style="background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem;">
        <h5 style="margin: 0 0 0.75rem 0; font-size: 0.92rem; font-weight: 800; color: var(--color-text, #0f172a);">
          Ma trận Chuỗi bên R1 tương đồng (Cần tránh dùng chung):
        </h5>
        <div style="display: flex; flex-direction: column; gap: 0.65rem; font-size: 0.83rem;">
          <div style="background: var(--color-surface, #fff); padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #cbd5e1);">
            <strong style="color: #dc2626;">Nhóm Aminopenicillin:</strong> Ampicillin, Amoxicillin có chuỗi bên R1 giống <strong>Cefalexin, Cefadroxil, Cefaclor</strong>. Nếu dị ứng thật với Amoxicillin, tránh dùng Cefalexin/Cefadroxil.
          </div>
          <div style="background: var(--color-surface, #fff); padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #cbd5e1);">
            <strong style="color: #0284c7;">Nhóm Aminothiazolyl:</strong> Ceftriaxone, Cefotaxime, Cefepime có cùng chuỗi bên nhưng KHÁC HOÀN TOÀN Penicillin. <span style="color: #16a34a; font-weight: 700;">An toàn sử dụng cho bệnh nhân dị ứng Penicillin nhẹ!</span>
          </div>
          <div style="background: var(--color-surface, #fff); padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #cbd5e1);">
            <strong style="color: #10b981;">Ngoại lệ duy nhất của Aztreonam:</strong> Aztreonam có chuỗi bên giống hệt <strong>Ceftazidime</strong>. Nếu bệnh nhân dị ứng Ceftazidime thì không dùng Aztreonam; còn với mọi Beta-lactam khác thì Aztreonam phản ứng chéo bằng 0%.
          </div>
        </div>
      </div>
    </div>
  `;
}

/** 5. IV-to-PO Stepdown Evaluator */
function renderIVPOStepdownInteractive(container: HTMLElement): void {
  container.innerHTML = `
    <div style="max-width: 900px; margin: 0 auto;">
      <div style="background: rgba(20, 184, 166, 0.08); border: 1px solid rgba(20, 184, 166, 0.25); border-radius: 12px; padding: 1.25rem; margin-bottom: 1.5rem;">
        <h4 style="margin: 0 0 4px 0; font-size: 0.98rem; font-weight: 800; color: #0d9488;">
          Thang điểm 4 Trụ cột Chuyển đổi Kháng sinh từ IV sang PO
        </h4>
        <p style="margin: 0; font-size: 0.84rem; color: var(--color-text-muted, #64748b);">
          Khi bệnh nhân thỏa mãn cả 4 điều kiện lâm sàng sau, hãy kích hoạt chuyển sang đường uống để giảm nguy cơ nhiễm trùng catheter và rút ngắn ngày nằm viện:
        </p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;">
        ${[
          '1. Huyết động ổn định liên tục ≥ 24 giờ (Huyết áp bình thường, không dùng thuốc vận mạch).',
          '2. Thân nhiệt hạ ổn định (Nhiệt độ < 38°C liên tục ≥ 24 giờ mà không dùng hạ sốt dồn dập).',
          '3. Các dấu ấn viêm có xu hướng cải thiện rõ rệt (Bạch cầu máu đang giảm, CRP/Procalcitonin giảm).',
          '4. Đường tiêu hóa thông suốt, bệnh nhân uống được, không nôn ói, không tiêu chảy cấp nặng, không tắc ruột.'
        ].map(cond => `
          <div style="display: flex; align-items: center; gap: 10px; background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); border-radius: 8px; padding: 0.85rem 1rem; font-size: 0.85rem; font-weight: 600; color: var(--color-text, #0f172a);">
            <i class="fa-solid fa-circle-check" style="color: #10b981; font-size: 1.1rem;"></i>
            <span>${cond}</span>
          </div>
        `).join('')}
      </div>

      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #cbd5e1); border-radius: 12px; padding: 1.25rem;">
        <h5 style="margin: 0 0 0.65rem 0; font-size: 0.9rem; font-weight: 800; color: var(--color-primary, #0284c7);">
          Danh mục kháng sinh đường uống có sinh khả dụng xuất sắc (F > 90%):
        </h5>
        <div style="font-size: 0.82rem; line-height: 1.6; color: var(--color-text, #0f172a);">
          • <strong>Fluoroquinolones:</strong> Levofloxacin (F ~ 99%), Ciprofloxacin (F ~ 70-80%), Moxifloxacin (F ~ 90%).<br/>
          • <strong>Linezolid:</strong> Sinh khả dụng PO 100% tương đương tuyệt đối tiêm tĩnh mạch.<br/>
          • <strong>Metronidazole:</strong> Sinh khả dụng PO ~ 100%, ngấm mô ổ bụng tuyệt vời.<br/>
          • <strong>Co-trimoxazole (TMP-SMX):</strong> Hấp thu PO gần như hoàn toàn (> 95%).<br/>
          • <strong>Doxycycline:</strong> Hấp thu PO 90-100%, không bị ảnh hưởng nhiều bởi thức ăn.
        </div>
      </div>
    </div>
  `;
}
