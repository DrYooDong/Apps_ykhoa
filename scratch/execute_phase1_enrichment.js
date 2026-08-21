const fs = require('fs');
const path = require('path');

const vaultBase = 'd:/Apps_ykhoa/knowledge-vault';

// 1. Comprehensive Medical Knowledge Base for Entities, Abbreviations, English Names, ICD-10, and Key Concepts
const MEDICAL_ENTITIES = {
  // TIM MẠCH (Cardiovascular)
  'hội chứng vành cấp': {
    aliases: ['ACS', 'Acute Coronary Syndrome', 'Nhồi máu cơ tim', 'NMCT', 'Đau thắt ngực không ổn định', 'STEMI', 'NSTEMI', 'Unstable Angina'],
    keywords: ['troponin', 'stemi', 'nste-acs', 'mona', 'ecg', 'pci', 'aspirin', 'clopidogrel', 'men tim', 'thiếu máu cơ tim', 'động mạch vành'],
    icd10: ['I20', 'I21', 'I24']
  },
  'suy tim': {
    aliases: ['Heart Failure', 'HF', 'HFpEF', 'HFrEF', 'HFmrEF', 'Suy tim sung huyết', 'Congestive Heart Failure'],
    keywords: ['bnp', 'nt-probnp', 'ef', 'nyha', 'acei', 'arbi', 'arni', 'sglt2i', 'spironolactone', 'furosemide', 'phù phổi cấp', 'quá tải thể tích'],
    icd10: ['I50', 'I50.1', 'I50.9', 'I42']
  },
  'tăng huyết áp': {
    aliases: ['Hypertension', 'THA', 'HTN', 'Huyết áp cao', 'High Blood Pressure', 'Tăng HA nguyên phát', 'Tăng HA thứ phát'],
    keywords: ['huyet ap', 'map', 'amlodipine', 'losartan', 'perindopril', 'con tang huyet ap', 'ton thuong co quan dich', 'raas', 'renin'],
    icd10: ['I10', 'I11', 'I15']
  },
  'rung nhĩ': {
    aliases: ['Atrial Fibrillation', 'AF', 'Rung tam nhi', 'Loan nhip tim'],
    keywords: ['cha2ds2-vasc', 'has-bled', 'noac', 'doac', 'warfarin', 'dien tam do', 'song f', 'kiem soat nhip', 'kiem soat tan so'],
    icd10: ['I48', 'I48.0', 'I48.9']
  },
  'sốc tim': {
    aliases: ['Cardiogenic Shock', 'CS', 'Soc do tim'],
    keywords: ['ha huyet ap', 'giam tuoi mau', 'noradrenaline', 'dobutamine', 'iabp', 'ecmo', 'ap luc mao mach phoi bit', 'pcwp'],
    icd10: ['R57.0']
  },
  'thuyên tắc phổi': {
    aliases: ['Pulmonary Embolism', 'PE', 'Thuyen tac dong mach phoi', 'VTE'],
    keywords: ['d-dimer', 'cta phoi', 's1q3t3', 'wells score', 'geneva score', 'heparin', 'tieu soi huyet', 'huyet khoi tinh mach sau'],
    icd10: ['I26', 'I26.9']
  },
  'huyết khối tĩnh mạch sâu': {
    aliases: ['Deep Vein Thrombosis', 'DVT', 'Huyet khoi tinh mach', 'VTE'],
    keywords: ['sieu am doppler mach mau', 'd-dimer', 'virchow triad', 'khang dong', 'vo ap luc', 'tam chung virchow'],
    icd10: ['I80', 'I82']
  },
  'viêm nội tâm mạc nhiễm khuẩn': {
    aliases: ['Infective Endocarditis', 'IE', 'VNTMNK'],
    keywords: ['tieu chuan duke', 'cay mau', 'sieu am tim qua thuc quan', 'sui van tim', 's. aureus', 's. viridans', 'khang sinh duong tinh mach'],
    icd10: ['I33', 'I38']
  },
  'bệnh van tim': {
    aliases: ['Valvular Heart Disease', 'VHD', 'Hep ho van tim'],
    keywords: ['hep van hai la', 'ho van hai la', 'hep van dong mach chu', 'ho van dong mach chu', 'tieng thoi tim', 'sieu am tim doppler'],
    icd10: ['I34', 'I35', 'I05']
  },

  // HÔ HẤP (Respiratory)
  'bệnh phổi tắc nghẽn mạn': {
    aliases: ['COPD', 'Chronic Obstructive Pulmonary Disease', 'BPTNMT', 'Khí phế thũng', 'Viêm phế quản mạn'],
    keywords: ['fev1', 'fvc', 'gold', 'ho dom', 'kho tho', 'laba', 'lama', 'ics', 'dot cap copd', 'ho hap ky', 'thuoc gian phe quan'],
    icd10: ['J44', 'J44.0', 'J44.1', 'J44.9']
  },
  'hen phế quản': {
    aliases: ['Asthma', 'Hen suyễn', 'Bronchial Asthma'],
    keywords: ['gina', 'fev1', 'pef', 'con hen phe quan cap', 'saba', 'ics-formoterol', 'di ung', 'ige', 'tang phan ung phe quan'],
    icd10: ['J45', 'J45.0', 'J45.9']
  },
  'viêm phổi': {
    aliases: ['Pneumonia', 'CAP', 'HAP', 'VAP', 'Viêm phổi mắc phải cộng đồng', 'Viêm phổi bệnh viện'],
    keywords: ['curb-65', 'crb-65', 'x-quang nguc', 'tham nhiem phoi', 's. pneumoniae', 'khang sinh empiric', 'procalcitonin', 'suy ho hap'],
    icd10: ['J18', 'J15', 'J13', 'J18.9']
  },
  'suy hô hấp cấp tiến triển': {
    aliases: ['ARDS', 'Acute Respiratory Distress Syndrome', 'Hội chứng suy hô hấp cấp', 'Phù phổi không do tim'],
    keywords: ['tieu chuan berlin', 'pao2/fio2', 'peep', 'x-quang phoi mo hai ben', 'tho may bao ve phoi', 'prone position', 'ecmo'],
    icd10: ['J80', 'R09.2']
  },
  'lao phổi': {
    aliases: ['Tuberculosis', 'TB', 'Lao phoi AFB', 'Mycobacterium tuberculosis'],
    keywords: ['afb nhom dom', 'genexpert', 'mtb/rif', 'phac do 2rhze/4rh', 'x-quang tham nhiem dinh phoi', 'hang lao', 'ho ra mau'],
    icd10: ['A15', 'A16', 'A19']
  },
  'bệnh phổi mô kẽ': {
    aliases: ['Interstitial Lung Disease', 'ILD', 'IPF', 'Xơ phổi vô căn'],
    keywords: ['hrct nguc', 'hinh anh to ong', 'honeycombing', 'kho tho khi gang suc', 'dlco', 'sinh thiet phoi', 'thuoc chong xo'],
    icd10: ['J84', 'J84.1', 'J84.9']
  },

  // THẬN & TIẾT NIỆU (Renal & Urology)
  'tổn thương thận cấp': {
    aliases: ['Acute Kidney Injury', 'AKI', 'Suy thận cấp', 'ARF', 'Acute Renal Failure'],
    keywords: ['kdigo', 'creatinine', 'fena', 'nuoc tieu', 'anuria', 'oliguria', 'loc mau cap', 'crrt', 'hoai tu ong than cap', 'atn'],
    icd10: ['N17', 'N17.0', 'N17.9']
  },
  'bệnh thận mạn': {
    aliases: ['Chronic Kidney Disease', 'CKD', 'Suy thận mạn', 'CRF', 'Chronic Renal Failure'],
    keywords: ['egfr', 'ckd-epi', 'albumin nieu', 'loc mau chu ky', 'thay the than', 'thieu mau do thieu erythropoietin', 'tang kali mau'],
    icd10: ['N18', 'N18.3', 'N18.5', 'N18.9']
  },
  'hội chứng thận hư': {
    aliases: ['Nephrotic Syndrome', 'NS', 'Thận hư nguyên phát'],
    keywords: ['protein nieu > 3.5g/24h', 'albumin mau giam', 'phu toan than', 'tang lipid mau', 'sang thuong toi thieu', 'corticoid'],
    icd10: ['N04', 'N04.9']
  },
  'nhiễm khuẩn tiết niệu': {
    aliases: ['Urinary Tract Infection', 'UTI', 'Viêm bàng quang', 'Viêm đài bể thận', 'Nhiễm trùng tiểu'],
    keywords: ['e. coli', 'tong phan tich nuoc tieu', 'bạch cầu niệu', 'nitrite', 'cay nuoc tieu', 'tieu buot tieu rat', 'ciprofloxacin'],
    icd10: ['N39.0', 'N10', 'N30']
  },

  // TIÊU HÓA & GAN MẬT (Gastrointestinal & Hepatology)
  'xơ gan': {
    aliases: ['Cirrhosis', 'Liver Cirrhosis', 'Xơ gan mất bù', 'Xơ gan còn bù'],
    keywords: ['child-pugh', 'meld score', 'tang ap luc tinh mach cua', 'bang bung', 'xuat huyet tieu hoa do vo gian tm thuc quan', 'benh nao gan'],
    icd10: ['K74', 'K70', 'K70.3']
  },
  'viêm tụy cấp': {
    aliases: ['Acute Pancreatitis', 'AP', 'VTC', 'Viêm tụy hoại tử'],
    keywords: ['amylase', 'lipase', 'tieu chuan atlanta', 'ranson score', 'balthazar ct', 'sieu am tuy', 'soi mat', 'ruou bia', 'bu dich som'],
    icd10: ['K85', 'K85.9']
  },
  'xuất huyết tiêu hóa': {
    aliases: ['Gastrointestinal Bleeding', 'GI Bleeding', 'UGIB', 'LGIB', 'XHTH trên', 'XHTH dưới'],
    keywords: ['noi soi da day cap cuu', 'rockall score', 'glasgow-blatchford', 'non ra mau', 'di ngoai phan den', 'ppi truyen tinh mach', 'octreotide'],
    icd10: ['K92.0', 'K92.1', 'K92.2']
  },
  'viêm ruột thừa': {
    aliases: ['Appendicitis', 'VRT', 'Đau ruột thừa cấp'],
    keywords: ['alvarado score', 'diem mcburney', 'sieu am ho chau phai', 'ct bung', 'phau thuat noi soi cat ruot thua'],
    icd10: ['K35', 'K35.8']
  },
  'trào ngược dạ dày thực quản': {
    aliases: ['GERD', 'Gastroesophageal Reflux Disease', 'Trào ngược acid'],
    keywords: ['o nong', 'o chua', 'noi soi thuc quan', 'ppi', 'thuc quan barrett', 'thuoc khang tiet acid'],
    icd10: ['K21', 'K21.0', 'K21.9']
  },
  'viêm gan virus': {
    aliases: ['Viral Hepatitis', 'Viêm gan B', 'Viêm gan C', 'HBV', 'HCV'],
    keywords: ['hbsag', 'anti-hcv', 'hbv-dna', 'hcv-rna', 'alt', 'ast', 'tenofovir', 'entecavir', 'sofosbuvir', 'xo hoa gan'],
    icd10: ['B18.1', 'B18.2', 'B16']
  },

  // NỘI TIẾT & CHUYỂN HÓA (Endocrine & Metabolism)
  'đái tháo đường': {
    aliases: ['Diabetes Mellitus', 'T2D', 'T1D', 'DTĐ', 'Tiểu đường', 'Type 2 Diabetes', 'Type 1 Diabetes'],
    keywords: ['hba1c', 'glucose huyet', 'insulin', 'metformin', 'dka', 'hhs', 'sglt2i', 'glp1-ra', 'bien chung than', 'bien chung vong mac'],
    icd10: ['E11', 'E10', 'E14']
  },
  'nhiễm toan ceton': {
    aliases: ['DKA', 'Diabetic Ketoacidosis', 'Toan ceton do đái tháo đường'],
    keywords: ['anion gap tang', 'ceton mau', 'ceton nieu', 'glucose > 250mg/dl', 'ph < 7.3', 'hco3 < 18', 'bu dich dang truong', 'insulin truyen'],
    icd10: ['E10.1', 'E11.1']
  },
  'hội chứng tăng áp lực thẩm thấu': {
    aliases: ['HHS', 'Hyperosmolar Hyperglycemic State', 'Hôn mê tăng ALTT'],
    keywords: ['ap luc tham thau mau > 320', 'glucose > 600mg/dl', 'khong toan ceton ro', 'mat nuoc tram trong', 'bu dich tich cuc'],
    icd10: ['E11.0']
  },
  'bệnh tuyến giáp': {
    aliases: ['Thyroid Disease', 'Basedow', 'Graves Disease', 'Suy giáp', 'Cường giáp', 'Hypothyroidism', 'Hyperthyroidism'],
    keywords: ['tsh', 'ft4', 'ft3', 'anti-tpo', 'trab', 'methimazole', 'levothyroxine', 'bao giap', 'phu niem'],
    icd10: ['E05', 'E03', 'E02']
  },

  // THẦN KINH & CẤP CỨU (Neurology & Critical Care)
  'đột quỵ': {
    aliases: ['Stroke', 'Tai biến mạch máu não', 'TBMMN', 'Nhồi máu não', 'Xuất huyết não', 'Ischemic Stroke', 'Hemorrhagic Stroke'],
    keywords: ['fast', 'nihss', 'ct so nao khong can quang', 'mri diffusion', 'tpa tieu soi huyet', 'lay huyet khoi co hoc', 'cua so vang'],
    icd10: ['I63', 'I61', 'I64']
  },
  'sốc nhiễm khuẩn': {
    aliases: ['Septic Shock', 'Sepsis', 'Nhiễm khuẩn huyết', 'Nhiễm trùng huyết'],
    keywords: ['sofa score', 'qsofa', 'lactate mau', 'cay mau truoc khang sinh', 'bu dich 30ml/kg', 'noradrenaline', 'map >= 65'],
    icd10: ['A41', 'R65.2', 'R57.2']
  },
  'sốc phản vệ': {
    aliases: ['Anaphylaxis', 'Anaphylactic Shock', 'Phản vệ cấp'],
    keywords: ['adrenaline tiem bap', 'epinephrine', 'giai phong histamine', 'co that phe quan', 'tut huyet ap', 'phu quincke', 'khang histamine'],
    icd10: ['T78.2', 'T78.0']
  },
  'co giật': {
    aliases: ['Seizure', 'Epilepsy', 'Động kinh', 'Cơn co giật toàn thể'],
    keywords: ['dien nao do', 'eeg', 'trang thai dong kinh', 'status epilepticus', 'diazepam', 'lorazepam', 'levetiracetam', 'valproate'],
    icd10: ['G40', 'R56']
  },

  // VI SINH VẬT & KÝ SINH TRÙNG (Microbiology)
  'liên cầu': {
    aliases: ['Streptococcus', 'Phế cầu', 'Streptococci', 'GAS', 'GBS', 'S. pneumoniae', 'S. pyogenes'],
    keywords: ['gram duong chuoi', 'lancefield', 'tieu huyet alpha beta', 's. pyogenes', 's. pneumoniae', 'khang sinh penicillin'],
    icd10: ['A40', 'B95.0']
  },
  'tụ cầu': {
    aliases: ['Staphylococcus', 'Staphylococci', 'Tụ cầu vàng', 'MRSA', 'MSSA', 'S. aureus'],
    keywords: ['gram duong chum', 'catalase duong', 'coagulase', 's. aureus', 's. epidermidis', 'vancomycin', 'nhiem trung da'],
    icd10: ['A41.0', 'B95.6']
  },
  'trực khuẩn mủ xanh': {
    aliases: ['Pseudomonas aeruginosa', 'Pseudomonas', 'Trực khuẩn mủ xanh'],
    keywords: ['gram am', 'oxidase duong', 'nhiem trung benh vien', 'khang thuoc', 'carbapenem', 'ceftazidime', 'piperacillin-tazobactam'],
    icd10: ['B96.5']
  },
  'viêm gan b': {
    aliases: ['Hepatitis B Virus', 'HBV', 'Nhiễm virus viêm gan B'],
    keywords: ['hbsag', 'anti-hbs', 'hbeag', 'anti-hbe', 'hbv-dna', 'men gan alt', 'tenofovir', 'entecavir', 'tiem ngua vaccine'],
    icd10: ['B16', 'B18.1']
  },
  'dengue': {
    aliases: ['Sốt xuất huyết Dengue', 'Dengue Fever', 'SXHD', 'Dengue Virus'],
    keywords: ['ns1 antigen', 'igm/igg dengue', 'tieu cau giam', 'dung tich hong cau hct', 'thoat huyet tuong', 'dau hieu canh bao', 'bu dich'],
    icd10: ['A90', 'A91']
  },

  // HÓA SINH & CHUYỂN HÓA PHÂN TỬ (Biochemistry & Molecular)
  'đường phân': {
    aliases: ['Glycolysis', 'Thoái hóa Glucose', 'Con đường Embden-Meyerhof-Parnas'],
    keywords: ['glucose', 'pyruvate', 'lactate', 'hexokinase', 'pfk-1', 'pyruvate kinase', 'atp', 'nadh', 'bao tuong te bao'],
    icd10: []
  },
  'chu trình krebs': {
    aliases: ['Krebs Cycle', 'Citric Acid Cycle', 'TCA Cycle', 'Chu trình Acid Citric'],
    keywords: ['ty the', 'acetyl-coa', 'oxaloacetate', 'citrate', 'nadh', 'fadh2', 'atp', 'chuyen hoa nang luong', 'chuoi ho hap'],
    icd10: []
  },
  'chuỗi hô hấp': {
    aliases: ['Electron Transport Chain', 'ETC', 'Phosphoryl hóa oxy hóa', 'Oxidative Phosphorylation'],
    keywords: ['phuc hop i ii iii iv', 'atp synthase', 'ty the', 'gradient proton', 'oxy hoa khu', 'cytochrome c'],
    icd10: []
  },
  'tân tạo đường': {
    aliases: ['Gluconeogenesis', 'Tổng hợp Glucose mới'],
    keywords: ['lactate', 'glycerol', 'alanine', 'pyruvate carboxylase', 'pep carboxykinase', 'fructose-1,6-bisphosphatase', 'gan'],
    icd10: []
  },
  'chuyển hóa lipid': {
    aliases: ['Lipid Metabolism', 'Beta Oxidation', 'Thoái hóa acid béo', 'Tổng hợp Triglyceride'],
    keywords: ['acetyl-coa', 'carnitine shuttle', 'cpt-1', 'the ceton', 'chylomicron', 'vldl', 'ldl', 'hdl', 'cholesterol'],
    icd10: []
  },
  'chuyển hóa acid amin': {
    aliases: ['Amino Acid Metabolism', 'Chu trình Ure', 'Urea Cycle'],
    keywords: ['khu amin', 'transamination', 'ast', 'alt', 'ammoniac nh3', 'ure', 'carbamoyl phosphate', 'gan'],
    icd10: []
  }
};

// 2. Generic Medical Specialty & Tag Inference Helper
function inferSpecialtyAndTags(filePath, title, content) {
  const norm = (filePath + ' ' + title + ' ' + content.slice(0, 500)).toLowerCase();
  
  let specialty = 'Đại cương';
  let organTag = 'he-co-quan/tong-quat';

  if (norm.includes('tim') || norm.includes('mạch') || norm.includes('coronary') || norm.includes('cardio') || norm.includes('áp lực')) {
    specialty = 'Tim mạch';
    organTag = 'he-co-quan/tim-mach';
  } else if (norm.includes('phổi') || norm.includes('hô hấp') || norm.includes('pulmonary') || norm.includes('phế quản')) {
    specialty = 'Hô hấp';
    organTag = 'he-co-quan/ho-hap';
  } else if (norm.includes('thận') || norm.includes('tiết niệu') || norm.includes('renal') || norm.includes('kidney') || norm.includes('niệu')) {
    specialty = 'Thận - Tiết niệu';
    organTag = 'he-co-quan/than-tiet-nieu';
  } else if (norm.includes('tiêu hóa') || norm.includes('dạ dày') || norm.includes('ruột') || norm.includes('gan') || norm.includes('mật') || norm.includes('tụy')) {
    specialty = 'Tiêu hóa - Gan mật';
    organTag = 'he-co-quan/tieu-hoa';
  } else if (norm.includes('nội tiết') || norm.includes('đái tháo đường') || norm.includes('giáp') || norm.includes('hormone') || norm.includes('corticoid')) {
    specialty = 'Nội tiết - Chuyển hóa';
    organTag = 'he-co-quan/noi-tiet';
  } else if (norm.includes('thần kinh') || norm.includes('não') || norm.includes('tủy') || norm.includes('neuro') || norm.includes('đột quỵ')) {
    specialty = 'Thần kinh';
    organTag = 'he-co-quan/than-kinh';
  } else if (norm.includes('huyết học') || norm.includes('máu') || norm.includes('thiếu máu') || norm.includes('bạch cầu') || norm.includes('tiểu cầu')) {
    specialty = 'Huyết học - Truyền máu';
    organTag = 'he-co-quan/huyet-hoc';
  } else if (norm.includes('vi sinh') || norm.includes('truyền nhiễm') || norm.includes('nhiễm trùng') || norm.includes('vi khuẩn') || norm.includes('virus')) {
    specialty = 'Truyền nhiễm & Vi sinh';
    organTag = 'he-co-quan/truyen-nhiem';
  } else if (norm.includes('cơ xương khớp') || norm.includes('da liễu') || norm.includes('khớp') || norm.includes('xương')) {
    specialty = 'Da liễu - Cơ xương khớp';
    organTag = 'he-co-quan/co-xuong-khop';
  }

  return { specialty, organTag };
}

// 3. Process Target Repositories (1.1, 1.2, 1.3, 1.4)
const targetKhos = [
  { match: '1.1. Kho giải phẫu & sinh lý', khoCode: 'GPSL', khoName: '1.1. Kho giải phẫu & sinh lý', baseType: 'physiology' },
  { match: '1.2. Kho hóa sinh y học', khoCode: 'HS', khoName: '1.2. Kho hóa sinh y học', baseType: 'biochemistry' },
  { match: '1.3. Kho sinh lý bệnh', khoCode: 'SLB', khoName: '1.3. Kho sinh lý bệnh', baseType: 'disease' },
  { match: '1.4. Kho dịch tễ học', khoCode: 'DTH', khoName: '1.4. Kho dịch tễ học', baseType: 'disease' }
];

const vaultEntries = fs.readdirSync(vaultBase, { withFileTypes: true })
  .filter(e => e.isDirectory())
  .map(e => e.name);

let totalUpdated = 0;
let details = [];

targetKhos.forEach(tk => {
  const matchedDir = vaultEntries.find(d => d.includes(tk.match) || d.toLowerCase().includes(tk.match.toLowerCase()));
  if (!matchedDir) {
    console.log(`Directory not found for: ${tk.match}`);
    return;
  }
  const khoPath = path.join(vaultBase, matchedDir);
  console.log(`Processing Kho: ${matchedDir}...`);

  const subDirs = fs.readdirSync(khoPath, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name);

  subDirs.forEach(sub => {
    const subPath = path.join(khoPath, sub);
    const files = fs.readdirSync(subPath, { withFileTypes: true })
      .filter(e => !e.isDirectory() && e.name.endsWith('.md'))
      .map(e => e.name);

    files.forEach(f => {
      const fullPath = path.join(subPath, f);
      const rawContent = fs.readFileSync(fullPath, 'utf8');

      // Strip existing YAML frontmatter if any
      let bodyContent = rawContent;
      if (rawContent.startsWith('---')) {
        const endYaml = rawContent.indexOf('---', 3);
        if (endYaml !== -1) {
          bodyContent = rawContent.slice(endYaml + 3).replace(/^\n+/, '');
        }
      }

      const fileNoExt = path.parse(f).name;
      const parts = fileNoExt.split('_');
      const prefix = parts[0] || tk.khoCode;
      const part = parts.length > 2 ? parts[parts.length - 1] : 'P1';
      const cleanTitle = parts.length > 2 ? parts.slice(1, -1).join('_') : (parts[1] || fileNoExt);

      // Match with Medical Knowledge Base
      const lowerTitle = cleanTitle.toLowerCase();
      let matchedEntity = null;

      for (const [key, ent] of Object.entries(MEDICAL_ENTITIES)) {
        if (lowerTitle.includes(key) || key.includes(lowerTitle)) {
          matchedEntity = ent;
          break;
        }
      }

      // Infer Specialty and Tags
      const { specialty, organTag } = inferSpecialtyAndTags(fullPath, cleanTitle, bodyContent);

      // Assemble Aliases
      const aliases = new Set();
      aliases.add(cleanTitle);
      if (matchedEntity && matchedEntity.aliases) {
        matchedEntity.aliases.forEach(a => aliases.add(a));
      }

      // Assemble Keywords
      const keywords = new Set();
      keywords.add(cleanTitle.toLowerCase());
      keywords.add(specialty.toLowerCase());
      keywords.add(sub.toLowerCase());
      if (matchedEntity && matchedEntity.keywords) {
        matchedEntity.keywords.forEach(k => keywords.add(k));
      }

      // Assemble ICD10
      const icd10List = matchedEntity && matchedEntity.icd10 ? matchedEntity.icd10 : [];

      // Assemble Tags
      const tags = [
        organTag,
        `loai/${tk.baseType}`,
        `y-khoa/${tk.khoCode.toLowerCase()}`
      ];

      // Build Clean YAML Frontmatter
      const yamlFrontmatter = [
        '---',
        `title: "${cleanTitle.replace(/"/g, '\\"')}"`,
        `part: "${part}"`,
        'aliases:',
        ...Array.from(aliases).map(a => `  - "${a.replace(/"/g, '\\"')}"`),
        'keywords:',
        ...Array.from(keywords).map(k => `  - "${k.replace(/"/g, '\\"')}"`),
        icd10List.length > 0 ? 'icd10:' : null,
        ...icd10List.map(c => `  - "${c}"`),
        `specialty: "${specialty}"`,
        `kho: "${matchedDir}"`,
        'tags:',
        ...tags.map(t => `  - "${t}"`),
        'updated: "2026-08-21"',
        '---',
        '',
        ''
      ].filter(line => line !== null).join('\n');

      const newContent = yamlFrontmatter + bodyContent;
      fs.writeFileSync(fullPath, newContent, 'utf8');
      totalUpdated++;
    });
  });
});

console.log(`\n✅ HOÀN TẤT GIAI ĐOẠN 1: Đã cập nhật YAML Frontmatter & Keywords cho ${totalUpdated} files.`);
