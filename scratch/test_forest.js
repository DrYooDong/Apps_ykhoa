const sep = '(?:đến|dến|dên|to|[-\u2013\u2014,])';
const unit = '(?:\\s+[a-zA-Z%°µμ/-]+)?';
const metric = '(aHR|aOR|HR|OR|RR|RD|ARR|NNT|NNH|RRR|SMD|MD|WMD|IRR|PR|ORR|CR)';

const EXCLUDED_ACRONYMS = new Set([
  'MACE', 'ASCVD', 'HFrEF', 'HFmrEF', 'HFpEF', 'CKD', 'T2D', 'CI', 'HR', 'OR', 'RR', 'ARR', 'RRR',
  'SGLT2I', 'GLP-1', 'RAAS', 'ACEI', 'ARB', 'ARNI', 'FDA', 'PICO', 'ITT', 'PP', 'MASLD', 'BMI',
  'HBA1C', 'EGFR', 'UACR', 'NT-PROBNP', 'HS-CTNT', 'NHÓM', 'CHUNG', 'TRONG', 'VÀ', 'KHI', 'TỪ',
  'KHÔNG', 'CHO', 'THẤY', 'CÓ', 'CÁC', 'BỆNH', 'NHÂN'
]);

function extractLabelFromContext(preText, metricName, itemIndex, state) {
  let cleanPre = preText.replace(/[\n\r\t]+/g, ' ').replace(/\s+/g, ' ').trim();

  // Search for ALL-CAPS trial acronyms in original text (e.g. FLOW, SMART-C, FIDELITY, EMPA-REG)
  const words = cleanPre.split(/[\s,;:.()"'\[\]]+/);
  for (let i = 0; i < words.length; i++) {
    const orig = words[i];
    if (/^[A-Z0-9-]{3,15}$/.test(orig) && !EXCLUDED_ACRONYMS.has(orig) && !/^\d+$/.test(orig)) {
      state.currentStudy = orig;
    }
  }

  // Extract outcome phrase
  let outcome = '';
  if (/suy tim mới mắc/i.test(cleanPre)) outcome = 'Suy tim mới mắc';
  else if (/suy tim/i.test(cleanPre)) outcome = 'Biến cố Suy tim';
  else if (/mace/i.test(cleanPre)) outcome = 'MACE';
  else if (/tử vong do tim mạch|tử vong tm|cv death/i.test(cleanPre)) outcome = 'Tử vong TM';
  else if (/tử vong mọi nguyên nhân|all-cause/i.test(cleanPre)) outcome = 'Tử vong chung';
  else if (/nhập viện/i.test(cleanPre)) outcome = 'Nhập viện suy tim';
  else if (/bệnh thận|tiến triển ckd|thận/i.test(cleanPre)) outcome = 'Biến cố Thận';
  else if (/đột quỵ|stroke/i.test(cleanPre)) outcome = 'Đột quỵ';
  else if (/nhồi máu cơ tim|mi\b/i.test(cleanPre)) outcome = 'Nhồi máu cơ tim';
  else {
    let snippet = cleanPre.split(/(?:[.;]|\bphân tích|\bthử nghiệm|\btrong)\s+/i).pop() || cleanPre;
    snippet = snippet.replace(/^(?:thử nghiệm|phân tích gộp|trong phân tích|cho thấy|giúp giảm|giảm|và|kèm|trên|ở nhóm|ở bệnh nhân|nghiên cứu|đối với|kết quả|cho|thấy|ở)\s+/gi, '').trim();
    outcome = snippet.replace(/^[:\-\s,]+|[:\-\s,]+$/g, '');
    if (outcome.length > 25) outcome = outcome.substring(0, 24) + '…';
  }

  const study = state.currentStudy || '';
  if (study && outcome) return `${study}: ${outcome}`;
  if (study) return `${study} (${metricName})`;
  if (outcome) return outcome;
  return `${metricName} #${itemIndex}`;
}

function parseForestDataAll(keyResults) {
  if (!keyResults) return null;

  let jsonObj = null;
  if (typeof keyResults === 'object') {
    jsonObj = keyResults;
  } else if (typeof keyResults === 'string' && keyResults.trim().startsWith('{')) {
    try { jsonObj = JSON.parse(keyResults.trim()); } catch(e) {}
  }

  if (jsonObj && Array.isArray(jsonObj.items) && jsonObj.items.length > 0) {
    return {
      type: 'forest-multi',
      title: jsonObj.title || '',
      items: jsonObj.items
    };
  }

  if (typeof keyResults !== 'string') return null;

  const globalPattern = new RegExp(
    `\\b${metric}\\s*[=:]?\\s*(-?[\\d.]+${unit})\\s*` +
    `(?:` +
      `\\([^)]*?CI[^\\d-]*(-?[\\d.]+)\\s*${sep}\\s*(-?[\\d.]+)[^)]*\\)|` +
      `\\([^)]*?CI[^\\d-]*(-?[\\d.]+)\\s+to\\s+(-?[\\d.]+)[^)]*\\)|` +
      `\\(\\s*(-?[\\d.]+)\\s*${sep}\\s*(-?[\\d.]+)[^)]*\\)|` +
      `\\[[^\\]]*?CI[^\\d-]*(-?[\\d.]+)\\s*${sep}\\s*(-?[\\d.]+)[^\\]]*\\]|` +
      `[,;]\\s*(?:95%\\s*)?CI\\s*[=:]?\\s*(-?[\\d.]+)\\s*${sep}\\s*(-?[\\d.]+)|` +
      `\\s+(?:95%\\s*)?CI\\s*[=:]?\\s*\\[?\\s*(-?[\\d.]+)\\s*${sep}\\s*(-?[\\d.]+)\\]?` +
    `)`,
    'gi'
  );

  const matches = [];
  let match;
  let lastIndex = 0;
  const state = { currentStudy: '' };

  while ((match = globalPattern.exec(keyResults)) !== null) {
    const startIndex = match.index;
    const fullMatchStr = match[0];

    const metricName = (match[1] || '').toUpperCase();
    const rawEst = (match[2] || '').trim().split(/\s+/)[0];
    const estimate = parseFloat(rawEst);

    const ciLowerStr = match[3] || match[5] || match[7] || match[9] || match[11] || match[13];
    const ciUpperStr = match[4] || match[6] || match[8] || match[10] || match[12] || match[14];

    const lower = parseFloat(ciLowerStr);
    const upper = parseFloat(ciUpperStr);

    if (isNaN(estimate) || isNaN(lower) || isNaN(upper)) continue;
    if (lower > estimate || estimate > upper) continue;
    if (Math.abs(upper - lower) > 500) continue;

    const preText = keyResults.substring(lastIndex, startIndex);
    lastIndex = startIndex + fullMatchStr.length;

    const label = extractLabelFromContext(preText, metricName, matches.length + 1, state);

    let pValue = null;
    const postSnippet = keyResults.substring(lastIndex, lastIndex + 30);
    const pMatch = (preText + ' ' + postSnippet).match(/\bp\s*([<>=]=?)\s*([\d.]+)/i);
    if (pMatch) {
      const op = pMatch[1].replace('=', '');
      pValue = op ? `${op}${pMatch[2]}` : pMatch[2];
    }

    const allowNeg = ['MD', 'SMD', 'WMD', 'RD', 'ARR'].includes(metricName);
    const isGreen = allowNeg ? estimate < 0.0 : estimate < 1.0;
    const isHarm  = allowNeg ? estimate > 0.0 : estimate > 1.0;

    matches.push({
      type: 'forest',
      label,
      metric: metricName,
      estimate,
      lower,
      upper,
      pValue,
      isGreen,
      isHarm
    });
  }

  if (matches.length > 0) {
    return {
      type: 'forest-multi',
      items: matches
    };
  }
  return null;
}

const testText1 = "Thử nghiệm FLOW cho thấy semaglutide giảm đáng kể biến cố suy tim ở nhóm chung: HR 0.74 (95% CI 0.58-0.94) và giảm suy tim mới mắc ở nhóm không có suy tim nền: HR 0.68 (95% CI 0.50-0.91). Phân tích gộp SMART-C cho thấy SGLT2i giúp giảm MACE: HR 0.90 (95% CI 0.84-0.96) và tử vong do tim mạch: HR 0.80 (95% CI 0.72-0.88) ở bệnh nhân có albumin niệu. Trong phân tích FIDELITY, finerenone giảm 21% biến cố suy tim: HR 0.79 (95% CI 0.66-0.92).";

console.log(JSON.stringify(parseForestDataAll(testText1), null, 2));
