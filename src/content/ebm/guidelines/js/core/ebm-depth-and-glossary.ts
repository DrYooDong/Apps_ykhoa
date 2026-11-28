/**
 * CliniPortal — EBM Interactive Statistical Glossary Engine
 * Path: src/content/ebm/guidelines/js/core/ebm-depth-and-glossary.ts
 *
 * Cung cấp:
 * - Hệ thống Tooltip Giải Nghĩa Thuật Ngữ Thống Kê & EBM Tại Chỗ (2 Tầng: Cơ bản & Chuyên sâu + Liên kết 12 bài Thống kê Y học)
 */

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
      if (parent.closest('.ebm-term-chip, .guideline-sticky-toc, .quickmenu')) {
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
}
