const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../knowledge-vault/HÓA SINH Y HỌC 2024.md');
if (!fs.existsSync(filePath)) {
  console.log('File not found:', filePath);
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');
console.log('Total lines:', lines.length);

const typoRules = [
  // Thuật ngữ hóa sinh
  { regex: /\bglueid\b/gi, fix: 'glucid' },
  { regex: /\bglugid\b/gi, fix: 'glucid' },
  { regex: /\bgiuid\b/gi, fix: 'glucid' },
  { regex: /\bglueose\b/gi, fix: 'glucose' },
  { regex: /\baleol\b/gi, fix: 'alcol' },
  { regex: /\bpolyaleol\b/gi, fix: 'polyalcol' },
  { regex: /\bproiid\b/gi, fix: 'protid' },
  { regex: /\bmonosaoarid\b/gi, fix: 'monosacarid' },
  { regex: /\bmonosaearid\b/gi, fix: 'monosacarid' },
  { regex: /\bmonobhacarid\b/gi, fix: 'monosacarid' },
  { regex: /\bmonosecorid\b/gi, fix: 'monosacarid' },
  { regex: /\bmơnosacarid\b/gi, fix: 'monosacarid' },
  { regex: /\bglyeogen\b/gi, fix: 'glycogen' },
  { regex: /\beellulose\b/gi, fix: 'cellulose' },
  { regex: /\bglyeoprotein\b/gi, fix: 'glycoprotein' },
  { regex: /\bglyooprotein\b/gi, fix: 'glycoprotein' },
  { regex: /\bglycbsid\b/gi, fix: 'glycosid' },
  { regex: /\bglyeosid\b/gi, fix: 'glycosid' },
  { regex: /\baoid\b/gi, fix: 'acid' },
  { regex: /\baeefie\b/gi, fix: 'acetic' },
  { regex: /\bglueuronic\b/gi, fix: 'glucuronic' },
  { regex: /\bgluzuronie\b/gi, fix: 'glucuronic' },
  { regex: /\bgluoonic\b/gi, fix: 'gluconic' },
  { regex: /\benatiomer\b/gi, fix: 'enantiomer' },
  { regex: /\bHaworlh\b/gi, fix: 'Haworth' },
  { regex: /\bHaworih\b/gi, fix: 'Haworth' },
  { regex: /\bfurRural\b/gi, fix: 'furfural' },
  { regex: /\bScliwanoff\b/gi, fix: 'Seliwanoff' },
  { regex: /\besfe\b/gi, fix: 'este' },
  
  // Lỗi OCR tiếng Việt dấu & ký tự thường gặp
  { regex: /\bđạng\b/g, fix: 'dạng' },
  { regex: /\bđụ\b/g, fix: 'dụ' },
  { regex: /\bVí đụ\b/g, fix: 'Ví dụ' },
  { regex: /\bđùng\b/g, fix: 'dùng' },
  { regex: /\bđưới\b/g, fix: 'dưới' },
  { regex: /\bkhữ\b/g, fix: 'khử' },
  { regex: /\bkhứ\b/g, fix: 'khử' },
  { regex: /\bphố biển\b/g, fix: 'phổ biến' },
  { regex: /\btỉnh bật\b/g, fix: 'tinh bột' },
  { regex: /\bdung địch\b/g, fix: 'dung dịch' },
  { regex: /\bTrình Bầy\b/g, fix: 'Trình bày' },
  { regex: /\bthờc\b/g, fix: 'được' },
  { regex: /\bdình nghĩa\b/g, fix: 'định nghĩa' },
  { regex: /\btình chất\b/g, fix: 'tính chất' },
  { regex: /\btiêu biệt\b/g, fix: 'tiêu biểu' },
  { regex: /\bngọi\b/g, fix: 'ngọt' },
  { regex: /\btáo dụng\b/g, fix: 'tác dụng' },
  { regex: /\bPhân ứng\b/g, fix: 'Phản ứng' },
  { regex: /\bHỘI ĐÔNG THÁM DỊNH\b/g, fix: 'HỘI ĐỒNG THẨM ĐỊNH' },
  { regex: /\bBẠN BIẾN SOẠN\b/g, fix: 'BAN BIÊN SOẠN' },
  { regex: /\bTHÀNH PHÓ HÒ CHÍ MINH\b/g, fix: 'THÀNH PHỐ HỒ CHÍ MINH' }
];

let totalMatches = 0;
const statMap = {};

lines.forEach((line, lineIdx) => {
  typoRules.forEach(rule => {
    const matches = line.match(rule.regex);
    if (matches) {
      const key = `${matches[0]} -> ${rule.fix}`;
      statMap[key] = (statMap[key] || 0) + matches.length;
      totalMatches += matches.length;
    }
  });
});

console.log('--- TYPO STATISTICS ---');
console.log('Total sample typo matches found:', totalMatches);
Object.entries(statMap).sort((a, b) => b[1] - a[1]).slice(0, 30).forEach(([k, v]) => {
  console.log(`- ${k}: ${v} lần`);
});
