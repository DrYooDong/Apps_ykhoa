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
  { regex: /\bngừa\b/gi, replacement: 'Ngừa' }
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
  if (!rawLabel) return 'Tỷ lệ đạt được';
  let str = rawLabel.trim();

  // Strip leading filler words
  str = str.replace(/^(?:tỷ lệ|kết quả|cho thấy|đạt|bằng|trong|nghiên cứu|thử nghiệm|phân tích|về|ở|đối với|khi)\s+/gi, '');
  str = str.replace(/\b(?:bằng|đạt|cho thấy|được|là|ở|với)\b/gi, ' ');
  str = str.replace(/\s+/g, ' ').trim();

  // Apply medical abbreviation map
  str = abbreviateMedicalText(str);

  // Clean up punctuation
  str = str.replace(/^[:\-\s,]+|[:\-\s,]+$/g, '');
  
  if (!str) return 'Tỷ lệ đạt được';
  return str;
}

// TEST CASES
console.log('Test 1:', cleanMedicalLabel("Tỷ lệ chẩn đoán lao phổi bằng BAL-CBNAAT"));
console.log('Test 2:', cleanMedicalLabel("Tỷ lệ chẩn đoán bằng phương pháp nhuộm soi AFB dịch BAL"));
console.log('Test 3:', cleanMedicalLabel("Tỷ lệ giảm biến cố suy tim ở bệnh nhân"));
console.log('Test 4:', cleanMedicalLabel("Phương pháp điều trị bằng thuốc can thiệp"));
