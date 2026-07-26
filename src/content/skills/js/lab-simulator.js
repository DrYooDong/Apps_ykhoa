/**
 * Lab Simulator Engine — CliniPortal (Vanilla JS)
 * Parses non-HTML JSON paraclinical datasets (lab-sinh-hoa.json, etc.) and provides interactive lab value interpretation.
 */

window.LabSimulator = (function() {
    'use strict';

    class Simulator {
        constructor(containerId) {
            this.container = document.getElementById(containerId);
            this.data = null;
        }

        async loadData(jsonUrlOrObject) {
            if (typeof jsonUrlOrObject === 'object') {
                this.data = jsonUrlOrObject;
            } else {
                try {
                    const resp = await fetch(jsonUrlOrObject);
                    if (resp.ok) {
                        this.data = await resp.json();
                    }
                } catch (e) {
                    console.warn('[LabSimulator] Fetch failed, using default embedded data.', e);
                    this.data = this.getDefaultData();
                }
            }
            if (!this.data) this.data = this.getDefaultData();
            this.render();
        }

        getDefaultData() {
            return {
                title: 'Bảng Chỉ Số Tham Chiếu & Giải Diễn Sinh Hóa Gan Máu',
                parameters: [
                    {
                        code: 'ALT',
                        name: 'Alanine Aminotransferase (GPT)',
                        unitSI: 'U/L',
                        normalRange: { min: 7, max: 56 },
                        criticalHigh: 1000,
                        description: 'Enzyme đặc hiệu tổn thương tế bào gan.',
                        clinicalInterpretations: [
                            { range: '56 - 300 U/L', severity: 'mild', meaning: 'Tăng nhẹ-vừa: Viêm gan mạn, gan nhiễm mỡ, tổn thương do thuốc.' },
                            { range: '300 - 1000 U/L', severity: 'moderate', meaning: 'Tăng trung bình: Viêm gan vi-rút cấp, đợt cấp viêm gan mạn.' },
                            { range: '> 1000 U/L', severity: 'critical', meaning: 'Tăng rất cao: Hoại tử tế bào gan ồ ạt do Ngộ độc Paracetamol, Viêm gan vi-rút cấp, Sốc gan.' }
                        ]
                    },
                    {
                        code: 'AST',
                        name: 'Aspartate Aminotransferase (GOT)',
                        unitSI: 'U/L',
                        normalRange: { min: 10, max: 40 },
                        criticalHigh: 1000,
                        description: 'Enzyme có ở gan, cơ tim, cơ xương.',
                        clinicalInterpretations: [
                            { range: 'AST/ALT > 2', severity: 'warning', meaning: 'Gợi ý mạnh Viêm gan do Rượu (Alcoholic Hepatitis) hoặc Xơ gan.' }
                        ]
                    }
                ]
            };
        }

        render() {
            if (!this.container || !this.data) return;

            let html = `
                <div class="lab-sim-container card-box">
                    <div class="lab-sim-header">
                        <h3><i class="fas fa-flask"></i> ${this.data.title}</h3>
                        <p class="text-muted">Bộ giải lập đọc chỉ số xét nghiệm tự động từ dữ liệu JSON Schema.</p>
                    </div>

                    <div class="lab-table-wrapper">
                        <table class="lab-table">
                            <thead>
                                <tr>
                                    <th>Mã Chỉ Số</th>
                                    <th>Tên Xét Nghiệm</th>
                                    <th>Khoảng Tham Chiếu</th>
                                    <th>Nhập Giá Trị Giả Lập</th>
                                    <th>Chẩn Đán / Ý Nghĩa</th>
                                </tr>
                            </thead>
                            <tbody>
            `;

            this.data.parameters.forEach(p => {
                html += `
                    <tr id="lab-row-${p.code}">
                        <td><strong>${p.code}</strong></td>
                        <td>${p.name}<br><small class="text-muted">${p.description}</small></td>
                        <td><span class="badge badge-info">${p.normalRange.min} - ${p.normalRange.max} ${p.unitSI}</span></td>
                        <td>
                            <div class="lab-input-group">
                                <input type="number" class="lab-input" id="input-${p.code}" placeholder="Nhập số..." data-code="${p.code}">
                                <span>${p.unitSI}</span>
                            </div>
                        </td>
                        <td>
                            <div id="output-${p.code}" class="lab-output">Chưa nhập giá trị</div>
                        </td>
                    </tr>
                `;
            });

            html += `
                            </tbody>
                        </table>
                    </div>
                </div>
            `;

            this.container.innerHTML = html;
            this.attachEvents();
        }

        attachEvents() {
            const inputs = this.container.querySelectorAll('.lab-input');
            inputs.forEach(input => {
                input.addEventListener('input', (e) => {
                    const code = e.target.dataset.code;
                    const val = parseFloat(e.target.value);
                    const param = this.data.parameters.find(p => p.code === code);
                    const outputEl = this.container.querySelector(`#output-${code}`);

                    if (isNaN(val)) {
                        outputEl.className = 'lab-output';
                        outputEl.textContent = 'Chưa nhập giá trị';
                        return;
                    }

                    if (val >= param.normalRange.min && val <= param.normalRange.max) {
                        outputEl.className = 'lab-output text-success';
                        outputEl.innerHTML = '🟢 <strong>Bình thường</strong> (Normal)';
                    } else if (val > param.normalRange.max) {
                        let interpretation = 'Tăng cao so với ngưỡng chuẩn.';
                        if (param.criticalHigh && val >= param.criticalHigh) {
                            outputEl.className = 'lab-output text-danger critical-alert';
                            interpretation = '🚨 <strong>CẢNH BÁO NGUY HIỂM!</strong> ' + (param.clinicalInterpretations.find(i => i.severity === 'critical')?.meaning || interpretation);
                        } else {
                            outputEl.className = 'lab-output text-warning';
                            interpretation = '🟡 <strong>Tăng bất thường:</strong> ' + (param.clinicalInterpretations[0]?.meaning || interpretation);
                        }
                        outputEl.innerHTML = interpretation;
                    } else {
                        outputEl.className = 'lab-output text-warning';
                        outputEl.innerHTML = '🔵 <strong>Giảm thấp so với bình thường</strong>';
                    }
                });
            });
        }
    }

    return {
        create: function(containerId) {
            return new Simulator(containerId);
        }
    };
})();
