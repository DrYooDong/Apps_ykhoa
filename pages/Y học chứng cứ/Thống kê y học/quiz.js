/* ============================================================
   EBM QUIZ ENGINE & SPACED REPETITION (SM-2 ALGORITHM)
   Location: pages/Y học chứng cứ/Thống kê y học/quiz.js
============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  initQuizEngine();
});

/* ── 16 HIGH-YIELD QUESTIONS FOR MEDICAL STATISTICS ── */
const EBM_QUESTIONS = [
  // Bài 1: Ý nghĩa thống kê & lâm sàng
  {
    id: "q1",
    lesson: 1,
    lessonTitle: "Bài 1: Ý nghĩa thống kê & lâm sàng",
    question: "Một thử nghiệm lâm sàng báo cáo p = 0.03 cho sự khác biệt tử vong giữa 2 nhóm thuốc. Điều này có ý nghĩa gì?",
    options: [
      "Thuốc thử nghiệm làm giảm 3% nguy cơ tử vong.",
      "Xác suất kết quả này xảy ra do ngẫu nhiên nếu thuốc KHÔNG có hiệu quả là 3%.",
      "Thuốc thử nghiệm có 97% khả năng chữa khỏi bệnh.",
      "97% bệnh nhân trong nhóm thử nghiệm sống sót."
    ],
    answer: 1,
    explanation: "P-value (0.03 = 3%) là xác suất thu được kết quả như quan sát (hoặc cực đoan hơn) nếu giả thuyết Không (Null Hypothesis - thuốc không có tác dụng) là đúng."
  },
  {
    id: "q2",
    lesson: 1,
    lessonTitle: "Bài 1: Ý nghĩa thống kê & lâm sàng",
    question: "Tỷ lệ biến cố nhóm chứng CER = 20%, nhóm can thiệp EER = 15%. Tính NNT (Number Needed to Treat)?",
    options: ["5", "10", "20", "25"],
    answer: 2,
    explanation: "ARR = CER - EER = 20% - 15% = 5% (0.05). NNT = 1 / ARR = 1 / 0.05 = 20. Cần điều trị 20 bệnh nhân để ngăn chặn 1 biến cố."
  },
  {
    id: "q3",
    lesson: 1,
    lessonTitle: "Bài 1: Ý nghĩa thống kê & lâm sàng",
    question: "Thang điểm khoảng tin cậy 95% CI của Hazard Ratio (HR) là 0.85 (95% CI 0.72 - 0.99). Kết quả này có ý nghĩa thống kê không?",
    options: [
      "Có, vì khoảng tin cậy KHÔNG chứa giá trị 1.0.",
      "Không, vì khoảng tin cậy chứa giá trị 0.",
      "Không, vì giá trị cận trên gần sát 1.0.",
      "Chưa đủ dữ liệu để kết luận."
    ],
    answer: 0,
    explanation: "Đối với chỉ số tỷ lệ (HR, RR, OR), nếu khoảng tin cậy 95% không chứa giá trị 1.0 (ở đây 0.72 - 0.99 < 1.0) thì kết quả mang ý nghĩa thống kê với p < 0.05."
  },
  {
    id: "q4",
    lesson: 1,
    lessonTitle: "Bài 1: Ý nghĩa thống kê & lâm sàng",
    question: "Chỉ số RRR (Relative Risk Reduction - Giảm nguy cơ tương đối) có nhược điểm gì so với ARR?",
    options: [
      "RRR không thể tính toán được nếu cỡ mẫu nhỏ.",
      "RRR thường phóng đại hiệu quả lâm sàng khi tỷ lệ biến cố nền rất thấp.",
      "RRR luôn nhỏ hơn ARR.",
      "RRR chỉ áp dụng cho nghiên cứu quan sát."
    ],
    answer: 1,
    explanation: "Nếu CER = 0.2% và EER = 0.1%, RRR = 50% (nghe rất ấn tượng), nhưng ARR chỉ là 0.1% (NNT = 1000). RRR dễ gây hiểu nhầm nếu không kèm theo ARR."
  },

  // Bài 2: Công cụ chẩn đoán
  {
    id: "q5",
    lesson: 2,
    lessonTitle: "Bài 2: Đánh giá công cụ chẩn đoán",
    question: "Một xét nghiệm có độ nhạy (Sensitivity) = 98%. Mục đích sử dụng tốt nhất của xét nghiệm này là gì?",
    options: [
      "Xác nhận chắc chắn bệnh khi kết quả Dương tính.",
      "Loại trừ bệnh khi kết quả Âm tính (SnNOut).",
      "Thay thế hoàn toàn tiêu chuẩn vàng.",
      "Chẩn đoán phân biệt giai đoạn muộn."
    ],
    answer: 1,
    explanation: "Quy tắc SnNOut: High Sensitivity + Negative result = Rule OUT. Xét nghiệm độ nhạy cao rất ít âm tính giả, nên kết quả Âm tính giúp loại trừ bệnh an toàn."
  },
  {
    id: "q6",
    lesson: 2,
    lessonTitle: "Bài 2: Đánh giá công cụ chẩn đoán",
    question: "Đặc điểm nào đúng về Giá trị dự báo dương (PPV - Positive Predictive Value)?",
    options: [
      "PPV không phụ thuộc vào tỷ lệ mắc bệnh (Prevalence) trong quần thể.",
      "PPV tăng lên khi tỷ lệ mắc bệnh trong quần thể tăng lên.",
      "PPV giảm xuống khi độ đặc hiệu tăng lên.",
      "PPV bằng với độ nhạy của xét nghiệm."
    ],
    answer: 1,
    explanation: "PPV phụ thuộc mạnh vào tỷ lệ mắc bệnh (Prevalence). Cùng một xét nghiệm, khi áp dụng trên quần thể có nguy cơ mắc bệnh cao thì PPV sẽ cao hơn nhiều."
  },
  {
    id: "q7",
    lesson: 2,
    lessonTitle: "Bài 2: Đánh giá công cụ chẩn đoán",
    question: "Tỷ số khả dĩ dương (Likelihood Ratio Positive - LR+) = 10 có ý nghĩa gì?",
    options: [
      "Xét nghiệm tăng xác suất mắc bệnh sau xét nghiệm lên thêm khoảng 45%.",
      "Xét nghiệm không có giá trị chẩn đoán.",
      "Xét nghiệm giảm 10 lần xác suất mắc bệnh.",
      "Xét nghiệm có độ nhạy = 90%."
    ],
    answer: 0,
    explanation: "Theo quy tắc ngón tay cái: LR+ = 2 (+15%), LR+ = 5 (+30%), LR+ = 10 (+45% xác suất mắc bệnh sau xét nghiệm). LR+ > 10 là xét nghiệm chẩn đoán rất mạnh."
  },
  {
    id: "q8",
    lesson: 2,
    lessonTitle: "Bài 2: Đánh giá công cụ chẩn đoán",
    question: "Quy tắc SpPIn trong đánh giá xét nghiệm chẩn đoán có nghĩa là gì?",
    options: [
      "High Specificity + Positive result = Rule IN (Xác nhận bệnh).",
      "High Specificity + Positive result = Rule OUT.",
      "High Sensitivity + Positive result = Rule IN.",
      "Special Precision in Interpretation."
    ],
    answer: 0,
    explanation: "SpPIn: Specificity high + Positive test = Rule IN. Xét nghiệm độ đặc hiệu cao rất ít dương tính giả, nên nếu Dương tính thì khả năng cao là mắc bệnh thật."
  },

  // Bài 3: Thiết kế nghiên cứu
  {
    id: "q9",
    lesson: 3,
    lessonTitle: "Bài 3: Thiết kế nghiên cứu khoa học",
    question: "Thiết kế nghiên cứu nào đứng ở vị trí cao nhất trên Tháp Bằng Chứng (Evidence Pyramid)?",
    options: [
      "Thử nghiệm lâm sàng ngẫu nhiên có đối chứng (RCT)",
      "Tổng quan hệ thống và phân tích gộp (Systematic Review & Meta-Analysis)",
      "Nghiên cứu thuần tập tiến cứu (Prospective Cohort)",
      "Báo cáo loạt ca bệnh (Case Series)"
    ],
    answer: 1,
    explanation: "Systematic Review & Meta-Analysis các nghiên cứu RCT đứng ở đỉnh tháp bằng chứng, cung cấp bằng chứng có độ tin cậy cao nhất cho thực hành lâm sàng."
  },
  {
    id: "q10",
    lesson: 3,
    lessonTitle: "Bài 3: Thiết kế nghiên cứu khoa học",
    question: "Nghiên cứu bệnh-chứng (Case-Control Study) có ưu điểm cốt lõi nào?",
    options: [
      "Xác định chính xác tỷ lệ mới mắc (Incidence rate).",
      "Thích hợp nhất cho các bệnh hiếm hoặc có thời gian ủ bệnh rất dài.",
      "Không bao giờ bị sai số nhớ lại (Recall bias).",
      "Chứng minh mối quan hệ nguyên nhân - kết quả trực tiếp."
    ],
    answer: 1,
    explanation: "Nghiên cứu Bệnh-Chứng chọn nhóm đã mắc bệnh và nhóm không mắc bệnh rồi hồi cứu lại tiền sử tiếp xúc, cực kỳ tối ưu và tiết kiệm cho các bệnh hiếm."
  },
  {
    id: "q11",
    lesson: 3,
    lessonTitle: "Bài 3: Thiết kế nghiên cứu khoa học",
    question: "Sai số chọn lựa (Selection Bias) trong nghiên cứu thử nghiệm lâm sàng được kiểm soát tốt nhất bằng kỹ thuật nào?",
    options: [
      "Tăng cỡ mẫu lên gấp đôi.",
      "Phân bố ngẫu nhiên giấu mã (Randomization with Allocation Concealment).",
      "Làm mù người đọc kết quả.",
      "Phân tích hồi quy đa biến."
    ],
    answer: 1,
    explanation: "Phân bố ngẫu nhiên giấu mã giúp đảm bảo người nghiên cứu không thể can thiệp xếp bệnh nhân nhẹ vào nhóm can thiệp, triệt tiêu sai số chọn lựa ban đầu."
  },
  {
    id: "q12",
    lesson: 3,
    lessonTitle: "Bài 3: Thiết kế nghiên cứu khoa học",
    question: "Phân tích theo ý định điều trị (Intention-To-Treat - ITT) là gì?",
    options: [
      "Chỉ phân tích những bệnh nhân tuân thủ điều trị 100%.",
      "Phân tích tất cả bệnh nhân theo đúng nhóm được phân ngẫu nhiên ban đầu, dù họ có bỏ cuộc hay chuyển nhóm.",
      "Loại bỏ các bệnh nhân gặp tác dụng phụ nặng.",
      "Chuyển bệnh nhân không uống thuốc sang nhóm chứng."
    ],
    answer: 1,
    explanation: "ITT bảo tồn tính ngẫu nhiên hóa ban đầu và phản ánh thực tế lâm sàng (nơi bệnh nhân có thể không tuân thủ thuốc), tránh làm quá phóng đại hiệu quả can thiệp."
  },

  // Bài 4: Phân tích RCT & Meta-analysis
  {
    id: "q13",
    lesson: 4,
    lessonTitle: "Bài 4: Phân tích RCT & Meta-analysis",
    question: "Trong biểu đồ Forest Plot của phân tích gộp, hình vuông đại diện cho nghiên cứu đơn lẻ có kích thước phản ánh điều gì?",
    options: [
      "Năm xuất bản của nghiên cứu.",
      "Trọng số (Weight) của nghiên cứu, phụ thuộc vào cỡ mẫu và độ chính xác.",
      "Số tác giả tham gia nghiên cứu.",
      "Tỷ lệ tử vong trong nghiên cứu."
    ],
    answer: 1,
    explanation: "Kích thước hình vuông tỷ lệ thuận với trọng số (Weight) của nghiên cứu. Nghiên cứu cỡ mẫu càng lớn, khoảng tin cậy càng hẹp thì hình vuông càng to."
  },
  {
    id: "q14",
    lesson: 4,
    lessonTitle: "Bài 4: Phân tích RCT & Meta-analysis",
    question: "Chỉ số I² (I-squared) = 75% trong phân tích gộp có ý nghĩa gì?",
    options: [
      "Các nghiên cứu hoàn toàn đồng nhất.",
      "Mức độ tính dị biệt (Heterogeneity) giữa các nghiên cứu là rất cao.",
      "Kết quả phân tích gộp có 75% độ chính xác.",
      "Có 75% nghiên cứu mang kết quả dương tính."
    ],
    answer: 1,
    explanation: "I² đo lường phần trăm sự biến thiên giữa các nghiên cứu do tính dị biệt thật sự thay vì do ngẫu nhiên. I² > 50-75% được coi là dị biệt từ trung bình đến cao."
  },
  {
    id: "q15",
    lesson: 4,
    lessonTitle: "Bài 4: Phân tích RCT & Meta-analysis",
    question: "Hình thoi (Diamond) ở đáy biểu đồ Forest Plot đại diện cho chỉ số nào?",
    options: [
      "Nghiên cứu có cỡ mẫu lớn nhất.",
      "Ước tính hiệu quả gộp (Pooled Estimate) và khoảng tin cậy 95% của tổng hợp các nghiên cứu.",
      "Mức độ sai số lệch xuất bản (Publication bias).",
      "Nghiên cứu mới nhất."
    ],
    answer: 1,
    explanation: "Hình thoi thể hiện kết quả gộp: Tâm hình thoi là điểm ước tính hiệu quả chung (Pooled HR/OR), 2 đỉnh nhọn 2 bên biểu thị khoảng tin cậy 95% gộp."
  },
  {
    id: "q16",
    lesson: 4,
    lessonTitle: "Bài 4: Phân tích RCT & Meta-analysis",
    question: "Hệ thống GRADE đánh giá chất lượng bằng chứng phân loại thành mấy mức độ?",
    options: [
      "2 mức (Tốt / Kém)",
      "4 mức (Rất cao / Cao / Trung bình / Thấp - Very High, High, Moderate, Low)",
      "3 mức (A, B, C)",
      "5 mức (Level I -> V)"
    ],
    answer: 1,
    explanation: "GRADE phân loại chất lượng bằng chứng thành 4 mức: High (Cao), Moderate (Trung bình), Low (Thấp), Very Low (Rất thấp) dựa trên nguy cơ sai số, tính gián tiếp, dị biệt, không chính xác và lệch xuất bản."
  }
];

/* ── SM-2 SPACED REPETITION ENGINE ── */
class SM2Engine {
  static STORAGE_KEY = "cliniportal_ebm_sr_v1";

  static getData() {
    try {
      const json = localStorage.getItem(this.STORAGE_KEY);
      return json ? JSON.parse(json) : {};
    } catch (e) {
      return {};
    }
  }

  static saveData(data) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  /**
   * SM-2 Algorithm calculation
   * @param {number} quality 0..5 (0: Quên hoàn toàn, 3: Đúng nhưng khó, 4: Đúng tốt, 5: Rất dễ)
   * @param {object} item { repetitions, interval, easeFactor }
   */
  static processItem(quality, item = { repetitions: 0, interval: 1, easeFactor: 2.5 }) {
    let { repetitions, interval, easeFactor } = item;

    if (quality >= 3) {
      if (repetitions === 0) interval = 1;
      else if (repetitions === 1) interval = 6;
      else interval = Math.round(interval * easeFactor);

      repetitions += 1;
    } else {
      repetitions = 0;
      interval = 1;
    }

    // New Ease Factor calculation formula
    easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3;

    const nextDueDate = new Date();
    nextDueDate.setDate(nextDueDate.getDate() + interval);

    return {
      repetitions,
      interval,
      easeFactor,
      dueDate: nextDueDate.toISOString().split("T")[0],
      lastReviewed: new Date().toISOString().split("T")[0]
    };
  }
}

/* ── QUIZ APP CONTROLLER ── */
function initQuizEngine() {
  let currentQuestions = [...EBM_QUESTIONS];
  let currentIndex = 0;
  let score = 0;
  let srData = SM2Engine.getData();

  const elQuestion = document.getElementById("quiz-question-text");
  const elLesson = document.getElementById("quiz-lesson-tag");
  const elOptions = document.getElementById("quiz-options-container");
  const elExplanation = document.getElementById("quiz-explanation-box");
  const elProgress = document.getElementById("quiz-progress-text");
  const elProgressBar = document.getElementById("quiz-progress-bar-fill");
  const elScore = document.getElementById("quiz-score-badge");

  const modeBtnFlashcard = document.getElementById("mode-btn-flashcard");
  const modeBtnQuiz = document.getElementById("mode-btn-quiz");

  const panelQuiz = document.getElementById("quiz-play-container");
  const panelFlashcards = document.getElementById("flashcard-play-container");

  function renderQuestion() {
    if (currentIndex >= currentQuestions.length) {
      renderQuizComplete();
      return;
    }

    const q = currentQuestions[currentIndex];
    elQuestion.textContent = q.question;
    elLesson.textContent = q.lessonTitle;
    elExplanation.style.display = "none";
    elExplanation.innerHTML = "";

    elProgress.textContent = `Câu ${currentIndex + 1} / ${currentQuestions.length}`;
    const pct = Math.round(((currentIndex + 1) / currentQuestions.length) * 100);
    elProgressBar.style.width = `${pct}%`;

    elOptions.innerHTML = "";
    q.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "quiz-opt-btn";
      btn.innerHTML = `<span class="opt-letter">${String.fromCharCode(65 + idx)}</span> <span class="opt-text">${opt}</span>`;
      btn.addEventListener("click", () => handleSelectAnswer(idx, btn));
      elOptions.appendChild(btn);
    });
  }

  function handleSelectAnswer(selectedIdx, clickedBtn) {
    const q = currentQuestions[currentIndex];
    const allBtns = elOptions.querySelectorAll(".quiz-opt-btn");
    allBtns.forEach((b) => (b.disabled = true));

    const isCorrect = selectedIdx === q.answer;
    if (isCorrect) {
      score++;
      clickedBtn.classList.add("correct");
      elScore.textContent = `Điểm: ${score}`;
    } else {
      clickedBtn.classList.add("incorrect");
      allBtns[q.answer].classList.add("correct");
    }

    // Process SM-2 Rating
    const qualityRating = isCorrect ? 4 : 1;
    srData[q.id] = SM2Engine.processItem(qualityRating, srData[q.id]);
    SM2Engine.saveData(srData);

    // Show Explanation Box with SM-2 interval note
    const nextDays = srData[q.id].interval;
    elExplanation.innerHTML = `
      <div style="font-weight: 700; color: ${isCorrect ? "var(--ebm-success)" : "var(--ebm-danger)"}; margin-bottom: 0.4rem;">
        ${isCorrect ? '<i class="fa-solid fa-circle-check"></i> Chính xác!' : '<i class="fa-solid fa-circle-xmark"></i> Chưa đúng!'}
      </div>
      <div style="font-size: 0.88rem; color: var(--ebm-text); line-height: 1.5; margin-bottom: 0.75rem;">
        ${q.explanation}
      </div>
      <div style="font-size: 0.75rem; color: var(--ebm-text-muted); border-top: 1px dashed var(--ebm-border); padding-top: 0.4rem;">
        🧠 Thuật toán Spaced Repetition (SM-2): Sẽ nhắc lại câu này sau <strong>${nextDays} ngày</strong>.
      </div>
      <button class="btn-next-q" id="btn-next-question">Câu tiếp theo <i class="fa-solid fa-arrow-right"></i></button>
    `;
    elExplanation.style.display = "block";

    document.getElementById("btn-next-question").addEventListener("click", () => {
      currentIndex++;
      renderQuestion();
    });
  }

  function renderQuizComplete() {
    panelQuiz.innerHTML = `
      <div style="text-align: center; padding: 3rem 1.5rem;" class="lab-card">
        <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
        <h2 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.8rem; font-weight: 800; margin-bottom: 0.5rem;">Hoàn Thành Bài Kiểm Tra!</h2>
        <p style="color: var(--ebm-text-muted); margin-bottom: 1.5rem;">Bạn đã đạt <strong style="color: var(--ebm-primary); font-size: 1.3rem;">${score} / ${currentQuestions.length}</strong> câu đúng (${Math.round((score/currentQuestions.length)*100)}%).</p>
        <p style="font-size: 0.85rem; color: var(--ebm-text-muted); max-width: 500px; margin: 0 auto 2rem auto;">Thuật toán Spaced Repetition SM-2 đã cập nhật lịch ôn luyện cá nhân vào bộ nhớ thiết bị của bạn.</p>
        <button class="btn-next-q" onclick="window.location.reload()"><i class="fa-solid fa-rotate-right"></i> Làm Lại Quiz</button>
      </div>
    `;
  }

  /* ── 3D FLASHCARD RENDERER ── */
  function renderFlashcards() {
    if (!panelFlashcards) return;
    panelFlashcards.innerHTML = "";

    const cardWrapper = document.createElement("div");
    cardWrapper.className = "flashcard-grid";

    currentQuestions.forEach((q, idx) => {
      const card = document.createElement("div");
      card.className = "fc-card";
      card.innerHTML = `
        <div class="fc-inner">
          <div class="fc-front">
            <div class="fc-tag">${q.lessonTitle}</div>
            <div class="fc-question">${q.question}</div>
            <div class="fc-flip-hint"><i class="fa-solid fa-rotate"></i> Chạm để lật xem đáp án</div>
          </div>
          <div class="fc-back">
            <div class="fc-answer-title">Đáp án đúng: ${String.fromCharCode(65 + q.answer)}. ${q.options[q.answer]}</div>
            <div class="fc-explanation">${q.explanation}</div>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        card.classList.toggle("flipped");
      });

      cardWrapper.appendChild(card);
    });

    panelFlashcards.appendChild(cardWrapper);
  }

  if (modeBtnFlashcard && modeBtnQuiz) {
    modeBtnFlashcard.addEventListener("click", () => {
      modeBtnFlashcard.classList.add("active");
      modeBtnQuiz.classList.remove("active");
      panelQuiz.style.display = "none";
      panelFlashcards.style.display = "block";
      renderFlashcards();
    });

    modeBtnQuiz.addEventListener("click", () => {
      modeBtnQuiz.classList.add("active");
      modeBtnFlashcard.classList.remove("active");
      panelFlashcards.style.display = "none";
      panelQuiz.style.display = "block";
    });
  }

  renderQuestion();
}
