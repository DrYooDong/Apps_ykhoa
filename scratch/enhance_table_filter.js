const fs = require('fs');

const FULL_CONDITION_SPECIALTY_MAP = {
  // Tim Mạch
  'heart-failure': ['cardio'],
  'hypertension': ['cardio', 'obgyn'],
  'af': ['cardio'],
  'cad': ['cardio'],
  'valvular-heart': ['cardio'],
  'cardiogenic-shock': ['cardio', 'icu'],
  'syncope': ['cardio', 'neuro'],
  'vte-pe': ['cardio', 'hema', 'icu', 'onco'],

  // Hô Hấp & Cấp Cứu - ICU
  'copd': ['pulmo'],
  'asthma': ['pulmo', 'pedia'],
  'pneumonia': ['pulmo', 'icu', 'infect'],
  'interstitial-lung': ['pulmo'],
  'tb': ['pulmo', 'infect', 'obgyn'],
  'ards': ['icu', 'pulmo'],
  'icu': ['icu', 'infect'],
  'aki': ['renal', 'icu'],

  // Nội Tiết & Dinh Dưỡng
  'diabetes-t2d': ['endo', 'cardio', 'renal'],
  'diabetes-t1d': ['endo', 'pedia'],
  'thyroid': ['endo'],
  'dyslipidemia': ['endo', 'cardio'],
  'obesity': ['endo', 'cardio', 'nutri'],
  'clinical-nutrition': ['nutri', 'icu', 'endo'],

  // Thận - Tiết Niệu
  'ckd': ['renal', 'endo', 'cardio'],
  'nephrotic': ['renal'],
  'bph-luts': ['renal'],
  'uti': ['renal', 'infect'],

  // Tiêu Hóa - Gan Mật
  'cirrhosis': ['gi'],
  'masld-mash': ['gi', 'endo'],
  'gerd-peptic': ['gi'],
  'biliary-tract': ['gi'],
  'ibd': ['gi'],
  'ugib': ['gi', 'icu'],

  // Truyền Nhiễm & Vi Sinh - Kháng Thuốc (Viêm gan B/C thuộc cả Truyền nhiễm & Tiêu hóa Gan mật)
  'hepatitis-b': ['infect', 'gi'],
  'hepatitis-c': ['infect', 'gi'],
  'flu': ['infect', 'pulmo'],
  'covid19': ['infect', 'pulmo', 'icu'],
  'hemorrhagic-fever': ['infect'],
  'measles': ['infect', 'pedia'],
  'hfmd': ['infect', 'pedia'],
  'mpox': ['infect'],
  'invasive-fungal': ['infect', 'pulmo', 'icu'],
  'malaria': ['infect'],
  'meningitis': ['infect', 'neuro', 'pedia'],
  'diphtheria': ['infect', 'pedia'],
  'hiv-aids': ['infect'],
  'ams-resistance': ['infect', 'icu'],

  // Thần Kinh
  'stroke': ['neuro', 'cardio'],
  'epilepsy': ['neuro', 'pedia'],
  'headache-migraine': ['neuro'],
  'neuro-emergencies': ['neuro', 'icu'],

  // Cơ Xương Khớp & Tự Miễn
  'gout': ['rheum', 'endo'],
  'ra': ['rheum'],
  'osteoporosis': ['rheum', 'endo'],
  'lupus-sle': ['rheum', 'renal'],

  // Ung Bướu, Mạch Máu & Sản Phụ Khoa
  'solid-cancers': ['onco', 'gi', 'obgyn'],
  'hemangioma': ['onco', 'pedia'],
  'uterine-fibroids': ['obgyn']
};

let tableCode = fs.readFileSync('src/content/ebm/guidelines/js/guideline-table.ts', 'utf8');

// 1. Thay thế CONDITION_SPECIALTY_MAP
const mapStr = 'export const CONDITION_SPECIALTY_MAP: Record<string, string[]> = ' + JSON.stringify(FULL_CONDITION_SPECIALTY_MAP, null, 2) + ';\n';
const mapRegex = /export const CONDITION_SPECIALTY_MAP: Record<string, string\[\]> = \{[\s\S]*?\};\n/;

tableCode = tableCode.replace(mapRegex, mapStr);

// 2. Nâng cấp logic lọc specialty để hỗ trợ các bệnh giao thoa (Cross-specialty)
const oldFilterSpecialty = 'if (window.filters.specialty && study.specialty !== window.filters.specialty) return false;';
const newFilterSpecialty = `if (window.filters.specialty) {
      const activeSpec = window.filters.specialty;
      const directMatch = (study.specialty === activeSpec);
      let crossMatch = false;
      if (study.conditionKey && CONDITION_SPECIALTY_MAP[study.conditionKey]) {
        crossMatch = CONDITION_SPECIALTY_MAP[study.conditionKey].includes(activeSpec);
      }
      if (!directMatch && !crossMatch) return false;
    }`;

tableCode = tableCode.replace(oldFilterSpecialty, newFilterSpecialty);

fs.writeFileSync('src/content/ebm/guidelines/js/guideline-table.ts', tableCode, 'utf8');
console.log('✅ Updated CONDITION_SPECIALTY_MAP and cross-specialty filter logic in guideline-table.ts');
