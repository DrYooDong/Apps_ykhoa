/**
 * CliniPortal - Non-HTML Data Engine for Phân hệ Tiếp cận
 * Core engine parsing JSON schemas, CSV tabular matrices, Markdown content, and SVG vector schematics.
 * Supports offline-first file:/// protocol with embedded fallback resolvers.
 */

window.CliniPortalApproachEngine = (function() {

  // Default embedded fallback data to support offline file:/// access if fetch fails
  const EMBEDDED_FALLBACKS = {
    "emergency-pathways.json": {
      "pathways": [
        {
          "id": "pathway-soc-phan-ve",
          "title": "Phác đồ Tiếp cận & Xử trí Sốc Phản vệ (Anaphylaxis)",
          "category": "Cấp cứu",
          "description": "Thuật toán chẩn đoán sớm và phác đồ dùng Adrenaline giờ vàng cấp cứu phản vệ theo Bộ Y tế & WAO.",
          "tabs": [
            {
              "id": "chan-doan",
              "label": "1. Tiêu chuẩn Chẩn đoán",
              "nodes": [
                {
                  "id": "n1",
                  "type": "start",
                  "tag": "Bước 1 • Tiếp nhận",
                  "title": "Nghi ngờ Phản vệ khi xuất hiện đột ngột (vài phút đến vài giờ)",
                  "body": "Đánh giá ngay 1 trong 3 bệnh cảnh lâm sàng sau khi tiếp xúc dị nguyên nghi ngờ."
                },
                {
                  "id": "n2",
                  "type": "question",
                  "tag": "Bước 2 • Phân loại Bệnh cảnh",
                  "title": "Có triệu chứng ở Da/Niêm mạc kèm theo Hô hấp hoặc Tuần hoàn?",
                  "body": "Mày đay, ngứa, phù Quincke + (Khó thở, khò khè, Tụt HA, ngất).",
                  "details": {
                    "title": "🔍 Chi tiết 3 Bệnh cảnh Lâm sàng Chẩn đoán Phản vệ:",
                    "items": [
                      "Bệnh cảnh 1: Da/Niêm mạc + Hô hấp HOẶC Tụt HA.",
                      "Bệnh cảnh 2: Có 2 trong 4 triệu chứng: Da/Niêm mạc, Hô hấp, Tụt HA, Tiêu hóa.",
                      "Bệnh cảnh 3: Tụt HA đột ngột sau khi tiếp xúc dị nguyên đã biết."
                    ]
                  }
                },
                {
                  "id": "n3_yes",
                  "type": "danger",
                  "tag": "Cấp cứu Khẩn",
                  "title": "🚨 Phản vệ Độ 2 trở lên (Sốc Phản vệ)",
                  "body": "Tiêm Adrenaline 1/1000 ngay lập tức vào mặt ngoài giữa đùi! Không chờ đợi!",
                  "details": {
                    "title": "⚡ Liều Adrenaline Cấp cứu:",
                    "items": [
                      "Người lớn: 1/2 - 1 ống (0.5 - 1 ml) tiêm bắp.",
                      "Trẻ em: 0.01 ml/kg (tối đa 0.5 ml) tiêm bắp.",
                      "Lặp lại mỗi 3 - 5 phút nếu chưa cải thiện."
                    ]
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    "symptom-matrix.csv": `SymptomCode,SymptomName,Category,Urgency,RedFlags,PrimaryDiagnoses,FirstLineInvestigations,InitialManagement
TC-HO,Ho kéo dài & Ho máu,Hô hấp - Tim mạch,High,"Ho máu lớn (>100ml/24h), Sút cân","Lao phổi, Ung thư phổi, Thuyên tắc phổi","X-quang ngực, CT ngực, D-dimer","Cho thở Oxy, Nằm nghiêng bên tổn thương"
TC-DAU-NGUC,Đau ngực cấp tính,Tim mạch,Critical,"Đau xé lan sau lưng, Tụt HA, Vã mồ hôi","STEMI/NSTEMI, Bóc tách ĐMC, Thuyên tắc phổi","ECG 12 chuyển đạo, hs-Troponin, D-dimer","Aspirin + Clopidogrel, Kích hoạt CathLab"
TC-SOT,Sốt kéo dài chưa rõ nguyên nhân,Toàn thân,Medium,"Cứng cổ, Tử ban hoại tử, Rối loạn tri giác","Nhiễm trùng huyết, Viêm màng não, SXH","Công thức máu, Cấy máu, PCR SXH","Hạ sốt Paracetamol, Bù dịch Oresol"
TC-VANG-DA,Vàng da ứ mật & Tế bào gan,Tiêu hóa - Bụng,High,"Tam chứng Charcot, Rối loạn đông máu","Viêm đường mật cấp, Xơ gan mất bù","Bilirubin, Men gan, Siêu âm bụng, MRCP","Kháng sinh phổ rộng, ERCP gắp sỏi"`,
    "clinical-pearls.md": `# Nguyên tắc Cốt lõi & Khuyến cáo Lâm sàng trong Tiếp cận Lâm sàng

> **Tài nguyên y học chứng cứ CliniPortal** — Cập nhật theo Hướng dẫn Ministry of Health, AHA/ACC, ESC, & WAO 2026.

---

## ⚡ 1. Khai thác Triệu chứng & Sàng lọc Dấu hiệu Cờ đỏ (Red Flags)

- **Hệ Hô hấp - Tuần hoàn**: SpO2 < 92%, Nhịp thở > 30 lần/phút, Huyết áp tâm thu < 90 mmHg hoặc Mạch > 120 lần/phút.
- **Hệ Thần kinh**: Điểm Glasgow < 13, Cổ cứng, Liệt vận động đột ngột hoặc Co giật kéo dài > 5 phút.

---

## 💡 2. Các Bước Lý luận Lâm sàng Theo Mô hình 7 Bước CliniPortal

1. **Ổn định ban đầu & Cờ đỏ**
2. **Thu thập dữ kiện bệnh sử & Khám**
3. **Lập danh sách Chẩn đoán Phân biệt**
4. **Biện luận xác suất Tiền nghiệm & Hậu nghiệm**
5. **Chỉ định Cận lâm sàng Hợp lý**
6. **Xử trí ban đầu giờ vàng**
7. **Đánh giá lại & Tiên lượng**`
  };

  /**
   * Helper to load text resources with fetch and fallback
   */
  async function fetchResource(url, filename) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.text();
    } catch (err) {
      console.warn(`[ApproachEngine] Fetch failed for ${url}, using fallback engine:`, err.message);
      if (EMBEDDED_FALLBACKS[filename]) {
        return typeof EMBEDDED_FALLBACKS[filename] === 'object'
          ? JSON.stringify(EMBEDDED_FALLBACKS[filename])
          : EMBEDDED_FALLBACKS[filename];
      }
      throw err;
    }
  }

  /**
   * 1. CSV Parser
   */
  function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    if (lines.length === 0) return [];
    
    function parseCSVLine(line) {
      const result = [];
      let start = 0;
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        if (line[i] === '"') {
          inQuotes = !inQuotes;
        } else if (line[i] === ',' && !inQuotes) {
          let val = line.substring(start, i).trim();
          if (val.startsWith('"') && val.endsWith('"')) {
            val = val.substring(1, val.length - 1).replace(/""/g, '"');
          }
          result.push(val);
          start = i + 1;
        }
      }
      let val = line.substring(start).trim();
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.substring(1, val.length - 1).replace(/""/g, '"');
      }
      result.push(val);
      return result;
    }

    const headers = parseCSVLine(lines[0]);
    const data = [];
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const values = parseCSVLine(lines[i]);
      const row = {};
      headers.forEach((h, idx) => {
        row[h] = values[idx] || '';
      });
      data.push(row);
    }
    return data;
  }

  /**
   * 2. Lightweight Markdown to HTML Parser
   */
  function parseMarkdown(mdText) {
    if (!mdText) return '';
    let html = mdText
      .replace(/^### (.*$)/gim, '<h4 class="md-h4">$1</h4>')
      .replace(/^## (.*$)/gim, '<h3 class="md-h3">$1</h3>')
      .replace(/^# (.*$)/gim, '<h2 class="md-h2">$1</h2>')
      .replace(/^> \[\!WARNING\]\s*(.*$)/gim, '<div class="alert alert-warning"><i class="fas fa-exclamation-triangle"></i> <strong>Cảnh báo:</strong> $1</div>')
      .replace(/^> \[\!NOTE\]\s*(.*$)/gim, '<div class="alert alert-info"><i class="fas fa-info-circle"></i> $1</div>')
      .replace(/^> (.*$)/gim, '<blockquote class="md-quote">$1</blockquote>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/^\- (.*$)/gim, '<li>$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li>$1</li>');

    // Wrap continuous <li> elements in <ul>
    html = html.replace(/(<li>[\s\S]*?<\/li>)/g, function(match) {
      return '<ul class="md-list">' + match + '</ul>';
    });
    // Remove duplicate consecutive ul tags
    html = html.replace(/<\/ul>\s*<ul class="md-list">/g, '');

    // Paragraph breaks
    html = html.split('\n\n').map(p => {
      p = p.trim();
      if (!p) return '';
      if (p.startsWith('<h') || p.startsWith('<div') || p.startsWith('<ul') || p.startsWith('<blockquote')) {
        return p;
      }
      return `<p class="md-paragraph">${p}</p>`;
    }).join('\n');

    return html;
  }

  /**
   * 3. Interactive JSON Flowchart Renderer
   */
  function renderJSONFlowchart(pathwayData, containerElement) {
    if (!containerElement || !pathwayData) return;

    let html = `
      <div class="json-flowchart-card">
        <div class="json-flowchart-header">
          <div class="badge-urgency ${pathwayData.urgency ? pathwayData.urgency.toLowerCase() : ''}">${pathwayData.category || 'Thuật toán'}</div>
          <h3>${pathwayData.title}</h3>
          <p>${pathwayData.description}</p>
        </div>
    `;

    if (pathwayData.tabs && pathwayData.tabs.length > 0) {
      html += `<div class="json-flow-tabs">`;
      pathwayData.tabs.forEach((tab, index) => {
        html += `
          <button class="json-tab-btn ${index === 0 ? 'active' : ''}" onclick="CliniPortalApproachEngine.switchJSONTab(this, '${tab.id}')">
            ${tab.label}
          </button>
        `;
      });
      html += `</div>`;

      html += `<div class="json-flow-panes">`;
      pathwayData.tabs.forEach((tab, index) => {
        html += `<div class="json-pane ${index === 0 ? 'active' : ''}" id="json-pane-${tab.id}">`;
        
        tab.nodes.forEach(node => {
          const typeClass = `fnode-${node.type || 'info'}`;
          const isClickable = node.details ? 'clickable' : '';
          
          html += `
            <div class="fnode ${typeClass} ${isClickable}" ${node.details ? `onclick="CliniPortalApproachEngine.toggleNodeDetails(this)"` : ''}>
              ${node.tag ? `<div class="fnode-tag">${node.tag}</div>` : ''}
              <div class="fnode-title">${node.title}</div>
              <p class="fnode-body">${node.body}</p>
              ${node.details ? `<div class="fnode-expand-hint"><span class="expand-icon">▼</span> Nhấp để xem chi tiết tiêu chuẩn</div>` : ''}
              ${node.details ? `
                <div class="fnode-details" style="display:none;">
                  <div class="detail-box">
                    <div class="detail-box-title">${node.details.title || 'Chi tiết:'}</div>
                    <ul>
                      ${(node.details.items || []).map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    ${node.details.actionButton ? `
                      <button class="btn-flow btn-danger" style="margin-top:10px;" onclick="event.stopPropagation(); CliniPortalApproachEngine.switchJSONTabById('${node.details.actionButton.targetTab}')">
                        ${node.details.actionButton.label}
                      </button>
                    ` : ''}
                  </div>
                </div>
              ` : ''}
            </div>
            <div class="flow-connector">
              <div class="flow-connector-line"></div>
              <div class="flow-connector-arrow"></div>
            </div>
          `;
        });

        html += `</div>`;
      });
      html += `</div>`;
    }

    html += `</div>`;
    containerElement.innerHTML = html;
  }

  /**
   * Node expand/collapse toggle
   */
  function toggleNodeDetails(nodeEl) {
    const details = nodeEl.querySelector('.fnode-details');
    const hint = nodeEl.querySelector('.fnode-expand-hint .expand-icon');
    if (!details) return;
    if (details.style.display === 'none' || !details.style.display) {
      details.style.display = 'block';
      if (hint) hint.textContent = '▲';
    } else {
      details.style.display = 'none';
      if (hint) hint.textContent = '▼';
    }
  }

  /**
   * Switch JSON flowchart tabs
   */
  function switchJSONTab(btnEl, tabId) {
    const card = btnEl.closest('.json-flowchart-card');
    if (!card) return;
    card.querySelectorAll('.json-tab-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');

    card.querySelectorAll('.json-pane').forEach(p => p.classList.remove('active'));
    const targetPane = card.querySelector(`#json-pane-${tabId}`);
    if (targetPane) targetPane.classList.add('active');
  }

  function switchJSONTabById(tabId) {
    const targetPane = document.querySelector(`#json-pane-${tabId}`);
    if (!targetPane) return;
    const card = targetPane.closest('.json-flowchart-card');
    if (!card) return;
    card.querySelectorAll('.json-pane').forEach(p => p.classList.remove('active'));
    targetPane.classList.add('active');

    card.querySelectorAll('.json-tab-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('onclick').includes(`'${tabId}'`));
    });
  }

  /**
   * Render CSV Matrix into Dynamic HTML Table
   */
  function renderCSVMatrix(csvData, containerElement) {
    if (!containerElement || !Array.isArray(csvData) || csvData.length === 0) return;

    let html = `
      <div class="csv-matrix-card">
        <div class="csv-matrix-controls">
          <input type="text" class="csv-search-input" placeholder="🔍 Tìm kiếm triệu chứng, cờ đỏ, chẩn đoán..." onkeyup="CliniPortalApproachEngine.filterCSVTable(this)">
        </div>
        <div class="symptom-table-wrapper">
          <table class="symptom-table csv-table">
            <thead>
              <tr>
                <th>Mã TC</th>
                <th>Tên Triệu chứng</th>
                <th>Phân nhóm</th>
                <th>Mức khẩn</th>
                <th>Dấu hiệu Cờ đỏ (Red Flags)</th>
                <th>Chẩn đoán Phân biệt</th>
                <th>Cận lâm sàng Đề nghị</th>
                <th>Xử trí Ban đầu</th>
              </tr>
            </thead>
            <tbody>
    `;

    csvData.forEach(row => {
      const urgencyClass = (row.Urgency || '').toLowerCase();
      html += `
        <tr>
          <td><code>${row.SymptomCode || ''}</code></td>
          <td><strong>${row.SymptomName || ''}</strong></td>
          <td><span class="badge-category">${row.Category || ''}</span></td>
          <td><span class="badge-urgency ${urgencyClass}">${row.Urgency || ''}</span></td>
          <td class="text-danger"><strong>${row.RedFlags || ''}</strong></td>
          <td>${row.PrimaryDiagnoses || ''}</td>
          <td>${row.FirstLineInvestigations || ''}</td>
          <td>${row.InitialManagement || ''}</td>
        </tr>
      `;
    });

    html += `
            </tbody>
          </table>
        </div>
      </div>
    `;

    containerElement.innerHTML = html;
  }

  /**
   * Filter CSV table live
   */
  function filterCSVTable(inputEl) {
    const filter = inputEl.value.toLowerCase();
    const table = inputEl.closest('.csv-matrix-card').querySelector('.csv-table');
    if (!table) return;
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(tr => {
      const text = tr.textContent.toLowerCase();
      tr.style.display = text.includes(filter) ? '' : 'none';
    });
  }

  return {
    fetchResource,
    parseCSV,
    parseMarkdown,
    renderJSONFlowchart,
    toggleNodeDetails,
    switchJSONTab,
    switchJSONTabById,
    renderCSVMatrix,
    filterCSVTable
  };

})();
