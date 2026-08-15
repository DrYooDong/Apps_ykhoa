const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../knowledge-vault/HÓA SINH Y HỌC 2024.md');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// 1. Phân loại lỗi
const report = {
  ocrNoise: [],          // Các dòng rác vô nghĩa do scan OCR hình ảnh/bìa
  medicalTermErrors: [], // Lỗi thuật ngữ y hóa sinh
  vietnameseTypos: [],   // Lỗi tiếng Việt (sai dấu, nhầm đ/d, sai phụ âm)
  symbolErrors: []       // Lỗi công thức hóa học, chỉ số C1, C2, Cu2+...
};

// Từ điển lỗi thuật ngữ y học phổ biến do OCR
const termDictionary = [
  { match: /\b(glueid|glugid|giuid)\b/gi, correct: 'glucid', desc: 'Glucid bị nhận diện sai chữ c->e/g/u' },
  { match: /\b(glueose|Glueose)\b/g, correct: 'glucose', desc: 'Glucose nhận diện sai chữ c->e' },
  { match: /\b(aleol|Aleol|gleol|slcol)\b/g, correct: 'alcol', desc: 'Alcol nhận diện sai c->e/s' },
  { match: /\b(polyaleol|polygleol)\b/gi, correct: 'polyalcol', desc: 'Polyalcol nhận diện sai' },
  { match: /\b(proiid|proi|profein)\b/gi, correct: 'protid / protein', desc: 'Protid/Protein bị thiếu hoặc sai chữ' },
  { match: /\b(monosaoarid|monosaearid|monobhacarid|monosecorid|mơnosacarid)\b/gi, correct: 'monosacarid', desc: 'Monosacarid bị sai c->o/e, a->o/e' },
  { match: /\b(glyeogen|Glyeogen)\b/g, correct: 'glycogen', desc: 'Glycogen nhận diện sai c->e' },
  { match: /\b(eellulose)\b/gi, correct: 'cellulose', desc: 'Cellulose nhận diện c->e' },
  { match: /\b(glyeoprotein|glyooprotein|Glyeoprotein)\b/g, correct: 'glycoprotein', desc: 'Glycoprotein nhận diện c->e/o' },
  { match: /\b(glycbsid|glyeosid|glvcosid)\b/gi, correct: 'glycosid', desc: 'Glycosid bị sai o->b/e, y->v' },
  { match: /\b(aoid|Aoid)\b/g, correct: 'acid', desc: 'Acid nhận diện c->o' },
  { match: /\b(aeefie|aectic)\b/gi, correct: 'acetic', desc: 'Acetic nhận diện sai c->e/f' },
  { match: /\b(glueuronic|gluzuronie)\b/gi, correct: 'glucuronic', desc: 'Glucuronic nhận diện sai' },
  { match: /\b(gluoonic)\b/gi, correct: 'gluconic', desc: 'Gluconic nhận diện sai' },
  { match: /\b(enatiomer)\b/gi, correct: 'enantiomer', desc: 'Enantiomer thiếu chữ n' },
  { match: /\b(Haworlh|Haworih)\b/gi, correct: 'Haworth', desc: 'Haworth bị nhận diện t->l/i' },
  { match: /\b(furRural|fit\/hral)\b/gi, correct: 'furfural', desc: 'Furfural bị sai chữ' },
  { match: /\b(Scliwanoff)\b/gi, correct: 'Seliwanoff', desc: 'Thuốc thử Seliwanoff' },
  { match: /\b(esfe)\b/gi, correct: 'este', desc: 'Este bị nhận diện t->f' },
  { match: /\b(nuclcotid|nuclcic|nueleo[a-z]*)\b/gi, correct: 'nucleotid / nucleic', desc: 'Nucleotid/nucleic bị sai e->c' },
  { match: /\b(hemogiobin|hcmoglobin)\b/gi, correct: 'hemoglobin', desc: 'Hemoglobin nhận diện sai l->i, e->c' },
  { match: /\b(cholestcrol|cholesferol)\b/gi, correct: 'cholesterol', desc: 'Cholesterol sai e->c/t->f' },
  { match: /\b(biliruhin|biliruhim)\b/gi, correct: 'bilirubin', desc: 'Bilirubin sai b->h' },
  { match: /\b(transammasc|transammase)\b/gi, correct: 'transaminase', desc: 'Transaminase sai in->m' }
];

// Từ điển lỗi chính tả tiếng Việt OCR
const vnDictionary = [
  { match: /\b(đạng)\b/g, correct: 'dạng', desc: 'dạng -> đạng (nhầm d với đ)' },
  { match: /\b(đụ|Ví đụ)\b/g, correct: 'dụ / Ví dụ', desc: 'dụ -> đụ' },
  { match: /\b(đùng)\b/g, correct: 'dùng', desc: 'dùng -> đùng' },
  { match: /\b(đưới)\b/g, correct: 'dưới', desc: 'dưới -> đưới' },
  { match: /\b(khữ|khứ)\b/g, correct: 'khử', desc: 'khử -> khữ/khứ (sai dấu hỏi/ngã/sắc)' },
  { match: /\b(phố biển)\b/g, correct: 'phổ biến', desc: 'phổ biến -> phố biển' },
  { match: /\b(tỉnh bật)\b/g, correct: 'tinh bột', desc: 'tinh bột -> tỉnh bật' },
  { match: /\b(dung địch)\b/g, correct: 'dung dịch', desc: 'dung dịch -> dung địch' },
  { match: /\b(Trình Bầy)\b/g, correct: 'Trình bày', desc: 'Trình bày -> Trình Bầy' },
  { match: /\b(thờc)\b/g, correct: 'được', desc: 'được -> thờc' },
  { match: /\b(dình nghĩa)\b/g, correct: 'định nghĩa', desc: 'định nghĩa -> dình nghĩa' },
  { match: /\b(tình chất)\b/g, correct: 'tính chất', desc: 'tính chất -> tình chất' },
  { match: /\b(tiêu biệt)\b/g, correct: 'tiêu biểu', desc: 'tiêu biểu -> tiêu biệt' },
  { match: /\b(ngọi)\b/g, correct: 'ngọt', desc: 'ngọt -> ngọi (t->i)' },
  { match: /\b(táo dụng)\b/g, correct: 'tác dụng', desc: 'tác dụng -> táo dụng' },
  { match: /\b(Phân ứng)\b/g, correct: 'Phản ứng', desc: 'Phản ứng -> Phân ứng' },
  { match: /\b(chức năng ga)\b/gi, correct: 'chức năng gan', desc: 'gan -> ga' },
  { match: /\b(nồng đọ)\b/gi, correct: 'nồng độ', desc: 'độ -> đọ' },
  { match: /\b(mấu)\b/g, correct: 'máu', desc: 'máu -> mấu' },
  { match: /\b(nước tiểu)\b/g, correct: 'nước tiểu', desc: '' }
];

const symbolRegexes = [
  { match: /C¡/g, correct: 'C1', desc: 'C1 bị lỗi font thành C¡' },
  { match: /C›/g, correct: 'C2', desc: 'C2 bị lỗi font thành C›' },
  { match: /C¿/g, correct: 'C4', desc: 'C4 bị lỗi font thành C¿' },
  { match: /C;/g, correct: 'C5', desc: 'C5 bị lỗi font thành C;' },
  { match: /CuzO/g, correct: 'Cu2O', desc: 'Cu2O lỗi z->2' },
  { match: /CH¿OH/g, correct: 'CH2OH', desc: 'CH2OH lỗi ¿->2' },
  { match: /H›SO¿/g, correct: 'H2SO4', desc: 'H2SO4 lỗi ›->2, ¿->4' }
];

let termCount = 0;
let vnCount = 0;
let symCount = 0;

lines.forEach((line, idx) => {
  const lineNum = idx + 1;
  
  termDictionary.forEach(t => {
    const m = line.match(t.match);
    if (m) {
      termCount += m.length;
      report.medicalTermErrors.push({ line: lineNum, found: m[0], correct: t.correct, context: line.trim() });
    }
  });

  vnDictionary.forEach(t => {
    if (!t.desc) return;
    const m = line.match(t.match);
    if (m) {
      vnCount += m.length;
      report.vietnameseTypos.push({ line: lineNum, found: m[0], correct: t.correct, context: line.trim() });
    }
  });

  symbolRegexes.forEach(t => {
    const m = line.match(t.match);
    if (m) {
      symCount += m.length;
      report.symbolErrors.push({ line: lineNum, found: m[0], correct: t.correct, context: line.trim() });
    }
  });
});

console.log('--- KẾT QUẢ RÀ SOÁT LỖI CHÍNH TẢ & OCR ---');
console.log(`1. Lỗi thuật ngữ Hóa sinh/Y học: ${termCount} vị trí`);
console.log(`2. Lỗi chính tả Tiếng Việt OCR (dấu, nhầm đ/d, sai từ): ${vnCount} vị trí`);
console.log(`3. Lỗi ký hiệu/công thức hóa học (C¡, C›, H›SO¿...): ${symCount} vị trí`);
console.log(`\nVí dụ một số lỗi thuật ngữ tiêu biểu:`);
report.medicalTermErrors.slice(0, 10).forEach(e => console.log(`  - Dòng ${e.line}: "${e.found}" => "${e.correct}" (trong: ${e.context.substring(0, 70)}...)`));

console.log(`\nVí dụ một số lỗi tiếng Việt tiêu biểu:`);
report.vietnameseTypos.slice(0, 10).forEach(e => console.log(`  - Dòng ${e.line}: "${e.found}" => "${e.correct}" (trong: ${e.context.substring(0, 70)}...)`));

console.log(`\nVí dụ lỗi ký hiệu/công thức:`);
report.symbolErrors.slice(0, 10).forEach(e => console.log(`  - Dòng ${e.line}: "${e.found}" => "${e.correct}" (trong: ${e.context.substring(0, 70)}...)`));
