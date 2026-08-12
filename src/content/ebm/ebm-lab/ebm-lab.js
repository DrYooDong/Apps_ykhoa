/* ============================================================
   EBM PRACTICE LAB — INTERACTIVE LOGIC
   Location: src/content/ebm/EBM Lab/ebm-lab.js
============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  initTabs();
  initPicoBuilder();
  initMultiDesignAppraisal();
  initEbmCalculators();
});

/* ── TAB SWITCHING ── */
function initTabs() {
  const tabBtns = document.querySelectorAll(".lab-tab-btn");
  const panels = document.querySelectorAll(".lab-panel");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetPanel = btn.getAttribute("data-tab");

      tabBtns.forEach((b) => b.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(`panel-${targetPanel}`).classList.add("active");
    });
  });
}

/* ── 1. PICO BUILDER LOGIC (EBM OUTCOME EXTRACTOR) ── */
function initPicoBuilder() {
  const pInput = document.getElementById("pico-p");
  const iInput = document.getElementById("pico-i");
  const cInput = document.getElementById("pico-c");
  const oHidden = document.getElementById("pico-o");

  const oCategory = document.getElementById("pico-o-category");
  const oMetric = document.getElementById("pico-o-metric");
  const oName = document.getElementById("pico-o-name");
  const oVal = document.getElementById("pico-o-val");
  const oLow = document.getElementById("pico-o-low");
  const oHigh = document.getElementById("pico-o-high");
  const btnAddOutcome = document.getElementById("btn-add-outcome");
  const outcomeList = document.getElementById("pico-outcome-list");

  const qPreview = document.getElementById("pico-question-preview");
  const searchString = document.getElementById("pico-search-string");
  const btnCopy = document.getElementById("btn-copy-pico");
  const btnExportForest = document.getElementById("btn-export-forest");

  let outcomes = [
    { name: "Tử vong do nguyên nhân tim mạch (CV Death)", category: "primary", metric: "HR", val: 0.62, low: 0.49, high: 0.77 },
    { name: "3-point MACE (Tử vong TM, MI, Đột quỵ)", category: "composite", metric: "HR", val: 0.86, low: 0.74, high: 0.99 },
    { name: "Giảm chỉ số HbA1c (%)", category: "surrogate", metric: "MD", val: -0.60, low: -0.72, high: -0.48 },
    { name: "Biến cố hạ đường huyết nặng", category: "safety", metric: "OR", val: 0.95, low: 0.80, high: 1.12 }
  ];

  // Load saved PICO Draft (including outcomes)
  const savedPico = localStorage.getItem("cliniportal_pico_draft");
  if (savedPico) {
    try {
      const data = JSON.parse(savedPico);
      if (pInput && data.p) pInput.value = data.p;
      if (iInput && data.i) iInput.value = data.i;
      if (cInput && data.c) cInput.value = data.c;
      if (Array.isArray(data.outcomes) && data.outcomes.length > 0) {
        outcomes = data.outcomes;
      }
    } catch (e) {
      console.warn("Could not load PICO draft:", e);
    }
  }

  function savePicoDraft() {
    localStorage.setItem(
      "cliniportal_pico_draft",
      JSON.stringify({
        p: pInput ? pInput.value : "",
        i: iInput ? iInput.value : "",
        c: cInput ? cInput.value : "",
        outcomes: outcomes
      })
    );
  }

  function renderOutcomes() {
    if (!outcomeList) return;
    outcomeList.innerHTML = "";

    const catBadgeMap = {
      primary: { label: "🎯 Primary Hard", bg: "#dcfce7", color: "#166534" },
      composite: { label: "🧩 Composite", bg: "#f3e8ff", color: "#6b21a8" },
      surrogate: { label: "🧪 Surrogate", bg: "#e0f2fe", color: "#075985" },
      safety: { label: "⚠️ Safety", bg: "#fef3c7", color: "#92400e" }
    };

    outcomes.forEach((item, idx) => {
      const badge = catBadgeMap[item.category] || catBadgeMap.primary;
      const row = document.createElement("div");
      row.style.cssText = "display: flex; align-items: center; justify-content: space-between; background: var(--ebm-surface, #fff); padding: 0.5rem 0.75rem; border-radius: 8px; border: 1px solid var(--ebm-border, #e2e8f0); font-size: 0.82rem; gap: 0.5rem; flex-wrap: wrap;";
      
      const statText = item.val ? `${item.metric || 'HR'}: ${item.val} (${item.low || '?'}-${item.high || '?'})` : '';
      const isRatio = ["HR", "OR", "RR"].includes(item.metric);

      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; flex: 1;">
          <span style="background: ${badge.bg}; color: ${badge.color}; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 6px; font-size: 0.75rem;">${badge.label}</span>
          <strong style="color: var(--ebm-text, #0f172a);">${item.name}</strong>
          ${statText ? `<span style="font-family: 'JetBrains Mono', monospace; color: var(--ebm-primary-dark, #0369a1); font-weight: 600;">[${statText}]</span>` : ''}
        </div>
        <div style="display: flex; align-items: center; gap: 0.4rem;">
          ${isRatio && item.val ? `<button type="button" class="btn-calc-nnt" data-idx="${idx}" style="background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 6px; cursor: pointer;"><i class="fa-solid fa-calculator"></i> Tính NNT</button>` : ''}
          <button type="button" class="btn-del-outcome" data-idx="${idx}" style="background: transparent; border: none; color: #ef4444; cursor: pointer; font-size: 0.9rem; padding: 0.2rem 0.4rem;">&times;</button>
        </div>
      `;
      outcomeList.appendChild(row);
    });

    // Update hidden field value for legacy compatibility
    const outcomeSummary = outcomes.map(o => o.name).join(", ");
    if (oHidden) oHidden.value = outcomeSummary;

    // Add delete listeners
    document.querySelectorAll(".btn-del-outcome").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.target.getAttribute("data-idx"));
        outcomes.splice(idx, 1);
        renderOutcomes();
        updatePicoOutput();
        savePicoDraft();
      });
    });

    // Add NNT transfer listeners
    document.querySelectorAll(".btn-calc-nnt").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.target.getAttribute("data-idx"));
        const item = outcomes[idx];
        if (!item || !item.val) return;

        // Assume baseline Control Event Rate (CER) = 15% if not set
        const cer = 15.0;
        const ratio = item.val;
        const eer = parseFloat((cer * ratio).toFixed(1));

        const cerInp = document.getElementById("calc-cer");
        const eerInp = document.getElementById("calc-eer");
        if (cerInp) cerInp.value = cer;
        if (eerInp) eerInp.value = eer;

        // Switch to Tab 3 (NNT)
        const tabBtns = document.querySelectorAll(".lab-tab-btn");
        const panels = document.querySelectorAll(".lab-panel");
        tabBtns.forEach((b) => b.classList.remove("active"));
        panels.forEach((p) => p.classList.remove("active"));

        const nntTabBtn = document.querySelector('.lab-tab-btn[data-tab="nnt"]');
        const nntPanel = document.getElementById("panel-nnt");
        if (nntTabBtn) nntTabBtn.classList.add("active");
        if (nntPanel) nntPanel.classList.add("active");

        // Trigger NNT recalculation
        if (typeof window.updateNntCalculation === "function") {
          window.updateNntCalculation();
        } else {
          const event = new Event("input");
          if (cerInp) cerInp.dispatchEvent(event);
        }

        // Smooth scroll to NNT section
        if (nntPanel) {
          nntPanel.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  if (btnAddOutcome) {
    btnAddOutcome.addEventListener("click", () => {
      const name = oName.value.trim();
      if (!name) return;

      outcomes.push({
        name: name,
        category: oCategory.value,
        metric: oMetric.value,
        val: parseFloat(oVal.value) || null,
        low: parseFloat(oLow.value) || null,
        high: parseFloat(oHigh.value) || null
      });

      oName.value = "";
      oVal.value = "";
      oLow.value = "";
      oHigh.value = "";

      renderOutcomes();
      updatePicoOutput();
      savePicoDraft();
    });
  }

  function updatePicoOutput() {
    const p = pInput.value.trim() || "[Đối tượng bệnh nhân]";
    const i = iInput.value.trim() || "[Biện pháp can thiệp]";
    const c = cInput.value.trim() || "[Biện pháp so sánh]";
    const oStr = outcomes.length > 0 ? outcomes.map(o => o.name).join("; ") : "[Các kết cục lâm sàng]";

    // Build Natural Language Question
    qPreview.innerHTML = `Ở bệnh nhân <strong style="color: var(--ebm-primary-dark);">${p}</strong>, việc sử dụng <strong style="color: #06b6d4;">${i}</strong> so với <strong style="color: var(--ebm-purple);">${c}</strong> có cải thiện <strong style="color: var(--ebm-success);">${oStr}</strong> hay không?`;

    // Build PubMed Search String
    const meshP = pInput.value.trim() ? `(${pInput.value.trim()}[Title/Abstract] OR "${pInput.value.trim()}"[MeSH Terms])` : "";
    const meshI = iInput.value.trim() ? `(${iInput.value.trim()}[Title/Abstract] OR "${iInput.value.trim()}"[MeSH Terms])` : "";
    const meshC = cInput.value.trim() ? `(${cInput.value.trim()}[Title/Abstract])` : "";
    const meshO = outcomes.length > 0 ? `(${outcomes.map(o => `"${o.name}"[Title/Abstract]`).join(" OR ")})` : "";

    const parts = [meshP, meshI, meshC, meshO].filter(Boolean);
    const query = parts.length > 0 ? parts.join(" AND ") : "Nhập thông tin PICO phía trên để tạo chuỗi tìm kiếm...";

    searchString.textContent = query;
  }

  [pInput, iInput, cInput].forEach((el) => {
    if (el) {
      el.addEventListener("input", () => {
        updatePicoOutput();
        savePicoDraft();
      });
    }
  });

  if (btnCopy) {
    btnCopy.addEventListener("click", () => {
      navigator.clipboard.writeText(searchString.textContent).then(() => {
        const origText = btnCopy.innerHTML;
        btnCopy.innerHTML = `<i class="fa-solid fa-check"></i> Đã sao chép!`;
        setTimeout(() => (btnCopy.innerHTML = origText), 2000);
      });
    });
  }

  if (btnExportForest) {
    btnExportForest.addEventListener("click", () => {
      const payload = {
        title: `${iInput.value.trim() || 'Biện pháp Can thiệp'} vs ${cInput.value.trim() || 'Biện pháp So sánh'}`,
        intervention: iInput.value.trim() || 'Can thiệp',
        comparator: cInput.value.trim() || 'Đối chứng',
        outcomes: outcomes
      };
      sessionStorage.setItem("forestPlotData", JSON.stringify(payload));
      window.location.href = "forest-plot.html";
    });
  }

  renderOutcomes();
  updatePicoOutput();
}

/* ── 2. MULTI-DESIGN CRITICAL APPRAISAL ENGINE & SVG RADAR CHART ── */
function initMultiDesignAppraisal() {
  const container = document.getElementById("appraisal-questions-container");
  const typeHeader = document.getElementById("appraisal-type-header");
  const scoreVal = document.getElementById("casp-score-value");
  const riskBadge = document.getElementById("casp-risk-badge");
  const pills = document.querySelectorAll(".study-type-pill");
  const btnReset = document.getElementById("btn-reset-appraisal");

  if (!container) return;

  const domainNames = [
    "Mẫu & Ngẫu nhiên",
    "Làm mù & Can thiệp",
    "Theo dõi & Đầy đủ",
    "Đo lường Kết cục",
    "Nhiễu & Khả thi"
  ];

  const schemas = {
    rct: {
      title: "CASP Randomised Controlled Trial (RCT) Checklist",
      subtitle: "Bộ 11 tiêu chí chuẩn quốc tế cho nghiên cứu thử nghiệm lâm sàng ngẫu nhiên có đối chứng",
      maxScore: 11,
      items: [
        { id: "rct_1", domainIdx: 0, q: "Nghiên cứu có đặt ra câu hỏi lâm sàng rõ ràng và cụ thể (PICO) không?", hint: "Đối tượng bệnh nhân, biện pháp can thiệp, nhóm so sánh và kết cục cần được xác định trước." },
        { id: "rct_2", domainIdx: 0, q: "Phân bố bệnh nhân vào các nhóm có ngẫu nhiên hóa (Randomization) và giấu mã bí mật không?", hint: "Kiểm tra phương pháp tạo chuỗi ngẫu nhiên (máy tính) và giấu mã phân bổ (Allocation Concealment)." },
        { id: "rct_3", domainIdx: 2, q: "Tất cả bệnh nhân có được theo dõi đầy đủ đến cuối cùng và phân tích Intent-to-treat (ITT) không?", hint: "Mất theo dõi (Loss to follow-up) nên < 20% và phải phân tích theo ý định điều trị ban đầu." },
        { id: "rct_4", domainIdx: 1, q: "Bệnh nhân, bác sĩ và người đánh giá kết cục có được 'làm mù' (Blinding) đúng cách không?", hint: "Xem xét nghiên cứu là mù đơn, mù đôi (Double-blind) hay mù ba (Triple-blind)." },
        { id: "rct_5", domainIdx: 0, q: "Các nhóm bệnh nhân có tương đồng nhau tại thời điểm ban đầu (Baseline Features) không?", hint: "Tuổi, giới, mức độ nặng bệnh lý và các đặc điểm lâm sàng 2 nhóm phải cân bằng." },
        { id: "rct_6", domainIdx: 1, q: "Ngoài can thiệp nghiên cứu, các nhóm có được chăm sóc y tế hoàn toàn giống nhau không?", hint: "Tránh trường hợp một nhóm được dùng thêm các thuốc ngoài phác đồ (Co-interventions)." },
        { id: "rct_7", domainIdx: 3, q: "Hiệu quả điều trị được báo cáo đầy đủ (ARR, RRR, NNT/NNH) không?", hint: "Có báo cáo đầy đủ giảm nguy cơ tuyệt đối (ARR) và số bệnh nhân cần điều trị (NNT) hay chỉ có p-value?" },
        { id: "rct_8", domainIdx: 3, q: "Ước tính hiệu quả điều trị có chính xác không (Khoảng tin cậy 95% CI hẹp)?", hint: "Khoảng tin cậy 95% CI của Hazard Ratio (HR) hay Relative Risk (RR) không quá rộng." },
        { id: "rct_9", domainIdx: 4, q: "Kết quả nghiên cứu có thể áp dụng được cho bệnh nhân thực tế tại địa phương không?", hint: "Đặc điểm bệnh nhân địa phương có khác biệt lớn so với đối tượng trong thử nghiệm không?" },
        { id: "rct_10", domainIdx: 3, q: "Tất cả các kết cục lâm sàng quan trọng (kể cả tác dụng phụ) có được xem xét không?", hint: "Bao gồm cả kết cục cứng (Tử vong, MACE) và tác dụng không mong muốn." },
        { id: "rct_11", domainIdx: 4, q: "Lợi ích mang lại từ can thiệp có vượt trội so với tác hại và chi phí không?", hint: "Cân nhắc giữa hiệu quả lâm sàng thu được với nguy cơ tác dụng phụ và chi phí điều trị." }
      ]
    },
    sr: {
      title: "CASP Systematic Review & Meta-Analysis Checklist",
      subtitle: "Bộ 10 tiêu chí thẩm định tổng quan hệ thống và phân tích gộp",
      maxScore: 10,
      items: [
        { id: "sr_1", domainIdx: 0, q: "Tổng quan hệ thống có đặt ra câu hỏi PICO rõ ràng và cụ thể không?", hint: "Tiêu chuẩn nhận vào và loại trừ bài báo phải được định nghĩa rõ ràng." },
        { id: "sr_2", domainIdx: 0, q: "Tác giả có tìm kiếm đúng loại thiết kế nghiên cứu phù hợp không?", hint: "Ví dụ: Tìm kiếm RCT cho can thiệp điều trị, Cohort cho yếu tố nguy cơ/tiên lượng." },
        { id: "sr_3", domainIdx: 0, q: "Chiến lược tìm kiếm có toàn diện (bao gồm các cơ sở dữ liệu lớn và y văn xám) không?", hint: "Tìm trên PubMed, EMBASE, Cochrane, ClinicalTrials.gov và không bị giới hạn ngôn ngữ." },
        { id: "sr_4", domainIdx: 1, q: "Chất lượng các nghiên cứu đưa vào có được đánh giá độc lập bởi ít nhất 2 nghiên cứu viên không?", hint: "Sử dụng công cụ thẩm định chuẩn (Cochrane RoB 2, ROBINS-I) và có chỉ số đồng thuận." },
        { id: "sr_5", domainIdx: 4, q: "Nếu gộp kết quả (Meta-analysis), việc tổng hợp định lượng có hợp lý không (Tính dị biệt I²)?", hint: "Kiểm tra chỉ số dị biệt I² (I² > 50% là dị biệt cao) và mô hình Fixed vs. Random effects." },
        { id: "sr_6", domainIdx: 3, q: "Kết quả tổng hợp chung (Pooled Estimate) và Forest Plot có được trình bày rõ ràng không?", hint: "Hình thoi hiệu quả gộp (Pooled Diamond) và khoảng tin cậy 95% CI được hiển thị đầy đủ." },
        { id: "sr_7", domainIdx: 3, q: "Ước tính hiệu quả gộp có độ chính xác cao (95% CI hẹp) không?", hint: "Khoảng tin cậy gộp không quá rộng và xác định được ý nghĩa lâm sàng." },
        { id: "sr_8", domainIdx: 4, q: "Kết quả tổng quan có thể áp dụng cho bệnh nhân địa phương không?", hint: "Bệnh nhân của bạn có tương đồng với quần thể trong các nghiên cứu gộp không?" },
        { id: "sr_9", domainIdx: 3, q: "Tất cả các kết cục lâm sàng quan trọng có được đánh giá không?", hint: "Đánh giá đầy đủ cả biến cố chính, phụ và an toàn." },
        { id: "sr_10", domainIdx: 4, q: "Lợi ích từ khuyến cáo có vượt trội so với tác hại và chi phí không?", hint: "Xem xét tổng thể bức tranh lợi ích - nguy cơ dựa trên bằng chứng gộp." }
      ]
    },
    quadas: {
      title: "QUADAS-2 Diagnostic Accuracy Study Checklist",
      subtitle: "Thẩm định chất lượng và nguy cơ sai số nghiên cứu giá trị xét nghiệm / chẩn đoán",
      maxScore: 11,
      items: [
        { id: "qd_1", domainIdx: 0, q: "[Patient Selection] Bệnh nhân có được chọn mẫu liên tục (Consecutive) hoặc ngẫu nhiên không?", hint: "Tránh chọn mẫu thiên vị hoặc thiết kế bệnh-chứng (Case-Control) bị cấm trong QUADAS-2." },
        { id: "qd_2", domainIdx: 0, q: "[Patient Selection] Nghiên cứu có tránh loại trừ bệnh nhân không phù hợp không?", hint: "Tránh loại bỏ các trường hợp khó chẩn đoán hoặc kết quả xét nghiệm lấp lửng." },
        { id: "qd_3", domainIdx: 1, q: "[Index Test] Kết quả xét nghiệm thử nghiệm (Index Test) có được đọc độc lập với Tiêu chuẩn vàng không?", hint: "Người đọc kết quả xét nghiệm không được biết trước kết quả tiêu chuẩn vàng (Blinding)." },
        { id: "qd_4", domainIdx: 1, q: "[Index Test] Điểm cắt (Cut-off threshold) xét nghiệm có được xác định từ trước không?", hint: "Tránh chọn điểm cắt sau khi đã thấy dữ liệu để thổi phồng độ nhạy/độ đặc hiệu." },
        { id: "qd_5", domainIdx: 2, q: "[Reference Standard] Tiêu chuẩn vàng (Reference Standard) có phân loại đúng bệnh không?", hint: "Tiêu chuẩn chẩn đoán chuẩn mực (Giải phẫu bệnh, Sinh thiết, Theo dõi lâm sàng dài hạn)." },
        { id: "qd_6", domainIdx: 2, q: "[Reference Standard] Tiêu chuẩn vàng có được giải mã độc lập với xét nghiệm thử nghiệm không?", hint: "Người đánh giá tiêu chuẩn vàng không biết kết quả của Index Test." },
        { id: "qd_7", domainIdx: 2, q: "[Flow & Timing] Khoảng thời gian giữa Xét nghiệm và Tiêu chuẩn vàng có hợp lý không?", hint: "Tránh khoảng thời gian quá dài khiến diễn tiến bệnh bị thay đổi." },
        { id: "qd_8", domainIdx: 2, q: "[Flow & Timing] Tất cả bệnh nhân có được làm Tiêu chuẩn vàng không (Avoid Verification Bias)?", hint: "Tránh chỉ làm tiêu chuẩn vàng cho người có xét nghiệm dương tính." },
        { id: "qd_9", domainIdx: 2, q: "[Flow & Timing] Tất cả bệnh nhân có cùng nhận một loại Tiêu chuẩn vàng không?", hint: "Tránh trường hợp nhóm dương tính nhận tiêu chuẩn A, nhóm âm tính nhận tiêu chuẩn B." },
        { id: "qd_10", domainIdx: 3, q: "[Flow & Timing] Tất cả bệnh nhân tham gia có được đưa vào phân tích cuối cùng không?", hint: "Báo cáo đầy đủ số ca không rõ kết quả hoặc bị loại bỏ." },
        { id: "qd_11", domainIdx: 3, q: "Nghiên cứu có báo cáo đầy đủ Độ nhạy (Sens), Độ đặc hiệu (Spec), PPV, NPV, LR+, LR- không?", hint: "Các chỉ số chẩn đoán và khoảng tin cậy 95% CI được trình bày rõ ràng." }
      ]
    },
    cohort: {
      title: "STROBE / CASP Observational Cohort Study Checklist",
      subtitle: "Thẩm định chất lượng nghiên cứu quan sát theo dõi dọc (Cohort Study)",
      maxScore: 12,
      items: [
        { id: "ch_1", domainIdx: 0, q: "Nghiên cứu có đặt ra câu hỏi nghiên cứu quan sát rõ ràng không?", hint: "Quần thể nghiên cứu, yếu tố phơi nhiễm (Exposure) và kết cục được xác định rõ." },
        { id: "ch_2", domainIdx: 0, q: "Mẫu nghiên cứu (Cohort) có được tuyển chọn đại diện cho quần thể đích không?", hint: "Nhóm phơi nhiễm và không phơi nhiễm được chọn từ cùng một quần thể ban đầu." },
        { id: "ch_3", domainIdx: 1, q: "Yếu tố phơi nhiễm (Exposure) có được đo lường chính xác để giảm thiểu sai số không?", hint: "Sử dụng tiêu chuẩn đo lường khách quan (Xét nghiệm, Tiêu chuẩn lâm sàng)." },
        { id: "ch_4", domainIdx: 3, q: "Biến cố kết cục (Outcome) có được đo lường chính xác và khách quan không?", hint: "Đánh giá kết cục có được làm mù với tình trạng phơi nhiễm không?" },
        { id: "ch_5", domainIdx: 4, q: "Các tác giả có xác định đầy đủ các yếu tố gây nhiễu (Confounding Factors) quan trọng không?", hint: "Tuổi, bệnh kèm, chỉ số sinh hoạt có được liệt kê đầy đủ ban đầu." },
        { id: "ch_6", domainIdx: 4, q: "Các yếu tố gây nhiễu có được kiểm soát tốt trong thiết kế và phân tích thống kê không?", hint: "Sử dụng các phương pháp Ghép cặp (Matching), Phân tầng (Stratification) hoặc Hồi quy Cox/Logistic." },
        { id: "ch_7", domainIdx: 2, q: "Thời gian theo dõi (Follow-up) có đủ dài để biến cố xuất hiện không?", hint: "Thời gian theo dõi phải phù hợp với diễn tiến tự nhiên của bệnh." },
        { id: "ch_8", domainIdx: 2, q: "Tỷ lệ mất theo dõi (Loss to follow-up) có thấp và được báo cáo đầy đủ không?", hint: "Mất theo dõi < 20% và so sánh đặc điểm giữa nhóm còn lại với nhóm mất theo dõi." },
        { id: "ch_9", domainIdx: 3, q: "Hiệu quả / Nguy cơ được báo cáo đầy đủ (RR, HR, Hazard Ratio) không?", hint: "Trình bày Tỷ cơ nguy cơ (Relative Risk) hoặc Tỷ số nguy cơ (Hazard Ratio) điều chỉnh." },
        { id: "ch_10", domainIdx: 3, q: "Ước tính nguy cơ có độ chính xác cao (95% CI hẹp) không?", hint: "Khoảng tin cậy 95% CI không quá rộng và không chứa giá trị 1.0 (nếu có ý nghĩa)." },
        { id: "ch_11", domainIdx: 4, q: "Mối quan hệ nguyên nhân - kết quả có đáng tin cậy (Tiêu chuẩn Bradford Hill) không?", hint: "Thứ tự thời gian phơi nhiễm trước kết cục, mối quan hệ liều - đáp ứng." },
        { id: "ch_12", domainIdx: 4, q: "Kết quả nghiên cứu có thể áp dụng cho bệnh nhân địa phương không?", hint: "Sự tương đồng về đặc điểm sinh học và môi trường sống của bệnh nhân." }
      ]
    }
  };

  let currentType = "rct";
  let userState = { rct: {}, sr: {}, quadas: {}, cohort: {} };

  // Load state from localStorage
  const saved = localStorage.getItem("cliniportal_appraisal_drafts");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === "object") {
        userState = { ...userState, ...parsed };
      }
    } catch (e) {
      console.warn("Could not load appraisal draft:", e);
    }
  }

  function saveState() {
    localStorage.setItem("cliniportal_appraisal_drafts", JSON.stringify(userState));
  }

  // Switch study type
  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");

      currentType = pill.getAttribute("data-type") || "rct";
      renderAppraisalWorkspace();
    });
  });

  if (btnReset) {
    btnReset.addEventListener("click", () => {
      userState[currentType] = {};
      saveState();
      renderAppraisalWorkspace();
    });
  }

  function renderAppraisalWorkspace() {
    const schema = schemas[currentType] || schemas.rct;
    const currentAnswers = userState[currentType] || {};

    // 1. Render Header
    typeHeader.innerHTML = `
      <div style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: var(--ebm-purple); margin-bottom: 0.2rem;">Bộ Thẩm Định Chuẩn Quốc Tế</div>
      <h3 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.15rem; font-weight: 800; color: var(--ebm-text); margin: 0 0 0.25rem 0;">${schema.title}</h3>
      <p style="font-size: 0.84rem; color: var(--ebm-text-muted); margin: 0; line-height: 1.45;">${schema.subtitle}</p>
    `;

    // 2. Render Questions
    container.innerHTML = "";
    schema.items.forEach((item, idx) => {
      const answeredVal = currentAnswers[item.id] || "";

      const qCard = document.createElement("div");
      qCard.className = "casp-item";
      qCard.innerHTML = `
        <div class="casp-num">${idx + 1}</div>
        <div class="casp-content">
          <div class="casp-q">${item.q}</div>
          <div class="casp-hint">💡 Xem xét: ${item.hint}</div>
          <div class="casp-options">
            <label class="casp-radio-label yes ${answeredVal === 'yes' ? 'selected' : ''}">
              <input type="radio" name="appraisal-${item.id}" value="yes" ${answeredVal === 'yes' ? 'checked' : ''}>
              <span>Có (Yes)</span>
            </label>
            <label class="casp-radio-label cant ${answeredVal === 'cant' ? 'selected' : ''}">
              <input type="radio" name="appraisal-${item.id}" value="cant" ${answeredVal === 'cant' ? 'checked' : ''}>
              <span>Chưa rõ</span>
            </label>
            <label class="casp-radio-label no ${answeredVal === 'no' ? 'selected' : ''}">
              <input type="radio" name="appraisal-${item.id}" value="no" ${answeredVal === 'no' ? 'checked' : ''}>
              <span>Không (No)</span>
            </label>
          </div>
        </div>
      `;

      // Attach Radio listeners
      const radios = qCard.querySelectorAll('input[type="radio"]');
      radios.forEach((r) => {
        r.addEventListener("change", (e) => {
          if (!userState[currentType]) userState[currentType] = {};
          userState[currentType][item.id] = e.target.value;
          saveState();

          // Highlight selection visually
          qCard.querySelectorAll(".casp-radio-label").forEach((lbl) => lbl.classList.remove("selected"));
          r.closest(".casp-radio-label").classList.add("selected");

          updateAnalytics();
        });
      });

      container.appendChild(qCard);
    });

    // 3. Initial Analytics Update
    updateAnalytics();
  }

  function updateAnalytics() {
    const schema = schemas[currentType] || schemas.rct;
    const currentAnswers = userState[currentType] || {};

    let yesCount = 0;
    let noCount = 0;
    let cantCount = 0;
    let totalAnswered = 0;

    schema.items.forEach((item) => {
      const val = currentAnswers[item.id];
      if (val) {
        totalAnswered++;
        if (val === "yes") yesCount++;
        else if (val === "cant") cantCount++;
        else if (val === "no") noCount++;
      }
    });

    scoreVal.textContent = `${yesCount} / ${schema.maxScore}`;

    // Calculate Risk Status
    const ratio = yesCount / schema.maxScore;
    if (totalAnswered < Math.ceil(schema.maxScore / 3)) {
      riskBadge.className = "casp-score-badge mod-risk";
      riskBadge.innerHTML = `<i class="fa-solid fa-circle-info"></i> Đang đánh giá (${totalAnswered}/${schema.maxScore} câu)...`;
    } else if (ratio >= 0.75 && noCount <= 2) {
      riskBadge.className = "casp-score-badge low-risk";
      riskBadge.innerHTML = `<i class="fa-solid fa-shield-halved"></i> Sai số thấp (High Quality Study)`;
    } else if (ratio >= 0.50) {
      riskBadge.className = "casp-score-badge mod-risk";
      riskBadge.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Sai số trung bình (Moderate Quality)`;
    } else {
      riskBadge.className = "casp-score-badge high-risk";
      riskBadge.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Sai số cao / Chất lượng thấp (Low Quality)`;
    }

    // Calculate Domain Scores for Radar Chart (5 Domains)
    const domainScores = [0, 0, 0, 0, 0];
    const domainMaxes = [0, 0, 0, 0, 0];

    schema.items.forEach((item) => {
      const dIdx = item.domainIdx;
      domainMaxes[dIdx] += 1;

      const val = currentAnswers[item.id];
      if (val === "yes") domainScores[dIdx] += 1.0;
      else if (val === "cant") domainScores[dIdx] += 0.5;
      else if (val === "no") domainScores[dIdx] += 0.0;
    });

    const domainRatios = domainScores.map((score, idx) => {
      const max = domainMaxes[idx];
      return max > 0 ? score / max : 0.5;
    });

    renderRadarChart(domainRatios, domainNames);
  }

  // 4. SVG RADAR CHART RENDERER ENGINE
  function renderRadarChart(ratios, labels) {
    const svg = document.getElementById("appraisal-radar-svg");
    if (!svg) return;

    const cx = 150;
    const cy = 135;
    const radius = 72;
    const numAxes = 5;

    let html = "";

    // Defs: Gradients & Glow Filters
    html += `
      <defs>
        <linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0284c7" stop-opacity="0.5" />
          <stop offset="100%" stop-color="#7c3aed" stop-opacity="0.35" />
        </linearGradient>
        <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    `;

    // Concentric Web Grid (Level 20%, 40%, 60%, 80%, 100%)
    const levels = [0.2, 0.4, 0.6, 0.8, 1.0];
    levels.forEach((lvl) => {
      const points = [];
      for (let i = 0; i < numAxes; i++) {
        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / numAxes;
        const r = radius * lvl;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
      }
      html += `<polygon points="${points.join(" ")}" fill="none" stroke="var(--ebm-border, #cbd5e1)" stroke-width="${lvl === 1 ? '1.5' : '0.8'}" stroke-dasharray="${lvl === 1 ? 'none' : '3,3'}" />`;
    });

    // Axis Lines & Labels
    const labelPos = [];
    for (let i = 0; i < numAxes; i++) {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / numAxes;
      const x2 = cx + radius * Math.cos(angle);
      const y2 = cy + radius * Math.sin(angle);

      html += `<line x1="${cx}" y1="${cy}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="var(--ebm-border, #cbd5e1)" stroke-width="1" />`;

      // Label Positioning Offset
      const lx = cx + (radius + 22) * Math.cos(angle);
      const ly = cy + (radius + 16) * Math.sin(angle);
      labelPos.push({ x: lx, y: ly, angle: angle });
    }

    // User Data Polygon Points
    const dataPoints = [];
    const pointsArr = [];
    for (let i = 0; i < numAxes; i++) {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / numAxes;
      const r = radius * Math.max(0.1, ratios[i]); // Minimum 10% for visual clarity
      const px = cx + r * Math.cos(angle);
      const py = cy + r * Math.sin(angle);

      dataPoints.push(`${px.toFixed(1)},${py.toFixed(1)}`);
      pointsArr.push({ x: px, y: py, ratio: ratios[i] });
    }

    // Render Data Filled Polygon & Border Line
    html += `<polygon points="${dataPoints.join(" ")}" fill="url(#radarGrad)" stroke="#0284c7" stroke-width="2.5" filter="url(#radarGlow)" style="transition: all 400ms ease-out;" />`;

    // Render Glowing Data Points
    pointsArr.forEach((pt) => {
      html += `<circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="4.5" fill="#ffffff" stroke="#7c3aed" stroke-width="2.5" style="transition: all 400ms ease-out;" />`;
    });

    // Render Axis Labels
    labels.forEach((lbl, i) => {
      const pos = labelPos[i];
      let textAnchor = "middle";
      if (Math.abs(Math.cos(pos.angle)) > 0.3) {
        textAnchor = Math.cos(pos.angle) > 0 ? "start" : "end";
      }

      const scorePct = Math.round(ratios[i] * 100);
      html += `
        <text x="${pos.x.toFixed(1)}" y="${pos.y.toFixed(1)}" text-anchor="${textAnchor}" fill="var(--ebm-text, #0f172a)" font-size="10" font-weight="700" font-family="'Plus Jakarta Sans', sans-serif">
          ${lbl}
          <tspan x="${pos.x.toFixed(1)}" dy="11" fill="var(--ebm-primary-dark, #0369a1)" font-size="9" font-weight="800">${scorePct}%</tspan>
        </text>
      `;
    });

    svg.innerHTML = html;
  }

  // Initial render
  renderAppraisalWorkspace();
}

/* ── 3. EBM CALCULATOR SUITE (NNT/ARR & DIAGNOSTIC FAGAN NOMOGRAM) ── */
function initEbmCalculators() {
  initNntCalculator();
  initDiagnosticCalculator();

  // Subtab switching logic
  const subtabBtns = document.querySelectorAll(".calc-subtab-btn");
  const subpanels = document.querySelectorAll(".calc-subpanel");

  subtabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-subtab");
      subtabBtns.forEach((b) => b.classList.remove("active"));
      subpanels.forEach((p) => p.classList.remove("active"));

      btn.classList.add("active");
      const targetEl = document.getElementById(`subpanel-${target}`);
      if (targetEl) targetEl.classList.add("active");

      // Re-trigger calculation & SVG rendering on switch
      if (target === "diagnostic" && typeof window.updateDiagnosticCalculation === "function") {
        window.updateDiagnosticCalculation();
      }
    });
  });
}

function initNntCalculator() {
  const inputCer = document.getElementById("calc-cer"); // Control Event Rate (%)
  const inputEer = document.getElementById("calc-eer"); // Experimental Event Rate (%)

  const valArr = document.getElementById("metric-arr");
  const valRrr = document.getElementById("metric-rrr");
  const valNnt = document.getElementById("metric-nnt");
  const valOr = document.getElementById("metric-or");

  const iconGrid = document.getElementById("icon-array-grid");
  const iconText = document.getElementById("icon-array-text");

  function calculateNnt() {
    if (!inputCer || !inputEer) return;
    let cer = parseFloat(inputCer.value);
    let eer = parseFloat(inputEer.value);

    if (isNaN(cer)) cer = 20;
    if (isNaN(eer)) eer = 12;

    const arr = Math.abs(cer - eer); // Absolute Risk Reduction (%)
    const rrr = cer > 0 ? ((cer - eer) / cer) * 100 : 0; // Relative Risk Reduction (%)
    const nnt = arr > 0 ? Math.ceil(100 / arr) : 0; // Number Needed to Treat

    // Odd Ratio approximation for events
    const oddsControl = cer / (100 - cer);
    const oddsExp = eer / (100 - eer);
    const oddsRatio = oddsControl > 0 ? (oddsExp / oddsControl).toFixed(2) : "--";

    if (valArr) valArr.textContent = `${arr.toFixed(1)}%`;
    if (valRrr) valRrr.textContent = `${rrr.toFixed(1)}%`;
    if (valNnt) valNnt.textContent = nnt > 0 ? nnt : "∞";
    if (valOr) valOr.textContent = oddsRatio;

    // Render 100 Icon Array Visual
    renderIconArray(cer, eer, arr, nnt);
  }

  function renderIconArray(cer, eer, arr, nnt) {
    if (!iconGrid) return;
    iconGrid.innerHTML = "";

    const numSaved = Math.round(arr); // How many out of 100 are saved by drug
    const numEventExp = Math.round(eer); // How many still have event despite drug

    for (let i = 0; i < 100; i++) {
      const icon = document.createElement("div");
      icon.className = "person-icon";

      if (i < numSaved) {
        icon.classList.add("saved");
        icon.innerHTML = `<i class="fa-solid fa-heart-pulse"></i>`;
        icon.title = "Được cứu nhờ can thiệp điều trị";
      } else if (i < numSaved + numEventExp) {
        icon.classList.add("event");
        icon.innerHTML = `<i class="fa-solid fa-user-xmark"></i>`;
        icon.title = "Vẫn xảy ra biến cố";
      } else {
        icon.classList.add("unaffected");
        icon.innerHTML = `<i class="fa-solid fa-user"></i>`;
        icon.title = "Không xảy ra biến cố";
      }

      iconGrid.appendChild(icon);
    }

    if (iconText) {
      iconText.innerHTML = `Điều trị <strong>100</strong> bệnh nhân sẽ giúp cứu được <strong style="color: var(--ebm-success);">${numSaved} người</strong> khỏi biến cố (NNT = <strong>${nnt}</strong>).`;
    }
  }

  [inputCer, inputEer].forEach((input) => {
    if (input) input.addEventListener("input", calculateNnt);
  });

  window.updateNntCalculation = calculateNnt;
  calculateNnt();
}

function initDiagnosticCalculator() {
  const inpTp = document.getElementById("diag-tp");
  const inpFp = document.getElementById("diag-fp");
  const inpFn = document.getElementById("diag-fn");
  const inpTn = document.getElementById("diag-tn");

  const inpPretestRange = document.getElementById("diag-pretest-range");
  const inpPretest = document.getElementById("diag-pretest");

  const valSens = document.getElementById("diag-sens");
  const valSpec = document.getElementById("diag-spec");
  const valLrPlus = document.getElementById("diag-lr-plus");
  const valLrMinus = document.getElementById("diag-lr-minus");
  const valPostPos = document.getElementById("diag-post-pos");
  const valPostNeg = document.getElementById("diag-post-neg");

  const presetBtns = document.querySelectorAll(".btn-preset-sm");

  const presets = {
    troponin: { tp: 85, fp: 15, fn: 10, tn: 90, pretest: 30 }, // Troponin I cho NMI
    ddimer: { tp: 95, fp: 35, fn: 5, tn: 65, pretest: 20 },   // d-Dimer cho PE
    bnp: { tp: 90, fp: 25, fn: 10, tn: 75, pretest: 40 }      // NT-proBNP cho Suy tim
  };

  presetBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-preset");
      const data = presets[key];
      if (data) {
        if (inpTp) inpTp.value = data.tp;
        if (inpFp) inpFp.value = data.fp;
        if (inpFn) inpFn.value = data.fn;
        if (inpTn) inpTn.value = data.tn;
        if (inpPretest) inpPretest.value = data.pretest;
        if (inpPretestRange) inpPretestRange.value = data.pretest;
        updateDiagnosticCalculation();
      }
    });
  });

  // Sync range slider & number input for pre-test probability
  if (inpPretestRange && inpPretest) {
    inpPretestRange.addEventListener("input", () => {
      inpPretest.value = inpPretestRange.value;
      updateDiagnosticCalculation();
    });
    inpPretest.addEventListener("input", () => {
      let v = parseFloat(inpPretest.value);
      if (isNaN(v)) v = 30;
      inpPretestRange.value = Math.min(99, Math.max(1, v));
      updateDiagnosticCalculation();
    });
  }

  [inpTp, inpFp, inpFn, inpTn].forEach((el) => {
    if (el) el.addEventListener("input", updateDiagnosticCalculation);
  });

  function updateDiagnosticCalculation() {
    let tp = parseFloat(inpTp ? inpTp.value : 80) || 0;
    let fp = parseFloat(inpFp ? inpFp.value : 20) || 0;
    let fn = parseFloat(inpFn ? inpFn.value : 10) || 0;
    let tn = parseFloat(inpTn ? inpTn.value : 90) || 0;
    let preProbPct = parseFloat(inpPretest ? inpPretest.value : 30) || 30;

    // Guard against zero division
    const sens = (tp + fn) > 0 ? (tp / (tp + fn)) : 0.5;
    const spec = (tn + fp) > 0 ? (tn / (tn + fp)) : 0.5;

    const lrPlus = (1 - spec) > 0 ? (sens / (1 - spec)) : 999;
    const lrMinus = spec > 0 ? ((1 - sens) / spec) : 0.001;

    // Bayes Calculation for Post-test Probabilities
    const preProb = Math.min(0.999, Math.max(0.001, preProbPct / 100));
    const preOdds = preProb / (1 - preProb);

    // Positive Test Outcome
    const postOddsPos = preOdds * lrPlus;
    const postProbPosPct = (postOddsPos / (1 + postOddsPos)) * 100;

    // Negative Test Outcome
    const postOddsNeg = preOdds * lrMinus;
    const postProbNegPct = (postOddsNeg / (1 + postOddsNeg)) * 100;

    // Update UI elements
    if (valSens) valSens.textContent = `${(sens * 100).toFixed(1)}%`;
    if (valSpec) valSpec.textContent = `${(spec * 100).toFixed(1)}%`;
    if (valLrPlus) valLrPlus.textContent = lrPlus >= 100 ? ">100" : lrPlus.toFixed(2);
    if (valLrMinus) valLrMinus.textContent = lrMinus.toFixed(2);
    if (valPostPos) valPostPos.textContent = `${postProbPosPct.toFixed(1)}%`;
    if (valPostNeg) valPostNeg.textContent = `${postProbNegPct.toFixed(1)}%`;

    // Render SVG Fagan Nomogram
    renderFaganNomogram(preProbPct, lrPlus, lrMinus, postProbPosPct, postProbNegPct);
  }

  // Initial calculation trigger
  window.updateDiagnosticCalculation = updateDiagnosticCalculation;
  updateDiagnosticCalculation();
}

/* ── SVG FAGAN NOMOGRAM RENDERER ENGINE ── */
function renderFaganNomogram(prePct, lrPlus, lrMinus, postPosPct, postNegPct) {
  const svg = document.getElementById("fagan-nomogram-svg");
  if (!svg) return;

  const width = 380;
  const height = 420;
  const topY = 45;
  const botY = 375;
  const axisH = botY - topY;

  // 3 Vertical Axis X Coordinates
  const xPre = 65;
  const xLr = 190;
  const xPost = 315;

  // Logit scale mapping for Probabilities (0.1% to 99.9%)
  const minLogit = Math.log(0.001 / 0.999); // ~ -6.9
  const maxLogit = Math.log(0.999 / 0.001); // ~ 6.9

  function probToY(probPct) {
    const p = Math.min(99.9, Math.max(0.1, probPct)) / 100;
    const logit = Math.log(p / (1 - p));
    const ratio = (logit - maxLogit) / (minLogit - maxLogit); // Invert so 99.9% is at top, 0.1% is at bottom
    return topY + Math.min(axisH, Math.max(0, ratio * axisH));
  }

  // Log scale mapping for Likelihood Ratio (0.001 to 1000)
  const minLrLog = Math.log10(0.001); // -3
  const maxLrLog = Math.log10(1000);  // 3

  function lrToY(lr) {
    const val = Math.min(1000, Math.max(0.001, lr));
    const logVal = Math.log10(val);
    const ratio = (maxLrLog - logVal) / (maxLrLog - minLrLog); // 1000 at top, 0.001 at bottom
    return topY + Math.min(axisH, Math.max(0, ratio * axisH));
  }

  let html = "";

  // Background card styling & defs
  html += `
    <defs>
      <filter id="faganGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
  `;

  // Draw 3 Vertical Axis Lines
  html += `<line x1="${xPre}" y1="${topY}" x2="${xPre}" y2="${botY}" stroke="var(--ebm-border, #94a3b8)" stroke-width="2" />`;
  html += `<line x1="${xLr}" y1="${topY}" x2="${xLr}" y2="${botY}" stroke="var(--ebm-border, #94a3b8)" stroke-width="2" />`;
  html += `<line x1="${xPost}" y1="${topY}" x2="${xPost}" y2="${botY}" stroke="var(--ebm-border, #94a3b8)" stroke-width="2" />`;

  // Draw Axis Headers
  html += `<text x="${xPre}" y="${topY - 16}" text-anchor="middle" fill="var(--ebm-text)" font-size="10.5" font-weight="800" font-family="'Plus Jakarta Sans', sans-serif">Pre-test %</text>`;
  html += `<text x="${xLr}" y="${topY - 16}" text-anchor="middle" fill="var(--ebm-text)" font-size="10.5" font-weight="800" font-family="'Plus Jakarta Sans', sans-serif">Tỷ số LR</text>`;
  html += `<text x="${xPost}" y="${topY - 16}" text-anchor="middle" fill="var(--ebm-text)" font-size="10.5" font-weight="800" font-family="'Plus Jakarta Sans', sans-serif">Post-test %</text>`;

  // Draw Tick Marks for Pre & Post Probabilities
  const probTicks = [99, 95, 90, 80, 70, 50, 30, 20, 10, 5, 1, 0.1];
  probTicks.forEach((p) => {
    const y = probToY(p);
    // Pre-test ticks
    html += `<line x1="${xPre - 4}" y1="${y}" x2="${xPre + 4}" y2="${y}" stroke="var(--ebm-border, #94a3b8)" stroke-width="1" />`;
    html += `<text x="${xPre - 7}" y="${y + 3}" text-anchor="end" fill="var(--ebm-text-muted, #64748b)" font-size="8.5" font-weight="600">${p}%</text>`;

    // Post-test ticks
    html += `<line x1="${xPost - 4}" y1="${y}" x2="${xPost + 4}" y2="${y}" stroke="var(--ebm-border, #94a3b8)" stroke-width="1" />`;
    html += `<text x="${xPost + 7}" y="${y + 3}" text-anchor="start" fill="var(--ebm-text-muted, #64748b)" font-size="8.5" font-weight="600">${p}%</text>`;
  });

  // Draw Tick Marks for Likelihood Ratio
  const lrTicks = [1000, 100, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.01, 0.001];
  lrTicks.forEach((lr) => {
    const y = lrToY(lr);
    html += `<line x1="${xLr - 4}" y1="${y}" x2="${xLr + 4}" y2="${y}" stroke="var(--ebm-border, #94a3b8)" stroke-width="1" />`;
    html += `<text x="${xLr + 7}" y="${y + 3}" text-anchor="start" fill="var(--ebm-text-muted, #64748b)" font-size="8" font-weight="600">${lr}</text>`;
  });

  // Calculate Y coordinates for current calculation
  const yPre = probToY(prePct);
  const yLrPlus = lrToY(lrPlus);
  const yPostPos = probToY(postPosPct);

  const yLrMinus = lrToY(lrMinus);
  const yPostNeg = probToY(postNegPct);

  // Vector Line for Positive Test (Red)
  html += `<line x1="${xPre}" y1="${yPre}" x2="${xPost}" y2="${yPostPos}" stroke="#ef4444" stroke-width="2.5" filter="url(#faganGlow)" style="transition: all 300ms ease;" />`;
  html += `<circle cx="${xPre}" cy="${yPre}" r="4.5" fill="#ef4444" />`;
  html += `<circle cx="${xLr}" cy="${yLrPlus}" r="4.5" fill="#ef4444" />`;
  html += `<circle cx="${xPost}" cy="${yPostPos}" r="4.5" fill="#ef4444" />`;

  // Vector Line for Negative Test (Blue)
  html += `<line x1="${xPre}" y1="${yPre}" x2="${xPost}" y2="${yPostNeg}" stroke="#0284c7" stroke-width="2.5" stroke-dasharray="4,3" filter="url(#faganGlow)" style="transition: all 300ms ease;" />`;
  html += `<circle cx="${xLr}" cy="${yLrMinus}" r="4.5" fill="#0284c7" />`;
  html += `<circle cx="${xPost}" cy="${yPostNeg}" r="4.5" fill="#0284c7" />`;

  svg.innerHTML = html;
}

