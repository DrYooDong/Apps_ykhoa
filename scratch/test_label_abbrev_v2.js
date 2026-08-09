const ABBREV_MAP = [
  { regex: /\bchẩn đoán\b/gi, replacement: 'CĐ' },
  { regex: /\bđiều trị\b/gi, replacement: 'ĐTr' },
  { regex: /\btỷ lệ\b/gi, replacement: 'TL' },
  { regex: /\bphương pháp\b/gi, replacement: 'PP' },
  { regex: /\bbệnh nhân\b/gi, replacement: 'BN' },
  { regex: /\bxét nghiệm\b/gi, replacement: 'XN' },
  { regex: /\bphát hiện\b/gi, replacement: 'PH' },
  { regex: /\bnguy cơ\b/gi, replacement: 'NC' },
  { regex: /\btử vong\b/gi, replacement: 'TV' },
  { regex: /\bsuy tim\b/gi, replacement: 'ST' },
  { regex: /\bnhập viện\b/gi, replacement: 'NV' },
  { regex: /\bbiến cố\b/gi, replacement: 'BC' },
  { regex: /\bthử nghiệm\b/gi, replacement: 'TN' },
  { regex: /\bphân tích\b/gi, replacement: 'PT' },
  { regex: /\bcan thiệp\b/gi, replacement: 'CT' },
  { regex: /\bđối chứng\b/gi, replacement: 'ĐC' },
  { regex: /\bnhuộm soi\b/gi, replacement: 'Soi' },
  { regex: /\blao phổi\b/gi, replacement: 'Lao phổi' }
];

function abbreviateMedicalText(text) {
  if (!text) return '';
  let str = text;
  ABBREV_MAP.forEach(item => {
    str = str.replace(item.regex, item.replacement);
  });
  return str;
}

function cleanMedicalLabel(rawLabel) {
  if (!rawLabel) return '';
  let str = rawLabel.trim();

  // Strip leading/trailing connector & filler words
  str = str.replace(/^(?:tỷ lệ|kết quả|cho thấy|đạt|bằng|trong|nghiên cứu|thử nghiệm|phân tích|về|ở|đối với|khi|so với|là)\s+/gi, '');
  str = str.replace(/\s+(?:đạt|là|cho thấy|được|ở|với|bằng|so với)\s*$/gi, '');
  str = str.replace(/\b(?:bằng|đạt|cho thấy|được|là|với)\b/gi, ' ');

  // Apply medical abbreviation map
  str = abbreviateMedicalText(str);

  // Strip redundant double spaces and clean edge punctuation
  str = str.replace(/\s+/g, ' ').replace(/^[:\-\s,.;]+|[:\-\s,.;]+$/g, '').trim();
  
  return str;
}

function parseChartDataUniversal(keyResults) {
  if (!keyResults || typeof keyResults !== 'string') return null;

  const cleanText = keyResults.trim();

  // 1. Dual/Multi Percentage Comparison (e.g. "CĐ BAL-CBNAAT 91.75% (89/97) so với soi AFB 0% (0/97)")
  const pctMatches = [];
  const pctRegex = /(?:([a-zA-ZÀ-ỹ0-9\s_–-]{2,45})[\s:]+)?(\d+(?:\.\d+)?)\s*%\s*(?:\(\s*(\d+)\s*\/\s*(\d+)\s*\))?/gi;
  let m;
  let lastIdx = 0;

  while ((m = pctRegex.exec(cleanText)) !== null) {
    let rawSnippet = m[1] || '';
    if (!rawSnippet) {
      const prevText = cleanText.substring(lastIdx, m.index);
      const parts = prevText.split(/(?:[.,;]|\bso với\b|\bvs\b)/i);
      rawSnippet = parts.pop() || '';
    }
    lastIdx = m.index + m[0].length;

    const pctVal = parseFloat(m[2]);
    const count = m[3] ? parseInt(m[3], 10) : null;
    const total = m[4] ? parseInt(m[4], 10) : null;

    let label = cleanMedicalLabel(rawSnippet);
    if (!label) label = `Chỉ số #${pctMatches.length + 1}`;

    pctMatches.push({
      label,
      value: pctVal,
      count,
      total
    });
  }

  if (pctMatches.length >= 2) {
    return {
      type: 'comparison',
      items: pctMatches.slice(0, 4).map((it, idx) => ({
        label: it.label,
        value: it.value,
        count: it.count,
        total: it.total,
        color: idx === 0 ? '#10b981' : idx === 1 ? '#ef4444' : '#2563eb'
      }))
    };
  } else if (pctMatches.length === 1) {
    return {
      type: 'donut-progress',
      label: pctMatches[0].label || 'Tỷ lệ đạt được',
      pct: pctMatches[0].value,
      count: pctMatches[0].count,
      total: pctMatches[0].total
    };
  }

  return null;
}

const sampleUserText = "Tỷ lệ chẩn đoán lao phổi bằng BAL-CBNAAT đạt 91.75% (89/97) so với tỷ lệ chẩn đoán bằng phương pháp nhuộm soi AFB dịch BAL là 0% (0/97).";
console.log('Parsed Chart Data:', JSON.stringify(parseChartDataUniversal(sampleUserText), null, 2));
