// ══════════════════════════════════════════
//  PHARMACOLOGY SYMPTOM CORE SCRIPTS
//  Shared JS for Symptom Treatment Algorithms
// ══════════════════════════════════════════

/**
 * Reset all active nodes and hide scenarios / result panels
 */
function resetAll() {
    // Remove active state from nodes
    document.querySelectorAll('.fc-node:not(.nc-root)').forEach(n => n.classList.remove('active'));
    
    // Disable active layers
    const layerTypes = document.getElementById('layer-types');
    if (layerTypes) layerTypes.className = 'fc-layer-disabled';
    
    const layerLocs = document.getElementById('layer-locations');
    if (layerLocs) layerLocs.className = 'fc-layer-disabled';
    
    const layerScenarios = document.getElementById('layer-scenarios');
    if (layerScenarios) layerScenarios.style.display = 'none';
    
    // Hide results panel
    const protoPanel = document.getElementById('proto-panel');
    if (protoPanel) protoPanel.style.display = 'none';
}

/**
 * Display specific drug protocol details inside the results panel
 * @param {string} key - The scenario key inside DB.scenarios
 * @param {string} colorCode - The theme color code for the protocol title (default is teal)
 */
function displayProtocol(key, colorCode = 'var(--fc-teal)') {
    // DB is defined in page scope
    if (typeof DB === 'undefined' || !DB.scenarios || !DB.scenarios[key]) {
        console.warn(`[pharmacology-symptoms.js] Protocol key "${key}" not found in DB.`);
        return;
    }

    const d = DB.scenarios[key];
    const rows = d.drugs.map(dr => `<tr><td><strong>${dr.name}</strong></td><td>${dr.dose}</td><td>${dr.duration}</td></tr>`).join('');
    
    const protoPanel = document.getElementById('proto-panel');
    if (protoPanel) {
        protoPanel.style.display = 'block';
        protoPanel.innerHTML = `
            <div class="proto-panel">
                <div class="proto-badge">💊 Phác đồ Dược lý</div>
                <div class="proto-panel-title" style="color:${colorCode}; border-color:${colorCode};">📋 PHÁC ĐỒ ĐIỀU TRỊ DƯỢC LÝ CHI TIẾT</div>
                <p style="font-size:14px; font-weight:700; margin-bottom:10px;">${d.title}</p>
                <table class="drug-table">
                    <thead>
                        <tr>
                            <th>Tên Thuốc / Hoạt Chất</th>
                            <th>Liều Lượng & Đường Dùng</th>
                            <th>Thời Gian</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
                <div class="ab ab-danger"><strong>🚫 Chống chỉ định:</strong> ${d.ci}</div>
                <div class="ab ab-warn"><strong>⚠️ Lưu ý quan trọng:</strong> ${d.warn}</div>
                <div class="ab ab-info"><strong>🔄 Tương tác thuốc:</strong> ${d.ia}</div>
                <span class="src-badge">📚 ${d.source}</span>
            </div>
        `;
        protoPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

/**
 * Display emergency red flag warning panel and redirect to surgical/higher services
 * @param {string} name - Name of the suspected condition causing the emergency
 */
function showEmergency(name) {
    const protoPanel = document.getElementById('proto-panel');
    if (protoPanel) {
        protoPanel.style.display = 'block';
        protoPanel.innerHTML = `
            <div class="proto-panel">
                <div class="ab ab-danger" style="margin-top:0;">
                    <h3 style="margin:0 0 6px;">⚠️ CHỈ ĐỊNH CHUYỂN TUYẾN KHẨN CẤP</h3>
                    <p><strong>Tình trạng nghi ngờ:</strong> ${name}.</p>
                    <p><strong>Nguyên tắc dược lý:</strong> Không tự ý kê đơn điều trị nội khoa tại chỗ. Chuyển tuyến ngoại khoa ngay để tránh biến chứng đe dọa tính mạng.</p>
                </div>
            </div>
        `;
        
        // Remove active state from other scenario nodes
        document.querySelectorAll('#row-scenarios .fc-node').forEach(x => x.classList.remove('active'));
        
        // Mark current click node as active
        if (typeof event !== 'undefined' && event.currentTarget) {
            event.currentTarget.classList.add('active');
        }
        
        protoPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}
