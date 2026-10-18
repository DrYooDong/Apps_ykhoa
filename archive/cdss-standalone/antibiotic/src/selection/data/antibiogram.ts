import { AntibiogramDataset } from '../types';

/**
 * Local Antibiogram Datasets from Hospital for Tropical Diseases (BV Bệnh Nhiệt Đới TP.HCM)
 * Period: 01/2024 - 12/2024
 * Source: File 3: Hướng dẫn sử dụng kháng sinh 2026, P.4-12
 */
export const BVBND_ANTIBIOGRAMS: AntibiogramDataset[] = [
  {
    site: 'urinary',
    population: 'adult',
    period: '01/2024 - 12/2024',
    sampleTotal: 355,
    organisms: [
      {
        organismName: 'Escherichia coli',
        sampleCount: 164,
        pctOfIsolates: 46.2,
        sensitivities: [
          { antibioticName: 'Meropenem', sensitivityPct: 98.9 },
          { antibioticName: 'Imipenem', sensitivityPct: 98.3 },
          { antibioticName: 'Ertapenem', sensitivityPct: 97.3 },
          { antibioticName: 'Amikacin', sensitivityPct: 95.1 },
          { antibioticName: 'Nitrofurantoin', sensitivityPct: 92.8 },
          { antibioticName: 'Fosfomycin', sensitivityPct: 91.7 },
          { antibioticName: 'Piperacillin/tazobactam', sensitivityPct: 87.5 },
          { antibioticName: 'Gentamicin', sensitivityPct: 65.8 },
          { antibioticName: 'Cefepime', sensitivityPct: 63.9 },
          { antibioticName: 'Amoxicillin/clavulanic acid', sensitivityPct: 46.6 },
          { antibioticName: 'Ceftriaxone', sensitivityPct: 35.8 },
          { antibioticName: 'TMP-SMX (Co-trimoxazole)', sensitivityPct: 35.4 },
          { antibioticName: 'Cefotaxime', sensitivityPct: 33.6 },
          { antibioticName: 'Levofloxacin', sensitivityPct: 23.1 }
        ],
        notableResistance: 'Tỷ lệ sinh ESBL cao (> 64%). Levofloxacin nhạy rất thấp (23.1%).'
      },
      {
        organismName: 'Klebsiella pneumoniae',
        sampleCount: 33,
        pctOfIsolates: 9.3,
        sensitivities: [
          { antibioticName: 'Fosfomycin', sensitivityPct: 100 },
          { antibioticName: 'Colistin', sensitivityPct: 92.0 },
          { antibioticName: 'Gentamicin', sensitivityPct: 69.2 },
          { antibioticName: 'Amikacin', sensitivityPct: 66.7 },
          { antibioticName: 'Ertapenem', sensitivityPct: 40.0 },
          { antibioticName: 'Meropenem', sensitivityPct: 38.5 },
          { antibioticName: 'Cefepime', sensitivityPct: 35.7 },
          { antibioticName: 'Imipenem', sensitivityPct: 33.3 },
          { antibioticName: 'Amoxicillin/clavulanic acid', sensitivityPct: 27.3 },
          { antibioticName: 'Ceftriaxone', sensitivityPct: 27.3 },
          { antibioticName: 'Piperacillin/tazobactam', sensitivityPct: 23.1 },
          { antibioticName: 'Levofloxacin', sensitivityPct: 16.7 }
        ],
        notableResistance: 'Tỷ lệ đề kháng Carbapenem rất cao (CRE > 60%). Cần cảnh giác kiểu gen KPC/NDM.'
      },
      {
        organismName: 'Enterococcus spp.',
        sampleCount: 43,
        pctOfIsolates: 12.1,
        sensitivities: [
          { antibioticName: 'Linezolid', sensitivityPct: 88.5 },
          { antibioticName: 'Vancomycin', sensitivityPct: 76.7 },
          { antibioticName: 'Teicoplanin', sensitivityPct: 67.9 },
          { antibioticName: 'Nitrofurantoin', sensitivityPct: 46.7 },
          { antibioticName: 'Ampicillin', sensitivityPct: 37.9 },
          { antibioticName: 'Ciprofloxacin', sensitivityPct: 30.0 }
        ],
        notableResistance: 'Tỷ lệ kháng Vancomycin (VRE) lên tới 23.3%. Linezolid là thuốc lựa chọn còn nhạy cao.'
      },
      {
        organismName: 'Candida spp.',
        sampleCount: 22,
        pctOfIsolates: 6.2,
        sensitivities: [
          { antibioticName: 'Echinocandins (Caspofungin/Micafungin)', sensitivityPct: 100 },
          { antibioticName: 'Voriconazole', sensitivityPct: 50.0 },
          { antibioticName: 'Fluconazole', sensitivityPct: 40.0 }
        ],
        notableResistance: 'Tỷ lệ kháng Fluconazole tới 60%. Ưu tiên Echinocandin nếu nhiễm nấm xâm lấn.'
      }
    ],
    source: { doc: 'BVBND_HDSDKS', page: 10 }
  },
  {
    site: 'respiratory',
    population: 'adult',
    period: '01/2024 - 12/2024',
    sampleTotal: 412,
    organisms: [
      {
        organismName: 'Acinetobacter baumannii',
        sampleCount: 145,
        pctOfIsolates: 35.2,
        sensitivities: [
          { antibioticName: 'Colistin', sensitivityPct: 89.5 },
          { antibioticName: 'Tigecycline', sensitivityPct: 62.0 },
          { antibioticName: 'Amikacin', sensitivityPct: 22.4 },
          { antibioticName: 'Meropenem', sensitivityPct: 11.2 },
          { antibioticName: 'Imipenem', sensitivityPct: 9.8 }
        ],
        notableResistance: 'CRAB chiếm đa số (> 88%). Đề kháng gần như hoàn toàn với Carbapenem kinh điển.'
      },
      {
        organismName: 'Pseudomonas aeruginosa',
        sampleCount: 98,
        pctOfIsolates: 23.8,
        sensitivities: [
          { antibioticName: 'Colistin', sensitivityPct: 94.0 },
          { antibioticName: 'Amikacin', sensitivityPct: 71.4 },
          { antibioticName: 'Ceftazidime', sensitivityPct: 52.3 },
          { antibioticName: 'Piperacillin/tazobactam', sensitivityPct: 48.7 },
          { antibioticName: 'Meropenem', sensitivityPct: 44.1 },
          { antibioticName: 'Ciprofloxacin', sensitivityPct: 38.6 }
        ],
        notableResistance: 'Nhiều chủng DTR (kháng thuốc khó trị). Cần xét nghiệm Ceftolozane-tazobactam.'
      },
      {
        organismName: 'Klebsiella pneumoniae',
        sampleCount: 86,
        pctOfIsolates: 20.9,
        sensitivities: [
          { antibioticName: 'Colistin', sensitivityPct: 91.0 },
          { antibioticName: 'Amikacin', sensitivityPct: 63.5 },
          { antibioticName: 'Meropenem', sensitivityPct: 41.2 },
          { antibioticName: 'Ceftazidime', sensitivityPct: 24.1 }
        ],
        notableResistance: 'Tỷ lệ CRE cao trên bệnh nhân viêm phổi bệnh viện và thở máy ICU.'
      }
    ],
    source: { doc: 'BVBND_HDSDKS', page: 8 }
  }
];

export function getAntibiogramForSite(site: string, population: string): AntibiogramDataset | undefined {
  return BVBND_ANTIBIOGRAMS.find(ab => ab.site === site && ab.population === population);
}
