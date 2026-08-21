const fs = require('fs');
const path = require('path');

const base = 'd:/Apps_ykhoa/knowledge-vault';
const khoList = [
  'Kho dịch tễ học', 'Kho sinh lý bệnh', 'Kho chẩn đoán',
  'Kho phác đồ điều trị', 'Kho biến chứng', 'Kho cập nhật', 'Kho chưa lọc'
];

console.log('=== BẢNG KIỂM TRA ĐỐI SOÁT CUỐI CÙNG (FINAL VERIFICATION) ===\n');

let grandTotal = 0;
khoList.forEach(k => {
  const p = path.join(base, k);
  let count = 0;
  function walk(d) {
    fs.readdirSync(d, { withFileTypes: true }).forEach(it => {
      const full = path.join(d, it.name);
      if (it.isDirectory()) walk(full);
      else if (it.name.endsWith('.md') && !it.name.startsWith('MOC - ')) count++;
    });
  }
  if (fs.existsSync(p)) walk(p);
  console.log(k.padEnd(25, ' ') + ': ' + count.toString().padStart(4, ' ') + ' content markdown files');
  grandTotal += count;
});

console.log('\n------------------------------------------------------------');
console.log('TỔNG SỐ FILES ĐÃ TÁI CẤU TRÚC : ' + grandTotal + ' / 1867 files');
console.log('TỶ LỆ TOÀN VẸN DỮ LIỆU         : ' + ((grandTotal / 1867) * 100).toFixed(2) + '%');
console.log('------------------------------------------------------------\n');

// Verify top level folders
console.log('Cấu trúc thư mục gốc Knowledge Vault:');
fs.readdirSync(base, { withFileTypes: true })
  .filter(e => e.isDirectory())
  .forEach(e => console.log(' 📁 ' + e.name));
