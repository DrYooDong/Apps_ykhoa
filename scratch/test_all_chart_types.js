function parseChartDataUniversal(keyResults) {
  if (!keyResults) return null;

  let jsonObj = null;
  if (typeof keyResults === 'object') {
    jsonObj = keyResults;
  } else if (typeof keyResults === 'string' && keyResults.trim().startsWith('{')) {
    try { jsonObj = JSON.parse(keyResults.trim()); } catch(e) {}
  }

  if (jsonObj) {
    const chartType = String(jsonObj.type || jsonObj.chartType || '').toLowerCase();
    if (['column', 'vertical-bar', 'bar-v', 'cot', 'cột'].includes(chartType)) {
      return { type: 'column', title: jsonObj.title || '', unit: jsonObj.unit || '%', data: Array.isArray(jsonObj.data) ? jsonObj.data : [] };
    }
    if (['horizontal-bar', 'bar-h', 'hbar', 'ngang'].includes(chartType)) {
      return { type: 'horizontal-bar', title: jsonObj.title || '', unit: jsonObj.unit || '%', data: Array.isArray(jsonObj.data) ? jsonObj.data : [] };
    }
    if (['donut', 'progress', 'percentage', 'ty-le'].includes(chartType)) {
      return { type: 'donut-progress', label: jsonObj.label || 'Tỷ lệ', pct: parseFloat(jsonObj.pct || jsonObj.value || 0), count: jsonObj.count || null, total: jsonObj.total || null };
    }
  }

  if (typeof keyResults === 'string') {
    const cleanText = keyResults.trim();

    // 1. Column chart syntax "COL: A: 10 | B: 20"
    const colMatch = cleanText.match(/^(?:COL|CỘT|BAR_V|COLUMN)\s*:\s*(.+)$/i);
    if (colMatch) {
      const itemsRaw = colMatch[1].split('|');
      const data = [];
      const colors = ['#16a34a', '#dc2626', '#2563eb', '#d97706', '#7c3aed', '#0d9488'];
      itemsRaw.forEach((itemStr, idx) => {
        const parts = itemStr.split(/[:=]/);
        if (parts.length >= 2) {
          const label = parts[0].trim();
          const valNum = parseFloat(parts[1].replace(/[^\d.-]/g, ''));
          if (!isNaN(valNum)) {
            data.push({ label, value: valNum, color: colors[idx % colors.length] });
          }
        }
      });
      if (data.length > 0) return { type: 'column', title: '', unit: '%', data };
    }

    // 2. Horizontal bar chart syntax "HBAR: A: 10 | B: 20"
    const hbarMatch = cleanText.match(/^(?:HBAR|NGANG|BAR_H|HORIZONTAL)\s*:\s*(.+)$/i);
    if (hbarMatch) {
      const itemsRaw = hbarMatch[1].split('|');
      const data = [];
      const colors = ['#2563eb', '#16a34a', '#d97706', '#dc2626', '#7c3aed', '#0d9488'];
      itemsRaw.forEach((itemStr, idx) => {
        const parts = itemStr.split(/[:=]/);
        if (parts.length >= 2) {
          const label = parts[0].trim();
          const valNum = parseFloat(parts[1].replace(/[^\d.-]/g, ''));
          if (!isNaN(valNum)) {
            data.push({ label, value: valNum, color: colors[idx % colors.length] });
          }
        }
      });
      if (data.length > 0) return { type: 'horizontal-bar', title: '', unit: '%', data };
    }

    // 3. Forest plot (Single or Multi-row) if keyResults contains HR/OR/RR and CI
    const forestRes = parseForestDataAll(cleanText);
    if (forestRes) return forestRes;

    // 4. Comparison percentages (e.g. "3.7% vs 5.9%" or "Can thiệp 12.5% so với đối chứng 24.8%")
    const compMatch = cleanText.match(/(?:([a-zA-ZÀ-ỹ0-9\s_–-]{2,25})[:\s]+)?(\d+(?:\.\d+)?)\s*%\s*(?:vs\.?|so với|versus|vs)\s*(?:([a-zA-ZÀ-ỹ0-9\s_–-]{2,25})[:\s]+)?(\d+(?:\.\d+)?)\s*%/i);
    if (compMatch) {
      const label1 = (compMatch[1] || 'Can thiệp').trim().replace(/^[:\-\s,]+|[:\-\s,]+$/g, '');
      const val1 = parseFloat(compMatch[2]);
      const label2 = (compMatch[3] || 'Đối chứng').trim().replace(/^[:\-\s,]+|[:\-\s,]+$/g, '');
      const val2 = parseFloat(compMatch[4]);

      if (!isNaN(val1) && !isNaN(val2)) {
        return {
          type: 'comparison',
          items: [
            { label: label1 || 'Can thiệp', value: val1, color: '#10b981' },
            { label: label2 || 'Đối chứng', value: val2, color: '#ef4444' }
          ],
          arr: Math.abs(val2 - val1).toFixed(1)
        };
      }
    }

    // 5. Single Percentage with optional Fraction (e.g. "91% (63/69)" or "63/69 (91.3%)")
    const pctFracMatch = cleanText.match(/(?:([a-zA-ZÀ-ỹ0-9\s_–-]{2,30})[:\s]+)?(?:(\d+(?:\.\d+)?)\s*%\s*\(\s*(\d+)\s*\/\s*(\d+)\s*\)|(\d+)\s*\/\s*(\d+)\s*\(\s*(\d+(?:\.\d+)?)\s*%\s*\)|(\d+(?:\.\d+)?)\s*%\b)/i);
    
    if (pctFracMatch) {
      let rawLabel = (pctFracMatch[1] || '').trim().replace(/^[:\-\s,]+|[:\-\s,]+$/g, '');
      let pct = NaN, count = null, total = null;

      if (pctFracMatch[2] !== undefined) {
        pct = parseFloat(pctFracMatch[2]);
        count = parseInt(pctFracMatch[3], 10);
        total = parseInt(pctFracMatch[4], 10);
      } else if (pctFracMatch[7] !== undefined) {
        pct = parseFloat(pctFracMatch[7]);
        count = parseInt(pctFracMatch[5], 10);
        total = parseInt(pctFracMatch[6], 10);
      } else if (pctFracMatch[8] !== undefined) {
        pct = parseFloat(pctFracMatch[8]);
      }

      if (!isNaN(pct) && pct >= 0 && pct <= 100) {
        return {
          type: 'donut-progress',
          label: rawLabel || 'Tỷ lệ đạt được',
          pct: pct,
          count: count,
          total: total
        };
      }
    }

    // 6. NNT / NNH Match
    const nntMatch = cleanText.match(/\b(NNT|NNH)\s*=\s*(\d+)/i);
    if (nntMatch) {
      return {
        type: 'nnt',
        metric: nntMatch[1].toUpperCase(),
        val: parseInt(nntMatch[2], 10)
      };
    }
  }

  return null;
}

// Dummy parseForestDataAll mock for test
function parseForestDataAll(text) {
  if (text.includes('HR') && text.includes('CI')) {
    return { type: 'forest-multi', items: [{ label: 'FLOW', metric: 'HR', estimate: 0.74, lower: 0.58, upper: 0.94 }] };
  }
  return null;
}

// TESTS
console.log('Sample 1 ("91% (63/69)"):', parseChartDataUniversal("91% (63/69)"));
console.log('Sample 2 ("Tỷ lệ khỏi bệnh 91% (63/69)"):', parseChartDataUniversal("Tỷ lệ khỏi bệnh 91% (63/69)"));
console.log('Sample 3 ("Tỷ lệ MACE: Can thiệp 3.7% vs Placebo 5.9%"):', parseChartDataUniversal("Tỷ lệ MACE: Can thiệp 3.7% vs Placebo 5.9%"));
console.log('Sample 4 ("HR 0.74 (95% CI 0.58-0.94)"):', parseChartDataUniversal("HR 0.74 (95% CI 0.58-0.94)"));
console.log('Sample 5 ("NNT = 19 trong 3 năm"):', parseChartDataUniversal("NNT = 19 trong 3 năm"));
