/**
 * ════════════════════════════════════════════════════════════════════════════
 *  CSV DATA MATRIX ENGINE — PATHOLOGY MODULE (CLINIPORTAL)
 *  Động cơ nạp, xuất và dựng bảng tra cứu CSV cho Liều dùng & Chẩn đoán phân biệt
 * ════════════════════════════════════════════════════════════════════════════
 */

class PathologyCSVEngine {
    static parseCSV(csvText) {
        if (!csvText) return [];
        const lines = csvText.trim().split('\n');
        if (lines.length === 0) return [];

        const parseLine = (line) => {
            const result = [];
            let insideQuote = false;
            let currentStr = '';

            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                if (char === '"') {
                    insideQuote = !insideQuote;
                } else if (char === ',' && !insideQuote) {
                    result.push(currentStr.trim());
                    currentStr = '';
                } else {
                    currentStr += char;
                }
            }
            result.push(currentStr.trim());
            return result;
        };

        const headers = parseLine(lines[0]);
        const rows = [];

        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            const values = parseLine(lines[i]);
            const rowObj = {};
            headers.forEach((h, idx) => {
                rowObj[h] = values[idx] || '';
            });
            rows.push(rowObj);
        }

        return { headers, rows };
    }

    static renderCSVTable(parsedData, containerEl) {
        if (!containerEl || !parsedData || !parsedData.headers) {
            if (containerEl) containerEl.innerHTML = '<p class="text-muted">Không có dữ liệu CSV.</p>';
            return;
        }

        const { headers, rows } = parsedData;

        let html = `<div class="csv-table-wrapper"><table class="csv-data-table"><thead><tr>`;
        headers.forEach(h => {
            html += `<th>${h}</th>`;
        });
        html += `</tr></thead><tbody>`;

        rows.forEach(r => {
            html += `<tr>`;
            headers.forEach(h => {
                html += `<td>${r[h]}</td>`;
            });
            html += `</tr>`;
        });

        html += `</tbody></table></div>`;
        containerEl.innerHTML = html;
    }

    static async fetchAndRenderCSV(filePath, containerEl) {
        try {
            const resp = await fetch(filePath);
            if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);
            const text = await resp.text();
            const parsed = this.parseCSV(text);
            this.renderCSVTable(parsed, containerEl);
            return parsed;
        } catch (err) {
            console.error('Lỗi nạp file CSV:', err);
            if (containerEl) {
                containerEl.innerHTML = `<div class="csv-error-box"><i class="fa-solid fa-triangle-exclamation"></i> Không thể nạp file CSV: ${filePath}</div>`;
            }
            return null;
        }
    }

    static exportToCSV(parsedData, filename = 'pathology_data.csv') {
        if (!parsedData || !parsedData.headers || !parsedData.rows) return;

        let csvContent = parsedData.headers.map(h => `"${h}"`).join(',') + '\n';
        parsedData.rows.forEach(row => {
            csvContent += parsedData.headers.map(h => `"${(row[h] || '').replace(/"/g, '""')}"`).join(',') + '\n';
        });

        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    }
}

window.PathologyCSVEngine = PathologyCSVEngine;
