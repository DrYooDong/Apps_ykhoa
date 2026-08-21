const fs = require('fs');
const path = require('path');

const vaultBase = 'd:/Apps_ykhoa/knowledge-vault';
const targetKhos = [
  '1.1. Kho giải phẫu & sinh lý',
  '1.2. Kho hóa sinh y học',
  '1.3. Kho sinh lý bệnh',
  '1.4. Kho dịch tễ học'
];

// Dictionary of Medical Abbreviations, English Names, ICD10, Keywords
const MEDICAL_DICT = {
  'hội chứng vành cấp': {
    aliases: ['ACS', 'Acute Coronary Syndrome', 'Nhồi máu cơ tim', 'NMCT', 'Đau thắt ngực không ổn định'],
    keywords: ['troponin', 'stemi', 'nste-acs', 'mona', 'ecg', 'pci', 'aspirin', 'clopidogrel', 'men tim', 'thiếu máu cơ tim'],
    icd10: ['I20', 'I21', 'I24']
  },
  'suy tim': {
    aliases: ['Heart Failure', 'HF', 'HFpEF', 'HFrEF', 'Suy tim sung huyết'],
    keywords: ['bnp', 'nt-probnp', 'ef', 'nyha', 'acei', 'arbi', 'sglt2i', 'spironolactone', 'furosemide', 'phù phổi'],
    icd10: ['I50', 'I50.1', 'I50.9']
  },
  'tăng huyết áp': {
    aliases: ['Hypertension', 'THA', 'HTN', 'Huyết áp cao'],
    keywords: ['huyet ap', 'map', 'amlodipine', 'losartan', 'perindopril', 'con tang huyet ap', 'ton thuong co quan dich'],
    icd10: ['I10', 'I11', 'I15']
  },
  'tổn thương thận cấp': {
    aliases: ['Acute Kidney Injury', 'AKI', 'Suy thận cấp', 'ARF'],
    keywords: ['kdigo', 'creatinine', 'fena', 'nuoc tieu', 'anuria', 'oliguria', 'loc mau', 'crrt'],
    icd10: ['N17', 'N17.0', 'N17.9']
  },
  'bệnh thận mạn': {
    aliases: ['Chronic Kidney Disease', 'CKD', 'Suy thận mạn', 'CRF'],
    keywords: ['egfr', 'ckd-epi', 'albumin nieu', 'loc mau chu ky', 'thay the than', 'thieu mau than'],
    icd10: ['N18', 'N18.3', 'N18.5', 'N18.9']
  },
  'đái tháo đường': {
    aliases: ['Diabetes Mellitus', 'T2D', 'T1D', 'DTĐ', 'Tiểu đường'],
    keywords: ['hba1c', 'glucose', 'insulin', 'metformin', 'dka', 'hhs', 'sglt2i', 'glp1-ra', 'bien chung mach mau'],
    icd10: ['E11', 'E10', 'E14']
  },
  'bệnh phổi tắc nghẽn mạn tính': {
    aliases: ['COPD', 'Chronic Obstructive Pulmonary Disease', 'BPTNMT'],
    keywords: ['fev1', 'fvc', 'gold', 'ho dom', 'kho tho', 'laba', 'lama', 'ics', 'dot cap copd'],
    icd10: ['J44', 'J44.0', 'J44.1', 'J44.9']
  },
  'viêm ruột thừa': {
    aliases: ['Appendicitis', 'VRT', 'Đau ruột thừa'],
    keywords: ['alvarado', 'ho chau phai', 'macburney', 'sieu am bung', 'ct bung', 'phau thuat noi soi'],
    icd10: ['K35', 'K35.8']
  },
  'liên cầu': {
    aliases: ['Streptococcus', 'Phế cầu', 'Streptococci', 'GAS', 'GBS'],
    keywords: ['lancefield', 'tieu huyet alpha beta', 's. pyogenes', 's. pneumoniae', 'khang sinh', 'penicillin'],
    icd10: ['A40', 'B95.0']
  },
  'tụ cầu': {
    aliases: ['Staphylococcus', 'Staphylococci', 'Tụ cầu vàng', 'MRSA', 'MSSA'],
    keywords: ['catalase duong', 'coagulase', 's. aureus', 's. epidermidis', 'vancomycin', 'nhiem trung da'],
    icd10: ['A41.0', 'B95.6']
  },
  'chu trình krebs': {
    aliases: ['Krebs Cycle', 'Citric Acid Cycle', 'TCA Cycle', 'Chu trình Acid Citric'],
    keywords: ['ty the', 'acetyl-coa', 'oxaloacetate', 'citrate', 'nadh', 'fadh2', 'atp', 'chuyen hoa nang luong'],
    icd10: []
  },
  'đường phân': {
    aliases: ['Glycolysis', 'Thoái hóa Glucose', 'Con đường Embden-Meyerhof'],
    keywords: ['glucose', 'pyruvate', 'lactate', 'hexokinase', 'pfk-1', 'pyruvate kinase', 'atp', 'bao tuong'],
    icd10: []
  },
  'màng tế bào': {
    aliases: ['Cell Membrane', 'Plasma Membrane', 'Màng sinh chất'],
    keywords: ['phospholipid', 'cholesterol', 'protein mang', 'kenh ion', 'van chuyen chu dong', 'khuech tan', 'dien the mang'],
    icd10: []
  }
};

console.log('Testing metadata generation on sample files in Phase 1...');

targetKhos.forEach(tk => {
  const p = path.join(vaultBase, tk);
  if (!fs.existsSync(p)) return;

  const subs = fs.readdirSync(p, { withFileTypes: true }).filter(e => e.isDirectory());
  if (subs.length > 0) {
    const subP = path.join(p, subs[0].name);
    const files = fs.readdirSync(subP).filter(f => f.endsWith('.md'));
    if (files.length > 0) {
      console.log(`\nSample from: ${tk} / ${subs[0].name} / ${files[0]}`);
      const fullPath = path.join(subP, files[0]);
      const content = fs.readFileSync(fullPath, 'utf8');
      
      const fileNoExt = path.parse(files[0]).name;
      const parts = fileNoExt.split('_');
      const subject = parts.length > 2 ? parts.slice(1, -1).join('_') : (parts[1] || fileNoExt);
      
      console.log('Extracted Subject:', subject);
    }
  }
});
