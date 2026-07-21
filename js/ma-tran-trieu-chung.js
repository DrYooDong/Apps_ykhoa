/**
 * CliniPortal - Symptom Matrix Engine & UI Controller
 * Manages category grouping, symptom toggling, context risks, and dynamic score calculation.
 */
document.addEventListener('DOMContentLoaded', () => {
    const chipContainer = document.getElementById('chipContainer');
    const resultsPanel = document.getElementById('resultsPanel');
    let selectedSymptoms = new Set();

    if (!chipContainer || !resultsPanel) return;

    // Group symptoms by category
    const categoriesMap = {
        "Hệ Toàn thân": ["sot", "vangda", "phu", "nguada", "haduonghuyet"],
        "Hô hấp - Tim mạch": ["khotho", "daunguc", "horamau", "hoihop", "ho", "khokhe"],
        "Hệ Tiêu hóa": ["daubung", "buonnon", "tieuchay", "xuathuyettieuhoa", "bangbung", "nuotkho", "taobon"],
        "Hệ Thần kinh": ["daudau", "chongmat", "cogiat", "roiloanythuc"],
        "Hệ Thận - Niệu": ["tieumau", "tieubuot"],
        "Hệ Cơ xương khớp": ["daulung"],
        "Hệ Máu & Miễn dịch": ["thieumau"],
        "Đầu Mặt Cổ": ["khoioco"]
    };

    // Render chips by category
    Object.keys(categoriesMap).forEach(catName => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'symptom-category-group';
        
        const titleDiv = document.createElement('div');
        titleDiv.className = 'symptom-category-title';
        titleDiv.innerHTML = `<i class="fa-solid fa-layer-group"></i> ${catName}`;
        groupDiv.appendChild(titleDiv);
        
        const gridDiv = document.createElement('div');
        gridDiv.className = 'symptom-chips-grid';
        
        categoriesMap[catName].forEach(symId => {
            const sym = typeof symptomData !== 'undefined' ? symptomData[symId] : null;
            if(!sym) return;
            
            const chip = document.createElement('div');
            chip.className = 'symptom-chip';
            chip.setAttribute('data-id', sym.id);
            chip.innerHTML = `
                <div class="check-icon"><i class="fa-solid fa-check"></i></div>
                <div class="chip-icon"><i class="fa-solid ${sym.icon}"></i></div>
                <div class="chip-text">${sym.name}</div>
            `;
            chip.addEventListener('click', () => toggleSymptom(sym.id, chip));
            gridDiv.appendChild(chip);
        });
        
        groupDiv.appendChild(gridDiv);
        chipContainer.appendChild(groupDiv);
    });

    function toggleSymptom(id, chipElement) {
        if (selectedSymptoms.has(id)) {
            selectedSymptoms.delete(id);
            chipElement.classList.remove('active');
        } else {
            selectedSymptoms.add(id);
            chipElement.classList.add('active');
        }
        updateMatrix();
    }

    // Expose updateMatrix globally for onchange handlers
    window.updateMatrix = function updateMatrix() {
        const maxScore = selectedSymptoms.size;
        
        if (maxScore === 0) {
            resultsPanel.innerHTML = `
                <div class="engine-empty">
                    <div class="radar-scanner">
                        <i class="fa-solid fa-microchip"></i>
                    </div>
                    <h3>Engine Chẩn Đoán Đang Chờ</h3>
                    <p>Hãy chọn các triệu chứng từ danh sách bên trái để AI tổng hợp và phân tích dữ liệu lâm sàng.</p>
                </div>
            `;
            return;
        }

        let allRedFlags = [];
        let diagCount = {};

        selectedSymptoms.forEach(id => {
            const data = symptomData[id];
            if (!data) return;
            
            data.redFlags.forEach(flag => {
                allRedFlags.push({ text: flag, source: data.name });
            });

            data.diffDiags.forEach(diag => {
                if (!diagCount[diag]) diagCount[diag] = 0;
                diagCount[diag]++;
            });
        });

        // Setup context bonuses
        const contextInputs = document.querySelectorAll('.context-toggle input:checked');
        const activeContexts = Array.from(contextInputs).map(inp => inp.value);
        
        const contextRisks = {
            'tuoi50': ['Viêm động mạch thái dương', 'Nhồi máu cơ tim', 'U nội sọ', 'Phình bóc tách'],
            'cothai': ['Thai ngoài tử cung', 'Ốm nghén', 'Huyết khối', 'Thuyên tắc động mạch phổi'],
            'tieuduong': ['Nhồi máu cơ tim', 'Nhiễm trùng đường mật', 'Nhiễm khuẩn huyết'],
            'miendich': ['Lao phổi', 'Viêm màng não', 'Nhiễm khuẩn huyết']
        };

        let activeKeywords = [];
        activeContexts.forEach(ctx => {
            if(contextRisks[ctx]) activeKeywords.push(...contextRisks[ctx]);
        });
        
        let highRiskDiags = new Set();
        Object.keys(diagCount).forEach(diag => {
            activeKeywords.forEach(kw => {
                if(diag.includes(kw)) {
                    diagCount[diag] += 0.5; // Bonus score
                    highRiskDiags.add(diag);
                }
            });
        });

        const sortedDiags = Object.keys(diagCount).sort((a, b) => diagCount[b] - diagCount[a]);

        // Red Flags HTML
        let redFlagsHtml = `
            <div class="result-card card-danger">
                <div class="result-card-title title-danger">
                    <div class="icon-wrapper"><i class="fa-solid fa-triangle-exclamation"></i></div>
                    Cảnh Báo Đỏ Cấp Cứu (Red Flags)
                </div>
                <ul class="result-list">
                    ${allRedFlags.map(f => `
                        <li class="red-flag-item">
                            <i class="fa-solid fa-circle-exclamation red-flag-icon"></i>
                            <div class="red-flag-text">
                                ${f.text} 
                                <div class="red-flag-source"><i class="fa-solid fa-tag" style="margin-right:4px;"></i>${f.source}</div>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;

        // Diff Diag HTML
        let diagsHtml = `
            <div class="result-card card-info">
                <div class="result-card-title title-info">
                    <div class="icon-wrapper"><i class="fa-solid fa-stethoscope"></i></div>
                    Chẩn Đoán Phân Biệt Khả Dĩ
                </div>
                <ul class="result-list">
                    ${sortedDiags.map(d => {
                        const score = diagCount[d];
                        const displayScore = Math.floor(score); // Remove bonus for display
                        const percent = Math.min(100, Math.round((score / maxScore) * 100));
                        let matchClass = 'match-low';
                        let barColor = 'var(--color-text-muted)';
                        
                        if (percent === 100) {
                            matchClass = 'match-perfect';
                            barColor = 'var(--color-success)';
                        } else if (percent >= 50) {
                            matchClass = 'match-high';
                            barColor = 'var(--color-warning)';
                        }

                        const isHighRisk = highRiskDiags.has(d);
                        const riskBadge = isHighRisk ? `<span style="background: var(--color-danger); color: white; padding: 2px 8px; border-radius: 100px; font-size: 0.7rem; margin-left: 8px; box-shadow: 0 0 10px rgba(225,29,72,0.4);"><i class="fa-solid fa-fire"></i> Nguy cơ cao</span>` : '';

                        return `
                        <li class="diff-diag-item" style="${isHighRisk ? 'border-color: rgba(225,29,72,0.4); background: rgba(225,29,72,0.02);' : ''}">
                            <div class="diff-diag-header">
                                <div class="diff-diag-name">
                                    <i class="fa-solid fa-caret-right"></i> ${d} ${riskBadge}
                                </div>
                                <div class="match-score-badge ${matchClass}">
                                    Khớp ${displayScore}/${maxScore} (${percent}%)
                                </div>
                            </div>
                            <div class="match-bar-bg">
                                <div class="match-bar-fill" style="width: ${percent}%; background: ${barColor};"></div>
                            </div>
                        </li>
                        `;
                    }).join('')}
                </ul>
            </div>
        `;

        // Render with slight animation reset
        resultsPanel.innerHTML = redFlagsHtml + diagsHtml;
        
        // Trigger reflow for animation
        const cards = resultsPanel.querySelectorAll('.result-card');
        cards.forEach(card => {
            card.style.animation = 'none';
            card.offsetHeight; // trigger reflow
            card.style.animation = null;
        });
        
        // Trigger reflow for progress bars
        setTimeout(() => {
            const bars = resultsPanel.querySelectorAll('.match-bar-fill');
            bars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 50);
            });
        }, 100);
    };
});
