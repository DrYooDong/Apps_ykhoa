// ════════════════════════════════════════════════════════════════
//  CLINIPORTAL - EMERGENCY DOSING QUICK-REFERENCE MODULE
//  Tra cứu nhanh liều lượng & phác đồ 20 thuốc cấp cứu hàng đầu
// ════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // 20 Critical Emergency Drugs Database
  const EMERGENCY_DRUGS = [
    {
      id: 'adrenaline',
      name: 'Adrenaline (Epinephrine)',
      category: 'Ngừng tim / Phản vệ',
      dose: '1mg IV/IO mỗi 3–5 phút (Ngừng tim); 0.3–0.5mg IM (Phản vệ)',
      dilution: 'Nguyên chất 1mg/ml (IM) hoặc Pha thành 1mg/10ml (IV cấp cứu)',
      route: 'IM / IV / IO / Truyền liên tục (0.01–0.5 mcg/kg/phút)',
      note: 'Ưu tiên tiêm bắp mặt ngoài đùi trong sốc phản vệ. Tránh tiêm Tĩnh mạch nguyên chất nhanh.'
    },
    {
      id: 'noradrenaline',
      name: 'Noradrenaline (Norepinephrine)',
      category: 'Sốc / Vận mạch',
      dose: 'Khởi đầu 0.05–0.1 mcg/kg/phút, dò liều nâng MAP ≥ 65 mmHg',
      dilution: 'Pha 4mg / 50ml Glucose 5% hoặc NaCl 0.9% (Nồng độ 80 mcg/ml)',
      route: 'Truyền Tĩnh mạch trung tâm qua bơm tiêm điện',
      note: 'Thuốc vận mạch lựa chọn hàng đầu trong Sốc nhiễm khuẩn và Sốc phân bố.'
    },
    {
      id: 'dobutamine',
      name: 'Dobutamine',
      category: 'Suy tim / Sốc tim',
      dose: 'Khởi đầu 2.5–5 mcg/kg/phút, tăng dần tối đa 20 mcg/kg/phút',
      dilution: 'Pha 250mg / 50ml G5% hoặc NSI (5mg/ml)',
      route: 'Truyền Tĩnh mạch qua bơm tiêm điện',
      note: 'Thuốc tăng co bóp cơ tim. Có thể gây tụt áp nhẹ do giãn mạch ngoại vi.'
    },
    {
      id: 'amiodarone',
      name: 'Amiodarone (Cordarone)',
      category: 'Loạn nhịp thất / AF',
      dose: '300mg IV bolus (VF/VT mất mạch); 150mg IV trong 10 phút (VT có mạch)',
      dilution: 'Pha trong Glucose 5% (tránh NaCl vì gây tủa)',
      route: 'IV bolus nhanh / Truyền duy trì 900mg/24h',
      note: 'Theo dõi sát huyết áp và khoảng QT. Bắt buộc dùng đường truyền tĩnh mạch lớn.'
    },
    {
      id: 'atropine',
      name: 'Atropine Sulfate',
      category: 'Nhịp chậm / Độc chất',
      dose: '1mg IV mỗi 3–5 phút (Tối đa 3mg cho nhịp chậm); 2–5mg IV mỗi 5–10 min (Nhiễm độc Phospho)',
      dilution: 'Dùng ống tiêm nguyên chất 0.25mg/ml hoặc 1mg/ml',
      route: 'IV / IO / IM',
      note: 'Liều < 0.5mg ở người lớn có thể gây nhịp chậm nghịch lý.'
    },
    {
      id: 'adenosine',
      name: 'Adenosine',
      category: 'Cơn nhịp nhanh SVT',
      dose: '6mg IV bolus nhanh trong 1–2 giây; nếu không ra lặp lại 12mg IV',
      dilution: 'Nguyên chất 6mg/2ml',
      route: 'IV bolus nhanh tĩnh mạch gần tim + Bơm xả 20ml NaCl 0.9%',
      note: 'Bệnh nhân sẽ có cảm giác vô tâm thu ngắn (1-2 giây). Báo trước cho bệnh nhân.'
    },
    {
      id: 'salbutamol_iv',
      name: 'Salbutamol (Ventolin)',
      category: 'Cơn Hen / COPD nặng',
      dose: 'Khí dung 2.5–5mg mỗi 20 phút; Truyền IV 5–20 mcg/phút',
      dilution: 'Pha khí dung với NaCl 0.9% hoặc pha bơm tiêm điện',
      route: 'Khí dung / IV',
      note: 'Theo dõi hạ Kali máu và nhịp nhanh xoang khi dùng liều cao.'
    },
    {
      id: 'methylprednisolone',
      name: 'Methylprednisolone (Solu-Medrol)',
      category: 'Phản vệ / Hen cấp',
      dose: '40–125mg IV mỗi 6–12h (Phản vệ/Hen cấp); 1g/ngày (Liều xung)',
      dilution: 'Pha với dung môi kèm theo hoặc NaCl 0.9%',
      route: 'IV chậm / Truyền tĩnh mạch',
      note: 'Kiểm soát đường huyết và huyết áp trong đợt điều trị.'
    },
    {
      id: 'cacl2',
      name: 'Calcium Chloride 10%',
      category: 'Tăng Kali máu / LAST',
      dose: '5–10ml (500–1000mg) IV chậm trong 2–5 phút',
      dilution: 'Nguyên chất 10% (10ml chứa 1g Canxi clorua)',
      route: 'IV chậm đường truyền lớn hoặc Tĩnh mạch trung tâm',
      note: 'Bảo vệ màng cơ tim trong Tăng Kali máu nặng. Tránh hoại tử mô nếu thoát mạch.'
    },
    {
      id: 'nahco3',
      name: 'Sodium Bicarbonate 8.4%',
      category: 'Toan chuyển hóa / Ngộ độc',
      dose: '1 mEq/kg (1ml/kg loại 8.4%) IV chậm',
      dilution: 'Dùng trực tiếp 8.4% hoặc pha loãng 4.2%',
      route: 'IV chậm / Truyền tĩnh mạch',
      note: 'Chỉ định trong Toan chuyển hóa nặng (pH < 7.1) hoặc Ngộ độc thuốc chống trầm cảm 3 vòng.'
    },
    {
      id: 'naloxone',
      name: 'Naloxone',
      category: 'Ngộ độc Opioids',
      dose: '0.4–2mg IV/IM/IN, lặp lại mỗi 2–3 phút đến khi phục hồi hô hấp',
      dilution: 'Nguyên chất 0.4mg/ml',
      route: 'IV / IM / Xịt mũi (IN)',
      note: 'Thời gian bán thải ngắn hơn Opioids, cần theo dõi tái suy hô hấp sau 30-60 phút.'
    },
    {
      id: 'flumazenil',
      name: 'Flumazenil',
      category: 'Ngộ độc Benzo',
      dose: '0.2mg IV trong 30 giây, lặp lại 0.1mg mỗi 1 phút (Tối đa 1mg)',
      dilution: 'Nguyên chất 0.5mg/5ml',
      route: 'IV chậm',
      note: 'Thận trọng ở bệnh nhân nghiện Benzo mạn tính hoặc nghi ngộ độc hỗn hợp gây co giật.'
    },
    {
      id: 'mgso4',
      name: 'Magnesium Sulfate 15%',
      category: 'Xoán đỉnh / Sản giật',
      dose: '1–2g IV trong 15 phút (Xoắn đỉnh); 4–6g IV trong 20 phút (Sản giật)',
      dilution: 'Pha loãng trong 100ml G5% hoặc NaCl 0.9%',
      route: 'Truyền tĩnh mạch',
      note: 'Theo dõi phản xạ gân xương bánh chè và nhịp thở để tránh ngộ độc Magie.'
    },
    {
      id: 'ntg',
      name: 'Nitroglycerin (NTG)',
      category: 'Phù phổi cấp / ACS',
      dose: 'Khởi đầu 10–20 mcg/phút IV, tăng 10 mcg/phút mỗi 5 phút',
      dilution: 'Pha 10mg / 50ml NaCl 0.9% hoặc G5%',
      route: 'Truyền Tĩnh mạch qua bơm tiêm điện',
      note: 'Chống chỉ định khi SBP < 90 mmHg, Nhồi máu thất phải hoặc dùng PDE-5i trong 24h.'
    },
    {
      id: 'heparin',
      name: 'Heparin không phân cúi (UFH)',
      category: 'Thuyên tắc / ACS',
      dose: '60–80 UI/kg IV bolus (Tối đa 4000 UI), duy trì 12–18 UI/kg/h',
      dilution: 'Pha 25,000 UI / 250ml NaCl 0.9% (100 UI/ml)',
      route: 'IV bolus + Truyền liên tục',
      note: 'Theo dõi chỉ số aPTT mục tiêu gấp 1.5–2.5 lần chứng (mỗi 6h).'
    },
    {
      id: 'tranexamic',
      name: 'Tranexamic Acid (TXA)',
      category: 'Xuất huyết cấp',
      dose: '1g IV trong 10 phút, sau đó truyền duy trì 1g trong 8h',
      dilution: 'Pha 1g / 100ml NaCl 0.9%',
      route: 'IV / Truyền tĩnh mạch',
      note: 'Nên dùng sớm trong vòng 3 giờ đầu kể từ khi chấn thương/xuất huyết.'
    },
    {
      id: 'nicardipine',
      name: 'Nicardipine',
      category: 'Cơn Tăng huyết áp',
      dose: 'Khởi đầu 5mg/h IV, tăng 2.5mg/h mỗi 15 phút (Tối đa 15mg/h)',
      dilution: 'Pha 10mg / 50ml NaCl 0.9% (Nồng độ 0.2mg/ml)',
      route: 'Truyền Tĩnh mạch liên tục',
      note: 'Thuốc hạ áp tĩnh mạch êm dịu, ưu tiên trong Đột quỵ xuất huyết não và Tăng huyết áp cấp cứu.'
    },
    {
      id: 'esmolol',
      name: 'Esmolol',
      category: 'Tách thành ĐM chủ / AAD',
      dose: '500 mcg/kg IV bolus trong 1 phút, duy trì 50–200 mcg/kg/phút',
      dilution: 'Dùng chai pha sẵn hoặc pha nồng độ 10mg/ml',
      route: 'IV bolus + Truyền liên tục',
      note: 'Chẹn beta tác dụng cực ngắn (T1/2 ~9 phút), dễ kiểm soát nhịp trong Tách thành ĐMC.'
    },
    {
      id: 'propofol',
      name: 'Propofol 1%',
      category: 'An thần ICU / Đặt NKQ',
      dose: '1.5–2.5mg/kg IV (Khởi mê); 0.3–3mg/kg/h (Duy trì an thần ICU)',
      dilution: 'Dùng nguyên chất nhũ dịch 1% (10mg/ml)',
      route: 'IV bolus / Truyền liên tục',
      note: 'Gây tụt huyết áp mạnh. Thay dây truyền mỗi 12h để tránh nhiễm khuẩn.'
    },
    {
      id: 'midazolam',
      name: 'Midazolam',
      category: 'Co giật / An thần',
      dose: '5–10mg IM/IV (Co giật kéo dài); 0.02–0.1mg/kg/h (An thần)',
      dilution: 'Dùng nguyên chất 5mg/ml hoặc pha loãng',
      route: 'IV / IM / Chụm mũi',
      note: 'Thuốc cắt cơn co giật hàng đầu tại cấp cứu. Có sẵn thuốc giải độc Flumazenil.'
    }
  ];

  /**
   * Render Floating Emergency Action Button (FAB)
   */
  function renderEmergencyFab() {
    let container = document.getElementById('pharma-fab-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'pharma-fab-container';
      container.className = 'pharma-fab-container';
      document.body.appendChild(container);
    }

    if (document.getElementById('pharma-fab-emergency-btn')) return;

    const btn = document.createElement('button');
    btn.id = 'pharma-fab-emergency-btn';
    btn.className = 'pharma-fab-btn pharma-fab-emergency';
    btn.setAttribute('title', 'Tra cứu liều 20 Thuốc Cấp cứu Khẩn cấp');
    btn.innerHTML = `
      <i class="fa-solid fa-truck-medical"></i>
      <span>🚨 Liều Cấp Cứu</span>
    `;

    btn.addEventListener('click', openEmergencyModal);
    container.appendChild(btn);
  }

  /**
   * Render Fullscreen Emergency Modal
   */
  function renderEmergencyModal() {
    if (document.getElementById('emergency-modal-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'emergency-modal-overlay';
    overlay.className = 'pharma-modal-overlay';

    overlay.innerHTML = `
      <div class="pharma-modal-card" style="max-width: 960px;">
        <div class="pharma-modal-header" style="background: linear-gradient(135deg, #7f1d1d, #dc2626); color: #fff;">
          <h3 class="pharma-modal-title" style="color: #fff;">
            <i class="fa-solid fa-kit-medical"></i>
            Tra Cứu Nhanh 20 Thuốc Cấp Cứu & Hồi Sức Tích Cực
          </h3>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <button id="em-print-btn" class="em-tag-btn" style="background: rgba(255,255,255,0.2); color: #fff; border: none;">
              <i class="fa-solid fa-print"></i> In Pocket Card
            </button>
            <button class="pharma-modal-close" id="em-modal-close-btn" style="color: #fff;">&times;</button>
          </div>
        </div>

        <div class="pharma-modal-body">
          <div class="em-search-bar">
            <input type="text" id="em-search-input" class="em-search-input" placeholder="🔍 Tìm tên thuốc (Adrenaline, Norad...), nhóm cấp cứu...">
            <div class="em-filter-tags" id="em-filter-tags">
              <button class="em-tag-btn active" data-cat="all">Tất cả (20)</button>
              <button class="em-tag-btn" data-cat="Ngừng tim">Ngừng tim / Sốc</button>
              <button class="em-tag-btn" data-cat="Loạn nhịp">Loạn nhịp</button>
              <button class="em-tag-btn" data-cat="Độc chất">Độc chất / Giải độc</button>
              <button class="em-tag-btn" data-cat="Co giật">Co giật / An thần</button>
            </div>
          </div>

          <div class="em-drug-grid" id="em-drug-grid">
            <!-- Populated dynamically -->
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Event listeners
    document.getElementById('em-modal-close-btn').addEventListener('click', closeEmergencyModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeEmergencyModal();
    });

    document.getElementById('em-search-input').addEventListener('input', filterDrugs);

    document.querySelectorAll('#em-filter-tags .em-tag-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#em-filter-tags .em-tag-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterDrugs();
      });
    });

    document.getElementById('em-print-btn').addEventListener('click', () => {
      window.print();
    });

    populateDrugCards(EMERGENCY_DRUGS);
  }

  function populateDrugCards(list) {
    const grid = document.getElementById('em-drug-grid');
    if (!grid) return;

    if (list.length === 0) {
      grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted); padding: 2rem;">Không tìm thấy thuốc cấp cứu phù hợp.</p>';
      return;
    }

    grid.innerHTML = list.map(d => `
      <div class="em-drug-card">
        <div class="em-card-header">
          <h4 class="em-drug-title">${d.name}</h4>
          <span class="em-drug-category">${d.category}</span>
        </div>
        <div class="em-stat-row">
          <span class="em-stat-label">💉 Liều dùng:</span> ${d.dose}
        </div>
        <div class="em-stat-row">
          <span class="em-stat-label">🧪 Pha loãng:</span> ${d.dilution}
        </div>
        <div class="em-stat-row">
          <span class="em-stat-label">🛣️ Đường dùng:</span> ${d.route}
        </div>
        <div class="em-alert-note">
          <strong>⚠️ Lưu ý:</strong> ${d.note}
        </div>
      </div>
    `).join('');
  }

  function filterDrugs() {
    const query = (document.getElementById('em-search-input').value || '').toLowerCase().trim();
    const activeCatBtn = document.querySelector('#em-filter-tags .em-tag-btn.active');
    const selectedCat = activeCatBtn ? activeCatBtn.getAttribute('data-cat') : 'all';

    const filtered = EMERGENCY_DRUGS.filter(d => {
      const matchQuery = !query || d.name.toLowerCase().includes(query) || d.category.toLowerCase().includes(query) || d.dose.toLowerCase().includes(query);
      const matchCat = selectedCat === 'all' || d.category.toLowerCase().includes(selectedCat.toLowerCase());
      return matchQuery && matchCat;
    });

    populateDrugCards(filtered);
  }

  function openEmergencyModal() {
    renderEmergencyModal();
    document.getElementById('emergency-modal-overlay').classList.add('active');
  }

  function closeEmergencyModal() {
    const overlay = document.getElementById('emergency-modal-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  // Export Global API
  window.EmergencyDosing = {
    openModal: openEmergencyModal,
    drugs: EMERGENCY_DRUGS
  };

  document.addEventListener('DOMContentLoaded', () => {
    renderEmergencyFab();
  });
})();
