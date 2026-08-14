/**
 * guideline-cdss.js
 * Quản lý Mode Trình Bệnh (Case Suggester) & CDSS Dosing Matcher + Export EBM Notes
 * Pure HTML5 / Vanilla CSS3 / ES6+ JavaScript
 */

(function () {
  'use strict';

  let currentAnalysisResults = [];

  function openCaseModal() {
    const modal = document.getElementById('clinical-case-modal');
    if (!modal) return;
    modal.classList.add('active');
    
    const resultsContainer = document.getElementById('case-results-container');
    if (resultsContainer && !resultsContainer.innerHTML.trim()) {
      resultsContainer.innerHTML = '';
    }
  }

  function closeCaseModal() {
    const modal = document.getElementById('clinical-case-modal');
    if (modal) modal.classList.remove('active');
  }

  function handleCaseAnalysis(event) {
    if (event) event.preventDefault();

    const icdVal = document.getElementById('case-icd-input')?.value.trim().toUpperCase() || '';
    const problemVal = document.getElementById('case-problem-input')?.value.trim() || '';

    // Vital signs & organ function inputs
    const egfrVal = parseFloat(document.getElementById('case-egfr')?.value) || null;
    const lvefVal = parseFloat(document.getElementById('case-lvef')?.value) || null;
    const sbpVal = parseFloat(document.getElementById('case-sbp')?.value) || null;
    const hba1cVal = parseFloat(document.getElementById('case-hba1c')?.value) || null;
    const kVal = parseFloat(document.getElementById('case-k')?.value) || null;

    const prefAsia = document.getElementById('case-pref-asia')?.checked || false;
    const prefMoh = document.getElementById('case-pref-moh')?.checked || false;
    const prefPc = document.getElementById('case-pref-pc')?.checked || false;

    const container = document.getElementById('case-results-container');
    if (!container) return;

    if (!icdVal && !problemVal && egfrVal === null && lvefVal === null) {
      container.innerHTML = `
        <div style="background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; padding: 0.8rem; border-radius: 8px; font-size: 0.8rem; text-align: center;">
          ⚠️ Vui lòng nhập Mã ICD-10, Mô tả vấn đề lâm sàng hoặc Thông số sinh hiệu để hệ thống phân tích.
        </div>
      `;
      return;
    }

    const studies = window.studies || [];
    const scoredList = studies.map(study => {
      let score = 0;
      let reasons = [];
      let cdssAlerts = [];
      let dosingGuide = [];

      // 1. ICD-10 Match (+30 pts)
      if (icdVal && study.icd10) {
        const studyIcds = Array.isArray(study.icd10) ? study.icd10 : String(study.icd10).split(',').map(s => s.trim());
        const hasMatch = studyIcds.some(code => code.toUpperCase().startsWith(icdVal) || icdVal.startsWith(code.toUpperCase()));
        if (hasMatch) {
          score += 30;
          reasons.push(`Trùng khớp mã ICD-10: <strong>${icdVal}</strong>`);
        }
      }

      // 2. Keyword matching in title, drug, summary, population (+25 pts max)
      if (problemVal) {
        const keywords = problemVal.toLowerCase().split(/[\s,;]+/).filter(k => k.length > 2);
        let kwMatches = 0;

        const fullContent = (study.title + ' ' + (study.drug || '') + ' ' + (study.summary || '') + ' ' + (study.population || '')).toLowerCase();

        keywords.forEach(kw => {
          if (fullContent.includes(kw)) {
            kwMatches++;
          }
        });

        if (kwMatches > 0) {
          const matchPts = Math.min(kwMatches * 10, 25);
          score += matchPts;
          reasons.push(`Khớp từ khóa lâm sàng (${kwMatches} từ trùng khớp)`);
        }
      }

      // 3. Clinical Impact (+15 pts)
      if (study.impact === 'practice-changing') {
        score += 15;
        reasons.push('Khuyến cáo có tính Đột phá / Thay đổi thực hành (*Practice-Changing*)');
      }

      // 4. Year Recency (+10 pts)
      if (study.year && study.year >= 2024) {
        score += 10;
        reasons.push(`Cập nhật mới nhất năm ${study.year}`);
      }

      // 5. User Preferences (+10 pts)
      if (prefAsia && study.asianData) {
        score += 10;
        reasons.push('Có dữ liệu phân tích trên quần thể Châu Á');
      }

      if (prefMoh && (study.sourceType === 'vn-moh' || study.sourceType === 'national-guideline')) {
        score += 10;
        reasons.push('Được ban hành chính thức bởi Bộ Y Tế Việt Nam');
      }

      if (prefPc && study.impact === 'practice-changing') {
        score += 5;
      }

      // 6. CDSS Vital Signs & Physiological Matching
      const fullText = (study.title + ' ' + (study.summary || '') + ' ' + (study.drug || '')).toLowerCase();

      // eGFR Analysis
      if (egfrVal !== null) {
        if (egfrVal < 30) {
          if (fullText.includes('metformin')) {
            cdssAlerts.push({ type: 'danger', text: '🔴 <strong>CHỐNG CHỈ ĐỊNH METFORMIN:</strong> eGFR < 30 mL/min/1.73m² (Nguy cơ nhiễm toan Lactic).' });
          }
          if (fullText.includes('sglt2') || fullText.includes('empagliflozin') || fullText.includes('dapagliflozin')) {
            cdssAlerts.push({ type: 'warning', text: '🟡 <strong>CÂN NHẮC SGLT2i:</strong> Tiếp tục dùng được nếu đã khởi đầu trước đó để bảo vệ thận, nhưng không khởi đầu mới hạ đường huyết khi eGFR < 20.' });
            dosingGuide.push('Dapagliflozin 10mg / Empagliflozin 10mg 1 lần/ngày (Bảo vệ tim-thận).');
          }
        } else if (egfrVal >= 30 && egfrVal <= 60) {
          if (fullText.includes('sglt2') || fullText.includes('empagliflozin') || fullText.includes('dapagliflozin')) {
            reasons.push(`Chỉ định SGLT2i bảo vệ thận khi eGFR ${egfrVal} mL/min (Lớp I - Khuyến cáo mạnh)`);
            dosingGuide.push('Dapagliflozin 10mg hoặc Empagliflozin 10mg uống sáng.');
          }
        }
      }

      // LVEF Analysis
      if (lvefVal !== null) {
        if (lvefVal <= 40) {
          if (/suy tim|heart failure|hfref/i.test(fullText)) {
            score += 20;
            reasons.push(`Phù hợp tuyệt đối với Suy tim EF giảm (LVEF ${lvefVal}% ≤ 40%)`);
            dosingGuide.push('4 Trụ Cột HFrEF: ARNI/ACEi + Beta-blocker + MRA + SGLT2i.');
          }
        } else if (lvefVal > 40 && lvefVal < 50) {
          if (/suy tim|heart failure|hfmref/i.test(fullText)) {
            score += 15;
            reasons.push(`Khuyến cáo cho Suy tim EF giảm nhẹ (HFmrEF - LVEF ${lvefVal}%)`);
          }
        } else if (lvefVal >= 50) {
          if (/suy tim|hfpef/i.test(fullText)) {
            score += 15;
            reasons.push(`Khuyến cáo cho Suy tim EF bảo tồn (HFpEF - LVEF ${lvefVal}%)`);
            dosingGuide.push('Chỉ định SGLT2i (Empagliflozin / Dapagliflozin) để giảm nguy cơ nhập viện.');
          }
        }
      }

      // SBP Analysis
      if (sbpVal !== null) {
        if (sbpVal < 100) {
          cdssAlerts.push({ type: 'warning', text: '⚠️ <strong>HUYẾT ÁP THẤP (SBP < 100 mmHg):</strong> Khởi đầu ARNI/ACEi/Beta-blocker liều thấp nhất và theo dõi sát huyết áp.' });
        }
      }

      // K+ Analysis
      if (kVal !== null) {
        if (kVal > 5.0) {
          cdssAlerts.push({ type: 'danger', text: '🔴 <strong>TĂNG KALI MÁU (K+ > 5.0 mmol/L):</strong> Tạm hoãn hoặc chỉnh giảm liều MRA (Spironolactone/Eplerenone) & RAASi.' });
        }
      }

      // Calculate percentage score normalized to 100%
      const matchPct = Math.min(Math.round((score / 85) * 100), 99);

      return { study, score, matchPct, reasons, cdssAlerts, dosingGuide };
    });

    const top3 = scoredList.sort((a, b) => b.score - a.score).filter(item => item.score > 0).slice(0, 3);
    currentAnalysisResults = top3;

    if (top3.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="padding: 1.5rem 0;">
          <div class="empty-state-icon">🧩</div>
          <p>Chưa tìm thấy hướng dẫn khớp tuyệt đối với thông tin đã nhập. Hãy thử thay đổi mã ICD hoặc mở rộng mô tả lâm sàng.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="case-results-wrapper" style="margin-top: 1rem;">
        <div style="font-size: 0.85rem; font-weight: 800; color: var(--text); margin-bottom: 0.75rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid var(--accent); padding-bottom: 6px;">
          <span>🎯 TOP ${top3.length} GUIDELINES KHỚP BỆNH ÁN & CDSS DOSING</span>
          <button class="btn btn-small btn-primary" onclick="copyAllEbmClinicalNotes()" style="font-size: 0.75rem;">📋 Copy Tất Cả Căn Cứ Bệnh Án</button>
        </div>

        <div class="case-cards-list">
          ${top3.map((item, idx) => `
            <div class="case-card" style="background: var(--surface); border: 1px solid var(--border-light); border-radius: 12px; padding: 1rem; margin-bottom: 0.85rem; position: relative;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 0.5rem;">
                <div>
                  <span style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 0.92rem; color: var(--text);">${escapeHtml(item.study.title)}</span>
                  <div style="font-size: 0.76rem; color: var(--text-muted); margin-top: 2px;">
                    💊 <strong>Hoạt chất / Can thiệp:</strong> ${escapeHtml(item.study.drug || item.study.intervention || 'Khuyến cáo')}
                    • 🏛️ ${escapeHtml(item.study.organization || 'N/A')} (${item.study.year || ''})
                  </div>
                </div>
                <div class="case-match-badge" style="padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.75rem; font-weight: 800; white-space: nowrap; background: ${getScoreColor(item.matchPct).bg}; color: ${getScoreColor(item.matchPct).text}; border: 1px solid ${getScoreColor(item.matchPct).border};">
                  ${item.matchPct}% Tương thích
                </div>
              </div>

              ${item.cdssAlerts.length > 0 ? `
                <div style="margin: 0.5rem 0;">
                  ${item.cdssAlerts.map(a => `
                    <div style="padding: 0.45rem 0.75rem; border-radius: 6px; font-size: 0.78rem; margin-bottom: 4px; ${a.type === 'danger' ? 'background:#fef2f2; color:#dc2626; border:1px solid #fca5a5;' : 'background:#fffbeb; color:#b45309; border:1px solid #fde68a;'}">
                      ${a.text}
                    </div>
                  `).join('')}
                </div>
              ` : ''}

              ${item.dosingGuide.length > 0 ? `
                <div style="background: var(--surface-2); border-left: 3.5px solid var(--accent); padding: 0.5rem 0.75rem; border-radius: 6px; font-size: 0.78rem; margin: 0.5rem 0; color: var(--text);">
                  <strong>💊 Phác đồ & Liều dùng gợi ý (EBM):</strong>
                  <ul style="margin-left: 1.2rem; margin-top: 3px;">
                    ${item.dosingGuide.map(d => `<li>${d}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}

              <div class="case-reasoning-box" style="background: var(--surface-2); border-radius: 8px; padding: 0.6rem 0.8rem; margin-top: 0.5rem; font-size: 0.78rem;">
                <div style="font-weight: 700; color: var(--text-muted); margin-bottom: 3px;">💡 Lý do đề xuất lâm sàng:</div>
                <ul style="margin-left: 1.2rem; color: var(--text);">
                  ${item.reasons.map(r => `<li>${r}</li>`).join('')}
                </ul>
              </div>

              <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 0.75rem; padding-top: 0.6rem; border-top: 1px solid var(--border-light);">
                ${item.study.file ? `<a href="${item.study.file}" target="_blank" class="btn btn-small btn-primary" style="font-size:0.75rem;">📝 Đọc Tóm Tắt Chi Tiết</a>` : ''}
                <button class="btn btn-small" onclick="window.filterByStudyId && window.filterByStudyId('${item.study.id}'); closeCaseModal();" style="font-size:0.75rem;">📌 Nhảy tới bài này</button>
                <button class="btn btn-small" onclick="window.addToCompare && window.addToCompare('${item.study.id}')" style="font-size:0.75rem;">🔄 Thêm vào So sánh</button>
                <button class="btn btn-small" onclick="copyEbmClinicalNote(${idx})" style="font-size:0.75rem; color:var(--accent);">📋 Copy EBM Note</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function getScoreColor(pct) {
    if (pct >= 85) return { bg: '#ecfdf5', text: '#047857', border: '#a7f3d0' };
    if (pct >= 65) return { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' };
    return { bg: '#fffbe6', text: '#d97706', border: '#fef3c7' };
  }

  function copyEbmClinicalNote(idx) {
    if (!currentAnalysisResults || !currentAnalysisResults[idx]) return;
    const item = currentAnalysisResults[idx];
    const study = item.study;

    let text = `[CĂN CỨ Y HỌC CHỨNG CỨ (EBM) - ${study.title}]\n`;
    text += `• Tổ chức / Năm: ${study.organization || 'N/A'} (${study.year || ''})\n`;
    text += `• Can thiệp / Hoạt chất: ${study.drug || study.intervention || 'Khuyến cáo'}\n`;
    if (study.impact === 'practice-changing') text += `• Mức độ tác động: Practice-Changing (Thay đổi thực hành)\n`;
    
    if (item.dosingGuide && item.dosingGuide.length > 0) {
      text += `• Phác đồ & Liều dùng khuyến cáo:\n  - ${item.dosingGuide.join('\n  - ')}\n`;
    }
    if (study.summary) {
      text += `• Tóm tắt khuyến cáo chính: ${study.summary.replace(/<[^>]*>/g, '')}\n`;
    }

    navigator.clipboard.writeText(text).then(() => {
      alert('📋 Đã sao chép Ghi chú Căn cứ EBM vào bộ nhớ tạm! Bạn có thể dán (Ctrl+V) thẳng vào Hồ sơ bệnh án.');
    }).catch(err => {
      console.error('Clipboard copy failed:', err);
      alert('⚠️ Trích xuất text:\n\n' + text);
    });
  }

  function copyAllEbmClinicalNotes() {
    if (!currentAnalysisResults || currentAnalysisResults.length === 0) return;
    let fullText = `=== TỔNG HỢP CĂN CỨ Y HỌC CHỨNG CỨ (EBM CLINICAL NOTES) ===\n\n`;

    currentAnalysisResults.forEach((item, idx) => {
      const study = item.study;
      fullText += `${idx + 1}. ${study.title} (${study.organization || ''} ${study.year || ''})\n`;
      fullText += `   💊 Hoạt chất: ${study.drug || study.intervention || 'Khuyến cáo'}\n`;
      if (item.dosingGuide && item.dosingGuide.length > 0) {
        fullText += `   📋 Liều dùng EBM: ${item.dosingGuide.join('; ')}\n`;
      }
      fullText += `   💡 Khuyến cáo: ${study.summary ? study.summary.replace(/<[^>]*>/g, '') : 'N/A'}\n\n`;
    });

    navigator.clipboard.writeText(fullText).then(() => {
      alert('📋 Đã sao chép TOP Căn cứ EBM vào Clipboard để dán vào Bệnh án!');
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  window.openCaseModal = openCaseModal;
  window.closeCaseModal = closeCaseModal;
  window.handleCaseAnalysis = handleCaseAnalysis;
  window.copyEbmClinicalNote = copyEbmClinicalNote;
  window.copyAllEbmClinicalNotes = copyAllEbmClinicalNotes;

})();
