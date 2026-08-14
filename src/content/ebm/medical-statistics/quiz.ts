/**
 * EBM Quiz Engine & Spaced Repetition (SM-2 Algorithm)
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 * File: src/content/ebm/medical-statistics/quiz.ts
 */

export interface EbmQuizQuestion {
  id: string;
  lesson: number;
  lessonTitle: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface SM2CardState {
  repetitions: number;
  interval: number;
  easeFactor: number;
  dueDate: string;
}

export const EBM_QUESTIONS: EbmQuizQuestion[] = [
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
      "Xét nghiệm không làm thay đổi xác suất mắc bệnh.",
      "Bệnh nhân có 10% khả năng mắc bệnh.",
      "Tỷ lệ dương tính giả gấp 10 lần tỷ lệ dương tính thật."
    ],
    answer: 0,
    explanation: "Theo Nomogram Fagan: LR+ = 10 làm tăng xác suất sau xét nghiệm lên thêm khoảng 45% so với xác suất trước xét nghiệm."
  },
  {
    id: "q8",
    lesson: 3,
    lessonTitle: "Bài 3: Thử nghiệm ngẫu nhiên & Thước đo kết cục",
    question: "Nguyên tắc phân tích theo dự định ban đầu (Intention-to-Treat - ITT) có vai trò gì?",
    options: [
      "Chỉ phân tích những bệnh nhân tuân thủ điều trị 100%.",
      "Bảo tồn tính ngẫu nhiên ban đầu và tránh sai số do bỏ trị/mất dấu theo dõi.",
      "Loại bỏ các trường hợp gặp tác dụng phụ nặng ra khỏi kết quả.",
      "Tăng tối đa kích thước hiệu quả điều trị của thuốc."
    ],
    answer: 1,
    explanation: "ITT giữ nguyên tất cả bệnh nhân trong nhóm được phân ngẫu nhiên ban đầu (dù họ bỏ thuốc, chuyển nhóm hay ngừng điều trị), giúp phản ánh trung thực hiệu quả thực tế và bảo toàn tính ngẫu nhiên."
  }
];

export class EbmQuizEngine {
  private static STORAGE_KEY = "cliniportal_ebm_quiz_sm2";

  public static getCardStates(): Record<string, SM2CardState> {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  }

  public static saveCardState(cardId: string, state: SM2CardState): void {
    const all = this.getCardStates();
    all[cardId] = state;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all));
  }

  public static calculateSM2(current: SM2CardState | undefined, quality: number): SM2CardState {
    const prev = current || { repetitions: 0, interval: 1, easeFactor: 2.5, dueDate: new Date().toISOString() };
    let { repetitions, interval, easeFactor } = prev;

    if (quality >= 3) {
      if (repetitions === 0) interval = 1;
      else if (repetitions === 1) interval = 6;
      else interval = Math.round(interval * easeFactor);
      repetitions++;
    } else {
      repetitions = 0;
      interval = 1;
    }

    easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3;

    const dueDate = new Date(Date.now() + interval * 86400000).toISOString();
    return { repetitions, interval, easeFactor, dueDate };
  }

  public static init(): void {
    const container = document.getElementById("ebm-quiz-container");
    if (!container) return;

    let currentIdx = 0;
    const renderQuestion = () => {
      const q = EBM_QUESTIONS[currentIdx];
      if (!q) {
        container.innerHTML = `
          <div class="quiz-completed-box" style="text-align: center; padding: 2rem;">
            <h3>🎉 Đã hoàn thành toàn bộ câu hỏi trắc nghiệm!</h3>
            <p>Bạn đã hoàn thành phiên ôn tập thống kê y học theo phương pháp Spaced Repetition.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = `
        <div class="ebm-quiz-card" style="background: var(--color-surface); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--color-divider); margin: 1rem 0;">
          <div style="font-size: 0.8rem; color: var(--color-primary); font-weight: 700; margin-bottom: 0.5rem;">${q.lessonTitle} (${currentIdx + 1}/${EBM_QUESTIONS.length})</div>
          <h4 style="margin-top: 0; font-size: 1.05rem;">${q.question}</h4>
          <div class="quiz-options-list" style="display: flex; flex-direction: column; gap: 0.5rem; margin: 1rem 0;">
            ${q.options.map((opt, idx) => `
              <button class="btn-quiz-option" data-idx="${idx}" style="text-align: left; padding: 0.75rem 1rem; border-radius: 8px; border: 1px solid var(--color-divider); background: var(--color-surface-2); cursor: pointer; font-size: 0.9rem;">
                <strong>${String.fromCharCode(65 + idx)}.</strong> ${opt}
              </button>
            `).join('')}
          </div>
          <div class="quiz-feedback-area" style="display: none; padding: 1rem; border-radius: 8px; margin-top: 1rem;"></div>
        </div>
      `;

      const optionBtns = container.querySelectorAll(".btn-quiz-option");
      const feedback = container.querySelector(".quiz-feedback-area") as HTMLElement | null;

      optionBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          const chosenIdx = parseInt((btn as HTMLElement).dataset.idx || "-1", 10);
          const isCorrect = chosenIdx === q.answer;

          optionBtns.forEach((b, i) => {
            (b as HTMLButtonElement).disabled = true;
            if (i === q.answer) {
              (b as HTMLElement).style.background = "#dcfce7";
              (b as HTMLElement).style.borderColor = "#86efac";
              (b as HTMLElement).style.color = "#166534";
            } else if (i === chosenIdx && !isCorrect) {
              (b as HTMLElement).style.background = "#fee2e2";
              (b as HTMLElement).style.borderColor = "#fca5a5";
              (b as HTMLElement).style.color = "#991b1b";
            }
          });

          if (feedback) {
            feedback.style.display = "block";
            feedback.style.background = isCorrect ? "#f0fdf4" : "#fef2f2";
            feedback.style.border = `1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}`;
            feedback.innerHTML = `
              <strong>${isCorrect ? '✅ Chính xác!' : '❌ Chưa chính xác!'}</strong>
              <p style="margin: 0.5rem 0;">${q.explanation}</p>
              <button id="btn-next-q" style="margin-top: 0.5rem; background: var(--color-primary); color: #fff; border: none; padding: 0.4rem 1rem; border-radius: 6px; cursor: pointer; font-weight: 600;">Câu tiếp theo &rarr;</button>
            `;
            container.querySelector("#btn-next-q")?.addEventListener("click", () => {
              currentIdx++;
              renderQuestion();
            });
          }

          // Save SM-2 progress
          const currentStates = this.getCardStates();
          const newState = this.calculateSM2(currentStates[q.id], isCorrect ? 4 : 1);
          this.saveCardState(q.id, newState);
        });
      });
    };

    renderQuestion();
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => EbmQuizEngine.init());
  } else {
    EbmQuizEngine.init();
  }
}
