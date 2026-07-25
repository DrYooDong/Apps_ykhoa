/**
 * ════════════════════════════════════════════════════════════════════════════
 *  CLINICAL INFOGRAPHIC POSTER RENDERER — CLINI-PORTAL (APPS_YKHOA)
 *  Module tự động render Bảng tiếp cận lâm sàng Infographic & Flowchart Hybrid
 * ════════════════════════════════════════════════════════════════════════════
 */

class ClinicalInfographicRenderer {
    constructor(container, data) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.data = data || {};
        this.flowEngine = null;

        if (this.container && this.data) {
            this.render();
        }
    }

    render() {
        if (!this.container) return;
        this.container.innerHTML = '';

        const boardEl = document.createElement('div');
        boardEl.className = 'infographic-poster-board';

        // 1. Hero Header Banner
        boardEl.appendChild(this.buildHeroBanner());

        // 2. Urgent Alert Banner (Nếu có)
        if (this.data.urgentAlert) {
            boardEl.appendChild(this.buildUrgentAlert(this.data.urgentAlert));
        }

        // 3. Hybrid Main Section (Flowchart + Side Cards)
        boardEl.appendChild(this.buildHybridSection());

        // 4. Bottom Section: Process Ribbon (Nếu có)
        if (this.data.processRibbon && this.data.processRibbon.length > 0) {
            boardEl.appendChild(this.buildProcessRibbon(this.data.processRibbon));
        }

        // 5. Clinical Pearls & Takeaway Banner
        if (this.data.pearls || this.data.takeaway) {
            boardEl.appendChild(this.buildPearlsSection());
        }

        // 6. Citation & Disclaimer Footer
        boardEl.appendChild(this.buildFooter());

        this.container.appendChild(boardEl);

        // Khởi tạo MedicalDrawEngine nếu có Flowchart
        this.initFlowchartEngine();
    }

    buildHeroBanner() {
        const header = document.createElement('div');
        header.className = 'poster-hero-banner';

        const titleText = this.data.title || 'PHÁC ĐỒ TIẾP CẬN VÀ ĐIỀU TRỊ LÂM SÀNG';
        const subText = this.data.subtitle || '';
        
        let guidelinesHtml = '';
        if (this.data.guidelines && this.data.guidelines.length > 0) {
            guidelinesHtml = `
                <div class="poster-guidelines-strip">
                    <span style="font-size:0.75rem; color:#94a3b8; font-weight:600;">Nguồn / Khuyến cáo:</span>
                    ${this.data.guidelines.map(g => `<span class="guideline-tag"><i class="fa-solid fa-bookmark"></i> ${g}</span>`).join('')}
                </div>
            `;
        }

        header.innerHTML = `
            <h1 class="poster-hero-title"><i class="fa-solid fa-notes-medical"></i> ${titleText}</h1>
            ${subText ? `<div class="poster-hero-subtitle">${subText}</div>` : ''}
            ${guidelinesHtml}
        `;
        return header;
    }

    buildUrgentAlert(alertData) {
        const banner = document.createElement('div');
        banner.className = 'urgent-alert-banner';
        banner.id = 'urgent-alert-card';

        const stepBadge = alertData.step ? `<span class="alert-banner-badge">${alertData.step}</span>` : '';
        const title = alertData.title || 'ĐÁNH GIÁ NGAY TÌNH TRẠNG CẦN XỬ TRÍ KHẨN';
        const items = alertData.items || [];
        const callout = alertData.actionText || 'XỬ TRÍ CẤP CỨU / HỘI CHẨN NGAY';

        banner.innerHTML = `
            <div class="alert-banner-header">
                ${stepBadge}
                <h2 class="alert-banner-title"><i class="fa-solid fa-truck-medical"></i> ${title}</h2>
            </div>
            <ul class="alert-banner-list">
                ${items.map(it => `<li class="alert-banner-item">${it}</li>`).join('')}
            </ul>
            <div class="alert-action-callout"><i class="fa-solid fa-bell"></i> ${callout}</div>
        `;
        return banner;
    }

    buildHybridSection() {
        const grid = document.createElement('div');
        grid.className = 'poster-hybrid-grid';

        // Left Main Column: Flowchart / Step-ladder / Comparison
        const mainCol = document.createElement('div');
        mainCol.className = 'poster-main-col';

        if (this.data.flowchart) {
            const flowSection = document.createElement('div');
            flowSection.className = 'poster-flowchart-wrapper';
            flowSection.style.background = 'var(--color-surface)';
            flowSection.style.border = '1px solid var(--color-border)';
            flowSection.style.borderRadius = '12px';
            flowSection.style.padding = '1rem';
            flowSection.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)';

            const flowHeader = document.createElement('div');
            flowHeader.className = 'poster-section-header';
            flowHeader.innerHTML = `
                <span class="step-num-badge">2</span>
                <h3 class="poster-section-title">${this.data.flowchart.title || 'LƯU ĐỒ CHẨN ĐOÁN CHÍNH'}</h3>
            `;
            flowSection.appendChild(flowHeader);

            const canvasDiv = document.createElement('div');
            canvasDiv.id = 'poster-draw-canvas-container';
            canvasDiv.style.width = '100%';
            
            // Tính toán sơ bộ chiều cao chuẩn từ nodes
            const nodes = this.data.flowchart.nodes || [];
            let calcHeight = 420;
            if (nodes.length > 0) {
                const bottoms = nodes.map(n => (n.y || 0) + (n.height || 80));
                calcHeight = Math.max(340, Math.max(...bottoms) + 50);
            }

            canvasDiv.style.minHeight = `${calcHeight}px`;
            canvasDiv.style.height = `${calcHeight}px`;
            canvasDiv.style.position = 'relative';
            canvasDiv.style.overflow = 'hidden';
            flowSection.appendChild(canvasDiv);

            mainCol.appendChild(flowSection);
        }

        // Bảng so sánh hoặc phân loại vị trí (nếu có)
        if (this.data.comparisonSection) {
            mainCol.appendChild(this.buildComparisonSection(this.data.comparisonSection));
        }

        // Right Side Column: Side Cards & Dose Tables
        const sideCol = document.createElement('div');
        sideCol.className = 'poster-side-col';

        // Dose Table Card
        if (this.data.dosingSection) {
            sideCol.appendChild(this.buildDoseCard(this.data.dosingSection));
        }

        // Additional Side Cards
        if (this.data.sideCards && this.data.sideCards.length > 0) {
            this.data.sideCards.forEach(cardData => {
                sideCol.appendChild(this.buildSideCard(cardData));
            });
        }

        grid.appendChild(mainCol);
        if (sideCol.children.length > 0) {
            grid.appendChild(sideCol);
        }
        return grid;
    }

    buildComparisonSection(compData) {
        const wrapper = document.createElement('div');
        wrapper.className = 'comparison-section-wrapper';
        wrapper.id = 'comparison-card-section';

        const stepBadge = compData.step ? `<span class="step-num-badge">${compData.step}</span>` : '';
        const title = compData.title || 'PHÂN LOẠI & LỰA CHỌN ĐIỀU TRỊ';

        wrapper.innerHTML = `
            <div class="poster-section-header">
                ${stepBadge}
                <h3 class="poster-section-title">${title}</h3>
            </div>
            <div class="comparison-card-grid">
                ${(compData.columns || []).map(col => `
                    <div class="comparison-card">
                        <div class="comparison-card-header ${col.theme || 'navy'}">
                            <i class="fa-solid ${col.icon || 'fa-layer-group'}"></i> ${col.title}
                        </div>
                        <div class="comparison-card-body">
                            ${col.bullets ? `<ul>${col.bullets.map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
                            ${col.subColumns ? col.subColumns.map(sc => `
                                <div style="background:var(--color-bg); padding:0.6rem; border-radius:6px; margin-top:0.4rem;">
                                    <div style="font-weight:700; font-size:0.85rem; color:var(--color-primary); margin-bottom:0.25rem;">${sc.subtitle}</div>
                                    <ul>${sc.bullets.map(sb => `<li>${sb}</li>`).join('')}</ul>
                                </div>
                            `).join('') : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        return wrapper;
    }

    buildDoseCard(doseData) {
        const card = document.createElement('div');
        card.className = 'dose-table-card';
        card.id = 'dose-table-card-section';

        const headerTitle = doseData.title || 'LỰA CHỌN & LIỀU DÙNG THUỐC';
        const drugs = doseData.drugs || [];
        const notice = doseData.notice || doseData.specialNotices;

        let noticeHtml = '';
        if (Array.isArray(notice)) {
            noticeHtml = `<div class="dose-notice-box">${notice.map(n => `<div>• ${n}</div>`).join('')}</div>`;
        } else if (typeof notice === 'string') {
            noticeHtml = `<div class="dose-notice-box">${notice}</div>`;
        }

        card.innerHTML = `
            <div class="dose-table-header">
                <i class="fa-solid fa-pills"></i> ${headerTitle}
            </div>
            <div class="dose-table-body">
                ${drugs.map(d => `
                    <div class="dose-drug-row">
                        <div class="dose-drug-name"><i class="fa-solid fa-capsules"></i> ${d.name}</div>
                        <div class="dose-drug-val">${d.dose}</div>
                    </div>
                `).join('')}
            </div>
            ${noticeHtml}
        `;
        return card;
    }

    buildSideCard(cardData) {
        const card = document.createElement('div');
        card.className = 'comparison-card';
        card.id = cardData.id || `side-card-${Math.random().toString(36).substr(2, 5)}`;

        const theme = cardData.colorTheme || 'blue';
        const icon = cardData.icon || 'fa-info-circle';
        const title = cardData.title || 'THÔNG TIN BỔ SUNG';
        const items = cardData.items || [];

        card.innerHTML = `
            <div class="comparison-card-header ${theme}">
                <i class="fa-solid ${icon}"></i> ${title}
            </div>
            <div class="comparison-card-body">
                ${items.map(it => {
                    if (typeof it === 'string') return `<div>• ${it}</div>`;
                    return `
                        <div style="margin-bottom:0.5rem;">
                            <div style="font-weight:700; color:var(--color-primary);">${it.name || it.label || ''}</div>
                            <div style="font-size:0.85rem; color:var(--color-text-muted);">${it.desc || it.value || ''}</div>
                        </div>
                    `;
                }).join('')}
                ${cardData.footerNotice ? `<div class="dose-notice-box" style="margin:0.5rem 0 0 0;">${cardData.footerNotice}</div>` : ''}
            </div>
        `;
        return card;
    }

    buildProcessRibbon(ribbonData) {
        const wrapper = document.createElement('div');
        wrapper.className = 'process-pipeline-ribbon';

        wrapper.innerHTML = `
            <div class="poster-section-header" style="margin-bottom:0.25rem;">
                <span class="step-num-badge"><i class="fa-solid fa-diagram-next"></i></span>
                <h3 class="poster-section-title">THÔNG ĐỆP THỰC HÀNH — QUY TRÌNH TIẾP CẬN</h3>
            </div>
            <div class="pipeline-steps-container">
                ${ribbonData.map((step, idx) => `
                    <div class="pipeline-step-item" onclick="ClinicalInfographicRenderer.highlightSection('${step.targetId || ''}')">
                        <div class="pipeline-icon-circle">
                            <i class="fa-solid ${step.icon || 'fa-check'}"></i>
                        </div>
                        <span class="pipeline-step-label">${step.label}</span>
                    </div>
                    ${idx < ribbonData.length - 1 ? '<span class="pipeline-arrow-divider">➔</span>' : ''}
                `).join('')}
            </div>
        `;
        return wrapper;
    }

    buildPearlsSection() {
        const container = document.createElement('div');
        container.className = 'pearls-section-container';

        if (this.data.takeaway) {
            const takeaway = document.createElement('div');
            takeaway.className = 'practical-takeaway-banner';
            takeaway.innerHTML = `
                <i class="fa-solid fa-bullhorn takeaway-icon"></i>
                <div class="takeaway-content">
                    <h4 class="takeaway-title">${this.data.takeaway.title || 'THÔNG ĐỆP THỰC HÀNH'}</h4>
                    <p class="takeaway-text">${this.data.takeaway.content}</p>
                </div>
            `;
            container.appendChild(takeaway);
        }
        return container;
    }

    buildFooter() {
        const footer = document.createElement('div');
        footer.className = 'poster-citation-footer';
        footer.innerHTML = `
            <div>
                <strong>Nguồn tổng hợp:</strong> ${this.data.source || 'CliniPortal Evidence-Based Medicine Team'}
            </div>
            <div>
                🔒 <em>Tài liệu nhằm mục đích tham khảo lâm sàng, không thay thế phác đồ bệnh viện.</em>
            </div>
        `;
        return footer;
    }

    initFlowchartEngine() {
        const canvasContainer = this.container.querySelector('#poster-draw-canvas-container');
        if (canvasContainer && this.data.flowchart && window.MedicalDrawEngine) {
            const nodes = this.data.flowchart.nodes || [];
            let calcHeight = 420;
            if (nodes.length > 0) {
                const bottoms = nodes.map(n => (n.y || 0) + (n.height || 80));
                calcHeight = Math.max(340, Math.max(...bottoms) + 50);
            }

            canvasContainer.style.minHeight = `${calcHeight}px`;
            canvasContainer.style.height = `${calcHeight}px`;

            this.flowEngine = new MedicalDrawEngine({
                container: canvasContainer,
                width: this.data.flowchart.width || 800,
                height: calcHeight,
                readOnly: true,
                onNodeSelect: (node) => {
                    if (node && node.targetCardId) {
                        ClinicalInfographicRenderer.highlightSection(node.targetCardId);
                    }
                }
            });
            this.flowEngine.loadDiagram(this.data.flowchart);
        }
    }

    static highlightSection(sectionId) {
        if (!sectionId) return;
        const el = document.getElementById(sectionId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.add('card-highlight-active');
            setTimeout(() => {
                el.classList.remove('card-highlight-active');
            }, 2500);
        }
    }
}

// Window export
if (typeof window !== 'undefined') {
    window.ClinicalInfographicRenderer = ClinicalInfographicRenderer;
}
