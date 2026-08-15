const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../knowledge-vault/HÓA SINH Y HỌC 2024.md');
const content = fs.readFileSync(filePath, 'utf8');

// Tìm các đoạn bắt đầu từng chương
const chapterIndices = [
  { id: 'ch01', name: 'Chương 1: Hóa học Glucid', search: /Chương I[\s\n]+.*HÓA HỌC GLUCID/i },
  { id: 'ch02', name: 'Chương 2: Hóa học Lipid', search: /Chương II[\s\n]+.*HÓA HỌC LIPID/i },
  { id: 'ch03', name: 'Chương 3: Hóa học Protid', search: /Chương III[\s\n]+.*HÓA HỌC PROTID/i },
  { id: 'ch04', name: 'Chương 4: Hóa học Hemoglobin', search: /Chương IV[\s\n]+.*HÓA HỌC HEMOGLOBIN/i },
  { id: 'ch05', name: 'Chương 5: Hóa học Nucleotid và Acid Nucleic', search: /Chương V[\s\n]+.*HÓA HỌC NUCLEOTID/i },
  { id: 'ch06', name: 'Chương 6: Vitamin', search: /Chương VI[\s\n]+.*VITAMIN/i },
  { id: 'ch07', name: 'Chương 7: Enzym', search: /Chương VII[\s\n]+.*ENZYM/i },
  { id: 'ch08', name: 'Chương 8: Hormon', search: /Chương VIII[\s\n]+.*HORMON/i },
  { id: 'ch09', name: 'Chương 9: Khái niệm về Chuyển hóa các chất', search: /Chương IX[\s\n]+.*KHÁI NIỆM VỀ CHUYỂN HÓA/i },
  { id: 'ch10', name: 'Chương 10: Chuyển hóa Năng lượng', search: /Chương X[\s\n]+.*CHUYỂN HÓA NĂNG LƯỢNG/i },
  { id: 'ch11', name: 'Chương 11: Chuyển hóa Glucid', search: /Chương XI[\s\n]+.*CHUYỂN HÓA GLUCID/i },
  { id: 'ch12', name: 'Chương 12: Chuyển hóa Lipid', search: /Chương XII[\s\n]+.*CHUYỂN HÓA LIPID/i },
  { id: 'ch13', name: 'Chương 13: Chuyển hóa Protid', search: /Chương XIII[\s\n]+.*CHUYỂN HÓA PROTID/i },
  { id: 'ch14', name: 'Chương 14: Chuyển hóa Hemoglobin', search: /Chương XIV[\s\n]+.*CHUYỂN HÓA HEMOGLOBIN/i },
  { id: 'ch15', name: 'Chương 15: Chuyển hóa Acid Nucleic', search: /Chương XV[\s\n]+.*CHUYỂN HÓA ACID NUCLEIC/i },
  { id: 'ch16', name: 'Chương 16: PCR, Real-time PCR, Giải trình tự', search: /Chương XVI[\s\n]+.*PCR/i },
  { id: 'ch17', name: 'Chương 17: Sinh tổng hợp Protein', search: /Chương XVII[\s\n]+.*SINH TỔNG HỢP PROTEIN/i },
  { id: 'ch18', name: 'Chương 18: Liên quan và Điều hòa Chuyển hóa', search: /Chương XVIII[\s\n]+.*LIÊN QUAN VÀ ĐIỀU HÒA/i }
];

console.log('--- KHẢO SÁT CHƯƠNG ---');
chapterIndices.forEach(c => {
  const match = content.search(c.search);
  console.log(`${c.name} -> Index: ${match}`);
});
