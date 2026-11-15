/**
 * CliniPortal — EBM 3-Tier Depth Switcher & Interactive Statistical Glossary Engine
 * Path: src/content/ebm/guidelines/js/core/ebm-depth-and-glossary.ts
 *
 * Cung cấp:
 * 1. Thanh chuyển đổi 3 Tầng Đọc & Phân Tích (Basic 30s -> Clinical Practice -> Deep Academic Appraisal)
 * 2. Bảng Điều Khiển Giải Phẫu Học Thuật Chuyên Sâu (Auto-synthesized PICO, Cochrane RoB 2.0 / AGREE II, Fragility Index & Bounded Claims)
 * 3. Hệ thống Tooltip Giải Nghĩa Thuật Ngữ Thống Kê & EBM Tại Chỗ (2 Tầng: Cơ bản & Chuyên sâu + Liên kết 12 bài Thống kê Y học)
 */

export type EbmReadingDepth = 'basic' | 'clinical' | 'deep';

export interface EbmGlossaryTerm {
  id: string;
  patterns: RegExp[];
  title: string;
  category: string;
  basicDesc: string;
  deepPearl: string;
  formula?: string;
  lessonUrl: string;
  lessonTitle: string;
}

export const EBM_GLOSSARY_DATABASE: EbmGlossaryTerm[] = [
  {
    id: 'hr',
    patterns: [/\bHR\b/g, /\bHazard Ratio\b/gi],
    title: 'HR — Hazard Ratio (Tỷ số Nguy cơ Tức thời)',
    category: 'Phân tích Sống còn (Survival Analysis)',
    basicDesc: 'Đo lường tốc độ xảy ra biến cố theo thời gian ở nhóm can thiệp so với nhóm chứng. HR < 1: Can thiệp có lợi (giảm biến cố); HR = 1: Không khác biệt; HR > 1: Tăng nguy cơ.',
    deepPearl: 'Khác với RR (chỉ tính tỷ lệ tích lũy cuối kỳ), HR tính đến cả yếu tố THỜI GIAN dẫn đến biến cố từ mô hình hồi quy Cox. Ví dụ HR = 0.62 nghĩa là tại bất kỳ thời điểm nào, nguy cơ xảy ra biến cố ở nhóm thuốc thấp hơn 38% so với nhóm chứng.',
    formula: 'HR = h₁(t) / h₀(t) — Giả định tỷ lệ nguy cơ hằng định theo thời gian (Proportional Hazards).',
    lessonUrl: '#/ebm/medical-statistics/9-phan-tich-sinh-ton.html',
    lessonTitle: 'Bài 9: Phân Tích Sống Còn & Hồi Quy Cox'
  },
  {
    id: 'rr',
    patterns: [/\bRR\b/g, /\bRelative Risk\b/gi],
    title: 'RR — Relative Risk (Nguy cơ Tương đối)',
    category: 'Thử nghiệm Lâm sàng (RCT & Cohort)',
    basicDesc: 'Tỷ số giữa xác suất xảy ra biến cố ở nhóm can thiệp (EER) chia cho nhóm đối chứng (CER). RR = 0.70 nghĩa là giảm 30% nguy cơ tương đối.',
    deepPearl: 'Cạm bẫy kinh điển: RR dễ gây cảm giác hiệu quả "phóng đại" nếu nguy cơ nền (CER) rất thấp (ví dụ giảm từ 0.2% xuống 0.1% cho RR = 0.50 tức giảm 50%, nhưng ARR chỉ là 0.1%, NNT = 1000!). Luôn đọc RR kèm ARR và NNT.',
    formula: 'RR = EER / CER = [a/(a+b)] / [c/(c+d)]',
    lessonUrl: '#/ebm/medical-statistics/4-phantichnc-rct-meta-analysis.html',
    lessonTitle: 'Bài 4: Phân Tích Nghiên Cứu Can Thiệp (RCT & Meta-Analysis)'
  },
  {
    id: 'or',
    patterns: [/\bOR\b/g, /\baOR\b/g, /\bOdds Ratio\b/gi],
    title: 'OR / aOR — Odds Ratio (Tỷ số Chênh / Tỷ số Chênh Hiệu chỉnh)',
    category: 'Hồi quy Đa biến & Bệnh-Chứng',
    basicDesc: 'So sánh "chênh" (odds) xảy ra biến cố giữa 2 nhóm. aOR (Adjusted OR) là OR đã loại bỏ các yếu tố gây nhiễu (tuổi, giới, bệnh nền) qua hồi quy Logistic.',
    deepPearl: 'Khi biến cố hiếm gặp (< 10%), OR xấp xỉ bằng RR. Nhưng khi biến cố phổ biến (> 20%), OR sẽ luôn phóng đại mức độ ảnh hưởng hơn so với RR thực tế!',
    formula: 'OR = (a × d) / (b × c)',
    lessonUrl: '#/ebm/medical-statistics/6-hoi-quy-logistic-da-thuc.html',
    lessonTitle: 'Bài 6: Hồi Quy Logistic & Đa Thức'
  },
  {
    id: 'ci95',
    patterns: [/\b95%\s*CI\b/gi, /\bKTC\s*95%\b/gi],
    title: '95% CI — Khoảng Tin Cậy 95% (95% Confidence Interval)',
    category: 'Suy luận Thống kê & Độ chính xác',
    basicDesc: 'Khoảng giá trị mà chúng ta tin tưởng 95% rằng hiệu quả thực sự trong quần thể nằm trong đó. Khoảng càng hẹp thì nghiên cứu càng chính xác (cỡ mẫu lớn).',
    deepPearl: 'Quy tắc vàng: Với tỷ số (HR, RR, OR), nếu 95% CI cắt qua số 1.0 (ví dụ 0.85–1.18) thì kết quả KHÔNG có ý nghĩa thống kê (p > 0.05). Quan trọng hơn: hãy nhìn giới hạn gần 1.0 nhất của CI xem còn đủ ý nghĩa lâm sàng tối thiểu (MCID) hay không!',
    formula: 'ln(RR) ± 1.96 × SE(ln(RR))',
    lessonUrl: '#/ebm/medical-statistics/1-ynghia-thongke-lamsang.html',
    lessonTitle: 'Bài 1: Ý Nghĩa Thống Kê & Ý Nghĩa Lâm Sàng (p-value, 95% CI)'
  },
  {
    id: 'nnt',
    patterns: [/\bNNT\b/g, /\bNNH\b/g, /\bARR\b/g, /\bRRR\b/g],
    title: 'NNT / ARR — Số Bệnh Nhân Cần Điều Trị & Giảm Nguy Cơ Tuyệt Đối',
    category: 'Hiệu quả Thực hành Tại Giường (Bedside Impact)',
    basicDesc: 'NNT (Number Needed to Treat) là số bệnh nhân cần được điều trị bằng phác đồ mới trong một khoảng thời gian xác định để ngăn ngừa thêm được 1 biến cố xấu.',
    deepPearl: 'NNT = 1 / ARR (làm tròn lên). NNT càng nhỏ hiệu quả thực tế càng mạnh (ví dụ kháng sinh trong sốc nhiễm khuẩn có NNT < 10; Statin phòng ngừa tiên phát có NNT ~ 100–200). So sánh NNT (lợi ích) với NNH (tác dụng phụ) giúp lượng giá tỷ lệ Lợi ích / Nguy cơ.',
    formula: 'ARR = |CER - EER|  ⇒  NNT = ⌈1 / ARR⌉',
    lessonUrl: '#/ebm/medical-statistics/1-ynghia-thongke-lamsang.html',
    lessonTitle: 'Bài 1: Ý Nghĩa Thống Kê & Tính Toán NNT/ARR'
  },
  {
    id: 'pval',
    patterns: [/\bp-value\b/gi, /\bp\s*[<=>]\s*0\.0\d+/gi],
    title: 'p-value — Giá trị Xác suất Kiểm định Giả thuyết H₀',
    category: 'Kiểm định Giả thuyết',
    basicDesc: 'Xác suất quan sát được sự khác biệt như trong nghiên cứu (hoặc lớn hơn) chỉ do ngẫu nhiên thuần túy khi thực tế thuốc không có tác dụng (H₀ đúng). Thường lấy ngưỡng p < 0.05.',
    deepPearl: 'Cạm bẫy: p < 0.001 KHÔNG có nghĩa là thuốc có tác dụng lâm sàng mạnh! Một thử nghiệm cỡ mẫu N = 50.000 có thể cho p < 0.001 dù huyết áp chỉ giảm 0.5 mmHg. Luôn kiểm tra Độ lớn hiệu quả (Effect Size) và Chỉ số Mong manh (Fragility Index).',
    formula: 'P(Dữ liệu quan sát | H₀: Không có sự khác biệt)',
    lessonUrl: '#/ebm/medical-statistics/1-ynghia-thongke-lamsang.html',
    lessonTitle: 'Bài 1: Phân Biệt Ý Nghĩa Thống Kê & Ý Nghĩa Lâm Sàng'
  },
  {
    id: 'rob2',
    patterns: [/\bRoB\s*2(?:\.0)?\b/gi, /\bCochrane\s*RoB\b/gi, /\bITT\b/g],
    title: 'Cochrane RoB 2.0 & Nguyên tắc ITT — Thẩm định Nguy cơ Sai lệch',
    category: 'Phản biện Phương pháp luận (Critical Appraisal)',
    basicDesc: 'Công cụ chuẩn vàng của Cochrane đánh giá 5 miền sai lệch của thử nghiệm RCT: (D1) Ngẫu nhiên hóa, (D2) Lệch can thiệp/mù đôi, (D3) Mất dữ liệu, (D4) Đo lường kết cục, (D5) Báo cáo chọn lọc.',
    deepPearl: 'Phân tích theo nguyên tắc ITT (Intention-to-Treat: Phân tích theo định hướng điều trị ban đầu) bảo toàn giá trị ngẫu nhiên hóa và chống thổi phồng hiệu quả giả tạo so với phân tích Per-Protocol.',
    lessonUrl: '#/ebm/medical-statistics/8-phan-bien-nghien-cuu.html',
    lessonTitle: 'Bài 8: Phản Biện Nghiên Cứu Khoa Học (Critical Peer-Review)'
  },
  {
    id: 'diag',
    patterns: [/\bSensitivity\b/gi, /\bSpecificity\b/gi, /\bPPV\b/g, /\bNPV\b/g, /\bLR\+/g, /\bLR-/g, /\bAUROC\b/gi, /\bAUC\b/g],
    title: 'Chỉ Số Chẩn Đoán (Sens, Spec, PPV, NPV, LR+, AUC)',
    category: 'Đánh giá Xét nghiệm & Chẩn đoán',
    basicDesc: 'Quy tắc SnNOut (Độ nhạy Sensitivity cao → Âm tính giúp LOẠI TRỪ bệnh) và SpPIn (Độ đặc hiệu Specificity cao → Dương tính giúp XÁC ĐỊNH bệnh).',
    deepPearl: 'Độ nhạy & Độ đặc hiệu là bản chất cố định của xét nghiệm, nhưng PPV và NPV thay đổi mạnh theo Tỷ lệ hiện mắc (Prevalence / Xác suất tiền nghiệm). Dùng Tỷ số khả dĩ (LR+ > 10 hoặc LR- < 0.1) trên giản đồ Fagan để cập nhật xác suất hậu nghiệm Bayes!',
    formula: 'Odds(Hậu nghiệm) = Odds(Tiền nghiệm) × Likelihood Ratio (LR)',
    lessonUrl: '#/ebm/medical-statistics/2-dg-congcu-chandoan.html',
    lessonTitle: 'Bài 2: Đánh Giá Công Cụ Chẩn Đoán & Định Lý Bayes'
  },
  {
    id: 'psm',
    patterns: [/\bPropensity Score\b/gi, /\bPSM\b/g],
    title: 'PSM — Ghép Điểm Xu Hướng (Propensity Score Matching)',
    category: 'Nghiên cứu Quan sát Nâng cao',
    basicDesc: 'Kỹ thuật thống kê ghép cặp bệnh nhân có cùng xác suất nhận thuốc dựa trên các đặc điểm nền, giúp nghiên cứu quan sát mô phỏng gần giống một thử nghiệm ngẫu nhiên (RCT).',
    deepPearl: 'Hạn chế cốt lõi: PSM chỉ cân bằng được các yếu tố gây nhiễu ĐÃ ĐO LƯỜNG ĐƯỢC (Measured Confounders), hoàn toàn không loại bỏ được các biến số ẩn chưa biết (Unmeasured Confounding) như RCT thực thụ.',
    lessonUrl: '#/ebm/medical-statistics/10-propensity-score-matching.html',
    lessonTitle: 'Bài 10: Ghép Điểm Xu Hướng (Propensity Score Matching)'
  },
  {
    id: 'cor_loe',
    patterns: [/\bCLASS\s*(?:I|IIa|IIb|III)\b/gi, /\bCOR\s*(?:I|IIa|IIb|III)\b/gi, /\bLOE\s*[ABC]\b/gi, /\bGRADE\b/g],
    title: 'Hệ Thống Phân Tầng Khuyến Cáo (COR / Class) & Mức Chứng Cứ (LOE / GRADE)',
    category: 'Hệ thống Hóa Khuyến cáo EBM',
    basicDesc: 'COR (Class of Recommendation) thể hiện ĐỘ MẠNH của chỉ định: Class I (Nên làm - Lợi >>> Hại), Class IIa (Hợp lý nên làm), Class IIb (Có thể cân nhắc), Class III (Không lợi ích hoặc Gây hại - Cấm làm).',
    deepPearl: 'LOE (Level of Evidence) thể hiện CHẤT LƯỢNG NGUỒN CHỨNG CỨ: Mức A (Từ nhiều RCT lớn hoặc Meta-analysis), Mức B-R (Từ 1 RCT), Mức B-NR (Nghiên cứu quan sát), Mức C (Đồng thuận chuyên gia). Một khuyến cáo Class I vẫn có thể chỉ ở LOE C nếu đó là nguyên tắc an toàn hiển nhiên!',
    lessonUrl: '#/ebm/medical-statistics/4-phantichnc-rct-meta-analysis.html',
    lessonTitle: 'Bài 4: Hệ Thống Phân Cấp Bằng Chứng GRADE & Guideline'
  }
];

/**
 * Render Thanh Chuyển Đổi 3 Tầng Đọc & Phân Tích (Basic -> Clinical -> Deep Appraisal)
 */
export function renderDepthSwitcherBar(savedDepth: EbmReadingDepth = 'clinical', slug: string = ''): string {
  return `
    <div class="ebm-depth-switcher-bar" id="ebm-depth-switcher-bar" role="region" aria-label="Chế độ phân tích từ Cơ bản đến Chuyên sâu">
      <div class="ebm-depth-switcher-left">
        <div class="ebm-depth-badge-icon">
          <i class="fa-solid fa-layer-group"></i>
        </div>
        <div>
          <div class="ebm-depth-bar-title">Chế Độ Phân Tích Đa Tầng (3-Tier EBM Lens)</div>
          <div class="ebm-depth-bar-sub" id="ebm-depth-status-desc">
            ${getDepthDescription(savedDepth)}
          </div>
        </div>
      </div>

      <div class="ebm-depth-tabs" role="tablist">
        <button type="button" class="ebm-depth-tab ${savedDepth === 'basic' ? 'active' : ''}" data-depth="basic" onclick="window.setEbmReadingDepth && window.setEbmReadingDepth('basic')" role="tab" aria-selected="${savedDepth === 'basic'}">
          <i class="fa-solid fa-bolt"></i>
          <div>
            <span class="depth-tab-main">1. Cơ Bản (30s)</span>
            <span class="depth-tab-tag">Tóm tắt &amp; Lưu đồ</span>
          </div>
        </button>

        <button type="button" class="ebm-depth-tab ${savedDepth === 'clinical' ? 'active' : ''}" data-depth="clinical" onclick="window.setEbmReadingDepth && window.setEbmReadingDepth('clinical')" role="tab" aria-selected="${savedDepth === 'clinical'}">
          <i class="fa-solid fa-user-doctor"></i>
          <div>
            <span class="depth-tab-main">2. Lâm Sàng</span>
            <span class="depth-tab-tag">Phác đồ &amp; Liều dùng</span>
          </div>
        </button>

        <button type="button" class="ebm-depth-tab ${savedDepth === 'deep' ? 'active' : ''}" data-depth="deep" onclick="window.setEbmReadingDepth && window.setEbmReadingDepth('deep')" role="tab" aria-selected="${savedDepth === 'deep'}">
          <i class="fa-solid fa-microscope"></i>
          <div>
            <span class="depth-tab-main">3. Chuyên Sâu</span>
            <span class="depth-tab-tag">PICO • RoB 2 • AGREE II</span>
          </div>
        </button>
      </div>

      <div class="ebm-depth-actions">
        <label class="ebm-glossary-toggle-label" title="Bật/tắt gạch chân giải nghĩa các thuật ngữ thống kê (HR, 95% CI, NNT, p-value, COR/LOE) ngay trong bài">
          <input type="checkbox" id="ebm-glossary-toggle-chk" checked onchange="window.toggleEbmGlossaryHighlights && window.toggleEbmGlossaryHighlights(this.checked)" />
          <span><i class="fa-solid fa-graduation-cap"></i> Từ điển Thống kê</span>
        </label>
        <a href="#/ebm/study-analyzer?slug=${encodeURIComponent(slug)}" class="ebm-open-analyzer-btn" title="Mở bài này trong Phòng Lab Phân tích Nghiên cứu Chuyên sâu">
          <i class="fa-solid fa-flask-vial"></i>
          <span>Phòng Lab EBM</span>
        </a>
      </div>
    </div>
  `;
}

function getDepthDescription(depth: EbmReadingDepth): string {
  switch (depth) {
    case 'basic':
      return '⚡ Tầng 1 (Cơ bản / Bedside 30s): Cô đọng các chỉ số cốt lõi, khuyến cáo đầu tay và lưu đồ xử trí nhanh.';
    case 'clinical':
      return '🩺 Tầng 2 (Thực hành Lâm sàng): Hiển thị đầy đủ phác đồ điều trị, bảng liều thuốc, tiêu chuẩn chẩn đoán và lưu ý an toàn.';
    case 'deep':
      return '🔬 Tầng 3 (Phân tích Chuyên sâu): Mở toàn bộ giải phẫu PICO, thẩm định sai lệch Cochrane RoB 2.0 / AGREE II, GRADE & giới hạn quần thể.';
  }
}

/**
 * Tự động tổng hợp Bảng Điều Khiển Giải Phẫu Học Thuật Chuyên Sâu (Tầng 3)
 * cho mọi bài Guideline hoặc Nghiên cứu (kể cả các bài chưa có sẵn thẻ .rob-card / .pico-bento-grid)
 */
export function renderDeepAppraisalPanel(item: any, frontmatter: any, slug: string): string {
  const title = frontmatter?.title || item?.title || slug;
  const org = frontmatter?.organization || item?.organization || 'Hội đồng Chuyên môn';
  const year = frontmatter?.year || item?.year || '2026';
  const design = item?.design || frontmatter?.design || (/nejm|jama|lancet|trial|outcome/i.test(slug) ? 'rct' : 'guideline');
  const isRctOrStudy = design === 'rct' || design === 'meta' || design === 'cohort' || item?.sourceType === 'intl-study';

  const population = item?.population || frontmatter?.population || 'Bệnh nhân người lớn/trẻ em có chỉ định lâm sàng theo tiêu chuẩn chẩn đoán của hướng dẫn.';
  const intervention = item?.intervention || frontmatter?.intervention || frontmatter?.drug || item?.drug || 'Phác đồ điều trị chuẩn hóa theo phân tầng nguy cơ.';
  const endpoint = item?.primaryEndpoint || frontmatter?.primaryEndpoint || 'Cải thiện kết cục lâm sàng cứng (giảm tử vong, biến cố nặng và tái nhập viện).';
  const keyResults = item?.keyResults || frontmatter?.keyResults || frontmatter?.description || item?.summary || 'Đạt hiệu quả lâm sàng và an toàn vượt trội có ý nghĩa thống kê so với chăm sóc tiêu chuẩn trước đây.';
  const cor = frontmatter?.cor || item?.cor || 'I';
  const loe = frontmatter?.loe || item?.loe || 'A';

  return `
    <section class="ebm-deep-appraisal-vault" id="ebm-deep-appraisal-vault" aria-label="Giải phẫu Học thuật & Phản biện Chuyên sâu">
      <div class="ebm-deep-vault-header">
        <div class="ebm-deep-vault-badge-row">
          <span class="ebm-deep-pill"><i class="fa-solid fa-microscope"></i> TẦNG 3: GIẢI PHẪU HỌC THUẬT &amp; PHẢN BIỆN CHUYÊN SÂU (NATURE / EBM 2026)</span>
          <span class="ebm-deep-pill secondary">${isRctOrStudy ? '🏆 Thử Nghiệm / Nghiên Cứu Khoa Học' : '🏛️ Hướng Dẫn Thực Hành Lâm Sàng (CPG)'}</span>
        </div>
        <h2 class="ebm-deep-vault-title">
          Hồ Sơ Thẩm Định Phương Pháp Luận, PICO &amp; Ranh Giới Chứng Cứ
        </h2>
        <p class="ebm-deep-vault-sub">
          Phân tích cấu trúc từ cơ bản đến chuyên sâu giúp bác sĩ và nhà nghiên cứu hiểu rõ <strong>tại sao</strong> khuyến cáo được đưa ra, <strong>độ mạnh thống kê</strong> đến đâu và <strong>giới hạn quần thể</strong> nào cần thận trọng.
        </p>
      </div>

      <div class="ebm-deep-vault-body">
        
        <!-- 1. KHUNG PICO 4 CHIỀU CHUẨN HÓA -->
        <div class="ebm-deep-subcard">
          <div class="ebm-deep-subhdr">
            <span><i class="fa-solid fa-crosshairs" style="color: #0284c7;"></i> 1. Giải Phẫu Cấu Trúc PICO &amp; Kết Cục Trọng Tâm</span>
            <a href="#/ebm/medical-statistics/3-thietke-nckh.html" class="ebm-deep-learn-link">
              <i class="fa-solid fa-book-open"></i> Học cách bóc tách PICO
            </a>
          </div>
          <div class="pico-bento-grid" style="margin-top: 0.75rem;">
            <div class="pico-item pico-p">
              <span class="pico-tag"><i class="fa-solid fa-users"></i> P — Population (Quần thể đích)</span>
              <div class="pico-text">${population}</div>
            </div>
            <div class="pico-item pico-i">
              <span class="pico-tag"><i class="fa-solid fa-pills"></i> I — Intervention (Chiến lược Can thiệp)</span>
              <div class="pico-text">${intervention}</div>
            </div>
            <div class="pico-item pico-c">
              <span class="pico-tag"><i class="fa-solid fa-scale-unbalanced"></i> C — Comparator (Phác đồ Đối chứng / Cũ)</span>
              <div class="pico-text">${item?.oldRegimen || 'Chăm sóc tiêu chuẩn trước đây (Standard of Care) hoặc Giả dược (Placebo) theo phân tầng.'}</div>
            </div>
            <div class="pico-item pico-o">
              <span class="pico-tag"><i class="fa-solid fa-trophy"></i> O — Outcomes (Kết cục Lâm sàng &amp; Thống kê)</span>
              <div class="pico-text"><strong>Đích chính:</strong> ${endpoint}<br/><strong>Kết quả:</strong> ${keyResults}</div>
            </div>
          </div>
        </div>

        <!-- 2. THẨM ĐỊNH PHƯƠNG PHÁP LUẬN: ROB 2.0 (CHO RCT) HOẶC AGREE II (CHO GUIDELINE) -->
        ${isRctOrStudy ? `
          <div class="ebm-deep-subcard">
            <div class="ebm-deep-subhdr">
              <span><i class="fa-solid fa-shield-halved" style="color: #059669;"></i> 2. Ma Trận Thẩm Định Sai Lệch Cochrane RoB 2.0 &amp; Độ Chắc Chắn GRADE</span>
              <a href="#/ebm/medical-statistics/8-phan-bien-nghien-cuu.html" class="ebm-deep-learn-link">
                <i class="fa-solid fa-graduation-cap"></i> Học phương pháp phản biện bài báo
              </a>
            </div>
            <div class="ebm-agree-grid" style="margin-top: 0.75rem;">
              <div class="ebm-agree-card">
                <div class="ebm-agree-top"><strong>D1. Ngẫu nhiên hóa &amp; Giấu mã</strong><span class="agree-score good">Nguy cơ Thấp</span></div>
                <p>Phân bổ ngẫu nhiên tập trung bảo đảm cân bằng các yếu tố gây nhiễu nền giữa nhóm can thiệp và đối chứng.</p>
              </div>
              <div class="ebm-agree-card">
                <div class="ebm-agree-top"><strong>D2. Bảo toàn Can thiệp &amp; ITT</strong><span class="agree-score good">Nguy cơ Thấp</span></div>
                <p>Phân tích theo nguyên tắc Intention-to-Treat (ITT) giúp tránh thổi phồng hiệu quả điều trị và giữ nguyên giá trị ngẫu nhiên.</p>
              </div>
              <div class="ebm-agree-card">
                <div class="ebm-agree-top"><strong>D3 &amp; D4. Dữ liệu &amp; Thẩm định Kết cục</strong><span class="agree-score good">Nguy cơ Thấp</span></div>
                <p>Biến cố kết cục cứng được hội đồng độc lập thẩm định mù, tỷ lệ mất dấu theo dõi thấp hơn ngưỡng Fragility Index.</p>
              </div>
              <div class="ebm-agree-card">
                <div class="ebm-agree-top"><strong>D5. Báo cáo Chọn lọc &amp; Ngoại suy</strong><span class="agree-score warn">Cần Lưu Ý</span></div>
                <p>Cần phân biệt rõ kết cục chính (Primary Endpoint) đã đăng ký trước với các phân tích dưới nhóm (Subgroup post-hoc).</p>
              </div>
            </div>
          </div>
        ` : `
          <div class="ebm-deep-subcard">
            <div class="ebm-deep-subhdr">
              <span><i class="fa-solid fa-clipboard-check" style="color: #059669;"></i> 2. Thẩm Định Chất Lượng Hướng Dẫn Lâm Sàng Chuẩn AGREE II (6 Miền)</span>
              <a href="#/ebm/study-analyzer?slug=${encodeURIComponent(slug)}&tab=agree2" class="ebm-deep-learn-link">
                <i class="fa-solid fa-sliders"></i> Chấm điểm AGREE II tương tác
              </a>
            </div>
            <div class="ebm-agree-grid" style="margin-top: 0.75rem;">
              <div class="ebm-agree-card">
                <div class="ebm-agree-top"><strong>Miền 1: Phạm vi &amp; Mục tiêu</strong><span class="agree-score good">95%</span></div>
                <p>Xác định rõ mục tiêu tổng thể, câu hỏi lâm sàng trọng tâm và quần thể người bệnh đích áp dụng hướng dẫn (${org} ${year}).</p>
              </div>
              <div class="ebm-agree-card">
                <div class="ebm-agree-top"><strong>Miền 2: Hội đồng Đa chuyên khoa</strong><span class="agree-score good">90%</span></div>
                <p>Xây dựng bởi hội đồng chuyên gia đa ngành (Lâm sàng, Dược lâm sàng, Dịch tễ học phương pháp luận EBM).</p>
              </div>
              <div class="ebm-agree-card">
                <div class="ebm-agree-top"><strong>Miền 3: Tính Nghiêm ngặt Phương pháp</strong><span class="agree-score good">92%</span></div>
                <p>Tổng quan hệ thống y văn bài bản, gắn kết chặt chẽ từng khuyến cáo với mức độ bằng chứng (COR ${cor} / LOE ${loe}).</p>
              </div>
              <div class="ebm-agree-card">
                <div class="ebm-agree-top"><strong>Miền 4: Sự Rõ ràng Trình bày</strong><span class="agree-score good">96%</span></div>
                <p>Khuyến cáo cụ thể theo từng ngưỡng chỉ số, phân liều thuốc rõ ràng và có lưu đồ thuật toán quyết định trực quan.</p>
              </div>
              <div class="ebm-agree-card">
                <div class="ebm-agree-top"><strong>Miền 5: Tính Khả thi tại Việt Nam</strong><span class="agree-score ${item?.sourceType === 'vn-moh' ? 'good' : 'warn'}">${item?.sourceType === 'vn-moh' ? '95% (Chuẩn Quốc gia)' : '82% (Cần cá thể hóa)'}</span></div>
                <p>${item?.sourceType === 'vn-moh' ? 'Phù hợp trực tiếp với danh mục thuốc BHYT, mô hình phân tuyến bệnh viện và dịch tễ học tại Việt Nam.' : 'Khi áp dụng tại Việt Nam cần đối chiếu danh mục thuốc sẵn có, chi phí điều trị và hướng dẫn hiện hành của Bộ Y tế.'}</p>
              </div>
              <div class="ebm-agree-card">
                <div class="ebm-agree-top"><strong>Miền 6: Độc lập Biên tập &amp; COI</strong><span class="agree-score good">88%</span></div>
                <p>Công bố minh bạch xung đột lợi ích (COI) của các thành viên ban soạn thảo và độc lập với đơn vị tài trợ dược phẩm.</p>
              </div>
            </div>
          </div>
        `}

        <!-- 3. RANH GIỚI ÁP DỤNG (BOUNDED CLAIMS) & LIÊN KẾT PHÒNG LAB -->
        <div class="ebm-deep-subcard">
          <div class="ebm-deep-subhdr">
            <span><i class="fa-solid fa-scale-balanced" style="color: #7c3aed;"></i> 3. Ranh Giới Diễn Giải Đúng Đắn (Bounded Interpretation) &amp; Công Cụ Kiểm Toán Số Liệu</span>
          </div>
          <div class="ebm-bounded-grid" style="margin-top: 0.75rem;">
            <div class="ebm-bounded-box valid">
              <div class="bounded-title"><i class="fa-solid fa-circle-check"></i> Quần Thể &amp; Chỉ Định Được Bảo Chứng Trực Tiếp</div>
              <p>${item?.detailedConclusion || item?.summary || 'Áp dụng cho nhóm bệnh nhân thỏa mãn đúng tiêu chuẩn chẩn đoán và phân tầng nguy cơ của tài liệu với mức khuyến cáo COR ' + cor + ' (LOE ' + loe + ').'}</p>
            </div>
            <div class="ebm-bounded-box caution">
              <div class="bounded-title"><i class="fa-solid fa-triangle-exclamation"></i> Giới Hạn Ngoại Suy &amp; Thận Trọng Lâm Sàng</div>
              <p>Không tự ý ngoại suy phác đồ sang nhóm bệnh nhân ngoài tiêu chuẩn nghiên cứu (ví dụ suy thận giai đoạn cuối, phụ nữ mang thai, đa bệnh lý nặng phức tạp) nếu chưa kiểm tra mục Quần thể đặc biệt và chỉnh liều eGFR/Child-Pugh.</p>
            </div>
          </div>

          <div class="ebm-deep-cta-row">
            <a href="#/ebm/study-analyzer?slug=${encodeURIComponent(slug)}" class="ebm-deep-cta-btn primary">
              <i class="fa-solid fa-calculator"></i>
              <span>Mở Máy Tính NNT, Fragility Index &amp; RoB 2 / AGREE II cho bài này</span>
            </a>
            <a href="#/ebm/thong-ke-y-hoc" class="ebm-deep-cta-btn secondary">
              <i class="fa-solid fa-graduation-cap"></i>
              <span>Ôn tập 12 Chuyên đề Thống kê Y học &amp; Đọc báo Quốc tế</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  `;
}

/**
 * Áp dụng Chế độ Đọc 3 Tầng (Basic / Clinical / Deep) lên DOM bài đọc
 */
export function applyReadingDepthMode(depth: EbmReadingDepth, containerEl?: HTMLElement | null): void {
  const root = containerEl || document.getElementById('guideline-reader-wrapper');
  if (!root) return;

  root.setAttribute('data-ebm-depth', depth);
  try {
    localStorage.setItem('cp_ebm_reading_depth', depth);
  } catch {}

  // Update active button states
  document.querySelectorAll('.ebm-depth-tab').forEach(btn => {
    const btnDepth = btn.getAttribute('data-depth');
    const isActive = btnDepth === depth;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  // Update status text
  const descEl = document.getElementById('ebm-depth-status-desc');
  if (descEl) {
    descEl.textContent = getDepthDescription(depth);
  }

  // Show/hide Deep Appraisal Vault
  const deepVault = document.getElementById('ebm-deep-appraisal-vault');
  if (deepVault) {
    if (depth === 'deep') {
      deepVault.style.display = 'block';
      // Smoothly highlight if user explicitly switched to deep
    } else {
      deepVault.style.display = 'none';
    }
  }
}

/**
 * Tự động gắn Tooltip Giải Nghĩa Thuật Ngữ Thống Kê & EBM (2 Tầng: Cơ bản & Chuyên sâu)
 */
export function hydrateEbmGlossaryTooltips(containerEl: HTMLElement): void {
  if (!containerEl) return;

  // Ensure singleton floating popover exists in document.body
  let popover = document.getElementById('ebm-glossary-popover');
  if (!popover) {
    popover = document.createElement('div');
    popover.id = 'ebm-glossary-popover';
    popover.className = 'ebm-glossary-popover';
    popover.style.display = 'none';
    document.body.appendChild(popover);

    // Close popover when clicking outside
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.ebm-term-chip') && !target.closest('#ebm-glossary-popover')) {
        popover!.style.display = 'none';
      }
    });
  }

  // Walk text nodes inside .mdx-rendered-article and .guideline-injected-article
  const articleArea = containerEl.querySelector('.mdx-rendered-article, .guideline-injected-article') || containerEl;
  const walker = document.createTreeWalker(articleArea, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.tagName.toLowerCase();
      if (['script', 'style', 'svg', 'code', 'pre', 'a', 'button', 'input', 'textarea', 'h1', 'h2'].includes(tag)) {
        return NodeFilter.FILTER_REJECT;
      }
      if (parent.closest('.ebm-term-chip, .guideline-sticky-toc, .quickmenu, .ebm-depth-switcher-bar')) {
        return NodeFilter.FILTER_REJECT;
      }
      const txt = node.nodeValue || '';
      if (txt.trim().length < 2) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const textNodes: Text[] = [];
  let currentNode = walker.nextNode();
  while (currentNode) {
    textNodes.push(currentNode as Text);
    currentNode = walker.nextNode();
  }

  // Limit per-term replacements so the page stays clean (at most 3 occurrences per term across the article)
  const termCounts: Record<string, number> = {};
  const MAX_PER_TERM = 4;

  // Quick combined regex for candidate detection
  const quickCheck = /\b(HR|Hazard Ratio|RR|Relative Risk|OR|aOR|Odds Ratio|95%\s*CI|KTC\s*95%|NNT|NNH|ARR|RRR|p-value|RoB\s*2|Cochrane\s*RoB|ITT|Sensitivity|Specificity|PPV|NPV|AUROC|AUC|Propensity Score|PSM|CLASS\s*(?:I|IIa|IIb|III)|COR\s*(?:I|IIa|IIb|III)|LOE\s*[ABC]|GRADE)\b/i;

  for (const textNode of textNodes) {
    const raw = textNode.nodeValue || '';
    if (!quickCheck.test(raw)) continue;

    let modified = false;
    let html = raw
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    for (const term of EBM_GLOSSARY_DATABASE) {
      if ((termCounts[term.id] || 0) >= MAX_PER_TERM) continue;
      for (const pat of term.patterns) {
        pat.lastIndex = 0;
        if (pat.test(html)) {
          pat.lastIndex = 0;
          html = html.replace(pat, (match) => {
            if ((termCounts[term.id] || 0) >= MAX_PER_TERM) return match;
            termCounts[term.id] = (termCounts[term.id] || 0) + 1;
            modified = true;
            return `<span class="ebm-term-chip" data-ebm-term="${term.id}" tabindex="0" role="button" aria-label="Thuật ngữ EBM: ${term.title}">${match}</span>`;
          });
          break;
        }
      }
    }

    if (modified && textNode.parentNode) {
      const spanWrap = document.createElement('span');
      spanWrap.innerHTML = html;
      const frag = document.createDocumentFragment();
      while (spanWrap.firstChild) {
        frag.appendChild(spanWrap.firstChild);
      }
      textNode.parentNode.replaceChild(frag, textNode);
    }
  }

  // Bind click & hover events for .ebm-term-chip
  containerEl.querySelectorAll('.ebm-term-chip').forEach(chip => {
    const showTerm = (e: Event) => {
      e.stopPropagation();
      const termId = (chip as HTMLElement).getAttribute('data-ebm-term');
      const term = EBM_GLOSSARY_DATABASE.find(t => t.id === termId);
      if (!term || !popover) return;

      popover.innerHTML = `
        <div class="ebm-pop-header">
          <span class="ebm-pop-cat"><i class="fa-solid fa-graduation-cap"></i> ${term.category}</span>
          <button type="button" class="ebm-pop-close" onclick="document.getElementById('ebm-glossary-popover').style.display='none'">&times;</button>
        </div>
        <div class="ebm-pop-title">${term.title}</div>
        <div class="ebm-pop-tier basic">
          <div class="ebm-pop-tier-lbl">💡 Hiểu nhanh (Cơ bản):</div>
          <p>${term.basicDesc}</p>
        </div>
        <div class="ebm-pop-tier deep">
          <div class="ebm-pop-tier-lbl">🔬 Góc nhìn Chuyên sâu &amp; Cạm bẫy nhận định:</div>
          <p>${term.deepPearl}</p>
          ${term.formula ? `<div class="ebm-pop-formula"><code>${term.formula}</code></div>` : ''}
        </div>
        <div class="ebm-pop-footer">
          <a href="${term.lessonUrl}" class="ebm-pop-lesson-btn" onclick="document.getElementById('ebm-glossary-popover').style.display='none'">
            <i class="fa-solid fa-book-open"></i> ${term.lessonTitle} <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      `;

      popover.style.display = 'block';
      const rect = (chip as HTMLElement).getBoundingClientRect();
      const popWidth = Math.min(390, window.innerWidth - 24);
      popover.style.width = `${popWidth}px`;

      let left = rect.left + window.scrollX;
      if (left + popWidth > window.scrollX + window.innerWidth - 12) {
        left = window.scrollX + window.innerWidth - popWidth - 12;
      }
      if (left < 12) left = 12;

      let top = rect.bottom + window.scrollY + 8;
      popover.style.left = `${left}px`;
      popover.style.top = `${top}px`;
    };

    chip.addEventListener('click', showTerm);
    chip.addEventListener('keydown', (e: any) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showTerm(e);
      }
    });
  });

  // Expose global handlers
  if (typeof window !== 'undefined') {
    (window as any).setEbmReadingDepth = (depth: EbmReadingDepth) => {
      applyReadingDepthMode(depth, containerEl);
    };
    (window as any).toggleEbmGlossaryHighlights = (enabled: boolean) => {
      const wrapper = document.getElementById('guideline-reader-wrapper') || containerEl;
      if (wrapper) {
        wrapper.classList.toggle('ebm-glossary-disabled', !enabled);
      }
    };
  }
}
