/**
 * Arrhythmia Classification Engine & Pro Studio CDSS Core
 * Chuyên khoa: Tim mạch & Huyết khối (Cardiology) - CliniPortal
 * Phân tích đa trục, tính QTc 4 công thức, suy diễn CDSS thời gian thực từ Sliders,
 * Y lệnh xử trí cấp cứu khẩn cấp và Động cơ Quiz Arena.
 */

const ArrhythmiaEngine = (function() {
  'use strict';

  let dbData = null;
  let flowchartData = null;
  let isInitialized = false;

  let currentQuizIndex = 0;
  let userAnswers = {};

  /**
   * Khởi tạo Engine
   */
  async function init(dbPath = './arrhythmia-classification-db.v2.json', flowchartPath = './roi-loan-nhip-flowchart.json') {
    if (isInitialized && dbData) return true;

    try {
      if (window.ARRHYTHMIA_DB_DATA) {
        dbData = window.ARRHYTHMIA_DB_DATA;
      } else {
        const resDb = await fetch(dbPath);
        if (!resDb.ok) throw new Error(`HTTP Error ${resDb.status} khi tải DB.`);
        dbData = await resDb.json();
      }

      const validationErrors = validateDB(dbData);
      if (validationErrors.length > 0) {
        console.warn('[ArrhythmiaEngine] Cảnh báo kiểm định schema:', validationErrors);
      }

      if (window.ARRHYTHMIA_FLOWCHART_DATA) {
        flowchartData = window.ARRHYTHMIA_FLOWCHART_DATA;
      } else {
        try {
          const resFc = await fetch(flowchartPath);
          if (resFc.ok) flowchartData = await resFc.json();
        } catch (fcErr) {
          flowchartData = { nodes: [], edges: [], redFlagsPanel: [] };
        }
      }

      isInitialized = true;
      return true;
    } catch (error) {
      console.error('[ArrhythmiaEngine] Lỗi khởi tạo Engine:', error);
      renderFatalError(error.message);
      return false;
    }
  }

  function validateDB(data) {
    const errors = [];
    if (!data || typeof data !== 'object') {
      errors.push('Dữ liệu DB không hợp lệ.');
      return errors;
    }
    if (!data.schemaVersion) errors.push('Thiếu schemaVersion.');
    if (!Array.isArray(data.entities) || data.entities.length === 0) {
      errors.push('Danh sách entities trống.');
    }
    return errors;
  }

  function normalizeVietnamese(str) {
    if (!str) return '';
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'd').trim();
  }

  function filterByAxes(criteria = {}) {
    if (!dbData || !Array.isArray(dbData.entities)) return [];
    return dbData.entities.filter(ent => {
      for (const [axis, value] of Object.entries(criteria)) {
        if (!value || value === 'all') continue;
        if (!ent.tags || ent.tags[axis] !== value) return false;
      }
      return true;
    });
  }

  function searchEntities(query = '') {
    if (!dbData || !Array.isArray(dbData.entities)) return [];
    if (!query || !query.trim()) return dbData.entities;

    const qNorm = normalizeVietnamese(query);
    return dbData.entities.filter(ent => {
      const labelNorm = normalizeVietnamese(ent.label);
      const critNorm = normalizeVietnamese(ent.ecgCriteria);
      const aliasNorm = Array.isArray(ent.aliases) ? ent.aliases.map(normalizeVietnamese).join(' ') : '';
      const featNorm = Array.isArray(ent.ecgFeatures) ? ent.ecgFeatures.map(normalizeVietnamese).join(' ') : '';

      return labelNorm.includes(qNorm) || critNorm.includes(qNorm) || aliasNorm.includes(qNorm) || featNorm.includes(qNorm);
    });
  }

  function getEntityById(id) {
    if (!dbData || !Array.isArray(dbData.entities)) return null;
    return dbData.entities.find(e => e.id === id) || null;
  }

  function getAllEntities() {
    return dbData && Array.isArray(dbData.entities) ? dbData.entities : [];
  }

  function getRarityInfo(rarityCode) {
    const map = {
      'common': { label: 'Thường gặp', badgeClass: 'rarity-common' },
      'uncommon': { label: 'Ít gặp', badgeClass: 'rarity-uncommon' },
      'rare': { label: 'Hiếm gặp', badgeClass: 'rarity-rare' },
      'very-rare': { label: 'Rất hiếm', badgeClass: 'rarity-very-rare' }
    };
    return map[rarityCode] || { label: 'Chưa xác định', badgeClass: 'rarity-uncommon' };
  }

  /**
   * Tính QTc theo 4 công thức lâm sàng
   */
  function calculateQTc(qt, rrOrHr, isHr = false, formula = 'bazett') {
    const qtNum = parseFloat(qt);
    if (isNaN(qtNum) || qtNum <= 0) return 0;

    let rrMs = 0;
    let hr = 0;

    if (isHr) {
      hr = parseFloat(rrOrHr);
      if (isNaN(hr) || hr <= 0) return 0;
      rrMs = 60000 / hr;
    } else {
      rrMs = parseFloat(rrOrHr);
      if (isNaN(rrMs) || rrMs <= 0) return 0;
      hr = 60000 / rrMs;
    }

    const rrSec = rrMs / 1000;
    let qtc = 0;

    switch (formula.toLowerCase()) {
      case 'bazett':
        qtc = qtNum / Math.sqrt(rrSec);
        break;
      case 'fridericia':
        qtc = qtNum / Math.cbrt(rrSec);
        break;
      case 'framingham':
        qtc = qtNum + 0.154 * (1000 - rrMs);
        break;
      case 'hodges':
        qtc = qtNum + 1.75 * (hr - 60);
        break;
      default:
        qtc = qtNum / Math.sqrt(rrSec);
    }

    return Math.round(qtc * 10) / 10;
  }

  /**
   * Phân tầng nguy cơ QTc theo giới tính
   */
  function evaluateQTcRisk(qtc, gender = 'male') {
    if (!qtc || qtc <= 0) {
      return {
        category: 'unknown',
        label: 'Chưa nhập đủ chỉ số',
        colorClass: 'risk-unknown',
        recommendation: 'Vui lòng nhập khoảng QT và RR/HR để định lượng rủi ro loạn nhịp.'
      };
    }

    const isMale = (gender === 'male');
    const normalLimit = isMale ? 450 : 460;
    const borderLimit = isMale ? 470 : 480;

    if (qtc >= 500) {
      return {
        category: 'high_risk',
        label: 'NGUY CƠ CAO XOẮN ĐỈNH (Torsades risk)',
        colorClass: 'risk-danger',
        recommendation: 'CẢNH BÁO KHẨN CẤP: Nguy cơ xuất hiện nhịp nhanh thất đa hình xoắn đỉnh (Torsades de Pointes) cực cao! Tiêm tĩnh mạch Magie sulfat 2g IV, bù K+ >= 4.0 mmol/L, ngưng thuốc kéo dài QT.'
      };
    } else if (qtc > borderLimit) {
      return {
        category: 'prolonged',
        label: 'QTc kéo dài (Prolonged)',
        colorClass: 'risk-warning',
        recommendation: 'QTc vượt ngưỡng an toàn lâm sàng. Rà soát danh sách thuốc đang dùng (kháng sinh Macrolide/Fluoroquinolone, chống loạn nhịp, hướng thần).'
      };
    } else if (qtc >= normalLimit) {
      return {
        category: 'borderline',
        label: 'QTc ở ngưỡng giới hạn (Borderline)',
        colorClass: 'risk-info',
        recommendation: 'Khoảng QTc ở mức ranh giới. Theo dõi điện giải và đánh giá nguy cơ tim mạch tổng thể.'
      };
    } else if (qtc < 340) {
      return {
        category: 'short_qt',
        label: 'QTc rất ngắn (Short QT risk)',
        colorClass: 'risk-warning',
        recommendation: 'Cảnh báo Hội chứng QT ngắn (SQTS). Nguy cơ xuất hiện rung nhĩ hoặc rung thất ở người trẻ.'
      };
    } else {
      return {
        category: 'normal',
        label: 'QTc trong giới hạn bình thường',
        colorClass: 'risk-success',
        recommendation: 'Khoảng QTc bình thường theo giới tính, nguy cơ loạn nhịp thất do tái cực thấp.'
      };
    }
  }

  /**
   * Động cơ suy diễn CDSS thời gian thực từ các tham số Sliders
   * @param {Object} p - Tham số active { hr, qrsWidth, pWave, prInterval, regularity, qtInterval, stSegment, deltaWave, epsilonWave, brugadaStep1, brugadaStep2, brugadaStep3 }
   * @returns {Object} { primaryDiagnosis, matchedEntities, confidence, emergencyProtocol }
   */
  function evaluateActiveParams(p) {
    if (!dbData || !Array.isArray(dbData.entities)) return null;

    const hr = p.hr || 75;
    const qrs = p.qrsWidth || 90;
    const isWide = qrs >= 120;
    const isBrady = hr < 60;
    const isTachy = hr > 100;
    const isRegular = p.regularity === 'regular';

    let matchedId = 'sinus-bradycardia';
    let confidence = 85;

    // 1. Nhịp chậm (< 60 l/p)
    if (isBrady) {
      if (p.pWave === 'normal') {
        if (p.prInterval > 200) matchedId = 'avb1';
        else matchedId = 'sinus-bradycardia';
      } else if (p.pWave === 'absent') {
        if (p.brugadaStep3) matchedId = 'avb3-complete';
        else matchedId = 'sinus-bradycardia';
      }
    }
    // 2. Nhịp nhanh QRS rộng (≥ 120ms)
    else if (isTachy && isWide) {
      if (p.brugadaStep1 || p.brugadaStep2 || p.brugadaStep3) {
        matchedId = 'vt-scar-related';
        confidence = 95;
      } else if (p.pWave === 'chaotic' && p.deltaWave) {
        matchedId = 'af-wpw';
        confidence = 98;
      } else if (!isRegular && p.qtInterval >= 500) {
        matchedId = 'torsades';
        confidence = 92;
      } else {
        matchedId = 'vt-rvot';
        confidence = 78;
      }
    }
    // 3. Nhịp nhanh QRS hẹp (< 120ms)
    else if (isTachy && !isWide) {
      if (isRegular) {
        if (p.pWave === 'retrograde' || p.pWave === 'absent') matchedId = 'avnrt';
        else if (p.deltaWave) matchedId = 'avrt-wpw';
        else matchedId = 'sinus-bradycardia';
      } else {
        if (p.pWave === 'chaotic' || p.pWave === 'absent') matchedId = 'atrial-fibrillation';
        else if (p.pWave === 'sawtooth') matchedId = 'atrial-fibrillation';
        else matchedId = 'mat';
      }
    }
    // 4. Các hội chứng Kênh ion / Red flags
    else {
      if (p.stSegment === 'brugada-coved') {
        matchedId = 'brugada-syndrome';
        confidence = 96;
      } else if (p.epsilonWave) {
        matchedId = 'arvc';
        confidence = 90;
      } else if (p.deltaWave) {
        matchedId = 'avrt-wpw';
        confidence = 90;
      }
    }

    const primaryEnt = getEntityById(matchedId) || dbData.entities[0];
    const protocol = generateEmergencyProtocol(matchedId);

    return {
      primaryDiagnosis: primaryEnt,
      confidence: confidence,
      emergencyProtocol: protocol
    };
  }

  /**
   * Tạo Y lệnh Xử trí Cấp cứu Khẩn cấp (ACL Protocol & Drug Dosing)
   * @param {string} diagId 
   */
  function generateEmergencyProtocol(diagId) {
    const protocols = {
      'vt-scar-related': {
        urgency: 'CRITICAL',
        title: 'XỬ TRÍ CẤP CỨU NHỊP NHANH THẤT (VT)',
        steps: [
          '1. Đánh giá Huyết động: Tụt HA, lơ mơ, đau ngực cấp hay phù phổi cấp?',
          '2. NẾU CÓ RỐI LOẠN HUYẾT ĐỘNG: Sốc điện chuyển nhịp đồng bộ DC (100 - 200J).',
          '3. NẾU HUYẾT ĐỘNG ỔN ĐỊNH: Truyền Amiodarone 150mg IV trong 10 phút, tiếp theo truyền duy trì 1mg/phút trong 6h.'
        ],
        drugs: 'Amiodarone 150mg/3ml (1 ống) pha 100ml Dextrose 5% IV drip 10 phút.'
      },
      'avnrt': {
        urgency: 'HIGH',
        title: 'XỬ TRÍ CẮT CƠN NHỊP NHANH VÒNG VÀO LẠI NÚT AV (AVNRT)',
        steps: [
          '1. Thực hiện Nghiệm pháp Cường phế vị (Xoa xoang động mạch cảnh / Nghiệm pháp Valsalva cải tiến).',
          '2. NẾU THẤT BẠI: Tiêm nhanh Adenosine 6mg IV push (bơm cực nhanh trong 1-2 giây + xả 20ml NaCl 0.9%).',
          '3. NẾU CHƯA CẮT CƠN sau 2 phút: Tiêm lặp lại Adenosine 12mg IV push.'
        ],
        drugs: 'Adenosine 6mg/2ml IV push nhanh + 20ml NaCl 0.9% flush.'
      },
      'af-wpw': {
        urgency: 'CRITICAL_CONTRAINDICATION',
        title: 'XỬ TRÍ RUNG NHĨ TRÊN BỆNH NHÂN WPW (AF in WPW)',
        steps: [
          '1. CẢNH BÁO: CHỐNG CHỈ ĐỊNH Digoxin, Verapamil, Diltiazem, Beta-blockers!',
          '2. Sốc điện chuyển nhịp đồng bộ DC khẩn cấp nếu tụt huyết động.',
          '3. Truyền Procainamide hoặc Ibutilide tĩnh mạch nếu huyết động ổn định.'
        ],
        drugs: 'Procainamide 20-50mg/phút IV cho đến khi cắt cơn hoặc max 17mg/kg.'
      },
      'torsades': {
        urgency: 'CRITICAL',
        title: 'XỬ TRÍ CẤP CỨU XOẮN ĐỈNH (TORSADES DE POINTES)',
        steps: [
          '1. Tiêm tĩnh mạch Magie Sulfat (MgSO4) 2g IV trong 1-2 phút (dù Mg2+ máu bình thường).',
          '2. Bù Kali tĩnh mạch nâng K+ máu >= 4.0 mmol/L.',
          '3. Ngưng ngay tất cả các thuốc gây kéo dài khoảng QT.'
        ],
        drugs: 'Magie Sulfat 15% (2g/10ml) tiêm IV chậm trong 2 phút.'
      },
      'avb3-complete': {
        urgency: 'HIGH',
        title: 'XỬ TRÍ BLOCK NHĨ THẤT ĐỘ 3 (HOÀN TOÀN)',
        steps: [
          '1. Chuẩn bị Máy tạo nhịp ngoài (Transcutaneous Pacing) khẩn cấp.',
          '2. Tiêm tĩnh mạch Atropine 0.8-1mg IV (tối đa 3mg) hoặc truyền Adrenaline / Isoproterenol.',
          '3. Chỉ định đặt Máy tạo nhịp tạm thời đường tĩnh mạch (Transvenous Pacing).'
        ],
        drugs: 'Atropine 1mg IV push hoặc Adrenaline 2-10 mcg/phút IV drip.'
      },
      'brugada-syndrome': {
        urgency: 'WARNING',
        title: 'QUẢN LÝ HỘI CHỨNG BRUGADA',
        steps: [
          '1. Hạ sốt tích cực ngay nếu bệnh nhân có sốt.',
          '2. Tránh tuyệt đối các thuốc chẹn kênh Natri (Flecainide, Propafenone).',
          '3. Hội chuyển Chuyên khoa Nhịp tim học xét chỉ định cấy máy ICD phá rung.'
        ],
        drugs: 'Hạ sốt Paracetamol 1g IV / Uống khi T > 38.5°C.'
      }
    };

    return protocols[diagId] || {
      urgency: 'NORMAL',
      title: 'THEO DÕI & ĐÁNH GIÁ LÂM SÀNG',
      steps: [
        '1. Đánh giá triệu chứng cơ năng (Đau ngực, khó thở, ngất).',
        '2. Theo dõi liên tục Monitor điện tim 12 chuyển đạo.',
        '3. Làm các xét nghiệm sinh hóa: Điện giải đồ (Na, K, Ca, Mg), Men tim (Troponin I/T).'
      ],
      drugs: 'Theo dõi chỉ định bác sĩ chuyên khoa Tim mạch.'
    };
  }

  function renderMatrixCards(containerId, entities) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!entities || entities.length === 0) {
      container.innerHTML = `
        <div class="empty-results-box">
          <i class="fa-solid fa-notes-medical"></i>
          <h4>Không tìm thấy chẩn đoán phù hợp</h4>
          <p>Vui lòng điều chỉnh lại từ khóa hoặc các trục bộ lọc.</p>
        </div>
      `;
      return;
    }

    const cardsHtml = entities.map(ent => {
      const rarity = getRarityInfo(ent.rarity);
      const tagsList = Object.entries(ent.tags || {}).map(([k, v]) => `<span class="ent-tag">${v}</span>`).join('');

      return `
        <div class="arrhythmia-card" data-id="${ent.id}">
          <div class="card-top">
            <span class="rarity-badge ${rarity.badgeClass}">${rarity.label}</span>
            ${ent.redFlags && ent.redFlags.length > 0 ? '<span class="flag-alert-icon"><i class="fa-solid fa-triangle-exclamation"></i> Cờ đỏ</span>' : ''}
          </div>
          <h3 class="ent-title">${ent.label}</h3>
          <p class="ent-criteria"><strong>Tiêu chuẩn ECG:</strong> ${ent.ecgCriteria}</p>
          <div class="ent-tags-row">${tagsList}</div>
          <div class="card-actions">
            <button class="btn-detail-view" onclick="ArrhythmiaEngine.showEntityModal('${ent.id}')">
              <i class="fa-solid fa-stethoscope"></i> Chi tiết lâm sàng &amp; Red Flags
            </button>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = cardsHtml;
  }

  function showEntityModal(entityId) {
    const entity = getEntityById(entityId);
    if (!entity) return;

    let modalEl = document.getElementById('arrhythmia-detail-modal');
    if (!modalEl) {
      modalEl = document.createElement('div');
      modalEl.id = 'arrhythmia-detail-modal';
      modalEl.className = 'arrhythmia-modal-backdrop';
      document.body.appendChild(modalEl);
    }

    const rarity = getRarityInfo(entity.rarity);
    const aliasesHtml = entity.aliases && entity.aliases.length > 0 
      ? entity.aliases.map(a => `<span class="alias-pill">${a}</span>`).join(' ') 
      : '<em>Không có tên gọi khác</em>';

    const featuresHtml = entity.ecgFeatures && entity.ecgFeatures.length > 0
      ? entity.ecgFeatures.map(f => `<li><i class="fa-solid fa-check-circle text-success"></i> ${f}</li>`).join('')
      : '<li>Chưa cập nhật</li>';

    const redFlagsHtml = entity.redFlags && entity.redFlags.length > 0
      ? entity.redFlags.map(rf => `<div class="rf-alert-item"><i class="fa-solid fa-triangle-exclamation"></i> <span>${rf}</span></div>`).join('')
      : '<p class="text-muted">Không có dấu hiệu cảnh báo cờ đỏ đặc thù.</p>';

    const protocol = generateEmergencyProtocol(entity.id);

    modalEl.innerHTML = `
      <div class="arrhythmia-modal-box">
        <div class="modal-header">
          <div>
            <span class="rarity-badge ${rarity.badgeClass}">${rarity.label}</span>
            <h2 class="modal-title">${entity.label}</h2>
          </div>
          <button class="modal-close-btn" onclick="ArrhythmiaEngine.closeModal()"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="modal-body">
          <div class="modal-section">
            <h4 class="modal-subheading"><i class="fa-solid fa-tags"></i> Tên gọi khác</h4>
            <div class="alias-list">${aliasesHtml}</div>
          </div>
          
          <div class="modal-section highlight-crit">
            <h4 class="modal-subheading"><i class="fa-solid fa-heart-pulse"></i> Tiêu chuẩn chẩn đoán ECG cốt lõi</h4>
            <p class="crit-text">${entity.ecgCriteria}</p>
          </div>

          <div class="modal-section">
            <h4 class="modal-subheading"><i class="fa-solid fa-list-check"></i> Đặc điểm nhận diện</h4>
            <ul class="ecg-features-list">${featuresHtml}</ul>
          </div>

          <div class="modal-section rf-section">
            <h4 class="modal-subheading text-danger"><i class="fa-solid fa-triangle-exclamation"></i> Cảnh báo &amp; Red Flags</h4>
            <div class="rf-list">${redFlagsHtml}</div>
          </div>

          <div class="modal-section emergency-protocol-box">
            <h4 class="modal-subheading text-primary"><i class="fa-solid fa-kit-medical"></i> Y Lệnh Xử Trí Cấp Cứu</h4>
            <div class="protocol-content">
              <strong>${protocol.title}</strong>
              <ul>${protocol.steps.map(s => `<li>${s}</li>`).join('')}</ul>
              <div class="drug-dose-tag"><i class="fa-solid fa-pills"></i> <strong>Thuốc/Liều:</strong> ${protocol.drugs}</div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-close-footer" onclick="ArrhythmiaEngine.closeModal()">Đóng</button>
        </div>
      </div>
    `;

    modalEl.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modalEl = document.getElementById('arrhythmia-detail-modal');
    if (modalEl) {
      modalEl.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  function renderFatalError(msg) {
    const mainBox = document.getElementById('arrhythmia-studio-app') || document.body;
    const alertBox = document.createElement('div');
    alertBox.className = 'alert-fatal-error';
    alertBox.innerHTML = `
      <i class="fa-solid fa-circle-exclamation"></i>
      <div><strong>LỖI KHỞI TẠO STUDIO:</strong> ${msg}</div>
    `;
    mainBox.prepend(alertBox);
  }

  return {
    init,
    validateDB,
    filterByAxes,
    searchEntities,
    getEntityById,
    getAllEntities,
    getRarityInfo,
    calculateQTc,
    evaluateQTcRisk,
    evaluateActiveParams,
    generateEmergencyProtocol,
    renderMatrixCards,
    showEntityModal,
    closeModal
  };
})();

window.ArrhythmiaEngine = ArrhythmiaEngine;
