/**
 * CliniPortal — DocSpace BHYT Audit Engine
 * Tự động kiểm tra đối soát quy tắc xuất toán BHYT giữa Chẩn đoán (ICD-10) và Chỉ định Cận lâm sàng / Thuốc
 * Tích hợp từ cơ sở dữ liệu Thông tư 35/2016, 50/2017, 30/2018, 06/2026/TT-BYT và Kho ICD-10 Knowledge Vault
 */

export interface BhytAuditRule {
  id: string;
  category: 'CLS' | 'Thuốc' | 'Quy tắc';
  triggerKeywords: string[];
  requiredIcdCodes: string[];
  requiredIcdLabel: string;
  legalSource: string;
  warningMessage: string;
}

export interface BhytAuditAlert {
  rule: BhytAuditRule;
  matchedTrigger: string;
}

export const BHYT_AUDIT_RULES: BhytAuditRule[] = [
  // --- 1. CẬN LÂM SÀNG THƯỜNG QUY & ĐẮT TIỀN (TT 35/2016 & TT 50/2017) ---
  {
    id: 'bhyt-troponin',
    category: 'CLS',
    triggerKeywords: ['troponin', 'trop t', 'trop i', 'hs-troponin', 'hstroponin'],
    requiredIcdCodes: ['I20', 'I21', 'I22', 'I23', 'I24', 'I25'],
    requiredIcdLabel: 'I20, I21-I25 (Hội chứng mạch vành cấp / Nhồi máu cơ tim)',
    legalSource: 'Thông tư 35/2016/TT-BYT',
    warningMessage: 'Xét nghiệm Troponin bắt buộc phải có mã ICD về Hội chứng mạch vành cấp hoặc Cơn đau thắt ngực (I20–I25) để tránh bị cơ quan BHXH xuất toán.'
  },
  {
    id: 'bhyt-ckmb',
    category: 'CLS',
    triggerKeywords: ['ck-mb', 'ckmb', 'ck mb'],
    requiredIcdCodes: ['I20', 'I21', 'I22', 'I23', 'I24', 'I25'],
    requiredIcdLabel: 'I20, I21-I25 (Thiếu máu cơ tim / Nhồi máu cơ tim)',
    legalSource: 'Thông tư 35/2016/TT-BYT',
    warningMessage: 'Xét nghiệm CK-MB cần có mã chẩn đoán nhồi máu cơ tim hoặc bệnh tim thiếu máu cục bộ cấp.'
  },
  {
    id: 'bhyt-ntprobnp',
    category: 'CLS',
    triggerKeywords: ['bnp', 'nt-probnp', 'ntprobnp', 'nt probnp', 'pro-bnp'],
    requiredIcdCodes: ['I50', 'I50.0', 'I50.1', 'I50.9', 'N18'],
    requiredIcdLabel: 'I50 (Suy tim) hoặc N18 (Bệnh thận mạn)',
    legalSource: 'Thông tư 35/2016/TT-BYT',
    warningMessage: 'Định lượng NT-proBNP / BNP chỉ được thanh toán BHYT khi chẩn đoán có mã Suy tim (I50) hoặc Suy thận (N18).'
  },
  {
    id: 'bhyt-hba1c',
    category: 'CLS',
    triggerKeywords: ['hba1c', 'hb a1c', 'a1c'],
    requiredIcdCodes: ['E10', 'E11', 'E12', 'E13', 'E14', 'O24', 'R73.0'],
    requiredIcdLabel: 'E10-E14, O24 (Đái tháo đường)',
    legalSource: 'Thông tư 35/2016/TT-BYT (Tối đa 1 lần/3 tháng)',
    warningMessage: 'Đo HbA1c bắt buộc phải có mã Đái tháo đường (E10–E14, O24) và tần suất tối đa 1 lần trong 3 tháng đối với bệnh nhân ngoại trú.'
  },
  {
    id: 'bhyt-duong-mao-mach',
    category: 'CLS',
    triggerKeywords: ['đường máu mao mạch', 'duong mau mao mach', 'test đường', 'test duong', 'đường mao mạch'],
    requiredIcdCodes: ['E10', 'E11', 'E16', 'R73', 'O24'],
    requiredIcdLabel: 'E10, E11, E16 (Hạ đường huyết) hoặc R73',
    legalSource: 'Quy tắc giám định BHYT',
    warningMessage: 'Xét nghiệm đường máu mao mạch tại giường cần có mã ĐTĐ, hạ đường huyết hoặc rối loạn chuyển hóa glucose.'
  },
  {
    id: 'bhyt-ct-scanner',
    category: 'CLS',
    triggerKeywords: ['ct 64', 'ct 128', 'ct scanner 64', 'ct scanner 128', 'chụp ct mạch'],
    requiredIcdCodes: ['I63', 'I61', 'I71', 'I25.1', 'C34', 'C18'],
    requiredIcdLabel: 'I63 (Đột quỵ), I71 (Phình ĐMC), I25.1 hoặc C34, C18 (Khối u)',
    legalSource: 'Thông tư 35/2016/TT-BYT',
    warningMessage: 'Chụp CT Scanner 64–128 dãy chỉ được thanh toán cho bệnh lý mạch máu phức tạp hoặc tầm soát xâm lấn ung thư.'
  },
  {
    id: 'bhyt-mri',
    category: 'CLS',
    triggerKeywords: ['mri', 'cộng hưởng từ', 'cong huong tu'],
    requiredIcdCodes: ['I63', 'G35', 'M50', 'M51', 'C71', 'M23', 'S06'],
    requiredIcdLabel: 'I63 (Đột quỵ), M50/M51 (Thoát vị đĩa đệm), C71 hoặc Chấn thương',
    legalSource: 'Thông tư 50/2017/TT-BYT',
    warningMessage: 'Chụp MRI cần có mã tổn thương thần kinh, cột sống hoặc khối u được phân loại cụ thể.'
  },

  // --- 2. THUỐC ĐIỀU TRỊ CÓ ĐIỀU KIỆN THANH TOÁN (TT 30/2018 & TT 20/2022) ---
  {
    id: 'bhyt-carbapenem',
    category: 'Thuốc',
    triggerKeywords: ['meropenem', 'imipenem', 'ertapenem', 'doripenem'],
    requiredIcdCodes: ['A41', 'J15', 'K65', 'U82', 'U83', 'U84', 'U85'],
    requiredIcdLabel: 'A41 (Nhiễm khuẩn huyết) hoặc U82-U85 (Vi khuẩn đa kháng MDR)',
    legalSource: 'Thông tư 30/2018/TT-BYT',
    warningMessage: 'Kháng sinh nhóm Carbapenem là thuốc dự trữ, hồ sơ phải có mã Nhiễm trùng nặng/Nhiễm khuẩn huyết (A41) hoặc Vi khuẩn kháng thuốc (U82–U85) kèm biên bản hội chẩn.'
  },
  {
    id: 'bhyt-doac',
    category: 'Thuốc',
    triggerKeywords: ['rivaroxaban', 'apixaban', 'dabigatran', 'edoxaban', 'xarelto', 'eliquis', 'pradaxa'],
    requiredIcdCodes: ['I48', 'I26', 'I80'],
    requiredIcdLabel: 'I48 (Rung nhĩ không do van tim), I26 (PE) hoặc I80 (DVT)',
    legalSource: 'Thông tư 30/2018/TT-BYT & TT 20/2022/TT-BYT',
    warningMessage: 'Thuốc chống đông thế hệ mới (DOAC) chỉ thanh toán BHYT khi chẩn đoán có Rung nhĩ (I48) kèm điểm CHA2DS2-VASc nguy cơ hoặc Thuyên tắc huyết khối (I26, I80).'
  },
  {
    id: 'bhyt-sglt2',
    category: 'Thuốc',
    triggerKeywords: ['dapagliflozin', 'empagliflozin', 'forxiga', 'jardiance'],
    requiredIcdCodes: ['E11', 'I50', 'N18'],
    requiredIcdLabel: 'E11 (ĐTĐ Típ 2), I50 (Suy tim) hoặc N18 (Bệnh thận mạn)',
    legalSource: 'Thông tư 20/2022/TT-BYT',
    warningMessage: 'Thuốc ức chế SGLT2 chỉ thanh toán cho ĐTĐ tuýp 2 (E11), Suy tim (I50) hoặc Bệnh thận mạn (N18). Không thanh toán cho ĐTĐ tuýp 1 (E10).'
  },
  {
    id: 'bhyt-insulin',
    category: 'Thuốc',
    triggerKeywords: ['insulin', 'lantus', 'novorapid', 'humalog', 'mixtard', 'toujeo', 'tresiba'],
    requiredIcdCodes: ['E10', 'E11', 'E12', 'E13', 'E14', 'O24'],
    requiredIcdLabel: 'E10, E11 (ĐTĐ có biến chứng/thất bại thuốc viên), O24 (ĐTĐ thai kỳ)',
    legalSource: 'Thông tư 30/2018/TT-BYT',
    warningMessage: 'Thuốc tiêm Insulin cần có chẩn đoán ĐTĐ Típ 1, Típ 2 hoặc ĐTĐ thai kỳ (O24).'
  }
];

/**
 * Kiểm tra đối soát BHYT cho bệnh án SOAP
 */
export function auditSoapForBhytCompliance(
  diagnosis: string,
  clsOrdersText: string = '',
  prescriptions: Array<{ name: string; dosage?: string }> = []
): BhytAuditAlert[] {
  const alerts: BhytAuditAlert[] = [];
  const normalizedDx = (diagnosis || '').toUpperCase();
  const normalizedCls = (clsOrdersText || '').toLowerCase();
  const allDrugsText = prescriptions.map(p => (p.name || '').toLowerCase()).join(' ');

  BHYT_AUDIT_RULES.forEach(rule => {
    let isTriggered = false;
    let matchedKeyword = '';

    if (rule.category === 'CLS') {
      for (const kw of rule.triggerKeywords) {
        if (normalizedCls.includes(kw)) {
          isTriggered = true;
          matchedKeyword = kw;
          break;
        }
      }
    } else if (rule.category === 'Thuốc') {
      for (const kw of rule.triggerKeywords) {
        if (allDrugsText.includes(kw)) {
          isTriggered = true;
          matchedKeyword = kw;
          break;
        }
      }
    }

    if (!isTriggered) return;

    // Kiểm tra xem trong chẩn đoán đã có bất kỳ mã ICD hợp lệ nào chưa
    const hasValidIcd = rule.requiredIcdCodes.some(code => {
      const regex = new RegExp(`\\b${code}(\\.[0-9]+)?\\b`, 'i');
      return regex.test(normalizedDx);
    });

    if (!hasValidIcd) {
      alerts.push({
        rule,
        matchedTrigger: matchedKeyword
      });
    }
  });

  // Kiểm tra cảnh báo mã R (triệu chứng) làm bệnh chính
  const startsWithR = /^[A-Z0-9\s-:]*?\bR[0-9]{2}(\.[0-9]+)?\b/i.test(normalizedDx);
  if (startsWithR && normalizedDx.length > 5) {
    alerts.push({
      rule: {
        id: 'bhyt-rule-r-code',
        category: 'Quy tắc',
        triggerKeywords: ['mã R'],
        requiredIcdCodes: ['A00-Q99', 'S00-T98'],
        requiredIcdLabel: 'Mã bệnh lý xác định (Chương I - XVII)',
        legalSource: 'Quyết định 1849/QĐ-BYT',
        warningMessage: 'Hồ sơ đang đặt mã Triệu chứng (Chương XVIII: R00–R99) làm chẩn đoán bệnh chính. Cổng giám định BHYT sẽ từ chối thanh toán ngày giường nội trú nếu đã có kết quả thăm dò xác định được bệnh nguyên.'
      },
      matchedTrigger: 'Mã triệu chứng Chương XVIII'
    });
  }

  return alerts;
}

/**
 * Render HTML Banner Cảnh Báo BHYT trong giao diện SOAP
 */
export function renderBhytAuditAlertsHtml(alerts: BhytAuditAlert[]): string {
  if (!alerts || alerts.length === 0) return '';

  return `
    <div class="dsp-bhyt-alert-container" style="background:linear-gradient(135deg, rgba(245,158,11,0.08), rgba(217,119,6,0.03)); border:1.5px solid #f59e0b; border-radius:10px; padding:12px 16px; margin-bottom:1rem; box-shadow:0 3px 10px rgba(245,158,11,0.1);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:6px;">
        <span style="color:#b45309; font-weight:800; font-size:13px; display:flex; align-items:center; gap:6px; text-transform:uppercase; letter-spacing:0.03em;">
          <i class="fa-solid fa-shield-halved" style="font-size:15px; color:#f59e0b;"></i>
          Cảnh báo Giám định BHYT: Phát hiện ${alerts.length} Chỉ định có nguy cơ xuất toán
        </span>
        <a href="../knowledge-vault/tools/icd10/index.html" target="_blank" style="font-size:11.5px; color:#d97706; font-weight:700; text-decoration:none; display:inline-flex; align-items:center; gap:4px; padding:2px 8px; border:1px solid #f59e0b; border-radius:4px; background:rgba(245,158,11,0.08);">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Mở Thẩm Định BHYT Vault →
        </a>
      </div>

      <div style="display:flex; flex-direction:column; gap:8px;">
        ${alerts.map(a => `
          <div style="background:var(--color-surface, #fff); border:1px solid rgba(245,158,11,0.3); border-radius:8px; padding:9px 12px; font-size:12px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:4px;">
              <div>
                <span style="background:rgba(245,158,11,0.15); color:#b45309; font-weight:700; padding:1px 6px; border-radius:4px; font-size:10.5px;">${a.rule.category}</span>
                <strong style="margin-left:6px; color:var(--color-text, #0f172a);">${a.rule.warningMessage}</strong>
              </div>
              <span style="font-size:11px; color:#b45309; font-weight:600; white-space:nowrap; margin-left:8px;">${a.rule.legalSource}</span>
            </div>
            <div style="color:var(--color-text-muted, #64748b); font-size:11.5px; margin-top:3px; display:flex; align-items:center; gap:4px;">
              <i class="fa-solid fa-circle-info" style="color:#0284c7;"></i>
              Yêu cầu bổ sung mã ICD: <code style="background:rgba(2,132,199,0.1); color:#0284c7; font-weight:700; padding:1px 5px; border-radius:3px;">${a.rule.requiredIcdLabel}</code>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
