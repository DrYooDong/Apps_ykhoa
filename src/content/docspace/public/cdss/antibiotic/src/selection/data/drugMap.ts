/**
 * Drug Mapping between BVBND Guidelines Names and CliniPortal Antibiotic Dosing Calculator IDs
 */

export interface DrugMapping {
  canonicalNameVi: string;
  drugId: string | null; // null if not yet present in 43 dosing calculator modules
  route: string;
  hasCalculator: boolean;
  notesVi?: string;
}

export const DRUG_MAP: Record<string, DrugMapping> = {
  // Carbapenems
  meropenem: { canonicalNameVi: 'Meropenem', drugId: 'meropenem', route: 'IV', hasCalculator: true },
  imipenem: { canonicalNameVi: 'Imipenem/Cilastatin', drugId: 'imipenem', route: 'IV', hasCalculator: true },
  ertapenem: { canonicalNameVi: 'Ertapenem', drugId: 'ertapenem', route: 'IV', hasCalculator: true },
  doripenem: { canonicalNameVi: 'Doripenem', drugId: 'doripenem', route: 'IV', hasCalculator: true },

  // BL + BLI
  piperacillin_tazo: { canonicalNameVi: 'Piperacillin/Tazobactam', drugId: 'piperacillin_tazo', route: 'IV', hasCalculator: true },
  ampicillin_sulbactam: { canonicalNameVi: 'Ampicillin/Sulbactam', drugId: 'ampicillin_sulbactam', route: 'IV', hasCalculator: true },
  cefo_sulbactam: { canonicalNameVi: 'Cefoperazone/Sulbactam', drugId: 'cefo_sulbactam_11', route: 'IV', hasCalculator: true },
  amox_clav: { canonicalNameVi: 'Amoxicillin/Clavulanate', drugId: 'amox_clav', route: 'IV/PO', hasCalculator: true },

  // Cephalosporins
  ceftriaxone: { canonicalNameVi: 'Ceftriaxone', drugId: 'ceftriaxon', route: 'IV', hasCalculator: true },
  cefotaxime: { canonicalNameVi: 'Cefotaxime', drugId: 'cefotaxim', route: 'IV', hasCalculator: true },
  ceftazidime: { canonicalNameVi: 'Ceftazidime', drugId: 'ceftazidim', route: 'IV', hasCalculator: true },
  cefepime: { canonicalNameVi: 'Cefepime', drugId: 'cefepim', route: 'IV', hasCalculator: true },
  cefazolin: { canonicalNameVi: 'Cefazolin', drugId: 'cefazolin', route: 'IV', hasCalculator: true },
  cefuroxime: { canonicalNameVi: 'Cefuroxime', drugId: 'cefuroxim', route: 'IV/PO', hasCalculator: true },

  // Advanced BL / Novel BLI
  ceftazidime_avibactam: { canonicalNameVi: 'Ceftazidime/Avibactam', drugId: 'ceftazidim_avibactam', route: 'IV', hasCalculator: true },
  ceftolozane_tazobactam: { canonicalNameVi: 'Ceftolozane/Tazobactam', drugId: 'ceftolozan_tazo', route: 'IV', hasCalculator: true },
  aztreonam: { canonicalNameVi: 'Aztreonam', drugId: 'aztreonam', route: 'IV', hasCalculator: true },

  // Fluoroquinolones
  ciprofloxacin: { canonicalNameVi: 'Ciprofloxacin', drugId: 'ciprofloxacin', route: 'IV/PO', hasCalculator: true },
  levofloxacin: { canonicalNameVi: 'Levofloxacin', drugId: 'levofloxacin', route: 'IV/PO', hasCalculator: true },
  moxifloxacin: { canonicalNameVi: 'Moxifloxacin', drugId: 'moxifloxacin', route: 'IV/PO', hasCalculator: true },

  // Glycopeptides & Anti-MRSA
  vancomycin: { canonicalNameVi: 'Vancomycin', drugId: 'vancomycin', route: 'IV', hasCalculator: true },
  teicoplanin: { canonicalNameVi: 'Teicoplanin', drugId: 'teicoplanin', route: 'IV/IM', hasCalculator: true },
  linezolid: { canonicalNameVi: 'Linezolid', drugId: 'linezolid', route: 'IV/PO', hasCalculator: true },
  daptomycin: { canonicalNameVi: 'Daptomycin', drugId: 'daptomycin', route: 'IV', hasCalculator: true },

  // Polymyxins & Glycylcyclines
  colistin: { canonicalNameVi: 'Colistin (CMS)', drugId: 'colistin', route: 'IV/Khí dung', hasCalculator: true },
  tigecycline: { canonicalNameVi: 'Tigecycline', drugId: 'tigecyclin', route: 'IV', hasCalculator: true },

  // Aminoglycosides
  amikacin: { canonicalNameVi: 'Amikacin', drugId: 'amikacin', route: 'IV', hasCalculator: true },
  gentamicin: { canonicalNameVi: 'Gentamicin', drugId: 'gentamicin', route: 'IV', hasCalculator: true },
  tobramycin: { canonicalNameVi: 'Tobramycin', drugId: 'tobramycin', route: 'IV', hasCalculator: true },

  // Others with Calculator
  fosfomycin: { canonicalNameVi: 'Fosfomycin', drugId: 'fosfomycin', route: 'IV/PO', hasCalculator: true },
  metronidazole: { canonicalNameVi: 'Metronidazole', drugId: 'metronidazol', route: 'IV/PO', hasCalculator: true },
  clindamycin: { canonicalNameVi: 'Clindamycin', drugId: 'clindamycin', route: 'IV/PO', hasCalculator: true },
  cotrimoxazole: { canonicalNameVi: 'Co-trimoxazole (TMP-SMX)', drugId: 'tmp_smx', route: 'IV/PO', hasCalculator: true },
  azithromycin: { canonicalNameVi: 'Azithromycin', drugId: 'azithromycin', route: 'IV/PO', hasCalculator: true },

  // Antifungals with Calculator
  fluconazole: { canonicalNameVi: 'Fluconazole', drugId: 'fluconazole', route: 'IV/PO', hasCalculator: true },
  voriconazole: { canonicalNameVi: 'Voriconazole', drugId: 'voriconazole', route: 'IV/PO', hasCalculator: true },
  caspofungin: { canonicalNameVi: 'Caspofungin', drugId: 'caspofungin', route: 'IV', hasCalculator: true },
  micafungin: { canonicalNameVi: 'Micafungin', drugId: 'micafungin', route: 'IV', hasCalculator: true },
  anidulafungin: { canonicalNameVi: 'Anidulafungin', drugId: 'anidulafungin', route: 'IV', hasCalculator: true },

  // Essential BVBND Guideline Drugs (Marked with Guideline Dosing, Calculator in Progress)
  cefiderocol: {
    canonicalNameVi: 'Cefiderocol',
    drugId: null,
    route: 'IV',
    hasCalculator: false,
    notesVi: '2g q8h truyền 3h (CrCl >= 120: 2g q6h truyền 3h). Dành cho CRE, DTR-PA, CRAB đa kháng.'
  },
  polymyxin_b: {
    canonicalNameVi: 'Polymyxin B',
    drugId: null,
    route: 'IV',
    hasCalculator: false,
    notesVi: 'Liều nạp 2 - 2.5 mg/kg (20.000 - 25.000 UI/kg), duy trì 1.25 - 1.5 mg/kg q12h theo TBW.'
  },
  sulbactam_durlobactam: {
    canonicalNameVi: 'Sulbactam/Durlobactam',
    drugId: null,
    route: 'IV',
    hasCalculator: false,
    notesVi: '2g (1g/1g) IV q6h truyền 3h. Lựa chọn hàng đầu cho CRAB đa kháng.'
  },
  minocycline: {
    canonicalNameVi: 'Minocycline',
    drugId: null,
    route: 'IV/PO',
    hasCalculator: false,
    notesVi: '200 mg IV hoặc PO q12h. Phối hợp điều trị CRAB hoặc S. maltophilia.'
  },
  doxycycline: {
    canonicalNameVi: 'Doxycycline',
    drugId: null,
    route: 'IV/PO',
    hasCalculator: false,
    notesVi: '100 mg IV hoặc PO q12h.'
  },
  nitrofurantoin: {
    canonicalNameVi: 'Nitrofurantoin',
    drugId: null,
    route: 'PO',
    hasCalculator: false,
    notesVi: '100 mg PO q12h (hoặc q6h dạng macrocrystals). Chỉ dùng cho nhiễm trùng tiểu dưới (không dùng cho viêm đài bể thận).'
  },
  oxacillin: {
    canonicalNameVi: 'Oxacillin',
    drugId: null,
    route: 'IV',
    hasCalculator: false,
    notesVi: '1 - 2g IV q4-6h. Dành cho MSSA.'
  },
  meropenem_vaborbactam: {
    canonicalNameVi: 'Meropenem/Vaborbactam',
    drugId: null,
    route: 'IV',
    hasCalculator: false,
    notesVi: '4g (2g/2g) IV q8h truyền 3h. Đặc hiệu cho KPC (không tác dụng trên OXA-48 hay MBL).'
  },
  imipenem_relebactam: {
    canonicalNameVi: 'Imipenem/Cilastatin/Relebactam',
    drugId: null,
    route: 'IV',
    hasCalculator: false,
    notesVi: '1.25g IV q6h truyền 30 phút. Hiệu quả trên KPC và DTR-PA.'
  },
  eravacycline: {
    canonicalNameVi: 'Eravacycline',
    drugId: null,
    route: 'IV',
    hasCalculator: false,
    notesVi: '1 mg/kg IV q12h truyền 60 phút. Dẫn xuất tetracycline tổng hợp cho CRE, CRAB.'
  },
  oseltamivir: {
    canonicalNameVi: 'Oseltamivir',
    drugId: null,
    route: 'PO',
    hasCalculator: false,
    notesVi: '75 mg PO q12h khi nghi ngờ cúm đồng nhiễm.'
  }
};

export function resolveDrugInfo(key: string): DrugMapping {
  const normKey = key.toLowerCase().replace(/[- /]/g, '_');
  return DRUG_MAP[normKey] || {
    canonicalNameVi: key,
    drugId: null,
    route: 'IV',
    hasCalculator: false
  };
}
