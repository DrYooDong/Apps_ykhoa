/**
 * CliniPortal - Clinical Case Simulator Logic
 * Manages 4-step clinical decision cases, scoring, and rationale feedback.
 */
document.addEventListener('DOMContentLoaded', () => {
    const caseCards = document.querySelectorAll('.case-card');
    const questionArea = document.getElementById('questionArea');
    const feedbackArea = document.getElementById('feedbackArea');
    const scoreDisplay = document.getElementById('simScoreDisplay');

    if (!questionArea || !feedbackArea) return;

    let currentCaseKey = 'sepsis';
    let currentStep = 1;
    let totalScore = 0;

    const caseBank = {
        sepsis: {
            title: "Ca 1: Bệnh nhân sốt cao rét run & Tụt huyết áp",
            steps: {
                1: {
                    title: "Bước 1: Khai thác bệnh sử — Câu hỏi ưu tiên nào cần hỏi trước?",
                    options: [
                        { text: "A. Sốt khởi phát từ bao lâu và có kèm cơn rét run hay đau bụng không?", correct: true, points: 25, exp: "Chính xác! Cơn sốt rét run kèm đau hạ sườn P gợi ý Nhiễm trùng đường mật cấp hoặc Sốc nhiễm khuẩn." },
                        { text: "B. Tiền sử tiêm chủng vaccine mùa thu vừa qua?", correct: false, points: 0, exp: "Chưa tối ưu trong tình huống tụt huyết áp khẩn cấp." },
                        { text: "C. Chế độ ăn uống và vận động tuần trước?", correct: false, points: 0, exp: "Không giúp ích khẩn cấp cho xử trí sốc." }
                    ]
                },
                2: {
                    title: "Bước 2: Khám lâm sàng — Dấu hiệu sinh tồn & thể chất nào cần kiểm tra STAT?",
                    options: [
                        { text: "A. Huyết áp, nhịp tim, CRT, dấu Tam chứng Charcot (Đau sườn P + Sốt + Vàng da)", correct: true, points: 25, exp: "Chính xác! Kiểm tra tam chứng Charcot và dấu hiệu sốc nhiễm khuẩn (CRT > 2s, HA < 90)." },
                        { text: "B. Khám vận động 12 dây thần kinh sọ", correct: false, points: 0, exp: "Bệnh nhân không có dấu thần kinh khu trú." }
                    ]
                },
                3: {
                    title: "Bước 3: Chỉ định Cận lâm sàng — Xét nghiệm nào phải làm TRƯỚC KHI cho kháng sinh?",
                    options: [
                        { text: "A. Cấy máu 2 vị trí + Công thức máu STAT + Lactate máu", correct: true, points: 25, exp: "Chính xác! Bắt buộc cấy máu trước khi dùng kháng sinh trong hour-1 bundle Sepsis." },
                        { text: "B. Chụp MRI toàn thân", correct: false, points: 0, exp: "MRI gây chậm trễ thời gian vàng cấp cứu." }
                    ]
                },
                4: {
                    title: "Bước 4: Xử trí ban đầu — Phác đồ xử trí Hour-1 Bundle cho Sốc nhiễm khuẩn?",
                    options: [
                        { text: "A. Kháng sinh phổ rộng IV < 1h + Xả dịch Ringer Lactate 30mL/kg + Vận mạch Noradrenaline nếu HA không lên", correct: true, points: 25, exp: "Tuyệt vời! Đây là phác đồ SSC 2026 chuẩn quốc tế." },
                        { text: "B. Cho Paracetamol uống rồi chuyển phòng khám ngoại trú", correct: false, points: 0, exp: "Sai nghiêm trọng! Nguy cơ tử vong rất cao." }
                    ]
                }
            }
        },
        stemi: {
            title: "Ca 2: Bệnh nhân đau ngực cấp nghi Nhồi máu cơ tim",
            steps: {
                1: {
                    title: "Bước 1: Khai thác bệnh sử — Kiểu đau ngực gợi ý Hội chứng mạch vành cấp?",
                    options: [
                        { text: "A. Đau đè nặng bóp nghẹt sau xương ức lan vai trái/hàm, vã mồ hôi lạnh > 20 phút", correct: true, points: 25, exp: "Chính xác! Đây là kiểu đau thắt ngực điển hình của STEMI." },
                        { text: "B. Đau nhói như kim đâm khi hít thở sâu", correct: false, points: 0, exp: "Đó là kiểu đau màng phổi." }
                    ]
                },
                2: {
                    title: "Bước 2: Khám lâm sàng — Kiểm tra quan trọng nhất?",
                    options: [
                        { text: "A. Đo Huyết áp 2 tay & Nghe tim phổi tìm tiếng cọ hoặc rần ẩm", correct: true, points: 25, exp: "Chính xác! Đo HA 2 tay giúp loại trừ Bóc tách ĐMC." }
                    ]
                },
                3: {
                    title: "Bước 3: Chỉ định Cận lâm sàng — Xét nghiệm vàng thực hiện trong 10 phút đầu?",
                    options: [
                        { text: "A. ECG 12 chuyển đạo STAT + Troponin hs", correct: true, points: 25, exp: "Chính xác! ECG 12 lead là tiêu chuẩn vàng chẩn đoán STEMI." }
                    ]
                },
                4: {
                    title: "Bước 4: Xử trí ban đầu khẩn cấp?",
                    options: [
                        { text: "A. Aspirin 300mg nén + Clopidogrel 300mg + Chuyển can thiệp PCI cấp cứu", correct: true, points: 25, exp: "Tuyệt vời! Liều nạp kháng tiểu cầu kép + PCI khẩn." }
                    ]
                }
            }
        },
        asthma: {
          title: "Ca 3: Cơn hen phế quản ác tính",
          steps: {
              1: {
                  title: "Bước 1: Khai thác bệnh sử — Dấu hiệu báo động cơn hen đe dọa tính mạng?",
                  options: [
                      { text: "A. Không thể nói hết câu ngắn, SpO2 < 90%, lồng ngực im lặng (Silent chest)", correct: true, points: 25, exp: "Chính xác! Silent chest là dấu hiệu đe dọa ngừng thở." }
                  ]
              },
              2: {
                  title: "Bước 2: Khám lâm sàng — Đánh giá kiểu thở?",
                  options: [
                      { text: "A. Quan sát co kéo cơ hô hấp phụ & nghe rì rào phế nang 2 bên", correct: true, points: 25, exp: "Chính xác!" }
                  ]
              },
              3: {
                  title: "Bước 3: Chỉ định cận lâm sàng khẩn?",
                  options: [
                      { text: "A. Đo SpO2 liên tục + Khí máu động mạch (ABG) STAT", correct: true, points: 25, exp: "Chính xác! Đánh giá PaO2 & PaCO2." }
                  ]
              },
              4: {
                  title: "Bước 4: Xử trí cấp cứu?",
                  options: [
                      { text: "A. Oxy kính + Phun mù Salbutamol/Ipratropium x 3 lần + Methylprednisolone 40mg IV", correct: true, points: 25, exp: "Tuyệt vời! Phác đồ GINA 2026." }
                  ]
              }
          }
      }
    };

    function renderStep(caseKey, stepNum) {
        const caseData = caseBank[caseKey];
        if (!caseData || !caseData.steps[stepNum]) return;

        const stepObj = caseData.steps[stepNum];

        // Update Stepper nav
        document.querySelectorAll('.step-btn').forEach((btn, i) => {
            btn.classList.remove('active', 'completed');
            if (i + 1 === stepNum) btn.classList.add('active');
            if (i + 1 < stepNum) btn.classList.add('completed');
        });

        questionArea.innerHTML = `
            <div class="question-title">${stepObj.title}</div>
            <div class="options-list">
                ${stepObj.options.map((opt, idx) => `
                    <div class="opt-card" data-idx="${idx}" data-correct="${opt.correct}" data-points="${opt.points}">
                        ${opt.text}
                    </div>
                `).join('')}
            </div>
        `;

        feedbackArea.style.display = 'none';

        // Add Click Handler to options
        questionArea.querySelectorAll('.opt-card').forEach(card => {
            card.addEventListener('click', () => {
                const isCorrect = card.getAttribute('data-correct') === 'true';
                const points = Number(card.getAttribute('data-points'));
                const optIdx = Number(card.getAttribute('data-idx'));
                const optObj = stepObj.options[optIdx];

                questionArea.querySelectorAll('.opt-card').forEach(c => c.style.pointerEvents = 'none');

                if (isCorrect) {
                    card.style.background = 'rgba(16, 185, 129, 0.15)';
                    card.style.borderColor = 'var(--color-success)';
                    feedbackArea.className = 'feedback-box correct';
                    feedbackArea.innerHTML = `✅ ${optObj.exp}`;
                    totalScore += points;
                } else {
                    card.style.background = 'rgba(225, 29, 72, 0.15)';
                    card.style.borderColor = 'var(--color-danger)';
                    feedbackArea.className = 'feedback-box wrong';
                    feedbackArea.innerHTML = `❌ ${optObj.exp}`;
                }

                feedbackArea.style.display = 'block';
                scoreDisplay.innerText = `${totalScore} / 100`;

                // Next Step after 2.5s
                setTimeout(() => {
                    if (currentStep < 4) {
                        currentStep++;
                        renderStep(currentCaseKey, currentStep);
                    } else {
                        alert(`🎉 HOÀN THÀNH CA BỆNH!\nTổng điểm lý luận lâm sàng của bạn: ${totalScore}/100 điểm.`);
                    }
                }, 2500);
            });
        });
    }

    caseCards.forEach(card => {
        card.addEventListener('click', () => {
            caseCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            currentCaseKey = card.getAttribute('data-case');
            currentStep = 1;
            totalScore = 0;
            scoreDisplay.innerText = `0 / 100`;
            renderStep(currentCaseKey, 1);
        });
    });

    // Default Render
    renderStep('sepsis', 1);
});
