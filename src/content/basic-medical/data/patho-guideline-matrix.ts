/**
 * CliniPortal — Pathophysiology & EBM Guidelines Matrix (Translational Medicine Bridge)
 * Path: src/content/basic-medical/data/patho-guideline-matrix.ts
 * 
 * Ánh xạ đối chiếu giữa các chủ đề Cơ Chế Bệnh Sinh & Sinh Lý Bệnh (Basic Medical Sciences)
 * và Kho Hướng Dẫn Điều Trị Lâm Sàng EBM & Thử Nghiệm Bản Lề (src/content/ebm/guidelines/)
 */

export interface PathoGuidelineLink {
  pathoSlug: string;
  pathoTitle: string;
  specialty: string;
  molecularMechanismSummary: string;
  ebmGuidelineId: string;
  guidelineTitle: string;
  organization: string;
  year: number;
  corLoe: string;
  landmarkTrials: string[];
  keyClinicalImplication: string;
}

export const PATHO_GUIDELINE_MATRIX: PathoGuidelineLink[] = [
  // 1. Tim mạch - Suy tim
  {
    pathoSlug: 'slb-ccbs-st',
    pathoTitle: 'Suy Tim Phân Suất Tống Máu Giảm (HFrEF)',
    specialty: 'Tim mạch',
    molecularMechanismSummary: 'Kích hoạt quá mức RAAS/SNS kéo dài, tích tụ Angiotensin II & Aldosterone gây xơ hóa mô kẽ cơ tim, chết theo chương trình tế bào cơ tim và tái cấu trúc buồng thất.',
    ebmGuidelineId: '2023-esc-heart-failure',
    guidelineTitle: 'ESC 2023/2024 Guidelines: Chẩn đoán & Điều trị Suy tim',
    organization: 'Hội Tim mạch Châu Âu (ESC)',
    year: 2024,
    corLoe: 'Class I · LOE A',
    landmarkTrials: ['PARADIGM-HF (ARNI)', 'DAPA-HF (SGLT2i)', 'EMPEROR-Reduced', 'CIBIS-II (Beta-blocker)', 'RALES (Spironolactone)'],
    keyClinicalImplication: 'Khởi trị sớm 4 Trụ Cột GDMT (ARNI + Beta-blocker + MRA + SGLT2i) để chặn đứng dòng thác tái cấu trúc cơ tim và giảm 60% nguy cơ tử vong gộp.'
  },

  // 2. Tim mạch - Rung nhĩ
  {
    pathoSlug: 'slb-ccbs-rung-nhi',
    pathoTitle: 'Rung Nhĩ (Atrial Fibrillation)',
    specialty: 'Tim mạch',
    molecularMechanismSummary: 'Rò rỉ Ca2+ qua thụ thể RyR2 tại lưới nội chất cơ tim, tái cấu trúc điện học và xơ hóa cơ nhĩ làm giảm tính đồng nhất dẫn truyền, tạo vòng vào lại đa ổ.',
    ebmGuidelineId: '2024-esc-af',
    guidelineTitle: 'ESC 2024 Guidelines: Chẩn đoán & Quản lý Rung nhĩ',
    organization: 'ESC',
    year: 2024,
    corLoe: 'Class I · LOE A',
    landmarkTrials: ['ARISTOTLE (Apixaban)', 'RE-LY (Dabigatran)', 'ROCKET-AF (Rivaroxaban)', 'ENGAGE AF-TIMI 48 (Edoxaban)'],
    keyClinicalImplication: 'Áp dụng đường dẫn AF-CARE: Kháng đông DOACs ưu tiên hàng đầu để ngừa đột quỵ tắc mạch, kiểm soát nhịp và triệt đốt catheter sớm.'
  },

  // 3. Tim mạch - Tăng huyết áp
  {
    pathoSlug: 'slb-ccbs-tha',
    pathoTitle: 'Tăng Huyết Áp Nguyên Phát',
    specialty: 'Tim mạch',
    molecularMechanismSummary: 'Tăng trương lực giao cảm, rối loạn chức năng nội mô mạch máu (giảm NO, tăng Endothelin-1) và tăng tái hấp thu muối natri ở quai Henle / ống lượn xa.',
    ebmGuidelineId: '2025-aha-acc-hypertension',
    guidelineTitle: 'AHA/ACC 2025: Hướng dẫn Quản lý Tăng huyết áp Toàn diện',
    organization: 'AHA / ACC',
    year: 2025,
    corLoe: 'Class I · LOE A',
    landmarkTrials: ['SPRINT Trial', 'STEP Trial', 'HYVET'],
    keyClinicalImplication: 'Mục tiêu huyết áp tâm thu nghiêm ngặt < 130/80 mmHg (hoặc 120-129 mmHg nếu dung nạp) bằng phối hợp đôi cố định (Single-pill combination).'
  },

  // 4. Hô hấp - COPD
  {
    pathoSlug: 'slb-ccbs-copd',
    pathoTitle: 'Bệnh Phổi Tắc Nghẽn Mạn Tính (COPD)',
    specialty: 'Hô hấp',
    molecularMechanismSummary: 'Khói thuốc kích hoạt đại thực bào phế nang và bạch cầu trung tính tiết Elastase, MMP-9 gây phá hủy vách phế nang (khí phế thũng) và viêm phế quản mạn xơ hóa hẹp đường thở.',
    ebmGuidelineId: '2025-gold-copd',
    guidelineTitle: 'GOLD 2025/2026: Chiến lược Toàn cầu Chẩn đoán & Phòng ngừa COPD',
    organization: 'GOLD',
    year: 2026,
    corLoe: 'Class I · LOE A',
    landmarkTrials: ['IMPACT Trial', 'ETHOS Trial', 'FLAME Trial'],
    keyClinicalImplication: 'Khởi trị phác đồ giãn phế quản kép LABA + LAMA cho nhóm E; chỉ bổ sung ICS khi bạch cầu ái toan máu ≥ 300 tế bào/µL.'
  },

  // 5. Hô hấp - Hen phế quản
  {
    pathoSlug: 'slb-ccbs-hen',
    pathoTitle: 'Hen Phế Quản (Asthma)',
    specialty: 'Hô hấp',
    molecularMechanismSummary: 'Viêm đường thở dị ứng Type 2 do Th2/ILC2 tiết IL-4, IL-5, IL-13 kích hoạt tế bào Mast tiết Histamin, Leukotrienes gây co thắt cơ trơn phế quản và tăng tiết nhầy.',
    ebmGuidelineId: '2024-gina-asthma',
    guidelineTitle: 'GINA 2024/2026: Chiến lược Quản lý & Điều trị Hen Toàn diện',
    organization: 'GINA',
    year: 2024,
    corLoe: 'Class I · LOE A',
    landmarkTrials: ['SYGMA 1 & 2', 'PRACTICAL Trial', 'CAPTAIN Trial'],
    keyClinicalImplication: 'Khuyến cáo Track 1: ICS-Formoterol là thuốc cắt cơn và duy trì ưu tiên hàng đầu ở mọi bậc điều trị để ngăn ngừa tử vong do cơn hen kịch phát.'
  },

  // 6. Thận học - Tổn thương thận cấp (AKI)
  {
    pathoSlug: 'slb-ccbs-aki',
    pathoTitle: 'Tổn Thương Thận Cấp (AKI)',
    specialty: 'Thận học',
    molecularMechanismSummary: 'Thiếu máu cục bộ vùng tủy thận, độc chất gây hoại tử tế bào biểu mô ống lượn gần (ATN), rụng tế bào vào lòng ống tạo trụ niệu làm tăng áp lực ngược dòng.',
    ebmGuidelineId: '2024-kdigo-ckd',
    guidelineTitle: 'KDIGO 2024: Hướng dẫn Lâm sàng Bệnh Thận',
    organization: 'KDIGO',
    year: 2024,
    corLoe: 'Class I · LOE B',
    landmarkTrials: ['SMART Trial', 'BICAR-ICU Trial', 'STARRT-AKI'],
    keyClinicalImplication: 'Tránh dịch truyền nhiều Clo (ưu tiên Ringer Lactat), ngừng ngay thuốc độc thận (NSAIDs, Aminoglycoside), chỉ định lọc máu liên tục CRRT khi có chỉ định cấp.'
  },

  // 7. Nội tiết - ĐTĐ Típ 2 & Bệnh Thận Mạn (DKD)
  {
    pathoSlug: 'slb-ccbs-dtd-than-man',
    pathoTitle: 'Bệnh Thận Đái Tháo Đường (DKD / CKD in T2D)',
    specialty: 'Nội tiết / Thận',
    molecularMechanismSummary: 'Tăng áp lực nội cầu thận do giãn tiểu ĐM đến và co tiểu ĐM đi, gắn kết sản phẩm glycat hóa bền vững (AGEs) gây xơ hóa màng đáy cầu thận và mất tế bào có chân (podocyte).',
    ebmGuidelineId: '2024-ada-standards-care',
    guidelineTitle: 'ADA 2024-2026 Standards of Medical Care in Diabetes',
    organization: 'ADA / KDIGO',
    year: 2026,
    corLoe: 'Class I · LOE A',
    landmarkTrials: ['DAPA-CKD (Dapagliflozin)', 'EMPA-KIDNEY (Empagliflozin)', 'FIDELIO-DKD (Finerenone)', 'FLOW (Semaglutide)'],
    keyClinicalImplication: 'Phối hợp sớm SGLT2i + ACEi/ARB liều tối đa dung nạp + Finerenone để giảm 30-40% nguy cơ suy thận giai đoạn cuối (ESKD) và tử vong tim mạch.'
  },

  // 8. Hồi sức tích cực - Sepsis & Sốc Nhiễm Khuẩn
  {
    pathoSlug: 'slb-ccbs-sepsis',
    pathoTitle: 'Nhiễm Khuẩn Huyết & Sốc Nhiễm Khuẩn (Sepsis)',
    specialty: 'Hồi sức ICU',
    molecularMechanismSummary: 'Endotoxin vi khuẩn gắn thụ thể TLR4 kích hoạt bão Cytokine (TNF-alpha, IL-1, IL-6), giãn mạch toàn thể qua Nitric Oxide (iNOS), tổn thương glycocalyx nội mô gây thoát huyết tương nặng.',
    ebmGuidelineId: '2021-ssc-sepsis',
    guidelineTitle: 'Surviving Sepsis Campaign (SSC 2021/2025): Hướng dẫn Xử trí Sepsis & Sốc NK',
    organization: 'SCCM / ESICM',
    year: 2025,
    corLoe: 'Class I · LOE A',
    landmarkTrials: ['ANDROMEDA-SHOCK (CRT)', 'PROMISE Trial', 'ADRENAL (Hydrocortisone)'],
    keyClinicalImplication: 'Gói can thiệp 1 giờ (1-Hour Bundle): Cấy máu trước khi dùng kháng sinh phổ rộng, bù dịch 30 mL/kg tinh thể đẳng trương, đo Lactate và dùng Noradrenaline sớm nếu MAP < 65 mmHg.'
  },

  // 9. Thần kinh - Đột quỵ Nhồi máu não cấp
  {
    pathoSlug: 'slb-ccbs-dot-quy',
    pathoTitle: 'Đột Quỵ Nhồi Máu Não Cấp (Ischemic Stroke)',
    specialty: 'Thần kinh',
    molecularMechanismSummary: 'Tắc mạch não gây cạn kiệt ATP, ngộ độc canxi nội bào qua thụ thể NMDA (Glutamate excitotoxicity), phù tế bào và hoại tử mô não vùng Ischemic Core lan dần sang vùng Penumbra.',
    ebmGuidelineId: '2024-eso-stroke',
    guidelineTitle: 'ESO / AHA 2024-2026: Hướng dẫn Xử trí Đột quỵ Nhồi máu não Cấp',
    organization: 'ESO / AHA',
    year: 2026,
    corLoe: 'Class I · LOE A',
    landmarkTrials: ['AcT Trial (Tenecteplase)', 'EXTEND-IA TNK', 'DAWN Trial (EVT 24h)', 'DEFUSE-3'],
    keyClinicalImplication: 'Tiêu sợi huyết bằng Tenecteplase (TNK 0.25 mg/kg) trong cửa sổ 4.5h và can thiệp lấy huyết khối cơ học (EVT) kéo dài tới 24h để cứu vùng nhu mô não tranh tối tranh sáng.'
  }
];

/**
 * Tra cứu danh sách Guideline EBM liên kết với một chủ đề sinh lý bệnh
 */
export function getGuidelinesForPathoTopic(pathoSlugOrName: string): PathoGuidelineLink[] {
  if (!pathoSlugOrName) return [];
  const q = pathoSlugOrName.toLowerCase().trim();
  return PATHO_GUIDELINE_MATRIX.filter(item => 
    item.pathoSlug.toLowerCase().includes(q) ||
    item.pathoTitle.toLowerCase().includes(q) ||
    item.specialty.toLowerCase().includes(q)
  );
}

/**
 * Render Widget HTML Bằng Chứng EBM trong Trình đọc Sinh lý bệnh
 */
export function renderPathoGuidelineWidgetHtml(link: PathoGuidelineLink): string {
  return `
    <div class="patho-ebm-bridge-widget" style="background:linear-gradient(135deg, rgba(2,132,199,0.06), rgba(99,102,241,0.04)); border:1.5px solid #0284c7; border-radius:12px; padding:16px 18px; margin:1.5rem 0; box-shadow:0 4px 15px rgba(2,132,199,0.08);">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px; flex-wrap:wrap; gap:8px;">
        <div>
          <span style="font-size:11px; font-weight:800; text-transform:uppercase; color:#0284c7; letter-spacing:0.04em; display:flex; align-items:center; gap:6px;">
            <i class="fa-solid fa-scale-balanced" style="font-size:13px;"></i> Y Học Chuyển Dịch (Translational EBM Bridge)
          </span>
          <h4 style="margin:4px 0 0; font-size:15px; font-weight:800; color:var(--color-text, #0f172a); line-height:1.35;">
            ${escapeHtml(link.guidelineTitle)} (${link.year})
          </h4>
        </div>
        <div style="display:flex; gap:6px; align-items:center;">
          <span style="background:rgba(2,132,199,0.12); color:#0284c7; font-size:10.5px; font-weight:800; padding:3px 8px; border-radius:6px;">
            ${link.corLoe}
          </span>
        </div>
      </div>

      <!-- Molecular Mechanism to EBM Rationale -->
      <div style="background:var(--color-surface, #fff); border:1px solid var(--color-border, #e2e8f0); border-radius:8px; padding:10px 12px; font-size:12.5px; margin-bottom:10px; line-height:1.5;">
        <div style="color:var(--color-primary); font-weight:700; margin-bottom:3px;">
          🔬 Điểm Tác Động Cơ Chế &amp; Ứng Dụng Lâm Sàng:
        </div>
        <div style="color:var(--color-text); margin-bottom:6px;">
          ${escapeHtml(link.keyClinicalImplication)}
        </div>
        <div style="font-size:11px; color:var(--color-text-muted);">
          <strong>Thử nghiệm bản lề chứng minh (Landmark RCTs):</strong> ${link.landmarkTrials.map(t => `<span style="background:rgba(99,102,241,0.08); color:#6366f1; padding:1px 6px; border-radius:4px; margin-right:4px; font-weight:600;">${escapeHtml(t)}</span>`).join('')}
        </div>
      </div>

      <!-- Action Button -->
      <div style="display:flex; justify-content:flex-end; gap:8px;">
        <a href="#/ebm/kho-guidelines" class="dsp-btn dsp-btn-sm" style="background:#0284c7; color:#fff; font-size:11.5px; font-weight:700; text-decoration:none; padding:4px 12px; border-radius:6px; display:inline-flex; align-items:center; gap:5px;">
          <i class="fa-solid fa-book-open-reader"></i> Xem Tóm Tắt Guideline Đầy Đủ →
        </a>
      </div>
    </div>
  `;
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
