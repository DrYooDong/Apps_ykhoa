// ════════════════════════════════════════════════════════════════
//  CLINIPORTAL - CONTEXTUAL CROSS-LINKS & BRIDGE ENGINE
//  Tự động kết nối: Bệnh lý ↔ Dược lý (Dose Table) & Tiếp cận ↔ Sinh lý bệnh (<patho-mechanism>)
// ════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  function getRelativePrefix() {
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/pages/Dược lý/Chuyên khoa/') || path.includes('/pages/Dược lý/Triệu chứng/')) {
      return '../../../';
    }
    if (path.includes('/pages/Dược lý/') || path.includes('/pages/Tiếp cận/4. Bệnh lý/') || path.includes('/src/content/approaches/pathology/')) {
      return '../../';
    }
    return '../';
  }

  const prefix = getRelativePrefix();

  // ════════════════════════════════════════════════════════════════
  // 1. PHARMA BRIDGE ENGINE (Pathology ↔ Pharmacology)
  // ════════════════════════════════════════════════════════════════
  const PHARMA_CATALOG = {
    'aspirin': {
      id: 'aspirin',
      name: 'Aspirin (Acid Acetylsalicylic)',
      category: 'Chống kết tập tiểu cầu (COX-1 inhibitor)',
      dose: 'Liều nạp: 150 - 300 mg nhai trực tiếp. Duy trì: 75 - 100 mg/ngày',
      mechanism: 'Ức chế không thuận nghịch enzyme COX-1, giảm tổng hợp Thromboxane A2.',
      pearl: 'Không dùng dạng bao tan trong ruột khi cần cấp cứu nạp STEMI.',
      url: `${prefix}pages/Dược lý/duoc-ly.html?drugId=aspirin`
    },
    'ticagrelor': {
      id: 'ticagrelor',
      name: 'Ticagrelor (Brilinta)',
      category: 'Thuốc ức chế thụ thể P2Y12 (Reversible)',
      dose: 'Liều nạp: 180 mg PO. Duy trì: 90 mg x 2 lần/ngày',
      mechanism: 'Ức chế gắn thuận nghịch thụ thể P2Y12 ADP trên tiểu cầu.',
      pearl: 'Khởi phát nhanh hơn Clopidogrel; không cần chuyển hóa qua gan.',
      url: `${prefix}pages/Dược lý/duoc-ly.html?drugId=ticagrelor`
    },
    'heparin_ufh': {
      id: 'heparin_ufh',
      name: 'Unfractionated Heparin (UFH)',
      category: 'Thuốc chống đông tiêm (AT-III activator)',
      dose: 'PCI: 70 - 100 IU/kg IV bolus. Cấp cứu DVT/PE: 80 IU/kg bolus → 18 IU/kg/h',
      mechanism: 'Gắn Antithrombin III, bất hoạt Thrombin (IIa) và Yếu tố Xa.',
      pearl: 'Theo dõi aPTT (mục tiêu 1.5 - 2.5 lần chứng). Có chất hóa giải Protamine.',
      url: `${prefix}pages/Dược lý/duoc-ly.html?drugId=heparin`
    },
    'tenecteplase': {
      id: 'tenecteplase',
      name: 'Tenecteplase (TNK-tPA)',
      category: 'Thuốc tiêu sợi huyết (Fibrin-specific tPA)',
      dose: 'IV bolus trong 5-10 giây: 30-50 mg tùy cân nặng (0.5 mg/kg)',
      mechanism: 'Chuyển Plasminogen thành Plasmin trên bề mặt cục huyết khối.',
      pearl: 'Đặc hiệu Fibrin cao hơn Alteplase, tỷ lệ xuất huyết toàn thân thấp hơn.',
      url: `${prefix}pages/Dược lý/duoc-ly.html?drugId=tenecteplase`
    },
    'rivaroxaban': {
      id: 'rivaroxaban',
      name: 'Rivaroxaban (Xarelto)',
      category: 'Thuốc chống đông đường uống thế hệ mới (DOAC / Factor Xa)',
      dose: 'DVT/PE: 15 mg x 2 lần/ngày x 21 ngày → 20 mg x 1 lần/ngày (dùng cùng ăn)',
      mechanism: 'Ức chế trực tiếp yếu tố Xa do đó ngăn cản hình thành Thrombin.',
      pearl: 'Liều 15mg & 20mg BẮT BUỘC dùng cùng bữa ăn chính để đạt sinh khả dụng tối đa.',
      url: `${prefix}pages/Dược lý/duoc-ly.html?drugId=rivaroxaban`
    },
    'apixaban': {
      id: 'apixaban',
      name: 'Apixaban (Eliquis)',
      category: 'Thuốc chống đông đường uống thế hệ mới (DOAC / Factor Xa)',
      dose: 'DVT/PE: 10 mg x 2 lần/ngày x 7 ngày → 5 mg x 2 lần/ngày',
      mechanism: 'Ức chế trực tiếp yếu tố Xa tự do và trong cục máu đông.',
      pearl: 'Tỷ lệ xuất huyết tiêu hóa thấp nhất trong nhóm DOACs.',
      url: `${prefix}pages/Dược lý/duoc-ly.html?drugId=apixaban`
    },
    'enoxaparin': {
      id: 'enoxaparin',
      name: 'Enoxaparin (Lovenox)',
      category: 'Heparin trọng lượng phân tử thấp (LMWH)',
      dose: '1 mg/kg SC q12h (hoặc 1.5 mg/kg SC q24h). Chỉnh liều CrCl < 30ml/ph: 1 mg/kg q24h',
      mechanism: 'Ức chế ưu thế trên Yếu tố Xa so với Yếu tố IIa (tỷ lệ 3.8:1).',
      pearl: 'Không cần theo dõi aPTT thường quy. Dùng được cho phụ nữ mang thai.',
      url: `${prefix}pages/Dược lý/duoc-ly.html?drugId=enoxaparin`
    },
    'amox_clav': {
      id: 'amox_clav',
      name: 'Amoxicillin / Clavulanate (Augmentin)',
      category: 'Kháng sinh Penicillin + Ức chế Beta-lactamase',
      dose: 'Người lớn: 875/125 mg PO q12h hoặc 1000 mg IV q8h',
      mechanism: 'Amoxicillin diệt khuẩn thành tế bào; Acid Clavulanic bảo vệ vòng Beta-lactam.',
      pearl: 'Uống vào đầu bữa ăn để giảm tác dụng phụ tiêu chảy & tăng hấp thu.',
      url: `${prefix}pages/Dược lý/duoc-ly.html?drugId=amox_clav`
    },
    'metoprolol_succ': {
      id: 'metoprolol_succ',
      name: 'Metoprolol Succinate ER (Betaloc ZOK)',
      category: 'Chẹn Beta-1 chọn lọc (Beta-Blocker)',
      dose: 'Suy tim/Tăng HA: 12.5 - 25 mg PO q24h, tăng dần tới 200 mg/ngày',
      mechanism: 'Ức chế chọn lọc thụ thể Beta-1 adrenergic ở tim, giảm nhịp tim & sức co bóp.',
      pearl: 'Dạng viên phóng thích kéo dài ER (Succinate) được chứng minh giảm tử vong suy tim.',
      url: `${prefix}pages/Dược lý/duoc-ly.html?drugId=metoprolol_succ`
    }
  };

  const PharmaBridge = {
    catalog: PHARMA_CATALOG,
    
    getDrug(query) {
      if (!query) return null;
      const key = query.toLowerCase().trim();
      if (PHARMA_CATALOG[key]) return PHARMA_CATALOG[key];

      // Match by name or brand
      return Object.values(PHARMA_CATALOG).find(d => 
        d.name.toLowerCase().includes(key) || key.includes(d.id)
      ) || null;
    },

    renderDoseCard(doseData) {
      const container = document.createElement('div');
      container.className = 'dose-table-card';
      container.id = 'dose-table-card-section';

      const title = doseData.title || 'LỰA CHỌN & LIỀU DÙNG THUỐC LÂM SÀNG';
      const drugs = doseData.drugs || [];
      const notices = doseData.specialNotices || doseData.notice;

      let drugRowsHtml = drugs.map(d => {
        const drugObj = this.getDrug(d.name) || this.getDrug(d.id);
        const pharmaBadge = drugObj ? `
          <button class="btn-pharma-link" onclick="window.PharmaBridge.openModal('${drugObj.id}')" title="Xem Thẻ Thuốc Dược Lý" style="background:rgba(2, 132, 199, 0.1); color:var(--color-primary); border:1px solid rgba(2, 132, 199, 0.3); border-radius:6px; padding:0.25rem 0.5rem; font-size:0.75rem; font-weight:600; cursor:pointer;">
            <i class="fa-solid fa-pills"></i> Tra cứu Thuốc
          </button>
        ` : '';

        const pearlText = drugObj ? `<div style="font-size:0.75rem; color:var(--color-primary); margin-top:0.2rem;"><i class="fa-solid fa-lightbulb"></i> ${drugObj.pearl}</div>` : '';

        return `
          <div class="dose-drug-row" style="padding:0.75rem; border-bottom:1px solid var(--color-divider);">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
              <div class="dose-drug-name" style="font-weight:700; color:var(--color-text);">
                <i class="fa-solid fa-capsules" style="color:var(--color-primary); margin-right:0.4rem;"></i> ${d.name}
              </div>
              ${pharmaBadge}
            </div>
            <div class="dose-drug-val" style="font-size:0.85rem; color:var(--color-text-muted); margin-top:0.3rem;">
              <strong>Liều khuyến cáo:</strong> ${d.dose}
            </div>
            ${pearlText}
          </div>
        `;
      }).join('');

      let noticeHtml = '';
      if (Array.isArray(notices)) {
        noticeHtml = `<div class="dose-notice-box" style="padding:0.75rem; background:rgba(239, 68, 68, 0.08); border-left:3px solid var(--color-danger); margin-top:0.5rem; font-size:0.8rem;">${notices.map(n => `<div>• ${n}</div>`).join('')}</div>`;
      } else if (typeof notices === 'string') {
        noticeHtml = `<div class="dose-notice-box" style="padding:0.75rem; background:rgba(239, 68, 68, 0.08); border-left:3px solid var(--color-danger); margin-top:0.5rem; font-size:0.8rem;">${notices}</div>`;
      }

      container.innerHTML = `
        <div class="dose-table-header" style="background:var(--color-surface-hover); padding:0.75rem 1rem; border-bottom:1px solid var(--color-border); font-weight:700; color:var(--color-primary); display:flex; align-items:center; justify-content:space-between;">
          <span><i class="fa-solid fa-table-cells"></i> ${title}</span>
          <span style="font-size:0.7rem; background:var(--color-primary); color:#fff; padding:0.2rem 0.5rem; border-radius:10px;">Dữ liệu Dược lý Dùng chung</span>
        </div>
        <div class="dose-table-body">
          ${drugRowsHtml}
        </div>
        ${noticeHtml}
      `;
      return container;
    },

    openModal(drugId) {
      const drug = this.catalog[drugId] || this.getDrug(drugId);
      if (!drug) return;

      let modal = document.getElementById('pharma-bridge-modal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'pharma-bridge-modal';
        modal.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:9999; backdrop-filter:blur(4px);';
        document.body.appendChild(modal);
      }

      modal.innerHTML = `
        <div style="background:var(--color-surface); width:90%; max-width:550px; border-radius:12px; border:1px solid var(--color-border); padding:1.5rem; box-shadow:0 10px 30px rgba(0,0,0,0.25); position:relative;">
          <button onclick="document.getElementById('pharma-bridge-modal').style.display='none'" style="position:absolute; top:1rem; right:1rem; background:none; border:none; font-size:1.25rem; cursor:pointer; color:var(--color-text-muted);">&times;</button>
          
          <div style="display:flex; align-items:center; gap:0.5rem; color:var(--color-primary); font-size:0.75rem; font-weight:700; text-transform:uppercase;">
            <i class="fa-solid fa-pills"></i> Thẻ Dược Lý Lâm Sàng
          </div>
          <h3 style="margin:0.25rem 0 0.75rem 0; font-size:1.2rem; color:var(--color-text);">${drug.name}</h3>
          
          <div style="font-size:0.8rem; background:var(--color-bg); padding:0.5rem 0.75rem; border-radius:6px; margin-bottom:0.75rem;">
            <strong>Phân nhóm:</strong> ${drug.category}
          </div>

          <div style="font-size:0.85rem; margin-bottom:0.75rem;">
            <strong style="color:var(--color-primary);">Liều dùng khuyến cáo:</strong><br>
            ${drug.dose}
          </div>

          <div style="font-size:0.85rem; margin-bottom:0.75rem;">
            <strong style="color:var(--color-primary);">Cơ chế tác dụng (MOA):</strong><br>
            ${drug.mechanism}
          </div>

          <div style="font-size:0.8rem; background:rgba(2, 132, 199, 0.08); border-left:3px solid var(--color-primary); padding:0.6rem; border-radius:4px; margin-bottom:1rem;">
            <strong style="color:var(--color-primary);"><i class="fa-solid fa-lightbulb"></i> Clinical Pearl:</strong> ${drug.pearl}
          </div>

          <div style="display:flex; justify-content:flex-end; gap:0.5rem;">
            <a href="${drug.url}" target="_blank" class="pm-btn-primary" style="text-decoration:none; display:inline-flex; align-items:center; gap:0.4rem; padding:0.5rem 1rem; border-radius:6px; font-size:0.85rem; background:var(--color-primary); color:#fff;">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Mở Thẻ Thuốc Đầy Đủ
            </a>
          </div>
        </div>
      `;
      modal.style.display = 'flex';
    }
  };

  // ════════════════════════════════════════════════════════════════
  // 2. PATHO BRIDGE ENGINE (Clinical Approach ↔ Pathophysiology)
  // ════════════════════════════════════════════════════════════════
  const PATHO_CATALOG = {
    'stemi_ischemia': {
      title: 'Cơ chế Thiếu máu & Hoại tử Cơ tim trong STEMI',
      concept: 'Mạch vành & Sinh lý bệnh Cơ tim',
      steps: [
        'Nứt vỡ mảng xơ vữa → Kích hoạt tiểu cầu & đông máu',
        'Hình thành cục huyết khối lấp hoàn toàn lòng mạch vành',
        'Thiếu máu cục bộ xuyên thành → Hoại tử tế bào cơ tim sau 20-30 phút',
        'ST chênh lên trên ECG do dòng điện tổn thương màng tế bào'
      ],
      mechanism: 'Sự tắc nghẽn hoàn toàn động mạch vành làm ngưng cấp máu cho vùng cơ tim tương ứng. Tế bào cơ tim thiếu O2 không thể duy trì bơm Na+/K+-ATPase, dẫn đến tái cực bất thường (ST chênh lên) và giải phóng Troponin T/I vào máu.',
      url: `${prefix}pages/Sinh lý - Sinh lý bệnh/`
    },
    'vte_triad': {
      title: 'Tam chứng Virchow trong Huyết khối Tĩnh mạch DVT',
      concept: 'Sinh lý bệnh Huyết học & Mạch máu',
      steps: [
        'Trì trệ dòng máu (Stasis): Nằm lâu, bó bột, bay đường dài',
        'Tổn thương nội mạc (Endothelial Injury): Phẫu thuật, chấn thương',
        'Tăng đông (Hypercoagulability): Ung thư, thiếu hụt Protein C/S, thai kỳ'
      ],
      mechanism: 'Khi có ít nhất 2 trong 3 yếu tố của Tam chứng Virchow, sự tích tụ các yếu tố đông máu tại các van tĩnh mạch chi dưới kích hoạt con đường đông máu nội sinh, hình thành huyết khối giàu Fibrin và hồng cầu.',
      url: `${prefix}pages/Sinh lý - Sinh lý bệnh/`
    },
    'dvt_stasis': {
      title: 'Cơ chế Tắc nghẽn Tĩnh mạch & Phù Chi dưới',
      concept: 'Huyết động học & Áp lực Thủy tĩnh',
      steps: [
        'Huyết khối gây tắc cản trở dòng máu tĩnh mạch về tim',
        'Tăng áp lực thủy tĩnh trong lòng tĩnh mạch đoạn xa',
        'Thoát dịch mao mạch vào khoảng kẽ → Sưng đau & căng cứng chân'
      ],
      mechanism: 'Sự gia tăng đột ngột áp lực thủy tĩnh mao mạch vượt quá áp lực keo huyết tương làm dịch di chuyển ra khoang kẽ chi dưới, kích thích các thụ thể cảm giác đau (Nociceptors).',
      url: `${prefix}pages/Sinh lý - Sinh lý bệnh/`
    },
    'shock_hypoperfusion': {
      title: 'Cơ chế Giảm Tưới máu Mô & Nhiễm Toan Lactic trong Sốc',
      concept: 'Chuyển hóa Tế bào & Huyết động',
      steps: [
        'Tụt HA / Cung lượng tim giảm → Thất bại tưới máu vi mạch',
        'Tế bào chuyển từ hô hấp hiếu khí sang yếm khí (Anaerobic)',
        'Tích tụ Acid Lactic → Toan chuyển hóa (Metabolic Acidosis)'
      ],
      mechanism: 'Thiếu oxy tế bào ngắt chuỗi truyền electron ty thể. Pyruvate không vào vòng Krebs mà chuyển thành Lactate, gây hạ pH máu và suy đa cơ quan.',
      url: `${prefix}pages/Sinh lý - Sinh lý bệnh/`
    }
  };

  const PathoBridge = {
    catalog: PATHO_CATALOG,

    getPatho(pathoId) {
      if (!pathoId) return null;
      return PATHO_CATALOG[pathoId] || null;
    },

    openPathoPopover(pathoId, anchorEl) {
      const data = this.getPatho(pathoId);
      if (!data) return;

      let popover = document.getElementById('patho-bridge-popover');
      if (!popover) {
        popover = document.createElement('div');
        popover.id = 'patho-bridge-popover';
        popover.style.cssText = 'position:fixed; z-index:9999; width:340px; background:var(--color-surface); border:1px solid var(--color-primary); border-radius:10px; padding:1rem; box-shadow:0 8px 24px rgba(2,132,199,0.18); font-family:inherit;';
        document.body.appendChild(popover);
      }

      const rect = anchorEl.getBoundingClientRect();
      const left = Math.min(window.innerWidth - 360, Math.max(10, rect.left));
      const top = rect.bottom + 8 > window.innerHeight - 250 ? rect.top - 240 : rect.bottom + 8;

      popover.style.left = `${left}px`;
      popover.style.top = `${top}px`;

      const stepsList = data.steps ? `
        <div style="margin:0.5rem 0;">
          ${data.steps.map((st, i) => `<div style="font-size:0.75rem; color:var(--color-text); margin-bottom:0.25rem;"><strong>${i+1}.</strong> ${st}</div>`).join('')}
        </div>
      ` : '';

      popover.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid var(--color-divider); padding-bottom:0.4rem; margin-bottom:0.5rem;">
          <span style="font-size:0.8rem; font-weight:700; color:var(--color-purple); display:flex; align-items:center; gap:0.4rem;">
            <i class="fa-solid fa-dna"></i> Cơ Chế Sinh Lý Bệnh
          </span>
          <button onclick="document.getElementById('patho-bridge-popover').style.display='none'" style="background:none; border:none; cursor:pointer; font-size:1rem; color:var(--color-text-muted);">&times;</button>
        </div>
        <div style="font-weight:700; font-size:0.85rem; color:var(--color-primary); margin-bottom:0.4rem;">${data.title}</div>
        <div style="font-size:0.78rem; color:var(--color-text-muted); line-height:1.4;">${data.mechanism}</div>
        ${stepsList}
        <div style="margin-top:0.75rem; text-align:right;">
          <a href="${data.url}" target="_blank" style="font-size:0.75rem; color:var(--color-primary); font-weight:600; text-decoration:none;">
            Xem bài Sinh lý bệnh <i class="fa-solid fa-chevron-right"></i>
          </a>
        </div>
      `;
      popover.style.display = 'block';
    },

    initFlowchartNodes() {
      document.querySelectorAll('[data-patho-id]').forEach(node => {
        if (node.querySelector('.patho-trigger-btn')) return;

        const pathoId = node.getAttribute('data-patho-id');
        const trigger = document.createElement('button');
        trigger.className = 'patho-trigger-btn';
        trigger.type = 'button';
        trigger.title = 'Xem giải thích Cơ chế Sinh lý bệnh (Why?)';
        trigger.style.cssText = 'position:absolute; top:6px; right:6px; background:rgba(124,58,237,0.12); color:var(--color-purple); border:1px solid rgba(124,58,237,0.3); border-radius:50%; width:24px; height:24px; display:inline-flex; align-items:center; justify-content:center; font-size:0.75rem; cursor:pointer; z-index:10; transition:all 0.2s ease;';
        trigger.innerHTML = '<i class="fa-solid fa-dna"></i>';

        trigger.addEventListener('mouseenter', () => {
          trigger.style.transform = 'scale(1.15)';
          trigger.style.background = 'var(--color-purple)';
          trigger.style.color = '#fff';
        });

        trigger.addEventListener('mouseleave', () => {
          trigger.style.transform = 'scale(1)';
          trigger.style.background = 'rgba(124,58,237,0.12)';
          trigger.style.color = 'var(--color-purple)';
        });

        trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          this.openPathoPopover(pathoId, trigger);
        });

        if (getComputedStyle(node).position === 'static') {
          node.style.position = 'relative';
        }
        node.appendChild(trigger);
      });
    }
  };

  // Export to Window Scope
  window.PharmaBridge = PharmaBridge;
  window.PathoBridge = PathoBridge;

  // Auto-init Patho Triggers on DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      PathoBridge.initFlowchartNodes();
    }, 500);
  });
})();
