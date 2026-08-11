/**
 * CliniPortal - Symptom Matrix Engine & UI Controller (Phase 2 Upgrade)
 * Features:
 * - Category grouping & symptom toggling
 * - Weighted Bayesian scoring engine & confidence calculation
 * - SVG 5-Axis Differential Radar Chart
 * - Gap Analysis Engine (Questions, Exam, Labs)
 * - URL state sync, LocalStorage cases, Print, and On-Call mode.
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

    // Instant Symptom Search Filter
    const searchInput = document.getElementById('symptomSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const categoryGroups = chipContainer.querySelectorAll('.symptom-category-group');

            categoryGroups.forEach(group => {
                const chips = group.querySelectorAll('.symptom-chip');
                let hasVisibleChip = false;

                chips.forEach(chip => {
                    const text = chip.querySelector('.chip-text')?.innerText.toLowerCase() || '';
                    if (text.includes(query)) {
                        chip.style.display = 'flex';
                        hasVisibleChip = true;
                    } else {
                        chip.style.display = 'none';
                    }
                });

                if (hasVisibleChip) {
                    group.style.display = 'block';
                } else {
                    group.style.display = 'none';
                }
            });
        });
    }

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

    function updateCounterBadge() {
        const badge = document.getElementById('selectedCounterBadge');
        if (badge) {
            badge.innerHTML = `<i class="fa-solid fa-circle-check"></i> Đã chọn: ${selectedSymptoms.size} triệu chứng`;
        }
    }

    // SVG Radar Chart Generator (5-Axis)
    function generateRadarChartHtml(sortedDiags) {
        if (!sortedDiags || sortedDiags.length === 0) return '';

        const topDiags = sortedDiags.slice(0, 3); // Top 3 diagnoses
        const colors = ['#e11d48', '#0284c7', '#10b981']; // Red, Blue, Green
        const width = 360;
        const height = 300;
        const cx = width / 2;
        const cy = height / 2 - 10;
        const radius = 90;

        const axes = [
            { label: "Khẩn cấp", key: "acuity" },
            { label: "Xác suất", key: "probability" },
            { label: "Red Flags", key: "severity" },
            { label: "Phổ biến", key: "prevalence" },
            { label: "Can thiệp", key: "treatability" }
        ];

        const numAxes = axes.length;
        const angleStep = (2 * Math.PI) / numAxes;

        // Background Web Circles / Polygons
        let bgPolygonsHtml = '';
        [0.25, 0.5, 0.75, 1.0].forEach(level => {
            const points = axes.map((_, i) => {
                const angle = i * angleStep - Math.PI / 2;
                const r = radius * level;
                const x = cx + r * Math.cos(angle);
                const y = cy + r * Math.sin(angle);
                return `${x.toFixed(1)},${y.toFixed(1)}`;
            }).join(' ');
            bgPolygonsHtml += `<polygon points="${points}" fill="none" stroke="var(--color-border)" stroke-width="1" stroke-dasharray="3,3" opacity="0.6"/>`;
        });

        // Axis Lines and Labels
        let axisLinesHtml = '';
        axes.forEach((axis, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const x = cx + radius * Math.cos(angle);
            const y = cy + radius * Math.sin(angle);
            const lx = cx + (radius + 20) * Math.cos(angle);
            const ly = cy + (radius + 15) * Math.sin(angle);

            axisLinesHtml += `
                <line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="var(--color-border)" stroke-width="1"/>
                <text x="${lx}" y="${ly}" font-size="10" font-weight="700" fill="var(--color-text-muted)" text-anchor="middle" dominant-baseline="middle">${axis.label}</text>
            `;
        });

        // Data Polygons
        let dataPolygonsHtml = '';
        let legendHtml = '';

        topDiags.forEach((diagName, dIndex) => {
            const color = colors[dIndex % colors.length];
            const profile = (typeof diseaseProfiles !== 'undefined' && diseaseProfiles[diagName]) ? diseaseProfiles[diagName] : {
                acuity: 6, probability: 7, severity: 6, prevalence: 5, treatability: 7
            };

            const points = axes.map((axis, i) => {
                const val = (profile[axis.key] || 5) / 10;
                const angle = i * angleStep - Math.PI / 2;
                const r = radius * val;
                const x = cx + r * Math.cos(angle);
                const y = cy + r * Math.sin(angle);
                return `${x.toFixed(1)},${y.toFixed(1)}`;
            }).join(' ');

            dataPolygonsHtml += `
                <polygon points="${points}" fill="${color}" fill-opacity="0.2" stroke="${color}" stroke-width="2.5"/>
            `;

            legendHtml += `
                <div style="display: flex; align-items: center; gap: 6px; font-size: 0.8rem; font-weight: 600; color: var(--color-text);">
                    <span style="width: 12px; height: 12px; border-radius: 50%; background: ${color}; display: inline-block;"></span>
                    <span>#${dIndex + 1}: ${diagName}</span>
                </div>
            `;
        });

        return `
            <div class="result-card card-radar" style="margin-bottom: 24px;">
                <div class="result-card-title title-info" style="color: #0284c7;">
                    <div class="icon-wrapper" style="background: rgba(2, 132, 199, 0.1);"><i class="fa-solid fa-chart-pie"></i></div>
                    Biểu Đồ Radar Chẩn Đoán Phân Biệt (5 Trục Lâm Sàng)
                </div>
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <svg viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: 360px; height: auto;">
                        ${bgPolygonsHtml}
                        ${axisLinesHtml}
                        ${dataPolygonsHtml}
                    </svg>
                    <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; margin-top: 12px; padding: 10px; background: var(--color-surface); border-radius: 12px; border: 1px solid var(--color-border); width: 100%;">
                        ${legendHtml}
                    </div>
                </div>
            </div>
        `;
    }

    // Expose updateMatrix globally for onchange handlers
    window.updateMatrix = function updateMatrix(skipUrlUpdate = false) {
        const maxScore = selectedSymptoms.size;
        updateCounterBadge();
        
        // Sync URL Params
        if (!skipUrlUpdate) {
            syncUrlParams();
        }

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
        let diagScoreMap = {};
        let diagCountMap = {};
        let allQuestions = new Set();
        let allExams = new Set();
        let allLabs = new Set();

        // Bayesian Weighted Scoring Loop
        selectedSymptoms.forEach(id => {
            const data = symptomData[id];
            if (!data) return;
            
            data.redFlags.forEach(flag => {
                allRedFlags.push({ text: flag, source: data.name });
            });

            data.diffDiags.forEach(diag => {
                if (!diagScoreMap[diag]) {
                    diagScoreMap[diag] = 0;
                    diagCountMap[diag] = 0;
                }
                diagCountMap[diag]++;

                // Bayesian Specificity Weight
                let weight = 1.0;
                if (typeof diseaseProfiles !== 'undefined' && diseaseProfiles[diag] && diseaseProfiles[diag].specificWeights) {
                    weight = diseaseProfiles[diag].specificWeights[id] || 0.7;
                }
                diagScoreMap[diag] += weight;
            });

            if (data.gapAnalysis) {
                (data.gapAnalysis.questions || []).forEach(q => allQuestions.add(q));
                (data.gapAnalysis.exam || []).forEach(e => allExams.add(e));
                (data.gapAnalysis.labs || []).forEach(l => allLabs.add(l));
            }
        });

        // Context risk bonuses
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
        Object.keys(diagScoreMap).forEach(diag => {
            activeKeywords.forEach(kw => {
                if(diag.includes(kw)) {
                    diagScoreMap[diag] += 0.8; // Context Bonus
                    highRiskDiags.add(diag);
                }
            });
        });

        const sortedDiags = Object.keys(diagScoreMap).sort((a, b) => diagScoreMap[b] - diagScoreMap[a]);

        // 1. Red Flags HTML
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

        // 2. Diff Diag HTML with Confidence Meter
        let diagsHtml = `
            <div class="result-card card-info">
                <div class="result-card-title title-info">
                    <div class="icon-wrapper"><i class="fa-solid fa-stethoscope"></i></div>
                    Chẩn Đoán Phân Biệt & Độ Tin Cậy Bayesian
                </div>
                <ul class="result-list">
                    ${sortedDiags.map(d => {
                        const rawScore = diagScoreMap[d];
                        const count = diagCountMap[d];
                        const percent = Math.min(98, Math.max(25, Math.round((rawScore / (maxScore * 1.1)) * 100)));
                        
                        let matchClass = 'match-low';
                        let barColor = 'var(--color-text-muted)';
                        
                        if (percent >= 80) {
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
                                    Khớp ${count}/${maxScore} (${percent}% Confidence)
                                </div>
                            </div>
                            <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 6px; font-style: italic;">
                                ⚡ Độ đặc hiệu lâm sàng: ${percent >= 80 ? 'Rất cao (Khớp nhiều triệu chứng đặc hiệu)' : (percent >= 50 ? 'Trung bình' : 'Cần thêm dữ liệu')}
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

        // 3. SVG Radar Chart HTML
        let radarChartHtml = generateRadarChartHtml(sortedDiags);

        // 4. Gap Analysis Engine HTML
        let gapAnalysisHtml = '';
        if (allQuestions.size > 0 || allExams.size > 0 || allLabs.size > 0) {
            gapAnalysisHtml = `
                <div class="result-card card-purple">
                    <div class="result-card-title title-purple">
                        <div class="icon-wrapper"><i class="fa-solid fa-lightbulb"></i></div>
                        Gợi Ý Thu Hẹp Chẩn Đoán (Gap Analysis Engine)
                    </div>
                    
                    <div class="gap-sections-grid">
                        ${allQuestions.size > 0 ? `
                        <div class="gap-section">
                            <div class="gap-section-title"><i class="fa-solid fa-comments"></i> Hỏi bệnh sử thêm:</div>
                            <ul class="gap-list">
                                ${Array.from(allQuestions).slice(0, 6).map(q => `<li><i class="fa-solid fa-circle-question"></i> ${q}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}

                        ${allExams.size > 0 ? `
                        <div class="gap-section">
                            <div class="gap-section-title"><i class="fa-solid fa-user-doctor"></i> Khám lâm sàng thêm:</div>
                            <ul class="gap-list">
                                ${Array.from(allExams).slice(0, 6).map(e => `<li><i class="fa-solid fa-notes-medical"></i> ${e}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}

                        ${allLabs.size > 0 ? `
                        <div class="gap-section">
                            <div class="gap-section-title"><i class="fa-solid fa-vial"></i> Xét nghiệm / Cận lâm sàng ưu tiên:</div>
                            <ul class="gap-list">
                                ${Array.from(allLabs).slice(0, 6).map(l => `<li><i class="fa-solid fa-microscope"></i> ${l}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }

        // Render cards
        resultsPanel.innerHTML = redFlagsHtml + diagsHtml + radarChartHtml + gapAnalysisHtml;
        
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

    // Sync URL Parameters
    function syncUrlParams() {
        const params = new URLSearchParams();
        if (selectedSymptoms.size > 0) {
            params.set('s', Array.from(selectedSymptoms).join(','));
        }
        const contextInputs = document.querySelectorAll('.context-toggle input:checked');
        const activeContexts = Array.from(contextInputs).map(inp => inp.value);
        if (activeContexts.length > 0) {
            params.set('c', activeContexts.join(','));
        }

        const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
        window.history.replaceState({}, '', newUrl);
    }

    // Read URL Params on initialization
    function loadFromUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const symptomsParam = params.get('s');
        const contextParam = params.get('c');

        if (contextParam) {
            const ctxList = contextParam.split(',');
            document.querySelectorAll('.context-toggle input').forEach(inp => {
                if (ctxList.includes(inp.value)) {
                    inp.checked = true;
                }
            });
        }

        if (symptomsParam) {
            const symList = symptomsParam.split(',');
            symList.forEach(id => {
                const chip = document.querySelector(`.symptom-chip[data-id="${id}"]`);
                if (chip) {
                    selectedSymptoms.add(id);
                    chip.classList.add('active');
                }
            });
            updateMatrix(true);
        }
    }

    // ACTION BAR CONTROLLERS
    const onCallBtn = document.getElementById('onCallToggleBtn');
    if (onCallBtn) {
        if (localStorage.getItem('cliniportal_oncall') === 'true') {
            document.documentElement.classList.add('on-call-mode');
            onCallBtn.classList.add('active');
        }

        onCallBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('on-call-mode');
            const isOnCall = document.documentElement.classList.contains('on-call-mode');
            onCallBtn.classList.toggle('active', isOnCall);
            localStorage.setItem('cliniportal_oncall', isOnCall ? 'true' : 'false');
        });
    }

    // QUICK JUMP CONTROLLERS (Mobile & Toolbar)
    function scrollToCard(selector) {
        const el = resultsPanel.querySelector(selector);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            alert('Vui lòng chọn triệu chứng trước để xem thông tin phân tích.');
        }
    }

    document.getElementById('jumpRedFlagsBtn')?.addEventListener('click', () => scrollToCard('.card-danger'));
    document.getElementById('jumpDiagsBtn')?.addEventListener('click', () => scrollToCard('.card-info'));
    document.getElementById('mobileNavRedFlagBtn')?.addEventListener('click', () => scrollToCard('.card-danger'));
    document.getElementById('mobileNavDiagBtn')?.addEventListener('click', () => scrollToCard('.card-info'));
    document.getElementById('mobileNavGapBtn')?.addEventListener('click', () => scrollToCard('.card-purple'));

    const copyBtn = document.getElementById('copySummaryBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            if (selectedSymptoms.size === 0) {
                alert('Vui lòng chọn ít nhất 1 triệu chứng để sao chép tóm tắt.');
                return;
            }

            const activeSyms = Array.from(selectedSymptoms).map(id => symptomData[id]?.name).filter(Boolean);
            const contextInputs = document.querySelectorAll('.context-toggle input:checked');
            const activeContexts = Array.from(contextInputs).map(inp => inp.parentElement.textContent.trim());

            let text = `🏥 [CLINIPORTAL - MA TRẬN PHÂN TÍCH LÂM SÀNG BAYESIAN]\n`;
            text += `📅 Thời gian: ${new Date().toLocaleString('vi-VN')}\n`;
            text += `🤒 Triệu chứng: ${activeSyms.join(', ')}\n`;
            if (activeContexts.length > 0) {
                text += `👤 Cơ địa: ${activeContexts.join(', ')}\n`;
            }
            text += `----------------------------------------\n`;

            const redFlagItems = resultsPanel.querySelectorAll('.red-flag-item');
            if (redFlagItems.length > 0) {
                text += `🚨 CẢNH BÁO ĐỎ (RED FLAGS):\n`;
                redFlagItems.forEach(item => {
                    text += `- ${item.querySelector('.red-flag-text')?.innerText.replace('\n', ' ')}\n`;
                });
                text += `\n`;
            }

            const diffItems = resultsPanel.querySelectorAll('.diff-diag-item');
            if (diffItems.length > 0) {
                text += `🩺 CHẨN ĐOÁN PHÂN BIỆT BAYESIAN:\n`;
                diffItems.forEach(item => {
                    const name = item.querySelector('.diff-diag-name')?.innerText.trim();
                    const score = item.querySelector('.match-score-badge')?.innerText.trim();
                    text += `- ${name} (${score})\n`;
                });
                text += `\n`;
            }

            navigator.clipboard.writeText(text).then(() => {
                alert('✅ Đã sao chép tóm tắt lâm sàng vào clipboard!');
            }).catch(err => {
                console.error('Không thể sao chép:', err);
            });
        });
    }

    const saveCaseBtn = document.getElementById('saveCaseBtn');
    const viewSavedCasesBtn = document.getElementById('viewSavedCasesBtn');
    const savedCasesModal = document.getElementById('savedCasesModal');
    const closeSavedCasesBtn = document.getElementById('closeSavedCasesBtn');
    const savedCasesList = document.getElementById('savedCasesList');
    const savedCasesCount = document.getElementById('savedCasesCount');

    function getSavedCases() {
        try {
            return JSON.parse(localStorage.getItem('cliniportal_saved_cases') || '[]');
        } catch(e) {
            return [];
        }
    }

    function updateSavedCasesCount() {
        if (savedCasesCount) {
            const cases = getSavedCases();
            savedCasesCount.innerText = cases.length;
        }
    }

    if (saveCaseBtn) {
        saveCaseBtn.addEventListener('click', () => {
            if (selectedSymptoms.size === 0) {
                alert('Vui lòng chọn ít nhất 1 triệu chứng để lưu ca bệnh.');
                return;
            }

            const caseName = prompt('Nhập tên hoặc mã bệnh nhân (Ví dụ: BN Nguyễn Văn A - Đau ngực):');
            if (!caseName) return;

            const contextInputs = document.querySelectorAll('.context-toggle input:checked');
            const activeContexts = Array.from(contextInputs).map(inp => inp.value);

            const newCase = {
                id: Date.now(),
                name: caseName,
                timestamp: new Date().toLocaleString('vi-VN'),
                symptoms: Array.from(selectedSymptoms),
                contexts: activeContexts
            };

            const cases = getSavedCases();
            cases.unshift(newCase);
            localStorage.setItem('cliniportal_saved_cases', JSON.stringify(cases));
            updateSavedCasesCount();
            alert(`✅ Đã lưu ca bệnh: "${caseName}"`);
        });
    }

    function renderSavedCases() {
        if (!savedCasesList) return;
        const cases = getSavedCases();

        if (cases.length === 0) {
            savedCasesList.innerHTML = `
                <div class="empty-saved-cases">
                    <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; color: var(--color-text-muted); margin-bottom: 12px;"></i>
                    <p>Chưa có ca bệnh nào được lưu.</p>
                </div>
            `;
            return;
        }

        savedCasesList.innerHTML = cases.map(c => {
            const symNames = c.symptoms.map(id => symptomData[id]?.name || id).join(', ');
            return `
                <div class="saved-case-card">
                    <div class="saved-case-info">
                        <h4>${c.name}</h4>
                        <div class="saved-case-meta"><i class="fa-solid fa-clock"></i> ${c.timestamp}</div>
                        <div class="saved-case-syms"><strong>Triệu chứng:</strong> ${symNames}</div>
                    </div>
                    <div class="saved-case-actions">
                        <button class="load-case-btn" data-id="${c.id}"><i class="fa-solid fa-folder-show"></i> Mở</button>
                        <button class="delete-case-btn" data-id="${c.id}"><i class="fa-solid fa-trash"></i> Xóa</button>
                    </div>
                </div>
            `;
        }).join('');

        savedCasesList.querySelectorAll('.load-case-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const caseId = Number(btn.getAttribute('data-id'));
                const cases = getSavedCases();
                const target = cases.find(item => item.id === caseId);
                if (target) {
                    selectedSymptoms.clear();
                    document.querySelectorAll('.symptom-chip').forEach(c => c.classList.remove('active'));
                    document.querySelectorAll('.context-toggle input').forEach(inp => inp.checked = false);

                    target.contexts.forEach(ctx => {
                        const inp = document.querySelector(`.context-toggle input[value="${ctx}"]`);
                        if (inp) inp.checked = true;
                    });
                    target.symptoms.forEach(id => {
                        const chip = document.querySelector(`.symptom-chip[data-id="${id}"]`);
                        if (chip) {
                            selectedSymptoms.add(id);
                            chip.classList.add('active');
                        }
                    });

                    updateMatrix();
                    savedCasesModal.classList.remove('active');
                }
            });
        });

        savedCasesList.querySelectorAll('.delete-case-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const caseId = Number(btn.getAttribute('data-id'));
                let cases = getSavedCases();
                cases = cases.filter(item => item.id !== caseId);
                localStorage.setItem('cliniportal_saved_cases', JSON.stringify(cases));
                updateSavedCasesCount();
                renderSavedCases();
            });
        });
    }

    if (viewSavedCasesBtn && savedCasesModal && closeSavedCasesBtn) {
        viewSavedCasesBtn.addEventListener('click', () => {
            renderSavedCases();
            savedCasesModal.classList.add('active');
        });
        closeSavedCasesBtn.addEventListener('click', () => {
            savedCasesModal.classList.remove('active');
        });
        savedCasesModal.addEventListener('click', (e) => {
            if (e.target === savedCasesModal) {
                savedCasesModal.classList.remove('active');
            }
        });
    }

    const printBtn = document.getElementById('printReportBtn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            if (selectedSymptoms.size === 0) {
                alert('Vui lòng chọn triệu chứng trước khi in báo cáo.');
                return;
            }
            window.print();
        });
    }

    // ----------------------------------------------------
    // TIMELINE PROGRESSION MODE CONTROLLERS (Phase 1-2-3)
    // ----------------------------------------------------
    const phaseBtns = document.querySelectorAll('.phase-btn');
    const replayBtn = document.getElementById('replayProgressionBtn');

    // Preset phase progression data for simulation
    const phasePresets = {
        1: ['sot', 'daubung'],
        2: ['sot', 'daubung', 'vangda'],
        3: ['sot', 'daubung', 'vangda', 'roiloanythuc']
    };

    let currentPhase = 1;

    function setPhase(phaseNum) {
        currentPhase = phaseNum;
        phaseBtns.forEach(btn => {
            const p = Number(btn.getAttribute('data-phase'));
            if (p === phaseNum) {
                btn.classList.add('active');
                btn.style.background = 'var(--color-primary)';
                btn.style.color = 'white';
            } else {
                btn.classList.remove('active');
                btn.style.background = 'var(--color-surface)';
                btn.style.color = 'var(--color-text)';
            }
        });

        // Set symptoms from preset
        const syms = phasePresets[phaseNum] || [];
        selectedSymptoms.clear();
        document.querySelectorAll('.symptom-chip').forEach(chip => {
            const id = chip.getAttribute('data-id');
            if (syms.includes(id)) {
                selectedSymptoms.add(id);
                chip.classList.add('active');
            } else {
                chip.classList.remove('active');
            }
        });

        updateMatrix();
    }

    phaseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const p = Number(btn.getAttribute('data-phase'));
            setPhase(p);
        });
    });

    if (replayBtn) {
        replayBtn.addEventListener('click', () => {
            let step = 1;
            setPhase(1);

            const interval = setInterval(() => {
                step++;
                if (step <= 3) {
                    setPhase(step);
                } else {
                    clearInterval(interval);
                }
            }, 1400);
        });
    }

    // Initialize
    loadFromUrlParams();
    updateSavedCasesCount();
});

