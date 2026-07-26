/**
 * ════════════════════════════════════════════════════════════════════════════
 *  CLINICAL CASE SIMULATOR ENGINE — PATHOLOGY MODULE (CLINIPORTAL)
 *  Động cơ Mô phỏng Ca bệnh tương tác 5 phút (Patient Scenario Simulator)
 * ════════════════════════════════════════════════════════════════════════════
 */

class PathologySimulator {
    constructor(modalId) {
        this.modalEl = document.getElementById(modalId);
        this.currentScenario = null;
        this.currentStepIdx = 0;
        this.score = 0;
        this.userAnswers = [];
        this.initDOM();
    }

    initDOM() {
        if (!this.modalEl) return;
        this.modalEl.innerHTML = `
            <div class="sim-modal-overlay"></div>
            <div class="sim-modal-container">
                <header class="sim-modal-header">
                    <div class="sim-header-title">
                        <span class="sim-badge"><i class="fa-solid fa-gamepad"></i> CLINICAL CASE SIMULATOR</span>
                        <h3 id="sim-scenario-title">Mô phỏng ca bệnh lâm sàng</h3>
                    </div>
                    <button class="sim-close-btn" onclick="window.pathologySim.close()">&times;</button>
                </header>

                <main class="sim-modal-body">
                    <!-- Patient Vitals & Presentation Banner -->
                    <div class="sim-patient-card" id="sim-patient-card">
                        <div class="sim-patient-avatar"><i class="fa-solid fa-user-ninja"></i></div>
                        <div class="sim-patient-info">
                            <h4 id="sim-patient-name">Tình huống ca bệnh mẫu</h4>
                            <p id="sim-patient-desc">Đang tải tình huống...</p>
                            <div class="sim-vitals-strip" id="sim-vitals-strip"></div>
                        </div>
                    </div>

                    <!-- Step Progress Ladder -->
                    <div class="sim-progress-bar">
                        <div class="sim-progress-fill" id="sim-progress-fill"></div>
                    </div>

                    <!-- Step Content Container -->
                    <div class="sim-step-box" id="sim-step-box">
                        <div class="sim-question-header" id="sim-question-header"></div>
                        <div class="sim-options-list" id="sim-options-list"></div>
                        <div class="sim-feedback-box" id="sim-feedback-box" style="display:none;"></div>
                    </div>

                    <!-- Summary & Case Report View -->
                    <div class="sim-summary-box" id="sim-summary-box" style="display:none;"></div>
                </main>

                <footer class="sim-modal-footer">
                    <button class="path-btn outline" id="sim-prev-btn" onclick="window.pathologySim.prevStep()" style="display:none;">
                        <i class="fa-solid fa-arrow-left"></i> Câu trước
                    </button>
                    <button class="path-btn primary" id="sim-next-btn" onclick="window.pathologySim.nextStep()" style="display:none;">
                        Tiếp theo <i class="fa-solid fa-arrow-right"></i>
                    </button>
                    <button class="path-btn secondary" id="sim-export-report-btn" onclick="window.pathologySim.exportReportTxt()" style="display:none;">
                        <i class="fa-solid fa-file-export"></i> Xuất Báo Cáo Ca Bệnh (.txt)
                    </button>
                </footer>
            </div>
        `;
    }

    startScenario(scenarioData) {
        if (!scenarioData || !scenarioData.steps || scenarioData.steps.length === 0) {
            alert('⚠️ Bài bệnh lý này chưa cấu hình kịch bản ca bệnh mô phỏng!');
            return;
        }

        this.currentScenario = scenarioData;
        this.currentStepIdx = 0;
        this.score = 0;
        this.userAnswers = [];

        // Fill Header Patient Card
        document.getElementById('sim-scenario-title').textContent = scenarioData.title || 'Mô Phỏng Ca Bệnh Lâm Sàng';
        document.getElementById('sim-patient-name').textContent = scenarioData.title || 'Bệnh nhân ảo';
        document.getElementById('sim-patient-desc').textContent = scenarioData.description || '';

        // Vitals
        const vitalsContainer = document.getElementById('sim-vitals-strip');
        vitalsContainer.innerHTML = '';
        if (scenarioData.vitals) {
            Object.entries(scenarioData.vitals).forEach(([k, v]) => {
                const tag = document.createElement('span');
                tag.className = 'sim-vital-pill';
                tag.innerHTML = `<strong>${k}:</strong> ${v}`;
                vitalsContainer.appendChild(tag);
            });
        }

        document.getElementById('sim-summary-box').style.display = 'none';
        document.getElementById('sim-step-box').style.display = 'block';
        document.getElementById('sim-export-report-btn').style.display = 'none';

        this.renderCurrentStep();
        this.modalEl.classList.add('active');
    }

    renderCurrentStep() {
        const steps = this.currentScenario.steps;
        const total = steps.length;
        const step = steps[this.currentStepIdx];

        // Progress
        const pct = ((this.currentStepIdx + 1) / total) * 100;
        document.getElementById('sim-progress-fill').style.width = `${pct}%`;

        // Question
        document.getElementById('sim-question-header').innerHTML = `
            <span class="sim-step-badge">Bước ${this.currentStepIdx + 1} / ${total}</span>
            <h4 class="sim-question-title">${step.question}</h4>
        `;

        // Options
        const optList = document.getElementById('sim-options-list');
        optList.innerHTML = '';

        const feedbackBox = document.getElementById('sim-feedback-box');
        feedbackBox.style.display = 'none';

        const existingAns = this.userAnswers[this.currentStepIdx];

        step.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'sim-opt-btn';
            btn.innerHTML = `<span class="opt-text">${opt.text}</span>`;

            if (existingAns !== undefined) {
                btn.disabled = true;
                if (idx === existingAns.selectedIdx) {
                    btn.classList.add(opt.isCorrect ? 'correct' : 'wrong');
                } else if (opt.isCorrect) {
                    btn.classList.add('correct');
                }
            } else {
                btn.onclick = () => this.selectOption(idx);
            }
            optList.appendChild(btn);
        });

        // Show feedback if answered
        if (existingAns !== undefined) {
            this.showFeedback(existingAns.opt);
        }

        // Nav buttons
        document.getElementById('sim-prev-btn').style.display = this.currentStepIdx > 0 ? 'inline-flex' : 'none';
        document.getElementById('sim-next-btn').style.display = existingAns !== undefined ? 'inline-flex' : 'none';
    }

    selectOption(optIdx) {
        const step = this.currentScenario.steps[this.currentStepIdx];
        const selectedOpt = step.options[optIdx];

        this.userAnswers[this.currentStepIdx] = {
            selectedIdx: optIdx,
            opt: selectedOpt,
            isCorrect: selectedOpt.isCorrect
        };

        if (selectedOpt.isCorrect) {
            this.score += 1;
        }

        this.renderCurrentStep();
    }

    showFeedback(opt) {
        const feedbackBox = document.getElementById('sim-feedback-box');
        feedbackBox.style.display = 'block';
        feedbackBox.className = `sim-feedback-box ${opt.isCorrect ? 'correct' : 'wrong'}`;
        feedbackBox.innerHTML = `
            <div class="feedback-icon">${opt.isCorrect ? '✅ ĐÚNG THEO KHUYẾN CÁO' : '❌ CHƯA CHÍNH XÁC'}</div>
            <div class="feedback-text">${opt.rationale || ''}</div>
        `;
    }

    nextStep() {
        if (this.currentStepIdx < this.currentScenario.steps.length - 1) {
            this.currentStepIdx++;
            this.renderCurrentStep();
        } else {
            this.showSummary();
        }
    }

    prevStep() {
        if (this.currentStepIdx > 0) {
            this.currentStepIdx--;
            this.renderCurrentStep();
        }
    }

    showSummary() {
        const total = this.currentScenario.steps.length;
        const pct = Math.round((this.score / total) * 100);

        document.getElementById('sim-step-box').style.display = 'none';
        document.getElementById('sim-prev-btn').style.display = 'none';
        document.getElementById('sim-next-btn').style.display = 'none';
        document.getElementById('sim-export-report-btn').style.display = 'inline-flex';

        const summaryBox = document.getElementById('sim-summary-box');
        summaryBox.style.display = 'block';

        let badgeClass = pct >= 80 ? 'gold' : pct >= 50 ? 'silver' : 'bronze';

        summaryBox.innerHTML = `
            <div class="sim-result-card ${badgeClass}">
                <div class="sim-result-score">${pct}%</div>
                <h3>KẾT QUẢ MÔ PHỎNG LÂM SÀNG</h3>
                <p>Bạn đã trả lời đúng <strong>${this.score}/${total}</strong> bước xử trí chẩn đoán theo phác đồ YHC.</p>
                <button class="path-btn primary" onclick="window.pathologySim.startScenario(window.pathologySim.currentScenario)" style="margin-top:1rem;">
                    <i class="fa-solid fa-rotate"></i> Thực Hành Lại Ca Này
                </button>
            </div>
        `;
    }

    exportReportTxt() {
        if (!this.currentScenario) return;
        const total = this.currentScenario.steps.length;
        const pct = Math.round((this.score / total) * 100);

        let report = `====================================================\n`;
        report += `    CLINIPORTAL - BÁO CÁO XỬ TRÍ CA BỆNH LÂM SÀNG\n`;
        report += `====================================================\n\n`;
        report += `Tên tình huống: ${this.currentScenario.title}\n`;
        report += `Thời gian thực hiện: ${new Date().toLocaleString('vi-VN')}\n`;
        report += `Kết quả đánh giá: ${this.score}/${total} (${pct}% chính xác)\n\n`;
        report += `----------------------------------------------------\n`;
        report += `CHI TIẾT CÁC BƯỚC QUYẾT ĐỊNH LÂM SÀNG:\n`;
        report += `----------------------------------------------------\n`;

        this.currentScenario.steps.forEach((step, idx) => {
            const ans = this.userAnswers[idx];
            report += `\n[Bước ${idx + 1}]: ${step.question}\n`;
            if (ans) {
                report += `  - Lựa chọn: ${ans.opt.text}\n`;
                report += `  - Đánh giá: ${ans.isCorrect ? 'ĐÚNG' : 'SAI'}\n`;
                report += `  - Lý do YHC: ${ans.opt.rationale}\n`;
            } else {
                report += `  - Lựa chọn: (Bỏ qua)\n`;
            }
        });

        report += `\n====================================================\n`;
        report += `Ghi chú: Báo cáo được xuất tự động từ hệ thống CliniPortal.\n`;

        const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `Clinical_Case_Report_${Date.now()}.txt`;
        a.click();
    }

    close() {
        if (this.modalEl) {
            this.modalEl.classList.remove('active');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.pathologySim = new PathologySimulator('simulator-modal');
});
