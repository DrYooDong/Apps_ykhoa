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
  { regex: /\bso với\b/gi, replacement: 'vs' }
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

  // Strip filler words
  str = str.replace(/^(?:tỷ lệ|kết quả|cho thấy|đạt|bằng|trong|nghiên cứu|thử nghiệm|phân tích|về|ở|đối với|khi|so với)\s+/gi, '');
  str = str.replace(/\b(?:bằng|đạt|cho thấy|được|là|ở|với|đạt)\b/gi, ' ');
  str = str.replace(/\s+/g, ' ').trim();

  // Apply medical abbreviation map
  str = abbreviateMedicalText(str);

  // Clean up punctuation
  str = str.replace(/^[:\-\s,]+|[:\-\s,]+$/g, '');
  return str;
}

function parseComparativePercentages(text) {
  if (!text) return null;
  const cleanText = text.trim();

  const pctRegex = /(?:([a-zA-ZÀ-ỹ0-9\s_–-]{2,45})[\s:]+)?(\d+(?:\.\d+)?)\s*%\s*(?:\(\s*(\d+)\s*\/\s*(\d+)\s*\))?/gi;
  
  const matches = [];
  let m;
  let lastIdx = 0;

  while ((m = pctRegex.exec(cleanText)) !== null) {
    const rawLabelSnippet = m[1] || cleanText.substring(lastIdx, m.index);
    lastIdx = m.index + m[0].length;

    const pctVal = parseFloat(m[2]);
    const count = m[3] ? parseInt(m[3], 10) : null;
    const total = m[4] ? parseInt(m[4], 10) : null;

    let label = cleanMedicalLabel(rawLabelSnippet);
    if (!label) label = `Nhóm #${matches.length + 1}`;

    matches.push({
      label,
      value: pctVal,
      count,
      total
    });
  }

  if (matches.length >= 2) {
    return {
      type: 'comparison',
      items: matches.slice(0, 4).map((it, idx) => ({
        label: it.label,
        value: it.value,
        count: it.count,
        total: it.total,
        color: idx === 0 ? '#10b981' : idx === 1 ? '#ef4444' : '#2563eb'
      }))
    };
  } else if (matches.length === 1) {
    return {
      type: 'donut-progress',
      label: matches[0].label,
      pct: matches[0].value,
      count: matches[0].count,
      total: matches[0].total
    };
  }

  return null;
}

// TEST USER'S EXACT TEXT FROM SCREENSHOT
const sampleUserText = "Tỷ lệ chẩn đoán lao phổi bằng BAL-CBNAAT đạt 91.75% (89/97) so với tỷ lệ chẩn đoán bằng phương pháp nhuộm soi AFB dịch BAL là 0% (0/97).";
console.log('Result for User Screenshot Text:', JSON.stringify(parseComparativePercentages(sampleUserText), null, 2));
