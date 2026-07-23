// ════════════════════════════════════════════════════════════════
//  CLINIPORTAL - DRUG TIMELINE VISUALIZER MODULE
//  Biểu đồ thời gian phác đồ dùng thuốc trực quan cho ACS & Suy Tim
// ════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const TIMELINE_PRESETS = {
    acs: {
      title: 'Phác Đồ Mạch Vành Cấp & Kháng Kết Tập Tiểu Cầu (ACS / DAPT)',
      subtitle: 'Thời gian duy trì Aspirin, Ticagrelor/Clopidogrel, Heparin & Statin cường độ cao',
      axis: ['Ngày 0', '48 Giờ', '7 Ngày', '30 Ngày', '6 Tháng', '12 Tháng', 'Vĩnh Viễn'],
      drugs: [
        { name: 'Aspirin 81-100mg', start: 0, width: 100, color: 'bar-rose', label: 'Vĩnh viễn (Khởi đầu 162-325mg nạp)' },
        { name: 'Ticagrelor / Clopidogrel', start: 0, width: 85, color: 'bar-blue', label: '12 Tháng (DAPT sau PCI)' },
        { name: 'Heparin / Enoxaparin', start: 0, width: 25, color: 'bar-amber', label: '48 Giờ đến 8 Ngày (Trong ĐT cấp)' },
        { name: 'Statin Cường Độ Cao', start: 0, width: 100, color: 'bar-purple', label: 'Vĩnh viễn (Ator 40-80mg / Rosuva 20-40mg)' },
        { name: 'Beta-Blocker (Chẹn Beta)', start: 0, width: 85, color: 'bar-teal', label: 'Tối thiểu 1-3 năm (vĩnh viễn nếu LVEF < 40%)' }
      ]
    },
    hf: {
      title: 'Phác Đồ 4 Trụ Cột Điều Trị Suy Tim HFrEF (GDMT 2026)',
      subtitle: 'Tối ưu hóa khởi trị & dò liều ARNI, Beta-Blocker, MRA & SGLT2i',
      axis: ['Tuần 0', 'Tuần 2', 'Tuần 4', 'Tuần 6', 'Tuần 8', 'Duy Trì', 'Vĩnh Viễn'],
      drugs: [
        { name: 'ARNI (Sacubitril/Valsartan)', start: 0, width: 100, color: 'bar-blue', label: 'Khởi đầu liều thấp → Dò liều gấp đôi mỗi 2-4 tuần' },
        { name: 'Beta-Blocker chọn lọc', start: 0, width: 100, color: 'bar-teal', label: 'Khởi đầu 1.25-2.5mg → Dò liều đạt đích (Bisoprolol 10mg)' },
        { name: 'MRA (Spironolactone)', start: 0, width: 100, color: 'bar-purple', label: '25mg/ngày (Theo dõi Kali máu sau 1 & 4 tuần)' },
        { name: 'SGLT2i (Dapa / Empa)', start: 0, width: 100, color: 'bar-rose', label: '10mg/ngày cố định (Không cần dò liều)' }
      ]
    }
  };

  function renderTimelineComponent(mountEl, presetKey = 'acs') {
    if (!mountEl) return;

    const data = TIMELINE_PRESETS[presetKey] || TIMELINE_PRESETS.acs;

    mountEl.innerHTML = `
      <div class="timeline-card-container">
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
          <div>
            <h3 style="margin: 0; font-size: var(--text-md); font-weight: 700; color: var(--color-primary); display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-solid fa-timeline"></i> ${data.title}
            </h3>
            <p style="margin: 0.2rem 0 0 0; font-size: 0.78rem; color: var(--color-text-muted);">${data.subtitle}</p>
          </div>

          <div style="display: flex; gap: 0.4rem;">
            <button class="em-tag-btn ${presetKey === 'acs' ? 'active' : ''}" id="tl-btn-acs">Mạch Vành (ACS)</button>
            <button class="em-tag-btn ${presetKey === 'hf' ? 'active' : ''}" id="tl-btn-hf">Suy Tim (GDMT)</button>
          </div>
        </div>

        <div class="timeline-track-wrapper">
          <div class="timeline-grid">
            ${data.drugs.map(d => `
              <div class="timeline-row">
                <div class="timeline-label">💊 ${d.name}</div>
                <div class="timeline-bar-track">
                  <div class="timeline-bar-fill ${d.color}" style="left: ${d.start}%; width: ${d.width}%;">
                    ${d.label}
                  </div>
                </div>
              </div>
            `).join('')}

            <div class="timeline-axis">
              <div></div>
              <div class="timeline-axis-ticks">
                ${data.axis.map(a => `<span>${a}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('tl-btn-acs').onclick = () => renderTimelineComponent(mountEl, 'acs');
    document.getElementById('tl-btn-hf').onclick = () => renderTimelineComponent(mountEl, 'hf');
  }

  window.DrugTimeline = {
    render: renderTimelineComponent
  };

  document.addEventListener('DOMContentLoaded', () => {
    const mount = document.getElementById('pharma-timeline-mount');
    if (mount) renderTimelineComponent(mount, 'acs');
  });
})();
