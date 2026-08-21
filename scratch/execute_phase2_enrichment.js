const fs = require('fs');
const path = require('path');

const vaultBase = 'd:/Apps_ykhoa/knowledge-vault';

// Comprehensive Medical Knowledge Base for Entities, Abbreviations, English Names, ICD-10, and Key Concepts
const MEDICAL_ENTITIES = {
  // TIM MẠCH
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
    aliases: ['Hypertension', 'THA', 'HTN', 'Huyết áp cao', 'High Blood Pressure'],
    keywords: ['huyet ap', 'map', 'amlodipine', 'losartan', 'perindopril', 'con tang huyet ap', 'ton thuong co quan dich', 'raas'],
    icd10: ['I10', 'I11', 'I15']
  },
  'rung nhĩ': {
    aliases: ['Atrial Fibrillation', 'AF', 'Rung tam nhi', 'Loan nhip tim'],
    keywords: ['cha2ds2-vasc', 'has-bled', 'noac', 'doac', 'warfarin', 'dien tam do', 'song f', 'kiem soat nhip', 'kiem soat tan so'],
    icd10: ['I48', 'I48.0', 'I48.9']
  },
  'sốc tim': {
    aliases: ['Cardiogenic Shock', 'CS', 'Soc do tim'],
    keywords: ['ha huyet ap', 'giam tuoi mau', 'noradrenaline', 'dobutamine', 'iabp', 'ecmo', 'ap luc mao mach phoi bit'],
    icd10: ['R57.0']
  },
  'thuyên tắc phổi': {
    aliases: ['Pulmonary Embolism', 'PE', 'Thuyen tac dong mach phoi', 'VTE'],
    keywords: ['d-dimer', 'cta phoi', 's1q3t3', 'wells score', 'geneva score', 'heparin', 'tieu soi huyet'],
    icd10: ['I26', 'I26.9']
  },
  'huyết khối tĩnh mạch sâu': {
    aliases: ['Deep Vein Thrombosis', 'DVT', 'Huyet khoi tinh mach', 'VTE'],
    keywords: ['sieu am doppler mach mau', 'd-dimer', 'virchow triad', 'khang dong', 'tam chung virchow'],
    icd10: ['I80', 'I82']
  },
  'viêm nội tâm mạc': {
    aliases: ['Infective Endocarditis', 'IE', 'VNTMNK', 'Viêm nội tâm mạc nhiễm khuẩn'],
    keywords: ['tieu chuan duke', 'cay mau', 'sieu am tim qua thuc quan', 'sui van tim', 's. aureus', 's. viridans'],
    icd10: ['I33', 'I38']
  },
  'bệnh van tim': {
    aliases: ['Valvular Heart Disease', 'VHD', 'Hep ho van tim'],
    keywords: ['hep van hai la', 'ho van hai la', 'hep van dong mach chu', 'ho van dong mach chu', 'tieng thoi tim'],
    icd10: ['I34', 'I35', 'I05']
  },

  // HÔ HẤP
  'bệnh phổi tắc nghẽn mạn': {
    aliases: ['COPD', 'Chronic Obstructive Pulmonary Disease', 'BPTNMT', 'Khí phế thũng', 'Viêm phế quản mạn'],
    keywords: ['fev1', 'fvc', 'gold', 'ho dom', 'kho tho', 'laba', 'lama', 'ics', 'dot cap copd', 'ho hap ky'],
    icd10: ['J44', 'J44.0', 'J44.1', 'J44.9']
  },
  'hen phế quản': {
    aliases: ['Asthma', 'Hen suyễn', 'Bronchial Asthma'],
    keywords: ['gina', 'fev1', 'pef', 'con hen phe quan cap', 'saba', 'ics-formoterol', 'di ung', 'ige'],
    icd10: ['J45', 'J45.0', 'J45.9']
  },
  'viêm phổi': {
    aliases: ['Pneumonia', 'CAP', 'HAP', 'VAP', 'Viêm phổi cộng đồng', 'Viêm phổi bệnh viện'],
    keywords: ['curb-65', 'crb-65', 'x-quang nguc', 'tham nhiem phoi', 's. pneumoniae', 'khang sinh', 'procalcitonin'],
    icd10: ['J18', 'J15', 'J13', 'J18.9']
  },
  'suy hô hấp cấp tiến triển': {
    aliases: ['ARDS', 'Acute Respiratory Distress Syndrome', 'Suy hô hấp cấp'],
    keywords: ['tieu chuan berlin', 'pao2/fio2', 'peep', 'tho may bao ve phoi', 'prone position', 'ecmo'],
    icd10: ['J80', 'R09.2']
  },
  'lao phổi': {
    aliases: ['Tuberculosis', 'TB', 'Lao phoi AFB', 'Mycobacterium tuberculosis'],
    keywords: ['afb nhom dom', 'genexpert', 'mtb/rif', 'phac do 2rhze/4rh', 'hang lao', 'ho ra mau'],
    icd10: ['A15', 'A16', 'A19']
  },
  'bệnh phổi mô kẽ': {
    aliases: ['Interstitial Lung Disease', 'ILD', 'IPF', 'Xơ phổi vô căn'],
    keywords: ['hrct nguc', 'hinh anh to ong', 'honeycombing', 'kho tho gang suc', 'dlco', 'sinh thiet phoi'],
    icd10: ['J84', 'J84.1', 'J84.9']
  },

  // THẬN & TIẾT NIỆU
  'tổn thương thận cấp': {
    aliases: ['Acute Kidney Injury', 'AKI', 'Suy thận cấp', 'ARF', 'Acute Renal Failure'],
    keywords: ['kdigo', 'creatinine', 'fena', 'nuoc tieu', 'anuria', 'oliguria', 'loc mau cap', 'crrt'],
    icd10: ['N17', 'N17.0', 'N17.9']
  },
  'bệnh thận mạn': {
    aliases: ['Chronic Kidney Disease', 'CKD', 'Suy thận mạn', 'CRF', 'Chronic Renal Failure'],
    keywords: ['egfr', 'ckd-epi', 'albumin nieu', 'loc mau chu ky', 'thay the than', 'thieu mau than'],
    icd10: ['N18', 'N18.3', 'N18.5', 'N18.9']
  },
  'hội chứng thận hư': {
    aliases: ['Nephrotic Syndrome', 'NS', 'Thận hư'],
    keywords: ['protein nieu > 3.5g/24h', 'albumin mau giam', 'phu toan than', 'tang lipid mau', 'corticoid'],
    icd10: ['N04', 'N04.9']
  },
  'nhiễm khuẩn tiết niệu': {
    aliases: ['Urinary Tract Infection', 'UTI', 'Viêm bàng quang', 'Viêm đài bể thận'],
    keywords: ['e. coli', 'tong phan tich nuoc tieu', 'bach cau nieu', 'nitrite', 'cay nuoc tieu', 'tieu buot'],
    icd10: ['N39.0', 'N10', 'N30']
  },

  // TIÊU HÓA & GAN MẬT
  'xơ gan': {
    aliases: ['Cirrhosis', 'Liver Cirrhosis', 'Xơ gan mất bù', 'Xơ gan còn bù'],
    keywords: ['child-pugh', 'meld score', 'tang ap cua', 'bang bung', 'vo gian tm thuc quan', 'benh nao gan'],
    icd10: ['K74', 'K70', 'K70.3']
  },
  'viêm tụy cấp': {
    aliases: ['Acute Pancreatitis', 'AP', 'VTC', 'Viêm tụy hoại tử'],
    keywords: ['amylase', 'lipase', 'tieu chuan atlanta', 'ranson score', 'balthazar ct', 'sieu am tuy'],
    icd10: ['K85', 'K85.9']
  },
  'xuất huyết tiêu hóa': {
    aliases: ['Gastrointestinal Bleeding', 'GI Bleeding', 'UGIB', 'LGIB', 'XHTH'],
    keywords: ['noi soi da day', 'rockall score', 'glasgow-blatchford', 'non ra mau', 'di ngoai phan den', 'ppi'],
    icd10: ['K92.0', 'K92.1', 'K92.2']
  },
  'viêm ruột thừa': {
    aliases: ['Appendicitis', 'VRT', 'Đau ruột thừa'],
    keywords: ['alvarado score', 'diem mcburney', 'sieu am ho chau phai', 'ct bung', 'phau thuat noi soi'],
    icd10: ['K35', 'K35.8']
  },
  'trào ngược dạ dày thực quản': {
    aliases: ['GERD', 'Gastroesophageal Reflux Disease', 'Trào ngược dạ dày'],
    keywords: ['o nong', 'o chua', 'noi soi thuc quan', 'ppi', 'thuc quan barrett'],
    icd10: ['K21', 'K21.0', 'K21.9']
  },

  // NỘI TIẾT & CHUYỂN HÓA
  'đái tháo đường': {
    aliases: ['Diabetes Mellitus', 'T2D', 'T1D', 'DTĐ', 'Tiểu đường', 'Type 2 Diabetes', 'Type 1 Diabetes'],
    keywords: ['hba1c', 'glucose huyet', 'insulin', 'metformin', 'dka', 'hhs', 'sglt2i', 'glp1-ra'],
    icd10: ['E11', 'E10', 'E14']
  },
  'bệnh tuyến giáp': {
    aliases: ['Thyroid Disease', 'Basedow', 'Graves Disease', 'Suy giáp', 'Cường giáp'],
    keywords: ['tsh', 'ft4', 'ft3', 'anti-tpo', 'trab', 'methimazole', 'levothyroxine', 'bao giap'],
    icd10: ['E05', 'E03', 'E02']
  },
  'béo phì': {
    aliases: ['Obesity', 'Thừa cân béo phì', 'Hội chứng chuyển hóa'],
    keywords: ['bmi', 'vong eo', 'de khang insulin', 'gan nhiem mo', 'che do an', 'tap luyen'],
    icd10: ['E66', 'E66.0']
  },

  // THẦN KINH & CẤP CỨU
  'đột quỵ': {
    aliases: ['Stroke', 'Tai biến mạch máu não', 'TBMMN', 'Nhồi máu não', 'Xuất huyết não'],
    keywords: ['fast', 'nihss', 'ct so nao', 'mri diffusion', 'tpa tieu soi huyet', 'lay huyet khoi', 'cua so vang'],
    icd10: ['I63', 'I61', 'I64']
  },
  'sốc nhiễm khuẩn': {
    aliases: ['Septic Shock', 'Sepsis', 'Nhiễm khuẩn huyết', 'Nhiễm trùng huyết'],
    keywords: ['sofa score', 'qsofa', 'lactate mau', 'cay mau', 'bu dich 30ml/kg', 'noradrenaline'],
    icd10: ['A41', 'R65.2', 'R57.2']
  },
  'sốc phản vệ': {
    aliases: ['Anaphylaxis', 'Anaphylactic Shock', 'Phản vệ'],
    keywords: ['adrenaline tiem bap', 'epinephrine', 'giai phong histamine', 'co that phe quan', 'tut huyet ap'],
    icd10: ['T78.2', 'T78.0']
  },
  'hôn mê': {
    aliases: ['Coma', 'Rối loạn ý thức', 'Mất tri giác', 'Altered Mental Status'],
    keywords: ['thang diem glasgow', 'gcs', 'ct nao', 'khi mau dong mach', 'duong huyet', 'dien giai'],
    icd10: ['R40.2']
  },
  'co giật': {
    aliases: ['Seizure', 'Epilepsy', 'Động kinh', 'Co giật toàn thể'],
    keywords: ['dien nao do', 'eeg', 'trang thai dong kinh', 'status epilepticus', 'diazepam', 'valproate'],
    icd10: ['G40', 'R56']
  },

  // CƠ XƯƠNG KHỚP & DA LIỄU
  'viêm khớp dạng thấp': {
    aliases: ['Rheumatoid Arthritis', 'RA', 'VKDT'],
    keywords: ['yeu to thap rf', 'anti-ccp', 'cung khop buoi sang', 'methotrexate', 'dmard', 'viem da khop'],
    icd10: ['M05', 'M06']
  },
  'gout': {
    aliases: ['Gout', 'Bệnh Gút', 'Viêm khớp Gout', 'Gouty Arthritis'],
    keywords: ['acid uric mau', 'tinh the urat', 'hat tophi', 'colchicine', 'allopurinol', 'febuxostat', 'nsaid'],
    icd10: ['M10', 'M10.9']
  },
  'thoái hóa khớp': {
    aliases: ['Osteoarthritis', 'OA', 'Thoai hoa khop'],
    keywords: ['x-quang khe khop hep', 'gai xuong', 'dac xuong duoi sun', 'paracetamol', 'nsaid', 'tap vat ly tri lieu'],
    icd10: ['M15', 'M19']
  },
  'lupus ban đỏ hệ thống': {
    aliases: ['Systemic Lupus Erythematosus', 'SLE', 'Lupus ban đỏ'],
    keywords: ['ana', 'anti-dsdna', 'anti-sm', 'giam bo the c3 c4', 'ban canh buom', 'viem cau than lupus', 'hydroxychloroquine'],
    icd10: ['M32', 'M32.9']
  },
  'bỏng': {
    aliases: ['Burn Injury', 'Bỏng nhiệt', 'Bỏng hóa chất', 'Bỏng điện'],
    keywords: ['cong thuc parkland', 'dien tich bong', 'do sau bong', 'bu dich ringer lactate', 'chong soc', 'kiem soat nhiem trung'],
    icd10: ['T20', 'T30', 'T31']
  }
};

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
  } else if (norm.includes('nhi khoa') || norm.includes('trẻ em') || norm.includes('sơ sinh')) {
    specialty = 'Nhi khoa';
    organTag = 'he-co-quan/nhi-khoa';
  } else if (norm.includes('sản phụ khoa') || norm.includes('thai kỳ') || norm.includes('sinh non')) {
    specialty = 'Sản phụ khoa';
    organTag = 'he-co-quan/san-phu-khoa';
  }

  return { specialty, organTag };
}

// Target Repositories for Phase 2:
const targetKhos = [
  { match: '2.1. Kho tiếp cận lâm sàng', khoCode: 'TC', baseType: 'symptom' },
  { match: '2.2. Kho kỹ năng lâm sàng', khoCode: 'KN', baseType: 'skill' },
  { match: '2.3. Kho chẩn đoán', khoCode: 'CD', baseType: 'diagnostic' },
  { match: '2.4. Kho phác đồ điều trị', khoCode: 'PDDT', baseType: 'protocol' },
  { match: '2.5. Kho biến chứng', khoCode: 'BC', baseType: 'complication' },
  { match: 'Kho cập nhật', khoCode: 'CN', baseType: 'guideline' },
  { match: '0. Kho thực thể hạt nhân', khoCode: 'CORE', baseType: 'concept' },
  { match: 'Kho nghiên cứu khoa học', khoCode: 'EBM', baseType: 'ebm' },
  { match: 'Kho dinh dưỡng lâm sàng', khoCode: 'DD', baseType: 'nutrition' },
  { match: 'Kho chưa lọc', khoCode: 'RAW', baseType: 'general' }
];

const vaultEntries = fs.readdirSync(vaultBase, { withFileTypes: true })
  .filter(e => e.isDirectory())
  .map(e => e.name);

let totalUpdated = 0;
let statsByKho = {};

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

  let countInKho = 0;

  subDirs.forEach(sub => {
    const subPath = path.join(khoPath, sub);
    const files = fs.readdirSync(subPath, { withFileTypes: true })
      .filter(e => !e.isDirectory() && e.name.endsWith('.md'))
      .map(e => e.name);

    files.forEach(f => {
      const fullPath = path.join(subPath, f);
      const rawContent = fs.readFileSync(fullPath, 'utf8');

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

      const lowerTitle = cleanTitle.toLowerCase();
      let matchedEntity = null;

      for (const [key, ent] of Object.entries(MEDICAL_ENTITIES)) {
        if (lowerTitle.includes(key) || key.includes(lowerTitle)) {
          matchedEntity = ent;
          break;
        }
      }

      const { specialty, organTag } = inferSpecialtyAndTags(fullPath, cleanTitle, bodyContent);

      const aliases = new Set();
      aliases.add(cleanTitle);
      if (matchedEntity && matchedEntity.aliases) {
        matchedEntity.aliases.forEach(a => aliases.add(a));
      }

      const keywords = new Set();
      keywords.add(cleanTitle.toLowerCase());
      keywords.add(specialty.toLowerCase());
      keywords.add(sub.toLowerCase());
      if (matchedEntity && matchedEntity.keywords) {
        matchedEntity.keywords.forEach(k => keywords.add(k));
      }

      const icd10List = matchedEntity && matchedEntity.icd10 ? matchedEntity.icd10 : [];

      const tags = [
        organTag,
        `loai/${tk.baseType}`,
        `y-khoa/${tk.khoCode.toLowerCase()}`
      ];

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
      countInKho++;
    });
  });

  statsByKho[matchedDir] = countInKho;
});

console.log('\n=== HOÀN TẤT GIAI ĐOẠN 2 ===');
console.log(JSON.stringify(statsByKho, null, 2));
console.log(`\n✅ Tổng số files đã được làm giàu Metadata trong Giai đoạn 2: ${totalUpdated} files.`);
