/**
 * CliniPortal — Drug Interaction Linker & Deep-Linking Engine
 * Kết nối EBM Guidelines & Nghiên cứu với Phân hệ Dược lý
 */

(function (window) {
  'use strict';

  // ════════════════════════════════════════════════════
  // 1. DICTIONARY & INTERACTION DATABASE
  // ════════════════════════════════════════════════════

  const DRUG_ALIASES = {
    metoprolol_succ: {
      canonicalId: 'metoprolol_succ',
      name: 'Metoprolol Succinate ER',
      keywords: ['metoprolol', 'toprol', 'toprol-xl', 'betaloc', 'betaloc zok'],
      group: 'beta_blockers'
    },
    verapamil: {
      canonicalId: 'verapamil',
      name: 'Verapamil Hydrochloride',
      keywords: ['verapamil', 'isoptin', 'calan'],
      group: 'non_dhp_ccb'
    },
    amox_clav: {
      canonicalId: 'amox_clav',
      name: 'Amoxicillin / Clavulanate',
      keywords: ['amox_clav', 'amoxicillin', 'clavulanate', 'augmentin', 'clavulin', 'amoksiklav'],
      group: 'penicillins'
    },
    paracetamol: {
      canonicalId: 'paracetamol',
      name: 'Paracetamol (Acetaminophen)',
      keywords: ['paracetamol', 'acetaminophen', 'panadol', 'efferalgan', 'tylenol', 'hapacol'],
      group: null
    },
    ciprofloxacin: {
      canonicalId: 'ciprofloxacin',
      name: 'Ciprofloxacin',
      keywords: ['ciprofloxacin', 'cipro', 'ciprobay'],
      group: 'quinolones'
    },
    empagliflozin: {
      canonicalId: 'empagliflozin',
      name: 'Empagliflozin',
      keywords: ['empagliflozin', 'jardiance'],
      group: 'sglt2i'
    },
    dapagliflozin: {
      canonicalId: 'dapagliflozin',
      name: 'Dapagliflozin',
      keywords: ['dapagliflozin', 'farxiga', 'forxiga'],
      group: 'sglt2i'
    },
    finerenone: {
      canonicalId: 'finerenone',
      name: 'Finerenone',
      keywords: ['finerenone', 'kerendia'],
      group: 'mra'
    },
    sacubitril_valsartan: {
      canonicalId: 'sacubitril_valsartan',
      name: 'Sacubitril / Valsartan',
      keywords: ['sacubitril', 'valsartan', 'entresto', 'arni'],
      group: 'arni'
    },
    enalapril: {
      canonicalId: 'enalapril',
      name: 'Enalapril / ACEi',
      keywords: ['enalapril', 'perindopril', 'lisinopril', 'acei', 'ức chế men chuyển'],
      group: 'acei'
    },
    vancomycin: {
      canonicalId: 'vancomycin',
      name: 'Vancomycin',
      keywords: ['vancomycin', 'vanco', 'vancocin'],
      group: 'glycopeptides'
    },
    pip_tazo: {
      canonicalId: 'pip_tazo',
      name: 'Piperacillin / Tazobactam',
      keywords: ['piperacillin', 'tazobactam', 'pip/tazo', 'pip-tazo', 'zosyn', 'tazocin'],
      group: 'penicillins'
    }
  };

  const DRUG_INTERACTIONS = [
    {
      id: 'inter_bb_non_dhp_ccb',
      drug1: 'metoprolol_succ',
      drug2: 'verapamil',
      group1: 'beta_blockers',
      group2: 'non_dhp_ccb',
      severity: 'contraindicated',
      severityLabel: 'Chống chỉ định / Nguy hiểm cao',
      summary: 'Tăng đáng kể nguy cơ chậm nhịp tim nặng, block AV độ III và suy tim cấp.',
      mechanism: 'Cả hai thuốc đều có tác dụng ức chế nút xoang (inotropic âm) và nút nhĩ thất (dromotropic âm). Kết hợp Beta-blocker với Non-Dihydropyridine CCB gây cộng hưởng tác dụng ức chế nút nhĩ thất.',
      clinicalManagement: 'Tránh dùng phối hợp đường uống hoặc tiêm tĩnh mạch. Cân nhắc chọn nhóm Dihydropyridine CCB (như Amlodipine) và theo dõi sát mạch, huyết áp.'
    },
    {
      id: 'inter_arni_acei',
      drug1: 'sacubitril_valsartan',
      drug2: 'enalapril',
      group1: 'arni',
      group2: 'acei',
      severity: 'contraindicated',
      severityLabel: 'Chống chỉ định Tuyệt đối',
      summary: 'Nguy cơ phù mạch nghiêm trọng (Angioedema) đe dọa tính mạng.',
      mechanism: 'Ức chế đồng thời Neprilysin và ACE enzyme làm tích lũy Bradykinin mức độ rất cao ở mô phế quản và niêm mạc.',
      clinicalManagement: 'Thời gian chờ (washout period) ít nhất 36 giờ sau liều ACEi cuối cùng trước khi khởi đầu ARNI.'
    },
    {
      id: 'inter_sglt2i_mra',
      drug1: 'empagliflozin',
      drug2: 'finerenone',
      group1: 'sglt2i',
      group2: 'mra',
      severity: 'synergistic',
      severityLabel: 'Phối hợp Hiệp đồng Lợi ích (Bảo vệ Thận - Tim)',
      summary: 'Phối hợp ưu tiên theo KDIGO 2026: SGLT2i giảm nguy cơ tăng Kali máu do MRA gây ra.',
      mechanism: 'SGLT2i làm tăng dòng Natri và nước tới ống lượn xa, kích thích bài tiết Kali, đối kháng nhẹ hiệu ứng giữ Kali của MRA.',
      clinicalManagement: 'Khuyên dùng phối hợp ở bệnh nhân CKD/Suy tim. Cần kiểm tra Kali máu sau 2-4 tuần khởi đầu.'
    },
    {
      id: 'inter_vanco_piptazo',
      drug1: 'vancomycin',
      drug2: 'pip_tazo',
      group1: 'glycopeptides',
      group2: 'penicillins',
      severity: 'major',
      severityLabel: 'Tương tác Nặng / Nguy cơ Tổn thương Thận cấp (AKI)',
      summary: 'Tăng tỷ lệ tổn thương thận cấp AKI gấp 2-3 lần so với phối hợp Vancomycin + Cefepime.',
      mechanism: 'Độc tính hiệp đồng trên tế bào ống thận và gây viêm thận kẽ cấp.',
      clinicalManagement: 'Hạn chế phối hợp kéo dài quá 48-72h. Xem xét chuyển Pip/Tazo sang Cefepime hoặc Meropenem nếu nguy cơ suy thận cao.'
    },
    {
      id: 'inter_cipro_paracetamol',
      drug1: 'ciprofloxacin',
      drug2: 'paracetamol',
      group1: 'quinolones',
      group2: null,
      severity: 'minor',
      severityLabel: 'Tương tác nhẹ / Cần theo dõi',
      summary: 'Ciprofloxacin có thể làm tăng nhẹ nồng độ Paracetamol trong huyết tương.',
      mechanism: 'Ciprofloxacin ức chế nhẹ isoenzym CYP1A2 ở gan, enzym tham gia một phần nhỏ vào chuyển hóa Paracetamol.',
      clinicalManagement: 'Có thể sử dụng đồng thời an toàn ở liều Paracetamol thông thường. Không cần điều chỉnh liều.'
    }
  ];

  // ════════════════════════════════════════════════════
  // 2. PARSER & INTERACTION MATCHING LOGIC
  // ════════════════════════════════════════════════════

  function extractDrugsFromText(text) {
    if (!text || typeof text !== 'string') return [];
    const lower = text.toLowerCase();
    const found = [];

    Object.values(DRUG_ALIASES).forEach(drug => {
      const match = drug.keywords.some(kw => {
        const regex = new RegExp(`\\b${kw.replace('/', '\\/')}\\b`, 'i');
        return regex.test(lower);
      });
      if (match) {
        found.push(drug);
      }
    });

    return found;
  }

  function detectStudyInteractions(study) {
    if (!study) return { detectedDrugs: [], interactions: [] };

    const textToScan = `${study.drug || ''} ${study.intervention || ''} ${study.summary || ''}`;
    const detectedDrugs = extractDrugsFromText(textToScan);
    if (detectedDrugs.length < 1) return { detectedDrugs, interactions: [] };

    const detectedIds = new Set(detectedDrugs.map(d => d.canonicalId));
    const detectedGroups = new Set(detectedDrugs.map(d => d.group).filter(Boolean));

    const matchedInteractions = [];

    DRUG_INTERACTIONS.forEach(inter => {
      // Direct ID match
      const matchById = detectedIds.has(inter.drug1) && detectedIds.has(inter.drug2);
      // Group match
      const matchByGroup = inter.group1 && inter.group2 &&
                           detectedGroups.has(inter.group1) && detectedGroups.has(inter.group2);

      if (matchById || matchByGroup) {
        matchedInteractions.push(inter);
      }
    });

    // Sort by severity priority: contraindicated > major > synergistic > minor
    const priority = { contraindicated: 1, major: 2, synergistic: 3, minor: 4 };
    matchedInteractions.sort((a, b) => (priority[a.severity] || 5) - (priority[b.severity] || 5));

    return { detectedDrugs, interactions: matchedInteractions };
  }

  // ════════════════════════════════════════════════════
  // 3. UI RENDERING & BADGES
  // ════════════════════════════════════════════════════

  function renderDrugInteractionBadge(study) {
    const { detectedDrugs, interactions } = detectStudyInteractions(study);
    if (!interactions || interactions.length === 0) return '';

    const topInter = interactions[0];
    let badgeClass = 'inter-badge-minor';
    let icon = 'ℹ️';

    if (topInter.severity === 'contraindicated') {
      badgeClass = 'inter-badge-danger';
      icon = '⛔';
    } else if (topInter.severity === 'major') {
      badgeClass = 'inter-badge-warning';
      icon = '🟧';
    } else if (topInter.severity === 'synergistic') {
      badgeClass = 'inter-badge-success';
      icon = '🟢';
    }

    return `
      <button class="btn-inter-badge ${badgeClass}" 
              onclick="event.stopPropagation(); window.CliniPortalDrugLinker.openModal('${study.id}')"
              title="Click xem chi tiết tương tác thuốc & liên kết phân hệ Dược lý">
        <span>${icon}</span>
        <span>${escapeHtml(topInter.severityLabel)}</span>
        <span class="inter-count-pill">${interactions.length}</span>
      </button>
    `;
  }

  function renderModalContent(study) {
    const { detectedDrugs, interactions } = detectStudyInteractions(study);

    const drugBadgesHTML = detectedDrugs.length > 0
      ? detectedDrugs.map(d => `<span class="drug-pill">💊 ${escapeHtml(d.name)}</span>`).join('')
      : '<span style="color:var(--text-faint);">Không tự động bóc tách được tên thuốc cụ thể.</span>';

    let interactionsHTML = '';
    if (interactions.length === 0) {
      interactionsHTML = `
        <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); background: var(--surface-2); border-radius: 12px;">
          <div style="font-size: 1.5rem; margin-bottom: 0.3rem;">✅</div>
          <div style="font-weight: 700;">Không ghi nhận tương tác bất lợi nghiêm trọng</div>
          <div style="font-size: 0.76rem; color: var(--text-faint); margin-top: 0.2rem;">Các thuốc trong nghiên cứu này không thuộc cặp tương tác nguy cơ cao trong cơ sở dữ liệu.</div>
        </div>
      `;
    } else {
      interactionsHTML = interactions.map(inter => {
        let cardBorder = 'var(--border-light)';
        let cardBg = 'var(--surface-2)';
        let badgeStyle = 'background:#eff6ff;color:#1e40af;border:1px solid #bfdbfe;';

        if (inter.severity === 'contraindicated') {
          cardBorder = '#fca5a5';
          cardBg = '#fef2f2';
          badgeStyle = 'background:#fee2e2;color:#dc2626;border:1px solid #fca5a5;';
        } else if (inter.severity === 'major') {
          cardBorder = '#fde68a';
          cardBg = '#fffbeb';
          badgeStyle = 'background:#fef3c7;color:#b45309;border:1px solid #fde68a;';
        } else if (inter.severity === 'synergistic') {
          cardBorder = '#a7f3d0';
          cardBg = '#f0fdf4';
          badgeStyle = 'background:#dcfce7;color:#15803d;border:1px solid #a7f3d0;';
        }

        const deepLinkMatrix = `../../pharmacology/tools/ma-tran-tuong-tac.html?drug1=${inter.drug1}&drug2=${inter.drug2}`;
        const deepLinkDrug1 = `../../pharmacology/tools/tra-cuu-thuoc.html?id=${inter.drug1}`;
        const deepLinkDose = `../../pharmacology/tools/dose-optimizer.html?drug=${inter.drug1}`;

        return `
          <div class="inter-detail-card" style="border-left: 4px solid ${cardBorder}; background: ${cardBg}; padding: 1.1rem; border-radius: 12px; margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.6rem;">
              <span style="font-size: 0.72rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 20px; ${badgeStyle}">
                ${escapeHtml(inter.severityLabel)}
              </span>
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <a href="${deepLinkMatrix}" class="btn-deep-link" target="_blank" title="Mở Ma trận tương tác 2 chiều">⚡ Ma trận tương tác</a>
                <a href="${deepLinkDrug1}" class="btn-deep-link" target="_blank" title="Tra cứu Monograph Dược lý">💊 Tra cứu Dược lý</a>
                <a href="${deepLinkDose}" class="btn-deep-link" target="_blank" title="Công cụ Tối ưu hóa liều & TDM">🧮 Tối ưu liều</a>
              </div>
            </div>

            <div style="font-weight: 700; font-size: 0.9rem; color: var(--text); margin-bottom: 0.4rem;">
              ${escapeHtml(inter.summary)}
            </div>

            <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem; line-height: 1.5;">
              <strong>Cơ chế dược lực / dược động:</strong> ${escapeHtml(inter.mechanism)}
            </div>

            <div style="font-size: 0.8rem; color: #0f766e; background: rgba(13,148,136,0.08); padding: 0.6rem 0.8rem; border-radius: 8px; border: 1px solid rgba(13,148,136,0.2);">
              💡 <strong>Quản lý lâm sàng:</strong> ${escapeHtml(inter.clinicalManagement)}
            </div>
          </div>
        `;
      }).join('');
    }

    return `
      <div style="margin-bottom: 1.25rem;">
        <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 0.5rem;">
          💊 Thuốc / Hoạt chất bóc tách từ nghiên cứu:
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          ${drugBadgesHTML}
        </div>
      </div>

      <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 0.6rem;">
        ⚡ Ma trận phân tích tương tác lâm sàng:
      </div>

      ${interactionsHTML}

      <div style="margin-top: 1.25rem; font-size: 0.7rem; color: var(--text-faint); font-style: italic; border-top: 1px dashed var(--border-light); padding-top: 0.6rem; text-align: center;">
        🛡️ Cảnh báo: Thông tin tra cứu tương tác thuốc mang tính chất hỗ trợ quyết định y khoa (Clinical Decision Support), không thay thế đánh giá lâm sàng cá thể hóa của bác sĩ điều trị.
      </div>
    `;
  }

  function openModal(studyId) {
    if (typeof window.studies === 'undefined') return;
    const study = window.studies.find(s => s.id === studyId);
    if (!study) return;

    let modal = document.getElementById('drug-interaction-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'drug-interaction-modal';
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal" style="max-width: 680px; width: 92%;">
          <div class="modal-header">
            <h3 id="dim-title">💊 Phân Tích Tương Tác Thuốc & Liên Kết Dược Lý</h3>
            <button class="modal-close" onclick="document.getElementById('drug-interaction-modal').classList.remove('active')">&times;</button>
          </div>
          <div class="modal-body" id="dim-body" style="padding-top: 0.8rem;">
            <!-- Rendered dynamically -->
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    const titleEl = document.getElementById('dim-title');
    const bodyEl = document.getElementById('dim-body');

    if (titleEl) titleEl.textContent = `💊 Tương Tác Thuốc: ${study.title || study.drug}`;
    if (bodyEl) bodyEl.innerHTML = renderModalContent(study);

    modal.classList.add('active');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Export to window
  window.CliniPortalDrugLinker = {
    detectStudyInteractions,
    renderDrugInteractionBadge,
    openModal
  };

})(window);
