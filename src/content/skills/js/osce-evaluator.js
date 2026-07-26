/**
 * OSCE Evaluator Engine — CliniPortal (Vanilla JS Data-Driven Module)
 * Loads non-HTML JSON OSCE station schemas and provides interactive scoring, timing, & feedback.
 */

window.OsceEvaluator = (function() {
    'use strict';

    // Embedded Fallback Storage (Ensures offline file:/// protocol support without CORS issues)
    const EMBEDDED_STATIONS = {
        'osce-kham-tim-1': {
            id: 'osce-kham-tim-1',
            title: 'Khám Bệnh Nhân Đau Ngực Cấp (Nghi Thừa STEMI)',
            category: 'Tim mạch',
            difficulty: 'basic',
            durationSeconds: 480,
            maxScore: 13,
            passScore: 9,
            patientInfo: {
                name: 'Nguyễn Văn A',
                age: 65,
                gender: 'Nam',
                vitals: 'Mạch 110 l/p, HA 160/90 mmHg, SpO₂ 96%, Nhịp thở 22 l/p'
            },
            scenario: 'Bệnh nhân vào viện vì đau tức ngực trái lan ra tay trái, kéo dài 30 phút không đỡ. Bệnh nhân vã mồ hôi. Bạn có 8 phút để thực hiện khám tim mạch lâm sàng (nhìn, sờ, gõ, nghe) và đề xuất cận lâm sàng ban đầu.',
            checklist: [
                { id: 'step-1', text: 'Chào hỏi, giới thiệu bản thân và giải thích thủ thuật', pts: 1, critical: false, category: 'Chuẩn bị' },
                { id: 'step-2', text: 'Sát khuẩn tay nhanh / Rửa tay chuẩn y khoa', pts: 1, critical: false, category: 'Chuẩn bị' },
                { id: 'step-3', text: 'Bộc lộ vùng ngực đúng cách, giữ kín đáo cho bệnh nhân', pts: 1, critical: false, category: 'Thực hiện' },
                { id: 'step-4', text: 'NHÌN: Tuần hoàn bàng hệ, sẹo mổ cũ, mỏm tim đập bất thường', pts: 2, critical: false, category: 'Thực hiện' },
                { id: 'step-5', text: 'SỜ: Mỏm tim, vị trí mỏm tim, rung miêu (thrill), dấu Harzer', pts: 2, critical: false, category: 'Thực hiện' },
                { id: 'step-6', text: 'NGHE: Tim tại 4 ổ van cơ bản (ĐMC, ĐMP, 3 lá, 2 lá)', pts: 3, critical: true, category: 'Thực hiện' },
                { id: 'step-7', text: 'Đo huyết áp cả 2 tay và bắt mạch ngoại vi', pts: 1, critical: false, category: 'Thực hiện' },
                { id: 'step-8', text: 'Đề xuất ECG 12 chuyển đạo + Men tim (Troponin hs) khẩn', pts: 2, critical: true, category: 'Đánh giá & Chỉ định' }
            ],
            keyPoints: [
                'Đau ngực cấp kèm vã mồ hôi → Phải nghĩ STEMI trước tiên',
                'ECG 12 chuyển đạo + Troponin phải được thực hiện trong vòng 10 phút đầu',
                'Vị trí nghe tim 4 ổ van: Aortic (KLS 2 phải) → Pulmonic (KLS 2 trái) → Tricuspid (bờ trái xương ức) → Mitral (mỏm tim KLS 5)'
            ]
        }
    };

    class Evaluator {
        constructor(containerId) {
            this.container = document.getElementById(containerId);
            this.currentStation = null;
            this.scores = {};
            this.timerInterval = null;
            this.timeLeft = 0;
            this.isRunning = false;
        }

        async loadStation(stationIdOrPath) {
            let data = null;

            // Attempt 1: Fetch via HTTP / Server
            if (typeof stationIdOrPath === 'string' && stationIdOrPath.endsWith('.json')) {
                try {
                    const resp = await fetch(stationIdOrPath);
                    if (resp.ok) {
                        data = await resp.json();
                    }
                } catch (e) {
                    console.warn('[OsceEvaluator] Fetch failed (likely file:/// CORS). Falling back to embedded station data.', e);
                }
            }

            // Attempt 2: Lookup in Embedded Registry
            if (!data) {
                const key = typeof stationIdOrPath === 'string' ? stationIdOrPath.replace(/\.json$/, '').split('/').pop() : 'osce-kham-tim-1';
                data = EMBEDDED_STATIONS[key] || EMBEDDED_STATIONS['osce-kham-tim-1'];
            }

            this.currentStation = data;
            this.resetScores();
            this.render();
        }

        resetScores() {
            this.scores = {};
            if (this.currentStation && this.currentStation.checklist) {
                this.currentStation.checklist.forEach(step => {
                    this.scores[step.id] = 0; // 0 = default unselected
                });
            }
        }

        render() {
            if (!this.container || !this.currentStation) return;
            const st = this.currentStation;

            this.timeLeft = st.durationSeconds || 480;

            let html = `
                <div class="osce-eval-wrapper card-box">
                    <div class="osce-eval-header">
                        <div class="osce-eval-meta">
                            <span class="badge badge-primary">${st.category}</span>
                            <span class="badge badge-${st.difficulty}">${st.difficulty.toUpperCase()}</span>
                        </div>
                        <h2 class="osce-eval-title">${st.title}</h2>
                        <div class="osce-eval-timer-box">
                            <i class="fas fa-clock"></i> <span id="osce-timer-display">${this.formatTime(this.timeLeft)}</span>
                            <button id="btn-toggle-timer" class="btn btn-sm btn-outline"><i class="fas fa-play"></i> Bắt đầu</button>
                        </div>
                    </div>

                    <div class="osce-patient-box">
                        <h4><i class="fas fa-user-injured"></i> Thông tin bệnh nhân & Tình huống</h4>
                        <p><strong>Bệnh nhân:</strong> ${st.patientInfo.name}, ${st.patientInfo.age} tuổi (${st.patientInfo.gender})</p>
                        <p><strong>Sinh hiệu:</strong> ${st.patientInfo.vitals}</p>
                        <div class="osce-scenario-text">${st.scenario}</div>
                    </div>

                    <div class="osce-checklist-box">
                        <h3><i class="fas fa-tasks"></i> Bảng kiểm Đánh giá Tiêu chuẩn (JSON Schema)</h3>
                        <table class="osce-table">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Nội dung Tiêu chí / Kỹ năng</th>
                                    <th>Phân loại</th>
                                    <th>Điểm</th>
                                    <th>Đánh giá</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

            st.checklist.forEach((step, idx) => {
                const isCritical = step.critical ? '<span class="badge badge-danger">Trọng yếu</span>' : '<span class="badge badge-secondary">Thường</span>';
                html += `
                    <tr id="row-${step.id}" class="${step.critical ? 'critical-row' : ''}">
                        <td>${idx + 1}</td>
                        <td>
                            <strong>${step.text}</strong>
                        </td>
                        <td>${isCritical}</td>
                        <td><strong>${step.pts}đ</strong></td>
                        <td>
                            <div class="btn-group-score" data-step-id="${step.id}" data-pts="${step.pts}">
                                <button class="btn-score btn-pass" data-val="${step.pts}"><i class="fas fa-check"></i> Đạt</button>
                                <button class="btn-score btn-fail active" data-val="0"><i class="fas fa-times"></i> Chưa đạt</button>
                            </div>
                        </td>
                    </tr>
                `;
            });

            html += `
                            </tbody>
                        </table>
                    </div>

                    <div class="osce-summary-footer">
                        <div class="osce-score-board">
                            <span>Tổng điểm: <strong id="osce-total-score">0</strong> / ${st.maxScore}đ</span>
                            <span id="osce-result-badge" class="badge badge-secondary">Chưa chấm xong</span>
                        </div>
                        <button id="btn-submit-eval" class="btn btn-success"><i class="fas fa-file-signature"></i> Xuất Báo Cáo Chấm Điểm</button>
                    </div>

                    <div id="osce-feedback-panel" class="osce-feedback-panel" style="display:none;"></div>
                </div>
            `;

            this.container.innerHTML = html;
            this.attachEvents();
        }

        attachEvents() {
            const timerBtn = this.container.querySelector('#btn-toggle-timer');
            if (timerBtn) {
                timerBtn.addEventListener('click', () => this.toggleTimer());
            }

            const scoreButtons = this.container.querySelectorAll('.btn-score');
            scoreButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const group = e.target.closest('.btn-group-score');
                    const stepId = group.dataset.stepId;
                    const val = parseInt(e.target.dataset.val, 10);

                    group.querySelectorAll('.btn-score').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');

                    this.scores[stepId] = val;
                    this.updateScoreSummary();
                });
            });

            const submitBtn = this.container.querySelector('#btn-submit-eval');
            if (submitBtn) {
                submitBtn.addEventListener('click', () => this.generateReport());
            }
        }

        toggleTimer() {
            const btn = this.container.querySelector('#btn-toggle-timer');
            if (this.isRunning) {
                clearInterval(this.timerInterval);
                this.isRunning = false;
                if (btn) btn.innerHTML = '<i class="fas fa-play"></i> Tiếp tục';
            } else {
                this.isRunning = true;
                if (btn) btn.innerHTML = '<i class="fas fa-pause"></i> Tạm dừng';
                this.timerInterval = setInterval(() => {
                    this.timeLeft--;
                    const display = this.container.querySelector('#osce-timer-display');
                    if (display) display.textContent = this.formatTime(this.timeLeft);

                    if (this.timeLeft <= 0) {
                        clearInterval(this.timerInterval);
                        this.isRunning = false;
                        alert('⏱️ ĐÃ HẾT THỜI GIAN THI TRẠM (8 phút)!');
                    }
                }, 1000);
            }
        }

        formatTime(seconds) {
            const m = Math.floor(seconds / 60).toString().padStart(2, '0');
            const s = (seconds % 60).toString().padStart(2, '0');
            return `${m}:${s}`;
        }

        updateScoreSummary() {
            let total = 0;
            Object.values(this.scores).forEach(v => total += v);

            const scoreEl = this.container.querySelector('#osce-total-score');
            const badgeEl = this.container.querySelector('#osce-result-badge');

            if (scoreEl) scoreEl.textContent = total;

            if (badgeEl && this.currentStation) {
                const passed = total >= this.currentStation.passScore;
                badgeEl.textContent = passed ? 'ĐẠT (PASS)' : 'KHÔNG ĐẠT (FAIL)';
                badgeEl.className = `badge ${passed ? 'badge-success' : 'badge-danger'}`;
            }
        }

        generateReport() {
            const st = this.currentStation;
            let total = 0;
            let failedCritical = false;

            st.checklist.forEach(step => {
                const pts = this.scores[step.id] || 0;
                total += pts;
                if (step.critical && pts === 0) {
                    failedCritical = true;
                }
            });

            const pass = total >= st.passScore && !failedCritical;
            const panel = this.container.querySelector('#osce-feedback-panel');

            if (panel) {
                panel.style.display = 'block';
                panel.innerHTML = `
                    <div class="feedback-card ${pass ? 'pass-card' : 'fail-card'}">
                        <h4>Kết Quả Đánh Giá Trạm Thi OSCE</h4>
                        <p><strong>Điểm số đạt được:</strong> ${total} / ${st.maxScore} điểm (${Math.round(total/st.maxScore*100)}%)</p>
                        <p><strong>Kết luận:</strong> ${pass ? '🎉 ĐẠT CHUẨN KỸ NĂNG' : '❌ KHÔNG ĐẠT CHUẨN'}</p>
                        ${failedCritical ? '<p class="text-danger">⚠️ Lưu ý: Bạn đã bỏ sót hoặc không đạt bước TRỌNG YẾU (Critical Step)!</p>' : ''}
                        
                        <h5>💡 Điểm Trọng Tâm Cần Nhớ (Key Clinical Pearls):</h5>
                        <ul>
                            ${st.keyPoints.map(kp => `<li>${kp}</li>`).join('')}
                        </ul>
                    </div>
                `;
                panel.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    return {
        create: function(containerId) {
            return new Evaluator(containerId);
        }
    };
})();
