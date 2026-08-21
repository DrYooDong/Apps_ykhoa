const fs = require('fs');
const path = require('path');

const vaultBase = 'd:/Apps_ykhoa/knowledge-vault';

// Comprehensive Medical Knowledge Base for Phase 3:
// 1. Atomic Concepts (Drugs, Labs, Symptoms, Anatomy)
// 2. Clinical Nutrition
// 3. Updated Guidelines
// 4. General Vault Overviews
const PHASE3_ENTITIES = {
  // THỰC THỂ HẠT NHÂN - DƯỢC LÝ & HOẠT CHẤT
  'aspirin': {
    aliases: ['Acetylsalicylic Acid', 'ASA', 'Thuốc chống kết tập tiểu cầu', 'Kháng ngưng tập tiểu cầu', 'NSAID'],
    keywords: ['uc che cox-1', 'uc che cox-2', 'thromboxane a2', 'du phong thu phat bien co tim mach', 'hoi chung mach vanh cap', 'xuat huyet tieu hoa', 'hoi chung reye'],
    tags: ['duoc-ly/khang-ket-tap-tieu-cau', 'loai/hoat-chat', 'y-khoa/duoc-ly']
  },
  'paracetamol': {
    aliases: ['Acetaminophen', 'APAP', 'Hạ sốt giảm đau', 'Thuốc giảm đau hạ sốt'],
    keywords: ['ha sot', 'giam dau', 'ngo doc paracetamol', 'n-acetylcysteine', 'nac', 'chuyen hoa qua gan', 'napqi'],
    tags: ['duoc-ly/giam-dau-ha-sot', 'loai/hoat-chat', 'y-khoa/duoc-ly']
  },
  'insulin': {
    aliases: ['Hormone Insulin', 'Regular Insulin', 'NPH', 'Insulin Analog', 'Glargine', 'Lispro', 'Aspart'],
    keywords: ['ha duong huyet', 'chuyen hoa glucose', 'te bao beta dao tuy', 'ha kali mau', 'tiem duoi da', 'bom insulin', 'dka'],
    tags: ['duoc-ly/noi-tiet', 'loai/hoat-chat', 'y-khoa/noi-tiet']
  },
  'furosemide': {
    aliases: ['Lasix', 'Lợi tiểu quai', 'Loop Diuretic', 'Lợi tiểu Furosemide'],
    keywords: ['quai henle', 'uc che dong van chuyen na-k-2cl', 'ha kali mau', 'suy tim sung huyet', 'phu phoi cap', 'suy than'],
    tags: ['duoc-ly/loi-tieu', 'loai/hoat-chat', 'y-khoa/than-tiet-nieu']
  },
  'metformin': {
    aliases: ['Glucophage', 'Biguanide', 'Thuốc hạ đường huyết Metformin'],
    keywords: ['giam san xuat glucose tai gan', 'tang nhay cam insulin', 'giam hba1c', 'khong gay ha duong huyet qua muc', 'nhiem toan lactic', 'egfr < 30'],
    tags: ['duoc-ly/dai-thao-duong', 'loai/hoat-chat', 'y-khoa/noi-tiet']
  },
  'atorvastatin': {
    aliases: ['Lipitor', 'Statin', 'Hạ mỡ máu', 'Thuốc ức chế HMG-CoA Reductase'],
    keywords: ['ha ldl-cholesterol', 'on dinh mang xo vua', 'giam bien co tim mach', 'tang men gan', 'dau co', 'tieu co van'],
    tags: ['duoc-ly/lipid-mau', 'loai/hoat-chat', 'y-khoa/tim-mach']
  },

  // THỰC THỂ HẠT NHÂN - CẬN LÂM SÀNG & DẤU ẤN
  'troponin': {
    aliases: ['cTnI', 'cTnT', 'hs-cTn', 'High-sensitivity Troponin', 'Men tim Troponin'],
    keywords: ['dau an hoai tu co tim', 'hoi chung vanh cap', 'nhoi mau co tim', 'dong hoc troponin', 'troponin tang cao', 'viem co tim', 'thuyen tac phoi'],
    tags: ['can-lam-sang/men-tim', 'loai/xet-nghiem', 'y-khoa/tim-mach']
  },
  'bạch cầu': {
    aliases: ['White Blood Cells', 'WBC', 'Leukocytes', 'Bạch cầu đa nhân trung tính', 'Lymphocyte', 'Neutrophil'],
    keywords: ['cong thuc mau', 'bach cau tang', 'chuyen trai', 'nhiem trung', 'nhiem khuan huyet', 'leukemia', 'giam bach cau'],
    tags: ['can-lam-sang/huyet-hoc', 'loai/xet-nghiem', 'y-khoa/huyet-hoc']
  },
  'hồng cầu': {
    aliases: ['Red Blood Cells', 'RBC', 'Erythrocytes', 'Hemoglobin', 'Hematocrit', 'Hct', 'Hb'],
    keywords: ['thieu mau', 'the tich hong cau mcv', 'mch', 'mchc', 'hong cau luoi', 'xuat huyet', 'tan mau'],
    tags: ['can-lam-sang/huyet-hoc', 'loai/xet-nghiem', 'y-khoa/huyet-hoc']
  },
  'tiểu cầu': {
    aliases: ['Platelets', 'PLT', 'Thrombocytes', 'Số lượng tiểu cầu'],
    keywords: ['dong mau', 'cam mau ban dau', 'xuat huyet giam tieu cau', 'itp', 'sot xuat huyet dengue', 'tang tieu cau', 'huyet khoi'],
    tags: ['can-lam-sang/huyet-hoc', 'loai/xet-nghiem', 'y-khoa/huyet-hoc']
  },
  'creatinine': {
    aliases: ['Serum Creatinine', 'SCr', 'Creatinine huyết thanh', 'Độ thanh thải Creatinine', 'eGFR'],
    keywords: ['chuc nang than', 'loc cau than', 'ton thuong than cap', 'aki', 'benh than man', 'ckd-epi', 'fena'],
    tags: ['can-lam-sang/chuc-nang-than', 'loai/xet-nghiem', 'y-khoa/than-tiet-nieu']
  },
  'd-dimer': {
    aliases: ['D-dimer Test', 'FDP', 'Sản phẩm thoái giáng Fibrin'],
    keywords: ['thuyen tac phoi', 'pe', 'huyet khoi tinh mach sau', 'dvt', 'dong mau noi mach rai rac', 'dic', 'gia tri du doan am'],
    tags: ['can-lam-sang/dong-mau', 'loai/xet-nghiem', 'y-khoa/tim-mach']
  },

  // THỰC THỂ HẠT NHÂN - CƠ QUAN & GIẢI PHẪU
  'tim': {
    aliases: ['Heart', 'Cor', 'Cơ quan tuần hoàn', 'Buồng tim', 'Thất trái', 'Nhĩ trái', 'Thất phải', 'Nhĩ phải'],
    keywords: ['cung luong tim', 'phan xuat tong mau ef', 'tam thu', 'tam truong', 'dong mach chu', 'dong mach phoi', 'he thong dan truyen'],
    tags: ['giai-phau/tim-mach', 'loai/co-quan', 'y-khoa/giai-phau']
  },
  'phổi': {
    aliases: ['Lungs', 'Pulmo', 'Cơ quan hô hấp', 'Phế nang', 'Màng phổi'],
    keywords: ['trao doi khi', 'o2', 'co2', 'thong khi', 'tuoi mau', 'ti le v/q', 'surfactant', 'mang phoi'],
    tags: ['giai-phau/ho-hap', 'loai/co-quan', 'y-khoa/giai-phau']
  },
  'thận': {
    aliases: ['Kidneys', 'Ren', 'Thận và đường tiết niệu', 'Nephron', 'Cầu thận', 'Ống thận'],
    keywords: ['nephron', 'cau than', 'ong luon gan', 'quai henle', 'ong luon xa', 'ong gop', 'can bang noi moi', 'raas', 'erythropoietin'],
    tags: ['giai-phau/than-tiet-nieu', 'loai/co-quan', 'y-khoa/giai-phau']
  },
  'gan': {
    aliases: ['Liver', 'Hepar', 'Cơ quan chuyển hóa', 'Tế bào gan', 'Hepatocyte'],
    keywords: ['chuyen hoa thuoc', 'tong hop albumin', 'yeu to dong mau', 'chuyen hoa bilirubin', 'tinh mach cua', 'mat'],
    tags: ['giai-phau/tieu-hoa', 'loai/co-quan', 'y-khoa/giai-phau']
  },

  // DINH DƯỠNG LÂM SÀNG
  'chế độ ăn dash': {
    aliases: ['DASH Diet', 'Dietary Approaches to Stop Hypertension', 'Chế độ ăn hạ huyết áp DASH'],
    keywords: ['tang huyet ap', 'giam natri', 'giau kali', 'giau magie', 'nhieu rau xanh trai cay', 'giam chat beo bao hoa', 'benh tim mach'],
    tags: ['dinh-duong/che-do-an', 'loai/dinh-duong', 'y-khoa/dinh-duong']
  },
  'chế độ ăn địa trung hải': {
    aliases: ['Mediterranean Diet', 'Chế độ ăn Địa Trung Hải'],
    keywords: ['dau olive', 'acid beo khong bao hoa', 'omega-3', 'ca', 'ngu coc nguyen hat', 'giam nguy co dot quy', 'phong ngua benh tim mach'],
    tags: ['dinh-duong/che-do-an', 'loai/dinh-duong', 'y-khoa/dinh-duong']
  },
  'dinh dưỡng đái tháo đường': {
    aliases: ['Diabetic Diet', 'Chế độ ăn cho người đái tháo đường', 'Tiết chế ĐTĐ'],
    keywords: ['chi so duong huyet gi', 'tai duong huyet gl', 'carb counting', 'chat xo', 'chia nho bua an', 'kiem soat hba1c'],
    tags: ['dinh-duong/tiet-che', 'loai/dinh-duong', 'y-khoa/noi-tiet']
  },
  'dinh dưỡng suy thận': {
    aliases: ['Renal Diet', 'Dinh dưỡng bệnh thận mạn', 'Chế độ ăn giảm đạm'],
    keywords: ['han che protein 0.6-0.8g/kg', 'giam kali', 'giam phospho', 'han che muoi nuoc', 'loc mau', 'suy dinh duong protein nang luong'],
    tags: ['dinh-duong/benh-than', 'loai/dinh-duong', 'y-khoa/than-tiet-nieu']
  },

  // GUIDELINES & CẬP NHẬT
  'bệnh phổi mô kẽ': {
    aliases: ['Interstitial Lung Disease Guideline', 'Cập nhật Bệnh phổi mô kẽ BYT 2023', 'ILD Guideline'],
    keywords: ['byt 2023', 'hrct nguc', 'hinh anh to ong', 'pirfenidone', 'nintedanib', 'chong xo phoi', 'hoi chan da chuyen khoa'],
    icd10: ['J84', 'J84.1'],
    tags: ['guidelines/ho-hap', 'loai/cap-nhat', 'y-khoa/ho-hap']
  },
  'tăng huyết áp': {
    aliases: ['Hypertension Guideline', 'Cập nhật THA ESC/VNHA', 'Phác đồ Tăng huyết áp 2024'],
    keywords: ['esc 2024', 'vnha', 'score2', 'dieu tri ket hop doi thuoc tu dau', 'ha huyet ap < 130/80', 'tu tuan thu thuoc'],
    icd10: ['I10'],
    tags: ['guidelines/tim-mach', 'loai/cap-nhat', 'y-khoa/tim-mach']
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
  } else if (norm.includes('cơ xương khớp') || norm.includes('da liễu') || norm.includes('khớp') || norm.includes('xương') || norm.includes('bỏng')) {
    specialty = 'Da liễu - Cơ xương khớp';
    organTag = 'he-co-quan/co-xuong-khop';
  } else if (norm.includes('nhi khoa') || norm.includes('trẻ em') || norm.includes('sơ sinh')) {
    specialty = 'Nhi khoa';
    organTag = 'he-co-quan/nhi-khoa';
  } else if (norm.includes('sản phụ khoa') || norm.includes('thai kỳ') || norm.includes('sinh non') || norm.includes('sản khoa')) {
    specialty = 'Sản phụ khoa';
    organTag = 'he-co-quan/san-phu-khoa';
  } else if (norm.includes('ngoại khoa') || norm.includes('phẫu thuật') || norm.includes('mổ')) {
    specialty = 'Ngoại khoa';
    organTag = 'he-co-quan/ngoai-khoa';
  } else if (norm.includes('dinh dưỡng') || norm.includes('chế độ ăn') || norm.includes('tiết chế') || norm.includes('calorie')) {
    specialty = 'Dinh dưỡng lâm sàng';
    organTag = 'he-co-quan/dinh-duong';
  }

  return { specialty, organTag };
}

// 4 Specific Repositories for Phase 3:
const targetKhos = [
  { match: 'Kho cập nhật', khoCode: 'CN', baseType: 'guideline' },
  { match: 'Kho chưa lọc', khoCode: 'RAW', baseType: 'general' },
  { match: 'Kho dinh dưỡng lâm sàng', khoCode: 'DD', baseType: 'nutrition' },
  { match: '0. Kho thực thể hạt nhân', khoCode: 'CORE', baseType: 'concept' }
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

      for (const [key, ent] of Object.entries(PHASE3_ENTITIES)) {
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
      if (matchedEntity && matchedEntity.tags) {
        matchedEntity.tags.forEach(t => tags.push(t));
      }

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
        ...Array.from(new Set(tags)).map(t => `  - "${t}"`),
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

console.log('\n=== HOÀN TẤT GIAI ĐOẠN 3 ===');
console.log(JSON.stringify(statsByKho, null, 2));
console.log(`\n✅ Tổng số files đã được làm giàu Metadata trong Giai đoạn 3: ${totalUpdated} files.`);
