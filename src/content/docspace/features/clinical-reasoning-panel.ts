/**
 * Clinical Reasoning Coach & Diagnostic Approach Engine - DocSpace
 * Phân tích Tư duy Lâm sàng, Ma trận Chẩn đoán phân biệt & Sơ đồ Tiếp cận SVG Native
 */

import { SoapPatientRecord } from '../types';
import { escapeHtml } from '../docspace-view';

export interface DiagnosticApproachData {
  symptomKey: string;
  symptomName: string;
  icon: string;
  redFlags: string[];
  differentials: {
    diagnosis: string;
    probability: 'high' | 'moderate' | 'low';
    keyFeatures: string;
    mustNotMiss?: boolean;
    goldStandard: string;
  }[];
  algorithmSteps: {
    step: number;
    title: string;
    action: string;
    pearl: string;
  }[];
  svgFlowchart: string;
  guidelineLinks: { title: string; url: string }[];
}

export const CLINICAL_APPROACH_DATABASE: Record<string, DiagnosticApproachData> = {
  'dau_nguc': {
    symptomKey: 'dau_nguc',
    symptomName: 'Đau Ngực Cấp (Chest Pain)',
    icon: 'fa-solid fa-heart-crack',
    redFlags: [
      'Đau ngực sau xương ức lan lên hàm, vai trái, kèm vã mồ hôi, khó thở (Hội chứng vành cấp - ACS)',
      'Đau xé rách dữ dội đột ngột lan ra sau lưng giữa hai xương bả vai (Phình bóc tách ĐMC)',
      'Khó thở đột ngột, đau ngực màng phổi kiểu nhói, tụt HA, SpO2 giảm (Thuyên tắc phổi - PE)',
      'Tiếng cọ màng tim, đau giảm khi ngồi cúi người ra trước (Viêm màng ngoài tim cấp)',
      'Gõ vang một bên phổi, rì rào phế nang mất, tụt HA (Tràn khí màng phổi áp lực)'
    ],
    differentials: [
      { diagnosis: 'Hội chứng mạch vành cấp (STEMI / NSTEMI / UAP)', probability: 'high', mustNotMiss: true, keyFeatures: 'Đau đè ép > 20 phút, lan tay trái/hàm, Troponin T/I tăng, ECG có ST chênh', goldStandard: 'Chụp mạch vành qua da (Coronary Angiography)' },
      { diagnosis: 'Thuyên tắc động mạch phổi (PE)', probability: 'moderate', mustNotMiss: true, keyFeatures: 'Khó thở đột ngột, đau màng phổi, bất động/DVT, D-dimer tăng cao, Wells PE score', goldStandard: 'Chụp CT mạch máu phổi có cản quang (CTPA)' },
      { diagnosis: 'Bóc tách động mạch chủ ngực (Aortic Dissection)', probability: 'low', mustNotMiss: true, keyFeatures: 'Đau ngực xé rách lan lưng, chênh lệch huyết áp 2 tay > 20 mmHg, trung thất rộng trên CXR', goldStandard: 'Chụp CTA toàn bộ động mạch chủ ngực - bụng' },
      { diagnosis: 'Trào ngược dạ dày thực quản (GERD) / Co thắt thực quản', probability: 'moderate', keyFeatures: 'Đau nóng rát sau xương ức sau ăn no hoặc nằm ngửa, giảm khi dùng Antacid/PPI', goldStandard: 'Nội soi thực quản - dạ dày & Đo pH 24h' },
      { diagnosis: 'Viêm sụn sườn (Tietze Syndrome)', probability: 'moderate', keyFeatures: 'Đau chói khu trú khi ấn trực tiếp vào khớp ức sườn, tăng khi ho hoặc hít sâu', goldStandard: 'Thăm khám lâm sàng loại trừ tim phổi' }
    ],
    algorithmSteps: [
      { step: 1, title: 'Đánh giá Sinh hiệu & 5 Bệnh lý Nguy kịch (Big 5)', action: 'Đo SpO2, Huyết áp 2 tay, Mạch, Làm ECG 12 chuyển đạo trong ≤ 10 phút đầu.', pearl: 'Bất kỳ đau ngực cấp nào cũng phải loại trừ ngay: ACS, PE, Bóc tách ĐMC, Tràn khí MP áp lực, Vỡ thực quản.' },
      { step: 2, title: 'Phân tầng Nguy cơ Tim mạch & Men Tim', action: 'Làm High-sensitivity Troponin tại thời điểm 0h và 1-2h theo phác đồ ESC 0/1h hoặc 0/2h.', pearl: 'ECG ban đầu bình thường không loại trừ được NSTEMI hoặc Bóc tách ĐMC.' },
      { step: 3, title: 'Chẩn đoán Hình ảnh Cấp cứu', action: 'Chụp X-quang ngực thẳng tại giường, Siêu âm tim tại giường (Focus Echo / POCUS) tìm giãn thất phải, tràn dịch màng tim, flap bóc tách.', pearl: 'Nếu nghi ngờ PE: Tính điểm Wells/Geneva ➔ D-dimer hoặc CTPA.' }
    ],
    svgFlowchart: `
      <svg viewBox="0 0 700 240" style="width:100%; height:auto; font-family:inherit; max-height:220px;" aria-label="Sơ đồ tiếp cận đau ngực">
        <rect width="700" height="240" rx="10" fill="var(--color-bg, #f8fafc)" stroke="var(--color-border, #e2e8f0)" />
        
        <!-- Node 1: Entry -->
        <rect x="20" y="90" width="130" height="50" rx="8" fill="#0284c7" />
        <text x="85" y="112" fill="#fff" font-size="12" font-weight="700" text-anchor="middle">Đau Ngực Cấp</text>
        <text x="85" y="128" fill="#e0f2fe" font-size="10" text-anchor="middle">ECG ≤ 10 phút</text>
        
        <!-- Arrow 1 to branches -->
        <path d="M 150 115 L 200 65" stroke="var(--color-primary, #0284c7)" stroke-width="2" fill="none" marker-end="url(#arrow)" />
        <path d="M 150 115 L 200 115" stroke="var(--color-primary, #0284c7)" stroke-width="2" fill="none" />
        <path d="M 150 115 L 200 165" stroke="var(--color-primary, #0284c7)" stroke-width="2" fill="none" />
        
        <!-- Node 2A: STEMI -->
        <rect x="200" y="40" width="140" height="50" rx="8" fill="#ef4444" />
        <text x="270" y="62" fill="#fff" font-size="11" font-weight="700" text-anchor="middle">ST Chênh lên</text>
        <text x="270" y="78" fill="#fee2e2" font-size="9.5" text-anchor="middle">STEMI ➔ Can thiệp PCI</text>
        
        <!-- Node 2B: Non-ST -->
        <rect x="200" y="90" width="140" height="50" rx="8" fill="#f59e0b" />
        <text x="270" y="112" fill="#fff" font-size="11" font-weight="700" text-anchor="middle">ST Không chênh</text>
        <text x="270" y="128" fill="#fef3c7" font-size="9.5" text-anchor="middle">hs-Troponin 0h/1h</text>
        
        <!-- Node 2C: Khác -->
        <rect x="200" y="145" width="140" height="50" rx="8" fill="#8b5cf6" />
        <text x="270" y="167" fill="#fff" font-size="11" font-weight="700" text-anchor="middle">ECG Bình thường</text>
        <text x="270" y="183" fill="#ede9fe" font-size="9.5" text-anchor="middle">PE, Bóc tách, MP, GERD</text>

        <!-- Node 3: Kết quả -->
        <rect x="400" y="90" width="270" height="50" rx="8" fill="var(--color-surface, #fff)" stroke="#0284c7" stroke-width="1.5" />
        <text x="535" y="112" fill="var(--color-text, #0f172a)" font-size="11" font-weight="700" text-anchor="middle">Quyết Định Lâm Sàng</text>
        <text x="535" y="128" fill="var(--color-text-muted, #64748b)" font-size="10" text-anchor="middle">Cathlab / CTPA / CTA ĐMC / Điều trị bảo tồn</text>
      </svg>
    `,
    guidelineLinks: [
      { title: 'ESC 2023 Guidelines on Acute Coronary Syndromes (ACS)', url: '#/ebm' },
      { title: 'ESC 2019 Guidelines for the diagnosis and management of Acute Pulmonary Embolism', url: '#/ebm' }
    ]
  },

  'kho_tho': {
    symptomKey: 'kho_tho',
    symptomName: 'Khó Thở Cấp (Acute Dyspnea)',
    icon: 'fa-solid fa-lungs',
    redFlags: [
      'Thở rít thì hít vào (Stridor), co kéo cơ hô hấp phụ, tím tái (Tắc nghẽn đường thở trên)',
      'Khó thở kịch phát về đêm, phù phổi cấp bọt hồng, tĩnh mạch cổ nổi (Suy tim cấp mất bù)',
      'Khó thở kèm đau ngực màng phổi nhói, tụt huyết áp (Thuyên tắc phổi hoặc Tràn khí màng phổi áp lực)',
      'Khí máu động mạch: PaO2 < 60 mmHg, PaCO2 > 50 mmHg kèm toan máu cấp (Suy hô hấp cấp đe dọa)'
    ],
    differentials: [
      { diagnosis: 'Suy tim cấp / Phù phổi cấp huyết động', probability: 'high', keyFeatures: 'Rale ẩm 2 đáy phổi, NT-proBNP/BNP tăng cao, EF giảm, TM cổ nổi', goldStandard: 'Siêu âm tim Doppler & NT-proBNP' },
      { diagnosis: 'Đợt cấp COPD / Cơn hen phế quản cấp', probability: 'high', keyFeatures: 'Tiền sử hút thuốc, rale rít rale ngáy lan tỏa, lồng ngực hình thùng', goldStandard: 'Đo chức năng hô hấp ngoài đợt cấp (Spirometry)' },
      { diagnosis: 'Viêm phổi mắc phải cộng đồng (CAP)', probability: 'moderate', keyFeatures: 'Sốt, ho đờm đục, rale nổ khu trú, tổn thương thâm nhiễm mới trên CXR', goldStandard: 'X-quang ngực thẳng hoặc CT ngực không cản quang' },
      { diagnosis: 'Thuyên tắc động mạch phổi (PE)', probability: 'moderate', mustNotMiss: true, keyFeatures: 'Khó thở đột ngột không rõ nguyên nhân, SpO2 giảm không tương xứng X-quang', goldStandard: 'CTPA ngực' }
    ],
    algorithmSteps: [
      { step: 1, title: 'Hỗ trợ Hô hấp Cấp thiết (ABC)', action: 'Cho thở oxy (Canula 2-4L/p hoặc Mask túi 10-15L/p), giữ SpO2 94-98% (88-92% ở COPD).', pearl: 'Cân nhắc thở không xâm nhập (NIV / BiPAP / CPAP) sớm nếu suy tim ứ huyết hoặc đợt cấp COPD có toan hô hấp pH < 7.35.' },
      { step: 2, title: 'Siêu âm Phổi Cấp cứu (BLUE Protocol)', action: 'Tìm Profile A (Hen/COPD/PE), Profile B (Hội chứng mô kẽ / Phù phổi phù kẽ), Profile C (Đông đặc phổi).', pearl: 'BLUE protocol giúp phân biệt suy tim và COPD trong vòng 3 phút tại giường bệnh.' },
      { step: 3, title: 'Xét nghiệm & Khí Máu Động Mạch (ABG)', action: 'Làm ABG đánh giá PaO2/FiO2, PaCO2, Lactate, BNP/NT-proBNP, Troponin, D-dimer, Công thức máu.', pearl: 'Dùng công cụ ABG Studio trong DocSpace để đọc ngay toan kiềm.' }
    ],
    svgFlowchart: `
      <svg viewBox="0 0 700 220" style="width:100%; height:auto; font-family:inherit; max-height:200px;" aria-label="Sơ đồ tiếp cận khó thở">
        <rect width="700" height="220" rx="10" fill="var(--color-bg, #f8fafc)" stroke="var(--color-border, #e2e8f0)" />
        <rect x="20" y="80" width="130" height="50" rx="8" fill="#0284c7" />
        <text x="85" y="103" fill="#fff" font-size="12" font-weight="700" text-anchor="middle">Khó Thở Cấp</text>
        <text x="85" y="119" fill="#e0f2fe" font-size="10" text-anchor="middle">SpO2 + POCUS BLUE</text>
        
        <path d="M 150 105 L 210 55" stroke="var(--color-primary, #0284c7)" stroke-width="2" fill="none" />
        <path d="M 150 105 L 210 155" stroke="var(--color-primary, #0284c7)" stroke-width="2" fill="none" />
        
        <rect x="210" y="30" width="150" height="50" rx="8" fill="#06b6d4" />
        <text x="285" y="52" fill="#fff" font-size="11" font-weight="700" text-anchor="middle">B-Lines Lan Tỏa</text>
        <text x="285" y="68" fill="#cffafe" font-size="9.5" text-anchor="middle">Suy tim cấp / Phù phổi</text>
        
        <rect x="210" y="130" width="150" height="50" rx="8" fill="#8b5cf6" />
        <text x="285" y="152" fill="#fff" font-size="11" font-weight="700" text-anchor="middle">A-Lines + Trượt Phổi</text>
        <text x="285" y="168" fill="#ede9fe" font-size="9.5" text-anchor="middle">Hen / COPD / Khảo sát DVT</text>

        <rect x="400" y="80" width="270" height="50" rx="8" fill="var(--color-surface, #fff)" stroke="#0284c7" stroke-width="1.5" />
        <text x="535" y="102" fill="var(--color-text, #0f172a)" font-size="11" font-weight="700" text-anchor="middle">Xử Trí Đích</text>
        <text x="535" y="118" fill="var(--color-text-muted, #64748b)" font-size="10" text-anchor="middle">Lợi tiểu IV + Dãn mạch / Khí dung SABA + Corticoid / NIV</text>
      </svg>
    `,
    guidelineLinks: [
      { title: 'ESC 2021 Heart Failure Guidelines & 2023 Update', url: '#/ebm' },
      { title: 'GOLD 2024 Global Strategy for COPD', url: '#/ebm' }
    ]
  },

  'sot_chua_ro_nguyen_nhan': {
    symptomKey: 'sot_chua_ro_nguyen_nhan',
    symptomName: 'Sốt Cấp Tính & Nghi Ngờ Nhiễm Khuẩn Huyết',
    icon: 'fa-solid fa-temperature-arrow-up',
    redFlags: [
      'qSOFA ≥ 2 điểm (Nhịp thở ≥ 22, HA tâm thu ≤ 100, Thay đổi ý thức)',
      'Lactate máu > 2.0 mmol/L hoặc Tụt huyết áp cần dùng vận mạch (Sốc nhiễm khuẩn)',
      'Ban xuất huyết hoại tử hình sao (Nghiêm trọng do Não mô cầu / DIC)',
      'Cổ gượng, dấu Kernig/Brudzinski dương tính (Viêm màng não)'
    ],
    differentials: [
      { diagnosis: 'Nhiễm khuẩn huyết (Sepsis) từ đường hô hấp / tiết niệu / tiêu hóa', probability: 'high', mustNotMiss: true, keyFeatures: 'Sốt/Hạ thân nhiệt, Bạch cầu tăng, Procalcitonin tăng, SOFA tăng ≥ 2 điểm', goldStandard: 'Cấy máu (2 bộ) & Ổ nhiễm trùng' },
      { diagnosis: 'Sốt xuất huyết Dengue nặng (Cảnh báo: Đau bụng, nôn nhiều, Hct tăng vọt, TC giảm)', probability: 'moderate', keyFeatures: 'Sốt cao đột ngột 2-7 ngày, đau mỏi cơ, dấu dây thắt (+), NS1Ag (+)', goldStandard: 'Test nhanh NS1Ag / Dengue IgM/IgG' },
      { diagnosis: 'Sốt rét ác tính (Plasmodium falciparum)', probability: 'low', keyFeatures: 'Tiền sử đi vùng dịch tễ, rét run, vã mồ hôi, thiếu máu, lách to', goldStandard: 'Kéo lam máu nhuộm Giemsa tìm KST sốt rét' }
    ],
    algorithmSteps: [
      { step: 1, title: 'Thực hiện Gói Sepsis 1-Hour Bundle Ngay Lập Tức', action: '1. Đo Lactate máu. 2. Cấy máu trước kháng sinh. 3. Kháng sinh phổ rộng IV. 4. Bù dịch 30ml/kg nếu tụt HA hoặc Lactate ≥ 4. 5. Vận mạch Noradrenaline nếu MAP < 65.', pearl: 'Mỗi 1 giờ chậm trễ kháng sinh trong sốc nhiễm khuẩn làm tăng tỷ lệ tử vong 7.6%.' },
      { step: 2, title: 'Tìm Ổ Nhiễm Khuẩn Tiêu Điểm', action: 'Khám toàn diện: Phổi, Nước tiểu, Vết mổ, Catheter tĩnh mạch trung tâm, Loét tỳ đè, Ổ bụng.', pearl: 'Rút hoặc thay thế ngay mọi catheter nghi ngờ là nguồn nhiễm khuẩn.' }
    ],
    svgFlowchart: `
      <svg viewBox="0 0 700 200" style="width:100%; height:auto; font-family:inherit;" aria-label="Sơ đồ Sepsis">
        <rect width="700" height="200" rx="10" fill="var(--color-bg, #f8fafc)" stroke="var(--color-border, #e2e8f0)" />
        <rect x="20" y="70" width="140" height="50" rx="8" fill="#ef4444" />
        <text x="90" y="92" fill="#fff" font-size="11" font-weight="700" text-anchor="middle">Sốt + Nghi Nhiễm trùng</text>
        <text x="90" y="108" fill="#fee2e2" font-size="9.5" text-anchor="middle">Đánh giá qSOFA / SIRS</text>
        
        <path d="M 160 95 L 230 95" stroke="#ef4444" stroke-width="2" fill="none" />
        
        <rect x="230" y="70" width="180" height="50" rx="8" fill="#b91c1c" />
        <text x="320" y="92" fill="#fff" font-size="11" font-weight="700" text-anchor="middle">Gói 1-Hour Bundle</text>
        <text x="320" y="108" fill="#fee2e2" font-size="9" text-anchor="middle">Lactate + Cấy máu + KS + Dịch</text>

        <path d="M 410 95 L 470 95" stroke="#b91c1c" stroke-width="2" fill="none" />

        <rect x="470" y="70" width="200" height="50" rx="8" fill="var(--color-surface, #fff)" stroke="#b91c1c" stroke-width="1.5" />
        <text x="570" y="92" fill="var(--color-text, #0f172a)" font-size="11" font-weight="700" text-anchor="middle">ICU / Hồi Sức Tích Cực</text>
        <text x="570" y="108" fill="var(--color-text-muted, #64748b)" font-size="9" text-anchor="middle">Noradrenaline giữ MAP ≥ 65 mmHg</text>
      </svg>
    `,
    guidelineLinks: [
      { title: 'Surviving Sepsis Campaign (SSC 2021) Guidelines', url: '#/ebm' },
      { title: 'Hướng dẫn chẩn đoán và điều trị Nhiễm khuẩn huyết - Bộ Y tế', url: '#/ebm' }
    ]
  }
};

export class ClinicalReasoningPanel {
  private modalEl: HTMLElement;
  private targetInputId: string = '';
  private activePatient: SoapPatientRecord | null = null;
  private selectedSymptom: string = 'dau_nguc';

  constructor() {
    this.modalEl = document.createElement('div');
    this.modalEl.id = 'modalClinicalReasoningPanel';
    this.modalEl.style.display = 'none';
    this.modalEl.style.position = 'fixed';
    this.modalEl.style.inset = '0';
    this.modalEl.style.zIndex = '1065';
    this.modalEl.style.background = 'rgba(15, 23, 42, 0.75)';
    this.modalEl.style.backdropFilter = 'blur(4px)';
    this.modalEl.style.alignItems = 'center';
    this.modalEl.style.justifyContent = 'center';
    this.modalEl.style.padding = '16px';
    document.body.appendChild(this.modalEl);

    this.modalEl.addEventListener('mousedown', (e) => {
      if (e.target === this.modalEl) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalEl.style.display === 'flex') {
        this.close();
      }
    });
  }

  public open(targetInputId: string = '', patient: SoapPatientRecord | null = null, defaultSymptomKey: string = 'dau_nguc') {
    this.targetInputId = targetInputId;
    this.activePatient = patient;
    if (defaultSymptomKey && CLINICAL_APPROACH_DATABASE[defaultSymptomKey]) {
      this.selectedSymptom = defaultSymptomKey;
    }

    this.renderLayout();
    this.modalEl.style.display = 'flex';
    this.bindEvents();
  }

  public close() {
    this.modalEl.style.display = 'none';
  }

  private renderLayout() {
    const approach = CLINICAL_APPROACH_DATABASE[this.selectedSymptom] || CLINICAL_APPROACH_DATABASE['dau_nguc'];

    const patientBadge = this.activePatient
      ? `<span class="dsp-badge" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; font-size:11px;">
          <i class="fa-solid fa-user-injured"></i> ${escapeHtml(this.activePatient.fullName)} (Chẩn đoán: ${escapeHtml(this.activePatient.currentDiagnosis || this.activePatient.admissionDiagnosis || 'N/A')})
         </span>`
      : '';

    this.modalEl.innerHTML = `
      <div style="background:var(--color-surface, #ffffff); width:100%; max-width:1150px; height:88vh; border-radius:14px; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 25px 50px -12px rgba(0,0,0,0.35); border:1px solid var(--color-border, #e2e8f0); position:relative; font-family:inherit;">
        
        <!-- Header -->
        <div style="padding:14px 20px; border-bottom:1px solid var(--color-border, #e2e8f0); display:flex; justify-content:space-between; align-items:center; background:var(--color-bg, #f8fafc); flex-shrink:0;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg, #10b981, #059669); color:#fff; display:flex; align-items:center; justify-content:center; font-size:18px; box-shadow:0 4px 6px -1px rgba(16,185,129,0.3);">
              <i class="fa-solid fa-sitemap"></i>
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:10px;">
                <h3 style="margin:0; font-size:17px; font-weight:700; color:var(--color-text, #0f172a);">Clinical Reasoning Coach</h3>
                <span class="dsp-badge" style="background:#dcfce7; color:#15803d; border:1px solid #bbf7d0; font-size:11px;">Tiếp cận & Chẩn đoán Phân biệt</span>
                ${patientBadge}
              </div>
              <p style="margin:2px 0 0; font-size:12px; color:var(--color-text-muted, #64748b);">Ma trận chẩn đoán phân biệt, dấu hiệu cờ đỏ cấp cứu & lưu đồ thuật toán trực quan</p>
            </div>
          </div>

          <div style="display:flex; align-items:center; gap:10px;">
            <button id="btnInsertReasoningToSoap" class="dsp-btn dsp-btn-primary dsp-btn-sm" style="font-size:12px;">
              <i class="fa-solid fa-file-medical"></i> Chèn Phân Tích vào Bệnh Án
            </button>
            <button id="btnCloseClinicalReasoning" style="background:none; border:none; width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:20px; cursor:pointer; color:var(--color-text-muted, #64748b); transition:all 0.2s;" title="Đóng (Esc)">&times;</button>
          </div>
        </div>

        <!-- Body Area (Dual Panel) -->
        <div style="display:flex; flex:1; overflow:hidden; position:relative;">
          
          <!-- Left Sidebar (Symptom Navigator) -->
          <div style="width:280px; border-right:1px solid var(--color-border, #e2e8f0); display:flex; flex-direction:column; background:var(--color-bg, #f8fafc); flex-shrink:0; padding:12px;">
            <div style="font-size:12px; font-weight:700; color:var(--color-text-muted, #64748b); text-transform:uppercase; margin-bottom:8px;">Hội chứng / Triệu chứng:</div>
            <div style="display:flex; flex-direction:column; gap:6px;">
              ${Object.values(CLINICAL_APPROACH_DATABASE).map(item => {
                const isSelected = item.symptomKey === this.selectedSymptom;
                return `
                  <button class="crp-symptom-btn" data-key="${item.symptomKey}" style="display:flex; align-items:center; gap:10px; width:100%; padding:10px 12px; border-radius:8px; border:1px solid ${isSelected ? 'var(--color-primary, #0284c7)' : 'transparent'}; background:${isSelected ? 'rgba(2, 132, 199, 0.08)' : 'var(--color-surface, #fff)'}; color:${isSelected ? 'var(--color-primary, #0284c7)' : 'var(--color-text, #0f172a)'}; font-size:13px; font-weight:${isSelected ? '700' : '500'}; text-align:left; cursor:pointer; transition:all 0.15s ease;">
                    <i class="${item.icon}" style="color:${isSelected ? 'var(--color-primary, #0284c7)' : 'var(--color-text-muted, #94a3b8)'}; font-size:14px;"></i>
                    <span style="flex:1;">${escapeHtml(item.symptomName)}</span>
                  </button>
                `;
              }).join('')}
            </div>

            <div style="margin-top:auto; padding:12px; background:#eff6ff; border-radius:8px; border:1px solid #dbeafe;">
              <div style="font-size:11.5px; font-weight:700; color:#1e40af; margin-bottom:4px;"><i class="fa-solid fa-lightbulb"></i> Clinical Tip:</div>
              <div style="font-size:11px; color:#1e3a8a; line-height:1.4;">
                Luôn rà soát các chẩn đoán "Must-Not-Miss" (Không được phép bỏ sót) trước khi nghĩ đến nhóm nguyên nhân lành tính.
              </div>
            </div>
          </div>

          <!-- Right Content (Interactive Matrix & Flowchart) -->
          <div style="flex:1; overflow-y:auto; padding:24px 28px; background:var(--color-surface, #ffffff);">
            
            <!-- Red Flags Alert Banner -->
            <div style="background:#fff1f2; border:1px solid #fecdd3; border-left:4px solid #e11d48; padding:14px 16px; border-radius:10px; margin-bottom:20px;">
              <div style="font-size:13px; font-weight:800; color:#9f1239; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
                <i class="fa-solid fa-triangle-exclamation"></i> CỜ ĐỎ CẤP CỨU CẦN LOẠI TRỪ NGAY (RED FLAGS):
              </div>
              <ul style="margin:0; padding-left:18px; font-size:12.5px; color:#881337; line-height:1.45;">
                ${approach.redFlags.map(rf => `<li>${escapeHtml(rf)}</li>`).join('')}
              </ul>
            </div>

            <!-- Differential Diagnosis Matrix Table -->
            <div style="margin-bottom:24px;">
              <h4 style="margin:0 0 12px; font-size:15px; font-weight:700; color:var(--color-text, #0f172a); display:flex; align-items:center; gap:8px;">
                <i class="fa-solid fa-table-cells" style="color:var(--color-primary);"></i> Ma Trận Chẩn Đoán Phân Biệt (Differential Diagnosis Matrix)
              </h4>
              <div style="overflow-x:auto; border:1px solid var(--color-border, #e2e8f0); border-radius:10px;">
                <table style="width:100%; border-collapse:collapse; font-size:12.5px; text-align:left;">
                  <thead>
                    <tr style="background:var(--color-bg, #f8fafc); border-bottom:1px solid var(--color-border, #e2e8f0);">
                      <th style="padding:10px 14px; font-weight:700; color:var(--color-text, #334155);">Bệnh lý / Chẩn đoán</th>
                      <th style="padding:10px 14px; font-weight:700; color:var(--color-text, #334155);">Xác suất</th>
                      <th style="padding:10px 14px; font-weight:700; color:var(--color-text, #334155);">Đặc điểm then chốt</th>
                      <th style="padding:10px 14px; font-weight:700; color:var(--color-text, #334155);">Tiêu chuẩn vàng</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${approach.differentials.map((d, idx) => `
                      <tr style="border-bottom:1px solid var(--color-border, #f1f5f9); background:${idx % 2 === 0 ? 'var(--color-surface, #fff)' : 'var(--color-bg, #f8fafc)'};">
                        <td style="padding:10px 14px; font-weight:600; color:var(--color-text, #0f172a);">
                          ${d.mustNotMiss ? '<span style="color:#ef4444; margin-right:4px;" title="Must-Not-Miss">🚨</span>' : ''}
                          ${escapeHtml(d.diagnosis)}
                        </td>
                        <td style="padding:10px 14px;">
                          <span class="dsp-badge" style="background:${d.probability === 'high' ? '#fee2e2' : d.probability === 'moderate' ? '#fef3c7' : '#f1f5f9'}; color:${d.probability === 'high' ? '#991b1b' : d.probability === 'moderate' ? '#92400e' : '#475569'}; font-size:11px;">
                            ${d.probability === 'high' ? 'Cao' : d.probability === 'moderate' ? 'Trung bình' : 'Thấp'}
                          </span>
                        </td>
                        <td style="padding:10px 14px; color:#334155;">${escapeHtml(d.keyFeatures)}</td>
                        <td style="padding:10px 14px; color:#0369a1; font-weight:500;">${escapeHtml(d.goldStandard)}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Algorithm Steps -->
            <div style="margin-bottom:24px;">
              <h4 style="margin:0 0 12px; font-size:15px; font-weight:700; color:var(--color-text, #0f172a); display:flex; align-items:center; gap:8px;">
                <i class="fa-solid fa-list-ol" style="color:var(--color-primary);"></i> Các Bước Tiếp Cận Theo Khuyến Cáo
              </h4>
              <div style="display:flex; flex-direction:column; gap:10px;">
                ${approach.algorithmSteps.map(step => `
                  <div style="display:flex; gap:14px; background:var(--color-bg, #f8fafc); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:14px;">
                    <div style="width:28px; height:28px; border-radius:50%; background:var(--color-primary, #0284c7); color:#fff; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:800; flex-shrink:0;">
                      ${step.step}
                    </div>
                    <div style="flex:1;">
                      <div style="font-size:13.5px; font-weight:700; color:var(--color-text, #0f172a); margin-bottom:4px;">${escapeHtml(step.title)}</div>
                      <div style="font-size:12.5px; color:#334155; margin-bottom:6px; line-height:1.45;">${escapeHtml(step.action)}</div>
                      <div style="font-size:11.5px; color:#0369a1; background:#e0f2fe; padding:6px 10px; border-radius:6px;">
                        <strong>Clinical Pearl:</strong> ${escapeHtml(step.pearl)}
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- SVG Flowchart -->
            <div style="margin-bottom:20px;">
              <h4 style="margin:0 0 12px; font-size:15px; font-weight:700; color:var(--color-text, #0f172a); display:flex; align-items:center; gap:8px;">
                <i class="fa-solid fa-diagram-project" style="color:var(--color-primary);"></i> Sơ Đồ Thuật Toán Trực Quan (Pure Vector SVG)
              </h4>
              <div>
                ${approach.svgFlowchart}
              </div>
            </div>

            <!-- Guideline Links -->
            <div style="border-top:1px solid var(--color-border, #e2e8f0); padding-top:14px;">
              <div style="font-size:12px; font-weight:700; color:var(--color-text-muted, #64748b); margin-bottom:6px;">EBM EVIDENCE & GUIDELINES LIÊN QUAN:</div>
              <div style="display:flex; gap:10px; flex-wrap:wrap;">
                ${approach.guidelineLinks.map(g => `
                  <a href="${g.url}" class="dsp-badge" style="background:#f1f5f9; color:#0369a1; text-decoration:none; padding:6px 10px; font-size:11.5px; border:1px solid #cbd5e1;">
                    <i class="fa-solid fa-book-bookmark"></i> ${escapeHtml(g.title)}
                  </a>
                `).join('')}
              </div>
            </div>

          </div>

        </div>

      </div>
    `;
  }

  private bindEvents() {
    document.getElementById('btnCloseClinicalReasoning')?.addEventListener('click', () => this.close());

    // Switch symptom
    this.modalEl.querySelectorAll('.crp-symptom-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-key');
        if (key && CLINICAL_APPROACH_DATABASE[key]) {
          this.selectedSymptom = key;
          this.renderLayout();
          this.bindEvents();
        }
      });
    });

    // Insert to SOAP
    document.getElementById('btnInsertReasoningToSoap')?.addEventListener('click', () => {
      const approach = CLINICAL_APPROACH_DATABASE[this.selectedSymptom];
      if (!approach) return;

      const diffList = approach.differentials.map(d => `- ${d.diagnosis} (${d.probability}): ${d.keyFeatures}`).join('\n');
      const textToInsert = `\n[Tư Duy Lâm Sàng - ${approach.symptomName}]:\n• Chẩn đoán phân biệt:\n${diffList}\n• Kế hoạch tiếp cận: ${approach.algorithmSteps.map(s => `(${s.step}) ${s.title}`).join(' ➔ ')}`;

      if (this.targetInputId) {
        const input = document.getElementById(this.targetInputId) as HTMLTextAreaElement;
        if (input) {
          input.value = input.value ? `${input.value}\n${textToInsert}` : textToInsert;
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
      this.close();
    });
  }
}

export const clinicalReasoningPanel = new ClinicalReasoningPanel();
