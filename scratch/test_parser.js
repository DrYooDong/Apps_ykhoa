const testInput = "Ăn thuần chay giảm nguy cơ bệnh tim thiếu máu cục bộ 25%-30% vs Ăn chay giảm 20%-25%; Giảm 20%-50% tỷ lệ mắc đái tháo đường típ 2; Nhóm thuần chay giảm 8%-16% nguy cơ ung thư toàn bộ so với nhóm ăn mặn; Thực phẩm siêu chế biến thực vật làm tăng 20%-30% nguy cơ tử vong do mọi nguyên nhân";

const MEDICAL_ABBREV_MAP = [
  { regex: /\bđái tháo đường (?:típ|tuýp)\s*2\b/gi, replacement: 'ĐTĐ Típ 2' },
  { regex: /\bbệnh tim thiếu máu cục bộ\b/gi, replacement: 'Tim thiếu máu' },
  { regex: /\bthực phẩm siêu chế biến thực vật|thực phẩm siêu chế biến\b/gi, replacement: 'uPDI' },
  { regex: /\bchế độ ăn thực vật lành mạnh\b/gi, replacement: 'hPDI' },
  { regex: /\btử vong do mọi nguyên nhân\b/gi, replacement: 'Tử vong mọi nguyên nhân' },
  { regex: /\bung thư toàn bộ\b/gi, replacement: 'Ung thư toàn bộ' }
];

function abbreviateMedicalText(text) {
  if (!text) return '';
  let str = text;
  MEDICAL_ABBREV_MAP.forEach(item => {
    str = str.replace(item.regex, item.replacement);
  });
  return str;
}

function cleanMedicalLabel(rawLabel) {
  if (!rawLabel) return '';
  let str = rawLabel.trim();

  str = str.replace(/^(?:đoán|án|tỷ lệ|kết quả|cho thấy|đạt|bằng|trong|nghiên cứu|thử nghiệm|phân tích|về|ở|đối với|khi|so với|vs|là|bị|nhóm|làm)\s+/gi, '');
  str = str.replace(/\s+(?:đạt|là|cho thấy|được|ở|với|bằng|so với|vs|làm|nhóm|do mọi nguyên nhân|mọi nguyên nhân)\s*$/gi, '');
  str = str.replace(/\b(?:bằng|đạt|cho thấy|được|là|với|vs|so với)\b/gi, ' ');

  str = abbreviateMedicalText(str);

  str = str.replace(/\s+/g, ' ').replace(/^[:\-\s,.;]+|[:\-\s,.;]+$/g, '').trim();
  if (str.length > 0) {
    str = str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
}

function extractSmartMedicalLabel(clause, beforeText, afterText, prevContext) {
  const text = (clause + ' ' + beforeText + ' ' + afterText).toLowerCase();
  const abbrevText = abbreviateMedicalText(clause);

  let group = '';
  if (/thuần chay/.test(text)) group = 'Thuần chay';
  else if (/ăn chay|chay/.test(text)) group = 'Ăn chay';
  else if (/siêu chế biến|updi/.test(text)) group = 'uPDI';

  let outcome = '';
  if (/tim thiếu máu/.test(text) || /tim thiếu máu/.test(abbrevText)) outcome = 'Tim thiếu máu';
  else if (/đái tháo đường|đtđ/.test(text) || /đtđ/.test(abbrevText)) outcome = 'ĐTĐ Típ 2';
  else if (/ung thư/.test(text)) outcome = 'Ung thư toàn bộ';
  else if (/tử vong/.test(text)) outcome = 'Tử vong';

  if (!outcome && prevContext.lastOutcome) {
    outcome = prevContext.lastOutcome;
  }

  let action = '';
  if (/giảm/.test(text)) action = 'Giảm NC';
  else if (/tăng/.test(text)) action = 'Tăng NC';

  if (outcome) prevContext.lastOutcome = outcome;

  if (group && outcome) {
    if (group === 'Thuần chay') return `Thuần chay: ${outcome}`;
    if (group === 'Ăn chay') return `Ăn chay: ${outcome}`;
    if (group === 'uPDI') return `uPDI (Siêu chế biến): ${outcome}`;
    return `${group}: ${outcome}`;
  }
  if (outcome) {
    return `${action ? action + ' ' : ''}${outcome}`;
  }

  const cleanedAfter = cleanMedicalLabel(afterText);
  const cleanedBefore = cleanMedicalLabel(beforeText);

  if (cleanedAfter.length >= 3 && !/^(chỉ số|tỷ lệ|nhóm)$/i.test(cleanedAfter)) {
    return cleanedAfter;
  }
  if (cleanedBefore.length >= 3) {
    return cleanedBefore;
  }
  return cleanedAfter || cleanedBefore || cleanMedicalLabel(clause);
}

function parseEBMResults(cleanText) {
  const clauses = cleanText.split(/(?:[;,]|\r?\n|\bso với\b|\bvs\b)/i);
  const items = [];
  const prevContext = { lastOutcome: '' };

  for (let clauseStr of clauses) {
    const clause = clauseStr.trim();
    if (!clause) continue;

    const rangeMatch = clause.match(/(\d+(?:\.\d+)?)\s*%?\s*[-–—\u2013tođến]\s*(\d+(?:\.\d+)?)\s*%/i);
    const singleMatch = !rangeMatch ? clause.match(/(\d+(?:\.\d+)?)\s*%/i) : null;

    if (!rangeMatch && !singleMatch) continue;

    let minVal, maxVal, isRange = false;
    let matchIndex = 0, matchLength = 0;

    if (rangeMatch) {
      minVal = parseFloat(rangeMatch[1]);
      maxVal = parseFloat(rangeMatch[2]);
      if (minVal > maxVal) { const tmp = minVal; minVal = maxVal; maxVal = tmp; }
      isRange = true;
      matchIndex = rangeMatch.index;
      matchLength = rangeMatch[0].length;
    } else {
      minVal = maxVal = parseFloat(singleMatch[1]);
      isRange = false;
      matchIndex = singleMatch.index;
      matchLength = singleMatch[0].length;
    }

    const isHarm = /\b(tăng|tử vong|hại|tác dụng phụ|biến cố|tăng nguy cơ)\b/i.test(clause);
    const color = isHarm ? '#ef4444' : '#10b981';

    const beforeText = clause.substring(0, matchIndex).trim();
    const afterText = clause.substring(matchIndex + matchLength).trim();

    let rawLabel = extractSmartMedicalLabel(clause, beforeText, afterText, prevContext);

    if (!rawLabel) rawLabel = `Chỉ số #${items.length + 1}`;

    items.push({
      label: rawLabel,
      value: isRange ? Math.round((minVal + maxVal) / 2 * 10) / 10 : minVal,
      min: minVal,
      max: maxVal,
      isRange,
      isHarm,
      color,
      displayVal: isRange ? `${isHarm ? '+' : '-'}${minVal}%–${maxVal}%` : `${isHarm ? '+' : '-'}${minVal}%`
    });
  }

  return items;
}

console.log(JSON.stringify(parseEBMResults(testInput), null, 2));
